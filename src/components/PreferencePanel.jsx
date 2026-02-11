import React from 'react';
import { EyeOff, Eye, GripVertical, Wand2, AlertTriangle, Target } from 'lucide-react';

export default function PreferencePanel({
  sortedPrefList,
  excludedIds,
  prefList,
  onToggleExclude,
  onDragStart,
  onDragOver,
  onAutoOptimize,
  errorMessage,
  careerValue,
  careerOptions,
  onCareerChange
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <GripVertical className="text-slate-400" /> Subject Priorities
      </h2>
      <p className="text-xs text-slate-500 mb-6">
        Drag to rank your preferred subjects. 
      </p>

      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-widest flex items-center gap-2 mb-2">
          <Target size={14} className="text-[#14377d]" /> Future Career Focus
        </label>
        <select
          value={careerValue}
          onChange={(e) => onCareerChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#57b5e6]"
        >
          {careerOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-[11px] text-slate-500">
          Choosing a focus will reshuffle priorities to highlight subjects that match that pathway.
        </p>
      </div>

      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {sortedPrefList.map((item, idx) => {
          const isExcluded = excludedIds.has(item.id);
          const originalRank = prefList.findIndex(p => p.id === item.id) + 1;

          return (
            <div
              key={item.id}
              draggable={!isExcluded}
              onDragStart={() => onDragStart(idx)}
              onDragOver={(e) => onDragOver(e, idx)}
              className={`flex items-center gap-3 p-3 border rounded-xl transition-all group
                ${isExcluded
                  ? 'bg-slate-50 border-slate-100 opacity-50 grayscale'
                  : 'bg-white border-slate-200 cursor-move hover:border-blue-300 shadow-sm'}`}
            >
              <span className="text-[10px] font-black text-slate-300 w-4">{isExcluded ? '-' : originalRank}</span>
              <GripVertical size={14} className={isExcluded ? 'text-slate-200' : 'text-slate-300'} />
              <span className={`text-sm font-semibold flex-grow truncate ${isExcluded ? 'line-through text-slate-400' : ''}`}>
                {item.name}
              </span>
              <button
                onClick={() => onToggleExclude(item.id)}
                className={`p-1.5 rounded-lg transition-colors ${isExcluded ? 'text-slate-400 hover:text-blue-600' : 'text-slate-300 hover:text-red-500'}`}
              >
                {isExcluded ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={onAutoOptimize}
        className="w-full mt-6 bg-[#003366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-900 shadow-lg transition-all active:scale-95"
      >
        <Wand2 size={20} /> Auto-Allocate
      </button>

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-700 text-xs font-bold">
          <AlertTriangle size={16} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
