import React from 'react';
import { BookOpen, GraduationCap, ClipboardList, Sparkles } from 'lucide-react';

export default function SubjectPages({ subjects }) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Subject Pages</p>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display">Explore Every Option</h2>
        <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
          Each page summarises what the course covers, how it is assessed, and where it can lead. Use this to compare
          subjects before making your choices.
        </p>
      </div>

      <div className="space-y-8">
        {subjects.map((subject) => (
          <article
            key={subject.id}
            className="bg-white/90 backdrop-blur border border-white/60 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.45)] rounded-[32px] p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#57b5e6]">
                <Sparkles size={14} /> {subject.board}
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-display">{subject.title}</h3>
              <div className="text-sm text-slate-600">
                <p className="font-semibold">Subject Leader</p>
                <p>{subject.leader}</p>
              </div>
              {subject.notes && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
                  {subject.notes}
                </div>
              )}
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <BookOpen size={16} className="text-[#14377d]" /> Course Snapshot
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{subject.overview}</p>
                <ul className="text-sm text-slate-600 space-y-2">
                  {subject.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#57b5e6]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <ClipboardList size={16} className="text-[#14377d]" /> Assessment
                  </div>
                  <ul className="mt-2 text-sm text-slate-600 space-y-2">
                    {subject.assessment.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <GraduationCap size={16} className="text-[#14377d]" /> Pathways
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{subject.careers}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
