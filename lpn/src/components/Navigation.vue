<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import sitemap from "../sitemap.json";
import { useWindowScroll } from "@vueuse/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import {  
  faLinkedinIn,
  faInstagram,
  faXTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faTimes,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faInstagram,
  faBars,
  faTimes,
  faSun,
  faMoon
);

const isMenuOpen = ref(false);
const isDarkMode = ref(false);
const lastScrollY = ref(0);
const isNavVisible = ref(true);
const activeMenu = ref<number | null>(null);
const { y: scrollY } = useWindowScroll();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark");
};

const handleScroll = () => {
  const currentScrollY = scrollY.value;
  isNavVisible.value =
    currentScrollY < lastScrollY.value || currentScrollY < 50;
  lastScrollY.value = currentScrollY;
};

const handleMouseEnter = (index: number) => {
  activeMenu.value = index;
};

const handleMouseLeave = () => {
  activeMenu.value = null;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const socialLinks = [
  { icon: ["fab", "x-twitter"], url: "https://x.com/parrainsdunum" },
  { icon: ["fab", "linkedin-in"], url: "https://www.linkedin.com/company/parrainsdunum/" },
  { icon: ["fab", "instagram"], url: "https://www.instagram.com/team_irc/" },
  { icon: ["fab", "facebook-f"], url: "https://www.facebook.com/profile.php?id=100066600245148" },
];
</script>

<template>
  <nav
    :class="[
      'nav-container',
      { 'nav-hidden': !isNavVisible },
      { dark: isDarkMode },
    ]"
  >
    <div class="nav-content">
      <!-- Logo -->
      <a href="/" class="logo">
        <img src="../assets/logo-horizontal.svg" alt="Logo" />
      </a>

      <!-- Desktop Menu -->
      <nav class="nav-links" :class="{ active: isMenuOpen }">
        <div
          v-for="(item, index) in sitemap.$r"
          :key="index"
          class="nav-item"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        >
          <router-link :to="'/' + item.path" class="nav-button">
            {{ item.title }}
            <div
              class="nav-button-line"
              :class="{ active: activeMenu === index }"
            ></div>
          </router-link>

          <div
            v-if="item.children"
            class="mega-menu"
            :class="{ active: activeMenu === index }"
          >
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
        </div>
      </nav>

      <!-- Right Section -->
      <div class="nav-right">
        <!-- Social Icons -->
        <div class="social-icons">
          <a
            v-for="(social, index) in socialLinks"
            :key="index"
            :href="social.url"
            class="social-icon"
          >
            <font-awesome-icon :icon="social.icon" />
          </a>
        </div>

        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode" class="theme-toggle">
          <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
        </button>

        <!-- Adhesion Button -->
        <a href="#" class="adhesion-button">
          <span>Adhésion</span>
          <span class="adhesion-button-background"></span>
        </a>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" @click="toggleMenu">
          <font-awesome-icon :icon="isMenuOpen ? 'times' : 'bars'" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-container {
  max-width: 100vw !important;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: transform 0.3s ease;
  box-sizing: border-box;
  font-family: "NeuePlak-Bold";
  font-weight: bold;
  font-style: normal;
}

.nav-hidden {
  transform: translateY(-100%);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: 100vw;
}

.logo {
  height: 48px;
  display: flex;
  align-items: center;
  object-fit: contain;  
}

.logo img {
  height: 100%;
  transition: transform 0.3s ease;
}

.logo:hover img {
  transform: scale(1.1);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  margin: 0 2rem;
}

.nav-item {
  position: relative;
}

.nav-button {
  background: none;
  border: none;
  padding: 1rem 0.5rem;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.nav-button-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #4caf50;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-button-line.active {
  width: 100%;
}

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

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.social-icons {
  display: flex;
  gap: 0.5rem;
}

.social-icon {
  color: #666;
  transition: all 0.3s ease;
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f5f5f5;
  transform: scale(0);
  transition: transform 0.3s ease;
}

.social-icon:hover::before {
  transform: scale(1);
}

.social-icon svg {
  z-index: 1;
}

.theme-toggle {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.theme-toggle:hover {
  color: #333;
  transform: rotate(180deg);
}

.adhesion-button {
  position: relative;
  background: none;
  border: none;
  padding: 0.8rem 1.5rem;
  color: white;
  font-weight: 500;
  overflow: hidden;
  z-index: 1;
  border-radius: 32px;
}

.adhesion-button-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #4caf50;
  z-index: -1;
  transition: transform 0.3s ease;
}

.adhesion-button:hover .adhesion-button-background {
  transform: scale(1.1);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
}

/* Dark Mode */
.dark {
  background: #14202c;
}

.dark .nav-button {
  color: #fff;
}

.dark .mega-menu {
  background: #2a2a2a;
}

.dark .mega-menu-item h3 {
  color: #fff;
}

.dark .mega-menu-item p {
  color: #ccc;
}

.dark .social-icon {
  color: #ccc;
}

.dark .social-icon::before {
  background: #333;
}

/* Mobile Styles */
@media (max-width: 1024px) {
  .mega-menu {
    min-width: 400px;
  }

  .mega-menu-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 2rem;
    margin: 0;
    transition: right 0.3s ease;
    overflow-y: auto;
  }

  .nav-links.active {
    right: 0;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .social-icons {
    display: none;
  }

  .nav-item {
    width: 100%;
  }

  .mega-menu {
    position: static;
    min-width: 100%;
    transform: none;
    box-shadow: none;
    padding: 1rem 0;
    margin-top: 1rem;
    opacity: 1;
    visibility: visible;
  }

  .mega-menu-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .dark .nav-links {
    background: #1a1a1a;
  }
}
</style>
