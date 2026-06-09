const slides = Array.from(document.querySelectorAll(".hero-slide"));
const slideDots = Array.from(document.querySelectorAll(".hero-status span"));
const drankkaartLink = document.querySelector(".drankkaart-link");
const eventsSection = document.querySelector(".events");
const eventCards = Array.from(document.querySelectorAll(".event-card"));
const galleryImages = Array.from(document.querySelectorAll(".photo-grid img"));
const lightbox = document.querySelector("[data-photo-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
let slideIndex = 0;

if (drankkaartLink) {
  drankkaartLink.addEventListener("click", (event) => {
    const pdfUrl = drankkaartLink.dataset.pdfUrl;

    if (!pdfUrl) {
      event.preventDefault();
      return;
    }

    drankkaartLink.href = pdfUrl;
  });
}

if (eventsSection && eventCards.length) {
  const setEventBackground = (card) => {
    const eventImage = card.dataset.eventImage;

    if (eventImage) {
      eventsSection.style.setProperty("--event-bg", `url("${eventImage}")`);
    }
  };

  eventCards.forEach((card) => {
    card.addEventListener("mouseenter", () => setEventBackground(card));
    card.addEventListener("focus", () => setEventBackground(card));
  });
}

if (lightbox && lightboxImage && lightboxClose) {
  let activeGalleryImage = null;

  const openLightbox = (image) => {
    activeGalleryImage = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "Vergrote foto";

    if (lightboxCaption) {
      lightboxCaption.textContent = image.alt || "";
    }

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");

    if (activeGalleryImage) {
      activeGalleryImage.focus();
      activeGalleryImage = null;
    }
  };

  galleryImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Bekijk groter: ${image.alt || "foto"}`);
    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

function showSlide(nextIndex) {
  slides[slideIndex].classList.remove("active");
  slideDots[slideIndex].classList.remove("active");
  slideIndex = nextIndex % slides.length;
  slides[slideIndex].classList.add("active");
  slideDots[slideIndex].classList.add("active");
}

setInterval(() => showSlide(slideIndex + 1), 5200);

const reviewSets = [
  [
    {
      name: "Marieke uit de buurt",
      text: "Altijd warm ontvangen. Je loopt binnen voor een drankje en blijft hangen door de gesprekken."
    },
    {
      name: "Sander",
      text: "Precies zo'n plek die je in de wijk wilt hebben: vertrouwd, levendig en zonder poeha."
    },
    {
      name: "Nadia",
      text: "Fijne sfeer, vriendelijke mensen achter de bar en vaak bekenden aan tafel."
    },
    {
      name: "Theo",
      text: "Een echt buurtcafe. Goed bier, goede verhalen en niemand die haast heeft."
    }
  ],
  [
    {
      name: "Lotte",
      text: "We hebben hier een kleine verjaardag gevierd. Het voelde persoonlijk en ontspannen."
    },
    {
      name: "Jeroen",
      text: "Overdag rustig genoeg om te werken, later op de dag precies gezellig genoeg voor een borrel."
    },
    {
      name: "Anja",
      text: "Mooie mix van vaste gasten, buren en nieuwe gezichten. Je voelt je snel thuis."
    },
    {
      name: "Bas",
      text: "Geen standaard zaak, maar een plek met karakter. De houten bar en warme lampen doen veel."
    }
  ],
  [
    {
      name: "Henk",
      text: "Hier kent men elkaar nog. Dat maakt elk bezoek net wat leuker."
    },
    {
      name: "Priya",
      text: "Leuke avonden, goede muziek en een sfeer die niet gemaakt voelt."
    },
    {
      name: "Daan",
      text: "Onze buurtgroep spreekt hier vaak af. Makkelijk, vriendelijk en centraal."
    },
    {
      name: "Elise",
      text: "Gezelligheid zonder drukte om de drukte. Gewoon een fijne plek om te zijn."
    }
  ]
];

const reviewGrid = document.querySelector("[data-review-grid]");
const previousButton = document.querySelector("[data-review-prev]");
const nextButton = document.querySelector("[data-review-next]");
let reviewSetIndex = 0;

function renderReviews() {
  reviewGrid.innerHTML = reviewSets[reviewSetIndex]
    .map(
      (review) => `
        <article class="review-card">
          <div>
            <div class="stars" aria-label="5 sterren">★★★★★</div>
            <blockquote>"${review.text}"</blockquote>
          </div>
          <cite>${review.name}</cite>
        </article>
      `
    )
    .join("");
}

function changeReviews(direction) {
  reviewSetIndex = (reviewSetIndex + direction + reviewSets.length) % reviewSets.length;
  renderReviews();
}

previousButton.addEventListener("click", () => changeReviews(-1));
nextButton.addEventListener("click", () => changeReviews(1));
renderReviews();

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
});
