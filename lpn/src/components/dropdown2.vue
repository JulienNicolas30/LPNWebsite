<script setup lang="ts">
defineProps<{ item: any; index: number; activeMenu: number | null }>();
</script>

<template>
  <div class="nav-button">
    {{ item.title }}
    <div
      class="nav-button-line"
      :class="{ active: activeMenu === index }"
    ></div>
  </div>
  <div class="mega-menu" :class="{ active: activeMenu === index }">
    <div class="mega-menu-content">
      <div
        v-for="(subItem, subIndex) in item.children"
        :key="subIndex"
        class="mega-menu-item"
      >
        <router-link :to="'/' + item.path + '/' + subItem.path">
          <h3>{{ subItem.title }}</h3>
          <p>{{ subItem.description }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: white;
  min-width: 600px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.mega-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.mega-menu-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.mega-menu-item {
  text-align: left;
}

.mega-menu-item h3 {
  color: #333;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.mega-menu-item h3::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 30px;
  height: 2px;
  background: #4caf50;
  transition: width 0.3s ease;
}

.mega-menu-item:hover h3::after {
  width: 100%;
}

.mega-menu-item p {
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
}
</style>
