"use client";

import { useEffect, useState } from "react";
import { RouletteItem } from "@/types/roulette";

interface Props {
  isSpinning: boolean;
  resultIndex: number | null;
  items: RouletteItem[];
  onSpin: () => void;
}

export default function SpinButton({ isSpinning, resultIndex, items, onSpin }: Props) {
  const [showResult, setShowResult] = useState(false);
  const [prevResult, setPrevResult] = useState<number | null>(null);

  useEffect(() => {
    if (resultIndex !== null && resultIndex !== prevResult) {
      setPrevResult(resultIndex);
      setShowResult(true);
    }
  }, [resultIndex, prevResult]);

  const resultItem = resultIndex !== null ? items[resultIndex] : null;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* SPIN 버튼 */}
      <button
        onClick={onSpin}
        disabled={isSpinning}
        className={`
          relative group
          w-40 py-4 rounded-2xl
          text-lg font-bold tracking-widest
          transition-all duration-200
          ${isSpinning
            ? "bg-slate-700 text-slate-500 cursor-not-allowed scale-95"
            : "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
          }
        `}
      >
        {isSpinning ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            SPINNING
          </span>
        ) : (
          <span>SPIN!</span>
        )}

        {/* 버튼 빛나는 효과 */}
        {!isSpinning && (
          <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        )}
      </button>

      {/* 결과 표시 */}
      <div
        className={`
          transition-all duration-500
          ${showResult && resultItem
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
      >
        {showResult && resultItem && (
          <div className="relative">
            {/* 배경 글로우 */}
            <div
              className="absolute inset-0 rounded-2xl blur-xl opacity-40"
              style={{ backgroundColor: resultItem.color }}
            />

            {/* 결과 카드 */}
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl px-6 py-4 text-center min-w-[200px]">
              <p className="text-xs text-slate-400 mb-1 tracking-widest uppercase">Result</p>
              <div className="flex items-center justify-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: resultItem.color }}
                />
                <p className="text-2xl font-black text-white">{resultItem.label}</p>
              </div>
              <p className="text-xs text-slate-500">당첨을 축하합니다!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
