/*!
 * GuiForm Plugin
 * https://www.guiform.com
 *
 * By: Russell C. Pabon
 * http://russellpabon.com
 *
 */
(function () {
    var a = jQuery;
    a(".guif-action").click(function () {
        var e = a("a", this).attr("id").split("-")[1];
        var d = a("a", this).attr("class");
        var b = guiform.entries_url;
        var c = {
            action: d,
            id: e,
            form: a("#form-list").val()
        };
        a("<div>").guifbox({
            title: "Please confirm your action.",
            status: "confirm",
            body: "<p>Are you sure?</p>",
            url: ajaxurl,
            data: c,
            dataType: "html",
            cache: false,
            type: "POST",
            success: function (f) {
                var g = (d == "delete-form") ? "form" : "entry";
                if (f != "") {
                    var h = a(f).text().split("[")[1].split("]")[0];
                    a(this).guifbox({
                        title: "error",
                        status: "error",
                        body: f
                    })
                } else {
                    a(this).guifbox({
                        reload: true,
                        location: b,
                        title: "message",
                        status: "success",
                        body: "<p>Successful.</p>"
                    })
                }
            }
        });
        return false
    });
    setInterval(function (d) {
        var c = a(".wp-list-table thead th").size();
        var b = a(".wp-list-table thead th[style*='display']").size();
        a(".wp-list-table .inline-edit-row td").attr("colspan", c - b)
    }, 1);
    a(".meta-box-sortables").sortable({
        start: function (b, c) {
            a("#guiform .meta-box-sortables").css({
                "min-height": "100px"
            })
        },
        beforeStop: function () {
            a("#guiform .meta-box-sortables").css({
                "min-height": "inherit"
            })
        }
    });
    a(".quick_edit").click(function () {
        var d = a(this).find("a").attr("id").split("-")[1];
        var b = a(this).parent().parent().parent();
        a(".inline-edit-row").remove();
        a("#the-list tr").show();
        b.addClass(".hide").hide();
        a("#the-list tr:eq(" + b.index() + ")").after("<tr id='loader'><td colspan='0' align='center'><img src='" + guiform.plugins_url + "images/save-loader.gif'></td></tr>");
        var c = {
            action: "form-quick-edit",
            id: d
        };
        a.ajax({
            url: ajaxurl,
            data: c,
            dataType: "html",
            cache: false,
            async: false,
            type: "POST",
            success: function (e) {
                a("#loader").remove();
                a("#the-list tr:eq(" + b.index() + ")").after(e)
            }
        })
    });
    a(".wp-list-table").on("click", ".button-secondary.cancel", function () {
        a(".inline-edit-row").remove();
        a("#the-list tr").show(600)
    });
    a(".wp-list-table").on("click", ".button-primary.save", function () {
        var f = a.trim(a("input[name=form-id]").val());
        var e = a.trim(a("input[name=title]").val()) || "Untitled";
        var d = a("input[class=fields]:checked").map(function () {
            return this.value
        }).get();
        var b = a('select[name="db_con"]').val();
        a(".spinner").show();
        var c = {
            action: "form-quick-edit-save",
            id: f,
            db: b,
            title: e,
            field: d
        };
        a.ajax({
            url: ajaxurl,
            data: c,
            dataType: "html",
            cache: false,
            async: false,
            type: "POST",
            success: function (g) {
                a(".spinner").hide();
                g = JSON.parse(g);
                if (g.status == "error") {
                    a("<div>").guifbox({
                        title: g.status,
                        status: g.status,
                        body: "<p>" + g.message + "</p>"
                    })
                } else {
                    a("<div>").guifbox({
                        title: "message",
                        status: "message",
                        body: "<p>" + g.message + "</p>"
                    })
                }
            }
        })
    })
}).call(this);