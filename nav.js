/* NameTheAbuse — Shared Navigation JS */

(function () {
  'use strict';

  // ── Language Switcher ─────────────────────────────
  const LANG_KEY = 'nta_lang';
  const DEFAULT_LANG = 'en';

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);

    // Show/hide all data-lang elements
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.classList.toggle('active', el.dataset.lang === lang);
    });

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langTarget === lang);
      btn.setAttribute('aria-pressed', btn.dataset.langTarget === lang);
    });
  }

  function initLang() {
    const saved = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
    setLang(saved);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.langTarget));
    });
  }

  // ── Mobile Nav Toggle ─────────────────────────────
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // ── Active Nav Link ───────────────────────────────
  function highlightNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === path);
    });
  }

  // ── Init ──────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initNav();
    highlightNav();
  });
})();
