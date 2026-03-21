(function () {
  'use strict';

  var LANG_KEY = 'nta_lang';
  var DEFAULT_LANG = 'en';

  function activateLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-lang]').forEach(function (node) {
      node.classList.toggle('active', node.getAttribute('data-lang') === lang);
    });

    document.querySelectorAll('.lang-btn').forEach(function (button) {
      var active = button.getAttribute('data-lang-target') === lang;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('bg-ink', active);
      button.classList.toggle('text-white', active);
      button.classList.toggle('shadow-sm', active);
      button.classList.toggle('text-slatewarm', !active);
    });
  }

  function initLanguage() {
    var saved = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
    activateLanguage(saved);

    document.querySelectorAll('.lang-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        activateLanguage(button.getAttribute('data-lang-target'));
      });
    });
  }

  function initMobileMenu() {
    var toggle = document.querySelector('[data-mobile-toggle]');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden', isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function setPanelState(trigger, open) {
    var panelId = trigger.getAttribute('aria-controls');
    var panel = panelId ? document.getElementById(panelId) : null;
    var icon = trigger.querySelector('[data-accordion-icon]');
    if (!panel) return;

    trigger.setAttribute('aria-expanded', String(open));
    panel.hidden = false;

    if (open) {
      panel.classList.add('is-open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      if (icon) icon.style.transform = 'rotate(180deg)';
    } else {
      panel.classList.remove('is-open');
      panel.style.maxHeight = '0px';
      if (icon) icon.style.transform = 'rotate(0deg)';
      window.setTimeout(function () {
        if (trigger.getAttribute('aria-expanded') === 'false') {
          panel.hidden = true;
        }
      }, 280);
    }
  }

  function initAccordions() {
    document.querySelectorAll('[data-accordion-group]').forEach(function (group) {
      group.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
        setPanelState(trigger, false);
        trigger.addEventListener('click', function () {
          var willOpen = trigger.getAttribute('aria-expanded') !== 'true';

          group.querySelectorAll('[data-accordion-trigger]').forEach(function (other) {
            if (other !== trigger) setPanelState(other, false);
          });

          setPanelState(trigger, willOpen);
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLanguage();
    initMobileMenu();
    initAccordions();
  });
})();
