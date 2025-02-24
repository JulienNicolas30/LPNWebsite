<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedinIn,
  faInstagram,
  faXTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookF, faXTwitter, faLinkedinIn, faInstagram);

const socialLinks = [
  { icon: ["fab", "x-twitter"], url: "https://x.com/parrainsdunum" },
  {
    icon: ["fab", "linkedin-in"],
    url: "https://www.linkedin.com/company/parrainsdunum/",
  },
  { icon: ["fab", "instagram"], url: "https://www.instagram.com/team_irc/" },
  {
    icon: ["fab", "facebook-f"],
    url: "https://www.facebook.com/profile.php?id=100066600245148",
  },
];
</script>

<template>
  <div class="social-bar">
    <a
      v-for="(social, index) in socialLinks"
      :key="index"
      :href="social.url"
      target="_blank"
      class="social-link"
    >
      <FontAwesomeIcon :icon="social.icon" />
    </a>
  </div>
</template>

<style scoped>
.social-bar {
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  transition: background 0.3s, transform 0.2s;
}

.social-link:hover {
  background-color: #0073b1;
  transform: scale(1.2);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.social-link {
  opacity: 0;
  animation: slideIn 0.5s ease forwards;
}
.social-link:nth-child(1) {
  animation-delay: 0.1s;
}
.social-link:nth-child(2) {
  animation-delay: 0.2s;
}
.social-link:nth-child(3) {
  animation-delay: 0.3s;
}
.social-link:nth-child(4) {
  animation-delay: 0.4s;
}

@media (max-width: 1024px) {
  .social-bar {
    right: 5px;
  }

  .social-link {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .social-bar {
    right: unset;
    left: 50%;
    bottom: 15px;
    top: unset;
    transform: translateX(-50%);
    flex-direction: row;
    gap: 10px;
  }

  .social-link {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .social-bar {
    bottom: 10px;
    gap: 8px;
  }

  .social-link {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
}
</style>
