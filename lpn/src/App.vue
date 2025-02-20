<script setup lang="ts">
import { ref } from "vue";
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer2 from "./components/Footer2.vue";
let v2 = ref(false);
let theme = ref("theme1");
</script>

<template>
  <div :class="theme">
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

    <!-- Theme Switcher -->
    <div id="toggler">
      <button @click="v2 = !v2">Version</button><br />
      <select id="theme-select" v-model="theme">
        <option value="theme1">Theme 1</option>
        <option value="theme2">Theme 2</option>
        <option value="theme3">Theme 3</option>
      </select>
    </div>
  </div>
</template>

<style>
#toggler {
  position: absolute;
  left: 0;
  top: 50%;
}
</style>
