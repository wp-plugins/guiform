/*!
 * GuiForm Plugin
 * https://www.guiform.com
 *
 * By: Russell C. Pabon
 * http://russellpabon.com
 *
 */
(function () {
    var b = jQuery;
    b("form")[0].reset();

    function a(c) {
        return /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(c) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(c)
    }
    setInterval(function (e) {
        var d = b(".wp-list-table thead th").size();
        var c = b(".wp-list-table thead th[style*='display: none']").size();
        b(".wp-list-table .inline-edit-row td").attr("colspan", d - c)
    }, 1);
    b(".delete-form").click(function () {
        if (confirm("Are you sure you want to delete this form?")) {
            var e = this.id.split("-")[1];
            var d = b(this).parent().parent().parent().parent();
            var c = {
                action: "delete-form",
                id: e
            };
            b.ajax({
                url: ajaxurl,
                data: c,
                dataType: "html",
                cache: false,
                type: "POST",
                success: function (f) {
                    d.hide("slide", "", 1000);
                    alert(f)
                }
            })
        }
    });
    b(".delete").click(function () {
        var f = this.id.split("-")[1];
        var c = b(this).attr("data-type");
        var e = b(this).parent().parent().parent().parent();
        var d = {
            action: "delete",
            type: c,
            id: f
        };
        b(this).guifbox({
            title: "Please confirm your action.",
            status: "confirm",
            body: "<p>Are you sure you want to delete this record?</p>",
            url: ajaxurl,
            data: d,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (g) {
                if (g != "") {
                    b(this).guifbox({
                        title: "error",
                        status: "error",
                        body: g
                    })
                } else {
                    b(this).guifbox({
                        reload: true,
                        title: "message",
                        status: "success",
                        body: "<p>Delete successful.</p>"
                    })
                }
            }
        });
        return false
    });
    b(".quick_edit").click(function () {
        var f = b(this).find("a").attr("id").split("-")[1];
        var e = b(this).find("a").attr("class");
        var c = b(this).parent().parent().parent();
        b(".inline-edit-row").remove();
        b("#the-list tr").show();
        c.addClass("hide").hide();
        var d = {
            action: e,
            id: f
        };
        b(this).guifbox({
            url: ajaxurl,
            data: d,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (g) {
                b("#the-list tr:eq(" + c.index() + ")").after(g)
            }
        });
        return false
    });
    b("#settings").on("click", "#add-mail, #add-database, #add-font, #add-datastructure", function () {
        b(".inline-edit-row").remove();
        b("#the-list tr.hide").show().removeClass("hide");
        b("#loader").remove();
        var c = {
            action: this.id
        };
        b("<div>").guifbox({
            url: ajaxurl,
            data: c,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (d) {
                b("#the-list tr:eq(0)").before(d)
            }
        })
    });
    b(".wp-list-table").on("click", "#save-database, #update-database", function () {
        var j = b.trim(b("input[name=form-id]").val());
        var e = b.trim(b("input[name=name]").val());
        var f = b.trim(b("input[name=host]").val());
        var h = b.trim(b("input[name=database]").val());
        var i = b.trim(b("input[name=username]").val());
        var d = b.trim(b("input[name=password]").val());
        var c = b.trim(b("input[name=port]").val());
        b(".spinner").show();
        var g = {
            action: "database-quick-save",
            id: j,
            name: e,
            host: f,
            database: h,
            username: i,
            password: d,
            port: c
        };
        b("<div>").guifbox({
            url: ajaxurl,
            data: g,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (k) {
                b(".spinner").hide();
                var l = b("<div />").append(b(k).clone()).html();
                if (b(l).attr("id") == "error") {
                    b(this).guifbox({
                        title: "error",
                        status: "error",
                        body: l
                    });
                    return
                }
                if (j != "") {
                    b(this).guifbox({
                        title: "success",
                        status: "success",
                        body: "<p>Update database connection successful</p>",
                        reload: true
                    })
                } else {
                    b(this).guifbox({
                        title: "success",
                        status: "success",
                        body: "<p>Add database connection successful</p>",
                        reload: true
                    })
                }
            }
        })
    });
    b(".wp-list-table").on("click", "#save-mail, #update-mail", function () {
        b(".spinner").show();
        var e = b.trim(b("input[name=form-id]").val());
        var k = b.trim(b("input[name=email]").val());
        var c = b.trim(b("input[name=name]").val());
        var f = (b("input[name=return_path]").is(":checked")) ? 1 : 0;
        var m = b("input[name=protocol]:checked").val();
        var g = b.trim(b("input[name=smtp_host]").val());
        var i = b.trim(b("input[name=smtp_port]").val());
        var n = b("input[name=smtp_encryption]:checked").val();
        var j = (b("input[name=smtp_auth]").is(":checked")) ? 1 : 0;
        var l = b.trim(b("input[name=smtp_username]").val());
        var d = b.trim(b("input[name=smtp_password]").val());
        if (a(k) == false) {
            b("<div>").guifbox({
                title: "Invalid Email",
                status: "error",
                body: "<p>Invalid email address.</p>"
            });
            return false
        }
        var h = {
            action: "mail-quick-save",
            id: e,
            email: k,
            name: c,
            return_path: f,
            protocol: m,
            smtp_host: g,
            smtp_port: i,
            smtp_encryption: n,
            smtp_auth: j,
            smtp_username: l,
            smtp_password: d
        };
        b("<div>").guifbox({
            url: ajaxurl,
            data: h,
            dataType: "json",
            cache: false,
            type: "POST",
            success: function (o) {
                b(".spinner").hide();
                if (o.status == "error") {
                    b(this).guifbox({
                        title: "error",
                        status: "error",
                        body: o.message
                    })
                } else {
                    if (e != "") {
                        b(this).guifbox({
                            title: "success",
                            status: "success",
                            body: "<p>Update mail successful</p>",
                            reload: true
                        })
                    } else {
                        b(this).guifbox({
                            title: "success",
                            status: "success",
                            body: "<p>Add mail successful</p>",
                            reload: true
                        })
                    }
                }
            }
        })
    });
    b(".wp-list-table").on("click", ".test-mail-button", function () {
        var d = this.id.split("-")[1];
        var c = {
            action: "send-test-mail",
            id: d
        };
        b("<div>").guifbox({
            url: ajaxurl,
            data: c,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (e) {
                if (e.split("!")[0] != "Message sent") {
                    b(this).guifbox({
                        title: "error",
                        status: "error",
                        body: e.split(" in ")[0]
                    })
                } else {
                    b(this).guifbox({
                        title: "success",
                        status: "message",
                        body: "<p>" + e + "</p>",
                        reload: false
                    })
                }
            }
        })
    });
    b(".wp-list-table").on("click", ".activation-key-button", function () {
        var d = this.id.split("-")[1];
        var c = {
            action: "send-activation-key",
            id: d
        };
        b("<div>").guifbox({
            url: ajaxurl,
            data: c,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (e) {
                if (e.split("!")[0] != "Message sent") {
                    b(this).guifbox({
                        title: "error",
                        status: "error",
                        body: e.split(" in ")[0]
                    })
                } else {
                    b(this).guifbox({
                        title: "success",
                        status: "message",
                        body: "<p>" + e + "</p>",
                        reload: false
                    })
                }
            }
        })
    });
    b(".wp-list-table").on("click", "#save-datastructure, #update-datastructure", function () {
        var j = b.trim(b("input[name=form-id]").val());
        var f = b.trim(b("select[name=type]").val());
        var h = b.trim(b("input[name=length]").val());
        var d = b.trim(b("select[name=default_type]").val());
        var c = b.trim(b("input[name=default_value]").val());
        var e = b.trim(b("select[name=collation]").val());
        var g = b.trim(b("select[name=attribute]").val());
        b(".spinner").show();
        var i = {
            action: "datastructure-quick-save",
            id: j,
            type: f,
            length: h,
            collation: e
        };
        b("<div>").guifbox({
            url: ajaxurl,
            data: i,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (k) {
                b(".spinner").hide();
                var l = b("<div />").append(b(k).clone()).html();
                if (b(l).attr("id") == "error") {
                    b(this).guifbox({
                        title: "error",
                        status: "error",
                        body: l
                    });
                    return
                }
                if (j != "") {
                    b(this).guifbox({
                        title: "success",
                        status: "success",
                        body: "<p>Update data structure successful</p>",
                        reload: true
                    })
                } else {
                    b(this).guifbox({
                        title: "success",
                        status: "success",
                        body: "<p>Add data structure successful</p>",
                        reload: true
                    })
                }
            }
        });
        return false
    });
    b(".wp-list-table").on("click", "#save-font, #update-font", function () {
        var g = b.trim(b("input[name=form-id]").val());
        var e = b.trim(b("input[name=name]").val());
        var c = b.trim(b("input[name=font-family]").val());
        var d = b.trim(b("input[name=url]").val());
        b(".spinner").show();
        var f = {
            action: "font-quick-save",
            id: g,
            name: e,
            "font-family": encodeURIComponent(c.replace(/"/g, "'")),
            url: encodeURIComponent(d)
        };
        b("<div>").guifbox({
            url: ajaxurl,
            data: f,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (h) {
                b(".spinner").hide();
                var i = b("<div />").append(b(h).clone()).html();
                if (b(i).attr("id") == "error") {
                    b(this).guifbox({
                        title: "error",
                        status: "error",
                        body: i
                    });
                    return
                }
                if (g != "") {
                    b(this).guifbox({
                        title: "success",
                        status: "success",
                        body: "<p>Update font successful</p>",
                        reload: true
                    })
                } else {
                    b(this).guifbox({
                        title: "success",
                        status: "success",
                        body: "<p>Add font successful</p>",
                        reload: true
                    })
                }
            }
        })
    });
    b(".wp-list-table").on("click", ".button-secondary.cancel", function () {
        b(".inline-edit-row").hide(600);
        b("#the-list tr.hide").show(600).removeClass("hide")
    })
}).call(this);