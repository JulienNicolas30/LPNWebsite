<script setup lang="ts">
import { type PropType, computed } from "vue";

interface Card {
  image?: string;
  title?: string;
  content?: string;
  isImg?: boolean;
}

const props = defineProps({
  content: Array as PropType<Card[]>,
});

const getImageUrl = (imagePath: string | undefined) => {
  if (!imagePath) return '';
  // Si c'est une URL (commence par http ou https), la retourner directement
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Sinon, c'est un fichier local dans assets
  return `/src/assets/${imagePath}`;
};

// Regroupe les éléments en sections image + texte
const sections = computed(() => {
  const result: { image?: string; text?: Card }[] = [];
  let currentSection: { image?: string; text?: Card } = {};

  for (const item of props.content || []) {
    if (item.image) {
      if (Object.keys(currentSection).length > 0) {
        result.push(currentSection);
      }
      currentSection = { image: item.image };
    } else if (item.content || item.title) {
      currentSection.text = item;
      result.push(currentSection);
      currentSection = {};
    }
  }

  if (Object.keys(currentSection).length > 0) {
    result.push(currentSection);
  }

  return result;
});

// document.getElementById("page")?.classList.add("background1");
document.getElementsByTagName("body")[0].classList.add("background1");
document.getElementsByTagName("body")[0].classList.add("color1");
</script>

<template>
  <section class="mission-section">
    <div class="content-wrapper">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="content-block"
      >
        <div v-if="section.image" class="image-container">
          <img
            :src="getImageUrl(section.image)"
            class="card-image"
            alt="image illustration"
          />
        </div>
        <div
          v-if="section.text"
          class="text-container"
          :class="{ 'text-blue': section.text.isImg }"
        >
          <h3 v-if="section.text.title" class="card-title">
            {{ section.text.title }}
          </h3>
          <p v-if="section.text.content" class="card-content">
            {{ section.text.content }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission-section {
  width: 100%;
  padding: 2rem;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.content-block {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 4rem;
  width: 100%;
}

.image-container {
  width: 33.333%;
  min-width: 33.333%;
  max-width: 33.333%;
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  display: block;
  border: 1px solid #e0e0e0;
}

:root.dark .card-image {
  border-color: #14202C;
}

.text-container {
  width: 66.666%;
  flex-grow: 1;
}

.text-blue {
  color: #038cd9;
}

:root.dark .text-blue {
  color: #0aa0f6;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  }

:root.dark .card-title {
  color: #fdfdfe;
}

.card-content {
  font-size: 1.4rem;
  line-height: 1.6;  
}

:root.dark .card-content {
  color: #fdfdfe;
}

@media (max-width: 768px) {
  .content-block {
    flex-direction: column;
  }

  .image-container,
  .text-container {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
}
</style>
