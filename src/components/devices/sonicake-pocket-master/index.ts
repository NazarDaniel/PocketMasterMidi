import { Device, type DeviceInterface } from '../device';
import { nr } from './nr';
import preampPresets from './default-preamp-presets';
import pedalsPresets from './default-pedals-presets';
import type { bytesDefinition } from './models/bytes-definition';
import type { PedalsPreset } from './models/pedals-preset';
import { fx1 } from './fx1';

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
    fx1: new fx1(),
  };

  loadDefaults() {
    this.preampPresets = preampPresets;
    this.pedalsPresets = pedalsPresets;
  }

  loadPreampPreset(id: string | number) {
    console.log('loadPreampPreset');
  }

  async loadPedalsPreset(id: string | number) {
    const preset: PedalsPreset | undefined = this.pedalsPresets.find((p) => p.id === id);
    if (!preset) {
      return;
    }
    const moduleNames = Object.keys(this.modules);
    // moduleNames.forEach((moduleName) => {
    for (const moduleName of moduleNames) {
      const moduleData = preset[moduleName as keyof SonicakePocketMasterDeviceModules];
      if (!moduleData) {
        continue;
      }

      // process module state
      const stateSysex = this.getStateSysex(preset, moduleName);
      if (stateSysex && 'byteArray' in stateSysex && 'sysexIdentifier' in stateSysex) {
        await this.sendSysex(stateSysex.byteArray, stateSysex.sysexIdentifier);
      }

      // process module parameters
      const parameterSysexes = this.getParameterSysexes(preset, moduleName);
      if (!parameterSysexes) {
        continue;
      }
      for (const sysexMessage of parameterSysexes) {
        await this.sendSysex(sysexMessage.byteArray, sysexMessage.sysexIdentifier);
      }
    }
  }

  getParameterSysexes(preset: PedalsPreset, moduleName: string) {
    const module = this.modules[moduleName as keyof typeof this.modules];
    const moduleData = preset[moduleName as keyof SonicakePocketMasterDeviceModules];
    if (!module || !moduleData || !moduleData.params) {
      return [];
    }
    const results: { sysexIdentifier: number; byteArray: number[] }[] = [];
    const presetModuleParams = moduleData.params;
    const paramKeys = Object.keys(presetModuleParams).map(Number);
    paramKeys.forEach((paramKey: number) => {
      const moduleParam = module.params[paramKey as keyof typeof module.params];
      if (!moduleParam || !(paramKey in presetModuleParams)) {
        return;
      }
      const value = presetModuleParams[paramKey];
      const moduleParamValueDef = moduleParam.values[value as keyof typeof moduleParam.values];
      if (
        !moduleParamValueDef ||
        !('identifier' in moduleParamValueDef) ||
        !('bytes' in moduleParamValueDef)
      ) {
        return;
      }
      const sysexIdentifier = moduleParamValueDef.identifier;
      const bytes = Object.assign({}, moduleParamValueDef.bytes, moduleParam.bytes);
      const byteArray = SonicakePocketMasterDevice.buildByteArray(bytes);

      results.push({ byteArray, sysexIdentifier });
    });

    return results;
  }

  getStateSysex(preset: PedalsPreset, moduleName: string) {
    const moduleData = preset[moduleName as keyof SonicakePocketMasterDeviceModules];
    if (!moduleData || !moduleData.state) {
      return;
    }
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
    const bytes = moduleStateDefinition.bytes;
    const byteArray = SonicakePocketMasterDevice.buildByteArray(bytes);

    let sysexIdentifier = 0;
    if ('sysex_identifier' in moduleStateDefinition) {
      sysexIdentifier = moduleStateDefinition.sysex_identifier;
    }
    return { byteArray, sysexIdentifier };
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
  fx1: fx1;
}
