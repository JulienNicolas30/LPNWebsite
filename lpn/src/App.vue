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
</style>
