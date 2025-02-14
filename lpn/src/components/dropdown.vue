<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";

const props = defineProps<{
  label: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
}>();

const target = ref();
const show = ref(props.isOpen);

watch(() => props.isOpen, (newValue) => {
  show.value = newValue;
});

onClickOutside(target, () => {
  if (show.value) {
    show.value = false;
    emit('toggle');
  }
});

const toggle = () => {
  show.value = !show.value;
  emit('toggle');
};

defineExpose({ toggle });
</script>

<template>
  <div ref="target">
    <slot name="selector" :toggle="toggle">
      <span class="dropdown-label" @click="toggle">
        {{ label }}
        <slot name="icon"></slot>
      </span>
    </slot>
    <div class="overlay" v-show="show">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  width: 100%;
  z-index: 1;
}
</style>