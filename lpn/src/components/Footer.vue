<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h2>Contact</h2>
        <ul>
          <li>Email: contact@lpn.com</li>
          <li>Téléphone: +33</li>
          <li>Adresse:</li>
        </ul>
      </div>
      <div class="footer-section">
        <h2>Nos Missions</h2>
      </div>
      <div class="footer-section">
        <h2>Nos Partenaires</h2>
        <div class="partners-section">
          <div class="marquee-section">
            <div class="marquee-container">
              <Vue3Marquee id="partners" clone pauseOnHover>
                <a href="https://herault.fr/" target="_blank">
                  <img src="/assets/img/herault.jpg" alt="Partner Logo" />
                </a>
                <a href="https://www.montpellier.fr/" target="_blank">
                  <img
                    src="/assets/img/Ville_de_Montpellier.png"
                    alt="Partner Logo"
                  />
                </a>
                <a href="https://flyingfishproduction.com/" target="_blank">
                  <img src="/assets/img/FFLOGO.webp" alt="Partner Logo" />
                </a>
                <a href="https://www.pedagojeux.fr/" target="_blank">
                  <img
                    src="/assets/img/pedagojeux_logo.webp"
                    alt="Partner Logo"
                  />
                </a>
                <a href="https://www.promeneursdunet.fr/" target="_blank">
                  <img
                    src="/assets/img/PROMENEURS_DU_NET_2.webp"
                    alt="Partner Logo"
                  />
                </a>
                <a href="https://www.ufcv.fr/" target="_blank">
                  <img src="/assets/img/UFCV.webp" alt="Partner Logo" />
                </a>
              </Vue3Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@font-face {
  font-family: "NeuePlak-Bold";
  src: url("../assets/fonts/NeuePlak-Bold.otf") format("opentype");
  font-weight: bold;
  font-style: normal;
}

.footer {
  width: 100%;
  padding: 0;
  font-family: "NeuePlak-Bold";  
}

.footer-content {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  margin: 0;
}

.footer-section {
  flex: 1;
  padding: 0 1rem;
}

.footer-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.partners-section {
  width: 100%;
  text-align: left;
  padding: 10px 0;
}

.marquee-container {
  max-width: 500px;
  margin: 0;
}

.marquee-section {
  display: flex;
  justify-content: center;
  width: 100%;
}

.marquee-container img {
  height: 96px;
  margin: 0 5px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin-bottom: 2rem;
  }
}
</style>
