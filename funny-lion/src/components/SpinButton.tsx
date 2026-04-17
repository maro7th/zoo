"use client";

import { useEffect, useState } from "react";
import { RouletteItem } from "@/types/roulette";

interface Props {
  isSpinning: boolean;
  resultIndex: number | null;
  items: RouletteItem[];
  onSpin: () => void;
}

const JOKES = [
  "돈이 없으면 은행에 가세요. 근데 거기도 없대요.",
  "복권 1등 당첨 확률은 벼락 맞을 확률보다 낮습니다. 오늘 천둥 쳤나요?",
  "이 룰렛의 1억원 확률은 제 월급 인상 확률과 비슷합니다.",
  "돈은 나무에서 자라지 않습니다. 룰렛에서도 잘 안 자랍니다.",
  "1원도 모으면 1억이 됩니다. 1억 번만 더 모으세요.",
  "오늘 운이 좋다고 느끼시나요? 그 느낌, 틀렸을 수도 있습니다.",
  "부자가 되는 법: 룰렛 말고 다른 방법을 찾으세요.",
  "제 통장 잔고도 이 룰렛처럼 빙글빙글 돌다가 사라집니다.",
  "1억원이 나와도 세금 내면 절반입니다. 그래도 도세요.",
  "행운은 준비된 자에게 옵니다. 그냥 저는 안 왔습니다.",
  "이 룰렛, 조작 없습니다. 그냥 운이 나쁜 겁니다.",
  "꽝이 나와도 경험은 쌓입니다. 아무짝에도 쓸모없는 경험이요.",
  "돈이 행복을 사줄 순 없지만, 슬프게 사는 것보단 낫습니다.",
  "오늘 점심값이라도 나오면 감사한 거입니다.",
  "룰렛을 믿지 마세요. 근데 한 번만 더 해보세요.",
  "어제 1원 나온 분, 오늘은 20원입니다. 20배 상승!",
  "인생은 룰렛 같습니다. 근데 리셋 버튼이 없습니다.",
  "이 앱 만든 사람도 부자 아닙니다. 같이 힘냅시다.",
  "당신의 운을 응원합니다. 믿지는 않지만요.",
  "50만원 이상 나오면 저한테 밥 한번 사주세요.",
];

function getRandomJoke(): string {
  return JOKES[Math.floor(Math.random() * JOKES.length)];
}

export default function SpinButton({ isSpinning, resultIndex, items, onSpin }: Props) {
  const [showResult, setShowResult] = useState(false);
  const [prevResult, setPrevResult] = useState<number | null>(null);
  const [joke, setJoke] = useState<string>("");

  useEffect(() => {
    if (resultIndex !== null && resultIndex !== prevResult) {
      setPrevResult(resultIndex);
      setShowResult(true);
      setJoke(getRandomJoke());
    }
  }, [resultIndex, prevResult]);

  const resultItem = resultIndex !== null ? items[resultIndex] : null;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 스핀 버튼 */}
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
            돌아가는 중...
          </span>
        ) : (
          <span>돌려돌려!</span>
        )}

        {/* 버튼 빛나는 효과 */}
        {!isSpinning && (
          <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        )}
      </button>

      {/* 결과 표시 */}
      <div
        className={`
          transition-all duration-500 flex flex-col items-center gap-3
          ${showResult && resultItem
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
      >
        {showResult && resultItem && (
          <>
            {/* 결과 카드 */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-40"
                style={{ backgroundColor: resultItem.color }}
              />
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

            {/* 농담 */}
            <p className="text-xs text-slate-500 italic text-center max-w-[260px] leading-relaxed">
              💬 {joke}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
