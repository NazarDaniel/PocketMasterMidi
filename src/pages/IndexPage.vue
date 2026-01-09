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
            <q-btn @click="midiOutput = output" :disabled="midiOutput === output">{{
              output.name
            }}</q-btn>
          </q-card-section>
        </div>
        <!-- actions -->
        <div class="col-8">a</div>
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
            <q-btn @click="selectInput(input as Input)" :disabled="midiInput === input">{{
              input.name
            }}</q-btn>
          </q-card-section>
        </div>
        <div class="col-8">
          <h5>Logs:</h5>
          <div v-for="(midiEvent, key) in logs" :key="key">
            {{ midiEvent.dataBytes }}<br />{{ decodeArray(Array.from(midiEvent.dataBytes)) }}
          </div>
          <q-btn
            v-for="(midiEvent, key) in logs"
            :key="key"
            @click="replayEvent(midiEvent as MessageEvent)"
          >
            Replay event {{ key }} </q-btn
          ><br />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Event, Input, Message, MessageEvent, Output } from 'webmidi';
import { WebMidi } from 'webmidi';

const Midi = ref(WebMidi);

onMounted(() => {
  Midi.value.enable({ sysex: true }).catch((err) => {
    console.error('Unable to enable', err);
  });
});

const midiInput = ref<null | Input>(null);
const midiOutput = ref<null | Output>(null);

const replayEvent = (midiEvent: MessageEvent) => {
  console.log('Replaying event', midiEvent);
  if (midiOutput.value === null) {
    return;
  }
  midiOutput.value.sendSysex([10], midiEvent.dataBytes);
};

const selectInput = (input: Input) => {
  if (midiInput.value !== null) {
    midiInput.value.removeListener();
  }
  if (input === null) {
    return;
  }
  midiInput.value = input;
  if (midiInput.value === null) {
    return;
  }
  midiInput.value.addListener('sysex', (e: MessageEvent) => {
    console.log('Sysex received', e);
    logs.value.push(e);
  });
};

const logs = ref<MessageEvent[]>([]);

function encodeNumber(N: number) {
  if (N < 0 || N > 100) {
    throw new RangeError('N must be between 0 and 100');
  }

  // --- fixed metadata (indices 0–30) ---
  const arr = new Array(35).fill(0);

  arr[2] = 1;
  arr[6] = 14;
  arr[7] = 1;
  arr[8] = 2;
  arr[9] = 4;
  arr[10] = 8;
  arr[12] = 2;

  // --- mixed-radix encoding ---
  const D0 = N % 16; // base 16
  const t1 = Math.floor(N / 16);

  const D1 = (t1 % 8) * 2; // base 8, step 2
  const D3 = Math.floor(t1 / 8); // base 3

  const D2 = 4; // derived / constant flag

  arr[31] = D0;
  arr[32] = D1;
  arr[33] = D2;
  arr[34] = D3;

  return arr;
}

function decodeArray(arr: number[]) {
  if (!Array.isArray(arr) || arr.length !== 35 || !arr[31] || !arr[32] || !arr[34]) {
    return -1;
  }

  const block = arr[34]; // 0..2
  const offset = arr[32]; // 0..14 (step 2)

  // index31 is derived / non-positional
  return block * 32 + offset + (arr[31] % 16);
}
</script>
