"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
      if (decorator = decorators[i6])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t5, e9, n6) {
      if (this._$cssResult$ = true, n6 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t5, this.t = e9;
    }
    get styleSheet() {
      let t5 = this.o;
      const s5 = this.t;
      if (e && void 0 === t5) {
        const e9 = void 0 !== s5 && 1 === s5.length;
        e9 && (t5 = n.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e9 && n.set(s5, t5));
      }
      return t5;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t5) => new o("string" == typeof t5 ? t5 : t5 + "", void 0, s);
  var i = (t5, ...e9) => {
    const n6 = 1 === t5.length ? t5[0] : e9.reduce((e10, s5, n7) => e10 + ((t6) => {
      if (true === t6._$cssResult$)
        return t6.cssText;
      if ("number" == typeof t6)
        return t6;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t5[n7 + 1], t5[0]);
    return new o(n6, t5, s);
  };
  var S = (s5, n6) => {
    e ? s5.adoptedStyleSheets = n6.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet) : n6.forEach((e9) => {
      const n7 = document.createElement("style"), o7 = t.litNonce;
      void 0 !== o7 && n7.setAttribute("nonce", o7), n7.textContent = e9.cssText, s5.appendChild(n7);
    });
  };
  var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
    let e9 = "";
    for (const s5 of t6.cssRules)
      e9 += s5.cssText;
    return r(e9);
  })(t5) : t5;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t5, i6) {
    switch (i6) {
      case Boolean:
        t5 = t5 ? h : null;
        break;
      case Object:
      case Array:
        t5 = null == t5 ? t5 : JSON.stringify(t5);
    }
    return t5;
  }, fromAttribute(t5, i6) {
    let s5 = t5;
    switch (i6) {
      case Boolean:
        s5 = null !== t5;
        break;
      case Number:
        s5 = null === t5 ? null : Number(t5);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t5);
        } catch (t6) {
          s5 = null;
        }
    }
    return s5;
  } };
  var a = (t5, i6) => i6 !== t5 && (i6 == i6 || t5 == t5);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t5) {
      var i6;
      this.finalize(), (null !== (i6 = this.h) && void 0 !== i6 ? i6 : this.h = []).push(t5);
    }
    static get observedAttributes() {
      this.finalize();
      const t5 = [];
      return this.elementProperties.forEach((i6, s5) => {
        const e9 = this._$Ep(s5, i6);
        void 0 !== e9 && (this._$Ev.set(e9, s5), t5.push(e9));
      }), t5;
    }
    static createProperty(t5, i6 = l) {
      if (i6.state && (i6.attribute = false), this.finalize(), this.elementProperties.set(t5, i6), !i6.noAccessor && !this.prototype.hasOwnProperty(t5)) {
        const s5 = "symbol" == typeof t5 ? Symbol() : "__" + t5, e9 = this.getPropertyDescriptor(t5, s5, i6);
        void 0 !== e9 && Object.defineProperty(this.prototype, t5, e9);
      }
    }
    static getPropertyDescriptor(t5, i6, s5) {
      return { get() {
        return this[i6];
      }, set(e9) {
        const r4 = this[t5];
        this[i6] = e9, this.requestUpdate(t5, r4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t5) {
      return this.elementProperties.get(t5) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t5 = Object.getPrototypeOf(this);
      if (t5.finalize(), void 0 !== t5.h && (this.h = [...t5.h]), this.elementProperties = new Map(t5.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t6 = this.properties, i6 = [...Object.getOwnPropertyNames(t6), ...Object.getOwnPropertySymbols(t6)];
        for (const s5 of i6)
          this.createProperty(s5, t6[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i6) {
      const s5 = [];
      if (Array.isArray(i6)) {
        const e9 = new Set(i6.flat(1 / 0).reverse());
        for (const i7 of e9)
          s5.unshift(c(i7));
      } else
        void 0 !== i6 && s5.push(c(i6));
      return s5;
    }
    static _$Ep(t5, i6) {
      const s5 = i6.attribute;
      return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
    }
    u() {
      var t5;
      this._$E_ = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t5 = this.constructor.h) || void 0 === t5 || t5.forEach((t6) => t6(this));
    }
    addController(t5) {
      var i6, s5;
      (null !== (i6 = this._$ES) && void 0 !== i6 ? i6 : this._$ES = []).push(t5), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t5.hostConnected) || void 0 === s5 || s5.call(t5));
    }
    removeController(t5) {
      var i6;
      null === (i6 = this._$ES) || void 0 === i6 || i6.splice(this._$ES.indexOf(t5) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t5, i6) => {
        this.hasOwnProperty(i6) && (this._$Ei.set(i6, this[i6]), delete this[i6]);
      });
    }
    createRenderRoot() {
      var t5;
      const s5 = null !== (t5 = this.shadowRoot) && void 0 !== t5 ? t5 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t5;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
        var i6;
        return null === (i6 = t6.hostConnected) || void 0 === i6 ? void 0 : i6.call(t6);
      });
    }
    enableUpdating(t5) {
    }
    disconnectedCallback() {
      var t5;
      null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
        var i6;
        return null === (i6 = t6.hostDisconnected) || void 0 === i6 ? void 0 : i6.call(t6);
      });
    }
    attributeChangedCallback(t5, i6, s5) {
      this._$AK(t5, s5);
    }
    _$EO(t5, i6, s5 = l) {
      var e9;
      const r4 = this.constructor._$Ep(t5, s5);
      if (void 0 !== r4 && true === s5.reflect) {
        const h3 = (void 0 !== (null === (e9 = s5.converter) || void 0 === e9 ? void 0 : e9.toAttribute) ? s5.converter : n2).toAttribute(i6, s5.type);
        this._$El = t5, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
      }
    }
    _$AK(t5, i6) {
      var s5;
      const e9 = this.constructor, r4 = e9._$Ev.get(t5);
      if (void 0 !== r4 && this._$El !== r4) {
        const t6 = e9.getPropertyOptions(r4), h3 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== (null === (s5 = t6.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t6.converter : n2;
        this._$El = r4, this[r4] = h3.fromAttribute(i6, t6.type), this._$El = null;
      }
    }
    requestUpdate(t5, i6, s5) {
      let e9 = true;
      void 0 !== t5 && (((s5 = s5 || this.constructor.getPropertyOptions(t5)).hasChanged || a)(this[t5], i6) ? (this._$AL.has(t5) || this._$AL.set(t5, i6), true === s5.reflect && this._$El !== t5 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t5, s5))) : e9 = false), !this.isUpdatePending && e9 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t6) {
        Promise.reject(t6);
      }
      const t5 = this.scheduleUpdate();
      return null != t5 && await t5, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t5;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t6, i7) => this[i7] = t6), this._$Ei = void 0);
      let i6 = false;
      const s5 = this._$AL;
      try {
        i6 = this.shouldUpdate(s5), i6 ? (this.willUpdate(s5), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
          var i7;
          return null === (i7 = t6.hostUpdate) || void 0 === i7 ? void 0 : i7.call(t6);
        }), this.update(s5)) : this._$Ek();
      } catch (t6) {
        throw i6 = false, this._$Ek(), t6;
      }
      i6 && this._$AE(s5);
    }
    willUpdate(t5) {
    }
    _$AE(t5) {
      var i6;
      null === (i6 = this._$ES) || void 0 === i6 || i6.forEach((t6) => {
        var i7;
        return null === (i7 = t6.hostUpdated) || void 0 === i7 ? void 0 : i7.call(t6);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t5) {
      return true;
    }
    update(t5) {
      void 0 !== this._$EC && (this._$EC.forEach((t6, i6) => this._$EO(i6, this[i6], t6)), this._$EC = void 0), this._$Ek();
    }
    updated(t5) {
    }
    firstUpdated(t5) {
    }
  };
  d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.1");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
  var o3 = "$lit$";
  var n3 = `lit$${(Math.random() + "").slice(9)}$`;
  var l2 = "?" + n3;
  var h2 = `<${l2}>`;
  var r3 = document;
  var d2 = () => r3.createComment("");
  var u = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
  var c2 = Array.isArray;
  var v = (t5) => c2(t5) || "function" == typeof (null == t5 ? void 0 : t5[Symbol.iterator]);
  var a2 = "[ 	\n\f\r]";
  var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y = /^(?:script|style|textarea|title)$/i;
  var w = (t5) => (i6, ...s5) => ({ _$litType$: t5, strings: i6, values: s5 });
  var x = w(1);
  var b = w(2);
  var T = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var E = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129, null, false);
  var P = (t5, i6) => {
    const s5 = t5.length - 1, l5 = [];
    let r4, d3 = 2 === i6 ? "<svg>" : "", u2 = f;
    for (let i7 = 0; i7 < s5; i7++) {
      const s6 = t5[i7];
      let e9, c4, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u2.lastIndex = a3, c4 = u2.exec(s6), null !== c4); )
        a3 = u2.lastIndex, u2 === f ? "!--" === c4[1] ? u2 = _ : void 0 !== c4[1] ? u2 = m : void 0 !== c4[2] ? (y.test(c4[2]) && (r4 = RegExp("</" + c4[2], "g")), u2 = p) : void 0 !== c4[3] && (u2 = p) : u2 === p ? ">" === c4[0] ? (u2 = null != r4 ? r4 : f, v2 = -1) : void 0 === c4[1] ? v2 = -2 : (v2 = u2.lastIndex - c4[2].length, e9 = c4[1], u2 = void 0 === c4[3] ? p : '"' === c4[3] ? $ : g) : u2 === $ || u2 === g ? u2 = p : u2 === _ || u2 === m ? u2 = f : (u2 = p, r4 = void 0);
      const w2 = u2 === p && t5[i7 + 1].startsWith("/>") ? " " : "";
      d3 += u2 === f ? s6 + h2 : v2 >= 0 ? (l5.push(e9), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (-2 === v2 ? (l5.push(void 0), i7) : w2);
    }
    const c3 = d3 + (t5[s5] || "<?>") + (2 === i6 ? "</svg>" : "");
    if (!Array.isArray(t5) || !t5.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== e3 ? e3.createHTML(c3) : c3, l5];
  };
  var V = class {
    constructor({ strings: t5, _$litType$: i6 }, e9) {
      let h3;
      this.parts = [];
      let r4 = 0, u2 = 0;
      const c3 = t5.length - 1, v2 = this.parts, [a3, f2] = P(t5, i6);
      if (this.el = V.createElement(a3, e9), C.currentNode = this.el.content, 2 === i6) {
        const t6 = this.el.content, i7 = t6.firstChild;
        i7.remove(), t6.append(...i7.childNodes);
      }
      for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
        if (1 === h3.nodeType) {
          if (h3.hasAttributes()) {
            const t6 = [];
            for (const i7 of h3.getAttributeNames())
              if (i7.endsWith(o3) || i7.startsWith(n3)) {
                const s5 = f2[u2++];
                if (t6.push(i7), void 0 !== s5) {
                  const t7 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i8 = /([.?@])?(.*)/.exec(s5);
                  v2.push({ type: 1, index: r4, name: i8[2], strings: t7, ctor: "." === i8[1] ? k : "?" === i8[1] ? I : "@" === i8[1] ? L : R });
                } else
                  v2.push({ type: 6, index: r4 });
              }
            for (const i7 of t6)
              h3.removeAttribute(i7);
          }
          if (y.test(h3.tagName)) {
            const t6 = h3.textContent.split(n3), i7 = t6.length - 1;
            if (i7 > 0) {
              h3.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i7; s5++)
                h3.append(t6[s5], d2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
              h3.append(t6[i7], d2());
            }
          }
        } else if (8 === h3.nodeType)
          if (h3.data === l2)
            v2.push({ type: 2, index: r4 });
          else {
            let t6 = -1;
            for (; -1 !== (t6 = h3.data.indexOf(n3, t6 + 1)); )
              v2.push({ type: 7, index: r4 }), t6 += n3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t5, i6) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t5, s5;
    }
  };
  function N(t5, i6, s5 = t5, e9) {
    var o7, n6, l5, h3;
    if (i6 === T)
      return i6;
    let r4 = void 0 !== e9 ? null === (o7 = s5._$Co) || void 0 === o7 ? void 0 : o7[e9] : s5._$Cl;
    const d3 = u(i6) ? void 0 : i6._$litDirective$;
    return (null == r4 ? void 0 : r4.constructor) !== d3 && (null === (n6 = null == r4 ? void 0 : r4._$AO) || void 0 === n6 || n6.call(r4, false), void 0 === d3 ? r4 = void 0 : (r4 = new d3(t5), r4._$AT(t5, s5, e9)), void 0 !== e9 ? (null !== (l5 = (h3 = s5)._$Co) && void 0 !== l5 ? l5 : h3._$Co = [])[e9] = r4 : s5._$Cl = r4), void 0 !== r4 && (i6 = N(t5, r4._$AS(t5, i6.values), r4, e9)), i6;
  }
  var S2 = class {
    constructor(t5, i6) {
      this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i6;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t5) {
      var i6;
      const { el: { content: s5 }, parts: e9 } = this._$AD, o7 = (null !== (i6 = null == t5 ? void 0 : t5.creationScope) && void 0 !== i6 ? i6 : r3).importNode(s5, true);
      C.currentNode = o7;
      let n6 = C.nextNode(), l5 = 0, h3 = 0, d3 = e9[0];
      for (; void 0 !== d3; ) {
        if (l5 === d3.index) {
          let i7;
          2 === d3.type ? i7 = new M(n6, n6.nextSibling, this, t5) : 1 === d3.type ? i7 = new d3.ctor(n6, d3.name, d3.strings, this, t5) : 6 === d3.type && (i7 = new z(n6, this, t5)), this._$AV.push(i7), d3 = e9[++h3];
        }
        l5 !== (null == d3 ? void 0 : d3.index) && (n6 = C.nextNode(), l5++);
      }
      return o7;
    }
    v(t5) {
      let i6 = 0;
      for (const s5 of this._$AV)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i6), i6 += s5.strings.length - 2) : s5._$AI(t5[i6])), i6++;
    }
  };
  var M = class {
    constructor(t5, i6, s5, e9) {
      var o7;
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i6, this._$AM = s5, this.options = e9, this._$Cp = null === (o7 = null == e9 ? void 0 : e9.isConnected) || void 0 === o7 || o7;
    }
    get _$AU() {
      var t5, i6;
      return null !== (i6 = null === (t5 = this._$AM) || void 0 === t5 ? void 0 : t5._$AU) && void 0 !== i6 ? i6 : this._$Cp;
    }
    get parentNode() {
      let t5 = this._$AA.parentNode;
      const i6 = this._$AM;
      return void 0 !== i6 && 11 === (null == t5 ? void 0 : t5.nodeType) && (t5 = i6.parentNode), t5;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t5, i6 = this) {
      t5 = N(this, t5, i6), u(t5) ? t5 === A || null == t5 || "" === t5 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t5 !== this._$AH && t5 !== T && this._(t5) : void 0 !== t5._$litType$ ? this.g(t5) : void 0 !== t5.nodeType ? this.$(t5) : v(t5) ? this.T(t5) : this._(t5);
    }
    k(t5) {
      return this._$AA.parentNode.insertBefore(t5, this._$AB);
    }
    $(t5) {
      this._$AH !== t5 && (this._$AR(), this._$AH = this.k(t5));
    }
    _(t5) {
      this._$AH !== A && u(this._$AH) ? this._$AA.nextSibling.data = t5 : this.$(r3.createTextNode(t5)), this._$AH = t5;
    }
    g(t5) {
      var i6;
      const { values: s5, _$litType$: e9 } = t5, o7 = "number" == typeof e9 ? this._$AC(t5) : (void 0 === e9.el && (e9.el = V.createElement(e9.h, this.options)), e9);
      if ((null === (i6 = this._$AH) || void 0 === i6 ? void 0 : i6._$AD) === o7)
        this._$AH.v(s5);
      else {
        const t6 = new S2(o7, this), i7 = t6.u(this.options);
        t6.v(s5), this.$(i7), this._$AH = t6;
      }
    }
    _$AC(t5) {
      let i6 = E.get(t5.strings);
      return void 0 === i6 && E.set(t5.strings, i6 = new V(t5)), i6;
    }
    T(t5) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i6 = this._$AH;
      let s5, e9 = 0;
      for (const o7 of t5)
        e9 === i6.length ? i6.push(s5 = new M(this.k(d2()), this.k(d2()), this, this.options)) : s5 = i6[e9], s5._$AI(o7), e9++;
      e9 < i6.length && (this._$AR(s5 && s5._$AB.nextSibling, e9), i6.length = e9);
    }
    _$AR(t5 = this._$AA.nextSibling, i6) {
      var s5;
      for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i6); t5 && t5 !== this._$AB; ) {
        const i7 = t5.nextSibling;
        t5.remove(), t5 = i7;
      }
    }
    setConnected(t5) {
      var i6;
      void 0 === this._$AM && (this._$Cp = t5, null === (i6 = this._$AP) || void 0 === i6 || i6.call(this, t5));
    }
  };
  var R = class {
    constructor(t5, i6, s5, e9, o7) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i6, this._$AM = e9, this.options = o7, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t5, i6 = this, s5, e9) {
      const o7 = this.strings;
      let n6 = false;
      if (void 0 === o7)
        t5 = N(this, t5, i6, 0), n6 = !u(t5) || t5 !== this._$AH && t5 !== T, n6 && (this._$AH = t5);
      else {
        const e10 = t5;
        let l5, h3;
        for (t5 = o7[0], l5 = 0; l5 < o7.length - 1; l5++)
          h3 = N(this, e10[s5 + l5], i6, l5), h3 === T && (h3 = this._$AH[l5]), n6 || (n6 = !u(h3) || h3 !== this._$AH[l5]), h3 === A ? t5 = A : t5 !== A && (t5 += (null != h3 ? h3 : "") + o7[l5 + 1]), this._$AH[l5] = h3;
      }
      n6 && !e9 && this.j(t5);
    }
    j(t5) {
      t5 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t5 ? t5 : "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t5) {
      this.element[this.name] = t5 === A ? void 0 : t5;
    }
  };
  var H = s3 ? s3.emptyScript : "";
  var I = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t5) {
      t5 && t5 !== A ? this.element.setAttribute(this.name, H) : this.element.removeAttribute(this.name);
    }
  };
  var L = class extends R {
    constructor(t5, i6, s5, e9, o7) {
      super(t5, i6, s5, e9, o7), this.type = 5;
    }
    _$AI(t5, i6 = this) {
      var s5;
      if ((t5 = null !== (s5 = N(this, t5, i6, 0)) && void 0 !== s5 ? s5 : A) === T)
        return;
      const e9 = this._$AH, o7 = t5 === A && e9 !== A || t5.capture !== e9.capture || t5.once !== e9.once || t5.passive !== e9.passive, n6 = t5 !== A && (e9 === A || o7);
      o7 && this.element.removeEventListener(this.name, this, e9), n6 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
    }
    handleEvent(t5) {
      var i6, s5;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i6 = this.options) || void 0 === i6 ? void 0 : i6.host) && void 0 !== s5 ? s5 : this.element, t5) : this._$AH.handleEvent(t5);
    }
  };
  var z = class {
    constructor(t5, i6, s5) {
      this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t5) {
      N(this, t5);
    }
  };
  var j = i2.litHtmlPolyfillSupport;
  null == j || j(V, M), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.7.2");
  var B = (t5, i6, s5) => {
    var e9, o7;
    const n6 = null !== (e9 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e9 ? e9 : i6;
    let l5 = n6._$litPart$;
    if (void 0 === l5) {
      const t6 = null !== (o7 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o7 ? o7 : null;
      n6._$litPart$ = l5 = new M(i6.insertBefore(d2(), t6), t6, void 0, null != s5 ? s5 : {});
    }
    return l5._$AI(t5), l5;
  };

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends d {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t5, e9;
      const i6 = super.createRenderRoot();
      return null !== (t5 = (e9 = this.renderOptions).renderBefore) && void 0 !== t5 || (e9.renderBefore = i6.firstChild), i6;
    }
    update(t5) {
      const i6 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = B(i6, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t5;
      super.connectedCallback(), null === (t5 = this._$Do) || void 0 === t5 || t5.setConnected(true);
    }
    disconnectedCallback() {
      var t5;
      super.disconnectedCallback(), null === (t5 = this._$Do) || void 0 === t5 || t5.setConnected(false);
    }
    render() {
      return T;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.1");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var e4 = (e9) => (n6) => "function" == typeof n6 ? ((e10, n7) => (customElements.define(e10, n7), n7))(e9, n6) : ((e10, n7) => {
    const { kind: t5, elements: s5 } = n7;
    return { kind: t5, elements: s5, finisher(n8) {
      customElements.define(e10, n8);
    } };
  })(e9, n6);

  // node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i6, e9) => "method" === e9.kind && e9.descriptor && !("value" in e9.descriptor) ? { ...e9, finisher(n6) {
    n6.createProperty(e9.key, i6);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e9.key, initializer() {
    "function" == typeof e9.initializer && (this[e9.key] = e9.initializer.call(this));
  }, finisher(n6) {
    n6.createProperty(e9.key, i6);
  } };
  function e5(e9) {
    return (n6, t5) => void 0 !== t5 ? ((i6, e10, n7) => {
      e10.constructor.createProperty(n7, i6);
    })(e9, n6, t5) : i3(e9, n6);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function t3(t5) {
    return e5({ ...t5, state: true });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var o5 = ({ finisher: e9, descriptor: t5 }) => (o7, n6) => {
    var r4;
    if (void 0 === n6) {
      const n7 = null !== (r4 = o7.originalKey) && void 0 !== r4 ? r4 : o7.key, i6 = null != t5 ? { kind: "method", placement: "prototype", key: n7, descriptor: t5(o7.key) } : { ...o7, key: n7 };
      return null != e9 && (i6.finisher = function(t6) {
        e9(t6, n7);
      }), i6;
    }
    {
      const r5 = o7.constructor;
      void 0 !== t5 && Object.defineProperty(o7, n6, t5(n6)), null == e9 || e9(r5, n6);
    }
  };

  // node_modules/@lit/reactive-element/decorators/query.js
  function i4(i6, n6) {
    return o5({ descriptor: (o7) => {
      const t5 = { get() {
        var o8, n7;
        return null !== (n7 = null === (o8 = this.renderRoot) || void 0 === o8 ? void 0 : o8.querySelector(i6)) && void 0 !== n7 ? n7 : null;
      }, enumerable: true, configurable: true };
      if (n6) {
        const n7 = "symbol" == typeof o7 ? Symbol() : "__" + o7;
        t5.get = function() {
          var o8, t6;
          return void 0 === this[n7] && (this[n7] = null !== (t6 = null === (o8 = this.renderRoot) || void 0 === o8 ? void 0 : o8.querySelector(i6)) && void 0 !== t6 ? t6 : null), this[n7];
        };
      }
      return t5;
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-all.js
  function e6(e9) {
    return o5({ descriptor: (r4) => ({ get() {
      var r5, o7;
      return null !== (o7 = null === (r5 = this.renderRoot) || void 0 === r5 ? void 0 : r5.querySelectorAll(e9)) && void 0 !== o7 ? o7 : [];
    }, enumerable: true, configurable: true }) });
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n5;
  var e7 = null != (null === (n5 = window.HTMLSlotElement) || void 0 === n5 ? void 0 : n5.prototype.assignedElements) ? (o7, n6) => o7.assignedElements(n6) : (o7, n6) => o7.assignedNodes(n6).filter((o8) => o8.nodeType === Node.ELEMENT_NODE);
  function l4(n6) {
    const { slot: l5, selector: t5 } = null != n6 ? n6 : {};
    return o5({ descriptor: (o7) => ({ get() {
      var o8;
      const r4 = "slot" + (l5 ? `[name=${l5}]` : ":not([name])"), i6 = null === (o8 = this.renderRoot) || void 0 === o8 ? void 0 : o8.querySelector(r4), s5 = null != i6 ? e7(i6, n6) : [];
      return t5 ? s5.filter((o9) => o9.matches(t5)) : s5;
    }, enumerable: true, configurable: true }) });
  }

  // src/dice-image.ts
  var DiceImage = class extends s4 {
    constructor() {
      super(...arguments);
      this.color = "red";
      this.number = 2;
    }
    renderNumberDots(number) {
      return x`
      <div class="dice-image__column dice-image__column--first">
        ${this.number >= 2 ? x`<div class="dice-image__dot"></div>` : A}
        ${this.number >= 4 ? x`<div class="dice-image__dot"></div>` : A}
        ${this.number == 6 ? x`<div class="dice-image__dot"></div>` : A}
      </div>
      <div class="dice-image__column dice-image__column--middle">
        ${this.number == 1 || this.number == 3 || this.number == 5 ? x`<div class="dice-image__dot"></div>` : A}
      </div>
      <div class="dice-image__column dice-image__column--last">
        ${this.number >= 2 ? x`<div class="dice-image__dot"></div>` : A}
        ${this.number >= 4 ? x`<div class="dice-image__dot"></div>` : A}
        ${this.number == 6 ? x`<div class="dice-image__dot"></div>` : A}
      </div>
    `;
    }
    render() {
      return x`<div
      class="dice-image dice-image--${this.color} dice-image--${this.number}">
        ${this.renderNumberDots(this.number)}
    </div>`;
    }
  };
  DiceImage.styles = i`
    .dice-image {
      box-sizing: border-box;
      height: 20vw;
      width: 20vw;
      font-size: 100px;
      border-radius: 2vw;
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      padding: 0 2vh;
    }

    .dice-image__column {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      gap: 2vh;
      padding: 3vh 0;
      width: 33%;
    }

    .dice-image--4 .dice-image__column--first,
    .dice-image--4 .dice-image__column--last,
    .dice-image--6 .dice-image__column--first,
    .dice-image--5 .dice-image__column--first,
    .dice-image--6 .dice-image__column--last,
    .dice-image--5 .dice-image__column--last {
      justify-content: space-between;
    }

    .dice-image__column--middle {
      justify-content: center;
    }

    .dice-image__column--last {
      flex-direction: column-reverse;
    }

    .dice-image__dot {
      height: 4vw;
      width: 4vw;
      border-radius: 2vw;
      flex-shrink: 0;
      flex-grow: 0;
    }

    .dice-image--red {
      background: #C74824;
    }

    .dice-image--red .dice-image__dot {
      background: #EDD861;
    }

    .dice-image--yellow {
      background: #EDD861;
    }

    .dice-image--yellow .dice-image__dot {
      background: #C74824;
    }
  `;
  __decorateClass([
    e5()
  ], DiceImage.prototype, "color", 2);
  __decorateClass([
    e5()
  ], DiceImage.prototype, "number", 2);
  DiceImage = __decorateClass([
    e4("dice-image")
  ], DiceImage);

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e8 = (t5) => (...e9) => ({ _$litDirective$: t5, values: e9 });
  var i5 = class {
    constructor(t5) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t5, e9, i6) {
      this._$Ct = t5, this._$AM = e9, this._$Ci = i6;
    }
    _$AS(t5, e9) {
      return this.update(t5, e9);
    }
    update(t5, e9) {
      return this.render(...e9);
    }
  };

  // node_modules/lit-html/directives/class-map.js
  var o6 = e8(class extends i5 {
    constructor(t5) {
      var i6;
      if (super(t5), t5.type !== t4.ATTRIBUTE || "class" !== t5.name || (null === (i6 = t5.strings) || void 0 === i6 ? void 0 : i6.length) > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t5) {
      return " " + Object.keys(t5).filter((i6) => t5[i6]).join(" ") + " ";
    }
    update(i6, [s5]) {
      var r4, o7;
      if (void 0 === this.it) {
        this.it = /* @__PURE__ */ new Set(), void 0 !== i6.strings && (this.nt = new Set(i6.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
        for (const t5 in s5)
          s5[t5] && !(null === (r4 = this.nt) || void 0 === r4 ? void 0 : r4.has(t5)) && this.it.add(t5);
        return this.render(s5);
      }
      const e9 = i6.element.classList;
      this.it.forEach((t5) => {
        t5 in s5 || (e9.remove(t5), this.it.delete(t5));
      });
      for (const t5 in s5) {
        const i7 = !!s5[t5];
        i7 === this.it.has(t5) || (null === (o7 = this.nt) || void 0 === o7 ? void 0 : o7.has(t5)) || (i7 ? (e9.add(t5), this.it.add(t5)) : (e9.remove(t5), this.it.delete(t5)));
      }
      return T;
    }
  });

  // src/roll-button.ts
  var buttonSize = 70;
  var RollButton = class extends s4 {
    constructor() {
      super(...arguments);
      this.number = 12;
      this.counter = 0;
      this.frequency = 0;
      this.increaseCounter = () => {
        this.counter++;
      };
    }
    render() {
      this.classes = { "roll-button": true, "roll-button--highlight": this.frequency >= 0.14 };
      return x`<button @click="${this.increaseCounter}" class=${o6(this.classes)}>
      <div class="roll-button__number">
        ${this.number}
      </div>
      <div class="roll-button__frequency-indicator">
        ${this.frequency >= 0.03 ? x`<span class="roll-button__frequency-dot"></span>` : A}
        ${this.frequency >= 0.06 ? x`<span class="roll-button__frequency-dot"></span>` : A}
        ${this.frequency >= 0.08 ? x`<span class="roll-button__frequency-dot"></span>` : A}
        ${this.frequency >= 0.11 ? x`<span class="roll-button__frequency-dot"></span>` : A}
        ${this.frequency >= 0.14 ? x`<span class="roll-button__frequency-dot"></span>` : A}
      </div>
      <span class="roll-button__counter">${this.counter}</span>
    </button>`;
    }
  };
  RollButton.styles = i`
    button {
      background: #fce7b0;
      border: none;
      border-radius: ${r(buttonSize / 2)}px;
      color: black;
      cursor: pointer;
      font-size: 32px;
      font-family: Georgia, serif;
      height: ${r(buttonSize)}px;
      position: relative;
      width: ${r(buttonSize)}px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 2px;
    }

    .roll-button__counter {
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      font-size: 12px;
      font-family: Helvetica, sans-serif;
      height: 24px;
      width: 24px;
      color: white;
      background: #5f5f5f;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .roll-button__number {
      display: block;
    }

    .roll-button--highlight {
      color: #C74824;
    }

    .roll-button__frequency-indicator {
      display: flex;
      gap: 2px;
    }

    .roll-button__frequency-dot {
      height: ${r(buttonSize / 15)}px;
      width: ${r(buttonSize / 15)}px;
      border-radius: ${r(buttonSize / 15 / 2)}px;
      background: black;
      flex-shrink: 0;
      flex-grow: 0;
    }

    .roll-button--highlight .roll-button__frequency-dot {
      background: #C74824;
    }
  `;
  __decorateClass([
    e5()
  ], RollButton.prototype, "number", 2);
  __decorateClass([
    e5()
  ], RollButton.prototype, "counter", 2);
  __decorateClass([
    e5()
  ], RollButton.prototype, "frequency", 2);
  RollButton = __decorateClass([
    e4("roll-button")
  ], RollButton);

  // src/turn-counter.ts
  var TurnCounter = class extends s4 {
    constructor() {
      super(...arguments);
      this.counter = 0;
      this.increaseCounter = (e9) => {
        if (e9.target.nodeName === "ROLL-BUTTON") {
          this.counter++;
        }
      };
      this.handleUndoClick = (e9) => {
        this.dispatchEvent(new Event("undoroll", { bubbles: true }));
      };
    }
    render() {
      return x`<div class="turn-counter" @click="${this.increaseCounter}">
      <div class="turn-counter__label-wrap">
        <span class="turn-counter__label">Rolls</span>
        <span class="turn-counter__count">${this.counter}</span>
        <button class="turn-counter__undo-roll" @click=${this.handleUndoClick}>
          Undo Roll
        </button>
      </div>
      <div class="turn-counter__roll-buttons">
        <slot></slot>
      </div>
    </div>`;
    }
  };
  TurnCounter.styles = i`
    .turn-counter {
      align-items: flex-start;
      display: flex;
      justify-content: space-between;
      color: white;
      font-family: Georgia, serif;
      font-size: 40px;
    }

    .turn-counter__label-wrap {
      width: 120px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .turn-counter__label {
      display: block;
      font-size: 16px;
    }

    .turn-counter__roll-buttons {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .turn-counter__undo-roll {
      display: block;
      font-size: 16px;
      height: 40px;
      width: 100%;
      border-radius: 20px;
      border: none;
    }
  `;
  __decorateClass([
    e5()
  ], TurnCounter.prototype, "counter", 2);
  TurnCounter = __decorateClass([
    e4("turn-counter")
  ], TurnCounter);

  // src/dice-overlay.ts
  var DiceOverlay = class extends s4 {
    constructor() {
      super(...arguments);
      this.number = 11;
      this.visible = false;
      this.playerName = "Klaus";
    }
    renderDice(number) {
      const dualRandomizer = Math.floor(Math.random() * 2);
      const tripleRandomizer = Math.floor(Math.random() * 3);
      let diceOne;
      switch (parseInt(number)) {
        case 3:
        case 4:
        case 5:
          diceOne = dualRandomizer == 0 ? 1 : 2;
          break;
        case 6:
        case 7:
          diceOne = tripleRandomizer == 0 ? 1 : tripleRandomizer == 1 ? 2 : 3;
          break;
        case 8:
          diceOne = tripleRandomizer == 0 ? 2 : tripleRandomizer == 1 ? 3 : 4;
          break;
        case 9:
          diceOne = tripleRandomizer == 0 ? 3 : tripleRandomizer == 1 ? 4 : 5;
          break;
        case 11:
          diceOne = dualRandomizer == 0 ? 5 : 6;
          break;
        default:
          diceOne = Math.floor(number / 2);
      }
      let diceTwo = number - diceOne;
      const finalRandomizer = Math.floor(Math.random() * 2);
      diceOne = finalRandomizer == 0 ? diceOne : diceTwo;
      diceTwo = number - diceOne;
      const diceOneColor = dualRandomizer == 0 ? "yellow" : "red";
      const diceTwoColor = diceOneColor == "yellow" ? "red" : "yellow";
      return x`<dice-image color="${diceOneColor}" number="${diceOne}"></dice-image>
    <dice-image color="${diceTwoColor}" number="${diceTwo}"></dice-image>`;
    }
    render() {
      return x`<div
      class="dice-overlay ${this.visible !== false ? "dice-overlay--visible" : ""}"
      @click="${(e9) => this.visible = false}">
      <div class="dice-overlay__wrap">
        <div class="dice-overlay__dice-wrap">
          ${this.renderDice(this.number)}
        </div>
        <div class="dice-overlay__player-wrap">
          ${this.playerName}
        </div>
      </div>
    </div>`;
    }
  };
  DiceOverlay.styles = i`
    .dice-overlay {
      position: absolute;
      height: 100vh;
      width: 100vw;
      box-sizing: border-box;
      inset-block-start: 0;
      inset-inline-start: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      visibility: hidden;
    }

    .dice-overlay__dice-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6vw;
      margin-block-end: 2vh;
    }

    .dice-overlay__dice {
      height: 20vw;
      width: 20vw;
      font-size: 100px;
    }

    .dice-overlay__dice--yellow {
      background: yellow;
    }

    .dice-overlay__dice--red {
      background: red;
    }

    .dice-overlay--visible {
      visibility: visible;
    }

    .dice-overlay__player-wrap {
      color: white;
      flex: 0 0 100%;
      text-align: center;
      font-family: Georgia, serif;
      font-size: 100px;
    }
  `;
  __decorateClass([
    e5()
  ], DiceOverlay.prototype, "number", 2);
  __decorateClass([
    e5()
  ], DiceOverlay.prototype, "visible", 2);
  __decorateClass([
    e5()
  ], DiceOverlay.prototype, "playerName", 2);
  DiceOverlay = __decorateClass([
    e4("dice-overlay")
  ], DiceOverlay);

  // src/player-list.ts
  var PlayerList = class extends s4 {
    constructor() {
      super(...arguments);
      this.players = [];
    }
    handlePlayerNameChange() {
      let playerNames = [];
      Array.from(this.playerInputs).forEach((i6) => {
        if (i6.value.length > 0) {
          playerNames.push({ name: i6.value });
        }
      });
      const customEvent = new CustomEvent("updateplayernames", { bubbles: true, detail: playerNames });
      this.dispatchEvent(customEvent);
    }
    render() {
      console.log("PL", this.players);
      const maxPlayerCount = [1, 2, 3, 4, 5, 6];
      return x`<div class="player-list ${this.visible !== false ? "player-list--visible" : ""}">
      <h1>Who's playing?</h1>
      ${maxPlayerCount.map((id) => {
        const playerName = this.players[id - 1] ? this.players[id - 1].name : "";
        return x`
          <div class="player-list__field">
            <label for=${`player${id}`}>Player ${id}</label>
            <input id=${`player${id}`} @keyup=${this.handlePlayerNameChange} type="text" value=${playerName}/>
          </div>
        `;
      })}
    </div>`;
    }
  };
  PlayerList.styles = i`
    .player-list {
      color: white;
      text-align: center;
      font-family: Georgia, serif;
      font-size: 16px;
    }

    .player-list__field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-block-end: 10px;
    }
  `;
  __decorateClass([
    e5({ type: Array })
  ], PlayerList.prototype, "players", 2);
  __decorateClass([
    e6('input[type="text"')
  ], PlayerList.prototype, "playerInputs", 2);
  PlayerList = __decorateClass([
    e4("player-list")
  ], PlayerList);

  // src/game-start-overlay.ts
  var GameStartOverlay = class extends s4 {
    constructor() {
      super(...arguments);
      this.visible = false;
      this.players = [{ name: "Fred" }];
    }
    handleStartGameClick(e9) {
      this.dispatchEvent(new Event("startnewgame", { bubbles: true }));
    }
    sanityCheck(e9) {
      this.dispatchEvent(new CustomEvent("updateplayernames", { bubbles: true, detail: e9.detail }));
    }
    render() {
      return x`<div class="game-start-overlay ${this.visible !== false ? "game-start-overlay--visible" : ""}" @updateplayernames=${this.sanityCheck}>
      <h1 class="game-start-overlay__header">Welcome to Camptanion!</h1>
      <player-list players="${JSON.stringify(this.players)}"></player-list>
      <button class="game-start-overlay__new-game-button" @click=${this.handleStartGameClick}>Start New Game</button>
    </div>`;
    }
  };
  GameStartOverlay.styles = i`
    .game-start-overlay {
      position: absolute;
      height: 100vh;
      width: 100vw;
      box-sizing: border-box;
      inset-block-start: 0;
      inset-inline-start: 0;
      background: rgba(0,0,0,0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      visibility: hidden;
      color: white;
      text-align: center;
      font-family: Georgia, serif;
      font-size: 24px;
      padding-block-start: 40px;
    }

    .game-start-overlay--visible {
      visibility: visible;
    }

    .game-start-overlay__new-game-button {
      display: block;
      font-size: 16px;
      height: 40px;
      border: none;
      border-radius: 20px;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .game-start-overlay__header {
      margin: 0 0 20px 0;
    }
  `;
  __decorateClass([
    e5()
  ], GameStartOverlay.prototype, "visible", 2);
  __decorateClass([
    e5({ type: Array })
  ], GameStartOverlay.prototype, "players", 2);
  GameStartOverlay = __decorateClass([
    e4("game-start-overlay")
  ], GameStartOverlay);

  // src/game-app.ts
  var GameApp = class extends s4 {
    constructor() {
      super(...arguments);
      this._playerTurnIndex = 0;
      this._showGameStartOverlay = false;
    }
    get gameState() {
      const savedGameState = localStorage.getItem("boardGameScoreboardData");
      return savedGameState === null ? { games: {} } : JSON.parse(savedGameState);
    }
    get games() {
      return this.gameState.games;
    }
    get gameIds() {
      return Object.keys(this.games);
    }
    get unfinishedGame() {
      const unfinishedGameId = this.gameIds.find(
        (gid) => this.games[gid].end === void 0
      );
      return unfinishedGameId ? this.games[unfinishedGameId] : null;
    }
    get activeGame() {
      let game = this.unfinishedGame;
      if (!game) {
        game = this.createNewGame();
      }
      this.saveGame(game);
      return game;
    }
    get activeGamePlayers() {
      return this.activeGame.players || [];
    }
    get currentPlayer() {
      return this.activeGamePlayers[this._playerTurnIndex];
    }
    saveGame(game) {
      const gameState = this.gameState;
      gameState.games[game.id] = game;
      localStorage.setItem("boardGameScoreboardData", JSON.stringify(gameState));
    }
    findGameById(id) {
      return this.gameState.games[id];
    }
    createNewGame() {
      const newGame = {
        id: this.gameIds.length,
        rollLog: []
      };
      return newGame;
    }
    handleGameClick(e9) {
      if (e9.target.nodeName === "ROLL-BUTTON") {
        const turnPlayer = this.currentPlayer;
        const game = this.activeGame;
        const rolledNumber = e9.target.number;
        console.log(this._playerTurnIndex);
        console.log(`${turnPlayer.name} rolled a ${rolledNumber}`, this._playerTurnIndex);
        game.rollLog.push({
          number: rolledNumber,
          player: turnPlayer
        });
        this.saveGame(game);
        this.loadActiveGameState();
        this.diceOverlay.number = rolledNumber;
        this.diceOverlay.playerName = turnPlayer.name;
        this.diceOverlay.visible = true;
      }
    }
    handleUndo(e9) {
      const game = this.activeGame;
      game.rollLog.pop();
      this.saveGame(game);
      this.loadActiveGameState();
    }
    loadActiveGameState() {
      const game = this.activeGame;
      const turnCounter = this.renderRoot.querySelector("turn-counter");
      turnCounter.counter = game.rollLog.length;
      const numberCounts = {
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0
      };
      game.rollLog.forEach(({ number }) => {
        numberCounts[number] = numberCounts[number] + 1;
      });
      for (const diceNumber in numberCounts) {
        const rollButton = turnCounter.querySelector(
          `roll-button[number="${diceNumber}"]`
        );
        const numberCount = numberCounts[diceNumber];
        const frequency = numberCount / game.rollLog.length;
        rollButton.counter = numberCounts[diceNumber];
        rollButton.frequency = frequency;
      }
      this._playerTurnIndex = game.rollLog.length % this.activeGamePlayers.length;
      console.log(game.start);
      if (game.start == void 0) {
        console.log(this.gameStartOverlay);
        this.gameStartOverlay.players = this.activeGamePlayers;
        this.gameStartOverlay.visible = true;
      } else {
        this.gameStartOverlay.visible = false;
      }
    }
    firstUpdated() {
      this.loadActiveGameState();
    }
    handleGameEnd() {
      const game = this.activeGame;
      game.end = Date.now();
      this.saveGame(game);
      this.loadActiveGameState();
    }
    handleStartNewGame() {
      console.log("START IT UP!");
      const game = this.activeGame;
      game.start = Date.now();
      this.saveGame(game);
      this.loadActiveGameState();
    }
    handlePlayerNamesUpdate(e9) {
      console.log("RECEIVED", e9.detail);
      const game = this.activeGame;
      game.players = e9.detail;
      this.saveGame(game);
      this.loadActiveGameState();
    }
    render() {
      return x`<div
      @click="${this.handleGameClick}"
      @undoroll=${this.handleUndo}
      @startnewgame=${this.handleStartNewGame}
      @updateplayernames=${this.handlePlayerNamesUpdate}
      class="game-app"
    >
      <turn-counter>
        <roll-button highlight number="2"></roll-button>
        <roll-button number="3"></roll-button>
        <roll-button number="4"></roll-button>
        <roll-button number="5"></roll-button>
        <roll-button number="6"></roll-button>
        <roll-button number="7"></roll-button>
        <roll-button number="8"></roll-button>
        <roll-button number="9"></roll-button>
        <roll-button number="10"></roll-button>
        <roll-button number="11"></roll-button>
        <roll-button number="12"></roll-button>
      </turn-counter>
      <button class="game-app__end-game" @click=${this.handleGameEnd}>End Game</button>
      <dice-overlay></dice-overlay>
      <game-start-overlay></game-start-overlay>
    </div>`;
    }
  };
  GameApp.styles = i`
    .game-app {
      box-sizing: border-box;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      padding: 10px;
    }

    .game-app__end-game {
      margin-block-start: 10px;
      display: block;
      font-size: 16px;
      height: 40px;
      width: 100%;
      max-width: 120px;
      border-radius: 20px;
      border: none;
    }
  `;
  __decorateClass([
    t3()
  ], GameApp.prototype, "_playerTurnIndex", 2);
  __decorateClass([
    t3()
  ], GameApp.prototype, "_showGameStartOverlay", 2);
  __decorateClass([
    l4({ selector: "turn-counter" })
  ], GameApp.prototype, "_turnCounter", 2);
  __decorateClass([
    i4("dice-overlay")
  ], GameApp.prototype, "diceOverlay", 2);
  __decorateClass([
    i4("game-start-overlay")
  ], GameApp.prototype, "gameStartOverlay", 2);
  GameApp = __decorateClass([
    e4("game-app")
  ], GameApp);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
