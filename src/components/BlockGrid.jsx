import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function BlockGrid({
  blockSubjects,
  selections,
  blockStatus,
  getSortedSubjectsInBlock,
  isSubjectDisabled,
  onSelect
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.keys(blockSubjects).map((blockId) => (
        <div
          key={blockId}
          className={`rounded-[28px] border transition-all overflow-hidden flex flex-col h-fit shadow-[0_20px_50px_-40px_rgba(15,23,42,0.5)] ${
            blockStatus[blockId] ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/40' : 'border-white/70 bg-white/90 backdrop-blur'
          }`}
        >
          <div
            className={`${
              blockStatus[blockId] ? 'bg-rose-600' : 'bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900'
            } text-white py-3 px-4 text-center text-[10px] font-black uppercase tracking-[0.35em]`}
          >
            Block {blockId}
          </div>
          <div className="p-2.5 space-y-2 flex-grow">
            {getSortedSubjectsInBlock(blockId).map((subject) => {
              const isFirst = selections[blockId].first?.id === subject.id;
              const isSecond = selections[blockId].second?.id === subject.id;
              const isDisabled = isSubjectDisabled(blockId, subject);

              return (
                <button
                  key={subject.id}
                  disabled={isDisabled}
                  onClick={() => onSelect(blockId, subject)}
                  className={`w-full text-left p-3 rounded-2xl text-xs font-semibold transition-all border flex justify-between items-center relative
                    ${
                      isFirst
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg scale-[1.02] z-10'
                        : isSecond
                          ? 'bg-amber-400 border-amber-300 text-slate-900 shadow-md'
                          : isDisabled
                            ? 'bg-slate-100 text-slate-300 border-transparent opacity-50 cursor-not-allowed'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/40'
                    }
                  `}
                >
                  <span className="truncate pr-2">{subject.name}</span>
                  {isFirst && <CheckCircle2 size={14} className="shrink-0" />}
                  {isSecond && <div className="w-3 h-3 bg-white rounded-full shrink-0" />}
                </button>
              );
            })}
            {blockStatus[blockId] && (
              <div className="mt-2 p-2 bg-red-50 text-red-700 text-[10px] font-black uppercase leading-tight">
                {blockStatus[blockId]}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
