/*!
 * GuiForm Plugin
 * https://www.guiform.com
 *
 * By: Russell C. Pabon
 * http://russellpabon.com
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.draggable.js
 */
(function (b, c) {
  var a = {
    reload: false,
    bgColor: "#000000",
    opacity: 0.5,
    title: "Loading",
    body: "",
    status: "loading",
    overlay: true,
    result: "",
    data: "",
    dataType: "html",
    cache: false,
    url: "",
    maxScreen: false,
    width: "auto",
    type: "POST",
    showSpeed: 400,
    cancelButton: true,
    saveButton: false,
    closeButton: false,
    fullScreenButton: false,
    cancel: function () {},
    close: function () {},
    drag: function () {},
    fullScreen: function (d) {},
    htmlButton: function () {},
    save: function () {},
    confirm: function () {},
    create: function () {}
  };
  b.widget("guiform.guifbox", b.extend({}, a, {
    _create: function () {
      var f = this;
      var e = this.options;
      var d;
      this._build();
      b(document).on("click", "#guifbox-fullscreen", function () {
        if(b("#guifbox-window").hasClass("guifbox-maxscreen")) {
          b("#guifbox-window").removeClass("guifbox-maxscreen");
          b("body").css("overflow", "");
          b("#guifbox-body").css("height", "auto");
          d = false
        }
        else {
          b("#guifbox-window").addClass("guifbox-maxscreen");
          b("#guifbox-body").css("height", b(window).height() - 113);
          b("body").css("overflow", "hidden");
          d = true
        }
        e.fullScreen(d)
      });
      b(document).on("click", "#guifbox-save", function () {
        b("#guifbox-spinner").show();
        e.save();
        b("#guifbox-window").animate({
          opacity: 0
        }, 600, function () {
          b("#guifbox").empty();
          b("#guifbox").remove()
        })
      })
    },
    _maxscreen: function () {
      b("#guifbox-window").addClass("guifbox-maxscreen")
    },
    _init: function () {
      this._show();
      this._ui();
      this._event();
      if(this.options.maxScreen == true) {
        this._maxscreen();
        this.options.fullScreen(true)
      }
    },
    _ui: function () {
      var d = this.options;
      if(typeof (jQuery.ui.draggable) != "undefined") {
        b("#guifbox-window").draggable({
          handle: "#guifbox-header, #guifbox-button",
          containment: "window",
          cursor: "move",
          start: function (e, f) {
            d.drag()
          }
        });
        b("#guifbox-header").css("cursor", "move")
      }
    },
    _build: function () {
      var f;
      b("#guifbox").remove();
      if(this.options.status == "error") {
        f = "#FF0000"
      }
      if(this.options.status == "confirm" || this.options.status == "message" || this.options.status == "loading") {
        f = "#21759B"
      }
      if(this.options.status == "success") {
        f = "#00853F"
      }
      d = "<div id='guifbox'>								<div id='guifbox-lockscreen'></div>								<div id='guifbox-overlay'></div>								<div id='guifbox-window'>									<div id='guifbox-border'></div>									<div id='guifbox-header'>										<span id='guifbox-title'></span>									</div>									<div id='guifbox-body'></div>								</div>							</div>";
      (b("#guifbox").size() > 0) ? b("#guifbox-window, #guifbox-overlay").show() : b("body").append(d);
      (this.options.status != "loading") ? b("#guifbox-header").append("<span data-icon='&#xe082;' id='guifbox-close'></span>") : b("#guifbox-close").remove();
      (this.options.fullScreenButton == true) ? b("#guifbox-header").append("<span id='guifbox-fullscreen' title='Full Screen'></span>") : b("#guifbox-fullscreen").remove();
      (this.options.status == "loading" || this.options.status == "confirm") ? b("#guifbox-lockscreen").show() : b("#guifbox-lockscreen").hide();
      b("#guifbox-overlay").css({
        "background-color": this.options.bgColor
      });
      b("#guifbox-header").css({
        "background-color": f
      });
      b("#guifbox-title").html(this.options.title.toUpperCase());
      b("#guifbox-body").html(this.options.body);
      b("#guifbox-window").css({
        width: this.options.width
      });
      if(this.options.status == "confirm") {
        var e = "";
        if(this.options.cancelButton !== false) {
          e = "<a id='guifbox-cancel' class='button-secondary' href='javascript:void(0)'>Cancel</a> "
        }
        var d = "<div id='guifbox-button'>" + e + "<a id='guifbox-confirm' class='button-primary' href='javascript:void(0);' onclick='return false;'>Confirm</a>											</div>";
        b("#guifbox-window").append(d)
      }
      if(this.options.saveButton == true) {
        b("#guifbox-button").prepend("<span id='guifbox-spinner'></span>");
        b(".button-primary").attr("id", "guifbox-save").text("Save")
      }
      if(this.options.closeButton == true) {
        b("#guifbox-button").prepend("<a id='guifbox-close' class='button-secondary' href='javascript:void(0);' onclick='return false;'>Close</a>")
      }
      if(this.options.confirmButton == false) {
        b("#guifbox-confirm").remove()
      }
      if(b("#guifbox-button").size() == 0) {
        b("#guifbox-body").css("margin-bottom", "8px")
      }
      if(this.options.overlay == false) {
        b("#guifbox-overlay, #guifbox-lockscreen").remove()
      }
      this._createHTML()
    },
    _createHTML: function () {
      this.options.create()
    },
    _show: function () {
      var e = (b(document).width() - b("#guifbox-window").width()) / 2;
      var d = this.options;
      b("#guifbox-window").css({
        opacity: "0",
        left: e,
        top: "-1000px"
      }).animate({
        width: "auto"
      }, 1, function () {
        var f = (b(window).height() - b("#guifbox-window").height()) / 2;
        b(this).animate({
          opacity: "1",
          left: e,
          top: f
        }, d.showSpeed)
      });
      b("#guifbox-overlay").css({
        "background-color": d.bgColor,
        opacity: d.opacity
      })
    },
    _event: function () {
      var d = this.options;
      var e = this;
      if(d.status != "confirm" && d.url != "") {
        e._confirm()
      }
      b("#guifbox-confirm").click(function () {
        (d.url != "") ? e._confirm(d) : d.confirm()
      });
      b("#guifbox-overlay, #guifbox-close, #guifbox-cancel").click(function (f) {
        e._close()
      });
      b(document).keydown(function (g) {
        var f = g.charCode || g.keyCode || 0;
        if(b("#guifbox").size() > 0 && f == 27) {
          e._close()
        }
      })
    },
    _close: function () {
      var e = this;
      var d = this.options;
      if(d.status == "success" && d.reload == true) {
        b("#guifbox-header").css({
          "background-color": "#21759B"
        });
        b("#guifbox-title").html("Loading");
        b("#guifbox-button, #guifbox-close").remove();
        b("#guifbox-body").html("<p>Page Loading</p>");
        d.reload = true;
        d.status = "loading";
        b("#guifbox").remove();
        b(e.element).remove();
        window.location = d.location || location.href.toString()
      }
      if(d.status == "message" || d.status == "error" || d.status == "confirm") {
        d.cancel();
        b("#guifbox-window").animate({
          opacity: "0"
        }, 600, function () {
          b("#guifbox").remove();
          b(e.element).remove();
          b("body").css("overflow", "");
          d.close()
        })
      }
    },
    _confirm: function (d) {
      var e = this;
      b.ajax({
        dataType: this.options.dataType,
        cache: this.options.cache,
        type: this.options.type,
        data: this.options.data,
        url: this.options.url,
        beforeSend: function () {
          b("#guifbox-header").css({
            "background-color": "#21759B"
          });
          b("#guifbox-title").html("Loading");
          b("#guifbox-button, #guifbox-close").remove();
          b("#guifbox-body").css("margin-bottom", "8px").html("<p>Please wait while the server processing your request.</p>");
          var g = (b("body").height() - b("#guifbox-window").height()) / 2;
          var f = (b("body").width() - b("#guifbox-window").width()) / 2;
          b("#guifbox-window").css({
            top: g,
            left: f
          })
        },
        success: function (f) {
          b("#guifbox").remove();
          b(e.element).remove();
          e.options.success(f)
        }
      })
    }
  }));
  b.guiform.guifbox.prototype.options = b.extend({}, b.guiform.guifbox.prototype.options, a)
}(jQuery));