<template>
    <div>
        <outline-window v-if="displayWindow" :disableBtn="true" @closeWindow="close">
            <template v-slot:header>About me - corrupted file</template>
            <template v-slot:body>
                <div class="container">
                    <div>
                        <div class="body">
                            <!-- todo: keep the image fix and change the content, about me, skills projects -->
                            <!-- maybe add page 1 2 3 4, and switch between them using a button -->
                            <div class="aboutme-container">
                                <div class="img-wrapper">
                                    <img src="@/assets/random_.png" alt="random image from giphy">
                                </div>
                                <div class="section-wrapper">
                                    <!-- 2: skills -->
                                    <div v-if="currentSlideIndex === 0" class="skills-wrapper">
                                        <h3>Skills</h3>
                                        <hr>
                                        <h4>
                                            languages
                                        </h4>
                                        <p>
                                            C - C++ - Javascript - Typescript
                                        </p>
                                        <h4>
                                            front end
                                        </h4>
                                        <p>
                                            HTML - CSS - SASS - Vue.js - Nuxt.js - Pinia - Tailwind CSS - Astro
                                        </p>
                                        <h4>
                                            developer tools
                                        </h4>
                                        <p>
                                            Git - VS Code - Visual Studio - Photoshop - bash
                                        </p>
                                    </div>
                                    <!-- 2: projects -->
                                    <div v-if="currentSlideIndex === 1" class="projects-wrapper">
                                        <h3>Personal projects <span
                                                @click="openLink('https://github.com/kaibelmo', '_blank')"
                                                style="cursor: pointer;">for more projects check my
                                                github</span>
                                        </h3>
                                        <hr>
                                        <div class="project-container window_outline">
                                            <div class="body">
                                                <h5 @click="openLink('', '_blank')" style="cursor: help;">
                                                    Personal website : <span>(Vue.js - Typescript - Pinia - SASS -
                                                        Canvas)</span>
                                                </h5>
                                                <p>
                                                    this.
                                                </p>
                                            </div>
                                        </div>
                                        <div class="project-container window_outline">
                                            <div class="body">
                                                <h5 @click="openLink('https://github.com/KaiBelmo/libC--', '_blank')"
                                                    style="cursor: help;">
                                                    libC-- : <span>(C programming)</span>
                                                </h5>
                                                <p>
                                                    C++ containers but in C
                                                </p>
                                            </div>
                                        </div>
                                        <div class="project-container window_outline">
                                            <div class="body">
                                                <h5 @click="openLink('https://github.com/KaiBelmo/b1m0-dbg', '_blank')"
                                                    style="cursor: help;">
                                                    b1m0-dbg : <span>(C programming)</span>
                                                </h5>
                                                <p>
                                                    linux debugger
                                                </p>
                                            </div>
                                            <div class="links">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 1: about me -->
                                    <div v-if="currentSlideIndex === 2" class="aboutme-wrapper">
                                        <h3>A little paragraph about me</h3>
                                        <hr>
                                        <template v-for="(word, index) in cipheredText" :key="word">
                                            <span class='ciphered' @mouseenter='decipherWord'
                                                :data-original="tmpArr[index]">
                                                {{ word }}
                                            </span>
                                        </template>
                                        <h6>Hover over the text to decode it.</h6>
                                    </div>
                                    <div class="button-wrapper">
                                        <button class="windows_95_button window_outline"
                                            @click="currentSlideIndex = currentSlideIndex === 0 ? 0 : (currentSlideIndex - 1) % 3">back
                                        </button>
                                        <button class="windows_95_button window_outline"
                                            @click="currentSlideIndex = (currentSlideIndex + 1) % 3">next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </outline-window>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import OutlineWindow from '@/components/slots/outlineWindow.vue';
import { useAppStore } from '@/stores/appStore';
import { openLink } from '@/assets/ts/core'
import '@/assets/scss/buttons.scss'
import '@/assets/scss/base.scss'


let appStore = useAppStore();
let displayWindow: Ref<boolean> = ref(true);
let displayedText: string = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem.
    for more information contact me xd.
    `;
let tmpArr: string[] = []
let cipheredText: Ref<string[]> = ref([])
let currentSlideIndex: Ref<number> = ref(0)

let close = (): void => {
    let index: number = appStore.apps.findIndex(app => app.appName === "about me");
    if (index !== -1) {
        appStore.apps[index].openWindow = false;
        displayWindow.value = false;
    }
}
let cipher = (word: string) => {
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
}
let decipherWord = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
        event.target.style.opacity = "1"
        event.target.textContent = event.target.getAttribute("data-original")
    }
}

onMounted(() => {
    tmpArr = displayedText.match(/\S+|\s+/g) || []
    if (tmpArr) {
        cipheredText.value = tmpArr.map(word => {
            if (/\s+/.test(word)) return word
            return cipher(word)
        })
    }
})

</script>

<style scoped lang="scss">
.body {
    width: 700px;
}

.aboutme-container {
    display: flex;
    flex-direction: row;
    padding: 15px 10px;

    &>.img-wrapper {
        display: flex;
        flex-direction: column;

        &>img {
            width: 160px;
            margin-right: 6px;
        }
    }
}

.ciphered {
    color: rgb(66, 66, 66);
    font-size: 14px;
    cursor: pointer;
    transition: opacity 0.3s ease-out;
    opacity: 0.5;
}

.aboutme-wrapper,
.skills-wrapper,
.projects-wrapper {
    padding: 0 7px;
    flex-grow: 1;

    &>h6 {
        font-size: 7px;
        color: rgb(67, 67, 67);
        opacity: 0.7;
    }
}

.section-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.skills-wrapper {
    &>p {
        font-size: 14px;
    }
}

.button-wrapper {
    align-self: flex-end;
    display: flex;

    &>* {
        margin: 5px 7px 2px 7px;
        padding: 2px 7px;
    }
}

.project-container {
    width: 100%;
    margin: 10px 0px;

    &:last-child {
        margin-bottom: 0;
    }

    &>.body {
        padding: 10px;

        &>h5>span {
            font-size: 9px;
            opacity: .7;
        }

        &>p {
            font-size: 11px;
        }
    }
}

.projects-wrapper {
    &>h3>span {
        font-size: 10px;
        opacity: .7;
    }
}

// phones
@media (max-width: 500px) {
    .body {
        width: 340px;
    }

    .aboutme-container {
        &>.img-wrapper {
            display: none;
            margin: 0;
        }
    }

    .skills-wrapper {
        &>p {
            font-size: 10px;
        }

        &>h4 {
            font-size: 14px;
        }
    }

    .aboutme-wrapper,
    .skills-wrapper,
    .projects-wrapper {
        padding: 0 7px;
        flex-grow: 1;

        &>h3 {
            font-size: 16px;

            &>span {
                display: none;
            }
        }

        &>h6 {
            font-size: 6px;
            color: rgb(67, 67, 67);
            opacity: 0.7;
        }
    }

    .project-container {
        width: 100%;
        margin: 5px 0px;

        &:last-child {
            margin-bottom: 0;
        }

        &>.body {
            padding: 10px;

            &>h5 {
                font-size: 11px;
            }

            &>h5>span {
                font-size: 8px;
                white-space: nowrap;
                opacity: .7;
            }

            &>p {
                font-size: 10px;
            }
        }
    }
}

// tablets
@media (min-width: 501px) and (max-width: 767px) {
    .body {
        width: 400px;
    }

    .aboutme-container {
        &>.img-wrapper {
            display: none;
            margin: 0;
        }
    }

    .skills-wrapper {
        &>p {
            font-size: 12px;
        }

        &>h4 {
            font-size: 16px;
        }
    }

    .aboutme-wrapper,
    .skills-wrapper,
    .projects-wrapper {
        padding: 0 7px;
        flex-grow: 1;

        &>h3 {
            font-size: 16px;

            &>span {
                display: none;
            }
        }

        &>h6 {
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

        &>.body {
            padding: 10px;

            &>h5>span {
                font-size: 10px;
                white-space: nowrap;
                opacity: .7;
            }

            &>p {
                font-size: 11px;
            }
        }
    }
}
</style>