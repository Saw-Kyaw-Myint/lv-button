function kt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let s = 0; s < r.length; s++)
    n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const P = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, en = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ht = () => {
}, tn = /^on[^a-z]/, nn = (e) => tn.test(e), T = Object.assign, rn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, sn = Object.prototype.hasOwnProperty, m = (e, t) => sn.call(e, t), h = Array.isArray, G = (e) => be(e) === "[object Map]", on = (e) => be(e) === "[object Set]", w = (e) => typeof e == "function", C = (e) => typeof e == "string", Ne = (e) => typeof e == "symbol", S = (e) => e !== null && typeof e == "object", cn = (e) => (S(e) || w(e)) && w(e.then) && w(e.catch), ln = Object.prototype.toString, be = (e) => ln.call(e), _t = (e) => be(e).slice(8, -1), an = (e) => be(e) === "[object Object]", Ae = (e) => C(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, un = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, fn = un((e) => e.charAt(0).toUpperCase() + e.slice(1)), X = (e, t) => !Object.is(e, t), pn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Xe;
const ye = () => Xe || (Xe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function je(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = C(r) ? gn(r) : je(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else if (C(e) || S(e))
    return e;
}
const dn = /;(?![^(]*\))/g, hn = /:([^]+)/, _n = /\/\*[^]*?\*\//g;
function gn(e) {
  const t = {};
  return e.replace(_n, "").split(dn).forEach((n) => {
    if (n) {
      const r = n.split(hn);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function ze(e) {
  let t = "";
  if (C(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const r = ze(e[n]);
      r && (t += r + " ");
    }
  else if (S(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function Ze(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let gt;
function mn(e, t = gt) {
  t && t.active && t.effects.push(e);
}
function En() {
  return gt;
}
const Re = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, mt = (e) => (e.w & z) > 0, Et = (e) => (e.n & z) > 0, wn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= z;
}, Nn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const s = t[r];
      mt(s) && !Et(s) ? s.delete(e) : t[n++] = s, s.w &= ~z, s.n &= ~z;
    }
    t.length = n;
  }
}, Ie = /* @__PURE__ */ new WeakMap();
let ee = 0, z = 1;
const De = 30;
let b;
const H = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Ce = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class bn {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, mn(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = b, n = W;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = b, b = this, W = !0, z = 1 << ++ee, ee <= De ? wn(this) : ke(this), this.fn();
    } finally {
      ee <= De && Nn(this), z = 1 << --ee, b = this.parent, W = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    b === this ? this.deferStop = !0 : this.active && (ke(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ke(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let W = !0;
const wt = [];
function Nt() {
  wt.push(W), W = !1;
}
function bt() {
  const e = wt.pop();
  W = e === void 0 ? !0 : e;
}
function V(e, t, n) {
  if (W && b) {
    let r = Ie.get(e);
    r || Ie.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = Re());
    const o = process.env.NODE_ENV !== "production" ? { effect: b, target: e, type: t, key: n } : void 0;
    On(s, o);
  }
}
function On(e, t) {
  let n = !1;
  ee <= De ? Et(e) || (e.n |= z, n = !mt(e)) : n = !e.has(b), n && (e.add(b), b.deps.push(e), process.env.NODE_ENV !== "production" && b.onTrack && b.onTrack(
    T(
      {
        effect: b
      },
      t
    )
  ));
}
function j(e, t, n, r, s, o) {
  const i = Ie.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e)) {
    const u = Number(r);
    i.forEach((d, l) => {
      (l === "length" || !Ne(l) && l >= u) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? Ae(n) && c.push(i.get("length")) : (c.push(i.get(H)), G(e) && c.push(i.get(Ce)));
        break;
      case "delete":
        h(e) || (c.push(i.get(H)), G(e) && c.push(i.get(Ce)));
        break;
      case "set":
        G(e) && c.push(i.get(H));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: r, oldValue: s, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? ie(c[0], a) : ie(c[0]));
  else {
    const u = [];
    for (const d of c)
      d && u.push(...d);
    process.env.NODE_ENV !== "production" ? ie(Re(u), a) : ie(Re(u));
  }
}
function ie(e, t) {
  const n = h(e) ? e : [...e];
  for (const r of n)
    r.computed && et(r, t);
  for (const r of n)
    r.computed || et(r, t);
}
function et(e, t) {
  (e !== b || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(T({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Sn = /* @__PURE__ */ kt("__proto__,__v_isRef,__isVue"), Ot = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ne)
), tt = /* @__PURE__ */ Vn();
function Vn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        V(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(p)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Nt();
      const r = p(this)[t].apply(this, n);
      return bt(), r;
    };
  }), e;
}
function vn(e) {
  const t = p(this);
  return V(t, "has", e), t.hasOwnProperty(e);
}
class St {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._shallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._shallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw" && r === (s ? o ? Rt : yt : o ? jn : xt).get(t))
      return t;
    const i = h(t);
    if (!s) {
      if (i && m(tt, n))
        return Reflect.get(tt, n, r);
      if (n === "hasOwnProperty")
        return vn;
    }
    const c = Reflect.get(t, n, r);
    return (Ne(n) ? Ot.has(n) : Sn(n)) || (s || V(t, "get", n), o) ? c : O(c) ? i && Ae(n) ? c : c.value : S(c) ? s ? Dt(c) : It(c) : c;
  }
}
class xn extends St {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (J(o) && O(o) && !O(r))
      return !1;
    if (!this._shallow && (!Te(r) && !J(r) && (o = p(o), r = p(r)), !h(t) && O(o) && !O(r)))
      return o.value = r, !0;
    const i = h(t) && Ae(n) ? Number(n) < t.length : m(t, n), c = Reflect.set(t, n, r, s);
    return t === p(s) && (i ? X(r, o) && j(t, "set", n, r, o) : j(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = m(t, n), s = t[n], o = Reflect.deleteProperty(t, n);
    return o && r && j(t, "delete", n, void 0, s), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Ne(n) || !Ot.has(n)) && V(t, "has", n), r;
  }
  ownKeys(t) {
    return V(
      t,
      "iterate",
      h(t) ? "length" : H
    ), Reflect.ownKeys(t);
  }
}
class Vt extends St {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && Ze(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && Ze(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const yn = /* @__PURE__ */ new xn(), Rn = /* @__PURE__ */ new Vt(), In = /* @__PURE__ */ new Vt(!0), Ke = (e) => e, Oe = (e) => Reflect.getPrototypeOf(e);
function ce(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = p(e), o = p(t);
  n || (X(t, o) && V(s, "get", t), V(s, "get", o));
  const { has: i } = Oe(s), c = r ? Ke : n ? Ue : Be;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, o))
    return c(e.get(o));
  e !== s && e.get(t);
}
function le(e, t = !1) {
  const n = this.__v_raw, r = p(n), s = p(e);
  return t || (X(e, s) && V(r, "has", e), V(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function ae(e, t = !1) {
  return e = e.__v_raw, !t && V(p(e), "iterate", H), Reflect.get(e, "size", e);
}
function nt(e) {
  e = p(e);
  const t = p(this);
  return Oe(t).has.call(t, e) || (t.add(e), j(t, "add", e, e)), this;
}
function rt(e, t) {
  t = p(t);
  const n = p(this), { has: r, get: s } = Oe(n);
  let o = r.call(n, e);
  o ? process.env.NODE_ENV !== "production" && vt(n, r, e) : (e = p(e), o = r.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), o ? X(t, i) && j(n, "set", e, t, i) : j(n, "add", e, t), this;
}
function st(e) {
  const t = p(this), { has: n, get: r } = Oe(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && vt(t, n, e) : (e = p(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && j(t, "delete", e, void 0, o), i;
}
function ot() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? G(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && j(e, "clear", void 0, void 0, n), r;
}
function ue(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, c = p(i), a = t ? Ke : e ? Ue : Be;
    return !e && V(c, "iterate", H), i.forEach((u, d) => r.call(s, a(u), a(d), o));
  };
}
function fe(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = p(s), i = G(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = s[e](...r), d = n ? Ke : t ? Ue : Be;
    return !t && V(
      o,
      "iterate",
      a ? Ce : H
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = u.next();
        return f ? { value: l, done: f } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function M(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${fn(e)} operation ${n}failed: target is readonly.`,
        p(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
function Dn() {
  const e = {
    get(o) {
      return ce(this, o);
    },
    get size() {
      return ae(this);
    },
    has: le,
    add: nt,
    set: rt,
    delete: st,
    clear: ot,
    forEach: ue(!1, !1)
  }, t = {
    get(o) {
      return ce(this, o, !1, !0);
    },
    get size() {
      return ae(this);
    },
    has: le,
    add: nt,
    set: rt,
    delete: st,
    clear: ot,
    forEach: ue(!1, !0)
  }, n = {
    get(o) {
      return ce(this, o, !0);
    },
    get size() {
      return ae(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: M("add"),
    set: M("set"),
    delete: M("delete"),
    clear: M("clear"),
    forEach: ue(!0, !1)
  }, r = {
    get(o) {
      return ce(this, o, !0, !0);
    },
    get size() {
      return ae(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: M("add"),
    set: M("set"),
    delete: M("delete"),
    clear: M("clear"),
    forEach: ue(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = fe(
      o,
      !1,
      !1
    ), n[o] = fe(
      o,
      !0,
      !1
    ), t[o] = fe(
      o,
      !1,
      !0
    ), r[o] = fe(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  Cn,
  Tn,
  $n,
  Pn
] = /* @__PURE__ */ Dn();
function He(e, t) {
  const n = t ? e ? Pn : $n : e ? Tn : Cn;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    m(n, s) && s in r ? n : r,
    s,
    o
  );
}
const Mn = {
  get: /* @__PURE__ */ He(!1, !1)
}, Fn = {
  get: /* @__PURE__ */ He(!0, !1)
}, An = {
  get: /* @__PURE__ */ He(!0, !0)
};
function vt(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const s = _t(e);
    console.warn(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const xt = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap();
function zn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Kn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : zn(_t(e));
}
function It(e) {
  return J(e) ? e : We(
    e,
    !1,
    yn,
    Mn,
    xt
  );
}
function Dt(e) {
  return We(
    e,
    !0,
    Rn,
    Fn,
    yt
  );
}
function pe(e) {
  return We(
    e,
    !0,
    In,
    An,
    Rt
  );
}
function We(e, t, n, r, s) {
  if (!S(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = Kn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? r : n
  );
  return s.set(e, c), c;
}
function B(e) {
  return J(e) ? B(e.__v_raw) : !!(e && e.__v_isReactive);
}
function J(e) {
  return !!(e && e.__v_isReadonly);
}
function Te(e) {
  return !!(e && e.__v_isShallow);
}
function $e(e) {
  return B(e) || J(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Hn(e) {
  return pn(e, "__v_skip", !0), e;
}
const Be = (e) => S(e) ? It(e) : e, Ue = (e) => S(e) ? Dt(e) : e;
function O(e) {
  return !!(e && e.__v_isRef === !0);
}
function Wn(e) {
  return O(e) ? e.value : e;
}
const Bn = {
  get: (e, t, n) => Wn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return O(s) && !O(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Un(e) {
  return B(e) ? e : new Proxy(e, Bn);
}
const U = [];
function Ln(e) {
  U.push(e);
}
function Jn() {
  U.pop();
}
function E(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  Nt();
  const n = U.length ? U[U.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = qn();
  if (r)
    L(
      r,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        s.map(
          ({ vnode: o }) => `at <${Gt(n, o.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...Yn(s)), console.warn(...o);
  }
  bt();
}
function qn() {
  let e = U[U.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Yn(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Gn(n));
  }), t;
}
function Gn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${Gt(
    e.component,
    e.type,
    r
  )}`, o = ">" + n;
  return e.props ? [s, ...Qn(e.props), o] : [s + o];
}
function Qn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Ct(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Ct(e, t, n) {
  return C(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : O(t) ? (t = Ct(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : w(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const Tt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function L(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    $t(o, t, n);
  }
  return s;
}
function Pe(e, t, n, r) {
  if (w(e)) {
    const o = L(e, t, n, r);
    return o && cn(o) && o.catch((i) => {
      $t(i, t, n);
    }), o;
  }
  const s = [];
  for (let o = 0; o < e.length; o++)
    s.push(Pe(e[o], t, n, r));
  return s;
}
function $t(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Tt[n] : n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      L(
        a,
        null,
        10,
        [e, i, c]
      );
      return;
    }
  }
  Xn(e, n, s, r);
}
function Xn(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = Tt[t];
    if (n && Ln(n), E(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Jn(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let ge = !1, Me = !1;
const I = [];
let A = 0;
const Q = [];
let $ = null, F = 0;
const Pt = /* @__PURE__ */ Promise.resolve();
let Le = null;
const Zn = 100;
function kn(e) {
  const t = Le || Pt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function er(e) {
  let t = A + 1, n = I.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = I[r], o = se(s);
    o < e || o === e && s.pre ? t = r + 1 : n = r;
  }
  return t;
}
function Je(e) {
  (!I.length || !I.includes(
    e,
    ge && e.allowRecurse ? A + 1 : A
  )) && (e.id == null ? I.push(e) : I.splice(er(e.id), 0, e), Mt());
}
function Mt() {
  !ge && !Me && (Me = !0, Le = Pt.then(At));
}
function Ft(e) {
  h(e) ? Q.push(...e) : (!$ || !$.includes(
    e,
    e.allowRecurse ? F + 1 : F
  )) && Q.push(e), Mt();
}
function tr(e) {
  if (Q.length) {
    const t = [...new Set(Q)];
    if (Q.length = 0, $) {
      $.push(...t);
      return;
    }
    for ($ = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), $.sort((n, r) => se(n) - se(r)), F = 0; F < $.length; F++)
      process.env.NODE_ENV !== "production" && jt(e, $[F]) || $[F]();
    $ = null, F = 0;
  }
}
const se = (e) => e.id == null ? 1 / 0 : e.id, nr = (e, t) => {
  const n = se(e) - se(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function At(e) {
  Me = !1, ge = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), I.sort(nr);
  const t = process.env.NODE_ENV !== "production" ? (n) => jt(e, n) : ht;
  try {
    for (A = 0; A < I.length; A++) {
      const n = I[A];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        L(n, null, 14);
      }
    }
  } finally {
    A = 0, I.length = 0, tr(e), ge = !1, Le = null, (I.length || Q.length) && At(e);
  }
}
function jt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Zn) {
      const r = t.ownerInstance, s = r && Yt(r.type);
      return E(
        `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const k = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (ye().__VUE_HMR_RUNTIME__ = {
  createRecord: Ve(rr),
  rerender: Ve(sr),
  reload: Ve(or)
});
const me = /* @__PURE__ */ new Map();
function rr(e, t) {
  return me.has(e) ? !1 : (me.set(e, {
    initialDef: ne(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ne(e) {
  return Qt(e) ? e.__vccOpts : e;
}
function sr(e, t) {
  const n = me.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, ne(r.type).render = t), r.renderCache = [], r.update();
  }));
}
function or(e, t) {
  const n = me.get(e);
  if (!n)
    return;
  t = ne(t), it(n.initialDef, t);
  const r = [...n.instances];
  for (const s of r) {
    const o = ne(s.type);
    k.has(o) || (o !== n.initialDef && it(o, t), k.add(o)), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (k.add(o), s.ceReload(t.styles), k.delete(o)) : s.parent ? Je(s.parent.update) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Ft(() => {
    for (const s of r)
      k.delete(
        ne(s.type)
      );
  });
}
function it(e, t) {
  T(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ve(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let R = null, ir = null;
const cr = Symbol.for("v-ndc"), lr = (e) => e.__isSuspense;
function ar(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : Ft(e);
}
const de = {};
function ur(e, t, { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = P) {
  var c;
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (g) => {
    E(
      "Invalid watch source: ",
      g,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = En() === ((c = Z) == null ? void 0 : c.scope) ? Z : null;
  let d, l = !1, f = !1;
  if (O(e) ? (d = () => e.value, l = Te(e)) : B(e) ? (d = () => e, r = !0) : h(e) ? (f = !0, l = e.some((g) => B(g) || Te(g)), d = () => e.map((g) => {
    if (O(g))
      return g.value;
    if (B(g))
      return Y(g);
    if (w(g))
      return L(g, u, 2);
    process.env.NODE_ENV !== "production" && a(g);
  })) : w(e) ? t ? d = () => L(e, u, 2) : d = () => {
    if (!(u && u.isUnmounted))
      return _ && _(), Pe(
        e,
        u,
        3,
        [v]
      );
  } : (d = ht, process.env.NODE_ENV !== "production" && a(e)), t && r) {
    const g = d;
    d = () => Y(g());
  }
  let _, v = (g) => {
    _ = y.onStop = () => {
      L(g, u, 4);
    };
  }, x = f ? new Array(e.length).fill(de) : de;
  const K = () => {
    if (y.active)
      if (t) {
        const g = y.run();
        (r || l || (f ? g.some((Xt, Zt) => X(Xt, x[Zt])) : X(g, x))) && (_ && _(), Pe(t, u, 3, [
          g,
          // pass undefined as the old value when it's changed for the first time
          x === de ? void 0 : f && x[0] === de ? [] : x,
          v
        ]), x = g);
      } else
        y.run();
  };
  K.allowRecurse = !!t;
  let oe;
  s === "sync" ? oe = K : s === "post" ? oe = () => ft(K, u && u.suspense) : (K.pre = !0, u && (K.id = u.uid), oe = () => Je(K));
  const y = new bn(d, oe);
  return process.env.NODE_ENV !== "production" && (y.onTrack = o, y.onTrigger = i), t ? n ? K() : x = y.run() : s === "post" ? ft(
    y.run.bind(y),
    u && u.suspense
  ) : y.run(), () => {
    y.stop(), u && u.scope && rn(u.scope.effects, y);
  };
}
function fr(e, t, n) {
  const r = this.proxy, s = C(e) ? e.includes(".") ? pr(r, e) : () => r[e] : e.bind(r, r);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = Z;
  dt(this);
  const c = ur(s, o.bind(r), n);
  return i ? dt(i) : Dr(), c;
}
function pr(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function Y(e, t) {
  if (!S(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), O(e))
    Y(e.value, t);
  else if (h(e))
    for (let n = 0; n < e.length; n++)
      Y(e[n], t);
  else if (on(e) || G(e))
    e.forEach((n) => {
      Y(n, t);
    });
  else if (an(e))
    for (const n in e)
      Y(e[n], t);
  return e;
}
const dr = (e) => !!e.type.__asyncLoader;
function hr(e, t, n = {}, r, s) {
  if (R.isCE || R.parent && dr(R.parent) && R.parent.isCE)
    return t !== "default" && (n.name = t), Ye("slot", n, r && r());
  let o = e[t];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (E(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), o = () => []), o && o._c && (o._d = !1), Ht();
  const i = o && zt(o(n)), c = vr(
    Se,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (r ? r() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !s && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function zt(e) {
  return e.some((t) => Bt(t) ? !(t.type === Kt || t.type === Se && !zt(t.children)) : !0) ? e : null;
}
const Fe = (e) => e ? Cr(e) ? Tr(e) || e.proxy : Fe(e.parent) : null, re = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ T(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? pe(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? pe(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? pe(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? pe(e.refs) : e.refs,
    $parent: (e) => Fe(e.parent),
    $root: (e) => Fe(e.root),
    $emit: (e) => e.emit,
    $options: (e) => mr(e),
    $forceUpdate: (e) => e.f || (e.f = () => Je(e.update)),
    $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
    $watch: (e) => fr.bind(e)
  })
), _r = (e) => e === "_" || e === "$", ve = (e, t) => e !== P && !e.__isScriptSetup && m(e, t), gr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const _ = i[t];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ve(r, t))
          return i[t] = 1, r[t];
        if (s !== P && m(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && m(u, t)
        )
          return i[t] = 3, o[t];
        if (n !== P && m(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = re[t];
    let l, f;
    if (d)
      return t === "$attrs" ? (V(e, "get", t), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && V(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== P && m(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, m(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && R && (!C(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== P && _r(t[0]) && m(s, t) ? E(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === R && E(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return ve(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && m(s, t) ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== P && m(r, t) ? (r[t] = n, !0) : m(e.props, t) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && E(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== P && m(e, i) || ve(t, i) || (c = o[0]) && m(c, i) || m(r, i) || m(re, i) || m(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : m(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (gr.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function ct(e) {
  return h(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function mr(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach(
    (u) => Ee(a, u, i, !0)
  ), Ee(a, t, i)), S(t) && o.set(t, a), a;
}
function Ee(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Ee(e, o, n, !0), s && s.forEach(
    (i) => Ee(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Er[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Er = {
  data: lt,
  props: ut,
  emits: ut,
  // objects
  methods: te,
  computed: te,
  // lifecycle
  beforeCreate: N,
  created: N,
  beforeMount: N,
  mounted: N,
  beforeUpdate: N,
  updated: N,
  beforeDestroy: N,
  beforeUnmount: N,
  destroyed: N,
  unmounted: N,
  activated: N,
  deactivated: N,
  errorCaptured: N,
  serverPrefetch: N,
  // assets
  components: te,
  directives: te,
  // watch
  watch: Nr,
  // provide / inject
  provide: lt,
  inject: wr
};
function lt(e, t) {
  return t ? e ? function() {
    return T(
      w(e) ? e.call(this, this) : e,
      w(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wr(e, t) {
  return te(at(e), at(t));
}
function at(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function N(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function te(e, t) {
  return e ? T(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ut(e, t) {
  return e ? h(e) && h(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : T(
    /* @__PURE__ */ Object.create(null),
    ct(e),
    ct(t ?? {})
  ) : t;
}
function Nr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = T(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = N(e[r], t[r]);
  return n;
}
const ft = ar, br = (e) => e.__isTeleport, Se = Symbol.for("v-fgt"), Or = Symbol.for("v-txt"), Kt = Symbol.for("v-cmt"), he = [];
let D = null;
function Ht(e = !1) {
  he.push(D = e ? null : []);
}
function Sr() {
  he.pop(), D = he[he.length - 1] || null;
}
function Wt(e) {
  return e.dynamicChildren = D || en, Sr(), D && D.push(e), e;
}
function Vr(e, t, n, r, s, o) {
  return Wt(
    qe(
      e,
      t,
      n,
      r,
      s,
      o,
      !0
      /* isBlock */
    )
  );
}
function vr(e, t, n, r, s) {
  return Wt(
    Ye(
      e,
      t,
      n,
      r,
      s,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Bt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const xr = (...e) => Jt(
  ...e
), Ut = "__vInternal", Lt = ({ key: e }) => e ?? null, _e = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? C(e) || O(e) || w(e) ? { i: R, r: e, k: t, f: !!n } : e : null);
function qe(e, t = null, n = null, r = 0, s = null, o = e === Se ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Lt(t),
    ref: t && _e(t),
    scopeId: ir,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: R
  };
  return c ? (Ge(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= C(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && E("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  D && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && D.push(a), a;
}
const Ye = process.env.NODE_ENV !== "production" ? xr : Jt;
function Jt(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === cr) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = Kt), Bt(e)) {
    const c = we(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ge(c, n), !o && D && (c.shapeFlag & 6 ? D[D.indexOf(e)] = c : D.push(c)), c.patchFlag |= -2, c;
  }
  if (Qt(e) && (e = e.__vccOpts), t) {
    t = yr(t);
    let { class: c, style: a } = t;
    c && !C(c) && (t.class = ze(c)), S(a) && ($e(a) && !h(a) && (a = T({}, a)), t.style = je(a));
  }
  const i = C(e) ? 1 : lr(e) ? 128 : br(e) ? 64 : S(e) ? 4 : w(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && $e(e) && (e = p(e), E(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), qe(
    e,
    t,
    n,
    r,
    s,
    i,
    o,
    !0
  );
}
function yr(e) {
  return e ? $e(e) || Ut in e ? T({}, e) : e : null;
}
function we(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e, c = t ? Ir(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Lt(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? h(s) ? s.concat(_e(t)) : [s, _e(t)] : _e(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && h(i) ? i.map(qt) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Se ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && we(e.ssContent),
    ssFallback: e.ssFallback && we(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function qt(e) {
  const t = we(e);
  return h(e.children) && (t.children = e.children.map(qt)), t;
}
function Rr(e = " ", t = 0) {
  return Ye(Or, null, e, t);
}
function Ge(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Ge(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Ut in t) ? t._ctx = R : s === 3 && R && (R.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    w(t) ? (t = { default: t, _ctx: R }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Rr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Ir(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = ze([t.class, r.class]));
      else if (s === "style")
        t.style = je([t.style, r.style]);
      else if (nn(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(h(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else
        s !== "" && (t[s] = r[s]);
  }
  return t;
}
let Z = null, Qe, q, pt = "__VUE_INSTANCE_SETTERS__";
(q = ye()[pt]) || (q = ye()[pt] = []), q.push((e) => Z = e), Qe = (e) => {
  q.length > 1 ? q.forEach((t) => t(e)) : q[0](e);
};
const dt = (e) => {
  Qe(e), e.scope.on();
}, Dr = () => {
  Z && Z.scope.off(), Qe(null);
};
function Cr(e) {
  return e.vnode.shapeFlag & 4;
}
function Tr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Un(Hn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in re)
          return re[n](e);
      },
      has(t, n) {
        return n in t || n in re;
      }
    }));
}
const $r = /(?:^|[-_])(\w)/g, Pr = (e) => e.replace($r, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Yt(e, t = !0) {
  return w(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Gt(e, t, n = !1) {
  let r = Yt(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? Pr(r) : n ? "App" : "Anonymous";
}
function Qt(e) {
  return w(e) && "__vccOpts" in e;
}
function xe(e) {
  return !!(e && e.__v_isShallow);
}
function Mr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, s = {
    header(l) {
      return S(l) ? l.__isVue ? ["div", e, "VueInstance"] : O(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : B(l) ? [
        "div",
        {},
        ["span", e, xe(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${J(l) ? " (readonly)" : ""}`
      ] : J(l) ? [
        "div",
        {},
        ["span", e, xe(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", p(l.props))), l.setupState !== P && f.push(i("setup", l.setupState)), l.data !== P && f.push(i("data", p(l.data)));
    const _ = a(l, "computed");
    _ && f.push(i("computed", _));
    const v = a(l, "inject");
    return v && f.push(i("injected", v)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = T({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((_) => [
          "div",
          {},
          ["span", r, _ + ": "],
          c(f[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", r, l] : S(l) ? ["object", { object: f ? p(l) : l }] : ["span", n, String(l)];
  }
  function a(l, f) {
    const _ = l.type;
    if (w(_))
      return;
    const v = {};
    for (const x in l.ctx)
      u(_, x, f) && (v[x] = l.ctx[x]);
    return v;
  }
  function u(l, f, _) {
    const v = l[_];
    if (h(v) && v.includes(f) || S(v) && f in v || l.extends && u(l.extends, f, _) || l.mixins && l.mixins.some((x) => u(x, f, _)))
      return !0;
  }
  function d(l) {
    return xe(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
function Fr() {
  Mr();
}
process.env.NODE_ENV !== "production" && Fr();
const Ar = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, jr = {}, zr = { class: "lv-button" };
function Kr(e, t) {
  return Ht(), Vr("div", null, [
    qe("button", zr, [
      hr(e.$slots, "default")
    ])
  ]);
}
const Hr = /* @__PURE__ */ Ar(jr, [["render", Kr]]), Br = {
  install: (e, t) => {
    e.component("LearnVueButton", Hr);
  }
};
export {
  Br as default
};
