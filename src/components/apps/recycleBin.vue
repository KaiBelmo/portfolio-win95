<template>
    <div>
        <outline-window v-if="displayWindow" :disableBtn="true" @closeWindow="close">
            <template v-slot:header>Recyle Bin</template>
            <template v-slot:body>
                <div class="container">
                    <div class="menu">
                        <ul>
                            <li class="file-section">file
                                <ul class="file-dropdown window_outline">
                                    <li class="disabled-text">create shortcut</li>
                                    <li class="disabled-text">delete</li>
                                    <li class="disabled-text">rename</li>
                                    <li @click="close">close</li>
                                </ul>
                            </li>
                            <li class="edit-section">edit
                                <ul class="edit-dropdown window_outline">
                                    <li class="disabled-text">select all</li>
                                    <li class="disabled-text">invert selection</li>
                                </ul>
                            </li>
                            <li>view</li>
                        </ul>
                    </div>
                    <div class="table">
                        <table class="table-body">
                            <tr>
                                <td>name</td>
                                <td>original location</td>
                                <td>deleted date</td>
                                <td>type</td>
                                <td>size</td>
                            </tr>
                            <tr v-for="deletedApp in deletedApps">
                                <td>{{ deletedApp.name }}</td>
                                <td>{{ deletedApp.originalLocation }}</td>
                                <td>{{ deletedApp.deletedDate }}</td>
                                <td>{{ deletedApp.type }}</td>
                                <td>{{ deletedApp.size }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </template>
        </outline-window>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import OutlineWindow from '@/components/slots/outlineWindow.vue';
import { useAppStore } from '@/stores/appStore';
import type { IRecycleBin } from "@/assets/ts/apps";

let appStore = useAppStore();
let displayWindow: Ref<boolean> = ref(true);
let index: number = appStore.apps.findIndex(app => app.appName === "recycle bin");
let deletedApps: Ref<IRecycleBin[] | undefined> = ref(appStore.apps[index].recycleBinContent);

let close = (): void => {
    if (index !== -1) {
        appStore.apps[index].openWindow = false;
        displayWindow.value = false;
    }
}
</script>

<style scoped lang="scss">
.container {
    width: calc(100% - 4px);
    height: 100%;
    padding: 0px 4px 4px 4px;
}

.menu {
    &>ul {
        display: flex;
        gap: 10px;
        font-size: 9px;
        cursor: default;
        margin-bottom: 4px;

        &>li:not(:last-child)::first-letter {
            text-decoration: underline;
        }
    }
}

.table {
    font-size: 11px;
    border-top: rgb(133, 133, 133) 2px solid;
    border-left: rgb(133, 133, 133) 2px solid;
    border-bottom: rgb(241, 241, 241) 2px solid;
    border-right: rgb(241, 241, 241) 2px solid;
    white-space: nowrap;

    &-body {
        border-collapse: collapse;
        border-top: rgb(25, 25, 25) 2px solid;
        border-left: rgb(25, 25, 25) 2px solid;
        border-bottom: rgb(214, 214, 214) 2px solid;
        border-right: rgb(214, 214, 214) 2px solid;
        width: 100%;

        & tr td {
            padding: 0 10px 0 10px;
        }

        & tr:first-child td {
            background-color: rgb(192, 192, 192);
            border: 2px solid black;
        }

        & tr:not(:first-child) {
            background-color: white;
            font-size: 9.5px;
            color: rgb(66, 66, 66);
        }
    }
}

.file-section,
.edit-section {

    &:hover>.file-dropdown,
    &:active>.file-dropdown {
        display: block;
    }

    &:hover>.edit-dropdown,
    &:active>.edit-dropdown {
        display: block;
    }

    &>.file-dropdown,
    &>.edit-dropdown {
        display: none;
        padding: 1px 3px 1px 3px;
        position: absolute;
        background-color: rgb(192, 192, 192);
        font-size: 7px;
    }
}

// phones
@media (max-width: 500px) {
    .table {
        &-body {
            &>tr td:nth-child(3) {
                display: none;
            }            
            &>tr td:nth-child(4) {
                display: none;
            }            
        }
    }
}

// tablets
@media (min-width: 501px) and (max-width: 767px) {
    .table {
        &-body {            
            &>tr td:nth-child(4) {
                display: none;
            }            
        }
    }
}
</style>