<template>
    <div>
        <popup />
        <!-- https://stackoverflow.com/questions/41303982/vue-js-how-to-handle-click-and-dblclick-events-on-same-element -->
        <div>
            <div v-for="(app, index) in appStore.DesktopApps" :key="app.appName">
                <div class="app-wrapper" ref="appWrapper" @dblclick="openApp(index)"
                    @mousedown="startDrag($event, index)" :style="{ left: computeLeft(index) + 'px' }">
                    <img class="no-select pix-icon" :src="app.appIcon" :alt="app.appIcon">
                    <p>{{ app.appName }}</p>
                </div>
                <component v-if="app.openWindow" :is="app.componentName"></component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/assets/scss/base.scss'
import { type Coordinates, isDesktop } from '@/assets/ts/utils'
import { ref } from 'vue';
import Popup from './apps/popup.vue';
import { useAppStore } from '@/stores/appStore';

let appStore = useAppStore();
let appWrapper = ref(null);
let counter = 0;
let isDragging = false;
let coordinates: Coordinates = {
    currentX: 0,
    currentY: 0,
    initialX: 0,
    initialY: 0,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0
};

let computeLeft = (index: number): any => {
    // to execute just once
    if (counter === appStore.apps.length) {
        return;
    }
    counter++;
    return (index * 70);
}

let openApp = (index: number) => {
    appStore.index = index
    appStore.apps[index].openWindow = !appStore.apps[index].openWindow;
}
const startDrag = (event: MouseEvent, index: number) => {    
    if (!isDesktop()){
        openApp(index);
        return;
    }
    if (appWrapper.value === null)
        return;
    let appWrapperElement = appWrapper.value[index] as HTMLElement;
    isDragging = true;
    coordinates.currentX = event.clientX
    coordinates.currentY = event.clientY
    coordinates.initialX = appWrapperElement.offsetLeft
    coordinates.initialY = appWrapperElement.offsetTop
    coordinates.offsetX = coordinates.currentX - coordinates.initialX
    coordinates.offsetY = coordinates.currentY - coordinates.initialY

    appWrapperElement.onmousemove = (event: MouseEvent) => {
        if (isDragging && appWrapper.value) {
            event.preventDefault()
            coordinates.currentX = event.clientX
            coordinates.currentY = event.clientY
            coordinates.x = coordinates.currentX - coordinates.offsetX
            coordinates.y = coordinates.currentY - coordinates.offsetY
            appWrapperElement.style.opacity = 30 + "%"
            appWrapperElement.style.top = coordinates.y + "px"
            appWrapperElement.style.left = coordinates.x + "px"
        }
    }
    appWrapperElement.onmouseup = (event: MouseEvent) => {
        isDragging = false
        appWrapperElement.style.opacity = "1"
    }

}
</script>

<style scoped lang="scss">
.app-wrapper {
    margin: 10px;
    display: inline-flex;
    flex-direction: column;
    font-size: 9px;
    position: absolute;
    transition: box-shadow 100ms ease-in-out;

    &:active {
        &>p {
            border-bottom: 1px solid black;
        }
    }

    &>img {
        width: 32px;
        align-self: center;
        margin-bottom: 1px;
    }

    &>p {
        color: white;
        padding-bottom: 1px;
    }
}
</style>