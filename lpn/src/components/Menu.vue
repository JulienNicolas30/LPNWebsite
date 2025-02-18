<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import sitemap from "./../sitemap.json";
import Dropdown from "./dropdown.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faLinkedin,
  faXTwitter,
  faTwitch,
} from "@fortawesome/free-brands-svg-icons";
import { 
  faBars,
  faTimes,
  faSun,
  faMoon,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useWindowScroll } from "@vueuse/core";
import DropdownMenu from "./DropdownMenu.vue";

library.add(
  faTwitch,
  faXTwitter,
  faInstagram,
  faLinkedin,
  faBars,
  faTimes,
  faChevronDown,
  faSun,
  faMoon
);

const isMenuOpen = ref(false);
const lastScrollY = ref(0);
const isNavVisible = ref(true);
const { y: scrollY } = useWindowScroll();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

const openDropdown = ref<string | null>(null);

const toggleDropdown = (key: string | null = null) => {
  if (key === null || openDropdown.value === key) {
    openDropdown.value = null;
  } else {
    openDropdown.value = key;
  }
};
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark");
};

const handleSubMenuClick = (event: Event) => {
  event.stopPropagation();
  openDropdown.value = null;
};

const handleScroll = () => {
  const currentScrollY = scrollY.value;
  if (currentScrollY < lastScrollY.value || currentScrollY < 50) toggleDropdown();
  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="nav-container"
    :class="[{ 'nav-hidden': !isNavVisible }]">
    <div class="nav-content">
      <a href="/" :class="{ active: isMenuOpen }">
        <img src="/assets/logo-horizontal.svg" alt="logo" id="logo" />
      </a>
      <nav class="nav-links" :class="{ active: isMenuOpen }">
        <DropdownMenu :routes="sitemap.$r">
          <template #default="{ item }">
            <router-link :to="'/' + item.path" class="nav-button">
              {{ item.title }}
            </router-link>
          </template>
          <template #folder="{ item, active }">
            <div class="nav-button" :class="{ active }">
              {{ item.title }}
              <font-awesome-icon :icon="['fas', 'chevron-down']"
                class="nav-icon"
                :class="{ rotate: active }"
              />
            </div>
          </template>
          <template #subitem="{ item, subItem }">
            <router-link :to="'/' + item.path + '/' + subItem.path" class="nav-button">
              {{ subItem.title }}
            </router-link>
          </template>
        </DropdownMenu>
      </nav>
      <div class="nav-right">
        <a href="#" class="adhesion-button">
          Adhésion
        </a>
        <div class="social-icons">
          <a
            href="https://www.linkedin.com/company/parrainsdunum/"
            target="_blank"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
          <a href="https://x.com/parrainsdunum" target="_blank">
            <font-awesome-icon :icon="['fab', 'x-twitter']" />
          </a>
          <a href="https://www.instagram.com/team_irc" target="_blank">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a href="https://www.twitch.tv/team_irc" target="_blank">
            <font-awesome-icon :icon="['fab', 'twitch']" />
          </a>
        </div>
        <button @click="toggleDarkMode" class="theme-toggle">
          <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
        </button>
        <button class="mobile-menu-toggle" @click="toggleMenu">
          <font-awesome-icon :icon="isMenuOpen ? 'times' : 'bars'" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-hidden {
  transform: translateY(-100%);
}

.nav-container {
  width: 100%;
  background-color: #004771;
  z-index: 1;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  border-bottom: 2px solid #d3d9e3;
}

#logo {
  height: 96px;
  width: auto;
  vertical-align: middle;
}

.nav-links {
  display: flex;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  height: 96px;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  cursor: pointer;
  user-select: none;
  background-color: #004771;
  color: #fdfdfe;
  font-size: 18px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-button:hover,
.nav-button.active {
  background-color: #038cd9;
  color: white;
}

.nav-icon {
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.nav-icon.rotate {
  transform: rotate(180deg);
}

:deep(.overlay) {
  width: max-content;
  min-width: 100%;
  margin: 0;
  padding: 0;
  background-color: #004771;
  border: 1px solid #fdfdfe;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transition: all 0.3s ease;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fdfdfe;
}

.adhesion-button {
  position: relative;
  border: 1px solid #fdfdfe;
  padding: 0.8rem 1.5rem;
  background: #4caf50;
  color: white;
  font-weight: 500;
  overflow: hidden;
  z-index: 1;
  border-radius: 32px;
  transition: transform 0.3s ease;
}

.adhesion-button:hover {
  transform: scale(1.1);
}

.social-icons {
  display: flex;
  gap: 12px;
  color: #fdfdfe;
}

.social-icons a,
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* Ajuste selon tes besoins */
  height: 40px;
  border-radius: 50%;
  border: none;
  font-size: 32px;
  cursor: pointer;
}

.theme-toggle {
  background: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.theme-toggle:hover {
  color: #333;
  transform: rotate(180deg);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
}

@media (max-width: 1024px) {
  #logo {
    margin-bottom: 10px;
  }

  .nav-links {
    flex-wrap: wrap;
  }

  .social-icons {
    margin-top: 10px;
  }
  :deep(.overlay) {
    min-width: 400px;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 106px;
    right: -100%;
    width: 100%;
    height: calc(100vh - 80px);
    background: white;
    padding: 1rem;
    transition: right 0.3s ease;
    overflow-y: auto;
  }

  .nav-links.active {
    right: 0;
  }

  .nav-button {
    font-size: 16px;
    line-height: 8px;
  }

  a.nav-button {
    justify-content: unset;
  }

  div.nav-button {
    cursor: unset;
  }

  .nav-icon {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .social-icons {
    display: none;
  }

  :deep(.overlay) {
    position: static;
    min-width: 100%;
    transform: none;
    box-shadow: none;
    border: none;
    border-radius: unset;
    padding-top: 1rem;
    opacity: 1;
    visibility: visible;
    translate: 0px;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  :deep(.nav-item) {
    width: 100%;
    border-top: 1px solid var(--br1-lt-1);
  }

  .dark .nav-links {
    background: #1a1a1a;
  }
}
</style>
