// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), c = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, l = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, u = (n, r, o) => (o = n == null ? {} : e(i(n)), l(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), d, f, p, m, h, g, _, ee, v, te = o((() => {
	d = globalThis, f = d.ShadowRoot && (d.ShadyCSS === void 0 || d.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, p = Symbol(), m = /* @__PURE__ */ new WeakMap(), h = class {
		constructor(e, t, n) {
			if (this._$cssResult$ = !0, n !== p) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			this.cssText = e, this.t = t;
		}
		get styleSheet() {
			let e = this.o, t = this.t;
			if (f && e === void 0) {
				let n = t !== void 0 && t.length === 1;
				n && (e = m.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && m.set(t, e));
			}
			return e;
		}
		toString() {
			return this.cssText;
		}
	}, g = (e) => new h(typeof e == "string" ? e : e + "", void 0, p), _ = (e, ...t) => {
		let n = e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
			if (!0 === e._$cssResult$) return e.cssText;
			if (typeof e == "number") return e;
			throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
		})(n) + e[r + 1], e[0]);
		return new h(n, e, p);
	}, ee = (e, t) => {
		if (f) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		else for (let n of t) {
			let t = document.createElement("style"), r = d.litNonce;
			r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
		}
	}, v = f ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
		let t = "";
		for (let n of e.cssRules) t += n.cssText;
		return g(t);
	})(e) : e;
})), ne, re, ie, ae, y, b, oe, x, se, S, ce, C, le, w, T, E = o((() => {
	te(), {is: ne, defineProperty: re, getOwnPropertyDescriptor: ie, getOwnPropertyNames: ae, getOwnPropertySymbols: y, getPrototypeOf: b} = Object, oe = globalThis, x = oe.trustedTypes, se = x ? x.emptyScript : "", S = oe.reactiveElementPolyfillSupport, ce = (e, t) => e, C = {
		toAttribute(e, t) {
			switch (t) {
				case Boolean:
					e = e ? se : null;
					break;
				case Object:
				case Array: e = e == null ? e : JSON.stringify(e);
			}
			return e;
		},
		fromAttribute(e, t) {
			let n = e;
			switch (t) {
				case Boolean:
					n = e !== null;
					break;
				case Number:
					n = e === null ? null : Number(e);
					break;
				case Object:
				case Array: try {
					n = JSON.parse(e);
				} catch {
					n = null;
				}
			}
			return n;
		}
	}, le = (e, t) => !ne(e, t), w = {
		attribute: !0,
		type: String,
		converter: C,
		reflect: !1,
		useDefault: !1,
		hasChanged: le
	}, Symbol.metadata ??= Symbol("metadata"), oe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap(), T = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ??= []).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = w) {
			if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
				let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
				r !== void 0 && re(this.prototype, e, r);
			}
		}
		static getPropertyDescriptor(e, t, n) {
			let { get: r, set: i } = ie(this.prototype, e) ?? {
				get() {
					return this[t];
				},
				set(e) {
					this[t] = e;
				}
			};
			return {
				get: r,
				set(t) {
					let a = r?.call(this);
					i?.call(this, t), this.requestUpdate(e, a, n);
				},
				configurable: !0,
				enumerable: !0
			};
		}
		static getPropertyOptions(e) {
			return this.elementProperties.get(e) ?? w;
		}
		static _$Ei() {
			if (this.hasOwnProperty(ce("elementProperties"))) return;
			let e = b(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(ce("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ce("properties"))) {
				let e = this.properties, t = [...ae(e), ...y(e)];
				for (let n of t) this.createProperty(n, e[n]);
			}
			let e = this[Symbol.metadata];
			if (e !== null) {
				let t = litPropertyMetadata.get(e);
				if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
			}
			this._$Eh = /* @__PURE__ */ new Map();
			for (let [e, t] of this.elementProperties) {
				let n = this._$Eu(e, t);
				n !== void 0 && this._$Eh.set(n, e);
			}
			this.elementStyles = this.finalizeStyles(this.styles);
		}
		static finalizeStyles(e) {
			let t = [];
			if (Array.isArray(e)) {
				let n = new Set(e.flat(1 / 0).reverse());
				for (let e of n) t.unshift(v(e));
			} else e !== void 0 && t.push(v(e));
			return t;
		}
		static _$Eu(e, t) {
			let n = t.attribute;
			return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
		}
		constructor() {
			super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
		}
		_$Ev() {
			this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
		}
		addController(e) {
			(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
		}
		removeController(e) {
			this._$EO?.delete(e);
		}
		_$E_() {
			let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
			for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
			e.size > 0 && (this._$Ep = e);
		}
		createRenderRoot() {
			let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
			return ee(e, this.constructor.elementStyles), e;
		}
		connectedCallback() {
			this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
		}
		enableUpdating(e) {}
		disconnectedCallback() {
			this._$EO?.forEach((e) => e.hostDisconnected?.());
		}
		attributeChangedCallback(e, t, n) {
			this._$AK(e, n);
		}
		_$ET(e, t) {
			let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
			if (r !== void 0 && !0 === n.reflect) {
				let i = (n.converter?.toAttribute === void 0 ? C : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? C : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n, r = !1, i) {
			if (e !== void 0) {
				let a = this.constructor;
				if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? le)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
				this.C(e, t, n);
			}
			!1 === this.isUpdatePending && (this._$ES = this._$EP());
		}
		C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
			n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
		}
		async _$EP() {
			this.isUpdatePending = !0;
			try {
				await this._$ES;
			} catch (e) {
				Promise.reject(e);
			}
			let e = this.scheduleUpdate();
			return e != null && await e, !this.isUpdatePending;
		}
		scheduleUpdate() {
			return this.performUpdate();
		}
		performUpdate() {
			if (!this.isUpdatePending) return;
			if (!this.hasUpdated) {
				if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
					for (let [e, t] of this._$Ep) this[e] = t;
					this._$Ep = void 0;
				}
				let e = this.constructor.elementProperties;
				if (e.size > 0) for (let [t, n] of e) {
					let { wrapped: e } = n, r = this[t];
					!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
				}
			}
			let e = !1, t = this._$AL;
			try {
				e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
			} catch (t) {
				throw e = !1, this._$EM(), t;
			}
			e && this._$AE(t);
		}
		willUpdate(e) {}
		_$AE(e) {
			this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
		}
		_$EM() {
			this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
		}
		get updateComplete() {
			return this.getUpdateComplete();
		}
		getUpdateComplete() {
			return this._$ES;
		}
		shouldUpdate(e) {
			return !0;
		}
		update(e) {
			this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
		}
		updated(e) {}
		firstUpdated(e) {}
	}, T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[ce("elementProperties")] = /* @__PURE__ */ new Map(), T[ce("finalized")] = /* @__PURE__ */ new Map(), S?.({ ReactiveElement: T }), (oe.reactiveElementVersions ??= []).push("2.1.2");
}));
// node_modules/lit-html/lit-html.js
function D(e, t) {
	if (!he(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return M === void 0 ? t : M.createHTML(t);
}
function O(e, t, n = e, r) {
	if (t === Ee) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = me(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = O(e, i._$AS(e, t.values), i, r)), t;
}
var k, A, j, M, ue, N, de, fe, P, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, F, Ee, I, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be = o((() => {
	k = globalThis, A = (e) => e, j = k.trustedTypes, M = j ? j.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ue = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, de = "?" + N, fe = `<${de}>`, P = document, pe = () => P.createComment(""), me = (e) => e === null || typeof e != "object" && typeof e != "function", he = Array.isArray, ge = (e) => he(e) || typeof e?.[Symbol.iterator] == "function", _e = "[ 	\n\f\r]", ve = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, be = />/g, xe = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, Ce = /"/g, we = /^(?:script|style|textarea|title)$/i, Te = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), F = Te(1), Te(2), Te(3), Ee = Symbol.for("lit-noChange"), I = Symbol.for("lit-nothing"), De = /* @__PURE__ */ new WeakMap(), Oe = P.createTreeWalker(P, 129), ke = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ve;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ve ? c[1] === "!--" ? o = ye : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = xe) : (we.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = xe) : o = be : o === xe ? c[0] === ">" ? (o = i ?? ve, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? xe : c[3] === "\"" ? Ce : Se) : o === Ce || o === Se ? o = xe : o === ye || o === be ? o = ve : (o = xe, i = void 0);
			let d = o === xe && e[t + 1].startsWith("/>") ? " " : "";
			a += o === ve ? n + fe : l >= 0 ? (r.push(s), n.slice(0, l) + ue + n.slice(l) + N + d) : n + N + (l === -2 ? t : d);
		}
		return [D(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, Ae = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ke(t, n);
			if (this.el = e.createElement(l, r), Oe.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = Oe.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ue)) {
						let t = u[o++], n = i.getAttribute(e).split(N), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? Pe : r[1] === "?" ? Fe : r[1] === "@" ? Ie : Ne
						}), i.removeAttribute(e);
					} else e.startsWith(N) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (we.test(i.tagName)) {
						let e = i.textContent.split(N), t = e.length - 1;
						if (t > 0) {
							i.textContent = j ? j.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], pe()), Oe.nextNode(), c.push({
								type: 2,
								index: ++a
							});
							i.append(e[t], pe());
						}
					}
				} else if (i.nodeType === 8) {
					if (i.data === de) c.push({
						type: 2,
						index: a
					});
					else {
						let e = -1;
						for (; (e = i.data.indexOf(N, e + 1)) !== -1;) c.push({
							type: 7,
							index: a
						}), e += N.length - 1;
					}
				}
				a++;
			}
		}
		static createElement(e, t) {
			let n = P.createElement("template");
			return n.innerHTML = e, n;
		}
	}, je = class {
		constructor(e, t) {
			this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
		}
		get parentNode() {
			return this._$AM.parentNode;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		u(e) {
			let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? P).importNode(t, !0);
			Oe.currentNode = r;
			let i = Oe.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new Me(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Le(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = Oe.nextNode(), a++);
			}
			return Oe.currentNode = P, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, Me = class e {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(e, t, n, r) {
			this.type = 2, this._$AH = I, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
		}
		get parentNode() {
			let e = this._$AA.parentNode, t = this._$AM;
			return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
		}
		get startNode() {
			return this._$AA;
		}
		get endNode() {
			return this._$AB;
		}
		_$AI(e, t = this) {
			e = O(this, e, t), me(e) ? e === I || e == null || e === "" ? (this._$AH !== I && this._$AR(), this._$AH = I) : e !== this._$AH && e !== Ee && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ge(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== I && me(this._$AH) ? this._$AA.nextSibling.data = e : this.T(P.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ae.createElement(D(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new je(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = De.get(e.strings);
			return t === void 0 && De.set(e.strings, t = new Ae(e)), t;
		}
		k(t) {
			he(this._$AH) || (this._$AH = [], this._$AR());
			let n = this._$AH, r, i = 0;
			for (let a of t) i === n.length ? n.push(r = new e(this.O(pe()), this.O(pe()), this, this.options)) : r = n[i], r._$AI(a), i++;
			i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
		}
		_$AR(e = this._$AA.nextSibling, t) {
			for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
				let t = A(e).nextSibling;
				A(e).remove(), e = t;
			}
		}
		setConnected(e) {
			this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
		}
	}, Ne = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(e, t, n, r, i) {
			this.type = 1, this._$AH = I, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = I;
		}
		_$AI(e, t = this, n, r) {
			let i = this.strings, a = !1;
			if (i === void 0) e = O(this, e, t, 0), a = !me(e) || e !== this._$AH && e !== Ee, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = O(this, r[n + o], t, o), s === Ee && (s = this._$AH[o]), a ||= !me(s) || s !== this._$AH[o], s === I ? e = I : e !== I && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === I ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, Pe = class extends Ne {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === I ? void 0 : e;
		}
	}, Fe = class extends Ne {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== I);
		}
	}, Ie = class extends Ne {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = O(this, e, t, 0) ?? I) === Ee) return;
			let n = this._$AH, r = e === I && n !== I || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== I && (n === I || r);
			r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
		}
		handleEvent(e) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
		}
	}, Le = class {
		constructor(e, t, n) {
			this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(e) {
			O(this, e);
		}
	}, Re = k.litHtmlPolyfillSupport, Re?.(Ae, Me), (k.litHtmlVersions ??= []).push("3.3.3"), ze = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new Me(t.insertBefore(pe(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), Ve, He, Ue, We = o((() => {
	E(), E(), Be(), Be(), Ve = globalThis, He = class extends T {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			let e = super.createRenderRoot();
			return this.renderOptions.renderBefore ??= e.firstChild, e;
		}
		update(e) {
			let t = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ze(t, this.renderRoot, this.renderOptions);
		}
		connectedCallback() {
			super.connectedCallback(), this._$Do?.setConnected(!0);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._$Do?.setConnected(!1);
		}
		render() {
			return Ee;
		}
	}, He._$litElement$ = !0, He.finalized = !0, Ve.litElementHydrateSupport?.({ LitElement: He }), Ue = Ve.litElementPolyfillSupport, Ue?.({ LitElement: He }), (Ve.litElementVersions ??= []).push("4.2.2");
})), Ge = o((() => {})), Ke = o((() => {
	E(), Be(), We(), Ge();
})), qe = o((() => {}));
// node_modules/@lit/reactive-element/decorators/property.js
function Je(e) {
	return (t, n) => typeof n == "object" ? Xe(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
var Ye, Xe, R = o((() => {
	E(), Ye = {
		attribute: !0,
		type: String,
		converter: C,
		reflect: !1,
		hasChanged: le
	}, Xe = (e = Ye, t, n) => {
		let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
		if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
			let { name: r } = n;
			return {
				set(n) {
					let i = t.get.call(this);
					t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
				},
				init(t) {
					return t !== void 0 && this.C(r, void 0, e, t), t;
				}
			};
		}
		if (r === "setter") {
			let { name: r } = n;
			return function(n) {
				let i = this[r];
				t.call(this, n), this.requestUpdate(r, i, e, !0, n);
			};
		}
		throw Error("Unsupported decorator location: " + r);
	};
}));
// node_modules/@lit/reactive-element/decorators/state.js
function z(e) {
	return Je({
		...e,
		state: !0,
		attribute: !1
	});
}
var Ze = o((() => {
	R();
})), Qe = o((() => {})), $e = o((() => {})), et = o((() => {})), tt = o((() => {})), nt = o((() => {})), rt = o((() => {})), it = o((() => {
	qe(), R(), Ze(), Qe(), $e(), et(), tt(), nt(), rt();
})), at = /* @__PURE__ */ s(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : (n = typeof globalThis < "u" ? globalThis : n || self, r(n.leaflet = {}));
	})(n, (function(e) {
		var t = "1.9.4";
		function n(e) {
			for (var t, n = 1, r = arguments.length, i; n < r; n++) for (t in i = arguments[n], i) e[t] = i[t];
			return e;
		}
		var r = Object.create || (function() {
			function e() {}
			return function(t) {
				return e.prototype = t, new e();
			};
		})();
		function i(e, t) {
			var n = Array.prototype.slice;
			if (e.bind) return e.bind.apply(e, n.call(arguments, 1));
			var r = n.call(arguments, 2);
			return function() {
				return e.apply(t, r.length ? r.concat(n.call(arguments)) : arguments);
			};
		}
		var a = 0;
		function o(e) {
			return "_leaflet_id" in e || (e._leaflet_id = ++a), e._leaflet_id;
		}
		function s(e, t, n) {
			var r, i, a, o = function() {
				r = !1, i &&= (a.apply(n, i), !1);
			};
			return a = function() {
				r ? i = arguments : (e.apply(n, arguments), setTimeout(o, t), r = !0);
			}, a;
		}
		function c(e, t, n) {
			var r = t[1], i = t[0], a = r - i;
			return e === r && n ? e : ((e - i) % a + a) % a + i;
		}
		function l() {
			return !1;
		}
		function u(e, t) {
			if (t === !1) return e;
			var n = 10 ** (t === void 0 ? 6 : t);
			return Math.round(e * n) / n;
		}
		function d(e) {
			return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
		}
		function f(e) {
			return d(e).split(/\s+/);
		}
		function p(e, t) {
			for (var n in Object.prototype.hasOwnProperty.call(e, "options") || (e.options = e.options ? r(e.options) : {}), t) e.options[n] = t[n];
			return e.options;
		}
		function m(e, t, n) {
			var r = [];
			for (var i in e) r.push(encodeURIComponent(n ? i.toUpperCase() : i) + "=" + encodeURIComponent(e[i]));
			return (!t || t.indexOf("?") === -1 ? "?" : "&") + r.join("&");
		}
		var h = /\{ *([\w_ -]+) *\}/g;
		function g(e, t) {
			return e.replace(h, function(e, n) {
				var r = t[n];
				if (r === void 0) throw Error("No value provided for variable " + e);
				return typeof r == "function" && (r = r(t)), r;
			});
		}
		var _ = Array.isArray || function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		};
		function ee(e, t) {
			for (var n = 0; n < e.length; n++) if (e[n] === t) return n;
			return -1;
		}
		var v = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		function te(e) {
			return window["webkit" + e] || window["moz" + e] || window["ms" + e];
		}
		var ne = 0;
		function re(e) {
			var t = +/* @__PURE__ */ new Date(), n = Math.max(0, 16 - (t - ne));
			return ne = t + n, window.setTimeout(e, n);
		}
		var ie = window.requestAnimationFrame || te("RequestAnimationFrame") || re, ae = window.cancelAnimationFrame || te("CancelAnimationFrame") || te("CancelRequestAnimationFrame") || function(e) {
			window.clearTimeout(e);
		};
		function y(e, t, n) {
			if (n && ie === re) e.call(t);
			else return ie.call(window, i(e, t));
		}
		function b(e) {
			e && ae.call(window, e);
		}
		var oe = {
			__proto__: null,
			extend: n,
			create: r,
			bind: i,
			get lastId() {
				return a;
			},
			stamp: o,
			throttle: s,
			wrapNum: c,
			falseFn: l,
			formatNum: u,
			trim: d,
			splitWords: f,
			setOptions: p,
			getParamString: m,
			template: g,
			isArray: _,
			indexOf: ee,
			emptyImageUrl: v,
			requestFn: ie,
			cancelFn: ae,
			requestAnimFrame: y,
			cancelAnimFrame: b
		};
		function x() {}
		x.extend = function(e) {
			var t = function() {
				p(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
			}, i = t.__super__ = this.prototype, a = r(i);
			for (var o in a.constructor = t, t.prototype = a, this) Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (t[o] = this[o]);
			return e.statics && n(t, e.statics), e.includes && (se(e.includes), n.apply(null, [a].concat(e.includes))), n(a, e), delete a.statics, delete a.includes, a.options && (a.options = i.options ? r(i.options) : {}, n(a.options, e.options)), a._initHooks = [], a.callInitHooks = function() {
				if (!this._initHooksCalled) {
					i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
					for (var e = 0, t = a._initHooks.length; e < t; e++) a._initHooks[e].call(this);
				}
			}, t;
		}, x.include = function(e) {
			var t = this.prototype.options;
			return n(this.prototype, e), e.options && (this.prototype.options = t, this.mergeOptions(e.options)), this;
		}, x.mergeOptions = function(e) {
			return n(this.prototype.options, e), this;
		}, x.addInitHook = function(e) {
			var t = Array.prototype.slice.call(arguments, 1), n = typeof e == "function" ? e : function() {
				this[e].apply(this, t);
			};
			return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this;
		};
		function se(e) {
			if (typeof L < "u" && L && L.Mixin) {
				e = _(e) ? e : [e];
				for (var t = 0; t < e.length; t++) e[t] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (/* @__PURE__ */ Error()).stack);
			}
		}
		var S = {
			on: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n);
				}
				return this;
			},
			off: function(e, t, n) {
				if (!arguments.length) delete this._events;
				else if (typeof e == "object") for (var r in e) this._off(r, e[r], t);
				else {
					e = f(e);
					for (var i = arguments.length === 1, a = 0, o = e.length; a < o; a++) i ? this._off(e[a]) : this._off(e[a], t, n);
				}
				return this;
			},
			_on: function(e, t, n, r) {
				if (typeof t != "function") console.warn("wrong listener type: " + typeof t);
				else if (this._listens(e, t, n) === !1) {
					n === this && (n = void 0);
					var i = {
						fn: t,
						ctx: n
					};
					r && (i.once = !0), this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(i);
				}
			},
			_off: function(e, t, n) {
				var r, i, a;
				if (this._events && (r = this._events[e], r)) {
					if (arguments.length === 1) {
						if (this._firingCount) for (i = 0, a = r.length; i < a; i++) r[i].fn = l;
						delete this._events[e];
					} else if (typeof t != "function") console.warn("wrong listener type: " + typeof t);
					else {
						var o = this._listens(e, t, n);
						if (o !== !1) {
							var s = r[o];
							this._firingCount && (s.fn = l, this._events[e] = r = r.slice()), r.splice(o, 1);
						}
					}
				}
			},
			fire: function(e, t, r) {
				if (!this.listens(e, r)) return this;
				var i = n({}, t, {
					type: e,
					target: this,
					sourceTarget: t && t.sourceTarget || this
				});
				if (this._events) {
					var a = this._events[e];
					if (a) {
						this._firingCount = this._firingCount + 1 || 1;
						for (var o = 0, s = a.length; o < s; o++) {
							var c = a[o], l = c.fn;
							c.once && this.off(e, l, c.ctx), l.call(c.ctx || this, i);
						}
						this._firingCount--;
					}
				}
				return r && this._propagateEvent(i), this;
			},
			listens: function(e, t, n, r) {
				typeof e != "string" && console.warn("\"string\" type argument expected");
				var i = t;
				typeof t != "function" && (r = !!t, i = void 0, n = void 0);
				var a = this._events && this._events[e];
				if (a && a.length && this._listens(e, i, n) !== !1) return !0;
				if (r) {
					for (var o in this._eventParents) if (this._eventParents[o].listens(e, t, n, r)) return !0;
				}
				return !1;
			},
			_listens: function(e, t, n) {
				if (!this._events) return !1;
				var r = this._events[e] || [];
				if (!t) return !!r.length;
				n === this && (n = void 0);
				for (var i = 0, a = r.length; i < a; i++) if (r[i].fn === t && r[i].ctx === n) return i;
				return !1;
			},
			once: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t, !0);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n, !0);
				}
				return this;
			},
			addEventParent: function(e) {
				return this._eventParents = this._eventParents || {}, this._eventParents[o(e)] = e, this;
			},
			removeEventParent: function(e) {
				return this._eventParents && delete this._eventParents[o(e)], this;
			},
			_propagateEvent: function(e) {
				for (var t in this._eventParents) this._eventParents[t].fire(e.type, n({
					layer: e.target,
					propagatedFrom: e.target
				}, e), !0);
			}
		};
		S.addEventListener = S.on, S.removeEventListener = S.clearAllEventListeners = S.off, S.addOneTimeEventListener = S.once, S.fireEvent = S.fire, S.hasEventListeners = S.listens;
		var ce = x.extend(S);
		function C(e, t, n) {
			this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t;
		}
		var le = Math.trunc || function(e) {
			return e > 0 ? Math.floor(e) : Math.ceil(e);
		};
		C.prototype = {
			clone: function() {
				return new C(this.x, this.y);
			},
			add: function(e) {
				return this.clone()._add(w(e));
			},
			_add: function(e) {
				return this.x += e.x, this.y += e.y, this;
			},
			subtract: function(e) {
				return this.clone()._subtract(w(e));
			},
			_subtract: function(e) {
				return this.x -= e.x, this.y -= e.y, this;
			},
			divideBy: function(e) {
				return this.clone()._divideBy(e);
			},
			_divideBy: function(e) {
				return this.x /= e, this.y /= e, this;
			},
			multiplyBy: function(e) {
				return this.clone()._multiplyBy(e);
			},
			_multiplyBy: function(e) {
				return this.x *= e, this.y *= e, this;
			},
			scaleBy: function(e) {
				return new C(this.x * e.x, this.y * e.y);
			},
			unscaleBy: function(e) {
				return new C(this.x / e.x, this.y / e.y);
			},
			round: function() {
				return this.clone()._round();
			},
			_round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
			},
			floor: function() {
				return this.clone()._floor();
			},
			_floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
			},
			ceil: function() {
				return this.clone()._ceil();
			},
			_ceil: function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
			},
			trunc: function() {
				return this.clone()._trunc();
			},
			_trunc: function() {
				return this.x = le(this.x), this.y = le(this.y), this;
			},
			distanceTo: function(e) {
				e = w(e);
				var t = e.x - this.x, n = e.y - this.y;
				return Math.sqrt(t * t + n * n);
			},
			equals: function(e) {
				return e = w(e), e.x === this.x && e.y === this.y;
			},
			contains: function(e) {
				return e = w(e), Math.abs(e.x) <= Math.abs(this.x) && Math.abs(e.y) <= Math.abs(this.y);
			},
			toString: function() {
				return "Point(" + u(this.x) + ", " + u(this.y) + ")";
			}
		};
		function w(e, t, n) {
			return e instanceof C ? e : _(e) ? new C(e[0], e[1]) : e == null ? e : typeof e == "object" && "x" in e && "y" in e ? new C(e.x, e.y) : new C(e, t, n);
		}
		function T(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		T.prototype = {
			extend: function(e) {
				var t, n;
				if (!e) return this;
				if (e instanceof C || typeof e[0] == "number" || "x" in e) t = n = w(e);
				else if (e = E(e), t = e.min, n = e.max, !t || !n) return this;
				return !this.min && !this.max ? (this.min = t.clone(), this.max = n.clone()) : (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this;
			},
			getCenter: function(e) {
				return w((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e);
			},
			getBottomLeft: function() {
				return w(this.min.x, this.max.y);
			},
			getTopRight: function() {
				return w(this.max.x, this.min.y);
			},
			getTopLeft: function() {
				return this.min;
			},
			getBottomRight: function() {
				return this.max;
			},
			getSize: function() {
				return this.max.subtract(this.min);
			},
			contains: function(e) {
				var t, n;
				return e = typeof e[0] == "number" || e instanceof C ? w(e) : E(e), e instanceof T ? (t = e.min, n = e.max) : t = n = e, t.x >= this.min.x && n.x <= this.max.x && t.y >= this.min.y && n.y <= this.max.y;
			},
			intersects: function(e) {
				e = E(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x >= t.x && r.x <= n.x, o = i.y >= t.y && r.y <= n.y;
				return a && o;
			},
			overlaps: function(e) {
				e = E(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x > t.x && r.x < n.x, o = i.y > t.y && r.y < n.y;
				return a && o;
			},
			isValid: function() {
				return !!(this.min && this.max);
			},
			pad: function(e) {
				var t = this.min, n = this.max, r = Math.abs(t.x - n.x) * e, i = Math.abs(t.y - n.y) * e;
				return E(w(t.x - r, t.y - i), w(n.x + r, n.y + i));
			},
			equals: function(e) {
				return e ? (e = E(e), this.min.equals(e.getTopLeft()) && this.max.equals(e.getBottomRight())) : !1;
			}
		};
		function E(e, t) {
			return !e || e instanceof T ? e : new T(e, t);
		}
		function D(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		D.prototype = {
			extend: function(e) {
				var t = this._southWest, n = this._northEast, r, i;
				if (e instanceof k) r = e, i = e;
				else if (e instanceof D) {
					if (r = e._southWest, i = e._northEast, !r || !i) return this;
				} else return e ? this.extend(A(e) || O(e)) : this;
				return !t && !n ? (this._southWest = new k(r.lat, r.lng), this._northEast = new k(i.lat, i.lng)) : (t.lat = Math.min(r.lat, t.lat), t.lng = Math.min(r.lng, t.lng), n.lat = Math.max(i.lat, n.lat), n.lng = Math.max(i.lng, n.lng)), this;
			},
			pad: function(e) {
				var t = this._southWest, n = this._northEast, r = Math.abs(t.lat - n.lat) * e, i = Math.abs(t.lng - n.lng) * e;
				return new D(new k(t.lat - r, t.lng - i), new k(n.lat + r, n.lng + i));
			},
			getCenter: function() {
				return new k((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
			},
			getSouthWest: function() {
				return this._southWest;
			},
			getNorthEast: function() {
				return this._northEast;
			},
			getNorthWest: function() {
				return new k(this.getNorth(), this.getWest());
			},
			getSouthEast: function() {
				return new k(this.getSouth(), this.getEast());
			},
			getWest: function() {
				return this._southWest.lng;
			},
			getSouth: function() {
				return this._southWest.lat;
			},
			getEast: function() {
				return this._northEast.lng;
			},
			getNorth: function() {
				return this._northEast.lat;
			},
			contains: function(e) {
				e = typeof e[0] == "number" || e instanceof k || "lat" in e ? A(e) : O(e);
				var t = this._southWest, n = this._northEast, r, i;
				return e instanceof D ? (r = e.getSouthWest(), i = e.getNorthEast()) : r = i = e, r.lat >= t.lat && i.lat <= n.lat && r.lng >= t.lng && i.lng <= n.lng;
			},
			intersects: function(e) {
				e = O(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat >= t.lat && r.lat <= n.lat, o = i.lng >= t.lng && r.lng <= n.lng;
				return a && o;
			},
			overlaps: function(e) {
				e = O(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat > t.lat && r.lat < n.lat, o = i.lng > t.lng && r.lng < n.lng;
				return a && o;
			},
			toBBoxString: function() {
				return [
					this.getWest(),
					this.getSouth(),
					this.getEast(),
					this.getNorth()
				].join(",");
			},
			equals: function(e, t) {
				return e ? (e = O(e), this._southWest.equals(e.getSouthWest(), t) && this._northEast.equals(e.getNorthEast(), t)) : !1;
			},
			isValid: function() {
				return !!(this._southWest && this._northEast);
			}
		};
		function O(e, t) {
			return e instanceof D ? e : new D(e, t);
		}
		function k(e, t, n) {
			if (isNaN(e) || isNaN(t)) throw Error("Invalid LatLng object: (" + e + ", " + t + ")");
			this.lat = +e, this.lng = +t, n !== void 0 && (this.alt = +n);
		}
		k.prototype = {
			equals: function(e, t) {
				return e ? (e = A(e), Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng)) <= (t === void 0 ? 1e-9 : t)) : !1;
			},
			toString: function(e) {
				return "LatLng(" + u(this.lat, e) + ", " + u(this.lng, e) + ")";
			},
			distanceTo: function(e) {
				return M.distance(this, A(e));
			},
			wrap: function() {
				return M.wrapLatLng(this);
			},
			toBounds: function(e) {
				var t = 180 * e / 40075017, n = t / Math.cos(Math.PI / 180 * this.lat);
				return O([this.lat - t, this.lng - n], [this.lat + t, this.lng + n]);
			},
			clone: function() {
				return new k(this.lat, this.lng, this.alt);
			}
		};
		function A(e, t, n) {
			return e instanceof k ? e : _(e) && typeof e[0] != "object" ? e.length === 3 ? new k(e[0], e[1], e[2]) : e.length === 2 ? new k(e[0], e[1]) : null : e == null ? e : typeof e == "object" && "lat" in e ? new k(e.lat, "lng" in e ? e.lng : e.lon, e.alt) : t === void 0 ? null : new k(e, t, n);
		}
		var j = {
			latLngToPoint: function(e, t) {
				var n = this.projection.project(e), r = this.scale(t);
				return this.transformation._transform(n, r);
			},
			pointToLatLng: function(e, t) {
				var n = this.scale(t), r = this.transformation.untransform(e, n);
				return this.projection.unproject(r);
			},
			project: function(e) {
				return this.projection.project(e);
			},
			unproject: function(e) {
				return this.projection.unproject(e);
			},
			scale: function(e) {
				return 256 * 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e / 256) / Math.LN2;
			},
			getProjectedBounds: function(e) {
				if (this.infinite) return null;
				var t = this.projection.bounds, n = this.scale(e);
				return new T(this.transformation.transform(t.min, n), this.transformation.transform(t.max, n));
			},
			infinite: !1,
			wrapLatLng: function(e) {
				var t = this.wrapLng ? c(e.lng, this.wrapLng, !0) : e.lng, n = this.wrapLat ? c(e.lat, this.wrapLat, !0) : e.lat, r = e.alt;
				return new k(n, t, r);
			},
			wrapLatLngBounds: function(e) {
				var t = e.getCenter(), n = this.wrapLatLng(t), r = t.lat - n.lat, i = t.lng - n.lng;
				if (r === 0 && i === 0) return e;
				var a = e.getSouthWest(), o = e.getNorthEast();
				return new D(new k(a.lat - r, a.lng - i), new k(o.lat - r, o.lng - i));
			}
		}, M = n({}, j, {
			wrapLng: [-180, 180],
			R: 6371e3,
			distance: function(e, t) {
				var n = Math.PI / 180, r = e.lat * n, i = t.lat * n, a = Math.sin((t.lat - e.lat) * n / 2), o = Math.sin((t.lng - e.lng) * n / 2), s = a * a + Math.cos(r) * Math.cos(i) * o * o, c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
				return this.R * c;
			}
		}), ue = 6378137, N = {
			R: ue,
			MAX_LATITUDE: 85.0511287798,
			project: function(e) {
				var t = Math.PI / 180, n = this.MAX_LATITUDE, r = Math.max(Math.min(n, e.lat), -n), i = Math.sin(r * t);
				return new C(this.R * e.lng * t, this.R * Math.log((1 + i) / (1 - i)) / 2);
			},
			unproject: function(e) {
				var t = 180 / Math.PI;
				return new k((2 * Math.atan(Math.exp(e.y / this.R)) - Math.PI / 2) * t, e.x * t / this.R);
			},
			bounds: (function() {
				var e = ue * Math.PI;
				return new T([-e, -e], [e, e]);
			})()
		};
		function de(e, t, n, r) {
			_(e) ? (this._a = e[0], this._b = e[1], this._c = e[2], this._d = e[3]) : (this._a = e, this._b = t, this._c = n, this._d = r);
		}
		de.prototype = {
			transform: function(e, t) {
				return this._transform(e.clone(), t);
			},
			_transform: function(e, t) {
				return t ||= 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e;
			},
			untransform: function(e, t) {
				return t ||= 1, new C((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c);
			}
		};
		function fe(e, t, n, r) {
			return new de(e, t, n, r);
		}
		var P = n({}, M, {
			code: "EPSG:3857",
			projection: N,
			transformation: function() {
				var e = .5 / (Math.PI * N.R);
				return fe(e, .5, -e, .5);
			}()
		}), pe = n({}, P, { code: "EPSG:900913" });
		function me(e) {
			return document.createElementNS("http://www.w3.org/2000/svg", e);
		}
		function he(e, t) {
			for (var n = "", r = 0, i, a = e.length, o, s, c; r < a; r++) {
				for (s = e[r], i = 0, o = s.length; i < o; i++) c = s[i], n += (i ? "L" : "M") + c.x + " " + c.y;
				n += t ? z.svg ? "z" : "x" : "";
			}
			return n || "M0 0";
		}
		var ge = document.documentElement.style, _e = "ActiveXObject" in window, ve = _e && !document.addEventListener, ye = "msLaunchUri" in navigator && !("documentMode" in document), be = R("webkit"), xe = R("android"), Se = R("android 2") || R("android 3"), Ce = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), we = xe && R("Google") && Ce < 537 && !("AudioNode" in window), Te = !!window.opera, F = !ye && R("chrome"), Ee = R("gecko") && !be && !Te && !_e, I = !F && R("safari"), De = R("phantom"), Oe = "OTransition" in ge, ke = navigator.platform.indexOf("Win") === 0, Ae = _e && "transition" in ge, je = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !Se, Me = "MozPerspective" in ge, Ne = !window.L_DISABLE_3D && (Ae || je || Me) && !Oe && !De, Pe = typeof orientation < "u" || R("mobile"), Fe = Pe && be, Ie = Pe && je, Le = !window.PointerEvent && window.MSPointerEvent, Re = !!(window.PointerEvent || Le), ze = "ontouchstart" in window || !!window.TouchEvent, Be = !window.L_NO_TOUCH && (ze || Re), Ve = Pe && Te, He = Pe && Ee, Ue = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, We = function() {
			var e = !1;
			try {
				var t = Object.defineProperty({}, "passive", { get: function() {
					e = !0;
				} });
				window.addEventListener("testPassiveEventSupport", l, t), window.removeEventListener("testPassiveEventSupport", l, t);
			} catch {}
			return e;
		}(), Ge = function() {
			return !!document.createElement("canvas").getContext;
		}(), Ke = !!(document.createElementNS && me("svg").createSVGRect), qe = !!Ke && (function() {
			var e = document.createElement("div");
			return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
		})(), Je = !Ke && function() {
			try {
				var e = document.createElement("div");
				e.innerHTML = "<v:shape adj=\"1\"/>";
				var t = e.firstChild;
				return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object";
			} catch {
				return !1;
			}
		}(), Ye = navigator.platform.indexOf("Mac") === 0, Xe = navigator.platform.indexOf("Linux") === 0;
		function R(e) {
			return navigator.userAgent.toLowerCase().indexOf(e) >= 0;
		}
		var z = {
			ie: _e,
			ielt9: ve,
			edge: ye,
			webkit: be,
			android: xe,
			android23: Se,
			androidStock: we,
			opera: Te,
			chrome: F,
			gecko: Ee,
			safari: I,
			phantom: De,
			opera12: Oe,
			win: ke,
			ie3d: Ae,
			webkit3d: je,
			gecko3d: Me,
			any3d: Ne,
			mobile: Pe,
			mobileWebkit: Fe,
			mobileWebkit3d: Ie,
			msPointer: Le,
			pointer: Re,
			touch: Be,
			touchNative: ze,
			mobileOpera: Ve,
			mobileGecko: He,
			retina: Ue,
			passiveEvents: We,
			canvas: Ge,
			svg: Ke,
			vml: Je,
			inlineSvg: qe,
			mac: Ye,
			linux: Xe
		}, Ze = z.msPointer ? "MSPointerDown" : "pointerdown", Qe = z.msPointer ? "MSPointerMove" : "pointermove", $e = z.msPointer ? "MSPointerUp" : "pointerup", et = z.msPointer ? "MSPointerCancel" : "pointercancel", tt = {
			touchstart: Ze,
			touchmove: Qe,
			touchend: $e,
			touchcancel: et
		}, nt = {
			touchstart: dt,
			touchmove: ut,
			touchend: ut,
			touchcancel: ut
		}, rt = {}, it = !1;
		function at(e, t, n) {
			return t === "touchstart" && lt(), nt[t] ? (n = nt[t].bind(this, n), e.addEventListener(tt[t], n, !1), n) : (console.warn("wrong event specified:", t), l);
		}
		function B(e, t, n) {
			tt[t] ? e.removeEventListener(tt[t], n, !1) : console.warn("wrong event specified:", t);
		}
		function ot(e) {
			rt[e.pointerId] = e;
		}
		function st(e) {
			rt[e.pointerId] && (rt[e.pointerId] = e);
		}
		function ct(e) {
			delete rt[e.pointerId];
		}
		function lt() {
			it ||= (document.addEventListener(Ze, ot, !0), document.addEventListener(Qe, st, !0), document.addEventListener($e, ct, !0), document.addEventListener(et, ct, !0), !0);
		}
		function ut(e, t) {
			if (t.pointerType !== (t.MSPOINTER_TYPE_MOUSE || "mouse")) {
				for (var n in t.touches = [], rt) t.touches.push(rt[n]);
				t.changedTouches = [t], e(t);
			}
		}
		function dt(e, t) {
			t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && Z(t), ut(e, t);
		}
		function ft(e) {
			var t = {}, n, r;
			for (r in e) n = e[r], t[r] = n && n.bind ? n.bind(e) : n;
			return e = t, t.type = "dblclick", t.detail = 2, t.isTrusted = !1, t._simulated = !0, t;
		}
		var pt = 200;
		function mt(e, t) {
			e.addEventListener("dblclick", t);
			var n = 0, r;
			function i(e) {
				if (e.detail !== 1) r = e.detail;
				else if (!(e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {
					var i = Zt(e);
					if (!i.some(function(e) {
						return e instanceof HTMLLabelElement && e.attributes.for;
					}) || i.some(function(e) {
						return e instanceof HTMLInputElement || e instanceof HTMLSelectElement;
					})) {
						var a = Date.now();
						a - n <= pt ? (r++, r === 2 && t(ft(e))) : r = 1, n = a;
					}
				}
			}
			return e.addEventListener("click", i), {
				dblclick: t,
				simDblclick: i
			};
		}
		function ht(e, t) {
			e.removeEventListener("dblclick", t.dblclick), e.removeEventListener("click", t.simDblclick);
		}
		var gt = Ot([
			"transform",
			"webkitTransform",
			"OTransform",
			"MozTransform",
			"msTransform"
		]), _t = Ot([
			"webkitTransition",
			"transition",
			"OTransition",
			"MozTransition",
			"msTransition"
		]), vt = _t === "webkitTransition" || _t === "OTransition" ? _t + "End" : "transitionend";
		function yt(e) {
			return typeof e == "string" ? document.getElementById(e) : e;
		}
		function bt(e, t) {
			var n = e.style[t] || e.currentStyle && e.currentStyle[t];
			if ((!n || n === "auto") && document.defaultView) {
				var r = document.defaultView.getComputedStyle(e, null);
				n = r ? r[t] : null;
			}
			return n === "auto" ? null : n;
		}
		function V(e, t, n) {
			var r = document.createElement(e);
			return r.className = t || "", n && n.appendChild(r), r;
		}
		function H(e) {
			var t = e.parentNode;
			t && t.removeChild(e);
		}
		function xt(e) {
			for (; e.firstChild;) e.removeChild(e.firstChild);
		}
		function St(e) {
			var t = e.parentNode;
			t && t.lastChild !== e && t.appendChild(e);
		}
		function Ct(e) {
			var t = e.parentNode;
			t && t.firstChild !== e && t.insertBefore(e, t.firstChild);
		}
		function wt(e, t) {
			if (e.classList !== void 0) return e.classList.contains(t);
			var n = Et(e);
			return n.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(n);
		}
		function U(e, t) {
			if (e.classList !== void 0) for (var n = f(t), r = 0, i = n.length; r < i; r++) e.classList.add(n[r]);
			else if (!wt(e, t)) {
				var a = Et(e);
				Tt(e, (a ? a + " " : "") + t);
			}
		}
		function W(e, t) {
			e.classList === void 0 ? Tt(e, d((" " + Et(e) + " ").replace(" " + t + " ", " "))) : e.classList.remove(t);
		}
		function Tt(e, t) {
			e.className.baseVal === void 0 ? e.className = t : e.className.baseVal = t;
		}
		function Et(e) {
			return e.correspondingElement && (e = e.correspondingElement), e.className.baseVal === void 0 ? e.className : e.className.baseVal;
		}
		function G(e, t) {
			"opacity" in e.style ? e.style.opacity = t : "filter" in e.style && Dt(e, t);
		}
		function Dt(e, t) {
			var n = !1, r = "DXImageTransform.Microsoft.Alpha";
			try {
				n = e.filters.item(r);
			} catch {
				if (t === 1) return;
			}
			t = Math.round(t * 100), n ? (n.Enabled = t !== 100, n.Opacity = t) : e.style.filter += " progid:" + r + "(opacity=" + t + ")";
		}
		function Ot(e) {
			for (var t = document.documentElement.style, n = 0; n < e.length; n++) if (e[n] in t) return e[n];
			return !1;
		}
		function kt(e, t, n) {
			var r = t || new C(0, 0);
			e.style[gt] = (z.ie3d ? "translate(" + r.x + "px," + r.y + "px)" : "translate3d(" + r.x + "px," + r.y + "px,0)") + (n ? " scale(" + n + ")" : "");
		}
		function K(e, t) {
			e._leaflet_pos = t, z.any3d ? kt(e, t) : (e.style.left = t.x + "px", e.style.top = t.y + "px");
		}
		function At(e) {
			return e._leaflet_pos || new C(0, 0);
		}
		var jt, Mt, Nt;
		if ("onselectstart" in document) jt = function() {
			Y(window, "selectstart", Z);
		}, Mt = function() {
			X(window, "selectstart", Z);
		};
		else {
			var Pt = Ot([
				"userSelect",
				"WebkitUserSelect",
				"OUserSelect",
				"MozUserSelect",
				"msUserSelect"
			]);
			jt = function() {
				if (Pt) {
					var e = document.documentElement.style;
					Nt = e[Pt], e[Pt] = "none";
				}
			}, Mt = function() {
				Pt && (document.documentElement.style[Pt] = Nt, Nt = void 0);
			};
		}
		function q() {
			Y(window, "dragstart", Z);
		}
		function Ft() {
			X(window, "dragstart", Z);
		}
		var It, Lt;
		function Rt(e) {
			for (; e.tabIndex === -1;) e = e.parentNode;
			e.style && (J(), It = e, Lt = e.style.outlineStyle, e.style.outlineStyle = "none", Y(window, "keydown", J));
		}
		function J() {
			It && (It.style.outlineStyle = Lt, It = void 0, Lt = void 0, X(window, "keydown", J));
		}
		function zt(e) {
			do
				e = e.parentNode;
			while ((!e.offsetWidth || !e.offsetHeight) && e !== document.body);
			return e;
		}
		function Bt(e) {
			var t = e.getBoundingClientRect();
			return {
				x: t.width / e.offsetWidth || 1,
				y: t.height / e.offsetHeight || 1,
				boundingClientRect: t
			};
		}
		var Vt = {
			__proto__: null,
			TRANSFORM: gt,
			TRANSITION: _t,
			TRANSITION_END: vt,
			get: yt,
			getStyle: bt,
			create: V,
			remove: H,
			empty: xt,
			toFront: St,
			toBack: Ct,
			hasClass: wt,
			addClass: U,
			removeClass: W,
			setClass: Tt,
			getClass: Et,
			setOpacity: G,
			testProp: Ot,
			setTransform: kt,
			setPosition: K,
			getPosition: At,
			get disableTextSelection() {
				return jt;
			},
			get enableTextSelection() {
				return Mt;
			},
			disableImageDrag: q,
			enableImageDrag: Ft,
			preventOutline: Rt,
			restoreOutline: J,
			getSizedParentNode: zt,
			getScale: Bt
		};
		function Y(e, t, n, r) {
			if (t && typeof t == "object") for (var i in t) Gt(e, i, t[i], n);
			else {
				t = f(t);
				for (var a = 0, o = t.length; a < o; a++) Gt(e, t[a], n, r);
			}
			return this;
		}
		var Ht = "_leaflet_events";
		function X(e, t, n, r) {
			if (arguments.length === 1) Ut(e), delete e[Ht];
			else if (t && typeof t == "object") for (var i in t) Kt(e, i, t[i], n);
			else if (t = f(t), arguments.length === 2) Ut(e, function(e) {
				return ee(t, e) !== -1;
			});
			else for (var a = 0, o = t.length; a < o; a++) Kt(e, t[a], n, r);
			return this;
		}
		function Ut(e, t) {
			for (var n in e[Ht]) {
				var r = n.split(/\d/)[0];
				(!t || t(r)) && Kt(e, r, null, null, n);
			}
		}
		var Wt = {
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			wheel: !("onwheel" in window) && "mousewheel"
		};
		function Gt(e, t, n, r) {
			var i = t + o(n) + (r ? "_" + o(r) : "");
			if (e[Ht] && e[Ht][i]) return this;
			var a = function(t) {
				return n.call(r || e, t || window.event);
			}, s = a;
			!z.touchNative && z.pointer && t.indexOf("touch") === 0 ? a = at(e, t, a) : z.touch && t === "dblclick" ? a = mt(e, a) : "addEventListener" in e ? t === "touchstart" || t === "touchmove" || t === "wheel" || t === "mousewheel" ? e.addEventListener(Wt[t] || t, a, z.passiveEvents ? { passive: !1 } : !1) : t === "mouseenter" || t === "mouseleave" ? (a = function(t) {
				t ||= window.event, tn(e, t) && s(t);
			}, e.addEventListener(Wt[t], a, !1)) : e.addEventListener(t, s, !1) : e.attachEvent("on" + t, a), e[Ht] = e[Ht] || {}, e[Ht][i] = a;
		}
		function Kt(e, t, n, r, i) {
			i ||= t + o(n) + (r ? "_" + o(r) : "");
			var a = e[Ht] && e[Ht][i];
			if (!a) return this;
			!z.touchNative && z.pointer && t.indexOf("touch") === 0 ? B(e, t, a) : z.touch && t === "dblclick" ? ht(e, a) : "removeEventListener" in e ? e.removeEventListener(Wt[t] || t, a, !1) : e.detachEvent("on" + t, a), e[Ht][i] = null;
		}
		function qt(e) {
			return e.stopPropagation ? e.stopPropagation() : e.originalEvent ? e.originalEvent._stopped = !0 : e.cancelBubble = !0, this;
		}
		function Jt(e) {
			return Gt(e, "wheel", qt), this;
		}
		function Yt(e) {
			return Y(e, "mousedown touchstart dblclick contextmenu", qt), e._leaflet_disable_click = !0, this;
		}
		function Z(e) {
			return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this;
		}
		function Xt(e) {
			return Z(e), qt(e), this;
		}
		function Zt(e) {
			if (e.composedPath) return e.composedPath();
			for (var t = [], n = e.target; n;) t.push(n), n = n.parentNode;
			return t;
		}
		function Qt(e, t) {
			if (!t) return new C(e.clientX, e.clientY);
			var n = Bt(t), r = n.boundingClientRect;
			return new C((e.clientX - r.left) / n.x - t.clientLeft, (e.clientY - r.top) / n.y - t.clientTop);
		}
		var $t = z.linux && z.chrome ? window.devicePixelRatio : z.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
		function en(e) {
			return z.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / $t : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
		}
		function tn(e, t) {
			var n = t.relatedTarget;
			if (!n) return !0;
			try {
				for (; n && n !== e;) n = n.parentNode;
			} catch {
				return !1;
			}
			return n !== e;
		}
		var nn = {
			__proto__: null,
			on: Y,
			off: X,
			stopPropagation: qt,
			disableScrollPropagation: Jt,
			disableClickPropagation: Yt,
			preventDefault: Z,
			stop: Xt,
			getPropagationPath: Zt,
			getMousePosition: Qt,
			getWheelDelta: en,
			isExternalTarget: tn,
			addListener: Y,
			removeListener: X
		}, rn = ce.extend({
			run: function(e, t, n, r) {
				this.stop(), this._el = e, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(r || .5, .2), this._startPos = At(e), this._offset = t.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
			},
			stop: function() {
				this._inProgress && (this._step(!0), this._complete());
			},
			_animate: function() {
				this._animId = y(this._animate, this), this._step();
			},
			_step: function(e) {
				var t = +/* @__PURE__ */ new Date() - this._startTime, n = this._duration * 1e3;
				t < n ? this._runFrame(this._easeOut(t / n), e) : (this._runFrame(1), this._complete());
			},
			_runFrame: function(e, t) {
				var n = this._startPos.add(this._offset.multiplyBy(e));
				t && n._round(), K(this._el, n), this.fire("step");
			},
			_complete: function() {
				b(this._animId), this._inProgress = !1, this.fire("end");
			},
			_easeOut: function(e) {
				return 1 - (1 - e) ** this._easeOutPower;
			}
		}), Q = ce.extend({
			options: {
				crs: P,
				center: void 0,
				zoom: void 0,
				minZoom: void 0,
				maxZoom: void 0,
				layers: [],
				maxBounds: void 0,
				renderer: void 0,
				zoomAnimation: !0,
				zoomAnimationThreshold: 4,
				fadeAnimation: !0,
				markerZoomAnimation: !0,
				transform3DLimit: 8388608,
				zoomSnap: 1,
				zoomDelta: 1,
				trackResize: !0
			},
			initialize: function(e, t) {
				t = p(this, t), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(e), this._initLayout(), this._onResize = i(this._onResize, this), this._initEvents(), t.maxBounds && this.setMaxBounds(t.maxBounds), t.zoom !== void 0 && (this._zoom = this._limitZoom(t.zoom)), t.center && t.zoom !== void 0 && this.setView(A(t.center), t.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = _t && z.any3d && !z.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), Y(this._proxy, vt, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
			},
			setView: function(e, t, r) {
				return t = t === void 0 ? this._zoom : this._limitZoom(t), e = this._limitCenter(A(e), t, this.options.maxBounds), r ||= {}, this._stop(), this._loaded && !r.reset && r !== !0 && (r.animate !== void 0 && (r.zoom = n({ animate: r.animate }, r.zoom), r.pan = n({
					animate: r.animate,
					duration: r.duration
				}, r.pan)), this._zoom === t ? this._tryAnimatedPan(e, r.pan) : this._tryAnimatedZoom && this._tryAnimatedZoom(e, t, r.zoom)) ? (clearTimeout(this._sizeTimer), this) : (this._resetView(e, t, r.pan && r.pan.noMoveStart), this);
			},
			setZoom: function(e, t) {
				return this._loaded ? this.setView(this.getCenter(), e, { zoom: t }) : (this._zoom = e, this);
			},
			zoomIn: function(e, t) {
				return e ||= z.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom + e, t);
			},
			zoomOut: function(e, t) {
				return e ||= z.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom - e, t);
			},
			setZoomAround: function(e, t, n) {
				var r = this.getZoomScale(t), i = this.getSize().divideBy(2), a = (e instanceof C ? e : this.latLngToContainerPoint(e)).subtract(i).multiplyBy(1 - 1 / r), o = this.containerPointToLatLng(i.add(a));
				return this.setView(o, t, { zoom: n });
			},
			_getBoundsCenterZoom: function(e, t) {
				t ||= {}, e = e.getBounds ? e.getBounds() : O(e);
				var n = w(t.paddingTopLeft || t.padding || [0, 0]), r = w(t.paddingBottomRight || t.padding || [0, 0]), i = this.getBoundsZoom(e, !1, n.add(r));
				if (i = typeof t.maxZoom == "number" ? Math.min(t.maxZoom, i) : i, i === Infinity) return {
					center: e.getCenter(),
					zoom: i
				};
				var a = r.subtract(n).divideBy(2), o = this.project(e.getSouthWest(), i), s = this.project(e.getNorthEast(), i);
				return {
					center: this.unproject(o.add(s).divideBy(2).add(a), i),
					zoom: i
				};
			},
			fitBounds: function(e, t) {
				if (e = O(e), !e.isValid()) throw Error("Bounds are not valid.");
				var n = this._getBoundsCenterZoom(e, t);
				return this.setView(n.center, n.zoom, t);
			},
			fitWorld: function(e) {
				return this.fitBounds([[-90, -180], [90, 180]], e);
			},
			panTo: function(e, t) {
				return this.setView(e, this._zoom, { pan: t });
			},
			panBy: function(e, t) {
				if (e = w(e).round(), t ||= {}, !e.x && !e.y) return this.fire("moveend");
				if (t.animate !== !0 && !this.getSize().contains(e)) return this._resetView(this.unproject(this.project(this.getCenter()).add(e)), this.getZoom()), this;
				if (this._panAnim || (this._panAnim = new rn(), this._panAnim.on({
					step: this._onPanTransitionStep,
					end: this._onPanTransitionEnd
				}, this)), t.noMoveStart || this.fire("movestart"), t.animate !== !1) {
					U(this._mapPane, "leaflet-pan-anim");
					var n = this._getMapPanePos().subtract(e).round();
					this._panAnim.run(this._mapPane, n, t.duration || .25, t.easeLinearity);
				} else this._rawPanBy(e), this.fire("move").fire("moveend");
				return this;
			},
			flyTo: function(e, t, n) {
				if (n ||= {}, n.animate === !1 || !z.any3d) return this.setView(e, t, n);
				this._stop();
				var r = this.project(this.getCenter()), i = this.project(e), a = this.getSize(), o = this._zoom;
				e = A(e), t = t === void 0 ? o : t;
				var s = Math.max(a.x, a.y), c = s * this.getZoomScale(o, t), l = i.distanceTo(r) || 1, u = 1.42, d = u * u;
				function f(e) {
					var t = e ? -1 : 1, n = e ? c : s, r = (c * c - s * s + t * d * d * l * l) / (2 * n * d * l), i = Math.sqrt(r * r + 1) - r;
					return i < 1e-9 ? -18 : Math.log(i);
				}
				function p(e) {
					return (Math.exp(e) - Math.exp(-e)) / 2;
				}
				function m(e) {
					return (Math.exp(e) + Math.exp(-e)) / 2;
				}
				function h(e) {
					return p(e) / m(e);
				}
				var g = f(0);
				function _(e) {
					return s * (m(g) / m(g + u * e));
				}
				function ee(e) {
					return s * (m(g) * h(g + u * e) - p(g)) / d;
				}
				function v(e) {
					return 1 - (1 - e) ** 1.5;
				}
				var te = Date.now(), ne = (f(1) - g) / u, re = n.duration ? 1e3 * n.duration : 1e3 * ne * .8;
				function ie() {
					var n = (Date.now() - te) / re, a = v(n) * ne;
					n <= 1 ? (this._flyToFrame = y(ie, this), this._move(this.unproject(r.add(i.subtract(r).multiplyBy(ee(a) / l)), o), this.getScaleZoom(s / _(a), o), { flyTo: !0 })) : this._move(e, t)._moveEnd(!0);
				}
				return this._moveStart(!0, n.noMoveStart), ie.call(this), this;
			},
			flyToBounds: function(e, t) {
				var n = this._getBoundsCenterZoom(e, t);
				return this.flyTo(n.center, n.zoom, t);
			},
			setMaxBounds: function(e) {
				return e = O(e), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), e.isValid() ? (this.options.maxBounds = e, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
			},
			setMinZoom: function(e) {
				var t = this.options.minZoom;
				return this.options.minZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(e) : this;
			},
			setMaxZoom: function(e) {
				var t = this.options.maxZoom;
				return this.options.maxZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(e) : this;
			},
			panInsideBounds: function(e, t) {
				this._enforcingBounds = !0;
				var n = this.getCenter(), r = this._limitCenter(n, this._zoom, O(e));
				return n.equals(r) || this.panTo(r, t), this._enforcingBounds = !1, this;
			},
			panInside: function(e, t) {
				t ||= {};
				var n = w(t.paddingTopLeft || t.padding || [0, 0]), r = w(t.paddingBottomRight || t.padding || [0, 0]), i = this.project(this.getCenter()), a = this.project(e), o = this.getPixelBounds(), s = E([o.min.add(n), o.max.subtract(r)]), c = s.getSize();
				if (!s.contains(a)) {
					this._enforcingBounds = !0;
					var l = a.subtract(s.getCenter()), u = s.extend(a).getSize().subtract(c);
					i.x += l.x < 0 ? -u.x : u.x, i.y += l.y < 0 ? -u.y : u.y, this.panTo(this.unproject(i), t), this._enforcingBounds = !1;
				}
				return this;
			},
			invalidateSize: function(e) {
				if (!this._loaded) return this;
				e = n({
					animate: !1,
					pan: !0
				}, e === !0 ? { animate: !0 } : e);
				var t = this.getSize();
				this._sizeChanged = !0, this._lastCenter = null;
				var r = this.getSize(), a = t.divideBy(2).round(), o = r.divideBy(2).round(), s = a.subtract(o);
				return !s.x && !s.y ? this : (e.animate && e.pan ? this.panBy(s) : (e.pan && this._rawPanBy(s), this.fire("move"), e.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(i(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
					oldSize: t,
					newSize: r
				}));
			},
			stop: function() {
				return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
			},
			locate: function(e) {
				if (e = this._locateOptions = n({
					timeout: 1e4,
					watch: !1
				}, e), !("geolocation" in navigator)) return this._handleGeolocationError({
					code: 0,
					message: "Geolocation not supported."
				}), this;
				var t = i(this._handleGeolocationResponse, this), r = i(this._handleGeolocationError, this);
				return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this;
			},
			stopLocate: function() {
				return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
			},
			_handleGeolocationError: function(e) {
				if (this._container._leaflet_id) {
					var t = e.code, n = e.message || (t === 1 ? "permission denied" : t === 2 ? "position unavailable" : "timeout");
					this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
						code: t,
						message: "Geolocation error: " + n + "."
					});
				}
			},
			_handleGeolocationResponse: function(e) {
				if (this._container._leaflet_id) {
					var t = e.coords.latitude, n = e.coords.longitude, r = new k(t, n), i = r.toBounds(e.coords.accuracy * 2), a = this._locateOptions;
					if (a.setView) {
						var o = this.getBoundsZoom(i);
						this.setView(r, a.maxZoom ? Math.min(o, a.maxZoom) : o);
					}
					var s = {
						latlng: r,
						bounds: i,
						timestamp: e.timestamp
					};
					for (var c in e.coords) typeof e.coords[c] == "number" && (s[c] = e.coords[c]);
					this.fire("locationfound", s);
				}
			},
			addHandler: function(e, t) {
				if (!t) return this;
				var n = this[e] = new t(this);
				return this._handlers.push(n), this.options[e] && n.enable(), this;
			},
			remove: function() {
				if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id) throw Error("Map container is being reused by another instance");
				try {
					delete this._container._leaflet_id, delete this._containerId;
				} catch {
					this._container._leaflet_id = void 0, this._containerId = void 0;
				}
				for (var e in this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), H(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest &&= (b(this._resizeRequest), null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) this._layers[e].remove();
				for (e in this._panes) H(this._panes[e]);
				return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
			},
			createPane: function(e, t) {
				var n = V("div", "leaflet-pane" + (e ? " leaflet-" + e.replace("Pane", "") + "-pane" : ""), t || this._mapPane);
				return e && (this._panes[e] = n), n;
			},
			getCenter: function() {
				return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
			},
			getZoom: function() {
				return this._zoom;
			},
			getBounds: function() {
				var e = this.getPixelBounds();
				return new D(this.unproject(e.getBottomLeft()), this.unproject(e.getTopRight()));
			},
			getMinZoom: function() {
				return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
			},
			getMaxZoom: function() {
				return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
			},
			getBoundsZoom: function(e, t, n) {
				e = O(e), n = w(n || [0, 0]);
				var r = this.getZoom() || 0, i = this.getMinZoom(), a = this.getMaxZoom(), o = e.getNorthWest(), s = e.getSouthEast(), c = this.getSize().subtract(n), l = E(this.project(s, r), this.project(o, r)).getSize(), u = z.any3d ? this.options.zoomSnap : 1, d = c.x / l.x, f = c.y / l.y, p = t ? Math.max(d, f) : Math.min(d, f);
				return r = this.getScaleZoom(p, r), u && (r = Math.round(r / (u / 100)) * (u / 100), r = t ? Math.ceil(r / u) * u : Math.floor(r / u) * u), Math.max(i, Math.min(a, r));
			},
			getSize: function() {
				return (!this._size || this._sizeChanged) && (this._size = new C(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone();
			},
			getPixelBounds: function(e, t) {
				var n = this._getTopLeftPoint(e, t);
				return new T(n, n.add(this.getSize()));
			},
			getPixelOrigin: function() {
				return this._checkIfLoaded(), this._pixelOrigin;
			},
			getPixelWorldBounds: function(e) {
				return this.options.crs.getProjectedBounds(e === void 0 ? this.getZoom() : e);
			},
			getPane: function(e) {
				return typeof e == "string" ? this._panes[e] : e;
			},
			getPanes: function() {
				return this._panes;
			},
			getContainer: function() {
				return this._container;
			},
			getZoomScale: function(e, t) {
				var n = this.options.crs;
				return t = t === void 0 ? this._zoom : t, n.scale(e) / n.scale(t);
			},
			getScaleZoom: function(e, t) {
				var n = this.options.crs;
				t = t === void 0 ? this._zoom : t;
				var r = n.zoom(e * n.scale(t));
				return isNaN(r) ? Infinity : r;
			},
			project: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.latLngToPoint(A(e), t);
			},
			unproject: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.pointToLatLng(w(e), t);
			},
			layerPointToLatLng: function(e) {
				var t = w(e).add(this.getPixelOrigin());
				return this.unproject(t);
			},
			latLngToLayerPoint: function(e) {
				return this.project(A(e))._round()._subtract(this.getPixelOrigin());
			},
			wrapLatLng: function(e) {
				return this.options.crs.wrapLatLng(A(e));
			},
			wrapLatLngBounds: function(e) {
				return this.options.crs.wrapLatLngBounds(O(e));
			},
			distance: function(e, t) {
				return this.options.crs.distance(A(e), A(t));
			},
			containerPointToLayerPoint: function(e) {
				return w(e).subtract(this._getMapPanePos());
			},
			layerPointToContainerPoint: function(e) {
				return w(e).add(this._getMapPanePos());
			},
			containerPointToLatLng: function(e) {
				var t = this.containerPointToLayerPoint(w(e));
				return this.layerPointToLatLng(t);
			},
			latLngToContainerPoint: function(e) {
				return this.layerPointToContainerPoint(this.latLngToLayerPoint(A(e)));
			},
			mouseEventToContainerPoint: function(e) {
				return Qt(e, this._container);
			},
			mouseEventToLayerPoint: function(e) {
				return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
			},
			mouseEventToLatLng: function(e) {
				return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
			},
			_initContainer: function(e) {
				var t = this._container = yt(e);
				if (!t) throw Error("Map container not found.");
				if (t._leaflet_id) throw Error("Map container is already initialized.");
				Y(t, "scroll", this._onScroll, this), this._containerId = o(t);
			},
			_initLayout: function() {
				var e = this._container;
				this._fadeAnimated = this.options.fadeAnimation && z.any3d, U(e, "leaflet-container" + (z.touch ? " leaflet-touch" : "") + (z.retina ? " leaflet-retina" : "") + (z.ielt9 ? " leaflet-oldie" : "") + (z.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
				var t = bt(e, "position");
				t !== "absolute" && t !== "relative" && t !== "fixed" && t !== "sticky" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
			},
			_initPanes: function() {
				var e = this._panes = {};
				this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), K(this._mapPane, new C(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (U(e.markerPane, "leaflet-zoom-hide"), U(e.shadowPane, "leaflet-zoom-hide"));
			},
			_resetView: function(e, t, n) {
				K(this._mapPane, new C(0, 0));
				var r = !this._loaded;
				this._loaded = !0, t = this._limitZoom(t), this.fire("viewprereset");
				var i = this._zoom !== t;
				this._moveStart(i, n)._move(e, t)._moveEnd(i), this.fire("viewreset"), r && this.fire("load");
			},
			_moveStart: function(e, t) {
				return e && this.fire("zoomstart"), t || this.fire("movestart"), this;
			},
			_move: function(e, t, n, r) {
				t === void 0 && (t = this._zoom);
				var i = this._zoom !== t;
				return this._zoom = t, this._lastCenter = e, this._pixelOrigin = this._getNewPixelOrigin(e), r ? n && n.pinch && this.fire("zoom", n) : ((i || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)), this;
			},
			_moveEnd: function(e) {
				return e && this.fire("zoomend"), this.fire("moveend");
			},
			_stop: function() {
				return b(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
			},
			_rawPanBy: function(e) {
				K(this._mapPane, this._getMapPanePos().subtract(e));
			},
			_getZoomSpan: function() {
				return this.getMaxZoom() - this.getMinZoom();
			},
			_panInsideMaxBounds: function() {
				this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
			},
			_checkIfLoaded: function() {
				if (!this._loaded) throw Error("Set map center and zoom first.");
			},
			_initEvents: function(e) {
				this._targets = {}, this._targets[o(this._container)] = this;
				var t = e ? X : Y;
				t(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && t(window, "resize", this._onResize, this), z.any3d && this.options.transform3DLimit && (e ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
			},
			_onResize: function() {
				b(this._resizeRequest), this._resizeRequest = y(function() {
					this.invalidateSize({ debounceMoveend: !0 });
				}, this);
			},
			_onScroll: function() {
				this._container.scrollTop = 0, this._container.scrollLeft = 0;
			},
			_onMoveEnd: function() {
				var e = this._getMapPanePos();
				Math.max(Math.abs(e.x), Math.abs(e.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
			},
			_findEventTargets: function(e, t) {
				for (var n = [], r, i = t === "mouseout" || t === "mouseover", a = e.target || e.srcElement, s = !1; a;) {
					if (r = this._targets[o(a)], r && (t === "click" || t === "preclick") && this._draggableMoved(r)) {
						s = !0;
						break;
					}
					if (r && r.listens(t, !0) && (i && !tn(a, e) || (n.push(r), i)) || a === this._container) break;
					a = a.parentNode;
				}
				return !n.length && !s && !i && this.listens(t, !0) && (n = [this]), n;
			},
			_isClickDisabled: function(e) {
				for (; e && e !== this._container;) {
					if (e._leaflet_disable_click) return !0;
					e = e.parentNode;
				}
			},
			_handleDOMEvent: function(e) {
				var t = e.target || e.srcElement;
				if (!(!this._loaded || t._leaflet_disable_events || e.type === "click" && this._isClickDisabled(t))) {
					var n = e.type;
					n === "mousedown" && Rt(t), this._fireDOMEvent(e, n);
				}
			},
			_mouseEvents: [
				"click",
				"dblclick",
				"mouseover",
				"mouseout",
				"contextmenu"
			],
			_fireDOMEvent: function(e, t, r) {
				if (e.type === "click") {
					var i = n({}, e);
					i.type = "preclick", this._fireDOMEvent(i, i.type, r);
				}
				var a = this._findEventTargets(e, t);
				if (r) {
					for (var o = [], s = 0; s < r.length; s++) r[s].listens(t, !0) && o.push(r[s]);
					a = o.concat(a);
				}
				if (a.length) {
					t === "contextmenu" && Z(e);
					var c = a[0], l = { originalEvent: e };
					if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
						var u = c.getLatLng && (!c._radius || c._radius <= 10);
						l.containerPoint = u ? this.latLngToContainerPoint(c.getLatLng()) : this.mouseEventToContainerPoint(e), l.layerPoint = this.containerPointToLayerPoint(l.containerPoint), l.latlng = u ? c.getLatLng() : this.layerPointToLatLng(l.layerPoint);
					}
					for (s = 0; s < a.length; s++) if (a[s].fire(t, l, !0), l.originalEvent._stopped || a[s].options.bubblingMouseEvents === !1 && ee(this._mouseEvents, t) !== -1) return;
				}
			},
			_draggableMoved: function(e) {
				return e = e.dragging && e.dragging.enabled() ? e : this, e.dragging && e.dragging.moved() || this.boxZoom && this.boxZoom.moved();
			},
			_clearHandlers: function() {
				for (var e = 0, t = this._handlers.length; e < t; e++) this._handlers[e].disable();
			},
			whenReady: function(e, t) {
				return this._loaded ? e.call(t || this, { target: this }) : this.on("load", e, t), this;
			},
			_getMapPanePos: function() {
				return At(this._mapPane) || new C(0, 0);
			},
			_moved: function() {
				var e = this._getMapPanePos();
				return e && !e.equals([0, 0]);
			},
			_getTopLeftPoint: function(e, t) {
				return (e && t !== void 0 ? this._getNewPixelOrigin(e, t) : this.getPixelOrigin()).subtract(this._getMapPanePos());
			},
			_getNewPixelOrigin: function(e, t) {
				var n = this.getSize()._divideBy(2);
				return this.project(e, t)._subtract(n)._add(this._getMapPanePos())._round();
			},
			_latLngToNewLayerPoint: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return this.project(e, t)._subtract(r);
			},
			_latLngBoundsToNewLayerBounds: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return E([
					this.project(e.getSouthWest(), t)._subtract(r),
					this.project(e.getNorthWest(), t)._subtract(r),
					this.project(e.getSouthEast(), t)._subtract(r),
					this.project(e.getNorthEast(), t)._subtract(r)
				]);
			},
			_getCenterLayerPoint: function() {
				return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
			},
			_getCenterOffset: function(e) {
				return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint());
			},
			_limitCenter: function(e, t, n) {
				if (!n) return e;
				var r = this.project(e, t), i = this.getSize().divideBy(2), a = new T(r.subtract(i), r.add(i)), o = this._getBoundsOffset(a, n, t);
				return Math.abs(o.x) <= 1 && Math.abs(o.y) <= 1 ? e : this.unproject(r.add(o), t);
			},
			_limitOffset: function(e, t) {
				if (!t) return e;
				var n = this.getPixelBounds(), r = new T(n.min.add(e), n.max.add(e));
				return e.add(this._getBoundsOffset(r, t));
			},
			_getBoundsOffset: function(e, t, n) {
				var r = E(this.project(t.getNorthEast(), n), this.project(t.getSouthWest(), n)), i = r.min.subtract(e.min), a = r.max.subtract(e.max);
				return new C(this._rebound(i.x, -a.x), this._rebound(i.y, -a.y));
			},
			_rebound: function(e, t) {
				return e + t > 0 ? Math.round(e - t) / 2 : Math.max(0, Math.ceil(e)) - Math.max(0, Math.floor(t));
			},
			_limitZoom: function(e) {
				var t = this.getMinZoom(), n = this.getMaxZoom(), r = z.any3d ? this.options.zoomSnap : 1;
				return r && (e = Math.round(e / r) * r), Math.max(t, Math.min(n, e));
			},
			_onPanTransitionStep: function() {
				this.fire("move");
			},
			_onPanTransitionEnd: function() {
				W(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
			},
			_tryAnimatedPan: function(e, t) {
				var n = this._getCenterOffset(e)._trunc();
				return (t && t.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, t), !0);
			},
			_createAnimProxy: function() {
				var e = this._proxy = V("div", "leaflet-proxy leaflet-zoom-animated");
				this._panes.mapPane.appendChild(e), this.on("zoomanim", function(e) {
					var t = gt, n = this._proxy.style[t];
					kt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[t] && this._animatingZoom && this._onZoomTransitionEnd();
				}, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
			},
			_destroyAnimProxy: function() {
				H(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
			},
			_animMoveEnd: function() {
				var e = this.getCenter(), t = this.getZoom();
				kt(this._proxy, this.project(e, t), this.getZoomScale(t, 1));
			},
			_catchTransitionEnd: function(e) {
				this._animatingZoom && e.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
			},
			_nothingToAnimate: function() {
				return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
			},
			_tryAnimatedZoom: function(e, t, n) {
				if (this._animatingZoom) return !0;
				if (n ||= {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(t - this._zoom) > this.options.zoomAnimationThreshold) return !1;
				var r = this.getZoomScale(t), i = this._getCenterOffset(e)._divideBy(1 - 1 / r);
				return n.animate !== !0 && !this.getSize().contains(i) ? !1 : (y(function() {
					this._moveStart(!0, n.noMoveStart || !1)._animateZoom(e, t, !0);
				}, this), !0);
			},
			_animateZoom: function(e, t, n, r) {
				this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = e, this._animateToZoom = t, U(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
					center: e,
					zoom: t,
					noUpdate: r
				}), this._tempFireZoomEvent ||= this._zoom !== this._animateToZoom, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(i(this._onZoomTransitionEnd, this), 250));
			},
			_onZoomTransitionEnd: function() {
				this._animatingZoom && (this._mapPane && W(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
			}
		});
		function an(e, t) {
			return new Q(e, t);
		}
		var on = x.extend({
			options: { position: "topright" },
			initialize: function(e) {
				p(this, e);
			},
			getPosition: function() {
				return this.options.position;
			},
			setPosition: function(e) {
				var t = this._map;
				return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this;
			},
			getContainer: function() {
				return this._container;
			},
			addTo: function(e) {
				this.remove(), this._map = e;
				var t = this._container = this.onAdd(e), n = this.getPosition(), r = e._controlCorners[n];
				return U(t, "leaflet-control"), n.indexOf("bottom") === -1 ? r.appendChild(t) : r.insertBefore(t, r.firstChild), this._map.on("unload", this.remove, this), this;
			},
			remove: function() {
				return this._map &&= (H(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), null), this;
			},
			_refocusOnMap: function(e) {
				this._map && e && e.screenX > 0 && e.screenY > 0 && this._map.getContainer().focus();
			}
		}), sn = function(e) {
			return new on(e);
		};
		Q.include({
			addControl: function(e) {
				return e.addTo(this), this;
			},
			removeControl: function(e) {
				return e.remove(), this;
			},
			_initControlPos: function() {
				var e = this._controlCorners = {}, t = "leaflet-", n = this._controlContainer = V("div", t + "control-container", this._container);
				function r(r, i) {
					var a = t + r + " " + t + i;
					e[r + i] = V("div", a, n);
				}
				r("top", "left"), r("top", "right"), r("bottom", "left"), r("bottom", "right");
			},
			_clearControlPos: function() {
				for (var e in this._controlCorners) H(this._controlCorners[e]);
				H(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
			}
		});
		var cn = on.extend({
			options: {
				collapsed: !0,
				position: "topright",
				autoZIndex: !0,
				hideSingleBase: !1,
				sortLayers: !1,
				sortFunction: function(e, t, n, r) {
					return n < r ? -1 : +(r < n);
				}
			},
			initialize: function(e, t, n) {
				for (var r in p(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1, e) this._addLayer(e[r], r);
				for (r in t) this._addLayer(t[r], r, !0);
			},
			onAdd: function(e) {
				this._initLayout(), this._update(), this._map = e, e.on("zoomend", this._checkDisabledLayers, this);
				for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.on("add remove", this._onLayerChange, this);
				return this._container;
			},
			addTo: function(e) {
				return on.prototype.addTo.call(this, e), this._expandIfNotCollapsed();
			},
			onRemove: function() {
				this._map.off("zoomend", this._checkDisabledLayers, this);
				for (var e = 0; e < this._layers.length; e++) this._layers[e].layer.off("add remove", this._onLayerChange, this);
			},
			addBaseLayer: function(e, t) {
				return this._addLayer(e, t), this._map ? this._update() : this;
			},
			addOverlay: function(e, t) {
				return this._addLayer(e, t, !0), this._map ? this._update() : this;
			},
			removeLayer: function(e) {
				e.off("add remove", this._onLayerChange, this);
				var t = this._getLayer(o(e));
				return t && this._layers.splice(this._layers.indexOf(t), 1), this._map ? this._update() : this;
			},
			expand: function() {
				U(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
				var e = this._map.getSize().y - (this._container.offsetTop + 50);
				return e < this._section.clientHeight ? (U(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = e + "px") : W(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
			},
			collapse: function() {
				return W(this._container, "leaflet-control-layers-expanded"), this;
			},
			_initLayout: function() {
				var e = "leaflet-control-layers", t = this._container = V("div", e), n = this.options.collapsed;
				t.setAttribute("aria-haspopup", !0), Yt(t), Jt(t);
				var r = this._section = V("section", e + "-list");
				n && (this._map.on("click", this.collapse, this), Y(t, {
					mouseenter: this._expandSafely,
					mouseleave: this.collapse
				}, this));
				var i = this._layersLink = V("a", e + "-toggle", t);
				i.href = "#", i.title = "Layers", i.setAttribute("role", "button"), Y(i, {
					keydown: function(e) {
						e.keyCode === 13 && this._expandSafely();
					},
					click: function(e) {
						Z(e), this._expandSafely();
					}
				}, this), n || this.expand(), this._baseLayersList = V("div", e + "-base", r), this._separator = V("div", e + "-separator", r), this._overlaysList = V("div", e + "-overlays", r), t.appendChild(r);
			},
			_getLayer: function(e) {
				for (var t = 0; t < this._layers.length; t++) if (this._layers[t] && o(this._layers[t].layer) === e) return this._layers[t];
			},
			_addLayer: function(e, t, n) {
				this._map && e.on("add remove", this._onLayerChange, this), this._layers.push({
					layer: e,
					name: t,
					overlay: n
				}), this.options.sortLayers && this._layers.sort(i(function(e, t) {
					return this.options.sortFunction(e.layer, t.layer, e.name, t.name);
				}, this)), this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
			},
			_update: function() {
				if (!this._container) return this;
				xt(this._baseLayersList), xt(this._overlaysList), this._layerControlInputs = [];
				var e, t, n, r, i = 0;
				for (n = 0; n < this._layers.length; n++) r = this._layers[n], this._addItem(r), t ||= r.overlay, e ||= !r.overlay, i += +!r.overlay;
				return this.options.hideSingleBase && (e &&= i > 1, this._baseLayersList.style.display = e ? "" : "none"), this._separator.style.display = t && e ? "" : "none", this;
			},
			_onLayerChange: function(e) {
				this._handlingClick || this._update();
				var t = this._getLayer(o(e.target)), n = t.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
				n && this._map.fire(n, t);
			},
			_createRadioElement: function(e, t) {
				var n = "<input type=\"radio\" class=\"leaflet-control-layers-selector\" name=\"" + e + "\"" + (t ? " checked=\"checked\"" : "") + "/>", r = document.createElement("div");
				return r.innerHTML = n, r.firstChild;
			},
			_addItem: function(e) {
				var t = document.createElement("label"), n = this._map.hasLayer(e.layer), r;
				e.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.className = "leaflet-control-layers-selector", r.defaultChecked = n) : r = this._createRadioElement("leaflet-base-layers_" + o(this), n), this._layerControlInputs.push(r), r.layerId = o(e.layer), Y(r, "click", this._onInputClick, this);
				var i = document.createElement("span");
				i.innerHTML = " " + e.name;
				var a = document.createElement("span");
				return t.appendChild(a), a.appendChild(r), a.appendChild(i), (e.overlay ? this._overlaysList : this._baseLayersList).appendChild(t), this._checkDisabledLayers(), t;
			},
			_onInputClick: function() {
				if (!this._preventClick) {
					var e = this._layerControlInputs, t, n, r = [], i = [];
					this._handlingClick = !0;
					for (var a = e.length - 1; a >= 0; a--) t = e[a], n = this._getLayer(t.layerId).layer, t.checked ? r.push(n) : t.checked || i.push(n);
					for (a = 0; a < i.length; a++) this._map.hasLayer(i[a]) && this._map.removeLayer(i[a]);
					for (a = 0; a < r.length; a++) this._map.hasLayer(r[a]) || this._map.addLayer(r[a]);
					this._handlingClick = !1, this._refocusOnMap();
				}
			},
			_checkDisabledLayers: function() {
				for (var e = this._layerControlInputs, t, n, r = this._map.getZoom(), i = e.length - 1; i >= 0; i--) t = e[i], n = this._getLayer(t.layerId).layer, t.disabled = n.options.minZoom !== void 0 && r < n.options.minZoom || n.options.maxZoom !== void 0 && r > n.options.maxZoom;
			},
			_expandIfNotCollapsed: function() {
				return this._map && !this.options.collapsed && this.expand(), this;
			},
			_expandSafely: function() {
				var e = this._section;
				this._preventClick = !0, Y(e, "click", Z), this.expand();
				var t = this;
				setTimeout(function() {
					X(e, "click", Z), t._preventClick = !1;
				});
			}
		}), ln = function(e, t, n) {
			return new cn(e, t, n);
		}, un = on.extend({
			options: {
				position: "topleft",
				zoomInText: "<span aria-hidden=\"true\">+</span>",
				zoomInTitle: "Zoom in",
				zoomOutText: "<span aria-hidden=\"true\">&#x2212;</span>",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(e) {
				var t = "leaflet-control-zoom", n = V("div", t + " leaflet-bar"), r = this.options;
				return this._zoomInButton = this._createButton(r.zoomInText, r.zoomInTitle, t + "-in", n, this._zoomIn), this._zoomOutButton = this._createButton(r.zoomOutText, r.zoomOutTitle, t + "-out", n, this._zoomOut), this._updateDisabled(), e.on("zoomend zoomlevelschange", this._updateDisabled, this), n;
			},
			onRemove: function(e) {
				e.off("zoomend zoomlevelschange", this._updateDisabled, this);
			},
			disable: function() {
				return this._disabled = !0, this._updateDisabled(), this;
			},
			enable: function() {
				return this._disabled = !1, this._updateDisabled(), this;
			},
			_zoomIn: function(e) {
				!this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_zoomOut: function(e) {
				!this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_createButton: function(e, t, n, r, i) {
				var a = V("a", n, r);
				return a.innerHTML = e, a.href = "#", a.title = t, a.setAttribute("role", "button"), a.setAttribute("aria-label", t), Yt(a), Y(a, "click", Xt), Y(a, "click", i, this), Y(a, "click", this._refocusOnMap, this), a;
			},
			_updateDisabled: function() {
				var e = this._map, t = "leaflet-disabled";
				W(this._zoomInButton, t), W(this._zoomOutButton, t), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || e._zoom === e.getMinZoom()) && (U(this._zoomOutButton, t), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || e._zoom === e.getMaxZoom()) && (U(this._zoomInButton, t), this._zoomInButton.setAttribute("aria-disabled", "true"));
			}
		});
		Q.mergeOptions({ zoomControl: !0 }), Q.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new un(), this.addControl(this.zoomControl));
		});
		var dn = function(e) {
			return new un(e);
		}, fn = on.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: !0,
				imperial: !0
			},
			onAdd: function(e) {
				var t = "leaflet-control-scale", n = V("div", t), r = this.options;
				return this._addScales(r, t + "-line", n), e.on(r.updateWhenIdle ? "moveend" : "move", this._update, this), e.whenReady(this._update, this), n;
			},
			onRemove: function(e) {
				e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
			},
			_addScales: function(e, t, n) {
				e.metric && (this._mScale = V("div", t, n)), e.imperial && (this._iScale = V("div", t, n));
			},
			_update: function() {
				var e = this._map, t = e.getSize().y / 2, n = e.distance(e.containerPointToLatLng([0, t]), e.containerPointToLatLng([this.options.maxWidth, t]));
				this._updateScales(n);
			},
			_updateScales: function(e) {
				this.options.metric && e && this._updateMetric(e), this.options.imperial && e && this._updateImperial(e);
			},
			_updateMetric: function(e) {
				var t = this._getRoundNum(e), n = t < 1e3 ? t + " m" : t / 1e3 + " km";
				this._updateScale(this._mScale, n, t / e);
			},
			_updateImperial: function(e) {
				var t = e * 3.2808399, n, r, i;
				t > 5280 ? (n = t / 5280, r = this._getRoundNum(n), this._updateScale(this._iScale, r + " mi", r / n)) : (i = this._getRoundNum(t), this._updateScale(this._iScale, i + " ft", i / t));
			},
			_updateScale: function(e, t, n) {
				e.style.width = Math.round(this.options.maxWidth * n) + "px", e.innerHTML = t;
			},
			_getRoundNum: function(e) {
				var t = 10 ** ((Math.floor(e) + "").length - 1), n = e / t;
				return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n;
			}
		}), pn = function(e) {
			return new fn(e);
		}, mn = on.extend({
			options: {
				position: "bottomright",
				prefix: "<a href=\"https://leafletjs.com\" title=\"A JavaScript library for interactive maps\">" + (z.inlineSvg ? "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\" class=\"leaflet-attribution-flag\"><path fill=\"#4C7BE1\" d=\"M0 0h12v4H0z\"/><path fill=\"#FFD500\" d=\"M0 4h12v3H0z\"/><path fill=\"#E0BC00\" d=\"M0 7h12v1H0z\"/></svg> " : "") + "Leaflet</a>"
			},
			initialize: function(e) {
				p(this, e), this._attributions = {};
			},
			onAdd: function(e) {
				for (var t in e.attributionControl = this, this._container = V("div", "leaflet-control-attribution"), Yt(this._container), e._layers) e._layers[t].getAttribution && this.addAttribution(e._layers[t].getAttribution());
				return this._update(), e.on("layeradd", this._addAttribution, this), this._container;
			},
			onRemove: function(e) {
				e.off("layeradd", this._addAttribution, this);
			},
			_addAttribution: function(e) {
				e.layer.getAttribution && (this.addAttribution(e.layer.getAttribution()), e.layer.once("remove", function() {
					this.removeAttribution(e.layer.getAttribution());
				}, this));
			},
			setPrefix: function(e) {
				return this.options.prefix = e, this._update(), this;
			},
			addAttribution: function(e) {
				return e && (this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update()), this;
			},
			removeAttribution: function(e) {
				return e && this._attributions[e] && (this._attributions[e]--, this._update()), this;
			},
			_update: function() {
				if (this._map) {
					var e = [];
					for (var t in this._attributions) this._attributions[t] && e.push(t);
					var n = [];
					this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(", ")), this._container.innerHTML = n.join(" <span aria-hidden=\"true\">|</span> ");
				}
			}
		});
		Q.mergeOptions({ attributionControl: !0 }), Q.addInitHook(function() {
			this.options.attributionControl && new mn().addTo(this);
		}), on.Layers = cn, on.Zoom = un, on.Scale = fn, on.Attribution = mn, sn.layers = ln, sn.zoom = dn, sn.scale = pn, sn.attribution = function(e) {
			return new mn(e);
		};
		var hn = x.extend({
			initialize: function(e) {
				this._map = e;
			},
			enable: function() {
				return this._enabled || (this._enabled = !0, this.addHooks()), this;
			},
			disable: function() {
				return this._enabled && (this._enabled = !1, this.removeHooks()), this;
			},
			enabled: function() {
				return !!this._enabled;
			}
		});
		hn.addTo = function(e, t) {
			return e.addHandler(t, this), this;
		};
		var gn = { Events: S }, _n = z.touch ? "touchstart mousedown" : "mousedown", vn = ce.extend({
			options: { clickTolerance: 3 },
			initialize: function(e, t, n, r) {
				p(this, r), this._element = e, this._dragStartTarget = t || e, this._preventOutline = n;
			},
			enable: function() {
				this._enabled ||= (Y(this._dragStartTarget, _n, this._onDown, this), !0);
			},
			disable: function() {
				this._enabled && (vn._dragging === this && this.finishDrag(!0), X(this._dragStartTarget, _n, this._onDown, this), this._enabled = !1, this._moved = !1);
			},
			_onDown: function(e) {
				if (this._enabled && (this._moved = !1, !wt(this._element, "leaflet-zoom-anim"))) {
					if (e.touches && e.touches.length !== 1) vn._dragging === this && this.finishDrag();
					else if (!(vn._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) && (vn._dragging = this, this._preventOutline && Rt(this._element), q(), jt(), !this._moving)) {
						this.fire("down");
						var t = e.touches ? e.touches[0] : e, n = zt(this._element);
						this._startPoint = new C(t.clientX, t.clientY), this._startPos = At(this._element), this._parentScale = Bt(n);
						var r = e.type === "mousedown";
						Y(document, r ? "mousemove" : "touchmove", this._onMove, this), Y(document, r ? "mouseup" : "touchend touchcancel", this._onUp, this);
					}
				}
			},
			_onMove: function(e) {
				if (this._enabled) {
					if (e.touches && e.touches.length > 1) this._moved = !0;
					else {
						var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, n = new C(t.clientX, t.clientY)._subtract(this._startPoint);
						(n.x || n.y) && (Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, Z(e), this._moved || (this.fire("dragstart"), this._moved = !0, U(document.body, "leaflet-dragging"), this._lastTarget = e.target || e.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), U(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = e, this._updatePosition()));
					}
				}
			},
			_updatePosition: function() {
				var e = { originalEvent: this._lastEvent };
				this.fire("predrag", e), K(this._element, this._newPos), this.fire("drag", e);
			},
			_onUp: function() {
				this._enabled && this.finishDrag();
			},
			finishDrag: function(e) {
				W(document.body, "leaflet-dragging"), this._lastTarget &&= (W(this._lastTarget, "leaflet-drag-target"), null), X(document, "mousemove touchmove", this._onMove, this), X(document, "mouseup touchend touchcancel", this._onUp, this), Ft(), Mt();
				var t = this._moved && this._moving;
				this._moving = !1, vn._dragging = !1, t && this.fire("dragend", {
					noInertia: e,
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
		});
		function yn(e, t, n) {
			for (var r, i = [
				1,
				4,
				2,
				8
			], a = 0, o, s, c, l, u = e.length, d, f; a < u; a++) e[a]._code = Mn(e[a], t);
			for (s = 0; s < 4; s++) {
				for (d = i[s], r = [], a = 0, u = e.length, o = u - 1; a < u; o = a++) c = e[a], l = e[o], c._code & d ? l._code & d || (f = jn(l, c, d, t, n), f._code = Mn(f, t), r.push(f)) : (l._code & d && (f = jn(l, c, d, t, n), f._code = Mn(f, t), r.push(f)), r.push(c));
				e = r;
			}
			return e;
		}
		function bn(e, t) {
			var n, r, i, a, o, s, c, l, u;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			$(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var d = A([0, 0]), f = O(e);
			f.getNorthWest().distanceTo(f.getSouthWest()) * f.getNorthEast().distanceTo(f.getNorthWest()) < 1700 && (d = xn(e));
			var p = e.length, m = [];
			for (n = 0; n < p; n++) {
				var h = A(e[n]);
				m.push(t.project(A([h.lat - d.lat, h.lng - d.lng])));
			}
			for (s = c = l = 0, n = 0, r = p - 1; n < p; r = n++) i = m[n], a = m[r], o = i.y * a.x - a.y * i.x, c += (i.x + a.x) * o, l += (i.y + a.y) * o, s += o * 3;
			u = s === 0 ? m[0] : [c / s, l / s];
			var g = t.unproject(w(u));
			return A([g.lat + d.lat, g.lng + d.lng]);
		}
		function xn(e) {
			for (var t = 0, n = 0, r = 0, i = 0; i < e.length; i++) {
				var a = A(e[i]);
				t += a.lat, n += a.lng, r++;
			}
			return A([t / r, n / r]);
		}
		var Sn = {
			__proto__: null,
			clipPolygon: yn,
			polygonCenter: bn,
			centroid: xn
		};
		function Cn(e, t) {
			if (!t || !e.length) return e.slice();
			var n = t * t;
			return e = On(e, n), e = En(e, n), e;
		}
		function wn(e, t, n) {
			return Math.sqrt(Pn(e, t, n, !0));
		}
		function Tn(e, t, n) {
			return Pn(e, t, n);
		}
		function En(e, t) {
			var n = e.length, r = new (typeof Uint8Array < "u" ? Uint8Array : Array)(n);
			r[0] = r[n - 1] = 1, Dn(e, r, t, 0, n - 1);
			var i, a = [];
			for (i = 0; i < n; i++) r[i] && a.push(e[i]);
			return a;
		}
		function Dn(e, t, n, r, i) {
			for (var a = 0, o, s = r + 1, c; s <= i - 1; s++) c = Pn(e[s], e[r], e[i], !0), c > a && (o = s, a = c);
			a > n && (t[o] = 1, Dn(e, t, n, r, o), Dn(e, t, n, o, i));
		}
		function On(e, t) {
			for (var n = [e[0]], r = 1, i = 0, a = e.length; r < a; r++) Nn(e[r], e[i]) > t && (n.push(e[r]), i = r);
			return i < a - 1 && n.push(e[a - 1]), n;
		}
		var kn;
		function An(e, t, n, r, i) {
			var a = r ? kn : Mn(e, n), o = Mn(t, n), s, c, l;
			for (kn = o;;) {
				if (!(a | o)) return [e, t];
				if (a & o) return !1;
				s = a || o, c = jn(e, t, s, n, i), l = Mn(c, n), s === a ? (e = c, a = l) : (t = c, o = l);
			}
		}
		function jn(e, t, n, r, i) {
			var a = t.x - e.x, o = t.y - e.y, s = r.min, c = r.max, l, u;
			return n & 8 ? (l = e.x + a * (c.y - e.y) / o, u = c.y) : n & 4 ? (l = e.x + a * (s.y - e.y) / o, u = s.y) : n & 2 ? (l = c.x, u = e.y + o * (c.x - e.x) / a) : n & 1 && (l = s.x, u = e.y + o * (s.x - e.x) / a), new C(l, u, i);
		}
		function Mn(e, t) {
			var n = 0;
			return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n;
		}
		function Nn(e, t) {
			var n = t.x - e.x, r = t.y - e.y;
			return n * n + r * r;
		}
		function Pn(e, t, n, r) {
			var i = t.x, a = t.y, o = n.x - i, s = n.y - a, c = o * o + s * s, l;
			return c > 0 && (l = ((e.x - i) * o + (e.y - a) * s) / c, l > 1 ? (i = n.x, a = n.y) : l > 0 && (i += o * l, a += s * l)), o = e.x - i, s = e.y - a, r ? o * o + s * s : new C(i, a);
		}
		function $(e) {
			return !_(e[0]) || typeof e[0][0] != "object" && e[0][0] !== void 0;
		}
		function Fn(e) {
			return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), $(e);
		}
		function In(e, t) {
			var n, r, i, a, o, s, c, l;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			$(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var u = A([0, 0]), d = O(e);
			d.getNorthWest().distanceTo(d.getSouthWest()) * d.getNorthEast().distanceTo(d.getNorthWest()) < 1700 && (u = xn(e));
			var f = e.length, p = [];
			for (n = 0; n < f; n++) {
				var m = A(e[n]);
				p.push(t.project(A([m.lat - u.lat, m.lng - u.lng])));
			}
			for (n = 0, r = 0; n < f - 1; n++) r += p[n].distanceTo(p[n + 1]) / 2;
			if (r === 0) l = p[0];
			else for (n = 0, a = 0; n < f - 1; n++) if (o = p[n], s = p[n + 1], i = o.distanceTo(s), a += i, a > r) {
				c = (a - r) / i, l = [s.x - c * (s.x - o.x), s.y - c * (s.y - o.y)];
				break;
			}
			var h = t.unproject(w(l));
			return A([h.lat + u.lat, h.lng + u.lng]);
		}
		var Ln = {
			__proto__: null,
			simplify: Cn,
			pointToSegmentDistance: wn,
			closestPointOnSegment: Tn,
			clipSegment: An,
			_getEdgeIntersection: jn,
			_getBitCode: Mn,
			_sqClosestPointOnSegment: Pn,
			isFlat: $,
			_flat: Fn,
			polylineCenter: In
		}, Rn = {
			project: function(e) {
				return new C(e.lng, e.lat);
			},
			unproject: function(e) {
				return new k(e.y, e.x);
			},
			bounds: new T([-180, -90], [180, 90])
		}, zn = {
			R: 6378137,
			R_MINOR: 6356752.314245179,
			bounds: new T([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
			project: function(e) {
				var t = Math.PI / 180, n = this.R, r = e.lat * t, i = this.R_MINOR / n, a = Math.sqrt(1 - i * i), o = a * Math.sin(r), s = Math.tan(Math.PI / 4 - r / 2) / ((1 - o) / (1 + o)) ** (a / 2);
				return r = -n * Math.log(Math.max(s, 1e-10)), new C(e.lng * t * n, r);
			},
			unproject: function(e) {
				for (var t = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, i = Math.sqrt(1 - r * r), a = Math.exp(-e.y / n), o = Math.PI / 2 - 2 * Math.atan(a), s = 0, c = .1, l; s < 15 && Math.abs(c) > 1e-7; s++) l = i * Math.sin(o), l = ((1 - l) / (1 + l)) ** (i / 2), c = Math.PI / 2 - 2 * Math.atan(a * l) - o, o += c;
				return new k(o * t, e.x * t / n);
			}
		}, Bn = {
			__proto__: null,
			LonLat: Rn,
			Mercator: zn,
			SphericalMercator: N
		}, Vn = n({}, M, {
			code: "EPSG:3395",
			projection: zn,
			transformation: function() {
				var e = .5 / (Math.PI * zn.R);
				return fe(e, .5, -e, .5);
			}()
		}), Hn = n({}, M, {
			code: "EPSG:4326",
			projection: Rn,
			transformation: fe(1 / 180, 1, -1 / 180, .5)
		}), Un = n({}, j, {
			projection: Rn,
			transformation: fe(1, 0, -1, 0),
			scale: function(e) {
				return 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e) / Math.LN2;
			},
			distance: function(e, t) {
				var n = t.lng - e.lng, r = t.lat - e.lat;
				return Math.sqrt(n * n + r * r);
			},
			infinite: !0
		});
		j.Earth = M, j.EPSG3395 = Vn, j.EPSG3857 = P, j.EPSG900913 = pe, j.EPSG4326 = Hn, j.Simple = Un;
		var Wn = ce.extend({
			options: {
				pane: "overlayPane",
				attribution: null,
				bubblingMouseEvents: !0
			},
			addTo: function(e) {
				return e.addLayer(this), this;
			},
			remove: function() {
				return this.removeFrom(this._map || this._mapToAdd);
			},
			removeFrom: function(e) {
				return e && e.removeLayer(this), this;
			},
			getPane: function(e) {
				return this._map.getPane(e ? this.options[e] || e : this.options.pane);
			},
			addInteractiveTarget: function(e) {
				return this._map._targets[o(e)] = this, this;
			},
			removeInteractiveTarget: function(e) {
				return delete this._map._targets[o(e)], this;
			},
			getAttribution: function() {
				return this.options.attribution;
			},
			_layerAdd: function(e) {
				var t = e.target;
				if (t.hasLayer(this)) {
					if (this._map = t, this._zoomAnimated = t._zoomAnimated, this.getEvents) {
						var n = this.getEvents();
						t.on(n, this), this.once("remove", function() {
							t.off(n, this);
						}, this);
					}
					this.onAdd(t), this.fire("add"), t.fire("layeradd", { layer: this });
				}
			}
		});
		Q.include({
			addLayer: function(e) {
				if (!e._layerAdd) throw Error("The provided object is not a Layer.");
				var t = o(e);
				return this._layers[t] || (this._layers[t] = e, e._mapToAdd = this, e.beforeAdd && e.beforeAdd(this), this.whenReady(e._layerAdd, e)), this;
			},
			removeLayer: function(e) {
				var t = o(e);
				return this._layers[t] && (this._loaded && e.onRemove(this), delete this._layers[t], this._loaded && (this.fire("layerremove", { layer: e }), e.fire("remove")), e._map = e._mapToAdd = null), this;
			},
			hasLayer: function(e) {
				return o(e) in this._layers;
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			_addLayers: function(e) {
				e = e ? _(e) ? e : [e] : [];
				for (var t = 0, n = e.length; t < n; t++) this.addLayer(e[t]);
			},
			_addZoomLimit: function(e) {
				isNaN(e.options.maxZoom) && isNaN(e.options.minZoom) || (this._zoomBoundLayers[o(e)] = e, this._updateZoomLevels());
			},
			_removeZoomLimit: function(e) {
				var t = o(e);
				this._zoomBoundLayers[t] && (delete this._zoomBoundLayers[t], this._updateZoomLevels());
			},
			_updateZoomLevels: function() {
				var e = Infinity, t = -Infinity, n = this._getZoomSpan();
				for (var r in this._zoomBoundLayers) {
					var i = this._zoomBoundLayers[r].options;
					e = i.minZoom === void 0 ? e : Math.min(e, i.minZoom), t = i.maxZoom === void 0 ? t : Math.max(t, i.maxZoom);
				}
				this._layersMaxZoom = t === -Infinity ? void 0 : t, this._layersMinZoom = e === Infinity ? void 0 : e, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
			}
		});
		var Gn = Wn.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {};
				var n, r;
				if (e) for (n = 0, r = e.length; n < r; n++) this.addLayer(e[n]);
			},
			addLayer: function(e) {
				var t = this.getLayerId(e);
				return this._layers[t] = e, this._map && this._map.addLayer(e), this;
			},
			removeLayer: function(e) {
				var t = e in this._layers ? e : this.getLayerId(e);
				return this._map && this._layers[t] && this._map.removeLayer(this._layers[t]), delete this._layers[t], this;
			},
			hasLayer: function(e) {
				return (typeof e == "number" ? e : this.getLayerId(e)) in this._layers;
			},
			clearLayers: function() {
				return this.eachLayer(this.removeLayer, this);
			},
			invoke: function(e) {
				var t = Array.prototype.slice.call(arguments, 1), n, r;
				for (n in this._layers) r = this._layers[n], r[e] && r[e].apply(r, t);
				return this;
			},
			onAdd: function(e) {
				this.eachLayer(e.addLayer, e);
			},
			onRemove: function(e) {
				this.eachLayer(e.removeLayer, e);
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			getLayer: function(e) {
				return this._layers[e];
			},
			getLayers: function() {
				var e = [];
				return this.eachLayer(e.push, e), e;
			},
			setZIndex: function(e) {
				return this.invoke("setZIndex", e);
			},
			getLayerId: function(e) {
				return o(e);
			}
		}), Kn = function(e, t) {
			return new Gn(e, t);
		}, qn = Gn.extend({
			addLayer: function(e) {
				return this.hasLayer(e) ? this : (e.addEventParent(this), Gn.prototype.addLayer.call(this, e), this.fire("layeradd", { layer: e }));
			},
			removeLayer: function(e) {
				return this.hasLayer(e) ? (e in this._layers && (e = this._layers[e]), e.removeEventParent(this), Gn.prototype.removeLayer.call(this, e), this.fire("layerremove", { layer: e })) : this;
			},
			setStyle: function(e) {
				return this.invoke("setStyle", e);
			},
			bringToFront: function() {
				return this.invoke("bringToFront");
			},
			bringToBack: function() {
				return this.invoke("bringToBack");
			},
			getBounds: function() {
				var e = new D();
				for (var t in this._layers) {
					var n = this._layers[t];
					e.extend(n.getBounds ? n.getBounds() : n.getLatLng());
				}
				return e;
			}
		}), Jn = function(e, t) {
			return new qn(e, t);
		}, Yn = x.extend({
			options: {
				popupAnchor: [0, 0],
				tooltipAnchor: [0, 0],
				crossOrigin: !1
			},
			initialize: function(e) {
				p(this, e);
			},
			createIcon: function(e) {
				return this._createIcon("icon", e);
			},
			createShadow: function(e) {
				return this._createIcon("shadow", e);
			},
			_createIcon: function(e, t) {
				var n = this._getIconUrl(e);
				if (!n) {
					if (e === "icon") throw Error("iconUrl not set in Icon options (see the docs).");
					return null;
				}
				var r = this._createImg(n, t && t.tagName === "IMG" ? t : null);
				return this._setIconStyles(r, e), (this.options.crossOrigin || this.options.crossOrigin === "") && (r.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), r;
			},
			_setIconStyles: function(e, t) {
				var n = this.options, r = n[t + "Size"];
				typeof r == "number" && (r = [r, r]);
				var i = w(r), a = w(t === "shadow" && n.shadowAnchor || n.iconAnchor || i && i.divideBy(2, !0));
				e.className = "leaflet-marker-" + t + " " + (n.className || ""), a && (e.style.marginLeft = -a.x + "px", e.style.marginTop = -a.y + "px"), i && (e.style.width = i.x + "px", e.style.height = i.y + "px");
			},
			_createImg: function(e, t) {
				return t ||= document.createElement("img"), t.src = e, t;
			},
			_getIconUrl: function(e) {
				return z.retina && this.options[e + "RetinaUrl"] || this.options[e + "Url"];
			}
		});
		function Xn(e) {
			return new Yn(e);
		}
		var Zn = Yn.extend({
			options: {
				iconUrl: "marker-icon.png",
				iconRetinaUrl: "marker-icon-2x.png",
				shadowUrl: "marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16, -28],
				shadowSize: [41, 41]
			},
			_getIconUrl: function(e) {
				return typeof Zn.imagePath != "string" && (Zn.imagePath = this._detectIconPath()), (this.options.imagePath || Zn.imagePath) + Yn.prototype._getIconUrl.call(this, e);
			},
			_stripUrl: function(e) {
				var t = function(e, t, n) {
					var r = t.exec(e);
					return r && r[n];
				};
				return e = t(e, /^url\((['"])?(.+)\1\)$/, 2), e && t(e, /^(.*)marker-icon\.png$/, 1);
			},
			_detectIconPath: function() {
				var e = V("div", "leaflet-default-icon-path", document.body), t = bt(e, "background-image") || bt(e, "backgroundImage");
				if (document.body.removeChild(e), t = this._stripUrl(t), t) return t;
				var n = document.querySelector("link[href$=\"leaflet.css\"]");
				return n ? n.href.substring(0, n.href.length - 11 - 1) : "";
			}
		}), Qn = hn.extend({
			initialize: function(e) {
				this._marker = e;
			},
			addHooks: function() {
				var e = this._marker._icon;
				this._draggable ||= new vn(e, e, !0), this._draggable.on({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).enable(), U(e, "leaflet-marker-draggable");
			},
			removeHooks: function() {
				this._draggable.off({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).disable(), this._marker._icon && W(this._marker._icon, "leaflet-marker-draggable");
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			_adjustPan: function(e) {
				var t = this._marker, n = t._map, r = this._marker.options.autoPanSpeed, i = this._marker.options.autoPanPadding, a = At(t._icon), o = n.getPixelBounds(), s = n.getPixelOrigin(), c = E(o.min._subtract(s).add(i), o.max._subtract(s).subtract(i));
				if (!c.contains(a)) {
					var l = w((Math.max(c.max.x, a.x) - c.max.x) / (o.max.x - c.max.x) - (Math.min(c.min.x, a.x) - c.min.x) / (o.min.x - c.min.x), (Math.max(c.max.y, a.y) - c.max.y) / (o.max.y - c.max.y) - (Math.min(c.min.y, a.y) - c.min.y) / (o.min.y - c.min.y)).multiplyBy(r);
					n.panBy(l, { animate: !1 }), this._draggable._newPos._add(l), this._draggable._startPos._add(l), K(t._icon, this._draggable._newPos), this._onDrag(e), this._panRequest = y(this._adjustPan.bind(this, e));
				}
			},
			_onDragStart: function() {
				this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
			},
			_onPreDrag: function(e) {
				this._marker.options.autoPan && (b(this._panRequest), this._panRequest = y(this._adjustPan.bind(this, e)));
			},
			_onDrag: function(e) {
				var t = this._marker, n = t._shadow, r = At(t._icon), i = t._map.layerPointToLatLng(r);
				n && K(n, r), t._latlng = i, e.latlng = i, e.oldLatLng = this._oldLatLng, t.fire("move", e).fire("drag", e);
			},
			_onDragEnd: function(e) {
				b(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", e);
			}
		}), $n = Wn.extend({
			options: {
				icon: new Zn(),
				interactive: !0,
				keyboard: !0,
				title: "",
				alt: "Marker",
				zIndexOffset: 0,
				opacity: 1,
				riseOnHover: !1,
				riseOffset: 250,
				pane: "markerPane",
				shadowPane: "shadowPane",
				bubblingMouseEvents: !1,
				autoPanOnFocus: !0,
				draggable: !1,
				autoPan: !1,
				autoPanPadding: [50, 50],
				autoPanSpeed: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = A(e);
			},
			onAdd: function(e) {
				this._zoomAnimated = this._zoomAnimated && e.options.markerZoomAnimation, this._zoomAnimated && e.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
			},
			onRemove: function(e) {
				this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && e.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
			},
			getEvents: function() {
				return {
					zoom: this.update,
					viewreset: this.update
				};
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = A(e), this.update(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			setZIndexOffset: function(e) {
				return this.options.zIndexOffset = e, this.update();
			},
			getIcon: function() {
				return this.options.icon;
			},
			setIcon: function(e) {
				return this.options.icon = e, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
			},
			getElement: function() {
				return this._icon;
			},
			update: function() {
				if (this._icon && this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng).round();
					this._setPos(e);
				}
				return this;
			},
			_initIcon: function() {
				var e = this.options, t = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), n = e.icon.createIcon(this._icon), r = !1;
				n !== this._icon && (this._icon && this._removeIcon(), r = !0, e.title && (n.title = e.title), n.tagName === "IMG" && (n.alt = e.alt || "")), U(n, t), e.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, e.riseOnHover && this.on({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && Y(n, "focus", this._panOnFocus, this);
				var i = e.icon.createShadow(this._shadow), a = !1;
				i !== this._shadow && (this._removeShadow(), a = !0), i && (U(i, t), i.alt = ""), this._shadow = i, e.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), i && a && this.getPane(e.shadowPane).appendChild(this._shadow);
			},
			_removeIcon: function() {
				this.options.riseOnHover && this.off({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && X(this._icon, "focus", this._panOnFocus, this), H(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
			},
			_removeShadow: function() {
				this._shadow && H(this._shadow), this._shadow = null;
			},
			_setPos: function(e) {
				this._icon && K(this._icon, e), this._shadow && K(this._shadow, e), this._zIndex = e.y + this.options.zIndexOffset, this._resetZIndex();
			},
			_updateZIndex: function(e) {
				this._icon && (this._icon.style.zIndex = this._zIndex + e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center).round();
				this._setPos(t);
			},
			_initInteraction: function() {
				if (this.options.interactive && (U(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Qn)) {
					var e = this.options.draggable;
					this.dragging && (e = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Qn(this), e && this.dragging.enable();
				}
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._map && this._updateOpacity(), this;
			},
			_updateOpacity: function() {
				var e = this.options.opacity;
				this._icon && G(this._icon, e), this._shadow && G(this._shadow, e);
			},
			_bringToFront: function() {
				this._updateZIndex(this.options.riseOffset);
			},
			_resetZIndex: function() {
				this._updateZIndex(0);
			},
			_panOnFocus: function() {
				var e = this._map;
				if (e) {
					var t = this.options.icon.options, n = t.iconSize ? w(t.iconSize) : w(0, 0), r = t.iconAnchor ? w(t.iconAnchor) : w(0, 0);
					e.panInside(this._latlng, {
						paddingTopLeft: r,
						paddingBottomRight: n.subtract(r)
					});
				}
			},
			_getPopupAnchor: function() {
				return this.options.icon.options.popupAnchor;
			},
			_getTooltipAnchor: function() {
				return this.options.icon.options.tooltipAnchor;
			}
		});
		function er(e, t) {
			return new $n(e, t);
		}
		var tr = Wn.extend({
			options: {
				stroke: !0,
				color: "#3388ff",
				weight: 3,
				opacity: 1,
				lineCap: "round",
				lineJoin: "round",
				dashArray: null,
				dashOffset: null,
				fill: !1,
				fillColor: null,
				fillOpacity: .2,
				fillRule: "evenodd",
				interactive: !0,
				bubblingMouseEvents: !0
			},
			beforeAdd: function(e) {
				this._renderer = e.getRenderer(this);
			},
			onAdd: function() {
				this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
			},
			onRemove: function() {
				this._renderer._removePath(this);
			},
			redraw: function() {
				return this._map && this._renderer._updatePath(this), this;
			},
			setStyle: function(e) {
				return p(this, e), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && e && Object.prototype.hasOwnProperty.call(e, "weight") && this._updateBounds()), this;
			},
			bringToFront: function() {
				return this._renderer && this._renderer._bringToFront(this), this;
			},
			bringToBack: function() {
				return this._renderer && this._renderer._bringToBack(this), this;
			},
			getElement: function() {
				return this._path;
			},
			_reset: function() {
				this._project(), this._update();
			},
			_clickTolerance: function() {
				return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
			}
		}), nr = tr.extend({
			options: {
				fill: !0,
				radius: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = A(e), this._radius = this.options.radius;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = A(e), this.redraw(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			getLatLng: function() {
				return this._latlng;
			},
			setRadius: function(e) {
				return this.options.radius = this._radius = e, this.redraw();
			},
			getRadius: function() {
				return this._radius;
			},
			setStyle: function(e) {
				var t = e && e.radius || this._radius;
				return tr.prototype.setStyle.call(this, e), this.setRadius(t), this;
			},
			_project: function() {
				this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
			},
			_updateBounds: function() {
				var e = this._radius, t = this._radiusY || e, n = this._clickTolerance(), r = [e + n, t + n];
				this._pxBounds = new T(this._point.subtract(r), this._point.add(r));
			},
			_update: function() {
				this._map && this._updatePath();
			},
			_updatePath: function() {
				this._renderer._updateCircle(this);
			},
			_empty: function() {
				return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
			},
			_containsPoint: function(e) {
				return e.distanceTo(this._point) <= this._radius + this._clickTolerance();
			}
		});
		function rr(e, t) {
			return new nr(e, t);
		}
		var ir = nr.extend({
			initialize: function(e, t, r) {
				if (typeof t == "number" && (t = n({}, r, { radius: t })), p(this, t), this._latlng = A(e), isNaN(this.options.radius)) throw Error("Circle radius cannot be NaN");
				this._mRadius = this.options.radius;
			},
			setRadius: function(e) {
				return this._mRadius = e, this.redraw();
			},
			getRadius: function() {
				return this._mRadius;
			},
			getBounds: function() {
				var e = [this._radius, this._radiusY || this._radius];
				return new D(this._map.layerPointToLatLng(this._point.subtract(e)), this._map.layerPointToLatLng(this._point.add(e)));
			},
			setStyle: tr.prototype.setStyle,
			_project: function() {
				var e = this._latlng.lng, t = this._latlng.lat, n = this._map, r = n.options.crs;
				if (r.distance === M.distance) {
					var i = Math.PI / 180, a = this._mRadius / M.R / i, o = n.project([t + a, e]), s = n.project([t - a, e]), c = o.add(s).divideBy(2), l = n.unproject(c).lat, u = Math.acos((Math.cos(a * i) - Math.sin(t * i) * Math.sin(l * i)) / (Math.cos(t * i) * Math.cos(l * i))) / i;
					(isNaN(u) || u === 0) && (u = a / Math.cos(Math.PI / 180 * t)), this._point = c.subtract(n.getPixelOrigin()), this._radius = isNaN(u) ? 0 : c.x - n.project([l, e - u]).x, this._radiusY = c.y - o.y;
				} else {
					var d = r.unproject(r.project(this._latlng).subtract([this._mRadius, 0]));
					this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(d).x;
				}
				this._updateBounds();
			}
		});
		function ar(e, t, n) {
			return new ir(e, t, n);
		}
		var or = tr.extend({
			options: {
				smoothFactor: 1,
				noClip: !1
			},
			initialize: function(e, t) {
				p(this, t), this._setLatLngs(e);
			},
			getLatLngs: function() {
				return this._latlngs;
			},
			setLatLngs: function(e) {
				return this._setLatLngs(e), this.redraw();
			},
			isEmpty: function() {
				return !this._latlngs.length;
			},
			closestLayerPoint: function(e) {
				for (var t = Infinity, n = null, r = Pn, i, a, o = 0, s = this._parts.length; o < s; o++) for (var c = this._parts[o], l = 1, u = c.length; l < u; l++) {
					i = c[l - 1], a = c[l];
					var d = r(e, i, a, !0);
					d < t && (t = d, n = r(e, i, a));
				}
				return n && (n.distance = Math.sqrt(t)), n;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return In(this._defaultShape(), this._map.options.crs);
			},
			getBounds: function() {
				return this._bounds;
			},
			addLatLng: function(e, t) {
				return t ||= this._defaultShape(), e = A(e), t.push(e), this._bounds.extend(e), this.redraw();
			},
			_setLatLngs: function(e) {
				this._bounds = new D(), this._latlngs = this._convertLatLngs(e);
			},
			_defaultShape: function() {
				return $(this._latlngs) ? this._latlngs : this._latlngs[0];
			},
			_convertLatLngs: function(e) {
				for (var t = [], n = $(e), r = 0, i = e.length; r < i; r++) n ? (t[r] = A(e[r]), this._bounds.extend(t[r])) : t[r] = this._convertLatLngs(e[r]);
				return t;
			},
			_project: function() {
				var e = new T();
				this._rings = [], this._projectLatlngs(this._latlngs, this._rings, e), this._bounds.isValid() && e.isValid() && (this._rawPxBounds = e, this._updateBounds());
			},
			_updateBounds: function() {
				var e = this._clickTolerance(), t = new C(e, e);
				this._rawPxBounds && (this._pxBounds = new T([this._rawPxBounds.min.subtract(t), this._rawPxBounds.max.add(t)]));
			},
			_projectLatlngs: function(e, t, n) {
				var r = e[0] instanceof k, i = e.length, a, o;
				if (r) {
					for (o = [], a = 0; a < i; a++) o[a] = this._map.latLngToLayerPoint(e[a]), n.extend(o[a]);
					t.push(o);
				} else for (a = 0; a < i; a++) this._projectLatlngs(e[a], t, n);
			},
			_clipPoints: function() {
				var e = this._renderer._bounds;
				if (this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var t = this._parts, n = 0, r, i = 0, a = this._rings.length, o, s, c; n < a; n++) for (c = this._rings[n], r = 0, o = c.length; r < o - 1; r++) s = An(c[r], c[r + 1], e, r, !0), s && (t[i] = t[i] || [], t[i].push(s[0]), (s[1] !== c[r + 1] || r === o - 2) && (t[i].push(s[1]), i++));
				}
			},
			_simplifyPoints: function() {
				for (var e = this._parts, t = this.options.smoothFactor, n = 0, r = e.length; n < r; n++) e[n] = Cn(e[n], t);
			},
			_update: function() {
				this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
			},
			_updatePath: function() {
				this._renderer._updatePoly(this);
			},
			_containsPoint: function(e, t) {
				var n, r, i, a, o, s, c = this._clickTolerance();
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (n = 0, a = this._parts.length; n < a; n++) for (s = this._parts[n], r = 0, o = s.length, i = o - 1; r < o; i = r++) if ((t || r !== 0) && wn(e, s[i], s[r]) <= c) return !0;
				return !1;
			}
		});
		function sr(e, t) {
			return new or(e, t);
		}
		or._flat = Fn;
		var cr = or.extend({
			options: { fill: !0 },
			isEmpty: function() {
				return !this._latlngs.length || !this._latlngs[0].length;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return bn(this._defaultShape(), this._map.options.crs);
			},
			_convertLatLngs: function(e) {
				var t = or.prototype._convertLatLngs.call(this, e), n = t.length;
				return n >= 2 && t[0] instanceof k && t[0].equals(t[n - 1]) && t.pop(), t;
			},
			_setLatLngs: function(e) {
				or.prototype._setLatLngs.call(this, e), $(this._latlngs) && (this._latlngs = [this._latlngs]);
			},
			_defaultShape: function() {
				return $(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
			},
			_clipPoints: function() {
				var e = this._renderer._bounds, t = this.options.weight, n = new C(t, t);
				if (e = new T(e.min.subtract(n), e.max.add(n)), this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var r = 0, i = this._rings.length, a; r < i; r++) a = yn(this._rings[r], e, !0), a.length && this._parts.push(a);
				}
			},
			_updatePath: function() {
				this._renderer._updatePoly(this, !0);
			},
			_containsPoint: function(e) {
				var t = !1, n, r, i, a, o, s, c, l;
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (a = 0, c = this._parts.length; a < c; a++) for (n = this._parts[a], o = 0, l = n.length, s = l - 1; o < l; s = o++) r = n[o], i = n[s], r.y > e.y != i.y > e.y && e.x < (i.x - r.x) * (e.y - r.y) / (i.y - r.y) + r.x && (t = !t);
				return t || or.prototype._containsPoint.call(this, e, !0);
			}
		});
		function lr(e, t) {
			return new cr(e, t);
		}
		var ur = qn.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {}, e && this.addData(e);
			},
			addData: function(e) {
				var t = _(e) ? e : e.features, n, r, i;
				if (t) {
					for (n = 0, r = t.length; n < r; n++) i = t[n], (i.geometries || i.geometry || i.features || i.coordinates) && this.addData(i);
					return this;
				}
				var a = this.options;
				if (a.filter && !a.filter(e)) return this;
				var o = dr(e, a);
				return o ? (o.feature = vr(e), o.defaultOptions = o.options, this.resetStyle(o), a.onEachFeature && a.onEachFeature(e, o), this.addLayer(o)) : this;
			},
			resetStyle: function(e) {
				return e === void 0 ? this.eachLayer(this.resetStyle, this) : (e.options = n({}, e.defaultOptions), this._setLayerStyle(e, this.options.style), this);
			},
			setStyle: function(e) {
				return this.eachLayer(function(t) {
					this._setLayerStyle(t, e);
				}, this);
			},
			_setLayerStyle: function(e, t) {
				e.setStyle && (typeof t == "function" && (t = t(e.feature)), e.setStyle(t));
			}
		});
		function dr(e, t) {
			var n = e.type === "Feature" ? e.geometry : e, r = n ? n.coordinates : null, i = [], a = t && t.pointToLayer, o = t && t.coordsToLatLng || pr, s, c, l, u;
			if (!r && !n) return null;
			switch (n.type) {
				case "Point": return s = o(r), fr(a, e, s, t);
				case "MultiPoint":
					for (l = 0, u = r.length; l < u; l++) s = o(r[l]), i.push(fr(a, e, s, t));
					return new qn(i);
				case "LineString":
				case "MultiLineString": return c = mr(r, n.type === "LineString" ? 0 : 1, o), new or(c, t);
				case "Polygon":
				case "MultiPolygon": return c = mr(r, n.type === "Polygon" ? 1 : 2, o), new cr(c, t);
				case "GeometryCollection":
					for (l = 0, u = n.geometries.length; l < u; l++) {
						var d = dr({
							geometry: n.geometries[l],
							type: "Feature",
							properties: e.properties
						}, t);
						d && i.push(d);
					}
					return new qn(i);
				case "FeatureCollection":
					for (l = 0, u = n.features.length; l < u; l++) {
						var f = dr(n.features[l], t);
						f && i.push(f);
					}
					return new qn(i);
				default: throw Error("Invalid GeoJSON object.");
			}
		}
		function fr(e, t, n, r) {
			return e ? e(t, n) : new $n(n, r && r.markersInheritOptions && r);
		}
		function pr(e) {
			return new k(e[1], e[0], e[2]);
		}
		function mr(e, t, n) {
			for (var r = [], i = 0, a = e.length, o; i < a; i++) o = t ? mr(e[i], t - 1, n) : (n || pr)(e[i]), r.push(o);
			return r;
		}
		function hr(e, t) {
			return e = A(e), e.alt === void 0 ? [u(e.lng, t), u(e.lat, t)] : [
				u(e.lng, t),
				u(e.lat, t),
				u(e.alt, t)
			];
		}
		function gr(e, t, n, r) {
			for (var i = [], a = 0, o = e.length; a < o; a++) i.push(t ? gr(e[a], $(e[a]) ? 0 : t - 1, n, r) : hr(e[a], r));
			return !t && n && i.length > 0 && i.push(i[0].slice()), i;
		}
		function _r(e, t) {
			return e.feature ? n({}, e.feature, { geometry: t }) : vr(t);
		}
		function vr(e) {
			return e.type === "Feature" || e.type === "FeatureCollection" ? e : {
				type: "Feature",
				properties: {},
				geometry: e
			};
		}
		var yr = { toGeoJSON: function(e) {
			return _r(this, {
				type: "Point",
				coordinates: hr(this.getLatLng(), e)
			});
		} };
		$n.include(yr), ir.include(yr), nr.include(yr), or.include({ toGeoJSON: function(e) {
			var t = !$(this._latlngs), n = gr(this._latlngs, +!!t, !1, e);
			return _r(this, {
				type: (t ? "Multi" : "") + "LineString",
				coordinates: n
			});
		} }), cr.include({ toGeoJSON: function(e) {
			var t = !$(this._latlngs), n = t && !$(this._latlngs[0]), r = gr(this._latlngs, n ? 2 : +!!t, !0, e);
			return t || (r = [r]), _r(this, {
				type: (n ? "Multi" : "") + "Polygon",
				coordinates: r
			});
		} }), Gn.include({
			toMultiPoint: function(e) {
				var t = [];
				return this.eachLayer(function(n) {
					t.push(n.toGeoJSON(e).geometry.coordinates);
				}), _r(this, {
					type: "MultiPoint",
					coordinates: t
				});
			},
			toGeoJSON: function(e) {
				var t = this.feature && this.feature.geometry && this.feature.geometry.type;
				if (t === "MultiPoint") return this.toMultiPoint(e);
				var n = t === "GeometryCollection", r = [];
				return this.eachLayer(function(t) {
					if (t.toGeoJSON) {
						var i = t.toGeoJSON(e);
						if (n) r.push(i.geometry);
						else {
							var a = vr(i);
							a.type === "FeatureCollection" ? r.push.apply(r, a.features) : r.push(a);
						}
					}
				}), n ? _r(this, {
					geometries: r,
					type: "GeometryCollection"
				}) : {
					type: "FeatureCollection",
					features: r
				};
			}
		});
		function br(e, t) {
			return new ur(e, t);
		}
		var xr = br, Sr = Wn.extend({
			options: {
				opacity: 1,
				alt: "",
				interactive: !1,
				crossOrigin: !1,
				errorOverlayUrl: "",
				zIndex: 1,
				className: ""
			},
			initialize: function(e, t, n) {
				this._url = e, this._bounds = O(t), p(this, n);
			},
			onAdd: function() {
				this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (U(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
			},
			onRemove: function() {
				H(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._image && this._updateOpacity(), this;
			},
			setStyle: function(e) {
				return e.opacity && this.setOpacity(e.opacity), this;
			},
			bringToFront: function() {
				return this._map && St(this._image), this;
			},
			bringToBack: function() {
				return this._map && Ct(this._image), this;
			},
			setUrl: function(e) {
				return this._url = e, this._image && (this._image.src = e), this;
			},
			setBounds: function(e) {
				return this._bounds = O(e), this._map && this._reset(), this;
			},
			getEvents: function() {
				var e = {
					zoom: this._reset,
					viewreset: this._reset
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			getBounds: function() {
				return this._bounds;
			},
			getElement: function() {
				return this._image;
			},
			_initImage: function() {
				var e = this._url.tagName === "IMG", t = this._image = e ? this._url : V("img");
				U(t, "leaflet-image-layer"), this._zoomAnimated && U(t, "leaflet-zoom-animated"), this.options.className && U(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onload = i(this.fire, this, "load"), t.onerror = i(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (t.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), e ? this._url = t.src : (t.src = this._url, t.alt = this.options.alt);
			},
			_animateZoom: function(e) {
				var t = this._map.getZoomScale(e.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
				kt(this._image, n, t);
			},
			_reset: function() {
				var e = this._image, t = new T(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), n = t.getSize();
				K(e, t.min), e.style.width = n.x + "px", e.style.height = n.y + "px";
			},
			_updateOpacity: function() {
				G(this._image, this.options.opacity);
			},
			_updateZIndex: function() {
				this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
			},
			_overlayOnError: function() {
				this.fire("error");
				var e = this.options.errorOverlayUrl;
				e && this._url !== e && (this._url = e, this._image.src = e);
			},
			getCenter: function() {
				return this._bounds.getCenter();
			}
		}), Cr = function(e, t, n) {
			return new Sr(e, t, n);
		}, wr = Sr.extend({
			options: {
				autoplay: !0,
				loop: !0,
				keepAspectRatio: !0,
				muted: !1,
				playsInline: !0
			},
			_initImage: function() {
				var e = this._url.tagName === "VIDEO", t = this._image = e ? this._url : V("video");
				if (U(t, "leaflet-image-layer"), this._zoomAnimated && U(t, "leaflet-zoom-animated"), this.options.className && U(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onloadeddata = i(this.fire, this, "load"), e) {
					for (var n = t.getElementsByTagName("source"), r = [], a = 0; a < n.length; a++) r.push(n[a].src);
					this._url = n.length > 0 ? r : [t.src];
				} else {
					_(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(t.style, "objectFit") && (t.style.objectFit = "fill"), t.autoplay = !!this.options.autoplay, t.loop = !!this.options.loop, t.muted = !!this.options.muted, t.playsInline = !!this.options.playsInline;
					for (var o = 0; o < this._url.length; o++) {
						var s = V("source");
						s.src = this._url[o], t.appendChild(s);
					}
				}
			}
		});
		function Tr(e, t, n) {
			return new wr(e, t, n);
		}
		var Er = Sr.extend({ _initImage: function() {
			var e = this._image = this._url;
			U(e, "leaflet-image-layer"), this._zoomAnimated && U(e, "leaflet-zoom-animated"), this.options.className && U(e, this.options.className), e.onselectstart = l, e.onmousemove = l;
		} });
		function Dr(e, t, n) {
			return new Er(e, t, n);
		}
		var Or = Wn.extend({
			options: {
				interactive: !1,
				offset: [0, 0],
				className: "",
				pane: void 0,
				content: ""
			},
			initialize: function(e, t) {
				e && (e instanceof k || _(e)) ? (this._latlng = A(e), p(this, t)) : (p(this, e), this._source = t), this.options.content && (this._content = this.options.content);
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, e.hasLayer(this) || e.addLayer(this), this;
			},
			close: function() {
				return this._map && this._map.removeLayer(this), this;
			},
			toggle: function(e) {
				return this._map ? this.close() : (arguments.length ? this._source = e : e = this._source, this._prepareOpen(), this.openOn(e._map)), this;
			},
			onAdd: function(e) {
				this._zoomAnimated = e._zoomAnimated, this._container || this._initLayout(), e._fadeAnimated && G(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), e._fadeAnimated && G(this._container, 1), this.bringToFront(), this.options.interactive && (U(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
			},
			onRemove: function(e) {
				e._fadeAnimated ? (G(this._container, 0), this._removeTimeout = setTimeout(i(H, void 0, this._container), 200)) : H(this._container), this.options.interactive && (W(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				return this._latlng = A(e), this._map && (this._updatePosition(), this._adjustPan()), this;
			},
			getContent: function() {
				return this._content;
			},
			setContent: function(e) {
				return this._content = e, this.update(), this;
			},
			getElement: function() {
				return this._container;
			},
			update: function() {
				this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
			},
			getEvents: function() {
				var e = {
					zoom: this._updatePosition,
					viewreset: this._updatePosition
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			isOpen: function() {
				return !!this._map && this._map.hasLayer(this);
			},
			bringToFront: function() {
				return this._map && St(this._container), this;
			},
			bringToBack: function() {
				return this._map && Ct(this._container), this;
			},
			_prepareOpen: function(e) {
				var t = this._source;
				if (!t._map) return !1;
				if (t instanceof qn) {
					t = null;
					var n = this._source._layers;
					for (var r in n) if (n[r]._map) {
						t = n[r];
						break;
					}
					if (!t) return !1;
					this._source = t;
				}
				if (!e) {
					if (t.getCenter) e = t.getCenter();
					else if (t.getLatLng) e = t.getLatLng();
					else if (t.getBounds) e = t.getBounds().getCenter();
					else throw Error("Unable to get source layer LatLng.");
				}
				return this.setLatLng(e), this._map && this.update(), !0;
			},
			_updateContent: function() {
				if (this._content) {
					var e = this._contentNode, t = typeof this._content == "function" ? this._content(this._source || this) : this._content;
					if (typeof t == "string") e.innerHTML = t;
					else {
						for (; e.hasChildNodes();) e.removeChild(e.firstChild);
						e.appendChild(t);
					}
					this.fire("contentupdate");
				}
			},
			_updatePosition: function() {
				if (this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng), t = w(this.options.offset), n = this._getAnchor();
					this._zoomAnimated ? K(this._container, e.add(n)) : t = t.add(e).add(n);
					var r = this._containerBottom = -t.y, i = this._containerLeft = -Math.round(this._containerWidth / 2) + t.x;
					this._container.style.bottom = r + "px", this._container.style.left = i + "px";
				}
			},
			_getAnchor: function() {
				return [0, 0];
			}
		});
		Q.include({ _initOverlay: function(e, t, n, r) {
			var i = t;
			return i instanceof e || (i = new e(r).setContent(t)), n && i.setLatLng(n), i;
		} }), Wn.include({ _initOverlay: function(e, t, n, r) {
			var i = n;
			return i instanceof e ? (p(i, r), i._source = this) : (i = t && !r ? t : new e(r, this), i.setContent(n)), i;
		} });
		var kr = Or.extend({
			options: {
				pane: "popupPane",
				offset: [0, 7],
				maxWidth: 300,
				minWidth: 50,
				maxHeight: null,
				autoPan: !0,
				autoPanPaddingTopLeft: null,
				autoPanPaddingBottomRight: null,
				autoPanPadding: [5, 5],
				keepInView: !1,
				closeButton: !0,
				autoClose: !0,
				closeOnEscapeKey: !0,
				className: ""
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, !e.hasLayer(this) && e._popup && e._popup.options.autoClose && e.removeLayer(e._popup), e._popup = this, Or.prototype.openOn.call(this, e);
			},
			onAdd: function(e) {
				Or.prototype.onAdd.call(this, e), e.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof tr || this._source.on("preclick", qt));
			},
			onRemove: function(e) {
				Or.prototype.onRemove.call(this, e), e.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof tr || this._source.off("preclick", qt));
			},
			getEvents: function() {
				var e = Or.prototype.getEvents.call(this);
				return (this.options.closeOnClick === void 0 ? this._map.options.closePopupOnClick : this.options.closeOnClick) && (e.preclick = this.close), this.options.keepInView && (e.moveend = this._adjustPan), e;
			},
			_initLayout: function() {
				var e = "leaflet-popup", t = this._container = V("div", e + " " + (this.options.className || "") + " leaflet-zoom-animated"), n = this._wrapper = V("div", e + "-content-wrapper", t);
				if (this._contentNode = V("div", e + "-content", n), Yt(t), Jt(this._contentNode), Y(t, "contextmenu", qt), this._tipContainer = V("div", e + "-tip-container", t), this._tip = V("div", e + "-tip", this._tipContainer), this.options.closeButton) {
					var r = this._closeButton = V("a", e + "-close-button", t);
					r.setAttribute("role", "button"), r.setAttribute("aria-label", "Close popup"), r.href = "#close", r.innerHTML = "<span aria-hidden=\"true\">&#215;</span>", Y(r, "click", function(e) {
						Z(e), this.close();
					}, this);
				}
			},
			_updateLayout: function() {
				var e = this._contentNode, t = e.style;
				t.width = "", t.whiteSpace = "nowrap";
				var n = e.offsetWidth;
				n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), t.width = n + 1 + "px", t.whiteSpace = "", t.height = "";
				var r = e.offsetHeight, i = this.options.maxHeight, a = "leaflet-popup-scrolled";
				i && r > i ? (t.height = i + "px", U(e, a)) : W(e, a), this._containerWidth = this._container.offsetWidth;
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), n = this._getAnchor();
				K(this._container, t.add(n));
			},
			_adjustPan: function() {
				if (this.options.autoPan) {
					if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) this._autopanning = !1;
					else {
						var e = this._map, t = parseInt(bt(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + t, r = this._containerWidth, i = new C(this._containerLeft, -n - this._containerBottom);
						i._add(At(this._container));
						var a = e.layerPointToContainerPoint(i), o = w(this.options.autoPanPadding), s = w(this.options.autoPanPaddingTopLeft || o), c = w(this.options.autoPanPaddingBottomRight || o), l = e.getSize(), u = 0, d = 0;
						a.x + r + c.x > l.x && (u = a.x + r - l.x + c.x), a.x - u - s.x < 0 && (u = a.x - s.x), a.y + n + c.y > l.y && (d = a.y + n - l.y + c.y), a.y - d - s.y < 0 && (d = a.y - s.y), (u || d) && (this.options.keepInView && (this._autopanning = !0), e.fire("autopanstart").panBy([u, d]));
					}
				}
			},
			_getAnchor: function() {
				return w(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
			}
		}), Ar = function(e, t) {
			return new kr(e, t);
		};
		Q.mergeOptions({ closePopupOnClick: !0 }), Q.include({
			openPopup: function(e, t, n) {
				return this._initOverlay(kr, e, t, n).openOn(this), this;
			},
			closePopup: function(e) {
				return e = arguments.length ? e : this._popup, e && e.close(), this;
			}
		}), Wn.include({
			bindPopup: function(e, t) {
				return this._popup = this._initOverlay(kr, this._popup, e, t), this._popupHandlersAdded ||= (this.on({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), !0), this;
			},
			unbindPopup: function() {
				return this._popup &&= (this.off({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), this._popupHandlersAdded = !1, null), this;
			},
			openPopup: function(e) {
				return this._popup && (this instanceof qn || (this._popup._source = this), this._popup._prepareOpen(e || this._latlng) && this._popup.openOn(this._map)), this;
			},
			closePopup: function() {
				return this._popup && this._popup.close(), this;
			},
			togglePopup: function() {
				return this._popup && this._popup.toggle(this), this;
			},
			isPopupOpen: function() {
				return this._popup ? this._popup.isOpen() : !1;
			},
			setPopupContent: function(e) {
				return this._popup && this._popup.setContent(e), this;
			},
			getPopup: function() {
				return this._popup;
			},
			_openPopup: function(e) {
				if (this._popup && this._map) {
					Xt(e);
					var t = e.layer || e.target;
					this._popup._source === t && !(t instanceof tr) ? this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(e.latlng) : (this._popup._source = t, this.openPopup(e.latlng));
				}
			},
			_movePopup: function(e) {
				this._popup.setLatLng(e.latlng);
			},
			_onKeyPress: function(e) {
				e.originalEvent.keyCode === 13 && this._openPopup(e);
			}
		});
		var jr = Or.extend({
			options: {
				pane: "tooltipPane",
				offset: [0, 0],
				direction: "auto",
				permanent: !1,
				sticky: !1,
				opacity: .9
			},
			onAdd: function(e) {
				Or.prototype.onAdd.call(this, e), this.setOpacity(this.options.opacity), e.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
			},
			onRemove: function(e) {
				Or.prototype.onRemove.call(this, e), e.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
			},
			getEvents: function() {
				var e = Or.prototype.getEvents.call(this);
				return this.options.permanent || (e.preclick = this.close), e;
			},
			_initLayout: function() {
				var e = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
				this._contentNode = this._container = V("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + o(this));
			},
			_updateLayout: function() {},
			_adjustPan: function() {},
			_setPosition: function(e) {
				var t, n, r = this._map, i = this._container, a = r.latLngToContainerPoint(r.getCenter()), o = r.layerPointToContainerPoint(e), s = this.options.direction, c = i.offsetWidth, l = i.offsetHeight, u = w(this.options.offset), d = this._getAnchor();
				s === "top" ? (t = c / 2, n = l) : s === "bottom" ? (t = c / 2, n = 0) : s === "center" ? (t = c / 2, n = l / 2) : s === "right" ? (t = 0, n = l / 2) : s === "left" ? (t = c, n = l / 2) : o.x < a.x ? (s = "right", t = 0, n = l / 2) : (s = "left", t = c + (u.x + d.x) * 2, n = l / 2), e = e.subtract(w(t, n, !0)).add(u).add(d), W(i, "leaflet-tooltip-right"), W(i, "leaflet-tooltip-left"), W(i, "leaflet-tooltip-top"), W(i, "leaflet-tooltip-bottom"), U(i, "leaflet-tooltip-" + s), K(i, e);
			},
			_updatePosition: function() {
				var e = this._map.latLngToLayerPoint(this._latlng);
				this._setPosition(e);
			},
			setOpacity: function(e) {
				this.options.opacity = e, this._container && G(this._container, e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
				this._setPosition(t);
			},
			_getAnchor: function() {
				return w(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
			}
		}), Mr = function(e, t) {
			return new jr(e, t);
		};
		Q.include({
			openTooltip: function(e, t, n) {
				return this._initOverlay(jr, e, t, n).openOn(this), this;
			},
			closeTooltip: function(e) {
				return e.close(), this;
			}
		}), Wn.include({
			bindTooltip: function(e, t) {
				return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(jr, this._tooltip, e, t), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
			},
			unbindTooltip: function() {
				return this._tooltip &&= (this._initTooltipInteractions(!0), this.closeTooltip(), null), this;
			},
			_initTooltipInteractions: function(e) {
				if (e || !this._tooltipHandlersAdded) {
					var t = e ? "off" : "on", n = {
						remove: this.closeTooltip,
						move: this._moveTooltip
					};
					this._tooltip.options.permanent ? n.add = this._openTooltip : (n.mouseover = this._openTooltip, n.mouseout = this.closeTooltip, n.click = this._openTooltip, this._map ? this._addFocusListeners() : n.add = this._addFocusListeners), this._tooltip.options.sticky && (n.mousemove = this._moveTooltip), this[t](n), this._tooltipHandlersAdded = !e;
				}
			},
			openTooltip: function(e) {
				return this._tooltip && (this instanceof qn || (this._tooltip._source = this), this._tooltip._prepareOpen(e) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
			},
			closeTooltip: function() {
				if (this._tooltip) return this._tooltip.close();
			},
			toggleTooltip: function() {
				return this._tooltip && this._tooltip.toggle(this), this;
			},
			isTooltipOpen: function() {
				return this._tooltip.isOpen();
			},
			setTooltipContent: function(e) {
				return this._tooltip && this._tooltip.setContent(e), this;
			},
			getTooltip: function() {
				return this._tooltip;
			},
			_addFocusListeners: function() {
				this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
			},
			_addFocusListenersOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && (Y(t, "focus", function() {
					this._tooltip._source = e, this.openTooltip();
				}, this), Y(t, "blur", this.closeTooltip, this));
			},
			_setAriaDescribedByOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && t.setAttribute("aria-describedby", this._tooltip._container.id);
			},
			_openTooltip: function(e) {
				if (this._tooltip && this._map) {
					if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
						this._openOnceFlag = !0;
						var t = this;
						this._map.once("moveend", function() {
							t._openOnceFlag = !1, t._openTooltip(e);
						});
					} else this._tooltip._source = e.layer || e.target, this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
				}
			},
			_moveTooltip: function(e) {
				var t = e.latlng, n, r;
				this._tooltip.options.sticky && e.originalEvent && (n = this._map.mouseEventToContainerPoint(e.originalEvent), r = this._map.containerPointToLayerPoint(n), t = this._map.layerPointToLatLng(r)), this._tooltip.setLatLng(t);
			}
		});
		var Nr = Yn.extend({
			options: {
				iconSize: [12, 12],
				html: !1,
				bgPos: null,
				className: "leaflet-div-icon"
			},
			createIcon: function(e) {
				var t = e && e.tagName === "DIV" ? e : document.createElement("div"), n = this.options;
				if (n.html instanceof Element ? (xt(t), t.appendChild(n.html)) : t.innerHTML = n.html === !1 ? "" : n.html, n.bgPos) {
					var r = w(n.bgPos);
					t.style.backgroundPosition = -r.x + "px " + -r.y + "px";
				}
				return this._setIconStyles(t, "icon"), t;
			},
			createShadow: function() {
				return null;
			}
		});
		function Pr(e) {
			return new Nr(e);
		}
		Yn.Default = Zn;
		var Fr = Wn.extend({
			options: {
				tileSize: 256,
				opacity: 1,
				updateWhenIdle: z.mobile,
				updateWhenZooming: !0,
				updateInterval: 200,
				zIndex: 1,
				bounds: null,
				minZoom: 0,
				maxZoom: void 0,
				maxNativeZoom: void 0,
				minNativeZoom: void 0,
				noWrap: !1,
				pane: "tilePane",
				className: "",
				keepBuffer: 2
			},
			initialize: function(e) {
				p(this, e);
			},
			onAdd: function() {
				this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
			},
			beforeAdd: function(e) {
				e._addZoomLimit(this);
			},
			onRemove: function(e) {
				this._removeAllTiles(), H(this._container), e._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
			},
			bringToFront: function() {
				return this._map && (St(this._container), this._setAutoZIndex(Math.max)), this;
			},
			bringToBack: function() {
				return this._map && (Ct(this._container), this._setAutoZIndex(Math.min)), this;
			},
			getContainer: function() {
				return this._container;
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._updateOpacity(), this;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			isLoading: function() {
				return this._loading;
			},
			redraw: function() {
				if (this._map) {
					this._removeAllTiles();
					var e = this._clampZoom(this._map.getZoom());
					e !== this._tileZoom && (this._tileZoom = e, this._updateLevels()), this._update();
				}
				return this;
			},
			getEvents: function() {
				var e = {
					viewprereset: this._invalidateAll,
					viewreset: this._resetView,
					zoom: this._resetView,
					moveend: this._onMoveEnd
				};
				return this.options.updateWhenIdle || (this._onMove ||= s(this._onMoveEnd, this.options.updateInterval, this), e.move = this._onMove), this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			createTile: function() {
				return document.createElement("div");
			},
			getTileSize: function() {
				var e = this.options.tileSize;
				return e instanceof C ? e : new C(e, e);
			},
			_updateZIndex: function() {
				this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
			},
			_setAutoZIndex: function(e) {
				for (var t = this.getPane().children, n = -e(-Infinity, Infinity), r = 0, i = t.length, a; r < i; r++) a = t[r].style.zIndex, t[r] !== this._container && a && (n = e(n, +a));
				isFinite(n) && (this.options.zIndex = n + e(-1, 1), this._updateZIndex());
			},
			_updateOpacity: function() {
				if (this._map && !z.ielt9) {
					G(this._container, this.options.opacity);
					var e = +/* @__PURE__ */ new Date(), t = !1, n = !1;
					for (var r in this._tiles) {
						var i = this._tiles[r];
						if (i.current && i.loaded) {
							var a = Math.min(1, (e - i.loaded) / 200);
							G(i.el, a), a < 1 ? t = !0 : (i.active ? n = !0 : this._onOpaqueTile(i), i.active = !0);
						}
					}
					n && !this._noPrune && this._pruneTiles(), t && (b(this._fadeFrame), this._fadeFrame = y(this._updateOpacity, this));
				}
			},
			_onOpaqueTile: l,
			_initContainer: function() {
				this._container || (this._container = V("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
			},
			_updateLevels: function() {
				var e = this._tileZoom, t = this.options.maxZoom;
				if (e !== void 0) {
					for (var n in this._levels) n = Number(n), this._levels[n].el.children.length || n === e ? (this._levels[n].el.style.zIndex = t - Math.abs(e - n), this._onUpdateLevel(n)) : (H(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
					var r = this._levels[e], i = this._map;
					return r || (r = this._levels[e] = {}, r.el = V("div", "leaflet-tile-container leaflet-zoom-animated", this._container), r.el.style.zIndex = t, r.origin = i.project(i.unproject(i.getPixelOrigin()), e).round(), r.zoom = e, this._setZoomTransform(r, i.getCenter(), i.getZoom()), r.el.offsetWidth, this._onCreateLevel(r)), this._level = r, r;
				}
			},
			_onUpdateLevel: l,
			_onRemoveLevel: l,
			_onCreateLevel: l,
			_pruneTiles: function() {
				if (this._map) {
					var e, t, n = this._map.getZoom();
					if (n > this.options.maxZoom || n < this.options.minZoom) this._removeAllTiles();
					else {
						for (e in this._tiles) t = this._tiles[e], t.retain = t.current;
						for (e in this._tiles) if (t = this._tiles[e], t.current && !t.active) {
							var r = t.coords;
							this._retainParent(r.x, r.y, r.z, r.z - 5) || this._retainChildren(r.x, r.y, r.z, r.z + 2);
						}
						for (e in this._tiles) this._tiles[e].retain || this._removeTile(e);
					}
				}
			},
			_removeTilesAtZoom: function(e) {
				for (var t in this._tiles) this._tiles[t].coords.z === e && this._removeTile(t);
			},
			_removeAllTiles: function() {
				for (var e in this._tiles) this._removeTile(e);
			},
			_invalidateAll: function() {
				for (var e in this._levels) H(this._levels[e].el), this._onRemoveLevel(Number(e)), delete this._levels[e];
				this._removeAllTiles(), this._tileZoom = void 0;
			},
			_retainParent: function(e, t, n, r) {
				var i = Math.floor(e / 2), a = Math.floor(t / 2), o = n - 1, s = new C(+i, +a);
				s.z = +o;
				var c = this._tileCoordsToKey(s), l = this._tiles[c];
				return l && l.active ? (l.retain = !0, !0) : (l && l.loaded && (l.retain = !0), o > r && this._retainParent(i, a, o, r));
			},
			_retainChildren: function(e, t, n, r) {
				for (var i = 2 * e; i < 2 * e + 2; i++) for (var a = 2 * t; a < 2 * t + 2; a++) {
					var o = new C(i, a);
					o.z = n + 1;
					var s = this._tileCoordsToKey(o), c = this._tiles[s];
					c && c.active ? c.retain = !0 : (c && c.loaded && (c.retain = !0), n + 1 < r && this._retainChildren(i, a, n + 1, r));
				}
			},
			_resetView: function(e) {
				var t = e && (e.pinch || e.flyTo);
				this._setView(this._map.getCenter(), this._map.getZoom(), t, t);
			},
			_animateZoom: function(e) {
				this._setView(e.center, e.zoom, !0, e.noUpdate);
			},
			_clampZoom: function(e) {
				var t = this.options;
				return t.minNativeZoom !== void 0 && e < t.minNativeZoom ? t.minNativeZoom : t.maxNativeZoom !== void 0 && t.maxNativeZoom < e ? t.maxNativeZoom : e;
			},
			_setView: function(e, t, n, r) {
				var i = Math.round(t);
				i = this.options.maxZoom !== void 0 && i > this.options.maxZoom || this.options.minZoom !== void 0 && i < this.options.minZoom ? void 0 : this._clampZoom(i);
				var a = this.options.updateWhenZooming && i !== this._tileZoom;
				(!r || a) && (this._tileZoom = i, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), i !== void 0 && this._update(e), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(e, t);
			},
			_setZoomTransforms: function(e, t) {
				for (var n in this._levels) this._setZoomTransform(this._levels[n], e, t);
			},
			_setZoomTransform: function(e, t, n) {
				var r = this._map.getZoomScale(n, e.zoom), i = e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t, n)).round();
				z.any3d ? kt(e.el, i, r) : K(e.el, i);
			},
			_resetGrid: function() {
				var e = this._map, t = e.options.crs, n = this._tileSize = this.getTileSize(), r = this._tileZoom, i = this._map.getPixelWorldBounds(this._tileZoom);
				i && (this._globalTileRange = this._pxBoundsToTileRange(i)), this._wrapX = t.wrapLng && !this.options.noWrap && [Math.floor(e.project([0, t.wrapLng[0]], r).x / n.x), Math.ceil(e.project([0, t.wrapLng[1]], r).x / n.y)], this._wrapY = t.wrapLat && !this.options.noWrap && [Math.floor(e.project([t.wrapLat[0], 0], r).y / n.x), Math.ceil(e.project([t.wrapLat[1], 0], r).y / n.y)];
			},
			_onMoveEnd: function() {
				this._map && !this._map._animatingZoom && this._update();
			},
			_getTiledPixelBounds: function(e) {
				var t = this._map, n = t._animatingZoom ? Math.max(t._animateToZoom, t.getZoom()) : t.getZoom(), r = t.getZoomScale(n, this._tileZoom), i = t.project(e, this._tileZoom).floor(), a = t.getSize().divideBy(r * 2);
				return new T(i.subtract(a), i.add(a));
			},
			_update: function(e) {
				var t = this._map;
				if (t) {
					var n = this._clampZoom(t.getZoom());
					if (e === void 0 && (e = t.getCenter()), this._tileZoom !== void 0) {
						var r = this._getTiledPixelBounds(e), i = this._pxBoundsToTileRange(r), a = i.getCenter(), o = [], s = this.options.keepBuffer, c = new T(i.getBottomLeft().subtract([s, -s]), i.getTopRight().add([s, -s]));
						if (!(isFinite(i.min.x) && isFinite(i.min.y) && isFinite(i.max.x) && isFinite(i.max.y))) throw Error("Attempted to load an infinite number of tiles");
						for (var l in this._tiles) {
							var u = this._tiles[l].coords;
							u.z === this._tileZoom && c.contains(new C(u.x, u.y)) || (this._tiles[l].current = !1);
						}
						if (Math.abs(n - this._tileZoom) > 1) this._setView(e, n);
						else {
							for (var d = i.min.y; d <= i.max.y; d++) for (var f = i.min.x; f <= i.max.x; f++) {
								var p = new C(f, d);
								if (p.z = this._tileZoom, this._isValidTile(p)) {
									var m = this._tiles[this._tileCoordsToKey(p)];
									m ? m.current = !0 : o.push(p);
								}
							}
							if (o.sort(function(e, t) {
								return e.distanceTo(a) - t.distanceTo(a);
							}), o.length !== 0) {
								this._loading || (this._loading = !0, this.fire("loading"));
								var h = document.createDocumentFragment();
								for (f = 0; f < o.length; f++) this._addTile(o[f], h);
								this._level.el.appendChild(h);
							}
						}
					}
				}
			},
			_isValidTile: function(e) {
				var t = this._map.options.crs;
				if (!t.infinite) {
					var n = this._globalTileRange;
					if (!t.wrapLng && (e.x < n.min.x || e.x > n.max.x) || !t.wrapLat && (e.y < n.min.y || e.y > n.max.y)) return !1;
				}
				if (!this.options.bounds) return !0;
				var r = this._tileCoordsToBounds(e);
				return O(this.options.bounds).overlaps(r);
			},
			_keyToBounds: function(e) {
				return this._tileCoordsToBounds(this._keyToTileCoords(e));
			},
			_tileCoordsToNwSe: function(e) {
				var t = this._map, n = this.getTileSize(), r = e.scaleBy(n), i = r.add(n);
				return [t.unproject(r, e.z), t.unproject(i, e.z)];
			},
			_tileCoordsToBounds: function(e) {
				var t = this._tileCoordsToNwSe(e), n = new D(t[0], t[1]);
				return this.options.noWrap || (n = this._map.wrapLatLngBounds(n)), n;
			},
			_tileCoordsToKey: function(e) {
				return e.x + ":" + e.y + ":" + e.z;
			},
			_keyToTileCoords: function(e) {
				var t = e.split(":"), n = new C(+t[0], +t[1]);
				return n.z = +t[2], n;
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				t && (H(t.el), delete this._tiles[e], this.fire("tileunload", {
					tile: t.el,
					coords: this._keyToTileCoords(e)
				}));
			},
			_initTile: function(e) {
				U(e, "leaflet-tile");
				var t = this.getTileSize();
				e.style.width = t.x + "px", e.style.height = t.y + "px", e.onselectstart = l, e.onmousemove = l, z.ielt9 && this.options.opacity < 1 && G(e, this.options.opacity);
			},
			_addTile: function(e, t) {
				var n = this._getTilePos(e), r = this._tileCoordsToKey(e), a = this.createTile(this._wrapCoords(e), i(this._tileReady, this, e));
				this._initTile(a), this.createTile.length < 2 && y(i(this._tileReady, this, e, null, a)), K(a, n), this._tiles[r] = {
					el: a,
					coords: e,
					current: !0
				}, t.appendChild(a), this.fire("tileloadstart", {
					tile: a,
					coords: e
				});
			},
			_tileReady: function(e, t, n) {
				t && this.fire("tileerror", {
					error: t,
					tile: n,
					coords: e
				});
				var r = this._tileCoordsToKey(e);
				n = this._tiles[r], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (G(n.el, 0), b(this._fadeFrame), this._fadeFrame = y(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), t || (U(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
					tile: n.el,
					coords: e
				})), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), z.ielt9 || !this._map._fadeAnimated ? y(this._pruneTiles, this) : setTimeout(i(this._pruneTiles, this), 250)));
			},
			_getTilePos: function(e) {
				return e.scaleBy(this.getTileSize()).subtract(this._level.origin);
			},
			_wrapCoords: function(e) {
				var t = new C(this._wrapX ? c(e.x, this._wrapX) : e.x, this._wrapY ? c(e.y, this._wrapY) : e.y);
				return t.z = e.z, t;
			},
			_pxBoundsToTileRange: function(e) {
				var t = this.getTileSize();
				return new T(e.min.unscaleBy(t).floor(), e.max.unscaleBy(t).ceil().subtract([1, 1]));
			},
			_noTilesToLoad: function() {
				for (var e in this._tiles) if (!this._tiles[e].loaded) return !1;
				return !0;
			}
		});
		function Ir(e) {
			return new Fr(e);
		}
		var Lr = Fr.extend({
			options: {
				minZoom: 0,
				maxZoom: 18,
				subdomains: "abc",
				errorTileUrl: "",
				zoomOffset: 0,
				tms: !1,
				zoomReverse: !1,
				detectRetina: !1,
				crossOrigin: !1,
				referrerPolicy: !1
			},
			initialize: function(e, t) {
				this._url = e, t = p(this, t), t.detectRetina && z.retina && t.maxZoom > 0 ? (t.tileSize = Math.floor(t.tileSize / 2), t.zoomReverse ? (t.zoomOffset--, t.minZoom = Math.min(t.maxZoom, t.minZoom + 1)) : (t.zoomOffset++, t.maxZoom = Math.max(t.minZoom, t.maxZoom - 1)), t.minZoom = Math.max(0, t.minZoom)) : t.zoomReverse ? t.minZoom = Math.min(t.maxZoom, t.minZoom) : t.maxZoom = Math.max(t.minZoom, t.maxZoom), typeof t.subdomains == "string" && (t.subdomains = t.subdomains.split("")), this.on("tileunload", this._onTileRemove);
			},
			setUrl: function(e, t) {
				return this._url === e && t === void 0 && (t = !0), this._url = e, t || this.redraw(), this;
			},
			createTile: function(e, t) {
				var n = document.createElement("img");
				return Y(n, "load", i(this._tileOnLoad, this, t, n)), Y(n, "error", i(this._tileOnError, this, t, n)), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (n.referrerPolicy = this.options.referrerPolicy), n.alt = "", n.src = this.getTileUrl(e), n;
			},
			getTileUrl: function(e) {
				var t = {
					r: z.retina ? "@2x" : "",
					s: this._getSubdomain(e),
					x: e.x,
					y: e.y,
					z: this._getZoomForUrl()
				};
				if (this._map && !this._map.options.crs.infinite) {
					var r = this._globalTileRange.max.y - e.y;
					this.options.tms && (t.y = r), t["-y"] = r;
				}
				return g(this._url, n(t, this.options));
			},
			_tileOnLoad: function(e, t) {
				z.ielt9 ? setTimeout(i(e, this, null, t), 0) : e(null, t);
			},
			_tileOnError: function(e, t, n) {
				var r = this.options.errorTileUrl;
				r && t.getAttribute("src") !== r && (t.src = r), e(n, t);
			},
			_onTileRemove: function(e) {
				e.tile.onload = null;
			},
			_getZoomForUrl: function() {
				var e = this._tileZoom, t = this.options.maxZoom, n = this.options.zoomReverse, r = this.options.zoomOffset;
				return n && (e = t - e), e + r;
			},
			_getSubdomain: function(e) {
				var t = Math.abs(e.x + e.y) % this.options.subdomains.length;
				return this.options.subdomains[t];
			},
			_abortLoading: function() {
				var e, t;
				for (e in this._tiles) if (this._tiles[e].coords.z !== this._tileZoom && (t = this._tiles[e].el, t.onload = l, t.onerror = l, !t.complete)) {
					t.src = v;
					var n = this._tiles[e].coords;
					H(t), delete this._tiles[e], this.fire("tileabort", {
						tile: t,
						coords: n
					});
				}
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				if (t) return t.el.setAttribute("src", v), Fr.prototype._removeTile.call(this, e);
			},
			_tileReady: function(e, t, n) {
				if (!(!this._map || n && n.getAttribute("src") === v)) return Fr.prototype._tileReady.call(this, e, t, n);
			}
		});
		function Rr(e, t) {
			return new Lr(e, t);
		}
		var zr = Lr.extend({
			defaultWmsParams: {
				service: "WMS",
				request: "GetMap",
				layers: "",
				styles: "",
				format: "image/jpeg",
				transparent: !1,
				version: "1.1.1"
			},
			options: {
				crs: null,
				uppercase: !1
			},
			initialize: function(e, t) {
				this._url = e;
				var r = n({}, this.defaultWmsParams);
				for (var i in t) i in this.options || (r[i] = t[i]);
				t = p(this, t);
				var a = t.detectRetina && z.retina ? 2 : 1, o = this.getTileSize();
				r.width = o.x * a, r.height = o.y * a, this.wmsParams = r;
			},
			onAdd: function(e) {
				this._crs = this.options.crs || e.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
				var t = this._wmsVersion >= 1.3 ? "crs" : "srs";
				this.wmsParams[t] = this._crs.code, Lr.prototype.onAdd.call(this, e);
			},
			getTileUrl: function(e) {
				var t = this._tileCoordsToNwSe(e), n = this._crs, r = E(n.project(t[0]), n.project(t[1])), i = r.min, a = r.max, o = (this._wmsVersion >= 1.3 && this._crs === Hn ? [
					i.y,
					i.x,
					a.y,
					a.x
				] : [
					i.x,
					i.y,
					a.x,
					a.y
				]).join(","), s = Lr.prototype.getTileUrl.call(this, e);
				return s + m(this.wmsParams, s, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + o;
			},
			setParams: function(e, t) {
				return n(this.wmsParams, e), t || this.redraw(), this;
			}
		});
		function Br(e, t) {
			return new zr(e, t);
		}
		Lr.WMS = zr, Rr.wms = Br;
		var Vr = Wn.extend({
			options: { padding: .1 },
			initialize: function(e) {
				p(this, e), o(this), this._layers = this._layers || {};
			},
			onAdd: function() {
				this._container || (this._initContainer(), U(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
			},
			onRemove: function() {
				this.off("update", this._updatePaths, this), this._destroyContainer();
			},
			getEvents: function() {
				var e = {
					viewreset: this._reset,
					zoom: this._onZoom,
					moveend: this._update,
					zoomend: this._onZoomEnd
				};
				return this._zoomAnimated && (e.zoomanim = this._onAnimZoom), e;
			},
			_onAnimZoom: function(e) {
				this._updateTransform(e.center, e.zoom);
			},
			_onZoom: function() {
				this._updateTransform(this._map.getCenter(), this._map.getZoom());
			},
			_updateTransform: function(e, t) {
				var n = this._map.getZoomScale(t, this._zoom), r = this._map.getSize().multiplyBy(.5 + this.options.padding), i = this._map.project(this._center, t), a = r.multiplyBy(-n).add(i).subtract(this._map._getNewPixelOrigin(e, t));
				z.any3d ? kt(this._container, a, n) : K(this._container, a);
			},
			_reset: function() {
				for (var e in this._update(), this._updateTransform(this._center, this._zoom), this._layers) this._layers[e]._reset();
			},
			_onZoomEnd: function() {
				for (var e in this._layers) this._layers[e]._project();
			},
			_updatePaths: function() {
				for (var e in this._layers) this._layers[e]._update();
			},
			_update: function() {
				var e = this.options.padding, t = this._map.getSize(), n = this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();
				this._bounds = new T(n, n.add(t.multiplyBy(1 + e * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
			}
		}), Hr = Vr.extend({
			options: { tolerance: 0 },
			getEvents: function() {
				var e = Vr.prototype.getEvents.call(this);
				return e.viewprereset = this._onViewPreReset, e;
			},
			_onViewPreReset: function() {
				this._postponeUpdatePaths = !0;
			},
			onAdd: function() {
				Vr.prototype.onAdd.call(this), this._draw();
			},
			_initContainer: function() {
				var e = this._container = document.createElement("canvas");
				Y(e, "mousemove", this._onMouseMove, this), Y(e, "click dblclick mousedown mouseup contextmenu", this._onClick, this), Y(e, "mouseout", this._handleMouseOut, this), e._leaflet_disable_events = !0, this._ctx = e.getContext("2d");
			},
			_destroyContainer: function() {
				b(this._redrawRequest), delete this._ctx, H(this._container), X(this._container), delete this._container;
			},
			_updatePaths: function() {
				if (!this._postponeUpdatePaths) {
					var e;
					for (var t in this._redrawBounds = null, this._layers) e = this._layers[t], e._update();
					this._redraw();
				}
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Vr.prototype._update.call(this);
					var e = this._bounds, t = this._container, n = e.getSize(), r = z.retina ? 2 : 1;
					K(t, e.min), t.width = r * n.x, t.height = r * n.y, t.style.width = n.x + "px", t.style.height = n.y + "px", z.retina && this._ctx.scale(2, 2), this._ctx.translate(-e.min.x, -e.min.y), this.fire("update");
				}
			},
			_reset: function() {
				Vr.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
			},
			_initPath: function(e) {
				this._updateDashArray(e), this._layers[o(e)] = e;
				var t = e._order = {
					layer: e,
					prev: this._drawLast,
					next: null
				};
				this._drawLast && (this._drawLast.next = t), this._drawLast = t, this._drawFirst = this._drawFirst || this._drawLast;
			},
			_addPath: function(e) {
				this._requestRedraw(e);
			},
			_removePath: function(e) {
				var t = e._order, n = t.next, r = t.prev;
				n ? n.prev = r : this._drawLast = r, r ? r.next = n : this._drawFirst = n, delete e._order, delete this._layers[o(e)], this._requestRedraw(e);
			},
			_updatePath: function(e) {
				this._extendRedrawBounds(e), e._project(), e._update(), this._requestRedraw(e);
			},
			_updateStyle: function(e) {
				this._updateDashArray(e), this._requestRedraw(e);
			},
			_updateDashArray: function(e) {
				if (typeof e.options.dashArray == "string") {
					for (var t = e.options.dashArray.split(/[, ]+/), n = [], r, i = 0; i < t.length; i++) {
						if (r = Number(t[i]), isNaN(r)) return;
						n.push(r);
					}
					e.options._dashArray = n;
				} else e.options._dashArray = e.options.dashArray;
			},
			_requestRedraw: function(e) {
				this._map && (this._extendRedrawBounds(e), this._redrawRequest = this._redrawRequest || y(this._redraw, this));
			},
			_extendRedrawBounds: function(e) {
				if (e._pxBounds) {
					var t = (e.options.weight || 0) + 1;
					this._redrawBounds = this._redrawBounds || new T(), this._redrawBounds.extend(e._pxBounds.min.subtract([t, t])), this._redrawBounds.extend(e._pxBounds.max.add([t, t]));
				}
			},
			_redraw: function() {
				this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
			},
			_clear: function() {
				var e = this._redrawBounds;
				if (e) {
					var t = e.getSize();
					this._ctx.clearRect(e.min.x, e.min.y, t.x, t.y);
				} else this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
			},
			_draw: function() {
				var e, t = this._redrawBounds;
				if (this._ctx.save(), t) {
					var n = t.getSize();
					this._ctx.beginPath(), this._ctx.rect(t.min.x, t.min.y, n.x, n.y), this._ctx.clip();
				}
				this._drawing = !0;
				for (var r = this._drawFirst; r; r = r.next) e = r.layer, (!t || e._pxBounds && e._pxBounds.intersects(t)) && e._updatePath();
				this._drawing = !1, this._ctx.restore();
			},
			_updatePoly: function(e, t) {
				if (this._drawing) {
					var n, r, i, a, o = e._parts, s = o.length, c = this._ctx;
					if (s) {
						for (c.beginPath(), n = 0; n < s; n++) {
							for (r = 0, i = o[n].length; r < i; r++) a = o[n][r], c[r ? "lineTo" : "moveTo"](a.x, a.y);
							t && c.closePath();
						}
						this._fillStroke(c, e);
					}
				}
			},
			_updateCircle: function(e) {
				if (this._drawing && !e._empty()) {
					var t = e._point, n = this._ctx, r = Math.max(Math.round(e._radius), 1), i = (Math.max(Math.round(e._radiusY), 1) || r) / r;
					i !== 1 && (n.save(), n.scale(1, i)), n.beginPath(), n.arc(t.x, t.y / i, r, 0, Math.PI * 2, !1), i !== 1 && n.restore(), this._fillStroke(n, e);
				}
			},
			_fillStroke: function(e, t) {
				var n = t.options;
				n.fill && (e.globalAlpha = n.fillOpacity, e.fillStyle = n.fillColor || n.color, e.fill(n.fillRule || "evenodd")), n.stroke && n.weight !== 0 && (e.setLineDash && e.setLineDash(t.options && t.options._dashArray || []), e.globalAlpha = n.opacity, e.lineWidth = n.weight, e.strokeStyle = n.color, e.lineCap = n.lineCap, e.lineJoin = n.lineJoin, e.stroke());
			},
			_onClick: function(e) {
				for (var t = this._map.mouseEventToLayerPoint(e), n, r, i = this._drawFirst; i; i = i.next) n = i.layer, n.options.interactive && n._containsPoint(t) && (e.type !== "click" && e.type !== "preclick" || !this._map._draggableMoved(n)) && (r = n);
				this._fireEvent(r ? [r] : !1, e);
			},
			_onMouseMove: function(e) {
				if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
					var t = this._map.mouseEventToLayerPoint(e);
					this._handleMouseHover(e, t);
				}
			},
			_handleMouseOut: function(e) {
				var t = this._hoveredLayer;
				t && (W(this._container, "leaflet-interactive"), this._fireEvent([t], e, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
			},
			_handleMouseHover: function(e, t) {
				if (!this._mouseHoverThrottled) {
					for (var n, r, a = this._drawFirst; a; a = a.next) n = a.layer, n.options.interactive && n._containsPoint(t) && (r = n);
					r !== this._hoveredLayer && (this._handleMouseOut(e), r && (U(this._container, "leaflet-interactive"), this._fireEvent([r], e, "mouseover"), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, e), this._mouseHoverThrottled = !0, setTimeout(i(function() {
						this._mouseHoverThrottled = !1;
					}, this), 32);
				}
			},
			_fireEvent: function(e, t, n) {
				this._map._fireDOMEvent(t, n || t.type, e);
			},
			_bringToFront: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (n) n.prev = r;
					else return;
					r ? r.next = n : n && (this._drawFirst = n), t.prev = this._drawLast, this._drawLast.next = t, t.next = null, this._drawLast = t, this._requestRedraw(e);
				}
			},
			_bringToBack: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (r) r.next = n;
					else return;
					n ? n.prev = r : r && (this._drawLast = r), t.prev = null, t.next = this._drawFirst, this._drawFirst.prev = t, this._drawFirst = t, this._requestRedraw(e);
				}
			}
		});
		function Ur(e) {
			return z.canvas ? new Hr(e) : null;
		}
		var Wr = (function() {
			try {
				return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(e) {
					return document.createElement("<lvml:" + e + " class=\"lvml\">");
				};
			} catch {}
			return function(e) {
				return document.createElement("<" + e + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"lvml\">");
			};
		})(), Gr = {
			_initContainer: function() {
				this._container = V("div", "leaflet-vml-container");
			},
			_update: function() {
				this._map._animatingZoom || (Vr.prototype._update.call(this), this.fire("update"));
			},
			_initPath: function(e) {
				var t = e._container = Wr("shape");
				U(t, "leaflet-vml-shape " + (this.options.className || "")), t.coordsize = "1 1", e._path = Wr("path"), t.appendChild(e._path), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				var t = e._container;
				this._container.appendChild(t), e.options.interactive && e.addInteractiveTarget(t);
			},
			_removePath: function(e) {
				var t = e._container;
				H(t), e.removeInteractiveTarget(t), delete this._layers[o(e)];
			},
			_updateStyle: function(e) {
				var t = e._stroke, n = e._fill, r = e.options, i = e._container;
				i.stroked = !!r.stroke, i.filled = !!r.fill, r.stroke ? (t ||= e._stroke = Wr("stroke"), i.appendChild(t), t.weight = r.weight + "px", t.color = r.color, t.opacity = r.opacity, r.dashArray ? t.dashStyle = _(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", t.endcap = r.lineCap.replace("butt", "flat"), t.joinstyle = r.lineJoin) : t && (i.removeChild(t), e._stroke = null), r.fill ? (n ||= e._fill = Wr("fill"), i.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (i.removeChild(n), e._fill = null);
			},
			_updateCircle: function(e) {
				var t = e._point.round(), n = Math.round(e._radius), r = Math.round(e._radiusY || n);
				this._setPath(e, e._empty() ? "M0 0" : "AL " + t.x + "," + t.y + " " + n + "," + r + " 0,23592600");
			},
			_setPath: function(e, t) {
				e._path.v = t;
			},
			_bringToFront: function(e) {
				St(e._container);
			},
			_bringToBack: function(e) {
				Ct(e._container);
			}
		}, Kr = z.vml ? Wr : me, qr = Vr.extend({
			_initContainer: function() {
				this._container = Kr("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Kr("g"), this._container.appendChild(this._rootGroup);
			},
			_destroyContainer: function() {
				H(this._container), X(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Vr.prototype._update.call(this);
					var e = this._bounds, t = e.getSize(), n = this._container;
					this._svgSize && this._svgSize.equals(t) || (this._svgSize = t, n.setAttribute("width", t.x), n.setAttribute("height", t.y)), K(n, e.min), n.setAttribute("viewBox", [
						e.min.x,
						e.min.y,
						t.x,
						t.y
					].join(" ")), this.fire("update");
				}
			},
			_initPath: function(e) {
				var t = e._path = Kr("path");
				e.options.className && U(t, e.options.className), e.options.interactive && U(t, "leaflet-interactive"), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				this._rootGroup || this._initContainer(), this._rootGroup.appendChild(e._path), e.addInteractiveTarget(e._path);
			},
			_removePath: function(e) {
				H(e._path), e.removeInteractiveTarget(e._path), delete this._layers[o(e)];
			},
			_updatePath: function(e) {
				e._project(), e._update();
			},
			_updateStyle: function(e) {
				var t = e._path, n = e.options;
				t && (n.stroke ? (t.setAttribute("stroke", n.color), t.setAttribute("stroke-opacity", n.opacity), t.setAttribute("stroke-width", n.weight), t.setAttribute("stroke-linecap", n.lineCap), t.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? t.setAttribute("stroke-dasharray", n.dashArray) : t.removeAttribute("stroke-dasharray"), n.dashOffset ? t.setAttribute("stroke-dashoffset", n.dashOffset) : t.removeAttribute("stroke-dashoffset")) : t.setAttribute("stroke", "none"), n.fill ? (t.setAttribute("fill", n.fillColor || n.color), t.setAttribute("fill-opacity", n.fillOpacity), t.setAttribute("fill-rule", n.fillRule || "evenodd")) : t.setAttribute("fill", "none"));
			},
			_updatePoly: function(e, t) {
				this._setPath(e, he(e._parts, t));
			},
			_updateCircle: function(e) {
				var t = e._point, n = Math.max(Math.round(e._radius), 1), r = Math.max(Math.round(e._radiusY), 1) || n, i = "a" + n + "," + r + " 0 1,0 ", a = e._empty() ? "M0 0" : "M" + (t.x - n) + "," + t.y + i + n * 2 + ",0 " + i + -n * 2 + ",0 ";
				this._setPath(e, a);
			},
			_setPath: function(e, t) {
				e._path.setAttribute("d", t);
			},
			_bringToFront: function(e) {
				St(e._path);
			},
			_bringToBack: function(e) {
				Ct(e._path);
			}
		});
		z.vml && qr.include(Gr);
		function Jr(e) {
			return z.svg || z.vml ? new qr(e) : null;
		}
		Q.include({
			getRenderer: function(e) {
				var t = e.options.renderer || this._getPaneRenderer(e.options.pane) || this.options.renderer || this._renderer;
				return t ||= this._renderer = this._createRenderer(), this.hasLayer(t) || this.addLayer(t), t;
			},
			_getPaneRenderer: function(e) {
				if (e === "overlayPane" || e === void 0) return !1;
				var t = this._paneRenderers[e];
				return t === void 0 && (t = this._createRenderer({ pane: e }), this._paneRenderers[e] = t), t;
			},
			_createRenderer: function(e) {
				return this.options.preferCanvas && Ur(e) || Jr(e);
			}
		});
		var Yr = cr.extend({
			initialize: function(e, t) {
				cr.prototype.initialize.call(this, this._boundsToLatLngs(e), t);
			},
			setBounds: function(e) {
				return this.setLatLngs(this._boundsToLatLngs(e));
			},
			_boundsToLatLngs: function(e) {
				return e = O(e), [
					e.getSouthWest(),
					e.getNorthWest(),
					e.getNorthEast(),
					e.getSouthEast()
				];
			}
		});
		function Xr(e, t) {
			return new Yr(e, t);
		}
		qr.create = Kr, qr.pointsToPath = he, ur.geometryToLayer = dr, ur.coordsToLatLng = pr, ur.coordsToLatLngs = mr, ur.latLngToCoords = hr, ur.latLngsToCoords = gr, ur.getFeature = _r, ur.asFeature = vr, Q.mergeOptions({ boxZoom: !0 });
		var Zr = hn.extend({
			initialize: function(e) {
				this._map = e, this._container = e._container, this._pane = e._panes.overlayPane, this._resetStateTimeout = 0, e.on("unload", this._destroy, this);
			},
			addHooks: function() {
				Y(this._container, "mousedown", this._onMouseDown, this);
			},
			removeHooks: function() {
				X(this._container, "mousedown", this._onMouseDown, this);
			},
			moved: function() {
				return this._moved;
			},
			_destroy: function() {
				H(this._pane), delete this._pane;
			},
			_resetState: function() {
				this._resetStateTimeout = 0, this._moved = !1;
			},
			_clearDeferredResetState: function() {
				this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
			},
			_onMouseDown: function(e) {
				if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
				this._clearDeferredResetState(), this._resetState(), jt(), q(), this._startPoint = this._map.mouseEventToContainerPoint(e), Y(document, {
					contextmenu: Xt,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseMove: function(e) {
				this._moved || (this._moved = !0, this._box = V("div", "leaflet-zoom-box", this._container), U(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(e);
				var t = new T(this._point, this._startPoint), n = t.getSize();
				K(this._box, t.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
			},
			_finish: function() {
				this._moved && (H(this._box), W(this._container, "leaflet-crosshair")), Mt(), Ft(), X(document, {
					contextmenu: Xt,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseUp: function(e) {
				if ((e.which === 1 || e.button === 1) && (this._finish(), this._moved)) {
					this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(i(this._resetState, this), 0);
					var t = new D(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
					this._map.fitBounds(t).fire("boxzoomend", { boxZoomBounds: t });
				}
			},
			_onKeyDown: function(e) {
				e.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
			}
		});
		Q.addInitHook("addHandler", "boxZoom", Zr), Q.mergeOptions({ doubleClickZoom: !0 });
		var Qr = hn.extend({
			addHooks: function() {
				this._map.on("dblclick", this._onDoubleClick, this);
			},
			removeHooks: function() {
				this._map.off("dblclick", this._onDoubleClick, this);
			},
			_onDoubleClick: function(e) {
				var t = this._map, n = t.getZoom(), r = t.options.zoomDelta, i = e.originalEvent.shiftKey ? n - r : n + r;
				t.options.doubleClickZoom === "center" ? t.setZoom(i) : t.setZoomAround(e.containerPoint, i);
			}
		});
		Q.addInitHook("addHandler", "doubleClickZoom", Qr), Q.mergeOptions({
			dragging: !0,
			inertia: !0,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: Infinity,
			easeLinearity: .2,
			worldCopyJump: !1,
			maxBoundsViscosity: 0
		});
		var $r = hn.extend({
			addHooks: function() {
				if (!this._draggable) {
					var e = this._map;
					this._draggable = new vn(e._mapPane, e._container), this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this), this._draggable.on("predrag", this._onPreDragLimit, this), e.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), e.on("zoomend", this._onZoomEnd, this), e.whenReady(this._onZoomEnd, this));
				}
				U(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
			},
			removeHooks: function() {
				W(this._map._container, "leaflet-grab"), W(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			moving: function() {
				return this._draggable && this._draggable._moving;
			},
			_onDragStart: function() {
				var e = this._map;
				if (e._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
					var t = O(this._map.options.maxBounds);
					this._offsetLimit = E(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
				} else this._offsetLimit = null;
				e.fire("movestart").fire("dragstart"), e.options.inertia && (this._positions = [], this._times = []);
			},
			_onDrag: function(e) {
				if (this._map.options.inertia) {
					var t = this._lastTime = +/* @__PURE__ */ new Date(), n = this._lastPos = this._draggable._absPos || this._draggable._newPos;
					this._positions.push(n), this._times.push(t), this._prunePositions(t);
				}
				this._map.fire("move", e).fire("drag", e);
			},
			_prunePositions: function(e) {
				for (; this._positions.length > 1 && e - this._times[0] > 50;) this._positions.shift(), this._times.shift();
			},
			_onZoomEnd: function() {
				var e = this._map.getSize().divideBy(2), t = this._map.latLngToLayerPoint([0, 0]);
				this._initialWorldOffset = t.subtract(e).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
			},
			_viscousLimit: function(e, t) {
				return e - (e - t) * this._viscosity;
			},
			_onPreDragLimit: function() {
				if (this._viscosity && this._offsetLimit) {
					var e = this._draggable._newPos.subtract(this._draggable._startPos), t = this._offsetLimit;
					e.x < t.min.x && (e.x = this._viscousLimit(e.x, t.min.x)), e.y < t.min.y && (e.y = this._viscousLimit(e.y, t.min.y)), e.x > t.max.x && (e.x = this._viscousLimit(e.x, t.max.x)), e.y > t.max.y && (e.y = this._viscousLimit(e.y, t.max.y)), this._draggable._newPos = this._draggable._startPos.add(e);
				}
			},
			_onPreDragWrap: function() {
				var e = this._worldWidth, t = Math.round(e / 2), n = this._initialWorldOffset, r = this._draggable._newPos.x, i = (r - t + n) % e + t - n, a = (r + t + n) % e - t - n, o = Math.abs(i + n) < Math.abs(a + n) ? i : a;
				this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = o;
			},
			_onDragEnd: function(e) {
				var t = this._map, n = t.options, r = !n.inertia || e.noInertia || this._times.length < 2;
				if (t.fire("dragend", e), r) t.fire("moveend");
				else {
					this._prunePositions(+/* @__PURE__ */ new Date());
					var i = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, o = n.easeLinearity, s = i.multiplyBy(o / a), c = s.distanceTo([0, 0]), l = Math.min(n.inertiaMaxSpeed, c), u = s.multiplyBy(l / c), d = l / (n.inertiaDeceleration * o), f = u.multiplyBy(-d / 2).round();
					!f.x && !f.y ? t.fire("moveend") : (f = t._limitOffset(f, t.options.maxBounds), y(function() {
						t.panBy(f, {
							duration: d,
							easeLinearity: o,
							noMoveStart: !0,
							animate: !0
						});
					}));
				}
			}
		});
		Q.addInitHook("addHandler", "dragging", $r), Q.mergeOptions({
			keyboard: !0,
			keyboardPanDelta: 80
		});
		var ei = hn.extend({
			keyCodes: {
				left: [37],
				right: [39],
				down: [40],
				up: [38],
				zoomIn: [
					187,
					107,
					61,
					171
				],
				zoomOut: [
					189,
					109,
					54,
					173
				]
			},
			initialize: function(e) {
				this._map = e, this._setPanDelta(e.options.keyboardPanDelta), this._setZoomDelta(e.options.zoomDelta);
			},
			addHooks: function() {
				var e = this._map._container;
				e.tabIndex <= 0 && (e.tabIndex = "0"), Y(e, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.on({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			removeHooks: function() {
				this._removeHooks(), X(this._map._container, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.off({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			_onMouseDown: function() {
				if (!this._focused) {
					var e = document.body, t = document.documentElement, n = e.scrollTop || t.scrollTop, r = e.scrollLeft || t.scrollLeft;
					this._map._container.focus(), window.scrollTo(r, n);
				}
			},
			_onFocus: function() {
				this._focused = !0, this._map.fire("focus");
			},
			_onBlur: function() {
				this._focused = !1, this._map.fire("blur");
			},
			_setPanDelta: function(e) {
				for (var t = this._panKeys = {}, n = this.keyCodes, r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [-1 * e, 0];
				for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [e, 0];
				for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [0, e];
				for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [0, -1 * e];
			},
			_setZoomDelta: function(e) {
				for (var t = this._zoomKeys = {}, n = this.keyCodes, r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
				for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e;
			},
			_addHooks: function() {
				Y(document, "keydown", this._onKeyDown, this);
			},
			_removeHooks: function() {
				X(document, "keydown", this._onKeyDown, this);
			},
			_onKeyDown: function(e) {
				if (!(e.altKey || e.ctrlKey || e.metaKey)) {
					var t = e.keyCode, n = this._map, r;
					if (t in this._panKeys) {
						if (!n._panAnim || !n._panAnim._inProgress) {
							if (r = this._panKeys[t], e.shiftKey && (r = w(r).multiplyBy(3)), n.options.maxBounds && (r = n._limitOffset(w(r), n.options.maxBounds)), n.options.worldCopyJump) {
								var i = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));
								n.panTo(i);
							} else n.panBy(r);
						}
					} else if (t in this._zoomKeys) n.setZoom(n.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[t]);
					else if (t === 27 && n._popup && n._popup.options.closeOnEscapeKey) n.closePopup();
					else return;
					Xt(e);
				}
			}
		});
		Q.addInitHook("addHandler", "keyboard", ei), Q.mergeOptions({
			scrollWheelZoom: !0,
			wheelDebounceTime: 40,
			wheelPxPerZoomLevel: 60
		});
		var ti = hn.extend({
			addHooks: function() {
				Y(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
			},
			removeHooks: function() {
				X(this._map._container, "wheel", this._onWheelScroll, this);
			},
			_onWheelScroll: function(e) {
				var t = en(e), n = this._map.options.wheelDebounceTime;
				this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), this._startTime ||= +/* @__PURE__ */ new Date();
				var r = Math.max(n - (+/* @__PURE__ */ new Date() - this._startTime), 0);
				clearTimeout(this._timer), this._timer = setTimeout(i(this._performZoom, this), r), Xt(e);
			},
			_performZoom: function() {
				var e = this._map, t = e.getZoom(), n = this._map.options.zoomSnap || 0;
				e._stop();
				var r = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), i = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2, a = n ? Math.ceil(i / n) * n : i, o = e._limitZoom(t + (this._delta > 0 ? a : -a)) - t;
				this._delta = 0, this._startTime = null, o && (e.options.scrollWheelZoom === "center" ? e.setZoom(t + o) : e.setZoomAround(this._lastMousePos, t + o));
			}
		});
		Q.addInitHook("addHandler", "scrollWheelZoom", ti);
		var ni = 600;
		Q.mergeOptions({
			tapHold: z.touchNative && z.safari && z.mobile,
			tapTolerance: 15
		});
		var ri = hn.extend({
			addHooks: function() {
				Y(this._map._container, "touchstart", this._onDown, this);
			},
			removeHooks: function() {
				X(this._map._container, "touchstart", this._onDown, this);
			},
			_onDown: function(e) {
				if (clearTimeout(this._holdTimeout), e.touches.length === 1) {
					var t = e.touches[0];
					this._startPos = this._newPos = new C(t.clientX, t.clientY), this._holdTimeout = setTimeout(i(function() {
						this._cancel(), this._isTapValid() && (Y(document, "touchend", Z), Y(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", t));
					}, this), ni), Y(document, "touchend touchcancel contextmenu", this._cancel, this), Y(document, "touchmove", this._onMove, this);
				}
			},
			_cancelClickPrevent: function e() {
				X(document, "touchend", Z), X(document, "touchend touchcancel", e);
			},
			_cancel: function() {
				clearTimeout(this._holdTimeout), X(document, "touchend touchcancel contextmenu", this._cancel, this), X(document, "touchmove", this._onMove, this);
			},
			_onMove: function(e) {
				var t = e.touches[0];
				this._newPos = new C(t.clientX, t.clientY);
			},
			_isTapValid: function() {
				return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
			},
			_simulateEvent: function(e, t) {
				var n = new MouseEvent(e, {
					bubbles: !0,
					cancelable: !0,
					view: window,
					screenX: t.screenX,
					screenY: t.screenY,
					clientX: t.clientX,
					clientY: t.clientY
				});
				n._simulated = !0, t.target.dispatchEvent(n);
			}
		});
		Q.addInitHook("addHandler", "tapHold", ri), Q.mergeOptions({
			touchZoom: z.touch,
			bounceAtZoomLimits: !0
		});
		var ii = hn.extend({
			addHooks: function() {
				U(this._map._container, "leaflet-touch-zoom"), Y(this._map._container, "touchstart", this._onTouchStart, this);
			},
			removeHooks: function() {
				W(this._map._container, "leaflet-touch-zoom"), X(this._map._container, "touchstart", this._onTouchStart, this);
			},
			_onTouchStart: function(e) {
				var t = this._map;
				if (!(!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming)) {
					var n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]);
					this._centerPoint = t.getSize()._divideBy(2), this._startLatLng = t.containerPointToLatLng(this._centerPoint), t.options.touchZoom !== "center" && (this._pinchStartLatLng = t.containerPointToLatLng(n.add(r)._divideBy(2))), this._startDist = n.distanceTo(r), this._startZoom = t.getZoom(), this._moved = !1, this._zooming = !0, t._stop(), Y(document, "touchmove", this._onTouchMove, this), Y(document, "touchend touchcancel", this._onTouchEnd, this), Z(e);
				}
			},
			_onTouchMove: function(e) {
				if (e.touches && e.touches.length === 2 && this._zooming) {
					var t = this._map, n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]), a = n.distanceTo(r) / this._startDist;
					if (this._zoom = t.getScaleZoom(a, this._startZoom), !t.options.bounceAtZoomLimits && (this._zoom < t.getMinZoom() && a < 1 || this._zoom > t.getMaxZoom() && a > 1) && (this._zoom = t._limitZoom(this._zoom)), t.options.touchZoom === "center") {
						if (this._center = this._startLatLng, a === 1) return;
					} else {
						var o = n._add(r)._divideBy(2)._subtract(this._centerPoint);
						if (a === 1 && o.x === 0 && o.y === 0) return;
						this._center = t.unproject(t.project(this._pinchStartLatLng, this._zoom).subtract(o), this._zoom);
					}
					this._moved ||= (t._moveStart(!0, !1), !0), b(this._animRequest);
					var s = i(t._move, t, this._center, this._zoom, {
						pinch: !0,
						round: !1
					}, void 0);
					this._animRequest = y(s, this, !0), Z(e);
				}
			},
			_onTouchEnd: function() {
				!this._moved || !this._zooming ? this._zooming = !1 : (this._zooming = !1, b(this._animRequest), X(document, "touchmove", this._onTouchMove, this), X(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom)));
			}
		});
		Q.addInitHook("addHandler", "touchZoom", ii), Q.BoxZoom = Zr, Q.DoubleClickZoom = Qr, Q.Drag = $r, Q.Keyboard = ei, Q.ScrollWheelZoom = ti, Q.TapHold = ri, Q.TouchZoom = ii, e.Bounds = T, e.Browser = z, e.CRS = j, e.Canvas = Hr, e.Circle = ir, e.CircleMarker = nr, e.Class = x, e.Control = on, e.DivIcon = Nr, e.DivOverlay = Or, e.DomEvent = nn, e.DomUtil = Vt, e.Draggable = vn, e.Evented = ce, e.FeatureGroup = qn, e.GeoJSON = ur, e.GridLayer = Fr, e.Handler = hn, e.Icon = Yn, e.ImageOverlay = Sr, e.LatLng = k, e.LatLngBounds = D, e.Layer = Wn, e.LayerGroup = Gn, e.LineUtil = Ln, e.Map = Q, e.Marker = $n, e.Mixin = gn, e.Path = tr, e.Point = C, e.PolyUtil = Sn, e.Polygon = cr, e.Polyline = or, e.Popup = kr, e.PosAnimation = rn, e.Projection = Bn, e.Rectangle = Yr, e.Renderer = Vr, e.SVG = qr, e.SVGOverlay = Er, e.TileLayer = Lr, e.Tooltip = jr, e.Transformation = de, e.Util = oe, e.VideoOverlay = wr, e.bind = i, e.bounds = E, e.canvas = Ur, e.circle = ar, e.circleMarker = rr, e.control = sn, e.divIcon = Pr, e.extend = n, e.featureGroup = Jn, e.geoJSON = br, e.geoJson = xr, e.gridLayer = Ir, e.icon = Xn, e.imageOverlay = Cr, e.latLng = A, e.latLngBounds = O, e.layerGroup = Kn, e.map = an, e.marker = er, e.point = w, e.polygon = lr, e.polyline = sr, e.popup = Ar, e.rectangle = Xr, e.setOptions = p, e.stamp = o, e.svg = Jr, e.svgOverlay = Dr, e.tileLayer = Rr, e.tooltip = Mr, e.transformation = fe, e.version = t, e.videoOverlay = Tr;
		var ai = window.L;
		e.noConflict = function() {
			return window.L = ai, this;
		}, window.L = e;
	}));
}));
Ke(), it();
var B = /* @__PURE__ */ u(at(), 1), ot = ".leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;top:0;left:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:0 0}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{-webkit-transform-origin:0 0;width:1600px;height:1600px}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{width:auto;padding:0;max-width:none!important;max-height:none!important}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:#33b5e566}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{box-sizing:border-box;z-index:800;width:0;height:0}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{z-index:800;pointer-events:visiblePainted;pointer-events:auto;position:relative}.leaflet-top,.leaflet-bottom{z-index:1000;pointer-events:none;position:absolute}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{outline-offset:1px;background:#ddd}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{background:#ffffff80;border:2px dotted #38f}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:.75rem;line-height:1.5}.leaflet-bar{border-radius:4px;box-shadow:0 1px 5px #000000a6}.leaflet-bar a{text-align:center;color:#000;background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;text-decoration:none;display:block}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom:none;border-bottom-right-radius:4px;border-bottom-left-radius:4px}.leaflet-bar a.leaflet-disabled{cursor:default;color:#bbb;background-color:#f4f4f4}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-right-radius:2px;border-bottom-left-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{text-indent:1px;font:700 18px Lucida Console,Monaco,monospace}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{background:#fff;border-radius:5px;box-shadow:0 1px 5px #0006}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{color:#333;background:#fff;padding:6px 10px 6px 6px}.leaflet-control-layers-scrollbar{padding-right:5px;overflow:hidden scroll}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{font-size:1.08333em;display:block}.leaflet-control-layers-separator{border-top:1px solid #ddd;height:0;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{color:#333;padding:0 5px;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{width:1em;height:.6669em;vertical-align:baseline!important;display:inline!important}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{white-space:nowrap;box-sizing:border-box;text-shadow:1px 1px #fff;background:#fffc;border:2px solid #777;border-top:none;padding:2px 5px 1px;line-height:1.1}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{background-clip:padding-box;border:2px solid #0003}.leaflet-popup{text-align:center;margin-bottom:20px;position:absolute}.leaflet-popup-content-wrapper{text-align:left;border-radius:12px;padding:1px}.leaflet-popup-content{min-height:1px;margin:13px 24px 13px 20px;font-size:1.08333em;line-height:1.3}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{pointer-events:none;width:40px;height:20px;margin-top:-1px;margin-left:-20px;position:absolute;left:50%;overflow:hidden}.leaflet-popup-tip{pointer-events:auto;width:17px;height:17px;margin:-10px auto 0;padding:1px;transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{color:#333;background:#fff;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{text-align:center;color:#757575;background:0 0;border:none;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;text-decoration:none;position:absolute;top:0;right:0}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";width:24px;filter:progid:DXImageTransform.Microsoft.Matrix(M11=.707107, M12=.707107, M21=-.707107, M22=.707107);margin:0 auto}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{color:#222;white-space:nowrap;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#fff;border:1px solid #fff;border-radius:3px;padding:6px;position:absolute;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{pointer-events:none;content:\"\";background:0 0;border:6px solid #0000;position:absolute}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{margin-left:-6px;left:50%}.leaflet-tooltip-top:before{border-top-color:#fff;margin-bottom:-12px;bottom:0}.leaflet-tooltip-bottom:before{border-bottom-color:#fff;margin-top:-12px;margin-left:-6px;top:0}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{margin-top:-6px;top:50%}.leaflet-tooltip-left:before{border-left-color:#fff;margin-right:-12px;right:0}.leaflet-tooltip-right:before{border-right-color:#fff;margin-left:-12px;left:0}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}", st, ct, lt, ut, dt, ft, pt = o((() => {
	st = "1.1.2", ct = "map-bearing-card", lt = "map-bearing-card-editor", ut = [
		{
			name: "Fiery Orange (G6 Hero)",
			hex: "#ea580c"
		},
		{
			name: "Arctic White",
			hex: "#f8fafc"
		},
		{
			name: "Graphite Gray",
			hex: "#4b5563"
		},
		{
			name: "Silver Frost",
			hex: "#94a3b8"
		},
		{
			name: "Midnight Obsidian",
			hex: "#0f172a"
		},
		{
			name: "Nebula Green",
			hex: "#059669"
		},
		{
			name: "Starry Blue",
			hex: "#0284c7"
		}
	], dt = {
		type: `custom:${ct}`,
		vehicle_type: "xpeng_g6",
		vehicle_color: "#ea580c",
		vehicle_size: 48,
		show_bearing_cone: !0,
		show_accuracy: !0,
		map_provider: "auto",
		dark_mode: "auto",
		tile_api_key: "",
		api_key: "",
		default_zoom: 16,
		min_zoom: 3,
		max_zoom: 19,
		card_height: "400px",
		follow_vehicle: !0,
		recenter_button: !0,
		heads_up_mode: !1,
		show_zones: !0,
		show_hud: !0,
		show_speed: !0,
		show_bearing: !0,
		show_battery: !0,
		show_range: !0,
		show_charging: !0,
		show_last_updated: !0,
		show_fix_age: !0,
		show_address: !0,
		bearing_offset: 0
	}, ft = {
		carto_light: {
			url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
			attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
			subdomains: [
				"a",
				"b",
				"c",
				"d"
			],
			maxZoom: 20
		},
		carto_dark: {
			url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
			attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
			subdomains: [
				"a",
				"b",
				"c",
				"d"
			],
			maxZoom: 20
		},
		osm: {
			url: "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
			attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
			maxZoom: 19
		},
		satellite: {
			url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
			attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
			maxZoom: 19
		},
		opentopo: {
			url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
			attribution: "Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)",
			subdomains: [
				"a",
				"b",
				"c"
			],
			maxZoom: 17
		}
	};
}));
// src/utils/bearing.ts
pt();
var mt = [
	"N",
	"NNE",
	"NE",
	"ENE",
	"E",
	"ESE",
	"SE",
	"SSE",
	"S",
	"SSW",
	"SW",
	"WSW",
	"W",
	"WNW",
	"NW",
	"NNW"
];
function ht(e) {
	return (e % 360 + 360) % 360;
}
function gt(e) {
	let t = ht(e);
	return mt[Math.round(t / 22.5) % 16];
}
function _t(e, t) {
	let n = ht(t), r = ht(e) - n;
	return r > 180 ? r -= 360 : r < -180 && (r += 360), t + r;
}
function vt(e, t, n, r) {
	let i = (e) => e * Math.PI / 180, a = (e) => e * 180 / Math.PI, o = i(e), s = i(n), c = i(r - t), l = Math.sin(c) * Math.cos(s), u = Math.cos(o) * Math.sin(s) - Math.sin(o) * Math.cos(s) * Math.cos(c);
	return ht(a(Math.atan2(l, u)));
}
function yt(e, t, n, r) {
	let i = (e) => e * Math.PI / 180, a = i(n - e), o = i(r - t), s = i(e), c = i(n), l = Math.sin(a / 2) * Math.sin(a / 2) + Math.cos(s) * Math.cos(c) * Math.sin(o / 2) * Math.sin(o / 2);
	return 6371e3 * (2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l)));
}
function bt(e) {
	if (e === null || isNaN(e)) return "--";
	let t = Math.round(ht(e));
	return `${t}° ${gt(t)}`;
}
// src/utils/entity.ts
function V(e) {
	if (e == null || e === "") return null;
	let t = typeof e == "number" ? e : parseFloat(String(e).trim());
	return isFinite(t) ? t : null;
}
function H(e, t, n) {
	if (n.latitude_entity && t.states[n.latitude_entity]) {
		let e = t.states[n.latitude_entity], r = n.latitude_attribute ? e.attributes[n.latitude_attribute] : e.state, i = n.longitude_entity ? t.states[n.longitude_entity] : null, a = i ? n.longitude_attribute ? i.attributes[n.longitude_attribute] : i.state : null, o = V(r), s = V(a);
		if (o !== null && s !== null) return {
			lat: o,
			lon: s
		};
	}
	if (!e || !e.attributes) return {
		lat: null,
		lon: null
	};
	let r = e.attributes, i = n.latitude_attribute || [
		"latitude",
		"lat",
		"Latitude"
	].find((e) => e in r), a = n.longitude_attribute || [
		"longitude",
		"lon",
		"lng",
		"Longitude"
	].find((e) => e in r);
	return {
		lat: i ? V(r[i]) : null,
		lon: a ? V(r[a]) : null
	};
}
function xt(e, t, n, r, i) {
	let a = null;
	if (n.bearing_entity && t.states[n.bearing_entity]) {
		let e = t.states[n.bearing_entity];
		a = n.bearing_attribute && e.attributes[n.bearing_attribute] !== void 0 ? V(e.attributes[n.bearing_attribute]) : V(e.state);
	}
	if (a === null && e && e.attributes) {
		let t = e.attributes;
		if (n.bearing_attribute && t[n.bearing_attribute] !== void 0) a = V(t[n.bearing_attribute]);
		else for (let e of [
			"course",
			"bearing",
			"heading",
			"direction",
			"angle",
			"compass",
			"azimuth"
		]) if (e in t) {
			let n = V(t[e]);
			if (n !== null) {
				a = n;
				break;
			}
		}
	}
	if (a === null && r && i && yt(r.lat, r.lon, i.lat, i.lon) >= 3 && (a = vt(r.lat, r.lon, i.lat, i.lon)), a === null) return {
		bearing: null,
		rawBearing: null
	};
	let o = n.bearing_offset || 0;
	return {
		bearing: ht(a + o),
		rawBearing: a
	};
}
function St(e, t, n) {
	let r = null, i = n.speed_unit || "km/h";
	if (n.speed_entity && t.states[n.speed_entity]) {
		let e = t.states[n.speed_entity];
		r = n.speed_attribute ? V(e.attributes[n.speed_attribute]) : V(e.state), e.attributes.unit_of_measurement && (i = n.speed_unit || e.attributes.unit_of_measurement);
	} else if (e && e.attributes) {
		let t = e.attributes;
		if (n.speed_attribute && t[n.speed_attribute] !== void 0) r = V(t[n.speed_attribute]);
		else for (let e of ["speed", "velocity"]) if (e in t) {
			r = V(t[e]);
			break;
		}
		(t.speed_unit || t.unit_of_measurement) && (i = n.speed_unit || t.speed_unit || t.unit_of_measurement);
	}
	return {
		speedFormatted: r === null ? null : `${Math.round(r)} ${i}`,
		speedRaw: r,
		speedUnit: i
	};
}
function Ct(e, t, n) {
	if (n.battery_entity && t.states[n.battery_entity]) {
		let e = t.states[n.battery_entity];
		return V(n.battery_attribute ? e.attributes[n.battery_attribute] : e.state);
	}
	if (!n.battery_entity && e) {
		let n = `${e.entity_id.replace(/^device_tracker\./, "sensor.").replace(/_location$/, "")}_battery_soc`;
		if (t.states[n]) {
			let e = V(t.states[n].state);
			if (e !== null) return e;
		}
	}
	if (e && e.attributes) {
		let t = e.attributes;
		if (n.battery_attribute && t[n.battery_attribute] !== void 0) return V(t[n.battery_attribute]);
		for (let e of [
			"battery_soc",
			"battery_level",
			"battery",
			"battery_percent",
			"battery_percentage",
			"soc"
		]) if (e in t) return V(t[e]);
	}
	return null;
}
function wt(e, t, n) {
	let r = null, i = "km";
	if (n.range_entity && t.states[n.range_entity]) {
		let e = t.states[n.range_entity];
		r = n.range_attribute ? V(e.attributes[n.range_attribute]) : V(e.state), e.attributes?.unit_of_measurement && (i = e.attributes.unit_of_measurement);
	} else if (e) {
		let n = e.entity_id.replace(/^device_tracker\./, "sensor.").replace(/_location$/, "");
		for (let e of [
			"_remaining_range",
			"_range",
			"_electric_range"
		]) {
			let a = `${n}${e}`;
			if (t.states[a]) {
				let e = V(t.states[a].state);
				if (e !== null) {
					r = e, i = t.states[a].attributes?.unit_of_measurement || "km";
					break;
				}
			}
		}
		if (r === null && e.attributes) {
			for (let t of [
				"remaining_range",
				"range",
				"electric_range",
				"distance_to_empty"
			]) if (t in e.attributes) {
				r = V(e.attributes[t]), e.attributes.range_unit && (i = e.attributes.range_unit);
				break;
			}
		}
	}
	return r === null ? null : `${Math.round(r)} ${i}`;
}
function U(e, t, n) {
	if (n.charging_entity && t.states[n.charging_entity]) {
		let e = t.states[n.charging_entity], r = n.charging_attribute ? e.attributes[n.charging_attribute] : e.state;
		return r === !0 || r === "on" || r === "charging" || r === 1 || r === "1";
	}
	if (e) {
		let n = `${e.entity_id.replace(/^device_tracker\./, "binary_sensor.").replace(/_location$/, "")}_charging`;
		if (t.states[n] && t.states[n].state === "on") return !0;
		if (e.attributes) for (let t of [
			"charging",
			"is_charging",
			"charge_status",
			"charging_state"
		]) {
			let n = e.attributes[t];
			if (n === !0 || n === "on" || n === "charging" || n === 1) return !0;
		}
	}
	return !1;
}
function W(e, t, n) {
	let r = e.states[t.entity], { lat: i, lon: a } = H(r, e, t), { bearing: o, rawBearing: s } = xt(r, e, t, n, i !== null && a !== null ? {
		lat: i,
		lon: a
	} : null), { speedFormatted: c, speedRaw: l, speedUnit: u } = St(r, e, t), d = Ct(r, e, t), f = wt(r, e, t), p = U(r, e, t), m = r?.attributes?.gps_accuracy ?? r?.attributes?.accuracy ?? null, h = t.title || r?.attributes?.friendly_name || t.entity || "XPENG G6", g = r?.attributes?.coord_valid === void 0 ? null : !!r.attributes.coord_valid, _ = V(r?.attributes?.fix_age_s), ee = _ === null ? null : Et(_), v = r?.state || "Parked";
	v === "not_home" ? v = "Away" : v === "home" && (v = "Home");
	let te = l !== null && l > 1 || v.toLowerCase() === "driving";
	return !te && ee && t.show_fix_age !== !1 && (v = `${v} · ${ee}`), {
		latitude: i,
		longitude: a,
		bearing: o,
		displayBearing: s,
		cardinal: o === null ? "" : gt(o),
		speed: c,
		speedRaw: l,
		speedUnit: u,
		battery: d === null ? null : Math.round(d),
		range: f,
		isCharging: p,
		accuracy: V(m),
		name: h,
		stateText: v,
		lastUpdated: r?.last_updated ? G(r.last_updated) : null,
		isMoving: te,
		coordValid: g,
		fixAgeSeconds: _,
		fixAgeText: ee
	};
}
function Tt(e) {
	let t = [];
	for (let n of Object.keys(e.states)) if (n.startsWith("zone.")) {
		let r = e.states[n], i = V(r.attributes?.latitude), a = V(r.attributes?.longitude), o = V(r.attributes?.radius) || 100;
		i !== null && a !== null && t.push({
			id: n,
			name: r.attributes?.friendly_name || n.replace("zone.", ""),
			latitude: i,
			longitude: a,
			radius: o,
			icon: r.attributes?.icon,
			passive: !!r.attributes?.passive
		});
	}
	return t;
}
function Et(e) {
	if (e < 45) return "Fix just now";
	if (e < 90) return "Fix 1m ago";
	let t = Math.floor(e / 60);
	if (t < 60) return `Fix ${t}m ago`;
	let n = Math.floor(t / 60);
	return n < 24 ? `Fix ${n}h ago` : `Fix ${Math.floor(n / 24)}d ago`;
}
function G(e) {
	try {
		let t = Math.round((Date.now() - new Date(e).getTime()) / 1e3);
		if (t < 30) return "Just now";
		if (t < 60) return `${t}s ago`;
		let n = Math.floor(t / 60);
		if (n < 60) return `${n}m ago`;
		let r = Math.floor(n / 60);
		return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
	} catch {
		return "";
	}
}
// src/vehicles/svgs.ts
function Dt(e = "#38bdf8", t = .35, n = !1) {
	let r = n ? t * .3 : t, i = n ? "2,4" : "3,3";
	return `
    <svg class="bearing-cone ${n ? "cone-parked" : "cone-active"}" viewBox="0 0 200 200" style="position: absolute; top: -100px; left: -50px; width: 200px; height: 200px; pointer-events: none; z-index: 1;">
      <defs>
        <radialGradient id="beamGrad" cx="50%" cy="100%" r="90%" fx="50%" fy="100%">
          <stop offset="0%" stop-color="${e}" stop-opacity="${r * 1.5}" />
          <stop offset="40%" stop-color="${e}" stop-opacity="${r * .8}" />
          <stop offset="80%" stop-color="${e}" stop-opacity="${r * .2}" />
          <stop offset="100%" stop-color="${e}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Forward illumination fan: from bottom center (100, 165) pointing up to top fan -->
      <polygon points="100,165 40,0 160,0" fill="url(#beamGrad)" />
      <line x1="100" y1="165" x2="100" y2="20" stroke="${e}" stroke-width="1.5" stroke-dasharray="${i}" opacity="${r * 1.2}" />
    </svg>
  `;
}
function Ot(e = "xpeng_g6", t = "#ea580c", n, r = !1) {
	if (e === "custom" && n) return `
      <div class="vehicle-custom-img-wrap" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        <img src="${n}" alt="Vehicle" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.45));" />
      </div>
    `;
	switch (e) {
		case "xpeng_g6": return kt(t, r);
		case "sports_car": return At(t, r);
		case "suv": return jt(t, r);
		case "truck": return Mt(t, r);
		case "arrow": return Nt(t);
		case "pointer": return Pt(t);
		default: return K(t, r);
	}
}
function kt(e, t) {
	let n = t ? "#94a3b8" : "#fef08a", r = t ? "rgba(255,255,255,0.4)" : "#ffffff", i = t ? "#991b1b" : "#ef4444";
	return `
    <svg class="vehicle-svg xpeng-g6-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="xpengG6Shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4.5" flood-color="#000000" flood-opacity="0.55"/>
        </filter>
        <linearGradient id="g6BodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${e}" stop-opacity="0.88"/>
          <stop offset="45%" stop-color="${e}" stop-opacity="1"/>
          <stop offset="55%" stop-color="${e}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${e}" stop-opacity="0.88"/>
        </linearGradient>
        <linearGradient id="panoramicGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95"/>
          <stop offset="35%" stop-color="#0f172a" stop-opacity="0.92"/>
          <stop offset="85%" stop-color="#0f172a" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.9"/>
        </linearGradient>
      </defs>

      <g filter="url(#xpengG6Shadow)">
        <!-- Aero Turbine Wheels (20" G6 Wheels) -->
        <rect x="25" y="23" width="7" height="17" rx="3" fill="#0f172a" />
        <rect x="68" y="23" width="7" height="17" rx="3" fill="#0f172a" />
        <rect x="24" y="66" width="8" height="18" rx="3" fill="#0f172a" />
        <rect x="68" y="66" width="8" height="18" rx="3" fill="#0f172a" />
        <!-- Wheel silver aero inserts -->
        <rect x="27" y="27" width="3" height="9" rx="1" fill="#94a3b8" opacity="0.6" />
        <rect x="70" y="27" width="3" height="9" rx="1" fill="#94a3b8" opacity="0.6" />
        <rect x="26" y="70" width="4" height="10" rx="1" fill="#94a3b8" opacity="0.6" />
        <rect x="70" y="70" width="4" height="10" rx="1" fill="#94a3b8" opacity="0.6" />

        <!-- Aerodynamic Side Mirrors -->
        <path d="M 27 34 Q 22 34 21 37 Q 23 40 28 39 Z" fill="${e}" stroke="#0f172a" stroke-width="0.8" />
        <path d="M 73 34 Q 78 34 79 37 Q 77 40 72 39 Z" fill="${e}" stroke="#0f172a" stroke-width="0.8" />

        <!-- XPENG G6 Coupe-SUV Body Shell -->
        <path d="
          M 50 11
          C 42 11, 33 13, 30 20
          C 28 25, 27 40, 27 54
          C 27 66, 28 78, 30 84
          C 32 88, 40 91, 50 91
          C 60 91, 68 88, 70 84
          C 72 78, 73 66, 73 54
          C 73 40, 72 25, 70 20
          C 67 13, 58 11, 50 11 Z
        " fill="url(#g6BodyGrad)" stroke="#090d16" stroke-width="1.3" />

        <!-- XPENG Robot Face: Signature Full-Width Front Light Bar -->
        <path d="M 33 16 Q 48 13.5 50 13.5 Q 52 13.5 67 16"
              stroke="${r}" stroke-width="2.2" stroke-linecap="round" fill="none"
              style="filter: drop-shadow(0 0 2px ${r});" />

        <!-- Split Headlights (XPENG lower cluster) -->
        <polygon points="32,20 38,19 36,25 31,24" fill="${n}" />
        <polygon points="68,20 62,19 64,25 69,24" fill="${n}" />

        <!-- Front Hood Crease Lines -->
        <path d="M 39 19 Q 41 28 43 32" stroke="#090d16" stroke-width="0.8" opacity="0.4" fill="none" />
        <path d="M 61 19 Q 59 28 57 32" stroke="#090d16" stroke-width="0.8" opacity="0.4" fill="none" />

        <!-- G6 Panoramic Glass Canopy (Seamless Windshield + Glass Roof) -->
        <path d="
          M 36 33
          Q 50 29 64 33
          L 62 45
          L 60 67
          Q 50 68 40 67
          L 38 45 Z
        " fill="url(#panoramicGlass)" stroke="#090d16" stroke-width="1" />

        <!-- Glass Canopy Reflection Sheen -->
        <path d="M 39 36 Q 50 33 61 36 L 59 44 Q 50 42 41 44 Z" fill="#ffffff" opacity="0.22" />

        <!-- G6 Fastback Rear Window -->
        <path d="
          M 40 68
          Q 50 69 60 68
          L 62 78
          Q 50 81 38 78 Z
        " fill="url(#panoramicGlass)" stroke="#090d16" stroke-width="0.8" />

        <!-- XPENG G6 Rear Ducktail Spoiler Lip -->
        <path d="M 35 81 Q 50 84 65 81" stroke="#090d16" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- XPENG Signature Full-Width Rear LED Taillight Strip -->
        <path d="M 34 87 Q 50 90 66 87"
              stroke="${i}" stroke-width="2.5" stroke-linecap="round" fill="none"
              style="filter: drop-shadow(0 0 2px ${i});" />
      </g>
    </svg>
  `;
}
function K(e, t) {
	let n = t ? "#94a3b8" : "#fef08a";
	return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="carShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${e}" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="${e}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${e}" stop-opacity="0.85"/>
        </linearGradient>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
        </linearGradient>
      </defs>

      <g filter="url(#carShadow)">
        <rect x="26" y="24" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="67" y="24" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="26" y="65" width="7" height="15" rx="3" fill="#1e293b" />
        <rect x="67" y="65" width="7" height="15" rx="3" fill="#1e293b" />

        <path d="M 27 34 Q 23 34 22 37 Q 24 40 28 39 Z" fill="${e}" stroke="#0f172a" stroke-width="0.8" />
        <path d="M 73 34 Q 77 34 78 37 Q 76 40 72 39 Z" fill="${e}" stroke="#0f172a" stroke-width="0.8" />

        <path d="
          M 50 12
          C 42 12, 33 16, 31 24
          C 30 28, 29 42, 29 55
          C 29 68, 30 80, 33 86
          C 37 89, 44 90, 50 90
          C 56 90, 63 89, 67 86
          C 70 80, 71 68, 71 55
          C 71 42, 70 28, 69 24
          C 67 16, 58 12, 50 12 Z
        " fill="url(#bodyGrad)" stroke="#0f172a" stroke-width="1.2" />

        <path d="M 36 34 Q 50 31 64 34 L 62 44 Q 50 42 38 44 Z" fill="url(#glassGrad)" stroke="#1e293b" stroke-width="0.8" />
        <path d="M 38 45 Q 50 44 62 45 L 61 63 Q 50 64 39 63 Z" fill="#1e293b" opacity="0.88" />
        <path d="M 39 65 Q 50 64 61 65 L 63 74 Q 50 76 37 74 Z" fill="url(#glassGrad)" stroke="#1e293b" stroke-width="0.8" />

        <polygon points="34,16 41,14 40,19 33,20" fill="${n}" />
        <polygon points="66,16 59,14 60,19 67,20" fill="${n}" />

        <path d="M 35 87 Q 50 89 65 87" stroke="${t ? "#991b1b" : "#ef4444"}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      </g>
    </svg>
  `;
}
function At(e, t) {
	let n = t ? "#94a3b8" : "#38bdf8", r = t ? "#991b1b" : "#ef4444";
	return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sportsShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.55"/>
        </filter>
        <linearGradient id="sportsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${e}" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="${e}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${e}" stop-opacity="0.8"/>
        </linearGradient>
      </defs>

      <g filter="url(#sportsShadow)">
        <rect x="22" y="24" width="9" height="17" rx="3" fill="#0f172a" />
        <rect x="69" y="24" width="9" height="17" rx="3" fill="#0f172a" />
        <rect x="21" y="64" width="10" height="18" rx="3" fill="#0f172a" />
        <rect x="69" y="64" width="10" height="18" rx="3" fill="#0f172a" />

        <path d="
          M 50 10
          L 39 15 L 30 22 L 30 38 L 28 48 L 27 64 L 28 84 L 38 88 L 50 89
          L 62 88 L 72 84 L 73 64 L 72 48 L 70 38 L 70 22 L 61 15 Z
        " fill="url(#sportsGrad)" stroke="#090d16" stroke-width="1.2" />

        <polygon points="46,24 50,22 54,24 53,28 47,28" fill="#090d16" opacity="0.75" />
        <path d="M 34 35 Q 50 30 66 35 L 63 46 Q 50 43 37 46 Z" fill="#0284c7" opacity="0.9" stroke="#090d16" stroke-width="0.8" />
        <path d="M 37 47 Q 50 44 63 47 L 61 65 Q 50 67 39 65 Z" fill="#0f172a" />
        <polygon points="40,66 60,66 58,74 42,74" fill="#0284c7" opacity="0.8" />

        <rect x="26" y="86" width="48" height="4" rx="2" fill="#090d16" />
        <rect x="36" y="83" width="3" height="6" fill="#475569" />
        <rect x="61" y="83" width="3" height="6" fill="#475569" />

        <polygon points="34,17 40,14 38,20" fill="${n}" />
        <polygon points="66,17 60,14 62,20" fill="${n}" />

        <rect x="33" y="89" width="4" height="2" fill="#94a3b8" />
        <rect x="63" y="89" width="4" height="2" fill="#94a3b8" />
        <path d="M 31 85 L 42 85" stroke="${r}" stroke-width="2" stroke-linecap="round" />
        <path d="M 58 85 L 69 85" stroke="${r}" stroke-width="2" stroke-linecap="round" />
      </g>
    </svg>
  `;
}
function jt(e, t) {
	let n = t ? "#94a3b8" : "#fef08a", r = t ? "#991b1b" : "#ef4444";
	return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="suvShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
        <linearGradient id="suvGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${e}" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="${e}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${e}" stop-opacity="0.9"/>
        </linearGradient>
      </defs>

      <g filter="url(#suvShadow)">
        <rect x="24" y="22" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="68" y="22" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="24" y="66" width="8" height="17" rx="3" fill="#1e293b" />
        <rect x="68" y="66" width="8" height="17" rx="3" fill="#1e293b" />

        <path d="
          M 50 11
          C 40 11, 31 14, 30 22
          C 29 27, 28 50, 28 65
          C 28 78, 30 87, 34 89
          C 38 91, 45 92, 50 92
          C 55 92, 62 91, 66 89
          C 70 87, 72 78, 72 65
          C 72 50, 71 27, 70 22
          C 69 14, 60 11, 50 11 Z
        " fill="url(#suvGrad)" stroke="#0f172a" stroke-width="1.3" />

        <path d="M 34 31 Q 50 28 66 31 L 64 42 Q 50 40 36 42 Z" fill="#0284c7" opacity="0.88" />
        <rect x="36" y="44" width="28" height="26" rx="3" fill="#0f172a" opacity="0.9" />
        <line x1="33" y1="36" x2="33" y2="76" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />
        <line x1="67" y1="36" x2="67" y2="76" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />
        <path d="M 35 73 Q 50 72 65 73 L 64 81 Q 50 83 36 81 Z" fill="#0284c7" opacity="0.88" />

        <rect x="32" y="14" width="8" height="5" rx="2" fill="${n}" />
        <rect x="60" y="14" width="8" height="5" rx="2" fill="${n}" />

        <path d="M 33 89 L 41 90" stroke="${r}" stroke-width="3" stroke-linecap="round" />
        <path d="M 59 90 L 67 89" stroke="${r}" stroke-width="3" stroke-linecap="round" />
      </g>
    </svg>
  `;
}
function Mt(e, t) {
	let n = t ? "#94a3b8" : "#fef08a", r = t ? "#991b1b" : "#ef4444";
	return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="truckShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
        <linearGradient id="truckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${e}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${e}" stop-opacity="1"/>
        </linearGradient>
      </defs>

      <g filter="url(#truckShadow)">
        <rect x="23" y="22" width="7" height="16" rx="2" fill="#1e293b" />
        <rect x="70" y="22" width="7" height="16" rx="2" fill="#1e293b" />
        <rect x="21" y="65" width="9" height="18" rx="2" fill="#1e293b" />
        <rect x="70" y="65" width="9" height="18" rx="2" fill="#1e293b" />

        <path d="
          M 50 11
          C 40 11, 30 13, 29 20
          L 28 50 L 72 50 L 71 20
          C 70 13, 60 11, 50 11 Z
        " fill="url(#truckGrad)" stroke="#0f172a" stroke-width="1.2" />

        <path d="
          M 28 52
          L 28 90
          C 30 92, 45 93, 50 93
          C 55 93, 70 92, 72 90
          L 72 52 Z
        " fill="url(#truckGrad)" stroke="#0f172a" stroke-width="1.2" />

        <rect x="32" y="55" width="36" height="33" rx="2" fill="#334155" stroke="#1e293b" stroke-width="1" />
        <path d="M 33 26 Q 50 23 67 26 L 65 37 Q 50 35 35 37 Z" fill="#0284c7" opacity="0.9" />
        <rect x="36" y="38" width="28" height="10" rx="1" fill="#0f172a" opacity="0.6" />

        <circle cx="43" cy="14" r="1" fill="#f59e0b" />
        <circle cx="50" cy="14" r="1" fill="#f59e0b" />
        <circle cx="57" cy="14" r="1" fill="#f59e0b" />
        <rect x="31" y="15" width="8" height="4" rx="1" fill="${n}" />
        <rect x="61" y="15" width="8" height="4" rx="1" fill="${n}" />

        <rect x="30" y="89" width="6" height="3" fill="${r}" />
        <rect x="64" y="89" width="6" height="3" fill="${r}" />
      </g>
    </svg>
  `;
}
function Nt(e) {
	return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="arrowShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
        <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="20%" stop-color="${e}"/>
          <stop offset="100%" stop-color="${e}" stop-opacity="0.85"/>
        </linearGradient>
      </defs>

      <g filter="url(#arrowShadow)">
        <circle cx="50" cy="50" r="44" fill="${e}" opacity="0.15" />
        <circle cx="50" cy="50" r="38" fill="#ffffff" opacity="0.25" />
        <polygon points="50,10 82,82 50,66 18,82" fill="url(#arrowGrad)" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round" />
        <line x1="50" y1="14" x2="50" y2="64" stroke="#ffffff" stroke-width="2" opacity="0.8" />
      </g>
    </svg>
  `;
}
function Pt(e) {
	return `
    <svg class="vehicle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pointerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>

      <g filter="url(#pointerShadow)">
        <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="${e}" stroke-width="3" />
        <polygon points="50,14 62,50 50,44" fill="#ef4444" />
        <polygon points="50,14 38,50 50,44" fill="#dc2626" />
        <polygon points="50,86 62,50 50,44" fill="${e}" />
        <polygon points="50,86 38,50 50,44" fill="#64748b" />
        <circle cx="50" cy="50" r="5" fill="#ffffff" stroke="#1e293b" stroke-width="2" />
      </g>
    </svg>
  `;
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/decorate.js
function q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var Ft = o((() => {})), It = /* @__PURE__ */ c({ MapBearingCardEditor: () => Lt }), Lt, Rt = o((() => {
	Ft(), Lt = class extends He {
		setConfig(e) {
			this._config = {
				...dt,
				...e
			};
		}
		updated(e) {
			super.updated(e);
		}
		_valueChanged(e) {
			if (!this._config) return;
			let t = e.target;
			if (!t) return;
			let n = t.dataset.configKey;
			if (!n) return;
			let r;
			r = t.type === "checkbox" ? t.checked : t.type === "number" || t.type === "range" ? t.value === "" ? void 0 : Number(t.value) : t.value;
			let i = {
				...this._config,
				[n]: r
			};
			(r === void 0 || r === "") && delete i[n], this._config = i;
			let a = new CustomEvent("config-changed", {
				bubbles: !0,
				composed: !0,
				detail: { config: i }
			});
			this.dispatchEvent(a);
		}
		_selectColorPreset(e) {
			if (!this._config) return;
			let t = {
				...this._config,
				vehicle_color: e
			};
			this._config = t;
			let n = new CustomEvent("config-changed", {
				bubbles: !0,
				composed: !0,
				detail: { config: t }
			});
			this.dispatchEvent(n);
		}
		render() {
			if (!this.hass || !this._config) return F``;
			let e = Object.keys(this.hass.states).sort(), t = e.filter((e) => e.startsWith("device_tracker.") || e.startsWith("sensor.") || e.startsWith("person.")), n = e.filter((e) => e.startsWith("sensor.") || e.startsWith("binary_sensor."));
			return F`
      <div class="card-config">
        <!-- Main Vehicle Entity Selection -->
        <div class="config-section">
          <div class="section-title">Vehicle & Location</div>

          <div class="form-row">
            <label class="form-label" for="entity-select">Vehicle Location Entity (required)</label>
            <input
              id="entity-select"
              list="tracker-list"
              class="form-input"
              data-config-key="entity"
              .value=${this._config.entity || ""}
              @change=${this._valueChanged}
              placeholder="e.g. device_tracker.xpeng_g6_location"
            />
            <datalist id="tracker-list">
              ${t.map((e) => F`<option value=${e}></option>`)}
            </datalist>
          </div>

          <div class="form-row">
            <label class="form-label" for="card-title">Card Title (optional)</label>
            <input
              id="card-title"
              class="form-input"
              data-config-key="title"
              .value=${this._config.title || ""}
              @change=${this._valueChanged}
              placeholder="e.g. XPENG G6"
            />
          </div>

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="bearing-entity">Bearing Entity (optional)</label>
              <input
                id="bearing-entity"
                list="sensor-list"
                class="form-input"
                data-config-key="bearing_entity"
                .value=${this._config.bearing_entity || ""}
                @change=${this._valueChanged}
                placeholder="Auto-detected from course/bearing"
              />
              <datalist id="sensor-list">
                ${n.map((e) => F`<option value=${e}></option>`)}
              </datalist>
            </div>

            <div class="form-row">
              <label class="form-label" for="bearing-offset">Bearing Offset (°)</label>
              <input
                id="bearing-offset"
                type="number"
                class="form-input"
                data-config-key="bearing_offset"
                .value=${this._config.bearing_offset ?? 0}
                @change=${this._valueChanged}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <!-- Vehicle Model & XPENG Color Presets -->
        <div class="config-section">
          <div class="section-title">Vehicle Model & Styling</div>

          <div class="form-row">
            <label class="form-label" for="vehicle-type">Vehicle Model</label>
            <select
              id="vehicle-type"
              class="form-select"
              data-config-key="vehicle_type"
              .value=${this._config.vehicle_type || "xpeng_g6"}
              @change=${this._valueChanged}
            >
              ${[
				{
					value: "xpeng_g6",
					label: "XPENG G6 Coupe-SUV (Robot Face LED & Fastback)"
				},
				{
					value: "car",
					label: "Modern Aerodynamic Sedan / EV"
				},
				{
					value: "sports_car",
					label: "Sports Car (GT Aero)"
				},
				{
					value: "suv",
					label: "Standard SUV / Crossover"
				},
				{
					value: "truck",
					label: "Pickup Truck / Van"
				},
				{
					value: "arrow",
					label: "Navigation Arrow / Chevron"
				},
				{
					value: "pointer",
					label: "Compass Pointer"
				},
				{
					value: "custom",
					label: "Custom Image URL"
				}
			].map((e) => F`<option value=${e.value} ?selected=${this._config?.vehicle_type === e.value}>${e.label}</option>`)}
            </select>
          </div>

          <!-- XPENG Color Presets -->
          <div class="form-row">
            <label class="form-label">XPENG Factory Colors</label>
            <div class="preset-chips">
              ${ut.map((e) => F`
                  <button
                    type="button"
                    class="preset-chip ${this._config?.vehicle_color === e.hex ? "selected" : ""}"
                    @click=${() => this._selectColorPreset(e.hex)}
                    title="${e.name}"
                  >
                    <span class="chip-color" style="background-color: ${e.hex};"></span>
                    <span>${e.name.split(" ")[0]}</span>
                  </button>
                `)}
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="vehicle-color">Custom Vehicle Color</label>
              <div class="color-picker-wrap">
                <input
                  id="vehicle-color"
                  type="color"
                  class="color-input"
                  data-config-key="vehicle_color"
                  .value=${this._config.vehicle_color || "#ea580c"}
                  @input=${this._valueChanged}
                />
                <input
                  type="text"
                  class="form-input color-hex-text"
                  data-config-key="vehicle_color"
                  .value=${this._config.vehicle_color || "#ea580c"}
                  @change=${this._valueChanged}
                />
              </div>
            </div>

            <div class="form-row">
              <label class="form-label" for="vehicle-size">
                Vehicle Size: <strong>${this._config.vehicle_size || 48}px</strong>
              </label>
              <input
                id="vehicle-size"
                type="range"
                min="28"
                max="80"
                step="2"
                class="form-range"
                data-config-key="vehicle_size"
                .value=${this._config.vehicle_size || 48}
                @input=${this._valueChanged}
              />
            </div>
          </div>

          ${this._config.vehicle_type === "custom" ? F`
                <div class="form-row">
                  <label class="form-label" for="custom-img">Vehicle Image URL</label>
                  <input
                    id="custom-img"
                    class="form-input"
                    data-config-key="vehicle_image"
                    .value=${this._config.vehicle_image || ""}
                    @change=${this._valueChanged}
                    placeholder="/local/my_car_topdown.png"
                  />
                </div>
              ` : ""}
        </div>

        <!-- EV Telemetry Sensors (XPENG) -->
        <div class="config-section">
          <div class="section-title">XPENG & EV Telemetry Sensors</div>

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="battery-entity">Battery SOC Entity</label>
              <input
                id="battery-entity"
                list="sensor-list"
                class="form-input"
                data-config-key="battery_entity"
                .value=${this._config.battery_entity || ""}
                @change=${this._valueChanged}
                placeholder="Auto (sensor.*_battery_soc)"
              />
            </div>

            <div class="form-row">
              <label class="form-label" for="range-entity">Remaining Range Entity</label>
              <input
                id="range-entity"
                list="sensor-list"
                class="form-input"
                data-config-key="range_entity"
                .value=${this._config.range_entity || ""}
                @change=${this._valueChanged}
                placeholder="Auto (sensor.*_range)"
              />
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="speed-entity">Speed Entity</label>
              <input
                id="speed-entity"
                list="sensor-list"
                class="form-input"
                data-config-key="speed_entity"
                .value=${this._config.speed_entity || ""}
                @change=${this._valueChanged}
                placeholder="Auto from location entity"
              />
            </div>

            <div class="form-row">
              <label class="form-label" for="charging-entity">Charging State Entity</label>
              <input
                id="charging-entity"
                list="sensor-list"
                class="form-input"
                data-config-key="charging_entity"
                .value=${this._config.charging_entity || ""}
                @change=${this._valueChanged}
                placeholder="Auto (binary_sensor.*_charging)"
              />
            </div>
          </div>
        </div>

        <!-- Map & Navigation Settings -->
        <div class="config-section">
          <div class="section-title">Map & Navigation</div>

          <div class="form-grid-2">
            <div class="form-row">
              <label class="form-label" for="map-provider">Map Tiles</label>
              <select
                id="map-provider"
                class="form-select"
                data-config-key="map_provider"
                .value=${this._config.map_provider || "auto"}
                @change=${this._valueChanged}
              >
                ${[
				{
					value: "auto",
					label: "Auto (Matches HA Dark/Light Theme)"
				},
				{
					value: "carto_dark",
					label: "CartoDB Dark Matter (Dark)"
				},
				{
					value: "carto_light",
					label: "CartoDB Positron (Light)"
				},
				{
					value: "osm",
					label: "OpenStreetMap Standard"
				},
				{
					value: "satellite",
					label: "Satellite (Esri Imagery)"
				},
				{
					value: "opentopo",
					label: "OpenTopoMap (Topographic)"
				},
				{
					value: "custom",
					label: "Custom Tile URL"
				}
			].map((e) => F`<option value=${e.value} ?selected=${this._config?.map_provider === e.value}>${e.label}</option>`)}
              </select>
            </div>

            <div class="form-row">
              <label class="form-label" for="tile-api-key">Tile API Key</label>
              <input
                id="tile-api-key"
                type="text"
                class="form-input"
                placeholder="Enter Carto/custom tile API key"
                data-config-key="tile_api_key"
                .value=${this._config.tile_api_key || this._config.api_key || ""}
                @input=${this._valueChanged}
              />
              <div style="font-size: 11px; color: var(--secondary-text-color); margin-top: 4px;">
                For Carto tiles with API key restrictions, add your key. Also works as <code>api_key</code>.
              </div>
            </div>
          </div>

          <div class="form-row">
            <label class="form-label" for="card-height">Card Height</label>
            <input
              id="card-height"
              class="form-input"
              data-config-key="card_height"
              .value=${this._config.card_height || "400px"}
              @change=${this._valueChanged}
              placeholder="400px"
            />
          </div>
        </div>

        <!-- Display Toggles -->
        <div class="config-section">
          <div class="section-title">Display & Feature Options</div>

          <div class="toggle-grid">
            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="heads_up_mode"
                ?checked=${this._config.heads_up_mode === !0}
                @change=${this._valueChanged}
              />
              <span>Heads-Up Navigation Mode (Rotate map with car heading)</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_bearing_cone"
                ?checked=${this._config.show_bearing_cone !== !1}
                @change=${this._valueChanged}
              />
              <span>Directional Beam (Headlight Cone)</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_accuracy"
                ?checked=${this._config.show_accuracy !== !1}
                @change=${this._valueChanged}
              />
              <span>GPS Accuracy Circle</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="follow_vehicle"
                ?checked=${this._config.follow_vehicle !== !1}
                @change=${this._valueChanged}
              />
              <span>Auto-Follow Vehicle When Moving</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="recenter_button"
                ?checked=${this._config.recenter_button !== !1}
                @change=${this._valueChanged}
              />
              <span>Recenter Button</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_zones"
                ?checked=${this._config.show_zones !== !1}
                @change=${this._valueChanged}
              />
              <span>Show Zones (Home, Work, etc.)</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_hud"
                ?checked=${this._config.show_hud !== !1}
                @change=${this._valueChanged}
              />
              <span>HUD Overlay Panel (Speed, Battery, Range, State)</span>
            </label>

            <label class="toggle-item">
              <input
                type="checkbox"
                data-config-key="show_fix_age"
                ?checked=${this._config.show_fix_age !== !1}
                @change=${this._valueChanged}
              />
              <span>Show GPS Fix Freshness When Parked (e.g. Fix 12m ago)</span>
            </label>
          </div>
        </div>
      </div>
    `;
		}
		static {
			this.styles = _`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
      color: var(--primary-text-color, #1e293b);
      font-family: inherit;
    }

    .config-section {
      background: var(--card-background-color, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
      border-radius: 10px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--primary-color, #ea580c);
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
      padding-bottom: 6px;
      margin-bottom: 4px;
    }

    .form-row {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @media (max-width: 500px) {
      .form-grid-2 {
        grid-template-columns: 1fr;
      }
    }

    .form-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color, #64748b);
    }

    .form-input,
    .form-select {
      background: var(--input-idle-line-color, rgba(255, 255, 255, 0.08));
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 13px;
      color: var(--primary-text-color, inherit);
      outline: none;
      transition: border-color 0.2s;
    }

    .form-input:focus,
    .form-select:focus {
      border-color: var(--primary-color, #ea580c);
    }

    .preset-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .preset-chip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 9px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      color: var(--primary-text-color, inherit);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .preset-chip:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
    }

    .preset-chip.selected {
      border-color: var(--primary-color, #ea580c);
      background: rgba(234, 88, 12, 0.15);
    }

    .chip-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .color-picker-wrap {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .color-input {
      width: 38px;
      height: 36px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: transparent;
      padding: 0;
    }

    .color-hex-text {
      flex: 1;
    }

    .form-range {
      accent-color: var(--primary-color, #ea580c);
      cursor: pointer;
    }

    .toggle-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 9px;
    }

    .toggle-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      cursor: pointer;
      user-select: none;
    }

    .toggle-item input[type='checkbox'] {
      accent-color: var(--primary-color, #ea580c);
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  `;
		}
	}, q([Je({ attribute: !1 })], Lt.prototype, "hass", void 0), q([z()], Lt.prototype, "_config", void 0);
}));
Ke(), it(), pt(), Ft();
var J = class extends He {
	constructor(...e) {
		super(...e), this._vehicleState = null, this._isFollowing = !0, this._hasValidCoords = !1, this._currentThemeDark = !1, this._headsUpMode = !1, this._map = null, this._vehicleMarker = null, this._accuracyCircle = null, this._trailPolyline = null, this._zoneLayers = new B.LayerGroup(), this._tileLayer = null, this._currentTileKey = "", this._lastRotatedAngle = 0, this._trailPoints = [], this._previousPos = null, this._resizeObserver = null, this._historyLoaded = !1;
	}
	static getStubConfig(e) {
		let t = Object.keys(e.states).find((e) => e.includes("xpeng") && e.startsWith("device_tracker.")), n = Object.keys(e.states).find((e) => e.startsWith("device_tracker.") || e.startsWith("sensor."));
		return {
			type: `custom:${ct}`,
			entity: t || n || "device_tracker.xpeng_g6_location",
			title: "XPENG G6",
			vehicle_type: "xpeng_g6",
			vehicle_color: "#ea580c",
			show_bearing_cone: !0,
			show_accuracy: !0,
			show_hud: !0,
			show_range: !0,
			show_charging: !0,
			heads_up_mode: !1,
			default_zoom: 16
		};
	}
	static async getConfigElement() {
		return await Promise.resolve().then(() => (Rt(), It)), document.createElement("map-bearing-card-editor");
	}
	setConfig(e) {
		if (!e.entity) throw Error("Please define an entity (e.g. device_tracker or sensor) in the card configuration.");
		this._config = {
			...dt,
			...e
		}, this._headsUpMode = !!this._config.heads_up_mode, this._map && (this._updateTileLayer(), requestAnimationFrame(() => this._map?.invalidateSize()));
	}
	connectedCallback() {
		super.connectedCallback(), this._map ? (requestAnimationFrame(() => this._map?.invalidateSize()), setTimeout(() => this._map?.invalidateSize(), 250)) : requestAnimationFrame(() => {
			!this._map && this.shadowRoot?.querySelector("#map") && this._initMap();
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._resizeObserver &&= (this._resizeObserver.disconnect(), null), this._map &&= (this._map.remove(), null);
	}
	firstUpdated() {
		this._initMap(), this._setupResizeObserver();
	}
	updated(e) {
		super.updated(e), !this._map && this.shadowRoot?.querySelector("#map") && this._initMap(), e.has("hass") && this.hass && this._config && (this._updateVehicleFromHass(), this._checkThemeChange(), !this._historyLoaded && this._config.history_trail?.hours_to_show && this._loadHistoryFromHA()), e.has("_config") && this._config && this._map && this._updateTileLayer();
	}
	_setupResizeObserver() {
		let e = this.shadowRoot?.querySelector("#map-container");
		e && window.ResizeObserver && (this._resizeObserver = new ResizeObserver(() => {
			this._map && this._map.invalidateSize();
		}), this._resizeObserver.observe(e));
	}
	_isDarkMode() {
		return this._config.dark_mode === !0 ? !0 : this._config.dark_mode === !1 ? !1 : this.hass?.themes?.darkMode === void 0 ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches : !!this.hass.themes.darkMode;
	}
	_checkThemeChange() {
		let e = this._isDarkMode();
		e !== this._currentThemeDark && (this._currentThemeDark = e, this._config.map_provider !== "auto" && this._config.map_provider || this._updateTileLayer());
	}
	_initMap() {
		let e = this.shadowRoot?.querySelector("#map");
		if (!e || this._map) return;
		let t = this._config?.default_zoom || 16, n = this._config?.min_zoom || 3, r = this._config?.max_zoom || 19;
		this._map = B.map(e, {
			zoomControl: !1,
			attributionControl: !1,
			minZoom: n,
			maxZoom: r
		}), B.control.zoom({ position: "bottomright" }).addTo(this._map), B.control.attribution({
			position: "bottomleft",
			prefix: !1
		}).addTo(this._map), this._updateTileLayer(), this._zoneLayers.addTo(this._map), this._map.on("dragstart", () => {
			this._isFollowing = !1;
		}), this._vehicleState && this._vehicleState.latitude !== null && this._vehicleState.longitude !== null ? this._map.setView([this._vehicleState.latitude, this._vehicleState.longitude], t) : this._map.setView([51.505, -.09], t), requestAnimationFrame(() => {
			this._map && (this._map.invalidateSize(), this._renderMapElements());
		}), setTimeout(() => {
			this._map && (this._map.invalidateSize(), this._renderMapElements());
		}, 200);
	}
	_updateTileLayer() {
		if (!this._map) return;
		let e = this._config.map_provider || "auto", t;
		t = e === "auto" ? this._isDarkMode() ? ft.carto_dark : ft.osm : e === "custom" && this._config.tile_url ? {
			url: this._config.tile_url,
			attribution: this._config.tile_attribution || ""
		} : ft[e] || ft.osm;
		let n = this._config.tile_api_key || this._config.api_key;
		if (n && t.url) {
			if (t.url.includes("{apikey}") || t.url.includes("{key}") || t.url.includes("{access_token}")) t = {
				...t,
				url: t.url.replace("{apikey}", encodeURIComponent(n)).replace("{key}", encodeURIComponent(n)).replace("{access_token}", encodeURIComponent(n))
			};
			else if (t.url.includes("cartocdn.com")) {
				if (!t.url.includes("key=")) {
					let e = t.url.includes("?") ? "&" : "?";
					t = {
						...t,
						url: `${t.url}${e}key=${encodeURIComponent(n)}`
					};
				}
			} else if (e === "custom" && t.url && !t.url.includes("key=") && !t.url.includes("api_key=") && !t.url.includes("access_token=")) {
				let e = t.url.includes("?") ? "&" : "?";
				t = {
					...t,
					url: `${t.url}${e}key=${encodeURIComponent(n)}`
				};
			}
		}
		let r = `${e}-${t.url}`;
		this._tileLayer && this._currentTileKey === r || (this._tileLayer && this._map.removeLayer(this._tileLayer), this._tileLayer = B.tileLayer(t.url, {
			attribution: t.attribution,
			subdomains: t.subdomains || [
				"a",
				"b",
				"c",
				"d"
			],
			maxZoom: t.maxZoom || 19
		}).addTo(this._map), this._currentTileKey = r);
	}
	_updateVehicleFromHass() {
		let e = W(this.hass, this._config, this._previousPos);
		this._vehicleState = e;
		let t = e.latitude !== null && e.longitude !== null;
		if (this._hasValidCoords = t, t) {
			if (this._previousPos = {
				lat: e.latitude,
				lon: e.longitude
			}, this._config.history_trail?.enabled !== !1) {
				let t = this._config.history_trail?.max_points || 120, n = this._trailPoints[this._trailPoints.length - 1];
				n && n[0] === e.latitude && n[1] === e.longitude || (this._trailPoints.push([e.latitude, e.longitude]), this._trailPoints.length > t && this._trailPoints.shift());
			}
			this._renderMapElements(), this._isFollowing && this._config.follow_vehicle !== !1 && this._map && this._map.panTo([e.latitude, e.longitude], {
				animate: !0,
				duration: .75
			});
		}
	}
	async _loadHistoryFromHA() {
		if (!this._historyLoaded && this.hass?.callApi && this._config.entity) {
			this._historyLoaded = !0;
			try {
				let e = this._config.history_trail?.hours_to_show || 2, t = `history/period/${(/* @__PURE__ */ new Date(Date.now() - e * 3600 * 1e3)).toISOString()}?filter_entity_id=${this._config.entity}&minimal_response&significant_changes_only=0`, n = await this.hass.callApi("GET", t);
				if (Array.isArray(n) && n.length > 0 && Array.isArray(n[0])) {
					let e = [];
					for (let t of n[0]) {
						let n = parseFloat(t.attributes?.latitude), r = parseFloat(t.attributes?.longitude);
						isFinite(n) && isFinite(r) && e.push([n, r]);
					}
					e.length > 0 && (this._trailPoints = e, this._renderMapElements());
				}
			} catch {}
		}
	}
	_renderMapElements() {
		if (!this._map && (this._initMap(), !this._map) || !this._vehicleState || !this._hasValidCoords) return;
		let { latitude: e, longitude: t, bearing: n, accuracy: r, isMoving: i } = this._vehicleState;
		if (e === null || t === null) return;
		let a = B.latLng(e, t), o = this._config.vehicle_color || "#ea580c", s = this._config.vehicle_size || 48, c = this._config.show_bearing_cone !== !1, l = _t(n ?? 0, this._lastRotatedAngle);
		this._lastRotatedAngle = l;
		let u = this.shadowRoot?.querySelector("#map");
		u && (u.style.transform = "none");
		let d = Ot(this._config.vehicle_type, o, this._config.vehicle_image, !i), f = c ? Dt(this._config.cone_color || o, .38, !i) : "", p = `
      <div class="map-bearing-vehicle-wrapper" style="width: ${s}px; height: ${s}px;">
        <div class="vehicle-bearing-rotator" style="transform: rotate(${this._headsUpMode ? 0 : l}deg);">
          ${f}
          <div class="vehicle-icon-inner" style="width: 100%; height: 100%;">
            ${d}
          </div>
        </div>
      </div>
    `, m = B.divIcon({
			className: "map-bearing-custom-div-icon",
			html: p,
			iconSize: [s, s],
			iconAnchor: [s / 2, s / 2]
		});
		if (this._vehicleMarker ? (this._vehicleMarker.setLatLng(a), this._vehicleMarker.setIcon(m)) : (this._vehicleMarker = B.marker(a, {
			icon: m,
			zIndexOffset: 1e3
		}).addTo(this._map), this._vehicleMarker.on("click", () => this._handleEntityClick())), this._config.show_accuracy !== !1 && r !== null && r > 0 ? this._accuracyCircle ? (this._accuracyCircle.setLatLng(a), this._accuracyCircle.setRadius(r), this._accuracyCircle.setStyle({
			color: o,
			fillColor: o
		})) : this._accuracyCircle = B.circle(a, {
			radius: r,
			color: o,
			weight: 1.5,
			opacity: .6,
			fillColor: o,
			fillOpacity: .1,
			dashArray: "4, 4"
		}).addTo(this._map) : this._accuracyCircle &&= (this._map.removeLayer(this._accuracyCircle), null), this._config.history_trail?.enabled !== !1 && this._trailPoints.length > 1) {
			let e = this._config.history_trail?.trail_color || o, t = this._config.history_trail?.trail_width || 3;
			this._trailPolyline ? (this._trailPolyline.setLatLngs(this._trailPoints), this._trailPolyline.setStyle({
				color: e,
				weight: t
			})) : this._trailPolyline = B.polyline(this._trailPoints, {
				color: e,
				weight: t,
				opacity: .75,
				dashArray: "6, 6"
			}).addTo(this._map);
		}
		this._config.show_zones !== !1 && this._renderZones();
	}
	_renderZones() {
		if (!this._map || !this.hass) return;
		this._zoneLayers.clearLayers();
		let e = Tt(this.hass);
		for (let t of e) {
			if (t.passive) continue;
			let e = B.circle([t.latitude, t.longitude], {
				radius: t.radius,
				color: "#0284c7",
				fillColor: "#38bdf8",
				fillOpacity: .15,
				weight: 1.5,
				dashArray: "3, 4"
			});
			e.bindTooltip(t.name, {
				permanent: !1,
				direction: "top",
				className: "zone-tooltip"
			}), this._zoneLayers.addLayer(e);
		}
	}
	_handleRecenter() {
		if (this._isFollowing = !0, this._map && this._vehicleState && this._vehicleState.latitude !== null && this._vehicleState.longitude !== null) {
			let e = this._config.default_zoom || 16;
			this._map.setView([this._vehicleState.latitude, this._vehicleState.longitude], e, {
				animate: !0,
				duration: .6
			});
		}
	}
	_toggleHeadsUpMode() {
		this._headsUpMode = !this._headsUpMode, this._renderMapElements();
	}
	_handleEntityClick() {
		let e = this._config.entity;
		if (!e) return;
		let t = new CustomEvent("hass-more-info", {
			bubbles: !0,
			composed: !0,
			detail: { entityId: e }
		});
		this.dispatchEvent(t);
	}
	render() {
		if (!this._config) return F`<ha-card><div class="card-warning">Card not configured</div></ha-card>`;
		let e = typeof this._config.card_height == "number" ? `${this._config.card_height}px` : this._config.card_height || "400px", t = this._vehicleState, n = this._config.show_hud !== !1, r = t?.bearing !== null && t?.bearing !== void 0, i = t?.speed !== null, a = t?.battery !== null, o = t?.range !== null;
		return F`
      <ha-card class="map-bearing-card">
        <div id="map-container" style="height: ${e};">
          <div id="map"></div>

          ${this._hasValidCoords ? "" : F`
                <div class="no-gps-overlay">
                  <div class="no-gps-box">
                    <svg class="no-gps-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div class="no-gps-title">Waiting for GPS location</div>
                    <div class="no-gps-subtitle">${this._config.entity}</div>
                  </div>
                </div>
              `}

          ${n && t ? F`
                <!-- Top HUD Bar: Name, Status, EV Metrics (Speed, Battery, Range, Charging) -->
                <div class="hud-top-bar" @click=${this._handleEntityClick}>
                  <div class="hud-title-wrap">
                    <span class="hud-entity-name">${t.name}</span>
                    <span class="hud-state-badge ${t.isMoving ? "moving" : "parked"}">
                      ${t.stateText}
                    </span>
                  </div>

                  <div class="hud-metrics-wrap">
                    ${this._config.show_speed !== !1 && i ? F`
                          <div class="hud-badge speed-badge">
                            <svg class="hud-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M12 6v6l4 2"/>
                            </svg>
                            <span>${t.speed}</span>
                          </div>
                        ` : ""}

                    ${this._config.show_battery !== !1 && a ? F`
                          <div class="hud-badge battery-badge ${t.isCharging ? "charging" : ""}">
                            ${t.isCharging ? F`
                                  <svg class="hud-icon charge-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
                                  </svg>
                                ` : F`
                                  <svg class="hud-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="7" width="16" height="10" rx="2" ry="2"/>
                                    <line x1="22" y1="11" x2="22" y2="13"/>
                                  </svg>
                                `}
                            <span>${t.battery}%</span>
                          </div>
                        ` : ""}

                    ${this._config.show_range !== !1 && o ? F`
                          <div class="hud-badge range-badge">
                            <svg class="hud-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            <span>${t.range}</span>
                          </div>
                        ` : ""}
                  </div>
                </div>

                <!-- Bottom HUD Bar: Compass, Heads-Up Toggle, Recenter -->
                <div class="hud-bottom-bar">
                  <div class="hud-left-controls">
                    ${this._config.show_bearing !== !1 && r ? F`
                          <div class="hud-compass-chip">
                            <svg
                              class="compass-needle-icon"
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              style="transform: rotate(${t.bearing}deg);"
                            >
                              <polygon points="12,2 17,21 12,17 7,21" fill="#ef4444" />
                            </svg>
                            <span class="compass-text">${bt(t.bearing)}</span>
                          </div>
                        ` : ""}

                    <button
                      class="nav-mode-btn ${this._headsUpMode ? "active" : ""}"
                      @click=${this._toggleHeadsUpMode}
                      title="Toggle Heads-Up (rotating map) or North-Up mode"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="12,6 16,14 12,12 8,14" fill="currentColor" />
                      </svg>
                      <span>${this._headsUpMode ? "Heads-Up" : "North-Up"}</span>
                    </button>
                  </div>

                  <div class="hud-controls">
                    ${this._config.recenter_button !== !1 && !this._isFollowing ? F`
                          <button
                            class="recenter-btn"
                            @click=${this._handleRecenter}
                            title="Re-center on vehicle"
                          >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="9"/>
                              <circle cx="12" cy="12" r="3"/>
                              <line x1="12" y1="1" x2="12" y2="5"/>
                              <line x1="12" y1="19" x2="12" y2="23"/>
                              <line x1="1" y1="12" x2="5" y2="12"/>
                              <line x1="19" y1="12" x2="23" y2="12"/>
                            </svg>
                            <span>Recenter</span>
                          </button>
                        ` : ""}

                    ${this._config.show_last_updated !== !1 && t.lastUpdated ? F`
                          <div class="last-updated-chip">
                            ${t.lastUpdated}
                          </div>
                        ` : ""}
                  </div>
                </div>
              ` : ""}
        </div>
      </ha-card>
    `;
	}
	static {
		this.styles = [g(ot), _`
      :host {
        display: block;
        --card-radius: var(--ha-card-border-radius, 16px);
        --primary-color: var(--primary-color, #ea580c);
      }

      ha-card {
        overflow: hidden;
        position: relative;
        border-radius: var(--card-radius);
      }

      #map-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        background-color: var(--primary-background-color, #1e293b);
      }

      #map {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        transform-origin: center center;
        transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
      }

      /* Vehicle Marker Styles */
      .map-bearing-custom-div-icon {
        background: transparent !important;
        border: none !important;
        overflow: visible !important;
      }

      .map-bearing-vehicle-wrapper {
        position: relative;
        overflow: visible;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .vehicle-bearing-rotator {
        width: 100%;
        height: 100%;
        transform-origin: center center;
        transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .vehicle-icon-inner {
        position: relative;
        z-index: 2;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* No GPS overlay */
      .no-gps-overlay {
        position: absolute;
        inset: 0;
        z-index: 500;
        background: rgba(15, 23, 42, 0.78);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .no-gps-box {
        text-align: center;
        color: #f8fafc;
        padding: 24px 32px;
        background: rgba(30, 41, 59, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      }

      .no-gps-icon {
        stroke: #f59e0b;
        margin-bottom: 8px;
      }

      .no-gps-title {
        font-weight: 600;
        font-size: 16px;
      }

      .no-gps-subtitle {
        font-size: 13px;
        color: #94a3b8;
        margin-top: 4px;
        font-family: monospace;
      }

      /* Top HUD Bar */
      .hud-top-bar {
        position: absolute;
        top: 12px;
        left: 12px;
        right: 12px;
        z-index: 400;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
        flex-wrap: wrap;
        gap: 8px;
      }

      .hud-title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        padding: 6px 14px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        pointer-events: auto;
        cursor: pointer;
        transition: transform 0.15s ease, background-color 0.15s ease;
      }

      .hud-title-wrap:hover {
        background: rgba(15, 23, 42, 0.95);
        transform: translateY(-1px);
      }

      .hud-entity-name {
        font-weight: 700;
        font-size: 13px;
        color: #ffffff;
        letter-spacing: -0.2px;
      }

      .hud-state-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 10px;
        background: rgba(148, 163, 184, 0.2);
        color: #e2e8f0;
      }

      .hud-state-badge.moving {
        background: rgba(34, 197, 94, 0.28);
        color: #4ade80;
      }

      .hud-state-badge.parked {
        background: rgba(148, 163, 184, 0.18);
        color: #cbd5e1;
      }

      .hud-metrics-wrap {
        display: flex;
        gap: 6px;
        pointer-events: auto;
      }

      .hud-badge {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 11px;
        border-radius: 18px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: #f8fafc;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
      }

      .speed-badge svg {
        stroke: #38bdf8;
      }

      .battery-badge svg {
        stroke: #4ade80;
      }

      .battery-badge.charging {
        border-color: #22c55e;
        color: #4ade80;
      }

      .charge-icon {
        color: #22c55e;
        animation: pulse 1.8s infinite ease-in-out;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.9); }
      }

      .range-badge svg {
        stroke: #f59e0b;
      }

      /* Bottom HUD Bar */
      .hud-bottom-bar {
        position: absolute;
        bottom: 12px;
        left: 12px;
        right: 12px;
        z-index: 400;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
      }

      .hud-left-controls {
        display: flex;
        align-items: center;
        gap: 6px;
        pointer-events: auto;
      }

      .hud-compass-chip {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 5px 11px;
        border-radius: 16px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        color: #ffffff;
        font-size: 12px;
        font-weight: 600;
      }

      .compass-needle-icon {
        transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
      }

      .nav-mode-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 16px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        color: #cbd5e1;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .nav-mode-btn.active {
        background: #0284c7;
        color: #ffffff;
        border-color: #38bdf8;
      }

      .hud-controls {
        display: flex;
        align-items: center;
        gap: 6px;
        pointer-events: auto;
      }

      .recenter-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 18px;
        background: var(--primary-color, #ea580c);
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: filter 0.15s ease, transform 0.15s ease;
      }

      .recenter-btn:hover {
        filter: brightness(1.15);
        transform: translateY(-1px);
      }

      .last-updated-chip {
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(6px);
        color: #94a3b8;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      /* Custom Leaflet Controls */
      .leaflet-control-zoom {
        border: none !important;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35) !important;
        border-radius: 8px !important;
        overflow: hidden;
        margin-right: 12px !important;
        margin-bottom: 48px !important;
      }

      .leaflet-control-zoom a {
        background-color: rgba(15, 23, 42, 0.88) !important;
        color: #f8fafc !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
        backdrop-filter: blur(8px);
      }

      .leaflet-control-zoom a:hover {
        background-color: rgba(30, 41, 59, 0.95) !important;
      }

      .leaflet-control-attribution {
        background: rgba(15, 23, 42, 0.65) !important;
        color: #94a3b8 !important;
        font-size: 9px !important;
        padding: 2px 6px !important;
        border-radius: 4px;
        margin-left: 12px !important;
        margin-bottom: 4px !important;
      }

      .leaflet-control-attribution a {
        color: #cbd5e1 !important;
        text-decoration: none;
      }

      /* Zone Tooltip */
      .zone-tooltip {
        background: rgba(15, 23, 42, 0.88) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        color: #f8fafc !important;
        font-size: 11px !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
        padding: 3px 6px !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
      }
      .zone-tooltip::before {
        border-top-color: rgba(15, 23, 42, 0.88) !important;
      }
    `];
	}
};
q([Je({ attribute: !1 })], J.prototype, "hass", void 0), q([z()], J.prototype, "_config", void 0), q([z()], J.prototype, "_vehicleState", void 0), q([z()], J.prototype, "_isFollowing", void 0), q([z()], J.prototype, "_hasValidCoords", void 0), q([z()], J.prototype, "_currentThemeDark", void 0), q([z()], J.prototype, "_headsUpMode", void 0), Rt(), pt(), customElements.get("map-bearing-card") || customElements.define(ct, J), customElements.get("map-bearing-card-editor") || customElements.define(lt, Lt), window.customCards = window.customCards || [], window.customCards.some((e) => e.type === "map-bearing-card") || window.customCards.push({
	type: ct,
	name: "Map Bearing Card",
	description: "Displays a live map with a vehicle rotated to its heading/bearing.",
	preview: !0,
	documentationURL: "https://github.com/nicks-technik/map-bearing-card"
}), console.info(`%c MAP-BEARING-CARD %c v${st} `, "color: #ffffff; background: #1e88e5; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;", "color: #38bdf8; background: #0f172a; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;");
export { J as MapBearingCard, Lt as MapBearingCardEditor };
