(function (j, e, g) {
    var o = {
        beforeShow: b,
        move: b,
        change: b,
        show: b,
        hide: b,
        color: false,
        flat: false,
        showInput: false,
        showButtons: true,
        clickoutFiresChange: false,
        showInitial: false,
        showPalette: false,
        showPaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        preferredFormat: false,
        className: "",
        showAlpha: false,
        theme: "guif-light",
        palette: ["fff", "000"],
        selectionPalette: [],
        disabled: false
    }, d = [],
        k = !! /msie/i.exec(j.navigator.userAgent),
        n = (function () {
            function v(z, y) {
                return !!~("" + z).indexOf(y)
            }
            var x = document.createElement("div");
            var w = x.style;
            w.cssText = "background-color:rgba(0,0,0,.5)";
            return v(w.backgroundColor, "rgba") || v(w.backgroundColor, "hsla")
        })(),
        s = ["<div class='guif-replacer'>", "<div class='guif-preview'><div class='guif-preview-inner'></div></div>", "<div class='guif-dd'>&#9660;</div>", "</div>"].join(""),
        r = (function () {
            var v = "";
            if (k) {
                for (var w = 1; w <= 6; w++) {
                    v += "<div class='guif-" + w + "'></div>"
                }
            }
            return ["<div class='guif-container guif-hidden'>", "<div class='guif-palette-container'>", "<div class='guif-palette guif-thumb guif-cf'></div>", "</div>", "<div class='guif-picker-container'>", "<div class='guif-top guif-cf'>", "<div class='guif-fill'></div>", "<div class='guif-top-inner'>", "<div class='guif-color'>", "<div class='guif-sat'>", "<div class='guif-val'>", "<div class='guif-dragger'></div>", "</div>", "</div>", "</div>", "<div class='guif-hue'>", "<div class='guif-slider'></div>", v, "</div>", "</div>", "<div class='guif-alpha'><div class='guif-alpha-inner'><div class='guif-alpha-handle'></div></div></div>", "</div>", "<div class='guif-input-container guif-cf'>", "<input class='guif-input' type='text' spellcheck='false'  />", "</div>", "<div class='guif-initial guif-thumb guif-cf'></div>", "<div class='guif-button-container guif-cf'>", "<a class='guif-cancel' href='#'></a>", "<button class='guif-choose'></button>", "</div>", "</div>", "</div>"].join("")
        })();

    function t(B, w, z) {
        var y = [];
        for (var x = 0; x < B.length; x++) {
            var v = tinycolor(B[x]);
            var C = v.toHsl().l < 0.5 ? "guif-thumb-el guif-thumb-dark" : "guif-thumb-el guif-thumb-light";
            C += (tinycolor.equals(w, B[x])) ? " guif-thumb-active" : "";
            var A = n ? ("background-color:" + v.toRgbString()) : "filter:" + v.toFilter();
            y.push('<span title="' + v.toRgbString() + '" data-color="' + v.toRgbString() + '" class="' + C + '"><span class="guif-thumb-inner" style="' + A + ';" /></span>')
        }
        return "<div class='guif-cf " + z + "'>" + y.join("") + "</div>"
    }

    function q() {
        for (var v = 0; v < d.length; v++) {
            if (d[v]) {
                d[v].hide()
            }
        }
    }

    function p(x, v) {
        var w = e.extend({}, o, x);
        w.callbacks = {
            move: u(w.move, v),
            change: u(w.change, v),
            show: u(w.show, v),
            hide: u(w.hide, v),
            beforeShow: u(w.beforeShow, v)
        };
        return w
    }

    function i(aX, ae) {
        var aW = p(ae, aX),
            aU = aW.flat,
            U = aW.showSelectionPalette,
            w = aW.localStorageKey,
            ag = aW.theme,
            P = aW.callbacks,
            C = f(aa, 10),
            M = false,
            aF = 0,
            ac = 0,
            aG = 0,
            ar = 0,
            J = 0,
            aq = 0,
            aP = 0,
            ak = 0,
            W = 0,
            N = 0,
            av = 0,
            aQ = 1,
            af = aW.palette.slice(0),
            ah = e.isArray(af[0]) ? af : [af],
            aB = aW.selectionPalette.slice(0),
            aA = aW.maxSelectionSize,
            x = "guif-dragging",
            E = null;
        var V = aX.ownerDocument,
            L = V.body,
            B = e(aX),
            aN = false,
            aH = e(r, V).addClass(ag),
            G = aH.find(".guif-color"),
            aE = aH.find(".guif-dragger"),
            K = aH.find(".guif-hue"),
            aT = aH.find(".guif-slider"),
            ax = aH.find(".guif-alpha-inner"),
            X = aH.find(".guif-alpha"),
            ay = aH.find(".guif-alpha-handle"),
            I = aH.find(".guif-input"),
            O = aH.find(".guif-palette"),
            aV = aH.find(".guif-initial"),
            aj = aH.find(".guif-cancel"),
            F = aH.find(".guif-choose"),
            Q = B.is("input"),
            au = Q && !aU,
            aL = (au) ? e(s).addClass(ag).addClass(aW.className) : e([]),
            ao = (au) ? aL : B,
            H = aL.find(".guif-preview-inner"),
            R = aW.color || (Q && B.val()),
            aI = false,
            T = aW.preferredFormat,
            am = T,
            D = !aW.showButtons || aW.clickoutFiresChange;

        function v() {
            aH.toggleClass("guif-flat", aU);
            aH.toggleClass("guif-input-disabled", !aW.showInput);
            aH.toggleClass("guif-alpha-enabled", aW.showAlpha);
            aH.toggleClass("guif-buttons-disabled", !aW.showButtons);
            aH.toggleClass("guif-palette-disabled", !aW.showPalette);
            aH.toggleClass("guif-palette-only", aW.showPaletteOnly);
            aH.toggleClass("guif-initial-disabled", !aW.showInitial);
            aH.addClass(aW.className);
            aa()
        }

        function aC() {
            if (k) {
                aH.find("*:not(input)").attr("unselectable", "on")
            }
            v();
            if (au) {
                B.after(aL).hide()
            }
            if (aU) {
                B.after(aH).hide()
            } else {
                var a2 = aW.appendTo === "parent" ? B.parent() : e(aW.appendTo);
                if (a2.length !== 1) {
                    a2 = e("body")
                }
                a2.append(aH)
            } if (w && j.localStorage) {
                try {
                    var a0 = j.localStorage[w].split(",#");
                    if (a0.length > 1) {
                        delete j.localStorage[w];
                        e.each(a0, function (a4, a5) {
                            aM(a5)
                        })
                    }
                } catch (a3) {}
                try {
                    aB = j.localStorage[w].split(";")
                } catch (a3) {}
            }
            ao.bind("click.guifcolor touchstart.guifcolor", function (a4) {
                if (!aN) {
                    ap()
                }
                a4.stopPropagation();
                if (!e(a4.target).is("input")) {
                    a4.preventDefault()
                }
            });
            if (B.is(":disabled") || (aW.disabled === true)) {
                S()
            }
            aH.click(m);
            I.change(aJ);
            I.bind("paste", function () {
                setTimeout(aJ, 1)
            });
            I.keydown(function (a4) {
                if (a4.keyCode == 13) {
                    aJ()
                }
            });
            aj.text(aW.cancelText);
            aj.bind("click.guifcolor", function (a4) {
                a4.stopPropagation();
                a4.preventDefault();
                az("cancel")
            });
            F.text(aW.chooseText);
            F.bind("click.guifcolor", function (a4) {
                a4.stopPropagation();
                a4.preventDefault();
                if (at()) {
                    ai(true);
                    az()
                }
            });
            c(X, function (a6, a5, a4) {
                aQ = (a6 / aq);
                if (a4.shiftKey) {
                    aQ = Math.round(aQ * 10) / 10
                }
                aD()
            });
            c(K, function (a5, a4) {
                W = parseFloat(a4 / ar);
                aD()
            }, A, aY);
            c(G, function (bb, a9, a8) {
                if (!a8.shiftKey) {
                    E = null
                } else {
                    if (!E) {
                        var a6 = N * aF;
                        var a4 = ac - (av * ac);
                        var a5 = Math.abs(bb - a6) > Math.abs(a9 - a4);
                        E = a5 ? "x" : "y"
                    }
                }
                var a7 = !E || E === "x";
                var ba = !E || E === "y";
                if (a7) {
                    N = parseFloat(bb / aF)
                }
                if (ba) {
                    av = parseFloat((ac - a9) / ac)
                }
                aD()
            }, A, aY);
            if ( !! R) {
                Z(R);
                aw();
                am = T || tinycolor(R).format;
                aM(R)
            } else {
                aw()
            } if (aU) {
                z()
            }

            function a1(a4) {
                if (a4.data && a4.data.ignore) {
                    Z(e(this).data("color"));
                    aD()
                } else {
                    Z(e(this).data("color"));
                    ai(true);
                    aD();
                    az()
                }
                return false
            }
            var aZ = k ? "mousedown.guifcolor" : "click.guifcolor touchstart.guifcolor";
            O.delegate(".guif-thumb-el", aZ, a1);
            aV.delegate(".guif-thumb-el:nth-child(1)", aZ, {
                ignore: true
            }, a1)
        }

        function aM(aZ) {
            if (U) {
                var a1 = tinycolor(aZ).toRgbString();
                if (e.inArray(a1, aB) === -1) {
                    aB.push(a1);
                    while (aB.length > aA) {
                        aB.shift()
                    }
                }
                if (w && j.localStorage) {
                    try {
                        j.localStorage[w] = aB.join(";")
                    } catch (a0) {}
                }
            }
        }

        function aO() {
            var a4 = [];
            var a3 = aB;
            var a2 = {};
            var a0;
            if (aW.showPalette) {
                for (var a1 = 0; a1 < ah.length; a1++) {
                    for (var aZ = 0; aZ < ah[a1].length; aZ++) {
                        a0 = tinycolor(ah[a1][aZ]).toRgbString();
                        a2[a0] = true
                    }
                }
                for (a1 = 0; a1 < a3.length; a1++) {
                    a0 = tinycolor(a3[a1]).toRgbString();
                    if (!a2.hasOwnProperty(a0)) {
                        a4.push(a3[a1]);
                        a2[a0] = true
                    }
                }
            }
            return a4.reverse().slice(0, aW.maxSelectionSize)
        }

        function aR() {
            var aZ = aK();
            var a0 = e.map(ah, function (a1, a2) {
                return t(a1, aZ, "guif-palette-row guif-palette-row-" + a2)
            });
            if (aB) {
                a0.push(t(aO(), aZ, "guif-palette-row guif-palette-row-selection"))
            }
            O.html(a0.join(""))
        }

        function al() {
            if (aW.showInitial) {
                var aZ = aI;
                var a0 = aK();
                aV.html(t([aZ, a0], a0, "guif-palette-row-initial"))
            }
        }

        function A() {
            if (ac <= 0 || aF <= 0 || ar <= 0) {
                aa()
            }
            aH.addClass(x);
            E = null
        }

        function aY() {
            aH.removeClass(x)
        }

        function aJ() {
            var aZ = tinycolor(I.val());
            if (aZ.ok) {
                Z(aZ)
            } else {
                I.addClass("guif-validation-error")
            }
        }

        function ap() {
            if (M) {
                az()
            } else {
                z()
            }
        }

        function z() {
            var aZ = e.Event("beforeShow.guifcolor");
            if (M) {
                aa();
                return
            }
            B.trigger(aZ, [aK()]);
            if (P.beforeShow(aK()) === false || aZ.isDefaultPrevented()) {
                return
            }
            q();
            M = true;
            e(V).bind("click.guifcolor", az);
            e(j).bind("resize.guifcolor", C);
            aL.addClass("guif-active");
            aH.removeClass("guif-hidden");
            if (aW.showPalette) {
                aR()
            }
            aa();
            aw();
            aI = aK();
            al();
            P.show(aI);
            B.trigger("show.guifcolor", [aI])
        }

        function az(a0) {
            if (a0 && a0.type == "click" && a0.button == 2) {
                return
            }
            if (!M || aU) {
                return
            }
            M = false;
            e(V).unbind("click.guifcolor", az);
            e(j).unbind("resize.guifcolor", C);
            aL.removeClass("guif-active");
            aH.addClass("guif-hidden");
            var aZ = !tinycolor.equals(aK(), aI);
            if (aZ) {
                if (D && a0 !== "cancel") {
                    ai(true)
                } else {
                    an()
                }
            }
            P.hide(aK());
            B.trigger("hide.guifcolor", [aK()])
        }

        function an() {
            Z(aI, true)
        }

        function Z(aZ, a1) {
            if (tinycolor.equals(aZ, aK())) {
                return
            }
            var a0 = tinycolor(aZ);
            var a2 = a0.toHsv();
            W = (a2.h % 360) / 360;
            N = a2.s;
            av = a2.v;
            aQ = a2.a;
            aw();
            if (a0.ok && !a1) {
                am = T || a0.format
            }
        }

        function aK(aZ) {
            aZ = aZ || {};
            return tinycolor.fromRatio({
                h: W,
                s: N,
                v: av,
                a: Math.round(aQ * 100) / 100
            }, {
                format: aZ.format || am
            })
        }

        function at() {
            return !I.hasClass("guif-validation-error")
        }

        function aD() {
            aw();
            P.move(aK());
            B.trigger("move.guifcolor", [aK()])
        }

        function aw() {
            I.removeClass("guif-validation-error");
            aS();
            var a1 = tinycolor.fromRatio({
                h: W,
                s: 1,
                v: 1
            });
            G.css("background-color", a1.toHexString());
            var a5 = am;
            if (aQ < 1) {
                if (a5 === "hex" || a5 === "hex3" || a5 === "hex6" || a5 === "name") {
                    a5 = "rgb"
                }
            }
            var a2 = aK({
                format: a5
            }),
                a6 = a2.toHexString(),
                a3 = a2.toRgbString();
            if (n || a2.alpha === 1) {
                H.css("background-color", a3)
            } else {
                H.css("background-color", "transparent");
                H.css("filter", a2.toFilter())
            } if (aW.showAlpha) {
                var a0 = a2.toRgb();
                a0.a = 0;
                var aZ = tinycolor(a0).toRgbString();
                var a4 = "linear-gradient(left, " + aZ + ", " + a6 + ")";
                if (k) {
                    ax.css("filter", tinycolor(aZ).toFilter({
                        gradientType: 1
                    }, a6))
                } else {
                    ax.css("background", "-webkit-" + a4);
                    ax.css("background", "-moz-" + a4);
                    ax.css("background", "-ms-" + a4);
                    ax.css("background", a4)
                }
            }
            if (aW.showInput) {
                I.val(a2.toString(a5))
            }
            if (aW.showPalette) {
                aR()
            }
            al()
        }

        function aS() {
            var a1 = N;
            var aZ = av;
            var a4 = a1 * aF;
            var a2 = ac - (aZ * ac);
            a4 = Math.max(-aG, Math.min(aF - aG, a4 - aG));
            a2 = Math.max(-aG, Math.min(ac - aG, a2 - aG));
            aE.css({
                top: a2,
                left: a4
            });
            var a0 = aQ * aq;
            ay.css({
                left: a0 - (aP / 2)
            });
            var a3 = (W) * ar;
            aT.css({
                top: a3 - ak
            })
        }

        function ai(a0) {
            var aZ = aK();
            if (Q) {
                B.val(aZ.toString(am)).change()
            }
            var a1 = !tinycolor.equals(aZ, aI);
            aI = aZ;
            aM(aZ);
            if (a0 && a1) {
                P.change(aZ);
                B.trigger("change.guifcolor", [aZ])
            }
        }

        function aa() {
            aF = G.width();
            ac = G.height();
            aG = aE.height();
            J = K.width();
            ar = K.height();
            ak = aT.height();
            aq = X.width();
            aP = ay.width();
            if (!aU) {
                aH.css("position", "absolute");
                aH.offset(a(aH, ao))
            }
            aS()
        }

        function y() {
            B.show();
            ao.unbind("click.guifcolor touchstart.guifcolor");
            aH.remove();
            aL.remove();
            d[ab.id] = null
        }

        function Y(aZ, a0) {
            if (aZ === g) {
                return e.extend({}, aW)
            }
            if (a0 === g) {
                return aW[aZ]
            }
            aW[aZ] = a0;
            v()
        }

        function ad() {
            aN = false;
            B.attr("disabled", false);
            ao.removeClass("guif-disabled")
        }

        function S() {
            az();
            aN = true;
            B.attr("disabled", true);
            ao.addClass("guif-disabled")
        }
        aC();
        var ab = {
            show: z,
            hide: az,
            toggle: ap,
            reflow: aa,
            option: Y,
            enable: ad,
            disable: S,
            set: function (aZ) {
                Z(aZ);
                ai()
            },
            get: aK,
            destroy: y,
            container: aH
        };
        ab.id = d.push(ab) - 1;
        return ab
    }

    function a(C, D) {
        var B = 0;
        var z = C.outerWidth();
        var F = C.outerHeight();
        var v = D.outerHeight();
        var E = C[0].ownerDocument;
        var w = E.documentElement;
        var A = w.clientWidth + e(E).scrollLeft();
        var x = w.clientHeight + e(E).scrollTop();
        var y = D.offset();
        y.top += v;
        y.left -= Math.min(y.left, (y.left + z > A && A > z) ? Math.abs(y.left + z - A) : 0);
        y.top -= Math.min(y.top, ((y.top + F > x && x > F) ? Math.abs(F + v - B) : B));
        return y
    }

    function b() {}

    function m(v) {
        v.stopPropagation()
    }

    function u(w, x) {
        var y = Array.prototype.slice;
        var v = y.call(arguments, 2);
        return function () {
            return w.apply(x, v.concat(y.call(arguments)))
        }
    }

    function c(A, F, w, x) {
        F = F || function () {};
        w = w || function () {};
        x = x || function () {};
        var G = A.ownerDocument || document;
        var I = false;
        var z = {};
        var J = 0;
        var H = 0;
        var C = ("ontouchstart" in j);
        var B = {};
        B.selectstart = E;
        B.dragstart = E;
        B["touchmove mousemove"] = y;
        B["touchend mouseup"] = D;

        function E(K) {
            if (K.stopPropagation) {
                K.stopPropagation()
            }
            if (K.preventDefault) {
                K.preventDefault()
            }
            K.returnValue = false
        }

        function y(O) {
            if (I) {
                if (k && document.documentMode < 9 && !O.button) {
                    return D()
                }
                var N = O.originalEvent.touches;
                var L = N ? N[0].pageX : O.pageX;
                var K = N ? N[0].pageY : O.pageY;
                var P = Math.max(0, Math.min(L - z.left, H));
                var M = Math.max(0, Math.min(K - z.top, J));
                if (C) {
                    E(O)
                }
                F.apply(A, [P, M, O])
            }
        }

        function v(M) {
            var K = (M.which) ? (M.which == 3) : (M.button == 2);
            var L = M.originalEvent.touches;
            if (!K && !I) {
                if (w.apply(A, arguments) !== false) {
                    I = true;
                    J = e(A).height();
                    H = e(A).width();
                    z = e(A).offset();
                    e(G).bind(B);
                    e(G.body).addClass("guif-dragging");
                    if (!C) {
                        y(M)
                    }
                    E(M)
                }
            }
        }

        function D() {
            if (I) {
                e(G).unbind(B);
                e(G.body).removeClass("guif-dragging");
                x.apply(A, arguments)
            }
            I = false
        }
        e(A).bind("touchstart mousedown", v)
    }

    function f(w, y, v) {
        var x;
        return function () {
            var A = this,
                z = arguments;
            var B = function () {
                x = null;
                w.apply(A, z)
            };
            if (v) {
                clearTimeout(x)
            }
            if (v || !x) {
                x = setTimeout(B, y)
            }
        }
    }

    function h() {
        if (j.console) {
            if (Function.prototype.bind) {
                h = Function.prototype.bind.call(console.log, console)
            } else {
                h = function () {
                    Function.prototype.apply.call(console.log, console, arguments)
                }
            }
            h.apply(this, arguments)
        }
    }
    var l = "guifcolor.id";
    e.fn.guifcolor = function (y, v) {
        if (typeof y == "string") {
            var x = this;
            var w = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var z = d[e(this).data(l)];
                if (z) {
                    var A = z[y];
                    if (!A) {
                        throw new Error("Spectrum: no such method: '" + y + "'")
                    }
                    if (y == "get") {
                        x = z.get()
                    } else {
                        if (y == "container") {
                            x = z.container
                        } else {
                            if (y == "option") {
                                x = z.option.apply(z, w)
                            } else {
                                if (y == "destroy") {
                                    z.destroy();
                                    e(this).removeData(l)
                                } else {
                                    A.apply(z, w)
                                }
                            }
                        }
                    }
                }
            });
            return x
        }
        return this.guifcolor("destroy").each(function () {
            var z = i(this, y);
            e(this).data(l, z.id)
        })
    };
    e.fn.guifcolor.load = true;
    e.fn.guifcolor.loadOpts = {};
    e.fn.guifcolor.draggable = c;
    e.fn.guifcolor.defaults = o;
    e.guifcolor = {};
    e.guifcolor.localization = {};
    e.guifcolor.palettes = {};
    e.fn.guifcolor.processNativeColorInputs = function () {
        var w = e("<input type='color' value='!' />")[0];
        var v = w.type === "color" && w.value != "!";
        if (!v) {
            e("input[type=color]").guifcolor({
                preferredFormat: "hex6"
            })
        }
    };
    (function (O) {
        var L = /^[\s,#]+/,
            G = /\s+$/,
            H = 0,
            v = Math,
            S = v.round,
            A = v.min,
            D = v.max,
            C = v.random;

        function Q(ab, Y) {
            ab = (ab) ? ab : "";
            Y = Y || {};
            if (typeof ab == "object" && ab.hasOwnProperty("_tc_id")) {
                return ab
            }
            var ad = I(ab);
            var Z = ad.r,
                ac = ad.g,
                ae = ad.b,
                af = ad.a,
                aa = S(100 * af) / 100,
                ag = Y.format || ad.format;
            if (Z < 1) {
                Z = S(Z)
            }
            if (ac < 1) {
                ac = S(ac)
            }
            if (ae < 1) {
                ae = S(ae)
            }
            return {
                ok: ad.ok,
                format: ag,
                _tc_id: H++,
                alpha: af,
                toHsv: function () {
                    var ah = K(Z, ac, ae);
                    return {
                        h: ah.h * 360,
                        s: ah.s,
                        v: ah.v,
                        a: af
                    }
                },
                toHsvString: function () {
                    var ai = K(Z, ac, ae);
                    var ak = S(ai.h * 360),
                        aj = S(ai.s * 100),
                        ah = S(ai.v * 100);
                    return (af == 1) ? "hsv(" + ak + ", " + aj + "%, " + ah + "%)" : "hsva(" + ak + ", " + aj + "%, " + ah + "%, " + aa + ")"
                },
                toHsl: function () {
                    var ah = T(Z, ac, ae);
                    return {
                        h: ah.h * 360,
                        s: ah.s,
                        l: ah.l,
                        a: af
                    }
                },
                toHslString: function () {
                    var ai = T(Z, ac, ae);
                    var ak = S(ai.h * 360),
                        aj = S(ai.s * 100),
                        ah = S(ai.l * 100);
                    return (af == 1) ? "hsl(" + ak + ", " + aj + "%, " + ah + "%)" : "hsla(" + ak + ", " + aj + "%, " + ah + "%, " + aa + ")"
                },
                toHex: function (ah) {
                    return R(Z, ac, ae, ah)
                },
                toHexString: function (ah) {
                    return "#" + R(Z, ac, ae, ah)
                },
                toRgb: function () {
                    return {
                        r: S(Z),
                        g: S(ac),
                        b: S(ae),
                        a: af
                    }
                },
                toRgbString: function () {
                    return (af == 1) ? "rgb(" + S(Z) + ", " + S(ac) + ", " + S(ae) + ")" : "rgba(" + S(Z) + ", " + S(ac) + ", " + S(ae) + ", " + aa + ")"
                },
                toPercentageRgb: function () {
                    return {
                        r: S(V(Z, 255) * 100) + "%",
                        g: S(V(ac, 255) * 100) + "%",
                        b: S(V(ae, 255) * 100) + "%",
                        a: af
                    }
                },
                toPercentageRgbString: function () {
                    return (af == 1) ? "rgb(" + S(V(Z, 255) * 100) + "%, " + S(V(ac, 255) * 100) + "%, " + S(V(ae, 255) * 100) + "%)" : "rgba(" + S(V(Z, 255) * 100) + "%, " + S(V(ac, 255) * 100) + "%, " + S(V(ae, 255) * 100) + "%, " + aa + ")"
                },
                toName: function () {
                    return X[R(Z, ac, ae, true)] || false
                },
                toFilter: function (ak) {
                    var al = R(Z, ac, ae);
                    var an = al;
                    var am = Math.round(parseFloat(af) * 255).toString(16);
                    var ai = am;
                    var ah = Y && Y.gradientType ? "GradientType = 1, " : "";
                    if (ak) {
                        var aj = Q(ak);
                        an = aj.toHex();
                        ai = Math.round(parseFloat(aj.alpha) * 255).toString(16)
                    }
                    return "progid:DXImageTransform.Microsoft.gradient(" + ah + "startColorstr=#" + y(am) + al + ",endColorstr=#" + y(ai) + an + ")"
                },
                toString: function (ai) {
                    ai = ai || this.format;
                    var ah = false;
                    if (ai === "rgb") {
                        ah = this.toRgbString()
                    }
                    if (ai === "prgb") {
                        ah = this.toPercentageRgbString()
                    }
                    if (ai === "hex" || ai === "hex6") {
                        ah = this.toHexString()
                    }
                    if (ai === "hex3") {
                        ah = this.toHexString(true)
                    }
                    if (ai === "name") {
                        ah = this.toName()
                    }
                    if (ai === "hsl") {
                        ah = this.toHslString()
                    }
                    if (ai === "hsv") {
                        ah = this.toHsvString()
                    }
                    return ah || this.toHexString()
                }
            }
        }
        Q.fromRatio = function (Y, ab) {
            if (typeof Y == "object") {
                var Z = {};
                for (var aa in Y) {
                    if (Y.hasOwnProperty(aa)) {
                        if (aa === "a") {
                            Z[aa] = Y[aa]
                        } else {
                            Z[aa] = z(Y[aa])
                        }
                    }
                }
                Y = Z
            }
            return Q(Y, ab)
        };

        function I(Z) {
            var aa = {
                r: 0,
                g: 0,
                b: 0
            };
            var Y = 1;
            var ab = false;
            var ac = false;
            if (typeof Z == "string") {
                Z = B(Z)
            }
            if (typeof Z == "object") {
                if (Z.hasOwnProperty("r") && Z.hasOwnProperty("g") && Z.hasOwnProperty("b")) {
                    aa = E(Z.r, Z.g, Z.b);
                    ab = true;
                    ac = String(Z.r).substr(-1) === "%" ? "prgb" : "rgb"
                } else {
                    if (Z.hasOwnProperty("h") && Z.hasOwnProperty("s") && Z.hasOwnProperty("v")) {
                        Z.s = z(Z.s);
                        Z.v = z(Z.v);
                        aa = P(Z.h, Z.s, Z.v);
                        ab = true;
                        ac = "hsv"
                    } else {
                        if (Z.hasOwnProperty("h") && Z.hasOwnProperty("s") && Z.hasOwnProperty("l")) {
                            Z.s = z(Z.s);
                            Z.l = z(Z.l);
                            aa = F(Z.h, Z.s, Z.l);
                            ab = true;
                            ac = "hsl"
                        }
                    }
                } if (Z.hasOwnProperty("a")) {
                    Y = Z.a
                }
            }
            Y = parseFloat(Y);
            if (isNaN(Y) || Y < 0 || Y > 1) {
                Y = 1
            }
            return {
                ok: ab,
                format: Z.format || ac,
                r: A(255, D(aa.r, 0)),
                g: A(255, D(aa.g, 0)),
                b: A(255, D(aa.b, 0)),
                a: Y
            }
        }

        function E(aa, Z, Y) {
            return {
                r: V(aa, 255) * 255,
                g: V(Z, 255) * 255,
                b: V(Y, 255) * 255
            }
        }

        function T(Y, ac, ae) {
            Y = V(Y, 255);
            ac = V(ac, 255);
            ae = V(ae, 255);
            var af = D(Y, ac, ae),
                aa = A(Y, ac, ae);
            var ab, ag, Z = (af + aa) / 2;
            if (af == aa) {
                ab = ag = 0
            } else {
                var ad = af - aa;
                ag = Z > 0.5 ? ad / (2 - af - aa) : ad / (af + aa);
                switch (af) {
                case Y:
                    ab = (ac - ae) / ad + (ac < ae ? 6 : 0);
                    break;
                case ac:
                    ab = (ae - Y) / ad + 2;
                    break;
                case ae:
                    ab = (Y - ac) / ad + 4;
                    break
                }
                ab /= 6
            }
            return {
                h: ab,
                s: ag,
                l: Z
            }
        }

        function F(ad, ag, ac) {
            var Y, ae, af;
            ad = V(ad, 360);
            ag = V(ag, 100);
            ac = V(ac, 100);

            function ab(aj, ai, ah) {
                if (ah < 0) {
                    ah += 1
                }
                if (ah > 1) {
                    ah -= 1
                }
                if (ah < 1 / 6) {
                    return aj + (ai - aj) * 6 * ah
                }
                if (ah < 1 / 2) {
                    return ai
                }
                if (ah < 2 / 3) {
                    return aj + (ai - aj) * (2 / 3 - ah) * 6
                }
                return aj
            }
            if (ag === 0) {
                Y = ae = af = ac
            } else {
                var Z = ac < 0.5 ? ac * (1 + ag) : ac + ag - ac * ag;
                var aa = 2 * ac - Z;
                Y = ab(aa, Z, ad + 1 / 3);
                ae = ab(aa, Z, ad);
                af = ab(aa, Z, ad - 1 / 3)
            }
            return {
                r: Y * 255,
                g: ae * 255,
                b: af * 255
            }
        }

        function K(Y, ab, ad) {
            Y = V(Y, 255);
            ab = V(ab, 255);
            ad = V(ad, 255);
            var ae = D(Y, ab, ad),
                Z = A(Y, ab, ad);
            var aa, ag, af = ae;
            var ac = ae - Z;
            ag = ae === 0 ? 0 : ac / ae;
            if (ae == Z) {
                aa = 0
            } else {
                switch (ae) {
                case Y:
                    aa = (ab - ad) / ac + (ab < ad ? 6 : 0);
                    break;
                case ab:
                    aa = (ad - Y) / ac + 2;
                    break;
                case ad:
                    aa = (Y - ab) / ac + 4;
                    break
                }
                aa /= 6
            }
            return {
                h: aa,
                s: ag,
                v: af
            }
        }

        function P(ac, aj, ah) {
            ac = V(ac, 360) * 6;
            aj = V(aj, 100);
            ah = V(ah, 100);
            var ab = v.floor(ac),
                ae = ac - ab,
                aa = ah * (1 - aj),
                Z = ah * (1 - ae * aj),
                ai = ah * (1 - (1 - ae) * aj),
                ag = ab % 6,
                Y = [ah, Z, aa, aa, ai, ah][ag],
                ad = [ai, ah, ah, Z, aa, aa][ag],
                af = [aa, aa, ai, ah, ah, Z][ag];
            return {
                r: Y * 255,
                g: ad * 255,
                b: af * 255
            }
        }

        function R(ab, aa, Y, ac) {
            var Z = [y(S(ab).toString(16)), y(S(aa).toString(16)), y(S(Y).toString(16))];
            if (ac && Z[0].charAt(0) == Z[0].charAt(1) && Z[1].charAt(0) == Z[1].charAt(1) && Z[2].charAt(0) == Z[2].charAt(1)) {
                return Z[0].charAt(0) + Z[1].charAt(0) + Z[2].charAt(0)
            }
            return Z.join("")
        }
        Q.equals = function (Z, Y) {
            if (!Z || !Y) {
                return false
            }
            return Q(Z).toRgbString() == Q(Y).toRgbString()
        };
        Q.random = function () {
            return Q.fromRatio({
                r: C(),
                g: C(),
                b: C()
            })
        };
        Q.desaturate = function (Z, aa) {
            var Y = Q(Z).toHsl();
            Y.s -= ((aa || 10) / 100);
            Y.s = N(Y.s);
            return Q(Y)
        };
        Q.saturate = function (Z, aa) {
            var Y = Q(Z).toHsl();
            Y.s += ((aa || 10) / 100);
            Y.s = N(Y.s);
            return Q(Y)
        };
        Q.greyscale = function (Y) {
            return Q.desaturate(Y, 100)
        };
        Q.lighten = function (Z, aa) {
            var Y = Q(Z).toHsl();
            Y.l += ((aa || 10) / 100);
            Y.l = N(Y.l);
            return Q(Y)
        };
        Q.darken = function (Z, aa) {
            var Y = Q(Z).toHsl();
            Y.l -= ((aa || 10) / 100);
            Y.l = N(Y.l);
            return Q(Y)
        };
        Q.complement = function (Z) {
            var Y = Q(Z).toHsl();
            Y.h = (Y.h + 180) % 360;
            return Q(Y)
        };
        Q.triad = function (Z) {
            var Y = Q(Z).toHsl();
            var aa = Y.h;
            return [Q(Z), Q({
                h: (aa + 120) % 360,
                s: Y.s,
                l: Y.l
            }), Q({
                h: (aa + 240) % 360,
                s: Y.s,
                l: Y.l
            })]
        };
        Q.tetrad = function (Z) {
            var Y = Q(Z).toHsl();
            var aa = Y.h;
            return [Q(Z), Q({
                h: (aa + 90) % 360,
                s: Y.s,
                l: Y.l
            }), Q({
                h: (aa + 180) % 360,
                s: Y.s,
                l: Y.l
            }), Q({
                h: (aa + 270) % 360,
                s: Y.s,
                l: Y.l
            })]
        };
        Q.splitcomplement = function (Z) {
            var Y = Q(Z).toHsl();
            var aa = Y.h;
            return [Q(Z), Q({
                h: (aa + 72) % 360,
                s: Y.s,
                l: Y.l
            }), Q({
                h: (aa + 216) % 360,
                s: Y.s,
                l: Y.l
            })]
        };
        Q.analogous = function (Z, ac, ad) {
            ac = ac || 6;
            ad = ad || 30;
            var Y = Q(Z).toHsl();
            var ab = 360 / ad;
            var aa = [Q(Z)];
            for (Y.h = ((Y.h - (ab * ac >> 1)) + 720) % 360; --ac;) {
                Y.h = (Y.h + ab) % 360;
                aa.push(Q(Y))
            }
            return aa
        };
        Q.monochromatic = function (aa, ad) {
            ad = ad || 6;
            var ac = Q(aa).toHsv();
            var af = ac.h,
                ae = ac.s,
                Z = ac.v;
            var ab = [];
            var Y = 1 / ad;
            while (ad--) {
                ab.push(Q({
                    h: af,
                    s: ae,
                    v: Z
                }));
                Z = (Z + Y) % 1
            }
            return ab
        };
        Q.readability = function (ac, aa) {
            var ab = Q(ac).toRgb();
            var Z = Q(aa).toRgb();
            var Y = (ab.r * 299 + ab.g * 587 + ab.b * 114) / 1000;
            var ae = (Z.r * 299 + Z.g * 587 + Z.b * 114) / 1000;
            var ad = (Math.max(ab.r, Z.r) - Math.min(ab.r, Z.r) + Math.max(ab.g, Z.g) - Math.min(ab.g, Z.g) + Math.max(ab.b, Z.b) - Math.min(ab.b, Z.b));
            return {
                brightness: Math.abs(Y - ae),
                color: ad
            }
        };
        Q.readable = function (Z, Y) {
            var aa = Q.readability(Z, Y);
            return aa.brightness > 125 && aa.color > 500
        };
        Q.mostReadable = function (af, ae) {
            var ab = null;
            var Z = 0;
            var ag = false;
            for (var ad = 0; ad < ae.length; ad++) {
                var aa = Q.readability(af, ae[ad]);
                var ac = aa.brightness > 125 && aa.color > 500;
                var Y = 3 * (aa.brightness / 125) + (aa.color / 500);
                if ((ac && !ag) || (ac && ag && Y > Z) || ((!ac) && (!ag) && Y > Z)) {
                    ag = ac;
                    Z = Y;
                    ab = Q(ae[ad])
                }
            }
            return ab
        };
        var J = Q.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        };
        var X = Q.hexNames = x(J);

        function x(aa) {
            var Z = {};
            for (var Y in aa) {
                if (aa.hasOwnProperty(Y)) {
                    Z[aa[Y]] = Y
                }
            }
            return Z
        }

        function V(aa, Y) {
            if (M(aa)) {
                aa = "100%"
            }
            var Z = W(aa);
            aa = A(Y, D(0, parseFloat(aa)));
            if (Z) {
                aa = parseInt(aa * Y, 10) / 100
            }
            if ((v.abs(aa - Y) < 0.000001)) {
                return 1
            }
            return (aa % Y) / parseFloat(Y)
        }

        function N(Y) {
            return A(1, D(0, Y))
        }

        function U(Y) {
            return parseInt(Y, 16)
        }

        function M(Y) {
            return typeof Y == "string" && Y.indexOf(".") != -1 && parseFloat(Y) === 1
        }

        function W(Y) {
            return typeof Y === "string" && Y.indexOf("%") != -1
        }

        function y(Y) {
            return Y.length == 1 ? "0" + Y : "" + Y
        }

        function z(Y) {
            if (Y <= 1) {
                Y = (Y * 100) + "%"
            }
            return Y
        }
        var w = (function () {
            var ac = "[-\\+]?\\d+%?";
            var ab = "[-\\+]?\\d*\\.\\d+%?";
            var Y = "(?:" + ab + ")|(?:" + ac + ")";
            var aa = "[\\s|\\(]+(" + Y + ")[,|\\s]+(" + Y + ")[,|\\s]+(" + Y + ")\\s*\\)?";
            var Z = "[\\s|\\(]+(" + Y + ")[,|\\s]+(" + Y + ")[,|\\s]+(" + Y + ")[,|\\s]+(" + Y + ")\\s*\\)?";
            return {
                rgb: new RegExp("rgb" + aa),
                rgba: new RegExp("rgba" + Z),
                hsl: new RegExp("hsl" + aa),
                hsla: new RegExp("hsla" + Z),
                hsv: new RegExp("hsv" + aa),
                hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            }
        })();

        function B(Z) {
            Z = Z.replace(L, "").replace(G, "").toLowerCase();
            var Y = false;
            if (J[Z]) {
                Z = J[Z];
                Y = true
            } else {
                if (Z == "transparent") {
                    return {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0
                    }
                }
            }
            var aa;
            if ((aa = w.rgb.exec(Z))) {
                return {
                    r: aa[1],
                    g: aa[2],
                    b: aa[3]
                }
            }
            if ((aa = w.rgba.exec(Z))) {
                return {
                    r: aa[1],
                    g: aa[2],
                    b: aa[3],
                    a: aa[4]
                }
            }
            if ((aa = w.hsl.exec(Z))) {
                return {
                    h: aa[1],
                    s: aa[2],
                    l: aa[3]
                }
            }
            if ((aa = w.hsla.exec(Z))) {
                return {
                    h: aa[1],
                    s: aa[2],
                    l: aa[3],
                    a: aa[4]
                }
            }
            if ((aa = w.hsv.exec(Z))) {
                return {
                    h: aa[1],
                    s: aa[2],
                    v: aa[3]
                }
            }
            if ((aa = w.hex6.exec(Z))) {
                return {
                    r: U(aa[1]),
                    g: U(aa[2]),
                    b: U(aa[3]),
                    format: Y ? "name" : "hex"
                }
            }
            if ((aa = w.hex3.exec(Z))) {
                return {
                    r: U(aa[1] + "" + aa[1]),
                    g: U(aa[2] + "" + aa[2]),
                    b: U(aa[3] + "" + aa[3]),
                    format: Y ? "name" : "hex"
                }
            }
            return false
        }
        O.tinycolor = Q
    })(this);
    e(function () {
        if (e.fn.guifcolor.load) {
            e.fn.guifcolor.processNativeColorInputs()
        }
    })
})(window, jQuery);