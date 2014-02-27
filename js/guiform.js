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
(function() {
	
	$ = jQuery;
	
	$.fn.getCursorPosition = function(){
	  var el = $(this).get(0);
	  var pos = 0;
	  if('selectionStart' in el) {
	      pos = el.selectionStart;
	  } else if('selection' in document) {
	      el.focus();
	      var Sel = document.selection.createRange();
	      var SelLength = document.selection.createRange().text.length;
	      Sel.moveStart('character', -el.value.length);
	      pos = Sel.text.length - SelLength;
	  }
	  return pos;
	}
	
	$.fn.removeTags = function(){
    this.each(function(){
			if($(this).children().length == 0){
				$(this).replaceWith($(this).text());
			}
			else{
				$(this).children().unwrap();
			}
    });
    return this;
	};
	
	$.cleanTags = function(value, tags){
		var clone = $("<div />").append(value);
		clone.find(":not("+tags+")").removeTags();
    return clone;
	};
	
	//http://stackoverflow.com/questions/918792/use-jquery-to-change-an-html-tag
	$.fn.replaceTag = function (newTagObj, keepProps) {
    $this = this;
    var i, len, $result = jQuery([]), $newTagObj = $(newTagObj);
    len = $this.length;
    for (i=0; i<len; i++) {
        $currentElem = $this.eq(i);
        currentElem = $currentElem[0];
        $newTag = $newTagObj.clone();
        if (keepProps) {
            newTag = $newTag[0];
						$.each(this[0].attributes, function() {
							$(newTag).attr(this.name, this.value);
						});
        }
        $newTag.html(currentElem.innerHTML).replaceAll($currentElem);
        $result.pushStack($newTag);
    }
    
    return this;
	}
	
	//http://www.websanova.com/blog/jquery/jquery-remove-class-by-regular-expression
	$.fn.removeClassRegEx = function(regex){
	var classes = $(this).attr('class');
	if(!classes || !regex) return false;
		var classArray = [];
		classes = classes.split(' ');
		for(var i=0, len=classes.length; i<len; i++) 
			if(!classes[i].match(regex)) classArray.push(classes[i]);
		
		$(this).attr('class', classArray.join(' '));
		return $(this);
	};
	
	$.fn.hasClassRegEx = function(regex){
    var classes = $(this).attr('class');
     
    if(!classes || !regex) return false;
     
    classes = classes.split(' ');
     
    for(var i=0, len=classes.length; i<len; i++)
      if(classes[i].match(regex)) return true;
     
    return false;
  };
  
	$.fn.hasAttr = function(attr) {
    if(this.attr) {
        var _attr = this.attr(attr);
    } else {
        var _attr = this.getAttribute(attr);
    }
    return (typeof _attr !== "undefined" && _attr !== false && _attr !== null);      
	};
  
  $.bytesToSize = function(bytes, unit) {
		unit = unit || true;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    unit = (unit) ? ' ' + sizes[i] : '';
    return Math.round(bytes / Math.pow(1024, i), 2) + unit;
	}
	
	$.browser = {
		object: function(){
			return navigator.userAgent.toLowerCase();
		},
		agent : function(){
			if(this.object().indexOf('msie') > -1){
				return 'msie/' + this.object().split('msie ')[1].split(';')[0];
			}
			else if(this.object().indexOf('chrome') > -1){
				return 'chrome/' + this.object().split('chrome/')[1].split(' ')[0];
			}
			else if(this.object().indexOf('safari') > -1){
				return 'safari/' + this.object().split('version/')[1].split(' ')[0];
			}
			else if(this.object().indexOf('opera') > -1){
				return 'opera/' + this.object().split('opera/')[1].split(' ')[0];
			}
			else{
				return 'firefox/' + this.object().split('firefox/')[1];
			}		
		},
		name : function(){
			return this.agent().split('/')[0];
		},	
		version : function(){
			return this.agent().split('/')[1];
		}
		
	}
	
	$.fn.exists = function(){
	    return this.length > 0 ? this : false;
	}
	
	$.guiform = {
		emails: function(name, className){
			className = className || '';	
			if($(guiBuilder.emails).size() > 0){
			
				var emails = $('.f_email').map(function(index) {
					var field = [[$('input', this).attr('name') , $('label', this).text()]];
				  return field;
				}).get();
				
				var input = $(".f_text input[class='validation[email]']").map(function(index) {
					var field = [[$(this).attr('name') , $(this).parents('.item').find('label').text()]];
				  return field;
				}).get();
				
				var html = '<select name="'+name+'" class="'+className+'">';
				$.each(guiBuilder.emails, function(){
					html += '<option value="{'+ this.name +'}">'+ this.name +'</option>';	
				})
				$.each($.merge( emails, input ), function(){
					html += '<option value="{'+ this[0] +'}">'+ this[1] +'</option>';	
				})
				html += '</select>';
			}
			else{
				html = '<a href="'+guiBuilder.admin_url+'">Click here to add email address.</a>';
			}
			
			return html;
		},
		dataType: function(){
			var html = '<select name="p_data_type" class="p_data_type">';
			$.each(guiBuilder.data_type, function(){
				html += '<option value="'+ this.name +'">'+ this.name +'</option>';	
			})
			html += '</select>';
			return html;
		},
		remoteDb: function(){
			var html = '<select name="remote-db" id="remote-db">';
			html += '<option value="0">'+ guiBuilder.site_name +' Database Installation</option>';
			$.each(guiBuilder.remote_db, function(){
				html += '<option value="'+ this.id +'">'+ this.name +'</option>';	
			})
			html += '</select>';
			return html;
		},
		Fonts   : {'Andale Mono'  : '"Andale Mono"',
							 'Arial'        : 'Arial', 
							 'Arial Black'  : '"Arial Black"',
							 'Arial Narrow' : '"Arial Narrow"',
							 'Arial Rounded MT Bold' : '"Arial Rounded MT Bold"',
							 'Big Caslon'   : '"Big Caslon"',
							 'Bodoni MT'    : '"Bodoni MT"',
							 'Book Antiqua' : '"Book Antiqua"',
							 'Brush Script MT' : '"Brush Script MT"',
							 'Calisto MT'   : '"Calisto MT"',
							 'Calibri'      : 'Calibri',
							 'Cambria'      : 'Cambria, Georgia, serif',
							 'Candara'      : 'Candara',
							 'Century Gothic' : '"Century Gothic"',
							 'Courier New'  : '"Courier New"',
							 'Franklin Gothic Medium' : '"Franklin Gothic Medium"',
							 'Garamond'     : 'Garamond',
							 'Georgia'      : 'Georgia',
							 'Gill Sans'    : '"Gill Sans"',
							 'Goudy Old Style' : '"Goudy Old Style"',
							 'Helvetica Neue' : '"Helvetica Neue"',
							 'Helvetica' : 'Helvetica',
							 'Hoefler Text' : '"Hoefler Text"',
							 'Impact'       : 'Impact',
							 'Lucida Bright' : '"Lucida Bright"',
							 'Lucida Console' : '"Lucida Console"',
							 'Lucida Grande' : '"Lucida Grande"',
							 'Lucida Sans Typewriter' : '"Lucida Sans Typewriter"',
							 'Open Sans'    : '"Open Sans"',
							 'Papyrus'      : 'Papyrus',
							 'Perpetua'     : 'Perpetua',
							 'Rockwell'     : 'Rockwell',
							 'Rockwell Extra Bold' : '"Rockwell Extra Bold"',
							 'sans-serif'     : 'sans-serif',
							 'Segoe UI'     : '"Segoe UI"',
							 'Tahoma'       : 'Tahoma',
							 'Times New Roman' : 'times new roman',
							 'Trebuchet MS' : '"Trebuchet MS"',
							 'Verdana'      : 'Verdana'
  						},
		fonts: guiBuilder.fonts
	}
	
	$.popupBlockerChecker = {
      check: function(popup_window){
          var _scope = this;
          if (popup_window) {
              if(/chrome/.test(navigator.userAgent.toLowerCase())){
                  setTimeout(function () {
                      _scope._is_popup_blocked(_scope, popup_window);
                   },200);
              }else{
                  popup_window.onload = function () {
                      _scope._is_popup_blocked(_scope, popup_window);
                  };
              }
          }else{
              _scope._displayError();
          }
      },
      _is_popup_blocked: function(scope, popup_window){
          if ((popup_window.innerHeight > 0)==false){ scope._displayError(); }
      },
      _displayError: function(){
          alert("Popup window is blocked for this website.");
      }
  };
  
  $.ui.draggable.prototype._generatePosition = function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options
			var containment;
			if(this.containment) {
			if (this.relative_container){
				var co = this.relative_container.offset();
				containment = [ this.containment[0] + co.left,
					this.containment[1] + co.top,
					this.containment[2] + co.left,
					this.containment[3] + co.top ];
			}
			else {
				containment = this.containment;
			}

				if(event.pageX - this.offset.click.left < containment[0]) pageX = containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < containment[1]) pageY = containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > containment[2]) pageX = containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > containment[3]) pageY = containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				var top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? (!(top - this.offset.click.top < containment[1] || top - this.offset.click.top > containment[3]) ? top : (!(top - this.offset.click.top < containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? (!(left - this.offset.click.left < containment[0] || left - this.offset.click.left > containment[2]) ? left : (!(left - this.offset.click.left < containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	}
	
	$.ui.sortable.prototype._mouseStop = function(event, noPropagation) {

		if(!event) return;

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			$.ui.ddmanager.drop(this, event);

		if(this.options.revert) {
			var that = this;
			var cur = this.placeholder.offset();

			this.reverting = true;
      
			$(this.helper).animate({
				left: cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
				top: cur.top - this.offset.parent.top
			}, parseInt(this.options.revert, 10) || 500, function() {
				that._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	}
  
}).call(this);

(function( $, undefined ) {
	$.widget( "GuiForm.guiTools", {

    options: {
    	id      : guiform.id || false,
    	database: guiBuilder.database,
    	screenPreview: 0,
      reload  : false,
      timer   : 0,
      reserved_word: ['id', 'guif_ip', 'guif_date_submitted', 'guif_status', 'guif_browser', 'guif_os'],
      caret   : '',
      item_errors: {},
			menu    : {'save'        : ['&#xe00a;', 'Save Form'],
								 'create'      : ['&#xe077;', 'Create New Form'],
								 'preview'     : ['&#xe09a;', 'Form Preview'],
								 'style'       : ['&#xe026;', 'Form Style'],
								 'required'    : ['&#xe013;', 'Required'],
								 'merge'       : ['&#xe071;', 'Combined Field'],
								 'delete'      : ['&#xe003;', 'Remove Field'], 
								 'properties'  : ['&#xe038;', 'Field Properties'], 
								 'code'        : ['&#xe01c;', 'Source Code'],
								 'thank-you'   : ['&#xe07c;', 'Thank You Message'],
								 'mail'        : ['&#xe03e;', 'Email Settings'],
								 'performance' : ['&#xe00b;', 'Analyze Performance'],
								},
			Properties: {
								'Font Family'        : '',
								'Visible'            : "<lable for='p_visible'><input type='checkbox' id='p_visible' value=''> Hide field by default if unchecked.</lable>",
								'List Type'          : "<select id='p_list_type'>\
																					<option value='disc'>disc</option>\
																					<option value='square'>square</option>\
																					<option value='circle'>circle</option>\
																					<option value='decimal'>decimal</option>\
																					<option value='decimal-leading-zero'>decimal-leading-zero</option>\
																					<option value='lower-roman'>lower-roman</option>\
																					<option value='upper-roman'>upper-roman</option>\
																					<option value='lower-greek'>lower-greek</option>\
																					<option value='lower-alpha'>lower-alpha</option>\
																					<option value='upper-alpha'>upper-alpha</option>\
																					<option value='hiragana'>hiragana</option>\
																					<option value='katakana'>katakana</option>\
																				</select>",
								'Font Size'          : "<input type='text' id='p_font_size' value='' class='prop-spinner'> pixels",
								'Text'               : "<input type='text' id='p_text' value=''>",
								'Line Height'        : "<input type='text' id='p_line_height' value='' class='prop-spinner'> pixels",
								'Text Alignment'     : "<div class='switch'>\
																					<input type='radio' value='left' name='p_alignment' id='radio1' /><label for='radio1' title='left'><span class='icon' data-icon='&#xe055;'></span></label>\
																					<input type='radio' value='center' name='p_alignment' id='radio2' /><label for='radio2' title='center'><span class='icon' data-icon='&#xe056;'></span></label>\
																					<input type='radio' value='right' name='p_alignment' id='radio3' /><label for='radio3' title='right'><span class='icon' data-icon='&#xe063;'></span></label>\
																					<input type='radio' value='justify' name='p_alignment' id='radio4' /><label for='radio4' title='justify'><span class='icon' data-icon='&#xe057;'></span></label>\
																				</div>",
								'Sub Text'           : "<input type='text' id='p_sub_text' value=''>",
								'Text Content'       : "<textarea id='p_text_content'></textarea>\
																				<p>Allows: b, strong, i, em, u, br, blockquote, a</p>",
						  	'Label'              : "<input type='text' id='p_text_label' value=''>",
						  	'Submit Text'        : "<input type='text' id='p_submit_text' value=''>",
						  	'Reset Text'         : "<input type='text' id='p_reset_text' value=''>",
						  	'Loading Text'       : "<input type='text' id='p_loading_text' value=''>",
						  	'Placeholder'        : "<input type='text' id='p_placeholder' value=''>",
						  	'Default Value'      : "<input type='text' id='p_default_value' value=''>",
						  	'Short Description'  : "<input type='text' id='p_short_description' value=''>",
						  	'Input Mask'         : "<input type='text' id='p_input_mask' value=''>\
						  													<p>Use the following symbol to mask:</p>\
						  													<p>~ = + or -</p>\
						  													<p>@ = Alphabet</p>\
						  													<p># = Numeric</p>\
						  													<p>* = Alphanumeric</p>",
						  	'Maximum Input'      : "<input type='text' id='p_max_input' value='' class='prop-spinner'>",
						  	'Width'              : "<input type='text' id='p_width' value=''  class='prop-spinner'>",
						  	'Height'             : "<input type='text' id='p_height' value='' class='prop-spinner'>",
						  	'Options Text Width' : "<input type='text' id='p_options_label' value='' class='prop-spinner'>",
						  	'File Accept'        : "<input type='text' id='p_short_description' value=''>",
						  	'Option Columns'     : "<input type='text' id='p_columns' value='' class='prop-spinner'>",
						  	'Unique Value'       : "<label><input id='p_unique_value' type='checkbox' value=''> No duplicate entry.</label><p>Field must be required enable.</p>",
								'Validation'         : "<ul>\
										  										<li><label><input type='radio' class='p_validation' name='validation' value='none'><span>None</span></label></li>\
																					<li><label><input type='radio' class='p_validation' name='validation' value='email'><span>Email</span></label></li>\
																					<li><label><input type='radio' class='p_validation' name='validation' value='numeric'><span>Numeric</span></label></li>\
																					<li><label><input type='radio' class='p_validation' name='validation' value='alphabet'><span>Alphabet</span></label></li>\
																					<li><label><input type='radio' class='p_validation' name='validation' value='alphanum'><span>AlphaNumeric</span></label></li>\
																				</ul>",
								'Offset'             : "<div id='p_submit_offset'></div><div class='p_submit_offset_value'>Value : <span>0px</span></div>",
								'Submit Alignment'   : "<ul>\
																			  	 <li><label><input type='radio' class='p_submit_alignment' name='alignment' value='right'><span>Right</span></label></li>\
																			  	 <li><label><input type='radio' class='p_submit_alignment' name='alignment' value='left'><span>Left</span></label></li>\
																			  	 <li><label><input type='radio' class='p_submit_alignment' name='alignment' value='center'><span>Center</span></label></li>\
																		    </ul>",
					      'Show Reset Button'   : "<ul>\
																			  	 <li><label><input type='checkbox' class='p_show_reset' name='reset' value='reset'><span>Reset</span></label></li>\
																		    </ul>",
						   	'Label Width'          : "<input type='text' id='p_label_width' value='' class='prop-spinner'>",
						  	'Allow Multiple Upload': "<input type='checkbox' id='p_multiple_file' value=''>",
						  	'File Extentions'      : "<textarea id='p_file_extensions'>jpg, jpeg, png, gif, pdf, doc, docx, xls, csv, txt, html, zip, mp3, mpg, flv, avi</textarea>",
						  	'Max File Size'        : "<input type='text' id='p_max_size' class='prop-spinner'><span style='margin: 0px 10px;'>MB</span>",
						  	
						  	//Spinner Options
						  	'Maximum Value'        : "<input type='text' class='prop-spinner' id='p_spinner_max' value=''>",
							  'Minimum Value'        : "<input type='text' class='prop-spinner' id='p_spinner_min' value=''>",
							  'Compare With'         : "<select id='p_compare_with'></select>"  					 									 	
			},
			Style      :{
				'Alignment'       : "<ul>\
				  										 <li><label><input type='radio' class='p_alignment' name='alignment' value='top'><span>Top</span></label></li>\
															 <li><label><input type='radio' class='p_alignment' name='alignment' value='right'><span>Right</span></label></li>\
															 <li><label><input type='radio' class='p_alignment' name='alignment' value='left'><span>Left</span></label></li>\
															 <li><label><input type='radio' class='p_alignment' name='alignment' value='center'><span>Center</span></label></li>\
													   </ul>",
				'Background Color' : "<input type='text' id='backgroundColor' class='basic' value='' />",
				'Label Color'      : "<input type='text' id='color' class='basic' value='' />",
				'Border Color'     : "<input type='text' id='borderColor' class='basic' value='' />"
			},
			Options:{
				'Gender'         : ['Male', 'Female'],
				'Days'           : ['Monday', 'Teusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
				'Months'         : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				'US States'      : ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
				'US States Abbr' : ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'],
				'Countries'      : ['Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola','Anguilla','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia-Herzegovina','Botswana','Bouvet Island','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Cayman Islands','Central African Republic','Chad','Chile','China','Christmas Island','Cocos (Keeling) Islands','Colombia','Comoros','Congo, Democratic Republic of the (Zaire)','Congo, Republic of','Cook Islands','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland','France','French Guiana','Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guadeloupe (French)','Guam (USA)','Guatemala','Guinea','Guinea Bissau','Guyana','Haiti','Holy See','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast (Cote D`Ivoire)','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macau','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Martinique (French)','Mauritania','Mauritius','Mayotte','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Montserrat','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','Netherlands Antilles','New Caledonia (French)','New Zealand','Nicaragua','Niger','Nigeria','Niue','Norfolk Island','North Korea','Northern Mariana Islands','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Pitcairn Island','Poland','Polynesia (French)','Portugal','Puerto Rico','Qatar','Reunion','Romania','Russia','Rwanda','Saint Helena','Saint Kitts and Nevis','Saint Lucia','Saint Pierre and Miquelon','Saint Vincent and Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Georgia and South Sandwich Islands','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Svalbard and Jan Mayen Islands','Swaziland','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste (East Timor)','Togo','Tokelau','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Turks and Caicos Islands','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Venezuela','Vietnam','Virgin Islands','Wallis and Futuna Islands','Yemen','Zambia','Zimbabwe']
			},
			Icons:{
				'Gender'         : {'Male'   : '<span title="Male" data-icon="&#xe047;"></span>',
														'Female' : '<span title="Female" data-icon="&#xe06c;"></span>'},
				'Alignment'      : {'Left'   : '<span title="Left" data-icon="&#xe055;"></span>',
													  'Center' : '<span title="Center" data-icon="&#xe056;"></span>',
													  'Right'  : '<span title="Right" data-icon="&#xe063;"></span>',
													  'Justify': '<span title="Justify" data-icon="&#xe057;"></span>'},
			  'Arrows'         : {'Up'   : '<span title="Up" data-icon="&#xe014;"></span>',
												    'Left' : '<span title="Left" data-icon="&#xe099;"></span>',
												    'Down'   : '<span title="Down" data-icon="&#xe02d;"></span>',
												    'Right' : '<span title="Right" data-icon="&#xe09d;"></span>'},
				'Operating System': {'Android'   : '<span title="Android" data-icon="&#xe028;"></span>',
													  'Apple' : '<span title="Apple" data-icon="&#xe019;"></span>',
													  'Linux'  : '<span title="Linux" data-icon="&#xe0c0;"></span>',
													  'Windows': '<span title="Windows" data-icon="&#xe020;"></span>'},
				'Content Management System': {'Blogger'   : '<span title="Blogger" data-icon="&#xe018;"></span>',
													  'Drupal' : '<span title="Drupal" data-icon="&#xe017;"></span>',
													  'Joomla'  : '<span title="Joomla" data-icon="&#xe0d3;"></span>',
													  'WordPress': '<span title="WordPress" data-icon="&#xe0b7;"></span>'}
			}
    },
    
    autoSave: function(){
    	var method = this;
    	var options = this.options;
    	clearInterval(options.timer); 
	    options.timer = setInterval(function(event){
	  		var form = $('.ui-sortable .ui-draggable:not(.ui-sortable .ui-draggable.merge), .ui-sortable .merge-item');
	  		if(parseInt(guiBuilder.settings.autosave.value) == 1 && options.id != "" && form.size() > 0){
	  			method.save('autosave');
	  		}
	  	}, parseInt(guiBuilder.settings.autosave_time.value) * 1000);
	  },
    
    init: guiform,
    
    _build: function(){
    	var options = this.options;
    	var method = this;
    	
    	$('#GuiForm').append($("<div id='header'></div>"));
    	var html = '<ul class="clearfix">';
			$.each(options.menu, function(key, value){
				html += '<li id="'+ key +'"><span title="'+value[1]+'" data-icon="'+value[0]+'" class="menu-button"></li>';
			});
			
			html += '<li class="formName-list"><input maxlength="40" id="formName" title="Form Title" placeholder="Untitled Form" type="text" name="formName" value="'+ guiform.title +'"></li>';
			html += '</ul>';
			
			$('#header').append(html);
			
			if(guiBuilder.performance == 0) $("#performance").remove();
			
			$("#header ul").css("min-width", $("#wpadminbar").width() - ($('#adminmenuwrap').width() + 35));
    	
			if($('#guiform-style').size() == 0){
    		var style = $("<style type='text/css' id='guiform-style' media='all' />");
				$('#canvas').prepend(style.clone());
				$('#guiform-style').html("#canvas, #canvas .ui-widget{background-color: #FFFFFF;font-family: Verdana,sans-serif;} #canvas .label{color: #333333;} #canvas input, #canvas textarea, #canvas .f_select [name]{border: 1px solid #CCCCCC;}");
    	}
    	
    	if($('#guiform-form').size() == 0){
    		var style = "<style type='text/css' id='guiform-form' media='all'></style>";
				$('#canvas').prepend(style);
    	}
    	
			$('.switch').buttonset();
	
			$('.ui-spinner').each( function(){
				var max = $(this).attr('data-max');
				var min =  $(this).attr('data-min');
				$(this).spinner({ max: max, min: min });
			})
			
			$.mask.definitions['#'] = "[0-9]";
			$.mask.definitions['@'] = "[a-zA-Z]";
			$.mask.definitions['*'] = "[a-zA-Z0-9]";
			$.mask.definitions['~']='[+-]';
			
			$('.f_phone input').each( function(){
				$(this).mask($(this).attr('data-mask'))	
			});
			
			$( ".menu-button, #formName").tooltip({
				position: {
					my: "center bottom-20",
					at: "center top",
					using: function( position, feedback ) {
						$(this).css(position).css('z-index','999999');
						$("<div>").addClass("arrow")
											.addClass(feedback.vertical)
											.addClass(feedback.horizontal)
											.appendTo(this);
					}
				}
			});
    },
    
    _create: function(){
    	this._build();
    	var options = this.options;
    	var method = this;
    	var $doc = $(document);
    	method.autoSave();
    	
    	//--- BEGIN Thank you message tab ------------------>
    	$doc.on('click', '#message input[name="message"]', function(){
				var type = $(this).val();	
				method.init.thank_you.checked = type;
				var html = '<button id="message-next">Next</button> <button id="message-close">Finish</button>';
				
				if(type == 'default'){
					$('#guifbox-button').html('<button id="message-close">Finish</button>').css('padding','10px');
				}
				else if(type == 'redirect'){
					$('#guifbox-button').html(html).css('padding','10px');
				}
				else{
					$('#guifbox-button').html(html).css('padding','10px');
				}
			})
    	
    	$doc.on('click', '#message-next', function(){
    		var type = method.init.thank_you.checked;
    		var html = '<button id="message-back">Back</button> <button id="message-close">Finish</button>';
    		
    		$('#message .list').hide();
    		
    		if(type == 'redirect'){
    			options.caret = "message-url";
    			$('#message #message-table').hide();
					$('#message #message-url').show();				
				}
				else if(type == 'custom'){
					options.caret = "tinymce";
					$('#guifbox-window').css({'width':'800px'});
					$('#message #message-url').hide();
					$('#message #message-table').show();				
				}
				
				$('#guifbox-button').html(html)
				
				var left = ($(document).width() - $('#guifbox-window').width()) / 2;
				var top = ($(window).height() - $('#guifbox-window').height()) / 2;
					
				$('#guifbox-window').css({'left': left,'top':top});    		
    		
    	})
    	
    	$doc.on('click', '#message-back', function(){
    		
    		var html = '<button id="message-next">Next</button> <button id="message-close">Finish</button>';
    		$('#guifbox-button').html(html)
    		$('#guifbox-window').css({'width':'400px'})
    		$('#message #message-url').hide();
				$('#message #message-table').hide();
    		$('#message .list').show();
    		
				var left = ($(document).width() - $('#guifbox-window').width()) / 2;
				var top = ($(window).height() - $('#guifbox-window').height()) / 2;
				$('#guifbox-window').css({'left': left,'top':top});
				 
    	})
    	
    	$doc.on('click', '#message-close', function(){
    		$('#guifbox').hide('fast', function(){$(this).remove()})
    	})
    	
    	$doc.on('blur', '#message-url input[name="message-url"]', function(){
    		method.init.thank_you.url = $.trim(this.value);
    	})
    	
    	$doc.on('click', '#guifbox-close, #message-back, #message-close', function(){
    		var type = method.init.thank_you.checked;
    		if($('#guifbox #message').size() > 0 && type == 'custom'){
    			method.init.thank_you.message = tinyMCE.activeEditor.getContent();
	    	}
    	})
    	
    	//--- END Thank you message tab ------------------>
    	
    	
    	//--- BEGIN Form Title ------------------>	
    	$doc.on('blur', '#formName',function(event){
				guiform.title = $.trim($(this).val());
			})
			
			$doc.keydown(function(event){
				var fonts = $("#tab-fonts[aria-hidden=false]").size()
				var key = event.charCode || event.keyCode || 0; 
				var current = document.activeElement.nodeName.toLowerCase() || options.focus;
				var element = ['input','textarea','select'];
				
				if($('.ui-tabs').size() > 0){	
					if(current == 'body' && fonts == 0 && $('#window-properties').size() == 0){
						return false;
					}
				}
				
				if(fonts > 0){
					var index = $('#fonts-container li').index($('#fonts-container li.active'));
					
					if(key == 38){
						if(index == 0) return false;
						$('#fonts-container ul').scrollTop(index * 27 - 164);
						$('#fonts-container li:eq('+ index +')').removeClass('active')
						$('#fonts-container li:eq('+ (index-1) +')').addClass('active')
					}
					
					if(key == 40){
						$('#fonts-container ul').scrollTop(index * 27 - 108);
						if(index >= $('#fonts-container li').size() - 1) return false;
						$('#fonts-container li:eq('+ index +')').removeClass('active')
						$('#fonts-container li:eq('+ (index+1) +')').addClass('active')
					}
					
					if(key == 13){
						$('#guifbox').hide('slow');
						$('#fonts.menu-button').removeClass('on')
					}
					
					var font = $('#fonts-container li.active').attr('data-value').replace(/"/g, "'");
					//$("#canvas").css('font-family', "guiform !important;");	
					
					var text = $("#guiform-style").text();
					text = text.split("font-family: ")[1].split(';')[0];
					$("#guiform-style").text($("#guiform-style").text().replace(text, font))
					
				}
				
			}).keyup(function(event){
				var key = event.charCode || event.keyCode || 0; 
				$("#contextMenu").hide();
				var form = $('.ui-sortable li.ui-draggable.active');
				var current = document.activeElement.nodeName.toLowerCase() || options.focus;
				var element = ['input','textarea','select'];
				var fonts = $('#fonts-container').size()
				var scroll = $('#fonts-container ul').scrollTop();
				if($('.ui-tabs').size() > 0){	
					if(current == 'body' && fonts == 0 && $('#window-properties').size() == 0){
						return false;
					}
				}
				
			  if($.inArray(current, element) == -1 && fonts == 0){
					if(key == 46){
						method.remove()
					}
					else if(event.ctrlKey == false && $('.ui-sortable .ui-draggable').size() > 0){
						if(form.size() > 0){
							var index = $('.ui-sortable .ui-draggable').index(form);
							
							if(key == 37 || key == 38){
								if(index == 0) return false;
								$('.ui-sortable .ui-draggable:eq('+ index +')').removeClass('active')
								$('.ui-sortable .ui-draggable:eq('+ (index-1) +')').addClass('active')
				      }
							if(key == 39 || key == 40){
								if(index >= $('.ui-sortable .ui-draggable').size() - 1) return false;
								$('.ui-sortable .ui-draggable:eq('+ index +')').removeClass('active')
								$('.ui-sortable .ui-draggable:eq('+ (index+1) +')').addClass('active')	
				      }
				      
				      $(window).scrollTop($('.ui-sortable li.ui-draggable.active').position().top + 40)
						}
						else if(key >= 37 && key <= 40){
							$('.ui-sortable .ui-draggable:eq(0)').addClass('active')
						}
						
						method.tabs_properties()
					}
				}
				
			})
			
			$doc.on('click', '#fonts-container li',function(){
				$('#fonts-container li').removeClass('active');
				$(this).addClass('active');
				var text = $("#guiform-style").text();
				text = text.split("font-family: ")[1].split(';')[0];
				var value = $('#fonts-container li.active').attr('data-value');
				$("#guiform-style").text($("#guiform-style").text().replace(text, value.replace(/"/g, "'")));
			})
			
			$doc.on("mousedown", '.ui-sortable .ui-draggable', function(event){
				
				if($(this).find('.merge-item').size() == 0) $('.merge-item.active').removeClass("active");
				
				if(event.ctrlKey){
					$('#guifbox').remove();
					$('.merge-item.active').removeClass("active")
					$('.ui-sortable li.ui-draggable.active').removeClass("active").addClass('selected')
					
					if($(this).hasClass('selected')){
						$(this).removeClass('selected');
					}
					else{
						$(this).addClass('selected');
					}
				}
				else{
					$('#canvas li').removeClass("selected");
					$('.ui-sortable li.ui-draggable.active').removeClass("active")
					$(this).addClass("active");
				}
				
				if($('#window-properties').size()){
					method.tabs_properties();
					method.properties();
					method.get_properties();
				}
				
				method.checked();
				
			});
			
			$doc.on("dblclick", '.ui-sortable li.ui-draggable', function(event){
				if($(this).hasClass('selected') == false)	method.tabs_properties(0);
			});
			
			//---BEGIN For editing label------------------>	
			$doc.on('click', '.edit-label',function(){
				var text = $(this).text();
				var id = $(this).parent().parent().attr('id');
				$(this).removeClass('edit-label')
				$(this).html("<input id='"+id+"' class='edit-label-input' value=''>")
				$(this).find('input').focus()
				$(this).find('input').val(text)
			})
			
			$doc.on('keydown', '.edit-label-input',function(event){
				var key = event.charCode || event.keyCode || 0;
				if(key == 9) return false;
			}).on('keyup', '.edit-label-input',function(event){
				var id = this.id.split('-')[2];
				var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $('.ui-sortable li.ui-draggable.active');
			
				var label = ($('#item-'+id).find('.required').size() > 0) ? $.trim(this.value)+"<span class='required'>*</span>" : $.trim(this.value);
				
				$('#item-'+id).find('.label').html(label)
			  
			  if(id == form.attr('id').split('-')[1]){
			  	var anchor = $('#tab-li-properties a');
			  	($.trim(this.value) !== '') ? anchor.text($.trim(this.value)) : anchor.html('&nbsp;');
				}
			}).on('blur', '.edit-label-input',function(event){
				var value = $(this).val();
				$(this).parent().addClass('edit-label').html(value)
			});
			//---END For editing label------------------>	
			
			$doc.on('keyup', '#guiform-canvas',function(event){
				$('#guiform-form').text($(this).val())
			})
			
			$doc.on('click', '.caret',function(){
				options.caret = $(this).attr('name');
			})
			
			$doc.on('click', '.variable-fields li',function(){
				var value = $(this).attr('data-name');
				if(options.caret == 'tinymce' || options.caret == ''){
					tinyMCE.execCommand("mceInsertContent",false, value);
				}
				else{
					$(".caret[name='"+options.caret+"']").atCaret('insert', value);
				}
				return false;
			})
			
			var trigger_delete = true;
			$doc.on('click', '#options-list .add', function(){
				var index = $('#options-list li').index($(this).parent());
				var html = '<li class="selected" style="display:none;">\
											<input type="radio" name="checked"><input type="text" name="label" value="Text">\
											<input type="text" name="value" value="value">\
											<span data-icon="&#xe08c;" class="move"></span>\
											<span data-icon="&#xe004;" class="add"></span>\
											<span data-icon="&#xe093;" class="delete"></span>\
										</li>';
				$('#options-list li:eq('+index+')').after(html);
				$('#options-list .selected').slideDown('slow', function(){$(this).removeClass('selected')});
			}).on('click', '#options-list .delete', function(){
				if(trigger_delete == true){
					trigger_delete = false;
					if($('#options-list li').size() < 2) trigger_delete = true;
					if($('#options-list li').size() > 1){
						$(this).parent().slideUp('slow', function(){
							$(this).remove();
							trigger_delete = true;
						})
					}
				}
			}).on('click', '#bulk-options li', function(){
				var key = $.trim($(this).text());
				var html = '';
				var form = method._form();	
				
				if(form.hasClass('f_switch')){
					$.each(options.Icons[key], function(value){
						var list = $("<div>");
						list.append('<li>\
													<input type="radio" name="checked"><input type="text" name="label" value="">\
													<input type="text" name="value" value="'+value+'">\
													<span data-icon="&#xe08c;" class="move"></span>\
													<span data-icon="&#xe004;" class="add"></span>\
													<span data-icon="&#xe093;" class="delete"></span>\
												</li>');
						list.find("input[name='label']").attr('value',this);
						html += list.html();
					})
				}
				else{
					$.each(options.Options[key], function(){
						html += '<li>\
												<input type="radio" name="checked"><input type="text" name="label" value="'+this+'">\
												<input type="text" name="value" value="'+this+'">\
												<span data-icon="&#xe08c;" class="move"></span>\
												<span data-icon="&#xe004;" class="add"></span>\
												<span data-icon="&#xe093;" class="delete"></span>\
											</li>';
					})
				}
				
				$('#options-list').html(html);
				
			}).on('click', '#clear-options', function(){
				var html = '<li>\
											<input type="radio" name="checked"><input type="text" name="label" value="Text">\
											<input type="text" name="value" value="Value">\
											<span data-icon="&#xe08c;" class="move"></span>\
											<span data-icon="&#xe004;" class="add"></span>\
											<span data-icon="&#xe093;" class="delete"></span>\
										</li>';
				$('#options-list').html(html);
			}).on('click', '#save-options', function(){
				method.rebuild_options();
			})
			
			$doc.on('click', '#save-items', function(){
				var form = method._form();
				var html = '';
				if(form.hasClass("f_list")){
					$('#items-list .items-list-li').each( function(){
							html += '<li>'+this.value+'</li>';
					})
					$('ul', form).html(html);
					alert("Save unordered list!")
				}
			})
			
			$doc.on('keydown', '.ui-spinner-input',function(event){
				var key = event.charCode || event.keyCode || 0; 
				if(event.shiftKey == true) return false;
				return (key == 8 || key == 9 || key == 46 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
        				
				event.preventDefault();
			}).on("cut copy paste", '.ui-spinner-input', function(event) {
	      event.preventDefault();
		  });
		  
		  var value = null;
		  $doc.on('keyup change', '#preview-screen', function(event){
		  	if(value == this.value) return false;
		  	value = this.value;
		  	method.preview_screen(this.value);
			})
			
			method.checked();
    },
    
    _init: function(){
    	this._event();
    },
    
    _form: function(){
    	return ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $('.ui-sortable li.ui-draggable.active');
    },
     
    _event: function(){
    	
    	var options = this.options;
    	var method = this;
    	var $doc = $(document);
    	
    	$("#header").on("click", 'li', function(event) {
				var id = this.id;
				switch(id){
				case 'save':
				  method.save();
				  break;
				case 'create':
				  method.create();
				  break; 
				case 'preview':
				  method.preview();
				  break;
				case 'print':
				  method.print();
				  break;
				case 'required':
				  method.required(event, this)
				  break;
				case 'merge':
				  method.merge(event, this);
				  break;
				case 'delete':
				  method.remove();
				  break;
				case 'properties':
					var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $('.ui-sortable li.ui-draggable.active');
				  (form.size() > 0) ? method.tabs_properties(0) : alert('Please select a form.');
				  break;
				case 'style':
				  method.tabs_style(0);
				  break;
				case 'mail':
				  method.tabs_mail(0);
				  break;
				case 'code':
					method.code();
					break;
				case 'thank-you':
					method.submission_message();
					break;
				case 'performance':
					method.performance();
					break;
				default:
				  //alert("Hello")
				} 
				
			})
			
//----------------END - Validate field name ------------------------------------------------------------>				
				
			$doc.on("keyup keydown", '#p_placeholder', function(event){
				var value = $.trim($(this).val())
				var form = method._form();
				form.find("input[type='text'], textarea").attr("placeholder", value)		
			});
			
			$doc.on("keyup keydown", '#p_default_value', function(event){
				var value = $.trim($(this).val())
				var form = method._form();
				form.find("input[type='text'], textarea, select").attr("data-default", value)		
			});
			
			$doc.on("keyup keydown", '#p_short_description', function(event){
				var value = $.trim($(this).val())
				var form = method._form();
				form.find(".short-description").remove();
				var html = $.cleanTags(value, "span, b, strong, i, em, u, br, blockquote, a");
				html = "<p class='short-description'>"+html.html()+"</p>";
				form.find(".wrap").append(html);	
			});
			
			$doc.on("click", '.p_validation', function(event){
				var value = $.trim($(this).val());
				var form = method._form();
				form.find("input[type='text']").attr("class", "validation["+value+"]"); 
			});
			
			$doc.on("click", 'input[name="p_alignment"]', function(event){
				var form = method._form();
				form.find(".wrap").css('text-align', this.value);
			});
			
			$doc.on("keyup keydown", '#p_text', function(event){	
				var form = method._form();
				var value = $.trim(this.value);
				(value !== '') ? $('.ui-tabs-nav a:eq(0)').text(value) : $('.ui-tabs-nav a:eq(0)').html('&nbsp;');
				var html = $.cleanTags(value, "span, em, u, blockquote, a, strong, i");
				form.find(':header').html(html.html());
			});
			
			$doc.on("keyup keydown", '#p_text_content', function(event){	
				var form = method._form();
				var value = $(this).val();
				var html = $.cleanTags(value, "span, b, strong, i, em, u, br, blockquote, a");
				var label = $.trim(html.html());
				(value !== '') ? $('.ui-tabs-nav a:eq(0)').text(value) : $('.ui-tabs-nav a:eq(0)').html('&nbsp;');
				form.find('p').remove();
				var text = '';
				$.each(label.split("\n\n"), function(){
					text += '<p>'+this+'</p>';
				})
				
				$('.wrap', form).append(text)
			});
			
			$doc.on("keyup keydown", '#p_sub_text', function(event){
				var value = $.trim($(this).val());
				var form = method._form();
				var html = $.cleanTags(value, "span, em, u, blockquote, a, strong, i");
				form.find(".sub-text").remove();
				form.find('.wrap').append("<div class='sub-text'>"+ html.html() +"</div>");	
			});
			
			$doc.on("change keyup", '#p_fonts', function(event){
				var form = method._form();
				form.find(':header, p, li').css('font-family', $(this).val());
			});
			
			$doc.on("change keyup", '#p_list_type', function(event){
				var form = method._form();
				form.find('ul').attr('class', this.value);
			});
			
			$doc.on("keyup keydown", '#p_text_label', function(event){	
				var form = method._form();
				var value = (form.find('.required').size() > 0) ? $.trim(this.value)+"<span class='required'>*</span>" : $.trim(this.value);
				(value !== '') ? $('.ui-tabs-nav a:eq(0)').text(value) : $('.ui-tabs-nav a:eq(0)').html('&nbsp;');
				var html = $.cleanTags(value, "span, strong, i, u, em, blockquote");
				form.find('.label').html(html.html())
			});
			
			$doc.on("click", '.p_alignment', function(event){
				var form = method._form();
				if($(this).val() == 'top'){
					form.addClass("top-align");
					form.find(".label").css("text-align", '')
					form.filter(".shrink").find(".label").css('width','')
				}
				else{
					form.removeClass("top-align");
					form.find(".label").css("text-align", $(this).val())
				}	
			});
				
			$doc.on("keyup keydown", '#p_reset_text', function(event){
				var form = method._form();
				var html = $.cleanTags(this.value, "span, strong, i, u");
				form.find("button[type='reset']").html(html.html());
			});
			
			$doc.on("keyup keydown", '#p_loading_text', function(event){
				var form = method._form();
				var html = $.cleanTags(this.value, "span, strong, i, u");
				form.find("button[type='submit']").attr('data-loader', html.html());
			});
			
			$doc.on("keyup keydown", '#p_submit_text', function(event){
				var form = method._form();
				var html = $.cleanTags(this.value, "span, strong, i, u");
				form.find("button[type='submit']").html(html.html());
			});
			
			$doc.on("click", '.p_submit_alignment', function(event){
				var form = method._form();
				$("#p_submit_offset").slider( "option", "value", 0 );
				form.find(".f_submit_wrap span").css("margin-left", '');
				form.find(".f_submit_wrap").css("text-align", $(this).val());
				$('.p_submit_offset_value span').text('0px');
			});
			
			$doc.on("click", '.p_show_reset', function(event){
				var form = method._form();
				var value = this.value;
				
				form.find(".f_submit_wrap span").css("margin-left", '');
				$("#p_submit_offset").slider( "option", "value", 0 );
				
				if($(this).is(':checked')){
					var reset = $.trim($('#p_reset_text').val());
					form.find('button[type="submit"]').before('<button name="reset" type="reset">'+ (reset == '' ? 'Clear Form' : reset) +'</button>');
				}
				else{
					form.find('button[type="reset"]').remove();
				}
				
				$('.p_submit_offset_value span').text('0px');
				
			});
			
			$doc.on("keyup", '#p_input_mask', function(event){
				var form = method._form();
				var value = $.trim(this.value);
				form = form.find("input[type='text']");
				form.mask(value);
				form.attr('data-mask', value);
				if(value == '') form.removeAttr('data-mask').unmask();
			}).on("cut copy paste", '#p_input_mask', function(event){
	      event.preventDefault();
		  })
			
			$doc.on("keyup keydown", '#p_file_extensions', function(event){
				var form = method._form();
				if(form.hasClass('f_file')){
					var form = form.find("input[type='file']");
					form.attr('file-accept', $.trim(this.value));
					if(this.value == '') form.removeAttr('file-accept');
				}
			});
			
			$doc.on("click", '#p_visible', function(event){
				var form = method._form();
				($(this).is(':checked')) ? form.removeClass('hidden') :	form.addClass('hidden');
			});
			
			$doc.on("click", '#p_multiple_file', function(event){
				var form = method._form();
				form = $('input[type="file"]', form);
				if($(this).is(':checked')){
					 form.attr('multiple','multiple');
					 form.wrap('<div class="guif-dropzone"></div>');
					 form.parents('.guif-dropzone').prepend('<span>Add File</span>');
					 form.attr("name", form.attr("name") + "[]");
				}
				else{
					 form.removeAttr('multiple');
					 form.attr("name", form.attr("name").split('[')[0]);
					 form.unwrap();
					 form.parents('.wrap').find('span').remove();
				}
			});
			
			$doc.on("click", '#p_unique_value', function(event){
				var form = method._form();
				($(this).is(':checked')) ? $('input', form).attr('data-unique', 'true') : $('input', form).attr('data-unique', 'false');
			});
			
			$doc.on( "spin", '.ui-spinner', function(event, ui) {
				var value = ($.trim(ui.value) == '') ? '' : $.trim(ui.value);
				method.spinner(value, event.target.id);
			}).on( "keyup", '.ui-spinner input', function(event){
				var value = $.trim(this.value);
				method.spinner(value, event.target.id);
			})
    },
    
    performance: function(){
    	var options = this.options;
    	if(typeof(options.id) == 'boolean')
    		$('<div>').guifbox({title: 'message', status: 'message', body: '<p>Build your form first.</p>'});
    	else
    		$("#window-preview").attr('href', "http://gtmetrix.com/?url="+guiBuilder.preview_url+options.id).get(0).click();;
    },
    
    spinner: function(value, id){
    	var method = this;
    	var form = method._form();
    	
			if(id == 'p_spinner_max'){
				form.find(".ui-spinner-input").attr("data-max", value);
				form.find(".ui-spinner-input").spinner( "option", "max", value );
			}
			else if(id == 'p_label_width'){
				form.not('.shrink, .top-align').find(".label").css('width', value)
			}
			else if(id == 'p_spinner_min'){
				form.find(".ui-spinner-input").attr("data-min", value);
				form.find(".ui-spinner-input").spinner( "option", "min", value );
			}
			else if(id == 'p_max_input'){
				form.find("input[type='text'], textarea").attr("maxlength", value);
			}
			else if(id == 'p_max_size'){
				form.find("input[type='file']").attr("file-maxsize", value);
			}
			else if(id == 'p_height'){
				form.find("input[type='text'], textarea").css("height", value);
			}
			else if(id == 'p_width'){
				form.find("input[type='password'], input[type='text'], input[type='file'], textarea, select, .wrap").css("width", value);
			}
			else if(id == 'p_columns'){
				method.options_column(value);
			}
			else if(id == 'p_options_label'){
				form.find('.wrap span').css('width', value);	
				$("#p_width").val(form.find(".wrap").outerWidth());	
				form.find('.wrap').css('width', 'auto');	
			}
			else if(id == 'p_font_size'){
				form.find(":header, p, li").css("font-size", value +'px');
			}
			else if(id == 'p_line_height'){
				form.find("p, li").css("line-height", value +'px');
			}
    },
    
    submission_message: function(){
    	var method = this; 
    	var options = this.options;
    	
    	var html = '<div id="message">\
	    							<ul class="list">\
	    								<li>\
	    									<label>\
	    										<input type="radio" name="message" value="default">\
	    										<span>Default thank you message</span>\
	    									</label>\
	    									<p class="description">After successful form submission, display default message.</p>\
	    								</li>\
	    								<li>\
	    									<label>\
	    										<input type="radio" name="message" value="redirect">\
	    										<span>Page redirect url</span>\
	    									</label>\
	    									<p class="description">After successful form submission, redirect to a custom url.</p>\
	    								</li>\
	    								<li>\
	    									<label>\
	    										<input type="radio" name="message" value="custom">\
	    										<span>Custom thank you message</span>\
	    									</label>\
	    									<p class="description">After successful form submission, display custom message.</p>\
	    								</li>\
	    							</ul>\
	    							<table id="message-url" style="width: 650px; display: none; height: 430px; border: 1px solid #21759B;"><tr>\
										<td style="padding: 10px; width: 200px; vertical-align: top; border: medium none;"><ul class="variable-fields" style="margin: 0 10px 0 0;"></ul></td>\
										<td style="padding: 10px; vertical-align: top; border: none;">\
											<h3>Custom Page Url</h3>\
	    								<p class="description">After successful form submission, redirect to a custom url.</p>\
	    								<textarea class="caret" style="width: 416px; height: 207px; resize: vertical;" name="message-url" placeholder="ex: http://domain-name.com/thankyou?entry={entry_id}">'+method.init.thank_you.url+'</textarea>\
										</td>\
										</tr></table>\
	    						  <table id="message-table" style="width: 800px; border: none; display: none; margin-bottom: 0px;"><tr>\
										<td style="padding: 0px; width: 285px; vertical-align: top; border: medium none;"><ul class="variable-fields" style="margin: 0 10px 0 0;"></ul></td>\
										<td style="padding: 0px; vertical-align: top; border: none;">\
											<textarea id="tinymce-message" name="content"></textarea>\
										</td>\
										</tr></table>\
	    						</div>';
    	
    	$('<div>').guifbox({
				title       : 'Thank you message!', 
				status      : 'confirm',
				opacity     : 0,
				body        : html,
				width       : 400,
				overlay     : false,
				saveButton  : false,
				cancelButton: false, 
				confirmButton: false, 
				closeButton : false,
				create: function(){
					var form = $('.ui-sortable .ui-draggable:not(.ui-sortable .merge):not(.ui-sortable .f_submit), .ui-sortable .merge-item');
					var name = '';
					var table_head = "<table id='field-list' width='850' cellpadding='5' cellspacing='5'>"
					var table_foot = "</table>";
					var table_body = '';
					
					form.each(function(){
						if($('.label', this).size() > 0){
							var label = $.trim($(this).find('.label').text().replace(/\*/gi, ""));
							name += "<li data-name='{"+$(this).attr('data-name')+"}'>"+ label +"</li>";
							table_body += "<tr><td width='150'>"+ label +"</td><td>{"+ $(this).attr('data-name') +"}</td></tr>";
						}
					});
					
					name += '<li data-name="{entry_id}" title="Submission ID" style="-moz-user-select: none; cursor: default;">Submission ID</li>\
					<li data-name="{form_id}" title="Form ID">Form ID</li>\
					<li data-name="{form_title}" title="Form Title">Form Title</li>\
					<li data-name="{ip_address}" title="IP Address">IP Address</li>';
					
					$('.variable-fields').html(name);
					
		    	tinyMCE.init({
		    		plugins : "code,preview,layer,table,save,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,template,wordcount",
		    		toolbar: "code preview | undo redo cut copy paste fontselect fontsizeselect | table bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat subscript superscript",
		        selector: "#tinymce-message",
		        theme : "modern",
		        menubar:false,
		        height : 400,
		        resize: false,
		        theme_advanced_toolbar_location : "top",
		        theme_advanced_toolbar_align : "left",
		        theme_advanced_statusbar_location : "bottom"
					});
					
					
					$('#tinymce-message').val(method.init.thank_you.message);
					
					$('#message input[value="'+method.init.thank_you.checked+'"]').attr('checked','checked')
					$('#guifbox-button').css('padding','0');
					
					var htmlNext = '<button id="message-next">Next</button> <button id="message-close">Finish</button>';
					
					if(method.init.thank_you.checked == 'redirect' || method.init.thank_you.checked == 'custom'){
						$('#guifbox-button').html(htmlNext).css('padding','10px');
					}
					else{
						$('#guifbox-button').html('<button id="message-close">Finish</button>').css('padding','10px');
					}
				}
			});
			
    },
    
    options_column: function(number){
    	var method = this;
    	var form = method._form();
    	if(form.hasClass("f_radio") || form.hasClass("f_checkbox")){
				
				form.find("br").remove();
				
				var value = parseInt(number);
				if(number == 1 || number == '' || number == 0){
					form.find(".wrap label").after('<br>');
				}
				else{
				  var index = parseInt(form.find(".wrap label").size() / value);
					for(var i=0; i < index; i++){
						form.find(".wrap label:eq("+ (value-1) +")").after('<br>')
						value += parseInt(number);
					}
				}
				
				form.find('.f_radio_wrap').removeAttr('class').addClass('f_radio_wrap wrap column['+ number +']')
				form.find('.f_checkbox_wrap').removeAttr('class').addClass('f_checkbox_wrap wrap column['+ number +']')
				if(number == '') form.find('.f_radio_wrap, .f_checkbox_wrap').removeClass('column[]');
			}
    },
    
    tabs_style: function(selected){
    	var method = this; 	
    	var form = method._form();
			var Properties = (form.size() > 0) ? '<li><a href="#tab-properties">'+ form.find('label').text() +'</a></li>' : '<li style="display: none;"><a href="#tab-properties">Properties</a></li>';
			
			var html = '<div class="tabs" id="window-form_style">\
										<ul>\
											<li><a href="#tab-colors">Colors</a></li>\
											<li><a href="#tab-fonts">Fonts</a></li>\
											<li><a href="#tab-css">CSS Style</a></li>\
										</ul>\
										<div id="tab-colors"></div>\
										<div id="tab-fonts"></div>\
										<div id="tab-css"></div>\
									</div>';
								
			$('<div>').guifbox({
				title: 'Form Style', 
				status: 'message',
				bgColor: '#FFFFFF',
				opacity: 0,
				body: html,
				overlay: false,
				maxScreen: false,
				saveButton: false,
				cancelButton: false, 
				confirmButton: false
			});
			
			$(".tabs").tabs({
				create: function(event, ui){
				  method.colors();
					$(".ui-tabs-anchor").blur();
				},
				activate: function(event, ui){
					active = $(this).tabs( "option", "active" );
					switch(active){
						case 0:
						  method.colors();
						  break;
						case 1:
						  method.fonts();
						  break;
						case 2:
						  method.css();
						  break;
					}
					
					$(".ui-tabs-anchor").blur();
				}
			});
			
			return false;
		},
    
    tabs_properties: function(selected){
    	var method = this;
    	var options = this.options;
    	var window = (selected >= 0) ? false : true;
    	selected = selected || 0;
    	var form = method._form();
    	
			var tab_group = '<li id="tab-li-group"><a href="#tab-group">Group</a></li>';
			
			var properties = (form.size() > 0) ? '<li id="tab-li-properties"><a href="#tab-properties">'+ form.find('.label').text() +'</a></li>' : '<li style="display: none;"><a href="#tab-properties">Properties</a></li>';
			
			var tab_options = '<li id="tab-li-options"><a href="#tab-options">Options</a></li>';
			
			var tab_items = '<li id="tab-li-items"><a href="#tab-items">Items</a></li>';
			
			var html = '<div class="tabs" id="window-properties">\
										<ul>\
											'+properties+'\
											'+tab_options+'\
											'+tab_group+'\
											'+tab_items+'\
										</ul>\
										<div id="tab-properties"></div>\
										<div id="tab-options"></div>\
										<div id="tab-group"></div>\
										<div id="tab-items"></div>\
									</div>';
									
			if(window == false){			
				$('<div>').guifbox({
					title: 'Properties', 
					status: 'message',
					bgColor: '#FFFFFF',
					opacity: 0, 
					body: html,
					overlay: false,
					close: function(){
						$('#properties').removeClass('on')	
					}
				});
			}
			else{
				if($('#tab-li-properties').size() == 0){
					var html = '<li id="tab-li-properties" class="ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="tab-properties" aria-labelledby="ui-id-7" aria-selected="true">\
												<a href="#tab-properties" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-7">Text Box</a>\
											</li>';
					$('.ui-tabs-nav').prepend(html)
				}
			}
			
			
			$(".tabs").tabs({
				selected: selected, //jquery ui 1.9
				active: selected,
				create: function(event, ui){
					switch(selected){
						case 0:
						  method.properties();
						  method.get_properties();
						  break;
						case 1:
						  method.tab_options();
						  break;
						case 2:
						  method.tab_groups();
						  break;
						case 3:
						  method.tab_items();
						  break;
					}
					
					if(form.hasClass('f_submit')) $('.ui-tabs-nav a:eq(0)').text('Submit Button');
					if(form.hasClass('f_list')) $('.ui-tabs-nav a:eq(0)').text('List');
				},
				activate: function(event, ui){
					active = $(this).tabs( "option", "active" );
					switch(active){
						case 0:
						  method.properties();
						  method.get_properties();
						  break;
						case 1:
						  method.tab_options();
						  break;
						case 2:
						  method.tab_groups();
						  break;
						case 3:
						  method.tab_items();
						  break;
					}
					
					$(".ui-tabs-anchor").blur();
				}
			});
			
			
			(form.hasClass("f_list")) ? $('#tab-li-items').show() : $('#tab-li-items').hide();
			
			(form.hasClass("f_switch") || form.hasClass("f_select") || form.hasClass("f_checkbox") || form.hasClass("f_radio")) ?	$('#tab-li-options').show() : $('#tab-li-options').hide();
			
			($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('#tab-li-group').show() : $('#tab-li-group').hide();
						
			(form.find('.label').text() !== '') ? $('.ui-tabs-nav a:eq(0)').text(form.find('.label').text()) : $('.ui-tabs-nav a:eq(0)').text(form.find(':header').text() || form.find('p').html()); 
			
			if(form.hasClass('f_submit')) $('.ui-tabs-nav a:eq(0)').text('Submit Button');
			
			method.checked();
			
			return false;
    },
    
    tabs_mail: function(selected){
    	var selected = selected;
    	var method = this;
			var html = '<div class="tabs" id="window-email_settings">\
										<ul>\
											<li><a href="#tab-notification">Notification Email</a></li>\
										</ul>\
										<div id="tab-notification"><img style="display: block; margin: 110px auto auto;" src="'+ guiBuilder.images +'guif-loader.gif"></div>\
									</div>';
								
			$('<div>').guifbox({
				title       : 'Email Settings', 
				status      : 'confirm',
				bgColor     : '#FFFFFF',
				opacity     : 0,
				cancelButton: true, 
				closeButton : false,
				body        : html,
				overlay     : false,
				maxScreen   : true,
				saveButton  : true,
				fullScreen : function(status){
					if(status == true){
						var height = $(window).height() - 180;
						$('#tab-notification').css({'max-height': height, 'height': height});
					}
					else{
						$('#tab-notification').css({'max-height': '400px', 'height': 'auto'});
					}
				},
				close : function(){
					$('#mail').removeClass('on');
					$(this).remove();
				},
				drag: function(){
					$('.mce-floatpanel').hide();
				},
				save: function(){
					if(selected == 0){
			    		method.init.notification.notify = $('#tab-notification input[name="notify"]').is(':checked') ? true : false;
			    		method.init.notification.subject = $.trim($('#tab-notification input[name="subject"]').val());
			    		method.init.notification.sender = $.trim($('#tab-notification select[name="sender"]').val());
			    		method.init.notification.mailto = $.trim($('#tab-notification input[name="mailto"]').val());
			    		method.init.notification.message = tinyMCE.get('tinymce-notification').getContent();
			    		//--- END Notification mail tab ------------------>
							$('.tabs').tabs('destroy').tabs();
							$('#mail').removeClass('on');
							$(this).remove();
					}
				}
			});
			
			$(".tabs").tabs({
				selected: selected,
				active: selected,
				create: function(event, ui){
					 method.notification();
				},
				activate: function(event, ui){
					active = $(this).tabs( "option", "active" );
					switch(active){
						case 0:
						  method.notification();
						  break;
					}
					
					$(".ui-tabs-anchor").blur();
				}
			});
			
			return false;
		},
    
    get_properties: function(){
    	var method = this;
    	var form = method._form();
    	
    	//Check visibility
    	(form.hasClass('hidden')) ? $('#p_visible').removeAttr('checked') : $('#p_visible').attr('checked','checked');
    	
			//START Header Required properties --------------------------------------------------------------------------->>
		
			(form.find('.required').size() > 0) ? $('#required').addClass('on') : $('#required').removeClass('on');
			
			if(form.hasClass('f_heading')){
				var header = $.cleanTags(form.find(':header').html(), "span, em, u, blockquote, a, strong, i");
				var text = $.cleanTags(form.find('.sub-text').html(), "span, em, u, blockquote, a, strong, i");
				$("#p_text").val(header.html());
				$("#p_font_size").val(form.find(':header').css('font-size').replace('px', ''));
				$("#p_fonts").val(form.find(':header').css('font-family'));
				$("#p_sub_text").val(text.html());
				$("input[name='p_alignment'][value='"+ form.find('.wrap').css('text-align') +"']").attr('checked','checked');
			}
			
			if(form.hasClass('f_letter')){
				
				var text = '';
				$.each(form.find('p'), function(){
						text += $(this).html()+"\n\n";
				});
				
				var html = $.cleanTags(text, "span, b, strong, i, em, u, br, blockquote, a");
				$("#p_text_content").val(html.html());
				$("#p_font_size").val(form.find('p').css('font-size').replace('px', ''));
				$("#p_line_height").val(form.find('p').css('line-height').replace('px', ''));
				$("#p_fonts").val(form.find('p').css('font-family'));
				$("input[name='p_alignment'][value='"+ form.find('.wrap').css('text-align') +"']").attr('checked','checked');
			}
			
			if(form.hasClass('f_list')){
				$("#p_font_size").val(form.find('li').css('font-size').replace('px', ''));
				$("#p_fonts").val(form.find('li').css('font-family'));
				$("#p_line_height").val(form.find('li').css('line-height').replace('px', ''));
				$("#p_list_type").val(form.find('ul').attr('class'));
			}
			
			if(form.hasClass('f_select')){
				$("#p_default_value").attr("value", form.find("select").attr("data-default"));
			}
			
			//END Header Required properties ------------------------------------------------------------------------------>>
			
			
			//START get Textbox Validation -------------------------------------------------------------------------------->>
			if(form.hasClass('f_text')){
				$(".p_validation[value='"+ form.find('input[type="text"]').attr('class').split('[')[1].split(']')[0] +"']").attr('checked', 'checked');
				($('input', form).attr('data-unique') == 'true') ? $('#p_unique_value').attr('checked','checked') : $('#p_unique_value').removeAttr('checked');
			}
			//END get Textbox Validation ---------------------------------------------------------------------------------->>
			
			if(form.hasClass('f_text') || form.hasClass('f_phone')){
				$('#p_input_mask').val(form.find('input[type="text"]').attr('data-mask'));
			}
			
			//START get Short Description Value --------------------------------------------------------------------------->>
			if(form.find(".short-description").size() > 0){
				var html = $.cleanTags(form.find(".short-description").html(), "span, b, strong, i, em, u, br, blockquote, a");
				$("#p_short_description").val(html.html());
			}
			//END get Short Description Value ----------------------------------------------------------------------------->>
			
			var label = $('<div />').append(form.find(".label").html());
			label.find('.required').remove();
			label = $.cleanTags(label, "span, strong, i, u, em, blockquote");
			$("#p_text_label").val(label.html());
			
			//START get Placeholder and Maxlength Value ------------------------------------------------------------------->>
			if(form.hasClass("f_textarea") || form.hasClass("f_text") || form.hasClass("f_email")){
				$("#p_placeholder").attr("value", form.find("input[type='text'], textarea").attr("placeholder"));
				$("#p_default_value").attr("value", form.find("input[type='text'], select, textarea").attr("data-default"));
				$("#p_max_input").attr("value", form.find("input[type='text'], textarea").attr("maxlength"));
			}
			//END get Placeholder Value ----------------------------------------------------------------------------------->>
		
			//START get textarea height Value ----------------------------------------------------------------------------->>
			if(form.hasClass("f_textarea")){
				$("#p_height").attr("value", form.find("textarea").outerHeight());
			}
			//END get textarea height Value ------------------------------------------------------------------------------->>
			
			
			//START get Width Value --------------------------------------------------------------------------------------->>
			
			$("#p_width").attr("value", form.find(".wrap").outerWidth());
			
			//END get Width Value ----------------------------------------------------------------------------------------->>
			
			//Start getting value for Numbers of Column-------------------------------------------------------------------->>
			if(form.hasClass("f_radio") || form.hasClass("f_checkbox")){	
				var columns = form.find('.f_radio_wrap, .f_checkbox_wrap').attr('class').split('[')[1];
				( columns === undefined) ? $("#p_columns").val(1) : $("#p_columns").val(columns.split(']')[0]);	
				$("#p_options_label").val(form.find('.wrap label').innerWidth());		
			}		
			//END---------------------------------------------------------------------------------------------------------->>
			
			
			//Start getting value for Label Alignment---------------------------------------------------------------------->>
	
			//alert(form.find('.label').css('text-align'))
			$(".p_alignment[value='"+ form.find('.label').css('text-align') +"']").attr('checked', 'checked')
			if(form.hasClass('top-align')) $(".p_alignment[value='top']").attr('checked', 'checked');
			
			//END---------------------------------------------------------------------------------------------------------->>
		
				
			//Start getting value for Label Width-------------------------------------------------------------------------->>
			$('#p_label_width').val(form.find('.label').width())
			
			if(form.hasClass('shrink') || (form.hasClass('shrink') && form.hasClass('expand'))){
				$('#p_label_width').attr('disabled', 'disabled')
				$('#p_label_width').val('')
				$('#p_label_width').spinner( "option", "disabled", true );
			}
			else{
				$('#p_label_width').removeAttr('disabled')
				$('#p_label_width').val(form.find('.label').width())
			}
			//END---------------------------------------------------------------------------------------------------------->>
			
			//Start getting value Spinner max and min---------------------------------------------------------------------->>
			if(form.hasClass('f_spinner')){
				var max = form.find('.ui-spinner-input').attr('data-max');
				var min = form.find('.ui-spinner-input').attr('data-min');
				$('#p_spinner_max').val(max);
				$('#p_spinner_min').val(min);
			}
			//END---------------------------------------------------------------------------------------------------------->>
	
			//$('#p_data_name').val(form.attr('data-name'));
			if(form.hasClass('f_file')){
				$('#p_max_size').val($('input', form).attr('file-maxsize'));
				$('#p_file_extensions').val($('input', form).attr('file-accept'));
				($('input', form).attr('multiple') == 'multiple') ? $('#p_multiple_file').attr('checked','checked') : $('#p_multiple_file').removeAttr('checked');
			}
			
    	if(form.hasClass('f_submit')){
    		var submit = $.cleanTags(form.find("button[type='submit']").html(), "span, strong, i, u");
    		var reset = $.cleanTags(form.find("button[type='reset']").html(), "span, strong, i, u");
    		var load = $.cleanTags(form.find("button[type='submit']").attr('data-loader'), "span, strong, i, u");
    		
				$("#p_submit_text").val(submit.html());
				$("#p_reset_text").val(reset.html());
				$("#p_loading_text").val(load.html());
				$('.p_submit_offset_value span').text(form.find('.f_submit_wrap span').css('margin-left')),
				$(".p_submit_alignment[value='"+ form.find('.f_submit_wrap').css('text-align') +"']").attr('checked', 'checked')
				
				if(form.find("button[type='reset']").size() > 0) $(".p_show_reset[name='reset']").attr('checked', 'checked');
	
				$('#p_submit_offset').slider({
					range: "max",
					min: 0,
					value: form.find('.f_submit_wrap span').css('margin-left').replace('px', ''),
					max: form.width() - form.find('.f_submit_wrap span').width(),
					start: function(event, ui){
						var sum = form.find('.f_submit_wrap span').width();
						form.find('.f_submit_wrap').css('text-align', '')
						$('.p_submit_alignment').removeAttr('checked')
						$(this).slider( "option", "max", form.width() - sum);
					},
					slide: function( event, ui ) {
						$('.p_submit_offset_value span').text(ui.value +'px')
						form.find('.f_submit_wrap span').css('margin-left', ui.value - 1)
					}
				});
			}
			
			$('.prop-value .switch').buttonset();
			
    },
    
    //----------------------------------------- Save Canvas --------------------------------------------------------->>	
		code: function(){
			var method = this;
			var options = this.options;
			if(options.id){
				var link = guiBuilder.preview_url;
				var url = link + options.id;
				var url_js = link +'js/'+ options.id+ ((link.indexOf("?") == -1) ? "?view=text" : "&view=text");
				var height = 0;
				
				$("#canvas .ui-sortable li.ui-draggable").each(function(){
					height += $(this).outerHeight(true);
				});
				 
				var data_source = '';
				$.ajax({
					url: url, 
					dataType: 'HTML',
					type: 'POST',
					success: function(data){
						data = data.replace(/\\/g, '');
						$("#code-source").text($.trim(data));
					}
				})
				
				var data_javascript = '';
				$.ajax({
					url: url_js, 
					dataType: 'HTML',
					type: 'POST',
					success: function(data){
						data = data.replace(/\\/g, '');
						$("#code-javascript").text($.trim(data));
					}
				})
				
				var html = '<div id="window-code">\
											<h2>Form preview link!</h2>\
											<p>This a direct link for your form preview.</p>\
											<input type="text" readonly="readonly" value="'+url+'">\
											<label><input id="ssl-link" type="checkbox">Secure form</label>\
											<div id="window-code-list">\
												<h3>Wordpress</h3>\
												<div>\
													<p><strong>Short Code</strong></p>\
													<input type="text" readonly="readonly" value="[GuiForm id=&quot;'+options.id+'&quot;]"> \
													<br><br><p><strong>Php Code</strong></p>\
													<input type="text" readonly="readonly" value="&lt;?php apply_filters(&#39;the_content&#39;, &quot;[GuiForm id=&#39;'+options.id+'&#39;]&quot;); ?&gt;">\
												</div>\
												<h3>EMBED</h3>\
												<div>\
													<textarea readonly="readonly"><script type="text/javascript" src="'+url_js+'"></script></textarea>\
												</div>\
												<h3>IFRAME</h3>\
												<div>\
													<textarea readonly="readonly"><iframe class="GuiFormIFrame" onload="window.parent.scrollTo(0,0)" allowtransparency="true" src="'+url+'" frameborder="0" style="width:100%; height: '+height+'px; border:none;" scrolling="no"></iframe></textarea>\
												</div>\
												<h3>Source Code</h3>\
												<div>\
													<pre><code><textarea style="height: 150px;" id="code-source" readonly="readonly">'+data_source+'</textarea></code></pre>\
												</div>\
												<h3>Javascript</h3>\
												<div>\
													<textarea style="height: 150px;" id="code-javascript" readonly="readonly">'+data_javascript+'</textarea>\
												</div>\
										</div>';
					
				$('<div>').guifbox({
					title: 'Source Code', 
					status: 'message',
					opacity: 0,
					body: html,
					width: 400,
					overlay: false
				});
				
				$(function(){
					$( "#window-code-list" ).accordion({
						heightStyle: "content"
					});
				});
				
				$("#ssl-link").click(function(){
					if($(this).is(':checked')){
						$("#window-code").find('textarea, input').each( function(){
							var value = $(this).val() || $(this).html();
							$(this).val(value.replace(/http/g, 'https'))
						})
					}
					else{
						$("#window-code").find('textarea, input').each( function(){
							var value = $(this).val() || $(this).html();
							$(this).val(value.replace(/https/g, 'http'))
						})
					}
				})
			}
			else{
				method.save('code');
			}
		},
		
		data: function(){
			var options = this.options;
			var method = this.init;
			
			guiform.id = options.id;
			guiform.database = options.database;
			guiform.title = $.trim($('#formName').val());
			
			guiform.notification = {};
			guiform.notification["notify"]  = method.notification["notify"];
			guiform.notification["subject"] = method.notification["subject"];
			guiform.notification["sender"]  = method.notification["sender"];
			guiform.notification["mailto"]  = method.notification["mailto"];
			guiform.notification["message"] = method.notification["message"];
			
			guiform.autoresponse = {};
			guiform.autoresponse["response"] = "";
			guiform.autoresponse["subject"]  = "";
			guiform.autoresponse["sender"]   = "";
			guiform.autoresponse["mailto"]   = "";
			guiform.autoresponse["message"]  = "";
			
			guiform.thank_you = {};
			guiform.thank_you["checked"] = method.thank_you["checked"];
			guiform.thank_you["url"]     = method.thank_you["url"];
			guiform.thank_you["message"] = method.thank_you["message"];
			
			var object = {};
			$.each(guiform, function(key, value){
				object[key] = value;
			});
			
			var data = {
							'action' : 'guiform_save_init', 
							'init'   : object,
							'id'     : guiform.id
						};
						
			$.ajax({
					url: ajaxurl,
					data: data,
					dataType: 'json',
					cache: false,
					async: false,
					type: 'POST'
				})
		},
		
		save: function(action){
			
			var options = this.options;
			var method = this;
 			var action = action || false;
 			
			var error = $('.ui-sortable .error').size() || 0;
			var form = $('.ui-sortable .ui-draggable:not(.ui-sortable .ui-draggable.merge), .ui-sortable .merge-item');
			var canvas = $('#container').html();
			$('#save').addClass('saving');
			
			if(form.size() == 0){
				$('#save').removeClass('saving');
				$('<div>').guifbox({title: 'message', status: 'message', body: '<p>Build your form first.</p>'});
				return false;
			}
			else if(error > 0){
				$('#save').removeClass('saving');
				$('<div>').guifbox({title: 'error', status: 'error', body: '<p>An error occurred please check your form...</p>'});
				return false;
			}
			else{
				var data = {};
				var title = $.trim($('#formName').val());
				var exclude = ['f_submit'];
				
				$('#canvas .switch').buttonset('destroy');
				$('#canvas .ui-spinner-input').spinner('destroy');
				
				var canvas = $("<div />").append($('#container').clone())
				
				$(canvas).find('.ui-resizable-handle').remove();
				$(canvas).find('select').replaceTag('<guiform>', true);
				
				var html = $("<div />").append($('#canvas').clone());
				$(html).find('#canvas').removeAttr('class').css({'height':'','top':'','left':''});
				$(html).find('input, select, textarea').removeAttr('data-type');
				$(html).find('.active').removeClass('active');
				$(html).find('#canvas').css('width', $(html).find('#canvas').width() - 30);
				$(html).find('li').removeClass('ui-draggable').removeAttr('data-name data-type');
				$(html).find('.ui-sortable').css('min-height','').removeClass('ui-state-default ui-droppable ui-sortable');
				$(html).find('.ui-draggable').removeAttr('style data-name');
				$(html).find('.ui-resizable-handle').remove();
				$(html).find('select').replaceTag('<guiform>', true);
				
				$.each(form, function(){
					if(!$(this).hasClass('f_confirm_password') && !$(this).hasClass('f_list') && !$(this).hasClass('f_submit') && !$(this).hasClass('f_heading')  && !$(this).hasClass('f_letter')){
						var name = $(this).attr("data-name");
						var type = this.className.match(/(\bf_)\S*/g);
						var label = $('.label', this).text().replace('*', '');
						var dataType = $(this).attr('data-type');
						var required = ($('.required', this).size() > 0) ? true : false;
						data[this.id] = {name: name, 
														 type: type[0],
														 label: label,
														 properties: {dataType: dataType},
														 validation: {required: required}
													  };
						if(type == 'f_email'){
							data[this.id].validation.text = $('input', this).attr('class').split('[')[1].split(']')[0];
							data[this.id].validation.unique = true;
						}
						else if(type == 'f_text'){
							var maxlength = $('input', this).attr('maxlength');
							data[this.id].validation.text = $('input', this).attr('class').split('[')[1].split(']')[0];
							data[this.id].validation.maxlength = (maxlength === undefined || maxlength <= 0) ? false :  parseInt(maxlength);
							data[this.id].validation.unique = ($('input', this).attr('data-unique') == "true") ? true : false;
						} 
						else if(type == 'f_file'){
							data[this.id].validation.extension = $.map($('input', this).attr('file-accept').split(","), function(index){
							  return $.trim(index);
							});
							data[this.id].validation.maxsize =  $('input', this).attr('file-maxsize');
							data[this.id].properties["multiple"] = $('input', this).hasAttr('multiple') ? true : false;
						}						 
					}
				})
				
				var data = {
							'action' : 'guiform_save_form', 
							'title'  : title,
							'data'   : data,
							'canvas' : encodeURIComponent(canvas.html()),
							'html'   : encodeURIComponent(html.html()),
							'id'     : options.id
						};
						
				$.ajax({
					url: ajaxurl,
					data: data,
					dataType: 'JSON',
					cache: false,
					async: true,
					type: 'POST',
					beforeSend: function(){
						method.autoSave();
						$('#canvas .switch').buttonset();
						$('#canvas .ui-spinner').each( function(){
							var max = $(this).attr('data-max');
							var min =  $(this).attr('data-min');
							$(this).spinner({ max: max, min: min });
						})
					},
					success:function(data){					
						options.id = data.id;
						method.data();
						$('#save').removeClass('saving')
						if(data.status == "error"){
							$('<div>').guifbox({title: data.status, status: data.status, body: '<p>'+ data.message +'</p>'});
						}
						else if(action == 'preview'){
							var width = $('#containment').innerWidth();
							var height = $('body').height() - 80;
							options.screenPreview = width;
							var url = ajaxurl+"?action=guiform_form_preview&height="+height+"&width="+width+"&id="+data.id;
							$('#guifbox').remove();
							$("#window-preview").attr('href', guiBuilder.preview_url+data.id).trigger('click');
							$("#thickbox-preview").attr('href', url).trigger('click');
						}
						else if(action == 'code'){
							method.code();
						}
						else if(action == 'autosave'){
							return false;
						}
						else{
							$('<div>').guifbox({title: 'message', status: 'message', body: '<p>'+ data.message +'</p>'});
						}
					}
				})
			}
		},
		
		create: function(){
			location.href = location.href.split("&")[0];
		},
		
		preview_screen: function(value){
			var screen = [this.options.screenPreview, 240, 320, 480];
			var left = screen[value] / 2;
			
			if(value == 0){
				$("#TB_window iframe").contents().find("#responsive-style").remove();
			}
			else if(value > 0 && value < 4){
				$("#TB_window iframe").contents().find("#responsive-style, .error-message").remove();
				$("#TB_window iframe").contents().find("head").append('<link id="responsive-style" media="all" type="text/css" href="'+ guiBuilder.plugins_url +'css/responsive.css" rel="stylesheet">');
			}
			else{
				$("#window-preview").get(0).click();
			}
			$("#TB_window").animate({marginLeft : -left, width : screen[value]}, 400);
		},
		
		preview: function(){
			if($('#ui-sortable .ui-draggable').size() > 0)
				alert('Create your form first.')
			else
				this.save('preview');
		},
		
		merge: function(event, data){
			var options = this;
			if($('#canvas .ui-draggable.selected').size() < 2){
				$('<div>').guifbox({title: 'message', status: 'message', body: '<p>Select atleast two item by holding down CTRL + Left Click to the field.</p>'});
			}
			else{
				var container = $("<div />");
				$('#canvas .selected:not(#canvas .merge), #canvas .selected .merge-item').each(function(){
					$('.switch', $(this)).buttonset('destroy');
					$('.ui-spinner-input', $(this)).spinner('destroy');
					$(this).removeClass('merge-item')
					var prop = $(this).attr('class');
					var id = $(this).attr('id');
					var dataName = $(this).attr('data-name');
					var dataType = $(this).attr('data-type');
					$(container).append("<div id='"+ id +"' data-type='"+dataType+"' data-name='"+dataName+"' class='merge-item "+prop+"'>"+$(this).html()+"</div>")
				})
				
				$(container).find('.selected').removeClass('selected ui-draggable')
				
				//var container = $("<div />").append($(container).clone())
				$('#canvas .selected:eq(0)').attr('id', 'item-merge-'+ String(Math.random()).substring(2,8))
				$('#canvas .selected:eq(0)').removeClassRegEx(/^f_/).removeAttr('data-name')
				$('#canvas .selected:eq(0)').removeClass('shrink')
				$('#canvas .selected:eq(0)').html(container.html()).removeClass('selected').addClass('active merge');
				$('#canvas .active.merge').find('.merge-item:eq(0)').addClass('active')
				
				$('#canvas .active.merge').find('.switch').each(function(){
					$(this).buttonset();
				});
				
				$('#canvas .active.merge').find('.ui-spinner').each(function(){
					var max = $(this).attr('data-max');
					var min =  $(this).attr('data-min');
					$(this).spinner({ max: max, min: min });
				});
				
				$('#canvas .active.merge').find('.f_phone').each(function(){
						var mask = $(this).find('input').attr('data-mask');
						$(this).find('input').mask(mask);
				});
				
				$('#canvas .selected').remove()
				options.tabs_properties();
			}
			options.checked();
		},
	
		remove: function(reload, item){
			
			var form;
			var method = this;
			reload = (reload == false) ? false : true;
			var active = $('.ui-sortable li.ui-draggable.active');
			var activeMerge = $('.ui-sortable .ui-draggable.merge.active');
			
			if(item !== undefined){
				form = item;
				active = (active.find('.merge-item.active').size() > 0) ? $('.ui-sortable li.ui-draggable.active .merge-item.active') : $('.ui-sortable li.ui-draggable.active');
				active.removeClass('active');
			}
			else if(active.hasClass('merge')){
				form = (active.find('.merge-item.active').size() > 0) ? $('.ui-sortable li.ui-draggable.active .merge-item.active') : $('.ui-sortable li.ui-draggable.active');
			}
			else{
				form = $("#canvas .ui-draggable.active");
			}
			
		  var index = (active.hasClass('merge')) ? $('.ui-sortable .ui-draggable.merge.active').index(form) : $('.ui-sortable .ui-draggable').index(form);
			
			if($('.ui-sortable li.ui-draggable.active').hasClass('merge'))
				var indexSize = $('.ui-sortable .merge.active .merge-item').size() - 1;
			else
				var indexSize = $('.ui-sortable .ui-draggable').size() - 1;
			
			if(form.size() > 0){					
				form.addClass('removed-item');
				form.slideUp(800, function(){
					
					if($('.ui-sortable li.ui-draggable.active').hasClass('merge') && $(this).parent().find('.item').size() == 1) $(this).parent().remove();
					
	    		$(this).remove();
	    		
	    		if($('.ui-sortable li.ui-draggable.active').hasClass('merge')){
	    			
	    			if(index < indexSize){
	    				$('.ui-sortable .merge.active .merge-item:eq('+ index +')').addClass('active');		
		    		}
		    		else if(indexSize == 0){	
		    			$('.ui-sortable .merge.active').remove();
		    			$('.ui-sortable .ui-draggable:eq('+ index +')').addClass('active');
		    			if($('.ui-sortable li.ui-draggable.active').hasClass('merge')) $('.ui-sortable .merge.active .merge-item:eq(0)').addClass('active');
		    		}
	    		}
	    		else{
	    			if(index < indexSize){
	    				$('.ui-sortable .ui-draggable:eq('+ index +')').addClass('active');		
		    		}
		    		else{
		    			$('.ui-sortable .ui-draggable:eq(0)').addClass('active');	
		    		}
		    		
		    		if($('.ui-sortable li.ui-draggable.active').hasClass('merge')) $('.ui-sortable .merge.active .merge-item:eq(0)').addClass('active');
		    			
	    		}
	    		
	    		if($('#window-properties').size() !== 0){
	    			if($('.ui-sortable li').size() == 0){
	    				$('#guifbox').remove()
	    			}
	    			else{
	    				if(reload) method.tabs_properties();
	    			}    		
	    		}
	    		
	    		if(reload && $('#canvas .item').size() > 0){
	    			method.properties();
	    			method.get_properties();
	    		}
	    		
	    		method.checked();
	    	})
	    }
	    
			return false;
		},
		
		required: function(event, data){
			var method = this;
			var form = method._form();	
			if(form.size() > 0 && form.hasClass('f_submit') == false){
				if($(data).hasClass('on')){
					form.find('.required').remove()
					$(data).removeClass('on')
				}
				else{
					form.find('.label').append("<span class='required'>*</span>")
					$(data).addClass('on')
				} 
			}
		
		},
		
		color_picker: function(){
			var text = $("#guiform-style").text().replace( /\s\s+/g, '' );
			
			var backgroundColor = text.split("background-color:")[1].split(';')[0];
			var labelColor = text.split(".label{color:")[1].split(';')[0];
			var borderColor = text.split("border:")[1].split(';')[0].split(" ")[3];
			
			$('.basic').guifcolor({
		    showInput: true,
	     	className: 'colorpicker',
	     	appendTo: "parent",
	     	chooseText: "Ok",
	     	showInitial: true,
	     	preferredFormat: "hex6",
		    beforeShow: function(color){
		    	var id = this.id;
			  	if(id == 'color') $(this).guifcolor("set", labelColor); // #ff0000
			  	if(id == 'borderColor') $(this).guifcolor("set", borderColor); // #ff0000
			  	
			  	if(id == 'backgroundColor') $(this).guifcolor("set", backgroundColor); // #ff0000
					$('.guif-cancel, #transparent-wrapper').remove();
					if(id == 'backgroundColor') $('.guif-button-container').append('<span id="transparent-wrapper"><input type="checkbox" class="transparent" name=""><label>Transparent</label></span>');
				},
			  show: function(color) {
			  	var transparent = $("#guiform-style").text().split("background-color: ")[1].split(';')[0];
			  	
			  	if(transparent == 'transparent' || transparent == 'rgba(0, 0, 0, 0)'){
			  		$('.transparent').attr('checked','checked');
			  	}
			  	else{
			  		$('.transparent').removeAttr('checked');
			  	}
			  	
	        $('.transparent').click(function(){
	        	
	        	var text = $("#guiform-style").text().replace( /\s\s+/g, '' );
	        	
	        	var backgroundColor = text.split("background-color: ")[1].split(';')[0];
	        	
						if($(this).is(':checked')){
							$("#guiform-style").text($("#guiform-style").text().replace(backgroundColor, 'transparent'))
							$('.guif-active .guif-preview-inner').css('background-color', 'transparent');
							$('.guif-input').val('transparent')
						}
						else{
			  		  $("#guiform-style").text($("#guiform-style").text().replace(backgroundColor, '#FFFFFF'))
							$('.guif-active .guif-preview-inner').css('background-color', '#FFFFFF');
							$('.guif-input').val('#FFFFFF')
							$('.guif-dragger').css({'top':0, 'left':0})
						}
					})
					
					$('.guif-choose').click(function(){
						$('#header .wrapper').remove();
						$('.menu-button').parent().removeClass('active');
					});
	      },
			  move: function(color) {
			  	var id = this.id;
			  	var text = $("#guiform-style").text().replace( /\s\s+/g, '' );
			  	
			  	$('.transparent').removeAttr('checked');
			  	
			  	if(id == 'color'){
			  		var label = text.split(".label{color: ")[1].split(';')[0];
			  		$("#guiform-style").text($("#guiform-style").text().replace(label, color.toHexString()))
			  	}
			  	else if(id == 'backgroundColor'){
			  		var backgroundColor = text.split("background-color: ")[1].split(';')[0];
			  		$("#guiform-style").text($("#guiform-style").text().replace(backgroundColor, color.toHexString()))
			  	}
			  	else if(id == 'borderColor'){
			  		var borderColor = text.split("border: ")[1].split(';')[0].split(" ")[2];
			  		$("#guiform-style").text($("#guiform-style").text().replace(borderColor, color.toHexString()))
			  	}
				}
			})
		},
		
		colors: function(event, data){
			$('#header li').removeClass('on')
			$('#header #colors').addClass('on')
			var text = $("#guiform-style").text().replace( /\s\s+/g, '' );
			
			var backgroundColor = text.split("background-color:")[1].split(';')[0];
			var labelColor = text.split(".label{color:")[1].split(';')[0];
			var borderColor = text.split("border:")[1].split(';')[0].split(" ")[3];
			
			var html = "<table style='width: 285px;' cellspacing='0' cellpadding='4'>\
										<tbody>\
											<tr>\
												<td class='prop-label' style='width: 75%; font-weight: normal;'>Background Color</td>\
												<td class='prop-value' align='center'><input type='text' id='backgroundColor' class='basic' value='"+backgroundColor+"' /></td>\
											</tr>\
											<tr>\
												<td class='prop-label' style='font-weight: normal;'>Label Color</td>\
												<td class='prop-value' align='center'><input type='text' id='color' class='basic' value='"+labelColor+"' /></td>\
											</tr>\
											<tr>\
												<td class='prop-label' style='font-weight: normal;'>Border Color</td>\
												<td class='prop-value' align='center'><input type='text' id='borderColor' class='basic' value='"+borderColor+"' /></td>\
											</tr>\
										</tbody>\
									</table>";
			
			$('.tabs #tab-colors').html(html)
			this.color_picker();
			this.checked();
		},
		
		fonts: function(event, data){
			$('#header li').removeClass('on')
			$('#header #fonts').addClass('on')
			var font = $("#guiform-style").text();
			font = font.split("font-family: ")[1].split(';')[0];
			var html = "<div id='fonts-container' class='wrapper'><ul class='list'>";
			$.each($.guiform.Fonts, function(key, value){
				if(font.split(',')[0].replace(/['", ]/g,'')  ==  value.split(',')[0].replace(/['", ]/g,''))
					html += "<li class='list active' style='font-family: "+ value +";' data-value='"+ value +"'>"+ key +"</li>";
				else
					html += "<li class='list' style='font-family: "+ value +";' data-value='"+ value +"'>"+ key +"</li>";
			})
			html += "</ul></div>";
			$('.tabs #tab-fonts').html(html)
			this.checked();
		},
		
		font_property: function(){
			var form = this._form();
			var html = "<select name='' id='p_fonts'>";
			var font = form.find(':header, p, li').css('font-family');
			$.each($.guiform.Fonts, function(key, value){
				if(font.replace(/'/g, '') == key.replace(/'/g, ''))
					html += "<option selected='selected' style='font-family: "+ value +";' data-value='"+ value +"'>"+ key +"</option>";
				else
					html += "<option style='font-family: "+ value +";' data-value='"+ value +"'>"+ key +"</option>";
			})
			html += "</select>";
			return html;
		},
		
		css: function(event, data){
			
			var html = "<div><p>Start your CSS code with <strong>#canvas</strong> selector.</p><textarea id='guiform-canvas'></textarea></div>";
			$('.tabs #tab-css').html(html)
			
			$(this.element[0]).addClass('guiEditable').attr('contenteditable', true).css({})
    	if($('#guiform-form').size() == 0){
    		$("<style type='text/css' id='guiform-form' media='all'></style>").insertAfter("#guiform-style")
    	}
    	else{
				$('#guiform-canvas').val($('#guiform-form').text())
    	}
    	
			this.checked();
		},
		
		properties: function(event, data){
			var fields;
			var method = this;
			var form = method._form();
			
			if(form.hasClass("f_switch") || form.hasClass("f_select") || form.hasClass("f_checkbox") || form.hasClass("f_radio"))
				$("#tab-li-options").show();
			else
				$("#tab-li-options").hide();
			
			$('.ui-sortable li.ui-draggable.active').hasClass('merge') ?	$("#tab-li-group").show() :	$("#tab-li-group").hide();
			
			if(form.hasClass("f_heading"))
				fields = ['Visible', 'Text', 'Sub Text', 'Text Alignment', 'Font Family', 'Font Size'];	
			else if(form.hasClass("f_letter"))
				fields = ['Visible', 'Text Content', 'Width', 'Text Alignment', 'Font Family', 'Font Size', 'Line Height'];
			else if(form.hasClass("f_list"))
				fields = ['Visible', 'Width', 'List Type', 'Font Family', 'Font Size', 'Line Height'];
			else if(form.hasClass("f_text"))
				fields = ['Visible', 'Label', 'Input Mask', 'Unique Value', 'Label Width', 'Default Value', 'Placeholder', 'Short Description', 'Validation', 'Width', 'Maximum Input'];
			else if(form.hasClass("f_textarea"))
				fields = ['Visible', 'Label', 'Label Width', 'Placeholder', 'Default Value', 'Short Description', 'Height', 'Width'];
			else if(form.hasClass("f_select"))
				fields = ['Visible', 'Label', 'Label Width', 'Default Value', 'Short Description', 'Width'];
			else if(form.hasClass("f_radio") || form.hasClass("f_checkbox"))
				fields = ['Visible', 'Label', 'Label Width', 'Option Columns', 'Width', 'Options Text Width'];
			else if(form.hasClass("f_submit"))
				fields = ['Visible', 'Submit Text', 'Reset Text', 'Loading Text', 'Submit Alignment','Show Reset Button', 'Offset'];
			else if(form.hasClass("f_file"))
				fields = ['Visible', 'Label', 'Label Width', 'Short Description', 'Width', 'Allow Multiple Upload', 'File Extentions', 'Max File Size'];
			else if(form.hasClass("f_password"))
				fields = ['Visible', 'Label', 'Label Width', 'Short Description', 'Width'];
			else if(form.hasClass("f_confirm_password"))
				fields = ['Visible', 'Label', 'Label Width', 'Short Description', 'Compare With', 'Width'];
			else if(form.hasClass("f_phone"))
				fields = ['Visible', 'Label', 'Input Mask', 'Label Width', 'Short Description', 'Width'];
			else if(form.hasClass("f_email"))
				fields = ['Visible', 'Label', 'Label Width', 'Placeholder', 'Default Value', 'Short Description', 'Width', 'Maximum Input'];
			else if(form.hasClass("f_spinner"))
				fields = ['Visible', 'Label', 'Label Width', 'Short Description', 'Maximum Value', 'Minimum Value', 'Width'];
			else if(form.hasClass("f_switch"))
				fields = ['Visible', 'Label', 'Label Width', 'Short Description', 'Width'];
			
			this.buildProperties(fields);
			this.checked();	
		},
		
		tab_groups: function(){
			var method = this;
			var form = $('.ui-sortable .merge.active');
			var html = '';
			
			form.find('.merge-item').each( function(){
				var id   = this.id;
				var text = '';
				
				if($(this).find('.label').size() > 0)
					text = $(this).find('.label').text();
				else if($(this).hasClass('f_list'))
					text = "List";
				else if($(this).hasClass('f_submit'))
					text = "Submit Butto";
				else if($(this).hasClass('f_heading'))
					text = "Header";
				else if($(this).hasClass('f_letter'))
					text = "Letter";
				
				html += "<li id='li-"+id.split('-')[1]+"' class='clearfix'>\
				          <span class='label'>"+text+"</span>\
									<span data-icon='&#xe08c;' class='move'></span>\
									<span data-icon='&#xe093;' class='delete'></span>\
								 </li>";
			})
			
			$('#tab-group').html("<ul id='group-list'>"+html+"</ul>")
			
			var index;
			$('#group-list').sortable({
				axis: 'y',
				forcePlaceholderSize: true,
				forceHelperSize: true, 
				opacity: 0.9,
				scroll: true, 
				handle: '.move',
				scrollSensitivity: 5,
				scrollSpeed: 5,
				placeholder: 'ui-state-highlight',
				revert: true,
				tolerance: "pointer",
				beforeStop: function( event, ui ){
					index = $(ui.helper).index();
					var form = $('.ui-sortable .merge.active');
					var id  = 'item-'+ $(ui.item).attr('id').split('-')[1];
					
					if($('#'+id).hasClass('f_spinner')){
						$('#'+id).find('.ui-spinner-input').spinner('destroy')
					}
					
					if($('#'+id).hasClass('f_switch')){
						$('#'+id).find('.switch').buttonset('destroy')
					}
					
					var item = form.find('#'+id).clone();
					var size = $('#group-list li').size()
					form.find('#'+id).remove();
					
					(index == (size-2)) ? form.append(item) : $('div.merge-item:eq('+index+')', form).before(item);
					
					if($('#'+id).hasClass('f_spinner')){
						var max = $('#'+id).find('.ui-spinner').attr('data-max');
						var min =  $('#'+id).find('.ui-spinner').attr('data-min');
						$('#'+id).find('.ui-spinner').spinner({ max: max, min: min });
					}
					
					if($('#'+id).hasClass('f_switch')){
						$('#'+id).find('.switch').buttonset()
					}
					
					if($('#'+id).hasClass('f_phone')){
						var mask = $('#'+id).find('input').attr('data-mask');
						$('#'+id).find('input').mask(mask);
					}
				}
			})
			
			$(document).on('click', '#group-list .delete', function(){
				var parent = $(this).parent();
				parent.slideUp('slow', function(){$(this).remove()});
				$(".merge-item:eq("+parent.index()+")", form).hide("slow", function(){
					$(this).remove()
					if($(".merge-item", form).size() == 0) method.remove(true);	
				});
			})
			
			this.checked();
		},
		
		tab_items: function(){
			var method = this;
			var form = method._form();	
			var html = '';
			
			form.find('li').each( function(){
				var text = this.innerHTML;
				
				html += "<li class='clearfix'>\
				          <span class='label'><input class='items-list-li' type='text' value='"+text+"'></span>\
									<span data-icon='&#xe08c;' class='move'></span>\
									<span data-icon='&#xe004;' class='add'></span>\
									<span data-icon='&#xe093;' class='delete'></span>\
								 </li>";
			})
			
			html += '<div style="text-align: right; margin-bottom: 10px;">\
								<a onclick="return false;" href="javascript:void(0);" class="button-primary" id="save-items">Save</a>\
							</div>';
			
			$('#tab-items').html("<ul id='items-list'>"+html+"</ul>")
			
			var item;
			var clone;
			$('#items-list').sortable({
				axis: 'y',
				forcePlaceholderSize: true,
				forceHelperSize: true, 
				opacity: 0.9,
				scroll: true, 
				handle: '.move',
				scrollSensitivity: 5,
				scrollSpeed: 5,
				placeholder: 'ui-state-highlight',
				revert: true,
				tolerance: "pointer"
			})
			
			$(document).on('click', '#items-list .delete', function(){
				var parent = $(this).parent();
				parent.slideUp('slow', function(){$(this).remove()});
			}).on('click', '#items-list .add', function(){
				var index = $('#items-list li').index($(this).parent());
				var html = "<li class='clearfix'>\
					          <span class='label'><input class='items-list-li' type='text' value='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'></span>\
										<span data-icon='&#xe08c;' class='move'></span>\
										<span data-icon='&#xe004;' class='add'></span>\
										<span data-icon='&#xe093;' class='delete'></span>\
									 </li>";
				$('#items-list li:eq('+index+')').after(html);
				$('#items-list .selected').slideDown('slow', function(){$(this).removeClass('selected')});
			});
			
			this.checked();
		},
		
		tab_options: function(){
			var method = this;
			var form = method._form();	
			var item = '';
			if(form.hasClass("f_select")){
				form.find("select option").each( function(){
					var value = $(this).attr("value");
					var text = $(this).html();
					var checked = ($(this).is(":selected")) ? '<input checked="checked" type="radio" name="checked">' : '<input type="radio" name="checked">';
					if(value == text){
						item += '<li>'+checked+'<input type="text" name="label" value="'+value+'">\
												<input type="text" name="value" value="'+value+'">\
												<span data-icon="&#xe08c;" class="move"></span>\
											  <span data-icon="&#xe004;" class="add"></span>\
											  <span data-icon="&#xe093;" class="delete"></span>\
											</li>';
					}
					else{
						item += '<li>'+checked+'<input type="text" name="label" value="'+text+'">\
												<input type="text" name="value" value="'+value+'">\
												<span data-icon="&#xe08c;" class="move"></span>\
											  <span data-icon="&#xe004;" class="add"></span>\
											  <span data-icon="&#xe093;" class="delete"></span>\
											</li>';
					}
				})
			}
			
			if(form.hasClass("f_switch")){
				$("input", form).each( function(){
					var list = $("<div>");
					var value = $(this).val();
					var text = $(this).parent().find("label[for='"+$(this).attr('id')+"'] .ui-button-text").html();
					var checked = ($(this).is(":checked")) ? '<input checked="checked" type="radio" name="checked">' : '<input type="radio" name="checked">';
					if(value == text){
							list.append('<li>'+checked+'<input type="text" name="label" value="">\
														<input type="text" name="value" value="'+value+'">\
														<span data-icon="&#xe08c;" class="move"></span>\
											      <span data-icon="&#xe004;" class="add"></span>\
											      <span data-icon="&#xe093;" class="delete"></span>\
													 </li>');
					}
					else{
						list.append('<li>'+checked+'<input type="text" name="label" value="">\
													<input type="text" name="value" value="'+value+'">\
													<span data-icon="&#xe08c;" class="move"></span>\
										      <span data-icon="&#xe004;" class="add"></span>\
										      <span data-icon="&#xe093;" class="delete"></span>\
											 	</li>');
					}
					list.find("input[name='label']").attr("value", text);
					item += list.html();
				})
			}
			//END get Width Value ----------------------------------------------------------------->>
			
			
			//Start getting value for radio and checkbox----------------------------------------------------------------->>
			if(form.hasClass("f_radio") || form.hasClass("f_checkbox")){
				var option = '';
				$.each($(".wrap label", form), function(){
					var value = $('input', this).val();
					var text = $('span', this).text();
					var checked = ($(this).find('input').is(":checked")) ? '<input checked="checked" type="radio" name="checked">' : '<input type="radio" name="checked">';
					if(value == text){
						item += '<li>'+checked+'<input type="text" name="label" value="'+value+'">\
												<input type="text" name="value" value="'+value+'">\
												<span data-icon="&#xe08c;" class="move"></span>\
											  <span data-icon="&#xe004;" class="add"></span>\
											  <span data-icon="&#xe093;" class="delete"></span>\
											</li>';
					}
					else{
						item += '<li>'+checked+'<input type="text" name="label" value="'+text+'">\
												<input type="text" name="value" value="'+value+'">\
												<span data-icon="&#xe08c;" class="move"></span>\
											  <span data-icon="&#xe004;" class="add"></span>\
											  <span data-icon="&#xe093;" class="delete"></span>\
											</li>';
					}
				})
			}
			
			var html = '<ul id="visual-text"><li class="active">Visual</li></ul>';
		  html += '<table style="width: 680px;" cellspacing="0" cellpadding="4">\
		  				 <thead><tr>\
									<th style="width: 160px;">Extra Options</th>\
									<th style="width: 190px;">Label</th>\
									<th style="border-right: medium none;">Value</th>\
									<th style=""></th>\
							 </tr></thead>';
			
			html += '<tr><td style="padding: 0px;"><ul id="bulk-options">';
			
			var list = form.hasClass("f_switch") ? this.options.Icons : this.options.Options;
			$.each(list, function(key, value){
				html += "<li>"+key+"</li>";
			});
			
			html += '</ul></td><td colspan="3" style="vertical-align: top;padding: 0px;">\
								 <ul id="options-list">'+item+'</ul>\
							 </td></tr></table>';
							 
			html += '<div style="text-align: right; margin-bottom: 10px;">\
								<a onclick="return false;" href="javascript:void(0);" class="button-primary" id="clear-options">Clear Options</a>\
								<a onclick="return false;" href="javascript:void(0);" class="button-primary" id="save-options">Save</a>\
							</div>';				 
						 
			$('#tab-options').html(html)
			
			$('#options-list').sortable({
				axis: 'y',
				forcePlaceholderSize: true,
				forceHelperSize: true, 
				opacity: 0.9,
				scroll: true, 
				handle: '.move',
				scrollSensitivity: 5,
				scrollSpeed: 5,
				placeholder: 'ui-state-highlight',
				revert: true,
				tolerance: "pointer"
			})
			
			this.checked();
		},
		
		rebuild_options: function(){
    	var method = this;
    	var form = method._form();
			method.build_options();
			if(form.hasClass("f_radio") || form.hasClass("f_checkbox")){
				var columns = form.find('.f_radio_wrap, .f_checkbox_wrap').attr('class').split('[')[1];
				columns = (columns === undefined) ? 1 : columns.split(']')[0];
				method.options_column(columns);	
			}
		},
		
		build_options: function(){
			
			var html = '';
			var options = this.options;
			var method = this;
			var form = method._form();
			var name = $('.ui-sortable li.ui-draggable.active').attr('data-name');
			var data = $('select, input', form).attr('data-type');
					
			$('#options-list li').each(function(){
				
				var label = $.trim($('input[name="label"]', this).val());
				var value = $('input[name="value"]', this).val();
				var checked = $('input[name="checked"]', this).is(':checked');
			  value = $.trim(value.replace(/<\/?[^>]+(>|$)/g, ""));
				
				checked = (checked) ? 'checked="checked"':'';
			
				if(form.hasClass("f_select")){
					checked = (checked) ? 'selected="selected"':'';
					html += "<option "+checked+" value='"+ value +"'>"+ label +"</option>";
					form.find("select").html(html)
				}
				
			  if(form.hasClass("f_radio")){
					html += "<label><input "+checked+" data-type='"+data+"' name='"+ name +"' type='radio' value='"+ value +"'><span>"+ label +"</span></label>";
					form.find(".f_radio_wrap").html(html)
				}
				
				if(form.hasClass("f_checkbox")){
					html += "<label><input "+checked+" data-type='"+data+"' name='"+ name +"[]' type='checkbox' value='"+ value +"'><span>"+ label +"</span></label>";
					form.find(".f_checkbox_wrap").html(html)
				}
				
				if(form.hasClass("f_switch")){
					var id = 'switch-'+ String(Math.random()).substring(2,8);
					html += "<input id='"+id+"' type='radio' "+checked+" value='"+value+"' name='"+name+"' /><label for='"+id+"'>"+label+"</label>";
				}
			})
			
			if(form.hasClass("f_switch")){
				html = $("<div class='switch'>").append(html);
				form.find(".wrap").html(html.clone())
				form.find(".switch").buttonset();
			}
			
			alert('Save options!')
		},
		
		buildProperties: function(data){
			var method = this;
			var html = '';
			
			html += '<table cellspacing="0" cellpadding="4">';
			$.each(data, function(){
				html += "<tr><td style='width:200px;' class='prop-label'>"+this+"</td><td class='prop-value'>"+ ((this == 'Font Family') ? method.font_property() : method.options.Properties[this])+"</td><tr>";
			});
			html += '</table>';
			
			$('#tab-properties').html(html);
			$('.prop-spinner').spinner({ min: 0,  numberFormat: "n"});
			$('#header li').removeClass('on')
			$('#header #properties').addClass('on')
			
			this.checked();
		},
		
		notification: function(){
			$('#header li').removeClass('on')
			$('#header #mail').addClass('on')
			var options = this.options;
			var method = this;
			
			$.ajax({
				dataType: 'html',
				cache: false,
				beforeSend: function(){
					$("#tab-notification").html('<img style="display: block; margin: 110px auto auto;" src="'+ guiBuilder.images +'guif-loader.gif">');
								
					var subject = (method.init.notification.subject == '') ? 'Notification: '+ guiform.title : method.init.notification.subject;
				
					var html = "<div style='margin-bottom: 15px;'>\
							<p class='loader' style='text-align: center;'><img src='"+ guiBuilder.images +"guif-loader.gif'></p>\
							<table style='border: none; display: none; margin-bottom: 0px;'><tr>\
							<td style='padding: 0; background-color: #EAF2FA; width: 200px;'><ul class='variable-fields' style='margin: 0 10px 0 0;'></ul></td>\
							<td style='padding: 10px; border: 1px solid #21759B;'>\
								<ul class='form'>\
									<li><label>Notify: </label><input type='checkbox' value='true' name='notify' style='margin: 0;'> <span>Send notification via email after form submission.</span></li>\
									<li><label>Subject: </label><input class='caret' type='text' value='"+method.init.notification.subject+"' name='subject'></li>\
									<li><label>Sender: </label>"+$.guiform.emails('sender')+"</li>\
									<li><label>Mail To: </label><input class='caret' type='text' value='"+method.init.notification.mailto+"' name='mailto'></li>\
								 	<li><textarea id='tinymce-notification' name='content'></textarea><li>\
								</ul>\
							</td>\
							</tr></table></div>";
												
					$('#tab-notification').html(html);
					
					(method.init.notification.notify == true) ? $('#tab-notification input[name="notify"]').attr('checked', 'checked') : $('#tab-notification input[name="notify"]').removeAttr('checked');
					$('#tab-notification select[name="sender"]').val(method.init.notification.sender);
					
					var form = $('.ui-sortable .ui-draggable:not(.ui-sortable .merge), .ui-sortable .merge-item');
					var name = '';
					var table_head = "<table id='field-list' width='100%' cellspacing='1' cellpadding='10' border='1'>"
					var table_foot = "</table>";
					var table_body = '';
					form.each(function(){
						if($('.label', this).size() > 0 && !$(this).hasClass('f_submit')){
							var label = $.trim($(this).find('.label').text().replace(/\*/gi, ""));
							name += "<li data-name='{"+$(this).attr('data-name')+"}'>"+ label +"</li>";
							table_body += "<tr><td width='15%' valign='top' style='font-weight: bold;'>"+ label +"</td><td>{"+ $(this).attr('data-name') +"}</td></tr>";
						}
					});
					
					if(method.init.notification.message == ''){
						var table = table_head+table_body+table_foot;
						$('#tinymce-notification').val(table)
					}
					else{
						var content = $('<div />').html(method.init.notification.message);
						content.find('#field-list').html(table_body)
						$('#tinymce-notification').val(content.html())
					}
					
					name += '<li data-name="{entry_id}" title="Submission ID" style="-moz-user-select: none; cursor: default;">Submission ID</li>\
					<li data-name="{form_id}" title="Form ID">Form ID</li>\
					<li data-name="{form_title}" title="Form Title">Form Title</li>\
					<li data-name="{ip_address}" title="IP Address">IP Address</li>';
					
					$('.variable-fields').html(name).css('max-height', $('.variable-fields').parent().parent().height());
					
        	tinyMCE.init({
        		plugins : "code,preview,print,fullscreen,layer,table,save,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,template,wordcount",
        		toolbar: "code preview print fullscreen | undo redo cut copy paste styleselect formatselect fontselect fontsizeselect | table bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat subscript superscript",
		       
		        selector: "#tinymce-notification",
		        theme : "modern",
		        menubar:false,
		        height : $(document).height() - 525,
		        
		        // Theme options.
		        resize: false,
		        theme_advanced_toolbar_location : "top",
		        theme_advanced_toolbar_align : "left",
		        theme_advanced_statusbar_location : "bottom",
						init_instance_callback : function() { 
							tinymce.activeEditor.on('focus', function(e) {
							   options.caret = 'tinymce';
							});
						}
					});
				},
				success: function(result){
					$('#tab-notification .loader').remove()
					$('#tab-notification table').show()
					$('.variable-fields').css('max-height', '400px');
				}
			})
			
			this.checked();
			return false;
		},
		
		checked: function(){
			//---BEGIN Check for remove and require button------------------>	
			var form = this._form();
			(form.find('.required').size() > 0) ? $('#required').addClass('on') : $('#required').removeClass('on');
			(form.size() > 0) ?	$('#delete').addClass('on') : $('#delete').removeClass('on');
			//---END Check for remove and require button------------------>
		}
		
  });
}(jQuery));

(function() {
	
  var $;
  $ = jQuery;
  
  var options = {
  	focus         : '',
  	id            : guiform.id || '',
  	title         : (guiBuilder.form !== null) ? guiform.title : 'Untitled',
		sortingItem   : false, // when document is ready sorting is always false when its #canvas is empty 
	  draggingItem  : false, 
	  dragItem      : null, 
	  dragItemID    : null,
	  canvasHeight  : function(){
	  	if($.browser.name() == 'chrome' || $.browser.name() == 'opera') return screen.height - 300;
	  	if($.browser.name() == 'firefox' || $.browser.name() == 'safari') return screen.height - 340;
	  	if($.browser.name() == 'msie') return screen.height - 290;
	  },
	  maxInputHeight: 500,
	  activeProperties: false,
	  Container     : {
	  									parent          : $("<div id='#GuiForm'></div>"),
	  									canvas          : $("<div id='canvas'></div>"),
	  									container       : $("<div id='container'></div>"),
	  									containment     : $("<div id='containment'><ul id='sortable' class='clearfix'></ul></div>"),
	  									tools           : $("<div id='tools'></div>"),
	  									contextMenu     : $("<div id='contextMenu'></div>")
	  },
	  Selector      : {
	  									parent      : $("#GuiForm"),
	  									toolLi      : $("#tools li"),
										  active      : $("#canvas .active"),
										  contextMenu : $("#contextMenu")
	  },
	  Tag           : {
	  									tools           : "<div class='tools'></div>",
	  									property        : "<div id='property'></div>",
	  									propertyContent : "<div class='content'></div>"
	  },
		Tools         : {
				            	form :{
					            	'Form Tools'  : {
					            		t_text     : ['Text Box', '&#xe07b;'],
					            		t_textarea : ['Text Area', '&#xe072;'],
					            		t_select   : ['Drop Down', '&#xe0a8;'],
					            		t_radio    : ['Radio Button', '&#xe069;'],
					            		t_checkbox : ['Check Box', '&#xe06a;'],
					            		t_file     : ['File Upload', '&#xe008;'],
					            		t_password : ['Password', '&#xe075;'],
					            		//t_confirm_password   : ['Confirm Password', '&#xe075;'],
					            		t_submit   : ['Submit Button', '&#xe07c;']
					            		          		
					            	},
					            	'Display Tools' : {
					            		t_heading  : ['Heading', '<strong>H</strong>'],
					            		t_letter   : ['Text', '&#xe0d6;'],
					            		t_list     : ['List', '&#xe001;']
					            	},
					            	'Quick Tools' : {
					            		t_phone    : ['Phone Number', '&#xe04e;'],
					            		t_email    : ['Email Address', '&#xe01a;'],
					            		t_spinner  : ['Spinner', '&#xe041;'],
					            		t_switch   : ['Button Options', '&#xe0b6;']           		
					            	}
					            }
		},
		Form          : { 
											"heading"    : ["<div class='wrap'><h1>Heading</h1></div>"],
											"letter"     : ['<div class="wrap"><p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p></div>'],	
											"list"       : ['<div class="wrap">\
																				<ul>\
																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>\
																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>\
																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>\
																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>\
																					<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>\
																				</ul>\
																			</div>'],				
		  		      	  	"text"       : ["<label class='label'>Text Box</label><div class='wrap' style='width: 250px;'><input type='text' class='validation[none]'></div>","VARCHAR(150) NULL"],
											"textarea"   : ["<label class='label'>Text Area</label><div class='wrap' style='width: 250px;'><textarea></textarea></div>", "MEDIUMTEXT NULL"],
											"select"     : ["<label class='label'>Drop Down</label>\
																			<div class='wrap' style='width: 250px;'>\
																				<select name=''>\
																					<option value='Option 1'>Option 1</option>\
																					<option value='Option 2'>Option 2</option>\
																					<option value='Option 3'>Option 3</option>\
																				</select>\
																			</div>", "VARCHAR(150) NULL"],																			
											"radio"      : ["<label class='label'>Radio Button</label>\
																			<div class='f_radio_wrap wrap' style='width: 250px;'>\
																				<label><input type='radio' value='Option 1'><span>Option 1</span></label><br>\
																				<label><input type='radio' value='Option 2'><span>Option 2</span></label><br>\
																				<label><input type='radio' value='Option 3'><span>Option 3</span></label><br>\
																			</div>", "VARCHAR(150) NULL"],
											"checkbox"   : ["<label class='label'>Check Box</label>\
																			<div class='f_checkbox_wrap wrap' style='width: 250px;'>\
																				<label><input type='checkbox' value='Option 1'><span>Option 1</span></label><br>\
																				<label><input type='checkbox' value='Option 2'><span>Option 2</span></label><br>\
																				<label><input type='checkbox' value='Option 3'><span>Option 3</span></label><br>\
																			</div>", "VARCHAR(150) NULL"],
		 		  						"file"       : ["<label class='label'>File Upload</label>\
										 		  						<div class='wrap' style='width: 250px;'>\
										 		  							<input type='file' file-maxsize='5' file-accept='jpg, jpeg, png, gif'>\
										 		  						</div>\
										 		  						<div class='gui-files'></div>", "TEXT NULL"],
			  							"submit"     : ["<div class='f_submit_wrap'><span><button type='submit' name='submit' disabled='disabled' data-loader='Loading'>Submit</button></span></div>", ""],   
			  							"password"   : ["<label class='label'>Password</label><div class='wrap' style='width: 250px;'><input type='password'></div>", "VARCHAR(255) NULL"],
			  							"confirm_password"   : ["<label class='label'>Confirm Password</label><div class='wrap' style='width: 250px;'><input type='password'></div>", ""],
			  							"phone"      : ["<label class='label'>Phone Number</label><div class='wrap' style='width: 250px;'><input data-mask='(###) ###-####' type='text'></div>", "VARCHAR(150) NULL"],
			  							"email"      : ["<label class='label'>Email Address</label><div class='wrap' style='width: 250px;'><input class='validation[email]' data-unique='true' placeholder='ex: info@email.com' type='text'></div>", "VARCHAR(150) NULL"],
			  							"spinner"    : ["<label class='label'>Text Label</label><div class='wrap' style='width: 110px;'><input class='ui-spinner' type='text'></div>", "VARCHAR(150) NULL"],
			  							"switch"     : ["<label class='label'>Text Label</label>\
																			<div class='wrap'>\
																				<div class='switch'>\
																					<input type='radio' value='1' /><label>On</label>\
																					<input type='radio' value='0' /><label>Off</label>\
																				</div>\
																			</div>", "VARCHAR(150) NULL"]
											    
		},
		Context       : {
											menu :{
													  	c_nextLineOn   : "<li><span id='c_nextLineOn'>Next Line On</span></li>",
															c_nextLineOff  : "<li><span id='c_nextLineOff'>Next Line Off</span></li>",
															c_shrink       : "<li><span id='c_shrink'>Shrink</span></li>",
															c_expand       : "<li><span id='c_expand'>Expand</span></li>",
															c_blockLine    : "<li><span id='c_blockLine'>Block Display</span></li>",
															c_floatLine    : "<li><span id='c_floatLine'>Inline Display</span></li>",
															c_delete       : "<li><span id='c_delete'>Delete</span></li>",
															g_blockLine    : "<li><span id='g_blockLine'>Group: Block Display</span></li>",
															g_floatLine    : "<li><span id='g_floatLine'>Group: Inline Display</span></li>",
															g_nextLineOn   : "<li><span id='g_nextLineOn'>Group: Next Line On</span></li>",
															g_nextLineOff  : "<li><span id='g_nextLineOff'>Group: Next Line Off</span></li>"
											}
		}
	  
	}
	
	options.htmlTools = function(){
		
		$(this.Selector.parent).append($(this.Container.tools));
			
		$.each(this.Tools.form, function(key, value){
			var html = '';
			html += '<h3>'+ key +'</h3>';
		  html += '<ul>';
			$.each(options.Tools.form[key], function(key, value){
				var text = value[0];
				var icon = value[1];
				if(key == 't_heading')
					html += "<li id='"+ key +"'><span class='icon'>"+ icon +"</span><span class='text'>"+ text +"</span></li>";
				else
					html += "<li id='"+ key +"'><span class='icon' data-icon='"+icon+"'></span><span class='text'>"+ text +"</span></li>";
			})
			html += '</ul>';
			
			$(options.Container.tools).append(html)
		})
	}
	
	options.htmlCanvas = function(){
		if(guiBuilder.form !== null){
			$("#GuiForm").append(guiBuilder.form.canvas.replace(/\\/g, ""));
			$('#guiform-notice').remove();
			$("#canvas ul.ui-sortable").attr('id', 'sortable');
		}
		else{
			$("#GuiForm").append($(this.Container.container));
			$("#container").append($(this.Container.canvas));
			$("#canvas").html($(this.Container.containment));
		}
		
		$("#container").find('guiform').replaceTag('<select>', true);
		
		var html = '<div id="guiform-notice">\
									<h1>Make a Donation</h1>\
									<p>If you think this wordpress plug-in is useful to you, then it\'s a good reason to do a donation. Your gratitude and finance help will motivate me to continue <strong>GUIFORM</strong> project development.</p>\
									<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">\
										<input type="hidden" name="cmd" value="_s-xclick">\
										<input type="hidden" name="hosted_button_id" value="T68UXN46V3MEC">\
										<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\
										<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\
									</form>\
									<p style="font-weight: bold; text-align: center; color: red; text-transform: uppercase;">Beta Version</p>\
								</div>';
		
		$('#container').append(html);
	}
	
	options.contextMenu = function(event){
		var html = '';
		var option = options.Context.menu;
		var selector = $('.ui-sortable li.ui-draggable.active');
		var object = (selector.hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $(options.Selector.active.selector);
	
		if(selector.hasClass("merge")){
			html += (selector.hasClass("floatLine")) ? option.g_blockLine : option.g_floatLine;
			html += (selector.hasClass("nextLine")) ? option.g_nextLineOn : option.g_nextLineOff;
		}
	
		if(object.hasClass("f_submit") == false){ 
	    html += (object.hasClass("shrink")) ? option.c_expand : option.c_shrink;
	    html += (object.hasClass("nextLine")) ? option.c_nextLineOn : option.c_nextLineOff;
			html += (object.hasClass("floatLine")) ? option.c_blockLine : option.c_floatLine;
		}
		else{
			html += (object.hasClass("nextLine")) ? option.c_nextLineOn : option.c_nextLineOff;
			html += (object.hasClass("floatLine")) ? option.c_blockLine : option.c_floatLine;
			html += option.c_delete;
		}
		
		html +"<ul>"+ html +"</ul>";
		
		$(options.Container.contextMenu).html(html).css({"left": (event.pageX ) +"px", "top": (event.pageY) +"px"}).show()
		event.preventDefault()
	}
	
	options.buttonFonts = function(event, data){
		$(data).parent().addClass('active')
		$('#header .wrapper').remove();
	}

  GuiForm = (function() {
  	
  	function GuiForm() {
      this.init();
    }

    GuiForm.prototype.init = function(){
    	
	   	 if(guiBuilder.form === null && guiform.id !== '') location.href = location.href.split('&form')[0];
    	
    	 options.htmlTools();
    	 options.htmlCanvas();
    	 $("body").append(options.Container.contextMenu);
    	 $("body").append("<span class='canvas-resize'><span class='arrow'></span><span class='canvas-info'></span></span>");
    	 this.build();
    	 $(document).guiTools({title: options.title});
    }

		GuiForm.prototype.form = function(type){
		  var item = type.replace("t_", "");
			var form = $('.ui-sortable li.ui-draggable.active');
			var dataName = 'field_'+ String(Math.random()).substring(2,6);
			var id = 'item-'+ String(Math.random()).substring(2,8);
			var arrayType = (type == 't_checkbox') ? "[]" : '' ;		
					
			var html = $("<li></li>");
			
			html.html(options.Form[item][0])
					.addClass(type.replace("t_", "f_") +" ui-draggable blockLine expand clearfix selected item")
					.attr('data-name', dataName)
					.attr('data-type', options.Form[item][1])
					.attr('id', id)
					.find('input, select, textarea')
					.attr('name', dataName + arrayType);
				
			(form.size()) ? form.after(html) : $('#canvas .ui-sortable').append(html);
			
			if(item == 'phone'){
				$('input[name="'+dataName+'"]').attr('data-mask', '(###) ###-####').mask('(###) ###-####');
			}			
			else if(item == 'spinner'){				
				$('input[name="'+dataName+'"]').spinner();
			}
			else if(item == 'switch'){				
				html.find('input').each( function(){
					var id = 'switch-'+ String(Math.random()).substring(2,8);
					$(this).attr('id', id);	
					$(this).next().attr('for', id);
				})
				
				$('#'+id).find('.switch').buttonset();
			}
			else if(item == 'submit'){
				$('input[name="'+dataName+'"]').attr('name','submit');
			}
			
			html.css({'opacity':'0'})
					.addClass('restored-item')
					.removeClass('selected')
					.animate({opacity:1},1300, function(){
						$(this).removeClass('restored-item');
					})

    }
    
    GuiForm.prototype.build = function(){
    	
    	var call = this;
    	var Selector = options.Selector;
    	var prop = options.Prop;
  
    	$("#tools").accordion({
				heightStyle: "content"
			}).disableSelection();
    	
    	$("#tools li").draggable({
				appendTo: 'body', 
				helper: "clone",
				containment: '#wpwrap',
				connectToSortable: '.ui-droppable.ui-sortable',
				revert: "invalid",	
				addClasses: "invalid",
				delay: 50, 
				scroll: true,
				scrollSensitivity: 10,
				scrollSpeed: 10, 	
				zIndex: 2000,
				start: function(event, ui) { 
					$('.ui-draggable.ui-sortable-helper, .ui-sortable .ui-state-highlight').remove()
					$(".ui-resizable-handle").show();
					$("#contextMenu").hide();
					options.draggingItem = true;
					options.dragItem = $(this).attr("id").replace("t_", "")
					options.dragItemID = $(this).attr("id")
					$(ui.helper).css({"display":"block","width": $('#tools').width()});	
				  $("#canvas ul#sortable").sortable("option", "axis", "x,y" );
				},
				stop: function(event, ui) { 
					options.draggingItem = false;
				}
			})
			
    	$("#canvas ul#sortable").droppable({
					activeClass: "ui-state-default",
					hoverClass: "ui-state-hover",
					accept: ":not(.ui-sortable-helper)",
					zIndex: 2000,
					drop: function( event, ui ) {
						ui.draggable.addClass("blockLine");
					}
			}).sortable({
				revert: true,
			  axis: 'y',
				forcePlaceholderSize: true,
				forceHelperSize: true, 
				opacity: 0.9,
				containment: false,
				scroll: true, 
				scrollSensitivity: 5,
				scrollSpeed: 5,
				placeholder: 'ui-state-highlight',
				tolerance: "pointer",
				zIndex: 99999, 
				out: function(event, ui){
					$("#tools li").draggable("enable" )
					$("#canvas ul#sortable").sortable("option", "axis", "x,y" );
					$("#tools li").draggable("option", "axis", 'x,y' );
					if(options.draggingItem == true){
						$(ui.helper).css({"display":"block","width": $('#tools').width()});
					}	
				},
				start: function(event, ui){
					var dataName = 'field_'+ String(Math.random()).substring(2,6);
					var id = 'item-'+ String(Math.random()).substring(2,8);
					var arrayType = (options.dragItemID == 't_checkbox') ? "[]" : '';		
					var form = $('#canvas').find(".ui-draggable[style*='display: none']");
					
					if(options.draggingItem == true){
						form.html(options.Form[options.dragItem][0])
						.addClass(options.dragItemID.replace("t_", "f_") +" blockLine expand clearfix item")
						.attr('data-name', dataName)
						.attr('data-type', options.Form[options.dragItem][1])
						.attr('id', id)
						.find('input, select, textarea')
						.attr('name', dataName + arrayType)
						
						if(options.dragItemID.replace("t_", "") == 'phone'){
							$('input[name="'+dataName+'"]').attr('data-mask', '(###) ###-####').mask('(###) ###-####');
						}
						else if(options.dragItemID.replace("t_", "") == 'spinner'){
							$('input[name="'+dataName+'"]').spinner();
						}
						else if(options.dragItemID.replace("t_", "") == 'switch'){
							form.find('input').each( function(){
								var id = 'switch-'+ String(Math.random()).substring(2,8);
								$(this).attr('id', id);	
								$(this).next().attr('for', id);
							})
							$('#'+id).find('.switch').buttonset();
						}
						else if(options.dragItemID.replace("t_", "") == 'submit'){
							$('input[name="'+dataName+'"]').attr('name','submit');
						}
					}
					
					$("#tools li").draggable("option", "axis", 'y' );
					$("#canvas ul#sortable").sortable("option", "revert", true);	
					$(this).sortable("option", "containment", false);	
					$("#tools li").draggable("disable")
					
					if(ui.item.hasClass("floatLine")){
						$("#canvas ul#sortable").sortable("option", "axis", "x,y" );
						$(".ui-state-highlight").css({"float":"left","clear":"none","display":"inline-block", "width":$(ui.helper).outerWidth()})
					}
					else {
						$("#canvas ul#sortable").sortable("option", "axis", "y" );
						$(".ui-state-highlight").css({"float":"none","clear":"both", "display":"block","width":"auto"})
					}
					
					if(options.draggingItem == true){
						$(ui.helper).css({"width": $(ui.helper).outerWidth() - 25})
						$(ui.helper).css({"left": $('#canvas').offset().left + 10})
					}
					
					if(ui.item.hasClass("merge")){
						$(ui.placeholder ).height($(ui.placeholder).outerHeight(true) - 22)
					}
					
					if(options.draggingItem == false && ui.item.hasClass("floatLine") == false){
						$('#canvas').width($(ui.helper).outerWidth(true) + 30)
					}
				},
				stop: function(event, ui){
					$('#canvas').find(".active").css({"width": "auto"})
					options.sortingItem = true;
					$("#tools li").draggable("enable");
					if(ui.item.hasClass("floatLine"))	$(ui.item).css('display','inline-table');
				},
				beforeStop: function(event, ui){
					$('#canvas textarea').css('max-height', options.maxInputHeight);	
					$('#canvas').find(".ui-draggable[style*='display: none']").remove();					
				}
			})
			
    	var startValue;
    	
    	$("#canvas").resizable({
					minWidth: options.canvasMinWidth,
					handles: 'e',
					zIndex: 101,
					create: function( event, ui ) {
					},
				  start: function(event, ui){
				  	startValue = ui.size.width;
				  },
					resize: function(event, ui){		
						var minWidth = $(this).resizable( "option", "minWidth" );
						$('.canvas-resize').css({'left' : event.pageX - 158, 'top' : event.pageY - 45}).show();
						$('.canvas-resize  .canvas-info').html((ui.size.width - 30) +" pixels");	
						
						(startValue > ui.size.width) ? $('.canvas-resize .canvas-info').append('<br /><span>Ctrl + left arrow key</span>') : $('.canvas-resize  .canvas-info').append('<br /><span>Ctrl + right arrow key</span>');
						startValue = ui.size.width;
					
						var body= $('body')[0];
						if(body.scrollWidth > body.clientWidth){
							if($('#canvas').width() < options.canvasMaxWidth){
								$(window).scrollLeft($('#canvas').width())
							}
							else{
								$(window).scrollLeft($(window).scrollLeft())
							}
						}
					},
					stop: function(event, ui){
						$(this).css("width", $(this).width());
						$('.canvas-resize').hide();
						$('.ui-resizable-e').css("background-color","#ECECEC");
					}
			});
			
			$('#collapse-menu').click( function(){
				$("#GuiForm").css('width', '1px');
			})
			
    	$("#canvas ul.ui-sortable").css({"min-height": options.canvasHeight()});
    	$("#GuiForm").css("width",'auto');
    	  
			$(document).ready(function(){
			}).on('click', '#tools li', function(){
				options.dragItemID = this.id;
				call.form(this.id);
			});
			
			$(window).resize(function(){
				$("#canvas").css({"height": $("body").innerHeight() - $("#canvas").offset().top - 70});
				$("#tools").css({"left": $("#GuiForm").offset().left - $(window).scrollLeft()});
				$("#header").css({"left": $("#GuiForm").offset().left - $(window).scrollLeft(), "right":"auto"});
			}).scroll(function(event){	
					var win = $(window);// Store window object.
					var query = $("#GuiForm");
					var header = $("#header");
					var tools = $("#tools");
					var wpbar = $("#wpadminbar");
					var query_top = query.offset().top - wpbar.innerHeight();
					var query_left = query.offset().left;
					var ui_resizable_e = $(".ui-resizable-e");
						
					(win.scrollTop() < query_top) ?	header.css({"top": query.offset().top - win.scrollTop()}).removeClass("float") : header.addClass("float").css({"top": query.offset().top - (query.offset().top - wpbar.innerHeight())});	
					(win.scrollTop() < query_top) ?	tools.css({"top": query.offset().top - win.scrollTop() - 2}) : tools.css({"top": wpbar.innerHeight() - 2});	
					 var ui_resizable_e_top = 10;
					 
					(win.scrollTop() < query_top) ? ui_resizable_e.css({"top": '1px'}) : ui_resizable_e.css('top', win.scrollTop() - ui_resizable_e_top - query.offset().top + header.innerHeight() - 1);
					
					(win.scrollLeft() < query_left) ?	tools.removeClass("float").css({"left": query.offset().left - win.scrollLeft()}) :  tools.css({"left": -(win.scrollLeft() - query.offset().left) });	
					(win.scrollLeft() < query_left) ? header.css({"left": query.offset().left - win.scrollLeft()}) : header.css({"left": -(win.scrollLeft() - query.offset().left) });	
			}).bind("beforeunload",function(event) { 
				event.preventDefault();
			}).mousewheel(function(event, delta){
				if($(event.target)[0].className.split(' ')[0] !== 'list'){
					event.preventDefault();
					var scroll = $(window).scrollTop();
					$(window).scrollTop(scroll - (delta * 30));
				}
			});
			
			var autoVS = 0;
			setInterval(function(event){
				var win = $(window);
				var header = $("#header");
				var query = $("#GuiForm");
				var query_left = query.offset().left;
				(win.scrollLeft() < query_left) ? header.css({"left": query.offset().left - win.scrollLeft()}) : header.css({"left": -(win.scrollLeft() - query.offset().left) });	

				$("#canvas").css({"height": $("body").innerHeight() - $("#canvas").offset().top - 70});
				$("#tools").css({"left": $("#GuiForm").offset().left - $(window).scrollLeft()});
				
			  $("#container").css("width", screen.width - ($("#tools").width() + $('#adminmenuwrap').width() + 48));
			  
			  $("#header ul").css("min-width", screen.width - ($('#adminmenuwrap').width() + 50));
    	
			  ($("#canvas .selected").size() > 1) ?	$('#merge').addClass('on') : $('#merge').removeClass('on');
				
				delete(options);
				
			},100);

			$(document).click( function(event){
				options.focus = $(event.target)[0].nodeName.toLowerCase();	
			}).keydown(function(event){
				var key = event.charCode || event.keyCode || 0; 
				var current = document.activeElement.nodeName.toLowerCase() || options.focus;
				
				if(event.ctrlKey){
					var tempCanvasWidth = $('#canvas').width(); 
					if(key == 37){
						tempCanvasWidth--;
						$('#canvas').css('width', tempCanvasWidth);
					}
					else if(key == 39){
						tempCanvasWidth++;
						$('#canvas').css('width', tempCanvasWidth);
					}
				}
				
				if((key == 38 || key == 40) && current !== 'textarea') return false;	
						
			});
	
			$(".ui-sortable").on("mousedown", '.merge-item', function(event) {
				$('.merge-item.active').removeClass("active");
				$(this).addClass("active");
			});
			
			$(options.Selector.toolLi.selector).draggable( "option", "refreshPositions", true );
			
			$('#contextual-help-columns .contextual-help-tabs a, #contextual-help-link').click( function(event){   
				$("#tools, #header").css('top', 'auto').removeClass('float');
			});
			
			$(".ui-sortable").on("contextmenu", '.ui-draggable', function(event){
				options.contextMenu(event);
    	});
			
			$("#wpwrap").mousedown( function(event){
				$(options.Selector.contextMenu.selector).hide();
			});
			
			$(options.Selector.contextMenu.selector).click( function(event){
				$(options.Selector.contextMenu.selector).hide();
			});
			 
			$("#contextMenu").on("click", '#c_shrink', function(event){
				var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $(options.Selector.active.selector);
				form.css('display', 'list-item');				
				form.removeClass("expand").addClass("shrink");
				$('#p_label_width').spinner( "option", "disabled", true );
				$('#p_label_width').val('');
			});
			
			$("#contextMenu").on("click", '#c_expand', function(event){
				var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $(options.Selector.active.selector);
				if(form.hasClass('blockLine') == false) form.css('display', '');		
				form.removeClass("shrink top-align").addClass("expand");
				$('#p_label_width').spinner( "option", "disabled", false );
				$('#p_label_width').val(form.find('.label').width());
			});
			
			$("#contextMenu").on("click", '#c_blockLine', function(event){
				var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $(options.Selector.active.selector);
				form.css('display', 'list-item');
				form.removeClass("floatLine").addClass("blockLine");
			});
			
			$("#contextMenu").on("click", '#c_floatLine', function(event){ 
				var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $(options.Selector.active.selector);
				form.css('display', 'list-item');			
				form.removeClass("blockLine").addClass("floatLine");
			});
			
			$("#contextMenu").on("click", '#c_nextLineOff', function(event){ 
				var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $(options.Selector.active.selector);
				form.addClass('nextLine');		
			});
			
			$("#contextMenu").on("click", '#c_nextLineOn', function(event){ 
				var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $(options.Selector.active.selector);
				form.removeClass('nextLine');	
			});
			
			$("#contextMenu").on("click", 'span', function(event){ 
				var form = ($('.ui-sortable li.ui-draggable.active').hasClass('merge')) ? $('.ui-sortable .merge-item.active') : $(options.Selector.active.selector);
				if(form.hasClass('shrink') || (form.hasClass('shrink') && form.hasClass('expand'))){
					$('#p_text_width').attr('disabled', 'disabled');
					$('#p_text_width').val('');
				}
				else{
					$('#p_text_width').removeAttr('disabled');
					$('#p_text_width').val(form.find('.label').width());
				}
			});
			
			$("#contextMenu").on("click", '#g_blockLine', function(event){
				var form = $('.ui-sortable li.ui-draggable.active');
				form.css('display', 'list-item');
				form.removeClass("floatLine").addClass("blockLine");
			});
			
			$("#contextMenu").on("click", '#g_floatLine', function(event){ 
				var form = $('.ui-sortable li.ui-draggable.active');
				form.css('display', 'list-item');			
				form.removeClass("blockLine").addClass("floatLine");
			});
			
			$("#contextMenu").on("click", '#g_nextLineOff', function(event){ 
				var form = $('.ui-sortable li.ui-draggable.active');
				form.addClass('nextLine');
			});
			
			$("#contextMenu").on("click", '#g_nextLineOn', function(event){ 
				var form = $('.ui-sortable li.ui-draggable.active');
				form.removeClass('nextLine')		;
			});
			
			$("#contextMenu").on("click", "#c_delete", function (event) {
				$("#delete").trigger("click");
			})
    }
    
    return GuiForm;
			
  })();
  
  new GuiForm();
 
}).call(this);