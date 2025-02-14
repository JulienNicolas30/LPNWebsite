import { type Component } from "vue";
import cards from "./cards.vue";
import Base from "./Base.vue";
import cards2 from "./cards2.vue";
import ArticleTemplate from "./ArticleTemplate.vue";

// Export all templates
const templates = {
  cards,
  Base,
  cards2,
  ArticleTemplate
} as Record<string, Component>;

export { Base, ArticleTemplate };
export default templates;
