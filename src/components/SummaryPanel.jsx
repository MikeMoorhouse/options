import React from 'react';
import { ListChecks, AlertTriangle, Sparkles, UserCheck, CheckCircle2, XCircle } from 'lucide-react';

export default function SummaryPanel({ selections, blockStatus, status, errors, problems, warnings, optimizationNotes }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-display">Guidance</h2>
          <p className="text-sm text-slate-600 mt-2">
            We want every student to have strong first choices and safe backups. Follow the steps below to reach a VALID status.
          </p>
        </div>

        {(errors.length > 0 || problems.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {errors.length > 0 && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <AlertTriangle size={16} /> Please fix these
                </div>
                <ul className="mt-3 text-sm text-rose-700 space-y-2">
                  {errors.map((error, idx) => (
                    <li key={`${error}-${idx}`}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            {problems.length > 0 && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <AlertTriangle size={16} /> Almost there
                </div>
                <ul className="mt-3 text-sm text-amber-800 space-y-2">
                  {problems.map((problem, idx) => (
                    <li key={`${problem.blockId}-${idx}`}>Block {problem.blockId}: {problem.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {warnings.length > 0 && (
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
            <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
              <UserCheck size={16} /> Warnings
            </div>
            <ul className="mt-3 text-sm text-sky-800 space-y-2">
              {warnings.map((warning, idx) => (
                <li key={`${warning}-${idx}`}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {optimizationNotes.length > 0 && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Sparkles size={16} /> Optional improvements
            </div>
            <ul className="mt-3 text-sm text-emerald-800 space-y-2">
              {optimizationNotes.map((note, idx) => (
                <li key={`${note}-${idx}`}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-700">
          <ListChecks className="text-blue-600" /> Selection Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(selections).map(([block, data]) => (
          <div key={block} className="space-y-4">
            <div
              className={`p-4 rounded-2xl border-2 transition-all shadow-sm ${
                data.first ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-dashed border-slate-200'
              }`}
            >
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Block {block} 1st</span>
              <span className={`text-xs font-bold ${data.first ? 'text-green-800' : 'text-slate-300 italic'}`}>
                {data.first ? data.first.name : 'None selected'}
              </span>
            </div>
            <div
              className={`p-4 rounded-2xl border-2 transition-all shadow-sm ${
                data.second ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-dashed border-slate-200'
              } ${blockStatus[block] ? 'border-red-500 animate-pulse' : ''}`}
            >
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Block {block} 2nd</span>
              <span
                className={`text-xs font-bold ${
                  data.second ? (blockStatus[block] ? 'text-red-600' : 'text-amber-800') : 'text-slate-300 italic'
                }`}
              >
                {data.second ? data.second.name : 'None selected'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        {status === 'VALID' ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-50 text-emerald-800 rounded-2xl font-black text-base border border-emerald-200">
            <CheckCircle2 size={18} /> Complete
          </div>
        ) : (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-rose-50 text-rose-800 rounded-2xl font-black text-base border border-rose-200">
            <XCircle size={18} /> Incomplete
          </div>
        )}
      </div>
    </div>
  );
}
