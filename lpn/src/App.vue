<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer2 from "./components/Footer2.vue";
</script>

<template>
  <!-- <Menu /> -->
  <Navigation /> 
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <KeepAlive>
        <component :is="Component" :key="$route.path" />
      </KeepAlive>
    </template>
  </router-view>
  <Footer2 />
  <!-- <Footer /> -->

</template>

<style>

.content {
  margin-top: 80px; /* Pour compenser la hauteur du menu fixe */
  padding: 2rem;
}

/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Dark mode */
/* :root {
  --bg-color: #ffffff;
  --text-color: #333333;
} */

.dark {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

@media screen and (max-width: 768px) {

  .menu,
  .page,
  .footer {
    width: 100%;
  }
}
</style>
