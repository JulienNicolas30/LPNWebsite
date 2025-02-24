<script setup lang="ts">
import { type PropType } from "vue";
import { computed } from "vue";

defineProps({ content: Array as PropType<Card[]> });

interface Card {
  image?: string;
  title?: string;
  content?: string;
}

const getImageUrl = computed(() => {
  return (imagePath: string | undefined) => {
    if (!imagePath) return undefined;
    return new URL(imagePath, import.meta.url).href;
  };
});
</script>

<template>
  <section class="mission-section">
    <div class="cards-grid">
      <div v-for="card in content" class="card">
        <div class="card-image-container">
          <img
            v-if="card.image"
            :src="getImageUrl(card.image)"
            class="card-image"
            alt="Image illustration"
          />
        </div>
        <div class="card-text">
          <h2 v-if="card.title" class="card-title">{{ card.title }}</h2>
          <p v-if="card.content" class="card-content">{{ card.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission-section {
  display: flex;
  padding: 2rem;
  width: 100%;
}

.card-title {
  color: black;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
}

.card {
  width: 370px;
  min-height: 730px;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.card-image-container:hover .card-image {
  transform: scale(1.1);
}

.card-text {
  padding: 1.5rem;
  background: white;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}

.card-content {
  font-size: 1.4rem;
  line-height: 1.5;
  word-wrap: break-word;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
