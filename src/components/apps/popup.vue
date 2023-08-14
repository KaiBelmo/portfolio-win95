<template>
  <div>
    <outline-window
      v-if="showPopup"
      :disableBtn="true"
      @closeWindow="showPopup = false"
    >
      <template v-slot:header> annoying pop up! </template>
      <template v-slot:body>
        <div class="popup no-select">
          <ul>
            <li
              class="window_95_link"
              @click="openLink('https://twitter.com/belmo01', '_blank')"
            >
              follow me on twitter
            </li>
            <li
              class="window_95_link"
              @click="openLink('mailto:belmomohamedali@gmail.com', '_self')"
            >
              contact me or hire me
            </li>
            <li
              class="window_95_link"
              @click="openLink('https://portfolio-kaibelmo.vercel.app', '_blank')"
            >
              modern version of my portfolio
            </li>
          </ul>
          <button
            class="windows_95_button close_btn window_outline"
            @click="showPopup = false"
          >
            close
          </button>
        </div>
      </template>
    </outline-window>
  </div>
</template>

<script setup lang="ts">
import OutlineWindow from "@/components/slots/outlineWindow.vue";
import "@/assets/scss/buttons.scss";
import { openLink } from "@/assets/ts/utils";
import { onMounted, ref, type Ref } from "vue";
import popup from "@/assets/sounds/popup_sound.mp3";

let showPopup: Ref<boolean> = ref(false);
const audio: HTMLAudioElement = new Audio(popup);
onMounted(() => {
  setTimeout(() => {
    showPopup.value = true;
    audio.play();
  }, 2100);
});
</script>

<style scoped lang="scss">
.popup {
  padding: 0.5vh 6vh 0.5vh 6vh;
  height: 100%;
  font-size: 12px;

  & ul li {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
}

.close_btn {
  padding: 1px 10px 1px 10px;
  font-size: 9px;
  margin: 0.7em auto;
}
</style>
