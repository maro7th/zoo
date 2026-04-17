"use client";

import { useReducer, useCallback, useRef, useEffect } from "react";
import { RouletteItem, RouletteState, RouletteAction } from "@/types/roulette";

const INITIAL_ITEMS: RouletteItem[] = [
  { id: 0,  label: "1원",       defaultLabel: "1원",       color: "#FF6B6B" },
  { id: 1,  label: "20원",      defaultLabel: "20원",      color: "#FF8E53" },
  { id: 2,  label: "50원",      defaultLabel: "50원",      color: "#FFA726" },
  { id: 3,  label: "100원",     defaultLabel: "100원",     color: "#FFCA28" },
  { id: 4,  label: "200원",     defaultLabel: "200원",     color: "#D4E157" },
  { id: 5,  label: "500원",     defaultLabel: "500원",     color: "#66BB6A" },
  { id: 6,  label: "1,000원",   defaultLabel: "1,000원",   color: "#26A69A" },
  { id: 7,  label: "2,000원",   defaultLabel: "2,000원",   color: "#29B6F6" },
  { id: 8,  label: "5,000원",   defaultLabel: "5,000원",   color: "#42A5F5" },
  { id: 9,  label: "1만원",     defaultLabel: "1만원",     color: "#5C6BC0" },
  { id: 10, label: "2만원",     defaultLabel: "2만원",     color: "#7E57C2" },
  { id: 11, label: "5만원",     defaultLabel: "5만원",     color: "#AB47BC" },
  { id: 12, label: "10만원",    defaultLabel: "10만원",    color: "#EC407A" },
  { id: 13, label: "50만원",    defaultLabel: "50만원",    color: "#EF5350" },
  { id: 14, label: "1,000만원", defaultLabel: "1,000만원", color: "#B71C1C" },
  { id: 15, label: "1억원",     defaultLabel: "1억원",     color: "#880E4F" },
];

const INITIAL_STATE: RouletteState = {
  items: INITIAL_ITEMS,
  isSpinning: false,
  resultIndex: null,
  currentAngle: 0,
};

function reducer(state: RouletteState, action: RouletteAction): RouletteState {
  switch (action.type) {
    case "UPDATE_LABEL":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, label: action.label } : item
        ),
      };
    case "RESET_LABELS":
      return {
        ...state,
        items: state.items.map((item) => ({ ...item, label: item.defaultLabel })),
      };
    case "SET_ANGLE":
      return { ...state, currentAngle: action.angle };
    case "SET_SPINNING":
      return { ...state, isSpinning: action.isSpinning };
    case "SET_RESULT":
      return { ...state, resultIndex: action.index };
    default:
      return state;
  }
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useRoulette() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const animFrameRef = useRef<number>(0);
  const startAngleRef = useRef<number>(0);
  const targetAngleRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const spin = useCallback(() => {
    if (state.isSpinning) return;

    const minRotation = Math.PI * 8;
    const maxRotation = Math.PI * 14;
    const extraRotation = minRotation + Math.random() * (maxRotation - minRotation);
    const targetAngle = state.currentAngle + extraRotation;

    const segmentAngle = (2 * Math.PI) / state.items.length;
    const normalizedAngle = (2 * Math.PI) - (targetAngle % (2 * Math.PI));
    const winIndex = Math.floor(normalizedAngle / segmentAngle) % state.items.length;

    const duration = 4000 + Math.random() * 2000;

    startAngleRef.current = state.currentAngle;
    targetAngleRef.current = targetAngle;
    startTimeRef.current = performance.now();
    durationRef.current = duration;

    dispatch({ type: "SET_SPINNING", isSpinning: true });
    dispatch({ type: "SET_RESULT", index: null });

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / durationRef.current, 1);
      const easedProgress = easeOut(progress);
      const currentAngle =
        startAngleRef.current +
        (targetAngleRef.current - startAngleRef.current) * easedProgress;

      dispatch({ type: "SET_ANGLE", angle: currentAngle });

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        dispatch({ type: "SET_ANGLE", angle: targetAngleRef.current });
        dispatch({ type: "SET_SPINNING", isSpinning: false });
        dispatch({ type: "SET_RESULT", index: winIndex });
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, [state.isSpinning, state.currentAngle, state.items.length]);

  const updateLabel = useCallback((id: number, label: string) => {
    dispatch({ type: "UPDATE_LABEL", id, label });
  }, []);

  const resetLabels = useCallback(() => {
    dispatch({ type: "RESET_LABELS" });
  }, []);

  return {
    items: state.items,
    isSpinning: state.isSpinning,
    resultIndex: state.resultIndex,
    currentAngle: state.currentAngle,
    spin,
    updateLabel,
    resetLabels,
  };
}
