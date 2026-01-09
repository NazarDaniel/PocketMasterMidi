<template>
  <q-card v-if="!Midi.enabled"> Midi disabled </q-card>
  <q-card v-if="Midi.enabled">
    Midi enabled
    <div>Available outputs:</div>
    <q-card v-for="(output, key) in Midi.outputs" :key="key">
      {{ output.name }}
    </q-card>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Input, Output } from 'webmidi';
import { WebMidi } from 'webmidi';

const Midi = ref(WebMidi);

onMounted(() => {
  Midi.value.enable({ sysex: true }).catch((err) => {
    console.error('Unable to enable', err);
  });
});

const midiInput = ref<null | Input>(null);
const midiOutput = ref<null | Output>(null);
</script>
