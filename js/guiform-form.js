/*!
 * GuiForm Plugin
 * https://www.guiform.com
 *
 * By: Russell C. Pabon
 * http://russellpabon.com
 *
 * Depends:
 *	jquery.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
;
var xhr = {};
var xhr_name = new Array();
var xhr_state = {};
var xhrData = {};
var xhrFiles = {};
(function () {
    $ = jQuery;
    if (!Object.keys) {
        Object.keys = function (a) {
            return $.map(a, function (c, b) {
                return b
            })
        }
    }
    $.fn.removeClassRegEx = function (e) {
        var d = $(this).attr("class");
        if (!d || !e) {
            return false
        }
        var b = [];
        d = d.split(" ");
        for (var c = 0, a = d.length; c < a; c++) {
            if (!d[c].match(e)) {
                b.push(d[c])
            }
        }
        $(this).attr("class", b.join(" "));
        return $(this)
    };
    $.fn.hasClassRegEx = function (d) {
        var c = $(this).attr("class");
        if (!c || !d) {
            return false
        }
        c = c.split(" ");
        for (var b = 0, a = c.length; b < a; b++) {
            if (c[b].match(d)) {
                return true
            }
        }
        return false
    };
    $.fn.hasAttr = function (a) {
        if (this.attr) {
            var b = this.attr(a)
        } else {
            var b = this.getAttribute(a)
        }
        return (typeof b !== "undefined" && b !== false && b !== null)
    };
    $.bytesToSize = function (a, d) {
        d = d || true;
        var c = ["Bytes", "KB", "MB", "GB", "TB"];
        if (a == 0) {
            return "n/a"
        }
        var b = parseInt(Math.floor(Math.log(a) / Math.log(1024)));
        d = (d) ? " " + c[b] : "";
        return Math.round(a / Math.pow(1024, b), 2) + d
    };
    $.bytesSize = function (a) {
        return parseInt(Math.pow(1024, 2) * a)
    }
}).call(this);
(function (a, b) {
    a.widget("GuiForm.form", {
        options: {
            submitText: "",
            loadText: ""
        },
        XMLHttpFactories: [
            function () {
                return new XMLHttpRequest()
            },
            function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            },
            function () {
                return new ActiveXObject("Msxml3.XMLHTTP")
            },
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        ],
        createXMLHTTPObject: function () {
            var g = this;
            var d = false;
            for (var c = 0; c < g.XMLHttpFactories.length; c++) {
                try {
                    d = g.XMLHttpFactories[c]()
                } catch (f) {
                    continue
                }
                break
            }
            return d
        },
        reset_file: function (c) {
            var d = c.parent();
            a("input", d).wrap("<form>").parent("form").trigger("reset");
            a("input", d).attr("type", "file").unwrap()
        },
        _create: function () {
            var c = this.element;
            var d = this;
            this.options.submitText = a('button[type="submit"]', c).html() || "Submit";
            this.options.loadText = a('button[type="submit"]', c).attr("data-loader") || "Loading";
            a.mask.definitions["#"] = "[0-9]";
            a.mask.definitions["@"] = "[a-zA-Z]";
            a.mask.definitions["*"] = "[a-zA-Z0-9]";
            a.mask.definitions["~"] = "[+-]";
            if (window.FormData !== b && window.File && window.FileList) {
                d.FileInit()
            } else {
                a('input[type="file"][multiple="multiple"]').on("change", function (g) {
                    var h = Math.floor(Math.random() * 90000);
                    c.append('<input type="hidden" class="guiform-file-' + h + '" name="guiform-upload" value="' + this.name + '">');
                    c.append('<input type="hidden" class="guiform-file-' + h + '" name="guiform-item" value="' + a(this).parents(".item").attr("id") + '">');
                    c.append('<input type="hidden" class="guiform-file-' + h + '" name="guiform-file" value="' + h + '">');
                    var f = a(this).parents(".item");
                    var e = '<div id="file-' + h + '" class="gui-file selected" title="Uploading file.">												<div class="gui-file-bar upload"></div>												<div class="gui-file-wrap clearfix">													<span class="gui-file-name">Loading</span>													<span class="gui-file-size"><img src="' + guif.images + 'fb-loader.gif" /></span>													<span class="gui-file-remove cancel" title="cancel"><span data-icon="&#xe00d;"></span></span>												</div>											</div>';
                    a(".gui-files", f).prepend(e);
                    a(".gui-file.selected", c).addClass("restored-item").animate({
                        opacity: 1
                    }, 1300, function () {
                        a(this).removeClass("restored-item, selected");
                        d.tooltip()
                    });
                    a('button[type="submit"]').trigger("click")
                })
            } if (a(".switch").size() > 0) {
                a(".switch").buttonset()
            }
            a(".ui-spinner").each(function () {
                var e = a(this).attr("data-max");
                var f = a(this).attr("data-min");
                a(this).spinner({
                    max: e,
                    min: f
                })
            });
            a(".f_phone input").each(function () {
                a(this).mask(a(this).attr("data-mask"))
            });
            a(document).on("click", ".gui-file-remove", function () {
                var f = a(this).parent().parent();
                var e = f.parent();
                f.addClass("removed-item").slideUp(800, function () {
                    a(this).remove();
                    if (a(".gui-file", e).size() == 0) {
                        d.reset_file(e)
                    }
                })
            });
            a(document).on("keydown", ".ui-spinner-input", function (f) {
                var e = f.charCode || f.keyCode || 0;
                if (f.shiftKey == true) {
                    return false
                }
                return (e == 13 || e == 8 || e == 9 || e == 46 || (e >= 35 && e <= 40) || (e >= 48 && e <= 57) || (e >= 96 && e <= 105));
                f.preventDefault()
            }).on("cut copy paste", ".ui-spinner-input", function (e) {
                e.preventDefault()
            });
            a(window).on("load", function (e) {
                d.reset()
            });
            a(document).on("click", ".gui-file-remove", function (f) {
                var g = a(this).parents(".gui-file").attr("id").split("-")[1];
                var e = a(this).parents(".item").find("input").attr("name").split("[")[0];
                d.FileRemove(e, g)
            });
            a('button[type="reset"]', this.element).click(function (e) {
                d.reset()
            });
            a('button[type="submit"]', this.element).removeAttr("disabled");
            a(".ui-button-text").each(function () {
                var e = a("[data-icon]", this).attr("title");
                a("[data-icon]", this).removeAttr("title");
                a(this).attr("title", e)
            })
        },
        FileRemove: function (e, i) {
            var c = this.options;
            var h = this;
            var f = this.element;
            if (xhrData[i].file === b) {
                var d = xhrData[i];
                delete xhrData[i]
            } else {
                var d = xhrData[i].file;
                delete xhrData[i];
                delete xhr[i]
            } if (xhr[i] !== b) {
                xhr[i].abort()
            }
            var g = {
                action: "guiform-unlink",
                file: d
            };
            if (a(".gui-file-bar.upload").size() < 1) {
                a('button[type="submit"]', parent).html(c.submitText).removeClass("disabled")
            }
            a.ajax({
                url: guif.ajax_url,
                data: g,
                dataType: "html",
                cache: false,
                async: true,
                type: "POST"
            })
        },
        reset: function () {
            var c = this.element;
            var d = this;
            if (!a.browser.chrome && !a.browser.safari) {
                a('input[type="file"]').each(function () {
                    a(this).attr("type", "text").attr("type", "file")
                })
            }
            a('input[type="password"]').val("");
            a(".guif-password").remove();
            a(".gui-files", c).html("");
            d.remove_error();
            a.each(xhrData, function () {
                var e = {
                    action: "guiform-unlink",
                    file: this.file
                };
                a.ajax({
                    url: guif.ajax_url,
                    data: e,
                    dataType: "html",
                    cache: false,
                    async: true,
                    type: "POST"
                })
            });
            a.each(xhr, function () {
                this.abort()
            });
            a('button[type="submit"]', c).html(this.options.submitText).removeClass("disabled");
            xhr = {};
            xhr_name = {};
            xhr_state = {};
            xhrData = {}
        },
        FileInit: function () {
            var e = this;
            var c = this.options;
            var d = this.element;
            a("body").on("dragover", function (f) {
                f.preventDefault();
                f.stopPropagation();
                a(".guif-dropzone").addClass("drop").find("span").html("Drop here!")
            }).on("dragleave", function (f) {
                a(".guif-dropzone").removeClass("drop").find("span").html("Add file")
            });
            a("body").bind("drop", function (f) {
                a(".guif-dropzone").removeClass("drop").find("span").html("Add file");
                if (a(f.target).attr("type") !== "file") {
                    f.preventDefault();
                    f.stopPropagation()
                } else {
                    a(f.target).removeClass("error").parent().find(".error-message").animate({
                        opacity: 0
                    }, "slow", function () {
                        a(this).remove()
                    });
                    a(f.target).parent().removeClass("error").parent().find(".error-message").animate({
                        opacity: 0
                    }, "slow", function () {
                        a(this).remove()
                    })
                }
            });
            a('.guif-dropzone input[type="file"]').on("change", function (j) {
                var i = a(this).prop("files");
                var g = this.name.split("[")[0];
                var h = a(this).parents(".item");
                var f = a(this).attr("file-accept").toLowerCase().replace(/\s/g, "").split(",");
                var k = a.bytesSize(a(this).attr("file-maxsize"));
                a('button[type="submit"]', d).html(c.loadText).addClass("disabled");
                a.each(i, function () {
                    var r = this.name;
                    var m = Math.floor(Math.random() * 90000);
                    var s = r.substr((~-this.name.lastIndexOf(".") >>> 0) + 2).toLowerCase();
                    var q = this.size;
                    var t = 0;
                    var u = "";
                    var l = guif.today + "-" + Math.random().toString(36).slice(3) + "." + s;
                    if (a.inArray(s, f) <= -1) {
                        o = '<span class="gui-file-error">Failed</span>';
                        u += "Upload FAILED, invalid file type !";
                        t++
                    } else {
                        if (q > k) {
                            o = '<span class="gui-file-error">Failed</span>';
                            u += "Upload FAILED, file is too large !";
                            t++
                        } else {
                            o = '<span class="gui-file-size"><img src="' + guif.images + 'fb-loader.gif" /></span>'
                        }
                    }
                    var o = '<div id="file-' + m + '" class="gui-file selected" title="' + u + '">												<div class="gui-file-bar upload"></div>												<div class="gui-file-wrap clearfix">													<span class="gui-file-name">' + r + "</span>													" + o + '													<span class="gui-file-remove cancel" title="cancel"><span data-icon="&#xe00d;"></span></span>												</div>											</div>';
                    a(".gui-files", h).prepend(o);
                    a(".gui-file.selected", h).addClass("restored-item").animate({
                        opacity: 1
                    }, 1300, function () {
                        a(this).removeClass("restored-item, selected");
                        e.tooltip()
                    });
                    if (t == 0) {
                        var p = a("#file-" + m).find(".gui-file-bar");
                        xhr[m] = e.createXMLHTTPObject();
                        xhr[m].open("POST", guif.ajax_url, true);
                        xhr[m].upload.onprogress = function (w) {
                            var v = parseInt(w.loaded / w.total * 100);
                            p.css("width", v + "%")
                        };
                        xhr[m].onreadystatechange = function (v) {
                            if (xhr[m].readyState == 4) {
                                data = a.parseJSON(this.responseText);
                                if (data.status == "error") {
                                    a("#file-" + data.error.id).attr("title", data.error.message);
                                    a("#file-" + data.error.id).find(".gui-file-bar").remove();
                                    a("#file-" + data.error.id).find(".gui-file-size").html("Failed");
                                    a("#file-" + data.error.id).find(".gui-file-remove").removeClass("cancel").attr("title", "remove");
                                    a(".guiform-file-" + data.error.id).remove()
                                } else {
                                    a("#file-" + data.info.id).find(".gui-file-bar").removeClass("upload").addClass("success");
                                    a("#file-" + data.info.id).attr("title", "");
                                    a("#file-" + data.info.id).find(".gui-file-name").html(data.info.name);
                                    a("#file-" + data.info.id).find(".gui-file-size").html(a.bytesToSize(data.info.size));
                                    a("#file-" + data.info.id).find(".gui-file-remove").removeClass("cancel").attr("title", "remove");
                                    a(".guiform-file-" + data.info.id).remove();
                                    xhrData[m] = data.info
                                }
                                a("h1").text((a(".gui-file-bar.upload").size()));
                                if (a(".gui-file-bar.upload").size() < 1) {
                                    a('button[type="submit"]', d).html(c.submitText).removeClass("disabled")
                                }
                            }
                        };
                        var n = new FormData();
                        n.append("file", this);
                        n.append("action", "guiform-xhr-upload");
                        n.append("form", guif.form_id);
                        n.append("item", h.attr("id"));
                        n.append("field", g);
                        n.append("name", l);
                        n.append("id", m);
                        xhr[m].send(n);
                        xhrData[m] = {
                            file: l,
                            field: g,
                            name: r,
                            size: q,
                            type: s
                        }
                    } else {
                        a("#file-" + m).find(".gui-file-bar").remove();
                        if (a(".gui-file-bar.upload").size() < 1) {
                            a('button[type="submit"]', d).html(c.submitText).removeClass("disabled")
                        }
                    }
                    delete this
                })
            })
        },
        tooltip: function () {
            a(".gui-file").tooltip({
                position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: function (c, d) {
                        a(this).css(c).css("z-index", "999999");
                        a("<div>").addClass("arrow").addClass(d.vertical).addClass(d.horizontal).appendTo(this)
                    }
                }
            })
        },
        remove_error: function () {
            var c = this.element;
            a(".error, .error-message", c).each(function () {
                (a(this).hasClass("error-message")) ? a(this).remove() : a(this).removeClass("error")
            })
        },
        _init: function () {
            var d = this;
            var c = this.element;
            c.submit(function (e) {
                if (a(".gui-file-bar.upload").size() > 0) {
                    alert("Please wait while we process your file upload!")
                } else {
                    if (a(".gui-file-bar.upload").size() < 1 && a('button[type="submit"]', c).hasClass("disabled")) {
                        e.stopPropagation();
                        e.preventDefault();
                        alert("Please wait while we process your form.")
                    } else {
                        d.remove_error();
                        d.submit(e)
                    }
                }
            });
            a('input[type="password"]', c).keyup(function () {
                var i = a(this).parent();
                a(".guif-password", i).remove();
                if (this.value !== "") {
                    var h = a('<div class="guif-password">													<div class="clearfix"><span>Strength</span><span class="text">Too Short</span></div>													<div class="progress"><div class="strength"></div></div>												</div>');
                    var g = this.value;
                    var j = 0;
                    var f = ["Too Short", "Too Short", "Weak", "Fair", "Good", "Strong", "Strong", "Strong", "Strong", "Strong"];
                    var e = ["#555555", "#555555", "#8F2533", "#E8C351", "#7C9AB4", "#0B6C0B", "#0B6C0B", "#0B6C0B", "#0B6C0B"];
                    if (g.length > 3) {
                        j += 1
                    }
                    if (g.length > 7) {
                        j += 1
                    }
                    if (g.length > 10) {
                        j += 1
                    }
                    if (g.length > 13) {
                        j += 1
                    }
                    if (g.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                        j += 1
                    }
                    if (g.match(/([a-zA-Z])/) && g.match(/([0-9])/)) {
                        j += 1
                    }
                    if (g.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                        j += 1
                    }
                    if (g.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) {
                        j += 1
                    }
                    h.find(".text").css("color", e[(j - 1)]).text(f[j]);
                    h.find(".strength").css({
                        "background-color": e[(j - 1)],
                        width: ((j - 1) * 20) + "%"
                    });
                    a(this).parent().append(h)
                } else {
                    a(".guif-password", i).remove()
                }
            });
            a("input, select, textarea", c).focus(function () {
                a(this).parents(".wrap").find(".error-message").animate({
                    opacity: 0
                }, "slow", function () {
                    a(this).remove()
                })
            })
        },
        submit: function (g) {
            var f = this.element;
            var i = this;
            var d = this.options;
            var c = a(f);
            a('button[type="submit"]', f).html(d.loadText).addClass("disabled");
            var h = "unique-" + (new Date().getTime());
            var e = a('<iframe style="width: 100%; height : 200px;" src="javascript:false;" name="' + h + '" />');
            e.hide();
            if (Object.keys(xhrData).length && a("input[class^='guiform-file-']").size() == 0) {
                c.append('<textarea name="guiform-xhrData" style="display:none;">' + JSON.stringify(xhrData) + "</textarea>")
            }
            c.attr("target", h);
            c.attr("enctype", "multipart/form-data");
            c.attr("Content-Type", "application/octet-stream");
            e.appendTo("body");
            e.load(function (n) {
                a("[name='guiform-xhrData']").remove();
                var m = i.getDoc(e[0]);
                var k = m.body ? m.body : m.documentElement;
                var l = k.innerHTML;
                if (l.indexOf("Fatal error") !== -1) {
                    alert("Fatal error: " + l.split("Fatal error:")[1].split(" in ")[0]);
                    a('button[type="submit"]', f).html(d.submitText).removeClass("disabled")
                } else {
                    if (a("input[class^='guiform-file-']").size() > 0) {
                        l = a.parseJSON(l);
                        if (l.status == "error") {
                            a("#file-" + l.error.id).attr("title", l.error.message);
                            a("#file-" + l.error.id).find(".gui-file-name").html(l.error.file);
                            a("#file-" + l.error.id).find(".gui-file-size").html("Failed");
                            a("#file-" + l.error.id).find(".gui-file-remove").removeClass("cancel").attr("title", "remove");
                            a("#file-" + l.error.id).find(".gui-file-bar").remove();
                            a(".guiform-file-" + l.error.id).remove()
                        } else {
                            a("#file-" + l.info.id).find(".gui-file-bar").removeClass("upload").addClass("success");
                            a("#file-" + l.info.id).attr("title", "");
                            a("#file-" + l.info.id).find(".gui-file-name").html(l.info.name);
                            a("#file-" + l.info.id).find(".gui-file-size").html(a.bytesToSize(l.info.size));
                            a("#file-" + l.info.id).find(".gui-file-remove").removeClass("cancel").attr("title", "remove");
                            a(".guiform-file-" + l.info.id).remove();
                            xhrData[l.info.id] = l.info
                        }
                        a('button[type="submit"]', f).html(d.submitText).removeClass("disabled");
                        a("iframe[name='" + h + "']").remove()
                    } else {
                        l = a.parseJSON(l);
                        a("iframe[name='" + h + "']").remove();
                        if (l.status == "fail") {
                            alert(l.message);
                            a('button[type="submit"]', f).html(d.submitText).removeClass("disabled")
                        } else {
                            if (l.status == "error") {
                                if (l.message !== b) {
                                    alert(l.message)
                                } else {
                                    a.each(l.error, function (o, r) {
                                        var q = a("#" + o).find(".wrap");
                                        var p = q.width();
                                        q.append('<div class="error-message"><span class="arrow top left"></span><p>' + r + "</p></div>");
                                        q.find(".error-message").css("width", p)
                                    })
                                }
                                a('button[type="submit"]', f).html(d.submitText).removeClass("disabled")
                            } else {
                                if (l.thank_you.checked == "defualt") {
                                    a("body").css("padding", "30px").html('<p style="text-align: center;"><span style="font-size: 16pt;"><strong>Thank You!</strong></span></p> <p style="text-align: center;">We will get in touch with you shortly.</p>')
                                } else {
                                    if (l.thank_you.checked == "redirect") {
                                        window.top.location.href = decodeURIComponent(l.thank_you.url)
                                    } else {
                                        if (l.thank_you.checked == "custom") {
                                            var j = decodeURIComponent(l.thank_you.message.replace(/\\/g, "").replace(/\+/g, " "));
                                            a("body").css("padding", "30px").html(j)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        },
        getDoc: function (e) {
            var d = null;
            try {
                if (e.contentWindow) {
                    d = e.contentWindow.document
                }
            } catch (c) {}
            if (d) {
                return d
            }
            try {
                d = e.contentDocument ? e.contentDocument : e.document
            } catch (c) {
                d = e.document
            }
            return d
        }
    });
    a("form").form()
}(jQuery));