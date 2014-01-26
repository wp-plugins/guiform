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
    $.fn.getCursorPosition = function () {
        var c = $(this).get(0);
        var d = 0;
        if ("selectionStart" in c) {
            d = c.selectionStart
        } else {
            if ("selection" in document) {
                c.focus();
                var a = document.selection.createRange();
                var b = document.selection.createRange().text.length;
                a.moveStart("character", -c.value.length);
                d = a.text.length - b
            }
        }
        return d
    };
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
    $.browser = {
        object: function () {
            return navigator.userAgent.toLowerCase()
        },
        agent: function () {
            if (this.object().indexOf("msie") > -1) {
                return "msie/" + this.object().split("msie ")[1].split(";")[0]
            } else {
                if (this.object().indexOf("chrome") > -1) {
                    return "chrome/" + this.object().split("chrome/")[1].split(" ")[0]
                } else {
                    if (this.object().indexOf("safari") > -1) {
                        return "safari/" + this.object().split("version/")[1].split(" ")[0]
                    } else {
                        if (this.object().indexOf("opera") > -1) {
                            return "opera/" + this.object().split("opera/")[1].split(" ")[0]
                        } else {
                            return "firefox/" + this.object().split("firefox/")[1]
                        }
                    }
                }
            }
        },
        name: function () {
            return this.agent().split("/")[0]
        },
        version: function () {
            return this.agent().split("/")[1]
        }
    };
    $.fn.exists = function () {
        return this.length > 0 ? this : false
    };
    $.fn.serializeForm = function () {
        if (this.length < 1) {
            return false
        }
        var b = {};
        var c = b;
        var a = ':input[type!="reset"]';
        var d = function () {
            if (this.disabled) {
                return
            }
            var f = this.name.replace(/\[([^\]]+)?\]/g, ",$1").split(",");
            var k = f.length - 1;
            var j = $(this);
            if (f[0]) {
                for (var h = 0; h < k; h++) {
                    c = c[f[h]] = c[f[h]] || ((f[h + 1] === "" || f[h + 1] === "0") ? [] : {})
                }
                if (c.length !== undefined) {
                    if (j.attr("type") == "file" && j.hasAttr("multiple")) {
                        var g = j.attr("name").replace("[]", "");
                        var e = 0;
                        var l = {};
                        $.each(xhrData, function () {
                            if (this.field == g) {
                                l[e++] = {
                                    name: this.name,
                                    file: this.file
                                }
                            }
                        });
                        c.push("");
                        xhrFiles[g] = l
                    } else {
                        if (j.is(":checked")) {
                            c.push(j.val())
                        } else {
                            c.push("")
                        }
                    }
                } else {
                    if (j.attr("type") == "radio") {
                        var m = $("input[name='" + f[k] + "']:checked").val();
                        c[f[k]] = (m !== undefined) ? m : ""
                    } else {
                        c[f[k]] = j.val()
                    }
                }
                c = b
            }
        };
        this.filter(a).each(d);
        this.find(a).each(d);
        return b
    }
}).call(this);
(function (a, b) {
    a.widget("GuiForm.form", {
        options: {
            Field: {},
            Condition: {}
        },
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
            a("input", d).unwrap()
        },
        _create: function () {
            var d = this.element;
            var e = this;
            var c = this.options;
            a.mask.definitions["#"] = "[0-9]";
            a.mask.definitions["@"] = "[a-zA-Z]";
            a.mask.definitions["*"] = "[a-zA-Z0-9]";
            a.mask.definitions["~"] = "[+-]";
            if (window.File && window.FileList) {
                e.FileInit()
            }
            if (a(".switch").size() > 0) {
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
            a('input[type="file"]').each(function () {
                if (a(this).hasAttr("multiple") && a.browser.version() <= 9 && a.browser.name() == "msie") {
                    var g = a(this).clone();
                    var f = a(this).parents(".wrap");
                    a(this).parent().remove();
                    f.html(g)
                }
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
        FileRemove: function (d, h) {
            var c = this.options;
            var g = this;
            var e = this.element;
            var f = {
                action: "unlink",
                file: xhrData[h].file
            };
            xhr[h].abort();
            delete xhr[h];
            delete xhrData[h];
            a.ajax({
                url: guif.ajax_url,
                data: f,
                dataType: "html",
                cache: false,
                async: true,
                type: "POST",
                success: function (i) {
                    if (xhr_state[h] == false) {
                        g.file_counter--
                    }
                    if (g.file_counter == 0) {
                        a('input[type="submit"]', e).val("Submit").removeClass("disabled")
                    }
                }
            })
        },
        reset: function () {
            var c = this.element;
            var d = this;
            a(".gui-files", c).html("");
            d.remove_error();
            a(c).get(0).reset();
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
            var f = this;
            var d = this.options;
            var e = this.element;
            var c = 0;
            a('.guif-dropzone input[type="file"]').on("change", function (k) {
                var j = a(this).prop("files");
                var h = this.name.split("[")[0];
                var i = a(this).parents(".item");
                var g = a(this).attr("file-accept").toLowerCase().replace(/\s/g, "").split(",");
                var l = a(this).attr("file-maxsize");
                if (a(this).prop("multiple") == false && a(".gui-file", i).size() > 0) {
                    var m = a(".gui-file", i).attr("id").split("-")[1];
                    a(".gui-files", i).html("");
                    f.FileRemove(h, m)
                }
                a.each(j, function () {
                    var o = Math.floor(Math.random() * 90000);
                    var s = this.name;
                    var t = s.substr((~-this.name.lastIndexOf(".") >>> 0) + 2).toLowerCase();
                    var x = a.bytesToSize(this.size);
                    var r = this.size;
                    var u = 0;
                    var p = "";
                    var w = "";
                    var v = new Date();
                    var n = v.getDate() + "-" + Math.random().toString(36).slice(2) + "." + t;
                    if (a.inArray(t, g) > -1) {
                        p = '<span class="gui-file-size">' + x + "</span>"
                    } else {
                        p = '<span class="gui-file-error">Failed</span>';
                        w += "Upload FAILED, invalid file type !";
                        u++
                    } if (r > l) {
                        p = '<span class="gui-file-error">Failed</span>';
                        w += "Upload FAILED, file is too large !";
                        u++
                    }
                    var p = '<div id="file-' + o + '" class="gui-file selected" title="' + w + '">												<div class="gui-file-bar"></div>												<div class="gui-file-wrap clearfix">													<span class="gui-file-name">' + s + "</span>													" + p + '													<span class="gui-file-remove cancel icon-forbidden" title="cancel"></span>												</div>											</div>';
                    a(".gui-files", i).prepend(p);
                    if (u > 0) {
                        a("#file-" + o).find(".gui-file-remove").removeClass("cancel, icon-forbidden").addClass("icon-fontawesome-webfont").attr("title", "remove")
                    }
                    a(".gui-file.selected", i).addClass("restored-item").animate({
                        opacity: 1
                    }, 1300, function () {
                        a(this).removeClass("restored-item, selected")
                    });
                    if (u == 0) {
                        xhr[o] = f.createXMLHTTPObject();
                        xhr_state[o] = false;
                        f.file_counter++;
                        var q = a("#file-" + o).find(".gui-file-bar");
                        a('input[type="submit"]', e).val("Loading").addClass("disabled");
                        xhr[o].upload.addEventListener("progress", function (z) {
                            var y = parseInt(z.loaded / z.total * 100);
                            q.css("width", y + "%")
                        }, false);
                        xhr[o].onreadystatechange = function (y) {
                            if (xhr[o].readyState == 4) {
                                a("#file-" + o).addClass("file-checked").find(".gui-file-remove").removeClass("cancel, icon-forbidden").addClass("icon-fontawesome-webfont").attr("title", "remove");
                                f.file_counter--;
                                xhr_state[o] = true;
                                if (f.file_counter == 0) {
                                    a('input[type="submit"]', e).val("Submit").removeClass("disabled")
                                }
                                if (xhr[o].status == 200) {
                                    q.css("width", "auto").addClass("success")
                                } else {
                                    q.attr("title", xhr[o].responseText);
                                    q.css("width", "auto").addClass("error")
                                }
                            }
                        };
                        xhr[o].open("POST", guif.ajax_url, true);
                        xhr[o].setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        xhr[o].setRequestHeader("X_FILENAME", n);
                        xhr[o].setRequestHeader("X_ACTION", "file-upload");
                        xhr[o].setRequestHeader("Content-Type", "application/octet-stream");
                        xhr[o].send(this);
                        xhrData[o] = {
                            file: n,
                            field: h,
                            name: s
                        }
                    }
                });
                a(".gui-file").tooltip({
                    position: {
                        my: "center bottom-20",
                        at: "center top",
                        using: function (n, o) {
                            a(this).css(n).css("z-index", "999999");
                            a("<div>").addClass("arrow").addClass(o.vertical).addClass(o.horizontal).appendTo(this)
                        }
                    }
                })
            })
        },
        _init: function () {
            this._events()
        },
        remove_error: function () {
            var c = this.element;
            a(".error, .error-message", c).each(function () {
                (a(this).hasClass("error-message")) ? a(this).remove() : a(this).removeClass("error")
            })
        },
        _events: function () {
            var d = this;
            var c = this.element;
            c.submit(function (e) {
                if (d.file_counter > 0) {
                    alert("Please wait while we process your file upload!")
                } else {
                    if (d.file_counter == 0 && a('input[type="submit"]', c).hasClass("disabled")) {
                        alert("Please wait while we process your form.")
                    } else {
                        d.remove_error();
                        d.submit(e)
                    }
                } if (window.File && window.FileList) {
                    e.preventDefault()
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
            var j = this;
            var c = a(e);
            var h = c.attr("action");
            a('input[type="submit"]', e).val("Loading").addClass("disabled");
            if (window.File && window.FileList) {
                var g = {
                    action: "save-entries",
                    unique: c.attr("id").split("_")[1],
                    form: guif.form_id,
                    files: xhrFiles,
                    data: a(e).serializeForm()
                };
                a.ajax({
                    url: guif.ajax_url,
                    data: g,
                    dataType: "html",
                    cache: false,
                    type: "POST",
                    success: function (k) {
                        if (k.contains("Fatal error")) {
                            alert("Fatal error: " + k.split("Fatal error:")[1].split(" in ")[0])
                        } else {
                            k = JSON.parse(k);
                            if (k.status == "fail") {
                                alert(k.message)
                            } else {
                                if (k.status == "error") {
                                    if (k.message !== b) {
                                        alert(k.message)
                                    } else {
                                        a.each(k.error, function (l, o) {
                                            var n = a("#" + l).find(".wrap");
                                            var m = n.width();
                                            n.append('<div class="error-message"><span class="arrow top left"></span><p>' + o + "</p></div>");
                                            n.find(".error-message").css("width", m)
                                        })
                                    }
                                } else {
                                    if (k.thank_you.checked == "defualt") {
                                        a("body").css("padding", "30px").html('<p style="text-align: center;"><span style="font-size: 16pt;"><strong>Thank You!</strong></span></p> <p style="text-align: center;">We will get in touch with you shortly.</p>')
                                    } else {
                                        if (k.thank_you.checked == "redirect") {
                                            window.top.location.href = k.thank_you.url
                                        } else {
                                            if (k.thank_you.checked == "custom") {
                                                a("body").css("padding", "30px").html(k.thank_you.message.replace(/\\/g, ""))
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        a('input[type="submit"]', e).val("Submit").removeClass("disabled")
                    }
                })
            } else {
                var i = "unique" + (new Date().getTime());
                var d = a('<iframe src="javascript:false;" name="' + i + '" />');
                d.hide();
                c.attr("target", i);
                c.attr("enctype", "multipart/form-data");
                d.appendTo("body");
                d.load(function (n) {
                    var m = j.getDoc(d[0]);
                    var k = m.body ? m.body : m.documentElement;
                    var l = k.innerHTML;
                    a("body").html("")
                })
            }
        },
        language: function () {
            return window.navigator.userLanguage || window.navigator.language
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