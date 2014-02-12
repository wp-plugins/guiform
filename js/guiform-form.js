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
        file_counter: 0,
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
            var d = this.element;
            var e = this;
            var c = this.options;
            a.mask.definitions["#"] = "[0-9]";
            a.mask.definitions["@"] = "[a-zA-Z]";
            a.mask.definitions["*"] = "[a-zA-Z0-9]";
            a.mask.definitions["~"] = "[+-]";
            if (window.FormData !== b && window.File && window.FileList) {
                e.FileInit()
            } else {
                a('input[type="file"][multiple="multiple"]').on("change", function (h) {
                    var i = Math.floor(Math.random() * 90000);
                    d.append('<input type="hidden" class="guiform-file-' + i + '" name="guiform-upload" value="' + this.name + '">');
                    d.append('<input type="hidden" class="guiform-file-' + i + '" name="guiform-item" value="' + a(this).parents(".item").attr("id") + '">');
                    d.append('<input type="hidden" class="guiform-file-' + i + '" name="guiform-file" value="' + i + '">');
                    var g = a(this).parents(".item");
                    var f = '<div id="file-' + i + '" class="gui-file selected" title="Uploading file.">												<div class="gui-file-bar"></div>												<div class="gui-file-wrap clearfix">													<span class="gui-file-name">Loading</span>													<span class="gui-file-size"><img src="' + guif.images + 'fb-loader.gif" /></span>													<span class="gui-file-remove cancel icon-fontawesome-webfont-96" title="cancel"></span>												</div>											</div>';
                    a(".gui-files", g).prepend(f);
                    a(".gui-file.selected", d).addClass("restored-item").animate({
                        opacity: 1
                    }, 1300, function () {
                        a(this).removeClass("restored-item, selected");
                        e.tooltip()
                    });
                    a('input[type="submit"]').trigger("click")
                })
            } if (a(".switch").size() > 0) {
                a(".switch").buttonset()
            }
            a(".ui-spinner").each(function () {
                var f = a(this).attr("data-max");
                var g = a(this).attr("data-min");
                a(this).spinner({
                    max: f,
                    min: g
                })
            });
            a(".f_phone input").each(function () {
                a(this).mask(a(this).attr("data-mask"))
            });
            a(document).on("click", ".gui-file-remove", function () {
                var g = a(this).parent().parent();
                var f = g.parent();
                g.addClass("removed-item").slideUp(800, function () {
                    a(this).remove();
                    if (a(".gui-file", f).size() == 0) {
                        e.reset_file(f)
                    }
                })
            });
            a(document).on("keydown", ".ui-spinner-input", function (g) {
                var f = g.charCode || g.keyCode || 0;
                if (g.shiftKey == true) {
                    return false
                }
                return (f == 13 || f == 8 || f == 9 || f == 46 || (f >= 35 && f <= 40) || (f >= 48 && f <= 57) || (f >= 96 && f <= 105));
                g.preventDefault()
            }).on("cut copy paste", ".ui-spinner-input", function (f) {
                f.preventDefault()
            });
            a(window).on("load", function (f) {
                e.reset()
            });
            a(document).on("click", ".gui-file-remove", function (g) {
                var h = a(this).parents(".gui-file").attr("id").split("-")[1];
                var f = a(this).parents(".item").find("input").attr("name").split("[")[0];
                e.FileRemove(f, h)
            });
            a('input[type="reset"]', this.element).click(function (f) {
                e.reset()
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
                action: "unlink",
                file: d
            };
            a.ajax({
                url: guif.ajax_url,
                data: g,
                dataType: "html",
                cache: false,
                async: true,
                type: "POST",
                success: function (j) {
                    if (xhr_state[i] == false) {
                        h.file_counter--
                    }
                    if (h.file_counter == 0) {
                        a('input[type="submit"]', f).val("Submit").removeClass("disabled")
                    }
                }
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
                    action: "unlink",
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
            a('input[type="submit"]', c).val("Submit").removeClass("disabled");
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
                            o = '<span class="gui-file-size"><img src="' + guif.images + 'fb-loader.gif" /></span>										'
                        }
                    }
                    var o = '<div id="file-' + m + '" class="gui-file selected" title="' + u + '">												<div class="gui-file-bar"></div>												<div class="gui-file-wrap clearfix">													<span class="gui-file-name">' + r + "</span>													" + o + '													<span class="gui-file-remove cancel icon-fontawesome-webfont-96" title="cancel"></span>												</div>											</div>';
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
                        xhr[m].open("POST", guif.ajax_url + "?test=ssss", true);
                        xhr[m].upload.onprogress = function (w) {
                            var v = parseInt(w.loaded / w.total * 100);
                            p.css("width", v + "%")
                        };
                        xhr[m].onreadystatechange = function (v) {
                            if (xhr[m] !== b && xhr[m].readyState == 4) {
                                data = a.parseJSON(this.responseText);
                                if (data.status == "error") {
                                    a("#file-" + data.error.id).attr("title", data.error.message);
                                    a("#file-" + data.error.id).find(".gui-file-bar").remove();
                                    a("#file-" + data.error.id).find(".gui-file-size").html("Failed");
                                    a("#file-" + data.error.id).find(".gui-file-remove").removeClass("cancel").attr("title", "remove");
                                    a(".guiform-file-" + data.error.id).remove()
                                } else {
                                    a("#file-" + data.info.id).find(".gui-file-bar").addClass("success");
                                    a("#file-" + data.info.id).attr("title", "");
                                    a("#file-" + data.info.id).find(".gui-file-name").html(data.info.name);
                                    a("#file-" + data.info.id).find(".gui-file-size").html(a.bytesToSize(data.info.size));
                                    a("#file-" + data.info.id).find(".gui-file-remove").removeClass("cancel").attr("title", "remove");
                                    a(".guiform-file-" + data.info.id).remove();
                                    xhrData[m] = data.info
                                }
                            }
                        };
                        var n = new FormData();
                        n.append("file", this);
                        n.append("action", "xhr-upload");
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
                if (d.file_counter > 0) {
                    alert("Please wait while we process your file upload!")
                } else {
                    if (d.file_counter == 0 && a('input[type="submit"]', c).hasClass("disabled")) {
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
        submit: function (f) {
            var e = this.element;
            var h = this;
            var c = a(e);
            a('input[type="submit"]', e).val("Loading").addClass("disabled");
            var g = "unique-" + (new Date().getTime());
            var d = a('<iframe style="width: 100%; height : 200px;" src="javascript:false;" name="' + g + '" />');
            d.hide();
            if (Object.keys(xhrData).length && a("input[class^='guiform-file-']").size() == 0) {
                c.append('<textarea name="guiform-xhrData" style="display:none;">' + JSON.stringify(xhrData) + "</textarea>")
            }
            c.attr("target", g);
            c.attr("enctype", "multipart/form-data");
            c.attr("Content-Type", "application/octet-stream");
            d.appendTo("body");
            d.load(function (m) {
                a("[name='guiform-xhrData']").remove();
                var l = h.getDoc(d[0]);
                var j = l.body ? l.body : l.documentElement;
                var k = j.innerHTML;
                if (k.indexOf("Fatal error") !== -1) {
                    alert("Fatal error: " + k.split("Fatal error:")[1].split(" in ")[0])
                } else {
                    if (a("input[class^='guiform-file-']").size() > 0) {
                        k = a.parseJSON(k);
                        if (k.status == "error") {
                            a("#file-" + k.error.id).attr("title", k.error.message);
                            a("#file-" + k.error.id).find(".gui-file-name").html(k.error.file);
                            a("#file-" + k.error.id).find(".gui-file-size").html("Failed");
                            a("#file-" + k.error.id).find(".gui-file-remove").removeClass("cancel").attr("title", "remove");
                            a(".guiform-file-" + k.error.id).remove()
                        } else {
                            a("#file-" + k.info.id).find(".gui-file-bar").addClass("success");
                            a("#file-" + k.info.id).attr("title", "");
                            a("#file-" + k.info.id).find(".gui-file-name").html(k.info.name);
                            a("#file-" + k.info.id).find(".gui-file-size").html(a.bytesToSize(k.info.size));
                            a("#file-" + k.info.id).find(".gui-file-remove").removeClass("cancel").attr("title", "remove");
                            a(".guiform-file-" + k.info.id).remove();
                            xhrData[k.info.id] = k.info
                        }
                        a("iframe[name='" + g + "']").remove()
                    } else {
                        k = a.parseJSON(k);
                        a("iframe[name='" + g + "']").remove();
                        if (k.status == "fail") {
                            alert(k.message)
                        } else {
                            if (k.status == "error") {
                                if (k.message !== b) {
                                    alert(k.message)
                                } else {
                                    a.each(k.error, function (n, q) {
                                        var p = a("#" + n).find(".wrap");
                                        var o = p.width();
                                        p.append('<div class="error-message"><span class="arrow top left"></span><p>' + q + "</p></div>");
                                        p.find(".error-message").css("width", o)
                                    })
                                }
                            } else {
                                if (k.thank_you.checked == "defualt") {
                                    a("body").css("padding", "30px").html('<p style="text-align: center;"><span style="font-size: 16pt;"><strong>Thank You!</strong></span></p> <p style="text-align: center;">We will get in touch with you shortly.</p>')
                                } else {
                                    if (k.thank_you.checked == "redirect") {
                                        window.top.location.href = decodeURIComponent(k.thank_you.url)
                                    } else {
                                        if (k.thank_you.checked == "custom") {
                                            var i = decodeURIComponent(k.thank_you.message.replace(/\\/g, "").replace(/\+/g, " "));
                                            a("body").css("padding", "30px").html(i)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                a('input[type="submit"]', e).val("Submit").removeClass("disabled")
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