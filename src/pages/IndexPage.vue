<template>
  <q-card>Devices connected = {{ WebMidi.outputs.length }}</q-card>
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Output } from 'webmidi';
import { WebMidi } from 'webmidi';

onMounted(() => {
  WebMidi.enable()
    .then(() => {
      console.log('WebMidi enabled!');
      console.log(WebMidi.outputs);
    })
    .catch((err) => {
      console.error('WebMidi could not be enabled:', err);
    });
});

const selectedOutput = ref<Output | null>(null);
const selectOutput = (output: Output | null) => {
  selectedOutput.value = output;
};

const clearAll = () => {
  if (!selectedOutput.value) {
    return;
  }
  const channel = selectedOutput.value.channel['1'];
};
</script>
