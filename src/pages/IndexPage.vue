<template>
  <!-- outputs -->
  <q-card>Output devices connected = {{ WebMidi.outputs.length }}</q-card>
  <q-card v-if="selectedOutput === null">No selected device</q-card>
  <q-card v-if="selectedOutput !== null"> Selected device: {{ selectedOutput.name }} </q-card>
  <q-card v-if="!WebMidi.outputs"> No available devices </q-card>
  <q-card v-if="WebMidi.outputs.length > 0">
    <div>
      <q-btn
        v-for="(output, outputKey) in WebMidi.outputs"
        :key="outputKey"
        @click="selectOutput(output)"
      >
        {{ output.name }}
      </q-btn>
    </div>
  </q-card>
  <q-card v-if="selectedOutput !== null">
    <h6>Test commands</h6>
    <q-btn @click="selectedOutput.channels[1]?.sendControlChange(25, 127)">Program up</q-btn>
  </q-card>

  <!-- inputs -->
  <q-card>Input devices connected = {{ WebMidi.inputs.length }}</q-card>
  <q-card v-if="selectedInput === null">No selected device</q-card>
  <q-card v-if="selectedInput !== null"> Selected device: {{ selectedInput.name }} </q-card>
  <q-card v-if="!WebMidi.inputs"> No available devices </q-card>
  <q-card v-if="WebMidi.inputs.length > 0">
    <div>
      <q-btn
        v-for="(input, inputKey) in WebMidi.inputs"
        :key="inputKey"
        @click="selectInput(input)"
      >
        {{ input.name }}
      </q-btn>
    </div>
  </q-card>
  <q-card v-if="selectedInput !== null">
    <h6>Input monitor</h6>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Input, Output } from 'webmidi';
import { WebMidi } from 'webmidi';

onMounted(() => {
  WebMidi.enable()
    .then(() => {
      console.log('WebMidi enabled!');
    })
    .catch((err) => {
      console.error('WebMidi could not be enabled:', err);
    });
});

const selectedOutput = ref<Output | null>(null);
const selectOutput = (output: Output | null) => {
  selectedOutput.value = output;
};

const selectedInput = ref<Input | null>(null);
const selectInput = (input: Input | null) => {
  selectedInput.value = input;
};
</script>
