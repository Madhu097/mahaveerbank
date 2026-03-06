/* ================================================================
   MAHAVEER BANK – MAIN JAVASCRIPT
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- HERO SWIPER INITIALIZATION ----
  if (typeof Swiper !== 'undefined' && document.querySelector('.heroSwiper')) {
    const heroSwiper = new Swiper('.heroSwiper', {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // ---- NAVBAR SCROLL & HAMBURGER ----
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    // Scroll to top visibility
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
      if (window.scrollY > 400) scrollTop.classList.add('visible');
      else scrollTop.classList.remove('visible');
    }
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
    document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click (Mobile)
  document.querySelectorAll('.nav-link, .nav-btn-cta, .dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---- HERO PARTICLES ----
  const heroParticles = document.getElementById('heroParticles');
  if (heroParticles) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 10 + 4;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: ${Math.random() * 0.4 + 0.1};
      `;
      heroParticles.appendChild(p);
    }
  }

  // ---- AOS-LIKE SCROLL ANIMATIONS ----
  const aosElements = document.querySelectorAll('[data-aos]');
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => el.classList.add('aos-animated'), parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, observerOptions);
  aosElements.forEach(el => observer.observe(el));

  // ---- COUNTER ANIMATION ----
  const statNumbers = document.querySelectorAll('.stat-number');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => countObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = formatNumber(Math.floor(current)) + suffix;
    }, 16);
  }

  function formatNumber(n) {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.0', '') + (n >= 1000 ? 'K' : '');
    return n.toString();
  }

  // Fix: For year (1999) don't abbreviate
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    // Override formatNumber for year values
    if (target === 1999) {
      const orig = animateCounter;
      // re-define with no K formatting
    }
  });

  // Refined counter for year display
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    if (target >= 1900) {
      // Year value: don't use K format
      const suffix = el.getAttribute('data-suffix') || '';
      const originalObserver = countObserver;
    }
  });

  // Re-do counters properly
  function animateCounterClean(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isYear = target >= 1900 && target <= 2100;
    const duration = 2200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const display = Math.floor(current);
      if (isYear) {
        el.textContent = display + suffix;
      } else if (display >= 1000) {
        el.textContent = (display / 1000).toFixed(display >= 10000 ? 0 : 1).replace('.0', '') + 'K' + suffix;
      } else {
        el.textContent = display + suffix;
      }
    }, 16);
  }

  const countObs2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounterClean(entry.target);
        countObs2.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => countObs2.observe(el));

  // ---- SCROLL TO TOP ----
  const scrollTopBtn = document.getElementById('scrollTop');
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- ENQUIRY FORM SUBMIT ----
  const enquiryForm = document.getElementById('enquiryForm');
  enquiryForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName')?.value.trim();
    const phone = document.getElementById('formPhone')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const service = document.getElementById('formService')?.value;
    const message = document.getElementById('formMessage')?.value.trim();

    if (!name || !phone || !email || !service || !message) {
      showToast('⚠️ Please fill in all required fields.', 'warning');
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      showToast('⚠️ Please enter a valid 10-digit phone number.', 'warning');
      return;
    }

    // Simulate form submission
    const submitBtn = document.getElementById('submitEnquiry');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;
    }
    setTimeout(() => {
      showToast('✅ Your enquiry has been submitted! We will contact you shortly.', 'success');
      enquiryForm.reset();
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Enquiry';
        submitBtn.disabled = false;
      }
    }, 1800);
  });

  // ---- TOAST NOTIFICATION ----
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.classList.add('toast');
    if (type === 'warning') toast.style.borderLeftColor = '#E5A22A';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }
  window.showToast = showToast;

  // ---- ACCOUNT TABS (accounts.html) ----
  document.querySelectorAll('.account-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.account-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage) && currentPage !== '') {
      link.classList.add('active');
    }
  });

  // ---- SMOOTH HASH SCROLL ----
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (href.includes('#')) {
        // Cross-page link – let browser handle
      }
    });
  });

  // ---- NAVBAR DROPDOWN TOUCH SUPPORT ----
  document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const menu = trigger.parentElement.querySelector('.dropdown-menu');
        if (menu) {
          menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
      }
    });
  });

  // ---- ABOUT IMAGE FALLBACK ----
  const aboutImg = document.getElementById('aboutImg');
  if (aboutImg) {
    aboutImg.addEventListener('error', () => {
      aboutImg.style.cssText = `
        background: linear-gradient(135deg, #7A1F00, #F36A06);
        display: flex; align-items: center; justify-content: center;
        color: white; font-size: 4rem;
      `;
      aboutImg.src = '';
      const parent = aboutImg.parentElement;
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%; height: 480px;
        background: linear-gradient(135deg, var(--maroon), var(--orange));
        border-radius: 20px;
        display: flex; align-items: center; justify-content: center;
        font-size: 5rem; color: rgba(255,255,255,0.3);
      `;
      placeholder.innerHTML = '<i class="fas fa-university"></i>';
      if (parent) {
        parent.replaceChild(placeholder, aboutImg);
      }
    });
  }

  // ---- HEADER ANNOUNCEMENT TICKER ----
  const ticker = document.getElementById('announcementTicker');
  if (ticker) {
    let pos = ticker.offsetWidth;
    const text = ticker.querySelector('.ticker-text');
    if (text) {
      function moveTicker() {
        pos--;
        if (pos < -text.offsetWidth) pos = ticker.offsetWidth;
        text.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(moveTicker);
      }
      requestAnimationFrame(moveTicker);
    }
  }

  console.log('%cMahaveer Co-operative Urban Bank Ltd.', 'color: #7A1F00; font-size: 18px; font-weight: bold;');
  console.log('%cSecure Solutions, Seamless Banking', 'color: #F36A06; font-size: 13px;');
});
