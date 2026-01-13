export interface ModuleParameter {
  [key: number]: { bytes: ModuleParameterBytes; values: ModuleParameterValues };
}

interface ModuleParameterBytes {
  [key: number]: number;
}

interface ModuleParameterValues {
  [key: number]: { identifier: number; bytes: ModuleParameterBytes };
}
