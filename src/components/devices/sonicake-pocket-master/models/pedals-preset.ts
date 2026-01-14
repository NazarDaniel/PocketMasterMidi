export interface PedalsPreset {
  id: number | string;
  nr?: NR;
  fx1?: FX1;
  drive?: object;
  eq?: object;
  fx2?: object;
  delay?: object;
  reverb?: object;
}

interface NR {
  state: string;
  params?: PresetParam;
}

interface FX1 {
  state: string;
  params?: PresetParam;
}

export interface PresetParam {
  [key: number]: number;
}
