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
// ASSET: utterances.ts
var $fHsu$exports = {};
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
var $Thhf$export$default = /^([\w-_]+)\/([\w-_.]+)$/i;
// ASSET: oauth.ts
var $Ph$exports = {};
var $BYTq$export$UTTERANCES_API = 'https://comments.rblb.workers.dev';

var $Ph$var$__awaiter = $Ph$exports && $Ph$exports.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var $Ph$var$__generator = $Ph$exports && $Ph$exports.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var $Ph$export$token = {
  value: null
};
$Ph$exports.token = $Ph$export$token;

function $Ph$export$getLoginUrl(redirect_uri) {
  return $BYTq$export$UTTERANCES_API + "/authorize?" + $ieWq$export$param({
    redirect_uri: redirect_uri
  });
}

$Ph$exports.getLoginUrl = $Ph$export$getLoginUrl;

function $Ph$export$loadToken() {
  return $Ph$var$__awaiter(this, void 0, Promise, function () {
    var url, response, t;
    return $Ph$var$__generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if ($Ph$export$token.value) {
            return [2, $Ph$export$token.value];
          }

          url = $BYTq$export$UTTERANCES_API + "/token";
          return [4, fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
          })];

        case 1:
          response = _a.sent();
          if (!response.ok) return [3, 3];
          return [4, response.json()];

        case 2:
          t = _a.sent();
          $Ph$export$token.value = t;
          return [2, t];

        case 3:
          return [2, null];
      }
    });
  });
}

$Ph$exports.loadToken = $Ph$export$loadToken;

function $iUt$var$readPageAttributes() {
  var params = $ieWq$export$deparam(location.search.substr(1));
  var issueTerm = null;
  var issueNumber = null;

  if ('issue-term' in params) {
    issueTerm = params['issue-term'];

    if (issueTerm !== undefined) {
      if (issueTerm === '') {
        throw new Error('When issue-term is specified, it cannot be blank.');
      }

      if (['title', 'url', 'pathname', 'og:title'].indexOf(issueTerm) !== -1) {
        if (!params[issueTerm]) {
          throw new Error("Unable to find \"" + issueTerm + "\" metadata.");
        }

        issueTerm = params[issueTerm];
      }
    }
  } else if ('issue-number' in params) {
    issueNumber = +params['issue-number'];

    if (issueNumber.toString(10) !== params['issue-number']) {
      throw new Error("issue-number is invalid. \"" + params['issue-number']);
    }
  } else {
    throw new Error('"issue-term" or "issue-number" must be specified.');
  }

  if (!('repo' in params)) {
    throw new Error('"repo" is required.');
  }

  if (!('origin' in params)) {
    throw new Error('"origin" is required.');
  }

  var matches = $Thhf$export$default.exec(params.repo);

  if (matches === null) {
    throw new Error("Invalid repo: \"" + params.repo + "\"");
  }

  if (params.token) {
    $Ph$export$token.value = params.token;
  }

  return {
    owner: matches[1],
    repo: matches[2],
    issueTerm: issueTerm,
    issueNumber: issueNumber,
    origin: params.origin,
    url: params.url,
    title: params.title,
    description: params.description,
    label: params.label,
    theme: params.theme || 'github-light'
  };
}

var $iUt$export$pageAttributes = $iUt$var$readPageAttributes();
// ASSET: github.ts
var $nnkK$exports = {};

function $RAYx$export$decodeBase64UTF8(encoded) {
  encoded = encoded.replace(/\s/g, '');
  return decodeURIComponent(escape(atob(encoded)));
}

var $nnkK$var$__awaiter = $nnkK$exports && $nnkK$exports.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var $nnkK$var$__generator = $nnkK$exports && $nnkK$exports.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var $nnkK$var$GITHUB_API = 'https://api.github.com/';
var $nnkK$var$GITHUB_ENCODING__HTML_JSON = 'application/vnd.github.VERSION.html+json';
var $nnkK$var$GITHUB_ENCODING__HTML = 'application/vnd.github.VERSION.html';
var $nnkK$var$GITHUB_ENCODING__REACTIONS_PREVIEW = 'application/vnd.github.squirrel-girl-preview';
var $nnkK$export$PAGE_SIZE = 25;
$nnkK$exports.PAGE_SIZE = $nnkK$export$PAGE_SIZE;
var $nnkK$export$reactionTypes = ['+1', '-1', 'laugh', 'hooray', 'confused', 'heart', 'rocket', 'eyes'];
$nnkK$exports.reactionTypes = $nnkK$export$reactionTypes;
var $nnkK$var$owner;
var $nnkK$var$repo;
var $nnkK$var$branch = 'master';

function $nnkK$export$setRepoContext(context) {
  $nnkK$var$owner = context.owner;
  $nnkK$var$repo = context.repo;
}

$nnkK$exports.setRepoContext = $nnkK$export$setRepoContext;

function $nnkK$var$githubRequest(relativeUrl, init) {
  init = init || {};
  init.mode = 'cors';
  init.cache = 'no-cache';
  var request = new Request($nnkK$var$GITHUB_API + relativeUrl, init);
  request.headers.set('Accept', $nnkK$var$GITHUB_ENCODING__REACTIONS_PREVIEW);

  if (!/^search\//.test(relativeUrl) && $Ph$export$token.value !== null) {
    request.headers.set('Authorization', "token " + $Ph$export$token.value);
  }

  return request;
}

var $nnkK$var$rateLimit = {
  standard: {
    limit: Number.MAX_VALUE,
    remaining: Number.MAX_VALUE,
    reset: 0
  },
  search: {
    limit: Number.MAX_VALUE,
    remaining: Number.MAX_VALUE,
    reset: 0
  }
};

function $nnkK$var$processRateLimit(response) {
  var limit = response.headers.get('X-RateLimit-Limit');
  var remaining = response.headers.get('X-RateLimit-Remaining');
  var reset = response.headers.get('X-RateLimit-Reset');
  var isSearch = /\/search\//.test(response.url);
  var rate = isSearch ? $nnkK$var$rateLimit.search : $nnkK$var$rateLimit.standard;
  rate.limit = +limit;
  rate.remaining = +remaining;
  rate.reset = +reset;

  if (response.status === 403 && rate.remaining === 0) {
    var resetDate = new Date(0);
    resetDate.setUTCSeconds(rate.reset);
    var mins = Math.round((resetDate.getTime() - new Date().getTime()) / 1000 / 60);
    var apiType = isSearch ? 'search API' : 'non-search APIs';
    console.warn("Rate limit exceeded for " + apiType + ". Resets in " + mins + " minute" + (mins === 1 ? '' : 's') + ".");
  }
}

function $nnkK$export$readRelNext(response) {
  var link = response.headers.get('link');

  if (link === null) {
    return 0;
  }

  var match = /\?page=([2-9][0-9]*)>; rel="next"/.exec(link);

  if (match === null) {
    return 0;
  }

  return +match[1];
}

$nnkK$exports.readRelNext = $nnkK$export$readRelNext;

function $nnkK$var$githubFetch(request) {
  return fetch(request).then(function (response) {
    if (response.status === 401) {
      $Ph$export$token.value = null;
    }

    if (response.status === 403) {
      response.json().then(function (data) {
        if (data.message === 'Resource not accessible by integration') {
          window.dispatchEvent(new CustomEvent('not-installed'));
        }
      });
    }

    $nnkK$var$processRateLimit(response);

    if (request.method === 'GET' && [401, 403].indexOf(response.status) !== -1 && request.headers.has('Authorization')) {
      request.headers.delete('Authorization');
      return $nnkK$var$githubFetch(request);
    }

    return response;
  });
}

function $nnkK$export$loadJsonFile(path, html) {
  if (html === void 0) {
    html = false;
  }

  var request = $nnkK$var$githubRequest("repos/" + $nnkK$var$owner + "/" + $nnkK$var$repo + "/contents/" + path + "?ref=" + $nnkK$var$branch);

  if (html) {
    request.headers.set('accept', $nnkK$var$GITHUB_ENCODING__HTML);
  }

  return $nnkK$var$githubFetch(request).then(function (response) {
    if (response.status === 404) {
      throw new Error("Repo \"" + $nnkK$var$owner + "/" + $nnkK$var$repo + "\" does not have a file named \"" + path + "\" in the \"" + $nnkK$var$branch + "\" branch.");
    }

    if (!response.ok) {
      throw new Error("Error fetching " + path + ".");
    }

    return html ? response.text() : response.json();
  }).then(function (file) {
    if (html) {
      return file;
    }

    var content = file.content;
    var decoded = $RAYx$export$decodeBase64UTF8(content);
    return JSON.parse(decoded);
  });
}

$nnkK$exports.loadJsonFile = $nnkK$export$loadJsonFile;

function $nnkK$export$loadIssueByTerm(term) {
  var q = "\"" + term + "\" type:issue in:title repo:" + $nnkK$var$owner + "/" + $nnkK$var$repo;
  var request = $nnkK$var$githubRequest("search/issues?q=" + encodeURIComponent(q) + "&sort=created&order=asc");
  return $nnkK$var$githubFetch(request).then(function (response) {
    if (!response.ok) {
      throw new Error('Error fetching issue via search.');
    }

    return response.json();
  }).then(function (results) {
    if (results.total_count === 0) {
      return null;
    }

    if (results.total_count > 1) {
      console.warn("Multiple issues match \"" + q + "\".");
    }

    term = term.toLowerCase();

    for (var _i = 0, _a = results.items; _i < _a.length; _i++) {
      var result = _a[_i];

      if (result.title.toLowerCase().indexOf(term) !== -1) {
        return result;
      }
    }

    console.warn("Issue search results do not contain an issue with title matching \"" + term + "\". Using first result.");
    return results.items[0];
  });
}

$nnkK$exports.loadIssueByTerm = $nnkK$export$loadIssueByTerm;

function $nnkK$export$loadIssueByNumber(issueNumber) {
  var request = $nnkK$var$githubRequest("repos/" + $nnkK$var$owner + "/" + $nnkK$var$repo + "/issues/" + issueNumber);
  return $nnkK$var$githubFetch(request).then(function (response) {
    if (!response.ok) {
      throw new Error('Error fetching issue via issue number.');
    }

    return response.json();
  });
}

$nnkK$exports.loadIssueByNumber = $nnkK$export$loadIssueByNumber;

function $nnkK$var$commentsRequest(issueNumber, page) {
  var url = "repos/" + $nnkK$var$owner + "/" + $nnkK$var$repo + "/issues/" + issueNumber + "/comments?page=" + page + "&per_page=" + $nnkK$export$PAGE_SIZE;
  var request = $nnkK$var$githubRequest(url);
  var accept = $nnkK$var$GITHUB_ENCODING__HTML_JSON + "," + $nnkK$var$GITHUB_ENCODING__REACTIONS_PREVIEW;
  request.headers.set('Accept', accept);
  return request;
}

function $nnkK$export$loadCommentsPage(issueNumber, page) {
  var request = $nnkK$var$commentsRequest(issueNumber, page);
  return $nnkK$var$githubFetch(request).then(function (response) {
    if (!response.ok) {
      throw new Error('Error fetching comments.');
    }

    return response.json();
  });
}

$nnkK$exports.loadCommentsPage = $nnkK$export$loadCommentsPage;

function $nnkK$export$loadUser() {
  if ($Ph$export$token.value === null) {
    return Promise.resolve(null);
  }

  return $nnkK$var$githubFetch($nnkK$var$githubRequest('user')).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return null;
  });
}

$nnkK$exports.loadUser = $nnkK$export$loadUser;

function $nnkK$export$createIssue(issueTerm, documentUrl, title, description, label) {
  var url = $BYTq$export$UTTERANCES_API + "/repos/" + $nnkK$var$owner + "/" + $nnkK$var$repo + "/issues" + (label ? "?label=" + encodeURIComponent(label) : '');
  var request = new Request(url, {
    method: 'POST',
    body: JSON.stringify({
      title: issueTerm,
      body: "# " + title + "\n\n" + description + "\n\n[" + documentUrl + "](" + documentUrl + ")"
    })
  });
  request.headers.set('Accept', $nnkK$var$GITHUB_ENCODING__REACTIONS_PREVIEW);
  request.headers.set('Authorization', "token " + $Ph$export$token.value);
  return fetch(request).then(function (response) {
    if (!response.ok) {
      throw new Error('Error creating comments container issue');
    }

    return response.json();
  });
}

$nnkK$exports.createIssue = $nnkK$export$createIssue;

function $nnkK$export$postComment(issueNumber, markdown) {
  var url = "repos/" + $nnkK$var$owner + "/" + $nnkK$var$repo + "/issues/" + issueNumber + "/comments";
  var body = JSON.stringify({
    body: markdown
  });
  var request = $nnkK$var$githubRequest(url, {
    method: 'POST',
    body: body
  });
  var accept = $nnkK$var$GITHUB_ENCODING__HTML_JSON + "," + $nnkK$var$GITHUB_ENCODING__REACTIONS_PREVIEW;
  request.headers.set('Accept', accept);
  return $nnkK$var$githubFetch(request).then(function (response) {
    if (!response.ok) {
      throw new Error('Error posting comment.');
    }

    return response.json();
  });
}

$nnkK$exports.postComment = $nnkK$export$postComment;

function $nnkK$export$toggleReaction(url, content) {
  return $nnkK$var$__awaiter(this, void 0, void 0, function () {
    var body, postRequest, response, reaction, _a, deleteRequest;

    return $nnkK$var$__generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          url = url.replace($nnkK$var$GITHUB_API, '');
          body = JSON.stringify({
            content: content
          });
          postRequest = $nnkK$var$githubRequest(url, {
            method: 'POST',
            body: body
          });
          postRequest.headers.set('Accept', $nnkK$var$GITHUB_ENCODING__REACTIONS_PREVIEW);
          return [4, $nnkK$var$githubFetch(postRequest)];

        case 1:
          response = _b.sent();
          if (!response.ok) return [3, 3];
          return [4, response.json()];

        case 2:
          _a = _b.sent();
          return [3, 4];

        case 3:
          _a = null;
          _b.label = 4;

        case 4:
          reaction = _a;

          if (response.status === 201) {
            return [2, {
              reaction: reaction,
              deleted: false
            }];
          }

          if (response.status !== 200) {
            throw new Error('expected "201 reaction created" or "200 reaction already exists"');
          }

          deleteRequest = $nnkK$var$githubRequest("reactions/" + reaction.id, {
            method: 'DELETE'
          });
          deleteRequest.headers.set('Accept', $nnkK$var$GITHUB_ENCODING__REACTIONS_PREVIEW);
          return [4, $nnkK$var$githubFetch(deleteRequest)];

        case 5:
          _b.sent();

          return [2, {
            reaction: reaction,
            deleted: true
          }];
      }
    });
  });
}

$nnkK$exports.toggleReaction = $nnkK$export$toggleReaction;

function $nnkK$export$renderMarkdown(text) {
  var body = JSON.stringify({
    text: text,
    mode: 'gfm',
    context: $nnkK$var$owner + "/" + $nnkK$var$repo
  });
  return $nnkK$var$githubFetch($nnkK$var$githubRequest('markdown', {
    method: 'POST',
    body: body
  })).then(function (response) {
    return response.text();
  });
}

$nnkK$exports.renderMarkdown = $nnkK$export$renderMarkdown;
var $NLUH$var$thresholds = [1000, 'second', 1000 * 60, 'minute', 1000 * 60 * 60, 'hour', 1000 * 60 * 60 * 24, 'day', 1000 * 60 * 60 * 24 * 7, 'week', 1000 * 60 * 60 * 24 * 27, 'month'];
var $NLUH$var$formatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
};

function $NLUH$export$timeAgo(current, value) {
  var elapsed = current - value.getTime();

  if (elapsed < 5000) {
    return 'just now';
  }

  var i = 0;

  while (i + 2 < $NLUH$var$thresholds.length && elapsed * 1.1 > $NLUH$var$thresholds[i + 2]) {
    i += 2;
  }

  var divisor = $NLUH$var$thresholds[i];
  var text = $NLUH$var$thresholds[i + 1];
  var units = Math.round(elapsed / divisor);

  if (units > 3 && i === $NLUH$var$thresholds.length - 2) {
    return "on " + value.toLocaleDateString(undefined, $NLUH$var$formatOptions);
  }

  return units === 1 ? (text === 'hour' ? 'an' : 'a') + " " + text + " ago" : units + " " + text + "s ago";
}

var $ewBM$var$hostOrigin;

function $ewBM$export$startMeasuring(origin) {
  $ewBM$var$hostOrigin = origin;
  addEventListener('resize', $ewBM$export$scheduleMeasure);
  addEventListener('load', $ewBM$export$scheduleMeasure);
}

var $ewBM$var$lastHeight = -1;

function $ewBM$var$measure() {
  var height = document.body.scrollHeight;

  if (height === $ewBM$var$lastHeight) {
    return;
  }

  $ewBM$var$lastHeight = height;
  var message = {
    type: 'resize',
    height: height
  };
  parent.postMessage(message, $ewBM$var$hostOrigin);
}

var $ewBM$var$lastMeasure = 0;

function $ewBM$export$scheduleMeasure() {
  var now = Date.now();

  if (now - $ewBM$var$lastMeasure > 50) {
    $ewBM$var$lastMeasure = now;
    setTimeout($ewBM$var$measure, 50);
  }
}

// ASSET: reactions.ts
var $IfRf$exports = {};

var $IfRf$var$__awaiter = $IfRf$exports && $IfRf$exports.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var $IfRf$var$__generator = $IfRf$exports && $IfRf$exports.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var $IfRf$export$reactionNames = {
  '+1': 'Thumbs Up',
  '-1': 'Thumbs Down',
  'laugh': 'Laugh',
  'hooray': 'Hooray',
  'confused': 'Confused',
  'heart': 'Heart',
  'rocket': 'Rocket',
  'eyes': 'Eyes'
};
$IfRf$exports.reactionNames = $IfRf$export$reactionNames;
var $IfRf$export$reactionEmoji = {
  '+1': '👍',
  '-1': '👎',
  'laugh': '️😂',
  'hooray': '️🎉',
  'confused': '😕',
  'heart': '❤️',
  'rocket': '🚀',
  'eyes': '👀'
};
$IfRf$exports.reactionEmoji = $IfRf$export$reactionEmoji;

function $IfRf$export$getReactionHtml(url, reaction, disabled, count) {
  return "\n  <button\n    reaction\n    type=\"submit\"\n    action=\"javascript:\"\n    formaction=\"" + url + "\"\n    class=\"btn BtnGroup-item btn-outline reaction-button\"\n    value=\"" + reaction + "\"\n    aria-label=\"Toggle " + $IfRf$export$reactionNames[reaction] + " reaction\"\n    reaction-count=\"" + count + "\"\n    " + (disabled ? 'disabled' : '') + ">\n    " + $IfRf$export$reactionEmoji[reaction] + "\n  </button>";
}

$IfRf$exports.getReactionHtml = $IfRf$export$getReactionHtml;

function $IfRf$export$enableReactions(authenticated) {
  var _this = this;

  var submitReaction = function submitReaction(event) {
    return $IfRf$var$__awaiter(_this, void 0, void 0, function () {
      var button, parentMenu, url, id, deleted, selector, elements, delta, _i, elements_1, element;

      return $IfRf$var$__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            button = event.target instanceof HTMLElement && event.target.closest('button');

            if (!button) {
              return [2];
            }

            if (!button.hasAttribute('reaction')) {
              return [2];
            }

            event.preventDefault();

            if (!authenticated) {
              return [2];
            }

            button.disabled = true;
            parentMenu = button.closest('details');

            if (parentMenu) {
              parentMenu.open = false;
            }

            url = button.formAction;
            id = button.value;
            return [4, $nnkK$export$toggleReaction(url, id)];

          case 1:
            deleted = _a.sent().deleted;
            selector = "button[reaction][formaction=\"" + url + "\"][value=\"" + id + "\"],[reaction-count][reaction-url=\"" + url + "\"]";
            elements = Array.from(document.querySelectorAll(selector));
            delta = deleted ? -1 : 1;

            for (_i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
              element = elements_1[_i];
              element.setAttribute('reaction-count', (parseInt(element.getAttribute('reaction-count'), 10) + delta).toString());
            }

            button.disabled = false;
            $ewBM$export$scheduleMeasure();
            return [2];
        }
      });
    });
  };

  addEventListener('click', submitReaction, true);
}

$IfRf$exports.enableReactions = $IfRf$export$enableReactions;

function $IfRf$export$getReactionsMenuHtml(url, align) {
  var position = align === 'center' ? 'left: 50%;transform: translateX(-50%)' : 'right:6px';
  var alignmentClass = align === 'center' ? '' : 'Popover-message--top-right';

  var getButtonAndSpan = function getButtonAndSpan(id) {
    return $IfRf$export$getReactionHtml(url, id, false, 0) + ("<span class=\"reaction-name\" aria-hidden=\"true\">" + $IfRf$export$reactionNames[id] + "</span>");
  };

  return "\n  <details class=\"details-overlay details-popover reactions-popover\">\n    <summary " + (align === 'center' ? 'tabindex="-1"' : '') + ">" + $IfRf$var$addReactionSvgs + "</summary>\n    <div class=\"Popover\" style=\"" + position + "\">\n      <form class=\"Popover-message " + alignmentClass + " box-shadow-large\" action=\"javascript:\">\n        <span class=\"reaction-name\">Pick your reaction</span>\n        <div class=\"BtnGroup\">\n          " + $nnkK$export$reactionTypes.slice(0, 4).map(getButtonAndSpan).join('') + "\n        </div>\n        <div class=\"BtnGroup\">\n          " + $nnkK$export$reactionTypes.slice(4).map(getButtonAndSpan).join('') + "\n        </div>\n      </form>\n    </div>\n  </details>";
}

$IfRf$exports.getReactionsMenuHtml = $IfRf$export$getReactionsMenuHtml;

function $IfRf$export$getSignInToReactMenuHtml(align) {
  var position = align === 'center' ? 'left: 50%;transform: translateX(-50%)' : 'right:6px';
  var alignmentClass = align === 'center' ? '' : 'Popover-message--top-right';
  return "\n  <details class=\"details-overlay details-popover reactions-popover\">\n    <summary aria-label=\"Reactions Menu\">" + $IfRf$var$addReactionSvgs + "</summary>\n    <div class=\"Popover\" style=\"" + position + "\">\n      <div class=\"Popover-message " + alignmentClass + " box-shadow-large\" style=\"padding: 16px\">\n        <span><a href=\"" + $Ph$export$getLoginUrl($iUt$export$pageAttributes.url) + "\" target=\"_top\">Sign in</a> to add your reaction.</span>\n      </div>\n    </div>\n  </details>";
}

$IfRf$exports.getSignInToReactMenuHtml = $IfRf$export$getSignInToReactMenuHtml;
var $IfRf$var$addReactionSvgs = "<svg class=\"octicon\" style=\"margin-right:3px\" viewBox=\"0 0 7 16\" version=\"1.1\" width=\"7\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M4 4H3v3H0v1h3v3h1V8h3V7H4V4z\"></path></svg><svg class=\"octicon\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z\"></path></svg>";
var $G14J$var$avatarArgs = '?v=3&s=88';
var $G14J$var$displayAssociations = {
  COLLABORATOR: 'Collaborator',
  CONTRIBUTOR: 'Contributor',
  MEMBER: 'Member',
  OWNER: 'Owner',
  FIRST_TIME_CONTRIBUTOR: 'First time contributor',
  FIRST_TIMER: 'First timer',
  NONE: ''
};

var $G14J$export$CommentComponent = function () {
  function CommentComponent(comment, currentUser) {
    this.comment = comment;
    this.currentUser = currentUser;
    var user = comment.user,
        html_url = comment.html_url,
        created_at = comment.created_at,
        body_html = comment.body_html,
        author_association = comment.author_association,
        reactions = comment.reactions;
    this.element = document.createElement('article');
    this.element.classList.add('timeline-comment');

    if (user.login === currentUser) {
      this.element.classList.add('current-user');
    }

    var association = $G14J$var$displayAssociations[author_association];
    var reactionCount = $nnkK$export$reactionTypes.reduce(function (sum, id) {
      return sum + reactions[id];
    }, 0);
    this.element.innerHTML = "\n      <a class=\"avatar\" href=\"" + user.html_url + "\" target=\"_blank\" tabindex=\"-1\">\n        <img alt=\"@" + user.login + "\" height=\"44\" width=\"44\"\n              src=\"" + user.avatar_url + $G14J$var$avatarArgs + "\">\n      </a>\n      <div class=\"comment\">\n        <header class=\"comment-header\">\n          <span class=\"comment-meta\">\n            <a class=\"text-link\" href=\"" + user.html_url + "\" target=\"_blank\"><strong>" + user.login + "</strong></a>\n            commented\n            <a class=\"text-link\" href=\"" + html_url + "\" target=\"_blank\">" + $NLUH$export$timeAgo(Date.now(), new Date(created_at)) + "</a>\n          </span>\n          <div class=\"comment-actions\">\n            " + (association ? "<span class=\"author-association-badge\">" + association + "</span>" : '') + "\n            " + (currentUser ? $IfRf$export$getReactionsMenuHtml(comment.reactions.url, 'right') : $IfRf$export$getSignInToReactMenuHtml('right')) + "\n          </div>\n        </header>\n        <div class=\"markdown-body markdown-body-scrollable\">\n          " + body_html + "\n        </div>\n        <div class=\"comment-footer\" reaction-count=\"" + reactionCount + "\" reaction-url=\"" + reactions.url + "\">\n          <form class=\"reaction-list BtnGroup\" action=\"javascript:\">\n            " + $nnkK$export$reactionTypes.map(function (id) {
      return $IfRf$export$getReactionHtml(reactions.url, id, !currentUser, reactions[id]);
    }).join('') + "\n          </form>\n          " + (currentUser ? $IfRf$export$getReactionsMenuHtml(comment.reactions.url, 'center') : $IfRf$export$getSignInToReactMenuHtml('center')) + "\n        </div>\n      </div>";
    var markdownBody = this.element.querySelector('.markdown-body');
    var emailToggle = markdownBody.querySelector('.email-hidden-toggle a');

    if (emailToggle) {
      var emailReply_1 = markdownBody.querySelector('.email-hidden-reply');

      emailToggle.onclick = function (event) {
        event.preventDefault();
        emailReply_1.classList.toggle('expanded');
      };
    }

    $G14J$export$processRenderedMarkdown(markdownBody);
  }

  CommentComponent.prototype.setCurrentUser = function (currentUser) {
    if (this.currentUser === currentUser) {
      return;
    }

    this.currentUser = currentUser;

    if (this.comment.user.login === this.currentUser) {
      this.element.classList.add('current-user');
    } else {
      this.element.classList.remove('current-user');
    }
  };

  return CommentComponent;
}();

function $G14J$export$processRenderedMarkdown(markdownBody) {
  Array.from(markdownBody.querySelectorAll(':not(.email-hidden-toggle) > a')).forEach(function (a) {
    a.target = '_top';
    a.rel = 'noopener noreferrer';
  });
  Array.from(markdownBody.querySelectorAll('img')).forEach(function (img) {
    return img.onload = $ewBM$export$scheduleMeasure;
  });
  Array.from(markdownBody.querySelectorAll('a.commit-tease-sha')).forEach(function (a) {
    return a.href = 'https://github.com' + a.pathname;
  });
}

var $vj8$export$TimelineComponent = function () {
  function TimelineComponent(user, issue) {
    this.user = user;
    this.issue = issue;
    this.timeline = [];
    this.count = 0;
    this.element = document.createElement('main');
    this.element.classList.add('timeline');
    this.element.innerHTML = "\n      <h1 class=\"timeline-header\">\n        <a class=\"text-link\" target=\"_blank\"></a>\n        <em>\n          - powered by\n          <a class=\"text-link\" href=\"https://utteranc.es\" target=\"_blank\">utteranc.es</a>\n        </em>\n      </h1>";
    this.countAnchor = this.element.firstElementChild.firstElementChild;
    this.marker = document.createComment('marker');
    this.element.appendChild(this.marker);
    this.setIssue(this.issue);
    this.renderCount();
  }

  TimelineComponent.prototype.setUser = function (user) {
    this.user = user;
    var login = user ? user.login : null;

    for (var i = 0; i < this.timeline.length; i++) {
      this.timeline[i].setCurrentUser(login);
    }

    $ewBM$export$scheduleMeasure();
  };

  TimelineComponent.prototype.setIssue = function (issue) {
    this.issue = issue;

    if (issue) {
      this.count = issue.comments;
      this.countAnchor.href = issue.html_url;
      this.renderCount();
    } else {
      this.countAnchor.removeAttribute('href');
    }
  };

  TimelineComponent.prototype.insertComment = function (comment, incrementCount) {
    var component = new $G14J$export$CommentComponent(comment, this.user ? this.user.login : null);
    var index = this.timeline.findIndex(function (x) {
      return x.comment.id >= comment.id;
    });

    if (index === -1) {
      this.timeline.push(component);
      this.element.insertBefore(component.element, this.marker);
    } else {
      var next = this.timeline[index];
      var remove = next.comment.id === comment.id;
      this.element.insertBefore(component.element, next.element);
      this.timeline.splice(index, remove ? 1 : 0, component);

      if (remove) {
        next.element.remove();
      }
    }

    if (incrementCount) {
      this.count++;
      this.renderCount();
    }

    $ewBM$export$scheduleMeasure();
  };

  TimelineComponent.prototype.insertPageLoader = function (insertAfter, count, callback) {
    var insertAfterElement = this.timeline.find(function (x) {
      return x.comment.id >= insertAfter.id;
    }).element;
    insertAfterElement.insertAdjacentHTML('afterend', "\n      <div class=\"page-loader\">\n        <div class=\"zigzag\"></div>\n        <button type=\"button\" class=\"btn btn-outline btn-large\">\n          " + count + " hidden items<br/>\n          <span>Load more...</span>\n        </button>\n      </div>\n    ");
    var element = insertAfterElement.nextElementSibling;
    var button = element.lastElementChild;
    var statusSpan = button.lastElementChild;
    button.onclick = callback;
    return {
      setBusy: function setBusy() {
        statusSpan.textContent = 'Loading...';
        button.disabled = true;
      },
      remove: function remove() {
        button.onclick = null;
        element.remove();
      }
    };
  };

  TimelineComponent.prototype.renderCount = function () {
    this.countAnchor.textContent = this.count + " Comment" + (this.count === 1 ? '' : 's');
  };

  return TimelineComponent;
}();

// ASSET: new-comment-component.ts
var $TxUM$exports = {};
var $MT2q$var$promise;

function $MT2q$export$getRepoConfig() {
  if (!$MT2q$var$promise) {
    $MT2q$var$promise = $nnkK$export$loadJsonFile('utterances.json').then(function (data) {
      if (!Array.isArray(data.origins)) {
        data.origins = [];
      }

      return data;
    }, function () {
      return {
        origins: [$iUt$export$pageAttributes.origin]
      };
    });
  }

  return $MT2q$var$promise;
}

var $TxUM$var$__assign = $TxUM$exports && $TxUM$exports.__assign || function () {
  $TxUM$var$__assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return $TxUM$var$__assign.apply(this, arguments);
};

var $TxUM$var$__awaiter = $TxUM$exports && $TxUM$exports.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var $TxUM$var$__generator = $TxUM$exports && $TxUM$exports.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var $TxUM$var$anonymousAvatar = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14 16\" version=\"1.1\"><path fill=\"rgb(179,179,179)\" fill-rule=\"evenodd\" d=\"M8 10.5L9 14H5l1-3.5L5.25 9h3.5L8 10.5zM10 6H4L2 7h10l-2-1zM9 2L7 3 5 2 4 5h6L9 2zm4.03 7.75L10 9l1 2-2 3h3.22c.45 0 .86-.31.97-.75l.56-2.28c.14-.53-.19-1.08-.72-1.22zM4 9l-3.03.75c-.53.14-.86.69-.72 1.22l.56 2.28c.11.44.52.75.97.75H5l-2-3 1-2z\"></path></svg>";
var $TxUM$var$anonymousAvatarUrl = "data:image/svg+xml;base64," + btoa($TxUM$var$anonymousAvatar);
var $TxUM$var$nothingToPreview = 'Nothing to preview';

var $TxUM$export$NewCommentComponent = function () {
  function NewCommentComponent(user, submit) {
    var _this = this;

    this.user = user;
    this.submit = submit;
    this.submitting = false;
    this.renderTimeout = 0;

    this.handleInput = function () {
      $MT2q$export$getRepoConfig();
      var text = _this.textarea.value;
      var isWhitespace = /^\s*$/.test(text);
      _this.submitButton.disabled = isWhitespace;

      if (_this.textarea.scrollHeight < 450 && _this.textarea.offsetHeight < _this.textarea.scrollHeight) {
        _this.textarea.style.height = _this.textarea.scrollHeight + "px";
        $ewBM$export$scheduleMeasure();
      }

      clearTimeout(_this.renderTimeout);

      if (isWhitespace) {
        _this.preview.textContent = $TxUM$var$nothingToPreview;
      } else {
        _this.preview.textContent = 'Loading preview...';
        _this.renderTimeout = setTimeout(function () {
          return $nnkK$export$renderMarkdown(text).then(function (html) {
            return _this.preview.innerHTML = html;
          }).then(function () {
            return $G14J$export$processRenderedMarkdown(_this.preview);
          }).then($ewBM$export$scheduleMeasure);
        }, 500);
      }
    };

    this.handleSubmit = function (event) {
      return $TxUM$var$__awaiter(_this, void 0, void 0, function () {
        return $TxUM$var$__generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              event.preventDefault();

              if (this.submitting) {
                return [2];
              }

              this.submitting = true;
              this.textarea.disabled = true;
              this.submitButton.disabled = true;
              return [4, this.submit(this.textarea.value).catch(function () {
                return 0;
              })];

            case 1:
              _a.sent();

              this.submitting = false;
              this.textarea.disabled = !this.user;
              this.textarea.value = '';
              this.submitButton.disabled = false;
              this.handleClick($TxUM$var$__assign($TxUM$var$__assign({}, event), {
                target: this.form.querySelector('.tabnav-tab.tab-write')
              }));
              this.preview.textContent = $TxUM$var$nothingToPreview;
              return [2];
          }
        });
      });
    };

    this.handleClick = function (_a) {
      var target = _a.target;

      if (!(target instanceof HTMLButtonElement) || !target.classList.contains('tabnav-tab')) {
        return;
      }

      if (target.getAttribute('aria-selected') === 'true') {
        return;
      }

      _this.form.querySelector('.tabnav-tab[aria-selected="true"]').setAttribute('aria-selected', 'false');

      target.setAttribute('aria-selected', 'true');
      var isPreview = target.classList.contains('tab-preview');
      _this.textarea.style.display = isPreview ? 'none' : '';
      _this.preview.style.display = isPreview ? '' : 'none';
      $ewBM$export$scheduleMeasure();
    };

    this.handleKeyDown = function (_a) {
      var which = _a.which,
          ctrlKey = _a.ctrlKey;

      if (which === 13 && ctrlKey && !_this.submitButton.disabled) {
        _this.form.dispatchEvent(new CustomEvent('submit'));
      }
    };

    this.element = document.createElement('article');
    this.element.classList.add('timeline-comment');
    this.element.innerHTML = "\n      <a class=\"avatar\" target=\"_blank\" tabindex=\"-1\">\n        <img height=\"44\" width=\"44\">\n      </a>\n      <form class=\"comment\" accept-charset=\"UTF-8\" action=\"javascript:\">\n        <header class=\"new-comment-header tabnav\">\n          <nav class=\"tabnav-tabs\" role=\"tablist\">\n            <button type=\"button\" class=\"tabnav-tab tab-write\"\n                    role=\"tab\" aria-selected=\"true\">\n              Write\n            </button>\n            <button type=\"button\" class=\"tabnav-tab tab-preview\"\n                    role=\"tab\">\n              Preview\n            </button>\n          </nav>\n        </header>\n        <div class=\"comment-body\">\n          <textarea class=\"form-control\" placeholder=\"Leave a comment\" aria-label=\"comment\"></textarea>\n          <div class=\"markdown-body\" style=\"display: none\">\n            " + $TxUM$var$nothingToPreview + "\n          </div>\n        </div>\n        <footer class=\"new-comment-footer\">\n          <a class=\"text-link markdown-info\" tabindex=\"-1\" target=\"_blank\"\n             href=\"https://guides.github.com/features/mastering-markdown/\">\n            <svg class=\"octicon v-align-bottom\" viewBox=\"0 0 16 16\" version=\"1.1\"\n              width=\"16\" height=\"16\" aria-hidden=\"true\">\n              <path fill-rule=\"evenodd\" d=\"M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15\n                13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4\n                8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z\">\n              </path>\n            </svg>\n            Styling with Markdown is supported\n          </a>\n          <button class=\"btn btn-primary\" type=\"submit\">Comment</button>\n          <a class=\"btn btn-primary\" href=\"" + $Ph$export$getLoginUrl($iUt$export$pageAttributes.url) + "\" target=\"_top\">Sign in to comment</a>\n        </footer>\n      </form>";
    this.avatarAnchor = this.element.firstElementChild;
    this.avatar = this.avatarAnchor.firstElementChild;
    this.form = this.avatarAnchor.nextElementSibling;
    this.textarea = this.form.firstElementChild.nextElementSibling.firstElementChild;
    this.preview = this.form.firstElementChild.nextElementSibling.lastElementChild;
    this.signInAnchor = this.form.lastElementChild.lastElementChild;
    this.submitButton = this.signInAnchor.previousElementSibling;
    this.setUser(user);
    this.submitButton.disabled = true;
    this.textarea.addEventListener('input', this.handleInput);
    this.form.addEventListener('submit', this.handleSubmit);
    this.form.addEventListener('click', this.handleClick);
    this.form.addEventListener('keydown', this.handleKeyDown);
    $TxUM$var$handleTextAreaResize(this.textarea);
  }

  NewCommentComponent.prototype.setUser = function (user) {
    this.user = user;
    this.submitButton.hidden = !user;
    this.signInAnchor.hidden = !!user;

    if (user) {
      this.avatarAnchor.href = user.html_url;
      this.avatar.alt = '@' + user.login;
      this.avatar.src = user.avatar_url + '?v=3&s=88';
      this.textarea.disabled = false;
      this.textarea.placeholder = 'Leave a comment';
    } else {
      this.avatarAnchor.removeAttribute('href');
      this.avatar.alt = '@anonymous';
      this.avatar.src = $TxUM$var$anonymousAvatarUrl;
      this.textarea.disabled = true;
      this.textarea.placeholder = 'Sign in to comment';
    }
  };

  NewCommentComponent.prototype.clear = function () {
    this.textarea.value = '';
  };

  return NewCommentComponent;
}();

$TxUM$exports.NewCommentComponent = $TxUM$export$NewCommentComponent;

function $TxUM$var$handleTextAreaResize(textarea) {
  var stopTracking = function stopTracking() {
    removeEventListener('mousemove', $ewBM$export$scheduleMeasure);
    removeEventListener('mouseup', stopTracking);
  };

  var track = function track() {
    addEventListener('mousemove', $ewBM$export$scheduleMeasure);
    addEventListener('mouseup', stopTracking);
  };

  textarea.addEventListener('mousedown', track);
}

function $Acz$export$loadTheme(theme, origin) {
  return new Promise(function (resolve) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('crossorigin', 'anonymous');
    link.onload = resolve;
    link.href = "/stylesheets/themes/" + theme + "/utterances.css";
    document.head.appendChild(link);
    addEventListener('message', function (event) {
      if (event.origin === origin && event.data.type === 'set-theme') {
        link.href = "/stylesheets/themes/" + event.data.theme + "/utterances.css";
      }
    });
  });
}

var $fHsu$var$__awaiter = $fHsu$exports && $fHsu$exports.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var $fHsu$var$__generator = $fHsu$exports && $fHsu$exports.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

$nnkK$export$setRepoContext($iUt$export$pageAttributes);

function $fHsu$var$loadIssue() {
  if ($iUt$export$pageAttributes.issueNumber !== null) {
    return $nnkK$export$loadIssueByNumber($iUt$export$pageAttributes.issueNumber);
  }

  return $nnkK$export$loadIssueByTerm($iUt$export$pageAttributes.issueTerm);
}

function $fHsu$var$bootstrap() {
  return $fHsu$var$__awaiter(this, void 0, void 0, function () {
    var _a, issue, user, timeline, submit, newCommentComponent;

    var _this = this;

    return $fHsu$var$__generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [4, $Ph$export$loadToken()];

        case 1:
          _b.sent();

          return [4, Promise.all([$fHsu$var$loadIssue(), $nnkK$export$loadUser(), $Acz$export$loadTheme($iUt$export$pageAttributes.theme, $iUt$export$pageAttributes.origin)])];

        case 2:
          _a = _b.sent(), issue = _a[0], user = _a[1];
          $ewBM$export$startMeasuring($iUt$export$pageAttributes.origin);
          timeline = new $vj8$export$TimelineComponent(user, issue);
          document.body.appendChild(timeline.element);

          if (issue && issue.comments > 0) {
            $fHsu$var$renderComments(issue, timeline);
          }

          $ewBM$export$scheduleMeasure();

          if (issue && issue.locked) {
            return [2];
          }

          $IfRf$export$enableReactions(!!user);

          submit = function submit(markdown) {
            return $fHsu$var$__awaiter(_this, void 0, void 0, function () {
              var comment;
              return $fHsu$var$__generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4, $fHsu$export$assertOrigin()];

                  case 1:
                    _a.sent();

                    if (!!issue) return [3, 3];
                    return [4, $nnkK$export$createIssue($iUt$export$pageAttributes.issueTerm, $iUt$export$pageAttributes.url, $iUt$export$pageAttributes.title, $iUt$export$pageAttributes.description, $iUt$export$pageAttributes.label)];

                  case 2:
                    issue = _a.sent();
                    timeline.setIssue(issue);
                    _a.label = 3;

                  case 3:
                    return [4, $nnkK$export$postComment(issue.number, markdown)];

                  case 4:
                    comment = _a.sent();
                    timeline.insertComment(comment, true);
                    newCommentComponent.clear();
                    return [2];
                }
              });
            });
          };

          newCommentComponent = new $TxUM$export$NewCommentComponent(user, submit);
          timeline.element.appendChild(newCommentComponent.element);
          return [2];
      }
    });
  });
}

$fHsu$var$bootstrap();
addEventListener('not-installed', function handleNotInstalled() {
  removeEventListener('not-installed', handleNotInstalled);
  document.querySelector('.timeline').insertAdjacentHTML('afterbegin', "\n  <div class=\"flash flash-error\">\n    Error: utterances is not installed on <code>" + $iUt$export$pageAttributes.owner + "/" + $iUt$export$pageAttributes.repo + "</code>.\n    If you own this repo,\n    <a href=\"https://github.com/apps/utterances\" target=\"_top\"><strong>install the app</strong></a>.\n    Read more about this change in\n    <a href=\"https://github.com/utterance/utterances/pull/25\" target=\"_top\">the PR</a>.\n  </div>");
  $ewBM$export$scheduleMeasure();
});

function $fHsu$var$renderComments(issue, timeline) {
  return $fHsu$var$__awaiter(this, void 0, void 0, function () {
    var renderPage, pageCount, pageLoads, pages, _i, pages_1, page_1, hiddenPageCount, nextHiddenPage, _renderLoader;

    var _this = this;

    return $fHsu$var$__generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          renderPage = function renderPage(page) {
            for (var _i = 0, page_2 = page; _i < page_2.length; _i++) {
              var comment = page_2[_i];
              timeline.insertComment(comment, false);
            }
          };

          pageCount = Math.ceil(issue.comments / $nnkK$export$PAGE_SIZE);
          pageLoads = [$nnkK$export$loadCommentsPage(issue.number, 1)];

          if (pageCount > 1) {
            pageLoads.push($nnkK$export$loadCommentsPage(issue.number, pageCount));
          }

          if (pageCount > 2 && issue.comments % $nnkK$export$PAGE_SIZE < 3) {
            pageLoads.push($nnkK$export$loadCommentsPage(issue.number, pageCount - 1));
          }

          return [4, Promise.all(pageLoads)];

        case 1:
          pages = _a.sent();

          for (_i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            page_1 = pages_1[_i];
            renderPage(page_1);
          }

          hiddenPageCount = pageCount - pageLoads.length;
          nextHiddenPage = 2;

          _renderLoader = function renderLoader(afterPage) {
            if (hiddenPageCount === 0) {
              return;
            }

            var load = function load() {
              return $fHsu$var$__awaiter(_this, void 0, void 0, function () {
                var page;
                return $fHsu$var$__generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      loader.setBusy();
                      return [4, $nnkK$export$loadCommentsPage(issue.number, nextHiddenPage)];

                    case 1:
                      page = _a.sent();
                      loader.remove();
                      renderPage(page);
                      hiddenPageCount--;
                      nextHiddenPage++;

                      _renderLoader(page);

                      return [2];
                  }
                });
              });
            };

            var afterComment = afterPage.pop();
            var loader = timeline.insertPageLoader(afterComment, hiddenPageCount * $nnkK$export$PAGE_SIZE, load);
          };

          _renderLoader(pages[0]);

          return [2];
      }
    });
  });
}

function $fHsu$export$assertOrigin() {
  return $fHsu$var$__awaiter(this, void 0, void 0, function () {
    var origins, origin, owner, repo;
    return $fHsu$var$__generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4, $MT2q$export$getRepoConfig()];

        case 1:
          origins = _a.sent().origins;
          origin = $iUt$export$pageAttributes.origin, owner = $iUt$export$pageAttributes.owner, repo = $iUt$export$pageAttributes.repo;

          if (origins.indexOf(origin) !== -1) {
            return [2];
          }

          document.querySelector('.timeline').lastElementChild.insertAdjacentHTML('beforebegin', "\n  <div class=\"flash flash-error flash-not-installed\">\n    Error: <code>" + origin + "</code> is not permitted to post to <code>" + owner + "/" + repo + "</code>.\n    Confirm this is the correct repo for this site's comments. If you own this repo,\n    <a href=\"https://github.com/" + owner + "/" + repo + "/edit/master/utterances.json\" target=\"_top\">\n      <strong>update the utterances.json</strong>\n    </a>\n    to include <code>" + origin + "</code> in the list of origins.<br/><br/>\n    Suggested configuration:<br/>\n    <pre><code>" + JSON.stringify({
            origins: [origin]
          }, null, 2) + "</code></pre>\n  </div>");
          $ewBM$export$scheduleMeasure();
          throw new Error('Origin not permitted.');
      }
    });
  });
}

$fHsu$exports.assertOrigin = $fHsu$export$assertOrigin;

if (typeof exports === "object" && typeof module !== "undefined") {
  // CommonJS
  module.exports = $fHsu$exports;
} else if (typeof define === "function" && define.amd) {
  // RequireJS
  define(function () {
    return $fHsu$exports;
  });
}

$ieWq$exports.__esModule = true;
$fHsu$exports.__esModule = true;
return {
  "ieWq": $ieWq$exports,
  "fHsu": $fHsu$exports
};
});