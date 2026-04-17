"use client";

import { RouletteItem } from "@/types/roulette";

interface Props {
  item: RouletteItem;
  index: number;
  onChange: (id: number, label: string) => void;
}

export default function EditItem({ item, index, onChange }: Props) {
  return (
    <div className="flex items-center gap-2.5 py-1">
      {/* 색상 인디케이터 */}
      <div
        className="w-3.5 h-3.5 rounded-full flex-shrink-0 ring-1 ring-white/20"
        style={{ backgroundColor: item.color }}
      />
      {/* 순번 */}
      <span className="text-slate-500 text-xs w-5 text-right flex-shrink-0 font-mono">
        {index + 1}
      </span>
      {/* 편집 input */}
      <input
        type="text"
        value={item.label}
        onChange={(e) => onChange(item.id, e.target.value)}
        maxLength={12}
        className="
          flex-1 min-w-0
          bg-slate-800/60 border border-slate-600/50
          rounded-md px-2.5 py-1
          text-sm text-white
          placeholder-slate-500
          focus:outline-none focus:border-indigo-400/70 focus:bg-slate-800
          transition-all duration-150
          hover:border-slate-500
        "
      />
    </div>
  );
}
