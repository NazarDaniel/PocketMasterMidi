export interface PedalsPreset {
  id: number | string;
  nr?: NR;
  fx1?: object;
  drive?: object;
  eq?: object;
  fx2?: object;
  delay?: object;
  reverb?: object;
}

interface NR {
  state: string;
}
