<template>
    <div class="window window_outline" ref="windowHeader">
        <header @mousedown="handleMouseDown($event)" :style="{ cursor: cursorStyle }" class="no-select"
            @mouseleave="isDragging = false">
            <img src="@/assets/mario.gif">
            <slot name="header">
                <p>default name</p>
            </slot>
            <div class="buttons">
                <button class="window_outline" :disabled="disableBtn">&#128469;&#xFE0E;</button>
                <button class="window_outline" :disabled="disableBtn">&#128470;&#xFE0E;</button>
                <button class="window_outline" @click="$emit('closeWindow')">&#128473;&#xFE0E;</button>
            </div>
        </header>

        <body>
            <slot name="body">
            </slot>
        </body>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '@/assets/scss/base.scss'
import type { Coordinates } from '@/assets/ts/utils'
import { resizeWindow } from '@/assets/ts/resizeWindow'

const windowHeader = ref<HTMLInputElement | null>(null);
let isDragging: boolean;
let cursorStyle = ref("default");
const emit = defineEmits(['closeWindow']);

const props = defineProps({
    disableBtn: {
        type: Boolean,
        default: true
    }
});

const handleMouseDown = (e: MouseEvent) => {
    if (windowHeader.value == null)
        return;

    let startX = 0, startY = 0, initDivX = 0, initDivY = 0;
    isDragging = true;
    startX = e.clientX
    startY = e.clientY
    initDivX = windowHeader.value.offsetLeft;
    initDivY = windowHeader.value.offsetTop;
    windowHeader.value.onmousemove = (e: MouseEvent) => {
        if (isDragging) {
            cursorStyle.value = "move"
            let x = initDivX + e.clientX - startX;
            let y = initDivY + e.clientY - startY;
            windowHeader.value!.style.top = y + "px";
            windowHeader.value!.style.left = x + "px";
        }
    }
    windowHeader.value.onmouseup = (e: MouseEvent) => {
        isDragging = false;
        cursorStyle.value = "default"
    }
}

// onMounted(() => {
//     if (windowHeader.value)
//         resizeWindow(windowHeader.value);
// })

</script>

<style scoped lang="scss">
.window {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #c0c0c0;
    padding: 1px;
    z-index: 10;

    &>header {
        height: 20px;
        padding: 2px 4px 2px 4px;
        display: flex;
        cursor: default;
        justify-content: space-between;
        color: whitesmoke;
        font-size: 11px;
        background: rgb(226, 110, 117);
        background: linear-gradient(141deg, rgba(226, 110, 117, 1) 0%, rgba(192, 89, 125, 1) 69%);

        &>img {
            height: 22px;
            position: absolute;
            z-index: 1;
            animation: walking infinite 10s, rotate infinite 10s;
            animation-timing-function: ease-in-out;
        }

        &>.buttons {
            z-index: 2;
            display: flex;
            align-items: center;

            button {
                font-size: 11px;
                height: 15px;
                padding-bottom: 5px;
                padding-left: 1px;
                padding-right: 1px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 4px;
                background-color: #c0c0c0;
                color: black;

                &:active {
                    border-bottom: rgb(223, 223, 223) 1px solid;
                    border-right: rgb(223, 223, 223) 1px solid;
                    border-top: rgb(61, 61, 61) 1px solid;
                    border-left: rgb(61, 61, 61) 1px solid;
                    box-shadow: -1px -1px 0 black,
                        0px -1px 0 black,
                        -1px 0px 0 black,
                        -1px 1px 0 white,
                        0px 1px 0 white,
                        1px 1px 0 white,
                        1px -1px 0 white,
                        1px 0px 0 white;
                    background-color: #adadad;
                }

                &:disabled {
                    pointer-events: none;
                    color: rgb(132, 133, 132);
                    text-shadow: rgba(254, 254, 254, 0.637) .1px .3px .6px;
                }
            }
        }
    }
}

@keyframes walking {
    0% {
        left: 0;
    }

    50% {
        left: 87%;
    }

    100% {
        left: 0;
    }
}

@keyframes rotate {
    0% {
        transform: rotateY(360deg);
    }

    45% {
        transform: rotateY(360deg);
    }

    50% {
        transform: rotateY(180deg);
    }

    95% {
        transform: rotateY(180deg);
    }

    100% {
        transform: rotateY(360deg);
    }
}
</style>