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
 *	jquery.ui.droppable.js
 *	jquery.ui.sortable.js
 *	jquery.ui.resizable.js
 *	jquery.ui.accordion.js
 *	jquery.ui.tabs.js
 *	jquery.ui.slider.js
 *	jquery.ui.spinner.js
 *	jquery.ui.button.js
 *	jquery.ui.color.js
 *	jquery.ui.tooltip.js
 *	jquery.ui.mouse.js
 */
(function () {
  $ = jQuery;
  $.fn.getCursorPosition = function () {
    var c = $(this).get(0);
    var d = 0;
    if("selectionStart" in c) {
      d = c.selectionStart
    }
    else {
      if("selection" in document) {
        c.focus();
        var a = document.selection.createRange();
        var b = document.selection.createRange().text.length;
        a.moveStart("character", -c.value.length);
        d = a.text.length - b
      }
    }
    return d
  };
  $.fn.removeTags = function () {
    this.each(function () {
      if($(this).children().length == 0) {
        $(this).replaceWith($(this).text())
      }
      else {
        $(this).children().unwrap()
      }
    });
    return this
  };
  $.cleanTags = function (b, a) {
    var c = $("<div />").append(b);
    c.find(":not(" + a + ")").removeTags();
    return c
  };
  $.fn.replaceTag = function (f, e) {
    $this = this;
    var c, a, b = jQuery([]),
      d = $(f);
    a = $this.length;
    for(c = 0; c < a; c++) {
      $currentElem = $this.eq(c);
      currentElem = $currentElem[0];
      $newTag = d.clone();
      if(e) {
        newTag = $newTag[0];
        newTag.className = currentElem.className;
        $.extend(newTag.classList, currentElem.classList);
        $.extend(newTag.attributes, currentElem.attributes)
      }
      $newTag.html(currentElem.innerHTML).replaceAll($currentElem);
      b.pushStack($newTag)
    }
    return this
  };
  $.fn.removeClassRegEx = function (e) {
    var d = $(this).attr("class");
    if(!d || !e) {
      return false
    }
    var b = [];
    d = d.split(" ");
    for(var c = 0, a = d.length; c < a; c++) {
      if(!d[c].match(e)) {
        b.push(d[c])
      }
    }
    $(this).attr("class", b.join(" "));
    return $(this)
  };
  $.fn.hasClassRegEx = function (d) {
    var c = $(this).attr("class");
    if(!c || !d) {
      return false
    }
    c = c.split(" ");
    for(var b = 0, a = c.length; b < a; b++) {
      if(c[b].match(d)) {
        return true
      }
    }
    return false
  };
  $.fn.hasAttr = function (a) {
    if(this.attr) {
      var b = this.attr(a)
    }
    else {
      var b = this.getAttribute(a)
    }
    return(typeof b !== "undefined" && b !== false && b !== null)
  };
  $.bytesToSize = function (a, d) {
    d = d || true;
    var c = ["Bytes", "KB", "MB", "GB", "TB"];
    if(a == 0) {
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
      if(this.object().indexOf("msie") > -1) {
        return "msie/" + this.object().split("msie ")[1].split(";")[0]
      }
      else {
        if(this.object().indexOf("chrome") > -1) {
          return "chrome/" + this.object().split("chrome/")[1].split(" ")[0]
        }
        else {
          if(this.object().indexOf("safari") > -1) {
            return "safari/" + this.object().split("version/")[1].split(" ")[0]
          }
          else {
            if(this.object().indexOf("opera") > -1) {
              return "opera/" + this.object().split("opera/")[1].split(" ")[0]
            }
            else {
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
  $.guiform = {
    emails: function (b, d) {
      d = d || "";
      if($(guiBuilder.emails).size() > 0) {
        var e = $(".f_email").map(function (f) {
          var g = [[$("input", this).attr("name"), $("label", this).text()]];
          return g
        }).get();
        var a = $(".f_text input[class='validation[email]']").map(function (f) {
          var g = [[$(this).attr("name"), $(this).parents(".item").find("label").text()]];
          return g
        }).get();
        var c = '<select name="' + b + '" class="' + d + '">';
        $.each(guiBuilder.emails, function () {
          c += '<option value="{' + this.name + '}">' + this.name + "</option>"
        });
        $.each($.merge(e, a), function () {
          c += '<option value="{' + this[0] + '}">' + this[1] + "</option>"
        });
        c += "</select>"
      }
      else {
        c = '<a href="' + guiBuilder.admin_url + '">Click here to add email address.</a>'
      }
      return c
    },
    dataType: function () {
      var a = '<select name="p_data_type" class="p_data_type">';
      $.each(guiBuilder.data_type, function () {
        a += '<option value="' + this.name + '">' + this.name + "</option>"
      });
      a += "</select>";
      return a
    },
    remoteDb: function () {
      var a = '<select name="remote-db" id="remote-db">';
      a += '<option value="0">' + guiBuilder.site_name + " Database Installation</option>";
      $.each(guiBuilder.remote_db, function () {
        a += '<option value="' + this.id + '">' + this.name + "</option>"
      });
      a += "</select>";
      return a
    },
    Fonts: {
      "Andale Mono": '"Andale Mono"',
      Arial: "Arial",
      "Arial Black": '"Arial Black"',
      "Arial Narrow": '"Arial Narrow"',
      "Arial Rounded MT Bold": '"Arial Rounded MT Bold"',
      "Big Caslon": '"Big Caslon"',
      "Bodoni MT": '"Bodoni MT"',
      "Book Antiqua": '"Book Antiqua"',
      "Brush Script MT": '"Brush Script MT"',
      "Calisto MT": '"Calisto MT"',
      Calibri: "Calibri",
      Cambria: "Cambria, Georgia, serif",
      Candara: "Candara",
      "Century Gothic": '"Century Gothic"',
      "Courier New": '"Courier New"',
      "Franklin Gothic Medium": '"Franklin Gothic Medium"',
      Garamond: "Garamond",
      Georgia: "Georgia",
      "Gill Sans": '"Gill Sans"',
      "Goudy Old Style": '"Goudy Old Style"',
      "Helvetica Neue": '"Helvetica Neue"',
      Helvetica: "Helvetica",
      "Hoefler Text": '"Hoefler Text"',
      Impact: "Impact",
      "Lucida Bright": '"Lucida Bright"',
      "Lucida Console": '"Lucida Console"',
      "Lucida Grande": '"Lucida Grande"',
      "Lucida Sans Typewriter": '"Lucida Sans Typewriter"',
      "Open Sans": '"Open Sans"',
      Papyrus: "Papyrus",
      Perpetua: "Perpetua",
      Rockwell: "Rockwell",
      "Rockwell Extra Bold": '"Rockwell Extra Bold"',
      "sans-serif": "sans-serif",
      "Segoe UI": '"Segoe UI"',
      Tahoma: "Tahoma",
      "Times New Roman": "times new roman",
      "Trebuchet MS": '"Trebuchet MS"',
      Verdana: "Verdana"
    },
    fonts: guiBuilder.fonts
  };
  $.popupBlockerChecker = {
    check: function (b) {
      var a = this;
      if(b) {
        if(/chrome/.test(navigator.userAgent.toLowerCase())) {
          setTimeout(function () {
            a._is_popup_blocked(a, b)
          }, 200)
        }
        else {
          b.onload = function () {
            a._is_popup_blocked(a, b)
          }
        }
      }
      else {
        a._displayError()
      }
    },
    _is_popup_blocked: function (a, b) {
      if((b.innerHeight > 0) == false) {
        a._displayError()
      }
    },
    _displayError: function () {
      alert("Popup window is blocked for this website.")
    }
  };
  $.ui.draggable.prototype._generatePosition = function (b) {
    var c = this.options,
      j = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
      g = (/(html|body)/i).test(j[0].tagName);
    var f = b.pageX;
    var e = b.pageY;
    if(this.originalPosition) {
      var a;
      if(this.containment) {
        if(this.relative_container) {
          var i = this.relative_container.offset();
          a = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
        }
        else {
          a = this.containment
        } if(b.pageX - this.offset.click.left < a[0]) {
          f = a[0] + this.offset.click.left
        }
        if(b.pageY - this.offset.click.top < a[1]) {
          e = a[1] + this.offset.click.top
        }
        if(b.pageX - this.offset.click.left > a[2]) {
          f = a[2] + this.offset.click.left
        }
        if(b.pageY - this.offset.click.top > a[3]) {
          e = a[3] + this.offset.click.top
        }
      }
      if(c.grid) {
        var h = c.grid[1] ? this.originalPageY + Math.round((e - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
        e = a ? (!(h - this.offset.click.top < a[1] || h - this.offset.click.top > a[3]) ? h : (!(h - this.offset.click.top < a[1]) ? h - c.grid[1] : h + c.grid[1])) : h;
        var d = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
        f = a ? (!(d - this.offset.click.left < a[0] || d - this.offset.click.left > a[2]) ? d : (!(d - this.offset.click.left < a[0]) ? d - c.grid[0] : d + c.grid[0])) : d
      }
    }
    return {
      top: (e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : j.scrollTop())))),
      left: (f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : j.scrollLeft())))
    }
  };
  $.ui.sortable.prototype._mouseStop = function (b, c) {
    if(!b) {
      return
    }
    if($.ui.ddmanager && !this.options.dropBehaviour) {
      $.ui.ddmanager.drop(this, b)
    }
    if(this.options.revert) {
      var a = this;
      var d = this.placeholder.offset();
      this.reverting = true;
      $(this.helper).animate({
        left: d.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
        top: d.top - this.offset.parent.top
      }, parseInt(this.options.revert, 10) || 500, function () {
        a._clear(b)
      })
    }
    else {
      this._clear(b, c)
    }
    return false
  }
}).call(this);
(function (a, b) {
  a.widget("GuiForm.guiTools", {
    options: {
      id: guiform.id || false,
      database: guiBuilder.database,
      screenPreview: 0,
      reload: false,
      reserved_word: ["id", "guif_ip", "guif_date_submitted", "guif_status", "guif_browser", "guif_os"],
      caret: "",
      item_errors: {},
      menu: {
        save: ["&#xe00a;", "Save Form"],
        create: ["&#xe077;", "Create New Form"],
        preview: ["&#xe09a;", "Form Preview"],
        style: ["&#xe026;", "Form Style"],
        required: ["&#xe013;", "Required"],
        merge: ["&#xe071;", "Combined Field"],
        "delete": ["&#xe003;", "Remove Field"],
        properties: ["&#xe038;", "Field Properties"],
        code: ["&#xe01c;", "Source Code"],
        "thank-you": ["&#xe07c;", "Thank You Message"],
        mail: ["&#xe03e;", "Email Settings"],
        performance: ["&#xe00b;", "Analyze Performance"]
      },
      Properties: {
        "Font Family": "",
        "List Type": "<select id='p_list_type'>																					<option value='disc'>disc</option>																					<option value='square'>square</option>																					<option value='circle'>circle</option>																					<option value='decimal'>decimal</option>																					<option value='decimal-leading-zero'>decimal-leading-zero</option>																					<option value='lower-roman'>lower-roman</option>																					<option value='upper-roman'>upper-roman</option>																					<option value='lower-greek'>lower-greek</option>																					<option value='lower-alpha'>lower-alpha</option>																					<option value='upper-alpha'>upper-alpha</option>																					<option value='hiragana'>hiragana</option>																					<option value='katakana'>katakana</option>																				</select>",
        "Font Size": "<input type='text' id='p_font_size' value='' class='prop-spinner'> pixels",
        Text: "<input type='text' id='p_text' value=''>",
        "Line Height": "<input type='text' id='p_line_height' value='' class='prop-spinner'> pixels",
        "Text Alignment": "<div class='switch'>																					<input type='radio' value='left' name='p_alignment' id='radio1' /><label for='radio1' title='left'><span class='icon' data-icon='&#xe055;'></span></label>																					<input type='radio' value='center' name='p_alignment' id='radio2' /><label for='radio2' title='center'><span class='icon' data-icon='&#xe056;'></span></label>																					<input type='radio' value='right' name='p_alignment' id='radio3' /><label for='radio3' title='right'><span class='icon' data-icon='&#xe063;'></span></label>																					<input type='radio' value='justify' name='p_alignment' id='radio4' /><label for='radio4' title='justify'><span class='icon' data-icon='&#xe057;'></span></label>																				</div>",
        "Sub Text": "<input type='text' id='p_sub_text' value=''>",
        "Text Content": "<textarea id='p_text_content'></textarea>																				<p>Allows: b, strong, i, em, u, br, blockquote, a</p>",
        Label: "<input type='text' id='p_text_label' value=''>",
        "Submit Text": "<input type='text' id='p_submit_text' value=''>",
        "Reset Text": "<input type='text' id='p_reset_text' value=''>",
        "Loading Text": "<input type='text' id='p_loading_text' value=''>",
        Placeholder: "<input type='text' id='p_placeholder' value=''>",
        "Short Description": "<input type='text' id='p_short_description' value=''>",
        "Input Mask": "<input type='text' id='p_input_mask' value=''>						  													<p>Use the following symbol to mask:</p>						  													<p>~ = + or -</p>						  													<p>@ = Alphabet</p>						  													<p># = Numeric</p>						  													<p>* = Alphanumeric</p>",
        "Maximum Input": "<input type='text' id='p_max_input' value='' class='prop-spinner'>",
        Width: "<input type='text' id='p_width' value=''  class='prop-spinner'>",
        Height: "<input type='text' id='p_height' value='' class='prop-spinner'>",
        "Options Text Width": "<input type='text' id='p_options_label' value='' class='prop-spinner'>",
        "File Accept": "<input type='text' id='p_short_description' value=''>",
        "Option Columns": "<input type='text' id='p_columns' value='' class='prop-spinner'>",
        "Unique Value": "<label><input id='p_unique_value' type='checkbox' value=''> No duplicate entry.</label><p>Field must be required enable.</p>",
        Validation: "<ul>										  										<li><label><input type='radio' class='p_validation' name='validation' value='none'><span>None</span></label></li>																					<li><label><input type='radio' class='p_validation' name='validation' value='email'><span>Email</span></label></li>																					<li><label><input type='radio' class='p_validation' name='validation' value='numeric'><span>Numeric</span></label></li>																					<li><label><input type='radio' class='p_validation' name='validation' value='alphabet'><span>Alphabet</span></label></li>																					<li><label><input type='radio' class='p_validation' name='validation' value='alphanum'><span>AlphaNumeric</span></label></li>																				</ul>",
        Offset: "<div id='p_submit_offset'></div><div class='p_submit_offset_value'>Value : <span>0px</span></div>",
        "Submit Alignment": "<ul>																			  	 <li><label><input type='radio' class='p_submit_alignment' name='alignment' value='right'><span>Right</span></label></li>																			  	 <li><label><input type='radio' class='p_submit_alignment' name='alignment' value='left'><span>Left</span></label></li>																			  	 <li><label><input type='radio' class='p_submit_alignment' name='alignment' value='center'><span>Center</span></label></li>																		    </ul>",
        "Show Reset Button": "<ul>																			  	 <li><label><input type='checkbox' class='p_show_reset' name='reset' value='reset'><span>Reset</span></label></li>																		    </ul>",
        "Label Width": "<input type='text' id='p_label_width' value='' class='prop-spinner'>",
        "Allow Multiple Upload": "<input type='checkbox' id='p_multiple_file' value=''>",
        "File Extentions": "<textarea id='p_file_extensions'>jpg, jpeg, png, gif, pdf, doc, docx, xls, csv, txt, html, zip, mp3, mpg, flv, avi</textarea>",
        "Max File Size": "<input type='text' id='p_max_size' class='prop-spinner'><span style='margin: 0px 10px;'>MB</span>",
        "Maximum Value": "<input type='text' class='prop-spinner' id='p_spinner_max' value=''>",
        "Minimum Value": "<input type='text' class='prop-spinner' id='p_spinner_min' value=''>"
      },
      Style: {
        Alignment: "<ul>				  										 <li><label><input type='radio' class='p_alignment' name='alignment' value='top'><span>Top</span></label></li>															 <li><label><input type='radio' class='p_alignment' name='alignment' value='right'><span>Right</span></label></li>															 <li><label><input type='radio' class='p_alignment' name='alignment' value='left'><span>Left</span></label></li>															 <li><label><input type='radio' class='p_alignment' name='alignment' value='center'><span>Center</span></label></li>													   </ul>",
        "Background Color": "<input type='text' id='backgroundColor' class='basic' value='' />",
        "Label Color": "<input type='text' id='color' class='basic' value='' />",
        "Border Color": "<input type='text' id='borderColor' class='basic' value='' />"
      },
      Options: {
        Gender: ["Male", "Female"],
        Days: ["Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        Months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "US States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        "US States Abbr": ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
        Countries: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia-Herzegovina", "Botswana", "Bouvet Island", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo, Democratic Republic of the (Zaire)", "Congo, Republic of", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe (French)", "Guam (USA)", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast (Cote D`Ivoire)", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique (French)", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia (French)", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Island", "Poland", "Polynesia (French)", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and South Sandwich Islands", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste (East Timor)", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wallis and Futuna Islands", "Yemen", "Zambia", "Zimbabwe"]
      },
      Icons: {
        Gender: {
          Male: '<span title="Male" data-icon="&#xe047;"></span>',
          Female: '<span title="Female" data-icon="&#xe06c;"></span>'
        },
        Alignment: {
          Left: '<span title="Left" data-icon="&#xe055;"></span>',
          Center: '<span title="Center" data-icon="&#xe056;"></span>',
          Right: '<span title="Right" data-icon="&#xe063;"></span>',
          Justify: '<span title="Justify" data-icon="&#xe057;"></span>'
        },
        Arrows: {
          Up: '<span title="Up" data-icon="&#xe014;"></span>',
          Left: '<span title="Left" data-icon="&#xe099;"></span>',
          Down: '<span title="Down" data-icon="&#xe02d;"></span>',
          Right: '<span title="Right" data-icon="&#xe09d;"></span>'
        },
        "Operating System": {
          Android: '<span title="Android" data-icon="&#xe028;"></span>',
          Apple: '<span title="Apple" data-icon="&#xe019;"></span>',
          Linux: '<span title="Linux" data-icon="&#xe0c0;"></span>',
          Windows: '<span title="Windows" data-icon="&#xe020;"></span>'
        },
        "Content Management System": {
          Blogger: '<span title="Blogger" data-icon="&#xe018;"></span>',
          Drupal: '<span title="Drupal" data-icon="&#xe017;"></span>',
          Joomla: '<span title="Joomla" data-icon="&#xe0d3;"></span>',
          WordPress: '<span title="WordPress" data-icon="&#xe0b7;"></span>'
        }
      }
    },
    init: guiform,
    _build: function () {
      var c = this.options;
      var f = this;
      a("#GuiForm").append(a("<div id='header'></div>"));
      var d = '<ul class="clearfix">';
      a.each(c.menu, function (g, h) {
        d += '<li id="' + g + '"><span title="' + h[1] + '" data-icon="' + h[0] + '" class="menu-button"></li>'
      });
      d += '<li class="formName-list"><input maxlength="40" id="formName" title="Form Title" placeholder="Untitled Form" type="text" name="formName" value="' + guiform.title + '"></li>';
      d += "</ul>";
      a("#header").append(d);
      if(guiBuilder.performance == 0) {
        a("#performance").remove()
      }
      a("#header ul").css("min-width", a("#wpadminbar").width() - (a("#adminmenuwrap").width() + 35));
      if(a("#guiform-style").size() == 0) {
        var e = "<style type='text/css' id='guiform-style' media='all'>    									#canvas, #canvas .ui-widget{background-color: #FFFFFF;											font-family: Verdana,sans-serif;											}											#canvas .label{											color: #333333;											}											#canvas input, #canvas textarea, #canvas select{											border: 1px solid #CCCCCC;											}										 </style>";
        a("#canvas").prepend(e)
      }
      if(a("#guiform-form").size() == 0) {
        var e = "<style type='text/css' id='guiform-form' media='all'></style>";
        a("#canvas").prepend(e)
      }
      a(".switch").buttonset();
      a(".ui-spinner").each(function () {
        var g = a(this).attr("data-max");
        var h = a(this).attr("data-min");
        a(this).spinner({
          max: g,
          min: h
        })
      });
      a.mask.definitions["#"] = "[0-9]";
      a.mask.definitions["@"] = "[a-zA-Z]";
      a.mask.definitions["*"] = "[a-zA-Z0-9]";
      a.mask.definitions["~"] = "[+-]";
      a(".f_phone input").each(function () {
        a(this).mask(a(this).attr("data-mask"))
      });
      a(".menu-button, #formName").tooltip({
        position: {
          my: "center bottom-20",
          at: "center top",
          using: function (g, h) {
            a(this).css(g).css("z-index", "999999");
            a("<div>").addClass("arrow").addClass(h.vertical).addClass(h.horizontal).appendTo(this)
          }
        }
      })
    },
    _create: function () {
      this._build();
      var c = this.options;
      var g = this;
      var f = a(document);
      setInterval(function (i) {
        var h = a(".ui-sortable .ui-draggable:not(.ui-sortable .ui-draggable.merge), .ui-sortable .merge-item");
        if(parseInt(guiBuilder.settings.autosave.value) == 1 && c.id != "" && h.size() > 0) {
          g.save("autosave")
        }
      }, parseInt(guiBuilder.settings.autosave_time.value) * 1000);
      f.on("click", '#message input[name="message"]', function () {
        var i = a(this).val();
        g.init.thank_you.checked = i;
        var h = '<button id="message-next">Next</button> <button id="message-close">Finish</button>';
        if(i == "defualt") {
          a("#guifbox-button").html('<button id="message-close">Finish</button>').css("padding", "10px")
        }
        else {
          if(i == "redirect") {
            a("#guifbox-button").html(h).css("padding", "10px")
          }
          else {
            a("#guifbox-button").html(h).css("padding", "10px")
          }
        }
      });
      f.on("click", "#message-next", function () {
        var i = g.init.thank_you.checked;
        var h = '<button id="message-back">Back</button> <button id="message-close">Finish</button>';
        a("#message .list").hide();
        if(i == "redirect") {
          a("#message #message-table").hide();
          a("#message #message-url").show()
        }
        else {
          if(i == "custom") {
            a("#guifbox-window").css({
              width: "800px"
            });
            a("#message #message-url").hide();
            a("#message #message-table").show()
          }
        }
        a("#guifbox-button").html(h);
        var k = (a(document).width() - a("#guifbox-window").width()) / 2;
        var j = (a(window).height() - a("#guifbox-window").height()) / 2;
        a("#guifbox-window").css({
          left: k,
          top: j
        })
      });
      f.on("click", "#message-back", function () {
        var h = '<button id="message-next">Next</button> <button id="message-close">Finish</button>';
        a("#guifbox-button").html(h);
        a("#guifbox-window").css({
          width: "400px"
        });
        a("#message #message-url").hide();
        a("#message #message-table").hide();
        a("#message .list").show();
        var j = (a(document).width() - a("#guifbox-window").width()) / 2;
        var i = (a(window).height() - a("#guifbox-window").height()) / 2;
        a("#guifbox-window").css({
          left: j,
          top: i
        })
      });
      f.on("click", "#message-close", function () {
        a("#guifbox").hide("fast", function () {
          a(this).remove()
        })
      });
      f.on("blur", '#message-url input[name="message-url"]', function () {
        g.init.thank_you.url = a.trim(this.value)
      });
      f.on("click", "#guifbox-close, #message-back, #message-close", function () {
        var h = g.init.thank_you.checked;
        if(a("#guifbox #message").size() > 0 && h == "custom") {
          g.init.thank_you.message = tinyMCE.activeEditor.getContent()
        }
      });
      f.on("blur", "#formName", function (h) {
        guiform.title = a.trim(a(this).val())
      });
      f.keydown(function (l) {
        var o = a("#tab-fonts[aria-hidden=false]").size();
        var k = l.charCode || l.keyCode || 0;
        var m = document.activeElement.nodeName.toLowerCase() || c.focus;
        var j = ["input", "textarea", "select"];
        if(a(".ui-tabs").size() > 0) {
          if(m == "body" && o == 0 && a("#window-properties").size() == 0) {
            return false
          }
        }
        if(o > 0) {
          var i = a("#fonts-container li").index(a("#fonts-container li.active"));
          if(k == 38) {
            if(i == 0) {
              return false
            }
            a("#fonts-container ul").scrollTop(i * 27 - 164);
            a("#fonts-container li:eq(" + i + ")").removeClass("active");
            a("#fonts-container li:eq(" + (i - 1) + ")").addClass("active")
          }
          if(k == 40) {
            a("#fonts-container ul").scrollTop(i * 27 - 108);
            if(i >= a("#fonts-container li").size() - 1) {
              return false
            }
            a("#fonts-container li:eq(" + i + ")").removeClass("active");
            a("#fonts-container li:eq(" + (i + 1) + ")").addClass("active")
          }
          if(k == 13) {
            a("#guifbox").hide("slow");
            a("#fonts.menu-button").removeClass("on")
          }
          var h = a("#fonts-container li.active").attr("data-value").replace(/"/g, "'");
          var n = a("#guiform-style").text();
          n = n.split("font-family: ")[1].split(";")[0];
          a("#guiform-style").text(a("#guiform-style").text().replace(n, h))
        }
      }).keyup(function (m) {
        var k = m.charCode || m.keyCode || 0;
        a("#contextMenu").hide();
        var l = a(".ui-sortable li.ui-draggable.active");
        var n = document.activeElement.nodeName.toLowerCase() || c.focus;
        var j = ["input", "textarea", "select"];
        var o = a("#fonts-container").size();
        var h = a("#fonts-container ul").scrollTop();
        if(a(".ui-tabs").size() > 0) {
          if(n == "body" && o == 0 && a("#window-properties").size() == 0) {
            return false
          }
        }
        if(a.inArray(n, j) == -1 && o == 0) {
          if(k == 46) {
            g.remove()
          }
          else {
            if(m.ctrlKey == false && a(".ui-sortable .ui-draggable").size() > 0) {
              if(l.size() > 0) {
                var i = a(".ui-sortable .ui-draggable").index(l);
                if(k == 37 || k == 38) {
                  if(i == 0) {
                    return false
                  }
                  a(".ui-sortable .ui-draggable:eq(" + i + ")").removeClass("active");
                  a(".ui-sortable .ui-draggable:eq(" + (i - 1) + ")").addClass("active")
                }
                if(k == 39 || k == 40) {
                  if(i >= a(".ui-sortable .ui-draggable").size() - 1) {
                    return false
                  }
                  a(".ui-sortable .ui-draggable:eq(" + i + ")").removeClass("active");
                  a(".ui-sortable .ui-draggable:eq(" + (i + 1) + ")").addClass("active")
                }
                a(window).scrollTop(a(".ui-sortable li.ui-draggable.active").position().top + 40)
              }
              else {
                if(k >= 37 && k <= 40) {
                  a(".ui-sortable .ui-draggable:eq(0)").addClass("active")
                }
              }
              g.tabs_properties()
            }
          }
        }
      });
      f.on("click", "#fonts-container li", function () {
        a("#fonts-container li").removeClass("active");
        a(this).addClass("active");
        var i = a("#guiform-style").text();
        i = i.split("font-family: ")[1].split(";")[0];
        var h = a("#fonts-container li.active").attr("data-value");
        a("#guiform-style").text(a("#guiform-style").text().replace(i, h.replace(/"/g, "'")))
      });
      f.on("mousedown", ".ui-sortable .ui-draggable", function (h) {
        if(a(this).find(".merge-item").size() == 0) {
          a(".merge-item.active").removeClass("active")
        }
        if(h.ctrlKey) {
          a("#guifbox").remove();
          a(".merge-item.active").removeClass("active");
          a(".ui-sortable li.ui-draggable.active").removeClass("active").addClass("selected");
          if(a(this).hasClass("selected")) {
            a(this).removeClass("selected")
          }
          else {
            a(this).addClass("selected")
          }
        }
        else {
          a("#canvas li").removeClass("selected");
          a(".ui-sortable li.ui-draggable.active").removeClass("active");
          a(this).addClass("active")
        } if(a("#window-properties").size()) {
          g.tabs_properties();
          g.properties();
          g.get_properties()
        }
        g.checked()
      });
      f.on("dblclick", ".ui-sortable li.ui-draggable", function (h) {
        if(a(this).hasClass("selected") == false) {
          g.tabs_properties(0)
        }
      });
      f.on("click", ".edit-label", function () {
        var h = a(this).text();
        var i = a(this).parent().parent().attr("id");
        a(this).removeClass("edit-label");
        a(this).html("<input id='" + i + "' class='edit-label-input' value=''>");
        a(this).find("input").focus();
        a(this).find("input").val(h)
      });
      f.on("keydown", ".edit-label-input", function (i) {
        var h = i.charCode || i.keyCode || 0;
        if(h == 9) {
          return false
        }
      }).on("keyup", ".edit-label-input", function (k) {
        var l = this.id.split("-")[2];
        var j = (a(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? a(".ui-sortable .merge-item.active") : a(".ui-sortable li.ui-draggable.active");
        var i = (a("#item-" + l).find(".required").size() > 0) ? a.trim(this.value) + "<span class='required'>*</span>" : a.trim(this.value);
        a("#item-" + l).find(".label").html(i);
        if(l == j.attr("id").split("-")[1]) {
          var h = a("#tab-li-properties a");
          (a.trim(this.value) !== "") ? h.text(a.trim(this.value)) : h.html("&nbsp;")
        }
      }).on("blur", ".edit-label-input", function (h) {
        var i = a(this).val();
        a(this).parent().addClass("edit-label").html(i)
      });
      f.on("keyup", "#guiform-canvas", function (h) {
        a("#guiform-form").text(a(this).val())
      });
      f.on("click", ".caret", function () {
        c.caret = a(this).attr("name")
      });
      f.on("click", ".variable-fields li", function () {
        var h = a(this).attr("data-name");
        if(c.caret == "tinymce" || c.caret == "") {
          tinyMCE.execCommand("mceInsertContent", false, h)
        }
        else {
          a(".caret[name='" + c.caret + "']").atCaret("insert", h)
        }
        return false
      });
      var e = true;
      f.on("click", "#options-list .add", function () {
        var h = a("#options-list li").index(a(this).parent());
        var i = '<li class="selected" style="display:none;">											<input type="radio" name="checked"><input type="text" name="label" value="Text">											<input type="text" name="value" value="value">											<span data-icon="&#xe08c;" class="move"></span>											<span data-icon="&#xe004;" class="add"></span>											<span data-icon="&#xe093;" class="delete"></span>										</li>';
        a("#options-list li:eq(" + h + ")").after(i);
        a("#options-list .selected").slideDown("slow", function () {
          a(this).removeClass("selected")
        })
      }).on("click", "#options-list .delete", function () {
        if(e == true) {
          e = false;
          if(a("#options-list li").size() < 2) {
            e = true
          }
          if(a("#options-list li").size() > 1) {
            a(this).parent().slideUp("slow", function () {
              a(this).remove();
              e = true
            })
          }
        }
      }).on("click", "#bulk-options li", function () {
        var i = a.trim(a(this).text());
        var h = "";
        var j = g._form();
        if(j.hasClass("f_switch")) {
          a.each(c.Icons[i], function (l) {
            var k = a("<div>");
            k.append('<li>													<input type="radio" name="checked"><input type="text" name="label" value="">													<input type="text" name="value" value="' + l + '">													<span data-icon="&#xe08c;" class="move"></span>													<span data-icon="&#xe004;" class="add"></span>													<span data-icon="&#xe093;" class="delete"></span>												</li>');
            k.find("input[name='label']").attr("value", this);
            h += k.html()
          })
        }
        else {
          a.each(c.Options[i], function () {
            h += '<li>												<input type="radio" name="checked"><input type="text" name="label" value="' + this + '">												<input type="text" name="value" value="' + this + '">												<span data-icon="&#xe08c;" class="move"></span>												<span data-icon="&#xe004;" class="add"></span>												<span data-icon="&#xe093;" class="delete"></span>											</li>'
          })
        }
        a("#options-list").html(h)
      }).on("click", "#clear-options", function () {
        var h = '<li>											<input type="radio" name="checked"><input type="text" name="label" value="Text">											<input type="text" name="value" value="Value">											<span data-icon="&#xe08c;" class="move"></span>											<span data-icon="&#xe004;" class="add"></span>											<span data-icon="&#xe093;" class="delete"></span>										</li>';
        a("#options-list").html(h)
      }).on("click", "#save-options", function () {
        g.rebuild_options()
      });
      f.on("click", "#save-items", function () {
        var i = g._form();
        var h = "";
        if(i.hasClass("f_list")) {
          a("#items-list .items-list-li").each(function () {
            h += "<li>" + this.value + "</li>"
          });
          a("ul", i).html(h);
          alert("Save unordered list!")
        }
      });
      f.on("keydown", ".ui-spinner-input", function (i) {
        var h = i.charCode || i.keyCode || 0;
        if(i.shiftKey == true) {
          return false
        }
        return(h == 8 || h == 9 || h == 46 || (h >= 35 && h <= 40) || (h >= 48 && h <= 57) || (h >= 96 && h <= 105));
        i.preventDefault()
      }).on("cut copy paste", ".ui-spinner-input", function (h) {
        h.preventDefault()
      });
      var d = null;
      f.on("keyup change", "#preview-screen", function (h) {
        if(d == this.value) {
          return false
        }
        d = this.value;
        g.preview_screen(this.value)
      });
      g.checked()
    },
    _init: function () {
      this._event()
    },
    _form: function () {
      return(a(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? a(".ui-sortable .merge-item.active") : a(".ui-sortable li.ui-draggable.active")
    },
    _event: function () {
      var c = this.options;
      var e = this;
      var d = a(document);
      a("#header").on("click", "li", function (g) {
        var h = this.id;
        switch(h) {
        case "save":
          e.save();
          break;
        case "create":
          e.create();
          break;
        case "preview":
          e.preview();
          break;
        case "print":
          e.print();
          break;
        case "required":
          e.required(g, this);
          break;
        case "merge":
          e.merge(g, this);
          break;
        case "delete":
          e.remove();
          break;
        case "properties":
          var f = (a(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? a(".ui-sortable .merge-item.active") : a(".ui-sortable li.ui-draggable.active");
          (f.size() > 0) ? e.tabs_properties(0) : alert("Please select a form.");
          break;
        case "style":
          e.tabs_style(0);
          break;
        case "mail":
          e.tabs_mail(0);
          break;
        case "code":
          e.code();
          break;
        case "thank-you":
          e.submission_message();
          break;
        case "performance":
          e.performance();
          break;
        default:
        }
      });
      d.on("keyup keydown", "#p_placeholder", function (g) {
        var h = a.trim(a(this).val());
        var f = e._form();
        f.find("input[type='text'], textarea").attr("placeholder", h)
      });
      d.on("keyup keydown", "#p_short_description", function (h) {
        var i = a.trim(a(this).val());
        var g = e._form();
        g.find(".short-description").remove();
        var f = a.cleanTags(i, "span, b, strong, i, em, u, br, blockquote, a");
        f = "<p class='short-description'>" + f.html() + "</p>";
        g.find(".wrap").append(f)
      });
      d.on("click", ".p_validation", function (g) {
        var h = a.trim(a(this).val());
        var f = e._form();
        f.find("input[type='text']").attr("class", "validation[" + h + "]")
      });
      d.on("click", 'input[name="p_alignment"]', function (g) {
        var f = e._form();
        f.find(".wrap").css("text-align", this.value)
      });
      d.on("keyup keydown", "#p_text", function (h) {
        var g = e._form();
        var i = a.trim(this.value);
        (i !== "") ? a(".ui-tabs-nav a:eq(0)").text(i) : a(".ui-tabs-nav a:eq(0)").html("&nbsp;");
        var f = a.cleanTags(i, "span, em, u, blockquote, a, strong, i");
        g.find(":header").html(f.html())
      });
      d.on("keyup keydown", "#p_text_content", function (i) {
        var h = e._form();
        var j = a(this).val();
        var g = a.cleanTags(j, "span, b, strong, i, em, u, br, blockquote, a");
        var f = a.trim(g.html());
        (j !== "") ? a(".ui-tabs-nav a:eq(0)").text(j) : a(".ui-tabs-nav a:eq(0)").html("&nbsp;");
        h.find("p").remove();
        var k = "";
        a.each(f.split("\n\n"), function () {
          k += "<p>" + this + "</p>"
        });
        a(".wrap", h).append(k)
      });
      d.on("keyup keydown", "#p_sub_text", function (h) {
        var i = a.trim(a(this).val());
        var g = e._form();
        var f = a.cleanTags(i, "span, em, u, blockquote, a, strong, i");
        g.find(".sub-text").remove();
        g.find(".wrap").append("<div class='sub-text'>" + f.html() + "</div>")
      });
      d.on("change keyup", "#p_fonts", function (g) {
        var f = e._form();
        f.find(":header, p, li").css("font-family", a(this).val())
      });
      d.on("change keyup", "#p_list_type", function (g) {
        var f = e._form();
        f.find("ul").attr("class", this.value)
      });
      d.on("keyup keydown", "#p_text_label", function (h) {
        var g = e._form();
        var i = (g.find(".required").size() > 0) ? a.trim(this.value) + "<span class='required'>*</span>" : a.trim(this.value);
        (i !== "") ? a(".ui-tabs-nav a:eq(0)").text(i) : a(".ui-tabs-nav a:eq(0)").html("&nbsp;");
        var f = a.cleanTags(i, "span, strong, i, u, em, blockquote");
        g.find(".label").html(f.html())
      });
      d.on("click", ".p_alignment", function (g) {
        var f = e._form();
        if(a(this).val() == "top") {
          f.addClass("top-align");
          f.find(".label").css("text-align", "");
          f.filter(".shrink").find(".label").css("width", "")
        }
        else {
          f.removeClass("top-align");
          f.find(".label").css("text-align", a(this).val())
        }
      });
      d.on("keyup keydown", "#p_reset_text", function (h) {
        var g = e._form();
        var f = a.cleanTags(this.value, "span, strong, i, u");
        g.find("button[type='reset']").html(f.html())
      });
      d.on("keyup keydown", "#p_loading_text", function (h) {
        var g = e._form();
        var f = a.cleanTags(this.value, "span, strong, i, u");
        g.find("button[type='submit']").attr("data-loader", f.html())
      });
      d.on("keyup keydown", "#p_submit_text", function (h) {
        var g = e._form();
        var f = a.cleanTags(this.value, "span, strong, i, u");
        g.find("button[type='submit']").html(f.html())
      });
      d.on("click", ".p_submit_alignment", function (g) {
        var f = e._form();
        a("#p_submit_offset").slider("option", "value", 0);
        f.find(".f_submit_wrap span").css("margin-left", "");
        f.find(".f_submit_wrap").css("text-align", a(this).val());
        a(".p_submit_offset_value span").text("0px")
      });
      d.on("click", ".p_show_reset", function (h) {
        var g = e._form();
        var i = this.value;
        g.find(".f_submit_wrap span").css("margin-left", "");
        a("#p_submit_offset").slider("option", "value", 0);
        if(a(this).is(":checked")) {
          var f = a.trim(a("#p_reset_text").val());
          g.find('button[type="submit"]').before('<button name="reset" type="reset">' + (f == "" ? "Clear Form" : f) + "</button>")
        }
        else {
          g.find('button[type="reset"]').remove()
        }
        a(".p_submit_offset_value span").text("0px")
      });
      d.on("keyup", "#p_input_mask", function (g) {
        var f = e._form();
        var h = a.trim(this.value);
        f = f.find("input[type='text']");
        f.mask(h);
        f.attr("data-mask", h);
        if(h == "") {
          f.removeAttr("data-mask").unmask()
        }
      }).on("cut copy paste", "#p_input_mask", function (f) {
        f.preventDefault()
      });
      d.on("keyup keydown", "#p_file_extensions", function (g) {
        var f = e._form();
        if(f.hasClass("f_file")) {
          var f = f.find("input[type='file']");
          f.attr("file-accept", a.trim(this.value));
          if(this.value == "") {
            f.removeAttr("file-accept")
          }
        }
      });
      d.on("click", "#p_multiple_file", function (g) {
        var f = e._form();
        f = a('input[type="file"]', f);
        if(a(this).is(":checked")) {
          f.attr("multiple", "multiple");
          f.wrap('<div class="guif-dropzone"></div>');
          f.parents(".guif-dropzone").prepend("<span>Add File</span>");
          f.attr("name", f.attr("name") + "[]")
        }
        else {
          f.removeAttr("multiple");
          f.attr("name", f.attr("name").split("[")[0]);
          f.unwrap();
          f.parents(".wrap").find("span").remove()
        }
      });
      d.on("click", "#p_unique_value", function (g) {
        var f = e._form();
        (a(this).is(":checked")) ? a("input", f).attr("data-unique", "true") : a("input", f).attr("data-unique", "false")
      });
      d.on("spin", ".ui-spinner", function (f, h) {
        var g = (a.trim(h.value) == "") ? "" : a.trim(h.value);
        e.spinner(g, f.target.id)
      }).on("keyup", ".ui-spinner input", function (f) {
        var g = a.trim(this.value);
        e.spinner(g, f.target.id)
      })
    },
    performance: function () {
      var c = this.options;
      if(typeof (c.id) == "boolean") {
        a("<div>").guifbox({
          title: "message",
          status: "message",
          body: "<p>Build your form first.</p>"
        })
      }
      else {
        a("#window-preview").attr("href", "http://gtmetrix.com/?url=" + guiBuilder.preview_url + c.id).get(0).click()
      }
    },
    spinner: function (d, f) {
      var e = this;
      var c = e._form();
      if(f == "p_spinner_max") {
        c.find(".ui-spinner-input").attr("data-max", d);
        c.find(".ui-spinner-input").spinner("option", "max", d)
      }
      else {
        if(f == "p_label_width") {
          c.not(".shrink, .top-align").find(".label").css("width", d)
        }
        else {
          if(f == "p_spinner_min") {
            c.find(".ui-spinner-input").attr("data-min", d);
            c.find(".ui-spinner-input").spinner("option", "min", d)
          }
          else {
            if(f == "p_max_input") {
              c.find("input[type='text'], textarea").attr("maxlength", d)
            }
            else {
              if(f == "p_max_size") {
                c.find("input[type='file']").attr("file-maxsize", d)
              }
              else {
                if(f == "p_height") {
                  c.find("input[type='text'], textarea").css("height", d)
                }
                else {
                  if(f == "p_width") {
                    c.find("input[type='password'], input[type='text'], input[type='file'], textarea, select, .wrap").css("width", d)
                  }
                  else {
                    if(f == "p_columns") {
                      e.options_column(d)
                    }
                    else {
                      if(f == "p_options_label") {
                        c.find(".wrap span").css("width", d);
                        a("#p_width").val(c.find(".wrap").outerWidth());
                        c.find(".wrap").css("width", "auto")
                      }
                      else {
                        if(f == "p_font_size") {
                          c.find(":header, p, li").css("font-size", d + "px")
                        }
                        else {
                          if(f == "p_line_height") {
                            c.find("p, li").css("line-height", d + "px")
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    submission_message: function () {
      var d = this;
      var c = '<div id="message">	    							<ul class="list">	    								<li>	    									<label>	    										<input type="radio" name="message" value="defualt">	    										<span>Defualt thank you message</span>	    									</label>	    									<p class="description">After successful form submission, display default message.</p>	    								</li>	    								<li>	    									<label>	    										<input type="radio" name="message" value="redirect">	    										<span>Page redirect url</span>	    									</label>	    									<p class="description">After successful form submission, redirect to a custom url.</p>	    								</li>	    								<li>	    									<label>	    										<input type="radio" name="message" value="custom">	    										<span>Custom thank you message</span>	    									</label>	    									<p class="description">After successful form submission, display custom message.</p>	    								</li>	    							</ul>	    							<div id="message-url" style="display: none;">	    								<h3>Custom Page Url</h3>	    								<p class="description">After successful form submission, redirect to a custom url.</p>	    								<input value="' + d.init.thank_you.url + '" placeholder="ex: http://domain-name.com/thankyou" type="text" name="message-url">	    							</div>	    						  <table id="message-table" style="width: 800px; border: none; display: none; margin-bottom: 0px;"><tr>										<td style="padding: 0px; width: 285px; vertical-align: top; border: medium none;"><ul class="variable-fields" style="margin: 0 10px 0 0;"></ul></td>										<td style="padding: 0px; vertical-align: top; border: none;">											<textarea id="tinymce-message" name="content"></textarea>										</td>										</tr></table>	    						</div>';
      a("<div>").guifbox({
        title: "Thank you message!",
        status: "confirm",
        opacity: 0,
        body: c,
        width: 400,
        overlay: false,
        saveButton: false,
        cancelButton: false,
        confirmButton: false,
        closeButton: false,
        create: function () {
          var i = a(".ui-sortable .ui-draggable:not(.ui-sortable .merge):not(.ui-sortable .f_submit), .ui-sortable .merge-item");
          var g = "";
          var f = "<table id='field-list' width='850' cellpadding='5' cellspacing='5'>";
          var e = "</table>";
          var j = "";
          i.each(function () {
            if(a(".label", this).size() > 0) {
              var k = a.trim(a(this).find(".label").text().replace(/\*/gi, ""));
              g += "<li data-name='{" + a(this).attr("data-name") + "}'>" + k + "</li>";
              j += "<tr><td width='150'>" + k + "</td><td>{" + a(this).attr("data-name") + "}</td></tr>"
            }
          });
          g += '<li data-name="{entry_id}" title="Submission ID" style="-moz-user-select: none; cursor: default;">Submission ID</li>					<li data-name="{form_id}" title="Form ID">Form ID</li>					<li data-name="{form_title}" title="Form Title">Form Title</li>					<li data-name="{ip_address}" title="IP Address">IP Address</li>';
          a(".variable-fields").html(g);
          tinyMCE.init({
            plugins: "code,preview,layer,table,save,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,template,wordcount",
            toolbar: "code preview | undo redo cut copy paste fontselect fontsizeselect | table bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat subscript superscript",
            selector: "#tinymce-message",
            theme: "modern",
            menubar: false,
            height: a(document).height() - 440,
            resize: false,
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom"
          });
          a("#tinymce-message").val(d.init.thank_you.message);
          a('#message input[value="' + d.init.thank_you.checked + '"]').attr("checked", "checked");
          a("#guifbox-button").css("padding", "0");
          var h = '<button id="message-next">Next</button> <button id="message-close">Finish</button>';
          if(d.init.thank_you.checked == "redirect" || d.init.thank_you.checked == "custom") {
            a("#guifbox-button").html(h).css("padding", "10px")
          }
          else {
            a("#guifbox-button").html('<button id="message-close">Finish</button>').css("padding", "10px")
          }
        }
      })
    },
    options_column: function (f) {
      var h = this;
      var e = h._form();
      if(e.hasClass("f_radio") || e.hasClass("f_checkbox")) {
        e.find("br").remove();
        var g = parseInt(f);
        if(f == 1 || f == "" || f == 0) {
          e.find(".wrap label").after("<br>")
        }
        else {
          var c = parseInt(e.find(".wrap label").size() / g);
          for(var d = 0; d < c; d++) {
            e.find(".wrap label:eq(" + (g - 1) + ")").after("<br>");
            g += parseInt(f)
          }
        }
        e.find(".f_radio_wrap").removeAttr("class").addClass("f_radio_wrap wrap column[" + f + "]");
        e.find(".f_checkbox_wrap").removeAttr("class").addClass("f_checkbox_wrap wrap column[" + f + "]");
        if(f == "") {
          e.find(".f_radio_wrap, .f_checkbox_wrap").removeClass("column[]")
        }
      }
    },
    tabs_style: function (e) {
      var g = this;
      var f = g._form();
      var c = (f.size() > 0) ? '<li><a href="#tab-properties">' + f.find("label").text() + "</a></li>" : '<li style="display: none;"><a href="#tab-properties">Properties</a></li>';
      var d = '<div class="tabs" id="window-form_style">										<ul>											<li><a href="#tab-colors">Colors</a></li>											<li><a href="#tab-fonts">Fonts</a></li>											<li><a href="#tab-css">CSS Style</a></li>										</ul>										<div id="tab-colors"></div>										<div id="tab-fonts"></div>										<div id="tab-css"></div>									</div>';
      a("<div>").guifbox({
        title: "Form Style",
        status: "message",
        bgColor: "#FFFFFF",
        opacity: 0,
        body: d,
        overlay: false,
        maxScreen: false,
        saveButton: false,
        cancelButton: false,
        confirmButton: false
      });
      a(".tabs").tabs({
        create: function (h, i) {
          g.colors();
          a(".ui-tabs-anchor").blur()
        },
        activate: function (h, i) {
          active = a(this).tabs("option", "active");
          switch(active) {
          case 0:
            g.colors();
            break;
          case 1:
            g.fonts();
            break;
          case 2:
            g.css();
            break
          }
          a(".ui-tabs-anchor").blur()
        }
      });
      return false
    },
    tabs_properties: function (e) {
      var c = this;
      var l = this.options;
      var h = (e >= 0) ? false : true;
      e = e || 0;
      var d = c._form();
      var j = '<li id="tab-li-group"><a href="#tab-group">Group</a></li>';
      var i = (d.size() > 0) ? '<li id="tab-li-properties"><a href="#tab-properties">' + d.find(".label").text() + "</a></li>" : '<li style="display: none;"><a href="#tab-properties">Properties</a></li>';
      var k = '<li id="tab-li-options"><a href="#tab-options">Options</a></li>';
      var g = '<li id="tab-li-items"><a href="#tab-items">Items</a></li>';
      var f = '<div class="tabs" id="window-properties">										<ul>											' + i + "											" + k + "											" + j + "											" + g + '										</ul>										<div id="tab-properties"></div>										<div id="tab-options"></div>										<div id="tab-group"></div>										<div id="tab-items"></div>									</div>';
      if(h == false) {
        a("<div>").guifbox({
          title: "Properties",
          status: "message",
          bgColor: "#FFFFFF",
          opacity: 0,
          body: f,
          overlay: false,
          close: function () {
            a("#properties").removeClass("on")
          }
        })
      }
      else {
        if(a("#tab-li-properties").size() == 0) {
          var f = '<li id="tab-li-properties" class="ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="tab-properties" aria-labelledby="ui-id-7" aria-selected="true">												<a href="#tab-properties" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-7">Text Box</a>											</li>';
          a(".ui-tabs-nav").prepend(f)
        }
      }
      a(".tabs").tabs({
        selected: e,
        active: e,
        create: function (m, n) {
          switch(e) {
          case 0:
            c.properties();
            c.get_properties();
            break;
          case 1:
            c.tab_options();
            break;
          case 2:
            c.tab_groups();
            break;
          case 3:
            c.tab_items();
            break
          }
          if(d.hasClass("f_submit")) {
            a(".ui-tabs-nav a:eq(0)").text("Submit Button")
          }
          if(d.hasClass("f_list")) {
            a(".ui-tabs-nav a:eq(0)").text("List")
          }
        },
        activate: function (m, n) {
          active = a(this).tabs("option", "active");
          switch(active) {
          case 0:
            c.properties();
            c.get_properties();
            break;
          case 1:
            c.tab_options();
            break;
          case 2:
            c.tab_groups();
            break;
          case 3:
            c.tab_items();
            break
          }
          a(".ui-tabs-anchor").blur()
        }
      });
      (d.hasClass("f_list")) ? a("#tab-li-items").show() : a("#tab-li-items").hide();
      (d.hasClass("f_switch") || d.hasClass("f_select") || d.hasClass("f_checkbox") || d.hasClass("f_radio")) ? a("#tab-li-options").show() : a("#tab-li-options").hide();
      (a(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? a("#tab-li-group").show() : a("#tab-li-group").hide();
      (d.find(".label").text() !== "") ? a(".ui-tabs-nav a:eq(0)").text(d.find(".label").text()) : a(".ui-tabs-nav a:eq(0)").text(d.find(":header").text() || d.find("p").html());
      if(d.hasClass("f_submit")) {
        a(".ui-tabs-nav a:eq(0)").text("Submit Button")
      }
      c.checked();
      return false
    },
    tabs_mail: function (d) {
      var d = d;
      var e = this;
      var c = '<div class="tabs" id="window-email_settings">										<ul>											<li><a href="#tab-notification">Notification Email</a></li>										</ul>										<div id="tab-notification"><img style="display: block; margin: 110px auto auto;" src="' + guiBuilder.images + 'guif-loader.gif"></div>									</div>';
      a("<div>").guifbox({
        title: "Email Settings",
        status: "confirm",
        bgColor: "#FFFFFF",
        opacity: 0,
        cancelButton: true,
        closeButton: false,
        body: c,
        overlay: false,
        maxScreen: true,
        saveButton: true,
        fullScreen: function (g) {
          if(g == true) {
            var f = a(window).height() - 180;
            a("#tab-notification").css({
              "max-height": f,
              height: f
            })
          }
          else {
            a("#tab-notification").css({
              "max-height": "400px",
              height: "auto"
            })
          }
        },
        close: function () {
          a("#mail").removeClass("on");
          a(this).remove()
        },
        drag: function () {
          a(".mce-floatpanel").hide()
        },
        save: function () {
          if(d == 0) {
            e.init.notification.notify = a('#tab-notification input[name="notify"]').is(":checked") ? true : false;
            e.init.notification.subject = a.trim(a('#tab-notification input[name="subject"]').val());
            e.init.notification.sender = a.trim(a('#tab-notification select[name="sender"]').val());
            e.init.notification.mailto = a.trim(a('#tab-notification input[name="mailto"]').val());
            e.init.notification.message = tinyMCE.get("tinymce-notification").getContent();
            a(".tabs").tabs("destroy").tabs();
            a("#mail").removeClass("on");
            a(this).remove()
          }
        }
      });
      a(".tabs").tabs({
        selected: d,
        active: d,
        create: function (f, g) {
          e.notification()
        },
        activate: function (f, g) {
          active = a(this).tabs("option", "active");
          switch(active) {
          case 0:
            e.notification();
            break
          }
          a(".ui-tabs-anchor").blur()
        }
      });
      return false
    },
    get_properties: function () {
      var c = this;
      var d = c._form();
      (d.find(".required").size() > 0) ? a("#required").addClass("on") : a("#required").removeClass("on");
      if(d.hasClass("f_heading")) {
        var g = a.cleanTags(d.find(":header").html(), "span, em, u, blockquote, a, strong, i");
        var n = a.cleanTags(d.find(".sub-text").html(), "span, em, u, blockquote, a, strong, i");
        a("#p_text").val(g.html());
        a("#p_font_size").val(d.find(":header").css("font-size").replace("px", ""));
        a("#p_fonts").val(d.find(":header").css("font-family"));
        a("#p_sub_text").val(n.html());
        a("input[name='p_alignment'][value='" + d.find(".wrap").css("text-align") + "']").attr("checked", "checked")
      }
      if(d.hasClass("f_letter")) {
        var n = "";
        a.each(d.find("p"), function () {
          n += a(this).html() + "\n\n"
        });
        var h = a.cleanTags(n, "span, b, strong, i, em, u, br, blockquote, a");
        a("#p_text_content").val(h.html());
        a("#p_font_size").val(d.find("p").css("font-size").replace("px", ""));
        a("#p_line_height").val(d.find("p").css("line-height").replace("px", ""));
        a("#p_fonts").val(d.find("p").css("font-family"));
        a("input[name='p_alignment'][value='" + d.find(".wrap").css("text-align") + "']").attr("checked", "checked")
      }
      if(d.hasClass("f_list")) {
        a("#p_font_size").val(d.find("li").css("font-size").replace("px", ""));
        a("#p_fonts").val(d.find("li").css("font-family"));
        a("#p_line_height").val(d.find("li").css("line-height").replace("px", ""));
        a("#p_list_type").val(d.find("ul").attr("class"))
      }
      if(d.hasClass("f_text")) {
        a(".p_validation[value='" + d.find('input[type="text"]').attr("class").split("[")[1].split("]")[0] + "']").attr("checked", "checked");
        (a("input", d).attr("data-unique") == "true") ? a("#p_unique_value").attr("checked", "checked") : a("#p_unique_value").removeAttr("checked")
      }
      if(d.hasClass("f_text") || d.hasClass("f_phone")) {
        a("#p_input_mask").val(d.find('input[type="text"]').attr("data-mask"))
      }
      if(d.find(".short-description").size() > 0) {
        var h = a.cleanTags(d.find(".short-description").html(), "span, b, strong, i, em, u, br, blockquote, a");
        a("#p_short_description").val(h.html())
      }
      var l = a("<div />").append(d.find(".label").html());
      l.find(".required").remove();
      l = a.cleanTags(l, "span, strong, i, u, em, blockquote");
      a("#p_text_label").val(l.html());
      if(d.hasClass("f_textarea") || d.hasClass("f_text") || d.hasClass("f_email")) {
        a("#p_placeholder").attr("value", d.find("input[type='text'], textarea").attr("placeholder"));
        a("#p_max_input").attr("value", d.find("input[type='text'], textarea").attr("maxlength"))
      }
      if(d.hasClass("f_textarea")) {
        a("#p_height").attr("value", d.find("textarea").outerHeight())
      }
      a("#p_width").attr("value", d.find(".wrap").outerWidth());
      if(d.hasClass("f_radio") || d.hasClass("f_checkbox")) {
        var e = d.find(".f_radio_wrap, .f_checkbox_wrap").attr("class").split("[")[1];
        (e === b) ? a("#p_columns").val(1) : a("#p_columns").val(e.split("]")[0]);
        a("#p_options_label").val(d.find(".wrap label").innerWidth())
      }
      a(".p_alignment[value='" + d.find(".label").css("text-align") + "']").attr("checked", "checked");
      if(d.hasClass("top-align")) {
        a(".p_alignment[value='top']").attr("checked", "checked")
      }
      a("#p_label_width").val(d.find(".label").width());
      if(d.hasClass("shrink") || (d.hasClass("shrink") && d.hasClass("expand"))) {
        a("#p_label_width").attr("disabled", "disabled");
        a("#p_label_width").val("");
        a("#p_label_width").spinner("option", "disabled", true)
      }
      else {
        a("#p_label_width").removeAttr("disabled");
        a("#p_label_width").val(d.find(".label").width())
      } if(d.hasClass("f_spinner")) {
        var k = d.find(".ui-spinner-input").attr("data-max");
        var f = d.find(".ui-spinner-input").attr("data-min");
        a("#p_spinner_max").val(k);
        a("#p_spinner_min").val(f)
      }
      if(d.hasClass("f_file")) {
        a("#p_max_size").val(a("input", d).attr("file-maxsize"));
        a("#p_file_extensions").val(a("input", d).attr("file-accept"));
        (a("input", d).attr("multiple") == "multiple") ? a("#p_multiple_file").attr("checked", "checked") : a("#p_multiple_file").removeAttr("checked")
      }
      if(d.hasClass("f_submit")) {
        var j = a.cleanTags(d.find("button[type='submit']").html(), "span, strong, i, u");
        var i = a.cleanTags(d.find("button[type='reset']").html(), "span, strong, i, u");
        var m = a.cleanTags(d.find("button[type='submit']").attr("data-loader"), "span, strong, i, u");
        a("#p_submit_text").val(j.html());
        a("#p_reset_text").val(i.html());
        a("#p_loading_text").val(m.html());
        a(".p_submit_offset_value span").text(d.find(".f_submit_wrap span").css("margin-left")), a(".p_submit_alignment[value='" + d.find(".f_submit_wrap").css("text-align") + "']").attr("checked", "checked");
        if(d.find("button[type='reset']").size() > 0) {
          a(".p_show_reset[name='reset']").attr("checked", "checked")
        }
        a("#p_submit_offset").slider({
          range: "max",
          min: 0,
          value: d.find(".f_submit_wrap span").css("margin-left").replace("px", ""),
          max: d.width() - d.find(".f_submit_wrap span").width(),
          start: function (p, q) {
            var o = d.find(".f_submit_wrap span").width();
            d.find(".f_submit_wrap").css("text-align", "");
            a(".p_submit_alignment").removeAttr("checked");
            a(this).slider("option", "max", d.width() - o)
          },
          slide: function (o, p) {
            a(".p_submit_offset_value span").text(p.value + "px");
            d.find(".f_submit_wrap span").css("margin-left", p.value - 1)
          }
        })
      }
      a(".prop-value .switch").buttonset()
    },
    code: function () {
      var c = this;
      var k = this.options;
      if(k.id) {
        var i = guiBuilder.preview_url;
        var d = i + k.id;
        var g = i + "js/" + k.id + ((i.indexOf("?") == -1) ? "?view=text" : "&view=text");
        var j = 0;
        a("#canvas .ui-sortable li.ui-draggable").each(function () {
          j += a(this).outerHeight(true)
        });
        var e = "";
        a.ajax({
          url: d,
          dataType: "HTML",
          type: "POST",
          success: function (l) {
            l = l.replace(/\\/g, "");
            a("#code-source").text(a.trim(l))
          }
        });
        var h = "";
        a.ajax({
          url: g,
          dataType: "HTML",
          type: "POST",
          success: function (l) {
            l = l.replace(/\\/g, "");
            a("#code-javascript").text(a.trim(l))
          }
        });
        var f = '<div id="window-code">											<h2>Form preview link!</h2>											<p>This a direct link for your form preview.</p>											<input type="text" readonly="readonly" value="' + d + '">											<label><input id="ssl-link" type="checkbox">Secure form</label>											<div id="window-code-list">												<h3>Wordpress</h3>												<div>													<p><strong>Short Code</strong></p>													<input type="text" readonly="readonly" value="[GuiForm id=&quot;' + k.id + '&quot;]"> 													<br><br><p><strong>Php Code</strong></p>													<input type="text" readonly="readonly" value="&lt;?php do_shortcode(&quot;[GuiForm id=&#39;' + k.id + '&#39;]&quot;); ?&gt;">												</div>												<h3>EMBED</h3>												<div>													<textarea readonly="readonly"><script type="text/javascript" src="' + g + '"><\/script></textarea>												</div>												<h3>IFRAME</h3>												<div>													<textarea readonly="readonly"><iframe class="GuiFormIFrame" onload="window.parent.scrollTo(0,0)" allowtransparency="true" src="' + d + '" frameborder="0" style="width:100%; height: ' + j + 'px; border:none;" scrolling="no"></iframe></textarea>												</div>												<h3>Source Code</h3>												<div>													<pre><code><textarea style="height: 150px;" id="code-source" readonly="readonly">' + e + '</textarea></code></pre>												</div>												<h3>Javascript</h3>												<div>													<textarea style="height: 150px;" id="code-javascript" readonly="readonly">' + h + "</textarea>												</div>										</div>";
        a("<div>").guifbox({
          title: "Source Code",
          status: "message",
          opacity: 0,
          body: f,
          width: 400,
          overlay: false
        });
        a(function () {
          a("#window-code-list").accordion({
            heightStyle: "content"
          })
        });
        a("#ssl-link").click(function () {
          if(a(this).is(":checked")) {
            a("#window-code").find("textarea, input").each(function () {
              var l = a(this).val() || a(this).html();
              a(this).val(l.replace(/http/g, "https"))
            })
          }
          else {
            a("#window-code").find("textarea, input").each(function () {
              var l = a(this).val() || a(this).html();
              a(this).val(l.replace(/https/g, "http"))
            })
          }
        })
      }
      else {
        c.save("code")
      }
    },
    data: function () {
      var d = this.options;
      var f = this.init;
      guiform.id = d.id;
      guiform.database = d.database;
      guiform.title = a.trim(a("#formName").val());
      guiform.notification = {};
      guiform.notification.notify = f.notification.notify;
      guiform.notification.subject = f.notification.subject;
      guiform.notification.sender = f.notification.sender;
      guiform.notification.mailto = f.notification.mailto;
      guiform.notification.message = f.notification.message;
      guiform.autoresponse = {};
      guiform.autoresponse.response = "";
      guiform.autoresponse.subject = "";
      guiform.autoresponse.sender = "";
      guiform.autoresponse.mailto = "";
      guiform.autoresponse.message = "";
      guiform.thank_you = {};
      guiform.thank_you.checked = f.thank_you.checked;
      guiform.thank_you.url = f.thank_you.url;
      guiform.thank_you.message = f.thank_you.message;
      var c = {};
      a.each(guiform, function (g, h) {
        c[g] = h
      });
      var e = {
        action: "guiform_save_init",
        init: c,
        id: guiform.id
      };
      a.ajax({
        url: ajaxurl,
        data: e,
        dataType: "json",
        cache: false,
        async: false,
        type: "POST"
      })
    },
    save: function (g) {
      var l = this.options;
      var c = this;
      var g = g || false;
      var j = a(".ui-sortable .error").size() || 0;
      var e = a(".ui-sortable .ui-draggable:not(.ui-sortable .ui-draggable.merge), .ui-sortable .merge-item");
      var f = a("#container").html();
      a("#save").addClass("saving");
      if(e.size() == 0) {
        a("#save").removeClass("saving");
        a("<div>").guifbox({
          title: "message",
          status: "message",
          body: "<p>Build your form first.</p>"
        });
        return false
      }
      else {
        if(j > 0) {
          a("#save").removeClass("saving");
          a("<div>").guifbox({
            title: "error",
            status: "error",
            body: "<p>An error occurred please check your form...</p>"
          });
          return false
        }
        else {
          var h = {};
          var k = a.trim(a("#formName").val());
          var d = ["f_submit"];
          a("#canvas .switch").buttonset("destroy");
          a("#canvas .ui-spinner-input").spinner("destroy");
          var f = a("<div />").append(a("#container").clone());
          a(f).find(".ui-resizable-handle").remove();
          var i = a("<div />").append(a("#canvas").clone());
          a(i).find("#canvas").removeAttr("class").css({
            height: "",
            top: "",
            left: ""
          });
          a(i).find("input, select, textarea").removeAttr("data-type");
          a(i).find(".active").removeClass("active");
          a(i).find("#canvas").css("width", a(i).find("#canvas").width() - 30);
          a(i).find("li").removeClass("ui-draggable").removeAttr("data-name data-type");
          a(i).find(".ui-sortable").css("min-height", "").removeClass("ui-state-default ui-droppable ui-sortable");
          a(i).find(".ui-draggable").removeAttr("style data-name");
          a(i).find(".ui-resizable-handle").remove();
          a.each(e, function () {
            if(!a(this).hasClass("f_list") && !a(this).hasClass("f_submit") && !a(this).hasClass("f_heading") && !a(this).hasClass("f_letter")) {
              var o = a(this).attr("data-name");
              var q = this.className.match(/(\bf_)\S*/g);
              var n = a(".label", this).text().replace("*", "");
              var m = a(this).attr("data-type");
              var r = (a(".required", this).size() > 0) ? true : false;
              h[this.id] = {
                name: o,
                type: q[0],
                label: n,
                properties: {
                  dataType: m
                },
                validation: {
                  required: r
                }
              };
              if(q == "f_email") {
                h[this.id].validation.text = a("input", this).attr("class").split("[")[1].split("]")[0];
                h[this.id].validation.unique = true
              }
              else {
                if(q == "f_text") {
                  var p = a("input", this).attr("maxlength");
                  h[this.id].validation.text = a("input", this).attr("class").split("[")[1].split("]")[0];
                  h[this.id].validation.maxlength = (p === b || p <= 0) ? false : parseInt(p);
                  h[this.id].validation.unique = (a("input", this).attr("data-unique") == "true") ? true : false
                }
                else {
                  if(q == "f_file") {
                    h[this.id].validation.extension = a.map(a("input", this).attr("file-accept").split(","), function (s) {
                      return a.trim(s)
                    });
                    h[this.id].validation.maxsize = a("input", this).attr("file-maxsize");
                    h[this.id].properties.multiple = a("input", this).hasAttr("multiple") ? true : false
                  }
                }
              }
            }
          });
          var h = {
            action: "guiform_save_form",
            title: k,
            data: h,
            canvas: encodeURIComponent(f.html()),
            html: encodeURIComponent(i.html()),
            id: l.id
          };
          a.ajax({
            url: ajaxurl,
            data: h,
            dataType: "JSON",
            cache: false,
            async: true,
            type: "POST",
            beforeSend: function () {
              a("#canvas .switch").buttonset();
              a("#canvas .ui-spinner").each(function () {
                var m = a(this).attr("data-max");
                var n = a(this).attr("data-min");
                a(this).spinner({
                  max: m,
                  min: n
                })
              })
            },
            success: function (p) {
              l.id = p.id;
              c.data();
              a("#save").removeClass("saving");
              if(p.status == "error") {
                a("<div>").guifbox({
                  title: p.status,
                  status: p.status,
                  body: "<p>" + p.message + "</p>"
                })
              }
              else {
                if(g == "preview") {
                  var o = a("#containment").innerWidth();
                  var m = a("body").height() - 80;
                  l.screenPreview = o;
                  var n = ajaxurl + "?action=guiform_form_preview&height=" + m + "&width=" + o + "&id=" + p.id;
                  a("#guifbox").remove();
                  a("#window-preview").attr("href", guiBuilder.preview_url + p.id).trigger("click");
                  a("#thickbox-preview").attr("href", n).trigger("click")
                }
                else {
                  if(g == "code") {
                    c.code()
                  }
                  else {
                    if(g == "autosave") {
                      return false
                    }
                    else {
                      a("<div>").guifbox({
                        title: "message",
                        status: "message",
                        body: "<p>" + p.message + "</p>"
                      })
                    }
                  }
                }
              }
            }
          })
        }
      }
    },
    create: function () {
      location.href = location.href.split("&")[0]
    },
    preview_screen: function (d) {
      var c = [this.options.screenPreview, 240, 320, 480];
      var e = c[d] / 2;
      if(d == 0) {
        a("#TB_window iframe").contents().find("#responsive-style").remove()
      }
      else {
        if(d > 0 && d < 4) {
          a("#TB_window iframe").contents().find("#responsive-style, .error-message").remove();
          a("#TB_window iframe").contents().find("head").append('<link id="responsive-style" media="all" type="text/css" href="' + guiBuilder.plugins_url + 'css/responsive.css" rel="stylesheet">')
        }
        else {
          a("#window-preview").get(0).click()
        }
      }
      a("#TB_window").animate({
        marginLeft: -e,
        width: c[d]
      }, 400)
    },
    preview: function () {
      if(a("#ui-sortable .ui-draggable").size() > 0) {
        alert("Create your form first.")
      }
      else {
        this.save("preview")
      }
    },
    merge: function (e, f) {
      var d = this;
      if(a("#canvas .ui-draggable.selected").size() < 2) {
        a("<div>").guifbox({
          title: "message",
          status: "message",
          body: "<p>Select atleast two item by holding down CTRL + Left Click to the field.</p>"
        })
      }
      else {
        var c = a("<div />");
        a("#canvas .selected:not(#canvas .merge), #canvas .selected .merge-item").each(function () {
          a(".switch", a(this)).buttonset("destroy");
          a(".ui-spinner-input", a(this)).spinner("destroy");
          a(this).removeClass("merge-item");
          var j = a(this).attr("class");
          var i = a(this).attr("id");
          var g = a(this).attr("data-name");
          var h = a(this).attr("data-type");
          a(c).append("<div id='" + i + "' data-type='" + h + "' data-name='" + g + "' class='merge-item " + j + "'>" + a(this).html() + "</div>")
        });
        a(c).find(".selected").removeClass("selected ui-draggable");
        a("#canvas .selected:eq(0)").attr("id", "item-merge-" + String(Math.random()).substring(2, 8));
        a("#canvas .selected:eq(0)").removeClassRegEx(/^f_/).removeAttr("data-name");
        a("#canvas .selected:eq(0)").removeClass("shrink");
        a("#canvas .selected:eq(0)").html(c.html()).removeClass("selected").addClass("active merge");
        a("#canvas .active.merge").find(".merge-item:eq(0)").addClass("active");
        a("#canvas .active.merge").find(".switch").each(function () {
          a(this).buttonset()
        });
        a("#canvas .active.merge").find(".ui-spinner").each(function () {
          var g = a(this).attr("data-max");
          var h = a(this).attr("data-min");
          a(this).spinner({
            max: g,
            min: h
          })
        });
        a("#canvas .active.merge").find(".f_phone").each(function () {
          var g = a(this).find("input").attr("data-mask");
          a(this).find("input").mask(g)
        });
        a("#canvas .selected").remove();
        d.tabs_properties()
      }
      d.checked()
    },
    remove: function (f, e) {
      var d;
      var j = this;
      f = (f == false) ? false : true;
      var h = a(".ui-sortable li.ui-draggable.active");
      var g = a(".ui-sortable .ui-draggable.merge.active");
      if(e !== b) {
        d = e;
        h = (h.find(".merge-item.active").size() > 0) ? a(".ui-sortable li.ui-draggable.active .merge-item.active") : a(".ui-sortable li.ui-draggable.active");
        h.removeClass("active")
      }
      else {
        if(h.hasClass("merge")) {
          d = (h.find(".merge-item.active").size() > 0) ? a(".ui-sortable li.ui-draggable.active .merge-item.active") : a(".ui-sortable li.ui-draggable.active")
        }
        else {
          d = a("#canvas .ui-draggable.active")
        }
      }
      var c = (h.hasClass("merge")) ? a(".ui-sortable .ui-draggable.merge.active").index(d) : a(".ui-sortable .ui-draggable").index(d);
      if(a(".ui-sortable li.ui-draggable.active").hasClass("merge")) {
        var i = a(".ui-sortable .merge.active .merge-item").size() - 1
      }
      else {
        var i = a(".ui-sortable .ui-draggable").size() - 1
      } if(d.size() > 0) {
        d.addClass("removed-item");
        d.slideUp(800, function () {
          if(a(".ui-sortable li.ui-draggable.active").hasClass("merge") && a(this).parent().find(".item").size() == 1) {
            a(this).parent().remove()
          }
          a(this).remove();
          if(a(".ui-sortable li.ui-draggable.active").hasClass("merge")) {
            if(c < i) {
              a(".ui-sortable .merge.active .merge-item:eq(" + c + ")").addClass("active")
            }
            else {
              if(i == 0) {
                a(".ui-sortable .merge.active").remove();
                a(".ui-sortable .ui-draggable:eq(" + c + ")").addClass("active");
                if(a(".ui-sortable li.ui-draggable.active").hasClass("merge")) {
                  a(".ui-sortable .merge.active .merge-item:eq(0)").addClass("active")
                }
              }
            }
          }
          else {
            if(c < i) {
              a(".ui-sortable .ui-draggable:eq(" + c + ")").addClass("active")
            }
            else {
              a(".ui-sortable .ui-draggable:eq(0)").addClass("active")
            } if(a(".ui-sortable li.ui-draggable.active").hasClass("merge")) {
              a(".ui-sortable .merge.active .merge-item:eq(0)").addClass("active")
            }
          } if(a("#window-properties").size() !== 0) {
            if(a(".ui-sortable li").size() == 0) {
              a("#guifbox").remove()
            }
            else {
              if(f) {
                j.tabs_properties()
              }
            }
          }
          if(f && a("#canvas .item").size() > 0) {
            j.properties();
            j.get_properties()
          }
          j.checked()
        })
      }
      return false
    },
    required: function (d, e) {
      var f = this;
      var c = f._form();
      if(c.size() > 0 && c.hasClass("f_submit") == false) {
        if(a(e).hasClass("on")) {
          c.find(".required").remove();
          a(e).removeClass("on")
        }
        else {
          c.find(".label").append("<span class='required'>*</span>");
          a(e).addClass("on")
        }
      }
    },
    color_picker: function () {
      var e = a("#guiform-style").text().replace(/\s\s+/g, "");
      var c = e.split("background-color:")[1].split(";")[0];
      var d = e.split(".label{color:")[1].split(";")[0];
      var f = e.split("border:")[1].split(";")[0].split(" ")[3];
      a(".basic").guifcolor({
        showInput: true,
        className: "colorpicker",
        appendTo: "parent",
        chooseText: "Ok",
        showInitial: true,
        preferredFormat: "hex6",
        beforeShow: function (g) {
          var h = this.id;
          if(h == "color") {
            a(this).guifcolor("set", d)
          }
          if(h == "borderColor") {
            a(this).guifcolor("set", f)
          }
          if(h == "backgroundColor") {
            a(this).guifcolor("set", c)
          }
          a(".guif-cancel, #transparent-wrapper").remove();
          if(h == "backgroundColor") {
            a(".guif-button-container").append('<span id="transparent-wrapper"><input type="checkbox" class="transparent" name=""><label>Transparent</label></span>')
          }
        },
        show: function (g) {
          var h = a("#guiform-style").text().split("background-color: ")[1].split(";")[0];
          if(h == "transparent" || h == "rgba(0, 0, 0, 0)") {
            a(".transparent").attr("checked", "checked")
          }
          else {
            a(".transparent").removeAttr("checked")
          }
          a(".transparent").click(function () {
            var j = a("#guiform-style").text().replace(/\s\s+/g, "");
            var i = j.split("background-color: ")[1].split(";")[0];
            if(a(this).is(":checked")) {
              a("#guiform-style").text(a("#guiform-style").text().replace(i, "transparent"));
              a(".guif-active .guif-preview-inner").css("background-color", "transparent");
              a(".guif-input").val("transparent")
            }
            else {
              a("#guiform-style").text(a("#guiform-style").text().replace(i, "#FFFFFF"));
              a(".guif-active .guif-preview-inner").css("background-color", "#FFFFFF");
              a(".guif-input").val("#FFFFFF");
              a(".guif-dragger").css({
                top: 0,
                left: 0
              })
            }
          });
          a(".guif-choose").click(function () {
            a("#header .wrapper").remove();
            a(".menu-button").parent().removeClass("active")
          })
        },
        move: function (h) {
          var l = this.id;
          var j = a("#guiform-style").text().replace(/\s\s+/g, "");
          a(".transparent").removeAttr("checked");
          if(l == "color") {
            var i = j.split(".label{color: ")[1].split(";")[0];
            a("#guiform-style").text(a("#guiform-style").text().replace(i, h.toHexString()))
          }
          else {
            if(l == "backgroundColor") {
              var g = j.split("background-color: ")[1].split(";")[0];
              a("#guiform-style").text(a("#guiform-style").text().replace(g, h.toHexString()))
            }
            else {
              if(l == "borderColor") {
                var k = j.split("border: ")[1].split(";")[0].split(" ")[2];
                a("#guiform-style").text(a("#guiform-style").text().replace(k, h.toHexString()))
              }
            }
          }
        }
      })
    },
    colors: function (e, f) {
      a("#header li").removeClass("on");
      a("#header #colors").addClass("on");
      var h = a("#guiform-style").text().replace(/\s\s+/g, "");
      var c = h.split("background-color:")[1].split(";")[0];
      var g = h.split(".label{color:")[1].split(";")[0];
      var i = h.split("border:")[1].split(";")[0].split(" ")[3];
      var d = "<table style='width: 285px;' cellspacing='0' cellpadding='4'>										<tbody>											<tr>												<td class='prop-label' style='width: 75%; font-weight: normal;'>Background Color</td>												<td class='prop-value' align='center'><input type='text' id='backgroundColor' class='basic' value='" + c + "' /></td>											</tr>											<tr>												<td class='prop-label' style='font-weight: normal;'>Label Color</td>												<td class='prop-value' align='center'><input type='text' id='color' class='basic' value='" + g + "' /></td>											</tr>											<tr>												<td class='prop-label' style='font-weight: normal;'>Border Color</td>												<td class='prop-value' align='center'><input type='text' id='borderColor' class='basic' value='" + i + "' /></td>											</tr>										</tbody>									</table>";
      a(".tabs #tab-colors").html(d);
      this.color_picker();
      this.checked()
    },
    fonts: function (e, f) {
      a("#header li").removeClass("on");
      a("#header #fonts").addClass("on");
      var c = a("#guiform-style").text();
      c = c.split("font-family: ")[1].split(";")[0];
      var d = "<div id='fonts-container' class='wrapper'><ul class='list'>";
      a.each(a.guiform.Fonts, function (g, h) {
        if(c.split(",")[0].replace(/['", ]/g, "") == h.split(",")[0].replace(/['", ]/g, "")) {
          d += "<li class='list active' style='font-family: " + h + ";' data-value='" + h + "'>" + g + "</li>"
        }
        else {
          d += "<li class='list' style='font-family: " + h + ";' data-value='" + h + "'>" + g + "</li>"
        }
      });
      d += "</ul></div>";
      a(".tabs #tab-fonts").html(d);
      this.checked()
    },
    font_property: function () {
      var e = this._form();
      var d = "<select name='' id='p_fonts'>";
      var c = e.find(":header, p, li").css("font-family");
      a.each(a.guiform.Fonts, function (f, g) {
        if(c.replace(/'/g, "") == f.replace(/'/g, "")) {
          d += "<option selected='selected' style='font-family: " + g + ";' data-value='" + g + "'>" + f + "</option>"
        }
        else {
          d += "<option style='font-family: " + g + ";' data-value='" + g + "'>" + f + "</option>"
        }
      });
      d += "</select>";
      return d
    },
    css: function (d, e) {
      var c = "<div><p>Start your CSS code with <strong>#canvas</strong> selector.</p><textarea id='guiform-canvas'></textarea></div>";
      a(".tabs #tab-css").html(c);
      a(this.element[0]).addClass("guiEditable").attr("contenteditable", true).css({});
      if(a("#guiform-form").size() == 0) {
        a("<style type='text/css' id='guiform-form' media='all'></style>").insertAfter("#guiform-style")
      }
      else {
        a("#guiform-canvas").val(a("#guiform-form").text())
      }
      this.checked()
    },
    properties: function (e, f) {
      var c;
      var g = this;
      var d = g._form();
      if(d.hasClass("f_switch") || d.hasClass("f_select") || d.hasClass("f_checkbox") || d.hasClass("f_radio")) {
        a("#tab-li-options").show()
      }
      else {
        a("#tab-li-options").hide()
      } if(a(".ui-sortable li.ui-draggable.active").hasClass("merge")) {
        a("#tab-li-group").show()
      }
      else {
        a("#tab-li-group").hide()
      } if(d.hasClass("f_heading")) {
        c = ["Text", "Sub Text", "Text Alignment", "Font Family", "Font Size"]
      }
      else {
        if(d.hasClass("f_letter")) {
          c = ["Text Content", "Width", "Text Alignment", "Font Family", "Font Size", "Line Height"]
        }
        else {
          if(d.hasClass("f_list")) {
            c = ["Width", "List Type", "Font Family", "Font Size", "Line Height"]
          }
          else {
            if(d.hasClass("f_text")) {
              c = ["Label", "Input Mask", "Unique Value", "Label Width", "Placeholder", "Short Description", "Validation", "Width", "Maximum Input"]
            }
            else {
              if(d.hasClass("f_textarea")) {
                c = ["Label", "Label Width", "Placeholder", "Short Description", "Height", "Width"]
              }
              else {
                if(d.hasClass("f_select")) {
                  c = ["Label", "Label Width", "Short Description", "Width"]
                }
                else {
                  if(d.hasClass("f_radio") || d.hasClass("f_checkbox")) {
                    c = ["Label", "Label Width", "Option Columns", "Width", "Options Text Width"]
                  }
                  else {
                    if(d.hasClass("f_submit")) {
                      c = ["Submit Text", "Reset Text", "Loading Text", "Submit Alignment", "Show Reset Button", "Offset"]
                    }
                    else {
                      if(d.hasClass("f_file")) {
                        c = ["Label", "Label Width", "Short Description", "Width", "Allow Multiple Upload", "File Extentions", "Max File Size"]
                      }
                      else {
                        if(d.hasClass("f_password")) {
                          c = ["Label", "Label Width", "Short Description", "Width"]
                        }
                        else {
                          if(d.hasClass("f_phone")) {
                            c = ["Label", "Input Mask", "Label Width", "Short Description", "Width"]
                          }
                          else {
                            if(d.hasClass("f_email")) {
                              c = ["Label", "Label Width", "Placeholder", "Short Description", "Width", "Maximum Input"]
                            }
                            else {
                              if(d.hasClass("f_spinner")) {
                                c = ["Label", "Label Width", "Short Description", "Maximum Value", "Minimum Value", "Width"]
                              }
                              else {
                                if(d.hasClass("f_switch")) {
                                  c = ["Label", "Label Width", "Short Description", "Width"]
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.buildProperties(c);
      this.checked()
    },
    tab_groups: function () {
      var f = this;
      var e = a(".ui-sortable .merge.active");
      var d = "";
      e.find(".merge-item").each(function () {
        var h = this.id;
        var g = "";
        if(a(this).find(".label").size() > 0) {
          g = a(this).find(".label").text()
        }
        else {
          if(a(this).hasClass("f_list")) {
            g = "List"
          }
          else {
            if(a(this).hasClass("f_submit")) {
              g = "Submit Butto"
            }
            else {
              if(a(this).hasClass("f_heading")) {
                g = "Header"
              }
              else {
                if(a(this).hasClass("f_letter")) {
                  g = "Letter"
                }
              }
            }
          }
        }
        d += "<li id='li-" + h.split("-")[1] + "' class='clearfix'>				          <span class='label'>" + g + "</span>									<span data-icon='&#xe08c;' class='move'></span>									<span data-icon='&#xe093;' class='delete'></span>								 </li>"
      });
      a("#tab-group").html("<ul id='group-list'>" + d + "</ul>");
      var c;
      a("#group-list").sortable({
        axis: "y",
        forcePlaceholderSize: true,
        forceHelperSize: true,
        opacity: 0.9,
        scroll: true,
        handle: ".move",
        scrollSensitivity: 5,
        scrollSpeed: 5,
        placeholder: "ui-state-highlight",
        revert: true,
        tolerance: "pointer",
        beforeStop: function (g, k) {
          c = a(k.helper).index();
          var i = a(".ui-sortable .merge.active");
          var h = "item-" + a(k.item).attr("id").split("-")[1];
          if(a("#" + h).hasClass("f_spinner")) {
            a("#" + h).find(".ui-spinner-input").spinner("destroy")
          }
          if(a("#" + h).hasClass("f_switch")) {
            a("#" + h).find(".switch").buttonset("destroy")
          }
          var m = i.find("#" + h).clone();
          var o = a("#group-list li").size();
          i.find("#" + h).remove();
          (c == (o - 2)) ? i.append(m) : a("div.merge-item:eq(" + c + ")", i).before(m);
          if(a("#" + h).hasClass("f_spinner")) {
            var l = a("#" + h).find(".ui-spinner").attr("data-max");
            var j = a("#" + h).find(".ui-spinner").attr("data-min");
            a("#" + h).find(".ui-spinner").spinner({
              max: l,
              min: j
            })
          }
          if(a("#" + h).hasClass("f_switch")) {
            a("#" + h).find(".switch").buttonset()
          }
          if(a("#" + h).hasClass("f_phone")) {
            var n = a("#" + h).find("input").attr("data-mask");
            a("#" + h).find("input").mask(n)
          }
        }
      });
      a(document).on("click", "#group-list .delete", function () {
        var g = a(this).parent();
        g.slideUp("slow", function () {
          a(this).remove()
        });
        a(".merge-item:eq(" + g.index() + ")", e).hide("slow", function () {
          a(this).remove();
          if(a(".merge-item", e).size() == 0) {
            f.remove(true)
          }
        })
      });
      this.checked()
    },
    tab_items: function () {
      var g = this;
      var e = g._form();
      var c = "";
      e.find("li").each(function () {
        var h = this.innerHTML;
        c += "<li class='clearfix'>				          <span class='label'><input class='items-list-li' type='text' value='" + h + "'></span>									<span data-icon='&#xe08c;' class='move'></span>									<span data-icon='&#xe004;' class='add'></span>									<span data-icon='&#xe093;' class='delete'></span>								 </li>"
      });
      c += '<div style="text-align: right; margin-bottom: 10px;">								<a onclick="return false;" href="javascript:void(0);" class="button-primary" id="save-items">Save</a>							</div>';
      a("#tab-items").html("<ul id='items-list'>" + c + "</ul>");
      var d;
      var f;
      a("#items-list").sortable({
        axis: "y",
        forcePlaceholderSize: true,
        forceHelperSize: true,
        opacity: 0.9,
        scroll: true,
        handle: ".move",
        scrollSensitivity: 5,
        scrollSpeed: 5,
        placeholder: "ui-state-highlight",
        revert: true,
        tolerance: "pointer"
      });
      a(document).on("click", "#items-list .delete", function () {
        var h = a(this).parent();
        h.slideUp("slow", function () {
          a(this).remove()
        })
      }).on("click", "#items-list .add", function () {
        var h = a("#items-list li").index(a(this).parent());
        var i = "<li class='clearfix'>					          <span class='label'><input class='items-list-li' type='text' value='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'></span>										<span data-icon='&#xe08c;' class='move'></span>										<span data-icon='&#xe004;' class='add'></span>										<span data-icon='&#xe093;' class='delete'></span>									 </li>";
        a("#items-list li:eq(" + h + ")").after(i);
        a("#items-list .selected").slideDown("slow", function () {
          a(this).removeClass("selected")
        })
      });
      this.checked()
    },
    tab_options: function () {
      var h = this;
      var f = h._form();
      var e = "";
      if(f.hasClass("f_select")) {
        f.find("select option").each(function () {
          var j = a(this).attr("value");
          var k = a(this).html();
          var i = (a(this).is(":selected")) ? '<input checked="checked" type="radio" name="checked">' : '<input type="radio" name="checked">';
          if(j == k) {
            e += "<li>" + i + '<input type="text" name="label" value="' + j + '">												<input type="text" name="value" value="' + j + '">												<span data-icon="&#xe08c;" class="move"></span>											  <span data-icon="&#xe004;" class="add"></span>											  <span data-icon="&#xe093;" class="delete"></span>											</li>'
          }
          else {
            e += "<li>" + i + '<input type="text" name="label" value="' + k + '">												<input type="text" name="value" value="' + j + '">												<span data-icon="&#xe08c;" class="move"></span>											  <span data-icon="&#xe004;" class="add"></span>											  <span data-icon="&#xe093;" class="delete"></span>											</li>'
          }
        })
      }
      if(f.hasClass("f_switch")) {
        a("input", f).each(function () {
          var k = a("<div>");
          var j = a(this).val();
          var l = a(this).parent().find("label[for='" + a(this).attr("id") + "'] .ui-button-text").html();
          var i = (a(this).is(":checked")) ? '<input checked="checked" type="radio" name="checked">' : '<input type="radio" name="checked">';
          if(j == l) {
            k.append("<li>" + i + '<input type="text" name="label" value="">														<input type="text" name="value" value="' + j + '">														<span data-icon="&#xe08c;" class="move"></span>											      <span data-icon="&#xe004;" class="add"></span>											      <span data-icon="&#xe093;" class="delete"></span>													 </li>')
          }
          else {
            k.append("<li>" + i + '<input type="text" name="label" value="">													<input type="text" name="value" value="' + j + '">													<span data-icon="&#xe08c;" class="move"></span>										      <span data-icon="&#xe004;" class="add"></span>										      <span data-icon="&#xe093;" class="delete"></span>											 	</li>')
          }
          k.find("input[name='label']").attr("value", l);
          e += k.html()
        })
      }
      if(f.hasClass("f_radio") || f.hasClass("f_checkbox")) {
        var d = "";
        a.each(a(".wrap label", f), function () {
          var j = a("input", this).val();
          var k = a("span", this).text();
          var i = (a(this).find("input").is(":checked")) ? '<input checked="checked" type="radio" name="checked">' : '<input type="radio" name="checked">';
          if(j == k) {
            e += "<li>" + i + '<input type="text" name="label" value="' + j + '">												<input type="text" name="value" value="' + j + '">												<span data-icon="&#xe08c;" class="move"></span>											  <span data-icon="&#xe004;" class="add"></span>											  <span data-icon="&#xe093;" class="delete"></span>											</li>'
          }
          else {
            e += "<li>" + i + '<input type="text" name="label" value="' + k + '">												<input type="text" name="value" value="' + j + '">												<span data-icon="&#xe08c;" class="move"></span>											  <span data-icon="&#xe004;" class="add"></span>											  <span data-icon="&#xe093;" class="delete"></span>											</li>'
          }
        })
      }
      var c = '<ul id="visual-text"><li class="active">Visual</li></ul>';
      c += '<table style="width: 680px;" cellspacing="0" cellpadding="4">		  				 <thead><tr>									<th style="width: 160px;">Extra Options</th>									<th style="width: 190px;">Label</th>									<th style="border-right: medium none;">Value</th>									<th style=""></th>							 </tr></thead>';
      c += '<tr><td style="padding: 0px;"><ul id="bulk-options">';
      var g = f.hasClass("f_switch") ? this.options.Icons : this.options.Options;
      a.each(g, function (i, j) {
        c += "<li>" + i + "</li>"
      });
      c += '</ul></td><td colspan="3" style="vertical-align: top;padding: 0px;">								 <ul id="options-list">' + e + "</ul>							 </td></tr></table>";
      c += '<div style="text-align: right; margin-bottom: 10px;">								<a onclick="return false;" href="javascript:void(0);" class="button-primary" id="clear-options">Clear Options</a>								<a onclick="return false;" href="javascript:void(0);" class="button-primary" id="save-options">Save</a>							</div>';
      a("#tab-options").html(c);
      a("#options-list").sortable({
        axis: "y",
        forcePlaceholderSize: true,
        forceHelperSize: true,
        opacity: 0.9,
        scroll: true,
        handle: ".move",
        scrollSensitivity: 5,
        scrollSpeed: 5,
        placeholder: "ui-state-highlight",
        revert: true,
        tolerance: "pointer"
      });
      this.checked()
    },
    rebuild_options: function () {
      var e = this;
      var d = e._form();
      e.build_options();
      if(d.hasClass("f_radio") || d.hasClass("f_checkbox")) {
        var c = d.find(".f_radio_wrap, .f_checkbox_wrap").attr("class").split("[")[1];
        c = (c === b) ? 1 : c.split("]")[0];
        e.options_column(c)
      }
    },
    build_options: function () {
      var e = "";
      var d = this.options;
      var h = this;
      var f = h._form();
      var c = a(".ui-sortable li.ui-draggable.active").attr("data-name");
      var g = a("select, input", f).attr("data-type");
      a("#options-list li").each(function () {
        var i = a.trim(a('input[name="label"]', this).val());
        var k = a('input[name="value"]', this).val();
        var j = a('input[name="checked"]', this).is(":checked");
        k = a.trim(k.replace(/<\/?[^>]+(>|$)/g, ""));
        j = (j) ? 'checked="checked"' : "";
        if(f.hasClass("f_select")) {
          j = (j) ? 'selected="selected"' : "";
          e += "<option " + j + " value='" + k + "'>" + i + "</option>";
          f.find("select").html(e)
        }
        if(f.hasClass("f_radio")) {
          e += "<label><input " + j + " data-type='" + g + "' name='" + c + "' type='radio' value='" + k + "'><span>" + i + "</span></label>";
          f.find(".f_radio_wrap").html(e)
        }
        if(f.hasClass("f_checkbox")) {
          e += "<label><input " + j + " data-type='" + g + "' name='" + c + "[]' type='checkbox' value='" + k + "'><span>" + i + "</span></label>";
          f.find(".f_checkbox_wrap").html(e)
        }
        if(f.hasClass("f_switch")) {
          var l = "switch-" + String(Math.random()).substring(2, 8);
          e += "<input id='" + l + "' type='radio' " + j + " value='" + k + "' name='" + c + "' /><label for='" + l + "'>" + i + "</label>"
        }
      });
      if(f.hasClass("f_switch")) {
        e = a("<div class='switch'>").append(e);
        f.find(".wrap").html(e.clone());
        f.find(".switch").buttonset()
      }
      alert("Save options!")
    },
    buildProperties: function (d) {
      var e = this;
      var c = "";
      c += '<table cellspacing="0" cellpadding="4">';
      a.each(d, function () {
        c += "<tr><td style='width:200px;' class='prop-label'>" + this + "</td><td class='prop-value'>" + ((this == "Font Family") ? e.font_property() : e.options.Properties[this]) + "</td><tr>"
      });
      c += "</table>";
      a("#tab-properties").html(c);
      a(".prop-spinner").spinner({
        min: 0,
        numberFormat: "n"
      });
      a("#header li").removeClass("on");
      a("#header #properties").addClass("on");
      this.checked()
    },
    notification: function () {
      a("#header li").removeClass("on");
      a("#header #mail").addClass("on");
      var c = this.options;
      var d = this;
      a.ajax({
        dataType: "html",
        cache: false,
        beforeSend: function () {
          a("#tab-notification").html('<img style="display: block; margin: 110px auto auto;" src="' + guiBuilder.images + 'guif-loader.gif">');
          var k = (d.init.notification.subject == "") ? "Notification: " + guiform.title : d.init.notification.subject;
          var i = "<div style='margin-bottom: 15px;'>							<p class='loader' style='text-align: center;'><img src='" + guiBuilder.images + "guif-loader.gif'></p>							<table style='border: none; display: none; margin-bottom: 0px;'><tr>							<td style='padding: 0; background-color: #EAF2FA; width: 200px;'><ul class='variable-fields' style='margin: 0 10px 0 0;'></ul></td>							<td style='padding: 10px; border: 1px solid #21759B;'>								<ul class='form'>									<li><label>Notify: </label><input type='checkbox' value='true' name='notify' style='margin: 0;'> <span>Send notification via email after form submission.</span></li>									<li><label>Subject: </label><input class='caret' type='text' value='" + d.init.notification.subject + "' name='subject'></li>									<li><label>Sender: </label>" + a.guiform.emails("sender") + "</li>									<li><label>Mail To: </label><input class='caret' type='text' value='" + d.init.notification.mailto + "' name='mailto'></li>								 	<li><textarea id='tinymce-notification' name='content'></textarea><li>								</ul>							</td>							</tr></table></div>";
          a("#tab-notification").html(i);
          (d.init.notification.notify == true) ? a('#tab-notification input[name="notify"]').attr("checked", "checked") : a('#tab-notification input[name="notify"]').removeAttr("checked");
          a('#tab-notification select[name="sender"]').val(d.init.notification.sender);
          var f = a(".ui-sortable .ui-draggable:not(.ui-sortable .merge), .ui-sortable .merge-item");
          var e = "";
          var g = "<table id='field-list' width='100%' cellspacing='1' cellpadding='10' border='1'>";
          var h = "</table>";
          var l = "";
          f.each(function () {
            if(a(".label", this).size() > 0 && !a(this).hasClass("f_submit")) {
              var n = a.trim(a(this).find(".label").text().replace(/\*/gi, ""));
              e += "<li data-name='{" + a(this).attr("data-name") + "}'>" + n + "</li>";
              l += "<tr><td width='15%' valign='top' style='font-weight: bold;'>" + n + "</td><td>{" + a(this).attr("data-name") + "}</td></tr>"
            }
          });
          if(d.init.notification.message == "") {
            var m = g + l + h;
            a("#tinymce-notification").val(m)
          }
          else {
            var j = a("<div />").html(d.init.notification.message);
            j.find("#field-list").html(l);
            a("#tinymce-notification").val(j.html())
          }
          e += '<li data-name="{entry_id}" title="Submission ID" style="-moz-user-select: none; cursor: default;">Submission ID</li>					<li data-name="{form_id}" title="Form ID">Form ID</li>					<li data-name="{form_title}" title="Form Title">Form Title</li>					<li data-name="{ip_address}" title="IP Address">IP Address</li>';
          a(".variable-fields").html(e).css("max-height", a(".variable-fields").parent().parent().height());
          tinyMCE.init({
            plugins: "code,preview,print,fullscreen,layer,table,save,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,template,wordcount",
            toolbar: "code preview print fullscreen | undo redo cut copy paste styleselect formatselect fontselect fontsizeselect | table bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat subscript superscript",
            selector: "#tinymce-notification",
            theme: "modern",
            menubar: false,
            height: a(document).height() - 525,
            resize: false,
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            init_instance_callback: function () {
              tinymce.activeEditor.on("focus", function (n) {
                c.caret = "tinymce"
              })
            }
          })
        },
        success: function (e) {
          a("#tab-notification .loader").remove();
          a("#tab-notification table").show();
          a(".variable-fields").css("max-height", "400px")
        }
      });
      this.checked();
      return false
    },
    checked: function () {
      var c = this._form();
      (c.find(".required").size() > 0) ? a("#required").addClass("on") : a("#required").removeClass("on");
      (c.size() > 0) ? a("#delete").addClass("on") : a("#delete").removeClass("on")
    }
  })
}(jQuery));
(function () {
  var b;
  b = jQuery;
  var a = {
    focus: "",
    id: guiform.id || "",
    title: (guiBuilder.form !== null) ? guiform.title : "Untitled",
    sortingItem: false,
    draggingItem: false,
    dragItem: null,
    dragItemID: null,
    canvasHeight: function () {
      if(b.browser.name() == "chrome" || b.browser.name() == "opera") {
        return screen.height - 300
      }
      if(b.browser.name() == "firefox" || b.browser.name() == "safari") {
        return screen.height - 340
      }
      if(b.browser.name() == "msie") {
        return screen.height - 290
      }
    },
    maxInputHeight: 500,
    activeProperties: false,
    Container: {
      parent: b("<div id='#GuiForm'></div>"),
      canvas: b("<div id='canvas'></div>"),
      container: b("<div id='container'></div>"),
      containment: b("<div id='containment'><ul id='sortable' class='clearfix'></ul></div>"),
      tools: b("<div id='tools'></div>"),
      contextMenu: b("<div id='contextMenu'></div>")
    },
    Selector: {
      parent: b("#GuiForm"),
      toolLi: b("#tools li"),
      active: b("#canvas .active"),
      contextMenu: b("#contextMenu")
    },
    Tag: {
      tools: "<div class='tools'></div>",
      property: "<div id='property'></div>",
      propertyContent: "<div class='content'></div>"
    },
    Tools: {
      form: {
        "Form Tools": {
          t_text: ["Text Box", "&#xe07b;"],
          t_textarea: ["Text Area", "&#xe072;"],
          t_select: ["Drop Down", "&#xe0a8;"],
          t_radio: ["Radio Button", "&#xe069;"],
          t_checkbox: ["Check Box", "&#xe06a;"],
          t_file: ["File Upload", "&#xe008;"],
          t_password: ["Password", "&#xe075;"],
          t_submit: ["Submit Button", "&#xe07c;"]
        },
        "Display Tools": {
          t_heading: ["Heading", "<strong>H</strong>"],
          t_letter: ["Text", "&#xe0d6;"],
          t_list: ["List", "&#xe001;"]
        },
        "Quick Tools": {
          t_phone: ["Phone Number", "&#xe04e;"],
          t_email: ["Email Address", "&#xe01a;"],
          t_spinner: ["Spinner", "&#xe041;"],
          t_switch: ["Button Options", "&#xe0b6;"]
        }
      }
    },
    Form: {
      heading: ["<div class='wrap'><h1>Heading</h1></div>"],
      letter: ['<div class="wrap"><p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p></div>'],
      list: ['<div class="wrap">																				<ul>																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>																				</ul>																			</div>'],
      text: ["<label class='label'>Text Box</label><div class='wrap' style='width: 250px;'><input type='text' class='validation[none]'></div>", "VARCHAR(150) NOT NULL"],
      textarea: ["<label class='label'>Text Area</label><div class='wrap' style='width: 250px;'><textarea></textarea></div>", "MEDIUMTEXT NOT NULL"],
      select: ["<label class='label'>Drop Down</label>																			<div class='wrap' style='width: 250px;'>																				<select name=''>																					<option value='Option 1'>Option 1</option>																					<option value='Option 2'>Option 2</option>																					<option value='Option 3'>Option 3</option>																				</select>																			</div>", "VARCHAR(150) NOT NULL"],
      radio: ["<label class='label'>Radio Button</label>																			<div class='f_radio_wrap wrap'>																				<label><input type='radio' value='Option 1'><span>Option 1</span></label><br>																				<label><input type='radio' value='Option 2'><span>Option 2</span></label><br>																				<label><input type='radio' value='Option 3'><span>Option 3</span></label><br>																			</div>", "VARCHAR(150) NOT NULL"],
      checkbox: ["<label class='label'>Check Box</label>																			<div class='f_checkbox_wrap wrap'>																				<label><input type='checkbox' value='Option 1'><span>Option 1</span></label><br>																				<label><input type='checkbox' value='Option 2'><span>Option 2</span></label><br>																				<label><input type='checkbox' value='Option 3'><span>Option 3</span></label><br>																			</div>", "VARCHAR(150) NOT NULL"],
      file: ["<label class='label'>File Upload</label>										 		  						<div class='wrap' style='width: 250px;'>										 		  							<input type='file' file-maxsize='5' file-accept='jpg, jpeg, png, gif'>										 		  						</div>										 		  						<div class='gui-files'></div>", "TEXT NOT NULL"],
      submit: ["<div class='f_submit_wrap'><span><button type='submit' name='submit' disabled='disabled' data-loader='Loading'>Submit</button></span></div>", ""],
      password: ["<label class='label'>Password</label><div class='wrap' style='width: 250px;'><input type='password'></div>", "VARCHAR(255) NOT NULL"],
      phone: ["<label class='label'>Phone Number</label><div class='wrap' style='width: 250px;'><input data-mask='(###) ###-####' type='text'></div>", "VARCHAR(150) NOT NULL"],
      email: ["<label class='label'>Email Address</label><div class='wrap' style='width: 250px;'><input class='validation[email]' data-unique='true' placeholder='ex: info@email.com' type='text'></div>", "VARCHAR(150) NOT NULL"],
      spinner: ["<label class='label'>Text Label</label><div class='wrap' style='width: 110px;'><input class='ui-spinner' type='text'></div>", "VARCHAR(150) NOT NULL"],
      "switch": ["<label class='label'>Text Label</label>																			<div class='wrap'>																				<div class='switch'>																					<input type='radio' value='1' /><label>On</label>																					<input type='radio' value='0' /><label>Off</label>																				</div>																			</div>", "VARCHAR(150) NOT NULL"]
    },
    Context: {
      menu: {
        c_nextLineOn: "<li><span id='c_nextLineOn'>Next Line On</span></li>",
        c_nextLineOff: "<li><span id='c_nextLineOff'>Next Line Off</span></li>",
        c_shrink: "<li><span id='c_shrink'>Shrink</span></li>",
        c_expand: "<li><span id='c_expand'>Expand</span></li>",
        c_blockLine: "<li><span id='c_blockLine'>Block Display</span></li>",
        c_floatLine: "<li><span id='c_floatLine'>Inline Display</span></li>",
        c_delete: "<li><span id='c_delete'>Delete</span></li>",
        g_blockLine: "<li><span id='g_blockLine'>Group: Block Display</span></li>",
        g_floatLine: "<li><span id='g_floatLine'>Group: Inline Display</span></li>",
        g_nextLineOn: "<li><span id='g_nextLineOn'>Group: Next Line On</span></li>",
        g_nextLineOff: "<li><span id='g_nextLineOff'>Group: Next Line Off</span></li>"
      }
    }
  };
  a.htmlTools = function () {
    b(this.Selector.parent).append(b(this.Container.tools));
    b.each(this.Tools.form, function (d, e) {
      var c = "";
      c += "<h3>" + d + "</h3>";
      c += "<ul>";
      b.each(a.Tools.form[d], function (f, h) {
        var i = h[0];
        var g = h[1];
        if(f == "t_heading") {
          c += "<li id='" + f + "'><span class='icon'>" + g + "</span><span class='text'>" + i + "</span></li>"
        }
        else {
          c += "<li id='" + f + "'><span class='icon' data-icon='" + g + "'></span><span class='text'>" + i + "</span></li>"
        }
      });
      c += "</ul>";
      b(a.Container.tools).append(c)
    })
  };
  a.htmlCanvas = function () {
    if(guiBuilder.form !== null) {
      b("#GuiForm").append(guiBuilder.form.canvas.replace(/\\/g, ""));
      b("#guiform-notice").remove();
      b("#canvas ul.ui-sortable").attr("id", "sortable")
    }
    else {
      b("#GuiForm").append(b(this.Container.container));
      b("#container").append(b(this.Container.canvas));
      b("#canvas").html(b(this.Container.containment))
    }
    var c = '<div id="guiform-notice">									<h1>Make a Donation</h1>									<p>If you think this wordpress plug-in is useful to you, then it\'s a good reason to do a donation. Your gratitude and finance help will motivate me to continue <strong>GUIFORM</strong> project development.</p>									<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">										<input type="hidden" name="cmd" value="_s-xclick">										<input type="hidden" name="hosted_button_id" value="T68UXN46V3MEC">										<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">										<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">									</form>									<p style="font-weight: bold; text-align: center; color: red; text-transform: uppercase;">Beta Version</p>								</div>';
    b("#container").append(c)
  };
  a.contextMenu = function (g) {
    var e = "";
    var f = a.Context.menu;
    var c = b(".ui-sortable li.ui-draggable.active");
    var d = (c.hasClass("merge")) ? b(".ui-sortable .merge-item.active") : b(a.Selector.active.selector);
    if(c.hasClass("merge")) {
      e += (c.hasClass("floatLine")) ? f.g_blockLine : f.g_floatLine;
      e += (c.hasClass("nextLine")) ? f.g_nextLineOn : f.g_nextLineOff
    }
    if(d.hasClass("f_submit") == false) {
      e += (d.hasClass("shrink")) ? f.c_expand : f.c_shrink;
      e += (d.hasClass("nextLine")) ? f.c_nextLineOn : f.c_nextLineOff;
      e += (d.hasClass("floatLine")) ? f.c_blockLine : f.c_floatLine
    }
    e += f.c_delete;
    e + "<ul>" + e + "</ul>";
    b(a.Container.contextMenu).html(e).css({
      left: (g.pageX) + "px",
      top: (g.pageY) + "px"
    }).show();
    g.preventDefault()
  };
  a.buttonFonts = function (c, d) {
    b(d).parent().addClass("active");
    b("#header .wrapper").remove()
  };
  GuiForm = (function () {
    function c() {
      this.init()
    }
    c.prototype.init = function () {
      if(guiBuilder.form === null && guiform.id !== "") {
        location.href = location.href.split("&form")[0]
      }
      a.htmlTools();
      a.htmlCanvas();
      b("body").append(a.Container.contextMenu);
      b("body").append("<span class='canvas-resize'><span class='arrow'></span><span class='canvas-info'></span></span>");
      this.build();
      b(document).guiTools({
        title: a.title
      })
    };
    c.prototype.form = function (f) {
      var h = f.replace("t_", "");
      var g = b(".ui-sortable li.ui-draggable.active");
      var d = "field_" + String(Math.random()).substring(2, 6);
      var j = "item-" + String(Math.random()).substring(2, 8);
      var i = (f == "t_checkbox") ? "[]" : "";
      var e = b("<li></li>");
      e.html(a.Form[h][0]).addClass(f.replace("t_", "f_") + " ui-draggable blockLine expand clearfix selected item").attr("data-name", d).attr("data-type", a.Form[h][1]).attr("id", j).find("input, select, textarea").attr("name", d + i);
      (g.size()) ? g.after(e) : b("#canvas .ui-sortable").append(e);
      if(h == "phone") {
        b('input[name="' + d + '"]').attr("data-mask", "(###) ###-####").mask("(###) ###-####")
      }
      else {
        if(h == "spinner") {
          b('input[name="' + d + '"]').spinner()
        }
        else {
          if(h == "switch") {
            e.find("input").each(function () {
              var k = "switch-" + String(Math.random()).substring(2, 8);
              b(this).attr("id", k);
              b(this).next().attr("for", k)
            });
            b("#" + j).find(".switch").buttonset()
          }
          else {
            if(h == "submit") {
              b('input[name="' + d + '"]').attr("name", "submit")
            }
          }
        }
      }
      e.css({
        opacity: "0"
      }).addClass("restored-item").removeClass("selected").animate({
        opacity: 1
      }, 1300, function () {
        b(this).removeClass("restored-item")
      })
    };
    c.prototype.build = function () {
      var g = this;
      var d = a.Selector;
      var h = a.Prop;
      b("#tools").accordion({
        heightStyle: "content"
      }).disableSelection();
      b("#tools li").draggable({
        appendTo: "body",
        helper: "clone",
        containment: "#wpwrap",
        connectToSortable: ".ui-droppable.ui-sortable",
        revert: "invalid",
        addClasses: "invalid",
        delay: 50,
        scroll: true,
        scrollSensitivity: 10,
        scrollSpeed: 10,
        zIndex: 2000,
        start: function (i, j) {
          b(".ui-draggable.ui-sortable-helper, .ui-sortable .ui-state-highlight").remove();
          b(".ui-resizable-handle").show();
          b("#contextMenu").hide();
          a.draggingItem = true;
          a.dragItem = b(this).attr("id").replace("t_", "");
          a.dragItemID = b(this).attr("id");
          b(j.helper).css({
            display: "block",
            width: b("#tools").width()
          });
          b("#canvas ul#sortable").sortable("option", "axis", "x,y")
        },
        stop: function (i, j) {
          a.draggingItem = false
        }
      });
      b("#canvas ul#sortable").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        zIndex: 2000,
        drop: function (i, j) {
          j.draggable.addClass("blockLine")
        }
      }).sortable({
        revert: true,
        axis: "y",
        forcePlaceholderSize: true,
        forceHelperSize: true,
        opacity: 0.9,
        containment: false,
        scroll: true,
        scrollSensitivity: 5,
        scrollSpeed: 5,
        placeholder: "ui-state-highlight",
        tolerance: "pointer",
        zIndex: 99999,
        out: function (i, j) {
          b("#tools li").draggable("enable");
          b("#canvas ul#sortable").sortable("option", "axis", "x,y");
          b("#tools li").draggable("option", "axis", "x,y");
          if(a.draggingItem == true) {
            b(j.helper).css({
              display: "block",
              width: b("#tools").width()
            })
          }
        },
        start: function (k, l) {
          var i = "field_" + String(Math.random()).substring(2, 6);
          var n = "item-" + String(Math.random()).substring(2, 8);
          var m = (a.dragItemID == "t_checkbox") ? "[]" : "";
          var j = b("#canvas").find(".ui-draggable[style*='display: none']");
          if(a.draggingItem == true) {
            j.html(a.Form[a.dragItem][0]).addClass(a.dragItemID.replace("t_", "f_") + " blockLine expand clearfix item").attr("data-name", i).attr("data-type", a.Form[a.dragItem][1]).attr("id", n).find("input, select, textarea").attr("name", i + m);
            if(a.dragItemID.replace("t_", "") == "phone") {
              b('input[name="' + i + '"]').attr("data-mask", "(###) ###-####").mask("(###) ###-####")
            }
            else {
              if(a.dragItemID.replace("t_", "") == "spinner") {
                b('input[name="' + i + '"]').spinner()
              }
              else {
                if(a.dragItemID.replace("t_", "") == "switch") {
                  j.find("input").each(function () {
                    var o = "switch-" + String(Math.random()).substring(2, 8);
                    b(this).attr("id", o);
                    b(this).next().attr("for", o)
                  });
                  b("#" + n).find(".switch").buttonset()
                }
                else {
                  if(a.dragItemID.replace("t_", "") == "submit") {
                    b('input[name="' + i + '"]').attr("name", "submit")
                  }
                }
              }
            }
          }
          b("#tools li").draggable("option", "axis", "y");
          b("#canvas ul#sortable").sortable("option", "revert", true);
          b(this).sortable("option", "containment", false);
          b("#tools li").draggable("disable");
          if(l.item.hasClass("floatLine")) {
            b("#canvas ul#sortable").sortable("option", "axis", "x,y");
            b(".ui-state-highlight").css({
              "float": "left",
              clear: "none",
              display: "inline-block",
              width: b(l.helper).outerWidth()
            })
          }
          else {
            b("#canvas ul#sortable").sortable("option", "axis", "y");
            b(".ui-state-highlight").css({
              "float": "none",
              clear: "both",
              display: "block",
              width: "auto"
            })
          } if(a.draggingItem == true) {
            b(l.helper).css({
              width: b(l.helper).outerWidth() - 25
            });
            b(l.helper).css({
              left: b("#canvas").offset().left + 10
            })
          }
          if(l.item.hasClass("merge")) {
            b(l.placeholder).height(b(l.placeholder).outerHeight(true) - 22)
          }
          if(a.draggingItem == false && l.item.hasClass("floatLine") == false) {
            b("#canvas").width(b(l.helper).outerWidth(true) + 30)
          }
        },
        stop: function (i, j) {
          b("#canvas").find(".active").css({
            width: "auto"
          });
          a.sortingItem = true;
          b("#tools li").draggable("enable");
          if(j.item.hasClass("floatLine")) {
            b(j.item).css("display", "inline-table")
          }
        },
        beforeStop: function (i, j) {
          b("#canvas textarea").css("max-height", a.maxInputHeight);
          b("#canvas").find(".ui-draggable[style*='display: none']").remove()
        }
      });
      var f;
      b("#canvas").resizable({
        minWidth: a.canvasMinWidth,
        handles: "e",
        zIndex: 101,
        create: function (i, j) {},
        start: function (i, j) {
          f = j.size.width
        },
        resize: function (k, l) {
          var j = b(this).resizable("option", "minWidth");
          b(".canvas-resize").css({
            left: k.pageX - 158,
            top: k.pageY - 45
          }).show();
          b(".canvas-resize  .canvas-info").html((l.size.width - 30) + " pixels");
          (f > l.size.width) ? b(".canvas-resize .canvas-info").append("<br /><span>Ctrl + left arrow key</span>") : b(".canvas-resize  .canvas-info").append("<br /><span>Ctrl + right arrow key</span>");
          f = l.size.width;
          var i = b("body")[0];
          if(i.scrollWidth > i.clientWidth) {
            if(b("#canvas").width() < a.canvasMaxWidth) {
              b(window).scrollLeft(b("#canvas").width())
            }
            else {
              b(window).scrollLeft(b(window).scrollLeft())
            }
          }
        },
        stop: function (i, j) {
          b(this).css("width", b(this).width());
          b(".canvas-resize").hide();
          b(".ui-resizable-e").css("background-color", "#ECECEC")
        }
      });
      b("#collapse-menu").click(function () {
        b("#GuiForm").css("width", "1px")
      });
      b("#canvas ul.ui-sortable").css({
        "min-height": a.canvasHeight()
      });
      b("#GuiForm").css("width", "auto");
      b(document).ready(function () {}).on("click", "#tools li", function () {
        a.dragItemID = this.id;
        g.form(this.id)
      });
      b(window).resize(function () {
        b("#canvas").css({
          height: b("body").innerHeight() - b("#canvas").offset().top - 70
        });
        b("#tools").css({
          left: b("#GuiForm").offset().left - b(window).scrollLeft()
        });
        b("#header").css({
          left: b("#GuiForm").offset().left - b(window).scrollLeft(),
          right: "auto"
        })
      }).scroll(function (j) {
        var p = b(window);
        var q = b("#GuiForm");
        var n = b("#header");
        var o = b("#tools");
        var i = b("#wpadminbar");
        var k = q.offset().top - i.innerHeight();
        var r = q.offset().left;
        var m = b(".ui-resizable-e");
        (p.scrollTop() < k) ? n.css({
          top: q.offset().top - p.scrollTop()
        }).removeClass("float") : n.addClass("float").css({
          top: q.offset().top - (q.offset().top - i.innerHeight())
        });
        (p.scrollTop() < k) ? o.css({
          top: q.offset().top - p.scrollTop() - 2
        }) : o.css({
          top: i.innerHeight() - 2
        });
        var l = 10;
        (p.scrollTop() < k) ? m.css({
          top: "1px"
        }) : m.css("top", p.scrollTop() - l - q.offset().top + n.innerHeight() - 1);
        (p.scrollLeft() < r) ? o.removeClass("float").css({
          left: q.offset().left - p.scrollLeft()
        }) : o.css({
          left: -(p.scrollLeft() - q.offset().left)
        });
        (p.scrollLeft() < r) ? n.css({
          left: q.offset().left - p.scrollLeft()
        }) : n.css({
          left: -(p.scrollLeft() - q.offset().left)
        })
      }).bind("beforeunload", function (i) {
        i.preventDefault()
      }).mousewheel(function (j, k) {
        if(b(j.target)[0].className.split(" ")[0] !== "list") {
          j.preventDefault();
          var i = b(window).scrollTop();
          b(window).scrollTop(i - (k * 30))
        }
      });
      var e = 0;
      setInterval(function (i) {
        var l = b(window);
        var m = b("#header");
        var k = b("#GuiForm");
        var j = k.offset().left;
        (l.scrollLeft() < j) ? m.css({
          left: k.offset().left - l.scrollLeft()
        }) : m.css({
          left: -(l.scrollLeft() - k.offset().left)
        });
        b("#canvas").css({
          height: b("body").innerHeight() - b("#canvas").offset().top - 70
        });
        b("#tools").css({
          left: b("#GuiForm").offset().left - b(window).scrollLeft()
        });
        b("#container").css("width", screen.width - (b("#tools").width() + b("#adminmenuwrap").width() + 48));
        b("#header ul").css("min-width", screen.width - (b("#adminmenuwrap").width() + 50));
        (b("#canvas .selected").size() > 1) ? b("#merge").addClass("on") : b("#merge").removeClass("on");
        delete(a)
      }, 100);
      b(document).click(function (i) {
        a.focus = b(i.target)[0].nodeName.toLowerCase()
      }).keydown(function (j) {
        var i = j.charCode || j.keyCode || 0;
        var l = document.activeElement.nodeName.toLowerCase() || a.focus;
        if(j.ctrlKey) {
          var k = b("#canvas").width();
          if(i == 37) {
            k--;
            b("#canvas").css("width", k)
          }
          else {
            if(i == 39) {
              k++;
              b("#canvas").css("width", k)
            }
          }
        }
        if((i == 38 || i == 40) && l !== "textarea") {
          return false
        }
      });
      b(".ui-sortable").on("mousedown", ".merge-item", function (i) {
        b(".merge-item.active").removeClass("active");
        b(this).addClass("active")
      });
      b(a.Selector.toolLi.selector).draggable("option", "refreshPositions", true);
      b("#contextual-help-columns .contextual-help-tabs a, #contextual-help-link").click(function (i) {
        b("#tools, #header").css("top", "auto").removeClass("float")
      });
      b(".ui-sortable").on("contextmenu", ".ui-draggable", function (i) {
        a.contextMenu(i)
      });
      b("#wpwrap").mousedown(function (i) {
        b(a.Selector.contextMenu.selector).hide()
      });
      b(a.Selector.contextMenu.selector).click(function (i) {
        b(a.Selector.contextMenu.selector).hide()
      });
      b("#contextMenu").on("click", "#c_shrink", function (j) {
        var i = (b(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? b(".ui-sortable .merge-item.active") : b(a.Selector.active.selector);
        i.css("display", "list-item");
        i.removeClass("expand").addClass("shrink");
        b("#p_label_width").spinner("option", "disabled", true);
        b("#p_label_width").val("")
      });
      b("#contextMenu").on("click", "#c_expand", function (j) {
        var i = (b(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? b(".ui-sortable .merge-item.active") : b(a.Selector.active.selector);
        if(i.hasClass("blockLine") == false) {
          i.css("display", "")
        }
        i.removeClass("shrink top-align").addClass("expand");
        b("#p_label_width").spinner("option", "disabled", false);
        b("#p_label_width").val(i.find(".label").width())
      });
      b("#contextMenu").on("click", "#c_blockLine", function (j) {
        var i = (b(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? b(".ui-sortable .merge-item.active") : b(a.Selector.active.selector);
        i.css("display", "list-item");
        i.removeClass("floatLine").addClass("blockLine")
      });
      b("#contextMenu").on("click", "#c_floatLine", function (j) {
        var i = (b(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? b(".ui-sortable .merge-item.active") : b(a.Selector.active.selector);
        i.css("display", "list-item");
        i.removeClass("blockLine").addClass("floatLine")
      });
      b("#contextMenu").on("click", "#c_nextLineOff", function (j) {
        var i = (b(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? b(".ui-sortable .merge-item.active") : b(a.Selector.active.selector);
        i.addClass("nextLine")
      });
      b("#contextMenu").on("click", "#c_nextLineOn", function (j) {
        var i = (b(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? b(".ui-sortable .merge-item.active") : b(a.Selector.active.selector);
        i.removeClass("nextLine")
      });
      b("#contextMenu").on("click", "span", function (j) {
        var i = (b(".ui-sortable li.ui-draggable.active").hasClass("merge")) ? b(".ui-sortable .merge-item.active") : b(a.Selector.active.selector);
        if(i.hasClass("shrink") || (i.hasClass("shrink") && i.hasClass("expand"))) {
          b("#p_text_width").attr("disabled", "disabled");
          b("#p_text_width").val("")
        }
        else {
          b("#p_text_width").removeAttr("disabled");
          b("#p_text_width").val(i.find(".label").width())
        }
      });
      b("#contextMenu").on("click", "#g_blockLine", function (j) {
        var i = b(".ui-sortable li.ui-draggable.active");
        i.css("display", "list-item");
        i.removeClass("floatLine").addClass("blockLine")
      });
      b("#contextMenu").on("click", "#g_floatLine", function (j) {
        var i = b(".ui-sortable li.ui-draggable.active");
        i.css("display", "list-item");
        i.removeClass("blockLine").addClass("floatLine")
      });
      b("#contextMenu").on("click", "#g_nextLineOff", function (j) {
        var i = b(".ui-sortable li.ui-draggable.active");
        i.addClass("nextLine")
      });
      b("#contextMenu").on("click", "#g_nextLineOn", function (j) {
        var i = b(".ui-sortable li.ui-draggable.active");
        i.removeClass("nextLine")
      });
      b("#contextMenu").on("click", "#c_delete", function (i) {
        b("#delete").trigger("click")
      })
    };
    return c
  })();
  new GuiForm()
}).call(this);