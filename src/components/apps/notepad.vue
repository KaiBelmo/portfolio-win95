<template>
    <div>
        <outline-window v-if="displayWindow" :disableBtn="true" @closeWindow="close">
            <template v-slot:header>Notepad</template>
            <template v-slot:body>
                <div class="container">
                    <div class="save-file-input window_outline" v-if="showSaveFilePopUp">
                        <span>
                            file name
                            <input type="text" v-model="fileName">
                        </span>
                        <span>
                            <button class="window_outline disabled-text" @click="saveFile">save file</button>
                            <button class="window_outline windows_95_button"
                                @click="showSaveFilePopUp = false">close</button>
                        </span>
                    </div>
                    <div class="menu">
                        <ul>
                            <li class="menu-section">file
                                <ul class="menu-dropdown window_outline">
                                    <li @click="newFile">new</li>
                                    <li class="disabled-text">open</li>
                                    <li @click="openSaveFilePopup">save file</li>
                                    <li @click="close">close</li>
                                </ul>
                            </li>
                            <li class="menu-section">edit
                                <ul class="menu-dropdown window_outline">
                                    <li @click="selectAll">select all</li>
                                    <li class="disabled-text">word wrap</li>
                                </ul>
                            </li>
                            <li class="menu-section">search
                                <ul class="menu-dropdown window_outline">
                                    <li class="disabled-text">find</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="body">
                        <textarea id="notepadContent" v-model="notepadContent" autocorrect="off" spellcheck="false"
                            type="text"></textarea>
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
import '@/assets/scss/base.scss'
import '@/assets/scss/buttons.scss'

const props = defineProps({
    content: { type: String }
})

let appStore = useAppStore();
let displayWindow: Ref<boolean> = ref(true);
let notepadContent: Ref<string> = ref(props.content === undefined ? '' : props.content);
let showSaveFilePopUp: Ref<boolean> = ref(false);
let fileName: Ref<string> = ref('');

let close = (): void => {
    let index: number = appStore.apps.findIndex(app => app.appName === "notepad");
    if (index !== -1) {
        appStore.apps[index].openWindow = false;
        displayWindow.value = false;
    }
}

let newFile = (): void => {
    notepadContent.value = "";
}
let selectAll = (): void => {
    (document.getElementById('notepadContent') as HTMLInputElement).select();
}
let openSaveFilePopup = (): void => {
    showSaveFilePopUp.value = !showSaveFilePopUp.value;
}
let saveFile = (): void => {
    // showSaveFilePopUp.value = !showSaveFilePopUp.value;
    // if (fileName.value.length !== 0){
    //     appStore.pushTextFile(fileName.value, notepadContent.value, true);
    // }
}

onMounted(() => {
    console.log(props.content)
})

</script>

<style scoped lang="scss">
.container {
    width: calc(100% - 4px);
    padding: 0 8px 8px 4px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 20em;
}

.menu {
    & ul {
        display: flex;
        gap: 10px;
        font-size: 9px;
        cursor: default;
        margin-bottom: 4px;

        &>li::first-letter {
            text-decoration: underline;
        }
    }
}

.body {
    font-size: 10px;
    background-color: white;
    width: 50em;
    flex: 1;
}

// todo make this .menu-section global
.menu-section {

    &:hover>.menu-dropdown,
    &:active>.menu-dropdown {
        display: block;
    }

    &>.menu-dropdown {
        display: none;
        padding: 1px 3px 1px 3px;
        position: absolute;
        background-color: rgb(192, 192, 192);
        font-size: 7px;
    }
}

#notepadContent {
    border: none;
    overflow: auto;
    outline: none;
    box-shadow: none;
    resize: none;
    border-top: rgb(133, 133, 133) 2px solid;
    border-left: rgb(133, 133, 133) 2px solid;
    border-right: rgb(211, 211, 211) 2px solid;
    border-bottom: rgb(211, 211, 211) 2px solid;
    width: 100%;
    height: 100%;
}

.save-file-input {
    background-color: #c0c0c0;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 7px 10px;
    font-size: 11px;

    &>span {
        display: flex;
        justify-content: space-between;
        align-content: center;
        white-space: nowrap;

        &>input {
            padding: 0;
            background-color: none;
            border-radius: 0;
            outline: none;
            margin: 3px 2px;
        }

        &>button {
            margin: 3px 5px;
            padding: 0px 7px;
        }
    }
}

// phones
@media (max-width: 500px) {
    .container {
        width: 300px;
        padding: 0 8px 8px 4px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 20em;
    }

    #notepadContent {
        width: 308px;
        height: 100%;
    }
}

// tablets
@media (min-width: 501px) and (max-width: 767px) {
    .container {
        width: 400px;
        padding: 0 8px 8px 4px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 20em;
    }

}
</style>