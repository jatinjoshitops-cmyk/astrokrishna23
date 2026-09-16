// Krishna Astro — shared site script. Load on every page.
// Toggles the mobile navigation drawer, and hides the sticky Call/WhatsApp bar
// while the drawer is open (the drawer doesn't span the full screen width by
// design, so without this the sticky bar's left edge peeks out from behind it).
// FAQ accordions use native <details>/<summary> and need no JS.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var scrim = document.querySelector('.nav-scrim');
  var mobileBar = document.querySelector('.mobile-cta-bar');
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove('is-open');
    if (scrim) scrim.classList.remove('is-open');
    if (mobileBar) mobileBar.classList.remove('is-hidden');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    nav.classList.add('is-open');
    if (scrim) scrim.classList.add('is-open');
    if (mobileBar) mobileBar.classList.add('is-hidden');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('is-open');
    if (isOpen) { closeNav(); } else { openNav(); }
  });
  if (scrim) scrim.addEventListener('click', closeNav);

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
})();
