import { BASE } from "../js/src/config.js";

const state = {
  menu: [],
  category: "all"
};


export default function Menu() {
  return `
    <div class="menu-page">
      <h1>MENY</h1>

      <div class="menu-options"></div>
        <div class="allergen-legend">
            🌾 Gluten · 🥛 Melk · 🥚 Egg · 🌶️ Sennep · 🌿 Sesam · 🐟 Fisk · 🫘 Soya
        </div>
      <div class="menu-output"></div>
    </div>
  `;
}



export async function initMenu() {
  const res = await fetch(`${BASE}/data/menu.json`);
  const data = await res.json();

  state.menu = data.items;

  const params = new URLSearchParams(window.location.search);
  const categoryFromUrl = params.get("cat");

  if (categoryFromUrl) {
    state.category = categoryFromUrl;
  }

  renderFilters();
  updateActiveButton(); 
  renderMenu();
}

function renderFilters() {
  const menuOptions = document.querySelector(".menu-options");
  menuOptions.innerHTML = "";

  const container = document.createElement("div");
  container.className = "filters";

  const categories = [
    "all",
    "pizza",
    "innbaktpizza",
    "burger",
    "kebab",
    "salat",
    "grill",
    "småretter",
    "drikker"
  ];

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;

    if (state.category === cat) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      state.category = cat;
      updateView();
    });

    container.appendChild(btn);
  });

  menuOptions.appendChild(container);
}


function updateView() {
  updateActiveButton();
  renderMenu();
}


function updateActiveButton() {
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");

    if (btn.textContent === state.category) {
      btn.classList.add("active");
    }
  });
}


function renderMenu() {
  const menuOutput = document.querySelector(".menu-output");


  menuOutput.innerHTML = "";

  const container = document.createElement("div");
  container.className = "menu-grid";

  const filtered =
    state.category === "all"
      ? state.menu
      : state.menu.filter(item => item.category === state.category);

  filtered.forEach(item => {
    container.appendChild(createCard(item));
  });

  menuOutput.appendChild(container);
}


function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";


  if (item.popular) {
    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = "🔥 Populær";
    card.appendChild(badge);
  }


  const img = document.createElement("img");
  img.src = item.image || "./public/images/default.png";
  img.alt = item.name;
  card.appendChild(img);


  const title = document.createElement("h3");
  title.textContent = item.name;
  card.appendChild(title);

  card.appendChild(renderPrice(item));


  if (item.description) {
    const desc = document.createElement("p");
    desc.textContent = item.description;
    card.appendChild(desc);
  }




  card.appendChild(renderAllergens(item.allergens));

  return card;
}


function renderPrice(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "price-wrapper";

  if (item.sizes) {
    item.sizes.forEach(size => {
      const btn = document.createElement("button");
      btn.className = "size-btn";
      btn.textContent = `${size.size} - ${size.price} kr`;

      btn.addEventListener("click", () => {
        console.log("Legg i handlekurv:", item.name, size.size);
      });

      wrapper.appendChild(btn);
    });
  } else {
    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `${item.price} kr`;
    wrapper.appendChild(price);
  }

  return wrapper;
}


function renderAllergens(allergens = []) {
  const container = document.createElement("div");
  container.className = "allergens";

  const icons = {
    gluten: "🌾",
    melk: "🥛",
    egg: "🥚",
    sennep: "🌶️",
    sesam: "🌿",
    fisk: "🐟",
    soya: "🫘"
  };

  allergens.forEach(a => {
    const span = document.createElement("span");
    span.textContent = icons[a] || a;
    span.title = a;
    container.appendChild(span);
  });

  return container;
}