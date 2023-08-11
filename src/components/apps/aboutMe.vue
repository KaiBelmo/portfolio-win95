<template>
  <div>
    <outline-window
      v-if="displayWindow"
      :disableBtn="true"
      @closeWindow="close"
    >
      <template v-slot:header>About me - corrupted file</template>
      <template v-slot:body>
        <div class="container">
          <div class="aboutme-container">
            <div class="img-wrapper">
              <img src="@/assets/random_.png" alt="random image from giphy" />
            </div>
            <div class="section-wrapper">
              <!-- 0: skills -->
              <div v-if="currentSlideIndex === 0" class="skills-wrapper">
                <h3>Skills</h3>
                <hr />
                <div v-for="skill in skillsData" :key="skill.title">
                  <h4>
                    {{ skill.title }}
                  </h4>
                  <p>
                    {{ skill.skills.join(" - ") }}
                  </p>
                </div>
              </div>
              <!-- 1: projects -->
              <div v-if="currentSlideIndex === 1" class="projects-wrapper">
                <h3>Projects</h3>
                <hr />
                <div class="add-scroll-bar">
                  <div v-for="project in projectsData" :key="project.name">
                    <div class="project-container window_outline">
                      <h5
                        @click="openLink(project.githubRepo, '_blank')"
                        style="cursor: help"
                      >
                        {{ project.name }}
                        <span>
                          {{
                            project.isOpenSource
                              ? "Open source contribution"
                              : "Personal project"
                          }}
                        </span>
                      </h5>
                      <div>{{ project.technologies.join(", ") }}</div>
                      <p>{{ project.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 2: about me -->
              <div v-if="currentSlideIndex === 2" class="aboutme-wrapper">
                <h3>A little paragraph about me</h3>
                <hr />
                <template v-for="(cipher, index) in cipheredText" :key="index">
                  <span
                    class="ciphered"
                    :class="{deciphered: !cipher.isCiphered}"
                    @mouseenter="decipherWord($event, cipher, index)"
                  >
                    {{ cipher.word }}
                  </span>
                </template>
                <h6>Hover over the text to decode it.</h6>
              </div>
              <div class="button-wrapper">
                <button
                  class="windows_95_button window_outline"
                  :class="{ 'disabled-text': currentSlideIndex === 0 }"
                  @click="
                    currentSlideIndex =
                      currentSlideIndex === 0 ? 0 : (currentSlideIndex - 1) % 3
                  "
                >
                  back
                </button>
                <button
                  class="windows_95_button window_outline"
                  @click="currentSlideIndex = (currentSlideIndex + 1) % 3"
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </outline-window>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import OutlineWindow from "@/components/slots/outlineWindow.vue";
import { useAppStore } from "@/stores/appStore";
import { openLink } from "@/assets/ts/utils";
import "@/assets/scss/buttons.scss";
import "@/assets/scss/base.scss";
import skillsData from "@/data/skills.json";
import projectsData from "@/data/projects.json";
import aboutMeData from "@/data/aboutme.json";
import type { cipheredWord } from "@/types/index";

const appStore = useAppStore();
const displayWindow = ref<boolean>(true);
const currentSlideIndex = ref<number>(0);

const cipheredText = ref<cipheredWord[]>([]);

const close = (): void => {
  let index: number = appStore.apps.findIndex(
    (app) => app.appName === "about me"
  );
  if (index !== -1) {
    appStore.apps[index].openWindow = false;
    displayWindow.value = false;
  }
};
const rot13 = (word: string) => {
  let cipheredWord = "";
  for (const char of word) {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      cipheredWord += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      cipheredWord += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
    } else {
      cipheredWord += char;
    }
  }
  return cipheredWord;
};

const decipherWord = (event: MouseEvent, cipher: cipheredWord, idx: number) => {
  if (event.target instanceof HTMLElement && cipheredText.value[idx].isCiphered) {
    cipheredText.value[idx] = {
      word: rot13(cipher.word),
      isCiphered: false,
    };
  }
};

onMounted(() => {
  // split the string into an array of words and spaces,
  const tmpArr: string[] = aboutMeData.description.match(/\S+|\s+/g) || [];
  if (tmpArr) {
    cipheredText.value = tmpArr.map((word) => {
      if (/\s+/.test(word))
        return {
          isCiphered: true,
          word: word,
        };
      return {
        isCiphered: true,
        word: rot13(word),
      };
    });
  }
});
</script>

<style scoped lang="scss">
// @import url("@/assets/scss/buttons.scss");
.container {
  width: 730px;
}
.aboutme-container {
  display: flex;
  flex-direction: row;
  padding: 15px 10px;

  & > .img-wrapper {
    display: flex;
    flex-direction: column;

    & > img {
      width: 160px;
      margin-right: 6px;
    }
  }
}

.ciphered {
  color: rgb(66, 66, 66);
  font-size: 14px;
  cursor: default;
  opacity: .5;
  transition: opacity 0.3s ease-out;
}
.deciphered {
  opacity: 1;
}

.aboutme-wrapper,
.skills-wrapper,
.projects-wrapper {
  padding: 0 6px;
  flex-grow: 1;
  & > hr {
    margin: 3px 0px;
  }
}

.section-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.skills-wrapper {
  flex-grow: 1;
  & > div > p {
    font-size: 15px;
    opacity: 0.7;
  }
}
.aboutme-wrapper {
  & > h6 {
    margin-top: 2px;
    font-size: 9px;
    opacity: 0.5;
  }
}

.button-wrapper {
  align-self: flex-end;
  display: flex;
  & > * {
    margin: 5px 7px 2px 7px;
    padding: 2px 7px;
  }
}

.project-container {
  margin: 7px 0px;
  padding: 10px 15px;
  & > h5 > span {
    font-size: 10px;
    opacity: 0.7;
  }
  & > p {
    font-size: 11px;
    max-height: 45px;
    overflow-y: auto;
    padding-right: 1px;
    opacity: 0.8;
  }
  & > div {
    font-weight: 700;
    font-size: 10px;
    opacity: 0.8;
  }
}

.projects-wrapper {
  & > .add-scroll-bar {
    padding: 1px 7px 5px 2px;
    max-height: 218px;
    overflow: auto;
  }
  & > h3 > span {
    font-size: 10px;
    opacity: 0.7;
  }
}

// phones
@media (max-width: 500px) {
  .container {
    height: 335px;
    width: 330px;
  }
  .aboutme-container {
    & > .img-wrapper {
      display: none;
      margin: 0;
    }
  }

  .aboutme-wrapper,
  .skills-wrapper,
  .projects-wrapper {
    padding: 0 7px;
    flex-grow: 1;

    & > h3 {
      font-size: 16px;
    }
  }
  .projects-wrapper {
    & > .add-scroll-bar {
      max-height: 230px;
    }
  }
  .aboutme-wrapper {
    min-height: 274px;
  }
  .skills-wrapper {
    min-height: 274px;
    & > div > p {
      font-size: 13px;
    }

    & > div > h4 {
      font-size: 14px;
    }
  }
  .project-container {
    padding: 10px;
    & > h5 {
      font-size: 13px;
    }
    & > h5 > span {
      font-size: 9px;
    }
    & > div {
      font-size: 9px;
    }
    & > p {
      max-height: 30px;
      font-size: 9px;
    }
  }
}

// tablets
@media (min-width: 501px) and (max-width: 767px) {
  .container {
    // height: 335px;
    width: 500px;
  }
  .aboutme-container {
    & > .img-wrapper {
      display: none;
      margin: 0;
    }
  }

  .skills-wrapper {
    & > p {
      font-size: 12px;
    }

    & > h4 {
      font-size: 16px;
    }
  }

  .aboutme-wrapper,
  .skills-wrapper,
  .projects-wrapper {
    padding: 0 7px;
    flex-grow: 1;

    & > h3 {
      font-size: 16px;

      & > span {
        display: none;
      }
    }

    & > h6 {
      font-size: 7px;
      color: rgb(67, 67, 67);
      opacity: 0.7;
    }
  }

  .project-container {
    width: 100%;
    margin: 10px 0px;

    &:last-child {
      margin-bottom: 0;
    }
    padding: 10px;

    & > h5 > span {
      font-size: 10px;
      white-space: nowrap;
      opacity: 0.7;
    }

    & > p {
      font-size: 11px;
    }
  }
}
</style>
