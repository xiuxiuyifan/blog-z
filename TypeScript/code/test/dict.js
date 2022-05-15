const axios = require("axios");
const qs = require("qs");
const md5 = require("js-md5");

let cookie = `BIDUPSID=EE88B563120DBDE511A4CFA5B32AF77C; PSTM=1638589079; BAIDUID=EE88B563120DBDE5F8C727D7ED70CA9D:FG=1; __yjs_duid=1_8dd3a079f43bc627b25608d5ddb910ab1638612277970; BDUSS=02LWdwUnJqUUI2b3k3WFQ0a2pDMXI2Q0VmS2oxT2ZCUVFPM2dKaFBnYlY0dEpoRVFBQUFBJCQAAAAAAAAAAAEAAAAkD1ZcTGFkeWJhb2JhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANVVq2HVVathQk; BDUSS_BFESS=02LWdwUnJqUUI2b3k3WFQ0a2pDMXI2Q0VmS2oxT2ZCUVFPM2dKaFBnYlY0dEpoRVFBQUFBJCQAAAAAAAAAAAEAAAAkD1ZcTGFkeWJhb2JhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANVVq2HVVathQk; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; APPGUIDE_10_0_2=1; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1645858044,1646229120; BAIDUID_BFESS=EE88B563120DBDE5F8C727D7ED70CA9D:FG=1; delPer=0; PSINO=6; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; RT="z=1&dm=baidu.com&si=k28fohpb14&ss=l0dvkk84&sl=2&tt=1r9&bcn=https://fclog.baidu.com/log/weirwood?type=perf&ld=257&ul=3tjp&hd=3tm0"; BCLID=6179856355083406647; BDSFRCVID=zU4OJexroG0RoLoD5KERej4se_weG7bTDYrEuYGUcqUBUxDVJeC6EG0Pts1-dEu-EHtdogKKy2OTH9DF_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF=tJIe_C-atC-3fP36q4rVhP4Sqxby26nU2Rb9aJ5nJDoSM4Tx-qOU0tPDjfoBtURGMN7d5l0bQpP-HJAG-lo8Wjty5M5KQnveygLfKl0MLInlbb0xynoD24tvKxnMBMn8teOnaITg3fAKftnOM46JehL3346-35543bRTLnLy5KJtMDFlePjHhRFtqx5Ka43tHD7yWCvTWIncOR59K4nnDhDeXMnRhlRp3DTB_POTX-3qsI3P3MOZKxL0WtJP5boP0HTOKUQF5l8-sq0x0bO5DDuOQq_L0xvJ5IOMahvXtq7xOKTeQlPK5JkgMx6MqpQJQeQ-5KQN3KJmfbL9bT3YjjTXjN88J5tHJb3fL-0824bBjJrTq4bohjnWqtR9BtQmJJrNaPPEBn7UJD-C04o8jbt1XUvtbhc2Qg-q3R7lH66MJlRS3M7dyjQ30hbb0x-jLNOuVn0MWhjD8xcHytnJyUP-D4nnBTcR3H8HL4nv2JcJbM5m3x6qLTKkQN3T-PKO5bRu_CF-JC8hMKKlj5RjhP0thxtXa4ryaKAX3b7EfbnRfq7_bf--D6KO3ROJBf3iaHbL0RF2Bh3hqR5u55Jxy5K_hpbm-nbMt5TiWnv83Uj-hlnHQT3mKP5bbN3i-4jEK2nHWb3cW-IK8UbSefOPBTD02-nBat-OQ6npaJ5nJq5nhMJmb67JD-50eGLsKtoXMCKX3JjV5PK_Hn7zen6ljM4pbq7H2M-jLDOrWh-aWh5CeJFmKPor5PL1jU5n0pcH36TkKM5J-x5IStne3x6qLTKkQN3T-ntDHCn4L66NWPbfDn3oynuKXp0netOly5jtMgOBBJ0yQ4b4OR5JjxonDh83bG7MJUutfD7H3KC2JIthMxK; BCLID_BFESS=6179856355083406647; BDSFRCVID_BFESS=zU4OJexroG0RoLoD5KERej4se_weG7bTDYrEuYGUcqUBUxDVJeC6EG0Pts1-dEu-EHtdogKKy2OTH9DF_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF_BFESS=tJIe_C-atC-3fP36q4rVhP4Sqxby26nU2Rb9aJ5nJDoSM4Tx-qOU0tPDjfoBtURGMN7d5l0bQpP-HJAG-lo8Wjty5M5KQnveygLfKl0MLInlbb0xynoD24tvKxnMBMn8teOnaITg3fAKftnOM46JehL3346-35543bRTLnLy5KJtMDFlePjHhRFtqx5Ka43tHD7yWCvTWIncOR59K4nnDhDeXMnRhlRp3DTB_POTX-3qsI3P3MOZKxL0WtJP5boP0HTOKUQF5l8-sq0x0bO5DDuOQq_L0xvJ5IOMahvXtq7xOKTeQlPK5JkgMx6MqpQJQeQ-5KQN3KJmfbL9bT3YjjTXjN88J5tHJb3fL-0824bBjJrTq4bohjnWqtR9BtQmJJrNaPPEBn7UJD-C04o8jbt1XUvtbhc2Qg-q3R7lH66MJlRS3M7dyjQ30hbb0x-jLNOuVn0MWhjD8xcHytnJyUP-D4nnBTcR3H8HL4nv2JcJbM5m3x6qLTKkQN3T-PKO5bRu_CF-JC8hMKKlj5RjhP0thxtXa4ryaKAX3b7EfbnRfq7_bf--D6KO3ROJBf3iaHbL0RF2Bh3hqR5u55Jxy5K_hpbm-nbMt5TiWnv83Uj-hlnHQT3mKP5bbN3i-4jEK2nHWb3cW-IK8UbSefOPBTD02-nBat-OQ6npaJ5nJq5nhMJmb67JD-50eGLsKtoXMCKX3JjV5PK_Hn7zen6ljM4pbq7H2M-jLDOrWh-aWh5CeJFmKPor5PL1jU5n0pcH36TkKM5J-x5IStne3x6qLTKkQN3T-ntDHCn4L66NWPbfDn3oynuKXp0netOly5jtMgOBBJ0yQ4b4OR5JjxonDh83bG7MJUutfD7H3KC2JIthMxK; H_PS_PSSID=35104_36004_34584_35871_35949_35994_35317_26350_35884_35879_36010; BA_HECTOR=2g840024042g2k0ks41h283pa0r; ZD_ENTRY=baidu; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1646530620; ab_sr=1.0.1_ZTQ4ZDFiMDdmZTZjZTAxOTgxZDdkMzg1ZjFhZGI0ZGVhNzkxZmFmMTMzOGVkNjViYjYzODI3MmY3YTAzOWM5ODY4OGYwYjI5M2IwMTFhOTU4NGZlNTgyZDJmMTNmZGY0MDNmMGM4NmEwNDdlZTEwZDc3MzcyODZhMzJmNjU1NDVjY2I4MTkyMjUyZTk0NjBhN2JmY2FkMDlkMmI2MDBhOWNkNGRhYWE0ZDZkMmNmYTI5YWVlYmM4MTY5MzgxYmVja`;

// let dicts = [
//   "antiwar",
//   "abnormal",
//   "believe",
//   "uglify",
//   "distributive",
//   "solid",
//   "float",
//   "absolute",
//   "entity",
//   "news",
//   "subtitle",
//   "aside",
//   "submenu",
//   "wrapper",
//   "container",
//   "banner",
//   "logo",
//   "forbidden",
//   "node",
//   "revert",
//   "extends",
//   "engine",
//   "ease",
//   "animation",
//   "rotate",
//   "keep alive",
//   "mix in",
//   "mount",
//   "computed",
//   "computers",
//   "await",
//   "promise",
//   "constructor",
//   "abstract",
//   "diff",
//   "merge",
//   "checkout",
//   "style",
//   "footer",
//   "article",
//   "contains",
//   "download",
//   "notify",
//   "quota",
//   "accumulator",
//   "deploy",
//   "span",
//   "zone",
//   "region",
//   "tools",
//   "vendor",
//   "async",
//   "group",
//   "percent",
//   "inject",
//   "percent",
//   "equate",
//   "config",
//   "alarm",
//   "account",
//   "scaling",
//   "apply",
//   "pull",
//   "proxy",
//   "validator",
//   "constants",
//   "listener",
//   "iterator",
//   "dict",
//   "exceptional",
//   "guest",
//   "flow",
//   "favour",
//   "options",
//   "util",
//   "observer",
//   "customization",
//   "when",
//   "most",
//   "bundle",
//   "rules",
//   "should",
//   "success",
//   "reject",
//   "permission",
//   "bundler",
//   "better",
//   "cookie",
//   "blog",
//   "target",
//   "as",
//   "export",
//   "import",
//   "modules",
//   "plugin",
//   "loader",
//   "concepts",
//   "launch",
//   "row span",
//   "col span",
//   "readonly",
//   "checked",
//   "autofocus",
//   "placeholder",
//   "textarea",
//   "submit",
//   "checkbox",
//   "radio",
//   "flex",
//   "inline-block",
//   "border-radius",
//   "shadow",
//   "dotted",
//   "dashed",
//   "smile",
//   "does",
//   "providing",
//   "payload",
//   "practice",
//   "subscribe",
//   "answers",
//   "overload",
//   "properties",
//   "missing",
//   "suspended",
//   "creators",
//   "reducer",
//   "forwards",
//   "reactive",
//   "mounted",
//   "navigator",
//   "drawer",
//   "components",
//   "class",
//   "scale",
//   "middleware",
//   "标签",
//   "endnote",
//   "continuation",
//   "optimized",
//   "hoisting",
//   "permitted",
//   "expired",
//   "seats",
//   "priority",
//   "packages",
//   "repository",
//   "marketplace",
//   "explore",
//   "issues",
//   "super",
//   "site",
//   "arguments",
//   "any",
//   "login",
//   "logout",
//   "alive",
//   "floor",
//   "info",
//   "user",
//   "business",
//   "creator",
//   "transition",
//   "life",
//   "component",
//   "assets",
//   "formatter",
//   "inner",
//   "outer",
//   "frame",
//   "alert",
//   "viewport",
//   "refactor",
//   "grid",
//   "props",
//   "justify",
//   "rebase",
//   "catch",
//   "sync",
//   "recursion",
//   "render",
//   "padding",
//   "offset",
//   "waterfall",
//   "bail",
//   "signed",
//   "currying",
//   "registry",
//   "presets",
//   "supported",
//   "concern",
//   "推荐",
//   "writer",
//   "browser",
//   "mock",
//   "fallback",
//   "directives",
//   "disallowed",
//   "best",
//   "breadcrumb",
//   "popover",
//   "tips",
//   "tip",
//   "badge",
//   "steps",
//   "avatar",
//   "upload",
//   "mutable",
//   "might",
//   "core",
//   "notice",
//   "behave",
//   "internet",
//   "instances",
//   "inline",
//   "family",
//   "bytecode",
//   "bound",
//   "Boolean",
//   "binding",
//   "binary tree",
//   "base class",
//   "base case",
//   "bandwidth",
//   "back quote",
//   "atom",
//   "annotation",
//   "ad hoc",
//   "sources",
//   "media",
//   "referer",
//   "referrer",
//   "policy",
//   "remote",
//   "owner",
//   "key map",
//   "features",
//   "feedback",
//   "splice",
//   "should be",
//   "a block of pointers",
//   "organized",
//   "event",
//   "strict",
//   "router",
//   "concat",
//   "emit",
//   "dispatch",
//   "opacity",
//   "focus",
//   "expose",
//   "graph",
//   "stage",
//   "capacity",
//   "amend",
//   "tracked",
//   "extensible",
//   "defer",
//   "chain",
//   "deployment",
//   "from prep",
//   "with prep",
//   "by prep",
//   "not found",
//   "latest",
//   "duration",
//   "calendar",
//   "dataset",
//   "toolbox",
//   "brush",
//   "GOE",
//   "radar",
//   "radius",
//   "polar",
//   "legend",
//   "axis",
//   "encode",
//   "dimensions",
//   "bezier curve",
//   "polyline",
//   "polygon",
//   "arc",
//   "rect",
//   "tooltip",
//   "easing",
//   "Delay",
//   "silent",
//   "clip",
//   "emphasis",
//   "pie",
//   "secret",
//   "salt",
//   "established",
//   "validate",
//   "params",
//   "visit",
//   "collect",
//   "modern",
//   "patch",
//   "chunks",
//   "iterable",
//   "notable",
//   "inventory",
//   "accessed",
//   "hungry",
//   "awesome",
//   "elasticity",
//   "audit",
//   "resource",
//   "framework",
//   "danger",
//   "using",
//   "narrowing",
//   "mini",
//   "assertion",
//   "relocation",
//   "enum",
//   "hell",
//   "parser",
//   "shutdown",
//   "detached",
//   "cherry",
//   "which pron",
//   "button",
//   "without prep",
//   "shape",
//   "peek",
//   "sold out",
//   "Available",
//   "repertory",
//   "polyfill",
//   "inserted",
//   "inspect",
//   "implied",
//   "declarations",
//   "walk",
//   "squash",
//   "pick",
//   "brand",
//   "locally",
//   "pieces",
//   "blame",
//   "annotate",
//   "folding",
//   "externals",
//   "unfold",
//   "tail",
//   "attach",
//   "logger",
//   "multer",
//   "distinct",
//   "lease",
//   "since prep",
//   "lean",
//   "extensions",
//   "terser",
//   "flatten",
//   "parsing",
//   "staff",
//   "bonus",
//   "raise",
//   "hire",
//   "triple",
//   "origin",
//   "incoming",
//   "stash",
//   "lower",
//   "come",
//   "step",
//   "consist",
//   "sequence",
//   "share",
//   "stop",
//   "floating",
//   "slow",
//   "around",
//   "aboveboard",
//   "macros",
//   "replacement",
//   "monitor",
//   "resume",
//   "alphabetical",
//   "empty",
//   "compatible",
//   "disable",
//   "regardless",
//   "I think therefore I am",
//   "abolish",
//   "immediate",
//   "conflicts",
//   "delivery",
//   "doubly",
//   "pivot",
//   "smallest",
//   "deadline",
//   "mid",
//   "rear",
//   "throttle",
//   "debounce",
//   "prime",
//   "tuple",
//   "bucket",
//   "removal",
//   "cluster",
//   "tracking",
//   "redeem",
//   "first name",
//   "Coupon or Promo code",
//   "wife",
//   "frozen",
//   "passive",
//   "meal",
//   "candidate",
//   "cloud",
//   "specified",
//   "stroke",
//   "pseudo",
//   "payment",
//   "ware",
//   "effort",
//   "record",
//   "blast",
//   "printout",
//   "assumed",
//   "logged",
//   "locate",
//   "navigate",
//   "match",
//   "complex",
//   "take",
//   "connection",
//   "though",
//   "vertical",
//   "unlike",
//   "cause",
//   "but",
//   "magenta",
//   "round",
//   "short",
//   "history",
//   "argument",
//   "substitute",
//   "subset",
//   "affected",
//   "unsigned",
//   "associated",
//   "restrict",
//   "rating",
//   "attribute",
//   "minimum",
//   "parent",
//   "carry",
//   "asset",
//   "suspend",
//   "valid",
//   "count",
//   "describe",
//   "convert",
//   "visible",
//   "function",
//   "spill",
//   "grey",
//   "recall",
//   "suspension",
//   "interpretable",
//   "previous",
//   "period",
//   "sun",
//   "technical",
//   "preserve",
//   "future",
//   "making",
//   "safety",
//   "intense",
//   "circle",
//   "tick",
//   "dot",
//   "initially",
//   "profile",
//   "freeze",
//   "habit",
//   "starting",
//   "low",
//   "nor",
//   "index",
//   "note",
//   "mono",
//   "ellipsis",
//   "time",
//   "away",
//   "basic",
//   "desire",
//   "semicolon",
//   "subtotal",
//   "undone",
//   "roll",
//   "entirely",
//   "magic",
//   "hyphen",
//   "valuable",
//   "architecture",
//   "skill",
//   "setting",
//   "attached",
//   "interrupt",
//   "expansion",
//   "activity",
//   "along",
//   "twice",
//   "computer",
//   "separately",
//   "shift",
//   "means",
//   "possible",
//   "reserve",
//   "similar",
//   "denote",
//   "huge",
//   "underlying",
//   "require",
//   "hide",
//   "external",
//   "internally",
//   "double",
//   "advance",
//   "administrator",
//   "sequentially",
//   "exponential",
//   "finished",
//   "flush",
//   "convention",
//   "eventually",
//   "terminate",
//   "manager",
//   "mistake",
//   "lowercase",
//   "clause",
//   "by",
//   "random",
//   "collection",
//   "unused",
//   "syntax",
//   "compile",
//   "provide",
//   "correction",
//   "reduction",
//   "structural",
//   "physically",
//   "look",
//   "back",
//   "prefer",
//   "assigned",
//   "attention",
//   "route",
//   "important",
//   "keypad",
//   "depend",
//   "assistance",
//   "independent",
//   "software",
//   "beep",
//   "above",
//   "teach",
//   "cpu",
//   "example",
//   "if",
//   "complexity",
//   "controller",
//   "ensemble",
//   "normal",
//   "visual",
//   "finish",
//   "card",
//   "repeated",
//   "either",
//   "install",
//   "truncate",
//   "minus",
//   "trigger",
//   "until",
//   "team",
//   "degrade",
//   "recoverable",
//   "obsolete",
//   "qualified",
//   "lot",
//   "scattered",
//   "significant",
//   "command",
//   "easy",
//   "job",
//   "remainder",
//   "parse",
//   "correctly",
//   "piece",
//   "vowel",
//   "redundant",
//   "office",
//   "rent",
//   "exclude",
//   "accelerator",
//   "cycle",
//   "address",
//   "rectangle",
//   "delete",
//   "redraw",
//   "latter",
//   "choice",
//   "whereas",
//   "effect",
//   "setup",
//   "combo",
//   "now",
//   "incompatible",
//   "exception",
//   "stopping",
//   "ampersand",
//   "diacritical",
//   "escape",
//   "dual",
//   "all",
//   "separated",
//   "respect",
//   "dump",
//   "rename",
//   "into",
//   "traverse",
//   "shield",
//   "quick",
//   "department",
//   "serial",
//   "negative",
//   "outcome",
//   "suitable",
//   "item",
//   "contrast",
//   "programming",
//   "macro",
//   "about",
//   "express",
//   "permit",
//   "alpha",
//   "multiple",
//   "list",
//   "help",
//   "insert",
//   "familiar",
//   "lowest",
//   "error",
//   "definition",
//   "rectangular",
//   "proprietary",
//   "expunge",
//   "arrow",
//   "hex",
//   "meaning",
//   "reflect",
//   "represent",
//   "nothing",
//   "manually",
//   "demonstration",
//   "skip",
//   "indicate",
//   "wide",
//   "discard",
//   "application",
//   "depth",
//   "identify",
//   "selected",
//   "facility",
//   "sentence",
//   "arithmetic",
//   "environment",
//   "instead",
//   "grant",
//   "handling",
//   "drive",
//   "static",
//   "replace",
//   "stand",
//   "specify",
//   "monochrome",
//   "occasionally",
//   "other",
//   "topic",
//   "enhance",
//   "idea",
//   "fragment",
//   "concatenate",
//   "automatic",
//   "resolve",
//   "exact",
//   "guard",
//   "growing",
//   "content",
//   "combine",
//   "little",
//   "rest",
//   "examine",
//   "operator",
//   "with",
//   "three",
//   "specific",
//   "environmental",
//   "use",
//   "soft",
//   "windowing",
//   "maintain",
//   "processor",
//   "free",
//   "unformatted",
//   "agree",
//   "day",
//   "auto index",
//   "reset",
//   "differ",
//   "reorder",
//   "offer",
//   "predict",
//   "open",
//   "anticipate",
//   "contain",
//   "size",
//   "handler",
//   "capture",
//   "father",
//   "fail",
//   "enclose",
//   "appear",
//   "destination",
//   "abort",
//   "picture",
//   "declare",
//   "mega",
//   "integer",
//   "overflow",
//   "retrieve",
//   "angle",
//   "need",
//   "backup",
//   "document",
//   "again",
//   "heading",
//   "give",
//   "client",
//   "backward",
//   "precedence",
//   "hidden",
//   "restricting",
//   "pair",
//   "result",
//   "way",
//   "invoke",
//   "both",
//   "append",
//   "hexadecimal",
//   "clock",
//   "date",
//   "pending",
//   "controlled",
//   "corner",
//   "big",
//   "penalty",
//   "limit",
//   "color",
//   "contact",
//   "bracket",
//   "log",
//   "global",
//   "twentieth",
//   "push",
//   "variant",
//   "such",
//   "reenter",
//   "aware",
//   "unknown",
//   "pattern",
//   "decrease",
//   "echo",
//   "esoteric",
//   "manner",
//   "least",
//   "unshift",
//   "leave",
//   "rewrite",
//   "mixture",
//   "maximum",
//   "aid",
//   "previously",
//   "become",
//   "trying",
//   "header",
//   "delimiter",
//   "glance",
//   "holding",
//   "trace",
//   "intervene",
//   "line",
//   "extract",
//   "range",
//   "presence",
//   "destroy",
//   "find",
//   "employe",
//   "mainframe",
//   "noted",
//   "upon",
//   "click",
//   "capitalized",
//   "buffer",
//   "american",
//   "care",
//   "certain",
//   "collapse",
//   "filing",
//   "test",
//   "home",
//   "substitution",
//   "year",
//   "modifier",
//   "insertion",
//   "horizontally",
//   "compare",
//   "remember",
//   "choose",
//   "often",
//   "vice",
//   "place",
//   "integrate",
//   "information",
//   "final",
//   "value",
//   "endeavor",
//   "phoenix",
//   "side",
//   "acknowledgment",
//   "whether",
//   "counter",
//   "general",
//   "buy",
//   "related",
//   "labeled",
//   "interpretability",
//   "hercules",
//   "interpret",
//   "publisher",
//   "environ",
//   "really",
//   "output",
//   "recently",
//   "matter",
//   "comprise",
//   "hot",
//   "introduction",
//   "keep",
//   "disk",
//   "financial",
//   "moving",
//   "interest",
//   "summary",
//   "build",
//   "generation",
//   "byte",
//   "deletion",
//   "go",
//   "development",
//   "binary",
//   "ascii",
//   "key",
//   "overstrike",
//   "multiprocessing",
//   "loaded",
//   "masking",
//   "navigation",
//   "abbreviate",
//   "array",
//   "show",
//   "opened",
//   "alphabet",
//   "concept",
//   "charm",
//   "digital",
//   "room",
//   "reference",
//   "stack",
//   "moreover",
//   "fine",
//   "change",
//   "iterative",
//   "session",
//   "consequently",
//   "independently",
//   "although",
//   "digit",
//   "get",
//   "protection",
//   "performance",
//   "movement",
//   "already",
//   "kind",
//   "still",
//   "automatically",
//   "large",
//   "applicable",
//   "detail",
//   "instruction",
//   "regard",
//   "decide",
//   "method",
//   "batch",
//   "queue",
//   "scope",
//   "caution",
//   "flag",
//   "worker",
//   "toggle",
//   "scatter",
//   "control",
//   "include",
//   "slowly",
//   "undo",
//   "phone",
//   "explanation",
//   "action",
//   "synchronization",
//   "machine",
//   "descend",
//   "reformat",
//   "carriage",
//   "stamp",
//   "invalid",
//   "put",
//   "debugger",
//   "movie",
//   "delay",
//   "moment",
//   "waiting",
//   "zap",
//   "receive",
//   "say",
//   "lose",
//   "case",
//   "map",
//   "optimize",
//   "reread",
//   "whole",
//   "modify",
//   "restriction",
//   "extra",
//   "carousel",
//   "replicate",
//   "dependent",
//   "discuss",
//   "convenience",
//   "many",
//   "ram",
//   "definable",
//   "instruct",
//   "blinking",
//   "high",
//   "observe",
//   "natural",
//   "feature",
//   "meet",
//   "indicator",
//   "mention",
//   "book",
//   "analyst",
//   "height",
//   "association",
//   "addition",
//   "design",
//   "average",
//   "module",
//   "icon",
//   "over",
//   "combination",
//   "typewriter",
//   "higher",
//   "hardware",
//   "single",
//   "compression",
//   "press",
//   "learning",
//   "landler",
//   "amount",
//   "customer",
//   "backspace",
//   "name",
//   "immediately",
//   "probable",
//   "third",
//   "load",
//   "basis",
//   "finally",
//   "programmable",
//   "blank",
//   "past",
//   "virtually",
//   "building",
//   "multi",
//   "define",
//   "retry",
//   "working",
//   "primarily",
//   "think",
//   "source",
//   "produce",
//   "demonstrate",
//   "opposite",
//   "copy",
//   "widely",
//   "brown",
//   "dimensional",
//   "filename",
//   "language",
//   "symbol",
//   "hundred",
//   "ever",
//   "bell",
//   "hello",
//   "vertically",
//   "keyword",
//   "rule",
//   "alternate",
//   "individually",
//   "executable",
//   "page",
//   "branch",
//   "strike",
//   "structure",
//   "sufficient",
//   "necessarily",
//   "particular",
//   "bad",
//   "paragraph",
//   "plus",
//   "mixed",
//   "mismatch",
//   "understanding",
//   "space",
//   "null",
//   "element",
//   "warn",
//   "per",
//   "while",
//   "repeatedly",
//   "normally",
//   "supply",
//   "rather",
//   "pack",
//   "sounding",
//   "logical",
//   "distribute",
//   "operating",
//   "start",
//   "another",
//   "unpack",
//   "request",
//   "ignore",
//   "hold",
//   "nicety",
//   "reason",
//   "contiguous",
//   "why",
//   "diskette",
//   "pause",
//   "purchase",
//   "far",
//   "saving",
//   "terminal",
//   "superimpose",
//   "undefined",
//   "meter",
//   "black",
//   "exit",
//   "price",
//   "ansi",
//   "on-line",
//   "unfortunately",
//   "through",
//   "cost",
//   "obtain",
//   "ring",
//   "returned",
//   "directly",
//   "equation",
//   "permanent",
//   "data",
//   "segment",
//   "closely",
//   "continuously",
//   "plain",
//   "clean",
//   "usage",
//   "daily",
//   "prompt",
//   "introduce",
//   "math",
//   "pressing",
//   "resident",
//   "associate",
//   "feed",
//   "swap",
//   "restructure",
//   "circumstances",
//   "density",
//   "underline",
//   "graphically",
//   "never",
//   "custom",
//   "comma",
//   "erase",
//   "following",
//   "additional",
//   "sound",
//   "release",
//   "translation",
//   "compress",
//   "consecutive",
//   "scan",
//   "bracketed",
//   "rebuild",
//   "long",
//   "library",
//   "major",
//   "typical",
//   "supposed",
//   "restore",
//   "derelict",
//   "learn",
//   "oriented",
//   "own",
//   "well",
//   "pertain",
//   "remark",
//   "unable",
//   "figure",
//   "neither",
//   "quality",
//   "fixed",
//   "thereafter",
//   "appropriate",
//   "solely",
//   "deactivate",
//   "register",
//   "deal",
//   "between",
//   "down",
//   "align",
//   "window",
//   "sit",
//   "screen",
//   "mountain",
//   "much",
//   "omit",
//   "easily",
//   "switching",
//   "default",
//   "link",
//   "private",
//   "here",
//   "replaceable",
//   "marked",
//   "call",
//   "mod",
//   "gap",
//   "compact",
//   "throughout",
//   "locking",
//   "infinite",
//   "undesirable",
//   "overwrite",
//   "stay",
//   "experiment",
//   "difficulty",
//   "explain",
//   "programmer",
//   "initialize",
//   "how",
//   "parenthesis",
//   "however",
//   "light",
//   "wish",
//   "instant",
//   "sure",
//   "apply",
//   "subscript",
//   "search",
//   "city",
//   "close",
//   "speed",
//   "installation",
//   "string",
//   "original",
//   "small",
//   "power",
//   "else",
//   "browse",
//   "required",
//   "declared",
//   "property",
//   "slide",
//   "display",
//   "cache",
//   "quiet",
//   "internal",
//   "system",
//   "positioning",
//   "potentially",
//   "clear",
//   "rated",
//   "death",
//   "accommodate",
//   "consider",
//   "row",
//   "white",
//   "abbreviation",
//   "prior",
//   "interface",
//   "explicitly",
//   "market",
//   "leading",
//   "chart",
//   "track",
//   "alignment",
//   "vary",
//   "documentation",
//   "runtime",
//   "welcome",
//   "adapter",
//   "absence",
//   "which",
//   "then",
//   "revolutionize",
//   "comment",
//   "part",
//   "overview",
//   "inhibit",
//   "emulate",
//   "please",
//   "foreground",
//   "limited",
//   "quietly",
//   "project",
//   "right",
//   "highlight",
//   "progress",
//   "lock",
//   "customize",
//   "mind",
//   "applied",
//   "attempt",
//   "state",
//   "volume",
//   "context",
//   "appendix",
//   "driver",
//   "properly",
//   "memo",
//   "phrase",
//   "unsafe",
//   "matching",
//   "cut",
//   "running",
//   "scroll",
//   "adequate",
//   "hang",
//   "suppressed",
//   "separate",
//   "save",
//   "declaration",
//   "drag",
//   "loading",
//   "possibility",
//   "purge",
//   "reappears",
//   "front",
//   "develop",
//   "label",
//   "know",
//   "addressing",
//   "assembler",
//   "jump",
//   "reduce",
//   "announce",
//   "term",
//   "received",
//   "avail",
//   "readily",
//   "enjoy",
//   "accept",
//   "input",
//   "manage",
//   "determined",
//   "complete",
//   "conventional",
//   "times",
//   "experience",
//   "wrap",
//   "selection",
//   "indexing",
//   "bit",
//   "protocol",
//   "whenever",
//   "very",
//   "layout",
//   "asynchronous",
//   "title",
//   "respond",
//   "overlay",
//   "virtual",
//   "socket",
//   "negate",
//   "lightning",
//   "tornado",
//   "image",
//   "section",
//   "redirect",
//   "constantly",
//   "national",
//   "company",
//   "blue",
//   "path",
//   "cursor",
//   "stream",
//   "emulation",
//   "repeat",
//   "bottom",
//   "shell",
//   "charge",
//   "forward",
//   "graphic",
//   "suppose",
//   "group",
//   "technology",
//   "literal",
//   "see",
//   "unrecognized",
//   "via",
//   "pop",
//   "organize",
//   "startup",
//   "mouse",
//   "keyed",
//   "insure",
//   "parallel",
//   "pay",
//   "cancel",
//   "showing",
//   "refresh",
//   "initial",
//   "stationary",
//   "zoom",
//   "manufacture",
//   "operation",
//   "special",
//   "appropriately",
//   "enough",
//   "unlock",
//   "relative",
//   "exceed",
//   "temporary",
//   "division",
//   "quote",
//   "gather",
//   "helpful",
//   "frequently",
//   "skeleton",
//   "craze",
//   "column",
//   "on",
//   "tiny",
//   "database",
//   "select",
//   "field",
//   "originally",
//   "dynamic",
//   "exhaust",
//   "same",
//   "pass",
//   "create",
//   "prefix",
//   "assortment",
//   "ship",
//   "midnight",
//   "redefine",
//   "edit",
//   "yet",
//   "nature",
//   "spread",
//   "reinstate",
//   "always",
//   "sector",
//   "social",
//   "stuff",
//   "succession",
//   "object",
//   "fill",
//   "reach",
//   "slash",
//   "reload",
//   "confirmation",
//   "sensitivity",
//   "kernel",
//   "tag",
//   "possibly",
//   "shut",
//   "sign",
//   "initiate",
//   "message",
//   "standard",
//   "bypass",
//   "subsequent",
//   "asterisk",
//   "involved",
//   "once",
//   "font",
//   "chapter",
//   "utility",
//   "half",
//   "protect",
//   "therefore",
//   "individual",
//   "consult",
//   "force",
//   "corrupt",
//   "border",
//   "conform",
//   "limiting",
//   "finisher",
//   "unavailable",
//   "area",
//   "familiarize",
//   "month",
//   "searching",
//   "cover",
//   "increment",
//   "spell",
//   "later",
//   "various",
//   "cord",
//   "center",
//   "process",
//   "effective",
//   "middle",
//   "manifest",
//   "remove",
//   "decimal",
//   "security",
//   "six",
//   "type",
//   "thousand",
//   "whichever",
//   "exclamation",
//   "reactivate",
//   "real",
//   "equipment",
//   "instance",
//   "essentially",
//   "occurrence",
//   "common",
//   "murder",
//   "separator",
//   "confuse",
//   "ones",
//   "dearly",
//   "switch",
//   "optional",
//   "confirm",
//   "door",
//   "today",
//   "registration",
//   "explanatory",
//   "forget",
//   "useful",
//   "occur",
//   "refer",
//   "service",
//   "printable",
//   "seamless",
//   "proper",
//   "preview",
//   "otherwise",
//   "reindex",
//   "rate",
//   "limiter",
//   "bring",
//   "constant",
//   "indefinitely",
//   "substantial",
//   "set",
//   "expanding",
//   "extend",
//   "status",
//   "expand",
//   "easel",
//   "insufficient",
//   "cash",
//   "face",
//   "without",
//   "simple",
//   "quotation",
//   "necessary",
//   "routine",
//   "chunk",
//   "begin",
//   "according",
//   "each",
//   "make",
//   "unchanged",
//   "expect",
//   "shortcut",
//   "break",
//   "desk",
//   "difficult",
//   "odometer",
//   "fast",
//   "achieve",
//   "trim",
//   "parameter",
//   "unless",
//   "debug",
//   "photograph",
//   "designated",
//   "substantially",
//   "communication",
//   "week",
//   "view",
//   "splitting",
//   "near",
//   "whatever",
//   "intend",
//   "defective",
//   "less",
//   "ability",
//   "confidential",
//   "identically",
//   "entry",
//   "sort",
//   "factory",
//   "continue",
//   "indentation",
//   "transfer",
//   "forth",
//   "repetitive",
//   "location",
//   "dimension",
//   "master",
//   "add",
//   "wait",
//   "scheme",
//   "adjust",
//   "course",
//   "resulting",
//   "speech",
//   "purpose",
//   "logic",
//   "transportable",
//   "elapsed",
//   "tone",
//   "clipper",
//   "assembly",
//   "disabled",
//   "violate",
//   "found",
//   "relation",
//   "hand",
//   "upper",
//   "product",
//   "halfway",
//   "repeating",
//   "opening",
//   "condition",
//   "wrong",
//   "treat",
//   "full",
//   "duplicate",
//   "second",
//   "sum",
//   "margin",
//   "formatted",
//   "floppy",
//   "network",
//   "width",
//   "hit",
//   "author",
//   "seven",
//   "suggestion",
//   "university",
//   "file",
//   "differentiate",
//   "last",
//   "indirectly",
//   "preset",
//   "prepare",
//   "early",
//   "reflow",
//   "subgroup",
//   "do",
//   "criterion",
//   "correct",
//   "console",
//   "discussion",
//   "consistent",
//   "present",
//   "currently",
//   "successful",
//   "quit",
//   "importance",
//   "review",
//   "inclusive",
//   "terminology",
//   "point",
//   "especially",
//   "equal",
//   "transaction",
//   "trap",
//   "identical",
//   "numeral",
//   "invent",
//   "during",
//   "people",
//   "follow",
//   "touch",
//   "readable",
//   "varying",
//   "different",
//   "host",
//   "conditional",
//   "character",
//   "noninteractive",
//   "specifically",
//   "answer",
//   "traditional",
//   "unique",
//   "subroutine",
//   "sensitive",
//   "zero",
//   "capability",
//   "upgrade",
//   "ok",
//   "specification",
//   "nearly",
//   "century",
//   "usually",
//   "organization",
//   "false",
//   "trouble",
//   "transform",
//   "exist",
//   "return",
//   "verify",
//   "want",
//   "unnecessary",
//   "code",
//   "equally",
//   "consume",
//   "extension",
//   "generate",
//   "nest",
//   "pressed",
//   "beginning",
//   "extremely",
//   "override",
//   "highest",
//   "local",
//   "text",
//   "from",
//   "increase",
//   "alias",
//   "memory",
//   "correspond",
//   "formed",
//   "failure",
//   "complicated",
//   "recursive",
//   "listing",
//   "conflict",
//   "specialize",
//   "determine",
//   "accuracy",
//   "interval",
//   "board",
//   "representation",
//   "telephone",
//   "described",
//   "regular",
//   "desktop",
//   "experimentation",
//   "damage",
//   "pacific",
//   "active",
//   "layer",
//   "fully",
//   "converted",
//   "up",
//   "ask",
//   "desirable",
//   "order",
//   "exclusive",
//   "storage",
//   "diagonally",
//   "interfere",
//   "happen",
//   "trailing",
//   "write",
//   "before",
//   "marker",
//   "ally",
//   "motif",
//   "strong",
//   "statement",
//   "restart",
//   "divide",
//   "emphasize",
//   "series",
//   "tool",
//   "additionally",
//   "run",
//   "except",
//   "compatibility",
//   "whose",
//   "useless",
//   "box",
//   "calling",
//   "unwanted",
//   "fit",
//   "try",
//   "across",
//   "eliminate",
//   "processing",
//   "sample",
//   "total",
//   "occupy",
//   "allow",
//   "efficiently",
//   "fact",
//   "entire",
//   "inexperienced",
//   "direction",
//   "work",
//   "split",
//   "also",
//   "like",
//   "numeric",
//   "button",
//   "device",
//   "perform",
//   "root",
//   "dos",
//   "mirror",
//   "form",
//   "connect",
//   "industry",
//   "mode",
//   "variety",
//   "horizontal",
//   "out",
//   "remain",
//   "greatly",
//   "representative",
//   "commercial",
//   "off",
//   "british",
//   "position",
//   "onto",
//   "problem",
//   "level",
//   "copyright",
//   "dialog",
//   "interactive",
//   "compiler",
//   "ready",
//   "tutorial",
//   "warranty",
//   "suggest",
//   "available",
//   "tell",
//   "pool",
//   "deter",
//   "anytime",
//   "left",
//   "paper",
//   "procedural",
//   "assemble",
//   "fall",
//   "exceeded",
//   "busy",
//   "convenient",
//   "fly",
//   "due",
//   "green",
//   "reorganization",
//   "check",
//   "handle",
//   "classify",
//   "completely",
//   "distinguish",
//   "ending",
//   "coprocessor",
//   "manipulating",
//   "procedure",
//   "lending",
//   "management",
//   "permanently",
//   "temporarily",
//   "respectively",
//   "stated",
//   "lesson",
//   "background",
//   "mark",
//   "watch",
//   "safely",
//   "configuration",
//   "smooth",
//   "read",
//   "squeeze",
//   "anywhere",
//   "inside",
//   "recent",
//   "should",
//   "synchronize",
//   "colon",
//   "below",
//   "public",
//   "secondary",
//   "uppercase",
//   "length",
//   "recover",
//   "expression",
//   "indent",
//   "delimit",
//   "word",
//   "augment",
//   "access",
//   "table",
//   "worry",
//   "editor",
//   "connectivity",
//   "store",
//   "somewhat",
//   "encounter",
//   "allowed",
//   "aligned",
//   "incorrect",
//   "boot",
//   "resolution",
//   "physical",
//   "wise",
//   "loss",
//   "cross",
//   "mach",
//   "distribution",
//   "subsequently",
//   "exactly",
//   "loop",
//   "linker",
//   "emulator",
//   "particularly",
//   "filter",
//   "toward",
//   "main",
//   "eject",
//   "format",
//   "execute",
//   "platform",
//   "designate",
//   "even",
//   "unsuccessful",
//   "opinion",
//   "variable",
//   "enable",
//   "gain",
//   "rearrange",
//   "tape",
//   "alternately",
//   "among",
//   "vital",
//   "actual",
//   "newly",
//   "intensity",
//   "kilobyte",
//   "interpreter",
//   "snapshot",
//   "block",
//   "support",
//   "evaluate",
//   "pointer",
//   "keyboard",
//   "after",
//   "disregard",
//   "creation",
//   "crop",
//   "numerical",
//   "two",
//   "print",
//   "central",
//   "lexical",
//   "salary",
//   "tree",
//   "auto",
//   "repaint",
//   "fastback",
//   "signal",
//   "solution",
//   "hard",
//   "under",
//   "question",
//   "forced",
//   "square",
//   "restricted",
//   "partition",
//   "terminating",
//   "bus",
//   "turning",
//   "every",
//   "package",
//   "boundary",
//   "direct",
//   "ascending",
//   "bios",
//   "cad",
//   "translate",
//   "apple",
//   "becoming",
//   "reside",
//   "heap",
//   "description",
//   "beyond",
//   "red",
//   "situation",
//   "quickly",
//   "edge",
//   "move",
//   "positive",
//   "sheet",
//   "wildcard",
//   "surrounding",
//   "play",
//   "turnkey",
//   "hardly",
//   "conjunction",
//   "guide",
//   "clockwise",
//   "next",
//   "underscore",
//   "sub-directory",
//   "seldom",
//   "implement",
//   "decision",
//   "legal",
//   "current",
//   "retain",
//   "model",
//   "reserved",
//   "consideration",
//   "updated",
//   "inverse",
//   "only",
//   "enter",
//   "modification",
//   "issue",
//   "modified",
//   "sale",
//   "difference",
//   "archive",
//   "disconnect",
//   "talk",
//   "execution",
//   "closed",
//   "locating",
//   "formatting",
//   "congratulation",
//   "developer",
//   "turn",
//   "accidentally",
//   "fifth",
//   "end",
//   "report",
//   "base",
//   "video",
//   "hierarchical",
//   "successive",
//   "version",
//   "happening",
//   "medium",
//   "within",
//   "recognize",
//   "recommend",
//   "probably",
//   "several",
//   "alphabetically",
//   "fancy",
//   "reverse",
//   "distinction",
//   "certainty",
//   "unmarked",
//   "understand",
//   "employee",
//   "top",
//   "first",
//   "considered",
//   "template",
//   "directory",
//   "tension",
//   "true",
//   "numerous",
//   "powerful",
//   "number",
//   "paste",
//   "bar",
//   "just",
//   "port",
//   "caret",
//   "assignment",
//   "task",
//   "avoid",
//   "logarithm",
//   "formation",
//   "mean",
//   "printer",
//   "activate",
//   "menu",
//   "letter",
//   "prevent",
//   "exponent",
//   "tab",
//   "password",
//   "update",
//   "fourscore",
//   "join",
//   "send",
//   "placement",
//   "assign",
//   "option",
//   "warning",
//   "disappear",
//   "partial",
//   "subtract",
//   "calculate",
//   "breaking",
//   "deprecated",
//   "gradient",
//   "emitter",
//   "being",
//   "refers",
//   "alongside",
//   "intersection",
//   "daemon",
//   "approver",
//   "assignable",
//   "strategy",
//   "micro",
//   "interceptors",
//   "official",
//   "replenish",
//   "scheduler",
//   "limitations",
//   "allowable",
//   "perfect",
//   "wordperfect",
//   "simply",
//   "critical",
//   "allocate",
//   "assist",
//   "equivalent",
//   "yellow",
//   "overall",
//   "pipe",
//   "preceding",
//   "fundamental",
//   "comparison",
//   "suffix",
//   "calc",
//   "calculation",
//   "affect",
//   "additive",
//   "glass",
//   "love",
//   "star",
//   "shared",
//   "configure",
//   "involve",
//   "seek",
//   "accessible",
//   "portion",
//   "talent",
//   "subject",
//   "let",
//   "marking",
//   "reading",
//   "able",
//   "advice",
//   "cheap",
//   "quotes",
//   "world",
//   "detect",
//   "against",
//   "together",
//   "program",
//   "implicit",
//   "locale",
//   "cooldown",
//   "staging area",
//   "staging",
//   "automated",
//   "manual",
//   "further",
//   "so",
//   "primary",
//   "to be",
//   "safe",
//   "expire",
//   "schedule",
//   "scheduled",
//   "coupon",
//   "promo code",
//   "-ative",
//   "alter",
//   "precede",
//   "enclosing",
//   "voc",
//   "vac",
//   "para",
//   "since",
//   "proceed",
//   "semi",
//   "some",
//   "threshold",
//   "exclusion",
//   "idioms",
//   "fix",
//   "pond",
//   "surprise",
//   "may",
//   "loose",
//   "loos",
//   "inherit",
//   "radix",
//   "infinity",
//   "sales",
//   "rich",
//   "executor",
//   "operate",
//   "compose",
//   "closure",
//   "senior",
//   "personnel",
//   "personal",
//   "helper",
//   "generic",
//   "demo",
//   "dummy",
//   "race",
//   "prism",
//   "successor",
//   "precursor",
//   "arch",
//   "principle",
//   "advanced",
//   "migration",
//   "greater",
//   "propagation",
//   "stat",
//   "dirty",
//   "ambiguous",
// ];

// // 先调用 百度的翻译 api ，然后
// let transformResult = [];

// async function translateWord() {
//   let appid = "20220306001112345";
//   let salt = new Date().getTime();
//   for (let i = 0; i < dicts.length; i++) {
//     let q = dicts[i];
//     try {
//       let res = await axios({
//         method: "post",
//         url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//           cookie: cookie,
//         },
//         data: qs.stringify({
//           q,
//           from: "en",
//           to: "zh",
//           appid,
//           salt,
//           sign: md5(appid + q + salt + "EYr3FW5SINGXKvtJSdwO"),
//         }),
//       });
//       let result = res?.data?.trans_result[0]?.dst || `${q}: error`;
//       console.log(i, result);
//       transformResult.push({
//         q: q,
//         res: result,
//       });
//     } catch (e) {
//       // console.log(e)
//       console.log(i, q, "错误--------------------------------------------------------");
//     }
//   }
//   console.log(transformResult);
//   console.log(`423`);
// }

// // 记录一个异常的 index

// translateWord();

let arrDict = [
  {
    q: "antiwar",
    res: "反战",
  },
  {
    q: "abnormal",
    res: "不正常的",
  },
  {
    q: "believe",
    res: "相信",
  },
  {
    q: "uglify",
    res: "丑陋的",
  },
  {
    q: "distributive",
    res: "分配的",
  },
  {
    q: "solid",
    res: "固体",
  },
  {
    q: "float",
    res: "浮动",
  },
  {
    q: "absolute",
    res: "完全的",
  },
  {
    q: "entity",
    res: "实体",
  },
  {
    q: "news",
    res: "消息",
  },
  {
    q: "subtitle",
    res: "字幕",
  },
  {
    q: "aside",
    res: "在一边",
  },
  {
    q: "submenu",
    res: "子菜单",
  },
  {
    q: "wrapper",
    res: "包装纸",
  },
  {
    q: "container",
    res: "容器",
  },
  {
    q: "banner",
    res: "横幅",
  },
  {
    q: "logo",
    res: "标志",
  },
  {
    q: "forbidden",
    res: "被禁止的",
  },
  {
    q: "node",
    res: "节点",
  },
  {
    q: "revert",
    res: "还原",
  },
  {
    q: "extends",
    res: "延伸",
  },
  {
    q: "engine",
    res: "发动机",
  },
  {
    q: "ease",
    res: "缓解",
  },
  {
    q: "animation",
    res: "动画",
  },
  {
    q: "rotate",
    res: "旋转",
  },
  {
    q: "keep alive",
    res: "活着",
  },
  {
    q: "mix in",
    res: "混入",
  },
  {
    q: "mount",
    res: "攀登",
  },
  {
    q: "computed",
    res: "计算",
  },
  {
    q: "computers",
    res: "电脑",
  },
  {
    q: "await",
    res: "等候",
  },
  {
    q: "promise",
    res: "许诺",
  },
  {
    q: "constructor",
    res: "建造师",
  },
  {
    q: "abstract",
    res: "摘要",
  },
  {
    q: "diff",
    res: "差别",
  },
  {
    q: "merge",
    res: "合并",
  },
  {
    q: "checkout",
    res: "结账",
  },
  {
    q: "style",
    res: "风格",
  },
  {
    q: "footer",
    res: "页脚",
  },
  {
    q: "article",
    res: "文章",
  },
  {
    q: "contains",
    res: "包含",
  },
  {
    q: "download",
    res: "下载",
  },
  {
    q: "notify",
    res: "通知",
  },
  {
    q: "quota",
    res: "定额",
  },
  {
    q: "accumulator",
    res: "累加器",
  },
  {
    q: "deploy",
    res: "部署",
  },
  {
    q: "span",
    res: "跨度",
  },
  {
    q: "zone",
    res: "区",
  },
  {
    q: "region",
    res: "区域",
  },
  {
    q: "tools",
    res: "工具",
  },
  {
    q: "vendor",
    res: "小贩",
  },
  {
    q: "async",
    res: "异步的",
  },
  {
    q: "group",
    res: "组",
  },
  {
    q: "percent",
    res: "百分比",
  },
  {
    q: "inject",
    res: "注射",
  },
  {
    q: "percent",
    res: "百分比",
  },
  {
    q: "equate",
    res: "相等",
  },
  {
    q: "config",
    res: "配置",
  },
  {
    q: "alarm",
    res: "惊恐",
  },
  {
    q: "account",
    res: "账户",
  },
  {
    q: "scaling",
    res: "缩放比例",
  },
  {
    q: "apply",
    res: "申请",
  },
  {
    q: "pull",
    res: "拉",
  },
  {
    q: "proxy",
    res: "代理",
  },
  {
    q: "validator",
    res: "验证器",
  },
  {
    q: "constants",
    res: "常数",
  },
  {
    q: "listener",
    res: "听众",
  },
  {
    q: "iterator",
    res: "迭代器",
  },
  {
    q: "dict",
    res: "字典",
  },
  {
    q: "exceptional",
    res: "异常",
  },
  {
    q: "guest",
    res: "客人",
  },
  {
    q: "flow",
    res: "流",
  },
  {
    q: "favour",
    res: "恩惠",
  },
  {
    q: "options",
    res: "选项",
  },
  {
    q: "util",
    res: "util",
  },
  {
    q: "observer",
    res: "观察者",
  },
  {
    q: "customization",
    res: "定制",
  },
  {
    q: "when",
    res: "什么时候",
  },
  {
    q: "most",
    res: "最",
  },
  {
    q: "bundle",
    res: "捆",
  },
  {
    q: "rules",
    res: "规则",
  },
  {
    q: "should",
    res: "应该",
  },
  {
    q: "success",
    res: "成功",
  },
  {
    q: "reject",
    res: "拒绝",
  },
  {
    q: "permission",
    res: "准许",
  },
  {
    q: "bundler",
    res: "捆绑机",
  },
  {
    q: "better",
    res: "较好的",
  },
  {
    q: "cookie",
    res: "曲奇",
  },
  {
    q: "blog",
    res: "博客",
  },
  {
    q: "target",
    res: "目标",
  },
  {
    q: "as",
    res: "像",
  },
  {
    q: "export",
    res: "出口",
  },
  {
    q: "import",
    res: "进口",
  },
  {
    q: "modules",
    res: "模块",
  },
  {
    q: "plugin",
    res: "插件",
  },
  {
    q: "loader",
    res: "装载机",
  },
  {
    q: "concepts",
    res: "概念",
  },
  {
    q: "launch",
    res: "发射",
  },
  {
    q: "row span",
    res: "行跨度",
  },
  {
    q: "col span",
    res: "斯潘上校",
  },
  {
    q: "readonly",
    res: "只读",
  },
  {
    q: "checked",
    res: "选中的",
  },
  {
    q: "autofocus",
    res: "自动对焦",
  },
  {
    q: "placeholder",
    res: "占位符",
  },
  {
    q: "textarea",
    res: "文本区",
  },
  {
    q: "submit",
    res: "提交",
  },
  {
    q: "checkbox",
    res: "复选框",
  },
  {
    q: "radio",
    res: "无线电广播",
  },
  {
    q: "flex",
    res: "弯曲",
  },
  {
    q: "inline-block",
    res: "内联块",
  },
  {
    q: "border-radius",
    res: "边界半径",
  },
  {
    q: "shadow",
    res: "阴影",
  },
  {
    q: "dotted",
    res: "星罗棋布的",
  },
  {
    q: "dashed",
    res: "冲向",
  },
  {
    q: "smile",
    res: "微笑",
  },
  {
    q: "does",
    res: "做",
  },
  {
    q: "providing",
    res: "提供",
  },
  {
    q: "payload",
    res: "有效载荷",
  },
  {
    q: "practice",
    res: "实践",
  },
  {
    q: "subscribe",
    res: "订阅",
  },
  {
    q: "answers",
    res: "答案",
  },
  {
    q: "overload",
    res: "超载",
  },
  {
    q: "properties",
    res: "属性",
  },
  {
    q: "missing",
    res: "丢失的",
  },
  {
    q: "suspended",
    res: "暂停的",
  },
  {
    q: "creators",
    res: "创造者",
  },
  {
    q: "reducer",
    res: "减速器",
  },
  {
    q: "forwards",
    res: "转发",
  },
  {
    q: "reactive",
    res: "反应性",
  },
  {
    q: "mounted",
    res: "安装",
  },
  {
    q: "navigator",
    res: "领航员",
  },
  {
    q: "drawer",
    res: "抽屉",
  },
  {
    q: "components",
    res: "组件",
  },
  {
    q: "class",
    res: "班",
  },
  {
    q: "scale",
    res: "规模",
  },
  {
    q: "middleware",
    res: "中间件",
  },
  {
    q: "标签",
    res: "标签",
  },
  {
    q: "endnote",
    res: "尾注",
  },
  {
    q: "continuation",
    res: "继续",
  },
  {
    q: "optimized",
    res: "优化",
  },
  {
    q: "hoisting",
    res: "吊起",
  },
  {
    q: "permitted",
    res: "被允许",
  },
  {
    q: "expired",
    res: "期满",
  },
  {
    q: "seats",
    res: "座位",
  },
  {
    q: "priority",
    res: "优先事项",
  },
  {
    q: "packages",
    res: "包装",
  },
  {
    q: "repository",
    res: "存储库",
  },
  {
    q: "marketplace",
    res: "集市",
  },
  {
    q: "explore",
    res: "勘探",
  },
  {
    q: "issues",
    res: "问题",
  },
  {
    q: "super",
    res: "超级的",
  },
  {
    q: "site",
    res: "地点",
  },
  {
    q: "arguments",
    res: "论据",
  },
  {
    q: "any",
    res: "任何",
  },
  {
    q: "login",
    res: "登录",
  },
  {
    q: "logout",
    res: "注销",
  },
  {
    q: "alive",
    res: "活着的",
  },
  {
    q: "floor",
    res: "地板",
  },
  {
    q: "info",
    res: "信息",
  },
  {
    q: "user",
    res: "使用者",
  },
  {
    q: "business",
    res: "商业",
  },
  {
    q: "creator",
    res: "造物主",
  },
  {
    q: "transition",
    res: "过渡",
  },
  {
    q: "life",
    res: "生活",
  },
  {
    q: "component",
    res: "组成部分",
  },
  {
    q: "assets",
    res: "资产",
  },
  {
    q: "formatter",
    res: "格式化程序",
  },
  {
    q: "inner",
    res: "内部的",
  },
  {
    q: "outer",
    res: "外面的",
  },
  {
    q: "frame",
    res: "框架",
  },
  {
    q: "alert",
    res: "警觉的",
  },
  {
    q: "viewport",
    res: "视区",
  },
  {
    q: "refactor",
    res: "重构",
  },
  {
    q: "grid",
    res: "网格",
  },
  {
    q: "props",
    res: "道具",
  },
  {
    q: "justify",
    res: "证明正当",
  },
  {
    q: "rebase",
    res: "重基",
  },
  {
    q: "catch",
    res: "接住",
  },
  {
    q: "sync",
    res: "同步",
  },
  {
    q: "recursion",
    res: "递归",
  },
  {
    q: "render",
    res: "提供",
  },
  {
    q: "padding",
    res: "衬料",
  },
  {
    q: "offset",
    res: "抵消",
  },
  {
    q: "waterfall",
    res: "瀑布",
  },
  {
    q: "bail",
    res: "保释金",
  },
  {
    q: "signed",
    res: "签署",
  },
  {
    q: "currying",
    res: "咖喱",
  },
  {
    q: "registry",
    res: "登记处",
  },
  {
    q: "presets",
    res: "预设",
  },
  {
    q: "supported",
    res: "支持",
  },
  {
    q: "concern",
    res: "涉及",
  },
  {
    q: "推荐",
    res: "推荐",
  },
  {
    q: "writer",
    res: "作家",
  },
  {
    q: "browser",
    res: "浏览器",
  },
  {
    q: "mock",
    res: "嘲弄",
  },
  {
    q: "fallback",
    res: "退路",
  },
  {
    q: "directives",
    res: "指令",
  },
  {
    q: "disallowed",
    res: "不允许",
  },
  {
    q: "best",
    res: "最好的",
  },
  {
    q: "breadcrumb",
    res: "面包屑",
  },
  {
    q: "popover",
    res: "爆米花",
  },
  {
    q: "tips",
    res: "提示",
  },
  {
    q: "tip",
    res: "提示",
  },
  {
    q: "badge",
    res: "徽章",
  },
  {
    q: "steps",
    res: "台阶",
  },
  {
    q: "avatar",
    res: "阿凡达",
  },
  {
    q: "upload",
    res: "上载",
  },
  {
    q: "mutable",
    res: "易变的",
  },
  {
    q: "might",
    res: "可以",
  },
  {
    q: "core",
    res: "果心",
  },
  {
    q: "notice",
    res: "注意",
  },
  {
    q: "behave",
    res: "表现",
  },
  {
    q: "internet",
    res: "互联网",
  },
  {
    q: "instances",
    res: "实例",
  },
  {
    q: "inline",
    res: "内联",
  },
  {
    q: "family",
    res: "家庭",
  },
  {
    q: "bytecode",
    res: "字节码",
  },
  {
    q: "bound",
    res: "跳跃",
  },
  {
    q: "Boolean",
    res: "布尔值",
  },
  {
    q: "binding",
    res: "结合",
  },
  {
    q: "binary tree",
    res: "二叉树",
  },
  {
    q: "base class",
    res: "基层",
  },
  {
    q: "base case",
    res: "基本情况",
  },
  {
    q: "bandwidth",
    res: "带宽",
  },
  {
    q: "back quote",
    res: "反引号",
  },
  {
    q: "atom",
    res: "原子",
  },
  {
    q: "annotation",
    res: "注释",
  },
  {
    q: "ad hoc",
    res: "临时的",
  },
  {
    q: "sources",
    res: "来源",
  },
  {
    q: "media",
    res: "媒体",
  },
  {
    q: "referer",
    res: "推荐人",
  },
  {
    q: "referrer",
    res: "推荐人",
  },
  {
    q: "policy",
    res: "政策",
  },
  {
    q: "remote",
    res: "遥远的",
  },
  {
    q: "owner",
    res: "物主",
  },
  {
    q: "key map",
    res: "关键地图",
  },
  {
    q: "features",
    res: "特征",
  },
  {
    q: "feedback",
    res: "反馈",
  },
  {
    q: "splice",
    res: "捻接",
  },
  {
    q: "should be",
    res: "应该是",
  },
  {
    q: "a block of pointers",
    res: "一块指针",
  },
  {
    q: "organized",
    res: "有组织的",
  },
  {
    q: "event",
    res: "事件",
  },
  {
    q: "strict",
    res: "严格的",
  },
  {
    q: "router",
    res: "路由器",
  },
  {
    q: "concat",
    res: "海螺",
  },
  {
    q: "emit",
    res: "发出",
  },
  {
    q: "dispatch",
    res: "派遣",
  },
  {
    q: "opacity",
    res: "不透明度",
  },
  {
    q: "focus",
    res: "集中",
  },
  {
    q: "expose",
    res: "暴露",
  },
  {
    q: "graph",
    res: "图表",
  },
  {
    q: "stage",
    res: "阶段",
  },
  {
    q: "capacity",
    res: "容量",
  },
  {
    q: "amend",
    res: "修正",
  },
  {
    q: "tracked",
    res: "追踪",
  },
  {
    q: "extensible",
    res: "可扩展",
  },
  {
    q: "defer",
    res: "推迟",
  },
  {
    q: "chain",
    res: "链条",
  },
  {
    q: "deployment",
    res: "部署",
  },
  {
    q: "from prep",
    res: "来自prep",
  },
  {
    q: "with prep",
    res: "准备好了吗",
  },
  {
    q: "by prep",
    res: "准备",
  },
  {
    q: "not found",
    res: "找不到",
  },
  {
    q: "latest",
    res: "最近的",
  },
  {
    q: "duration",
    res: "期间",
  },
  {
    q: "calendar",
    res: "日历",
  },
  {
    q: "dataset",
    res: "数据集",
  },
  {
    q: "toolbox",
    res: "工具箱",
  },
  {
    q: "brush",
    res: "刷子",
  },
  {
    q: "GOE",
    res: "戈",
  },
  {
    q: "radar",
    res: "雷达",
  },
  {
    q: "radius",
    res: "半径",
  },
  {
    q: "polar",
    res: "极地的",
  },
  {
    q: "legend",
    res: "传奇",
  },
  {
    q: "axis",
    res: "轴",
  },
  {
    q: "encode",
    res: "编码",
  },
  {
    q: "dimensions",
    res: "尺寸",
  },
  {
    q: "bezier curve",
    res: "贝塞尔曲线",
  },
  {
    q: "polyline",
    res: "多段线",
  },
  {
    q: "polygon",
    res: "多边形",
  },
  {
    q: "arc",
    res: "弧",
  },
  {
    q: "rect",
    res: "直肠",
  },
  {
    q: "tooltip",
    res: "工具提示",
  },
  {
    q: "easing",
    res: "缓和",
  },
  {
    q: "Delay",
    res: "延迟",
  },
  {
    q: "silent",
    res: "不说话的",
  },
  {
    q: "clip",
    res: "夹子",
  },
  {
    q: "emphasis",
    res: "强调",
  },
  {
    q: "pie",
    res: "馅饼",
  },
  {
    q: "secret",
    res: "秘密",
  },
  {
    q: "salt",
    res: "盐",
  },
  {
    q: "established",
    res: "确立",
  },
  {
    q: "validate",
    res: "验证",
  },
  {
    q: "params",
    res: "params",
  },
  {
    q: "visit",
    res: "参观",
  },
  {
    q: "collect",
    res: "收集",
  },
  {
    q: "modern",
    res: "现代的",
  },
  {
    q: "patch",
    res: "色斑",
  },
  {
    q: "chunks",
    res: "大块",
  },
  {
    q: "iterable",
    res: "可迭代的",
  },
  {
    q: "notable",
    res: "值得注意的",
  },
  {
    q: "inventory",
    res: "库存",
  },
  {
    q: "accessed",
    res: "访问",
  },
  {
    q: "hungry",
    res: "感到饿的",
  },
  {
    q: "awesome",
    res: "令人惊叹的",
  },
  {
    q: "elasticity",
    res: "弹性",
  },
  {
    q: "audit",
    res: "审计",
  },
  {
    q: "resource",
    res: "资源",
  },
  {
    q: "framework",
    res: "框架",
  },
  {
    q: "danger",
    res: "危险",
  },
  {
    q: "using",
    res: "使用",
  },
  {
    q: "narrowing",
    res: "缩小",
  },
  {
    q: "mini",
    res: "迷你",
  },
  {
    q: "assertion",
    res: "断言",
  },
  {
    q: "relocation",
    res: "重新安置",
  },
  {
    q: "enum",
    res: "枚举",
  },
  {
    q: "hell",
    res: "地狱",
  },
  {
    q: "parser",
    res: "解析器",
  },
  {
    q: "shutdown",
    res: "关闭",
  },
  {
    q: "detached",
    res: "独立的",
  },
  {
    q: "cherry",
    res: "樱桃",
  },
  {
    q: "which pron",
    res: "哪一步",
  },
  {
    q: "button",
    res: "按钮",
  },
  {
    q: "without prep",
    res: "没有准备",
  },
  {
    q: "shape",
    res: "形状",
  },
  {
    q: "peek",
    res: "窥视",
  },
  {
    q: "sold out",
    res: "售罄",
  },
  {
    q: "Available",
    res: "可获得的",
  },
  {
    q: "repertory",
    res: "保留剧目轮演",
  },
  {
    q: "polyfill",
    res: "polyfill",
  },
  {
    q: "inserted",
    res: "插入",
  },
  {
    q: "inspect",
    res: "检查",
  },
  {
    q: "implied",
    res: "暗指的",
  },
  {
    q: "declarations",
    res: "声明",
  },
  {
    q: "walk",
    res: "步行",
  },
  {
    q: "squash",
    res: "南瓜",
  },
  {
    q: "pick",
    res: "选择",
  },
  {
    q: "brand",
    res: "品牌",
  },
  {
    q: "locally",
    res: "局部",
  },
  {
    q: "pieces",
    res: "件",
  },
  {
    q: "blame",
    res: "责备",
  },
  {
    q: "annotate",
    res: "注释",
  },
  {
    q: "folding",
    res: "折叠",
  },
  {
    q: "externals",
    res: "外部",
  },
  {
    q: "unfold",
    res: "展开",
  },
  {
    q: "tail",
    res: "尾",
  },
  {
    q: "attach",
    res: "贴上",
  },
  {
    q: "logger",
    res: "记录器",
  },
  {
    q: "multer",
    res: "穆特",
  },
  {
    q: "distinct",
    res: "不同的",
  },
  {
    q: "lease",
    res: "租赁",
  },
  {
    q: "since prep",
    res: "自从准备",
  },
  {
    q: "lean",
    res: "前俯",
  },
  {
    q: "extensions",
    res: "扩展",
  },
  {
    q: "terser",
    res: "简洁的",
  },
  {
    q: "flatten",
    res: "压平",
  },
  {
    q: "parsing",
    res: "解析",
  },
  {
    q: "staff",
    res: "工作人员",
  },
  {
    q: "bonus",
    res: "奖金",
  },
  {
    q: "raise",
    res: "提升",
  },
  {
    q: "hire",
    res: "租用",
  },
  {
    q: "triple",
    res: "三部分的",
  },
  {
    q: "origin",
    res: "起源",
  },
  {
    q: "incoming",
    res: "新当选的",
  },
  {
    q: "stash",
    res: "藏匿",
  },
  {
    q: "lower",
    res: "降低",
  },
  {
    q: "come",
    res: "来",
  },
  {
    q: "step",
    res: "步",
  },
  {
    q: "consist",
    res: "包括",
  },
  {
    q: "sequence",
    res: "序列",
  },
  {
    q: "share",
    res: "共有",
  },
  {
    q: "stop",
    res: "停止",
  },
  {
    q: "floating",
    res: "浮动",
  },
  {
    q: "slow",
    res: "缓慢的",
  },
  {
    q: "around",
    res: "围绕",
  },
  {
    q: "aboveboard",
    res: "光明正大的",
  },
  {
    q: "macros",
    res: "宏",
  },
  {
    q: "replacement",
    res: "替换",
  },
  {
    q: "monitor",
    res: "班长",
  },
  {
    q: "resume",
    res: "简历",
  },
  {
    q: "alphabetical",
    res: "按字母顺序排列的",
  },
  {
    q: "empty",
    res: "空的",
  },
  {
    q: "compatible",
    res: "可共用的",
  },
  {
    q: "disable",
    res: "使残废",
  },
  {
    q: "regardless",
    res: "不管",
  },
  {
    q: "I think therefore I am",
    res: "我思故我在",
  },
  {
    q: "abolish",
    res: "废除",
  },
  {
    q: "immediate",
    res: "立即的",
  },
  {
    q: "conflicts",
    res: "冲突",
  },
  {
    q: "delivery",
    res: "传送",
  },
  {
    q: "doubly",
    res: "加倍",
  },
  {
    q: "pivot",
    res: "支点",
  },
  {
    q: "smallest",
    res: "最小的",
  },
  {
    q: "deadline",
    res: "最后期限",
  },
  {
    q: "mid",
    res: "中间",
  },
  {
    q: "rear",
    res: "后方的",
  },
  {
    q: "throttle",
    res: "掐死",
  },
  {
    q: "debounce",
    res: "脱盎司",
  },
  {
    q: "prime",
    res: "首要的",
  },
  {
    q: "tuple",
    res: "元组",
  },
  {
    q: "bucket",
    res: "水桶",
  },
  {
    q: "removal",
    res: "移动",
  },
  {
    q: "cluster",
    res: "簇",
  },
  {
    q: "tracking",
    res: "追踪",
  },
  {
    q: "redeem",
    res: "赎回",
  },
  {
    q: "first name",
    res: "名字",
  },
  {
    q: "Coupon or Promo code",
    res: "优惠券或促销代码",
  },
  {
    q: "wife",
    res: "妻子",
  },
  {
    q: "frozen",
    res: "冻结的",
  },
  {
    q: "passive",
    res: "消极的",
  },
  {
    q: "meal",
    res: "一餐",
  },
  {
    q: "candidate",
    res: "候选人",
  },
  {
    q: "cloud",
    res: "云",
  },
  {
    q: "specified",
    res: "明确规定",
  },
  {
    q: "stroke",
    res: "(打、击等的)一下",
  },
  {
    q: "pseudo",
    res: "伪",
  },
  {
    q: "payment",
    res: "付款",
  },
  {
    q: "ware",
    res: "器皿",
  },
  {
    q: "effort",
    res: "气力",
  },
  {
    q: "record",
    res: "记录",
  },
  {
    q: "blast",
    res: "爆炸",
  },
  {
    q: "printout",
    res: "打印输出",
  },
  {
    q: "assumed",
    res: "假定",
  },
  {
    q: "logged",
    res: "记录",
  },
  {
    q: "locate",
    res: "定位",
  },
  {
    q: "navigate",
    res: "导航",
  },
  {
    q: "match",
    res: "火柴",
  },
  {
    q: "complex",
    res: "复杂的",
  },
  {
    q: "take",
    res: "拿",
  },
  {
    q: "connection",
    res: "联系",
  },
  {
    q: "though",
    res: "虽然",
  },
  {
    q: "vertical",
    res: "竖的",
  },
  {
    q: "unlike",
    res: "不像",
  },
  {
    q: "cause",
    res: "原因",
  },
  {
    q: "but",
    res: "但是",
  },
  {
    q: "magenta",
    res: "洋红",
  },
  {
    q: "round",
    res: "圆形的",
  },
  {
    q: "short",
    res: "短的",
  },
  {
    q: "history",
    res: "历史",
  },
  {
    q: "argument",
    res: "论点",
  },
  {
    q: "substitute",
    res: "代替",
  },
  {
    q: "subset",
    res: "子集",
  },
  {
    q: "affected",
    res: "影响",
  },
  {
    q: "unsigned",
    res: "未签名",
  },
  {
    q: "associated",
    res: "相关",
  },
  {
    q: "restrict",
    res: "限制",
  },
  {
    q: "rating",
    res: "评级",
  },
  {
    q: "attribute",
    res: "属性",
  },
  {
    q: "minimum",
    res: "最低限度",
  },
  {
    q: "parent",
    res: "父母亲",
  },
  {
    q: "carry",
    res: "拿",
  },
  {
    q: "asset",
    res: "资产",
  },
  {
    q: "suspend",
    res: "悬",
  },
  {
    q: "valid",
    res: "有效的",
  },
  {
    q: "count",
    res: "计数",
  },
  {
    q: "describe",
    res: "描述",
  },
  {
    q: "convert",
    res: "转换",
  },
  {
    q: "visible",
    res: "看得见的",
  },
  {
    q: "function",
    res: "作用",
  },
  {
    q: "spill",
    res: "溢出",
  },
  {
    q: "grey",
    res: "灰色",
  },
  {
    q: "recall",
    res: "回忆起",
  },
  {
    q: "suspension",
    res: "暂停",
  },
  {
    q: "interpretable",
    res: "可解释的",
  },
  {
    q: "previous",
    res: "以前的",
  },
  {
    q: "period",
    res: "时期",
  },
  {
    q: "sun",
    res: "太阳",
  },
  {
    q: "technical",
    res: "技术的",
  },
  {
    q: "preserve",
    res: "保护",
  },
  {
    q: "future",
    res: "将来",
  },
  {
    q: "making",
    res: "制作",
  },
  {
    q: "safety",
    res: "安全",
  },
  {
    q: "intense",
    res: "强烈的",
  },
  {
    q: "circle",
    res: "圆圈",
  },
  {
    q: "tick",
    res: "打上钩",
  },
  {
    q: "dot",
    res: "点",
  },
  {
    q: "initially",
    res: "开始",
  },
  {
    q: "profile",
    res: "轮廓",
  },
  {
    q: "freeze",
    res: "冻结",
  },
  {
    q: "habit",
    res: "习惯",
  },
  {
    q: "starting",
    res: "启动",
  },
  {
    q: "low",
    res: "低的",
  },
  {
    q: "nor",
    res: "也没有",
  },
  {
    q: "index",
    res: "指数",
  },
  {
    q: "note",
    res: "笔记",
  },
  {
    q: "mono",
    res: "单声道",
  },
  {
    q: "ellipsis",
    res: "省略",
  },
  {
    q: "time",
    res: "时间",
  },
  {
    q: "away",
    res: "离开",
  },
  {
    q: "basic",
    res: "基本的",
  },
  {
    q: "desire",
    res: "愿望",
  },
  {
    q: "semicolon",
    res: "分号",
  },
  {
    q: "subtotal",
    res: "小计",
  },
  {
    q: "undone",
    res: "解开",
  },
  {
    q: "roll",
    res: "卷",
  },
  {
    q: "entirely",
    res: "完全",
  },
  {
    q: "magic",
    res: "魔术",
  },
  {
    q: "hyphen",
    res: "连字符",
  },
  {
    q: "valuable",
    res: "有价值的",
  },
  {
    q: "architecture",
    res: "建筑学",
  },
  {
    q: "skill",
    res: "技巧",
  },
  {
    q: "setting",
    res: "背景",
  },
  {
    q: "attached",
    res: "附属的",
  },
  {
    q: "interrupt",
    res: "打断",
  },
  {
    q: "expansion",
    res: "膨胀",
  },
  {
    q: "activity",
    res: "活动",
  },
  {
    q: "along",
    res: "沿着",
  },
  {
    q: "twice",
    res: "两次",
  },
  {
    q: "computer",
    res: "计算机",
  },
  {
    q: "separately",
    res: "分别地",
  },
  {
    q: "shift",
    res: "转移",
  },
  {
    q: "means",
    res: "方法",
  },
  {
    q: "possible",
    res: "可能的",
  },
  {
    q: "reserve",
    res: "储备",
  },
  {
    q: "similar",
    res: "相像的",
  },
  {
    q: "denote",
    res: "标志",
  },
  {
    q: "huge",
    res: "巨大的",
  },
  {
    q: "underlying",
    res: "根本的",
  },
  {
    q: "require",
    res: "要求",
  },
  {
    q: "hide",
    res: "隐藏",
  },
  {
    q: "external",
    res: "外部的",
  },
  {
    q: "internally",
    res: "内部",
  },
  {
    q: "double",
    res: "双重的",
  },
  {
    q: "advance",
    res: "进展",
  },
  {
    q: "administrator",
    res: "管理员",
  },
  {
    q: "sequentially",
    res: "顺序地",
  },
  {
    q: "exponential",
    res: "指数型",
  },
  {
    q: "finished",
    res: "完成",
  },
  {
    q: "flush",
    res: "脸红",
  },
  {
    q: "convention",
    res: "习俗",
  },
  {
    q: "eventually",
    res: "最后",
  },
  {
    q: "terminate",
    res: "终止",
  },
  {
    q: "manager",
    res: "经理",
  },
  {
    q: "mistake",
    res: "错误",
  },
  {
    q: "lowercase",
    res: "小写字母",
  },
  {
    q: "clause",
    res: "条款",
  },
  {
    q: "by",
    res: "通过",
  },
  {
    q: "random",
    res: "随机的",
  },
  {
    q: "collection",
    res: "收集",
  },
  {
    q: "unused",
    res: "未使用",
  },
  {
    q: "syntax",
    res: "语法",
  },
  {
    q: "compile",
    res: "编写",
  },
  {
    q: "provide",
    res: "提供",
  },
  {
    q: "correction",
    res: "校正",
  },
  {
    q: "reduction",
    res: "减少",
  },
  {
    q: "structural",
    res: "结构的",
  },
  {
    q: "physically",
    res: "身体上",
  },
  {
    q: "look",
    res: "看",
  },
  {
    q: "back",
    res: "返回",
  },
  {
    q: "prefer",
    res: "更喜欢",
  },
  {
    q: "assigned",
    res: "分配",
  },
  {
    q: "attention",
    res: "注意",
  },
  {
    q: "route",
    res: "路线",
  },
  {
    q: "important",
    res: "重要的",
  },
  {
    q: "keypad",
    res: "键盘",
  },
  {
    q: "depend",
    res: "依赖",
  },
  {
    q: "assistance",
    res: "帮助",
  },
  {
    q: "independent",
    res: "独立的",
  },
  {
    q: "software",
    res: "软件",
  },
  {
    q: "beep",
    res: "嘟嘟声",
  },
  {
    q: "above",
    res: "在上面",
  },
  {
    q: "teach",
    res: "教",
  },
  {
    q: "cpu",
    res: "中央处理器",
  },
  {
    q: "example",
    res: "实例",
  },
  {
    q: "if",
    res: "如果",
  },
  {
    q: "complexity",
    res: "复杂性",
  },
  {
    q: "controller",
    res: "控制器",
  },
  {
    q: "ensemble",
    res: "表演团体",
  },
  {
    q: "normal",
    res: "典型的",
  },
  {
    q: "visual",
    res: "视力的",
  },
  {
    q: "finish",
    res: "完成",
  },
  {
    q: "card",
    res: "卡片",
  },
  {
    q: "repeated",
    res: "重复的",
  },
  {
    q: "either",
    res: "任何一个",
  },
  {
    q: "install",
    res: "安装",
  },
  {
    q: "truncate",
    res: "截断",
  },
  {
    q: "minus",
    res: "减",
  },
  {
    q: "trigger",
    res: "触发",
  },
  {
    q: "until",
    res: "直到",
  },
  {
    q: "team",
    res: "团队",
  },
  {
    q: "degrade",
    res: "降低",
  },
  {
    q: "recoverable",
    res: "可恢复的",
  },
  {
    q: "obsolete",
    res: "淘汰的",
  },
  {
    q: "qualified",
    res: "有资格的",
  },
  {
    q: "lot",
    res: "大量",
  },
  {
    q: "scattered",
    res: "分散的",
  },
  {
    q: "significant",
    res: "重要的",
  },
  {
    q: "command",
    res: "命令",
  },
  {
    q: "easy",
    res: "容易的",
  },
  {
    q: "job",
    res: "工作",
  },
  {
    q: "remainder",
    res: "余数",
  },
  {
    q: "parse",
    res: "作语法分析",
  },
  {
    q: "correctly",
    res: "正确地",
  },
  {
    q: "piece",
    res: "块",
  },
  {
    q: "vowel",
    res: "元音",
  },
  {
    q: "redundant",
    res: "冗余的",
  },
  {
    q: "office",
    res: "办公室",
  },
  {
    q: "rent",
    res: "租金",
  },
  {
    q: "exclude",
    res: "排除",
  },
  {
    q: "accelerator",
    res: "加速器",
  },
  {
    q: "cycle",
    res: "周期",
  },
  {
    q: "address",
    res: "住址",
  },
  {
    q: "rectangle",
    res: "长方形",
  },
  {
    q: "delete",
    res: "删去",
  },
  {
    q: "redraw",
    res: "重画",
  },
  {
    q: "latter",
    res: "后者的",
  },
  {
    q: "choice",
    res: "选择",
  },
  {
    q: "whereas",
    res: "鉴于",
  },
  {
    q: "effect",
    res: "效应",
  },
  {
    q: "setup",
    res: "设置",
  },
  {
    q: "combo",
    res: "联合体",
  },
  {
    q: "now",
    res: "现在",
  },
  {
    q: "incompatible",
    res: "不相容的",
  },
  {
    q: "exception",
    res: "例外",
  },
  {
    q: "stopping",
    res: "停止",
  },
  {
    q: "ampersand",
    res: "符号",
  },
  {
    q: "diacritical",
    res: "变调的",
  },
  {
    q: "escape",
    res: "逃跑",
  },
  {
    q: "dual",
    res: "二重的",
  },
  {
    q: "all",
    res: "全部的",
  },
  {
    q: "separated",
    res: "分开的",
  },
  {
    q: "respect",
    res: "尊敬",
  },
  {
    q: "dump",
    res: "倾倒",
  },
  {
    q: "rename",
    res: "改名",
  },
  {
    q: "into",
    res: "进入",
  },
  {
    q: "traverse",
    res: "穿过",
  },
  {
    q: "shield",
    res: "盾",
  },
  {
    q: "quick",
    res: "快的",
  },
  {
    q: "department",
    res: "部门",
  },
  {
    q: "serial",
    res: "电视连续剧",
  },
  {
    q: "negative",
    res: "消极的",
  },
  {
    q: "outcome",
    res: "结果",
  },
  {
    q: "suitable",
    res: "合适的",
  },
  {
    q: "item",
    res: "项目",
  },
  {
    q: "contrast",
    res: "明显的差异",
  },
  {
    q: "programming",
    res: "编程",
  },
  {
    q: "macro",
    res: "宏",
  },
  {
    q: "about",
    res: "关于",
  },
  {
    q: "express",
    res: "表示",
  },
  {
    q: "permit",
    res: "许可证",
  },
  {
    q: "alpha",
    res: "阿尔法",
  },
  {
    q: "multiple",
    res: "倍数",
  },
  {
    q: "list",
    res: "列表",
  },
  {
    q: "help",
    res: "帮助",
  },
  {
    q: "insert",
    res: "插入",
  },
  {
    q: "familiar",
    res: "熟悉的",
  },
  {
    q: "lowest",
    res: "最低的",
  },
  {
    q: "error",
    res: "错误",
  },
  {
    q: "definition",
    res: "释义",
  },
  {
    q: "rectangular",
    res: "矩形的",
  },
  {
    q: "proprietary",
    res: "专有的",
  },
  {
    q: "expunge",
    res: "消除",
  },
  {
    q: "arrow",
    res: "箭",
  },
  {
    q: "hex",
    res: "十六进制",
  },
  {
    q: "meaning",
    res: "意思",
  },
  {
    q: "reflect",
    res: "反映",
  },
  {
    q: "represent",
    res: "代表",
  },
  {
    q: "nothing",
    res: "没有什么",
  },
  {
    q: "manually",
    res: "手动",
  },
  {
    q: "demonstration",
    res: "集会示威",
  },
  {
    q: "skip",
    res: "跳过",
  },
  {
    q: "indicate",
    res: "表明",
  },
  {
    q: "wide",
    res: "宽的",
  },
  {
    q: "discard",
    res: "丢弃",
  },
  {
    q: "application",
    res: "应用",
  },
  {
    q: "depth",
    res: "深度",
  },
  {
    q: "identify",
    res: "识别",
  },
  {
    q: "selected",
    res: "挑选出来的",
  },
  {
    q: "facility",
    res: "设施",
  },
  {
    q: "sentence",
    res: "句子",
  },
  {
    q: "arithmetic",
    res: "算术",
  },
  {
    q: "environment",
    res: "环境",
  },
  {
    q: "instead",
    res: "相反",
  },
  {
    q: "grant",
    res: "授予",
  },
  {
    q: "handling",
    res: "处理",
  },
  {
    q: "drive",
    res: "驾驶",
  },
  {
    q: "static",
    res: "静止的",
  },
  {
    q: "replace",
    res: "代替",
  },
  {
    q: "stand",
    res: "站",
  },
  {
    q: "specify",
    res: "具体说明",
  },
  {
    q: "monochrome",
    res: "单色",
  },
  {
    q: "occasionally",
    res: "偶尔地",
  },
  {
    q: "other",
    res: "另外",
  },
  {
    q: "topic",
    res: "话题",
  },
  {
    q: "enhance",
    res: "增强",
  },
  {
    q: "idea",
    res: "主意",
  },
  {
    q: "fragment",
    res: "碎片",
  },
  {
    q: "concatenate",
    res: "连接",
  },
  {
    q: "automatic",
    res: "自动的",
  },
  {
    q: "resolve",
    res: "决定",
  },
  {
    q: "exact",
    res: "准确的",
  },
  {
    q: "guard",
    res: "警卫",
  },
  {
    q: "growing",
    res: "增长的",
  },
  {
    q: "content",
    res: "所容纳之物",
  },
  {
    q: "combine",
    res: "结合",
  },
  {
    q: "little",
    res: "小的",
  },
  {
    q: "rest",
    res: "休息",
  },
  {
    q: "examine",
    res: "检查",
  },
  {
    q: "operator",
    res: "操作人员",
  },
  {
    q: "with",
    res: "具有",
  },
  {
    q: "three",
    res: "三",
  },
  {
    q: "specific",
    res: "具体的",
  },
  {
    q: "environmental",
    res: "环境的",
  },
  {
    q: "use",
    res: "使用",
  },
  {
    q: "soft",
    res: "软的",
  },
  {
    q: "windowing",
    res: "开窗",
  },
  {
    q: "maintain",
    res: "维持",
  },
  {
    q: "processor",
    res: "加工机",
  },
  {
    q: "free",
    res: "自由的",
  },
  {
    q: "unformatted",
    res: "无格式",
  },
  {
    q: "agree",
    res: "同意",
  },
  {
    q: "day",
    res: "白天",
  },
  {
    q: "auto index",
    res: "自动索引",
  },
  {
    q: "reset",
    res: "重置",
  },
  {
    q: "differ",
    res: "相异",
  },
  {
    q: "reorder",
    res: "重新排序",
  },
  {
    q: "offer",
    res: "提供",
  },
  {
    q: "predict",
    res: "预测",
  },
  {
    q: "open",
    res: "打开",
  },
  {
    q: "anticipate",
    res: "预料",
  },
  {
    q: "contain",
    res: "包含",
  },
  {
    q: "size",
    res: "大小",
  },
  {
    q: "handler",
    res: "处理者",
  },
  {
    q: "capture",
    res: "俘虏",
  },
  {
    q: "father",
    res: "父亲",
  },
  {
    q: "fail",
    res: "失败",
  },
  {
    q: "enclose",
    res: "随函附上",
  },
  {
    q: "appear",
    res: "显得",
  },
  {
    q: "destination",
    res: "目的地",
  },
  {
    q: "abort",
    res: "中止",
  },
  {
    q: "picture",
    res: "相片",
  },
  {
    q: "declare",
    res: "声明",
  },
  {
    q: "mega",
    res: "巨大的",
  },
  {
    q: "integer",
    res: "整数",
  },
  {
    q: "overflow",
    res: "溢流",
  },
  {
    q: "retrieve",
    res: "检索",
  },
  {
    q: "angle",
    res: "角",
  },
  {
    q: "need",
    res: "需要",
  },
  {
    q: "backup",
    res: "备份",
  },
  {
    q: "document",
    res: "文件",
  },
  {
    q: "again",
    res: "再一次",
  },
  {
    q: "heading",
    res: "标题",
  },
  {
    q: "give",
    res: "给",
  },
  {
    q: "client",
    res: "客户",
  },
  {
    q: "backward",
    res: "向后的",
  },
  {
    q: "precedence",
    res: "优先",
  },
  {
    q: "hidden",
    res: "隐藏的",
  },
  {
    q: "restricting",
    res: "限制",
  },
  {
    q: "pair",
    res: "一对",
  },
  {
    q: "result",
    res: "后果",
  },
  {
    q: "way",
    res: "方法",
  },
  {
    q: "invoke",
    res: "援引",
  },
  {
    q: "both",
    res: "二者都",
  },
  {
    q: "append",
    res: "追加",
  },
  {
    q: "hexadecimal",
    res: "十六进制",
  },
  {
    q: "clock",
    res: "时钟",
  },
  {
    q: "date",
    res: "日期",
  },
  {
    q: "pending",
    res: "悬而未决的",
  },
  {
    q: "controlled",
    res: "受约束的",
  },
  {
    q: "corner",
    res: "角",
  },
  {
    q: "big",
    res: "大的",
  },
  {
    q: "penalty",
    res: "处罚",
  },
  {
    q: "limit",
    res: "限度",
  },
  {
    q: "color",
    res: "颜色",
  },
  {
    q: "contact",
    res: "联系",
  },
  {
    q: "bracket",
    res: "支架",
  },
  {
    q: "log",
    res: "日志",
  },
  {
    q: "global",
    res: "全球的",
  },
  {
    q: "twentieth",
    res: "第二十",
  },
  {
    q: "push",
    res: "推",
  },
  {
    q: "variant",
    res: "变种",
  },
  {
    q: "such",
    res: "这样的",
  },
  {
    q: "reenter",
    res: "重新进入",
  },
  {
    q: "aware",
    res: "意识到的",
  },
  {
    q: "unknown",
    res: "未知的",
  },
  {
    q: "pattern",
    res: "图案",
  },
  {
    q: "decrease",
    res: "减少",
  },
  {
    q: "echo",
    res: "回响",
  },
  {
    q: "esoteric",
    res: "深奥的",
  },
  {
    q: "manner",
    res: "方式",
  },
  {
    q: "least",
    res: "最小的",
  },
  {
    q: "unshift",
    res: "取消移位",
  },
  {
    q: "leave",
    res: "离开",
  },
  {
    q: "rewrite",
    res: "重写",
  },
  {
    q: "mixture",
    res: "混合物",
  },
  {
    q: "maximum",
    res: "最大限度",
  },
  {
    q: "aid",
    res: "帮助",
  },
  {
    q: "previously",
    res: "先前",
  },
  {
    q: "become",
    res: "成为",
  },
  {
    q: "trying",
    res: "尝试",
  },
  {
    q: "header",
    res: "标题",
  },
  {
    q: "delimiter",
    res: "定界符",
  },
  {
    q: "glance",
    res: "一瞥",
  },
  {
    q: "holding",
    res: "举办",
  },
  {
    q: "trace",
    res: "查出",
  },
  {
    q: "intervene",
    res: "干预",
  },
  {
    q: "line",
    res: "线",
  },
  {
    q: "extract",
    res: "摘录",
  },
  {
    q: "range",
    res: "范围",
  },
  {
    q: "presence",
    res: "在场",
  },
  {
    q: "destroy",
    res: "摧毁",
  },
  {
    q: "find",
    res: "发现",
  },
  {
    q: "employe",
    res: "雇员",
  },
  {
    q: "mainframe",
    res: "主机",
  },
  {
    q: "noted",
    res: "注意",
  },
  {
    q: "upon",
    res: "在上面",
  },
  {
    q: "click",
    res: "点击",
  },
  {
    q: "capitalized",
    res: "资本化",
  },
  {
    q: "buffer",
    res: "缓冲器",
  },
  {
    q: "american",
    res: "美国人",
  },
  {
    q: "care",
    res: "照顾",
  },
  {
    q: "certain",
    res: "某些",
  },
  {
    q: "collapse",
    res: "崩溃",
  },
  {
    q: "filing",
    res: "备案",
  },
  {
    q: "test",
    res: "测验",
  },
  {
    q: "home",
    res: "家",
  },
  {
    q: "substitution",
    res: "替代",
  },
  {
    q: "year",
    res: "年",
  },
  {
    q: "modifier",
    res: "修饰语",
  },
  {
    q: "insertion",
    res: "插入",
  },
  {
    q: "horizontally",
    res: "水平的",
  },
  {
    q: "compare",
    res: "比较",
  },
  {
    q: "remember",
    res: "回想起",
  },
  {
    q: "choose",
    res: "选择",
  },
  {
    q: "often",
    res: "经常",
  },
  {
    q: "vice",
    res: "恶习",
  },
  {
    q: "place",
    res: "位置",
  },
  {
    q: "integrate",
    res: "整合",
  },
  {
    q: "information",
    res: "信息",
  },
  {
    q: "final",
    res: "最终的",
  },
  {
    q: "value",
    res: "价值",
  },
  {
    q: "endeavor",
    res: "努力",
  },
  {
    q: "phoenix",
    res: "凤凰",
  },
  {
    q: "side",
    res: "一边",
  },
  {
    q: "acknowledgment",
    res: "致谢",
  },
  {
    q: "whether",
    res: "是否",
  },
  {
    q: "counter",
    res: "柜台",
  },
  {
    q: "general",
    res: "全体的",
  },
  {
    q: "buy",
    res: "购买",
  },
  {
    q: "related",
    res: "相关的",
  },
  {
    q: "labeled",
    res: "标记",
  },
  {
    q: "interpretability",
    res: "可解释性",
  },
  {
    q: "hercules",
    res: "大力士",
  },
  {
    q: "interpret",
    res: "解释",
  },
  {
    q: "publisher",
    res: "出版商",
  },
  {
    q: "environ",
    res: "包围",
  },
  {
    q: "really",
    res: "真正地",
  },
  {
    q: "output",
    res: "输出",
  },
  {
    q: "recently",
    res: "不久前",
  },
  {
    q: "matter",
    res: "课题",
  },
  {
    q: "comprise",
    res: "包含",
  },
  {
    q: "hot",
    res: "热的",
  },
  {
    q: "introduction",
    res: "介绍",
  },
  {
    q: "keep",
    res: "保持",
  },
  {
    q: "disk",
    res: "磁盘",
  },
  {
    q: "financial",
    res: "财政的",
  },
  {
    q: "moving",
    res: "移动",
  },
  {
    q: "interest",
    res: "兴趣",
  },
  {
    q: "summary",
    res: "总结",
  },
  {
    q: "build",
    res: "建筑",
  },
  {
    q: "generation",
    res: "一代",
  },
  {
    q: "byte",
    res: "字节",
  },
  {
    q: "deletion",
    res: "删除",
  },
  {
    q: "go",
    res: "去",
  },
  {
    q: "development",
    res: "发展",
  },
  {
    q: "binary",
    res: "二进制的",
  },
  {
    q: "ascii",
    res: "ascii码",
  },
  {
    q: "key",
    res: "钥匙",
  },
  {
    q: "overstrike",
    res: "过度拉伸",
  },
  {
    q: "multiprocessing",
    res: "多处理",
  },
  {
    q: "loaded",
    res: "加载",
  },
  {
    q: "masking",
    res: "掩蔽",
  },
  {
    q: "navigation",
    res: "航行",
  },
  {
    q: "abbreviate",
    res: "缩写",
  },
  {
    q: "array",
    res: "大堆",
  },
  {
    q: "show",
    res: "显示",
  },
  {
    q: "opened",
    res: "开的",
  },
  {
    q: "alphabet",
    res: "字母表",
  },
  {
    q: "concept",
    res: "概念",
  },
  {
    q: "charm",
    res: "魅力",
  },
  {
    q: "digital",
    res: "数字的",
  },
  {
    q: "room",
    res: "房间",
  },
  {
    q: "reference",
    res: "参考",
  },
  {
    q: "stack",
    res: "堆栈",
  },
  {
    q: "moreover",
    res: "此外",
  },
  {
    q: "fine",
    res: "好的",
  },
  {
    q: "change",
    res: "改变",
  },
  {
    q: "iterative",
    res: "迭代的",
  },
  {
    q: "session",
    res: "一场",
  },
  {
    q: "consequently",
    res: "因此",
  },
  {
    q: "independently",
    res: "独立地",
  },
  {
    q: "although",
    res: "虽然",
  },
  {
    q: "digit",
    res: "数字",
  },
  {
    q: "get",
    res: "收到",
  },
  {
    q: "protection",
    res: "保护",
  },
  {
    q: "performance",
    res: "表演",
  },
  {
    q: "movement",
    res: "移动",
  },
  {
    q: "already",
    res: "已经",
  },
  {
    q: "kind",
    res: "友善的",
  },
  {
    q: "still",
    res: "还",
  },
  {
    q: "automatically",
    res: "自动地",
  },
  {
    q: "large",
    res: "大的",
  },
  {
    q: "applicable",
    res: "可应用的",
  },
  {
    q: "detail",
    res: "细节",
  },
  {
    q: "instruction",
    res: "指示",
  },
  {
    q: "regard",
    res: "看待",
  },
  {
    q: "decide",
    res: "决定",
  },
  {
    q: "method",
    res: "方法",
  },
  {
    q: "batch",
    res: "一批",
  },
  {
    q: "queue",
    res: "队列",
  },
  {
    q: "scope",
    res: "范围",
  },
  {
    q: "caution",
    res: "小心",
  },
  {
    q: "flag",
    res: "旗帜",
  },
  {
    q: "worker",
    res: "工人",
  },
  {
    q: "toggle",
    res: "切换",
  },
  {
    q: "scatter",
    res: "分散",
  },
  {
    q: "control",
    res: "控制",
  },
  {
    q: "include",
    res: "包括",
  },
  {
    q: "slowly",
    res: "慢速地",
  },
  {
    q: "undo",
    res: "打开",
  },
  {
    q: "phone",
    res: "电话",
  },
  {
    q: "explanation",
    res: "解释",
  },
  {
    q: "action",
    res: "行动",
  },
  {
    q: "synchronization",
    res: "同步化",
  },
  {
    q: "machine",
    res: "机器",
  },
  {
    q: "descend",
    res: "下来",
  },
  {
    q: "reformat",
    res: "改版",
  },
  {
    q: "carriage",
    res: "马车",
  },
  {
    q: "stamp",
    res: "邮票",
  },
  {
    q: "invalid",
    res: "无效的",
  },
  {
    q: "put",
    res: "放",
  },
  {
    q: "debugger",
    res: "调试器",
  },
  {
    q: "movie",
    res: "电影",
  },
  {
    q: "delay",
    res: "延迟",
  },
  {
    q: "moment",
    res: "片刻",
  },
  {
    q: "waiting",
    res: "等待",
  },
  {
    q: "zap",
    res: "扎普",
  },
  {
    q: "receive",
    res: "接收",
  },
  {
    q: "say",
    res: "说",
  },
  {
    q: "lose",
    res: "失去",
  },
  {
    q: "case",
    res: "案例",
  },
  {
    q: "map",
    res: "地图",
  },
  {
    q: "optimize",
    res: "优化",
  },
  {
    q: "reread",
    res: "重读",
  },
  {
    q: "whole",
    res: "整体",
  },
  {
    q: "modify",
    res: "修改",
  },
  {
    q: "restriction",
    res: "限制规定",
  },
  {
    q: "extra",
    res: "额外的",
  },
  {
    q: "carousel",
    res: "旋转木马",
  },
  {
    q: "replicate",
    res: "复制",
  },
  {
    q: "dependent",
    res: "依靠的",
  },
  {
    q: "discuss",
    res: "讨论",
  },
  {
    q: "convenience",
    res: "方便",
  },
  {
    q: "many",
    res: "许多的",
  },
  {
    q: "ram",
    res: "内存",
  },
  {
    q: "definable",
    res: "可定义的",
  },
  {
    q: "instruct",
    res: "指导",
  },
  {
    q: "blinking",
    res: "眨眼",
  },
  {
    q: "high",
    res: "高的",
  },
  {
    q: "observe",
    res: "看到",
  },
  {
    q: "natural",
    res: "自然的",
  },
  {
    q: "feature",
    res: "特色",
  },
  {
    q: "meet",
    res: "满足",
  },
  {
    q: "indicator",
    res: "指示信号",
  },
  {
    q: "mention",
    res: "提到",
  },
  {
    q: "book",
    res: "书",
  },
  {
    q: "analyst",
    res: "分析师",
  },
  {
    q: "height",
    res: "身高",
  },
  {
    q: "association",
    res: "协会",
  },
  {
    q: "addition",
    res: "附加",
  },
  {
    q: "design",
    res: "设计",
  },
  {
    q: "average",
    res: "平均的",
  },
  {
    q: "module",
    res: "单元",
  },
  {
    q: "icon",
    res: "偶像",
  },
  {
    q: "over",
    res: "结束",
  },
  {
    q: "combination",
    res: "结合体",
  },
  {
    q: "typewriter",
    res: "打字机",
  },
  {
    q: "higher",
    res: "较高的",
  },
  {
    q: "hardware",
    res: "硬件",
  },
  {
    q: "single",
    res: "仅有一个的",
  },
  {
    q: "compression",
    res: "压缩",
  },
  {
    q: "press",
    res: "按",
  },
  {
    q: "learning",
    res: "学习",
  },
  {
    q: "landler",
    res: "房东",
  },
  {
    q: "amount",
    res: "数量",
  },
  {
    q: "customer",
    res: "顾客",
  },
  {
    q: "backspace",
    res: "退格",
  },
  {
    q: "name",
    res: "名称",
  },
  {
    q: "immediately",
    res: "立即",
  },
  {
    q: "probable",
    res: "可能的",
  },
  {
    q: "third",
    res: "第三",
  },
  {
    q: "load",
    res: "负载",
  },
  {
    q: "basis",
    res: "原因",
  },
  {
    q: "finally",
    res: "最后",
  },
  {
    q: "programmable",
    res: "可编程",
  },
  {
    q: "blank",
    res: "空白的",
  },
  {
    q: "past",
    res: "过去的",
  },
  {
    q: "virtually",
    res: "实际上",
  },
  {
    q: "building",
    res: "建筑物",
  },
  {
    q: "multi",
    res: "多种",
  },
  {
    q: "define",
    res: "定义",
  },
  {
    q: "retry",
    res: "重试",
  },
  {
    q: "working",
    res: "工作",
  },
  {
    q: "primarily",
    res: "主要地",
  },
  {
    q: "think",
    res: "认为",
  },
  {
    q: "source",
    res: "来源",
  },
  {
    q: "produce",
    res: "生产",
  },
  {
    q: "demonstrate",
    res: "证明",
  },
  {
    q: "opposite",
    res: "对面的",
  },
  {
    q: "copy",
    res: "复制",
  },
  {
    q: "widely",
    res: "普遍地",
  },
  {
    q: "brown",
    res: "棕色的",
  },
  {
    q: "dimensional",
    res: "维度的",
  },
  {
    q: "filename",
    res: "文件名",
  },
  {
    q: "language",
    res: "语言",
  },
  {
    q: "symbol",
    res: "象征",
  },
  {
    q: "hundred",
    res: "一百",
  },
  {
    q: "ever",
    res: "曾经",
  },
  {
    q: "bell",
    res: "钟",
  },
  {
    q: "hello",
    res: "你好",
  },
  {
    q: "vertically",
    res: "垂直地",
  },
  {
    q: "keyword",
    res: "关键词",
  },
  {
    q: "rule",
    res: "规则",
  },
  {
    q: "alternate",
    res: "候补",
  },
  {
    q: "individually",
    res: "个别地",
  },
  {
    q: "executable",
    res: "可执行文件",
  },
  {
    q: "page",
    res: "页",
  },
  {
    q: "branch",
    res: "树枝",
  },
  {
    q: "strike",
    res: "罢工",
  },
  {
    q: "structure",
    res: "结构",
  },
  {
    q: "sufficient",
    res: "足够的",
  },
  {
    q: "necessarily",
    res: "必要地",
  },
  {
    q: "particular",
    res: "特指的",
  },
  {
    q: "bad",
    res: "令人不快的",
  },
  {
    q: "paragraph",
    res: "段落",
  },
  {
    q: "plus",
    res: "加",
  },
  {
    q: "mixed",
    res: "混合的",
  },
  {
    q: "mismatch",
    res: "不匹配",
  },
  {
    q: "understanding",
    res: "理解力",
  },
  {
    q: "space",
    res: "空间",
  },
  {
    q: "null",
    res: "无效的",
  },
  {
    q: "element",
    res: "要素",
  },
  {
    q: "warn",
    res: "警告",
  },
  {
    q: "per",
    res: "每",
  },
  {
    q: "while",
    res: "虽然",
  },
  {
    q: "repeatedly",
    res: "反复地",
  },
  {
    q: "normally",
    res: "正常地",
  },
  {
    q: "supply",
    res: "供给",
  },
  {
    q: "rather",
    res: "相当地",
  },
  {
    q: "pack",
    res: "收拾",
  },
  {
    q: "sounding",
    res: "发声的",
  },
  {
    q: "logical",
    res: "必然的",
  },
  {
    q: "distribute",
    res: "分配",
  },
  {
    q: "operating",
    res: "操作",
  },
  {
    q: "start",
    res: "开始",
  },
  {
    q: "another",
    res: "另一个",
  },
  {
    q: "unpack",
    res: "打开",
  },
  {
    q: "request",
    res: "要求",
  },
  {
    q: "ignore",
    res: "忽视",
  },
  {
    q: "hold",
    res: "持有",
  },
  {
    q: "nicety",
    res: "精确",
  },
  {
    q: "reason",
    res: "原因",
  },
  {
    q: "contiguous",
    res: "相接的",
  },
  {
    q: "why",
    res: "为什么？",
  },
  {
    q: "diskette",
    res: "软盘",
  },
  {
    q: "pause",
    res: "暂停",
  },
  {
    q: "purchase",
    res: "购买",
  },
  {
    q: "far",
    res: "远的",
  },
  {
    q: "saving",
    res: "节省物",
  },
  {
    q: "terminal",
    res: "航空站",
  },
  {
    q: "superimpose",
    res: "叠加",
  },
  {
    q: "undefined",
    res: "未定义",
  },
  {
    q: "meter",
    res: "米",
  },
  {
    q: "black",
    res: "黑色",
  },
  {
    q: "exit",
    res: "出口",
  },
  {
    q: "price",
    res: "价格",
  },
  {
    q: "ansi",
    res: "ansi",
  },
  {
    q: "on-line",
    res: "在线",
  },
  {
    q: "unfortunately",
    res: "不幸地",
  },
  {
    q: "through",
    res: "通过",
  },
  {
    q: "cost",
    res: "费用",
  },
  {
    q: "obtain",
    res: "获得",
  },
  {
    q: "ring",
    res: "戒指",
  },
  {
    q: "returned",
    res: "返回",
  },
  {
    q: "directly",
    res: "直接地",
  },
  {
    q: "equation",
    res: "方程式",
  },
  {
    q: "permanent",
    res: "永久的",
  },
  {
    q: "data",
    res: "数据",
  },
  {
    q: "segment",
    res: "段",
  },
  {
    q: "closely",
    res: "紧密地",
  },
  {
    q: "continuously",
    res: "连续不断地",
  },
  {
    q: "plain",
    res: "平原",
  },
  {
    q: "clean",
    res: "清洁的",
  },
  {
    q: "usage",
    res: "用法",
  },
  {
    q: "daily",
    res: "每日的",
  },
  {
    q: "prompt",
    res: "促使",
  },
  {
    q: "introduce",
    res: "介绍",
  },
  {
    q: "math",
    res: "数学",
  },
  {
    q: "pressing",
    res: "紧迫的",
  },
  {
    q: "resident",
    res: "居民",
  },
  {
    q: "associate",
    res: "联合",
  },
  {
    q: "feed",
    res: "喂养",
  },
  {
    q: "swap",
    res: "交换",
  },
  {
    q: "restructure",
    res: "重组",
  },
  {
    q: "circumstances",
    res: "情况",
  },
  {
    q: "density",
    res: "密集",
  },
  {
    q: "underline",
    res: "强调",
  },
  {
    q: "graphically",
    res: "生动地",
  },
  {
    q: "never",
    res: "从不",
  },
  {
    q: "custom",
    res: "风俗",
  },
  {
    q: "comma",
    res: "逗号",
  },
  {
    q: "erase",
    res: "擦除",
  },
  {
    q: "following",
    res: "下列的",
  },
  {
    q: "additional",
    res: "附加的",
  },
  {
    q: "sound",
    res: "声音",
  },
  {
    q: "release",
    res: "释放",
  },
  {
    q: "translation",
    res: "翻译",
  },
  {
    q: "compress",
    res: "压紧",
  },
  {
    q: "consecutive",
    res: "连续的",
  },
  {
    q: "scan",
    res: "扫描",
  },
  {
    q: "bracketed",
    res: "括号内",
  },
  {
    q: "rebuild",
    res: "重建",
  },
  {
    q: "long",
    res: "长的",
  },
  {
    q: "library",
    res: "图书馆",
  },
  {
    q: "major",
    res: "专业",
  },
  {
    q: "typical",
    res: "典型的",
  },
  {
    q: "supposed",
    res: "想象上的",
  },
  {
    q: "restore",
    res: "恢复",
  },
  {
    q: "derelict",
    res: "被遗弃的",
  },
  {
    q: "learn",
    res: "学",
  },
  {
    q: "oriented",
    res: "面向......的",
  },
  {
    q: "own",
    res: "拥有",
  },
  {
    q: "well",
    res: "好",
  },
  {
    q: "pertain",
    res: "适用",
  },
  {
    q: "remark",
    res: "评论",
  },
  {
    q: "unable",
    res: "不能的",
  },
  {
    q: "figure",
    res: "图形",
  },
  {
    q: "neither",
    res: "也不",
  },
  {
    q: "quality",
    res: "质量",
  },
  {
    q: "fixed",
    res: "固定的",
  },
  {
    q: "thereafter",
    res: "之后",
  },
  {
    q: "appropriate",
    res: "适当的",
  },
  {
    q: "solely",
    res: "唯一地",
  },
  {
    q: "deactivate",
    res: "使停止工作",
  },
  {
    q: "register",
    res: "登记",
  },
  {
    q: "deal",
    res: "处理",
  },
  {
    q: "between",
    res: "之间",
  },
  {
    q: "down",
    res: "向下",
  },
  {
    q: "align",
    res: "排列",
  },
  {
    q: "window",
    res: "窗",
  },
  {
    q: "sit",
    res: "坐",
  },
  {
    q: "screen",
    res: "屏幕",
  },
  {
    q: "mountain",
    res: "山",
  },
  {
    q: "much",
    res: "很",
  },
  {
    q: "omit",
    res: "省略",
  },
  {
    q: "easily",
    res: "容易地",
  },
  {
    q: "switching",
    res: "转换",
  },
  {
    q: "default",
    res: "违约",
  },
  {
    q: "link",
    res: "链接",
  },
  {
    q: "private",
    res: "私有的",
  },
  {
    q: "here",
    res: "在这里",
  },
  {
    q: "replaceable",
    res: "可替代的",
  },
  {
    q: "marked",
    res: "标记",
  },
  {
    q: "call",
    res: "呼叫",
  },
  {
    q: "mod",
    res: "摩登派青年",
  },
  {
    q: "gap",
    res: "缺口",
  },
  {
    q: "compact",
    res: "契约",
  },
  {
    q: "throughout",
    res: "自始至终",
  },
  {
    q: "locking",
    res: "锁定",
  },
  {
    q: "infinite",
    res: "极大的",
  },
  {
    q: "undesirable",
    res: "不受欢迎的",
  },
  {
    q: "overwrite",
    res: "覆盖",
  },
  {
    q: "stay",
    res: "停留",
  },
  {
    q: "experiment",
    res: "实验",
  },
  {
    q: "difficulty",
    res: "困难",
  },
  {
    q: "explain",
    res: "解释",
  },
  {
    q: "programmer",
    res: "程序员",
  },
  {
    q: "initialize",
    res: "初始化",
  },
  {
    q: "how",
    res: "怎样",
  },
  {
    q: "parenthesis",
    res: "括号",
  },
  {
    q: "however",
    res: "然而",
  },
  {
    q: "light",
    res: "光",
  },
  {
    q: "wish",
    res: "希望",
  },
  {
    q: "instant",
    res: "瞬间",
  },
  {
    q: "sure",
    res: "当然",
  },
  {
    q: "apply",
    res: "申请",
  },
  {
    q: "subscript",
    res: "下标",
  },
  {
    q: "search",
    res: "搜索",
  },
  {
    q: "city",
    res: "城市",
  },
  {
    q: "close",
    res: "关",
  },
  {
    q: "speed",
    res: "速度",
  },
  {
    q: "installation",
    res: "安装",
  },
  {
    q: "string",
    res: "一串",
  },
  {
    q: "original",
    res: "起初的",
  },
  {
    q: "small",
    res: "小的",
  },
  {
    q: "power",
    res: "权力",
  },
  {
    q: "else",
    res: "其他的",
  },
  {
    q: "browse",
    res: "浏览",
  },
  {
    q: "required",
    res: "必修的",
  },
  {
    q: "declared",
    res: "宣布",
  },
  {
    q: "property",
    res: "所有物",
  },
  {
    q: "slide",
    res: "滑动",
  },
  {
    q: "display",
    res: "陈列",
  },
  {
    q: "cache",
    res: "隐藏物",
  },
  {
    q: "quiet",
    res: "轻声的",
  },
  {
    q: "internal",
    res: "内部的",
  },
  {
    q: "system",
    res: "系统",
  },
  {
    q: "positioning",
    res: "定位",
  },
  {
    q: "potentially",
    res: "潜在地",
  },
  {
    q: "clear",
    res: "清楚的",
  },
  {
    q: "rated",
    res: "估价",
  },
  {
    q: "death",
    res: "死",
  },
  {
    q: "accommodate",
    res: "容纳",
  },
  {
    q: "consider",
    res: "考虑",
  },
  {
    q: "row",
    res: "一行",
  },
  {
    q: "white",
    res: "白色",
  },
  {
    q: "abbreviation",
    res: "缩写",
  },
  {
    q: "prior",
    res: "先前的",
  },
  {
    q: "interface",
    res: "界面",
  },
  {
    q: "explicitly",
    res: "明确地",
  },
  {
    q: "market",
    res: "集市",
  },
  {
    q: "leading",
    res: "主要的",
  },
  {
    q: "chart",
    res: "图表",
  },
  {
    q: "track",
    res: "轨道",
  },
  {
    q: "alignment",
    res: "对齐",
  },
  {
    q: "vary",
    res: "变化",
  },
  {
    q: "documentation",
    res: "文档",
  },
  {
    q: "runtime",
    res: "运行时",
  },
  {
    q: "welcome",
    res: "欢迎",
  },
  {
    q: "adapter",
    res: "适配器",
  },
  {
    q: "absence",
    res: "缺席",
  },
  {
    q: "which",
    res: "哪一个",
  },
  {
    q: "then",
    res: "然后",
  },
  {
    q: "revolutionize",
    res: "革命",
  },
  {
    q: "comment",
    res: "议论",
  },
  {
    q: "part",
    res: "部分",
  },
  {
    q: "overview",
    res: "概述",
  },
  {
    q: "inhibit",
    res: "阻止",
  },
  {
    q: "emulate",
    res: "模仿",
  },
  {
    q: "please",
    res: "请",
  },
  {
    q: "foreground",
    res: "前景",
  },
  {
    q: "limited",
    res: "有限的",
  },
  {
    q: "quietly",
    res: "安静地",
  },
  {
    q: "project",
    res: "项目",
  },
  {
    q: "right",
    res: "正当",
  },
  {
    q: "highlight",
    res: "突出",
  },
  {
    q: "progress",
    res: "进步",
  },
  {
    q: "lock",
    res: "锁",
  },
  {
    q: "customize",
    res: "定制",
  },
  {
    q: "mind",
    res: "介意",
  },
  {
    q: "applied",
    res: "应用",
  },
  {
    q: "attempt",
    res: "企图",
  },
  {
    q: "state",
    res: "状态",
  },
  {
    q: "volume",
    res: "体积",
  },
  {
    q: "context",
    res: "上下文",
  },
  {
    q: "appendix",
    res: "附录",
  },
  {
    q: "driver",
    res: "驾驶员",
  },
  {
    q: "properly",
    res: "正确地",
  },
  {
    q: "memo",
    res: "备忘录",
  },
  {
    q: "phrase",
    res: "短语",
  },
  {
    q: "unsafe",
    res: "不安全的",
  },
  {
    q: "matching",
    res: "匹配",
  },
  {
    q: "cut",
    res: "切",
  },
  {
    q: "running",
    res: "跑步",
  },
  {
    q: "scroll",
    res: "纸卷",
  },
  {
    q: "adequate",
    res: "充足的",
  },
  {
    q: "hang",
    res: "悬挂",
  },
  {
    q: "suppressed",
    res: "压制",
  },
  {
    q: "separate",
    res: "分离",
  },
  {
    q: "save",
    res: "拯救",
  },
  {
    q: "declaration",
    res: "公告",
  },
  {
    q: "drag",
    res: "拖曳",
  },
  {
    q: "loading",
    res: "加载",
  },
  {
    q: "possibility",
    res: "可能",
  },
  {
    q: "purge",
    res: "净化",
  },
  {
    q: "reappears",
    res: "重现",
  },
  {
    q: "front",
    res: "正面",
  },
  {
    q: "develop",
    res: "发展",
  },
  {
    q: "label",
    res: "标签",
  },
  {
    q: "know",
    res: "知道",
  },
  {
    q: "addressing",
    res: "寻址",
  },
  {
    q: "assembler",
    res: "汇编程序",
  },
  {
    q: "jump",
    res: "跳",
  },
  {
    q: "reduce",
    res: "减少",
  },
  {
    q: "announce",
    res: "宣布",
  },
  {
    q: "term",
    res: "学期",
  },
  {
    q: "received",
    res: "收到",
  },
  {
    q: "avail",
    res: "效用",
  },
  {
    q: "readily",
    res: "便利地",
  },
  {
    q: "enjoy",
    res: "享受",
  },
  {
    q: "accept",
    res: "接受",
  },
  {
    q: "input",
    res: "输入",
  },
  {
    q: "manage",
    res: "管理",
  },
  {
    q: "determined",
    res: "决心",
  },
  {
    q: "complete",
    res: "完成",
  },
  {
    q: "conventional",
    res: "依照惯例的",
  },
  {
    q: "times",
    res: "时代",
  },
  {
    q: "experience",
    res: "经验",
  },
  {
    q: "wrap",
    res: "包",
  },
  {
    q: "selection",
    res: "选择",
  },
  {
    q: "indexing",
    res: "索引",
  },
  {
    q: "bit",
    res: "一点",
  },
  {
    q: "protocol",
    res: "协议",
  },
  {
    q: "whenever",
    res: "无论何时",
  },
  {
    q: "very",
    res: "非常",
  },
  {
    q: "layout",
    res: "布局",
  },
  {
    q: "asynchronous",
    res: "异步的",
  },
  {
    q: "title",
    res: "标题",
  },
  {
    q: "respond",
    res: "回应",
  },
  {
    q: "overlay",
    res: "覆盖",
  },
  {
    q: "virtual",
    res: "事实上的",
  },
  {
    q: "socket",
    res: "插座",
  },
  {
    q: "negate",
    res: "取消",
  },
  {
    q: "lightning",
    res: "闪电",
  },
  {
    q: "tornado",
    res: "龙卷风",
  },
  {
    q: "image",
    res: "形象",
  },
  {
    q: "section",
    res: "部分",
  },
  {
    q: "redirect",
    res: "重新使用",
  },
  {
    q: "constantly",
    res: "不断地",
  },
  {
    q: "national",
    res: "国家的",
  },
  {
    q: "company",
    res: "公司",
  },
  {
    q: "blue",
    res: "蓝色",
  },
  {
    q: "path",
    res: "路径",
  },
  {
    q: "cursor",
    res: "光标",
  },
  {
    q: "stream",
    res: "流动",
  },
  {
    q: "emulation",
    res: "模仿",
  },
  {
    q: "repeat",
    res: "重复",
  },
  {
    q: "bottom",
    res: "底部",
  },
  {
    q: "shell",
    res: "壳",
  },
  {
    q: "charge",
    res: "要价",
  },
  {
    q: "forward",
    res: "向前地",
  },
  {
    q: "graphic",
    res: "图解的",
  },
  {
    q: "suppose",
    res: "认为",
  },
  {
    q: "group",
    res: "组",
  },
  {
    q: "technology",
    res: "技术",
  },
  {
    q: "literal",
    res: "字面意义的",
  },
  {
    q: "see",
    res: "看见",
  },
  {
    q: "unrecognized",
    res: "未被认可",
  },
  {
    q: "via",
    res: "通过",
  },
  {
    q: "pop",
    res: "流行音乐",
  },
  {
    q: "organize",
    res: "组织",
  },
  {
    q: "startup",
    res: "启动",
  },
  {
    q: "mouse",
    res: "老鼠",
  },
  {
    q: "keyed",
    res: "键控",
  },
  {
    q: "insure",
    res: "投保",
  },
  {
    q: "parallel",
    res: "平行的",
  },
  {
    q: "pay",
    res: "支付",
  },
  {
    q: "cancel",
    res: "取消",
  },
  {
    q: "showing",
    res: "显示",
  },
  {
    q: "refresh",
    res: "刷新",
  },
  {
    q: "initial",
    res: "最初的",
  },
  {
    q: "stationary",
    res: "不动的",
  },
  {
    q: "zoom",
    res: "快速移动",
  },
  {
    q: "manufacture",
    res: "制造",
  },
  {
    q: "operation",
    res: "活动",
  },
  {
    q: "special",
    res: "特殊的",
  },
  {
    q: "appropriately",
    res: "恰当地",
  },
  {
    q: "enough",
    res: "足够地",
  },
  {
    q: "unlock",
    res: "解锁",
  },
  {
    q: "relative",
    res: "相对的",
  },
  {
    q: "exceed",
    res: "超过",
  },
  {
    q: "temporary",
    res: "短暂的",
  },
  {
    q: "division",
    res: "分开",
  },
  {
    q: "quote",
    res: "引用",
  },
  {
    q: "gather",
    res: "聚集",
  },
  {
    q: "helpful",
    res: "有用的",
  },
  {
    q: "frequently",
    res: "频繁地",
  },
  {
    q: "skeleton",
    res: "骨骼",
  },
  {
    q: "craze",
    res: "狂热",
  },
  {
    q: "column",
    res: "柱",
  },
  {
    q: "on",
    res: "在…上",
  },
  {
    q: "tiny",
    res: "极小的",
  },
  {
    q: "database",
    res: "数据库",
  },
  {
    q: "select",
    res: "选择",
  },
  {
    q: "field",
    res: "领域",
  },
  {
    q: "originally",
    res: "原来",
  },
  {
    q: "dynamic",
    res: "动态",
  },
  {
    q: "exhaust",
    res: "耗尽",
  },
  {
    q: "same",
    res: "相同的",
  },
  {
    q: "pass",
    res: "通过",
  },
  {
    q: "create",
    res: "创造",
  },
  {
    q: "prefix",
    res: "前缀",
  },
  {
    q: "assortment",
    res: "各种各样",
  },
  {
    q: "ship",
    res: "船",
  },
  {
    q: "midnight",
    res: "午夜",
  },
  {
    q: "redefine",
    res: "重新定义",
  },
  {
    q: "edit",
    res: "编辑",
  },
  {
    q: "yet",
    res: "然而",
  },
  {
    q: "nature",
    res: "自然界",
  },
  {
    q: "spread",
    res: "传播",
  },
  {
    q: "reinstate",
    res: "使恢复原职",
  },
  {
    q: "always",
    res: "总是",
  },
  {
    q: "sector",
    res: "部门",
  },
  {
    q: "social",
    res: "社会的",
  },
  {
    q: "stuff",
    res: "东西",
  },
  {
    q: "succession",
    res: "一连串",
  },
  {
    q: "object",
    res: "对象",
  },
  {
    q: "fill",
    res: "填满",
  },
  {
    q: "reach",
    res: "达到",
  },
  {
    q: "slash",
    res: "斜线",
  },
  {
    q: "reload",
    res: "重新加载",
  },
  {
    q: "confirmation",
    res: "确认书",
  },
  {
    q: "sensitivity",
    res: "体贴",
  },
  {
    q: "kernel",
    res: "内核",
  },
  {
    q: "tag",
    res: "标签",
  },
  {
    q: "possibly",
    res: "可能地",
  },
  {
    q: "shut",
    res: "关闭",
  },
  {
    q: "sign",
    res: "签名",
  },
  {
    q: "initiate",
    res: "发起",
  },
  {
    q: "message",
    res: "消息",
  },
  {
    q: "standard",
    res: "标准",
  },
  {
    q: "bypass",
    res: "旁路",
  },
  {
    q: "subsequent",
    res: "后来的",
  },
  {
    q: "asterisk",
    res: "星号",
  },
  {
    q: "involved",
    res: "卷入的",
  },
  {
    q: "once",
    res: "一旦",
  },
  {
    q: "font",
    res: "字体",
  },
  {
    q: "chapter",
    res: "章",
  },
  {
    q: "utility",
    res: "公用事业",
  },
  {
    q: "half",
    res: "一半",
  },
  {
    q: "protect",
    res: "保护",
  },
  {
    q: "therefore",
    res: "因此",
  },
  {
    q: "individual",
    res: "个人",
  },
  {
    q: "consult",
    res: "咨询",
  },
  {
    q: "force",
    res: "武力",
  },
  {
    q: "corrupt",
    res: "贪污的",
  },
  {
    q: "border",
    res: "边境",
  },
  {
    q: "conform",
    res: "符合",
  },
  {
    q: "limiting",
    res: "限制",
  },
  {
    q: "finisher",
    res: "终结者",
  },
  {
    q: "unavailable",
    res: "不可用的",
  },
  {
    q: "area",
    res: "地区",
  },
  {
    q: "familiarize",
    res: "熟悉",
  },
  {
    q: "month",
    res: "月",
  },
  {
    q: "searching",
    res: "搜索",
  },
  {
    q: "cover",
    res: "掩蔽",
  },
  {
    q: "increment",
    res: "定期的加薪",
  },
  {
    q: "spell",
    res: "拼写",
  },
  {
    q: "later",
    res: "后来",
  },
  {
    q: "various",
    res: "各种各样的",
  },
  {
    q: "cord",
    res: "绳",
  },
  {
    q: "center",
    res: "居中",
  },
  {
    q: "process",
    res: "过程",
  },
  {
    q: "effective",
    res: "有效的",
  },
  {
    q: "middle",
    res: "中间的",
  },
  {
    q: "manifest",
    res: "显示",
  },
  {
    q: "remove",
    res: "去除",
  },
  {
    q: "decimal",
    res: "十进制的",
  },
  {
    q: "security",
    res: "安全",
  },
  {
    q: "six",
    res: "六",
  },
  {
    q: "type",
    res: "类型",
  },
  {
    q: "thousand",
    res: "千",
  },
  {
    q: "whichever",
    res: "无论哪个",
  },
  {
    q: "exclamation",
    res: "感叹号",
  },
  {
    q: "reactivate",
    res: "重新激活",
  },
  {
    q: "real",
    res: "真实的",
  },
  {
    q: "equipment",
    res: "设备",
  },
  {
    q: "instance",
    res: "例子",
  },
  {
    q: "essentially",
    res: "基本上",
  },
  {
    q: "occurrence",
    res: "发生",
  },
  {
    q: "common",
    res: "常见的",
  },
  {
    q: "murder",
    res: "谋杀",
  },
  {
    q: "separator",
    res: "分离器",
  },
  {
    q: "confuse",
    res: "混淆",
  },
  {
    q: "ones",
    res: "一个",
  },
  {
    q: "dearly",
    res: "亲爱的",
  },
  {
    q: "switch",
    res: "转换",
  },
  {
    q: "optional",
    res: "可选择的",
  },
  {
    q: "confirm",
    res: "证实",
  },
  {
    q: "door",
    res: "门",
  },
  {
    q: "today",
    res: "今天",
  },
  {
    q: "registration",
    res: "登记",
  },
  {
    q: "explanatory",
    res: "解释性的",
  },
  {
    q: "forget",
    res: "忘记",
  },
  {
    q: "useful",
    res: "有用的",
  },
  {
    q: "occur",
    res: "发生",
  },
  {
    q: "refer",
    res: "参考",
  },
  {
    q: "service",
    res: "服务",
  },
  {
    q: "printable",
    res: "可打印",
  },
  {
    q: "seamless",
    res: "无缝的",
  },
  {
    q: "proper",
    res: "适当的",
  },
  {
    q: "preview",
    res: "预览",
  },
  {
    q: "otherwise",
    res: "否则",
  },
  {
    q: "reindex",
    res: "重新索引",
  },
  {
    q: "rate",
    res: "速度",
  },
  {
    q: "limiter",
    res: "限制器",
  },
  {
    q: "bring",
    res: "带…到某处",
  },
  {
    q: "constant",
    res: "常数",
  },
  {
    q: "indefinitely",
    res: "无限期地",
  },
  {
    q: "substantial",
    res: "大量的",
  },
  {
    q: "set",
    res: "设置",
  },
  {
    q: "expanding",
    res: "扩大",
  },
  {
    q: "extend",
    res: "延伸",
  },
  {
    q: "status",
    res: "地位",
  },
  {
    q: "expand",
    res: "扩大",
  },
  {
    q: "easel",
    res: "画架",
  },
  {
    q: "insufficient",
    res: "不充分的",
  },
  {
    q: "cash",
    res: "现金",
  },
  {
    q: "face",
    res: "面对",
  },
  {
    q: "without",
    res: "没有",
  },
  {
    q: "simple",
    res: "易于理解的",
  },
  {
    q: "quotation",
    res: "引用",
  },
  {
    q: "necessary",
    res: "必需的",
  },
  {
    q: "routine",
    res: "常规",
  },
  {
    q: "chunk",
    res: "大块",
  },
  {
    q: "begin",
    res: "开始",
  },
  {
    q: "according",
    res: "相符合的",
  },
  {
    q: "each",
    res: "每个",
  },
  {
    q: "make",
    res: "制作",
  },
  {
    q: "unchanged",
    res: "不变的",
  },
  {
    q: "expect",
    res: "预料",
  },
  {
    q: "shortcut",
    res: "捷径",
  },
  {
    q: "break",
    res: "打破",
  },
  {
    q: "desk",
    res: "书桌",
  },
  {
    q: "difficult",
    res: "困难的",
  },
  {
    q: "odometer",
    res: "里程表",
  },
  {
    q: "fast",
    res: "快速的",
  },
  {
    q: "achieve",
    res: "实现",
  },
  {
    q: "trim",
    res: "修剪",
  },
  {
    q: "parameter",
    res: "参数",
  },
  {
    q: "unless",
    res: "除非",
  },
  {
    q: "debug",
    res: "调试",
  },
  {
    q: "photograph",
    res: "照片",
  },
  {
    q: "designated",
    res: "指定的",
  },
  {
    q: "substantially",
    res: "非常",
  },
  {
    q: "communication",
    res: "表达",
  },
  {
    q: "week",
    res: "周",
  },
  {
    q: "view",
    res: "看法",
  },
  {
    q: "splitting",
    res: "分裂",
  },
  {
    q: "near",
    res: "近的",
  },
  {
    q: "whatever",
    res: "无论什么",
  },
  {
    q: "intend",
    res: "打算",
  },
  {
    q: "defective",
    res: "有缺点的",
  },
  {
    q: "less",
    res: "较少的",
  },
  {
    q: "ability",
    res: "能力",
  },
  {
    q: "confidential",
    res: "保密的",
  },
  {
    q: "identically",
    res: "同样地",
  },
  {
    q: "entry",
    res: "进入",
  },
  {
    q: "sort",
    res: "分类",
  },
  {
    q: "factory",
    res: "工厂",
  },
  {
    q: "continue",
    res: "持续",
  },
  {
    q: "indentation",
    res: "压痕",
  },
  {
    q: "transfer",
    res: "转移",
  },
  {
    q: "forth",
    res: "向前地",
  },
  {
    q: "repetitive",
    res: "重复的",
  },
  {
    q: "location",
    res: "地方",
  },
  {
    q: "dimension",
    res: "维",
  },
  {
    q: "master",
    res: "主人",
  },
  {
    q: "add",
    res: "添加",
  },
  {
    q: "wait",
    res: "等待",
  },
  {
    q: "scheme",
    res: "计划",
  },
  {
    q: "adjust",
    res: "调整",
  },
  {
    q: "course",
    res: "课程",
  },
  {
    q: "resulting",
    res: "因而发生的",
  },
  {
    q: "speech",
    res: "演讲",
  },
  {
    q: "purpose",
    res: "意图",
  },
  {
    q: "logic",
    res: "思维方式",
  },
  {
    q: "transportable",
    res: "可运输",
  },
  {
    q: "elapsed",
    res: "逝去",
  },
  {
    q: "tone",
    res: "语气",
  },
  {
    q: "clipper",
    res: "剪刀",
  },
  {
    q: "assembly",
    res: "装配",
  },
  {
    q: "disabled",
    res: "残废",
  },
  {
    q: "violate",
    res: "违反",
  },
  {
    q: "found",
    res: "建立",
  },
  {
    q: "relation",
    res: "关系",
  },
  {
    q: "hand",
    res: "手",
  },
  {
    q: "upper",
    res: "上面的",
  },
  {
    q: "product",
    res: "产品",
  },
  {
    q: "halfway",
    res: "在…的中间",
  },
  {
    q: "repeating",
    res: "重复",
  },
  {
    q: "opening",
    res: "开放",
  },
  {
    q: "condition",
    res: "条件",
  },
  {
    q: "wrong",
    res: "错误的",
  },
  {
    q: "treat",
    res: "对待",
  },
  {
    q: "full",
    res: "满的",
  },
  {
    q: "duplicate",
    res: "复制",
  },
  {
    q: "second",
    res: "第二",
  },
  {
    q: "sum",
    res: "总和",
  },
  {
    q: "margin",
    res: "边缘",
  },
  {
    q: "formatted",
    res: "格式化",
  },
  {
    q: "floppy",
    res: "松软的",
  },
  {
    q: "network",
    res: "网络",
  },
  {
    q: "width",
    res: "宽度",
  },
  {
    q: "hit",
    res: "打",
  },
  {
    q: "author",
    res: "著者",
  },
  {
    q: "seven",
    res: "七",
  },
  {
    q: "suggestion",
    res: "建议",
  },
  {
    q: "university",
    res: "大学",
  },
  {
    q: "file",
    res: "文件",
  },
  {
    q: "differentiate",
    res: "区分",
  },
  {
    q: "last",
    res: "最后的",
  },
  {
    q: "indirectly",
    res: "间接地",
  },
  {
    q: "preset",
    res: "预设",
  },
  {
    q: "prepare",
    res: "准备",
  },
  {
    q: "early",
    res: "早期的",
  },
  {
    q: "reflow",
    res: "回流",
  },
  {
    q: "subgroup",
    res: "子群",
  },
  {
    q: "do",
    res: "做",
  },
  {
    q: "criterion",
    res: "标准",
  },
  {
    q: "correct",
    res: "对的",
  },
  {
    q: "console",
    res: "安慰",
  },
  {
    q: "discussion",
    res: "讨论",
  },
  {
    q: "consistent",
    res: "一致的",
  },
  {
    q: "present",
    res: "目前",
  },
  {
    q: "currently",
    res: "目前",
  },
  {
    q: "successful",
    res: "成功的",
  },
  {
    q: "quit",
    res: "退出",
  },
  {
    q: "importance",
    res: "重要性",
  },
  {
    q: "review",
    res: "回顾",
  },
  {
    q: "inclusive",
    res: "包含全部费用",
  },
  {
    q: "terminology",
    res: "术语",
  },
  {
    q: "point",
    res: "指向",
  },
  {
    q: "especially",
    res: "尤其地",
  },
  {
    q: "equal",
    res: "相同的",
  },
  {
    q: "transaction",
    res: "交易",
  },
  {
    q: "trap",
    res: "陷阱",
  },
  {
    q: "identical",
    res: "完全相同的",
  },
  {
    q: "numeral",
    res: "数字",
  },
  {
    q: "invent",
    res: "发明",
  },
  {
    q: "during",
    res: "在期间",
  },
  {
    q: "people",
    res: "人",
  },
  {
    q: "follow",
    res: "跟随",
  },
  {
    q: "touch",
    res: "触摸",
  },
  {
    q: "readable",
    res: "可读的",
  },
  {
    q: "varying",
    res: "不同的",
  },
  {
    q: "different",
    res: "不同的",
  },
  {
    q: "host",
    res: "主办",
  },
  {
    q: "conditional",
    res: "有条件的",
  },
  {
    q: "character",
    res: "性格",
  },
  {
    q: "noninteractive",
    res: "非交互",
  },
  {
    q: "specifically",
    res: "明确地",
  },
  {
    q: "answer",
    res: "答复",
  },
  {
    q: "traditional",
    res: "传统的",
  },
  {
    q: "unique",
    res: "唯一的",
  },
  {
    q: "subroutine",
    res: "子程序",
  },
  {
    q: "sensitive",
    res: "敏感的",
  },
  {
    q: "zero",
    res: "零",
  },
  {
    q: "capability",
    res: "能力",
  },
  {
    q: "upgrade",
    res: "升级",
  },
  {
    q: "ok",
    res: "好啊",
  },
  {
    q: "specification",
    res: "规格",
  },
  {
    q: "nearly",
    res: "几乎",
  },
  {
    q: "century",
    res: "100年",
  },
  {
    q: "usually",
    res: "通常",
  },
  {
    q: "organization",
    res: "组织",
  },
  {
    q: "false",
    res: "错误的",
  },
  {
    q: "trouble",
    res: "麻烦",
  },
  {
    q: "transform",
    res: "使改变",
  },
  {
    q: "exist",
    res: "存在",
  },
  {
    q: "return",
    res: "回来",
  },
  {
    q: "verify",
    res: "验证",
  },
  {
    q: "want",
    res: "希望",
  },
  {
    q: "unnecessary",
    res: "不需要的",
  },
  {
    q: "code",
    res: "密码",
  },
  {
    q: "equally",
    res: "同样地",
  },
  {
    q: "consume",
    res: "消费",
  },
  {
    q: "extension",
    res: "扩大",
  },
  {
    q: "generate",
    res: "生成",
  },
  {
    q: "nest",
    res: "巢",
  },
  {
    q: "pressed",
    res: "按下",
  },
  {
    q: "beginning",
    res: "开始",
  },
  {
    q: "extremely",
    res: "极其",
  },
  {
    q: "override",
    res: "推翻",
  },
  {
    q: "highest",
    res: "最高",
  },
  {
    q: "local",
    res: "地方的",
  },
  {
    q: "text",
    res: "文本",
  },
  {
    q: "from",
    res: "从…起",
  },
  {
    q: "increase",
    res: "增长",
  },
  {
    q: "alias",
    res: "别名",
  },
  {
    q: "memory",
    res: "记忆力",
  },
  {
    q: "correspond",
    res: "相一致",
  },
  {
    q: "formed",
    res: "形成",
  },
  {
    q: "failure",
    res: "失败",
  },
  {
    q: "complicated",
    res: "复杂的",
  },
  {
    q: "recursive",
    res: "递归的",
  },
  {
    q: "listing",
    res: "表册",
  },
  {
    q: "conflict",
    res: "冲突",
  },
  {
    q: "specialize",
    res: "专门从事",
  },
  {
    q: "determine",
    res: "决定",
  },
  {
    q: "accuracy",
    res: "精确",
  },
  {
    q: "interval",
    res: "间隔",
  },
  {
    q: "board",
    res: "板",
  },
  {
    q: "representation",
    res: "代表",
  },
  {
    q: "telephone",
    res: "电话",
  },
  {
    q: "described",
    res: "描述",
  },
  {
    q: "regular",
    res: "有规律的",
  },
  {
    q: "desktop",
    res: "桌面",
  },
  {
    q: "experimentation",
    res: "实验",
  },
  {
    q: "damage",
    res: "损坏",
  },
  {
    q: "pacific",
    res: "太平洋",
  },
  {
    q: "active",
    res: "忙碌的",
  },
  {
    q: "layer",
    res: "层",
  },
  {
    q: "fully",
    res: "充分地",
  },
  {
    q: "converted",
    res: "转换",
  },
  {
    q: "up",
    res: "向上的",
  },
  {
    q: "ask",
    res: "问",
  },
  {
    q: "desirable",
    res: "向往的",
  },
  {
    q: "order",
    res: "顺序",
  },
  {
    q: "exclusive",
    res: "独家",
  },
  {
    q: "storage",
    res: "存储",
  },
  {
    q: "diagonally",
    res: "斜的",
  },
  {
    q: "interfere",
    res: "干涉",
  },
  {
    q: "happen",
    res: "发生",
  },
  {
    q: "trailing",
    res: "拖尾的",
  },
  {
    q: "write",
    res: "写",
  },
  {
    q: "before",
    res: "之前",
  },
  {
    q: "marker",
    res: "标记",
  },
  {
    q: "ally",
    res: "盟友",
  },
  {
    q: "motif",
    res: "动机",
  },
  {
    q: "strong",
    res: "坚强的",
  },
  {
    q: "statement",
    res: "陈述",
  },
  {
    q: "restart",
    res: "重新启动",
  },
  {
    q: "divide",
    res: "分",
  },
  {
    q: "emphasize",
    res: "强调",
  },
  {
    q: "series",
    res: "系列",
  },
  {
    q: "tool",
    res: "工具",
  },
  {
    q: "additionally",
    res: "另外",
  },
  {
    q: "run",
    res: "跑",
  },
  {
    q: "except",
    res: "除了",
  },
  {
    q: "compatibility",
    res: "兼容性",
  },
  {
    q: "whose",
    res: "谁的",
  },
  {
    q: "useless",
    res: "无用的",
  },
  {
    q: "box",
    res: "盒",
  },
  {
    q: "calling",
    res: "使命感",
  },
  {
    q: "unwanted",
    res: "多余的",
  },
  {
    q: "fit",
    res: "适合",
  },
  {
    q: "try",
    res: "尝试",
  },
  {
    q: "across",
    res: "穿过",
  },
  {
    q: "eliminate",
    res: "排除",
  },
  {
    q: "processing",
    res: "处理",
  },
  {
    q: "sample",
    res: "样品",
  },
  {
    q: "total",
    res: "全部的",
  },
  {
    q: "occupy",
    res: "占据",
  },
  {
    q: "allow",
    res: "允许",
  },
  {
    q: "efficiently",
    res: "有效地",
  },
  {
    q: "fact",
    res: "事实",
  },
  {
    q: "entire",
    res: "全部的",
  },
  {
    q: "inexperienced",
    res: "缺乏经验",
  },
  {
    q: "direction",
    res: "方向",
  },
  {
    q: "work",
    res: "工作",
  },
  {
    q: "split",
    res: "分裂",
  },
  {
    q: "also",
    res: "而且",
  },
  {
    q: "like",
    res: "喜欢",
  },
  {
    q: "numeric",
    res: "数字的",
  },
  {
    q: "button",
    res: "按钮",
  },
  {
    q: "device",
    res: "装置",
  },
  {
    q: "perform",
    res: "表演",
  },
  {
    q: "root",
    res: "根",
  },
  {
    q: "dos",
    res: "磁盘操作系统",
  },
  {
    q: "mirror",
    res: "镜子",
  },
  {
    q: "form",
    res: "类型",
  },
  {
    q: "connect",
    res: "连接",
  },
  {
    q: "industry",
    res: "工业",
  },
  {
    q: "mode",
    res: "模式",
  },
  {
    q: "variety",
    res: "不同种类",
  },
  {
    q: "horizontal",
    res: "水平的",
  },
  {
    q: "out",
    res: "出来",
  },
  {
    q: "remain",
    res: "保持",
  },
  {
    q: "greatly",
    res: "大大地",
  },
  {
    q: "representative",
    res: "代表",
  },
  {
    q: "commercial",
    res: "贸易的",
  },
  {
    q: "off",
    res: "关",
  },
  {
    q: "british",
    res: "英国的",
  },
  {
    q: "position",
    res: "位置",
  },
  {
    q: "onto",
    res: "向",
  },
  {
    q: "problem",
    res: "问题",
  },
  {
    q: "level",
    res: "数量",
  },
  {
    q: "copyright",
    res: "版权",
  },
  {
    q: "dialog",
    res: "对话",
  },
  {
    q: "interactive",
    res: "互动的",
  },
  {
    q: "compiler",
    res: "编译程序",
  },
  {
    q: "ready",
    res: "准备好的",
  },
  {
    q: "tutorial",
    res: "辅导的",
  },
  {
    q: "warranty",
    res: "担保",
  },
  {
    q: "suggest",
    res: "建议",
  },
  {
    q: "available",
    res: "可获得的",
  },
  {
    q: "tell",
    res: "告诉",
  },
  {
    q: "pool",
    res: "水塘",
  },
  {
    q: "deter",
    res: "制止",
  },
  {
    q: "anytime",
    res: "随时",
  },
  {
    q: "left",
    res: "左边",
  },
  {
    q: "paper",
    res: "纸张",
  },
  {
    q: "procedural",
    res: "程序性",
  },
  {
    q: "assemble",
    res: "集合",
  },
  {
    q: "fall",
    res: "落下",
  },
  {
    q: "exceeded",
    res: "超过",
  },
  {
    q: "busy",
    res: "忙碌的",
  },
  {
    q: "convenient",
    res: "实用的",
  },
  {
    q: "fly",
    res: "飞",
  },
  {
    q: "due",
    res: "由于",
  },
  {
    q: "green",
    res: "绿色",
  },
  {
    q: "reorganization",
    res: "重组",
  },
  {
    q: "check",
    res: "检查",
  },
  {
    q: "handle",
    res: "手柄",
  },
  {
    q: "classify",
    res: "分类",
  },
  {
    q: "completely",
    res: "彻底地",
  },
  {
    q: "distinguish",
    res: "区分",
  },
  {
    q: "ending",
    res: "结尾",
  },
  {
    q: "coprocessor",
    res: "协处理器",
  },
  {
    q: "manipulating",
    res: "操纵",
  },
  {
    q: "procedure",
    res: "程序",
  },
  {
    q: "lending",
    res: "借贷",
  },
  {
    q: "management",
    res: "经营",
  },
  {
    q: "permanently",
    res: "永久地",
  },
  {
    q: "temporarily",
    res: "暂时",
  },
  {
    q: "respectively",
    res: "分别地",
  },
  {
    q: "stated",
    res: "规定的",
  },
  {
    q: "lesson",
    res: "课程",
  },
  {
    q: "background",
    res: "出身背景",
  },
  {
    q: "mark",
    res: "做记号",
  },
  {
    q: "watch",
    res: "看",
  },
  {
    q: "safely",
    res: "安全地",
  },
  {
    q: "smooth",
    res: "平整的",
  },
  {
    q: "read",
    res: "阅读",
  },
  {
    q: "squeeze",
    res: "挤压",
  },
  {
    q: "anywhere",
    res: "在任何地方",
  },
  {
    q: "inside",
    res: "在…内",
  },
  {
    q: "recent",
    res: "最近的",
  },
  {
    q: "should",
    res: "应该",
  },
  {
    q: "synchronize",
    res: "使同步",
  },
  {
    q: "colon",
    res: "冒号",
  },
  {
    q: "below",
    res: "在下面",
  },
  {
    q: "public",
    res: "平民的",
  },
  {
    q: "secondary",
    res: "次要的",
  },
  {
    q: "uppercase",
    res: "大写字母",
  },
  {
    q: "length",
    res: "长",
  },
  {
    q: "recover",
    res: "恢复",
  },
  {
    q: "expression",
    res: "表示",
  },
  {
    q: "indent",
    res: "缩进",
  },
  {
    q: "delimit",
    res: "划界",
  },
  {
    q: "word",
    res: "单词",
  },
  {
    q: "augment",
    res: "加强",
  },
  {
    q: "access",
    res: "通道",
  },
  {
    q: "table",
    res: "桌子",
  },
  {
    q: "worry",
    res: "担心",
  },
  {
    q: "editor",
    res: "编辑",
  },
  {
    q: "connectivity",
    res: "连通性",
  },
  {
    q: "store",
    res: "百货商店",
  },
  {
    q: "somewhat",
    res: "有点",
  },
  {
    q: "encounter",
    res: "遭遇",
  },
  {
    q: "allowed",
    res: "允许",
  },
  {
    q: "aligned",
    res: "对齐的",
  },
  {
    q: "incorrect",
    res: "不准确的",
  },
  {
    q: "boot",
    res: "靴子",
  },
  {
    q: "resolution",
    res: "决议",
  },
  {
    q: "physical",
    res: "身体的",
  },
  {
    q: "wise",
    res: "明智的",
  },
  {
    q: "loss",
    res: "丧失",
  },
  {
    q: "cross",
    res: "交叉",
  },
  {
    q: "mach",
    res: "机器",
  },
  {
    q: "distribution",
    res: "分配",
  },
  {
    q: "subsequently",
    res: "随后",
  },
  {
    q: "exactly",
    res: "确切地",
  },
  {
    q: "loop",
    res: "环",
  },
  {
    q: "linker",
    res: "连接器",
  },
  {
    q: "emulator",
    res: "仿真器",
  },
  {
    q: "particularly",
    res: "尤其",
  },
  {
    q: "filter",
    res: "滤器",
  },
  {
    q: "toward",
    res: "朝向",
  },
  {
    q: "main",
    res: "主要的",
  },
  {
    q: "eject",
    res: "弹出",
  },
  {
    q: "format",
    res: "总体安排",
  },
  {
    q: "execute",
    res: "处决",
  },
  {
    q: "platform",
    res: "站台",
  },
  {
    q: "designate",
    res: "命名",
  },
  {
    q: "even",
    res: "即使",
  },
  {
    q: "unsuccessful",
    res: "不成功的",
  },
  {
    q: "opinion",
    res: "意见",
  },
  {
    q: "variable",
    res: "变量",
  },
  {
    q: "enable",
    res: "使可能",
  },
  {
    q: "gain",
    res: "获得",
  },
  {
    q: "rearrange",
    res: "重新安排",
  },
  {
    q: "tape",
    res: "磁带",
  },
  {
    q: "alternately",
    res: "交替地",
  },
  {
    q: "among",
    res: "在…之间",
  },
  {
    q: "vital",
    res: "至关重要的",
  },
  {
    q: "actual",
    res: "真实的",
  },
  {
    q: "newly",
    res: "最近",
  },
  {
    q: "intensity",
    res: "强烈",
  },
  {
    q: "kilobyte",
    res: "千字节",
  },
  {
    q: "interpreter",
    res: "口译译员",
  },
  {
    q: "snapshot",
    res: "快照",
  },
  {
    q: "block",
    res: "块",
  },
  {
    q: "support",
    res: "支持",
  },
  {
    q: "evaluate",
    res: "估计",
  },
  {
    q: "pointer",
    res: "指针",
  },
  {
    q: "keyboard",
    res: "键盘",
  },
  {
    q: "after",
    res: "之后",
  },
  {
    q: "disregard",
    res: "漠视",
  },
  {
    q: "creation",
    res: "创造",
  },
  {
    q: "crop",
    res: "庄稼",
  },
  {
    q: "numerical",
    res: "数字的",
  },
  {
    q: "two",
    res: "二",
  },
  {
    q: "print",
    res: "打印",
  },
  {
    q: "central",
    res: "中心的",
  },
  {
    q: "lexical",
    res: "词汇的",
  },
  {
    q: "salary",
    res: "薪水",
  },
  {
    q: "tree",
    res: "树",
  },
  {
    q: "auto",
    res: "汽车",
  },
  {
    q: "repaint",
    res: "重新油漆",
  },
  {
    q: "fastback",
    res: "快背",
  },
  {
    q: "signal",
    res: "信号",
  },
  {
    q: "solution",
    res: "解决方案",
  },
  {
    q: "hard",
    res: "坚固的",
  },
  {
    q: "under",
    res: "在下面",
  },
  {
    q: "question",
    res: "问题",
  },
  {
    q: "forced",
    res: "强迫",
  },
  {
    q: "square",
    res: "广场",
  },
  {
    q: "restricted",
    res: "受限制的",
  },
  {
    q: "partition",
    res: "隔断",
  },
  {
    q: "terminating",
    res: "终止",
  },
  {
    q: "bus",
    res: "公共汽车",
  },
  {
    q: "turning",
    res: "转弯",
  },
  {
    q: "every",
    res: "每一个",
  },
  {
    q: "package",
    res: "包裹",
  },
  {
    q: "boundary",
    res: "边界",
  },
  {
    q: "direct",
    res: "直接的",
  },
  {
    q: "ascending",
    res: "提升",
  },
  {
    q: "bios",
    res: "bios",
  },
  {
    q: "cad",
    res: "计算机辅助设计",
  },
  {
    q: "translate",
    res: "翻译",
  },
  {
    q: "apple",
    res: "苹果",
  },
  {
    q: "becoming",
    res: "相配的",
  },
  {
    q: "reside",
    res: "居住在",
  },
  {
    q: "heap",
    res: "堆",
  },
  {
    q: "description",
    res: "描述",
  },
  {
    q: "beyond",
    res: "超过",
  },
  {
    q: "red",
    res: "红色",
  },
  {
    q: "situation",
    res: "情况",
  },
  {
    q: "quickly",
    res: "迅速地",
  },
  {
    q: "edge",
    res: "边",
  },
  {
    q: "move",
    res: "移动",
  },
  {
    q: "positive",
    res: "积极乐观的",
  },
  {
    q: "sheet",
    res: "床单",
  },
  {
    q: "wildcard",
    res: "通配符",
  },
  {
    q: "surrounding",
    res: "周围的",
  },
  {
    q: "play",
    res: "玩",
  },
  {
    q: "turnkey",
    res: "交钥匙",
  },
  {
    q: "hardly",
    res: "几乎不",
  },
  {
    q: "conjunction",
    res: "结合",
  },
  {
    q: "guide",
    res: "指导",
  },
  {
    q: "clockwise",
    res: "顺时针方向的",
  },
  {
    q: "next",
    res: "下一个",
  },
  {
    q: "underscore",
    res: "强调",
  },
  {
    q: "sub-directory",
    res: "子目录",
  },
  {
    q: "seldom",
    res: "不常",
  },
  {
    q: "implement",
    res: "使生效",
  },
  {
    q: "decision",
    res: "决定",
  },
  {
    q: "legal",
    res: "合法的",
  },
  {
    q: "current",
    res: "现在的",
  },
  {
    q: "retain",
    res: "保持",
  },
  {
    q: "model",
    res: "模型",
  },
  {
    q: "reserved",
    res: "含蓄的",
  },
  {
    q: "consideration",
    res: "考虑",
  },
  {
    q: "updated",
    res: "更新",
  },
  {
    q: "inverse",
    res: "相反的",
  },
  {
    q: "only",
    res: "只有",
  },
  {
    q: "enter",
    res: "进来",
  },
  {
    q: "modification",
    res: "修改",
  },
  {
    q: "issue",
    res: "问题",
  },
  {
    q: "modified",
    res: "被改进的",
  },
  {
    q: "sale",
    res: "出售",
  },
  {
    q: "difference",
    res: "差别",
  },
  {
    q: "archive",
    res: "档案文件",
  },
  {
    q: "disconnect",
    res: "断开",
  },
  {
    q: "talk",
    res: "说话",
  },
  {
    q: "execution",
    res: "处决",
  },
  {
    q: "closed",
    res: "关闭",
  },
  {
    q: "locating",
    res: "定位",
  },
  {
    q: "formatting",
    res: "格式化",
  },
  {
    q: "congratulation",
    res: "祝贺",
  },
  {
    q: "developer",
    res: "开发商",
  },
  {
    q: "turn",
    res: "转动",
  },
  {
    q: "accidentally",
    res: "意外地",
  },
  {
    q: "fifth",
    res: "第五",
  },
  {
    q: "end",
    res: "终止",
  },
  {
    q: "report",
    res: "汇报",
  },
  {
    q: "base",
    res: "基础",
  },
  {
    q: "video",
    res: "视频",
  },
  {
    q: "hierarchical",
    res: "等级制的",
  },
  {
    q: "successive",
    res: "连续的",
  },
  {
    q: "version",
    res: "版本",
  },
  {
    q: "happening",
    res: "发生",
  },
  {
    q: "medium",
    res: "中等的",
  },
  {
    q: "within",
    res: "在内部",
  },
  {
    q: "recognize",
    res: "认出",
  },
  {
    q: "recommend",
    res: "推荐",
  },
  {
    q: "probably",
    res: "可能",
  },
  {
    q: "several",
    res: "几个",
  },
  {
    q: "alphabetically",
    res: "按字母顺序",
  },
  {
    q: "fancy",
    res: "设想",
  },
  {
    q: "reverse",
    res: "颠倒",
  },
  {
    q: "distinction",
    res: "差别",
  },
  {
    q: "certainty",
    res: "确实的事",
  },
  {
    q: "unmarked",
    res: "无标记",
  },
  {
    q: "understand",
    res: "懂",
  },
  {
    q: "employee",
    res: "受雇者",
  },
  {
    q: "top",
    res: "顶部",
  },
  {
    q: "first",
    res: "第一",
  },
  {
    q: "considered",
    res: "考虑过的",
  },
  {
    q: "template",
    res: "样板",
  },
  {
    q: "directory",
    res: "目录",
  },
  {
    q: "tension",
    res: "紧张",
  },
  {
    q: "true",
    res: "符合事实的",
  },
  {
    q: "numerous",
    res: "很多的",
  },
  {
    q: "powerful",
    res: "强大的",
  },
  {
    q: "number",
    res: "数字",
  },
  {
    q: "paste",
    res: "粘贴",
  },
  {
    q: "bar",
    res: "酒吧",
  },
  {
    q: "just",
    res: "只是",
  },
  {
    q: "port",
    res: "港口城市",
  },
  {
    q: "caret",
    res: "插入符号",
  },
  {
    q: "assignment",
    res: "分配",
  },
  {
    q: "task",
    res: "任务",
  },
  {
    q: "avoid",
    res: "避免",
  },
  {
    q: "logarithm",
    res: "对数",
  },
  {
    q: "formation",
    res: "组成",
  },
  {
    q: "mean",
    res: "意思是",
  },
  {
    q: "printer",
    res: "打印机",
  },
  {
    q: "activate",
    res: "使活动",
  },
  {
    q: "menu",
    res: "菜单",
  },
  {
    q: "letter",
    res: "信",
  },
  {
    q: "prevent",
    res: "防止",
  },
  {
    q: "exponent",
    res: "拥护者",
  },
  {
    q: "tab",
    res: "标签",
  },
  {
    q: "password",
    res: "暗语",
  },
  {
    q: "update",
    res: "使现代化",
  },
  {
    q: "fourscore",
    res: "八十",
  },
  {
    q: "join",
    res: "参加",
  },
  {
    q: "send",
    res: "邮寄",
  },
  {
    q: "placement",
    res: "安置",
  },
  {
    q: "assign",
    res: "分配",
  },
  {
    q: "option",
    res: "选项",
  },
  {
    q: "warning",
    res: "警告",
  },
  {
    q: "disappear",
    res: "消失",
  },
  {
    q: "partial",
    res: "部分的",
  },
  {
    q: "subtract",
    res: "减",
  },
  {
    q: "calculate",
    res: "计算",
  },
  {
    q: "breaking",
    res: "打破",
  },
  {
    q: "deprecated",
    res: "反对",
  },
  {
    q: "gradient",
    res: "坡度",
  },
  {
    q: "emitter",
    res: "发射器",
  },
  {
    q: "being",
    res: "存在",
  },
  {
    q: "refers",
    res: "指",
  },
  {
    q: "alongside",
    res: "沿着",
  },
  {
    q: "intersection",
    res: "十字路口",
  },
  {
    q: "daemon",
    res: "守护进程",
  },
  {
    q: "approver",
    res: "批准人",
  },
  {
    q: "assignable",
    res: "可转让的",
  },
  {
    q: "strategy",
    res: "策略",
  },
  {
    q: "micro",
    res: "微型的",
  },
  {
    q: "interceptors",
    res: "拦截器",
  },
  {
    q: "official",
    res: "公务的",
  },
  {
    q: "replenish",
    res: "补充",
  },
  {
    q: "scheduler",
    res: "调度程序",
  },
  {
    q: "limitations",
    res: "局限性",
  },
  {
    q: "allowable",
    res: "允许的",
  },
  {
    q: "perfect",
    res: "完美的",
  },
  {
    q: "wordperfect",
    res: "字斟句酌",
  },
  {
    q: "simply",
    res: "仅仅",
  },
  {
    q: "critical",
    res: "批评的",
  },
  {
    q: "allocate",
    res: "分配",
  },
  {
    q: "assist",
    res: "帮助",
  },
  {
    q: "equivalent",
    res: "相等的",
  },
  {
    q: "yellow",
    res: "黄的",
  },
  {
    q: "overall",
    res: "全面的",
  },
  {
    q: "pipe",
    res: "管",
  },
  {
    q: "preceding",
    res: "之前的",
  },
  {
    q: "fundamental",
    res: "基本的",
  },
  {
    q: "comparison",
    res: "比较",
  },
  {
    q: "suffix",
    res: "后缀",
  },
  {
    q: "calc",
    res: "计算",
  },
  {
    q: "calculation",
    res: "计算",
  },
  {
    q: "affect",
    res: "影响",
  },
  {
    q: "additive",
    res: "添加剂",
  },
  {
    q: "glass",
    res: "玻璃",
  },
  {
    q: "love",
    res: "爱",
  },
  {
    q: "star",
    res: "明星",
  },
  {
    q: "shared",
    res: "共享",
  },
  {
    q: "configure",
    res: "配置",
  },
  {
    q: "involve",
    res: "涉及",
  },
  {
    q: "seek",
    res: "寻找",
  },
  {
    q: "accessible",
    res: "可到达的",
  },
  {
    q: "portion",
    res: "部分",
  },
  {
    q: "talent",
    res: "才能",
  },
  {
    q: "subject",
    res: "主题",
  },
  {
    q: "let",
    res: "允许",
  },
  {
    q: "marking",
    res: "标记",
  },
  {
    q: "reading",
    res: "阅读",
  },
  {
    q: "able",
    res: "能够的",
  },
  {
    q: "advice",
    res: "劝告",
  },
  {
    q: "cheap",
    res: "花钱少的",
  },
  {
    q: "quotes",
    res: "引用",
  },
  {
    q: "world",
    res: "世界",
  },
  {
    q: "detect",
    res: "发现",
  },
  {
    q: "against",
    res: "反对",
  },
  {
    q: "together",
    res: "在一起",
  },
  {
    q: "program",
    res: "程序",
  },
  {
    q: "implicit",
    res: "含蓄的",
  },
  {
    q: "locale",
    res: "场所",
  },
  {
    q: "cooldown",
    res: "冷却时间",
  },
  {
    q: "staging area",
    res: "集结区",
  },
  {
    q: "staging",
    res: "登台",
  },
  {
    q: "automated",
    res: "自动化",
  },
  {
    q: "manual",
    res: "手册",
  },
  {
    q: "further",
    res: "进一步的",
  },
  {
    q: "so",
    res: "所以",
  },
  {
    q: "primary",
    res: "主要的，重要的",
  },
  {
    q: "to be",
    res: "成为",
  },
  {
    q: "safe",
    res: "安全",
  },
  {
    q: "expire",
    res: "失效",
  },
  {
    q: "schedule",
    res: "日程",
  },
  {
    q: "scheduled",
    res: "预定的",
  },
  {
    q: "coupon",
    res: "息票",
  },
  {
    q: "promo code",
    res: "促销代码",
  },
  {
    q: "-ative",
    res: "-反复无常的",
  },
  {
    q: "alter",
    res: "改变",
  },
  {
    q: "precede",
    res: "先于",
  },
  {
    q: "enclosing",
    res: "封闭的",
  },
  {
    q: "voc",
    res: "挥发性有机化合物",
  },
  {
    q: "vac",
    res: "真空吸尘器",
  },
  {
    q: "para",
    res: "对位",
  },
  {
    q: "since",
    res: "自从",
  },
  {
    q: "proceed",
    res: "继续",
  },
  {
    q: "semi",
    res: "半决赛",
  },
  {
    q: "some",
    res: "一些",
  },
  {
    q: "threshold",
    res: "门槛",
  },
  {
    q: "exclusion",
    res: "排斥",
  },
  {
    q: "idioms",
    res: "习语",
  },
  {
    q: "fix",
    res: "修理",
  },
  {
    q: "pond",
    res: "池塘",
  },
  {
    q: "surprise",
    res: "惊喜",
  },
  {
    q: "may",
    res: "也许",
  },
  {
    q: "loose",
    res: "释放",
  },
  {
    q: "loos",
    res: "厕所",
  },
  {
    q: "inherit",
    res: "继承",
  },
  {
    q: "radix",
    res: "基数",
  },
  {
    q: "infinity",
    res: "无穷",
  },
  {
    q: "sales",
    res: "出售",
  },
  {
    q: "rich",
    res: "富有的",
  },
  {
    q: "executor",
    res: "遗嘱执行人",
  },
  {
    q: "operate",
    res: "运转",
  },
  {
    q: "compose",
    res: "组成",
  },
  {
    q: "closure",
    res: "关闭",
  },
  {
    q: "senior",
    res: "级别高的",
  },
  {
    q: "personnel",
    res: "全体人员",
  },
  {
    q: "personal",
    res: "个人的",
  },
  {
    q: "helper",
    res: "帮手",
  },
  {
    q: "generic",
    res: "通用的",
  },
  {
    q: "demo",
    res: "演示",
  },
  {
    q: "dummy",
    res: "笨蛋",
  },
  {
    q: "race",
    res: "比赛",
  },
  {
    q: "prism",
    res: "棱镜",
  },
  {
    q: "successor",
    res: "继承人",
  },
  {
    q: "precursor",
    res: "前身",
  },
  {
    q: "arch",
    res: "拱",
  },
  {
    q: "principle",
    res: "道德原则",
  },
  {
    q: "advanced",
    res: "先进的",
  },
  {
    q: "migration",
    res: "迁移",
  },
  {
    q: "greater",
    res: "更大的",
  },
  {
    q: "propagation",
    res: "传播",
  },
  {
    q: "stat",
    res: "斯达",
  },
  {
    q: "dirty",
    res: "肮脏的",
  },
  {
    q: "ambiguous",
    res: "模棱两可的",
  },
];


async function addToDict() {
  for(let i = 0; i < arrDict.length ; i++) {

    let q = arrDict[i].q
    let res = arrDict[i].res
    try{
      await axios({
        method: "post",
        url: "https://fanyi.baidu.com/pcnewcollection",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          cookie:
            'BIDUPSID=EE88B563120DBDE511A4CFA5B32AF77C; PSTM=1638589079; BAIDUID=EE88B563120DBDE5F8C727D7ED70CA9D:FG=1; __yjs_duid=1_8dd3a079f43bc627b25608d5ddb910ab1638612277970; BDUSS=02LWdwUnJqUUI2b3k3WFQ0a2pDMXI2Q0VmS2oxT2ZCUVFPM2dKaFBnYlY0dEpoRVFBQUFBJCQAAAAAAAAAAAEAAAAkD1ZcTGFkeWJhb2JhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANVVq2HVVathQk; BDUSS_BFESS=02LWdwUnJqUUI2b3k3WFQ0a2pDMXI2Q0VmS2oxT2ZCUVFPM2dKaFBnYlY0dEpoRVFBQUFBJCQAAAAAAAAAAAEAAAAkD1ZcTGFkeWJhb2JhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANVVq2HVVathQk; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; APPGUIDE_10_0_2=1; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1645858044,1646229120; BAIDUID_BFESS=EE88B563120DBDE5F8C727D7ED70CA9D:FG=1; delPer=0; PSINO=6; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; RT="z=1&dm=baidu.com&si=k28fohpb14&ss=l0dvkk84&sl=2&tt=1r9&bcn=https://fclog.baidu.com/log/weirwood?type=perf&ld=257&ul=3tjp&hd=3tm0"; BCLID=6179856355083406647; BDSFRCVID=zU4OJexroG0RoLoD5KERej4se_weG7bTDYrEuYGUcqUBUxDVJeC6EG0Pts1-dEu-EHtdogKKy2OTH9DF_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF=tJIe_C-atC-3fP36q4rVhP4Sqxby26nU2Rb9aJ5nJDoSM4Tx-qOU0tPDjfoBtURGMN7d5l0bQpP-HJAG-lo8Wjty5M5KQnveygLfKl0MLInlbb0xynoD24tvKxnMBMn8teOnaITg3fAKftnOM46JehL3346-35543bRTLnLy5KJtMDFlePjHhRFtqx5Ka43tHD7yWCvTWIncOR59K4nnDhDeXMnRhlRp3DTB_POTX-3qsI3P3MOZKxL0WtJP5boP0HTOKUQF5l8-sq0x0bO5DDuOQq_L0xvJ5IOMahvXtq7xOKTeQlPK5JkgMx6MqpQJQeQ-5KQN3KJmfbL9bT3YjjTXjN88J5tHJb3fL-0824bBjJrTq4bohjnWqtR9BtQmJJrNaPPEBn7UJD-C04o8jbt1XUvtbhc2Qg-q3R7lH66MJlRS3M7dyjQ30hbb0x-jLNOuVn0MWhjD8xcHytnJyUP-D4nnBTcR3H8HL4nv2JcJbM5m3x6qLTKkQN3T-PKO5bRu_CF-JC8hMKKlj5RjhP0thxtXa4ryaKAX3b7EfbnRfq7_bf--D6KO3ROJBf3iaHbL0RF2Bh3hqR5u55Jxy5K_hpbm-nbMt5TiWnv83Uj-hlnHQT3mKP5bbN3i-4jEK2nHWb3cW-IK8UbSefOPBTD02-nBat-OQ6npaJ5nJq5nhMJmb67JD-50eGLsKtoXMCKX3JjV5PK_Hn7zen6ljM4pbq7H2M-jLDOrWh-aWh5CeJFmKPor5PL1jU5n0pcH36TkKM5J-x5IStne3x6qLTKkQN3T-ntDHCn4L66NWPbfDn3oynuKXp0netOly5jtMgOBBJ0yQ4b4OR5JjxonDh83bG7MJUutfD7H3KC2JIthMxK; BCLID_BFESS=6179856355083406647; BDSFRCVID_BFESS=zU4OJexroG0RoLoD5KERej4se_weG7bTDYrEuYGUcqUBUxDVJeC6EG0Pts1-dEu-EHtdogKKy2OTH9DF_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF_BFESS=tJIe_C-atC-3fP36q4rVhP4Sqxby26nU2Rb9aJ5nJDoSM4Tx-qOU0tPDjfoBtURGMN7d5l0bQpP-HJAG-lo8Wjty5M5KQnveygLfKl0MLInlbb0xynoD24tvKxnMBMn8teOnaITg3fAKftnOM46JehL3346-35543bRTLnLy5KJtMDFlePjHhRFtqx5Ka43tHD7yWCvTWIncOR59K4nnDhDeXMnRhlRp3DTB_POTX-3qsI3P3MOZKxL0WtJP5boP0HTOKUQF5l8-sq0x0bO5DDuOQq_L0xvJ5IOMahvXtq7xOKTeQlPK5JkgMx6MqpQJQeQ-5KQN3KJmfbL9bT3YjjTXjN88J5tHJb3fL-0824bBjJrTq4bohjnWqtR9BtQmJJrNaPPEBn7UJD-C04o8jbt1XUvtbhc2Qg-q3R7lH66MJlRS3M7dyjQ30hbb0x-jLNOuVn0MWhjD8xcHytnJyUP-D4nnBTcR3H8HL4nv2JcJbM5m3x6qLTKkQN3T-PKO5bRu_CF-JC8hMKKlj5RjhP0thxtXa4ryaKAX3b7EfbnRfq7_bf--D6KO3ROJBf3iaHbL0RF2Bh3hqR5u55Jxy5K_hpbm-nbMt5TiWnv83Uj-hlnHQT3mKP5bbN3i-4jEK2nHWb3cW-IK8UbSefOPBTD02-nBat-OQ6npaJ5nJq5nhMJmb67JD-50eGLsKtoXMCKX3JjV5PK_Hn7zen6ljM4pbq7H2M-jLDOrWh-aWh5CeJFmKPor5PL1jU5n0pcH36TkKM5J-x5IStne3x6qLTKkQN3T-ntDHCn4L66NWPbfDn3oynuKXp0netOly5jtMgOBBJ0yQ4b4OR5JjxonDh83bG7MJUutfD7H3KC2JIthMxK; H_PS_PSSID=35104_36004_34584_35871_35949_35994_35317_26350_35884_35879_36010; BA_HECTOR=2g840024042g2k0ks41h283pa0r; ZD_ENTRY=baidu; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1646530620; ab_sr=1.0.1_ZTQ4ZDFiMDdmZTZjZTAxOTgxZDdkMzg1ZjFhZGI0ZGVhNzkxZmFmMTMzOGVkNjViYjYzODI3MmY3YTAzOWM5ODY4OGYwYjI5M2IwMTFhOTU4NGZlNTgyZDJmMTNmZGY0MDNmMGM4NmEwNDdlZTEwZDc3MzcyODZhMzJmNjU1NDVjY2I4MTkyMjUyZTk0NjBhN2JmY2FkMDlkMmI2MDBhOWNkNGRhYWE0ZDZkMmNmYTI5YWVlYmM4MTY5MzgxYmVja',
        },
        params: {
          req: "add",
        },
        data: qs.stringify({
          fanyi_src: q,
          direction: "en2zh",   // 固定
          gid: 0,               // 固定
          bdstoken: "ccac257f3074c418170b5eaed7eb27e8",    // 固定
          fanyi_dst: decodeURIComponent(res)       // 意思
        }),
      }).then((res) => {
        console.log(res.data.errno);
      });
    }catch(e){
      console.log('-------------------------', '失败', q)
    }
  }
}

addToDict()

