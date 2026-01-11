<template>
  <q-card v-if="!Midi.enabled"> Midi disabled </q-card>
  <q-card v-if="Midi.enabled">
    <!-- status message -->
    <q-card-section class="row text-h5">Midi enabled</q-card-section>
    <!-- outputs -->
    <q-card-section>
      <div class="row text-h6"><div class="col-12">Output</div></div>
      <div class="row">
        <!-- output list -->
        <div class="col-4">
          <q-card-section v-for="(output, key) in Midi.outputs" :key="key">
            <q-btn @click="selectOutput(output as Output)">{{ output.name }}</q-btn>
          </q-card-section>
        </div>
        <!-- actions -->
        <div class="col-8">
          <q-btn @click="test()">Test</q-btn>
          <q-btn @click="loadPedalsPreset(2)">Load Pedals Preset 2</q-btn>
        </div>
      </div>
    </q-card-section>
    <!-- inputs -->
    <q-card-section>
      <div class="row text-h6">
        <div class="col-12">Input</div>
      </div>
      <div class="row">
        <div class="col-4">
          <q-card-section v-for="(input, key) in Midi.inputs" :key="key">
            <q-btn @click="selectInput(input as Input)">{{ input.name }}</q-btn>
          </q-card-section>
        </div>
        <div class="col-8">
          <h5>Logs:</h5>

          <div v-for="(midiEvent, key) in logs" :key="key">
            {{ midiEvent.message.rawDataBytes.BYTES_PER_ELEMENT }}<br />{{
              Array.from(midiEvent.message.rawDataBytes)
            }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { DeviceLoader } from 'src/components/devices/loader';
import { onMounted, ref } from 'vue';
import type { Input, MessageEvent, Output } from 'webmidi';
import { WebMidi } from 'webmidi';

const device = DeviceLoader.getInstance('SonicakePocketMaster');
device?.loadDefaults();

const loadPreampPreset = (presetName: string | number) => {
  device?.loadPreampPreset(presetName);
};

const loadPedalsPreset = (presetId: string | number) => {
  device?.loadPedalsPreset(presetId);
};

const test = () => {
  // recebe [ 2, 0,  1, 0, 0, 0, 10, 1,  2, 4, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  // manda    10, 0, 1, 0, 0, 0,  10, 1, 1, 4, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  // let str = '8080f0050a00010000000e0101040700020000000000000002000000000000020b000000000003f7';
  // let str = '8080f0000e000100000006010104030007000000000000f7';
  // let str = '8080f0000a00010000000a0101040900000000000000000000000000000000f7'; // nr off
  let str = '8080f0010c00010000000a0101040900000000000000000001000000000000f7'; //nr on
  console.log(str);
  str = str.substring(8);
  str = str.substring(0, str.length - 2);
  console.log(str);

  const hexBytes = str.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16));
  if (!hexBytes) {
    return;
  }
  const command = new Uint8Array(hexBytes);
  console.log(command);
  const test = [10, 0, 1, 0, 0, 0, 10, 1, 1, 4, 9];

  // midiOutput?.value?.sendSysex([0], test);
};

const Midi = ref(WebMidi);

onMounted(() => {
  Midi.value.enable({ sysex: true }).catch((err) => {
    console.error('Unable to enable', err);
  });
});

const selectInput = (input: Input) => {
  device?.setMidiInput(input);
};

const selectOutput = (output: Output) => {
  device?.setMidiOutput(output);
};

const logs = ref<MessageEvent[]>([]);
</script>
