<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const position = ref(0);
const isPaused = ref(false);
let animationFrame: number | null = null;
const speed = 0.03; // pixels per frame

const animate = () => {
  if (!isPaused.value) {
    position.value -= speed;
    if (position.value <= -100) {
      position.value = 0;
    }
  }
  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  animationFrame = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Contact Column -->
      <div class="footer-column">
        <h3>Contact</h3>
        <div class="contact-info">
          <p>
            <strong>Email: </strong>
            <a href="mailto:contact@example.com">contact@example.com</a>
          </p>
          <p>
            <strong>Téléphone: </strong>
            <a href="tel:+33123456789">+33 1 23 45 67 89</a>
          </p>
          <address>
            <strong>Adresse: </strong><br />
            123 Rue Example<br />
            75000 Paris, France
          </address>
        </div>
      </div>

      <!-- Missions Column -->
      <div class="footer-column">
        <h3>Nos Missions</h3>
        <ul class="missions-list">
          <li><a href="#">Mission1</a></li>
          <li><a href="#">Mission2</a></li>
          <li><a href="#">Mission3</a></li>
          <li><a href="#">Mission4</a></li>
        </ul>
      </div>

      <!-- Partners Column -->
      <div class="footer-column">
        <h3>Nos Partenaires</h3>
        <Vue3Marquee id="partners" class="marquee-container" clone pauseOnHover>
          <a href="https://herault.fr/" target="_blank">
            <img src="../assets/img/herault.jpg" alt="Partner Logo" />
          </a>
          <a href="https://www.montpellier.fr/" target="_blank">
            <img
              src="../assets/img/Ville_de_Montpellier.png"
              alt="Partner Logo"
            />
          </a>
          <a href="https://flyingfishproduction.com/" target="_blank">
            <img src="../assets/img/FFLOGO.webp" alt="Partner Logo" />
          </a>
          <a href="https://www.pedagojeux.fr/" target="_blank">
            <img src="../assets/img/pedagojeux_logo.webp" alt="Partner Logo" />
          </a>
          <a href="https://www.promeneursdunet.fr/" target="_blank">
            <img
              src="../assets/img/PROMENEURS_DU_NET_2.webp"
              alt="Partner Logo"
            />
          </a>
          <a href="https://www.ufcv.fr/" target="_blank">
            <img src="../assets/img/UFCV.webp" alt="Partner Logo" />
          </a>
        </Vue3Marquee>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: white;
  padding: 4rem 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 4rem;
  width: 100%;
  font-family: "NeuePlak-Bold";
  font-weight: bold;
  font-style: normal;
}

.footer-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 100vw;
  gap: 1rem;
}

.footer-column {
  flex: 1;
  min-width: 0;
  padding: 1rem;
}

.footer-column h3 {
  color: #00283f;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.footer-column h3::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: #00ff91;
  transition: width 0.3s ease;
}

.footer-column:hover h3::after {
  width: 100%;
}

/* Contact Styles */
.contact-info {
  font-size: 0.95rem;
  line-height: 1.6;
}

.contact-info p {
  margin-bottom: 1rem;
}

.contact-info a {
  color: #03915e;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-info a:hover {
  color: #00ff91;
}

address {
  font-style: normal;
  margin-top: 1rem;
}

/* Missions Styles */
.missions-list {
  list-style: none;
  padding: 0;
}

.missions-list li {
  margin-bottom: 0.75rem;
}

.missions-list a {
  color: #004771;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 1.5rem;
}

.missions-list a::before {
  content: "→";
  position: absolute;
  left: 0;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.missions-list a:hover {
  color: #00ff91;
  padding-left: 2rem;
}

.missions-list a:hover::before {
  opacity: 1;
  transform: translateX(0);
}

.marquee-container img {
  height: 96px;
  margin: 0 5px;
  object-fit: contain;
}

:root .contact-info {
  color: #00283f;
}
/* Dark Mode */
:root[class~="dark"] .footer {
  background: #14202C;
}

:root[class~="dark"] .footer-column h3 {
  color: #fdfdfe;
}

:root[class~="dark"] .missions-list a {
  color: #fdfdfe;
}

:root[class~="dark"] .missions-list a:hover {
  color: #1BD47A;
}

:root[class~="dark"] .contact-info {
  color: #fdfdfe;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 3rem;
  }

  .footer-column {
    text-align: center;
    padding: 0;
  }

  .footer-column h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .missions-list a {
    padding-left: 0;
  }

  .missions-list a:hover {
    padding-left: 0;
  }

  .missions-list a::before {
    display: none;
  }

  .contact-info {
    text-align: center;
  }
}
</style>
