<script setup lang="ts">
import { ref } from "vue";
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer2 from "./components/Footer2.vue";
let v2 = ref(false);
</script>

<template>
  <Menu v-if="v2" />
  <Navigation v-else />
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <KeepAlive>
        <component :is="Component" :key="$route.path" />
      </KeepAlive>
    </template>
  </router-view>
  <Footer v-if="v2" />
  <Footer2 v-else />
  <div id="toggler">
    <button @click="v2 = !v2">Toggle</button>
  </div>
</template>

<style>

#toggler {
  position: absolute;
  left: 0;
  top: 50%;
}
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
