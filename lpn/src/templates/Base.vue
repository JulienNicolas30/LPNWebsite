<script setup lang="ts">
defineProps<{ content: string }>();
</script>

<template>
    <div v-html="content"></div>
</template>

<style></style>
