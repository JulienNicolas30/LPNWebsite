<script setup lang="ts">
import { type PropType } from "vue";
import { computed } from "vue";
defineProps({ content: Array as PropType<Card[]> });
interface Card {
  image?: string;
  title?: string;
  content?: string;
  isBlue?: boolean;
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
      <div
        v-for="card in content"
        class="card"
        :class="{ 'blue-card': card.isBlue }"
      >
        <template v-if="card.isBlue">
          <h3 v-if="card.title" class="card-title">{{ card.title }}</h3>
          <p class="card-content">{{ card.content }}</p>
        </template>
        <template v-else>
          <img
            v-if="card.image"
            :src="getImageUrl(card.image)"
            class="card-image"
            alt="Image illustration"
          />
          <div v-if="card.title || card.content" class="card-body">
            <p v-if="card.content" class="card-content">{{ card.content }}</p>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style>
.mission-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
}

.mission-title {
  font-family: "NeuePlak-Bold", sans-serif;
  color: #fdfdfe;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  max-width: 1440px;
  width: 100%;
}

.card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  height: 364px;
  background-color: #fdfdfe;
  padding: 6px;
  border: 2px #fdfdfe solid;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.blue-card {
  background-color: #038cd9;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
}

.card-title {
  font-family: "NeuePlak-Bold", sans-serif;
  color: white;
  margin-bottom: 0.5rem;
  text-decoration: underline;
}

.card-content {
  color: #132121;
  font-size: 1.4rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .card {
    height: 300px;
  }

  .mission-title {
    font-size: 2rem;
  }
}
</style>
