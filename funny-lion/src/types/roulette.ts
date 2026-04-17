export interface RouletteItem {
  id: number;
  label: string;
  defaultLabel: string;
  color: string;
}

export interface RouletteState {
  items: RouletteItem[];
  isSpinning: boolean;
  resultIndex: number | null;
  currentAngle: number;
}

export type RouletteAction =
  | { type: "UPDATE_LABEL"; id: number; label: string }
  | { type: "RESET_LABELS" }
  | { type: "SET_ANGLE"; angle: number }
  | { type: "SET_SPINNING"; isSpinning: boolean }
  | { type: "SET_RESULT"; index: number | null };
