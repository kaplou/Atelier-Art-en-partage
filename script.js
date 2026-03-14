const galleryData = [
  {
    id: "animal-totem",
    title: "Animal Totem",
    class: "animal-totem",
    intro: "Humain et animal se rencontrent. Chaque duo devient un totem, fragile ou puissant, révélant émotions, instincts et mémoires enfouies.",
    items: [
      { title: "La panthère et l'or Inca", description: "Acrylique sur papier 300g 50x70cm", image: "images/02_Totem_Panthere_50x70_2026.jpg" }, 
      { title: "La panthère et l'or Inca", description: "Acrylique sur papier 300g 50x70cm", image: "images/02_Totem_Panthere_50x70_2026.jpg" },
      { title: "Le chat noir et la dame en rouge", description: "Acrylique sur papier 300g 50x70cm", image: "images/03_Totem_chat_50x70_2026.jpg" }
       { title: "Une femme, une hyène : 2 reines", description: "Acrylique sur papier 300g 50x70cm", image: "images/02_Totem_Panthere_50x70_2026.jpg" },
      
    ]
  },
  {
    id: "jardin-meduse",
    title: "Jardin de Méduse",
    class: "jardin-meduse",
    intro: "Fragments de forêt suspendus, micro-territoires suspendus dans le temps.",
    items: [
      { title: "Floraison Abyssale", description: "Peinture sur soie, Carré", image: "images/cover.jpg" },
      { title: "Tentacules d'Or", description: "Acrylique et feuille d'or", image: "images/cover.jpg" }
    ]
  },
  {
    id: "jardin-aquatique",
    title: "Jardin Aquatique",
    class: "jardin-aquatique",
    intro: "Poissons et créatures glissent entre couleurs et formes.",
    items: [
      { title: "Pla-Kat Ciel d'orage", description: `Argile, papier mûrier, acrylique et aquarelles<br>Socle béton brut<br>8 × 8 × 48 cm`, image: "images/Pla_kat_cieldorage8x8x38_2026.jpg" },
      { title: "L'Ondée Bleue", description: "Aquarelle, Paysage", image: "images/cover.jpg" }
    ]
  },
  {
    id: "hors-serie",
    title: "Hors-Série",
    class: "hors-serie",
    intro: "Expériences et formes libres, chaque œuvre ouvre un monde autonome.",
    items: [
      { title: "La déchéance", description: "Acrylique sur chassis 75x115cm", image: "images/01_La_Decheance_75x115_2025.jpg.jpg" },
      { title: "Murmure de Béton", description: "Sculpture murale", image: "images/cover.jpg" }
    ]
  },
  {
    id: "portraits",
    title: "Portrait personnalisé",
    class: "portraits",
    intro: "À partir de photographies et d’échanges, Kaplou imagine des portraits sensibles inspirés des personnes. Chaque portrait est un souvenir, une émotion, un moment de vie.",
    items: [
      {
        title: "Célia",
        description: "",
        model: "images/celia1.jpg",
        portrait: "images/celia2.jpg"
      }
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("gallery-container");
  if (!galleryContainer) return;

  galleryData.forEach(series => {
    const block = document.createElement("div");
    block.className = `gallery-block ${series.class} fade-in`;
    block.id = series.id;

    const introHTML = series.intro ? `<p class="series-intro">${series.intro}</p>` : "";

    const oeuvresHTML = series.items.map(item => {
      let imageHTML = "";
      if (series.id === "portraits") {
        imageHTML = `
          <div class="image-hover">
            <img src="${item.model}" class="image-model" alt="${item.title}">
            <img src="${item.portrait}" class="image-portrait" alt="${item.title}">
          </div>
        `;
      } else {
        imageHTML = `<img src="${item.image}" alt="${item.title}" class="oeuvre-image" loading="lazy">`;
      }

      let footerHTML = "";
      if (series.id !== "portraits") {
        footerHTML = `
          <div class="oeuvre-footer">
            <a href="https://buy.stripe.com/exemple" target="_blank" class="btn btn-primary">Acquérir</a>
          </div>
        `;
      }

      return `
        <div class="oeuvre-card">
          <div class="oeuvre-image-container">
            ${imageHTML}
          </div>
          <div class="oeuvre-info">
            <h3 class="oeuvre-title serif">${item.title}</h3>
            <p class="oeuvre-description">${item.description}</p>
            ${footerHTML}
          </div>
        </div>
      `;
    }).join("");

    block.innerHTML = `
      <h2 class="serif">${series.title}</h2>
      ${introHTML}
      <div class="oeuvres">
        ${oeuvresHTML}
      </div>
    `;

    galleryContainer.appendChild(block);
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  document.getElementById("year").textContent = new Date().getFullYear();
});
