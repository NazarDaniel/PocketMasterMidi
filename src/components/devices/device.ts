import type { PedalsPreset } from './sonicake-pocket-master/models/pedals-preset';

export interface DeviceInterface {
  name: string;
  preampPresets: object;
  loadDefaults(): void;
  loadPedalsPreset(id: string | number): void;
  loadPreampPreset(id: string | number): void;
}

export abstract class Device {
  public name: string;
  public preampPresets: object[];
  public pedalsPresets: PedalsPreset[];

  constructor(name: string) {
    this.name = name;
    this.preampPresets = [];
    this.pedalsPresets = [];
  }
}
