"use client";

import { RouletteItem } from "@/types/roulette";
import EditItem from "./EditItem";

interface Props {
  items: RouletteItem[];
  onUpdateLabel: (id: number, label: string) => void;
  onReset: () => void;
}

export default function EditPanel({ items, onUpdateLabel, onReset }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
      {/* 헤더 */}
      <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-200">항목 편집</h2>
        </div>
        <span className="text-xs text-slate-500">{items.length}개</span>
      </div>

      {/* 항목 목록 */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {items.map((item, index) => (
          <EditItem
            key={item.id}
            item={item}
            index={index}
            onChange={onUpdateLabel}
          />
        ))}
      </div>

      {/* 하단 초기화 버튼 */}
      <div className="px-4 py-3 border-t border-slate-700/50">
        <button
          onClick={onReset}
          className="
            w-full py-2 px-4 rounded-lg
            text-sm font-medium
            text-slate-400 bg-slate-800/50 border border-slate-600/40
            hover:text-white hover:bg-slate-700/50 hover:border-slate-500
            active:scale-95
            transition-all duration-150
          "
        >
          기본값으로 초기화
        </button>
      </div>
    </div>
  );
}
