import { Device, type DeviceInterface } from '../device';
import { nr } from './nr';
import preampPresets from './preamp-presets';
import pedalsPresets from './pedals-presets';

export class SonicakePocketMasterDevice extends Device implements DeviceInterface {
  modules = {
    nr,
  };

  loadDefaults() {
    this.preampPresets = preampPresets;
    this.pedalsPresets = pedalsPresets;
  }

  loadPreampPreset(id: string | number) {
    console.log('a');
  }

  loadPedalsPreset(id: string | number) {
    const preset = this.pedalsPresets.find((p) => p.id === id);
    if (!preset) {
      return;
    }
    const moduleNames = Object.keys(this.modules);
    moduleNames.forEach((m) => {
      const moduleData = preset[m as keyof typeof preset];
      if (!moduleData) {
        return;
      }
      console.log(moduleData);
      if (moduleData['state' as keyof typeof moduleData]) {
        const stateDefinitions = this.modules[m as keyof typeof this.modules];
        console.log(stateDefinitions);
        const bytes = stateDefinitions['bytes' as keyof typeof stateDefinitions];
        const byteArray = SonicakePocketMasterDevice.buildArray(bytes);
        // TODO: write the method and pass it back to the MIDI interface
      }
    });
  }

  static buildArray(bytesValues: object) {}
}
