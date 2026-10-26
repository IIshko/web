/* ============================================================
   HUEVOS LA LOMA ESCONDIDA
   JavaScript vanilla · sin dependencias.
   Funciones:
   - Menú móvil accesible y header con estado de scroll.
   - Selector de idioma ES / EN / QU con persistencia local.
   - Actualización de enlaces de WhatsApp según el idioma.
   - Formulario de contacto que prepara un mensaje de WhatsApp.
   - Animaciones de aparición respetando "prefers-reduced-motion".
   - Enlaces sociales placeholder con aviso amable.
   ============================================================ */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* Si algo fallara en el JS, ningún contenido debe quedar oculto. */
  window.addEventListener("error", function () {
    document.documentElement.classList.remove("reveal-ready");
    document.documentElement.classList.remove("js");
  });

  /* ==========================================================
     CONSTANTES
     ========================================================== */
  const WA_NUMBER = "51989166447";
  const WA_BASE = "https://wa.me/" + WA_NUMBER + "?text=";
  const STORAGE_KEY = "loma-language";
  const SUPPORTED_LANGUAGES = ["es", "en", "qu"];

  const DEFAULT_MESSAGES = {
    es: "Hola, quiero información sobre los huevos de La Loma Escondida.",
    en: "Hello, I would like information about La Loma Escondida eggs.",
    // Para QU se mantiene el español: la traducción completa está en revisión.
    qu: "Hola, quiero información sobre los huevos de La Loma Escondida."
  };

  const LANGUAGE_STATUS = {
    es: "Idioma cambiado a español.",
    en: "Language changed to English.",
    qu: "Traducción al quechua en revisión. Los textos extensos se mantienen en español."
  };

  /* ==========================================================
     TRADUCCIONES
     El español vive directamente en el HTML (fuente principal).
     Aquí se guardan EN completo y la base aproximada de QU.
     Si una clave no existe en QU, se conserva el texto español
     y el aviso "Traducción al quechua en revisión" queda visible.
     ========================================================== */
  const translations = {
    en: {
      /* Meta / SEO */
      "meta.home.title": "Free-range eggs from Pasco, Peru | Huevos La Loma Escondida",
      "meta.home.description": "Fresh free-range eggs from the central highlands of Peru. Discover sizes M, L and XL and order via WhatsApp.",
      "meta.about.title": "Our story | Huevos La Loma Escondida",
      "meta.about.description": "Discover the family story, mission, vision and values of Huevos La Loma Escondida, a free-range egg farm in Pasco, Peru.",
      "meta.product.title": "Our product | Free-range eggs in sizes M, L and XL",
      "meta.product.description": "Free-range eggs in three sizes: M, L and XL. Natural production, rich yolks and daily freshness from Pasco, Peru.",
      "meta.contact.title": "Contact & orders | Huevos La Loma Escondida",
      "meta.contact.description": "Message us on WhatsApp at +51 989 166 447 for questions and orders. Huevos La Loma Escondida's only official channel.",

      /* Navegación y accesibilidad */
      "nav.home": "Home",
      "nav.about": "About us",
      "nav.product": "Product",
      "nav.contact": "Contact",
      "a11y.skip": "Skip to content",
      "a11y.nav": "Main navigation",
      "a11y.footerNav": "Footer navigation",
      "a11y.breadcrumb": "Breadcrumb",
      "a11y.lang": "Select language",
      "a11y.menuOpen": "Open menu",
      "a11y.menuClose": "Close menu",
      "a11y.home": "Huevos La Loma Escondida, go to the homepage",
      "a11y.footerLogo": "Back to the Huevos La Loma Escondida homepage",
      "a11y.facebook": "Facebook, link pending update",
      "a11y.tiktok": "TikTok, link pending update",
      "a11y.wa": "Request information on WhatsApp",
      "a11y.heroBadge": "Our production",
      "a11y.brandPillars": "Brand pillars",
      "a11y.eggPillars": "What every egg represents",
      "a11y.productionPillars": "Our production pillars",

      /* CTA */
      "cta.whatsapp": "Order on WhatsApp",
      "cta.consult": "Ask on WhatsApp",
      "cta.product": "Discover our product",
      "cta.productDetail": "See sizes and benefits",
      "cta.history": "Discover our story",
      "cta.allBenefits": "See all benefits",
      "cta.writeUs": "Message us on WhatsApp",
      "cta.valuesDetail": "Discover our values",
      "cta.contactPage": "See contact details",

      /* Aviso de idioma */
      "lang.note": "Quechua translation under review",
      "lang.noteDetail": "Long texts remain in Spanish while the translation is being validated.",

      /* Footer */
      "footer.tagline": "Free-range eggs from the central highlands of Peru.",
      "footer.explore": "Explore",
      "footer.contact": "Contact",
      "footer.official": "Our only official channel.",
      "footer.social": "Social media",
      "footer.rights": "All rights reserved.",
      "footer.made": "From the central highlands of Peru.",
      "footer.top": "Back to top",

      /* Imágenes */
      "alt.hero": "Landscape of the Peruvian highlands at sunrise, with mountains, fields and a farmhouse",
      "alt.house": "Farmhouse surrounded by mountains in the Peruvian highlands",
      "alt.chickensHome": "Hens walking freely in the grass at sunset",
      "alt.chickens": "Free-range hens among grass and wildflowers",
      "alt.chickensProduct": "Free-range hens in a golden field",
      "alt.eggs": "Basket of fresh eggs and an open egg with a golden yolk",
      "alt.sierra": "Mountains of the Peruvian highlands at sunset",

      /* Inicio */
      "home.eyebrow": "Central highlands of Peru · Free-range",
      "home.title": "Fresh eggs from hens that live <em>free</em>.",
      "home.lead": "We raise hens in a natural environment in the Peruvian highlands, where they enjoy freedom, fresh air and a balanced diet.",
      "home.heroNote": "Direct service on WhatsApp · Our only official channel",
      "home.badgeKicker": "Responsible production",
      "home.badgeTitle": "Truly free-range",
      "home.badgeText": "Hens outdoors and eggs with true countryside character.",
      "home.fact1Title": "Daily collection",
      "home.fact1Text": "Freshness that reaches your table.",
      "home.fact2Title": "Andean origin",
      "home.fact2Text": "Produced in Pasco, Peru.",
      "home.fact3Title": "Animal welfare",
      "home.fact3Text": "A worthy home, cage-free.",
      "home.intro.eyebrow": "The hill where we grew up",
      "home.intro.title": "A story of family, land and country life.",
      "home.intro.p1": "High in the Peruvian highlands there is a place that has been our family's home for generations. Our grandparents grew up among mountains, fresh air and nature.",
      "home.intro.p2": "Today, those values passed down from generation to generation bring Huevos La Loma Escondida to life: a family project deeply connected to this land.",
      "home.intro.quote": "La Loma Escondida is the place where we grew up, the legacy of our grandparents and the love for the home we continue to care for every day.",
      "home.intro.caption": "Pasco, Peru · The highlands that saw us grow",
      "home.mini1": "Family tradition",
      "home.mini2": "Care for the land",
      "home.mini3": "Country life",
      "home.product.eyebrow": "Our product",
      "home.product.title": "Three sizes. One promise of freshness.",
      "home.product.lead": "Free-range eggs, collected daily and selected by size so you can choose the one that best suits your table.",
      "home.product.mName": "M — Medium",
      "home.product.mDesc": "The versatile size for everyday meals.",
      "home.product.lName": "L — Large",
      "home.product.lDesc": "The ideal balance for your recipes.",
      "home.product.xlName": "XL — Extra Large",
      "home.product.xlDesc": "For those who want more from every egg.",
      "home.product.note": "Availability and order coordination via WhatsApp. We do not display prices on this site.",
      "home.benefits.eyebrow": "Discover our product",
      "home.benefits.title": "What makes a La Loma egg different.",
      "home.benefits.lead": "A way of producing that respects nature's rhythm and shows in every detail.",
      "home.manifesto.eyebrow": "Truly free-range",
      "home.manifesto.title": "They are not just eggs.",
      "home.manifesto.p1": "They are the result of hens raised in freedom, beneath the clean sky of the Peruvian highlands. At La Loma Escondida we believe in real free-range farming, where every bird moves freely, feeds naturally and lives without stress.",
      "home.manifesto.p2": "This is reflected in every egg: firmer yolks, a more authentic flavor and superior quality.",
      "home.manifesto.caption": "Hens outdoors · La Loma Escondida",
      "home.manifesto.list1": "Animal welfare",
      "home.manifesto.list2": "Responsible production",
      "home.manifesto.list3": "Natural nutrition",
      "home.manifesto.list4": "Authentic flavor",
      "home.manifesto.closing": "Because when you choose free-range, you choose quality.",
      "home.values.eyebrow": "Our values",
      "home.values.title": "What we care for at every stage.",
      "home.values.lead": "The way we work comes from the land and from the trust of families.",
      "home.cta.eyebrow": "Let's prepare your order",
      "home.cta.title": "Bring the taste of the highlands to your table.",
      "home.cta.text": "Message us on WhatsApp to check availability and coordinate your order. It is our only official channel.",

      /* Beneficios */
      "benefit.natural.title": "Natural production",
      "benefit.natural.text": "Our hens do not live in cages. They move freely, which supports their well-being and improves egg quality.",
      "benefit.yolk.title": "Richer yolk",
      "benefit.yolk.text": "Thanks to their natural diet, our eggs have a more intense yolk color, better flavor and greater nutritional value.",
      "benefit.fresh.title": "Guaranteed freshness",
      "benefit.fresh.text": "We collect every day to make sure each egg reaches your table fresh.",
      "benefit.nutrition.title": "Greater nutritional value",
      "benefit.nutrition.text": "Rich in protein, vitamins and healthy fats, ideal for a balanced diet.",
      "benefit.origin.title": "Andean origin",
      "benefit.origin.text": "Produced in the Peruvian highlands, in a clean and natural environment, far from large-scale industrial production.",

      /* Valores */
      "value.animal.title": "Animal welfare",
      "value.animal.text": "Happy hens, real eggs. We honor our birds' natural instincts by giving them freedom and a dignified home under the sun.",
      "value.integrity.title": "Integrity",
      "value.integrity.text": "Ethics in every process. We act with integrity because we know your family's trust is earned with every egg we deliver.",
      "value.quality.title": "Quality",
      "value.quality.text": "Quality you can notice. We bring to your table the superior nutrition of a vibrant yolk and a flavor only the countryside can offer.",
      "value.rural.title": "Rural commitment",
      "value.rural.text": "Pride in our land. We are a driving force for development in our community, honoring the work of the countryside with every delivery.",

      /* Nosotros */
      "about.hero.eyebrow": "About us",
      "about.hero.title": "The continuation of a family story.",
      "about.hero.lead": "Among mountains, fresh air and nature, our family grew. Today, that legacy brings free-range eggs to life.",
      "about.story.eyebrow": "Our story",
      "about.story.title": "The hill where we grew up.",
      "about.story.p1": "High in the Peruvian highlands there is a place that has been our family's home for generations. Our grandparents grew up among mountains, fresh air and nature.",
      "about.story.p2": "Here, from an early age, we learned to care for the land, to respect animals and to value the work of the countryside, which is always carried out with patience, dedication and love for nature.",
      "about.story.p3": "Those values, passed down from generation to generation, are what give life to La Loma Escondida today. More than a project, it is the continuation of a family story deeply connected to this land and to country life.",
      "about.story.p4": "La Loma Escondida is the place where we grew up, the legacy of our grandparents and the love for the home we continue to care for every day.",
      "about.story.caption": "The landscape that saw us grow · Pasco, Peru",
      "about.story.badge": "Central<br>highlands",
      "about.who.eyebrow": "Who we are",
      "about.who.title": "Responsible production, with the taste of the countryside.",
      "about.who.p1": "Huevos La Loma Escondida is a farm in the central highlands of Peru, dedicated to the production and sale of free-range eggs. We raise our hens in a natural environment, where they enjoy freedom, fresh air and a balanced diet.",
      "about.who.p2": "We believe in responsible, sustainable production that respects animal welfare. Our commitment is to offer fresh, nutritious, high-quality eggs while maintaining a balance between rural tradition, environmental care and the health of Peruvian families.",
      "about.who.caption": "Animal welfare in a natural environment",
      "about.who.chip1": "Free-range",
      "about.who.chip2": "Animal welfare",
      "about.who.chip3": "Balanced diet",
      "about.who.chip4": "Rural tradition",
      "about.purpose.eyebrow": "Our purpose",
      "about.purpose.title": "Looking at the land with a future in mind.",
      "about.mission.label": "Mission",
      "about.mission.text": "To offer nutritious and delicious eggs, produced by happy hens in a natural environment, promoting animal welfare practices and respect for the environment.",
      "about.vision.label": "Vision",
      "about.vision.text": "To be the leading brand in free-range eggs, recognized for nourishing families with fresh, highest-quality products obtained ethically and sustainably.",
      "about.values.eyebrow": "Our values",
      "about.values.title": "Principles cultivated every day.",
      "about.values.lead": "Four commitments that guide our work on the farm and with families.",
      "about.cta.eyebrow": "Let's talk",
      "about.cta.title": "Would you like to know more about La Loma Escondida?",
      "about.cta.text": "Message us to learn more about our production, availability and orders.",
      "about.cta.button": "Message us on WhatsApp",

      /* Producto */
      "product.hero.eyebrow": "Our product",
      "product.hero.title": "Free-range eggs, with a real yolk.",
      "product.hero.lead": "Discover our product: fresh eggs from hens that move freely beneath the sky of the Peruvian highlands.",
      "product.sizes.eyebrow": "Sizes",
      "product.sizes.title": "Choose the ideal size for your table.",
      "product.sizes.lead": "We select eggs by weight so you know exactly what you are getting. Availability is confirmed via WhatsApp.",
      "product.size.weightLabel": "Weight per egg",
      "product.size.m.name": "M — Medium",
      "product.size.m.text": "The versatile size for everyday meals.",
      "product.size.l.name": "L — Large",
      "product.size.l.text": "The ideal balance for your recipes.",
      "product.size.xl.name": "XL — Extra Large",
      "product.size.xl.text": "More egg for special recipes.",
      "product.sizes.note": "The weights shown correspond to each category's range. Ask about availability and packaging on WhatsApp; we do not publish prices on this site.",
      "product.benefits.eyebrow": "Discover our product",
      "product.benefits.title": "Nature in every shell.",
      "product.benefits.lead": "A way of producing that respects nature's rhythm and shows in every detail.",
      "product.closing.eyebrow": "Our commitment",
      "product.closing.title": "They are not just eggs.",
      "product.closing.p1": "They are the result of hens raised in freedom, beneath the clean sky of the Peruvian highlands. At La Loma Escondida we believe in real free-range farming, where every bird moves freely, feeds naturally and lives without stress.",
      "product.closing.p2": "This is reflected in every egg: firmer yolks, a more authentic flavor and superior quality.",
      "product.closing.p3": "Every egg you bring to your table represents:",
      "product.closing.quote": "Because when you choose free-range, you choose quality.",
      "product.closing.caption": "Truly free-range · La Loma Escondida",
      "product.order.eyebrow": "How to order",
      "product.order.title": "As simple as that.",
      "product.order.lead": "No shopping carts or online payments. Everything is coordinated directly with you on WhatsApp.",
      "product.order.step1.title": "Message us",
      "product.order.step1.text": "Open WhatsApp and tell us what you need.",
      "product.order.step2.title": "Choose your size",
      "product.order.step2.text": "Ask about availability for M, L or XL.",
      "product.order.step3.title": "Coordinate your order",
      "product.order.step3.text": "We agree on the details directly with you on WhatsApp.",
      "product.order.note": "We do not publish prices or shipping costs. Message us to check availability and coordinate your order.",
      "product.faq.eyebrow": "Frequently asked questions",
      "product.faq.title": "Before you message us.",
      "product.faq.lead": "We answer the most common questions. If you need anything else, we are one message away.",
      "product.faq.q1": "Are the eggs free-range?",
      "product.faq.a1": "Yes. Our hens live outdoors, move freely and do not live in cages.",
      "product.faq.q2": "What sizes do you offer?",
      "product.faq.a2": "We offer three sizes: M (53 g to 63 g), L (64 g to 71 g) and XL (71 g to 81 g).",
      "product.faq.q3": "How can I place an order?",
      "product.faq.a3": "Our only official channel is WhatsApp: +51 989 166 447. Message us and we will coordinate the details with you.",
      "product.faq.q4": "Where are the eggs produced?",
      "product.faq.a4": "In the Quishuarcancha hamlet, in the highlands of Pasco, Peru.",
      "product.faq.q5": "Where can I ask about prices?",
      "product.faq.a5": "We do not publish prices on this site. Please ask us directly on WhatsApp.",
      "product.cta.eyebrow": "Let's prepare your order",
      "product.cta.title": "Let's talk about your order.",
      "product.cta.text": "Message us on WhatsApp to check availability and coordinate the details.",

      /* Contacto */
      "contact.hero.eyebrow": "Contact & orders",
      "contact.hero.title": "Let's talk about fresh eggs.",
      "contact.hero.lead": "Message us on WhatsApp for questions, availability and orders. It is our only official channel.",
      "contact.direct.eyebrow": "Official channel",
      "contact.direct.title": "Everything starts with a message.",
      "contact.direct.text": "We do not use email or forms with automatic delivery. To help you directly, message us on WhatsApp.",
      "contact.direct.button": "Open WhatsApp",
      "contact.numberLabel": "WhatsApp",
      "contact.location.title": "Where we are",
      "contact.location.text": "Central highlands of Peru.",
      "contact.social.title": "Social media",
      "contact.social.note": "Links pending update.",
      "contact.form.eyebrow": "Prepare your message",
      "contact.form.title": "Tell us what you need.",
      "contact.form.intro": "Fill in the fields and we will take you to WhatsApp with your message ready. No email is sent.",
      "contact.form.name": "Your name",
      "contact.form.optional": "(optional)",
      "contact.form.namePlaceholder": "Enter your name",
      "contact.form.interest": "I'm interested in",
      "contact.form.option.general": "General inquiry",
      "contact.form.option.m": "M — Medium eggs",
      "contact.form.option.l": "L — Large eggs",
      "contact.form.option.xl": "XL — Extra Large eggs",
      "contact.form.option.order": "I would like to place an order",
      "contact.form.message": "Message",
      "contact.form.messagePlaceholder": "Tell us about your order or question...",
      "contact.form.submit": "Continue on WhatsApp",
      "contact.form.privacy": "When you continue, WhatsApp will open with your message ready to send.",
      "contact.form.noEmail": "This form does not send emails or store your data on the site.",
      "contact.form.opening": "Opening WhatsApp...",
      "contact.cta.eyebrow": "We are one message away",
      "contact.cta.title": "The most direct way to reach us.",

      /* Interfaz */
      "toast.placeholder": "This link will be updated soon."
    },

    qu: {
      /* Traducción aproximada de navegación y acciones básicas.
         El contenido extenso se mantiene en español con aviso visible. */
      "nav.home": "Qallariy",
      "nav.about": "Ñuqanchikmanta",
      "nav.product": "Rurukuna",
      "nav.contact": "Willakuy",
      "a11y.home": "Huevos La Loma Escondida, qallariyman riy",
      "a11y.footerLogo": "Huevos La Loma Escondida qallariyman kutiy",
      "a11y.lang": "Simita akllay",
      "a11y.menuOpen": "Menuta kichay",
      "a11y.menuClose": "Menuta wisq'ay",
      "a11y.wa": "WhatsApp-pi willakuyta mañakuy",
      "cta.whatsapp": "WhatsApp-pi mañakuy",
      "cta.consult": "WhatsApp-pi tapukuy",
      "cta.product": "Rurunchikta qhaway",
      "cta.history": "Willakuyniykuta qhaway",
      "cta.writeUs": "WhatsApp-pi qillqay",
      "home.title": "Qispilla kawsaq wallpakunap musuq rurunkuna.",
      "home.product.eyebrow": "Rurunchik",
      "home.benefits.eyebrow": "Rurunchikta reqsiy",
      "home.values.eyebrow": "Chaninchaykuna",
      "about.hero.eyebrow": "Ñuqanchikmanta",
      "about.story.eyebrow": "Willakuyniyku",
      "about.who.eyebrow": "Pikunam kayku",
      "about.values.eyebrow": "Chaninchaykuna",
      "product.hero.eyebrow": "Rurunchik",
      "product.hero.title": "Qispilla kawsaq wallpakunap rurunkuna.",
      "product.sizes.eyebrow": "Sayaykuna",
      "product.size.weightLabel": "Huk rurupa llasaynin",
      "product.order.eyebrow": "Mañakuy",
      "product.faq.eyebrow": "Tapukuykuna",
      "contact.hero.eyebrow": "Willakuy hinaspa mañakuy",
      "contact.direct.eyebrow": "Oficial kanal",
      "contact.direct.button": "WhatsApp-ta kichay",
      "contact.form.eyebrow": "Willakuyta wakichiy",
      "footer.explore": "Qhaway",
      "footer.contact": "Willakuy",
      "footer.official": "Sapalla oficial kanal.",
      "value.animal.title": "Uywakunapa allin kawsaynin",
      "value.integrity.title": "Chiqan kay",
      "value.quality.title": "Allin kay",
      "toast.placeholder": "Kay enlaceqa qhipamanmi musuqyachisqa kanqa."
    }
  };

  /* ==========================================================
     ESTADO Y REFERENCIAS DEL DOM
     ========================================================== */
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const attributeNames = ["aria-label", "alt", "placeholder", "title", "content"];

  let currentLanguage = "es";
  let toastElement = null;
  let toastTimer = null;

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const langButtons = document.querySelectorAll("[data-lang-btn]");
  const langNote = document.querySelector("[data-lang-note]");
  const langStatus = document.getElementById("lang-status");

  /* ==========================================================
     UTILIDADES
     ========================================================== */
  function normaliseLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language) ? language : "es";
  }

  function readStoredLanguage() {
    try {
      return normaliseLanguage(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return "es";
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      /* La navegación privada puede bloquear localStorage; no es crítico. */
    }
  }

  function translate(key) {
    if (currentLanguage === "es") {
      return null;
    }
    const dictionary = translations[currentLanguage] || {};
    return typeof dictionary[key] === "string" ? dictionary[key] : null;
  }

  function whatsappUrl(message) {
    return WA_BASE + encodeURIComponent(message);
  }

  function getLanguageMessage() {
    return DEFAULT_MESSAGES[currentLanguage] || DEFAULT_MESSAGES.es;
  }

  /* ==========================================================
     IDIOMAS
     ========================================================== */
  function captureOriginalContent() {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      originalText.set(element, element.innerHTML);
    });

    document
      .querySelectorAll(
        "[data-i18n-aria-label], [data-i18n-alt], [data-i18n-placeholder], [data-i18n-title], [data-i18n-content]"
      )
      .forEach(function (element) {
        const values = {};
        attributeNames.forEach(function (attribute) {
          const key = element.getAttribute("data-i18n-" + attribute);
          if (key) {
            values[attribute] = element.getAttribute(attribute);
          }
        });
        originalAttributes.set(element, values);
      });
  }

  function applyLanguage(language, options) {
    const settings = options || {};
    const nextLanguage = normaliseLanguage(language);
    const dictionary = translations[nextLanguage] || {};

    currentLanguage = nextLanguage;

    document.documentElement.lang = nextLanguage;
    document.documentElement.setAttribute("data-lang", nextLanguage);
    document.body.setAttribute("data-lang", nextLanguage);

    /* Textos con HTML permitido (negritas, saltos de línea, etc.). */
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");
      const original = originalText.get(element);
      let value = nextLanguage === "es" ? original : dictionary[key];

      if (typeof value !== "string") {
        value = original;
      }
      if (typeof value !== "string") {
        return;
      }

      if (element.tagName === "TITLE") {
        element.textContent = value;
      } else {
        element.innerHTML = value;
      }
    });

    /* Atributos traducibles: aria-label, alt, placeholder, title y meta content. */
    document
      .querySelectorAll(
        "[data-i18n-aria-label], [data-i18n-alt], [data-i18n-placeholder], [data-i18n-title], [data-i18n-content]"
      )
      .forEach(function (element) {
        const source = originalAttributes.get(element) || {};
        attributeNames.forEach(function (attribute) {
          const key = element.getAttribute("data-i18n-" + attribute);
          if (!key) {
            return;
          }

          let value = nextLanguage === "es" ? source[attribute] : dictionary[key];
          if (typeof value !== "string") {
            value = source[attribute];
          }
          if (typeof value === "string") {
            element.setAttribute(attribute, value);
          }
        });
      });

    /* Aviso de quechua: visible solo cuando se selecciona QU. */
    if (langNote) {
      langNote.hidden = nextLanguage !== "qu";
    }

    /* Estado de los botones de idioma. */
    langButtons.forEach(function (button) {
      const isActive = button.getAttribute("data-lang-btn") === nextLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    /* Metadatos de idioma para compartir. */
    const localeMap = { es: "es_PE", en: "en_US", qu: "qu_PE" };
    const localeElement = document.querySelector('meta[property="og:locale"]');
    if (localeElement) {
      localeElement.setAttribute("content", localeMap[nextLanguage] || "es_PE");
    }

    updateWhatsAppLinks();
    updateMenuLabel();

    if (settings.persist) {
      storeLanguage(nextLanguage);
    }

    if (settings.announce && langStatus) {
      langStatus.textContent = LANGUAGE_STATUS[nextLanguage] || LANGUAGE_STATUS.es;
    }
  }

  function bindLanguageSwitcher() {
    langButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const requestedLanguage = normaliseLanguage(button.getAttribute("data-lang-btn"));
        if (requestedLanguage === currentLanguage) {
          return;
        }
        applyLanguage(requestedLanguage, { persist: true, announce: true });
      });
    });
  }

  /* ==========================================================
     WHATSAPP
     ========================================================== */
  function updateWhatsAppLinks() {
    const message = getLanguageMessage();

    document.querySelectorAll("a[data-wa]").forEach(function (link) {
      link.setAttribute("href", whatsappUrl(message));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    /* Respaldo del formulario cuando JavaScript está activo. */
    const fallbackText = document.querySelector('[data-contact-form] input[name="text"]');
    if (fallbackText) {
      fallbackText.value = message;
    }
  }

  /* ==========================================================
     MENÚ MÓVIL
     ========================================================== */
  function updateMenuLabel() {
    if (!menuToggle || !header) {
      return;
    }
    const isOpen = header.classList.contains("is-menu-open");
    const label = isOpen ? translate("a11y.menuClose") : translate("a11y.menuOpen");
    menuToggle.setAttribute(
      "aria-label",
      label || (isOpen ? "Cerrar menú" : "Abrir menú")
    );
  }

  function setMenuOpen(open, returnFocus) {
    if (!header || !menuToggle || !nav) {
      return;
    }

    header.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("nav-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    updateMenuLabel();

    if (open) {
      const firstLink = nav.querySelector("a");
      if (firstLink) {
        window.setTimeout(function () {
          if (header.classList.contains("is-menu-open")) {
            firstLink.focus();
          }
        }, 140);
      }
    } else if (returnFocus) {
      menuToggle.focus();
    }
  }

  function bindMobileMenu() {
    if (!header || !menuToggle || !nav) {
      return;
    }

    menuToggle.addEventListener("click", function () {
      setMenuOpen(!header.classList.contains("is-menu-open"), false);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false, false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
        setMenuOpen(false, true);
      }
    });

    document.addEventListener("click", function (event) {
      if (!header.classList.contains("is-menu-open")) {
        return;
      }
      if (!header.contains(event.target)) {
        setMenuOpen(false, false);
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const handleDesktop = function (event) {
      if (event.matches && header.classList.contains("is-menu-open")) {
        setMenuOpen(false, false);
      }
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktop);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(handleDesktop);
    }
  }

  /* ==========================================================
     HEADER AL HACER SCROLL
     ========================================================== */
  function bindHeaderScroll() {
    if (!header) {
      return;
    }

    let ticking = false;

    const updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateHeader();
  }

  /* ==========================================================
     APARICIÓN DE ELEMENTOS
     ========================================================== */
  function initRevealAnimations() {
    const items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!items.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    items.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index % 4, 3) * 70 + "ms";
      observer.observe(item);
    });
  }

  /* ==========================================================
     FORMULARIO → WHATSAPP
     ========================================================== */
  function buildContactMessage(name, interest, message) {
    const isEnglish = currentLanguage === "en";
    const parts = [isEnglish ? DEFAULT_MESSAGES.en : DEFAULT_MESSAGES.es];

    if (name) {
      parts.push(isEnglish ? "My name is " + name + "." : "Mi nombre es " + name + ".");
    }

    if (interest) {
      parts.push(isEnglish ? "I'm interested in: " + interest + "." : "Me interesa: " + interest + ".");
    }

    if (message) {
      parts.push(message);
    }

    return parts.join(" ");
  }

  function bindContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) {
      return;
    }

    const nameField = form.querySelector("#contact-name");
    const interestField = form.querySelector("#contact-interest");
    const messageField = form.querySelector("#contact-message");
    const statusField = form.querySelector("[data-form-status]");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = nameField ? nameField.value.trim() : "";
      const message = messageField ? messageField.value.trim() : "";
      let interest = "";

      if (interestField && interestField.selectedOptions.length) {
        interest = interestField.selectedOptions[0].textContent.trim();
      }

      const whatsappMessage = buildContactMessage(name, interest, message);
      const url = whatsappUrl(whatsappMessage);
      const newWindow = window.open(url, "_blank");

      if (newWindow) {
        try {
          newWindow.opener = null;
        } catch (error) {
          /* Algunos navegadores no permiten modificar opener; no es bloqueante. */
        }
      } else {
        /* Si el navegador bloquea la ventana, mantenemos la funcionalidad. */
        window.location.href = url;
        return;
      }

      if (statusField) {
        statusField.textContent = translate("contact.form.opening") || "Abriendo WhatsApp...";
      }

      form.reset();
      const fallbackText = form.querySelector('input[name="text"]');
      if (fallbackText) {
        fallbackText.value = getLanguageMessage();
      }

      window.setTimeout(function () {
        if (statusField) {
          statusField.textContent = "";
        }
      }, 6000);
    });
  }

  /* ==========================================================
     REDES SOCIALES PLACEHOLDER
     ========================================================== */
  function showToast(message) {
    if (!toastElement) {
      toastElement = document.createElement("div");
      toastElement.className = "toast";
      toastElement.setAttribute("role", "status");
      toastElement.setAttribute("aria-live", "polite");
      document.body.appendChild(toastElement);
    }

    toastElement.textContent = message;
    window.requestAnimationFrame(function () {
      toastElement.classList.add("is-visible");
    });

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastElement.classList.remove("is-visible");
    }, 3400);
  }

  function bindPlaceholderLinks() {
    document.addEventListener("click", function (event) {
      const link = event.target.closest("a[data-placeholder-link]");
      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      if (href === "#" || href === null || href === "") {
        event.preventDefault();
        showToast(translate("toast.placeholder") || "Este enlace se actualizará pronto.");
      }
    });
  }

  /* ==========================================================
     AÑO DEL COPYRIGHT
     ========================================================== */
  function updateCopyrightYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll("[data-year]").forEach(function (element) {
      element.textContent = String(year);
    });
  }

  /* ==========================================================
     INICIALIZACIÓN
     ========================================================== */
  function init() {
    captureOriginalContent();
    bindLanguageSwitcher();
    bindMobileMenu();
    bindHeaderScroll();
    initRevealAnimations();
    bindContactForm();
    bindPlaceholderLinks();
    updateCopyrightYear();
    applyLanguage(readStoredLanguage(), { persist: false, announce: false });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
