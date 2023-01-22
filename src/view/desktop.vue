<template>
  <div>
    <selection-rectangle />
    <task-bar />
    <rendering-apps />
  </div>
</template>

<script setup lang="ts">
import RenderingApps from '@/components/RenderingApps.vue';
import SelectionRectangle from '@/components/selectionRectangle.vue';
import TaskBar from '@/components/TaskBar.vue'
import { onMounted } from 'vue';
import click from '@/assets/sounds/click_sound.mp3'
onMounted(() => {
  document.querySelector('button')!.addEventListener('click', function () {
    const audio: HTMLAudioElement = new Audio(click);
    audio.play();
  });
  document.addEventListener('contextmenu', event => event.preventDefault());
})


</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app {
  font-family: 'px sans nouveaux', Arial, Helvetica, sans-serif;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  background-color: #008080;
}
</style>