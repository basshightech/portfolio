 //Tailwind Config 
tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            display: ['Syne', 'sans-serif'],
            mono: ['DM Mono', 'monospace'],
            body: ['Inter', 'sans-serif'],
          },
          colors: {
            accent: '#00E5A0',
            accentDark: '#00b87e',
            surface: '#0D0F14',
            surfaceLight: '#13161D',
            card: '#181C25',
            cardBorder: '#252A36',
            textPrimary: '#F0F2F7',
            textSecondary: '#8892A4',
          },
          animation: {
            'float': 'float 6s ease-in-out infinite',
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'slide-up': 'slideUp 0.7s ease forwards',
            'blink': 'blink 1s step-end infinite',
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            },
            slideUp: {
              '0%': { opacity: '0', transform: 'translateY(40px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            blink: {
              '0%, 100%': { opacity: '1' },
              '50%': { opacity: '0' },
            }
          }
        }
      }
    }


document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
  initContactForm();
  initCurrentYear();
  initSmoothScroll();
});

function initTheme() {
  const html = document.documentElement;

  // Charger le thème sauvegardé
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
  } else {
    html.classList.add('dark');
    html.classList.remove('light');
  }
  updateThemeIcons(savedTheme);

  // Écouteurs pour les deux boutons (desktop + mobile)
  ['theme-toggle', 'theme-toggle-mobile'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      html.classList.toggle('dark', !isDark);
      html.classList.toggle('light', isDark);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const icons = {
    'theme-icon': document.getElementById('theme-icon'),
    'theme-icon-mobile': document.getElementById('theme-icon-mobile'),
  };
  Object.values(icons).forEach(icon => {
    if (!icon) return;
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-moon text-sm';
    } else {
      icon.className = 'fa-solid fa-sun text-sm';
    }
  });
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      // Ajouter le fond au scroll
      navbar.style.background = 'var(--surface)';
      navbar.style.borderBottom = '1px solid var(--card-border)';
      navbar.style.backdropFilter = 'blur(12px)';
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.borderBottom = 'none';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}


function initMobileMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (!burgerBtn || !mobileMenu) return;

  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Fermer le menu au clic sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}


function initTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const texts = [
    'Développeur Full Stack',
    'React & Angular',
    'Node.js & API Builder',
    'Freelance disponible',
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      // Effacer
      el.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Écrire
      el.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    // Pause en fin de mot
    if (!isDeleting && charIndex === currentText.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        type();
      }, 2000);
      return;
    }

    // Passer au mot suivant
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? 50 : 80;
    setTimeout(type, speed);
  }

  type();
}


function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Ne pas observer une seconde fois
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


function initSkillBars() {
  // Construire les barres de chaque conteneur de compétences
  const containers = {
    'skills-frontend': document.getElementById('skills-frontend'),
    'skills-backend': document.getElementById('skills-backend'),
    'skills-db': document.getElementById('skills-db'),
  };

  Object.values(containers).forEach(container => {
    if (!container) return;
    const items = container.querySelectorAll('[data-skill]');
    items.forEach(item => {
      const skill = item.getAttribute('data-skill');
      const level = item.getAttribute('data-level');
      item.innerHTML = `
        <div class="flex justify-between mb-1.5">
          <span style="font-size:0.82rem; color: var(--text-primary); font-weight: 500">${skill}</span>
          <span style="font-size:0.75rem; font-family:'DM Mono',monospace; color: var(--accent)">${level}%</span>
        </div>
        <div style="height:4px; background: var(--card-border); border-radius:2px; overflow:hidden">
          <div class="skill-bar-fill" data-target="${level}"></div>
        </div>
      `;
    });
  });

  // Observer pour animer les barres quand elles entrent dans le viewport
  const skillSection = document.getElementById('skills');
  if (!skillSection) return;

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateSkillBars();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillSection);
}

function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  // Petit délai pour que les éléments soient bien dans le DOM
  setTimeout(() => {
    bars.forEach((bar, i) => {
      const target = bar.getAttribute('data-target');
      setTimeout(() => {
        bar.style.width = target + '%';
      }, i * 80);
    });
  }, 100);
}


function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name');
    const email = document.getElementById('form-email');
    const message = document.getElementById('form-message');

    let isValid = true;

    // Réinitialiser les erreurs
    form.querySelectorAll('.form-error').forEach(el => el.classList.add('hidden'));
    form.querySelectorAll('.form-input').forEach(el => el.style.borderColor = '');

    // Valider le nom
    if (!name.value.trim()) {
      showFieldError(name);
      isValid = false;
    }

    // Valider l'email
    if (!isValidEmail(email.value)) {
      showFieldError(email);
      isValid = false;
    }

    // Valider le message
    if (!message.value.trim()) {
      showFieldError(message);
      isValid = false;
    }

    if (!isValid) return;

    // Simuler l'envoi
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      form.reset();
      showToast();
    }, 1800);
  });
}

function showFieldError(input) {
  input.style.borderColor = '#FF7B7B';
  const error = input.parentElement.querySelector('.form-error');
  if (error) error.classList.remove('hidden');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}


function initCurrentYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}


function initSmoothScroll() {
  // Intercepter tous les liens d'ancre
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}
