(function () {
  var TEXT_ATTRS = ['placeholder', 'aria-label', 'title', 'alt', 'content'];
  var SKIP_TAGS = { SCRIPT: true, STYLE: true, NOSCRIPT: true, TEMPLATE: true };

  function getTranslations() {
    return window.CC_TRANSLATIONS || {};
  }

  function translateValue(value) {
    var map = getTranslations();
    if (Object.prototype.hasOwnProperty.call(map, value)) {
      return map[value];
    }
    return value;
  }

  function translateTextNode(node) {
    if (!node || !node.nodeValue) return;
    var raw = node.nodeValue;
    if (!raw.trim()) return;
    var value = raw.trim();
    var translated = translateValue(value);
    if (translated !== value) {
      node.nodeValue = raw.replace(value, translated);
    }
  }

  function translateAttributes(root) {
    var elements = root.querySelectorAll('*');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (SKIP_TAGS[el.tagName]) continue;
      for (var j = 0; j < TEXT_ATTRS.length; j++) {
        var attr = TEXT_ATTRS[j];
        if (!el.hasAttribute(attr)) continue;
        var value = el.getAttribute(attr);
        if (!value) continue;
        var translated = translateValue(value.trim());
        if (translated !== value.trim()) {
          el.setAttribute(attr, translated);
        }
      }
    }
  }

  function translateTextNodes(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentNode;
      if (parent && SKIP_TAGS[parent.tagName]) continue;
      translateTextNode(node);
    }
  }

  function applyI18n() {
    if (!document.documentElement) return;
    var lang = window.CC_LANG || 'et';
    document.documentElement.lang = lang;
    translateTextNodes(document.documentElement);
    translateAttributes(document);
  }

  window.CC_APPLY_I18N = applyI18n;

  if (document.body) {
    applyI18n();
  } else {
    document.addEventListener('DOMContentLoaded', applyI18n, { once: true });
  }
})();
