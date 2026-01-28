#!/usr/bin/env node
import { createRequire } from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// ../../node_modules/@prisma/generator-helper/dist/chunk-KEYE2GFS.js
var require_chunk_KEYE2GFS = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var chunk_KEYE2GFS_exports = {};
  __export(chunk_KEYE2GFS_exports, {
    isErrorResponse: () => isErrorResponse
  });
  module.exports = __toCommonJS(chunk_KEYE2GFS_exports);
  function isErrorResponse(response) {
    return response.error !== undefined;
  }
});

// ../../node_modules/@prisma/generator-helper/dist/chunk-QGM4M3NI.js
var require_chunk_QGM4M3NI = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var chunk_QGM4M3NI_exports = {};
  __export(chunk_QGM4M3NI_exports, {
    __commonJS: () => __commonJS2,
    __require: () => __require2,
    __toESM: () => __toESM2
  });
  module.exports = __toCommonJS(chunk_QGM4M3NI_exports);
  var __create2 = Object.create;
  var __defProp22 = Object.defineProperty;
  var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames22 = Object.getOwnPropertyNames;
  var __getProtoOf2 = Object.getPrototypeOf;
  var __hasOwnProp22 = Object.prototype.hasOwnProperty;
  var __require2 = /* @__PURE__ */ ((x) => __require)(function(x) {
    if (true)
      return __require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS2 = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames22(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps2 = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames22(from))
        if (!__hasOwnProp22.call(to, key) && key !== except)
          __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp22(target, "default", { value: mod, enumerable: true }) : target, mod));
});

// ../../node_modules/@prisma/debug/dist/index.js
var require_dist = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var index_exports = {};
  __export(index_exports, {
    Debug: () => Debug,
    clearLogs: () => clearLogs,
    default: () => index_default,
    getLogs: () => getLogs
  });
  module.exports = __toCommonJS(index_exports);
  var colors_exports = {};
  __export(colors_exports, {
    $: () => $,
    bgBlack: () => bgBlack,
    bgBlue: () => bgBlue,
    bgCyan: () => bgCyan,
    bgGreen: () => bgGreen,
    bgMagenta: () => bgMagenta,
    bgRed: () => bgRed,
    bgWhite: () => bgWhite,
    bgYellow: () => bgYellow,
    black: () => black,
    blue: () => blue,
    bold: () => bold,
    cyan: () => cyan,
    dim: () => dim,
    gray: () => gray,
    green: () => green,
    grey: () => grey,
    hidden: () => hidden,
    inverse: () => inverse,
    italic: () => italic,
    magenta: () => magenta,
    red: () => red,
    reset: () => reset,
    strikethrough: () => strikethrough,
    underline: () => underline,
    white: () => white,
    yellow: () => yellow
  });
  var FORCE_COLOR;
  var NODE_DISABLE_COLORS;
  var NO_COLOR;
  var TERM;
  var isTTY = true;
  if (typeof process !== "undefined") {
    ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
    isTTY = process.stdout && process.stdout.isTTY;
  }
  var $ = {
    enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
  };
  function init(x, y) {
    let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
    let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
    return function(txt) {
      if (!$.enabled || txt == null)
        return txt;
      return open + (~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
    };
  }
  var reset = init(0, 0);
  var bold = init(1, 22);
  var dim = init(2, 22);
  var italic = init(3, 23);
  var underline = init(4, 24);
  var inverse = init(7, 27);
  var hidden = init(8, 28);
  var strikethrough = init(9, 29);
  var black = init(30, 39);
  var red = init(31, 39);
  var green = init(32, 39);
  var yellow = init(33, 39);
  var blue = init(34, 39);
  var magenta = init(35, 39);
  var cyan = init(36, 39);
  var white = init(37, 39);
  var gray = init(90, 39);
  var grey = init(90, 39);
  var bgBlack = init(40, 49);
  var bgRed = init(41, 49);
  var bgGreen = init(42, 49);
  var bgYellow = init(43, 49);
  var bgBlue = init(44, 49);
  var bgMagenta = init(45, 49);
  var bgCyan = init(46, 49);
  var bgWhite = init(47, 49);
  var MAX_ARGS_HISTORY = 100;
  var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
  var argsHistory = [];
  var lastTimestamp = Date.now();
  var lastColor = 0;
  var processEnv = typeof process !== "undefined" ? process.env : {};
  globalThis.DEBUG ??= processEnv.DEBUG ?? "";
  globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
  var topProps = {
    enable(namespace) {
      if (typeof namespace === "string") {
        globalThis.DEBUG = namespace;
      }
    },
    disable() {
      const prev = globalThis.DEBUG;
      globalThis.DEBUG = "";
      return prev;
    },
    enabled(namespace) {
      const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
        return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
      });
      const isListened = listenedNamespaces.some((listenedNamespace) => {
        if (listenedNamespace === "" || listenedNamespace[0] === "-")
          return false;
        return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
      });
      const isExcluded = listenedNamespaces.some((listenedNamespace) => {
        if (listenedNamespace === "" || listenedNamespace[0] !== "-")
          return false;
        return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
      });
      return isListened && !isExcluded;
    },
    log: (...args) => {
      const [namespace, format, ...rest] = args;
      const logWithFormatting = console.warn ?? console.log;
      logWithFormatting(`${namespace} ${format}`, ...rest);
    },
    formatters: {}
  };
  function debugCreate(namespace) {
    const instanceProps = {
      color: COLORS[lastColor++ % COLORS.length],
      enabled: topProps.enabled(namespace),
      namespace,
      log: topProps.log,
      extend: () => {
      }
    };
    const debugCall = (...args) => {
      const { enabled, namespace: namespace2, color, log } = instanceProps;
      if (args.length !== 0) {
        argsHistory.push([namespace2, ...args]);
      }
      if (argsHistory.length > MAX_ARGS_HISTORY) {
        argsHistory.shift();
      }
      if (topProps.enabled(namespace2) || enabled) {
        const stringArgs = args.map((arg) => {
          if (typeof arg === "string") {
            return arg;
          }
          return safeStringify(arg);
        });
        const ms = `+${Date.now() - lastTimestamp}ms`;
        lastTimestamp = Date.now();
        if (globalThis.DEBUG_COLORS) {
          log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
        } else {
          log(namespace2, ...stringArgs, ms);
        }
      }
    };
    return new Proxy(debugCall, {
      get: (_, prop) => instanceProps[prop],
      set: (_, prop, value) => instanceProps[prop] = value
    });
  }
  var Debug = new Proxy(debugCreate, {
    get: (_, prop) => topProps[prop],
    set: (_, prop, value) => topProps[prop] = value
  });
  function safeStringify(value, indent = 2) {
    const cache = /* @__PURE__ */ new Set;
    return JSON.stringify(value, (key, value2) => {
      if (typeof value2 === "object" && value2 !== null) {
        if (cache.has(value2)) {
          return `[Circular *]`;
        }
        cache.add(value2);
      } else if (typeof value2 === "bigint") {
        return value2.toString();
      }
      return value2;
    }, indent);
  }
  function getLogs(numChars = 7500) {
    const logs = argsHistory.map(([namespace, ...args]) => {
      return `${namespace} ${args.map((arg) => {
        if (typeof arg === "string") {
          return arg;
        } else {
          return JSON.stringify(arg);
        }
      }).join(" ")}`;
    }).join(`
`);
    if (logs.length < numChars) {
      return logs;
    }
    return logs.slice(-numChars);
  }
  function clearLogs() {
    argsHistory.length = 0;
  }
  var index_default = Debug;
});

// ../../node_modules/@prisma/generator-helper/dist/chunk-UMIHM3GW.js
var require_chunk_UMIHM3GW = __commonJS((exports, module) => {
  var __create2 = Object.create;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __getProtoOf2 = Object.getPrototypeOf;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var chunk_UMIHM3GW_exports = {};
  __export(chunk_UMIHM3GW_exports, {
    GeneratorError: () => GeneratorError,
    GeneratorProcess: () => GeneratorProcess
  });
  module.exports = __toCommonJS(chunk_UMIHM3GW_exports);
  var import_chunk_KEYE2GFS = require_chunk_KEYE2GFS();
  var import_chunk_QGM4M3NI = require_chunk_QGM4M3NI();
  var import_node_child_process = __require("node:child_process");
  var import_node_readline = __toESM2(__require("node:readline"));
  var import_debug = require_dist();
  var require_windows = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports2, module2) {
      module2.exports = isexe;
      isexe.sync = sync;
      var fs = (0, import_chunk_QGM4M3NI.__require)("fs");
      function checkPathExt(path, options) {
        var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
        if (!pathext) {
          return true;
        }
        pathext = pathext.split(";");
        if (pathext.indexOf("") !== -1) {
          return true;
        }
        for (var i = 0;i < pathext.length; i++) {
          var p = pathext[i].toLowerCase();
          if (p && path.substr(-p.length).toLowerCase() === p) {
            return true;
          }
        }
        return false;
      }
      function checkStat(stat, path, options) {
        if (!stat.isSymbolicLink() && !stat.isFile()) {
          return false;
        }
        return checkPathExt(path, options);
      }
      function isexe(path, options, cb) {
        fs.stat(path, function(er, stat) {
          cb(er, er ? false : checkStat(stat, path, options));
        });
      }
      function sync(path, options) {
        return checkStat(fs.statSync(path), path, options);
      }
    }
  });
  var require_mode = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports2, module2) {
      module2.exports = isexe;
      isexe.sync = sync;
      var fs = (0, import_chunk_QGM4M3NI.__require)("fs");
      function isexe(path, options, cb) {
        fs.stat(path, function(er, stat) {
          cb(er, er ? false : checkStat(stat, options));
        });
      }
      function sync(path, options) {
        return checkStat(fs.statSync(path), options);
      }
      function checkStat(stat, options) {
        return stat.isFile() && checkMode(stat, options);
      }
      function checkMode(stat, options) {
        var mod = stat.mode;
        var uid = stat.uid;
        var gid = stat.gid;
        var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
        var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();
        var u = parseInt("100", 8);
        var g = parseInt("010", 8);
        var o = parseInt("001", 8);
        var ug = u | g;
        var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
        return ret;
      }
    }
  });
  var require_isexe = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports2, module2) {
      var fs = (0, import_chunk_QGM4M3NI.__require)("fs");
      var core;
      if (process.platform === "win32" || global.TESTING_WINDOWS) {
        core = require_windows();
      } else {
        core = require_mode();
      }
      module2.exports = isexe;
      isexe.sync = sync;
      function isexe(path, options, cb) {
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (!cb) {
          if (typeof Promise !== "function") {
            throw new TypeError("callback not provided");
          }
          return new Promise(function(resolve, reject) {
            isexe(path, options || {}, function(er, is) {
              if (er) {
                reject(er);
              } else {
                resolve(is);
              }
            });
          });
        }
        core(path, options || {}, function(er, is) {
          if (er) {
            if (er.code === "EACCES" || options && options.ignoreErrors) {
              er = null;
              is = false;
            }
          }
          cb(er, is);
        });
      }
      function sync(path, options) {
        try {
          return core.sync(path, options || {});
        } catch (er) {
          if (options && options.ignoreErrors || er.code === "EACCES") {
            return false;
          } else {
            throw er;
          }
        }
      }
    }
  });
  var require_which = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js"(exports2, module2) {
      var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
      var path = (0, import_chunk_QGM4M3NI.__require)("path");
      var COLON = isWindows ? ";" : ":";
      var isexe = require_isexe();
      var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
      var getPathInfo = (cmd, opt) => {
        const colon = opt.colon || COLON;
        const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
          ...isWindows ? [process.cwd()] : [],
          ...(opt.path || process.env.PATH || "").split(colon)
        ];
        const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
        const pathExt = isWindows ? pathExtExe.split(colon) : [""];
        if (isWindows) {
          if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
            pathExt.unshift("");
        }
        return {
          pathEnv,
          pathExt,
          pathExtExe
        };
      };
      var which = (cmd, opt, cb) => {
        if (typeof opt === "function") {
          cb = opt;
          opt = {};
        }
        if (!opt)
          opt = {};
        const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
        const found = [];
        const step = (i) => new Promise((resolve, reject) => {
          if (i === pathEnv.length)
            return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
          const ppRaw = pathEnv[i];
          const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
          const pCmd = path.join(pathPart, cmd);
          const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          resolve(subStep(p, i, 0));
        });
        const subStep = (p, i, ii) => new Promise((resolve, reject) => {
          if (ii === pathExt.length)
            return resolve(step(i + 1));
          const ext = pathExt[ii];
          isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
            if (!er && is) {
              if (opt.all)
                found.push(p + ext);
              else
                return resolve(p + ext);
            }
            return resolve(subStep(p, i, ii + 1));
          });
        });
        return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
      };
      var whichSync = (cmd, opt) => {
        opt = opt || {};
        const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
        const found = [];
        for (let i = 0;i < pathEnv.length; i++) {
          const ppRaw = pathEnv[i];
          const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
          const pCmd = path.join(pathPart, cmd);
          const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          for (let j = 0;j < pathExt.length; j++) {
            const cur = p + pathExt[j];
            try {
              const is = isexe.sync(cur, { pathExt: pathExtExe });
              if (is) {
                if (opt.all)
                  found.push(cur);
                else
                  return cur;
              }
            } catch (ex) {
            }
          }
        }
        if (opt.all && found.length)
          return found;
        if (opt.nothrow)
          return null;
        throw getNotFoundError(cmd);
      };
      module2.exports = which;
      which.sync = whichSync;
    }
  });
  var require_path_key = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js"(exports2, module2) {
      var pathKey = (options = {}) => {
        const environment = options.env || process.env;
        const platform = options.platform || process.platform;
        if (platform !== "win32") {
          return "PATH";
        }
        return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
      };
      module2.exports = pathKey;
      module2.exports.default = pathKey;
    }
  });
  var require_resolveCommand = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/resolveCommand.js"(exports2, module2) {
      var path = (0, import_chunk_QGM4M3NI.__require)("path");
      var which = require_which();
      var getPathKey = require_path_key();
      function resolveCommandAttempt(parsed, withoutPathExt) {
        const env = parsed.options.env || process.env;
        const cwd = process.cwd();
        const hasCustomCwd = parsed.options.cwd != null;
        const shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;
        if (shouldSwitchCwd) {
          try {
            process.chdir(parsed.options.cwd);
          } catch (err) {
          }
        }
        let resolved;
        try {
          resolved = which.sync(parsed.command, {
            path: env[getPathKey({ env })],
            pathExt: withoutPathExt ? path.delimiter : undefined
          });
        } catch (e) {
        } finally {
          if (shouldSwitchCwd) {
            process.chdir(cwd);
          }
        }
        if (resolved) {
          resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
        }
        return resolved;
      }
      function resolveCommand(parsed) {
        return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
      }
      module2.exports = resolveCommand;
    }
  });
  var require_escape = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/escape.js"(exports2, module2) {
      var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
      function escapeCommand(arg) {
        arg = arg.replace(metaCharsRegExp, "^$1");
        return arg;
      }
      function escapeArgument(arg, doubleEscapeMetaChars) {
        arg = `${arg}`;
        arg = arg.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\"");
        arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
        arg = `"${arg}"`;
        arg = arg.replace(metaCharsRegExp, "^$1");
        if (doubleEscapeMetaChars) {
          arg = arg.replace(metaCharsRegExp, "^$1");
        }
        return arg;
      }
      module2.exports.command = escapeCommand;
      module2.exports.argument = escapeArgument;
    }
  });
  var require_shebang_regex = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js"(exports2, module2) {
      module2.exports = /^#!(.*)/;
    }
  });
  var require_shebang_command = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js"(exports2, module2) {
      var shebangRegex = require_shebang_regex();
      module2.exports = (string = "") => {
        const match = string.match(shebangRegex);
        if (!match) {
          return null;
        }
        const [path, argument] = match[0].replace(/#! ?/, "").split(" ");
        const binary = path.split("/").pop();
        if (binary === "env") {
          return argument;
        }
        return argument ? `${binary} ${argument}` : binary;
      };
    }
  });
  var require_readShebang = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/readShebang.js"(exports2, module2) {
      var fs = (0, import_chunk_QGM4M3NI.__require)("fs");
      var shebangCommand = require_shebang_command();
      function readShebang(command) {
        const size = 150;
        const buffer = Buffer.alloc(size);
        let fd;
        try {
          fd = fs.openSync(command, "r");
          fs.readSync(fd, buffer, 0, size, 0);
          fs.closeSync(fd);
        } catch (e) {
        }
        return shebangCommand(buffer.toString());
      }
      module2.exports = readShebang;
    }
  });
  var require_parse = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/parse.js"(exports2, module2) {
      var path = (0, import_chunk_QGM4M3NI.__require)("path");
      var resolveCommand = require_resolveCommand();
      var escape = require_escape();
      var readShebang = require_readShebang();
      var isWin = process.platform === "win32";
      var isExecutableRegExp = /\.(?:com|exe)$/i;
      var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
      function detectShebang(parsed) {
        parsed.file = resolveCommand(parsed);
        const shebang = parsed.file && readShebang(parsed.file);
        if (shebang) {
          parsed.args.unshift(parsed.file);
          parsed.command = shebang;
          return resolveCommand(parsed);
        }
        return parsed.file;
      }
      function parseNonShell(parsed) {
        if (!isWin) {
          return parsed;
        }
        const commandFile = detectShebang(parsed);
        const needsShell = !isExecutableRegExp.test(commandFile);
        if (parsed.options.forceShell || needsShell) {
          const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
          parsed.command = path.normalize(parsed.command);
          parsed.command = escape.command(parsed.command);
          parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
          const shellCommand = [parsed.command].concat(parsed.args).join(" ");
          parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
          parsed.command = process.env.comspec || "cmd.exe";
          parsed.options.windowsVerbatimArguments = true;
        }
        return parsed;
      }
      function parse(command, args, options) {
        if (args && !Array.isArray(args)) {
          options = args;
          args = null;
        }
        args = args ? args.slice(0) : [];
        options = Object.assign({}, options);
        const parsed = {
          command,
          args,
          options,
          file: undefined,
          original: {
            command,
            args
          }
        };
        return options.shell ? parsed : parseNonShell(parsed);
      }
      module2.exports = parse;
    }
  });
  var require_enoent = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/enoent.js"(exports2, module2) {
      var isWin = process.platform === "win32";
      function notFoundError(original, syscall) {
        return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
          code: "ENOENT",
          errno: "ENOENT",
          syscall: `${syscall} ${original.command}`,
          path: original.command,
          spawnargs: original.args
        });
      }
      function hookChildProcess(cp, parsed) {
        if (!isWin) {
          return;
        }
        const originalEmit = cp.emit;
        cp.emit = function(name, arg1) {
          if (name === "exit") {
            const err = verifyENOENT(arg1, parsed);
            if (err) {
              return originalEmit.call(cp, "error", err);
            }
          }
          return originalEmit.apply(cp, arguments);
        };
      }
      function verifyENOENT(status, parsed) {
        if (isWin && status === 1 && !parsed.file) {
          return notFoundError(parsed.original, "spawn");
        }
        return null;
      }
      function verifyENOENTSync(status, parsed) {
        if (isWin && status === 1 && !parsed.file) {
          return notFoundError(parsed.original, "spawnSync");
        }
        return null;
      }
      module2.exports = {
        hookChildProcess,
        verifyENOENT,
        verifyENOENTSync,
        notFoundError
      };
    }
  });
  var require_cross_spawn = (0, import_chunk_QGM4M3NI.__commonJS)({
    "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/index.js"(exports2, module2) {
      var cp = (0, import_chunk_QGM4M3NI.__require)("child_process");
      var parse = require_parse();
      var enoent = require_enoent();
      function spawn2(command, args, options) {
        const parsed = parse(command, args, options);
        const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
        enoent.hookChildProcess(spawned, parsed);
        return spawned;
      }
      function spawnSync(command, args, options) {
        const parsed = parse(command, args, options);
        const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
        result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
        return result;
      }
      module2.exports = spawn2;
      module2.exports.spawn = spawn2;
      module2.exports.sync = spawnSync;
      module2.exports._parse = parse;
      module2.exports._enoent = enoent;
    }
  });
  var import_cross_spawn = (0, import_chunk_QGM4M3NI.__toESM)(require_cross_spawn());
  var FORCE_COLOR;
  var NODE_DISABLE_COLORS;
  var NO_COLOR;
  var TERM;
  var isTTY = true;
  if (typeof process !== "undefined") {
    ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
    isTTY = process.stdout && process.stdout.isTTY;
  }
  var $ = {
    enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
  };
  function init(x, y) {
    let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
    let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
    return function(txt) {
      if (!$.enabled || txt == null)
        return txt;
      return open + (~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
    };
  }
  var reset = init(0, 0);
  var bold = init(1, 22);
  var dim = init(2, 22);
  var italic = init(3, 23);
  var underline = init(4, 24);
  var inverse = init(7, 27);
  var hidden = init(8, 28);
  var strikethrough = init(9, 29);
  var black = init(30, 39);
  var red = init(31, 39);
  var green = init(32, 39);
  var yellow = init(33, 39);
  var blue = init(34, 39);
  var magenta = init(35, 39);
  var cyan = init(36, 39);
  var white = init(37, 39);
  var gray = init(90, 39);
  var grey = init(90, 39);
  var bgBlack = init(40, 49);
  var bgRed = init(41, 49);
  var bgGreen = init(42, 49);
  var bgYellow = init(43, 49);
  var bgBlue = init(44, 49);
  var bgMagenta = init(45, 49);
  var bgCyan = init(46, 49);
  var bgWhite = init(47, 49);
  var debug = (0, import_debug.Debug)("prisma:GeneratorProcess");
  var globalMessageId = 1;
  var GeneratorError = class extends Error {
    constructor(message, code, data) {
      super(message);
      this.code = code;
      this.data = data;
      if (data?.stack) {
        this.stack = data.stack;
      }
    }
    name = "GeneratorError";
  };
  var GeneratorProcess = class {
    constructor(pathOrCommand, { isNode = false } = {}) {
      this.pathOrCommand = pathOrCommand;
      this.isNode = isNode;
    }
    child;
    handlers = {};
    initPromise;
    isNode;
    errorLogs = "";
    pendingError;
    exited = false;
    async init() {
      if (!this.initPromise) {
        this.initPromise = this.initSingleton();
      }
      return this.initPromise;
    }
    initSingleton() {
      return new Promise((resolve, reject) => {
        if (this.isNode) {
          this.child = (0, import_node_child_process.fork)(this.pathOrCommand, [], {
            stdio: ["pipe", "inherit", "pipe", "ipc"],
            env: {
              ...process.env,
              PRISMA_GENERATOR_INVOCATION: "true"
            },
            execArgv: ["--max-old-space-size=8096"]
          });
        } else {
          this.child = (0, import_cross_spawn.spawn)(this.pathOrCommand, {
            stdio: ["pipe", "inherit", "pipe"],
            env: {
              ...process.env,
              PRISMA_GENERATOR_INVOCATION: "true"
            },
            shell: true
          });
        }
        this.child.on("exit", (code, signal) => {
          debug(`child exited with code ${code} on signal ${signal}`);
          this.exited = true;
          if (code) {
            const error = new GeneratorError(`Generator ${JSON.stringify(this.pathOrCommand)} failed:

${this.errorLogs}`);
            this.pendingError = error;
            this.rejectAllHandlers(error);
          }
        });
        this.child.stdin.on("error", () => {
        });
        this.child.on("error", (error) => {
          debug(error);
          this.pendingError = error;
          if (error.code === "EACCES") {
            reject(new Error(`The executable at ${this.pathOrCommand} lacks the right permissions. Please use ${bold(`chmod +x ${this.pathOrCommand}`)}`));
          } else {
            reject(error);
          }
          this.rejectAllHandlers(error);
        });
        const stderrInterface = import_node_readline.default.createInterface({
          input: this.child.stderr,
          crlfDelay: Infinity
        });
        stderrInterface.on("line", (line) => {
          let data;
          try {
            data = JSON.parse(line);
          } catch (e) {
            this.errorLogs += line + `
`;
            debug(line);
          }
          if (data) {
            this.handleResponse(data);
          }
        });
        this.child.on("spawn", resolve);
      });
    }
    rejectAllHandlers(error) {
      for (const id of Object.keys(this.handlers)) {
        this.handlers[id].reject(error);
        delete this.handlers[id];
      }
    }
    handleResponse(data) {
      if (data.jsonrpc && data.id) {
        if (typeof data.id !== "number") {
          throw new Error(`message.id has to be a number. Found value ${data.id}`);
        }
        if (this.handlers[data.id]) {
          if ((0, import_chunk_KEYE2GFS.isErrorResponse)(data)) {
            const error = new GeneratorError(data.error.message, data.error.code, data.error.data);
            this.handlers[data.id].reject(error);
          } else {
            this.handlers[data.id].resolve(data.result);
          }
          delete this.handlers[data.id];
        }
      }
    }
    sendMessage(message, callback) {
      if (!this.child) {
        callback(new GeneratorError("Generator process has not started yet"));
        return;
      }
      if (!this.child.stdin.writable) {
        callback(new GeneratorError("Cannot send data to the generator process, process already exited"));
        return;
      }
      this.child.stdin.write(JSON.stringify(message) + `
`, (error) => {
        if (!error) {
          return callback();
        }
        if (error.code === "EPIPE") {
          return callback();
        }
        callback(error);
      });
    }
    getMessageId() {
      return globalMessageId++;
    }
    stop() {
      if (this.child && !this.child?.killed) {
        this.child.kill("SIGTERM");
        const timeoutMs = 2000;
        const intervalMs = 200;
        let interval;
        let timeout;
        Promise.race([
          new Promise((resolve) => {
            timeout = setTimeout(resolve, timeoutMs);
          }),
          new Promise((resolve) => {
            interval = setInterval(() => {
              if (this.exited) {
                return resolve("exited");
              }
            }, intervalMs);
          })
        ]).then((result) => {
          if (result !== "exited") {
            this.child?.kill("SIGKILL");
          }
        }).finally(() => {
          clearInterval(interval);
          clearTimeout(timeout);
        });
      }
    }
    rpcMethod(method, mapResult = (x) => x) {
      return (params) => new Promise((resolve, reject) => {
        if (this.pendingError) {
          reject(this.pendingError);
          return;
        }
        const messageId = this.getMessageId();
        this.handlers[messageId] = {
          resolve: (result) => resolve(mapResult(result)),
          reject
        };
        this.sendMessage({
          jsonrpc: "2.0",
          method,
          params,
          id: messageId
        }, (error) => {
          if (error)
            reject(error);
        });
      });
    }
    getManifest = this.rpcMethod("getManifest", (result) => result.manifest ?? null);
    generate = this.rpcMethod("generate");
  };
});

// ../../node_modules/@prisma/generator-helper/dist/chunk-AWUR6KKS.js
var require_chunk_AWUR6KKS = __commonJS((exports, module) => {
  var __create2 = Object.create;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __getProtoOf2 = Object.getPrototypeOf;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var chunk_AWUR6KKS_exports = {};
  __export(chunk_AWUR6KKS_exports, {
    generatorHandler: () => generatorHandler
  });
  module.exports = __toCommonJS(chunk_AWUR6KKS_exports);
  var import_node_readline = __toESM2(__require("node:readline"));
  function generatorHandler(handler) {
    const stdinInterface = import_node_readline.default.createInterface({
      input: process.stdin,
      crlfDelay: Infinity
    });
    stdinInterface.on("line", async (line) => {
      const json = JSON.parse(line);
      if (json.method === "generate" && json.params) {
        try {
          const result = await handler.onGenerate(json.params);
          respond({
            jsonrpc: "2.0",
            result,
            id: json.id
          });
        } catch (_e) {
          const e = _e;
          respond({
            jsonrpc: "2.0",
            error: {
              code: -32000,
              message: e.message,
              data: {
                stack: e.stack
              }
            },
            id: json.id
          });
        }
      }
      if (json.method === "getManifest") {
        if (handler.onManifest) {
          try {
            const manifest = await handler.onManifest(json.params);
            respond({
              jsonrpc: "2.0",
              result: {
                manifest
              },
              id: json.id
            });
          } catch (_e) {
            const e = _e;
            respond({
              jsonrpc: "2.0",
              error: {
                code: -32000,
                message: e.message,
                data: {
                  stack: e.stack
                }
              },
              id: json.id
            });
          }
        } else {
          respond({
            jsonrpc: "2.0",
            result: {
              manifest: null
            },
            id: json.id
          });
        }
      }
    });
    process.stdin.resume();
  }
  function respond(response) {
    process.stderr.write(JSON.stringify(response) + `
`);
  }
});

// ../../node_modules/@prisma/generator-helper/dist/index.js
var require_dist2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var index_exports = {};
  __export(index_exports, {
    GeneratorError: () => import_chunk_UMIHM3GW.GeneratorError,
    GeneratorProcess: () => import_chunk_UMIHM3GW.GeneratorProcess,
    generatorHandler: () => import_chunk_AWUR6KKS.generatorHandler
  });
  module.exports = __toCommonJS(index_exports);
  var import_chunk_UMIHM3GW = require_chunk_UMIHM3GW();
  var import_chunk_AWUR6KKS = require_chunk_AWUR6KKS();
  var import_chunk_KEYE2GFS = require_chunk_KEYE2GFS();
  var import_chunk_QGM4M3NI = require_chunk_QGM4M3NI();
});

// package.json
var require_package = __commonJS((exports, module) => {
  module.exports = {
    private: true,
    version: "1.0.1",
    name: "@portfolio/prisma-markdown",
    type: "module",
    types: "./dist/index.d.ts",
    exports: {
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.js",
        require: "./dist/index.js"
      }
    },
    main: "./dist/index.js",
    scripts: {
      build: "bun run build:js && bun run build:types",
      "build:js": "bun build ./src/index.ts --outdir dist --target node --format esm && bun build ./cmd/main.ts --outfile dist/cmd/main.js --target node --format esm && chmod +x dist/cmd/main.js",
      "build:types": "git clean -xdf .cache/tsbuildinfo.json && tsc --emitDeclarationOnly --declaration --outDir dist",
      "clean:cache": "git clean -xdf .cache .turbo",
      "clean:pkg": "git clean -xdf node_modules dist",
      dev: "bun run build:js --watch",
      fmt: "biome format --write .",
      "fmt:check": "biome format .",
      lint: "biome lint .",
      "lint:fix": "biome lint --write .",
      typecheck: "tsc --noEmit"
    },
    dependencies: {
      "@prisma/generator-helper": "7.3.0"
    },
    devDependencies: {
      "@portfolio/biome-config": "workspace:*",
      "@portfolio/tsconfig": "workspace:*",
      "@types/node": "25.0.3",
      typescript: "5.9.3"
    },
    bin: {
      "prisma-markdown": "./dist/cmd/main.js"
    }
  };
});

// cmd/main.ts
var import_generator_helper = __toESM(require_dist2(), 1);
import * as fs from "node:fs";
import * as path from "node:path";

// src/utils/map.ts
var map;
((map) => {
  map.take = (dict) => (key, generator) => {
    const oldbie = dict.get(key);
    if (oldbie)
      return oldbie;
    const value = generator();
    dict.set(key, value);
    return value;
  };
})(map ||= {});

// src/utils/prisma.ts
var prisma;
((prisma) => {
  prisma.tagValues = (kind) => (model) => {
    if (!model.documentation?.length)
      return [];
    const output = [];
    const splitted = model.documentation.split(`\r
`).join(`
`).split(`
`);
    for (const line of splitted) {
      const first = line.indexOf(`@${kind} `);
      if (first === -1)
        continue;
      output.push(line.slice(first + kind.length + 2).trim());
    }
    return output.map((str) => str.trim()).filter((str) => !!str.length);
  };
})(prisma ||= {});

// src/writers/description.ts
var description;
((description) => {
  description.table = (model) => {
    const description2 = writeDescription(model);
    return [
      `### \`${model.dbName ?? model.name}\``,
      ...description2.length ? ["", description2] : [],
      "",
      "Properties as follows:",
      "",
      ...model.fields.filter((f) => f.kind !== "object").map(writeField)
    ].join(`
`);
  };
  const writeField = (field) => {
    const description2 = writeDescription(field);
    const lines = description2.split(`
`);
    const head = `- \`${field.dbName ?? field.name}\``;
    if (lines.length === 0)
      return head.trimEnd();
    else if (lines.length === 1)
      return `${head}: ${lines[0]}`.trimEnd();
    return [head, ...lines.map((line) => `  > ${line}`.trimEnd())].join(`
`);
  };
  const writeDescription = (target) => {
    const content = (target.documentation ?? "").split(`\r
`).join(`
`).split(`
`);
    let first = 0;
    let last = content.length - 1;
    const empty = (str) => str.trim() === "" || str.trim().startsWith("@");
    while (first < content.length && content[first] !== undefined && empty(content[first]))
      ++first;
    while (last >= 0 && content[last] !== undefined && empty(content[last]))
      --last;
    const summary = prisma.tagValues("summary")(target);
    const body = content.slice(first, last + 1).map(replaceLinks);
    if (summary.length > 0) {
      const summaryFirst = summary[0];
      if (summaryFirst === undefined) {
        return body.join(`
`);
      }
      if (body.length > 0) {
        return [summaryFirst, "", ...body].join(`
`);
      }
      return summaryFirst;
    }
    return body.join(`
`);
  };
  const replaceLinks = (content) => {
    const rejoined = [];
    let i = 0;
    while (true) {
      const first = content.indexOf("{@link ", i);
      if (first === -1)
        break;
      const last = content.indexOf("}", first + 7);
      if (last === -1)
        break;
      const part = content.slice(first + 7, last).trim();
      const space = part.indexOf(" ");
      rejoined.push(content.slice(i, first));
      if (space === -1)
        rejoined.push(`[${part}](#${part.split(".")[0]})`);
      else
        rejoined.push(`[${part.slice(space + 1)}](#${part.slice(0, space).split(".")[0]})`);
      i = last + 1;
    }
    rejoined.push(content.slice(i));
    return rejoined.join("");
  };
})(description ||= {});

// src/utils/field.ts
var field = (field2, isFK) => {
  return new Field(field2, isFK);
};

class Field {
  field;
  isFK;
  constructor(field2, isFK) {
    this.field = field2;
    this.isFK = isFK;
  }
  format(formatString) {
    if (!formatString)
      return this.field.type;
    const data = this.data();
    return formatString.replaceAll(/[tsdnkr]/g, (match) => {
      switch (match) {
        case "t":
          return this.field.type;
        case "s":
          return `${data.size ?? ""}`;
        case "d":
          return data.nativeType || this.field.type;
        case "n":
          return data.name;
        case "k":
          return `${data.constraint ?? ""}`;
        case "r":
          return data.nullable ? `"nullable"` : "";
        default:
          return "";
      }
    });
  }
  data() {
    const spec = {
      type: "",
      name: "",
      format: null,
      nativeType: null,
      size: null,
      constraint: null,
      nullable: false
    };
    spec.type = this.field.type;
    if (prisma.tagValues("format")(this.field).length > 0) {
      spec["format"] = prisma.tagValues("format")(this.field)[0] ?? null;
    }
    spec["nativeType"] = this.field.nativeType?.[0] ?? null;
    spec["size"] = this.field.nativeType?.[1]?.[0] ? Number.parseInt(this.field.nativeType?.[1]?.[0] ?? "0") : null;
    const keys = [];
    if (this.field.isId)
      keys.push("PK");
    if (this.isFK)
      keys.push("FK");
    if (this.field.isUnique)
      keys.push("UK");
    spec["constraint"] = keys.join(",");
    spec["nullable"] = !this.field.isRequired;
    spec["name"] = this.field.dbName ?? this.field.name;
    return spec;
  }
}

// src/writers/mermaid.ts
var mermaid;
((mermaid) => {
  mermaid.write = (chapter) => [
    "```mermaid",
    "erDiagram",
    ...chapter.map(writeTable),
    ...chapter.flatMap((model) => model.fields.filter((f) => f.kind === "object").map(writeRelationship({ group: chapter, model }))).filter((str) => !!str.length),
    "```"
  ].join(`
`);
  const writeTable = (model) => [
    `${JSON.stringify(model.dbName ?? model.name)} {`,
    ...model.fields.filter((f) => f.kind !== "object").map(writeField(model)).map((str) => `  ${str}`),
    "}"
  ].join(`
`);
  const writeField = (model) => (fieldParam) => {
    const isFK = model.fields.some((f) => f.kind === "object" && f.relationFromFields?.[0] === fieldParam.name);
    const targetField = field(fieldParam, isFK);
    return [
      targetField.data().size ? targetField.format("t(s)") : targetField.format("t"),
      targetField.format("n"),
      targetField.format("k"),
      targetField.format("r")
    ].filter((str) => !!str.length).join(" ");
  };
  const writeRelationship = (props) => (fieldParam) => {
    if (!fieldParam.relationFromFields?.length)
      return "";
    const column = fieldParam.relationFromFields[0] ?? "";
    const scalar = props.model.fields.find((s) => column === s.dbName || column === s.name);
    if (scalar === undefined)
      return "";
    const target = props.group.find((t) => t.name === fieldParam.type);
    if (target === undefined)
      return "";
    const arrow = buildArrow({
      scalar,
      oneToOne: scalar.isId || scalar.isUnique,
      isOptional: checkIsOptional(props.group, fieldParam, scalar),
      isMandatory: isMandatoryMany({ model: props.model, field: fieldParam, target })
    });
    return [
      JSON.stringify(props.model.dbName ?? props.model.name),
      arrow,
      JSON.stringify(target.dbName ?? target.name),
      ":",
      fieldParam.name
    ].join(" ");
  };
  const checkIsOptional = (group, fieldParam, scalar) => {
    const oneToOne = scalar.isId || scalar.isUnique;
    if (!oneToOne)
      return false;
    return group.some((m) => m.name === fieldParam.type && m.fields.some((f) => f.relationName === fieldParam.relationName && !f.isRequired));
  };
  const buildArrow = (params) => {
    const leftCardinality = params.oneToOne ? "|" : "}";
    let middleCardinality;
    if (params.isOptional) {
      middleCardinality = "o";
    } else if (params.isMandatory) {
      middleCardinality = "|";
    } else {
      middleCardinality = "o";
    }
    const rightCardinality = params.scalar.isRequired ? "|" : "o";
    return [leftCardinality, middleCardinality, "--", rightCardinality, "|"].join("");
  };
  const isMandatoryMany = (props) => {
    const opposite = props.target.fields.find((f) => f.relationName === props.field.relationName && f.type === props.model.name);
    if (opposite === undefined)
      return false;
    const values = prisma.tagValues("minItems")(opposite);
    if (values.length === 0)
      return false;
    const numeric = Number(values[0]);
    return !Number.isNaN(numeric) && numeric >= 1;
  };
})(mermaid ||= {});

// src/markdown.ts
var PrismaMarkdown;
((PrismaMarkdown) => {
  PrismaMarkdown.write = (schema, configParam) => {
    const chapters = PrismaMarkdown.categorize(schema);
    const title = configParam?.title ?? "Prisma Markdown";
    const frontMatter = ["---", `title: "${title}"`, "---"].join(`
`);
    const preface = [
      `# ${title}`,
      "",
      "> Generated by [`prisma-markdown`](https://github.com/samchon/prisma-markdown)",
      "",
      ...chapters.map(({ name }) => `- [${name}](#${name.toLowerCase()})`)
    ].join(`
`);
    if (chapters.length === 0)
      return [frontMatter, "", preface].join(`
`);
    return [frontMatter, "", preface, "", chapters.map(PrismaMarkdown.writeChapter).join(`

`), ""].join(`
`);
  };
  PrismaMarkdown.writeChapter = (chapterParam) => [
    `## ${chapterParam.name}`,
    "",
    ...chapterParam.diagrams.length > 0 ? [mermaid.write(chapterParam.diagrams)] : [],
    ...chapterParam.diagrams.length > 0 && chapterParam.descriptions.length > 0 ? [""] : [],
    ...chapterParam.descriptions.length > 0 ? [chapterParam.descriptions.map((c) => description.table(c)).join(`

`)] : []
  ].join(`
`);
  PrismaMarkdown.writeDiagram = (diagrams) => mermaid.write(diagrams);
  PrismaMarkdown.writeDescription = (model) => description.table(model);
  PrismaMarkdown.categorize = (schema) => {
    const dict = new Map;
    const modelList = schema.models.filter((model) => !isHidden(model));
    findImplicits(modelList);
    const emplace = (name) => map.take(dict)(name, () => ({
      name,
      descriptions: new Set,
      diagrams: new Set
    }));
    for (const model of modelList) {
      const namespaces = takeTags("namespace")(model);
      if (namespaces.length === 0)
        continue;
      const top = namespaces[0];
      const chapterParam = emplace(top);
      chapterParam.descriptions.add(model);
      chapterParam.diagrams.add(model);
    }
    for (const model of modelList) {
      const namespaces = takeTags("namespace")(model);
      for (const name of namespaces.slice(1)) {
        const section = emplace(name);
        section.descriptions.add(model);
        section.diagrams.add(model);
      }
    }
    for (const model of modelList) {
      const describes = takeTags("describe")(model);
      for (const name of describes) {
        const chapterParam = map.take(dict)(name, () => ({
          name,
          descriptions: new Set,
          diagrams: new Set
        }));
        chapterParam.descriptions.add(model);
      }
    }
    for (const model of modelList) {
      const erdList = takeTags("erd")(model);
      for (const erd of erdList) {
        const chapterParam = map.take(dict)(erd, () => ({
          name: erd,
          descriptions: new Set,
          diagrams: new Set
        }));
        chapterParam.diagrams.add(model);
      }
    }
    for (const model of modelList) {
      const keywords = [
        ...takeTags("namespace")(model),
        ...takeTags("describe")(model),
        ...takeTags("erd")(model)
      ];
      if (keywords.length !== 0)
        continue;
      const basic = map.take(dict)("default", () => ({
        name: "default",
        descriptions: new Set,
        diagrams: new Set
      }));
      basic.descriptions.add(model);
      basic.diagrams.add(model);
    }
    return Array.from(dict.values()).filter((c) => !!c.descriptions.size || !!c.diagrams.size).map((chapter) => ({
      name: chapter.name,
      descriptions: Array.from(chapter.descriptions),
      diagrams: Array.from(chapter.diagrams)
    }));
  };
  const takeTags = (kind) => (model) => [
    ...new Set(prisma.tagValues(kind)(model).map((str) => str.split(" ")[0]).filter((s) => s !== undefined))
  ];
  const isHidden = (model) => model.documentation?.includes("@hidden") ?? false;
  const findImplicits = (modelList) => {
    const dict = new Map;
    for (const model of modelList) {
      for (const field2 of model.fields) {
        const implicitRelation = findImplicitRelation(model, field2, modelList);
        if (implicitRelation === null)
          continue;
        const table = implicitRelation.tableName;
        if (dict.has(table))
          continue;
        const newbie = implicitToExplicit(implicitRelation.model)(implicitRelation.opposite);
        modelList.push(newbie);
        dict.set(table, newbie);
      }
    }
  };
  const findImplicitRelation = (model, field2, modelList) => {
    if (!isImplicitRelationField(field2))
      return null;
    const opposite = modelList.find((m) => m.name === field2.type);
    if (opposite === undefined)
      return null;
    const oppositeField = opposite.fields.find((f) => f.kind === "object" && f.isList && f.type === model.name);
    if (oppositeField === undefined || model === opposite)
      return null;
    const relations = [model, opposite].sort((x, y) => x.name.localeCompare(y.name));
    const tableName = `_${relations[0]?.name ?? ""}To${relations[1]?.name ?? ""}`;
    return { model: relations[0], opposite: relations[1], tableName };
  };
  const isImplicitRelationField = (field2) => {
    return field2.kind === "object" && field2.isList === true && field2.isUnique === false;
  };
  const implicitToExplicit = (x) => (y) => {
    const name = `_${x.name}To${y.name}`;
    const tagger = (kind) => [...new Set([...takeTags(kind)(x), ...takeTags(kind)(y)])].map((value) => `@${kind} ${value}`);
    const description2 = [
      `Pair relationship table between {@link ${x.dbName ?? x.name}} and {@link ${y.dbName ?? y.name}}`,
      "",
      ...tagger("describe"),
      ...tagger("erd"),
      ...tagger("namespace")
    ];
    if (description2.length === 2)
      description2.splice(1, 1);
    const newbie = {
      name,
      dbName: null,
      schema: null,
      fields: [
        {
          kind: "scalar",
          name: "A",
          type: x.primaryKey?.fields?.[0] ?? "String",
          isRequired: true,
          isList: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false
        },
        {
          kind: "scalar",
          name: "B",
          type: y.primaryKey?.fields?.[0] ?? "String",
          isRequired: true,
          isList: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false
        },
        {
          kind: "object",
          name: x.name,
          type: x.name,
          isRequired: true,
          isList: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          relationToFields: [x.primaryKey?.fields?.[0] ?? "id"],
          relationFromFields: ["A"]
        },
        {
          kind: "object",
          name: y.name,
          type: y.name,
          isRequired: true,
          isList: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          relationToFields: [y.primaryKey?.fields?.[0] ?? "id"],
          relationFromFields: ["B"]
        }
      ],
      uniqueFields: [["A", "B"]],
      uniqueIndexes: [],
      primaryKey: null,
      documentation: description2.join(`
`)
    };
    x.fields.push({
      kind: "object",
      name,
      type: name,
      isRequired: true,
      isList: true,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      relationToFields: ["A"]
    });
    y.fields.push({
      kind: "object",
      name,
      type: name,
      isRequired: true,
      isList: true,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      relationToFields: ["B"]
    });
    return newbie;
  };
})(PrismaMarkdown ||= {});

// cmd/main.ts
var { generatorHandler } = import_generator_helper.default;
var packageJson = await Promise.resolve().then(() => __toESM(require_package(), 1));
var { version } = packageJson.default;
generatorHandler({
  onManifest: () => ({
    version,
    defaultOutput: "./ERD.md",
    prettyName: "prisma-markdown"
  }),
  onGenerate: async (options) => {
    const content = PrismaMarkdown.write(options.dmmf.datamodel, options.generator.config);
    const file = options.generator.output?.value ?? "./ERD.md";
    try {
      await fs.promises.mkdir(path.dirname(file), { recursive: true });
    } catch {
    }
    await fs.promises.writeFile(file, content, "utf8");
  }
});
