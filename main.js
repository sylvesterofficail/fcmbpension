
    // Show newsletter popup on page load
  window.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('newsletterModal');
    setTimeout(function () {
      if (modal) modal.classList.add('open');
    }, 600);
  });

  function closeNewsletterModal() {
    var modal = document.getElementById('newsletterModal');
    if (modal) modal.classList.remove('open');
  }

  // Close on overlay click (outside the box)
  document.addEventListener('click', function (e) {
    var modal = document.getElementById('newsletterModal');
    if (modal && e.target === modal) {
      modal.classList.remove('open');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNewsletterModal();
    }
  });

  function handlePopupNewsletter(btn) {
    var formWrap = document.getElementById('newsletterModalFormWrap');
    var success = document.getElementById('newsletterModalSuccess');
    if (formWrap) formWrap.style.display = 'none';
    if (success) success.style.display = 'flex';
    setTimeout(function () {
      closeNewsletterModal();
    }, 2200);
  }
  // ===== ----------- =====
  // ===== ----------- =====
  // ===== ----------- =====


  // ===== NAV SCROLL BEHAVIOUR =====
  const mainNav = document.getElementById('main-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });

  // ===== MOBILE MENU =====
  const mobileMenu = document.getElementById('mobile-menu');
  document.getElementById('hamburger-btn').addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('mobile-close-btn').addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));

  // ===== HERO IMAGE CAROUSEL =====
  // Uses image1.jpg ... image4.jpg placed in the same folder as this HTML file.
  (function () {
    const imgs = document.querySelectorAll('#hero-carousel .hero-carousel-img');
    if (!imgs.length) return;

    let current = 0;
    setInterval(() => {
      imgs[current].classList.remove('active');
      current = (current + 1) % imgs.length;
      imgs[current].classList.add('active');
    }, 4000);
  })();

  /* =============================================
   ANIMATED COUNTERS
   ============================================= */
function animateCounter(el, target, suffix, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    const display = target > 999 ? Math.floor(start).toLocaleString() : Math.floor(start);
    el.innerHTML = display + '<span class="stat-suffix">' + suffix + '</span>';
    if (start >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

  // ===== MOBILE NAV ACCORDION =====
  function toggleMobileSection(btn) {
    const section = btn.parentElement;
    const isOpen = section.classList.contains('open');
    const group = section.closest('.mobile-nav-list') || document;
    group.querySelectorAll('.mobile-nav-section.open').forEach(s => s.classList.remove('open'));
    if (!isOpen) section.classList.add('open');
  }
  function toggleFaq(btn) {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  // ===== BODY NEWSLETTER =====
  function handleBodyNewsletter(e) {
    e.preventDefault();
    const btn = document.getElementById('newsletter-body-btn');
    btn.innerHTML = '✓ Subscribed!';
    btn.style.background = '#3de896';
    btn.style.color = '#14141a';
    setTimeout(() => {
      btn.innerHTML = 'Subscribe Now <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
    e.target.reset();
  }

  // ===== NEWSLETTER =====
  function handleNewsletter(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.newsletter-btn');
    btn.textContent = 'Subscribed!';
    btn.style.background = '#3de896';
    btn.style.color = '#14141a';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; btn.style.color = ''; }, 3000);
    e.target.reset();
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-num, .hero-stat-num');
    counters.forEach(counter => {
      const text = counter.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9.]/g, '');
      if (!num) return;
      let start = 0;
      const duration = 1800;
      const step = 16;
      const increment = num / (duration / step);
      const timer = setInterval(() => {
        start += increment;
        if (start >= num) { start = num; clearInterval(timer); }
        const display = num >= 1000 ? Math.floor(start).toLocaleString() : start.toFixed(num % 1 !== 0 ? 1 : 0);
        counter.textContent = display + suffix;
      }, step);
    });
  }

  // Trigger counter on first visibility
  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }
