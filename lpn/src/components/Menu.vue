<script setup lang="ts">
import { ref } from "vue";
import sourcedata from "./../sitemap.json";
import Dropdown from "./dropdown.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faLinkedin,
  faXTwitter,
  faTwitch,
} from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faTwitch, faXTwitter, faInstagram, faLinkedin, faChevronDown);

const pages = ref(sourcedata.$r);

const openDropdown = ref<string | null>(null);

const toggleDropdown = (key: string) => {
  if (openDropdown.value === key) {
    openDropdown.value = null;
  } else {
    openDropdown.value = key;
  }
};

const handleSubMenuClick = (event: Event) => {
  event.stopPropagation();
  openDropdown.value = null;
};
</script>

<template>
  <div class="menu">
    <nav>
      <div class="menu-container">
        <img src="/assets/logo-horizontal.svg" alt="logo" id="logo" />
        <ul id="top">
          <li id="menu" v-for="page in pages" :key="page.path">
            <Dropdown
              class="dropdown"
              v-if="page.children"
              :label="page.title"
              :isOpen="openDropdown === page.path"
              @toggle="toggleDropdown(page.path)"
            >
              <template #selector="{ toggle }">
                <span
                  class="dropdown-label"
                  :class="{ active: openDropdown === page.path }"
                  @click="toggle"
                >
                  {{ page.title }}
                  <font-awesome-icon
                    :icon="['fas', 'chevron-down']"
                    class="dropdown-icon"
                    :class="{ rotate: openDropdown === page.path }"
                  />
                </span>
              </template>
              <template #default>
                <ul id="submenu">
                  <li
                    id="submenus"
                    v-for="subpage in page.children"
                    :key="subpage.path"
                    @click="handleSubMenuClick"
                  >
                    <router-link :to="'/' + page.path + '/' + subpage.path">
                      {{ subpage.title }}
                    </router-link>
                  </li>
                </ul>
              </template>
            </Dropdown>
            <router-link v-else :to="'/' + page.path">
              {{ page.title }}
            </router-link>
          </li>
          <button id="adhesion">ADHÉSION</button>
        </ul>
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
      </div>
    </nav>
  </div>
</template>

<style scoped>
.dropdown-icon {
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.dropdown-label {
  font-family: "NeuePlak-Bold";
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  padding: 16px;
  cursor: pointer;
  background: none;
  color: #038cd9;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-label:hover,
.dropdown-label.active {
  background-color: #038cd9;
  color: white;
}

#submenu {
  border: 1px solid #fdfdfe;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 8px 0;
}

#submenus {
  padding: 8px 16px;
}

#submenus:hover {
  background-color: #f0f0f0;
}

.menu {
  width: 100%;
  background-color: #004771;
}

.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  border-bottom: 2px solid #d3d9e3;
}

#logo-container {
  padding: 10px;
  list-style: none;
}

#logo {
  height: 96px;
  width: auto;
  vertical-align: middle;
}

#adhesion {
  background-color: #1bd47a;
  color: #004771;
  font-family: "NeuePlak-Bold";
  font-size: 18px;
  font-weight: bold;
  padding: 12px 16px;
  border: #fdfdfe 2px solid;
  border-radius: 5rem;
  cursor: pointer;
  margin-left: 20px;
  transition: all 1s ease-out;
}

#adhesion:hover {
  background-color: #1e4a4a;
  color: #fdfdfe;
}

.social-icons {
  display: flex;
  gap: 12px;
  font-size: 32px;
  color: #fdfdfe;
  color: inherit;
}

#top {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-grow: 1;
}

#menu {
  font-family: "NeuePlak-Bold";
  position: middle;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

#menu a,
#menu button {
  display: block;
  font-size: 18px;
  font-weight: bold;
  padding: 16px;
  width: auto;
  cursor: pointer;
  color: #038cd9;
}

#menu a:hover,
#menu button:hover {
  background-color: #038cd9;
  color: white;
}

#submenu {
  font-family: "NeuePlak-Bold";
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #004771;
  list-style: none;
  margin: 0;
  padding: 0;
}

#submenus {
  padding: 0px;
}

#submenus:hover {
  background-color: #038cd9;
}

@media (max-width: 1024px) {
  .menu-container {
    flex-direction: column;
    padding: 10px;
  }

  #logo {
    margin-bottom: 10px;
  }

  #top {
    flex-wrap: wrap;
    justify-content: center;
  }

  .social-icons {
    margin-top: 10px;
  }
}
</style>
