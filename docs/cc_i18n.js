(function () {
  var TEXT_ATTRS = ['placeholder', 'aria-label', 'title', 'alt', 'content'];
  var SKIP_TAGS = { SCRIPT: true, STYLE: true, NOSCRIPT: true, TEMPLATE: true };
  var LANG_STYLE_ID = 'cc-lang-switch-styles';

  function detectLang() {
    var lang = window.CC_LANG;
    if (lang === 'et' || lang === 'ru') return lang;
    try {
      var qs = new URLSearchParams(window.location.search);
      lang = qs.get('lang');
      if (lang === 'et' || lang === 'ru') return lang;
      lang = window.localStorage && localStorage.getItem('cubcar-lang');
      if (lang === 'et' || lang === 'ru') return lang;
    } catch (err) {}
    return 'et';
  }

  function getTranslations(lang) {
    if (lang === 'ru') return window.CC_TRANSLATIONS_RU || {};
    return window.CC_TRANSLATIONS_ET || {};
  }

  function translateValue(value, lang) {
    var map = getTranslations(lang);
    if (Object.prototype.hasOwnProperty.call(map, value)) {
      return map[value];
    }
    return value;
  }

  function translateTextNode(node, lang) {
    if (!node || !node.nodeValue) return;
    var raw = node.nodeValue;
    if (!raw.trim()) return;
    var value = raw.trim();
    var translated = translateValue(value, lang);
    if (translated !== value) {
      node.nodeValue = raw.replace(value, translated);
    }
  }

  function translateAttributes(root, lang) {
    var elements = root.querySelectorAll('*');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (SKIP_TAGS[el.tagName]) continue;
      for (var j = 0; j < TEXT_ATTRS.length; j++) {
        var attr = TEXT_ATTRS[j];
        if (!el.hasAttribute(attr)) continue;
        var value = el.getAttribute(attr);
        if (!value) continue;
        var translated = translateValue(value.trim(), lang);
        if (translated !== value.trim()) {
          el.setAttribute(attr, translated);
        }
      }
    }
  }

  function translateTextNodes(root, lang) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentNode;
      if (parent && SKIP_TAGS[parent.tagName]) continue;
      translateTextNode(node, lang);
    }
  }

  function syncLangSwitches(lang) {
    var switches = document.querySelectorAll('[data-lang-switch]');
    for (var i = 0; i < switches.length; i++) {
      var el = switches[i];
      var value = el.getAttribute('data-lang-switch');
      if (value === lang) {
        el.setAttribute('aria-current', 'page');
        el.classList.add('is-active');
        el.classList.remove('is-inactive');
      } else {
        el.removeAttribute('aria-current');
        el.classList.remove('is-active');
        el.classList.add('is-inactive');
      }
    }
  }

  function injectLangSwitchStyles() {
    if (document.getElementById(LANG_STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = LANG_STYLE_ID;
    style.textContent = [
      '[data-lang-switch] { transition: opacity .18s ease, background-color .18s ease, color .18s ease, border-color .18s ease, box-shadow .18s ease; }',
      '[data-lang-switch].is-active, [data-lang-switch][aria-current="page"] { opacity: 1; font-weight: 700; text-decoration: none; background-color: color-mix(in srgb, currentColor 12%, transparent); box-shadow: inset 0 0 0 1px currentColor, inset 0 0 0 999px color-mix(in srgb, currentColor 12%, transparent); }',
      '[data-lang-switch].is-inactive { opacity: .58; }',
      '[data-lang-switch].is-inactive:hover { opacity: 1; }'
    ].join('\\n');
    document.head.appendChild(style);
  }

  function initMobileMenus() {
    var toggles = document.querySelectorAll('[data-mobile-menu-toggle]');
    if (!toggles.length) return;

    var entries = [];

    function syncGeometry(entry) {
      if (!entry || !entry.button || !entry.panel) return;
      var header = entry.header || entry.button.closest('header');
      var top = header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 0;
      entry.panel.style.position = 'fixed';
      entry.panel.style.left = '0';
      entry.panel.style.right = '0';
      entry.panel.style.top = top + 'px';
      entry.panel.style.zIndex = '45';
      entry.panel.style.overflowY = 'auto';
      entry.panel.style.webkitOverflowScrolling = 'touch';
      entry.panel.style.maxHeight = 'calc(100vh - ' + top + 'px)';
      entry.panel.style.boxShadow = '0 18px 48px rgba(0, 0, 0, 0.14)';
    }

    function setOpen(entry, open) {
      if (!entry || !entry.button || !entry.panel) return;
      syncGeometry(entry);
      entry.open = open;
      entry.button.setAttribute('aria-expanded', open ? 'true' : 'false');
      entry.panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      entry.panel.classList.toggle('hidden', !open);
    }

    function closeAll() {
      for (var i = 0; i < entries.length; i++) {
        setOpen(entries[i], false);
      }
    }

    for (var i = 0; i < toggles.length; i++) {
      var button = toggles[i];
      var targetId = button.getAttribute('aria-controls') || button.getAttribute('data-mobile-menu-target');
      var panel = targetId ? document.getElementById(targetId) : null;
      if (!panel) continue;

      var entry = { button: button, panel: panel, header: button.closest('header'), open: false };
      entries.push(entry);
      setOpen(entry, false);

      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        for (var j = 0; j < entries.length; j++) {
          if (entries[j].button === this) {
            setOpen(entries[j], !entries[j].open);
          } else {
            setOpen(entries[j], false);
          }
        }
      });

      panel.addEventListener('click', function (event) {
        if (event.target && event.target.closest && event.target.closest('a[href]')) {
          closeAll();
        }
      });
    }

    document.addEventListener('click', function (event) {
      if (event.target && event.target.closest && event.target.closest('[data-mobile-menu-toggle], [data-mobile-menu-panel]')) {
        return;
      }
      closeAll();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeAll();
    });

    window.addEventListener('resize', function () {
      for (var i = 0; i < entries.length; i++) {
        syncGeometry(entries[i]);
      }
      if (window.matchMedia && window.matchMedia('(min-width: 1024px)').matches) {
        closeAll();
      }
    });
  }

  function applyI18n() {
    if (!document.documentElement) return;
    var lang = detectLang();
    window.CC_LANG = lang;
    try {
      localStorage.setItem('cubcar-lang', lang);
    } catch (err) {}
    document.documentElement.lang = lang;
    injectLangSwitchStyles();
    translateTextNodes(document.documentElement, lang);
    translateAttributes(document, lang);
    syncLangSwitches(lang);
  }

  window.CC_APPLY_I18N = applyI18n;

  if (document.body) {
    applyI18n();
    initMobileMenus();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      applyI18n();
      initMobileMenus();
    }, { once: true });
  }
})();
