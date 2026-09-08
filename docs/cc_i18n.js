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
      '[data-lang-switch] { transition: opacity .18s ease, background-color .18s ease, color .18s ease, border-color .18s ease; }',
      '[data-lang-switch].is-active { pointer-events: none; opacity: 1; }',
      '[data-lang-switch].is-inactive { opacity: .72; }',
      '[data-lang-switch].is-inactive:hover { opacity: 1; }'
    ].join('\\n');
    document.head.appendChild(style);
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
  } else {
    document.addEventListener('DOMContentLoaded', applyI18n, { once: true });
  }
})();
