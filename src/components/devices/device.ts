import type { Input, MessageEvent, Output } from 'webmidi';

export interface DeviceInterface {
  name: string;
  preampPresets: object;
  loadDefaults(): void;
  loadPedalsPreset(id: string | number): Promise<void>;
  loadPreampPreset(id: string | number): void;
}

export abstract class Device {
  public name: string;
  public midiInput?: Input;
  public midiOutput?: Output;

  constructor(name: string) {
    this.name = name;
  }

  async sendSysex(byteArray: number[], identifier?: number): Promise<void> {
    if (!this.midiOutput || byteArray.length === 0) {
      return;
    }
    if (!identifier) {
      identifier = 0;
    }
    this.midiOutput.sendSysex(identifier, byteArray);
    return await new Promise((r) => setTimeout(r, 10));
  }

  setMidiInput(input: Input) {
    if (this.midiInput) {
      this.midiInput.removeListener();
    }
    if (input === null) {
      return;
    }
    this.midiInput = input;
    if (!this.midiInput) {
      return;
    }
    this.midiInput.addListener('sysex', (e: MessageEvent) => {
      console.log('Sysex received', e);
    });
  }

  setMidiOutput(output: Output) {
    if (!output) {
      return;
    }
    this.midiOutput = output;
    if (!this.midiOutput) {
      return;
    }
  }
}
