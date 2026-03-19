const peinturesData = [
  {
    id: "animal-totem",
    title: "Animal Totem",
    class: "animal-totem",
    intro: "Humain et animal se rencontrent. Chaque duo devient un totem, fragile ou puissant, révélant émotions, instincts et mémoires enfouies.",
    items: [
      {
        title: "La panthère et l'or Inca",
        description: "Acrylique sur papier 300g 50x70cm",
        image: "images/02_Totem_Panthere_50x70_2026.jpg",
        story: "Elle avance sans bruit sur l'or ancien.\nL'homme qui la porte ne sait pas encore\nqu'il est, lui aussi, fait de jungle et de silence.\nLeur regard se croise une fois.\nC'est suffisant pour tout changer."
      },
      {
        title: "Le chat noir et la dame en rouge",
        description: "Acrylique sur papier 300g 50x70cm",
        image: "images/03_Totem_chat_50x70_2026.jpg",
        story: "Elle portait du rouge le soir où il l'a trouvée.\nLui, noir comme l'encre, regard d'ambre.\nIls n'ont pas eu besoin de mots.\nCertains pactes se signent dans l'obscurité,\navant même que la lumière revienne."
      },
      {
        title: "Une femme, une hyène : 2 reines",
        description: "Acrylique sur papier 300g 50x70cm",
        image: "images/grok_image_cg7y35.jpg",
        story: "On leur a appris à se méfier l'une de l'autre.\nMais elles savent, toutes les deux,\nce que c'est que de survivre.\nDeux forces anciennes qui se reconnaissent.\nNi combat, ni soumission.\nJuste deux reines qui se toisent, libres."
      }
    ]
  },
  {
    id: "hors-serie",
    title: "Hors-Série",
    class: "hors-serie",
    intro: "Expériences et formes libres, chaque œuvre ouvre un monde autonome.",
    items: [
      {
        title: "La déchéance",
        description: "Acrylique sur chassis 75x115cm",
        image: "images/01_La_Decheance_75x115_2025.jpg",
        story: "Il y a une beauté dans ce qui tombe.\nNon pas la destruction,\nmais le moment suspendu avant —\nquand tout est encore là,\nmais que rien ne peut plus être retenu.\nC'est ici que commence l'œuvre."
      },
      {
        title: "Murmure de Béton",
        description: "Sculpture murale",
        image: "images/cover.jpg",
        story: "Le béton aussi a une mémoire.\nIl garde l'empreinte de ce qu'on a voulu figer,\net la chaleur de ce qui résiste.\nDerrière la surface dure,\nquelque chose respire encore,\nsourd et patient."
      }
    ]
  }
];

const sculpturesData = [
  {
    id: "jardin-meduse",
    title: "Jardin de Méduse",
    class: "jardin-meduse",
    intro: "Fragments de forêt suspendus, micro-territoires suspendus dans le temps.",
    items: [
      {
        title: "Floraison Abyssale",
        description: "Peinture sur soie, Carré",
        image: "images/cover.jpg",
        story: "Là où la lumière ne descend plus,\nquelque chose fleurit quand même.\nPas pour être vu.\nJuste pour exister,\ndans le silence absolu du fond."
      },
      {
        title: "Tentacules d'Or",
        description: "Acrylique et feuille d'or",
        image: "images/cover.jpg",
        story: "L'or ne cherche pas à briller.\nIl attend, enroulé dans l'obscurité,\nque quelqu'un pose les yeux assez longtemps\npour comprendre que ce qui est beau\nn'a jamais besoin de se montrer."
      }
    ]
  },
  {
    id: "jardin-aquatique",
    title: "Jardin Aquatique",
    class: "jardin-aquatique",
    intro: "Poissons et créatures glissent entre couleurs et formes.",
    items: [
      {
        title: "Pla-Kat Ciel d'orage",
        description: `Argile, papier mûrier, acrylique et aquarelles<br>Socle béton brut<br>8 × 8 × 48 cm`,
        image: "images/Pla_kat_cieldorage8x8x38_2026.jpg",
        story: "Il porte l'orage sur les nageoires.\nChaque mouvement fend l'eau comme l'éclair fend le ciel.\nMais dans l'œil — calme absolu.\nCelui qui a traversé la tempête\nne court plus après la paix.\nIl l'est."
      },
      {
        title: "L'Ondée Bleue",
        description: "Aquarelle, Paysage",
        image: "images/cover.jpg",
        story: "Une pluie qui ne mouille pas.\nUne eau qui ne coule pas vers le bas,\nmais vers l'intérieur.\nL'ondée bleue traverse sans demander.\nElle laisse quelque chose derrière —\nun bleu, une fraîcheur, un oubli."
      }
    ]
  }
];

const portraitsData = [
  {
    id: "portraits",
    title: "",
    class: "portraits",
    intro: "",
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

function buildGalleryBlock(series, isPortrait) {
  const block = document.createElement("div");
  block.className = `gallery-block ${series.class} fade-in`;
  block.id = series.id;

  const introHTML = series.intro ? `<p class="series-intro">${series.intro}</p>` : "";
  const titleHTML = series.title ? `<h2 class="serif">${series.title}</h2>` : "";

  const oeuvresHTML = series.items.map(item => {
    let imageHTML = "";
    if (isPortrait) {
      imageHTML = `
        <div class="image-hover">
          <img src="${item.model}" class="image-model" alt="${item.title}">
          <img src="${item.portrait}" class="image-portrait" alt="${item.title}">
        </div>
      `;
    } else {
      imageHTML = `<img src="${item.image}" alt="${item.title}" class="oeuvre-image" loading="lazy">`;
    }

    const narrativeBtn = (!isPortrait && item.story) ? `
      <button class="btn-narrative" data-story="${item.story.replace(/"/g, '&quot;')}" data-image="${item.image}" aria-label="Entrer dans l'œuvre">Entrer</button>
    ` : "";

    const footerHTML = !isPortrait ? `
      <div class="oeuvre-footer">
        <a href="https://buy.stripe.com/exemple" target="_blank" class="btn btn-primary">Adopter</a>
        ${narrativeBtn}
      </div>
    ` : "";

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
    ${titleHTML}
    ${introHTML}
    <div class="oeuvres">
      ${oeuvresHTML}
    </div>
  `;

  return block;
}

document.addEventListener("DOMContentLoaded", () => {
  const peinturesContainer = document.getElementById("peintures-container");
  if (peinturesContainer) {
    peinturesData.forEach(series => {
      peinturesContainer.appendChild(buildGalleryBlock(series, false));
    });
  }

  const sculpturesContainer = document.getElementById("sculptures-container");
  if (sculpturesContainer) {
    sculpturesData.forEach(series => {
      sculpturesContainer.appendChild(buildGalleryBlock(series, false));
    });
  }

  const portraitsContainer = document.getElementById("portraits-container");
  if (portraitsContainer) {
    portraitsData.forEach(series => {
      portraitsContainer.appendChild(buildGalleryBlock(series, true));
    });
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  const pqElements = document.querySelectorAll(".poetic-quote");
  pqElements.forEach((el, i) => {
    el.style.setProperty("--pq-delay", `${i * 0.3}s`);
  });

  const pqObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("pq-visible");
        pqObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  pqElements.forEach(el => pqObserver.observe(el));

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Narrative overlay ── */
  const overlay = document.getElementById("narrative-overlay");
  const overlayBg = overlay.querySelector(".narrative-bg");
  const overlayText = overlay.querySelector(".narrative-text");

  function openNarrative(imageSrc, storyRaw) {
    overlayBg.style.backgroundImage = `url('${imageSrc}')`;
    overlayText.innerHTML = storyRaw
      .split("\n")
      .map(line => `<span>${line}</span>`)
      .join("");
    overlay.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }

  function closeNarrative() {
    overlay.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-narrative");
    if (btn) {
      e.stopPropagation();
      openNarrative(btn.dataset.image, btn.dataset.story);
      return;
    }
    if (overlay.classList.contains("is-visible")) {
      closeNarrative();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNarrative();
  });
});
