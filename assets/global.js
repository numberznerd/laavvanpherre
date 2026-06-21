/* ==========================================================================
   Laavvan Pherre — global.js
   Progressive enhancement: mobile nav, quantity steppers, cart line updates,
   product gallery thumbnails. Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  /* Mobile navigation drawer ---------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var drawer = document.querySelector('[data-mobile-nav]');
    var overlay = document.querySelector('[data-overlay]');
    if (!toggle || !drawer) return;

    function setOpen(open) {
      drawer.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      if (overlay) overlay.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(drawer.getAttribute('aria-hidden') !== 'false');
    });
    if (overlay) overlay.addEventListener('click', function () { setOpen(false); });
    var closeBtn = drawer.querySelector('[data-menu-close]');
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* Quantity steppers ------------------------------------------------------ */
  function initQuantitySteppers() {
    document.querySelectorAll('[data-quantity]').forEach(function (wrap) {
      var input = wrap.querySelector('input');
      if (!input) return;
      wrap.querySelectorAll('[data-quantity-button]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var step = btn.dataset.quantityButton === 'increase' ? 1 : -1;
          var min = parseInt(input.min, 10) || 0;
          var next = (parseInt(input.value, 10) || 0) + step;
          input.value = Math.max(min, next);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  /* Cart line item quantity / remove (AJAX) -------------------------------- */
  function initCartUpdates() {
    var cart = document.querySelector('[data-cart]');
    if (!cart) return;

    function changeLine(line, quantity) {
      cart.classList.add('is-loading');
      fetch(window.Shopify.routes.root + 'cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ line: line, quantity: quantity })
      })
        .then(function (r) { return r.json(); })
        .then(function () { window.location.reload(); })
        .catch(function () { cart.classList.remove('is-loading'); });
    }

    cart.addEventListener('change', function (e) {
      var input = e.target.closest('[data-cart-quantity]');
      if (!input) return;
      changeLine(input.dataset.line, parseInt(input.value, 10));
    });
    cart.addEventListener('click', function (e) {
      var remove = e.target.closest('[data-cart-remove]');
      if (!remove) return;
      e.preventDefault();
      changeLine(remove.dataset.line, 0);
    });
  }

  /* Product gallery thumbnails -------------------------------------------- */
  function initProductGallery() {
    var gallery = document.querySelector('[data-gallery]');
    if (!gallery) return;
    var featured = gallery.querySelector('[data-gallery-featured]');
    gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        if (featured) {
          featured.src = thumb.dataset.full || thumb.src;
          featured.alt = thumb.alt;
        }
        gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (t) {
          t.setAttribute('aria-current', String(t === thumb));
        });
      });
    });
  }

  /* Init ------------------------------------------------------------------- */
  function init() {
    // Ensure Shopify routes object exists for older contexts.
    window.Shopify = window.Shopify || {};
    window.Shopify.routes = window.Shopify.routes || { root: '/' };
    initMobileNav();
    initQuantitySteppers();
    initCartUpdates();
    initProductGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
