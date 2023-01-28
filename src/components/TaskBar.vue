<template>
    <div>

        <div class="task-bar">
            <button class="windows_95_button window_outline weight_600" @click="openStartMenu">
                <img class="pix-icon no-select" src="../assets/windows_logo_pix.png">
                <span class="no-select"> Start </span>
            </button>
            <div v-if="(showStartMenu)" @focusout="(showStartMenu = false)" tabindex="0" ref="startMenuFocus"
                class="start-menu">
                <div class="windows-95-text">
                    <strong> Windows </strong> <span>95</span>
                </div>
                <div class="start-menu-content">
                    <ul>
                        <li @click="openLink('https://github.com/kaibelmo', '_blank')" style="cursor: pointer;">
                            <img src="../assets/github_logo_.png" class="pix-icon">
                            my github
                        </li>
                        <hr>
                        <li class="programs">
                            <img src="../assets/directory_program.png" class="pix-icon">
                            programs
                            <div class="programs-menu-wrapper">
                                <ul v-for="app in appStore.executables">
                                    <li>{{ app.appName }}</li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <img src="../assets/documents.png" class="pix-icon">
                            documents
                        </li>
                        <li class="disabled-text">
                            <img src="../assets/settings.png" class="pix-icon">
                            settings
                        </li>
                        <li class="disabled-text">
                            <img src="../assets/find.png" class="pix-icon">
                            find
                        </li>
                        <li @dblclick="openApp('cmd')" style="cursor: pointer;" class="no-select">
                            <img src="../assets/cmd.png" class="pix-icon">
                            command prompt
                        </li>
                        <hr>
                        <li class="disabled-text">
                            <img src="../assets/shutdown.png" class="pix-icon">
                            shut down
                        </li>
                    </ul>
                </div>
            </div>
            <div class="vertical-line"></div>
            <div style="width: 85%; overflow: auto;">
                <div class="task-bar-opened-apps">
                    <div v-for="openedapp in appStore.openedApps" :key="openedapp.appName"
                        class="opened-app window_outline">
                        {{ openedapp.appName }}
                    </div>
                </div>
            </div>
            <div class="task-bar-time">
                <img @click="muteVolume" class="pix-icon volume-btn no-select" src="../assets/windows_volume_pix.png">
                <span class="no-select"> {{ currentTime }} AM </span>
            </div>
        </div>
        <component v-if="index !== 0 && appStore.apps[index].openWindow" :is="appStore.apps[index].componentName"></component>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref } from 'vue';
import '@/assets/scss/buttons.scss'
import '@/assets/scss/base.scss'
import { openLink } from '@/assets/ts/utils'
import { useAppStore } from '@/stores/appStore';

let appStore = useAppStore();
let currentTime: Ref<string> = ref('');
let showStartMenu: Ref<boolean> = ref(false);
let startMenuFocus: any = ref(null);
let index: number = 0;

const getCurrentTime = (): void => {
    let today: Date = new Date();
    let hourT: number = today.getHours();
    let minT: number = today.getMinutes();
    let time: { hour: string, min: string } = {
        hour: (hourT < 10) ? "0" + hourT : hourT.toString(),
        min: (minT < 10) ? "0" + minT : minT.toString()
    }
    currentTime.value = time.hour + ":" + time.min;
    setInterval(() => { getCurrentTime() }, 60000)
}
let openApp = (appName: string): void => {
    index = appStore.apps.findIndex(app => app.appName === appName);
    appStore.apps[index].openWindow = !appStore.apps[index].openWindow;
    console.log(appStore.apps[index].openWindow)
}
const muteVolume = (): void => {
    alert("unimplemented!")
}
const openStartMenu = (): void => {
    showStartMenu.value = true;
    nextTick(() => {
        startMenuFocus.value.focus();
    })
}

onMounted(() => {
    getCurrentTime();
})

</script>

<style scoped lang="scss">
@import '@/assets/scss/base.scss';

.task-bar {
    width: 100%;
    height: 1.8em;
    bottom: 0;
    position: fixed;
    background-color: $windows-95-bg;
    border-top: 1px white solid;
    outline: rgb(223, 223, 223) solid 1px;
    display: flex;
    align-items: center;
    padding: 2px 4px 2px 4px;
    z-index: 69;
}

.task-bar-time {
    font-size: 10px;
    margin-right: 8px;
    margin-left: auto;
    border-bottom: rgb(223, 223, 223) 1px solid;
    border-right: rgb(223, 223, 223) 1px solid;
    border-top: rgb(112, 112, 112) 1px solid;
    border-left: rgb(112, 112, 112) 1px solid;
    padding: 3px 4px;
    display: flex;
    align-items: center;
    white-space: nowrap;

    &>span {
        cursor: help;
    }
}

.task-bar-opened-apps {
    font-size: 10px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    &>.opened-app {
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 8em;
        margin: 0 3px 0 3px;
        padding: 3px 35px 2px 5px;
        user-select: none;
    }

    &:first-child {
        margin: 0 3px 0 5px;
    }
}

.volume-btn {
    margin-top: 0px;
    cursor: pointer;
    transform: scale(.9);
}

.windows_95_button {
    &:active {
        &>* {
            transform: scale(93%);
        }
    }
}

.start-menu {
    position: absolute;
    bottom: 1.6em;
    min-width: 10em;
    display: flex;
    background-color: rgb(192, 192, 192);
    box-shadow: -1px -1px 0 white,
        0px -1px 0 white,
        -1px 0px 0 white,
        -1px 1px 0 black,
        0px 1px 0 black,
        1px 1px 0 black,
        1px -1px 0 black,
        1px 0px 0 black,
        0px 2px 3px 1px black;

    &>.windows-95-text {
        background-color: rgb(125, 126, 124);
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        padding: 10px 1px 140px 1px;
        font-size: 16px;
        white-space: nowrap;
        color: rgb(212, 209, 209);

        &>span {
            color: white;
        }
    }

    &>.start-menu-content {
        text-align: left;
        display: flex;
        justify-content: center;
        font-size: 10px;
        padding-bottom: 10px;

        &>ul>li {
            padding: 2px 5px 2px 5px;

            &>img {
                margin: 0;
                height: 25px;
                width: auto;
                transform: translateY(30%);
            }

            &:first-child {
                &>img {
                    transform: translateY(10%);
                }
            }

            &:last-child>img {
                transform: translateY(15%);
            }
        }
    }
}

.programs {
    &:hover {
        &>.programs-menu-wrapper {
            display: block;
        }
    }

    &>.programs-menu-wrapper {
        display: none;
        padding: 1px 3px 1px 3px;
        position: absolute;
        left: 100%;
        top: 20%;
        margin: 2px;
        background-color: rgb(192, 192, 192);
        font-size: 10px;
        white-space: nowrap;

        &>ul>li {
            padding: 4px 9px;
        }
    }

}

hr {
    margin-top: 11px;
}

.vertical-line {
    border-right: rgb(81, 77, 77) 1px solid;
    border-left: rgb(255, 255, 255) 1px solid;
    height: 80%;
    margin-left: 5px;
}
</style>