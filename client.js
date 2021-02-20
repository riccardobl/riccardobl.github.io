parcelRequire = (function (init) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;
  var modules = {};

  function localRequire(name, jumped) {
    if (name in modules) {
      return modules[name];
    }

    // if we cannot find the module within our internal map or
    // cache jump to the current global require ie. the last bundle
    // that was added to the page.
    var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
    if (!jumped && currentRequire) {
      return currentRequire(name, true);
    }

    // If there are other bundles on this page the require from the
    // previous one is saved to 'previousRequire'. Repeat this as
    // many times as there are bundles until the module is found or
    // we exhaust the require chain.
    if (previousRequire) {
      return previousRequire(name, true);
    }

    // Try the node require function if it exists.
    if (nodeRequire && typeof name === 'string') {
      return nodeRequire(name);
    }

    var err = new Error('Cannot find module \'' + name + '\'');
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }

  localRequire.register = function register(id, exports) {
    modules[id] = exports;
  };

  modules = init(localRequire);
  localRequire.modules = modules;
  return localRequire;
})(function (require) {
// ASSET: deparam.ts
var $ieWq$exports = {};

function $ieWq$export$deparam(query) {
  var match;
  var plus = /\+/g;
  var search = /([^&=]+)=?([^&]*)/g;

  var decode = function decode(s) {
    return decodeURIComponent(s.replace(plus, ' '));
  };

  var params = {};

  while (match = search.exec(query)) {
    params[decode(match[1])] = decode(match[2]);
  }

  return params;
}

$ieWq$exports.deparam = $ieWq$export$deparam;

function $ieWq$export$param(obj) {
  var parts = [];

  for (var name in obj) {
    if (obj.hasOwnProperty(name) && obj[name]) {
      parts.push(encodeURIComponent(name) + "=" + encodeURIComponent(obj[name]));
    }
  }

  return parts.join('&');
}

$ieWq$exports.param = $ieWq$export$param;
var $D53L$var$params = $ieWq$export$deparam(location.search.substr(1));
var $D53L$var$token = $D53L$var$params.utterances;

if ($D53L$var$token) {
  delete $D53L$var$params.utterances;
  var $D53L$var$search = $ieWq$export$param($D53L$var$params);

  if ($D53L$var$search.length) {
    $D53L$var$search = '?' + $D53L$var$search;
  }

  history.replaceState(undefined, document.title, location.pathname + $D53L$var$search + location.hash);
}

var $D53L$var$script = document.currentScript;

if ($D53L$var$script === undefined) {
  $D53L$var$script = document.querySelector('script[src^="https://rblb.it/client.js"],script[src^="https://rblb.it/client.js"]');
}

var $D53L$var$attrs = {};

for (var $D53L$var$i = 0; $D53L$var$i < $D53L$var$script.attributes.length; $D53L$var$i++) {
  var $D53L$var$attribute = $D53L$var$script.attributes.item($D53L$var$i);
  $D53L$var$attrs[$D53L$var$attribute.name.replace(/^data-/, '')] = $D53L$var$attribute.value;
}

var $D53L$var$canonicalLink = document.querySelector("link[rel='canonical']");
$D53L$var$attrs.url = $D53L$var$canonicalLink ? $D53L$var$canonicalLink.href : location.origin + location.pathname + location.search;
$D53L$var$attrs.origin = location.origin;
$D53L$var$attrs.pathname = location.pathname.length < 2 ? 'index' : location.pathname.substr(1).replace(/\.\w+$/, '');
$D53L$var$attrs.title = document.title;
var $D53L$var$descriptionMeta = document.querySelector("meta[name='description']");
$D53L$var$attrs.description = $D53L$var$descriptionMeta ? $D53L$var$descriptionMeta.content : '';
var $D53L$var$ogtitleMeta = document.querySelector("meta[property='og:title'],meta[name='og:title']");
$D53L$var$attrs['og:title'] = $D53L$var$ogtitleMeta ? $D53L$var$ogtitleMeta.content : '';
$D53L$var$attrs.token = $D53L$var$token;
document.head.insertAdjacentHTML('afterbegin', "<style>\n    .utterances {\n      position: relative;\n      box-sizing: border-box;\n      width: 100%;\n      max-width: 760px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n    .utterances-frame {\n      position: absolute;\n      left: 0;\n      right: 0;\n      width: 1px;\n      min-width: 100%;\n      max-width: 100%;\n      height: 100%;\n      border: 0;\n    }\n  </style>");
var $D53L$var$utterancesOrigin = $D53L$var$script.src.match(/^https:\/\/rblb\.it|http:\/\/localhost:\d+/)[0];
var $D53L$var$url = $D53L$var$utterancesOrigin + "/utterances.html";
$D53L$var$script.insertAdjacentHTML('afterend', "<div class=\"utterances\">\n    <iframe class=\"utterances-frame\" title=\"Comments\" scrolling=\"no\" src=\"" + $D53L$var$url + "?" + $ieWq$export$param($D53L$var$attrs) + "\"></iframe>\n  </div>");
var $D53L$var$container = $D53L$var$script.nextElementSibling;
$D53L$var$script.parentElement.removeChild($D53L$var$script);
addEventListener('message', function (event) {
  if (event.origin !== $D53L$var$utterancesOrigin) {
    return;
  }

  var data = event.data;

  if (data && data.type === 'resize' && data.height) {
    $D53L$var$container.style.height = data.height + "px";
  }
});
$ieWq$exports.__esModule = true;
return {
  "D53L": {},
  "ieWq": $ieWq$exports
};
});