(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = /* @__PURE__ */ Symbol.for("react.element");
      var n = /* @__PURE__ */ Symbol.for("react.portal");
      var p = /* @__PURE__ */ Symbol.for("react.fragment");
      var q = /* @__PURE__ */ Symbol.for("react.strict_mode");
      var r = /* @__PURE__ */ Symbol.for("react.profiler");
      var t2 = /* @__PURE__ */ Symbol.for("react.provider");
      var u = /* @__PURE__ */ Symbol.for("react.context");
      var v = /* @__PURE__ */ Symbol.for("react.forward_ref");
      var w = /* @__PURE__ */ Symbol.for("react.suspense");
      var x = /* @__PURE__ */ Symbol.for("react.memo");
      var y = /* @__PURE__ */ Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t2, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r = [];
      var t2 = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t2); null !== b; ) {
          if (null === b.callback) k(t2);
          else if (b.startTime <= a) k(t2), b.sortIndex = b.expirationTime, f(r, b);
          else break;
          b = h(t2);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r)) A = true, I(J);
        else {
          var b = h(t2);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b);
            } else k(r);
            v = h(r);
          }
          if (null !== v) var w = true;
          else {
            var m = h(t2);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t2, a), null === h(r) && a === h(t2) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++) da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a)) return true;
        if (ja.call(la, a)) return false;
        if (ka.test(a)) return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = /* @__PURE__ */ Symbol.for("react.element");
      var wa = /* @__PURE__ */ Symbol.for("react.portal");
      var ya = /* @__PURE__ */ Symbol.for("react.fragment");
      var za = /* @__PURE__ */ Symbol.for("react.strict_mode");
      var Aa = /* @__PURE__ */ Symbol.for("react.profiler");
      var Ba = /* @__PURE__ */ Symbol.for("react.provider");
      var Ca = /* @__PURE__ */ Symbol.for("react.context");
      var Da = /* @__PURE__ */ Symbol.for("react.forward_ref");
      var Ea = /* @__PURE__ */ Symbol.for("react.suspense");
      var Fa = /* @__PURE__ */ Symbol.for("react.suspense_list");
      var Ga = /* @__PURE__ */ Symbol.for("react.memo");
      var Ha = /* @__PURE__ */ Symbol.for("react.lazy");
      var Ia = /* @__PURE__ */ Symbol.for("react.offscreen");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na) return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b) return b.displayName || b.name || null;
            if ("string" === typeof b) return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length) throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = (function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      })(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib) return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a) throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b) throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return Xb(e), a;
              if (f === d) return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(p(189));
            }
          }
          if (c.alternate !== d) throw Error(p(190));
        }
        if (3 !== c.tag) throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag) return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b) return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d) return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
          } else k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e) hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d)) d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e) break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a) if (b = Vb(a), null === b) a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a) return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e])) return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a]) return Xe[a];
        if (!We[a]) return a;
        var b = We[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
          }
        }
        if (Qb) throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t2 = 0 !== (b & 4), J = !t2 && "scroll" === a, x = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
              t2 = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t2.push(tf(w, F, u))));
                if (J) break;
                w = w.return;
              }
              0 < t2.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t2 }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                } else k2 = null, n = d2;
                if (k2 !== n) {
                  t2 = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a) t2 = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t2(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t2 = new t2(x, w + "enter", n, c, e2), t2.target = u, t2.relatedTarget = J, F = t2);
                  J = F;
                  if (k2 && n) b: {
                    t2 = k2;
                    x = n;
                    w = 0;
                    for (u = t2; u; u = vf(u)) w++;
                    u = 0;
                    for (F = x; F; F = vf(F)) u++;
                    for (; 0 < w - u; ) t2 = vf(t2), w--;
                    for (; 0 < u - w; ) x = vf(x), u--;
                    for (; w--; ) {
                      if (t2 === x || null !== x && t2 === x.alternate) break b;
                      t2 = vf(t2);
                      x = vf(x);
                    }
                    t2 = null;
                  }
                  else t2 = null;
                  null !== k2 && wf(g2, h2, k2, t2, false);
                  null !== n && null !== J && wf(g2, J, n, t2, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
              else if (me(h2)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c) throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b) break;
            if ("/$" === b) return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
              if (c = a[Of]) return c;
              a = Mf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf) throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a)) throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a)) throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg) return false;
        if (!I) return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a)) throw Hg(), Error(p(418));
          for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; ) a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a) throw Error(p(284));
          if (!c._owner) throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t2(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2) throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(p(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t3 = r(e2, m2, n2.value, k2);
            if (null === t3) {
              null === m2 && (m2 = x);
              break;
            }
            a && m2 && null === t3.alternate && b(e2, m2);
            g2 = f(t3, g2, w);
            null === u ? l2 = t3 : u.sibling = t3;
            u = t3;
            m2 = x;
          }
          if (n2.done) return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m2.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                    else b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2)) return n(a2, d2, f2, h2);
            if (Ka(f2)) return t2(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c) break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
          if (null === Xg) throw Error(p(308));
          Yg = a;
          Xg.dependencies = { lanes: 0, firstContext: a };
        } else Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d) return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r = h.lane, y = h.eventTime;
            if ((d & r) === r) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t2 = h;
                r = b;
                y = c;
                switch (t2.tag) {
                  case 1:
                    n = t2.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t2.payload;
                    r = "function" === typeof n ? n.call(y, q, r) : n;
                    if (null === r || void 0 === r) break a;
                    q = A({}, q, r);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
            } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
            h = h.next;
            if (null === h) if (h = e.shared.pending, null === h) break;
            else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(p(191, e));
            e.call(d);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th) throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f) throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b) throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b) O = b, N = a;
        else {
          if (null === a) throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c) throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b) return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
          else return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(ej, fj);
          fj |= d;
        }
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else f = false;
        ch(b, e);
        if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
          jh = false;
          r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h) f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState) e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1)) return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d) var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag) vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            wj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Ch(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            wj(b, true, c, null, f);
            break;
          case "together":
            wj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes)) return null;
        if (null !== a && b.child !== a.child) throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d) return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d) break;
            else return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f) if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++) D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h) if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a) switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
                }
                f && (b.flags |= 4);
              } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f) throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f) throw Error(p(317));
                  f[Of] = b;
                } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else null !== zg && (Fj(zg), zg = null), f = true;
              if (!f) return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128)) return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f) return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g) if (d) Dj(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            }
            else {
              if (!d) if (a = Ch(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
              } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate) throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c) if ("function" === typeof c) try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
        else c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
          else a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
              b: for (; ; ) {
                for (var y; ; ) {
                  q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                  q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                  3 === q.nodeType && (g += q.nodeValue.length);
                  if (null === (y = q.firstChild)) break;
                  r = q;
                  q = y;
                }
                for (; ; ) {
                  if (q === a) break b;
                  r === c && ++l === e && (h = g);
                  r === f && ++m === d && (k = g);
                  if (null !== (y = q.nextSibling)) break;
                  q = r;
                  r = q.parentNode;
                }
                q = y;
              }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else c = null;
          }
          c = c || { start: 0, end: 0 };
        } else c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
        else for (; null !== V; ) {
          b = V;
          try {
            var n = b.alternate;
            if (0 !== (b.flags & 1024)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t2 = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
          } catch (F) {
            W(b, b.return, F);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a: for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Tj(a.return)) return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2) continue a;
            if (null === a.child || 4 === a.tag) continue a;
            else a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2)) return a.stateNode;
        }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X, e = Xj;
            X = null;
            Yj(a, b, c);
            X = d;
            Xj = e;
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
            break;
          case 4:
            d = X;
            e = Xj;
            X = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c) for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a: for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
            if (null === X) throw Error(p(160));
            Zj(f, g, e);
            X = null;
            Xj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
        if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t2) {
                W(a, a.return, t2);
              }
              try {
                Pj(5, a, a.return);
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k) try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode) throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
              bd(b.containerInfo);
            } catch (t2) {
              W(a, a.return, t2);
            }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
                for (q = V = m; null !== V; ) {
                  r = V;
                  y = r.child;
                  switch (r.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r, r.return);
                      break;
                    case 1:
                      Lj(r, r.return);
                      var n = r.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r;
                        c = r.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t2) {
                          W(d, c, t2);
                        }
                      }
                      break;
                    case 5:
                      Lj(r, r.return);
                      break;
                    case 22:
                      if (null !== r.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r, V = y) : gk(q);
                }
                m = m.sibling;
              }
              a: for (m = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t2) {
                      W(a, a.return, t2);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m) try {
                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                  } catch (t2) {
                    W(a, a.return, t2);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a) break a;
                  m === q && (m = null);
                  q = q.return;
                }
                m === q && (m = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772)) switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f = b.updateQueue;
                  null !== f && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child) switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m = l.memoizedState;
                      if (null !== m) {
                        var q = m.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
              U || b.flags & 512 && Rj(b);
            } catch (r) {
              W(b, b.return, r);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a) return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk) throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c) return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b) Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0)) break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d) break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e)) return false;
              } catch (g) {
                return false;
              }
            }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
          else {
            if (b === a) break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a) return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6)) throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1)) return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c) throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a) return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              zh();
              E(Wf);
              E(H);
              Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r = m.alternate;
                  r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t2 = /* @__PURE__ */ new Set();
                    t2.add(k);
                    b.updateQueue = t2;
                  } else n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T) T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b) uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y) throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi) throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk) var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q) q.return = m, V = q;
                        else for (; null !== V; ) {
                          m = V;
                          var r = m.sibling, y = m.return;
                          Sj(m);
                          if (m === l) {
                            V = null;
                            break;
                          }
                          if (null !== r) {
                            r.return = y;
                            V = r;
                            break;
                          }
                          V = y;
                        }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t2 = n.child;
                      if (null !== t2) {
                        n.child = null;
                        do {
                          var J = t2.sibling;
                          t2.sibling = null;
                          t2 = J;
                        } while (null !== t2);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
                else b: for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048)) switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f, f.return);
                  }
                  var x = f.sibling;
                  if (null !== x) {
                    x.return = f.return;
                    V = x;
                    break b;
                  }
                  V = f.return;
                }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
                else b: for (g = w; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048)) try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F = h.sibling;
                  if (null !== F) {
                    F.return = h.return;
                    V = F;
                    break b;
                  }
                  V = h.return;
                }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag) Xk(a, a, c);
        else for (; null !== b; ) {
          if (3 === b.tag) {
            Xk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
              a = Ji(c, a);
              a = Qi(b, a, 1);
              b = nh(b, a, 1);
              a = R();
              null !== b && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
          dh = 0 !== (a.flags & 131072) ? true : false;
        }
        else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a) throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f) if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l = f.updateQueue;
                        if (null !== l) {
                          l = l.shared;
                          var m = l.pending;
                          null === m ? k.next = k : (k.next = m.next, m.next = k);
                          l.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g) throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else g = f.child;
                if (null !== g) g.return = f;
                else for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
                f = g;
              }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a) return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da) return 11;
          if (a === Ga) return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) aj(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a) return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c)) return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b) throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; ) a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b)) throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a)) throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a)) throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a)) throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c)) throw Error(p(200));
        if (null == a || void 0 === a._reactInternals) throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f = require_react();
      var k = /* @__PURE__ */ Symbol.for("react.element");
      var l = /* @__PURE__ */ Symbol.for("react.fragment");
      var m = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p = { key: true, ref: true, __self: true, __source: true };
      function q(c, a, g) {
        var b, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a.key && (e = "" + a.key);
        void 0 !== a.ref && (h = a.ref);
        for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
        if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // src/main.jsx
  var import_react2 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // src/QualityPortal.jsx
  var import_react = __toESM(require_react());
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var FACTORIES = [1];
  var COLORS = {
    headDark: "#1F3D2E",
    headMid: "#2C5443",
    teal: "#0F6E56",
    tealBg: "#E1F5EE",
    page: "#F5F6F3",
    card: "#FFFFFF",
    border: "#E1DFD6",
    borderStrong: "#C7C4B8",
    textPrimary: "#1C1F1B",
    textSecondary: "#6B7168",
    textMuted: "#9C9A8F",
    success: "#0F6E56",
    successBg: "#E1F5EE",
    danger: "#A32D2D",
    dangerBg: "#FCEBEB",
    warning: "#854F0B",
    warningBg: "#FAEEDA",
    info: "#185FA5",
    infoBg: "#E6F1FB"
  };
  var STATUS_META = {
    \uCD9C\uADFC: { color: COLORS.success, bg: COLORS.successBg, icon: "\u25CF" },
    \uC5F0\uCC28: { color: COLORS.teal, bg: COLORS.tealBg, icon: "\u25C6" },
    \uBCD1\uAC00: { color: COLORS.warning, bg: COLORS.warningBg, icon: "\uFF0B" },
    \uBB34\uB2E8\uACB0\uADFC: { color: COLORS.danger, bg: COLORS.dangerBg, icon: "\u2715" },
    \uCD9C\uC0B0\uD734\uAC00: { color: COLORS.info, bg: COLORS.infoBg, icon: "\u25D0" }
  };
  var STATUS_OPTIONS = ["\uCD9C\uADFC", "\uC5F0\uCC28", "\uBCD1\uAC00", "\uBB34\uB2E8\uACB0\uADFC", "\uCD9C\uC0B0\uD734\uAC00"];
  var STATUS_LABEL = {
    ko: { \uCD9C\uADFC: "\uCD9C\uADFC", \uC5F0\uCC28: "\uC5F0\uCC28", \uBCD1\uAC00: "\uBCD1\uAC00", \uBB34\uB2E8\uACB0\uADFC: "\uBB34\uB2E8\uACB0\uADFC", \uCD9C\uC0B0\uD734\uAC00: "\uCD9C\uC0B0\uD734\uAC00" },
    vi: { \uCD9C\uADFC: "\u0110i l\xE0m", \uC5F0\uCC28: "Ngh\u1EC9 ph\xE9p n\u0103m", \uBCD1\uAC00: "Ngh\u1EC9 \u1ED1m", \uBB34\uB2E8\uACB0\uADFC: "V\u1EAFng kh\xF4ng ph\xE9p", \uCD9C\uC0B0\uD734\uAC00: "Ngh\u1EC9 thai s\u1EA3n" }
  };
  var trStatus = (status, lang) => STATUS_LABEL[lang] && STATUS_LABEL[lang][status] || status;
  var ABSENCE_ORDER = ["\uC5F0\uCC28", "\uBCD1\uAC00", "\uBB34\uB2E8\uACB0\uADFC", "\uCD9C\uC0B0\uD734\uAC00"];
  var DEPARTMENTS = ["\uD604\uC9C0\uCD1D\uAD04\uAD00\uB9AC\uC790", "QC", "IQC", "PQC UNIT", "PQC ASSY", "OQC", "RMA"];
  var DEPT_ORDER = ["\uBD80\uC11C\uC7A5", ...DEPARTMENTS];
  var POSITIONS = ["Inspector", "Staff", "Supervisor 1", "Supervisor 2", "Manager", "Upper Manager"];
  var MANAGER_POSITIONS = ["Supervisor 1", "Supervisor 2", "Manager"];
  var deptRank = (team) => {
    const idx = DEPT_ORDER.indexOf(team);
    return idx === -1 ? DEPT_ORDER.length : idx;
  };
  var positionRank = (position) => {
    const idx = POSITIONS.indexOf(position);
    return idx === -1 ? POSITIONS.indexOf("Inspector") : idx;
  };
  var sortByDeptAndPosition = (a, b) => {
    if (a.factory !== b.factory) return a.factory - b.factory;
    const da = deptRank(a.team);
    const db = deptRank(b.team);
    if (da !== db) return da - db;
    return positionRank(b.position) - positionRank(a.position);
  };
  var WEEKDAYS_KO = ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"];
  var WEEKDAYS_VI = ["Ch\u1EE7 Nh\u1EADt", "Th\u1EE9 Hai", "Th\u1EE9 Ba", "Th\u1EE9 T\u01B0", "Th\u1EE9 N\u0103m", "Th\u1EE9 S\xE1u", "Th\u1EE9 B\u1EA3y"];
  var todayStr = (lang) => {
    const d = /* @__PURE__ */ new Date();
    if (lang === "vi") {
      return `${WEEKDAYS_VI[d.getDay()]}, ng\xE0y ${d.getDate()} th\xE1ng ${d.getMonth() + 1} n\u0103m ${d.getFullYear()}`;
    }
    return `${d.getFullYear()}\uB144 ${d.getMonth() + 1}\uC6D4 ${d.getDate()}\uC77C (${WEEKDAYS_KO[d.getDay()]})`;
  };
  var DICT = {
    appTitle: { ko: "\uD488\uC9C8\uBD80\uC11C \uC778\uB825 \uD604\uD669 \uD3EC\uD138", vi: "C\u1ED5ng th\xF4ng tin nh\xE2n s\u1EF1 ph\xF2ng Ch\u1EA5t l\u01B0\u1EE3ng" },
    all: { ko: "\uC804\uCCB4", vi: "T\u1EA5t c\u1EA3" },
    factoryLabel: { ko: (n) => `${n}\uACF5\uC7A5`, vi: (n) => `Nh\xE0 m\xE1y ${n}` },
    tabDashboard: { ko: "\uB300\uC2DC\uBCF4\uB4DC", vi: "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n" },
    tabOrg: { ko: "\uC870\uC9C1\uB3C4", vi: "S\u01A1 \u0111\u1ED3 t\u1ED5 ch\u1EE9c" },
    tabList: { ko: "\uC804\uCCB4 \uBA85\uB2E8", vi: "Danh s\xE1ch nh\xE2n vi\xEAn" },
    personSuffix: { ko: "\uBA85", vi: " ng\u01B0\u1EDDi" },
    detailStatus: { ko: "\uC138\uBD80 \uD604\uD669", vi: "Chi ti\u1EBFt hi\u1EC7n tr\u1EA1ng" },
    allNormal: { ko: "\uC624\uB298\uC740 \uC804\uC6D0 \uC815\uC0C1 \uCD9C\uADFC\uD588\uC2B5\uB2C8\uB2E4.", vi: "H\xF4m nay t\u1EA5t c\u1EA3 \u0111\u1EC1u \u0111i l\xE0m b\xECnh th\u01B0\u1EDDng." },
    reasonPrefix: { ko: "\uC0AC\uC720", vi: "L\xFD do" },
    returnDatePrefix: { ko: "\uBCF5\uADC0\uC608\uC815\uC77C", vi: "Ng\xE0y d\u1EF1 ki\u1EBFn tr\u1EDF l\u1EA1i" },
    orgChartTitle: { ko: (f) => `${f}\uACF5\uC7A5 \uD488\uC9C8\uD300 \uC870\uC9C1\uB3C4`, vi: (f) => `S\u01A1 \u0111\u1ED3 t\u1ED5 ch\u1EE9c - Nh\xE0 m\xE1y ${f}` },
    edit: { ko: "\uC218\uC815", vi: "Ch\u1EC9nh s\u1EEDa" },
    editDone: { ko: "\uC218\uC815 \uC644\uB8CC", vi: "Ho\xE0n t\u1EA5t" },
    editDoneDisabledTitle: { ko: "\uC800\uC7A5 \uB610\uB294 \uCDE8\uC18C \uD6C4 \uC644\uB8CC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4", vi: "H\xE3y l\u01B0u ho\u1EB7c h\u1EE7y tr\u01B0\u1EDBc khi ho\xE0n t\u1EA5t" },
    addHead: { ko: "\uBD80\uC11C\uC7A5 \uCD94\uAC00", vi: "Th\xEAm tr\u01B0\u1EDFng ph\xF2ng" },
    headClickDragTitle: { ko: "\uD074\uB9AD\uD558\uC5EC \uC218\uC815 \xB7 \uB4DC\uB798\uADF8\uD558\uC5EC \uC21C\uC11C \uBCC0\uACBD", vi: "Nh\u1EA5n \u0111\u1EC3 s\u1EEDa \xB7 K\xE9o \u0111\u1EC3 \u0111\u1ED5i th\u1EE9 t\u1EF1" },
    headDragTitle: { ko: "\uB4DC\uB798\uADF8\uD558\uC5EC \uC21C\uC11C \uBCC0\uACBD", vi: "K\xE9o \u0111\u1EC3 \u0111\u1ED5i th\u1EE9 t\u1EF1" },
    deleteHeadTitle: { ko: "\uBD80\uC11C\uC7A5 \uC0AD\uC81C", vi: "X\xF3a tr\u01B0\u1EDFng ph\xF2ng" },
    confirmDeleteHead: { ko: (name) => `"${name}" \uBD80\uC11C\uC7A5\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?`, vi: (name) => `X\xF3a tr\u01B0\u1EDFng ph\xF2ng "${name}"?` },
    confirmDeleteTeam: {
      ko: (title) => `"${title}" \uD300\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC18C\uC18D \uD300\uC6D0\uB3C4 \uD568\uAED8 \uC0AD\uC81C\uB429\uB2C8\uB2E4.`,
      vi: (title) => `X\xF3a nh\xF3m "${title}"? T\u1EA5t c\u1EA3 th\xE0nh vi\xEAn trong nh\xF3m c\u0169ng s\u1EBD b\u1ECB x\xF3a.`
    },
    confirmDeleteMember: { ko: "\uC774 \uD300\uC6D0\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?", vi: "X\xF3a th\xE0nh vi\xEAn n\xE0y?" },
    deleteAll: { ko: "\uC804\uCCB4 \uC0AD\uC81C", vi: "X\xF3a t\u1EA5t c\u1EA3" },
    confirmDeleteAll: {
      ko: "\uC804\uCCB4 \uBA85\uB2E8(\uBD80\uC11C\uC7A5\uACFC \uBAA8\uB4E0 \uD300\uC6D0)\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774 \uC791\uC5C5\uC740 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
      vi: "X\xF3a to\xE0n b\u1ED9 danh s\xE1ch (tr\u01B0\u1EDFng ph\xF2ng v\xE0 t\u1EA5t c\u1EA3 th\xE0nh vi\xEAn)? H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c."
    },
    exportData: { ko: "\uB0B4\uBCF4\uB0B4\uAE30", vi: "Xu\u1EA5t d\u1EEF li\u1EC7u" },
    importData: { ko: "\uBD88\uB7EC\uC624\uAE30", vi: "Nh\u1EADp d\u1EEF li\u1EC7u" },
    confirmImportData: {
      ko: "\uD30C\uC77C\uC744 \uBD88\uB7EC\uC624\uBA74 \uD604\uC7AC \uC774 \uCEF4\uD4E8\uD130\uC5D0 \uC800\uC7A5\uB41C \uBAA8\uB4E0 \uB370\uC774\uD130\uAC00 \uD30C\uC77C \uB0B4\uC6A9\uC73C\uB85C \uBC14\uB01D\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?",
      vi: "Nh\u1EADp t\u1EC7p s\u1EBD thay th\u1EBF to\xE0n b\u1ED9 d\u1EEF li\u1EC7u hi\u1EC7n \u0111ang l\u01B0u tr\xEAn m\xE1y n\xE0y. Ti\u1EBFp t\u1EE5c?"
    },
    importInvalidFile: { ko: "\uC62C\uBC14\uB978 \uB370\uC774\uD130 \uD30C\uC77C\uC774 \uC544\uB2D9\uB2C8\uB2E4.", vi: "T\u1EC7p d\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7." },
    importSuccess: { ko: "\uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC654\uC2B5\uB2C8\uB2E4.", vi: "\u0110\xE3 nh\u1EADp d\u1EEF li\u1EC7u th\xE0nh c\xF4ng." },
    deleteSelected: { ko: (n) => `\uC120\uD0DD \uC0AD\uC81C (${n})`, vi: (n) => `X\xF3a m\u1EE5c \u0111\xE3 ch\u1ECDn (${n})` },
    confirmDeleteSelected: {
      ko: (n) => `\uC120\uD0DD\uD55C ${n}\uBA85\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?`,
      vi: (n) => `X\xF3a ${n} ng\u01B0\u1EDDi \u0111\xE3 ch\u1ECDn?`
    },
    addListRow: { ko: "\uD589 \uCD94\uAC00", vi: "Th\xEAm d\xF2ng" },
    unassignedBadge: { ko: "\uBBF8\uBC30\uCE58", vi: "Ch\u01B0a x\u1EBFp" },
    unassignedPoolTitle: {
      ko: (n) => `\uBBF8\uBC30\uCE58 \uC778\uC6D0 ${n}\uBA85 \u2014 \uC870\uC9C1\uB3C4 \uC218\uC815 \uBAA8\uB4DC\uC5D0\uC11C \uC544\uB798\uB85C \uB04C\uC5B4\uB2E4 \uCE74\uB4DC\uC5D0 \uBC30\uCE58\uD558\uC138\uC694`,
      vi: (n) => `${n} ng\u01B0\u1EDDi ch\u01B0a x\u1EBFp \u2014 \u1EDE ch\u1EBF \u0111\u1ED9 ch\u1EC9nh s\u1EEDa, k\xE9o v\xE0o th\u1EBB b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 x\u1EBFp`
    },
    dragTeamTitle: { ko: "\uB4DC\uB798\uADF8\uD558\uC5EC \uD300 \uC21C\uC11C \uBCC0\uACBD", vi: "K\xE9o \u0111\u1EC3 \u0111\u1ED5i th\u1EE9 t\u1EF1 nh\xF3m" },
    dragMemberTitle: { ko: "\uB4DC\uB798\uADF8\uD558\uC5EC \uB2E4\uB978 \uD300\uC73C\uB85C \uC774\uB3D9", vi: "K\xE9o \u0111\u1EC3 chuy\u1EC3n sang nh\xF3m kh\xE1c" },
    dragUnassignedTitle: { ko: "\uB4DC\uB798\uADF8\uD558\uC5EC \uC870\uC9C1\uB3C4 \uCE74\uB4DC\uC5D0 \uBC30\uCE58", vi: "K\xE9o v\xE0o th\u1EBB trong s\u01A1 \u0111\u1ED3 t\u1ED5 ch\u1EE9c \u0111\u1EC3 x\u1EBFp" },
    dragListRowTitle: { ko: "\uB4DC\uB798\uADF8\uD558\uC5EC \uC21C\uC11C \uBCC0\uACBD", vi: "K\xE9o \u0111\u1EC3 \u0111\u1ED5i th\u1EE9 t\u1EF1" },
    uploadPhotoTitle: { ko: "\uC0AC\uC9C4 \uB4F1\uB85D/\uBCC0\uACBD", vi: "\u0110\u0103ng k\xFD/\u0111\u1ED5i \u1EA3nh" },
    editTeamNameTitle: { ko: "\uD300 \uC774\uB984 \uC218\uC815", vi: "S\u1EEDa t\xEAn nh\xF3m" },
    deleteTeamTitle: { ko: "\uD300 \uC0AD\uC81C", vi: "X\xF3a nh\xF3m" },
    addMember: { ko: "\uD300\uC6D0 \uCD94\uAC00", vi: "Th\xEAm th\xE0nh vi\xEAn" },
    addTeam: { ko: "\uD300 \uCD94\uAC00", vi: "Th\xEAm nh\xF3m" },
    memberEditTitle: { ko: "\uC218\uC815", vi: "S\u1EEDa" },
    memberDeleteTitle: { ko: "\uC0AD\uC81C", vi: "X\xF3a" },
    fieldEmpNo: { ko: "\uC0AC\uBC88", vi: "M\xE3 NV" },
    fieldName: { ko: "\uC131\uBA85", vi: "H\u1ECD t\xEAn" },
    fieldDept: { ko: "\uBD80\uC11C", vi: "B\u1ED9 ph\u1EADn" },
    fieldPosition: { ko: "\uC9C1\uAE09", vi: "Ch\u1EE9c v\u1EE5" },
    namePlaceholder: { ko: "\uD64D\uAE38\uB3D9", vi: "Nguy\u1EC5n V\u0103n A" },
    headPositionPlaceholder: { ko: "\uD488\uC9C8\uBD80\uC11C\uC7A5", vi: "Tr\u01B0\u1EDFng ph\xF2ng Ch\u1EA5t l\u01B0\u1EE3ng" },
    cancel: { ko: "\uCDE8\uC18C", vi: "H\u1EE7y" },
    save: { ko: "\uC800\uC7A5", vi: "L\u01B0u" },
    searchPlaceholder: { ko: "\uC774\uB984 \uB610\uB294 \uC0AC\uBC88 \uAC80\uC0C9", vi: "T\xECm theo t\xEAn ho\u1EB7c m\xE3 NV" },
    totalCount: { ko: (n) => `\uCD1D ${n}\uBA85`, vi: (n) => `T\u1ED5ng ${n} ng\u01B0\u1EDDi` },
    managerLabel: { ko: "\uAD00\uB9AC\uC790", vi: "Qu\u1EA3n l\xFD" },
    colPhoto: { ko: "\uC0AC\uC9C4", vi: "\u1EA2nh" },
    colEmpNo: { ko: "\uC0AC\uBC88", vi: "M\xE3 NV" },
    colNameTeam: { ko: "\uC131\uBA85 / \uC18C\uC18D", vi: "H\u1ECD t\xEAn / B\u1ED9 ph\u1EADn" },
    colPosition: { ko: "\uC9C1\uAE09", vi: "Ch\u1EE9c v\u1EE5" },
    colFactory: { ko: "\uACF5\uC7A5", vi: "Nh\xE0 m\xE1y" },
    colNote: { ko: "\uBE44\uACE0", vi: "Ghi ch\xFA" },
    colStatus: { ko: "\uC624\uB298 \uC0C1\uD0DC", vi: "Tr\u1EA1ng th\xE1i h\xF4m nay" },
    headTeamLabel: { ko: "\uBD80\uC11C\uC7A5", vi: "Tr\u01B0\u1EDFng ph\xF2ng" },
    teamOverall: { ko: "\uD604\uC9C0\uCD1D\uAD04\uAD00\uB9AC\uC790", vi: "T\u1ED5ng qu\u1EA3n l\xFD t\u1EA1i ch\u1ED7" },
    registerRow: { ko: "\uB4F1\uB85D", vi: "\u0110\u0103ng k\xFD" },
    registerModalTitle: { ko: "\uBA85\uB2E8 \uB4F1\uB85D", vi: "\u0110\u0103ng k\xFD danh s\xE1ch" },
    registerSubmitBtn: { ko: (n) => `\uB4F1\uB85D (${n}\uAC74)`, vi: (n) => `\u0110\u0103ng k\xFD (${n})` },
    removeRowTitle: { ko: "\uD589 \uC0AD\uC81C", vi: "X\xF3a d\xF2ng" }
  };
  var LangContext = (0, import_react.createContext)({ lang: "ko", t: (key) => key });
  var useLang = () => (0, import_react.useContext)(LangContext);
  function t(lang, key, ...args) {
    const entry = DICT[key];
    if (!entry) return key;
    const v = entry[lang] ?? entry.ko;
    return typeof v === "function" ? v(...args) : v;
  }
  function trTeamTitle(title, lang) {
    if (lang === "vi" && title === "\uD604\uC9C0\uCD1D\uAD04\uAD00\uB9AC\uC790") return t(lang, "teamOverall");
    return title;
  }
  function trHeadPosition(position, lang) {
    if (lang === "vi" && position === "\uD488\uC9C8\uBD80\uC11C\uC7A5") return t(lang, "headPositionPlaceholder");
    return position;
  }
  var idSeq = 1e3;
  var nextId = () => idSeq++;
  var newMiddleCard = () => ({ id: nextId(), title: "\uC0C8 \uCE74\uB4DC", members: [] });
  var seedFactory = (factory, headsInfo, teamsSeed) => {
    const teams = teamsSeed.map((t2) => ({
      id: nextId(),
      title: t2.title,
      members: t2.members.map((m) => ({ id: nextId(), ...m, factory }))
    }));
    const heads = headsInfo.map((h) => ({ id: nextId(), ...h, factory }));
    return { heads, teams, qcMembers: [], middleCard: newMiddleCard(), unassigned: [] };
  };
  var initialOrg = {
    1: seedFactory(
      1,
      [{ empNo: "Q1001", name: "\uD64D\uC131\uD6C8", position: "\uD488\uC9C8\uBD80\uC11C\uC7A5" }],
      [
        { title: "\uD604\uC9C0\uCD1D\uAD04\uAD00\uB9AC\uC790", members: [] },
        {
          title: "IQC",
          members: [
            { empNo: "Q1011", name: "\uAE40\uCCA0\uC218", position: "Upper Manager", status: "\uCD9C\uADFC" },
            { empNo: "Q1012", name: "\uAE40\uBBFC\uC218", position: "Supervisor 1", status: "\uBCD1\uAC00", note: "\uAC10\uAE30\uBAB8\uC0B4" },
            { empNo: "Q1013", name: "\uC624\uC138\uD6C8", position: "Inspector", status: "\uCD9C\uADFC" }
          ]
        },
        {
          title: "PQC UNIT",
          members: [
            { empNo: "Q1021", name: "\uC774\uC218\uC815", position: "Manager", status: "\uCD9C\uC0B0\uD734\uAC00", returnDate: "2026-11-02" }
          ]
        },
        {
          title: "PQC ASSY",
          members: [{ empNo: "Q1022", name: "\uC815\uB2E4\uC740", position: "Inspector", status: "\uCD9C\uADFC" }]
        },
        {
          title: "OQC",
          members: [
            { empNo: "Q1031", name: "\uBC15\uC900\uD638", position: "Supervisor 2", status: "\uBB34\uB2E8\uACB0\uADFC" },
            { empNo: "Q1032", name: "\uCD5C\uC720\uC9C4", position: "Inspector", status: "\uCD9C\uADFC" }
          ]
        },
        {
          title: "RMA",
          members: [
            { empNo: "Q1041", name: "\uC7A5\uC11C\uC5F0", position: "Manager", status: "\uCD9C\uADFC" },
            { empNo: "Q1042", name: "\uD55C\uB3C4\uC724", position: "Staff", status: "\uCD9C\uADFC" }
          ]
        }
      ]
    )
  };
  var STORAGE_KEY = "qualityPortal.org.v1";
  var LANG_STORAGE_KEY = "qualityPortal.lang.v1";
  var RESET_DATE_KEY = "qualityPortal.lastResetDate.v1";
  var SYNC_ENABLED = typeof window !== "undefined" && window.location.protocol !== "file:";
  var SYNC_POLL_MS = 5e3;
  var SYNC_PUSH_DEBOUNCE_MS = 500;
  function todayISODate() {
    const d = /* @__PURE__ */ new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function resetStatusesForNewDay(org, todayISO) {
    let changed = false;
    const resetMember = (m) => {
      if (m.status === "\uCD9C\uC0B0\uD734\uAC00" && m.returnDate && m.returnDate > todayISO) return m;
      if (m.status === "\uCD9C\uADFC" && !m.note && !m.returnDate) return m;
      changed = true;
      const { note, returnDate, ...rest } = m;
      return { ...rest, status: "\uCD9C\uADFC" };
    };
    const next = {};
    Object.entries(org).forEach(([factory, data]) => {
      next[factory] = {
        ...data,
        teams: data.teams.map((tm) => ({ ...tm, members: tm.members.map(resetMember) })),
        qcMembers: (data.qcMembers || []).map(resetMember),
        middleCard: data.middleCard ? { ...data.middleCard, members: data.middleCard.members.map(resetMember) } : data.middleCard,
        unassigned: (data.unassigned || []).map(resetMember)
      };
    });
    return changed ? next : org;
  }
  function collectMaxId(org) {
    let max = 0;
    Object.values(org).forEach((factoryData) => {
      (factoryData.heads || []).forEach((h) => {
        if (h.id > max) max = h.id;
      });
      (factoryData.teams || []).forEach((t2) => {
        if (t2.id > max) max = t2.id;
        (t2.members || []).forEach((m) => {
          if (m.id > max) max = m.id;
        });
      });
      (factoryData.qcMembers || []).forEach((m) => {
        if (m.id > max) max = m.id;
      });
      if (factoryData.middleCard) {
        if (factoryData.middleCard.id > max) max = factoryData.middleCard.id;
        (factoryData.middleCard.members || []).forEach((m) => {
          if (m.id > max) max = m.id;
        });
      }
      (factoryData.unassigned || []).forEach((m) => {
        if (m.id > max) max = m.id;
      });
    });
    return max;
  }
  function migrateLegacyTeamNames(org) {
    let changed = false;
    const next = {};
    Object.entries(org).forEach(([factory, data]) => {
      const teams = (data.teams || []).map(
        (team) => team.title === "\uCD1D\uAD04" ? (changed = true, { ...team, title: "\uD604\uC9C0\uCD1D\uAD04\uAD00\uB9AC\uC790" }) : team
      );
      next[factory] = changed ? { ...data, teams } : data;
    });
    return changed ? next : org;
  }
  function ensureMiddleCard(org) {
    let changed = false;
    const next = {};
    Object.entries(org).forEach(([factory, data]) => {
      if (data.middleCard) {
        next[factory] = data;
      } else {
        changed = true;
        next[factory] = { ...data, middleCard: newMiddleCard() };
      }
    });
    return changed ? next : org;
  }
  function ensureUnassigned(org) {
    let changed = false;
    const next = {};
    Object.entries(org).forEach(([factory, data]) => {
      if (data.unassigned) {
        next[factory] = data;
      } else {
        changed = true;
        next[factory] = { ...data, unassigned: [] };
      }
    });
    return changed ? next : org;
  }
  function normalizeLoadedOrg(parsed) {
    if (!parsed || !parsed[1]) return null;
    idSeq = Math.max(idSeq, collectMaxId(parsed) + 1);
    return ensureUnassigned(ensureMiddleCard(migrateLegacyTeamNames({ 1: parsed[1] })));
  }
  function loadInitialOrg() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initialOrg;
      const normalized = normalizeLoadedOrg(JSON.parse(raw));
      return normalized || initialOrg;
    } catch {
      return initialOrg;
    }
  }
  function loadInitialLang() {
    try {
      const raw = localStorage.getItem(LANG_STORAGE_KEY);
      return raw === "vi" ? "vi" : "ko";
    } catch {
      return "ko";
    }
  }
  var LIST_ORDER_KEY = "qualityPortal.listOrder.v1";
  function loadInitialListOrder() {
    try {
      const raw = localStorage.getItem(LIST_ORDER_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  function readImageAsDataUrl(file, size = 96) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."));
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          const side = Math.min(img.width, img.height);
          const sx = (img.width - side) / 2;
          const sy = (img.height - side) / 2;
          ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  function Badge({ status }) {
    const { lang } = useLang();
    const m = STATUS_META[status] || STATUS_META["\uCD9C\uADFC"];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "span",
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 12,
          fontWeight: 500,
          padding: "3px 9px",
          borderRadius: 6,
          background: m.bg,
          color: m.color,
          whiteSpace: "nowrap"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 9 }, children: m.icon }),
          trStatus(status, lang)
        ]
      }
    );
  }
  function IconBtn({ children, onClick, title, danger }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick,
        title,
        style: {
          width: 24,
          height: 24,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          border: `0.5px solid ${COLORS.border}`,
          background: COLORS.card,
          color: danger ? COLORS.danger : COLORS.textSecondary,
          fontSize: 13,
          cursor: "pointer",
          lineHeight: 1,
          flexShrink: 0
        },
        children
      }
    );
  }
  function TextField({ label, value, onChange, placeholder, style, children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: COLORS.textSecondary, width: "100%", ...style }, children: [
      label,
      children ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          value,
          onChange: (e) => onChange(e.target.value),
          placeholder,
          style: {
            width: "100%",
            boxSizing: "border-box",
            height: 32,
            padding: "0 10px",
            borderRadius: 6,
            border: `0.5px solid ${COLORS.border}`,
            fontSize: 13,
            color: COLORS.textPrimary,
            background: COLORS.card
          }
        }
      )
    ] });
  }
  function MemberForm({ initial, isHead, onSave, onCancel }) {
    const { lang } = useLang();
    const [empNo, setEmpNo] = (0, import_react.useState)(initial?.empNo || "");
    const [name, setName] = (0, import_react.useState)(initial?.name || "");
    const [position, setPosition] = (0, import_react.useState)(initial?.position || (isHead ? "\uD488\uC9C8\uBD80\uC11C\uC7A5" : POSITIONS[0]));
    const submit = () => {
      if (!empNo.trim() || !name.trim() || !position.trim()) return;
      onSave({ empNo: empNo.trim(), name: name.trim(), position: position.trim() });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: 10,
          borderRadius: 8,
          border: `0.5px solid ${COLORS.borderStrong}`,
          background: "#FAFAF7",
          width: "100%",
          boxSizing: "border-box"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, { label: t(lang, "fieldEmpNo"), value: empNo, onChange: setEmpNo, placeholder: "Q1051" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, { label: t(lang, "fieldName"), value: name, onChange: setName, placeholder: t(lang, "namePlaceholder") }),
            isHead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              TextField,
              {
                label: t(lang, "fieldPosition"),
                value: position,
                onChange: setPosition,
                placeholder: t(lang, "headPositionPlaceholder")
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, { label: t(lang, "fieldPosition"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "select",
              {
                value: position,
                onChange: (e) => setPosition(e.target.value),
                style: {
                  width: "100%",
                  boxSizing: "border-box",
                  height: 32,
                  padding: "0 8px",
                  borderRadius: 6,
                  border: `0.5px solid ${COLORS.border}`,
                  fontSize: 13,
                  color: COLORS.textPrimary,
                  background: COLORS.card
                },
                children: POSITIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: p, children: p }, p))
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                onClick: onCancel,
                style: { fontSize: 12, padding: "5px 12px", borderRadius: 6, border: `0.5px solid ${COLORS.border}`, background: COLORS.card },
                children: t(lang, "cancel")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                onClick: submit,
                style: {
                  fontSize: 12,
                  padding: "5px 12px",
                  borderRadius: 6,
                  border: "none",
                  background: COLORS.headDark,
                  color: "#fff",
                  fontWeight: 500
                },
                children: t(lang, "save")
              }
            )
          ] })
        ]
      }
    );
  }
  function RegisterModal({ onClose, onRegister }) {
    const { lang } = useLang();
    const makeBlankRow = () => ({ localId: nextId(), photo: "", empNo: "", name: "", dept: DEPARTMENTS[0], position: POSITIONS[0] });
    const [rows, setRows] = (0, import_react.useState)(() => [makeBlankRow()]);
    const updateRow = (localId, patch) => setRows((prev) => prev.map((r) => r.localId === localId ? { ...r, ...patch } : r));
    const removeRow = (localId) => setRows((prev) => prev.length > 1 ? prev.filter((r) => r.localId !== localId) : prev);
    const validRows = rows.filter((r) => r.empNo.trim() && r.name.trim());
    const submit = () => {
      if (validRows.length === 0) return;
      onRegister(
        validRows.map((r) => ({ photo: r.photo || void 0, empNo: r.empNo.trim(), name: r.name.trim(), dept: r.dept, position: r.position }))
      );
    };
    const selectStyle = {
      width: "100%",
      boxSizing: "border-box",
      height: 32,
      padding: "0 8px",
      borderRadius: 6,
      border: `0.5px solid ${COLORS.border}`,
      fontSize: 13,
      color: COLORS.textPrimary,
      background: COLORS.card
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(28,31,27,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1e3,
          padding: 20
        },
        onClick: onClose,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            style: {
              background: COLORS.card,
              borderRadius: 14,
              width: "100%",
              maxWidth: 720,
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "16px 20px", borderBottom: `0.5px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 16, fontWeight: 500, color: COLORS.textPrimary }, children: t(lang, "registerModalTitle") }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onClose, style: { background: "transparent", border: "none", fontSize: 16, cursor: "pointer", color: COLORS.textSecondary }, children: "\u2715" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }, children: [
                rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      alignItems: "flex-end",
                      padding: 14,
                      borderRadius: 10,
                      border: `0.5px solid ${COLORS.borderStrong}`,
                      background: "#FAFAF7"
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { cursor: "pointer", flexShrink: 0 }, title: t(lang, "uploadPhotoTitle"), children: [
                        row.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: row.photo, alt: "", style: { width: 44, height: 44, borderRadius: "50%", objectFit: "cover", display: "block" } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "div",
                          {
                            style: {
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                              background: COLORS.page,
                              border: `0.5px dashed ${COLORS.borderStrong}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 18,
                              color: COLORS.textMuted
                            },
                            children: "+"
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "input",
                          {
                            type: "file",
                            accept: "image/*",
                            style: { display: "none" },
                            onChange: async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              try {
                                updateRow(row.localId, { photo: await readImageAsDataUrl(file) });
                              } catch {
                              }
                              e.target.value = "";
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        TextField,
                        {
                          label: t(lang, "fieldEmpNo"),
                          value: row.empNo,
                          onChange: (v) => updateRow(row.localId, { empNo: v }),
                          placeholder: "Q1051",
                          style: { width: 130 }
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        TextField,
                        {
                          label: t(lang, "fieldName"),
                          value: row.name,
                          onChange: (v) => updateRow(row.localId, { name: v }),
                          placeholder: t(lang, "namePlaceholder"),
                          style: { width: 150 }
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, { label: t(lang, "fieldDept"), style: { width: 150 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { value: row.dept, onChange: (e) => updateRow(row.localId, { dept: e.target.value }), style: selectStyle, children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: d, children: trTeamTitle(d, lang) }, d)) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, { label: t(lang, "fieldPosition"), style: { width: 150 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { value: row.position, onChange: (e) => updateRow(row.localId, { position: e.target.value }), style: selectStyle, children: POSITIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: p, children: p }, p)) }) }),
                      rows.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "button",
                        {
                          onClick: () => removeRow(row.localId),
                          title: t(lang, "removeRowTitle"),
                          style: {
                            width: 30,
                            height: 30,
                            borderRadius: 6,
                            border: `0.5px solid ${COLORS.danger}`,
                            background: COLORS.dangerBg,
                            color: COLORS.danger,
                            cursor: "pointer",
                            flexShrink: 0
                          },
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u{1F5D1}" })
                        }
                      )
                    ]
                  },
                  row.localId
                )),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    onClick: () => setRows((prev) => [...prev, makeBlankRow()]),
                    style: {
                      fontSize: 12,
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: `0.5px dashed ${COLORS.borderStrong}`,
                      background: "transparent",
                      color: COLORS.textSecondary,
                      cursor: "pointer"
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginRight: 4 }, "aria-hidden": "true", children: "+" }),
                      t(lang, "addListRow")
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "14px 20px", borderTop: `0.5px solid ${COLORS.border}`, display: "flex", justifyContent: "flex-end", gap: 8 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: onClose,
                    style: { fontSize: 13, padding: "7px 16px", borderRadius: 6, border: `0.5px solid ${COLORS.border}`, background: COLORS.card, cursor: "pointer" },
                    children: t(lang, "cancel")
                  }
                ),
                validRows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: submit,
                    style: {
                      fontSize: 13,
                      padding: "7px 16px",
                      borderRadius: 6,
                      border: "none",
                      background: COLORS.headDark,
                      color: "#fff",
                      fontWeight: 500,
                      cursor: "pointer"
                    },
                    children: t(lang, "registerSubmitBtn", validRows.length)
                  }
                )
              ] })
            ]
          }
        )
      }
    );
  }
  var POSITION_TIER = {
    Inspector: "Inspector",
    Staff: "Staff",
    "Supervisor 1": "Supervisor",
    "Supervisor 2": "Supervisor",
    Manager: "Manager",
    "Upper Manager": "Manager"
  };
  var TIER_ORDER = ["Manager", "Supervisor", "Staff", "Inspector"];
  var tierRank = (tier) => {
    const idx = TIER_ORDER.indexOf(tier);
    return idx === -1 ? TIER_ORDER.length : idx;
  };
  var TIER_COLORS = {
    \uBD80\uC11C\uC7A5: { color: "#2F8F5B", bg: "#E7F6EC", border: "#BEE6CC" },
    Manager: { color: "#2F8F5B", bg: "#E7F6EC", border: "#BEE6CC" },
    Supervisor: { color: "#C2790C", bg: "#FDF0DC", border: "#F3D9A8" },
    Staff: { color: "#6B4FA0", bg: "#F1ECFA", border: "#DACEF0" },
    Inspector: { color: "#2668B2", bg: "#E6F0FB", border: "#BBD8F4" }
  };
  var tierColorsOf = (tier) => TIER_COLORS[tier] || TIER_COLORS.Inspector;
  var KNOWN_POSITION_LABELS = ["Manager", "Upper Manager", "Supervisor 1", "Supervisor 2", "Staff", "Inspector"];
  var orgPositionLabel = (position) => KNOWN_POSITION_LABELS.includes(position) ? position : "Inspector";
  function groupByTier(members) {
    const groups = /* @__PURE__ */ new Map();
    members.forEach((m) => {
      const tier = POSITION_TIER[m.position] || "Inspector";
      if (!groups.has(tier)) groups.set(tier, []);
      groups.get(tier).push(m);
    });
    return [...groups.entries()].map(([tier, list]) => [tier, list.slice().sort((a, b) => positionRank(b.position) - positionRank(a.position))]).sort((a, b) => tierRank(a[0]) - tierRank(b[0]));
  }
  function TeamCard({
    team,
    isEditing,
    onUpdateTitle,
    onDeleteTeam,
    onAddMember,
    onEditMember,
    onDeleteMember,
    onDirtyChange,
    draggable,
    isDragOver,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onMemberDragStart,
    onMemberDragEnd,
    isMemberDropTarget,
    onMemberDrop,
    headerColor,
    titleEditable = true,
    deletable = true
  }) {
    const { lang } = useLang();
    const [editingTitle, setEditingTitle] = (0, import_react.useState)(false);
    const [titleDraft, setTitleDraft] = (0, import_react.useState)(team.title);
    const [addingMember, setAddingMember] = (0, import_react.useState)(false);
    const [editingMemberId, setEditingMemberId] = (0, import_react.useState)(null);
    const onDirtyChangeRef = (0, import_react.useRef)(onDirtyChange);
    onDirtyChangeRef.current = onDirtyChange;
    (0, import_react.useEffect)(() => {
      const dirty = editingTitle || addingMember || editingMemberId !== null;
      onDirtyChangeRef.current?.(dirty);
    }, [editingTitle, addingMember, editingMemberId]);
    (0, import_react.useEffect)(() => {
      return () => onDirtyChangeRef.current?.(false);
    }, []);
    const grouped = groupByTier(team.members);
    const renderMemberRow = (m, tc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        draggable: isEditing,
        onDragStart: (e) => {
          e.stopPropagation();
          onMemberDragStart?.(m.id);
        },
        onDragEnd: (e) => {
          e.stopPropagation();
          onMemberDragEnd?.();
        },
        title: isEditing ? t(lang, "dragMemberTitle") : void 0,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 8px",
          borderRadius: 6,
          background: COLORS.card,
          borderTop: `0.5px solid ${COLORS.border}`,
          borderRight: `0.5px solid ${COLORS.border}`,
          borderBottom: `0.5px solid ${COLORS.border}`,
          borderLeft: `3px solid ${tc.color}`,
          cursor: isEditing ? "grab" : "default"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: "#000000" }, children: orgPositionLabel(m.position) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }, children: m.name })
          ] }),
          isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 4, flexShrink: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, { title: t(lang, "memberEditTitle"), onClick: () => setEditingMemberId(m.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u270E" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, { title: t(lang, "memberDeleteTitle"), danger: true, onClick: () => onDeleteMember(m.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u{1F5D1}" }) })
          ] })
        ]
      },
      m.id
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        draggable,
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
        onDragEnd,
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: "1 1 0",
          minWidth: 168,
          opacity: isDragOver ? 0.6 : 1
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 1, height: 16, background: COLORS.borderStrong } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              style: {
                width: "100%",
                border: `0.5px solid ${isDragOver ? COLORS.teal : COLORS.border}`,
                borderRadius: 10,
                overflow: "hidden",
                background: COLORS.card
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "div",
                  {
                    title: t(lang, "dragTeamTitle"),
                    style: {
                      background: headerColor || COLORS.headMid,
                      color: "#fff",
                      padding: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: draggable ? "grab" : "default"
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", style: { opacity: 0.6, fontSize: 12, flexShrink: 0 }, children: "\u283F" }),
                      editingTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "input",
                        {
                          value: titleDraft,
                          onChange: (e) => setTitleDraft(e.target.value),
                          onBlur: () => {
                            onUpdateTitle(titleDraft.trim() || team.title);
                            setEditingTitle(false);
                          },
                          onKeyDown: (e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                          },
                          autoFocus: true,
                          style: {
                            fontSize: 13,
                            fontWeight: 500,
                            background: "rgba(255,255,255,0.15)",
                            border: "none",
                            borderRadius: 4,
                            color: "#fff",
                            padding: "2px 6px",
                            width: "100%",
                            boxSizing: "border-box",
                            minWidth: 0
                          }
                        }
                      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "span",
                        {
                          style: {
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: isEditing && titleEditable ? "pointer" : "default",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          },
                          onClick: isEditing && titleEditable ? () => setEditingTitle(true) : void 0,
                          children: trTeamTitle(team.title, lang)
                        }
                      ),
                      isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 4, flexShrink: 0, marginLeft: "auto" }, children: [
                        titleEditable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "button",
                          {
                            onClick: () => setEditingTitle(true),
                            title: t(lang, "editTeamNameTitle"),
                            style: { background: "transparent", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", fontSize: 12 },
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u270E" })
                          }
                        ),
                        deletable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "button",
                          {
                            onClick: onDeleteTeam,
                            title: t(lang, "deleteTeamTitle"),
                            style: { background: "transparent", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", fontSize: 12 },
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u{1F5D1}" })
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "div",
                  {
                    onDragOver: (e) => {
                      if (!isMemberDropTarget) return;
                      e.preventDefault();
                      e.stopPropagation();
                    },
                    onDrop: (e) => {
                      if (!isMemberDropTarget) return;
                      e.preventDefault();
                      e.stopPropagation();
                      onMemberDrop?.();
                    },
                    style: {
                      padding: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0,
                      background: isMemberDropTarget ? COLORS.tealBg : "transparent",
                      outline: isMemberDropTarget ? `1.5px dashed ${COLORS.teal}` : "none",
                      outlineOffset: -4,
                      borderRadius: 8
                    },
                    children: [
                      grouped.map(([tier, members], idx) => {
                        const tc = tierColorsOf(tier);
                        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 1, height: idx === 0 ? 8 : 10, background: COLORS.borderStrong } }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            "div",
                            {
                              style: {
                                width: "100%",
                                boxSizing: "border-box",
                                border: `0.5px solid ${tc.border}`,
                                borderRadius: 8,
                                padding: 6,
                                display: "flex",
                                flexDirection: "column",
                                gap: 6,
                                background: tc.bg
                              },
                              children: members.map(
                                (m) => editingMemberId === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  MemberForm,
                                  {
                                    initial: m,
                                    onCancel: () => setEditingMemberId(null),
                                    onSave: (data) => {
                                      onEditMember(m.id, data);
                                      setEditingMemberId(null);
                                    }
                                  },
                                  m.id
                                ) : renderMemberRow(m, tc)
                              )
                            }
                          )
                        ] }, tier);
                      }),
                      addingMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "100%", marginTop: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        MemberForm,
                        {
                          onCancel: () => setAddingMember(false),
                          onSave: (data) => {
                            onAddMember(data);
                            setAddingMember(false);
                          }
                        }
                      ) }) : isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        "button",
                        {
                          onClick: () => setAddingMember(true),
                          style: {
                            fontSize: 12,
                            padding: "6px 8px",
                            borderRadius: 6,
                            border: `0.5px dashed ${COLORS.borderStrong}`,
                            background: "transparent",
                            color: COLORS.textSecondary,
                            cursor: "pointer",
                            width: "100%",
                            boxSizing: "border-box",
                            marginTop: 8
                          },
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginRight: 4 }, "aria-hidden": "true", children: "+" }),
                            t(lang, "addMember")
                          ]
                        }
                      ) : null
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
  function OrgChart({ factory, data, isEditing, setOrg, onDirtyChange }) {
    const { lang } = useLang();
    const [editingHeadId, setEditingHeadId] = (0, import_react.useState)(null);
    const [addingHead, setAddingHead] = (0, import_react.useState)(false);
    const [dragIndex, setDragIndex] = (0, import_react.useState)(null);
    const [overIndex, setOverIndex] = (0, import_react.useState)(null);
    const [headDragIndex, setHeadDragIndex] = (0, import_react.useState)(null);
    const [headOverIndex, setHeadOverIndex] = (0, import_react.useState)(null);
    const [dirtyTeamIds, setDirtyTeamIds] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
    const handleTeamDirtyChange = (teamId, dirty) => {
      setDirtyTeamIds((prev) => {
        const has = prev.has(teamId);
        if (dirty === has) return prev;
        const next = new Set(prev);
        if (dirty) next.add(teamId);
        else next.delete(teamId);
        return next;
      });
    };
    const hasOpenForm = editingHeadId !== null || addingHead || dirtyTeamIds.size > 0;
    (0, import_react.useEffect)(() => {
      onDirtyChange?.(hasOpenForm);
    }, [hasOpenForm, onDirtyChange]);
    const updateTeams = (updater) => {
      setOrg((prev) => ({
        ...prev,
        [factory]: { ...prev[factory], teams: updater(prev[factory].teams) }
      }));
    };
    const updateHeads = (updater) => {
      setOrg((prev) => ({
        ...prev,
        [factory]: { ...prev[factory], heads: updater(prev[factory].heads) }
      }));
    };
    const updateQcMembers = (updater) => {
      setOrg((prev) => ({
        ...prev,
        [factory]: { ...prev[factory], qcMembers: updater(prev[factory].qcMembers || []) }
      }));
    };
    const updateMiddleCard = (updater) => {
      setOrg((prev) => ({
        ...prev,
        [factory]: { ...prev[factory], middleCard: updater(prev[factory].middleCard || newMiddleCard()) }
      }));
    };
    const addTeam = () => {
      updateTeams((teams) => [...teams, { id: nextId(), title: "\uC0C8 \uD300", members: [] }]);
    };
    const moveTeam = (fromIdx, toIdx) => {
      updateTeams((teams) => {
        if (fromIdx === toIdx || fromIdx == null || toIdx == null) return teams;
        const next = [...teams];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        return next;
      });
    };
    const moveHead = (fromIdx, toIdx) => {
      updateHeads((heads) => {
        if (fromIdx === toIdx || fromIdx == null || toIdx == null) return heads;
        const next = [...heads];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        return next;
      });
    };
    const [draggedMemberInfo, setDraggedMemberInfo] = (0, import_react.useState)(null);
    const sameLocation = (a, b) => {
      if (!a || !b || a.kind !== b.kind) return false;
      return a.kind === "team" ? a.id === b.id : true;
    };
    const moveMember = (source, target, memberId) => {
      if (sameLocation(source, target)) return;
      setOrg((prev) => {
        const factoryData = prev[factory];
        let member;
        if (source.kind === "team") member = factoryData.teams.find((t2) => t2.id === source.id)?.members.find((m) => m.id === memberId);
        else if (source.kind === "middleCard") member = factoryData.middleCard?.members.find((m) => m.id === memberId);
        else if (source.kind === "qcStaff") member = (factoryData.qcMembers || []).find((m) => m.id === memberId);
        else if (source.kind === "unassigned") member = (factoryData.unassigned || []).find((m) => m.id === memberId);
        if (!member) return prev;
        const { dept, ...stripped } = member;
        const placed = target.kind === "qcStaff" ? member : stripped;
        const next = { ...factoryData };
        if (source.kind === "team") next.teams = next.teams.map((t2) => t2.id === source.id ? { ...t2, members: t2.members.filter((m) => m.id !== memberId) } : t2);
        else if (source.kind === "middleCard") next.middleCard = { ...next.middleCard, members: next.middleCard.members.filter((m) => m.id !== memberId) };
        else if (source.kind === "qcStaff") next.qcMembers = (next.qcMembers || []).filter((m) => m.id !== memberId);
        else if (source.kind === "unassigned") next.unassigned = (next.unassigned || []).filter((m) => m.id !== memberId);
        if (target.kind === "team") next.teams = next.teams.map((t2) => t2.id === target.id ? { ...t2, members: [...t2.members, placed] } : t2);
        else if (target.kind === "middleCard") next.middleCard = { ...next.middleCard || newMiddleCard(), members: [...next.middleCard?.members || [], placed] };
        else if (target.kind === "qcStaff") next.qcMembers = [...next.qcMembers || [], placed];
        return { ...prev, [factory]: next };
      });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 4px 4px" }, children: [
      (data.unassigned || []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          style: {
            width: "100%",
            marginBottom: 14,
            padding: 10,
            borderRadius: 10,
            border: `1px dashed ${COLORS.borderStrong}`,
            background: "#FAFAF7",
            boxSizing: "border-box"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 12, fontWeight: 500, color: COLORS.textSecondary, marginBottom: 8 }, children: t(lang, "unassignedPoolTitle", data.unassigned.length) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: data.unassigned.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                draggable: isEditing,
                onDragStart: () => setDraggedMemberInfo({ memberId: m.id, source: { kind: "unassigned" } }),
                onDragEnd: () => setDraggedMemberInfo(null),
                title: isEditing ? t(lang, "dragUnassignedTitle") : void 0,
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px 5px 5px",
                  borderRadius: 999,
                  border: `0.5px solid ${COLORS.border}`,
                  background: COLORS.card,
                  cursor: isEditing ? "grab" : "default"
                },
                children: [
                  m.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: m.photo, alt: "", style: { width: 22, height: 22, borderRadius: "50%", objectFit: "cover", display: "block" } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 22, height: 22, borderRadius: "50%", background: COLORS.page } }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 12, fontWeight: 500, color: COLORS.textPrimary }, children: m.name }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 11, color: COLORS.textMuted }, children: orgPositionLabel(m.position) }),
                  m.dept && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: 11, color: COLORS.textMuted }, children: [
                    "\xB7 ",
                    trTeamTitle(m.dept, lang)
                  ] })
                ]
              },
              m.id
            )) })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
        data.heads.map((h, idx) => {
          const tc = tierColorsOf("\uBD80\uC11C\uC7A5");
          return editingHeadId === h.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 260, maxWidth: "100%", marginTop: idx === 0 ? 0 : 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            MemberForm,
            {
              initial: h,
              isHead: true,
              onCancel: () => setEditingHeadId(null),
              onSave: (d) => {
                updateHeads((heads) => heads.map((x) => x.id === h.id ? { ...x, ...d } : x));
                setEditingHeadId(null);
              }
            }
          ) }, h.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
            idx > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 1, height: 10, background: COLORS.borderStrong } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", width: 260, maxWidth: "100%" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  draggable: true,
                  onDragStart: () => setHeadDragIndex(idx),
                  onDragOver: (e) => {
                    e.preventDefault();
                    if (headOverIndex !== idx) setHeadOverIndex(idx);
                  },
                  onDragLeave: () => setHeadOverIndex((cur) => cur === idx ? null : cur),
                  onDrop: (e) => {
                    e.preventDefault();
                    moveHead(headDragIndex, idx);
                    setHeadDragIndex(null);
                    setHeadOverIndex(null);
                  },
                  onDragEnd: () => {
                    setHeadDragIndex(null);
                    setHeadOverIndex(null);
                  },
                  onClick: isEditing ? () => setEditingHeadId(h.id) : void 0,
                  title: isEditing ? t(lang, "headClickDragTitle") : t(lang, "headDragTitle"),
                  style: {
                    borderRadius: 10,
                    overflow: "hidden",
                    border: `0.5px solid ${headOverIndex === idx && headDragIndex !== idx ? COLORS.teal : COLORS.border}`,
                    background: COLORS.card,
                    boxSizing: "border-box",
                    cursor: isEditing ? "pointer" : "grab",
                    opacity: headOverIndex === idx && headDragIndex !== idx ? 0.7 : 1
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        style: {
                          background: COLORS.headDark,
                          color: "#fff",
                          padding: "8px 10px",
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", style: { opacity: 0.6, fontSize: 12, flexShrink: 0 }, children: "\u283F" }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 13, fontWeight: 500 }, children: t(lang, "headTeamLabel") })
                        ]
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        style: {
                          border: `0.5px solid ${tc.border}`,
                          borderRadius: 8,
                          padding: 6,
                          background: tc.bg
                        },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: "#000000" }, children: trHeadPosition(h.position, lang) }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }, children: h.name })
                        ]
                      }
                    ) })
                  ]
                }
              ),
              isEditing && data.heads.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: () => {
                    if (confirm(t(lang, "confirmDeleteHead", h.name))) {
                      updateHeads((heads) => heads.filter((x) => x.id !== h.id));
                    }
                  },
                  title: t(lang, "deleteHeadTitle"),
                  style: {
                    position: "absolute",
                    top: -6,
                    right: -6,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: `0.5px solid ${COLORS.border}`,
                    background: COLORS.card,
                    color: COLORS.danger,
                    fontSize: 10,
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  children: "\u2715"
                }
              )
            ] })
          ] }, h.id);
        }),
        isEditing && (addingHead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 260, maxWidth: "100%", marginTop: data.heads.length > 0 ? 10 : 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          MemberForm,
          {
            isHead: true,
            onCancel: () => setAddingHead(false),
            onSave: (d) => {
              updateHeads((heads) => [...heads, { id: nextId(), ...d, factory }]);
              setAddingHead(false);
            }
          }
        ) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          data.heads.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 1, height: 10, background: COLORS.borderStrong } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              onClick: () => setAddingHead(true),
              style: {
                padding: "8px 18px",
                borderRadius: 999,
                border: `1px dashed ${COLORS.borderStrong}`,
                background: "transparent",
                color: COLORS.textSecondary,
                fontSize: 13,
                cursor: "pointer",
                minWidth: 140
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginRight: 4 }, "aria-hidden": "true", children: "+" }),
                t(lang, "addHead")
              ]
            }
          )
        ] }))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 260, maxWidth: "100%" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        TeamCard,
        {
          team: data.middleCard || newMiddleCard(),
          isEditing,
          onDirtyChange: (d) => handleTeamDirtyChange("middle-card", d),
          headerColor: COLORS.headDark,
          deletable: false,
          onUpdateTitle: (title) => updateMiddleCard((mc) => ({ ...mc, title })),
          onAddMember: (d) => updateMiddleCard((mc) => ({ ...mc, members: [...mc.members, { id: nextId(), ...d, factory, status: "\uCD9C\uADFC" }] })),
          onEditMember: (memberId, d) => updateMiddleCard((mc) => ({
            ...mc,
            members: mc.members.map((m) => m.id === memberId ? { ...m, ...d } : m)
          })),
          onDeleteMember: (memberId) => {
            if (confirm(t(lang, "confirmDeleteMember"))) {
              updateMiddleCard((mc) => ({ ...mc, members: mc.members.filter((m) => m.id !== memberId) }));
            }
          },
          onMemberDragStart: (memberId) => setDraggedMemberInfo({ memberId, source: { kind: "middleCard" } }),
          onMemberDragEnd: () => setDraggedMemberInfo(null),
          isMemberDropTarget: !!draggedMemberInfo && !sameLocation(draggedMemberInfo.source, { kind: "middleCard" }),
          onMemberDrop: () => {
            if (draggedMemberInfo) moveMember(draggedMemberInfo.source, { kind: "middleCard" }, draggedMemberInfo.memberId);
            setDraggedMemberInfo(null);
          }
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 1, height: 18, background: COLORS.borderStrong } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${COLORS.borderStrong}`, background: COLORS.page } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "100%", borderTop: `2px solid ${COLORS.borderStrong}`, marginTop: 0 } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 14, width: "100%", marginTop: 0, alignItems: "flex-start" }, children: [
        data.teams.map((team, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          TeamCard,
          {
            team,
            isEditing,
            onDirtyChange: (d) => handleTeamDirtyChange(team.id, d),
            draggable: true,
            isDragOver: overIndex === idx && dragIndex !== idx,
            onDragStart: () => setDragIndex(idx),
            onDragOver: (e) => {
              e.preventDefault();
              if (overIndex !== idx) setOverIndex(idx);
            },
            onDragLeave: () => setOverIndex((cur) => cur === idx ? null : cur),
            onDrop: (e) => {
              e.preventDefault();
              moveTeam(dragIndex, idx);
              setDragIndex(null);
              setOverIndex(null);
            },
            onDragEnd: () => {
              setDragIndex(null);
              setOverIndex(null);
            },
            onUpdateTitle: (title) => updateTeams((teams) => teams.map((t2) => t2.id === team.id ? { ...t2, title } : t2)),
            onDeleteTeam: () => {
              if (confirm(t(lang, "confirmDeleteTeam", team.title))) {
                updateTeams((teams) => teams.filter((t2) => t2.id !== team.id));
              }
            },
            onAddMember: (d) => updateTeams(
              (teams) => teams.map(
                (t2) => t2.id === team.id ? { ...t2, members: [...t2.members, { id: nextId(), ...d, factory, status: "\uCD9C\uADFC" }] } : t2
              )
            ),
            onEditMember: (memberId, d) => updateTeams(
              (teams) => teams.map(
                (t2) => t2.id === team.id ? { ...t2, members: t2.members.map((m) => m.id === memberId ? { ...m, ...d } : m) } : t2
              )
            ),
            onDeleteMember: (memberId) => {
              if (confirm(t(lang, "confirmDeleteMember"))) {
                updateTeams(
                  (teams) => teams.map((t2) => t2.id === team.id ? { ...t2, members: t2.members.filter((m) => m.id !== memberId) } : t2)
                );
              }
            },
            onMemberDragStart: (memberId) => setDraggedMemberInfo({ memberId, source: { kind: "team", id: team.id } }),
            onMemberDragEnd: () => setDraggedMemberInfo(null),
            isMemberDropTarget: !!draggedMemberInfo && !sameLocation(draggedMemberInfo.source, { kind: "team", id: team.id }),
            onMemberDrop: () => {
              if (draggedMemberInfo) moveMember(draggedMemberInfo.source, { kind: "team", id: team.id }, draggedMemberInfo.memberId);
              setDraggedMemberInfo(null);
            }
          },
          team.id
        )),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          TeamCard,
          {
            team: { id: "qc-staff-card", title: "Staff", members: data.qcMembers || [] },
            isEditing,
            onDirtyChange: (d) => handleTeamDirtyChange("qc-staff-card", d),
            headerColor: COLORS.headDark,
            titleEditable: false,
            deletable: false,
            onAddMember: (d) => updateQcMembers((members) => [...members, { id: nextId(), ...d, factory, status: "\uCD9C\uADFC" }]),
            onEditMember: (memberId, d) => updateQcMembers((members) => members.map((m) => m.id === memberId ? { ...m, ...d } : m)),
            onDeleteMember: (memberId) => {
              if (confirm(t(lang, "confirmDeleteMember"))) {
                updateQcMembers((members) => members.filter((m) => m.id !== memberId));
              }
            },
            onMemberDragStart: (memberId) => setDraggedMemberInfo({ memberId, source: { kind: "qcStaff" } }),
            onMemberDragEnd: () => setDraggedMemberInfo(null),
            isMemberDropTarget: !!draggedMemberInfo && !sameLocation(draggedMemberInfo.source, { kind: "qcStaff" }),
            onMemberDrop: () => {
              if (draggedMemberInfo) moveMember(draggedMemberInfo.source, { kind: "qcStaff" }, draggedMemberInfo.memberId);
              setDraggedMemberInfo(null);
            }
          },
          "qc-staff-card"
        ),
        isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", flex: "1 1 0", minWidth: 140 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 1, height: 16, background: "transparent" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              onClick: addTeam,
              style: {
                width: "100%",
                minHeight: 60,
                borderRadius: 10,
                border: `1px dashed ${COLORS.borderStrong}`,
                background: "transparent",
                color: COLORS.textSecondary,
                fontSize: 13,
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginRight: 4 }, "aria-hidden": "true", children: "+" }),
                t(lang, "addTeam")
              ]
            }
          )
        ] })
      ] })
    ] });
  }
  function FactoryOrgPanel({ factory, data, setOrg }) {
    const { lang } = useLang();
    const [isEditing, setIsEditing] = (0, import_react.useState)(false);
    const [hasOpenForm, setHasOpenForm] = (0, import_react.useState)(false);
    const locked = isEditing && hasOpenForm;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 16px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 14, fontWeight: 500, color: COLORS.textSecondary }, children: t(lang, "orgChartTitle", factory) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => {
              if (locked) return;
              setIsEditing((v) => !v);
            },
            disabled: locked,
            title: locked ? t(lang, "editDoneDisabledTitle") : void 0,
            style: {
              padding: "5px 12px",
              fontSize: 12,
              borderRadius: 6,
              border: `0.5px solid ${isEditing ? COLORS.headDark : COLORS.border}`,
              background: isEditing ? COLORS.headDark : COLORS.card,
              color: isEditing ? "#fff" : COLORS.textSecondary,
              cursor: locked ? "not-allowed" : "pointer",
              opacity: locked ? 0.65 : 1,
              fontWeight: 500
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", style: { marginRight: 4 }, children: "\u270E" }),
              isEditing ? t(lang, "editDone") : t(lang, "edit")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgChart, { factory, data, isEditing, setOrg, onDirtyChange: setHasOpenForm })
    ] });
  }
  function QualityPortal() {
    const [org, setOrg] = (0, import_react.useState)(loadInitialOrg);
    const [lang, setLang] = (0, import_react.useState)(loadInitialLang);
    const [tab, setTab] = (0, import_react.useState)("dashboard");
    const [factory, setFactory] = (0, import_react.useState)("all");
    const [statusFilter, setStatusFilter] = (0, import_react.useState)("\uC804\uCCB4");
    const [search, setSearch] = (0, import_react.useState)("");
    const [listEditing, setListEditing] = (0, import_react.useState)(false);
    const [editingListId, setEditingListId] = (0, import_react.useState)(null);
    const [selectedListIds, setSelectedListIds] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
    const [listOrder, setListOrder] = (0, import_react.useState)(loadInitialListOrder);
    const [dragRowId, setDragRowId] = (0, import_react.useState)(null);
    const [overRowId, setOverRowId] = (0, import_react.useState)(null);
    const [showRegister, setShowRegister] = (0, import_react.useState)(false);
    const importFileRef = (0, import_react.useRef)(null);
    const isRemoteApplyRef = (0, import_react.useRef)(false);
    const orgUpdatedAtRef = (0, import_react.useRef)(0);
    (0, import_react.useEffect)(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(org));
      } catch {
      }
      if (!SYNC_ENABLED) return;
      if (isRemoteApplyRef.current) {
        isRemoteApplyRef.current = false;
        return;
      }
      const updatedAt = Date.now();
      orgUpdatedAtRef.current = updatedAt;
      const timer = setTimeout(() => {
        fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ org, updatedAt })
        }).catch(() => {
        });
      }, SYNC_PUSH_DEBOUNCE_MS);
      return () => clearTimeout(timer);
    }, [org]);
    (0, import_react.useEffect)(() => {
      if (!SYNC_ENABLED) return;
      let cancelled = false;
      const applyRemote = (remoteOrg, remoteUpdatedAt) => {
        isRemoteApplyRef.current = true;
        orgUpdatedAtRef.current = remoteUpdatedAt;
        setOrg(remoteOrg);
      };
      const pullOnce = async () => {
        try {
          const res = await fetch("/api/data", { cache: "no-store" });
          if (res.status === 404) return { found: false };
          if (!res.ok) return null;
          const data = await res.json();
          if (!data || !data.org) return null;
          return { found: true, org: data.org, updatedAt: data.updatedAt || 0 };
        } catch {
          return null;
        }
      };
      (async () => {
        const remote = await pullOnce();
        if (cancelled || !remote) return;
        if (remote.found) {
          applyRemote(remote.org, remote.updatedAt);
        } else {
          const updatedAt = Date.now();
          orgUpdatedAtRef.current = updatedAt;
          fetch("/api/data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ org, updatedAt })
          }).catch(() => {
          });
        }
      })();
      const interval = setInterval(async () => {
        const remote = await pullOnce();
        if (cancelled || !remote || !remote.found) return;
        if (remote.updatedAt > orgUpdatedAtRef.current) {
          applyRemote(remote.org, remote.updatedAt);
        }
      }, SYNC_POLL_MS);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }, []);
    (0, import_react.useEffect)(() => {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
      } catch {
      }
    }, [lang]);
    (0, import_react.useEffect)(() => {
      try {
        localStorage.setItem(LIST_ORDER_KEY, JSON.stringify(listOrder));
      } catch {
      }
    }, [listOrder]);
    (0, import_react.useEffect)(() => {
      const runResetIfNewDay = () => {
        const todayISO = todayISODate();
        let lastReset = null;
        try {
          lastReset = localStorage.getItem(RESET_DATE_KEY);
        } catch {
        }
        if (lastReset !== todayISO) {
          if (lastReset !== null) {
            setOrg((prev) => resetStatusesForNewDay(prev, todayISO));
          }
          try {
            localStorage.setItem(RESET_DATE_KEY, todayISO);
          } catch {
          }
        }
      };
      runResetIfNewDay();
      let timeoutId;
      const scheduleNextMidnight = () => {
        const now = /* @__PURE__ */ new Date();
        const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
        timeoutId = setTimeout(() => {
          runResetIfNewDay();
          scheduleNextMidnight();
        }, nextMidnight.getTime() - now.getTime());
      };
      scheduleNextMidnight();
      return () => clearTimeout(timeoutId);
    }, []);
    const langCtx = (0, import_react.useMemo)(() => ({ lang, setLang, t: (key, ...args) => t(lang, key, ...args) }), [lang]);
    const allEmployees = (0, import_react.useMemo)(() => {
      const list = [];
      FACTORIES.forEach((f) => {
        const d = org[f];
        d.heads.forEach(
          (h) => list.push({ ...h, team: "\uBD80\uC11C\uC7A5", isHead: true, status: "\uCD9C\uADFC", headCountInFactory: d.heads.length })
        );
        d.teams.forEach((t2) => {
          t2.members.forEach((m) => list.push({ ...m, team: t2.title, teamId: t2.id }));
        });
        (d.qcMembers || []).forEach((m) => list.push({ ...m, team: m.dept || "QC", isQc: true }));
        if (d.middleCard) {
          d.middleCard.members.forEach((m) => list.push({ ...m, team: d.middleCard.title, isMiddleCard: true }));
        }
        (d.unassigned || []).forEach((m) => list.push({ ...m, team: m.dept || "", isUnassigned: true }));
      });
      return list;
    }, [org]);
    const scoped = (0, import_react.useMemo)(
      () => factory === "all" ? allEmployees : allEmployees.filter((e) => e.factory === factory),
      [allEmployees, factory]
    );
    const orderedScoped = (0, import_react.useMemo)(() => {
      const arr = scoped.slice();
      if (listOrder.length === 0) return arr.sort(sortByDeptAndPosition);
      const orderIndex = new Map(listOrder.map((id, i) => [id, i]));
      return arr.sort((a, b) => {
        const ia = orderIndex.has(a.id) ? orderIndex.get(a.id) : Infinity;
        const ib = orderIndex.has(b.id) ? orderIndex.get(b.id) : Infinity;
        if (ia !== ib) return ia - ib;
        return sortByDeptAndPosition(a, b);
      });
    }, [scoped, listOrder]);
    const moveListRow = (draggedId, targetId) => {
      if (!draggedId || draggedId === targetId) return;
      const baseIds = orderedScoped.map((e) => e.id);
      const next = baseIds.filter((id) => id !== draggedId);
      const targetIdx = next.indexOf(targetId);
      if (targetIdx === -1) return;
      next.splice(targetIdx, 0, draggedId);
      setListOrder(next);
    };
    const counts = (0, import_react.useMemo)(() => {
      const c = { \uCD9C\uADFC: 0, \uC5F0\uCC28: 0, \uBCD1\uAC00: 0, \uBB34\uB2E8\uACB0\uADFC: 0, \uCD9C\uC0B0\uD734\uAC00: 0 };
      scoped.filter((e) => !e.isHead).forEach((e) => {
        c[e.status] = (c[e.status] || 0) + 1;
      });
      return c;
    }, [scoped]);
    const notices = (0, import_react.useMemo)(() => {
      return scoped.filter((e) => e.status !== "\uCD9C\uADFC").slice().sort((a, b) => ABSENCE_ORDER.indexOf(a.status) - ABSENCE_ORDER.indexOf(b.status));
    }, [scoped]);
    const filteredList = (0, import_react.useMemo)(() => {
      return orderedScoped.filter((e) => statusFilter === "\uC804\uCCB4" || e.status === statusFilter).filter((e) => {
        const q = search.trim().toLowerCase();
        return !q || e.name.toLowerCase().includes(q) || e.empNo.toLowerCase().includes(q);
      });
    }, [orderedScoped, statusFilter, search]);
    const listSummary = (0, import_react.useMemo)(() => {
      const nonHead = filteredList.filter((e) => !e.isHead);
      let managerCount = 0;
      const byGroup = /* @__PURE__ */ new Map();
      nonHead.forEach((e) => {
        if (MANAGER_POSITIONS.includes(e.position)) {
          managerCount += 1;
        } else if (e.position === "Staff") {
          byGroup.set("Staff", (byGroup.get("Staff") || 0) + 1);
        } else {
          byGroup.set(e.team, (byGroup.get(e.team) || 0) + 1);
        }
      });
      const groupOrder = ["Staff", ...DEPARTMENTS];
      const parts = [];
      if (managerCount > 0) parts.push({ label: t(lang, "managerLabel"), count: managerCount, kind: "manager" });
      [...byGroup.entries()].sort((a, b) => {
        const ia = groupOrder.indexOf(a[0]);
        const ib = groupOrder.indexOf(b[0]);
        return (ia === -1 ? groupOrder.length : ia) - (ib === -1 ? groupOrder.length : ib);
      }).forEach(([team, count]) => {
        if (count > 0) {
          parts.push({
            label: team === "Staff" ? "Staff" : trTeamTitle(team, lang),
            count,
            kind: team === "Staff" ? "staff" : "dept"
          });
        }
      });
      return { total: nonHead.length, parts };
    }, [filteredList, lang]);
    const updateListEntry = (entry, data) => {
      setOrg((prev) => {
        const factoryData = prev[entry.factory];
        if (entry.isHead) {
          return {
            ...prev,
            [entry.factory]: { ...factoryData, heads: factoryData.heads.map((h) => h.id === entry.id ? { ...h, ...data } : h) }
          };
        }
        if (entry.isQc) {
          return {
            ...prev,
            [entry.factory]: {
              ...factoryData,
              qcMembers: (factoryData.qcMembers || []).map((m) => m.id === entry.id ? { ...m, ...data } : m)
            }
          };
        }
        if (entry.isMiddleCard) {
          return {
            ...prev,
            [entry.factory]: {
              ...factoryData,
              middleCard: {
                ...factoryData.middleCard,
                members: factoryData.middleCard.members.map((m) => m.id === entry.id ? { ...m, ...data } : m)
              }
            }
          };
        }
        if (entry.isUnassigned) {
          return {
            ...prev,
            [entry.factory]: {
              ...factoryData,
              unassigned: (factoryData.unassigned || []).map((m) => m.id === entry.id ? { ...m, ...data } : m)
            }
          };
        }
        return {
          ...prev,
          [entry.factory]: {
            ...factoryData,
            teams: factoryData.teams.map(
              (tm) => tm.id === entry.teamId ? { ...tm, members: tm.members.map((m) => m.id === entry.id ? { ...m, ...data } : m) } : tm
            )
          }
        };
      });
    };
    const deleteListEntry = (entry) => {
      setOrg((prev) => {
        const factoryData = prev[entry.factory];
        if (entry.isHead) {
          return { ...prev, [entry.factory]: { ...factoryData, heads: factoryData.heads.filter((h) => h.id !== entry.id) } };
        }
        if (entry.isQc) {
          return {
            ...prev,
            [entry.factory]: { ...factoryData, qcMembers: (factoryData.qcMembers || []).filter((m) => m.id !== entry.id) }
          };
        }
        if (entry.isMiddleCard) {
          return {
            ...prev,
            [entry.factory]: {
              ...factoryData,
              middleCard: { ...factoryData.middleCard, members: factoryData.middleCard.members.filter((m) => m.id !== entry.id) }
            }
          };
        }
        if (entry.isUnassigned) {
          return {
            ...prev,
            [entry.factory]: { ...factoryData, unassigned: (factoryData.unassigned || []).filter((m) => m.id !== entry.id) }
          };
        }
        return {
          ...prev,
          [entry.factory]: {
            ...factoryData,
            teams: factoryData.teams.map(
              (tm) => tm.id === entry.teamId ? { ...tm, members: tm.members.filter((m) => m.id !== entry.id) } : tm
            )
          }
        };
      });
    };
    const deleteListEntries = (entries) => {
      const idSet = new Set(entries.map((e) => e.id));
      setOrg((prev) => {
        const next = { ...prev };
        FACTORIES.forEach((f) => {
          const factoryData = next[f];
          next[f] = {
            ...factoryData,
            heads: factoryData.heads.filter((h) => !idSet.has(h.id)),
            teams: factoryData.teams.map((tm) => ({ ...tm, members: tm.members.filter((m) => !idSet.has(m.id)) })),
            qcMembers: (factoryData.qcMembers || []).filter((m) => !idSet.has(m.id)),
            middleCard: factoryData.middleCard ? { ...factoryData.middleCard, members: factoryData.middleCard.members.filter((m) => !idSet.has(m.id)) } : factoryData.middleCard,
            unassigned: (factoryData.unassigned || []).filter((m) => !idSet.has(m.id))
          };
        });
        return next;
      });
    };
    const clearAllEmployees = () => {
      setOrg((prev) => {
        const next = {};
        FACTORIES.forEach((f) => {
          next[f] = {
            ...prev[f],
            heads: [],
            teams: prev[f].teams.map((tm) => ({ ...tm, members: [] })),
            qcMembers: [],
            middleCard: prev[f].middleCard ? { ...prev[f].middleCard, members: [] } : prev[f].middleCard,
            unassigned: []
          };
        });
        return next;
      });
      setSelectedListIds(/* @__PURE__ */ new Set());
      setEditingListId(null);
    };
    const handleRegisterRows = (rowsData) => {
      setOrg((prev) => ({
        ...prev,
        1: {
          ...prev[1],
          unassigned: [
            ...prev[1].unassigned || [],
            ...rowsData.map((data) => ({ id: nextId(), ...data, status: "\uCD9C\uADFC", factory: 1 }))
          ]
        }
      }));
      setShowRegister(false);
    };
    const FactoryBtn = ({ value, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: () => setFactory(value),
        style: {
          padding: "6px 14px",
          fontSize: 13,
          borderRadius: 6,
          border: `0.5px solid ${factory === value ? COLORS.headDark : COLORS.border}`,
          background: factory === value ? COLORS.headDark : COLORS.card,
          color: factory === value ? "#fff" : COLORS.textPrimary,
          cursor: "pointer",
          fontWeight: factory === value ? 500 : 400
        },
        children: label
      }
    );
    const LangBtn = ({ value, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: () => setLang(value),
        style: {
          padding: "6px 12px",
          fontSize: 12,
          borderRadius: 6,
          border: `0.5px solid ${lang === value ? COLORS.headDark : COLORS.border}`,
          background: lang === value ? COLORS.headDark : "transparent",
          color: lang === value ? "#fff" : COLORS.textSecondary,
          cursor: "pointer",
          fontWeight: lang === value ? 500 : 400
        },
        children: label
      }
    );
    const TabBtn = ({ value, label, icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        onClick: () => setTab(value),
        style: {
          padding: "8px 4px",
          fontSize: 14,
          border: "none",
          borderBottom: `2px solid ${tab === value ? COLORS.headDark : "transparent"}`,
          background: "transparent",
          color: tab === value ? COLORS.textPrimary : COLORS.textSecondary,
          fontWeight: tab === value ? 500 : 400,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: icon }),
          label
        ]
      }
    );
    const LIST_GRID_COLUMNS = listEditing ? "18px 24px 36px 90px 1fr 130px 70px 1.2fr 110px 70px" : "36px 90px 1fr 130px 70px 1.2fr 110px";
    const listLocked = listEditing && editingListId !== null;
    const selectableIds = (0, import_react.useMemo)(
      () => new Set(filteredList.filter((e) => !e.isHead || e.headCountInFactory > 1).map((e) => e.id)),
      [filteredList]
    );
    const allSelected = selectableIds.size > 0 && [...selectableIds].every((id) => selectedListIds.has(id));
    const toggleSelectAll = () => {
      setSelectedListIds((prev) => {
        if (allSelected) return /* @__PURE__ */ new Set();
        return new Set(selectableIds);
      });
    };
    const toggleSelectOne = (id) => {
      setSelectedListIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };
    const handleDeleteSelected = () => {
      const entries = filteredList.filter((e) => selectedListIds.has(e.id));
      if (entries.length === 0) return;
      if (confirm(t(lang, "confirmDeleteSelected", entries.length))) {
        deleteListEntries(entries);
        setSelectedListIds(/* @__PURE__ */ new Set());
      }
    };
    const handleDeleteAll = () => {
      if (confirm(t(lang, "confirmDeleteAll"))) clearAllEmployees();
    };
    const handleExportData = () => {
      const blob = new Blob([JSON.stringify(org)], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quality-portal-data-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    const handleImportFile = (file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        let normalized = null;
        try {
          normalized = normalizeLoadedOrg(JSON.parse(String(reader.result)));
        } catch {
          normalized = null;
        }
        if (!normalized) {
          alert(t(lang, "importInvalidFile"));
          return;
        }
        if (!confirm(t(lang, "confirmImportData"))) return;
        setOrg(normalized);
        setSelectedListIds(/* @__PURE__ */ new Set());
        setEditingListId(null);
        alert(t(lang, "importSuccess"));
      };
      reader.readAsText(file);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LangContext.Provider, { value: langCtx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: COLORS.page, minHeight: "100%", fontFamily: "var(--font-sans, sans-serif)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { maxWidth: 1400, margin: "0 auto", padding: "20px 20px 40px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, flexWrap: "wrap", gap: 12 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 20, fontWeight: 500, color: COLORS.textPrimary }, children: t(lang, "appTitle") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }, children: todayStr(lang) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 6 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactoryBtn, { value: "all", label: t(lang, "all") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactoryBtn, { value: 1, label: t(lang, "factoryLabel", 1) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 6 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangBtn, { value: "ko", label: "\uD55C\uAD6D\uC5B4" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangBtn, { value: "vi", label: "Ti\u1EBFng Vi\u1EC7t" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 20, borderBottom: `0.5px solid ${COLORS.border}`, marginBottom: 18 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, { value: "dashboard", label: t(lang, "tabDashboard"), icon: "\u25A6" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, { value: "org", label: t(lang, "tabOrg"), icon: "\u{1F5C2}" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, { value: "list", label: t(lang, "tabList"), icon: "\u2261" })
        ] }),
        tab === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 12, marginBottom: 18 }, children: STATUS_OPTIONS.map((s) => {
            const meta = STATUS_META[s];
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 16px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: COLORS.textSecondary }, children: trStatus(s, lang) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: 26, fontWeight: 500, color: meta.color, marginTop: 4 }, children: [
                counts[s] || 0,
                t(lang, "personSuffix")
              ] })
            ] }, s);
          }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 18px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 15, fontWeight: 500, marginBottom: 12 }, children: t(lang, "detailStatus") }),
            notices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 13, color: COLORS.textMuted }, children: t(lang, "allNormal") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: notices.map((e) => {
              const meta = STATUS_META[e.status];
              const teamLabel = e.team === "\uBD80\uC11C\uC7A5" ? t(lang, "headTeamLabel") : trTeamTitle(e.team, lang);
              let detail = `${t(lang, "factoryLabel", e.factory)} \xB7 ${teamLabel}`;
              if (e.status !== "\uCD9C\uC0B0\uD734\uAC00" && e.note) detail += ` \xB7 ${t(lang, "reasonPrefix")}: ${e.note}`;
              if (e.status === "\uCD9C\uC0B0\uD734\uAC00" && e.returnDate) detail += ` \xB7 ${t(lang, "returnDatePrefix")}: ${e.returnDate}`;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 8,
                    background: meta.bg
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: meta.color, fontSize: 14, width: 16, textAlign: "center" }, children: meta.icon }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }, children: e.name }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 8 }, children: detail })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: e.status })
                  ]
                },
                e.id
              );
            }) })
          ] })
        ] }),
        tab === "org" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 28 }, children: (factory === "all" ? FACTORIES : [factory]).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactoryOrgPanel, { factory: f, data: org[f], setOrg }, f)) }),
        tab === "list" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: COLORS.card, border: `0.5px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 18px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: ["\uC804\uCCB4", ...STATUS_OPTIONS].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                onClick: () => setStatusFilter(s),
                style: {
                  padding: "5px 12px",
                  fontSize: 12,
                  borderRadius: 999,
                  border: `0.5px solid ${statusFilter === s ? COLORS.headDark : COLORS.border}`,
                  background: statusFilter === s ? COLORS.headDark : "transparent",
                  color: statusFilter === s ? "#fff" : COLORS.textSecondary,
                  cursor: "pointer"
                },
                children: s === "\uC804\uCCB4" ? t(lang, "all") : trStatus(s, lang)
              },
              s
            )) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  onClick: () => {
                    if (listLocked) return;
                    setEditingListId(null);
                    setShowRegister(true);
                  },
                  disabled: listLocked,
                  title: listLocked ? t(lang, "editDoneDisabledTitle") : void 0,
                  style: {
                    height: 30,
                    padding: "0 12px",
                    borderRadius: 6,
                    border: `0.5px solid ${COLORS.borderStrong}`,
                    background: COLORS.card,
                    color: COLORS.textPrimary,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: listLocked ? "not-allowed" : "pointer",
                    opacity: listLocked ? 0.65 : 1
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginRight: 4 }, "aria-hidden": "true", children: "+" }),
                    t(lang, "registerRow")
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  onClick: () => {
                    if (listLocked) return;
                    if (listEditing) setSelectedListIds(/* @__PURE__ */ new Set());
                    setListEditing((v) => !v);
                  },
                  disabled: listLocked,
                  title: listLocked ? t(lang, "editDoneDisabledTitle") : void 0,
                  style: {
                    height: 30,
                    padding: "0 12px",
                    borderRadius: 6,
                    border: `0.5px solid ${listEditing ? COLORS.headDark : COLORS.border}`,
                    background: listEditing ? COLORS.headDark : COLORS.card,
                    color: listEditing ? "#fff" : COLORS.textSecondary,
                    fontSize: 12,
                    cursor: listLocked ? "not-allowed" : "pointer",
                    opacity: listLocked ? 0.65 : 1,
                    fontWeight: 500
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", style: { marginRight: 4 }, children: "\u270E" }),
                    listEditing ? t(lang, "editDone") : t(lang, "edit")
                  ]
                }
              ),
              listEditing && selectedListIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: handleDeleteSelected,
                  style: {
                    height: 30,
                    padding: "0 12px",
                    borderRadius: 6,
                    border: `0.5px solid ${COLORS.danger}`,
                    background: COLORS.dangerBg,
                    color: COLORS.danger,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer"
                  },
                  children: t(lang, "deleteSelected", selectedListIds.size)
                }
              ),
              listEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: handleDeleteAll,
                  style: {
                    height: 30,
                    padding: "0 12px",
                    borderRadius: 6,
                    border: `0.5px solid ${COLORS.danger}`,
                    background: COLORS.card,
                    color: COLORS.danger,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer"
                  },
                  children: t(lang, "deleteAll")
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  onClick: handleExportData,
                  title: t(lang, "exportData"),
                  style: {
                    height: 30,
                    padding: "0 12px",
                    borderRadius: 6,
                    border: `0.5px solid ${COLORS.borderStrong}`,
                    background: COLORS.card,
                    color: COLORS.textPrimary,
                    fontSize: 12,
                    cursor: "pointer"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginRight: 4 }, "aria-hidden": "true", children: "\u21E9" }),
                    t(lang, "exportData")
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  onClick: () => importFileRef.current?.click(),
                  title: t(lang, "importData"),
                  style: {
                    height: 30,
                    padding: "0 12px",
                    borderRadius: 6,
                    border: `0.5px solid ${COLORS.borderStrong}`,
                    background: COLORS.card,
                    color: COLORS.textPrimary,
                    fontSize: 12,
                    cursor: "pointer"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginRight: 4 }, "aria-hidden": "true", children: "\u21E7" }),
                    t(lang, "importData")
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  ref: importFileRef,
                  type: "file",
                  accept: "application/json,.json",
                  style: { display: "none" },
                  onChange: (e) => {
                    handleImportFile(e.target.files?.[0]);
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: t(lang, "searchPlaceholder"),
                  style: { height: 30, padding: "0 10px", borderRadius: 6, border: `0.5px solid ${COLORS.border}`, fontSize: 12, width: 180, boxSizing: "border-box" }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: 12 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: COLORS.textMuted, marginBottom: listSummary.parts.length > 0 ? 6 : 0 }, children: t(lang, "totalCount", listSummary.total) }),
            listSummary.parts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: listSummary.parts.map((p) => {
              const tc = p.kind === "manager" ? tierColorsOf("Supervisor") : p.kind === "staff" ? tierColorsOf("Staff") : tierColorsOf("Inspector");
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "span",
                {
                  style: {
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: tc.bg,
                    color: tc.color,
                    border: `0.5px solid ${tc.border}`
                  },
                  children: [
                    p.label,
                    " ",
                    p.count,
                    t(lang, "personSuffix")
                  ]
                },
                p.label
              );
            }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: LIST_GRID_COLUMNS,
                  gap: 8,
                  fontSize: 11,
                  color: COLORS.textMuted,
                  padding: "0 10px 4px"
                },
                children: [
                  listEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
                  listEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "input",
                    {
                      type: "checkbox",
                      checked: allSelected,
                      onChange: toggleSelectAll,
                      style: { margin: 0 },
                      title: t(lang, "deleteSelected", selectedListIds.size)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { textAlign: "center" }, children: t(lang, "colPhoto") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, "colEmpNo") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, "colNameTeam") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, "colPosition") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, "colFactory") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, "colNote") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { textAlign: "right" }, children: t(lang, "colStatus") }),
                  listEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
                ]
              }
            ),
            filteredList.map((e) => {
              if (editingListId === e.id) {
                return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "2px 0" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  MemberForm,
                  {
                    initial: e,
                    isHead: e.isHead,
                    onCancel: () => setEditingListId(null),
                    onSave: (data) => {
                      updateListEntry(e, data);
                      setEditingListId(null);
                    }
                  }
                ) }, e.id);
              }
              const meta = STATUS_META[e.status];
              let note = "-";
              if (e.status === "\uCD9C\uC0B0\uD734\uAC00" && e.returnDate) note = `${t(lang, "returnDatePrefix")}: ${e.returnDate}`;
              else if (e.status !== "\uCD9C\uADFC" && e.note) note = `${t(lang, "reasonPrefix")}: ${e.note}`;
              const teamLabel = e.team === "\uBD80\uC11C\uC7A5" ? t(lang, "headTeamLabel") : trTeamTitle(e.team, lang);
              const canDelete = !e.isHead || e.headCountInFactory > 1;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  draggable: listEditing,
                  onDragStart: () => setDragRowId(e.id),
                  onDragOver: (ev) => {
                    if (!listEditing) return;
                    ev.preventDefault();
                    if (overRowId !== e.id) setOverRowId(e.id);
                  },
                  onDragLeave: () => setOverRowId((cur) => cur === e.id ? null : cur),
                  onDrop: (ev) => {
                    if (!listEditing) return;
                    ev.preventDefault();
                    moveListRow(dragRowId, e.id);
                    setDragRowId(null);
                    setOverRowId(null);
                  },
                  onDragEnd: () => {
                    setDragRowId(null);
                    setOverRowId(null);
                  },
                  style: {
                    display: "grid",
                    gridTemplateColumns: LIST_GRID_COLUMNS,
                    gap: 8,
                    alignItems: "center",
                    padding: "9px 10px",
                    borderRadius: 8,
                    background: e.status === "\uCD9C\uADFC" ? "#FAFAF8" : meta.bg,
                    borderLeft: `3px solid ${overRowId === e.id && dragRowId !== e.id ? COLORS.teal : meta.color}`,
                    opacity: dragRowId === e.id ? 0.5 : 1
                  },
                  children: [
                    listEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "span",
                      {
                        "aria-hidden": "true",
                        title: t(lang, "dragListRowTitle"),
                        style: { cursor: "grab", color: COLORS.textMuted, fontSize: 12, textAlign: "center" },
                        children: "\u283F"
                      }
                    ),
                    listEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "input",
                      {
                        type: "checkbox",
                        checked: selectedListIds.has(e.id),
                        disabled: !canDelete,
                        onChange: () => toggleSelectOne(e.id),
                        style: { margin: 0 }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", justifyContent: "center" }, children: listEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { cursor: "pointer", display: "block" }, title: t(lang, "uploadPhotoTitle"), children: [
                      e.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "img",
                        {
                          src: e.photo,
                          alt: "",
                          style: { width: 32, height: 32, borderRadius: "50%", objectFit: "cover", display: "block" }
                        }
                      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "div",
                        {
                          style: {
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: COLORS.page,
                            border: `0.5px dashed ${COLORS.borderStrong}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            color: COLORS.textMuted
                          },
                          children: "+"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "input",
                        {
                          type: "file",
                          accept: "image/*",
                          style: { display: "none" },
                          onChange: async (ev) => {
                            const file = ev.target.files?.[0];
                            if (!file) return;
                            try {
                              const dataUrl = await readImageAsDataUrl(file);
                              updateListEntry(e, { photo: dataUrl });
                            } catch {
                            }
                            ev.target.value = "";
                          }
                        }
                      )
                    ] }) : e.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "img",
                      {
                        src: e.photo,
                        alt: "",
                        style: { width: 32, height: 32, borderRadius: "50%", objectFit: "cover", display: "block" }
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 32, height: 32, borderRadius: "50%", background: COLORS.page } }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 12, color: COLORS.textSecondary }, children: e.empNo }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { minWidth: 0 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }, children: e.name }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: 11, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 5 }, children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: teamLabel }),
                        e.isUnassigned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "span",
                          {
                            style: {
                              fontSize: 10,
                              fontWeight: 500,
                              padding: "1px 6px",
                              borderRadius: 999,
                              color: COLORS.warning,
                              background: COLORS.warningBg,
                              border: `0.5px solid ${COLORS.warning}`
                            },
                            children: t(lang, "unassignedBadge")
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 12, color: COLORS.textSecondary }, children: e.position }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 12, color: COLORS.textSecondary }, children: t(lang, "factoryLabel", e.factory) }),
                    listEditing && e.status === "\uCD9C\uC0B0\uD734\uAC00" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 4, minWidth: 0 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 11, color: COLORS.textSecondary, whiteSpace: "nowrap" }, children: t(lang, "returnDatePrefix") }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "input",
                        {
                          type: "date",
                          value: e.returnDate || "",
                          min: "2000-01-01",
                          max: "2099-12-31",
                          onChange: (ev) => {
                            const v = ev.target.value;
                            if (v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return;
                            updateListEntry(e, { returnDate: v });
                          },
                          style: {
                            fontSize: 12,
                            padding: "2px 4px",
                            borderRadius: 4,
                            border: `0.5px solid ${COLORS.border}`,
                            color: COLORS.textPrimary,
                            background: COLORS.card,
                            minWidth: 0
                          }
                        }
                      )
                    ] }) : listEditing && e.status !== "\uCD9C\uADFC" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "input",
                      {
                        type: "text",
                        value: e.note || "",
                        placeholder: t(lang, "reasonPrefix"),
                        onChange: (ev) => updateListEntry(e, { note: ev.target.value }),
                        style: {
                          fontSize: 12,
                          padding: "3px 6px",
                          borderRadius: 4,
                          border: `0.5px solid ${COLORS.border}`,
                          color: COLORS.textPrimary,
                          background: COLORS.card,
                          width: "100%",
                          boxSizing: "border-box",
                          minWidth: 0
                        }
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 12, color: COLORS.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: note }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { textAlign: "right" }, children: listEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "select",
                      {
                        value: e.status,
                        onChange: (ev) => updateListEntry(e, { status: ev.target.value }),
                        title: t(lang, "colStatus"),
                        style: {
                          fontSize: 12,
                          fontWeight: 500,
                          padding: "3px 8px",
                          borderRadius: 6,
                          border: `0.5px solid ${meta.color}`,
                          background: meta.bg,
                          color: meta.color,
                          cursor: "pointer"
                        },
                        children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: s, children: trStatus(s, lang) }, s))
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: e.status }) }),
                    listEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 4, justifyContent: "flex-end" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, { title: t(lang, "memberEditTitle"), onClick: () => setEditingListId(e.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u270E" }) }),
                      canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        IconBtn,
                        {
                          title: t(lang, "memberDeleteTitle"),
                          danger: true,
                          onClick: () => {
                            const msg = e.isHead ? t(lang, "confirmDeleteHead", e.name) : t(lang, "confirmDeleteMember");
                            if (confirm(msg)) deleteListEntry(e);
                          },
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u{1F5D1}" })
                        }
                      )
                    ] })
                  ]
                },
                e.id
              );
            })
          ] })
        ] })
      ] }) }),
      showRegister && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        RegisterModal,
        {
          onClose: () => setShowRegister(false),
          onRegister: (rowsData) => {
            handleRegisterRows(rowsData);
            setTab("org");
          }
        }
      )
    ] });
  }

  // src/main.jsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  import_client.default.createRoot(document.getElementById("root")).render(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.default.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(QualityPortal, {}) })
  );
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
