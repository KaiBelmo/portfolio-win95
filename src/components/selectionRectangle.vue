<template>
    <div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { drawRectangle } from '@/assets/ts/drawRectangle'
let canvas: any = ref(null);

onMounted(() => {
    canvas.value = document.getElementById("canvas");
    drawRectangle(canvas.value);
})
</script>

<style scoped lang="scss">
#canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>
