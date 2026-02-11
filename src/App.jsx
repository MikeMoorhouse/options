import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Eraser, UserCog, Sparkles, ShieldCheck } from 'lucide-react';
import { BLOCK_SUBJECTS, SUBJECTS, BLOCK_ORDER, SUBJECT_PAGES } from './data.js';
import { emptySelections, validateSelections, buildBlockStatus } from './logic.js';
import PreferencePanel from './components/PreferencePanel.jsx';
import BlockGrid from './components/BlockGrid.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import SubjectPages from './components/SubjectPages.jsx';
import logo from './assets/wellacre-logo.png';

const CAREER_OPTIONS = [
  { value: 'none', label: 'Pick a future career focus' },
  { value: 'creative', label: 'Creative Arts & Design' },
  { value: 'business', label: 'Business & Enterprise' },
  { value: 'computing', label: 'Computing & Digital' },
  { value: 'construction', label: 'Construction & Engineering' },
  { value: 'sport', label: 'Sport & Health' },
  { value: 'humanities', label: 'Humanities, Law & Society' },
  { value: 'languages', label: 'Languages & International' },
  { value: 'science', label: 'Science & Medicine' },
  { value: 'service', label: 'Community & Service' }
];

const CAREER_PRIORITIES = {
  creative: ['art_gc', 'drama', 'imedia', 'dt'],
  business: ['bus', 'hosp', 'dt', 'geo', 'hist'],
  computing: ['cs', 'imedia', 'dt', 'geo'],
  construction: ['cons', 'dt', 'geo'],
  sport: ['sport', 'triple', 'geo'],
  humanities: ['hist', 'geo', 're', 'fr'],
  languages: ['fr', 'geo', 'hist'],
  science: ['triple', 'cs', 'geo'],
  service: ['re', 'hosp', 'sport', 'hist']
};

export default function App() {
  const [selections, setSelections] = useState(emptySelections());
  const [prefList, setPrefList] = useState(SUBJECTS);
  const [excludedIds, setExcludedIds] = useState(new Set());
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [careerFocus, setCareerFocus] = useState('none');
  const [hasAttempted, setHasAttempted] = useState(false);

  const sortedPrefList = useMemo(() => {
    return [...prefList].sort((a, b) => {
      const aExc = excludedIds.has(a.id);
      const bExc = excludedIds.has(b.id);
      if (aExc && !bExc) return 1;
      if (!aExc && bExc) return -1;
      return 0;
    });
  }, [prefList, excludedIds]);

  const toggleExclude = (id) => {
    setExcludedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelect = (blockId, subject) => {
    setErrorMessage('');
    setHasAttempted(true);
    setSelections(prev => {
      const current = prev[blockId];

      if (current.first?.id === subject.id) {
        return { ...prev, [blockId]: { first: null, second: current.second } };
      }
      if (current.second?.id === subject.id) {
        return { ...prev, [blockId]: { ...current, second: null } };
      }

      if (!current.first) {
        return { ...prev, [blockId]: { ...current, first: subject } };
      }

      if (!current.second) {
        if (current.first?.id === subject.id) {
          setErrorMessage('Within-block uniqueness: First and Second Choice must be different.');
          return prev;
        }
        return { ...prev, [blockId]: { ...current, second: subject } };
      }

      setErrorMessage('Both choices are selected. Deselect a choice to change it.');
      return prev;
    });
  };

  const reset = () => {
    setErrorMessage('');
    setSelections(emptySelections());
    setCareerFocus('none');
    setHasAttempted(false);
  };

  const onDragStart = (idx) => setDraggedIdx(idx);

  const onDragOver = (e, targetIdxInSorted) => {
    e.preventDefault();
    if (draggedIdx === null) return;
    const draggedItem = sortedPrefList[draggedIdx];
    const targetItem = sortedPrefList[targetIdxInSorted];
    if (excludedIds.has(draggedItem.id) || excludedIds.has(targetItem.id)) return;
    const actualDraggedIdx = prefList.findIndex(p => p.id === draggedItem.id);
    const actualTargetIdx = prefList.findIndex(p => p.id === targetItem.id);
    if (actualDraggedIdx === actualTargetIdx) return;
    const newList = [...prefList];
    newList.splice(actualDraggedIdx, 1);
    newList.splice(actualTargetIdx, 0, draggedItem);
    setPrefList(newList);
    setDraggedIdx(targetIdxInSorted);
  };

  const isSubjectDisabled = (blockId, subject) => {
    const isExcluded = excludedIds.has(subject.id);
    const blockSelection = selections[blockId];
    const isFirst = blockSelection.first?.id === subject.id;
    const isSecond = blockSelection.second?.id === subject.id;

    if (isFirst || isSecond) return false;
    if (isExcluded) return true;
    if (blockSelection.first && blockSelection.second) return true;

    return false;
  };

  const getSortedSubjectsInBlock = (blockId) => {
    const originalList = BLOCK_SUBJECTS[blockId];
    const currentSelection = selections[blockId];

    return [...originalList].sort((a, b) => {
      const isAFirst = currentSelection.first?.id === a.id;
      const isBFirst = currentSelection.first?.id === b.id;
      const isASecond = currentSelection.second?.id === a.id;
      const isBSecond = currentSelection.second?.id === b.id;
      if (isAFirst) return -1;
      if (isBFirst) return 1;
      if (isASecond) return -1;
      if (isBSecond) return 1;
      return 0;
    });
  };

  const autoOptimize = () => {
    setErrorMessage('');
    setHasAttempted(true);
    const newSels = emptySelections();
    const usedFirstNames = new Set();
    const usedSecondNames = new Set();
    const filteredPrefs = prefList.filter(p => !excludedIds.has(p.id));

    const gatherCodes = () => {
      const codes = new Set();
      BLOCK_ORDER.forEach(blockId => {
        const { first, second } = newSels[blockId];
        if (first) codes.add(first.code);
        if (second) codes.add(second.code);
      });
      return codes;
    };

    const hasConflict = (subject, currentCodes) => {
      if (subject.code === 'CS' && currentCodes.has('IMEDIA')) return true;
      if (subject.code === 'IMEDIA' && currentCodes.has('CS')) return true;
      if (subject.code === 'DT' && currentCodes.has('CONST')) return true;
      if (subject.code === 'CONST' && currentCodes.has('DT')) return true;
      return false;
    };

    const addFirstChoice = (blockId, subject) => {
      if (usedFirstNames.has(subject.name)) return false;
      const codes = gatherCodes();
      if (hasConflict(subject, codes)) return false;
      newSels[blockId].first = subject;
      usedFirstNames.add(subject.name);
      return true;
    };

    const addSecondChoice = (blockId, subject) => {
      if (usedFirstNames.has(subject.name)) return false;
      if (usedSecondNames.has(subject.name)) return false;
      if (newSels[blockId].first?.id === subject.id) return false;
      const codes = gatherCodes();
      if (hasConflict(subject, codes)) return false;
      newSels[blockId].second = subject;
      usedSecondNames.add(subject.name);
      return true;
    };

    // Phase 1: Ensure at least one humanities first choice
    let humanitySet = false;
    for (const pref of filteredPrefs) {
      if (pref.code !== 'HUM') continue;
      for (const blockId of BLOCK_ORDER) {
        if (newSels[blockId].first) continue;
        const match = BLOCK_SUBJECTS[blockId].find(subject => subject.id === pref.id);
        if (match && addFirstChoice(blockId, match)) {
          humanitySet = true;
          break;
        }
      }
      if (humanitySet) break;
    }

    // Phase 2: Fill remaining first choices
    for (const pref of filteredPrefs) {
      for (const blockId of BLOCK_ORDER) {
        if (newSels[blockId].first) continue;
        const match = BLOCK_SUBJECTS[blockId].find(subject => subject.id === pref.id);
        if (match && addFirstChoice(blockId, match)) break;
      }
    }

    // Phase 3: Fill second choices with unique safety net
    for (const pref of filteredPrefs) {
      for (const blockId of BLOCK_ORDER) {
        if (newSels[blockId].second) continue;
        const match = BLOCK_SUBJECTS[blockId].find(subject => subject.id === pref.id);
        if (match && addSecondChoice(blockId, match)) break;
      }
    }

    setSelections(newSels);
  };

  const applyCareerFocus = (value) => {
    setCareerFocus(value);
    if (value === 'none') {
      setPrefList(SUBJECTS);
      return;
    }
    const priorityIds = CAREER_PRIORITIES[value] || [];
    const byPriority = new Map(priorityIds.map((id, idx) => [id, idx]));
    const sorted = [...SUBJECTS].sort((a, b) => {
      const aRank = byPriority.has(a.id) ? byPriority.get(a.id) : 999;
      const bRank = byPriority.has(b.id) ? byPriority.get(b.id) : 999;
      if (aRank !== bRank) return aRank - bRank;
      return a.name.localeCompare(b.name);
    });
    setPrefList(sorted);
  };

  const validation = useMemo(() => validateSelections(selections), [selections]);
  const blockStatus = useMemo(() => buildBlockStatus(validation.problems), [validation.problems]);
  const hasConflict = validation.problems.length > 0;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 relative overflow-hidden">
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-[#57b5e6]/35 blur-3xl" />
      <div className="absolute top-1/3 -left-32 h-72 w-72 rounded-full bg-[#14377d]/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#cd1543]/15 blur-3xl" />

      <div className="max-w-[1600px] mx-auto p-4 lg:p-10 space-y-10 relative">
        <header className="bg-gradient-to-r from-[#152458] via-[#14377d] to-[#57b5e6] text-white rounded-[32px] p-6 md:p-8 shadow-[0_30px_60px_-35px_rgba(15,23,42,0.7)]">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-white/10 rounded-3xl p-4 border border-white/10">
                <img src={logo} alt="Wellacre logo" className="h-20 w-auto" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-100 font-ui">Wellacre Academy</p>
                <h1 className="text-3xl md:text-4xl font-black font-display">Year 9 Options Picker</h1>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 w-full lg:w-auto">
              <div className="w-full max-w-sm">
                <div className="text-[10px] uppercase tracking-[0.25em] text-sky-100/80 text-right mb-2 font-ui">
                  Important dates
                </div>
                <div className="space-y-2">
                  {[
                    { label: '12th Feb - Progress evening', date: '2026-02-12' },
                    { label: '26th Feb - Form Submission', date: '2026-02-26' },
                    { label: '25th Sep - Change Deadline', date: '2026-09-25' }
                  ].map((item) => {
                    const now = new Date();
                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const target = new Date(`${item.date}T00:00:00`);
                    const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));
                    const countdown = diffDays === 0 ? 'today' : diffDays > 0 ? `${diffDays} days to go` : '';
                    return (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur text-[11px] text-white/80"
                      >
                        <div className="text-xs font-semibold text-white/90 font-ui">{item.label}</div>
                        {countdown && (
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/70 font-ui">{countdown}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-sm">
                <div
                  className={`flex-1 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest font-ui flex items-center justify-center gap-2 border-2 ${
                    validation.status === 'VALID'
                      ? 'bg-sky-400/20 border-sky-200 text-sky-100'
                      : validation.status === 'PROBLEM'
                        ? 'bg-amber-400/20 border-amber-300 text-amber-100'
                        : 'bg-rose-400/20 border-rose-300 text-rose-100'
                  }`}
                >
                  {validation.status === 'VALID' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  {validation.status === 'VALID' ? 'Complete' : 'Incomplete'}
                </div>
                <button
                  onClick={reset}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-xs font-black uppercase tracking-widest font-ui flex items-center justify-center gap-2"
                >
                  <Eraser size={16} /> Reset
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/90 backdrop-blur p-6 rounded-2xl border border-white/60 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.6)]">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#14377d]">
                <ShieldCheck size={16} /> Option rules at a glance
              </div>
              <ul className="mt-3 text-xs text-slate-600 space-y-2">
                <li>Pick a First and Second Choice in every block.</li>
                <li>First Choices must all be different.</li>
                <li>At least one First Choice must be History or Geography.</li>
                <li>Backups must be unique and not a First Choice elsewhere.</li>
                <li>Computer Science and Triple Science require subject leader approval.</li>
                <li>French may be compulsory for selected students (see your letter).</li>
              </ul>
            </div>
            <PreferencePanel
              sortedPrefList={sortedPrefList}
              excludedIds={excludedIds}
              prefList={prefList}
              onToggleExclude={toggleExclude}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onAutoOptimize={autoOptimize}
              errorMessage={hasAttempted ? errorMessage : ''}
              careerValue={careerFocus}
              careerOptions={CAREER_OPTIONS}
              onCareerChange={applyCareerFocus}
            />
          </div>

          <div className="lg:col-span-8 space-y-8">
            {hasConflict && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                <UserCog className="text-amber-600 shrink-0" size={32} />
                <div>
                  <h3 className="text-amber-900 font-black text-lg">Action Required: Unique Safety Net Issue</h3>
                  <p className="text-amber-800 text-sm mt-1">
                    One or more Second Choices reuse a subject that is already a First Choice elsewhere. Update those backups to unique
                    subjects.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-[#14377d]" />
              <h2 className="text-2xl font-black font-display text-slate-900">Choose Your Subjects</h2>
            </div>

            <BlockGrid
              blockSubjects={BLOCK_SUBJECTS}
              selections={selections}
              blockStatus={blockStatus}
              getSortedSubjectsInBlock={getSortedSubjectsInBlock}
              isSubjectDisabled={isSubjectDisabled}
              onSelect={handleSelect}
            />

            <SummaryPanel
              selections={selections}
              blockStatus={blockStatus}
              status={validation.status}
              errors={hasAttempted ? validation.errors : []}
              problems={hasAttempted ? validation.problems : []}
              warnings={hasAttempted ? validation.warnings : []}
              optimizationNotes={hasAttempted ? validation.optimizationNotes : []}
            />
          </div>
        </div>

        <SubjectPages subjects={SUBJECT_PAGES} />

        <footer className="flex flex-col items-center gap-5 pb-8 text-center">
          <p className="max-w-3xl text-xs text-slate-500">
            This site is not affiliated with Wellacre Academy. It is a third-party website for information purposes only. Any
            information around subjects or option choices should be directed to Wellacre Academy directly.
          </p>
          <a
            href="https://www.wellacre.org"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[#14377d] underline-offset-4 hover:underline"
          >
            Wellacre Academy
          </a>
          <a
            href="https://buymeacoffee.com/chasewebdesign"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-sky-200/60 bg-white/80 px-6 py-2.5 text-xs font-black uppercase tracking-widest font-ui text-[#14377d] shadow-[0_12px_28px_-18px_rgba(15,23,42,0.65)] transition hover:-translate-y-0.5 hover:border-sky-200/80 hover:bg-gradient-to-r hover:from-[#152458] hover:via-[#14377d] hover:to-[#57b5e6] hover:text-white hover:shadow-[0_18px_36px_-18px_rgba(20,55,125,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#152458] text-[10px] font-black text-white transition group-hover:bg-white group-hover:text-[#14377d]">
              ☕
            </span>
            Buy me a coffee
          </a>
        </footer>
      </div>
    </div>
  );
}
