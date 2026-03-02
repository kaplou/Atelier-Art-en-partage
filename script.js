const galleryData = [
  {
    id: "animal-totem",
    title: "Animal Totem",
    class: "animal-totem",
    intro: "Humain et animal se rencontrent. Chaque duo devient un totem, fragile ou puissant, révélant émotions, instincts et mémoires enfouies.",
    items: [
      { title: "Le Gardien du Seuil", description: "Encre et fusain, 50x70cm", image: "images/cover.jpg" },
      { title: "Esprit de la Forêt", description: "Technique mixte, 50x70cm", image: "images/cover.jpg" }
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
      { title: "Reflets de Nacre", description: "Huile sur toile, Paysage", image: "images/cover.jpg" },
      { title: "L'Ondée Bleue", description: "Aquarelle, Paysage", image: "images/cover.jpg" }
    ]
  },
  {
    id: "hors-serie",
    title: "Hors-Série",
    class: "hors-serie",
    intro: "Expériences et formes libres, chaque œuvre ouvre un monde autonome.",
    items: [
      { title: "L'Instant Suspendu", description: "Collage et pigments", image: "images/cover.jpg" },
      { title: "Murmure de Béton", description: "Sculpture murale", image: "images/cover.jpg" }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    
    if (!galleryContainer) return;

    galleryData.forEach(series => {
        const block = document.createElement('div');
        block.className = `gallery-block ${series.class} fade-in`;
        block.id = series.id;

        const introHTML = series.intro ? `<p class="series-intro">${series.intro}</p>` : '';

        const oeuvresHTML = series.items.map(item => `
            <div class="oeuvre-card">
                <div class="oeuvre-image-container">
                    <img src="${item.image}" alt="${item.title}" class="oeuvre-image" loading="lazy">
                </div>
                <div class="oeuvre-info">
                    <h3 class="oeuvre-title serif">${item.title}</h3>
                    <p class="oeuvre-desc">${item.description}</p>
                    <div class="oeuvre-footer">
                        <a href="https://buy.stripe.com/exemple" target="_blank" class="btn btn-primary">Acquérir</a>
                    </div>
                </div>
            </div>
        `).join('');

        block.innerHTML = `
            <h2 class="serif">${series.title}</h2>
            ${introHTML}
            <div class="oeuvres">
                ${oeuvresHTML}
            </div>
        `;

        galleryContainer.appendChild(block);
    });

    // Observer fade-in
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();
});
