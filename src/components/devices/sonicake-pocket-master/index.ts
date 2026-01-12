import { Device, type DeviceInterface } from '../device';
import { nr } from './nr';
import preampPresets from './default-preamp-presets';
import pedalsPresets from './default-pedals-presets';
import type { bytesDefinition } from './models/bytes-definition';
import type { PedalsPreset } from './models/pedals-preset';
import type { moduleStateDefinition } from './models/module-state-definition';

export class SonicakePocketMasterDevice extends Device implements DeviceInterface {
  public preampPresets: object[];
  public pedalsPresets: PedalsPreset[];

  constructor(name: string) {
    super(name);
    this.preampPresets = [];
    this.pedalsPresets = [];
  }
  modules: SonicakePocketMasterDeviceModules = {
    nr: new nr(),
  };

  loadDefaults() {
    this.preampPresets = preampPresets;
    this.pedalsPresets = pedalsPresets;
  }

  loadPreampPreset(id: string | number) {
    console.log('loadPreampPreset');
  }

  loadPedalsPreset(id: string | number) {
    const preset = this.pedalsPresets.find((p) => p.id === id);
    if (!preset) {
      return;
    }
    const moduleNames = Object.keys(this.modules);
    moduleNames.forEach((moduleName) => {
      const moduleData = preset[moduleName as keyof SonicakePocketMasterDeviceModules];
      if (!moduleData) {
        return;
      }
      if (moduleData.state) {
        const moduleStateDefinitions =
          this.modules[moduleName as keyof SonicakePocketMasterDeviceModules];
        if (!moduleStateDefinitions) {
          return;
        }

        const moduleStateDefinition = moduleStateDefinitions.states.find(
          (s: { state: string }) => s.state === moduleData.state,
        );

        if (!moduleStateDefinition) {
          return;
        }

        this.sendStateSysex(moduleStateDefinition);
      }
    });
  }

  sendStateSysex(moduleStateDefinition: moduleStateDefinition) {
    const bytes = moduleStateDefinition.bytes;
    const byteArray = SonicakePocketMasterDevice.buildByteArray(bytes);

    let sysexIdentifier = 0;
    if ('sysex_identifier' in moduleStateDefinition) {
      sysexIdentifier = moduleStateDefinition.sysex_identifier;
    }
    this.sendSysex(byteArray, sysexIdentifier);
  }

  static buildByteArray(bytesValues: bytesDefinition) {
    const positions = Object.keys(bytesValues).map(Number);
    const max = Math.max(...positions);
    const result = [];
    for (let i = 0; i <= max; i++) {
      let value = bytesValues[i as keyof bytesDefinition];
      if (!value) {
        value = 0;
      }
      result.push(value);
    }
    return result;
  }
}

interface SonicakePocketMasterDeviceModules {
  nr: nr;
}
