<template>
    <div>
        <Notepad :content="content"></Notepad>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import Notepad from './notepad.vue';
import { useAppStore } from '@/stores/appStore';

let appStore = useAppStore();

let content: Ref<string | undefined> = ref("")

onBeforeMount(() => {
    content.value = appStore.apps[appStore.index].notepadContent !== undefined ? appStore.apps[appStore.index].notepadContent : '';
})
</script>
