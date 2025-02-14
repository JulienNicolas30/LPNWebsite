<script setup lang="ts">
import { type PropType, computed } from 'vue';

interface Article {
  title?: string;
  content?: string;
  date?: string;
  image?: string;
  author?: string;
  category?: string;
}

const props = defineProps({
  content: Array as PropType<Article[]>,
});

const articles = computed(() => {
  return props.content || [];
});

const getImagePath = (imagePath: string) => {
  // Utiliser le chemin statique pour les images
  return `/src/assets/${imagePath}`;
};

// Ajout des classes de style au body
document.getElementsByTagName("body")[0].classList.add("background1");
document.getElementsByTagName("body")[0].classList.add("color1");
</script>

<template>
  <div class="article-page">
    <div class="articles-container">
      <article v-for="(article, index) in articles" :key="index" class="article">
        <header class="article-header">
          <div v-if="article.category" class="article-category">{{ article.category }}</div>
          <h2 class="article-title">{{ article.title }}</h2>
          <div class="article-meta">
            <span v-if="article.author" class="article-author">Par {{ article.author }}</span>
            <span v-if="article.date" class="article-date">{{ article.date }}</span>
          </div>
        </header>

        <div v-if="article.image" class="article-image">
        <div class="article-body" v-html="article.content"></div><br/>
        <img :src="getImagePath(article.image)" :alt="article.title" />
        </div>
        <div v-else class="article-body" v-html="article.content"></div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.article-page {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.articles-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article {
  background-color: #fdfdfe;
  color: #2c3e50;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:root.dark .article {
  background-color: #14202C;
  color: #fdfdfe;
}

.article-category {
  display: inline-block;
  background-color: #fdfdfe;
  color: #666666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

:root.dark .article-category {
  background-color: #333333;
  color: #fdfdfe;
}

.article-title {
  font-size: 2rem;
  margin: 0.5rem 0;
  color: #1a1a1a;
}

:root.dark .article-title {
  color: #fdfdfe;
}

.article-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666666;
  margin-bottom: 1rem;
}

:root.dark .article-meta {
  color: #aaaaaa;
}

.article-image {
  margin: 1rem 0;
  text-align: center;
}

.article-image img {
  max-width: 200px;
  height: auto;
  object-fit: contain;
}

.article-body {
  line-height: 1.6;
  color: #2c3e50;
}

:root.dark .article-body {
  color: #dddddd;
}

.article-body h3 {
  color: #1a1a1a;
  margin: 1.5rem 0 1rem;
}

:root.dark .article-body h3 {
  color: #ffffff;
}

.article-body h4 {
  color: #1a1a1a;
  margin: 1.2rem 0 0.8rem;
}

:root.dark .article-body h4 {
  color: #ffffff;
}

.article-body p {
  margin-bottom: 1rem;
}

.article-body ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.article-body li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .article-page {
    padding: 1rem;
  }

  .article {
    padding: 1.5rem;
  }

  .article-title {
    font-size: 1.5rem;
  }
}
</style>
