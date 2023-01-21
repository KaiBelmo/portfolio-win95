<template>
    <div>
        <outline-window v-if="displayWindow" :disableBtn="true" @closeWindow="close">
            <template v-slot:header>command prompt</template>
            <template v-slot:body>
                <div class="container">
                    <textarea class="textarea" v-model="userInput" autofocus spellcheck="false"
                        @keydown="handleKeydown"></textarea>
                </div>
            </template>
        </outline-window>
    </div>
</template>

<script setup lang="ts">
import OutlineWindow from '@/components/slots/outlineWindow.vue';
import { useAppStore } from '@/stores/appStore';
import { type Ref, ref } from 'vue';

let appStore = useAppStore();
let displayWindow: Ref<boolean> = ref(true);
let userInput: Ref<string> = ref("C:\\Users\\kai>");

let helpOutput: string = "\n commands: [help, cls, whoami, links] \nC:\\Users\\kai>";
let whoamiOutput: string = "\n my virtual name is kai and i am software developer. \nC:\\Users\\kai>";
let linksOutput: string = "\n twitter: twitter.com/belmo01 \n github: github.com/KaiBelmo \nC:\\Users\\kai>";
let unknownOutput: string = "\nunknown command" + "\nC:\\Users\\kai>";

let close = (): void => {
    let index: number = appStore.apps.findIndex(app => app.appName === "cmd");
    if (index !== -1) {
        appStore.apps[index].openWindow = false;
        displayWindow.value = false;
    }
}
let handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Backspace') {
        let prompt = userInput.value.substring(userInput.value.length - 13, userInput.value.length);
        if (prompt === "C:\\Users\\kai>") {
            e.preventDefault();
        }
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        let tmp = userInput.value.split("\n");
        let command = tmp[tmp.length - 1].substring(13);
        // console.log(tmp)
        if (command.toLowerCase() === "help") {
            userInput.value += helpOutput;
        }
        else if (command.toLowerCase() === "cls") {
            userInput.value = "C:\\Users\\kai>";
        }
        else if (command.toLowerCase() === "whoami") {
            userInput.value += whoamiOutput;
        } else if (command.toLowerCase() === "links") {
            userInput.value += linksOutput;
        } else {
            userInput.value += unknownOutput;
        }
    }
    if (e.key.startsWith('Arrow') || e.key === 'Home' || e.key === 'End' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Tab') {
        e.preventDefault();
    }
}
</script>

<style scoped lang="scss">
.container {
    height: 250px;
    width: 500px;
    padding: 2px 0;
    overflow: hidden;
}

.textarea {
    resize: none;
    height: 100%;
    width: 100%;
    background: black;
    border: 0;
    padding: 5px;
    color: rgba(255, 255, 255, 0.762);

    &:active {
        outline: none;
        border: none;
    }
}

// phones
@media (max-width: 500px) {
    .container {
        height: 150px;
        width: 300px;
    }
    .textarea {
        font-size: 12px;
    }
}

// tablets
@media (min-width: 501px) and (max-width: 767px) {
    .container {
        height: 250px;
        width: 400px;
    }
}
</style>