"use client";

import dynamic from "next/dynamic";
import { useRoulette } from "@/hooks/useRoulette";
import EditPanel from "@/components/EditPanel";
import SpinButton from "@/components/SpinButton";

// Canvas는 SSR 제외
const RouletteWheel = dynamic(() => import("@/components/RouletteWheel"), {
  ssr: false,
  loading: () => (
    <div className="w-[480px] h-[480px] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
    </div>
  ),
});

export default function Home() {
  const { items, isSpinning, resultIndex, currentAngle, spin, updateLabel, resetLabels } =
    useRoulette();

  return (
    <main className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* 헤더 */}
        <header className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">
              🎰
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-none">Lucky Roulette</h1>
              <p className="text-xs text-slate-500 mt-0.5">행운의 룰렛</p>
            </div>
          </div>
          <div className="text-xs text-slate-600 font-mono">16 segments</div>
        </header>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 p-6 w-full max-w-5xl">

            {/* 룰렛 + 버튼 섹션 */}
            <div className="flex flex-col items-center gap-6 flex-shrink-0">
              <RouletteWheel
                items={items}
                currentAngle={currentAngle}
                resultIndex={resultIndex}
              />
              <SpinButton
                isSpinning={isSpinning}
                resultIndex={resultIndex}
                items={items}
                onSpin={spin}
              />
            </div>

            {/* 편집 패널 */}
            <div className="w-full lg:w-72 lg:max-h-[600px] flex-shrink-0">
              <EditPanel
                items={items}
                onUpdateLabel={updateLabel}
                onReset={resetLabels}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
