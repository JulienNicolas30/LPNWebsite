<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";

const props = defineProps<{
  label: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'close'): void;  // Ajout de l'événement close
}>();

const target = ref();
const show = ref(props.isOpen);

// Synchroniser l'état show avec la prop isOpen
watch(() => props.isOpen, (newValue) => {
  show.value = newValue;
});

// Fermer le dropdown quand un clic se produit à l'extérieur
onClickOutside(target, () => {
  if (show.value) {
    show.value = false;
    emit('close');  // Émettre un événement pour informer que le menu doit se fermer
  }
});

const toggle = () => {
  show.value = !show.value;
  emit('toggle');  // Lorsque le menu est ouvert/fermé, on émet un événement
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
