import { BASE } from "../js/src/config.js";
export default function Home() {
  return `
    <div class="home">

      <!-- HERO -->
      <section class="hero">
        <div class="hero-content">
          <h1>🔥 Tjølling Grillen</h1>
          <p>Pizza, burger og kebab – raskt og digg</p>
          <a href="/menu" data-link class="cta-btn">Se meny</a>
        </div>
      </section>

      <!-- KATEGORIER -->
      <section class="categories">
        <h2>Hva har du lyst på?</h2>

        <div class="category-grid">
            <a class="category-card" href="/menu?cat=pizza" data-link>
                🍕 Pizza
            </a>

            <a class="category-card" href="/menu?cat=burger" data-link>
                🍔 Burger
            </a>

            <a class="category-card" href="/menu?cat=kebab" data-link>
                🌯 Kebab
            </a>

        </div>
      </section>

      <!-- POPULÆRE RETTER -->
      <section class="popular">
        <h2>🔥 Mest populære</h2>
        <div class="popular-items" id="popular-items"></div>
      </section>

      <!-- INFO -->
      <section class="info">
        <div>
          <h3>🚗 Utkjøring</h3>
          <p>Levering innen ca. 1 time</p>
          <p>Kjøretilegg: 50–70 kr</p>
        </div>

        <div>
          <h3>📍 Lokasjon</h3>
          <p>Skreppestad, Larvik</p>
          <p>Gratis parkering</p>
        </div>

        <div>
          <h3>⏱️ Henting</h3>
          <p>Klar på ca. 20 min</p>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <h2>Sulten?</h2>
        <a href="/menu" data-link class="cta-btn">Bestill nå</a>
      </section>

    </div>
  `;
}

export async function initHome() {
   const res = await fetch(`${BASE}data/menu.json`);
  const data = await res.json();

  const popular = data.items.filter(item => item.popular);
    
  const container = document.getElementById("popular-items");

  popular.slice(0, 6).forEach(item => {
    const div = document.createElement("div");
    div.className = "popular-card";

    div.innerHTML = `
      <img src="${item.image}" />
      <h4>${item.name}</h4>
    `;

    container.appendChild(div);
  });
}