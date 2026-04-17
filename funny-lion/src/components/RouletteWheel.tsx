"use client";

import { useEffect, useRef } from "react";
import { RouletteItem } from "@/types/roulette";

interface Props {
  items: RouletteItem[];
  currentAngle: number;
  resultIndex: number | null;
}

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#1a1a2e" : "#ffffff";
}

function drawWheel(
  canvas: HTMLCanvasElement,
  items: RouletteItem[],
  angle: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const size = canvas.width;
  const cx = size / 2;
  const cy = size / 2;
  const radius = cx - 8;
  const segmentAngle = (2 * Math.PI) / items.length;

  ctx.clearRect(0, 0, size, size);

  // 외곽 그림자 원
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 6, 0, 2 * Math.PI);
  ctx.fillStyle = "#1e293b";
  ctx.fill();
  ctx.restore();

  items.forEach((item, i) => {
    const startAngle = angle + i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    // 세그먼트 채우기
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();

    // 세그먼트 테두리
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 텍스트
    const midAngle = startAngle + segmentAngle / 2;
    const textRadius = radius * 0.67;
    const tx = cx + textRadius * Math.cos(midAngle);
    const ty = cy + textRadius * Math.sin(midAngle);

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(midAngle + Math.PI / 2);
    ctx.fillStyle = getTextColor(item.color);
    ctx.font = "bold 12px 'Noto Sans KR', 'Malgun Gothic', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 3;
    ctx.fillText(item.label, 0, 0);
    ctx.restore();
  });

  // 외곽 링
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // 중앙 허브 그림자
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, 2 * Math.PI);
  ctx.fillStyle = "#0f172a";
  ctx.fill();
  ctx.restore();

  // 중앙 허브 테두리
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 중앙 점
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fill();
}

export default function RouletteWheel({ items, currentAngle, resultIndex }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        drawWheel(canvas, items, currentAngle);
      });
    } else {
      drawWheel(canvas, items, currentAngle);
    }
  }, [items, currentAngle]);

  // 결과 세그먼트 하이라이트
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || resultIndex === null) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const radius = cx - 8;
    const segmentAngle = (2 * Math.PI) / items.length;

    const startAngle = currentAngle + resultIndex * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.restore();
  }, [resultIndex, currentAngle, items]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* 외곽 장식 링 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-500/20 blur-xl" />

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={480}
          height={480}
          className="block"
        />

        {/* 포인터 (오른쪽 중앙 고정 삼각형) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
          <div
            className="drop-shadow-lg"
            style={{
              width: 0,
              height: 0,
              borderTop: "14px solid transparent",
              borderBottom: "14px solid transparent",
              borderRight: "30px solid #ef4444",
              filter: "drop-shadow(0 0 6px rgba(239,68,68,0.8))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
