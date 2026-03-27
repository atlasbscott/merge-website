/* ============================================
   MAIN JS — Merge Windows & Doors
   ============================================ */

(function() {

  /* ----- Nav scroll behavior ----- */
  var nav = document.getElementById('nav');
  var hero = document.getElementById('hero');

  function handleNavScroll() {
    if (!nav) return;

    // Pages with a hero get transparent-to-solid transition
    if (hero) {
      var threshold = hero.offsetHeight * 0.15;
      if (window.scrollY > threshold) {
        nav.classList.remove('nav--transparent');
        nav.classList.add('nav--solid');
      } else {
        nav.classList.remove('nav--solid');
        nav.classList.add('nav--transparent');
      }
    }
    // Interior pages without hero: nav stays dark, add shadow on scroll
    else if (nav.classList.contains('nav--dark')) {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 1px 20px rgba(10,9,6,.3)';
      } else {
        nav.style.boxShadow = '';
      }
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ----- Mobile hamburger ----- */
  var hamburger = document.getElementById('hamburger');
  var overlay = document.getElementById('navOverlay');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----- Product filter tabs ----- */
  var filters = document.querySelectorAll('.products__filter');
  var cards = document.querySelectorAll('.product-card');

  if (filters.length > 0) {
    filters.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filters.forEach(function(f) { f.classList.remove('active'); });
        btn.classList.add('active');

        var category = btn.getAttribute('data-filter');

        cards.forEach(function(card) {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ----- Scroll-triggered reveal ----- */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function(el) { observer.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }

  /* ----- Smooth scroll for anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
