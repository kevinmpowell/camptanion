"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
      if (decorator = decorators[i5])
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
    constructor(t5, e8, n6) {
      if (this._$cssResult$ = true, n6 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t5, this.t = e8;
    }
    get styleSheet() {
      let t5 = this.o;
      const s5 = this.t;
      if (e && void 0 === t5) {
        const e8 = void 0 !== s5 && 1 === s5.length;
        e8 && (t5 = n.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && n.set(s5, t5));
      }
      return t5;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t5) => new o("string" == typeof t5 ? t5 : t5 + "", void 0, s);
  var i = (t5, ...e8) => {
    const n6 = 1 === t5.length ? t5[0] : e8.reduce((e9, s5, n7) => e9 + ((t6) => {
      if (true === t6._$cssResult$)
        return t6.cssText;
      if ("number" == typeof t6)
        return t6;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t5[n7 + 1], t5[0]);
    return new o(n6, t5, s);
  };
  var S = (s5, n6) => {
    e ? s5.adoptedStyleSheets = n6.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet) : n6.forEach((e8) => {
      const n7 = document.createElement("style"), o7 = t.litNonce;
      void 0 !== o7 && n7.setAttribute("nonce", o7), n7.textContent = e8.cssText, s5.appendChild(n7);
    });
  };
  var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
    let e8 = "";
    for (const s5 of t6.cssRules)
      e8 += s5.cssText;
    return r(e8);
  })(t5) : t5;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t5, i5) {
    switch (i5) {
      case Boolean:
        t5 = t5 ? h : null;
        break;
      case Object:
      case Array:
        t5 = null == t5 ? t5 : JSON.stringify(t5);
    }
    return t5;
  }, fromAttribute(t5, i5) {
    let s5 = t5;
    switch (i5) {
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
  var a = (t5, i5) => i5 !== t5 && (i5 == i5 || t5 == t5);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t5) {
      var i5;
      this.finalize(), (null !== (i5 = this.h) && void 0 !== i5 ? i5 : this.h = []).push(t5);
    }
    static get observedAttributes() {
      this.finalize();
      const t5 = [];
      return this.elementProperties.forEach((i5, s5) => {
        const e8 = this._$Ep(s5, i5);
        void 0 !== e8 && (this._$Ev.set(e8, s5), t5.push(e8));
      }), t5;
    }
    static createProperty(t5, i5 = l) {
      if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t5, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t5)) {
        const s5 = "symbol" == typeof t5 ? Symbol() : "__" + t5, e8 = this.getPropertyDescriptor(t5, s5, i5);
        void 0 !== e8 && Object.defineProperty(this.prototype, t5, e8);
      }
    }
    static getPropertyDescriptor(t5, i5, s5) {
      return { get() {
        return this[i5];
      }, set(e8) {
        const r4 = this[t5];
        this[i5] = e8, this.requestUpdate(t5, r4, s5);
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
        const t6 = this.properties, i5 = [...Object.getOwnPropertyNames(t6), ...Object.getOwnPropertySymbols(t6)];
        for (const s5 of i5)
          this.createProperty(s5, t6[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i5) {
      const s5 = [];
      if (Array.isArray(i5)) {
        const e8 = new Set(i5.flat(1 / 0).reverse());
        for (const i6 of e8)
          s5.unshift(c(i6));
      } else
        void 0 !== i5 && s5.push(c(i5));
      return s5;
    }
    static _$Ep(t5, i5) {
      const s5 = i5.attribute;
      return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
    }
    u() {
      var t5;
      this._$E_ = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t5 = this.constructor.h) || void 0 === t5 || t5.forEach((t6) => t6(this));
    }
    addController(t5) {
      var i5, s5;
      (null !== (i5 = this._$ES) && void 0 !== i5 ? i5 : this._$ES = []).push(t5), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t5.hostConnected) || void 0 === s5 || s5.call(t5));
    }
    removeController(t5) {
      var i5;
      null === (i5 = this._$ES) || void 0 === i5 || i5.splice(this._$ES.indexOf(t5) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t5, i5) => {
        this.hasOwnProperty(i5) && (this._$Ei.set(i5, this[i5]), delete this[i5]);
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
        var i5;
        return null === (i5 = t6.hostConnected) || void 0 === i5 ? void 0 : i5.call(t6);
      });
    }
    enableUpdating(t5) {
    }
    disconnectedCallback() {
      var t5;
      null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
        var i5;
        return null === (i5 = t6.hostDisconnected) || void 0 === i5 ? void 0 : i5.call(t6);
      });
    }
    attributeChangedCallback(t5, i5, s5) {
      this._$AK(t5, s5);
    }
    _$EO(t5, i5, s5 = l) {
      var e8;
      const r4 = this.constructor._$Ep(t5, s5);
      if (void 0 !== r4 && true === s5.reflect) {
        const h3 = (void 0 !== (null === (e8 = s5.converter) || void 0 === e8 ? void 0 : e8.toAttribute) ? s5.converter : n2).toAttribute(i5, s5.type);
        this._$El = t5, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
      }
    }
    _$AK(t5, i5) {
      var s5;
      const e8 = this.constructor, r4 = e8._$Ev.get(t5);
      if (void 0 !== r4 && this._$El !== r4) {
        const t6 = e8.getPropertyOptions(r4), h3 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== (null === (s5 = t6.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t6.converter : n2;
        this._$El = r4, this[r4] = h3.fromAttribute(i5, t6.type), this._$El = null;
      }
    }
    requestUpdate(t5, i5, s5) {
      let e8 = true;
      void 0 !== t5 && (((s5 = s5 || this.constructor.getPropertyOptions(t5)).hasChanged || a)(this[t5], i5) ? (this._$AL.has(t5) || this._$AL.set(t5, i5), true === s5.reflect && this._$El !== t5 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t5, s5))) : e8 = false), !this.isUpdatePending && e8 && (this._$E_ = this._$Ej());
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
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t6, i6) => this[i6] = t6), this._$Ei = void 0);
      let i5 = false;
      const s5 = this._$AL;
      try {
        i5 = this.shouldUpdate(s5), i5 ? (this.willUpdate(s5), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
          var i6;
          return null === (i6 = t6.hostUpdate) || void 0 === i6 ? void 0 : i6.call(t6);
        }), this.update(s5)) : this._$Ek();
      } catch (t6) {
        throw i5 = false, this._$Ek(), t6;
      }
      i5 && this._$AE(s5);
    }
    willUpdate(t5) {
    }
    _$AE(t5) {
      var i5;
      null === (i5 = this._$ES) || void 0 === i5 || i5.forEach((t6) => {
        var i6;
        return null === (i6 = t6.hostUpdated) || void 0 === i6 ? void 0 : i6.call(t6);
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
      void 0 !== this._$EC && (this._$EC.forEach((t6, i5) => this._$EO(i5, this[i5], t6)), this._$EC = void 0), this._$Ek();
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
  var w = (t5) => (i5, ...s5) => ({ _$litType$: t5, strings: i5, values: s5 });
  var x = w(1);
  var b = w(2);
  var T = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var E = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129, null, false);
  var P = (t5, i5) => {
    const s5 = t5.length - 1, l5 = [];
    let r4, d3 = 2 === i5 ? "<svg>" : "", u2 = f;
    for (let i6 = 0; i6 < s5; i6++) {
      const s6 = t5[i6];
      let e8, c4, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u2.lastIndex = a3, c4 = u2.exec(s6), null !== c4); )
        a3 = u2.lastIndex, u2 === f ? "!--" === c4[1] ? u2 = _ : void 0 !== c4[1] ? u2 = m : void 0 !== c4[2] ? (y.test(c4[2]) && (r4 = RegExp("</" + c4[2], "g")), u2 = p) : void 0 !== c4[3] && (u2 = p) : u2 === p ? ">" === c4[0] ? (u2 = null != r4 ? r4 : f, v2 = -1) : void 0 === c4[1] ? v2 = -2 : (v2 = u2.lastIndex - c4[2].length, e8 = c4[1], u2 = void 0 === c4[3] ? p : '"' === c4[3] ? $ : g) : u2 === $ || u2 === g ? u2 = p : u2 === _ || u2 === m ? u2 = f : (u2 = p, r4 = void 0);
      const w2 = u2 === p && t5[i6 + 1].startsWith("/>") ? " " : "";
      d3 += u2 === f ? s6 + h2 : v2 >= 0 ? (l5.push(e8), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (-2 === v2 ? (l5.push(void 0), i6) : w2);
    }
    const c3 = d3 + (t5[s5] || "<?>") + (2 === i5 ? "</svg>" : "");
    if (!Array.isArray(t5) || !t5.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== e3 ? e3.createHTML(c3) : c3, l5];
  };
  var V = class {
    constructor({ strings: t5, _$litType$: i5 }, e8) {
      let h3;
      this.parts = [];
      let r4 = 0, u2 = 0;
      const c3 = t5.length - 1, v2 = this.parts, [a3, f2] = P(t5, i5);
      if (this.el = V.createElement(a3, e8), C.currentNode = this.el.content, 2 === i5) {
        const t6 = this.el.content, i6 = t6.firstChild;
        i6.remove(), t6.append(...i6.childNodes);
      }
      for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
        if (1 === h3.nodeType) {
          if (h3.hasAttributes()) {
            const t6 = [];
            for (const i6 of h3.getAttributeNames())
              if (i6.endsWith(o3) || i6.startsWith(n3)) {
                const s5 = f2[u2++];
                if (t6.push(i6), void 0 !== s5) {
                  const t7 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i7 = /([.?@])?(.*)/.exec(s5);
                  v2.push({ type: 1, index: r4, name: i7[2], strings: t7, ctor: "." === i7[1] ? k : "?" === i7[1] ? I : "@" === i7[1] ? L : R });
                } else
                  v2.push({ type: 6, index: r4 });
              }
            for (const i6 of t6)
              h3.removeAttribute(i6);
          }
          if (y.test(h3.tagName)) {
            const t6 = h3.textContent.split(n3), i6 = t6.length - 1;
            if (i6 > 0) {
              h3.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i6; s5++)
                h3.append(t6[s5], d2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
              h3.append(t6[i6], d2());
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
    static createElement(t5, i5) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t5, s5;
    }
  };
  function N(t5, i5, s5 = t5, e8) {
    var o7, n6, l5, h3;
    if (i5 === T)
      return i5;
    let r4 = void 0 !== e8 ? null === (o7 = s5._$Co) || void 0 === o7 ? void 0 : o7[e8] : s5._$Cl;
    const d3 = u(i5) ? void 0 : i5._$litDirective$;
    return (null == r4 ? void 0 : r4.constructor) !== d3 && (null === (n6 = null == r4 ? void 0 : r4._$AO) || void 0 === n6 || n6.call(r4, false), void 0 === d3 ? r4 = void 0 : (r4 = new d3(t5), r4._$AT(t5, s5, e8)), void 0 !== e8 ? (null !== (l5 = (h3 = s5)._$Co) && void 0 !== l5 ? l5 : h3._$Co = [])[e8] = r4 : s5._$Cl = r4), void 0 !== r4 && (i5 = N(t5, r4._$AS(t5, i5.values), r4, e8)), i5;
  }
  var S2 = class {
    constructor(t5, i5) {
      this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t5) {
      var i5;
      const { el: { content: s5 }, parts: e8 } = this._$AD, o7 = (null !== (i5 = null == t5 ? void 0 : t5.creationScope) && void 0 !== i5 ? i5 : r3).importNode(s5, true);
      C.currentNode = o7;
      let n6 = C.nextNode(), l5 = 0, h3 = 0, d3 = e8[0];
      for (; void 0 !== d3; ) {
        if (l5 === d3.index) {
          let i6;
          2 === d3.type ? i6 = new M(n6, n6.nextSibling, this, t5) : 1 === d3.type ? i6 = new d3.ctor(n6, d3.name, d3.strings, this, t5) : 6 === d3.type && (i6 = new z(n6, this, t5)), this._$AV.push(i6), d3 = e8[++h3];
        }
        l5 !== (null == d3 ? void 0 : d3.index) && (n6 = C.nextNode(), l5++);
      }
      return o7;
    }
    v(t5) {
      let i5 = 0;
      for (const s5 of this._$AV)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t5[i5])), i5++;
    }
  };
  var M = class {
    constructor(t5, i5, s5, e8) {
      var o7;
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i5, this._$AM = s5, this.options = e8, this._$Cp = null === (o7 = null == e8 ? void 0 : e8.isConnected) || void 0 === o7 || o7;
    }
    get _$AU() {
      var t5, i5;
      return null !== (i5 = null === (t5 = this._$AM) || void 0 === t5 ? void 0 : t5._$AU) && void 0 !== i5 ? i5 : this._$Cp;
    }
    get parentNode() {
      let t5 = this._$AA.parentNode;
      const i5 = this._$AM;
      return void 0 !== i5 && 11 === (null == t5 ? void 0 : t5.nodeType) && (t5 = i5.parentNode), t5;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t5, i5 = this) {
      t5 = N(this, t5, i5), u(t5) ? t5 === A || null == t5 || "" === t5 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t5 !== this._$AH && t5 !== T && this._(t5) : void 0 !== t5._$litType$ ? this.g(t5) : void 0 !== t5.nodeType ? this.$(t5) : v(t5) ? this.T(t5) : this._(t5);
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
      var i5;
      const { values: s5, _$litType$: e8 } = t5, o7 = "number" == typeof e8 ? this._$AC(t5) : (void 0 === e8.el && (e8.el = V.createElement(e8.h, this.options)), e8);
      if ((null === (i5 = this._$AH) || void 0 === i5 ? void 0 : i5._$AD) === o7)
        this._$AH.v(s5);
      else {
        const t6 = new S2(o7, this), i6 = t6.u(this.options);
        t6.v(s5), this.$(i6), this._$AH = t6;
      }
    }
    _$AC(t5) {
      let i5 = E.get(t5.strings);
      return void 0 === i5 && E.set(t5.strings, i5 = new V(t5)), i5;
    }
    T(t5) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s5, e8 = 0;
      for (const o7 of t5)
        e8 === i5.length ? i5.push(s5 = new M(this.k(d2()), this.k(d2()), this, this.options)) : s5 = i5[e8], s5._$AI(o7), e8++;
      e8 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e8), i5.length = e8);
    }
    _$AR(t5 = this._$AA.nextSibling, i5) {
      var s5;
      for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i5); t5 && t5 !== this._$AB; ) {
        const i6 = t5.nextSibling;
        t5.remove(), t5 = i6;
      }
    }
    setConnected(t5) {
      var i5;
      void 0 === this._$AM && (this._$Cp = t5, null === (i5 = this._$AP) || void 0 === i5 || i5.call(this, t5));
    }
  };
  var R = class {
    constructor(t5, i5, s5, e8, o7) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i5, this._$AM = e8, this.options = o7, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t5, i5 = this, s5, e8) {
      const o7 = this.strings;
      let n6 = false;
      if (void 0 === o7)
        t5 = N(this, t5, i5, 0), n6 = !u(t5) || t5 !== this._$AH && t5 !== T, n6 && (this._$AH = t5);
      else {
        const e9 = t5;
        let l5, h3;
        for (t5 = o7[0], l5 = 0; l5 < o7.length - 1; l5++)
          h3 = N(this, e9[s5 + l5], i5, l5), h3 === T && (h3 = this._$AH[l5]), n6 || (n6 = !u(h3) || h3 !== this._$AH[l5]), h3 === A ? t5 = A : t5 !== A && (t5 += (null != h3 ? h3 : "") + o7[l5 + 1]), this._$AH[l5] = h3;
      }
      n6 && !e8 && this.j(t5);
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
    constructor(t5, i5, s5, e8, o7) {
      super(t5, i5, s5, e8, o7), this.type = 5;
    }
    _$AI(t5, i5 = this) {
      var s5;
      if ((t5 = null !== (s5 = N(this, t5, i5, 0)) && void 0 !== s5 ? s5 : A) === T)
        return;
      const e8 = this._$AH, o7 = t5 === A && e8 !== A || t5.capture !== e8.capture || t5.once !== e8.once || t5.passive !== e8.passive, n6 = t5 !== A && (e8 === A || o7);
      o7 && this.element.removeEventListener(this.name, this, e8), n6 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
    }
    handleEvent(t5) {
      var i5, s5;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i5 = this.options) || void 0 === i5 ? void 0 : i5.host) && void 0 !== s5 ? s5 : this.element, t5) : this._$AH.handleEvent(t5);
    }
  };
  var z = class {
    constructor(t5, i5, s5) {
      this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
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
  var B = (t5, i5, s5) => {
    var e8, o7;
    const n6 = null !== (e8 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e8 ? e8 : i5;
    let l5 = n6._$litPart$;
    if (void 0 === l5) {
      const t6 = null !== (o7 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o7 ? o7 : null;
      n6._$litPart$ = l5 = new M(i5.insertBefore(d2(), t6), t6, void 0, null != s5 ? s5 : {});
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
      var t5, e8;
      const i5 = super.createRenderRoot();
      return null !== (t5 = (e8 = this.renderOptions).renderBefore) && void 0 !== t5 || (e8.renderBefore = i5.firstChild), i5;
    }
    update(t5) {
      const i5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = B(i5, this.renderRoot, this.renderOptions);
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

  // node_modules/lit-html/directive.js
  var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e4 = (t5) => (...e8) => ({ _$litDirective$: t5, values: e8 });
  var i3 = class {
    constructor(t5) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t5, e8, i5) {
      this._$Ct = t5, this._$AM = e8, this._$Ci = i5;
    }
    _$AS(t5, e8) {
      return this.update(t5, e8);
    }
    update(t5, e8) {
      return this.render(...e8);
    }
  };

  // node_modules/lit-html/directives/class-map.js
  var o5 = e4(class extends i3 {
    constructor(t5) {
      var i5;
      if (super(t5), t5.type !== t3.ATTRIBUTE || "class" !== t5.name || (null === (i5 = t5.strings) || void 0 === i5 ? void 0 : i5.length) > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t5) {
      return " " + Object.keys(t5).filter((i5) => t5[i5]).join(" ") + " ";
    }
    update(i5, [s5]) {
      var r4, o7;
      if (void 0 === this.it) {
        this.it = /* @__PURE__ */ new Set(), void 0 !== i5.strings && (this.nt = new Set(i5.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
        for (const t5 in s5)
          s5[t5] && !(null === (r4 = this.nt) || void 0 === r4 ? void 0 : r4.has(t5)) && this.it.add(t5);
        return this.render(s5);
      }
      const e8 = i5.element.classList;
      this.it.forEach((t5) => {
        t5 in s5 || (e8.remove(t5), this.it.delete(t5));
      });
      for (const t5 in s5) {
        const i6 = !!s5[t5];
        i6 === this.it.has(t5) || (null === (o7 = this.nt) || void 0 === o7 ? void 0 : o7.has(t5)) || (i6 ? (e8.add(t5), this.it.add(t5)) : (e8.remove(t5), this.it.delete(t5)));
      }
      return T;
    }
  });

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var e5 = (e8) => (n6) => "function" == typeof n6 ? ((e9, n7) => (customElements.define(e9, n7), n7))(e8, n6) : ((e9, n7) => {
    const { kind: t5, elements: s5 } = n7;
    return { kind: t5, elements: s5, finisher(n8) {
      customElements.define(e9, n8);
    } };
  })(e8, n6);

  // node_modules/@lit/reactive-element/decorators/property.js
  var i4 = (i5, e8) => "method" === e8.kind && e8.descriptor && !("value" in e8.descriptor) ? { ...e8, finisher(n6) {
    n6.createProperty(e8.key, i5);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e8.key, initializer() {
    "function" == typeof e8.initializer && (this[e8.key] = e8.initializer.call(this));
  }, finisher(n6) {
    n6.createProperty(e8.key, i5);
  } };
  function e6(e8) {
    return (n6, t5) => void 0 !== t5 ? ((i5, e9, n7) => {
      e9.constructor.createProperty(n7, i5);
    })(e8, n6, t5) : i4(e8, n6);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function t4(t5) {
    return e6({ ...t5, state: true });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var o6 = ({ finisher: e8, descriptor: t5 }) => (o7, n6) => {
    var r4;
    if (void 0 === n6) {
      const n7 = null !== (r4 = o7.originalKey) && void 0 !== r4 ? r4 : o7.key, i5 = null != t5 ? { kind: "method", placement: "prototype", key: n7, descriptor: t5(o7.key) } : { ...o7, key: n7 };
      return null != e8 && (i5.finisher = function(t6) {
        e8(t6, n7);
      }), i5;
    }
    {
      const r5 = o7.constructor;
      void 0 !== t5 && Object.defineProperty(o7, n6, t5(n6)), null == e8 || e8(r5, n6);
    }
  };

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n5;
  var e7 = null != (null === (n5 = window.HTMLSlotElement) || void 0 === n5 ? void 0 : n5.prototype.assignedElements) ? (o7, n6) => o7.assignedElements(n6) : (o7, n6) => o7.assignedNodes(n6).filter((o8) => o8.nodeType === Node.ELEMENT_NODE);
  function l4(n6) {
    const { slot: l5, selector: t5 } = null != n6 ? n6 : {};
    return o6({ descriptor: (o7) => ({ get() {
      var o8;
      const r4 = "slot" + (l5 ? `[name=${l5}]` : ":not([name])"), i5 = null === (o8 = this.renderRoot) || void 0 === o8 ? void 0 : o8.querySelector(r4), s5 = null != i5 ? e7(i5, n6) : [];
      return t5 ? s5.filter((o9) => o9.matches(t5)) : s5;
    }, enumerable: true, configurable: true }) });
  }

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
      return x`<button @click="${this.increaseCounter}" class=${o5(this.classes)}>
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
      color: darkred;
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
    }

    .roll-button--highlight .roll-button__frequency-dot {
      background: darkred;
    }
  `;
  __decorateClass([
    e6()
  ], RollButton.prototype, "number", 2);
  __decorateClass([
    e6()
  ], RollButton.prototype, "counter", 2);
  __decorateClass([
    e6()
  ], RollButton.prototype, "frequency", 2);
  RollButton = __decorateClass([
    e5("roll-button")
  ], RollButton);

  // src/turn-counter.ts
  var TurnCounter = class extends s4 {
    constructor() {
      super(...arguments);
      this.counter = 0;
      this.increaseCounter = (e8) => {
        if (e8.target.nodeName === "ROLL-BUTTON") {
          this.counter++;
        }
      };
      this.handleUndoClick = (e8) => {
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
    e6()
  ], TurnCounter.prototype, "counter", 2);
  TurnCounter = __decorateClass([
    e5("turn-counter")
  ], TurnCounter);

  // src/game-app.ts
  var GameApp = class extends s4 {
    constructor() {
      super(...arguments);
      this._gameInProgress = false;
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
      if (!game.start) {
        game.start = Date.now();
      }
      this.saveGame(game);
      return game;
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
    handleGameClick(e8) {
      if (e8.target.nodeName === "ROLL-BUTTON") {
        const game = this.activeGame;
        game.rollLog.push(e8.target.number);
        this.saveGame(game);
        this.loadActiveGameState();
      }
    }
    handleUndo(e8) {
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
      game.rollLog.forEach((roll) => {
        numberCounts[roll] = numberCounts[roll] + 1;
      });
      for (const diceNumber in numberCounts) {
        const rollButton = turnCounter.querySelector(
          `roll-button[number="${diceNumber}"]`
        );
        const numberCount = numberCounts[diceNumber];
        const frequency = numberCount / game.rollLog.length;
        console.log("DICE COUNT", diceNumber, frequency);
        rollButton.counter = numberCounts[diceNumber];
        rollButton.frequency = frequency;
      }
    }
    firstUpdated() {
      this.loadActiveGameState();
    }
    handleGameEnd() {
      const game = this.activeGame;
      game.end = Date.now();
      this.saveGame(game);
    }
    render() {
      return x`<div
      @click="${this.handleGameClick}"
      @undoroll=${this.handleUndo}
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
    </div>`;
    }
  };
  GameApp.styles = i`
    .game-app__end-game {
      margin-block-start: 10px;
    }
  `;
  __decorateClass([
    t4()
  ], GameApp.prototype, "_gameInProgress", 2);
  __decorateClass([
    l4({ selector: "turn-counter" })
  ], GameApp.prototype, "_turnCounter", 2);
  GameApp = __decorateClass([
    e5("game-app")
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
*/
