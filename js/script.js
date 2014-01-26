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
    a.getDoc = function (d) {
        var c = null;
        try {
            if (d.contentWindow) {
                c = d.contentWindow.document
            }
        } catch (b) {}
        if (c) {
            return c
        }
        try {
            c = d.contentDocument ? d.contentDocument : d.document
        } catch (b) {
            c = d.document
        }
        return c
    };
    a("form")[0].reset();
    a("#from").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 3,
        onClose: function (b) {
            a("#to").datepicker("option", "minDate", b)
        }
    });
    a("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 3,
        onClose: function (b) {
            a("#from").datepicker("option", "maxDate", b)
        }
    });
    a("#guif-export select[name='form']").change(function () {
        if (this.value) {
            a("input[name='name']").val(a.trim(a("option:selected", this).text().split(":")[1]));
            var b = {
                action: "export-get-fields",
                id: a.trim(this.value)
            };
            a.ajax({
                url: ajaxurl,
                data: b,
                dataType: "html",
                cache: false,
                type: "POST",
                success: function (c) {
                    a("#display-fields").html(c);
                    a("#row-fields, #row-button").show()
                }
            })
        } else {
            a("#display-fields").html("");
            a("#row-fields, #row-button").hide()
        }
    });
    a("#guif-export form").submit(function (d) {
        d.stopPropagation();
        var c = a(this);
        var f = "unique" + (new Date().getTime());
        var e = c.attr("action");
        var b = a('<iframe src="javascript:false;" name="' + f + '" />');
        b.hide();
        c.attr("target", f);
        b.appendTo("body");
        b.load(function (j) {
            var i = a.getDoc(b[0]);
            var g = i.body ? i.body : i.documentElement;
            var h = g.innerHTML
        })
    })
}).call(this);