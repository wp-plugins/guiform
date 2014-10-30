/*!
 * GuiForm Plugin
 * https://www.guiform.com
 *
 * By: Russell C. Pabon
 * http://russellpabon.com
 *
 */
var _var = ["call", "getCursorPosition", "fn", "get", "selectionStart", "selection", "focus", "createRange", "length", "text", "character", "value", "moveStart", "removeTags", "children", "replaceWith", "unwrap", "each", "cleanTags", "append", "\x3Cdiv /\x3E", ":not(", ")", "find", "replaceTag", "\x3C", "/\x3E", "name", "attr", "html", "isAuto", "width", "style", "auto", "height", "quoteAttr", "\x26#13;", "\x0A", "replace", "\x26gt;", "\x26lt;", "\x26quot;", "\x26apos;", "\x26amp;", "", "removeClassRegEx", "class", " ", "split", "match", "push", "join", "hasClassRegEx", "hasAttr", "getAttribute", "undefined", "bytesToSize", "Bytes", "KB", "MB", "GB", "TB", "n/a", "log", "floor", "pow", "round", "browser", "toLowerCase", "userAgent", "msie", "indexOf", "object", "msie/", ";", "msie ", "chrome", "chrome/", "safari", "safari/", "version/", "opera", "opera/", "firefox/", "/", "agent", "exists", "guiform", "size", "emails", "input", "label", "map", ".f_email", ".item", "parents", ".f_text input[class=\x27validation[email]\x27]", "\x3Cselect name=\x22", "\x22 class=\x22", "\x22\x3E", "\x3Coption value=\x22", "\x3C/option\x3E", "merge", "\x3Coption value=\x22{", "}\x22\x3E", "\x3C/select\x3E", "\x3Ca href=\x22", "guiform_url", "\x22\x3EClick here to add email address.\x3C/a\x3E", "Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP", "_XMLHttpFactories", "\x22Andale Mono\x22", "Arial", "\x22Arial Black\x22", "\x22Arial Narrow\x22", "\x22Arial Rounded MT Bold\x22", "\x22Big Caslon\x22", "\x22Bodoni MT\x22", "\x22Book Antiqua\x22", "\x22Brush Script MT\x22", "\x22Calisto MT\x22", "Calibri", "Cambria, Georgia, serif", "Candara", "\x22Century Gothic\x22", "\x22Courier New\x22", "\x22Franklin Gothic Medium\x22", "Garamond", "Georgia", "\x22Gill Sans\x22", "\x22Goudy Old Style\x22", "\x22Helvetica Neue\x22", "Helvetica", "\x22Hoefler Text\x22", "Impact", "\x22Lucida Bright\x22", "\x22Lucida Console\x22", "\x22Lucida Grande\x22", "\x22Lucida Sans Typewriter\x22", "\x22Open Sans\x22", "Papyrus", "Perpetua", "Rockwell", "\x22Rockwell Extra Bold\x22", "sans-serif", "\x22Segoe UI\x22", "Tahoma", "times new roman", "\x22Trebuchet MS\x22", "Verdana", "fonts", "_generatePosition", "prototype", "draggable", "ui", "options", "cssPosition", "absolute", "scrollParent", "offsetParent", "contains", "tagName", "test", "pageX", "pageY", "originalPosition", "containment", "relative_container", "offset", "left", "top", "click", "grid", "originalPageY", "originalPageX", "relative", "parent", "fixed", "scrollTop", "scrollLeft", "_mouseStop", "sortable", "ddmanager", "dropBehaviour", "drop", "revert", "placeholder", "reverting", "margins", "body", "animate", "helper", "GuiForm.tools", "id", "guiform_ip", "guiform_date_submitted", "guiform_status", "guiform_browser", "guiform_os", "\x26#xe00a;", "Save Form", "\x26#xe077;", "Create New Form", "\x26#xe09a;", "Form Preview", "\x26#xe026;", "Form Style", "\x26#xe013;", "Required", "\x26#xe071;", "Merge Field", "\x26#xe003;", "Remove Field", "\x26#xe038;", "Field Properties", "\x26#xe01c;", "Source Code", "\x26#xe07c;", "Thank You Message", "\x26#xe03e;", "Email Settings", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x2712\x27 data-min=\x270\x27 data-max=\x27100\x27 id=\x27p_font_size\x27\x3E pixels", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x271\x27 data-min=\x271\x27 id=\x27p_max_input\x27\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x270\x27 data-min=\x270\x27 data-max=\x27450\x27 id=\x27p_label_width\x27\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x271\x27 data-min=\x271\x27 id=\x27p_max_size\x27\x3E\x0D						  	                         \x3Cspan style=\x27margin: 0px 10px;\x27\x3EMB\x3C/span\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x27null\x27 type=\x27text\x27 id=\x27p_maximum\x27\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x27null\x27 type=\x27text\x27 id=\x27p_minimum\x27\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x270\x27 data-min=\x270\x27 data-max=\x27100\x27 id=\x27p_line_height\x27\x3E pixels", "Width \x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x270\x27 data-min=\x270\x27 id=\x27p_width\x27\x3E\x0D								                         Height \x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x270\x27 data-min=\x270\x27 id=\x27p_height\x27\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x27130\x27 data-min=\x270\x27 data-max=\x27300\x27 id=\x27p_options_label\x27\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x271\x27 data-min=\x271\x27 data-max=\x274\x27 id=\x27p_columns\x27\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x27250\x27 data-min=\x270\x27 data-max=\x27600\x27 id=\x27p_textarea_height\x27\x3E", "\x3Cinput class=\x27prop-spinner\x27 type=\x27text\x27 value=\x27\x27 data-default=\x278\x27 data-min=\x272\x27 data-max=\x2725\x27 id=\x27p_password_minimum_length\x27\x3E", "\x3Cul\x3E\x0D										  										\x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27validation\x27 value=\x27none\x27\x3E\x3Cspan\x3ENone\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																					\x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27validation\x27 value=\x27email\x27\x3E\x3Cspan\x3EEmail\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																					\x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27validation\x27 value=\x27number\x27\x3E\x3Cspan\x3ENumber/Price\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																					\x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27validation\x27 value=\x27digits\x27\x3E\x3Cspan\x3EDigits\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																					\x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27validation\x27 value=\x27alphabet\x27\x3E\x3Cspan\x3EAlphabet\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																					\x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27validation\x27 value=\x27alphanum\x27\x3E\x3Cspan\x3EAlphaNumeric\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																				\x3C/ul\x3E", "\x3Cdiv class=\x27button\x27\x3E\x0D																					\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27alignment\x27 id=\x27radio1\x27 value=\x27left\x27 /\x3E\x3Clabel for=\x27radio1\x27 title=\x27left\x27\x3E\x3Cspan class=\x27icon\x27 data-icon=\x27\x26#xe055;\x27\x3E\x3C/span\x3E\x3C/label\x3E\x0D																					\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27alignment\x27 id=\x27radio2\x27 value=\x27center\x27 /\x3E\x3Clabel for=\x27radio2\x27 title=\x27center\x27\x3E\x3Cspan class=\x27icon\x27 data-icon=\x27\x26#xe056;\x27\x3E\x3C/span\x3E\x3C/label\x3E\x0D																					\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27alignment\x27 id=\x27radio3\x27 value=\x27right\x27 /\x3E\x3Clabel for=\x27radio3\x27 title=\x27right\x27\x3E\x3Cspan class=\x27icon\x27 data-icon=\x27\x26#xe063;\x27\x3E\x3C/span\x3E\x3C/label\x3E\x0D																					\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27alignment\x27 id=\x27radio4\x27 value=\x27justify\x27 /\x3E\x3Clabel for=\x27radio4\x27 title=\x27justify\x27\x3E\x3Cspan class=\x27icon\x27 data-icon=\x27\x26#xe057;\x27\x3E\x3C/span\x3E\x3C/label\x3E\x0D																				\x3C/div\x3E", "\x3Cul\x3E\x0D																			  	 \x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27submit_alignment\x27 value=\x27right\x27\x3E\x3Cspan\x3ERight\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																			  	 \x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27submit_alignment\x27 value=\x27left\x27\x3E\x3Cspan\x3ELeft\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																			  	 \x3Cli\x3E\x3Clabel\x3E\x3Cinput type=\x27radio\x27 class=\x27clickinput\x27 name=\x27submit_alignment\x27 value=\x27center\x27\x3E\x3Cspan\x3ECenter\x3C/span\x3E\x3C/label\x3E\x3C/li\x3E\x0D																		    \x3C/ul\x3E", "\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 class=\x27clickinput\x27 name=\x27hide_label\x27\x3E\x3Cspan\x3E Hidden\x3C/span\x3E\x3C/label\x3E", "\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 class=\x27clickinput\x27 name=\x27p_unique_value\x27\x3E\x3Cspan\x3E No duplicate entry\x3C/span\x3E\x3C/label\x3E", "\x3Cp\x3EField must be required enable.\x3C/p\x3E", "\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 class=\x27clickinput\x27 name=\x27p_show_reset\x27\x3E\x3Cspan\x3E Reset\x3C/span\x3E\x3C/label\x3E", "\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 class=\x27clickinput\x27 name=\x27p_visible\x27\x3E Hidden\x3C/label\x3E", "\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 class=\x27clickinput\x27 name=\x27p_display\x27\x3E None\x3C/label\x3E", "\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 class=\x27clickinput\x27 name=\x27p_multiple_file\x27\x3E\x3C/label\x3E", "\x3Ctextarea class=\x27textinput\x27 id=\x27p_file_extensions\x27\x3Ejpg, jpeg, png, gif, pdf, doc, docx, xls, csv, txt, html, zip, mp3, mpg, flv, avi\x3C/textarea\x3E", "\x3Ctextarea class=\x27textinput\x27 id=\x27p_text_content\x27\x3E\x3C/textarea\x3E", "\x3Cp\x3EAllows: b, strong, i, em, u, br, blockquote, a\x3C/p\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_text\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_sub_text\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_text_label\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_submit_text\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_reset_text\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_loading_text\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_placeholder\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_default_value\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_short_description\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_on_label\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_off_label\x27 value=\x27\x27\x3E", "\x3Cinput class=\x27textinput\x27 type=\x27text\x27 id=\x27p_input_mask\x27 value=\x27\x27\x3E\x0D						  													 \x3Cp\x3EExample: \x3Ccode\x3E(###) ###-####\x3C/code\x3E\x3C/p\x3E\x0D						  													 \x3Cp\x3EOutput: \x3Ccode\x3E(123) 456-7890\x3C/code\x3E\x3C/p\x3E", "\x3Cul\x3E\x3Cli\x3E~ = + or -\x3C/li\x3E\x0D						  													 \x3Cli\x3E@ = Alphabet\x3C/li\x3E\x0D						  													 \x3Cli\x3E# = Numeric\x3C/li\x3E\x0D						  													 \x3Cli\x3E* = Alphanumeric\x3C/li\x3E\x3C/ul\x3E", "\x3Cselect id=\x27p_list_type\x27\x3E\x0D																					\x3Coption value=\x27disc\x27\x3Edisc\x3C/option\x3E\x0D																					\x3Coption value=\x27square\x27\x3Esquare\x3C/option\x3E\x0D																					\x3Coption value=\x27circle\x27\x3Ecircle\x3C/option\x3E\x0D																					\x3Coption value=\x27decimal\x27\x3Edecimal\x3C/option\x3E\x0D																					\x3Coption value=\x27decimal-leading-zero\x27\x3Edecimal-leading-zero\x3C/option\x3E\x0D																					\x3Coption value=\x27lower-roman\x27\x3Elower-roman\x3C/option\x3E\x0D																					\x3Coption value=\x27upper-roman\x27\x3Eupper-roman\x3C/option\x3E\x0D																					\x3Coption value=\x27lower-greek\x27\x3Elower-greek\x3C/option\x3E\x0D																					\x3Coption value=\x27lower-alpha\x27\x3Elower-alpha\x3C/option\x3E\x0D																					\x3Coption value=\x27upper-alpha\x27\x3Eupper-alpha\x3C/option\x3E\x0D																					\x3Coption value=\x27hiragana\x27\x3Ehiragana\x3C/option\x3E\x0D																					\x3Coption value=\x27katakana\x27\x3Ekatakana\x3C/option\x3E\x0D																				\x3C/select\x3E", "\x3Cdiv id=\x27p_submit_offset\x27\x3E\x3C/div\x3E\x3Cdiv class=\x27p_submit_offset_value\x27\x3EValue : \x3Cspan\x3E0px\x3C/span\x3E\x3C/div\x3E", "\x3Cspan style=\x27font-weight: bold;\x27 id=\x27p_item_id\x27\x3E\x3C/span\x3E", "\x3Cselect id=\x27p_compare_with\x27\x3E\x3C/select\x3E", "\x3Cinput type=\x27text\x27 id=\x27backgroundColor\x27 class=\x27basic\x27 value=\x27\x27 /\x3E", "\x3Cinput type=\x27text\x27 id=\x27color\x27 class=\x27basic\x27 value=\x27\x27 /\x3E", "\x3Cinput type=\x27text\x27 id=\x27borderColor\x27 class=\x27basic\x27 value=\x27\x27 /\x3E", "Male", "Female", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia-Herzegovina", "Botswana", "Bouvet Island", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo, Democratic Republic of the (Zaire)", "Congo, Republic of", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "Gabon", "Gambia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe (French)", "Guam (USA)", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast (Cote D`Ivoire)", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique (French)", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia (French)", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Island", "Poland", "Polynesia (French)", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and South Sandwich Islands", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste (East Timor)", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wallis and Futuna Islands", "Yemen", "Zambia", "Zimbabwe", "\x3Cspan title=\x22Male\x22 data-icon=\x22\x26#xe047;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Female\x22 data-icon=\x22\x26#xe06c;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Left\x22 data-icon=\x22\x26#xe055;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Center\x22 data-icon=\x22\x26#xe056;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Right\x22 data-icon=\x22\x26#xe063;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Justify\x22 data-icon=\x22\x26#xe057;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Up\x22 data-icon=\x22\x26#xe014;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Left\x22 data-icon=\x22\x26#xe099;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Down\x22 data-icon=\x22\x26#xe02d;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Right\x22 data-icon=\x22\x26#xe09d;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Android\x22 data-icon=\x22\x26#xe028;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Apple\x22 data-icon=\x22\x26#xe019;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Linux\x22 data-icon=\x22\x26#xe0c0;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Windows\x22 data-icon=\x22\x26#xe020;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Blogger\x22 data-icon=\x22\x26#xe018;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Drupal\x22 data-icon=\x22\x26#xe017;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22Joomla\x22 data-icon=\x22\x26#xe0d3;\x22\x3E\x3C/span\x3E", "\x3Cspan title=\x22WordPress\x22 data-icon=\x22\x26#xe0b7;\x22\x3E\x3C/span\x3E", "timer", ".ui-sortable .ui-draggable:not(.ui-sortable .ui-draggable.merge), .ui-sortable .merge-item", "autosave", "settings", "save", "autosave_time", "\x3Cdiv id=\x27header\x27\x3E\x3C/div\x3E", "#GuiForm", "\x3Cul class=\x22clearfix\x22\x3E", "menu", "\x3Cli id=\x22", "\x22\x3E\x3Cspan title=\x22", "\x22 data-icon=\x22", "\x22 class=\x22menu-button\x22\x3E\x3C/li\x3E", "\x3Cli class=\x22formName-list\x22\x3E\x3Cinput maxlength=\x2240\x22 id=\x22formName\x22 title=\x22Form Title\x22 placeholder=\x22Untitled Form\x22 type=\x22text\x22 name=\x22formName\x22 value=\x22", "title", "\x22\x3E\x3C/li\x3E", "\x3C/ul\x3E", "#header", "performance", "remove", "#performance", "min-width", "#wpadminbar", "#adminmenuwrap", "css", "#header ul", "#guiform-form", "\x3Cstyle type=\x27text/css\x27 id=\x27guiform-form\x27 media=\x27all\x27 scoped\x3E\x3C/style\x3E", "prepend", "#canvas", "#guiform-style", "\x3Cstyle type=\x27text/css\x27 id=\x27guiform-style\x27 media=\x27all\x27 scoped /\x3E", "clone", "#canvas, #canvas .ui-widget{background-color: #FFFFFF;font-family: Verdana,sans-serif;} #canvas .label{color: #333333;} #canvas input, #canvas textarea, #canvas .f_select [name]{border: 1px solid #CCCCCC;}", "resetSaving", "#", "definitions", "mask", "[0-9]", "@", "[a-zA-Z]", "*", "[a-zA-Z0-9]", "~", "[+-]", "data-mask", ".f_phone input", "center bottom-20", "center top", "z-index", "999999", "appendTo", "horizontal", "addClass", "vertical", "arrow", "\x3Cdiv\x3E", "tooltip", ".menu-button, #formName", "autoSave", "blur", "#formName", "val", "trim", "on", "charCode", "keyCode", "hide", "#contextMenu", ".ui-sortable li.ui-draggable.active", "nodeName", "activeElement", "textarea", "select", "#fonts-container", "#fonts-container ul", ".ui-tabs", "#window-properties", "inArray", "ctrlKey", ".ui-sortable .ui-draggable", "index", "active", "removeClass", ".ui-sortable .ui-draggable:eq(", "position", ".ui-sortable .ui-draggable:eq(0)", "tabs_properties", "keyup", "#tab-fonts[aria-hidden=false]", "#fonts-container li.active", "#fonts-container li", "#fonts-container li:eq(", "slow", "#guifbox", "#fonts.menu-button", "\x27", "data-value", "font-family: ", "keydown", "mousedown", ".merge-item", ".merge-item.active", "f_page_break", "hasClass", "You cannot merge page break tools", "selected", "#canvas li", "properties", "get_properties", "checked", "dblclick", ".ui-sortable li.ui-draggable", ".edit-label", "edit-label", "\x3Cinput id=\x27", "\x27 class=\x27edit-label-input\x27 value=\x27\x27\x3E", ".edit-label-input", "-", ".ui-sortable .merge-item.active", ".required", "#item-", "\x3Cspan class=\x27required\x27\x3E*\x3C/span\x3E", ".label", "#tab-li-properties a", "\x26nbsp;", "#guiform-canvas", "#html-source", "div, li, ul, ol, table, thead, tbody, tfoot, th, tr, td, p, fieldset, label, img, span, b, strong, i, em, u, br, blockquote, a", ".wrap", ".caret", "caret", ".variable-fields li", "data-name", "tinymce", "mceInsertContent", "execCommand", "insert", "atCaret", ".caret[name=\x27", "\x27]", "#save-options", "rebuild_options", "#clear-options", "\x3Cli\x3E\x0D											\x3Cinput type=\x22radio\x22 name=\x22checked\x22\x3E\x3Cinput type=\x22text\x22 name=\x22label\x22 value=\x22Text\x22\x3E\x0D											\x3Cinput type=\x22text\x22 name=\x22value\x22 value=\x22Value\x22\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe08c;\x22 class=\x22move\x22\x3E\x3C/span\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe004;\x22 class=\x22add\x22\x3E\x3C/span\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe093;\x22 class=\x22delete\x22\x3E\x3C/span\x3E\x0D										\x3C/li\x3E", "#options-list", "#bulk-options li", "Options", "f_button", "Icons", "\x3Cli\x3E\x0D											\x3Cinput type=\x22radio\x22 name=\x22checked\x22\x3E\x0D											\x3Cinput type=\x22text\x22 name=\x22label\x22 value=\x22", "\x22\x3E\x0D											\x3Cinput type=\x22text\x22 name=\x22value\x22 value=\x22", "\x22\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe08c;\x22 class=\x22move\x22\x3E\x3C/span\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe004;\x22 class=\x22add\x22\x3E\x3C/span\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe093;\x22 class=\x22delete\x22\x3E\x3C/span\x3E\x0D										\x3C/li\x3E", "#options-list .delete", "#options-list li", "slideUp", "#options-list .add", "\x3Cli class=\x22selected\x22 style=\x22display:none;\x22\x3E\x0D											\x3Cinput type=\x22radio\x22 name=\x22checked\x22\x3E\x3Cinput type=\x22text\x22 name=\x22label\x22 value=\x22Text\x22\x3E\x0D											\x3Cinput type=\x22text\x22 name=\x22value\x22 value=\x22value\x22\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe08c;\x22 class=\x22move\x22\x3E\x3C/span\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe004;\x22 class=\x22add\x22\x3E\x3C/span\x3E\x0D											\x3Cspan data-icon=\x22\x26#xe093;\x22 class=\x22delete\x22\x3E\x3C/span\x3E\x0D										\x3C/li\x3E", "after", "#options-list li:eq(", "slideDown", "#options-list .selected", "#save-items", "f_list", "\x3Cli\x3E", "\x3C/li\x3E", "#items-list .items-list-li", "ul", "Save unordered list!", "cut copy paste", ".ui-spinner-input", "preventDefault", "shiftKey", "keyup change", "#preview-screen", "preview_screen", "#items-list .add", "#items-list li", "\x3Cli class=\x27clearfix\x27\x3E\x0D					          \x3Cspan class=\x27label\x27\x3E\x3Cinput class=\x27items-list-li\x27 type=\x27text\x27 value=\x27Lorem ipsum dolor sit amet, consectetur adipisicing elit.\x27\x3E\x3C/span\x3E\x0D										\x3Cspan data-icon=\x27\x26#xe08c;\x27 class=\x27move\x27\x3E\x3C/span\x3E\x0D										\x3Cspan data-icon=\x27\x26#xe004;\x27 class=\x27add\x27\x3E\x3C/span\x3E\x0D										\x3Cspan data-icon=\x27\x26#xe093;\x27 class=\x27delete\x27\x3E\x3C/span\x3E\x0D									 \x3C/li\x3E", "#items-list li:eq(", "#items-list .selected", "#items-list .delete", "li", "create", "preview", "print", "required", "delete", "Select a field first.", "tabs_style", "notification", "mail", "code", "confirmation", "thank-you", "change keyup", "#p_target_attribute", "target", "a", "#p_fonts", "font-family", ":header, p, li", "#p_compare_with", "data-compare", "#p_list_type", "#p_input_mask", ".blur", ".clickinput", "clickInput", ".ui-spinner input", "spinner", "spin", ".ui-spinner", "keyup keydown", ".textinput", "textInput", "boolean", "message", "\x3Cp\x3EBuild your form first.\x3C/p\x3E", "guifbox", "href", "http://gtmetrix.com/?url=", "preview_url", "#window-preview", "#canvas .button", ".button", "destroy", "buttonset", "f_spinner", "#canvas .ui-spinner", "data-max", "data-min", "validation", "data-validation", "alignment", "align-left align-right align-center align-justify", "align-", "text-align", "hide_label", ":checked", "is", "hide-label", "submit_alignment", "option", "slider", "#p_submit_offset", "margin-left", ".wrap span", "0px", ".p_submit_offset_value span", "p_show_reset", "#p_reset_text", "\x3Cbutton name=\x22reset\x22 type=\x22reset\x22\x3E", "Clear Form", "\x3C/button\x3E", "before", "button[type=submit]", "button[type=reset]", "p_unique_value", "data-unique", "true", "false", "p_visible", "hidden", "p_display", "none", "p_multiple_file", "input[type=\x22file\x22]", "multiple", "\x3Cdiv class=\x22guif-dropzone\x22\x3E\x3C/div\x3E", "wrap", "\x3Cspan\x3EAdd File\x3C/span\x3E", ".guif-dropzone", "[]", "removeAttr", "[", "span", "p_short_description", ".short-description", "span, b, strong, i, em, u, br, blockquote, a", "\x3Cp class=\x27short-description\x27\x3E", "\x3C/p\x3E", "p_file_extensions", "file-accept", "p_input_mask", "p_submit_text", "span, strong, i, u", "button[type=\x27submit\x27]", "p_reset_text", "button[type=\x27reset\x27]", "p_loading_text", "data-loader", "p_placeholder", "input[type=\x27text\x27], textarea", "p_text_label", ".ui-tabs-nav a:eq(0)", "span, strong, i, u, em, blockquote", "p_default_value", "f_radio", "f_checkbox", "data-default", "input, textarea, select", "p_sub_text", "span, em, u, blockquote, a, strong, i", ".sub-text", "\x3Cdiv class=\x27sub-text\x27\x3E", "\x3C/div\x3E", "p_text", "f_folding", ".folding-text", ":header", "p_text_content", "p", "\x0A\x0A", "\x3Cp\x3E", "p_maximum", "f_slider", "refresh", "max", "p_minimum", "min", "p_label_width", ".shrink, .top-align", "not", "p_max_input", "maxlength", "p_max_size", "file-maxsize", "input[type=\x27file\x27]", "p_height", "px", "min-height", "p_width", "p_textarea_height", "p_columns", "options_column", "p_options_label", "p_font_size", "font-size", "p_line_height", "line-height", "p, li", "p_months_number", "data-monthsnumber", "f_datetime_picker", "p_slider_step", "data-step", "p_password_minimum_length", "data-minlength", "br", "\x3Cbr\x3E", ".wrap label", ".wrap label:eq(", "f_radio_wrap wrap column[", "]", ".f_radio_wrap", "f_checkbox_wrap wrap column[", ".f_checkbox_wrap", "column[]", ".f_radio_wrap, .f_checkbox_wrap", "\x3Cli\x3E\x3Ca href=\x22#tab-properties\x22\x3E", "\x3C/a\x3E\x3C/li\x3E", "\x3Cli style=\x22display: none;\x22\x3E\x3Ca href=\x22#tab-properties\x22\x3EProperties\x3C/a\x3E\x3C/li\x3E", "\x3Cdiv class=\x22tabs\x22 id=\x22window-form_style\x22\x3E\x0D										\x3Cul\x3E\x0D											\x3Cli\x3E\x3Ca href=\x22#tab-colors\x22\x3EColors\x3C/a\x3E\x3C/li\x3E\x0D											\x3Cli\x3E\x3Ca href=\x22#tab-fonts\x22\x3EFonts\x3C/a\x3E\x3C/li\x3E\x0D											\x3Cli\x3E\x3Ca href=\x22#tab-css\x22\x3ECSS Style\x3C/a\x3E\x3C/li\x3E\x0D										\x3C/ul\x3E\x0D										\x3Cdiv id=\x22tab-colors\x22\x3E\x3C/div\x3E\x0D										\x3Cdiv id=\x22tab-fonts\x22\x3E\x3C/div\x3E\x0D										\x3Cdiv id=\x22tab-css\x22\x3E\x3C/div\x3E\x0D									\x3C/div\x3E", "#FFFFFF", "colors", ".ui-tabs-anchor", "tabs", ".tabs", "\x3Cli id=\x22tab-li-group\x22\x3E\x3Ca href=\x22#tab-group\x22\x3EGroup\x3C/a\x3E\x3C/li\x3E", "\x3Cli id=\x22tab-li-properties\x22\x3E\x3Ca href=\x22#tab-properties\x22\x3E", "\x3Cli id=\x22tab-li-options\x22\x3E\x3Ca href=\x22#tab-options\x22\x3EOptions\x3C/a\x3E\x3C/li\x3E", "\x3Cli id=\x22tab-li-items\x22\x3E\x3Ca href=\x22#tab-items\x22\x3EItems\x3C/a\x3E\x3C/li\x3E", "\x3Cli id=\x22tab-li-html\x22\x3E\x3Ca href=\x22#tab-html\x22\x3EHTML Source\x3C/a\x3E\x3C/li\x3E", "\x3Cdiv class=\x22tabs\x22 id=\x22window-properties\x22\x3E\x0D										\x3Cul\x3E\x0D											", "\x0D											", "\x0D										\x3C/ul\x3E\x0D										\x3Cdiv id=\x22tab-properties\x22\x3E\x3C/div\x3E\x0D										\x3Cdiv id=\x22tab-options\x22\x3E\x3C/div\x3E\x0D										\x3Cdiv id=\x22tab-group\x22\x3E\x3C/div\x3E\x0D										\x3Cdiv id=\x22tab-items\x22\x3E\x3C/div\x3E\x0D										\x3Cdiv id=\x22tab-html\x22\x3E\x3C/div\x3E\x0D									\x3C/div\x3E", "Properties", "#properties", "ui_tabs_properties", ".ui-tabs-nav li, #tab-options, #tab-group, #tab-items, #tab-html", "show", "ui-tabs-active ui-state-active", "#tab-li-properties", "#tab-properties", "f_html", "#tab-li-html", "#tab-li-items", "f_select", "#tab-li-options", "#tab-li-group", "f_submit", "Submit Button", "List", "f_image", "Image", "HTML", "Page Break", "tab_options", "tab_groups", "tab_items", "tabsHtml", "#window-properties.tabs", "\x3Cdiv\x3E\x3Ctextarea id=\x27html-source\x27 style=\x27width: 533px; height: 364px; resize: none;\x27\x3E\x3C/textarea\x3E\x3C/div\x3E", "#tab-html", "#p_text_label", "[name=hide_label]", "#p_item_id", "[name=p_visible]", "[name=p_display]", "#required", "f_heading", "#p_text", "#p_font_size", "#p_sub_text", "[name=alignment][value=", "f_letter", "#p_text_content", "#p_line_height", "#p_default_value", "f_text", "[name=validation][value=", "[name=p_unique_value]", "f_phone", "input[type=\x22text\x22]", "#p_short_description", "f_textarea", "f_email", "#p_placeholder", "input[type=\x27text\x27], select, textarea", "#p_max_input", "outerWidth", "#p_width", "#p_height", "#p_textarea_height", "#p_columns", "innerWidth", "#p_options_label", "f_password", "#p_password_minimum_length", "f_confirm_password", "shrink", "disabled", "#p_label_width", "#p_maximum", "#p_minimum", "f_file", "#p_max_size", "#p_file_extensions", "[name=\x22p_multiple_file\x22]", "#p_submit_text", "#p_loading_text", "[name=submit_alignment][value=", ".clickinput[name=p_show_reset]", "[name=submit_alignment]", ".prop-value .button", "js/", "\x3C?php\x0A global $guiform;\x0A echo $guiform-\x3EprintForm(", ", array(\x27responsive\x27 =\x3E \x27all\x27));\x0A?\x3E", "outerHeight", "#canvas .ui-sortable li.ui-draggable", "POST", "#code-source", "ajax", "#code-javascript", "\x3Cdiv id=\x22window-code\x22\x3E\x0D											\x3Ch2\x3EForm preview link!\x3C/h2\x3E\x0D											\x3Cp\x3EThis a direct link for your form preview.\x3C/p\x3E\x0D											\x3Clabel\x3E\x3Cinput id=\x22ssl-link\x22 type=\x22checkbox\x22\x3ESecure form\x3C/label\x3E\x0D											\x3Cinput type=\x22text\x22 readonly=\x22readonly\x22 value=\x22", "\x22\x3E\x0D											\x3Cdiv id=\x22window-code-list\x22\x3E\x0D												\x3Ch3\x3EWordpress\x3C/h3\x3E\x0D												\x3Cdiv\x3E\x0D													\x3Cp\x3E\x3Cstrong\x3EShort Code\x3C/strong\x3E\x3C/p\x3E\x0D													\x3Cinput type=\x22text\x22 readonly=\x22readonly\x22 value=\x22[GuiForm id=\x26quot;", "\x26quot; responsive=\x26quot;all\x26quot;]\x22\x3E \x0D													\x3Cbr\x3E\x3Cbr\x3E\x3Cp\x3E\x3Cstrong\x3EPhp Code\x3C/strong\x3E\x3C/p\x3E\x0D													\x3Cinput type=\x22text\x22 readonly=\x22readonly\x22 value=\x22\x26lt;?php echo do_shortcode(\x26quot;[GuiForm id=\x26#39;", "\x26#39; responsive=\x26#39;all\x26#39;]\x26quot;); ?\x26gt;\x22\x3E\x0D													\x3Cbr\x3E\x0D													\x3Cbr\x3E\x0D													\x3Cp\x3E\x3Cstrong\x3EAdmin Short Code\x3C/strong\x3E\x3C/p\x3E\x0D													\x3Ctextarea style=\x22height: 90px;\x22 readonly=\x22readonly\x22\x3E", "\x3C/textarea\x3E\x0D												\x3C/div\x3E\x0D												\x3Ch3\x3EEMBED\x3C/h3\x3E\x0D												\x3Cdiv\x3E\x0D													\x3Ctextarea readonly=\x22readonly\x22\x3E\x3Cscr", "ipt type=\x22text/javascript\x22 src=\x22", "\x22\x3E\x3C/scr", "ipt\x3E\x3C/textarea\x3E\x0D												\x3C/div\x3E\x0D												\x3Ch3\x3EIFRAME\x3C/h3\x3E\x0D												\x3Cdiv\x3E\x0D													\x3Ctextarea style=\x22height: 110px;\x22 readonly=\x22readonly\x22\x3E\x3Ciframe class=\x22GuiFormIFrame\x22 onload=\x22window.parent.scrollTo(0,0)\x22 allowtransparency=\x22true\x22 src=\x22", "\x22 frameborder=\x220\x22 style=\x22width:100%; height: ", "px; border:none;\x22 scrolling=\x22no\x22\x3E\x3C/iframe\x3E\x3C/textarea\x3E\x0D												\x3C/div\x3E\x0D												\x3Ch3\x3ESource Code\x3C/h3\x3E\x0D												\x3Cdiv\x3E\x0D													\x3Cpre\x3E\x3Ccode\x3E\x3Ctextarea style=\x22height: 150px;\x22 id=\x22code-source\x22 readonly=\x22readonly\x22\x3E", "\x3C/textarea\x3E\x3C/code\x3E\x3C/pre\x3E\x0D												\x3C/div\x3E\x0D												\x3Ch3\x3EJavascript\x3C/h3\x3E\x0D												\x3Cdiv\x3E\x0D													\x3Ctextarea style=\x22height: 150px;\x22 id=\x22code-javascript\x22 readonly=\x22readonly\x22\x3E", "\x3C/textarea\x3E\x0D												\x3C/div\x3E\x0D										\x3C/div\x3E", "content", "accordion", "#window-code-list", "https", "textarea, input", "#window-code", "http", "#ssl-link", "contentWindow", "document", "contentDocument", ".ui-sortable .error", "#container", "saving", "#save", "\x3Cp style=\x22padding: 10px;\x22\x3EBuild your form first.\x3C/p\x3E", "error", "\x3Cp style=\x22padding: 10px;\x22\x3EAn error occurred please check your form...\x3C/p\x3E", "uiDestroy", ".ui-resizable-handle", "restored-item", "data-type", "input, select, textarea", ".active", "aria-disabled", "100%", "offsetWidth", "canvas", "getElementById", "data-name data-type", "ui-draggable", "ui-state-default ui-droppable ui-sortable", ".ui-sortable", "style data-name", ".ui-draggable", "list", "heading", "submit", "letter", "button", ".f_", "f_", "className", "unique", "extension", ",", "maxsize", "minimum_length", "max_value", "min_value", "compare", "select option", "array", "prependTo", "\x3Ciframe /\x3E", "saveForm", " width: 100%; height : 400px;", "javascript:false;", "\x3Cinput type=\x22text\x22 name=\x22action\x22 value=\x22guiform-save-form\x22\x3E\x0D										 \x3Cinput type=\x22text\x22 name=\x22guiform_nonce\x22 value=\x22", "nonce", "\x22\x3E\x0D										 \x3Ctextarea name=\x22data\x22\x3E", "stringify", "\x3C/textarea\x3E\x0D										 \x3Cinput name=\x22guiform_save_form\x22 type=\x22submit\x22 value=\x22post\x22\x3E", "\x3Cform /\x3E", "getDoc", "documentElement", "iframe[name=saveForm], form[name=saveForm]", "innerHTML", "parseJSON", "status", "\x3Cp style=\x22padding: 10px;\x22\x3E", "#containment", "screenPreview", "?action=guiform-form-preview\x26nonce=", "\x26height=", "\x26width=", "\x26id=", "#responsive-style", "contents", "#TB_window iframe", "then", "trigger", "when", "#thickbox-preview", "\x26tab=", "\x26form=", "load", "#saveForm input[type=submit]", "#canvas .ui-spinner-input", "\x26", "#responsive-style, .error-message", "\x3Clink id=\x22responsive-style\x22 media=\x22all\x22 type=\x22text/css\x22 href=\x22", "plugins_url", "assets/css/responsive.css\x22 rel=\x22stylesheet\x22\x3E", "head", "#TB_window", "#ui-sortable .ui-draggable", "Create your form first.", "#canvas .ui-draggable.selected", "\x3Cp style=\x22padding: 10px;\x22\x3ESelect atleast two item by holding down CTRL + Left Click to the field.\x3C/p\x3E", "merge-item", "\x3Cdiv id=\x27", "\x27 data-type=\x27", "\x27 data-name=\x27", "\x27 class=\x27merge-item ", "\x27\x3E", "#canvas .selected:not(#canvas .merge), #canvas .selected .merge-item", "selected ui-draggable", ".selected", "item-merge-", "substring", "random", "#canvas .selected:eq(0)", "active merge", ".merge-item:eq(0)", "#canvas .active.merge", "#canvas .selected", ".ui-sortable .ui-draggable.merge.active", ".ui-sortable li.ui-draggable.active .merge-item.active", "#canvas .ui-draggable.active", ".ui-sortable .merge.active .merge-item", "removed-item", ".ui-sortable .merge.active .merge-item:eq(", ".ui-sortable .merge.active", ".ui-sortable .merge.active .merge-item:eq(0)", ".ui-sortable li", "#canvas .item", "Ok", "hex6", "background-color:", ".label{color:", "border:", "color", "set", "spectrum", "borderColor", "backgroundColor", "rgba(255, 255, 255, 0.01)", "setColors", ".basic", ".label{color: ", "background-color: ", "border: ", "#header li", "#header #colors", "\x3Ctable cellspacing=\x270\x27 cellpadding=\x274\x27\x3E\x0D										\x3Ctbody\x3E\x0D											\x3Ctr\x3E\x0D												\x3Ctd class=\x27prop-label\x27 style=\x27width: 75%; font-weight: normal;\x27\x3EBackground Color\x3C/td\x3E\x0D												\x3Ctd class=\x27prop-value\x27 align=\x27center\x27\x3E\x3Cinput type=\x27text\x27 id=\x27backgroundColor\x27 class=\x27basic\x27 value=\x27", "\x27 /\x3E\x3C/td\x3E\x0D											\x3C/tr\x3E\x0D											\x3Ctr\x3E\x0D												\x3Ctd class=\x27prop-label\x27 style=\x27font-weight: normal;\x27\x3ELabel Color\x3C/td\x3E\x0D												\x3Ctd class=\x27prop-value\x27 align=\x27center\x27\x3E\x3Cinput type=\x27text\x27 id=\x27color\x27 class=\x27basic\x27 value=\x27", "\x27 /\x3E\x3C/td\x3E\x0D											\x3C/tr\x3E\x0D											\x3Ctr\x3E\x0D												\x3Ctd class=\x27prop-label\x27 style=\x27font-weight: normal;\x27\x3EBorder Color\x3C/td\x3E\x0D												\x3Ctd class=\x27prop-value\x27 align=\x27center\x27\x3E\x3Cinput type=\x27text\x27 id=\x27borderColor\x27 class=\x27basic\x27 value=\x27", "\x27 /\x3E\x3C/td\x3E\x0D											\x3C/tr\x3E\x0D										\x3C/tbody\x3E\x0D									\x3C/table\x3E", ".tabs #tab-colors", "color_picker", "#header #fonts", "\x3Cdiv id=\x27fonts-container\x27 class=\x27wrapper\x27\x3E\x3Cul class=\x27list\x27\x3E", "\x3Cli class=\x27list active\x27 style=\x27font-family: ", ";\x27 data-value=\x27", "\x3Cli class=\x27list\x27 style=\x27font-family: ", "\x3C/ul\x3E\x3C/div\x3E", ".tabs #tab-fonts", "\x3Cselect name=\x27\x27 id=\x27p_fonts\x27\x3E", "\x3Coption selected=\x27selected\x27 style=\x27font-family: ", "\x3Coption style=\x27font-family: ", "\x3Cdiv\x3E\x3Cp\x3EStart your CSS code with \x3Cstrong\x3E#canvas\x3C/strong\x3E selector.\x3C/p\x3E\x3Ctextarea id=\x27guiform-canvas\x27\x3E\x3C/textarea\x3E\x3C/div\x3E", ".tabs #tab-css", "contenteditable", "guiEditable", "element", "insertAfter", "Item ID", "Visibility", "Display", "Text", "Sub Text", "Text Alignment", "Font Family", "Font Size", "Layout", "Text Content", "Line Height", "List Type", "Label", "Hide Label", "Input Mask", "Unique Value", "Label Width", "Default Value", "Placeholder", "Short Description", "Validation", "Maximum Input", "Textarea Height", "Option Columns", "Options Text Width", "Submit Text", "Reset Text", "Loading Text", "Submit Alignment", "Show Reset Button", "Offset", "Allow Multiple Upload", "File Extentions", "Max File Size", "Password Minimum Length", "Compare With", "Maximum Value", "Minimum Value", "buildProperties", "Submit Butto", "Header", "Letter", "\x3Cli id=\x27li-", "\x27 class=\x27clearfix\x27\x3E\x0D				          \x3Cspan class=\x27label\x27\x3E", "\x3C/span\x3E\x0D									\x3Cspan data-icon=\x27\x26#xe08c;\x27 class=\x27move\x27\x3E\x3C/span\x3E\x0D									\x3Cspan data-icon=\x27\x26#xe093;\x27 class=\x27delete\x27\x3E\x3C/span\x3E\x0D								 \x3C/li\x3E", "\x3Cul id=\x27group-list\x27\x3E", "#tab-group", "y", ".move", "ui-state-highlight", "pointer", "item-", "item", "#group-list li", "div.merge-item:eq(", "#group-list", "#group-list .delete", ".merge-item:eq(", "\x3Cul id=\x27items-list\x27\x3E", "\x3Cli class=\x27clearfix\x27\x3E\x0D				          \x3Cspan class=\x27label\x27\x3E\x3Cinput class=\x27items-list-li\x27 type=\x27text\x27 value=\x27", "\x27\x3E\x3C/span\x3E\x0D									\x3Cspan data-icon=\x27\x26#xe08c;\x27 class=\x27move\x27\x3E\x3C/span\x3E\x0D									\x3Cspan data-icon=\x27\x26#xe004;\x27 class=\x27add\x27\x3E\x3C/span\x3E\x0D									\x3Cspan data-icon=\x27\x26#xe093;\x27 class=\x27delete\x27\x3E\x3C/span\x3E\x0D								 \x3C/li\x3E", "\x3Cdiv style=\x22text-align: right; margin-bottom: 10px;\x22\x3E\x0D								\x3Ca onclick=\x22return false;\x22 href=\x22javascript:void(0);\x22 class=\x22button-primary\x22 id=\x22save-items\x22\x3ESave\x3C/a\x3E\x0D							\x3C/div\x3E", "#tab-items", "#items-list", ":selected", "\x3Cinput checked=\x22checked\x22 type=\x22radio\x22 name=\x22checked\x22\x3E", "\x3Cinput type=\x22radio\x22 name=\x22checked\x22\x3E", "\x3Cinput type=\x22text\x22 name=\x22label\x22 value=\x22", "\x22\x3E\x0D												\x3Cinput type=\x22text\x22 name=\x22value\x22 value=\x22", "\x22\x3E\x0D												\x3Cspan data-icon=\x22\x26#xe08c;\x22 class=\x22move\x22\x3E\x3C/span\x3E\x0D											  \x3Cspan data-icon=\x22\x26#xe004;\x22 class=\x22add\x22\x3E\x3C/span\x3E\x0D											  \x3Cspan data-icon=\x22\x26#xe093;\x22 class=\x22delete\x22\x3E\x3C/span\x3E\x0D											\x3C/li\x3E", "label[for=\x27", "\x27] .ui-button-text", "\x3Cinput type=\x22text\x22 name=\x22label\x22 value=\x22\x22\x3E\x0D														\x3Cinput type=\x22text\x22 name=\x22value\x22 value=\x22", "\x22\x3E\x0D														\x3Cspan data-icon=\x22\x26#xe08c;\x22 class=\x22move\x22\x3E\x3C/span\x3E\x0D											      \x3Cspan data-icon=\x22\x26#xe004;\x22 class=\x22add\x22\x3E\x3C/span\x3E\x0D											      \x3Cspan data-icon=\x22\x26#xe093;\x22 class=\x22delete\x22\x3E\x3C/span\x3E\x0D													 \x3C/li\x3E", "\x3Cinput type=\x22text\x22 name=\x22label\x22 value=\x22\x22\x3E\x0D													\x3Cinput type=\x22text\x22 name=\x22value\x22 value=\x22", "\x22\x3E\x0D													\x3Cspan data-icon=\x22\x26#xe08c;\x22 class=\x22move\x22\x3E\x3C/span\x3E\x0D										      \x3Cspan data-icon=\x22\x26#xe004;\x22 class=\x22add\x22\x3E\x3C/span\x3E\x0D										      \x3Cspan data-icon=\x22\x26#xe093;\x22 class=\x22delete\x22\x3E\x3C/span\x3E\x0D											 	\x3C/li\x3E", "input[name=\x27label\x27]", "\x3Cul id=\x22visual-text\x22\x3E\x3Cli class=\x22active\x22\x3EVisual\x3C/li\x3E\x3C/ul\x3E", "\x3Ctable cellspacing=\x220\x22 cellpadding=\x224\x22\x3E\x0D		  				 \x3Cthead\x3E\x3Ctr\x3E\x0D									\x3Cth style=\x22width: 160px;\x22\x3EOptions\x3C/th\x3E\x0D									\x3Cth style=\x22width: 197px;\x22\x3ELabel\x3C/th\x3E\x0D									\x3Cth style=\x22border-right: medium none;\x22\x3EValue\x3C/th\x3E\x0D									\x3Cth style=\x22\x22\x3E\x3C/th\x3E\x0D							 \x3C/tr\x3E\x3C/thead\x3E", "\x3Ctr\x3E\x3Ctd style=\x22padding: 0px;\x22\x3E\x3Cul id=\x22bulk-options\x22\x3E", "\x3Cli class=\x27options\x27\x3E", "\x3C/ul\x3E\x3C/td\x3E\x3Ctd colspan=\x223\x22 style=\x22vertical-align: top;padding: 0px;\x22\x3E\x0D								 \x3Cul id=\x22options-list\x22\x3E", "\x3C/ul\x3E\x0D							 \x3C/td\x3E\x3C/tr\x3E\x3C/table\x3E", "\x3Cdiv style=\x22text-align: right;\x22\x3E\x0D								\x3Ca onclick=\x22return false;\x22 href=\x22javascript:void(0);\x22 class=\x22button-primary\x22 id=\x22clear-options\x22\x3EClear Options\x3C/a\x3E\x0D								\x3Ca onclick=\x22return false;\x22 href=\x22javascript:void(0);\x22 class=\x22button-primary\x22 id=\x22save-options\x22\x3ESave\x3C/a\x3E\x0D							\x3C/div\x3E", "#tab-options", "build_options", "select, input", "input[name=\x22label\x22]", "input[name=\x22value\x22]", "input[name=\x22checked\x22]", "checked=\x22checked\x22", "selected=\x22selected\x22", "\x3Coption ", " value=\x27", "\x3Clabel\x3E\x3Cinput ", " data-type=\x27", "\x27 name=\x27", "\x27 type=\x27radio\x27 value=\x27", "\x27\x3E\x3Cspan\x3E", "\x3C/span\x3E\x3C/label\x3E", "[]\x27 type=\x27checkbox\x27 value=\x27", "button-", "\x27 type=\x27radio\x27 ", "\x27 /\x3E\x3Clabel for=\x27", "\x3C/label\x3E", "\x3Cdiv class=\x27button\x27\x3E", "Save options!", "\x3Ctable cellspacing=\x220\x22 cellpadding=\x224\x22\x3E", "\x3Ctr\x3E\x3Ctd style=\x27width:200px;\x27 class=\x27prop-label\x27\x3E\x3Cp class=\x27prop-text\x27\x3E", "\x3Cdiv class=\x27prop-hint\x27\x3E", "\x3C/td\x3E\x3Ctd class=\x27prop-value\x27\x3E", "font_property", "\x3C/td\x3E\x3Ctr\x3E", "\x3C/table\x3E", "n", ".prop-spinner", "#header #properties", "\x3Coption value=\x27\x27\x3E\x3C/option\x3E", "\x3Coption value=\x27", "#canvas .f_password", "#delete", "widget", "firefox", "\x3Cdiv id=\x27#GuiForm\x27\x3E\x3C/div\x3E", "\x3Cdiv id=\x27canvas\x27\x3E\x3C/div\x3E", "\x3Cdiv id=\x27container\x27\x3E\x3C/div\x3E", "\x3Cdiv id=\x27containment\x27\x3E\x3Cul id=\x27sortable\x27 class=\x27clearfix\x27\x3E\x3C/ul\x3E\x3C/div\x3E", "\x3Cdiv id=\x27tools\x27\x3E\x3C/div\x3E", "\x3Cdiv id=\x27contextMenu\x27\x3E\x3C/div\x3E", "#tools li", "#canvas .active", "\x3Cdiv class=\x27tools\x27\x3E\x3C/div\x3E", "\x3Cdiv id=\x27property\x27\x3E\x3C/div\x3E", "\x3Cdiv class=\x27content\x27\x3E\x3C/div\x3E", "Text Box", "\x26#xe07b;", "Text Area", "\x26#xe072;", "Drop Down", "\x26#xe042;", "Radio Button", "\x26#xe069;", "Check Box", "\x26#xe06a;", "File Upload", "\x26#xe008;", "Password", "\x26#xe075;", "Confirm Password", "Heading", "\x3Cstrong\x3EH\x3C/strong\x3E", "\x26#xe0d6;", "\x26#xe001;", "Phone Number", "\x26#xe04e;", "Email Address", "\x26#xe01a;", "Spinner", "\x26#xe041;", "Button", "\x26#xe0b9;", "\x3Cdiv class=\x27wrap\x27\x3E\x3Ch1\x3EHeading\x3C/h1\x3E\x3C/div\x3E", "\x3Cdiv class=\x22wrap\x22\x3E\x3Cp\x3E\x22Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\x22\x3C/p\x3E\x3C/div\x3E", "\x3Cdiv class=\x22wrap\x22\x3E\x0D																				\x3Cul\x3E\x0D																					\x3Cli\x3ELorem ipsum dolor sit amet, consectetur adipisicing elit.\x3C/li\x3E\x0D																					\x3Cli\x3ELorem ipsum dolor sit amet, consectetur adipisicing elit.\x3C/li\x3E\x0D																					\x3Cli\x3ELorem ipsum dolor sit amet, consectetur adipisicing elit.\x3C/li\x3E\x0D																				\x3C/ul\x3E\x0D																			\x3C/div\x3E", "\x3Clabel class=\x27label\x27\x3EText Box\x3C/label\x3E\x3Cdiv class=\x27wrap\x27 style=\x27width: 300px;\x27\x3E\x3Cinput type=\x27text\x27 data-validation=\x27none\x27\x3E\x3C/div\x3E", "VARCHAR(150) NOT NULL DEFAULT \x27\x27", "\x3Clabel class=\x27label\x27\x3EText Area\x3C/label\x3E\x3Cdiv class=\x27wrap\x27 style=\x27width: 300px;\x27\x3E\x3Ctextarea\x3E\x3C/textarea\x3E\x3C/div\x3E", "MEDIUMTEXT NOT NULL DEFAULT \x27\x27", "\x3Clabel class=\x27label\x27\x3EDrop Down\x3C/label\x3E\x0D																			\x3Cdiv class=\x27wrap\x27 style=\x27width: 300px;\x27\x3E\x0D																				\x3Cselect name=\x27\x27\x3E\x0D																					\x3Coption value=\x27Option 1\x27\x3EOption 1\x3C/option\x3E\x0D																					\x3Coption value=\x27Option 2\x27\x3EOption 2\x3C/option\x3E\x0D																					\x3Coption value=\x27Option 3\x27\x3EOption 3\x3C/option\x3E\x0D																				\x3C/select\x3E\x0D																			\x3C/div\x3E", "\x3Clabel class=\x27label\x27\x3ERadio Button\x3C/label\x3E\x0D																			\x3Cdiv class=\x27f_radio_wrap wrap\x27 style=\x27width: 300px;\x27\x3E\x0D																				\x3Clabel\x3E\x3Cinput type=\x27radio\x27 value=\x27Option 1\x27\x3E\x3Cspan\x3EOption 1\x3C/span\x3E\x3C/label\x3E\x3Cbr\x3E\x0D																				\x3Clabel\x3E\x3Cinput type=\x27radio\x27 value=\x27Option 2\x27\x3E\x3Cspan\x3EOption 2\x3C/span\x3E\x3C/label\x3E\x3Cbr\x3E\x0D																				\x3Clabel\x3E\x3Cinput type=\x27radio\x27 value=\x27Option 3\x27\x3E\x3Cspan\x3EOption 3\x3C/span\x3E\x3C/label\x3E\x3Cbr\x3E\x0D																			\x3C/div\x3E", "\x3Clabel class=\x27label\x27\x3ECheck Box\x3C/label\x3E\x0D																			\x3Cdiv class=\x27f_checkbox_wrap wrap\x27 style=\x27width: 300px;\x27\x3E\x0D																				\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 value=\x27Option 1\x27\x3E\x3Cspan\x3EOption 1\x3C/span\x3E\x3C/label\x3E\x3Cbr\x3E\x0D																				\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 value=\x27Option 2\x27\x3E\x3Cspan\x3EOption 2\x3C/span\x3E\x3C/label\x3E\x3Cbr\x3E\x0D																				\x3Clabel\x3E\x3Cinput type=\x27checkbox\x27 value=\x27Option 3\x27\x3E\x3Cspan\x3EOption 3\x3C/span\x3E\x3C/label\x3E\x3Cbr\x3E\x0D																			\x3C/div\x3E", "TINYTEXT NOT NULL DEFAULT \x27\x27", "\x3Clabel class=\x27label\x27\x3EFile Upload\x3C/label\x3E\x0D										 		  						\x3Cdiv class=\x27wrap\x27 style=\x27width: 300px;\x27\x3E\x0D										 		  							\x3Cinput type=\x27file\x27 file-maxsize=\x275\x27 file-accept=\x27jpg, jpeg, png, gif\x27\x3E\x0D										 		  						\x3C/div\x3E\x0D										 		  						\x3Cdiv class=\x27gui-files\x27\x3E\x3C/div\x3E", "TEXT NOT NULL DEFAULT \x27\x27", "\x3Cdiv class=\x27wrap\x27 style=\x27text-align: right;\x27\x3E\x3Cspan\x3E\x3Cbutton type=\x27submit\x27 name=\x27submit\x27 disabled=\x27disabled\x27 data-loader=\x27Loading\x27\x3ESubmit\x3C/button\x3E\x3C/span\x3E\x3C/div\x3E", "\x3Clabel class=\x27label\x27\x3EPassword\x3Cspan class=\x27required\x27\x3E*\x3C/span\x3E\x3C/label\x3E\x3Cdiv class=\x27wrap\x27 style=\x27width: 300px;\x27\x3E\x3Cinput type=\x27password\x27\x3E\x3C/div\x3E", "VARCHAR(255) NOT NULL DEFAULT \x27\x27", "\x3Clabel class=\x27label\x27\x3EConfirm Password\x3Cspan class=\x27required\x27\x3E*\x3C/span\x3E\x3C/label\x3E\x3Cdiv class=\x27wrap\x27 style=\x27width: 300px;\x27\x3E\x3Cinput type=\x27password\x27\x3E\x3C/div\x3E", "\x3Clabel class=\x27label\x27\x3EPhone Number\x3C/label\x3E\x3Cdiv class=\x27wrap\x27 style=\x27width: 300px;\x27\x3E\x3Cinput data-mask=\x27(###) ###-####\x27 type=\x27text\x27\x3E\x3C/div\x3E", "\x3Clabel class=\x27label\x27\x3EEmail Address\x3Cspan class=\x27required\x27\x3E*\x3C/span\x3E\x3C/label\x3E\x3Cdiv class=\x27wrap\x27 style=\x27width: 300px;\x27\x3E\x3Cinput class=\x27validation[email]\x27 data-unique=\x27true\x27 placeholder=\x27ex: info@email.com\x27 type=\x27text\x27\x3E\x3C/div\x3E", "\x3Clabel class=\x27label\x27\x3EText Label\x3C/label\x3E\x3Cdiv class=\x27wrap\x27 style=\x27width: 110px;\x27\x3E\x3Cinput class=\x27ui-spinner\x27 type=\x27text\x27\x3E\x3C/div\x3E", "\x3Clabel class=\x27label\x27\x3EText Label\x3C/label\x3E\x0D																			\x3Cdiv class=\x27wrap\x27\x3E\x0D																				\x3Cdiv class=\x27button\x27\x3E\x0D																					\x3Cinput type=\x27radio\x27 value=\x271\x27 /\x3E\x3Clabel\x3EOn\x3C/label\x3E\x0D																					\x3Cinput type=\x27radio\x27 value=\x270\x27 /\x3E\x3Clabel\x3EOff\x3C/label\x3E\x0D																				\x3C/div\x3E\x0D																			\x3C/div\x3E", "VARCHAR(150) NOT NULL DEFAULT \x270\x27", "\x3Cli\x3E\x3Cspan id=\x27c_nextLineOn\x27\x3ENext Line On\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27c_nextLineOff\x27\x3ENext Line Off\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27c_shrink\x27\x3EShrink\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27c_expand\x27\x3EExpand\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27c_blockLine\x27\x3EBlock Display\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27c_floatLine\x27\x3EInline Display\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27c_delete\x27\x3EDelete\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27g_blockLine\x27\x3EGroup: Block Display\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27g_floatLine\x27\x3EGroup: Inline Display\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27g_nextLineOn\x27\x3EGroup: Next Line On\x3C/span\x3E\x3C/li\x3E", "\x3Cli\x3E\x3Cspan id=\x27g_nextLineOff\x27\x3EGroup: Next Line Off\x3C/span\x3E\x3C/li\x3E", "htmlTools", "tools", "Container", "Selector", "form", "Tools", "\x3Ch3\x3E", "\x3C/h3\x3E", "\x3Cul\x3E", "t_heading", "\x3Cli id=\x27", "\x27\x3E\x3Cspan class=\x27icon\x27\x3E", "\x3C/span\x3E\x3Cspan class=\x27text\x27\x3E", "\x3C/span\x3E\x3C/li\x3E", "\x27\x3E\x3Cspan class=\x27icon\x27 data-icon=\x27", "\x27\x3E\x3C/span\x3E\x3Cspan class=\x27text\x27\x3E", "htmlCanvas", "#guiform-notice", "#canvas ul.ui-sortable", "container", "\x3Cdiv id=\x22guiform-notice\x22\x3E\x0D									\x3Ch2 style=\x22text-align: center; font-size: 24px; line-height: 38px;\x22\x3EUpgrade to \x3Ca style=\x22text-decoration: none;\x22 target=\x22_blank\x22 href=\x22https://www.guiform.com/store/guiform-pro/\x22\x3EGuiForm Pro\x3C/a\x3E now and get more \x3Cspan style=\x22color: #ee2c49;\x22\x3ETools\x3C/span\x3E and \x3Cspan style=\x22color: #ee2c49;\x22\x3EFeatures\x3C/span\x3E or visit our \x3Ca style=\x22text-decoration: none;\x22 target=\x22_blank\x22 href=\x22http://demo.guiform.com/wp-admin/admin.php?page=guiform-builder\x22\x3EDemo\x3C/a\x3E.\x3C/h2\x3E\x0D								\x3C/div\x3E", "contextMenu", "Context", "selector", "floatLine", "g_blockLine", "g_floatLine", "nextLine", "g_nextLineOn", "g_nextLineOff", "c_nextLineOn", "c_nextLineOff", "c_blockLine", "c_floatLine", "c_delete", "c_expand", "c_shrink", "buttonFonts", "#header .wrapper", "init", "\x26form", "\x3Cspan class=\x27canvas-resize\x27\x3E\x3Cspan class=\x27arrow\x27\x3E\x3C/span\x3E\x3Cspan class=\x27canvas-info\x27\x3E\x3C/span\x3E\x3C/span\x3E", "build", "#tools", "t_", "field_", "dragItemID", "t_checkbox", "draggingItem", "\x3Cli\x3E\x3C/li\x3E", "#canvas .ui-sortable", "restored-item ui-draggable", "0", ".ui-draggable[style*=\x27display: none\x27]", "Form", " blockLine expand clearfix item", "phone", "(###) ###-####", "input[name=\x22", "\x22]", "for", "next", "Prop", "disableSelection", "#wpwrap", ".ui-droppable.ui-sortable", "invalid", ".ui-draggable.ui-sortable-helper, .ui-sortable .ui-state-highlight", "dragItem", "block", "axis", "x,y", "#canvas ul#sortable", "enable", "disable", "innerHeight", "li.ui-state-highlight", "inline-block", "both", "sortingItem", "display", "inline-table", "max-height", "maxInputHeight", "#canvas textarea", "ui-state-default", "ui-state-hover", ":not(.ui-sortable-helper)", "blockLine", "droppable", "canvasMinWidth", "e", "minWidth", "resizable", ".canvas-resize", " pixels", ".canvas-resize  .canvas-info", "\x3Cbr /\x3E\x3Cspan\x3ECtrl + left arrow key\x3C/span\x3E", ".canvas-resize .canvas-info", "\x3Cbr /\x3E\x3Cspan\x3ECtrl + right arrow key\x3C/span\x3E", "scrollWidth", "clientWidth", "canvasMaxWidth", "background-color", "#ECECEC", ".ui-resizable-e", "1px", "#collapse-menu", "canvasHeight", "ready", "mousewheel", "float", "scroll", "resize", "#sortable", "#merge", "refreshPositions", "toolLi", "#tools, #header", "#contextual-help-columns .contextual-help-tabs a, #contextual-help-link", "contextmenu", "off", "#c_shrink", "list-item", "expand", "#c_expand", "shrink top-align", "#c_blockLine", "#c_floatLine", "#c_nextLineOff", "#c_nextLineOn", "#p_text_width", "#g_blockLine", "#g_floatLine", "#g_nextLineOff", "#g_nextLineOn", "#c_delete"];
(function() {
    var a = jQuery;
    a[_var[2]][_var[1]] = function() {
        var e = a(this)[_var[3]](0);
        var d = 0;
        if (_var[4] in e) {
            d = e[_var[4]]
        } else {
            if (_var[5] in document) {
                e[_var[6]]();
                var c = document[_var[5]][_var[7]]();
                var b = document[_var[5]][_var[7]]()[_var[9]][_var[8]];
                c[_var[12]](_var[10], -e[_var[11]][_var[8]]);
                d = c[_var[9]][_var[8]] - b
            }
        }
        return d
    };
    a[_var[2]][_var[13]] = function() {
        this[_var[17]](function() {
            if (a(this)[_var[14]]()[_var[8]] == 0) {
                a(this)[_var[15]](a(this)[_var[9]]())
            } else {
                a(this)[_var[14]]()[_var[16]]()
            }
        });
        return this
    };
    a[_var[18]] = function(c, b) {
        var d = a(_var[20])[_var[19]](c);
        d[_var[23]](_var[21] + b + _var[22])[_var[13]]();
        return d
    };
    a[_var[2]][_var[24]] = function(b) {
        this[_var[15]](function() {
            return a(_var[25] + b + _var[26], {
                name: a(this)[_var[28]](_var[27]),
                html: a(this)[_var[29]]()
            })
        })
    };
    a[_var[2]][_var[30]] = function(b) {
        if (b == _var[31]) {
            return (this[0][_var[32]][_var[31]] == _var[33]) ? true : false
        } else {
            if (b == _var[34]) {
                return (this[0][_var[32]][_var[34]] == _var[33]) ? true : false
            }
        }
    };
    a[_var[35]] = function(c, b) {
        b = b ? _var[36] : _var[37];
        return (_var[44] + c)[_var[38]](/&/g, _var[43])[_var[38]](/'/g, _var[42])[_var[38]](/"/g, _var[41])[_var[38]](/</g, _var[40])[_var[38]](/>/g, _var[39])[_var[38]](/\r\n/g, b)[_var[38]](/[\r\n]/g, b)
    };
    a[_var[2]][_var[45]] = function(f) {
        var e = a(this)[_var[28]](_var[46]);
        if (!e || !f) {
            return false
        }
        var d = [];
        e = e[_var[48]](_var[47]);
        for (var c = 0, b = e[_var[8]]; c < b; c++) {
            if (!e[c][_var[49]](f)) {
                d[_var[50]](e[c])
            }
        }
        a(this)[_var[28]](_var[46], d[_var[51]](_var[47]));
        return a(this)
    };
    a[_var[2]][_var[52]] = function(e) {
        var d = a(this)[_var[28]](_var[46]);
        if (!d || !e) {
            return false
        }
        d = d[_var[48]](_var[47]);
        for (var c = 0, b = d[_var[8]]; c < b; c++) {
            if (d[c][_var[49]](e)) {
                return true
            }
        }
        return false
    };
    a[_var[2]][_var[53]] = function(c) {
        if (this[_var[28]]) {
            var b = this[_var[28]](c)
        } else {
            var b = this[_var[54]](c)
        }
        return (typeof b !== _var[55] && b !== false && b !== null)
    };
    a[_var[56]] = function(d, c) {
        c = c || true;
        var b = [_var[57], _var[58], _var[59], _var[60], _var[61]];
        if (d == 0) {
            return _var[62]
        }
        var e = parseInt(Math[_var[64]](Math[_var[63]](d) / Math[_var[63]](1024)));
        c = (c) ? _var[47] + b[e] : _var[44];
        return Math[_var[66]](d / Math[_var[65]](1024, e), 2) + c
    };
    a[_var[67]] = {
        object: function() {
            return navigator[_var[69]][_var[68]]()
        },
        agent: function() {
            if (this[_var[72]]()[_var[71]](_var[70]) > -1) {
                return _var[73] + this[_var[72]]()[_var[48]](_var[75])[1][_var[48]](_var[74])[0]
            } else {
                if (this[_var[72]]()[_var[71]](_var[76]) > -1) {
                    return _var[77] + this[_var[72]]()[_var[48]](_var[77])[1][_var[48]](_var[47])[0]
                } else {
                    if (this[_var[72]]()[_var[71]](_var[78]) > -1) {
                        return _var[79] + this[_var[72]]()[_var[48]](_var[80])[1][_var[48]](_var[47])[0]
                    } else {
                        if (this[_var[72]]()[_var[71]](_var[81]) > -1) {
                            return _var[82] + this[_var[72]]()[_var[48]](_var[82])[1][_var[48]](_var[47])[0]
                        } else {
                            return _var[83] + this[_var[72]]()[_var[48]](_var[83])[1]
                        }
                    }
                }
            }
        },
        name: function() {
            return this[_var[85]]()[_var[48]](_var[84])[0]
        },
        version: function() {
            return this[_var[85]]()[_var[48]](_var[84])[1]
        }
    };
    a[_var[2]][_var[86]] = function() {
        return this[_var[8]] > 0 ? this : false
    };
    a[_var[87]] = {
        emails: function(e, c) {
            c = c || _var[44];
            if (a(guiBuilder[_var[89]])[_var[88]]() > 0) {
                var f = a(_var[93])[_var[92]](function(h) {
                    var g = [
                        [a(_var[90], this)[_var[28]](_var[27]), a(_var[91], this)[_var[9]]()]
                    ];
                    return g
                })[_var[3]]();
                var d = a(_var[96])[_var[92]](function(h) {
                    var g = [
                        [a(this)[_var[28]](_var[27]), a(this)[_var[95]](_var[94])[_var[23]](_var[91])[_var[9]]()]
                    ];
                    return g
                })[_var[3]]();
                var b = _var[97] + e + _var[98] + c + _var[99];
                a[_var[17]](guiBuilder[_var[89]], function() {
                    b += _var[100] + this[_var[27]] + _var[99] + this[_var[27]] + _var[101]
                });
                a[_var[17]](a[_var[102]](f, d), function() {
                    b += _var[103] + this[0] + _var[104] + this[1] + _var[101]
                });
                b += _var[105]
            } else {
                b = _var[106] + guiBuilder[_var[107]] + _var[108]
            }
            return b
        },
        _XMLHttpFactories: [function() {
            return new XMLHttpRequest()
        }, function() {
            return new ActiveXObject(_var[109])
        }, function() {
            return new ActiveXObject(_var[110])
        }, function() {
            return new ActiveXObject(_var[111])
        }],
        createXMLHTTPObject: function() {
            var d = false;
            for (var c = 0; c < this[_var[112]][_var[8]]; c++) {
                try {
                    d = this[_var[112]][c]()
                } catch (b) {
                    continue
                }
                break
            }
            return d
        },
        Fonts: {
            "Andale Mono": _var[113],
            Arial: _var[114],
            "Arial Black": _var[115],
            "Arial Narrow": _var[116],
            "Arial Rounded MT Bold": _var[117],
            "Big Caslon": _var[118],
            "Bodoni MT": _var[119],
            "Book Antiqua": _var[120],
            "Brush Script MT": _var[121],
            "Calisto MT": _var[122],
            Calibri: _var[123],
            Cambria: _var[124],
            Candara: _var[125],
            "Century Gothic": _var[126],
            "Courier New": _var[127],
            "Franklin Gothic Medium": _var[128],
            Garamond: _var[129],
            Georgia: _var[130],
            "Gill Sans": _var[131],
            "Goudy Old Style": _var[132],
            "Helvetica Neue": _var[133],
            Helvetica: _var[134],
            "Hoefler Text": _var[135],
            Impact: _var[136],
            "Lucida Bright": _var[137],
            "Lucida Console": _var[138],
            "Lucida Grande": _var[139],
            "Lucida Sans Typewriter": _var[140],
            "Open Sans": _var[141],
            Papyrus: _var[142],
            Perpetua: _var[143],
            Rockwell: _var[144],
            "Rockwell Extra Bold": _var[145],
            "sans-serif": _var[146],
            "Segoe UI": _var[147],
            Tahoma: _var[148],
            "Times New Roman": _var[149],
            "Trebuchet MS": _var[150],
            Verdana: _var[151]
        },
        fonts: guiBuilder[_var[152]]
    };
    a[_var[156]][_var[155]][_var[154]][_var[153]] = function(d) {
        var c = this[_var[157]],
            b = this[_var[158]] == _var[159] && !(this[_var[160]][0] != document && a[_var[162]](this[_var[160]][0], this[_var[161]][0])) ? this[_var[161]] : this[_var[160]],
            k = (/(html|body)/i)[_var[164]](b[0][_var[163]]);
        var j = d[_var[165]];
        var i = d[_var[166]];
        if (this[_var[167]]) {
            var h;
            if (this[_var[168]]) {
                if (this[_var[169]]) {
                    var g = this[_var[169]][_var[170]]();
                    h = [this[_var[168]][0] + g[_var[171]], this[_var[168]][1] + g[_var[172]], this[_var[168]][2] + g[_var[171]], this[_var[168]][3] + g[_var[172]]]
                } else {
                    h = this[_var[168]]
                }
                if (d[_var[165]] - this[_var[170]][_var[173]][_var[171]] < h[0]) {
                    j = h[0] + this[_var[170]][_var[173]][_var[171]]
                }
                if (d[_var[166]] - this[_var[170]][_var[173]][_var[172]] < h[1]) {
                    i = h[1] + this[_var[170]][_var[173]][_var[172]]
                }
                if (d[_var[165]] - this[_var[170]][_var[173]][_var[171]] > h[2]) {
                    j = h[2] + this[_var[170]][_var[173]][_var[171]]
                }
                if (d[_var[166]] - this[_var[170]][_var[173]][_var[172]] > h[3]) {
                    i = h[3] + this[_var[170]][_var[173]][_var[172]]
                }
            }
            if (c[_var[174]]) {
                var f = c[_var[174]][1] ? this[_var[175]] + Math[_var[66]]((i - this[_var[175]]) / c[_var[174]][1]) * c[_var[174]][1] : this[_var[175]];
                i = h ? (!(f - this[_var[170]][_var[173]][_var[172]] < h[1] || f - this[_var[170]][_var[173]][_var[172]] > h[3]) ? f : (!(f - this[_var[170]][_var[173]][_var[172]] < h[1]) ? f - c[_var[174]][1] : f + c[_var[174]][1])) : f;
                var e = c[_var[174]][0] ? this[_var[176]] + Math[_var[66]]((j - this[_var[176]]) / c[_var[174]][0]) * c[_var[174]][0] : this[_var[176]];
                j = h ? (!(e - this[_var[170]][_var[173]][_var[171]] < h[0] || e - this[_var[170]][_var[173]][_var[171]] > h[2]) ? e : (!(e - this[_var[170]][_var[173]][_var[171]] < h[0]) ? e - c[_var[174]][0] : e + c[_var[174]][0])) : e
            }
        }
        return {
            top: (i - this[_var[170]][_var[173]][_var[172]] - this[_var[170]][_var[177]][_var[172]] - this[_var[170]][_var[178]][_var[172]] + ((this[_var[158]] == _var[179] ? -this[_var[160]][_var[180]]() : (k ? 0 : b[_var[180]]())))),
            left: (j - this[_var[170]][_var[173]][_var[171]] - this[_var[170]][_var[177]][_var[171]] - this[_var[170]][_var[178]][_var[171]] + ((this[_var[158]] == _var[179] ? -this[_var[160]][_var[181]]() : k ? 0 : b[_var[181]]())))
        }
    };
    a[_var[156]][_var[183]][_var[154]][_var[182]] = function(e, b) {
        if (!e) {
            return
        }
        if (a[_var[156]][_var[184]] && !this[_var[157]][_var[185]]) {
            a[_var[156]][_var[184]][_var[186]](this, e)
        }
        if (this[_var[157]][_var[187]]) {
            var d = this;
            var c = this[_var[188]][_var[170]]();
            this[_var[189]] = true;
            a(this[_var[193]])[_var[192]]({
                left: c[_var[171]] - this[_var[170]][_var[178]][_var[171]] - this[_var[190]][_var[171]] + (this[_var[161]][0] == document[_var[191]] ? 0 : this[_var[161]][0][_var[181]]),
                top: c[_var[172]] - this[_var[170]][_var[178]][_var[172]]
            }, parseInt(this[_var[157]][_var[187]], 10) || 500, function() {
                d._clear(e)
            })
        } else {
            this._clear(e, b)
        }
        return false
    }
})[_var[0]](this);
(function(b, a) {
    b[_var[1404]](_var[194], {
        options: {
            id: guiform[_var[195]] || false,
            screenPreview: 0,
            reload: false,
            timer: 0,
            reserved_word: [_var[195], _var[196], _var[197], _var[198], _var[199], _var[200]],
            caret: _var[44],
            item_errors: {},
            menu: {
                save: [_var[201], _var[202]],
                create: [_var[203], _var[204]],
                preview: [_var[205], _var[206]],
                style: [_var[207], _var[208]],
                required: [_var[209], _var[210]],
                merge: [_var[211], _var[212]],
                "delete": [_var[213], _var[214]],
                properties: [_var[215], _var[216]],
                code: [_var[217], _var[218]],
                "thank-you": [_var[219], _var[220]],
                mail: [_var[221], _var[222]]
            },
            Properties: {
                "Font Size": [_var[223], _var[44]],
                "Maximum Input": [_var[224], _var[44]],
                "Label Width": [_var[225], _var[44]],
                "Max File Size": [_var[226], _var[44]],
                "Maximum Value": [_var[227], _var[44]],
                "Minimum Value": [_var[228], _var[44]],
                "Line Height": [_var[229], _var[44]],
                Layout: [_var[230], _var[44]],
                "Options Text Width": [_var[231], _var[44]],
                "Option Columns": [_var[232], _var[44]],
                "Textarea Height": [_var[233], _var[44]],
                "Password Minimum Length": [_var[234], _var[44]],
                Validation: [_var[235], _var[44]],
                "Text Alignment": [_var[236], _var[44]],
                "Submit Alignment": [_var[237], _var[44]],
                "Hide Label": [_var[238], _var[44]],
                "Unique Value": [_var[239], _var[240]],
                "Show Reset Button": [_var[241], _var[44]],
                Visibility: [_var[242], _var[44]],
                Display: [_var[243], _var[44]],
                "Allow Multiple Upload": [_var[244], _var[44]],
                "File Extentions": [_var[245], _var[44]],
                "Text Content": [_var[246], _var[247]],
                Text: [_var[248], _var[44]],
                "Sub Text": [_var[249], _var[44]],
                Label: [_var[250], _var[44]],
                "Submit Text": [_var[251], _var[44]],
                "Reset Text": [_var[252], _var[44]],
                "Loading Text": [_var[253], _var[44]],
                Placeholder: [_var[254], _var[44]],
                "Default Value": [_var[255], _var[44]],
                "Short Description": [_var[256], _var[44]],
                "On Label": [_var[257], _var[44]],
                "Off Label": [_var[258], _var[44]],
                "Input Mask": [_var[259], _var[260]],
                "List Type": [_var[261], _var[44]],
                Offset: [_var[262], _var[44]],
                "Font Family": [_var[44], _var[44]],
                "Item ID": [_var[263], _var[44]],
                "Compare With": [_var[264], _var[44]]
            },
            Style: {
                "Background Color": _var[265],
                "Label Color": _var[266],
                "Border Color": _var[267]
            },
            Options: {
                Gender: [_var[268], _var[269]],
                Days: [_var[270], _var[271], _var[272], _var[273], _var[274], _var[275], _var[276]],
                Months: [_var[277], _var[278], _var[279], _var[280], _var[281], _var[282], _var[283], _var[284], _var[285], _var[286], _var[287], _var[288]],
                "US States": [_var[289], _var[290], _var[291], _var[292], _var[293], _var[294], _var[295], _var[296], _var[297], _var[130], _var[298], _var[299], _var[300], _var[301], _var[302], _var[303], _var[304], _var[305], _var[306], _var[307], _var[308], _var[309], _var[310], _var[311], _var[312], _var[313], _var[314], _var[315], _var[316], _var[317], _var[318], _var[319], _var[320], _var[321], _var[322], _var[323], _var[324], _var[325], _var[326], _var[327], _var[328], _var[329], _var[330], _var[331], _var[332], _var[333], _var[334], _var[335], _var[336], _var[337]],
                "US States Abbr": [_var[338], _var[339], _var[340], _var[341], _var[342], _var[343], _var[344], _var[345], _var[346], _var[347], _var[348], _var[349], _var[350], _var[351], _var[352], _var[353], _var[354], _var[355], _var[356], _var[357], _var[358], _var[359], _var[360], _var[361], _var[362], _var[363], _var[364], _var[365], _var[366], _var[367], _var[368], _var[369], _var[370], _var[371], _var[372], _var[373], _var[374], _var[375], _var[376], _var[377], _var[378], _var[379], _var[380], _var[381], _var[382], _var[383], _var[384], _var[385], _var[386], _var[387]],
                Countries: [_var[388], _var[389], _var[390], _var[391], _var[392], _var[393], _var[394], _var[395], _var[396], _var[397], _var[398], _var[399], _var[400], _var[401], _var[402], _var[403], _var[404], _var[405], _var[406], _var[407], _var[408], _var[409], _var[410], _var[411], _var[412], _var[413], _var[414], _var[415], _var[416], _var[417], _var[418], _var[419], _var[420], _var[421], _var[422], _var[423], _var[424], _var[425], _var[426], _var[427], _var[428], _var[429], _var[430], _var[431], _var[432], _var[433], _var[434], _var[435], _var[436], _var[437], _var[438], _var[439], _var[440], _var[441], _var[442], _var[443], _var[444], _var[445], _var[446], _var[447], _var[448], _var[449], _var[450], _var[451], _var[452], _var[453], _var[454], _var[455], _var[456], _var[457], _var[458], _var[459], _var[460], _var[130], _var[461], _var[462], _var[463], _var[464], _var[465], _var[466], _var[467], _var[468], _var[469], _var[470], _var[471], _var[472], _var[473], _var[474], _var[475], _var[476], _var[477], _var[478], _var[479], _var[480], _var[481], _var[482], _var[483], _var[484], _var[485], _var[486], _var[487], _var[488], _var[489], _var[490], _var[491], _var[492], _var[493], _var[494], _var[495], _var[496], _var[497], _var[498], _var[499], _var[500], _var[501], _var[502], _var[503], _var[504], _var[505], _var[506], _var[507], _var[508], _var[509], _var[510], _var[511], _var[512], _var[513], _var[514], _var[515], _var[516], _var[517], _var[518], _var[519], _var[520], _var[521], _var[522], _var[523], _var[524], _var[525], _var[526], _var[527], _var[528], _var[529], _var[530], _var[531], _var[532], _var[533], _var[534], _var[535], _var[536], _var[537], _var[538], _var[539], _var[540], _var[541], _var[542], _var[543], _var[544], _var[545], _var[546], _var[547], _var[548], _var[549], _var[550], _var[551], _var[552], _var[553], _var[554], _var[555], _var[556], _var[557], _var[558], _var[559], _var[560], _var[561], _var[562], _var[563], _var[564], _var[565], _var[566], _var[567], _var[568], _var[569], _var[570], _var[571], _var[572], _var[573], _var[574], _var[575], _var[576], _var[577], _var[578], _var[579], _var[580], _var[581], _var[582], _var[583], _var[584], _var[585], _var[586], _var[587], _var[588], _var[589], _var[590], _var[591], _var[592], _var[593], _var[594], _var[595], _var[596], _var[597], _var[598], _var[599], _var[600], _var[601], _var[602], _var[603], _var[604], _var[605], _var[606], _var[607], _var[608], _var[609], _var[610], _var[611], _var[612], _var[613], _var[614], _var[615], _var[616], _var[617], _var[618], _var[619]]
            },
            Icons: {
                Gender: {
                    Male: _var[620],
                    Female: _var[621]
                },
                Alignment: {
                    Left: _var[622],
                    Center: _var[623],
                    Right: _var[624],
                    Justify: _var[625]
                },
                Arrows: {
                    Up: _var[626],
                    Left: _var[627],
                    Down: _var[628],
                    Right: _var[629]
                },
                "Operating System": {
                    Android: _var[630],
                    Apple: _var[631],
                    Linux: _var[632],
                    Windows: _var[633]
                },
                "Content Management System": {
                    Blogger: _var[634],
                    Drupal: _var[635],
                    Joomla: _var[636],
                    WordPress: _var[637]
                }
            }
        },
        init: guiform,
        autoSave: function() {
            var d = this;
            var c = this[_var[157]];
            clearInterval(c[_var[638]]);
            c[_var[638]] = setInterval(function(f) {
                var e = b(_var[639]);
                if (parseInt(guiBuilder[_var[641]][_var[640]][_var[11]]) == 1 && c[_var[195]] != _var[44] && e[_var[88]]() > 0) {
                    d[_var[642]](_var[640])
                }
            }, parseInt(guiBuilder[_var[641]][_var[643]][_var[11]]) * 1000)
        },
        _build: function() {
            var e = this[_var[157]];
            var f = this;
            b(_var[645])[_var[19]](b(_var[644]));
            var d = _var[646];
            b[_var[17]](e[_var[647]], function(h, g) {
                d += _var[648] + h + _var[649] + g[1] + _var[650] + g[0] + _var[651]
            });
            d += _var[652] + guiform[_var[653]] + _var[654];
            d += _var[655];
            b(_var[656])[_var[19]](d);
            if (guiBuilder[_var[657]] == 0) {
                b(_var[659])[_var[658]]()
            }
            b(_var[664])[_var[663]](_var[660], b(_var[661])[_var[31]]() - (b(_var[662])[_var[31]]() + 35));
            if (b(_var[665])[_var[88]]() == 0) {
                var c = _var[666];
                b(_var[668])[_var[667]](c)
            }
            if (b(_var[669])[_var[88]]() == 0) {
                var c = b(_var[670]);
                b(_var[668])[_var[667]](c[_var[671]]());
                b(_var[669])[_var[29]](_var[672])
            }
            f[_var[673]]();
            b[_var[676]][_var[675]][_var[674]] = _var[677];
            b[_var[676]][_var[675]][_var[678]] = _var[679];
            b[_var[676]][_var[675]][_var[680]] = _var[681];
            b[_var[676]][_var[675]][_var[682]] = _var[683];
            b(_var[685])[_var[17]](function() {
                b(this)[_var[676]](b(this)[_var[28]](_var[684]))
            });
            b(_var[697])[_var[696]]({
                position: {
                    my: _var[686],
                    at: _var[687],
                    using: function(h, g) {
                        b(this)[_var[663]](h)[_var[663]](_var[688], _var[689]);
                        b(_var[695])[_var[692]](_var[694])[_var[692]](g[_var[693]])[_var[692]](g[_var[691]])[_var[690]](this)
                    }
                }
            })
        },
        _create: function() {
            this._build();
            var d = this[_var[157]];
            var e = this;
            var g = b(document);
            e[_var[698]]();
            g[_var[703]](_var[699], _var[700], function(h) {
                guiform[_var[653]] = b[_var[702]](b(this)[_var[701]]())
            });
            g[_var[738]](function(o) {
                var l = b(_var[728])[_var[88]]();
                var h = o[_var[704]] || o[_var[705]] || 0;
                var n = document[_var[710]][_var[709]][_var[68]]() || d[_var[6]];
                var m = [_var[90], _var[711], _var[712]];
                if (b(_var[715])[_var[88]]() > 0) {
                    if (n == _var[191] && l == 0 && b(_var[716])[_var[88]]() == 0) {
                        return false
                    }
                }
                if (l > 0) {
                    var j = b(_var[730])[_var[720]](b(_var[729]));
                    if (h == 38) {
                        if (j == 0) {
                            return false
                        }
                        b(_var[714])[_var[180]](j * 27 - 164);
                        b(_var[731] + j + _var[22])[_var[722]](_var[721]);
                        b(_var[731] + (j - 1) + _var[22])[_var[692]](_var[721])
                    }
                    if (h == 40) {
                        b(_var[714])[_var[180]](j * 27 - 108);
                        if (j >= b(_var[730])[_var[88]]() - 1) {
                            return false
                        }
                        b(_var[731] + j + _var[22])[_var[722]](_var[721]);
                        b(_var[731] + (j + 1) + _var[22])[_var[692]](_var[721])
                    }
                    if (h == 13) {
                        b(_var[733])[_var[706]](_var[732]);
                        b(_var[734])[_var[722]](_var[703])
                    }
                    var k = b(_var[729])[_var[28]](_var[736])[_var[38]](/"/g, _var[735]);
                    var i = b(_var[669])[_var[9]]();
                    i = i[_var[48]](_var[737])[1][_var[48]](_var[74])[0];
                    b(_var[669])[_var[9]](b(_var[669])[_var[9]]()[_var[38]](i, k))
                }
            })[_var[727]](function(o) {
                var i = o[_var[704]] || o[_var[705]] || 0;
                b(_var[707])[_var[706]]();
                var h = b(_var[708]);
                var m = document[_var[710]][_var[709]][_var[68]]() || d[_var[6]];
                var l = [_var[90], _var[711], _var[712]];
                var k = b(_var[713])[_var[88]]();
                var n = b(_var[714])[_var[180]]();
                if (b(_var[715])[_var[88]]() > 0) {
                    if (m == _var[191] && k == 0 && b(_var[716])[_var[88]]() == 0) {
                        return false
                    }
                }
                if (b[_var[717]](m, l) == -1 && k == 0) {
                    if (i == 46) {
                        e[_var[658]]()
                    } else {
                        if (o[_var[718]] == false && b(_var[719])[_var[88]]() > 0) {
                            if (h[_var[88]]() > 0) {
                                var j = b(_var[719])[_var[720]](h);
                                if (i == 37 || i == 38) {
                                    if (j == 0) {
                                        return false
                                    }
                                    b(_var[723] + j + _var[22])[_var[722]](_var[721]);
                                    b(_var[723] + (j - 1) + _var[22])[_var[692]](_var[721])
                                }
                                if (i == 39 || i == 40) {
                                    if (j >= b(_var[719])[_var[88]]() - 1) {
                                        return false
                                    }
                                    b(_var[723] + j + _var[22])[_var[722]](_var[721]);
                                    b(_var[723] + (j + 1) + _var[22])[_var[692]](_var[721])
                                }
                                b(window)[_var[180]](b(_var[708])[_var[724]]()[_var[172]] + 40)
                            } else {
                                if (i >= 37 && i <= 40) {
                                    b(_var[725])[_var[692]](_var[721])
                                }
                            }
                            e[_var[726]]()
                        }
                    }
                }
            });
            g[_var[703]](_var[173], _var[730], function() {
                b(_var[730])[_var[722]](_var[721]);
                b(this)[_var[692]](_var[721]);
                var i = b(_var[669])[_var[9]]();
                i = i[_var[48]](_var[737])[1][_var[48]](_var[74])[0];
                var h = b(_var[729])[_var[28]](_var[736]);
                b(_var[669])[_var[9]](b(_var[669])[_var[9]]()[_var[38]](i, h[_var[38]](/"/g, _var[735])))
            });
            g[_var[703]](_var[739], _var[719], function(h) {
                if (b(this)[_var[23]](_var[740])[_var[88]]() == 0) {
                    b(_var[741])[_var[722]](_var[721])
                }
                if (h[_var[718]]) {
                    if (b(this)[_var[743]](_var[742])) {
                        alert(_var[744]);
                        return false
                    }
                    b(_var[733])[_var[658]]();
                    b(_var[741])[_var[722]](_var[721]);
                    b(_var[708])[_var[722]](_var[721])[_var[692]](_var[745]);
                    if (b(this)[_var[743]](_var[745])) {
                        b(this)[_var[722]](_var[745])
                    } else {
                        b(this)[_var[692]](_var[745])
                    }
                } else {
                    b(_var[746])[_var[722]](_var[745]);
                    b(_var[708])[_var[722]](_var[721]);
                    b(this)[_var[692]](_var[721])
                }
                if (b(_var[716])[_var[88]]()) {
                    e[_var[726]]();
                    e[_var[747]]();
                    e[_var[748]]()
                }
                e[_var[749]]()
            });
            g[_var[703]](_var[750], _var[751], function(h) {
                if (b(this)[_var[743]](_var[745]) == false) {
                    e[_var[726]](0)
                }
            });
            g[_var[703]](_var[173], _var[752], function() {
                var h = b(this)[_var[9]]();
                var i = b(this)[_var[178]]()[_var[178]]()[_var[28]](_var[195]);
                b(this)[_var[722]](_var[753]);
                b(this)[_var[29]](_var[754] + i + _var[755]);
                b(this)[_var[23]](_var[90])[_var[6]]();
                b(this)[_var[23]](_var[90])[_var[701]](h)
            });
            g[_var[703]](_var[738], _var[756], function(i) {
                var h = i[_var[704]] || i[_var[705]] || 0;
                if (h == 9) {
                    return false
                }
            })[_var[703]](_var[727], _var[756], function(l) {
                var k = this[_var[195]][_var[48]](_var[757])[2];
                var h = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(_var[708]);
                var j = (b(_var[760] + k)[_var[23]](_var[759])[_var[88]]() > 0) ? b[_var[702]](this[_var[11]]) + _var[761] : b[_var[702]](this[_var[11]]);
                b(_var[760] + k)[_var[23]](_var[762])[_var[29]](j);
                if (k == h[_var[28]](_var[195])[_var[48]](_var[757])[1]) {
                    var i = b(_var[763]);
                    (b[_var[702]](this[_var[11]]) !== _var[44]) ? i[_var[9]](b[_var[702]](this[_var[11]])): i[_var[29]](_var[764])
                }
            })[_var[703]](_var[699], _var[756], function(i) {
                var h = b(this)[_var[701]]();
                b(this)[_var[178]]()[_var[692]](_var[753])[_var[29]](h)
            });
            g[_var[703]](_var[727], _var[765], function(h) {
                b(_var[665])[_var[9]](b(this)[_var[701]]())
            });
            g[_var[703]](_var[727], _var[766], function(i) {
                var h = e._form();
                b(_var[768], h)[_var[29]](b[_var[18]](this[_var[11]], _var[767]))
            });
            g[_var[703]](_var[173], _var[769], function() {
                d[_var[770]] = b(this)[_var[28]](_var[27])
            });
            g[_var[703]](_var[173], _var[771], function() {
                var h = b(this)[_var[28]](_var[772]);
                if (d[_var[770]] == _var[773] || d[_var[770]] == _var[44]) {
                    tinyMCE[_var[775]](_var[774], false, h)
                } else {
                    b(_var[778] + d[_var[770]] + _var[779])[_var[777]](_var[776], h)
                }
                return false
            });
            var f = true;
            g[_var[703]](_var[173], _var[795], function() {
                var i = b(_var[793])[_var[720]](b(this)[_var[178]]());
                var h = _var[796];
                b(_var[798] + i + _var[22])[_var[797]](h);
                b(_var[800])[_var[799]](_var[732], function() {
                    b(this)[_var[722]](_var[745])
                })
            })[_var[703]](_var[173], _var[792], function() {
                if (f == true) {
                    f = false;
                    if (b(_var[793])[_var[88]]() < 2) {
                        f = true
                    }
                    if (b(_var[793])[_var[88]]() > 1) {
                        b(this)[_var[178]]()[_var[794]](_var[732], function() {
                            b(this)[_var[658]]();
                            f = true
                        })
                    }
                }
            })[_var[703]](_var[173], _var[785], function() {
                var j = b[_var[702]](b(this)[_var[9]]());
                var l = this;
                var i = _var[44];
                var h = e._form();
                var k = b(l)[_var[743]](_var[157]) ? guiBuilder[_var[157]][j] : d[_var[786]][j];
                k = (h[_var[743]](_var[787]) && b(l)[_var[743]](_var[157]) == false) ? d[_var[788]][j] : k;
                b[_var[17]](k, function(n) {
                    var m = b(l)[_var[743]](_var[157]) ? this[0] : this;
                    m = (h[_var[743]](_var[787]) && b(l)[_var[743]](_var[157]) == false) ? n : m;
                    var o = b(l)[_var[743]](_var[157]) ? this[1] : this;
                    i += _var[789] + b[_var[35]](o) + _var[790] + b[_var[35]](m) + _var[791]
                });
                b(_var[784])[_var[29]](i)
            })[_var[703]](_var[173], _var[782], function() {
                var h = _var[783];
                b(_var[784])[_var[29]](h)
            })[_var[703]](_var[173], _var[780], function() {
                e[_var[781]]()
            });
            g[_var[703]](_var[173], _var[801], function() {
                var i = e._form();
                var h = _var[44];
                if (i[_var[743]](_var[802])) {
                    b(_var[805])[_var[17]](function() {
                        h += _var[803] + this[_var[11]] + _var[804]
                    });
                    b(_var[806], i)[_var[29]](h);
                    alert(_var[807])
                }
            });
            g[_var[703]](_var[738], _var[809], function(i) {
                var h = i[_var[704]] || i[_var[705]] || 0;
                if (i[_var[811]] == true) {
                    return false
                }
                return (h == 8 || h == 9 || h == 46 || (h >= 35 && h <= 40) || (h >= 48 && h <= 57) || (h >= 96 && h <= 105));
                i[_var[810]]()
            })[_var[703]](_var[808], _var[809], function(h) {
                h[_var[810]]()
            });
            var c = null;
            g[_var[703]](_var[812], _var[813], function(h) {
                if (c == this[_var[11]]) {
                    return false
                }
                c = this[_var[11]];
                e[_var[814]](this[_var[11]])
            });
            g[_var[703]](_var[173], _var[820], function() {
                var h = b(this)[_var[178]]();
                h[_var[794]](_var[732], function() {
                    b(this)[_var[658]]()
                })
            })[_var[703]](_var[173], _var[815], function() {
                var i = b(_var[816])[_var[720]](b(this)[_var[178]]());
                var h = _var[817];
                b(_var[818] + i + _var[22])[_var[797]](h);
                b(_var[819])[_var[799]](_var[732], function() {
                    b(this)[_var[722]](_var[745])
                })
            });
            e[_var[749]]()
        },
        _init: function() {
            this._event()
        },
        _form: function() {
            return (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(_var[708])
        },
        _event: function() {
            var c = this[_var[157]];
            var d = this;
            var e = b(_var[191]);
            b(_var[656])[_var[703]](_var[173], _var[821], function(h) {
                var g = this[_var[195]];
                switch (g) {
                    case _var[642]:
                        d[_var[642]]();
                        break;
                    case _var[822]:
                        d[_var[822]]();
                        break;
                    case _var[823]:
                        d[_var[823]]();
                        break;
                    case _var[824]:
                        d[_var[824]]();
                        break;
                    case _var[825]:
                        d[_var[825]](h, this);
                        break;
                    case _var[102]:
                        d[_var[102]](h, this);
                        break;
                    case _var[826]:
                        d[_var[658]]();
                        break;
                    case _var[747]:
                        var f = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(_var[708]);
                        (f[_var[88]]() > 0) ? d[_var[726]](0): alert(_var[827]);
                        break;
                    case _var[32]:
                        d[_var[828]](0);
                        break;
                    case _var[830]:
                        d[_var[829]]();
                        break;
                    case _var[831]:
                        d[_var[831]]();
                        break;
                    case _var[833]:
                        d[_var[832]]();
                        break;
                    case _var[657]:
                        d[_var[657]]();
                        break;
                    default:
                }
            });
            e[_var[703]](_var[834], _var[835], function(h) {
                var f = d._form();
                var g = b[_var[702]](b(this)[_var[701]]());
                b(_var[837], f)[_var[28]](_var[836], g)
            });
            e[_var[703]](_var[834], _var[838], function(g) {
                var f = d._form();
                f[_var[23]](_var[840])[_var[663]](_var[839], b(this)[_var[701]]())
            });
            e[_var[703]](_var[834], _var[841], function(g) {
                var f = d._form();
                b(_var[90], f)[_var[28]](_var[842], b(this)[_var[701]]())
            });
            e[_var[703]](_var[834], _var[843], function(g) {
                var f = d._form();
                f[_var[23]](_var[806])[_var[28]](_var[46], this[_var[11]])
            });
            e[_var[703]](_var[808], _var[844], function(f) {
                f[_var[810]]()
            });
            e[_var[703]](_var[699], _var[845], function(g) {
                var f = (b[_var[702]](this[_var[11]]) == _var[44]) ? _var[44] : b[_var[702]](this[_var[11]]);
                d[_var[699]](f, g[_var[836]][_var[195]])
            });
            e[_var[703]](_var[173], _var[846], function(f) {
                d[_var[847]](this[_var[11]], b(this))
            });
            e[_var[703]](_var[850], _var[851], function(h, g) {
                var f = b[_var[702]](g[_var[11]]);
                d[_var[849]](f, h[_var[836]][_var[195]])
            })[_var[703]](_var[727], _var[848], function(g) {
                var f = b[_var[702]](this[_var[11]]);
                d[_var[849]](f, g[_var[836]][_var[195]])
            });
            e[_var[703]](_var[852], _var[853], function(f) {
                d[_var[854]](this[_var[11]], f[_var[836]][_var[195]])
            })
        },
        performance: function() {
            var c = this[_var[157]];
            if (typeof(c[_var[195]]) == _var[855]) {
                b(_var[695])[_var[858]]({
                    title: _var[856],
                    status: _var[856],
                    body: _var[857]
                })
            } else {
                b(_var[862])[_var[28]](_var[859], _var[860] + guiBuilder[_var[861]] + c[_var[195]])[_var[3]](0)[_var[173]]()
            }
        },
        blur: function(d, f) {
            var e = this;
            var c = this._form()
        },
        refresh: function(e, d, g) {
            var f = this;
            var c = f._form();
            g = g || false;
            if (e == _var[787]) {
                var h = b(_var[863]);
                if (d == false) {
                    var h = b(_var[864], c);
                    b(_var[864], c)[_var[866]](_var[865])
                }
                h[_var[866]]()
            } else {
                if (e == _var[867]) {
                    var h = b(_var[868]);
                    if (d == false) {
                        var h = b(_var[851], c);
                        b(_var[851], c)[_var[849]](_var[865])
                    }
                    h[_var[17]](function() {
                        var j = b(this)[_var[28]](_var[869]);
                        var i = b(this)[_var[28]](_var[870]);
                        b(this)[_var[849]]({
                            max: j,
                            min: i
                        })
                    })
                }
            }
        },
        clickInput: function(d, h) {
            var e = this;
            var c = e._form();
            var g = b(h)[_var[28]](_var[27]);
            d = b[_var[702]](d);
            if (g == _var[871]) {
                b(_var[90], c)[_var[28]](_var[872], d)
            } else {
                if (g == _var[873]) {
                    if (c[_var[743]](_var[742])) {
                        c[_var[722]](_var[874]);
                        c[_var[692]](_var[875] + d)
                    } else {
                        b(_var[768], c)[_var[663]](_var[876], d)
                    }
                } else {
                    if (g == _var[877]) {
                        (b(h)[_var[879]](_var[878])) ? c[_var[692]](_var[880]): c[_var[722]](_var[880])
                    } else {
                        if (g == _var[881]) {
                            b(_var[884])[_var[883]](_var[882], _var[11], 0);
                            b(_var[886], c)[_var[663]](_var[885], _var[44]);
                            b(_var[768], c)[_var[663]](_var[876], d);
                            b(_var[888])[_var[9]](_var[887])
                        } else {
                            if (g == _var[889]) {
                                b(_var[886], c)[_var[663]](_var[885], _var[44]);
                                b(_var[884])[_var[883]](_var[882], _var[11], 0);
                                if (b(h)[_var[879]](_var[878])) {
                                    var f = b[_var[702]](b(_var[890])[_var[701]]());
                                    b(_var[895], c)[_var[894]](_var[891] + (f == _var[44] ? _var[892] : f) + _var[893])
                                } else {
                                    b(_var[896], c)[_var[658]]()
                                }
                                b(_var[888])[_var[9]](_var[887])
                            } else {
                                if (g == _var[897]) {
                                    (b(h)[_var[879]](_var[878])) ? b(_var[90], c)[_var[28]](_var[898], _var[899]): b(_var[90], c)[_var[28]](_var[898], _var[900])
                                } else {
                                    if (g == _var[901]) {
                                        (b(h)[_var[879]](_var[878])) ? c[_var[692]](_var[902]): c[_var[722]](_var[902])
                                    } else {
                                        if (g == _var[903]) {
                                            (b(h)[_var[879]](_var[878])) ? c[_var[692]](_var[904]): c[_var[722]](_var[904])
                                        } else {
                                            if (g == _var[905]) {
                                                c = b(_var[906], c);
                                                if (b(h)[_var[879]](_var[878])) {
                                                    c[_var[28]](_var[907], _var[907]);
                                                    c[_var[909]](_var[908]);
                                                    c[_var[95]](_var[911])[_var[667]](_var[910]);
                                                    c[_var[28]](_var[27], c[_var[28]](_var[27]) + _var[912])
                                                } else {
                                                    c[_var[913]](_var[907]);
                                                    c[_var[28]](_var[27], c[_var[28]](_var[27])[_var[48]](_var[914])[0]);
                                                    c[_var[16]]();
                                                    c[_var[95]](_var[768])[_var[23]](_var[915])[_var[658]]()
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
        textInput: function(e, i) {
            var f = this;
            var d = f._form();
            e = b[_var[702]](e);
            if (i == _var[916]) {
                d[_var[23]](_var[917])[_var[658]]();
                var c = b[_var[18]](e, _var[918]);
                c = _var[919] + c[_var[29]]() + _var[920];
                c = e == _var[44] ? _var[44] : c;
                d[_var[23]](_var[768])[_var[19]](c)
            } else {
                if (i == _var[921]) {
                    b(_var[90], d)[_var[28]](_var[922], e)
                } else {
                    if (i == _var[923]) {
                        b(_var[90], d)[_var[676]](e);
                        b(_var[90], d)[_var[28]](_var[684], e)
                    } else {
                        if (i == _var[924]) {
                            var c = b[_var[18]](e, _var[925]);
                            b(_var[926], d)[_var[29]](c[_var[29]]())
                        } else {
                            if (i == _var[927]) {
                                var c = b[_var[18]](e, _var[925]);
                                b(_var[928], d)[_var[29]](c[_var[29]]())
                            } else {
                                if (i == _var[929]) {
                                    var c = b[_var[18]](e, _var[925]);
                                    b(_var[926], d)[_var[28]](_var[930], c[_var[29]]())
                                } else {
                                    if (i == _var[931]) {
                                        b(_var[932], d)[_var[28]](_var[188], e)
                                    } else {
                                        if (i == _var[933]) {
                                            var e = (b(_var[759], d)[_var[88]]() > 0) ? e + _var[761] : e;
                                            (e !== _var[44]) ? b(_var[934])[_var[9]](e): b(_var[934])[_var[29]](_var[764]);
                                            var c = b[_var[18]](e, _var[935]);
                                            b(_var[762], d)[_var[29]](c[_var[29]]())
                                        } else {
                                            if (i == _var[936]) {
                                                if (d[_var[743]](_var[937]) || d[_var[743]](_var[938])) {
                                                    d[_var[28]](_var[939], e)
                                                } else {
                                                    b(_var[940], d)[_var[28]](_var[939], e)
                                                }
                                            } else {
                                                if (i == _var[941]) {
                                                    var c = b[_var[18]](e, _var[942]);
                                                    b(_var[943], d)[_var[658]]();
                                                    b(_var[768], d)[_var[19]](_var[944] + c[_var[29]]() + _var[945])
                                                } else {
                                                    if (i == _var[946]) {
                                                        (e !== _var[44]) ? b(_var[934])[_var[9]](e): b(_var[934])[_var[29]](_var[764]);
                                                        var c = b[_var[18]](e, _var[942]);
                                                        (d[_var[743]](_var[947])) ? b(_var[948], d)[_var[9]](c[_var[9]]()): b(_var[949], d)[_var[29]](c[_var[29]]())
                                                    } else {
                                                        if (i == _var[950]) {
                                                            var c = b[_var[18]](e, _var[918]);
                                                            var h = b[_var[702]](c[_var[29]]());
                                                            (e !== _var[44]) ? b(_var[934])[_var[9]](e): b(_var[934])[_var[29]](_var[764]);
                                                            b(_var[951], d)[_var[658]]();
                                                            var g = _var[44];
                                                            b[_var[17]](h[_var[48]](_var[952]), function() {
                                                                g += _var[953] + this + _var[920]
                                                            });
                                                            b(_var[768], d)[_var[19]](g)
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
        },
        spinner: function(d, f) {
            var e = this;
            var c = e._form();
            if (f == _var[954]) {
                b(_var[90], c)[_var[28]](_var[869], d);
                if (c[_var[743]](_var[955])) {
                    e[_var[956]](_var[955], false)
                } else {
                    b(_var[809], c)[_var[849]](_var[882], _var[957], d)
                }
            } else {
                if (f == _var[958]) {
                    b(_var[90], c)[_var[28]](_var[870], d);
                    if (c[_var[743]](_var[955])) {
                        e[_var[956]](_var[955], false)
                    } else {
                        b(_var[809], c)[_var[849]](_var[882], _var[959], d)
                    }
                } else {
                    if (f == _var[960]) {
                        c[_var[962]](_var[961])[_var[23]](_var[762])[_var[663]](_var[31], d)
                    } else {
                        if (f == _var[963]) {
                            b(_var[932], c)[_var[28]](_var[964], d)
                        } else {
                            if (f == _var[965]) {
                                b(_var[967], c)[_var[28]](_var[966], d)
                            } else {
                                if (f == _var[968]) {
                                    d = (d == _var[44]) ? _var[33] : d + _var[969];
                                    b(_var[768], c)[_var[663]](_var[970], d)
                                } else {
                                    if (f == _var[971]) {
                                        d = (d == _var[44]) ? _var[33] : d + _var[969];
                                        b(_var[768], c)[_var[663]](_var[31], d)
                                    } else {
                                        if (f == _var[972]) {
                                            b(_var[711], c)[_var[663]](_var[34], d + _var[969])
                                        } else {
                                            if (f == _var[973]) {
                                                e[_var[974]](d)
                                            } else {
                                                if (f == _var[975]) {
                                                    b(_var[886], c)[_var[663]](_var[31], d)
                                                } else {
                                                    if (f == _var[976]) {
                                                        b(_var[840], c)[_var[663]](_var[977], d + _var[969])
                                                    } else {
                                                        if (f == _var[978]) {
                                                            b(_var[980], c)[_var[663]](_var[979], d + _var[969])
                                                        } else {
                                                            if (f == _var[981]) {
                                                                b(_var[90], c)[_var[28]](_var[982], d);
                                                                b(_var[768], c)[_var[663]](_var[31], _var[33]);
                                                                e[_var[956]](_var[983], false)
                                                            } else {
                                                                if (f == _var[984]) {
                                                                    b(_var[90], c)[_var[28]](_var[985], d);
                                                                    e[_var[956]](_var[955], false)
                                                                } else {
                                                                    if (f == _var[986]) {
                                                                        b(_var[90], c)[_var[28]](_var[987], d)
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
            }
        },
        confirmation: function() {
            this[_var[642]](_var[832])
        },
        notification: function() {
            this[_var[642]](_var[829])
        },
        options_column: function(g) {
            var e = this;
            var c = e._form();
            if (c[_var[743]](_var[937]) || c[_var[743]](_var[938])) {
                c[_var[23]](_var[988])[_var[658]]();
                var d = parseInt(g);
                if (g == 1 || g == _var[44] || g == 0) {
                    c[_var[23]](_var[990])[_var[797]](_var[989])
                } else {
                    var f = parseInt(c[_var[23]](_var[990])[_var[88]]() / d);
                    for (var h = 0; h < f; h++) {
                        c[_var[23]](_var[991] + (d - 1) + _var[22])[_var[797]](_var[989]);
                        d += parseInt(g)
                    }
                }
                c[_var[23]](_var[994])[_var[913]](_var[46])[_var[692]](_var[992] + g + _var[993]);
                c[_var[23]](_var[996])[_var[913]](_var[46])[_var[692]](_var[995] + g + _var[993]);
                if (g == _var[44]) {
                    c[_var[23]](_var[998])[_var[722]](_var[997])
                }
            }
        },
        tabs_style: function(g) {
            var e = this;
            var d = e._form();
            var f = (d[_var[88]]() > 0) ? _var[999] + d[_var[23]](_var[91])[_var[9]]() + _var[1000] : _var[1001];
            var c = _var[1002];
            b(_var[695])[_var[858]]({
                title: _var[208],
                status: _var[856],
                bgColor: _var[1003],
                opacity: 0,
                body: c,
                overlay: false,
                maxScreen: false,
                saveButton: false,
                cancelButton: false,
                confirmButton: false
            });
            b(_var[1007])[_var[1006]]({
                create: function(i, h) {
                    e[_var[1004]]();
                    b(_var[1005])[_var[699]]()
                },
                activate: function(i, h) {
                    active = b(this)[_var[1006]](_var[882], _var[721]);
                    switch (active) {
                        case 0:
                            e[_var[1004]]();
                            break;
                        case 1:
                            e[_var[152]]();
                            break;
                        case 2:
                            e[_var[663]]();
                            break
                    }
                    b(_var[1005])[_var[699]]()
                }
            });
            return false
        },
        tabs_properties: function(i) {
            var l = this;
            var k = this[_var[157]];
            var h = (i >= 0) ? false : true;
            var j = l._form();
            var f = _var[1008];
            var e = (j[_var[88]]() > 0) ? _var[1009] + j[_var[23]](_var[762])[_var[9]]() + _var[1000] : _var[1001];
            var d = _var[1010];
            var c = _var[1011];
            var m = _var[1012];
            var g = _var[1013] + e + _var[1014] + d + _var[1014] + f + _var[1014] + c + _var[1014] + m + _var[1015];
            if (h == false) {
                b(_var[695])[_var[858]]({
                    title: _var[1016],
                    status: _var[856],
                    bgColor: _var[1003],
                    maxHeight: 400,
                    opacity: 0,
                    body: g,
                    overlay: false,
                    close: function() {
                        b(_var[1017])[_var[722]](_var[703])
                    },
                    create: function() {
                        l[_var[1018]](i)
                    }
                })
            } else {
                l[_var[1018]](i)
            }
            b(_var[1019])[_var[706]]();
            b(_var[1022])[_var[692]](_var[1021])[_var[1020]]();
            b(_var[1023])[_var[1020]]();
            if (j[_var[743]](_var[1024])) {
                b(_var[1025])[_var[1020]]()
            }
            if (j[_var[743]](_var[802])) {
                b(_var[1026])[_var[1020]]()
            }
            if (j[_var[743]](_var[787]) || j[_var[743]](_var[1027]) || j[_var[743]](_var[938]) || j[_var[743]](_var[937])) {
                b(_var[1028])[_var[1020]]()
            }
            if (b(_var[708])[_var[743]](_var[102])) {
                b(_var[1029])[_var[1020]]()
            }(j[_var[23]](_var[762])[_var[9]]() !== _var[44]) ? b(_var[934])[_var[9]](j[_var[23]](_var[762])[_var[9]]()): b(_var[934])[_var[9]](j[_var[23]](_var[949])[_var[9]]() || j[_var[23]](_var[951])[_var[29]]());
            if (j[_var[743]](_var[1030])) {
                b(_var[934])[_var[9]](_var[1031])
            }
            if (j[_var[743]](_var[802])) {
                b(_var[934])[_var[9]](_var[1032])
            }
            if (j[_var[743]](_var[1033])) {
                b(_var[934])[_var[9]](_var[1034])
            }
            if (j[_var[743]](_var[1024])) {
                b(_var[934])[_var[9]](_var[1035])
            }
            if (j[_var[743]](_var[742])) {
                b(_var[934])[_var[9]](_var[1036])
            }
            l[_var[749]]();
            return false
        },
        ui_tabs_properties: function() {
            var c = this;
            b(_var[1041])[_var[1006]]({
                selected: 0,
                active: 0,
                create: function(e, d) {
                    switch (0) {
                        case 0:
                            c[_var[747]]();
                            c[_var[748]]();
                            break;
                        case 1:
                            c[_var[1037]]();
                            break;
                        case 2:
                            c[_var[1038]]();
                            break;
                        case 3:
                            c[_var[1039]]();
                            break;
                        case 4:
                            c[_var[1040]]();
                            break
                    }
                },
                activate: function(e, d) {
                    active = b(this)[_var[1006]](_var[882], _var[721]);
                    switch (active) {
                        case 0:
                            c[_var[747]]();
                            c[_var[748]]();
                            break;
                        case 1:
                            c[_var[1037]]();
                            break;
                        case 2:
                            c[_var[1038]]();
                            break;
                        case 3:
                            c[_var[1039]]();
                            break;
                        case 4:
                            c[_var[1040]]();
                            break
                    }
                    b(_var[1005])[_var[699]]()
                }
            })
        },
        tabsHtml: function() {
            var d = this._form();
            var c = _var[1042];
            b(_var[1043])[_var[29]](c);
            b(_var[766])[_var[701]](b(_var[768], d)[_var[29]]());
            this[_var[749]]()
        },
        get_properties: function() {
            var i = this;
            var g = i._form();
            var f = b(_var[20])[_var[19]](g[_var[23]](_var[762])[_var[29]]());
            f[_var[23]](_var[759])[_var[658]]();
            f = b[_var[18]](f, _var[935]);
            b(_var[1044])[_var[701]](f[_var[29]]());
            if (g[_var[743]](_var[880])) {
                b(_var[1045])[_var[28]](_var[749], _var[749])
            }
            b(_var[1046])[_var[9]](_var[674] + g[_var[28]](_var[195]));
            (g[_var[743]](_var[902])) ? b(_var[1047])[_var[28]](_var[749], _var[749]): b(_var[1047])[_var[913]](_var[749]);
            (g[_var[743]](_var[904])) ? b(_var[1048])[_var[28]](_var[749], _var[749]): b(_var[1048])[_var[913]](_var[749]);
            (g[_var[23]](_var[759])[_var[88]]() > 0) ? b(_var[1049])[_var[692]](_var[703]): b(_var[1049])[_var[722]](_var[703]);
            if (g[_var[743]](_var[1050])) {
                var l = b[_var[18]](g[_var[23]](_var[949])[_var[29]](), _var[942]);
                var e = b[_var[18]](g[_var[23]](_var[943])[_var[29]](), _var[942]);
                b(_var[1051])[_var[701]](l[_var[29]]());
                b(_var[1052])[_var[701]](g[_var[23]](_var[949])[_var[663]](_var[977])[_var[38]](_var[969], _var[44]));
                b(_var[838])[_var[701]](g[_var[23]](_var[949])[_var[663]](_var[839]));
                b(_var[1053])[_var[701]](e[_var[29]]());
                b(_var[1054] + b(_var[768], g)[_var[663]](_var[876]) + _var[993])[_var[28]](_var[749], _var[749])
            }
            if (g[_var[743]](_var[1055])) {
                var e = _var[44];
                b[_var[17]](g[_var[23]](_var[951]), function() {
                    e += b(this)[_var[29]]() + _var[952]
                });
                var d = b[_var[18]](e, _var[918]);
                b(_var[1056])[_var[701]](d[_var[29]]());
                b(_var[1052])[_var[701]](g[_var[23]](_var[951])[_var[663]](_var[977])[_var[38]](_var[969], _var[44]));
                b(_var[1057])[_var[701]](g[_var[23]](_var[951])[_var[663]](_var[979])[_var[38]](_var[969], _var[44]));
                b(_var[838])[_var[701]](g[_var[23]](_var[951])[_var[663]](_var[839]));
                b(_var[1054] + b(_var[768], g)[_var[663]](_var[876]) + _var[993])[_var[28]](_var[749], _var[749])
            }
            if (g[_var[743]](_var[802])) {
                b(_var[1052])[_var[701]](g[_var[23]](_var[821])[_var[663]](_var[977])[_var[38]](_var[969], _var[44]));
                b(_var[838])[_var[701]](g[_var[23]](_var[821])[_var[663]](_var[839]));
                b(_var[1057])[_var[701]](g[_var[23]](_var[821])[_var[663]](_var[979])[_var[38]](_var[969], _var[44]));
                b(_var[843])[_var[701]](g[_var[23]](_var[806])[_var[28]](_var[46]))
            }
            if (g[_var[743]](_var[1027])) {
                b(_var[1058])[_var[28]](_var[11], g[_var[23]](_var[712])[_var[28]](_var[939]))
            }
            if (g[_var[743]](_var[1059])) {
                b(_var[1060] + b(_var[90], g)[_var[28]](_var[872]) + _var[993])[_var[28]](_var[749], _var[749]);
                (b(_var[90], g)[_var[28]](_var[898]) == _var[899]) ? b(_var[1061])[_var[28]](_var[749], _var[749]): b(_var[1061])[_var[913]](_var[749])
            }
            if (g[_var[743]](_var[1059]) || g[_var[743]](_var[1062])) {
                b(_var[844])[_var[701]](g[_var[23]](_var[1063])[_var[28]](_var[684]))
            }
            if (g[_var[23]](_var[917])[_var[88]]() > 0) {
                var d = b[_var[18]](g[_var[23]](_var[917])[_var[29]](), _var[918]);
                b(_var[1064])[_var[701]](d[_var[29]]())
            }
            if (g[_var[743]](_var[1065]) || g[_var[743]](_var[1059]) || g[_var[743]](_var[1066])) {
                b(_var[1067])[_var[28]](_var[11], g[_var[23]](_var[932])[_var[28]](_var[188]));
                b(_var[1058])[_var[28]](_var[11], g[_var[23]](_var[1068])[_var[28]](_var[939]));
                b(_var[1069])[_var[28]](_var[11], g[_var[23]](_var[932])[_var[28]](_var[964]))
            }
            if (g[_var[743]](_var[947]) == false && g[_var[743]](_var[742]) == false) {
                b(_var[1071])[_var[701]](b(_var[768], g)[_var[30]](_var[31]) ? _var[33] : b(_var[768], g)[_var[1070]]());
                (b(_var[768], g)[_var[663]](_var[970]) == _var[887]) ? b(_var[1072])[_var[28]](_var[11], b(_var[768], g)[_var[34]]()): b(_var[1072])[_var[28]](_var[11], b(_var[768], g)[_var[663]](_var[970])[_var[38]](_var[969], _var[44]))
            }
            if (g[_var[743]](_var[1065])) {
                b(_var[1073])[_var[28]](_var[11], b(_var[711], g)[_var[663]](_var[34])[_var[38]](_var[969], _var[44]))
            }
            if (g[_var[743]](_var[937]) || g[_var[743]](_var[938])) {
                var k = g[_var[23]](_var[998])[_var[28]](_var[46])[_var[48]](_var[914])[1];
                (k === a) ? b(_var[1074])[_var[701]](1): b(_var[1074])[_var[701]](k[_var[48]](_var[993])[0]);
                b(_var[1076])[_var[701]](g[_var[23]](_var[990])[_var[1075]]());
                b(_var[1058])[_var[28]](_var[11], g[_var[28]](_var[939]))
            }
            if (g[_var[743]](_var[1077])) {
                b(_var[1058])[_var[28]](_var[11], b(_var[90], g)[_var[28]](_var[939]));
                b(_var[1078])[_var[701]](b(_var[90], g)[_var[28]](_var[987]))
            }
            if (g[_var[743]](_var[1079])) {
                b(_var[1058])[_var[28]](_var[11], b(_var[90], g)[_var[28]](_var[939]));
                b(_var[841])[_var[701]](b(_var[90], g)[_var[28]](_var[842]))
            }
            if (g[_var[743]](_var[1080])) {
                b(_var[1082])[_var[28]](_var[1081], _var[1081]);
                b(_var[1082])[_var[701]](_var[44]);
                b(_var[1082])[_var[849]](_var[882], _var[1081], true)
            } else {
                b(_var[1082])[_var[913]](_var[1081]);
                b(_var[1082])[_var[701]](b(_var[762], g)[_var[1070]]())
            }
            if (g[_var[743]](_var[867]) || g[_var[743]](_var[955])) {
                b(_var[1083])[_var[701]](b(_var[90], g)[_var[28]](_var[869]));
                b(_var[1084])[_var[701]](b(_var[90], g)[_var[28]](_var[870]))
            }
            if (g[_var[743]](_var[1085])) {
                b(_var[1086])[_var[701]](b(_var[90], g)[_var[28]](_var[966]));
                b(_var[1087])[_var[701]](b(_var[90], g)[_var[28]](_var[922]));
                (b(_var[90], g)[_var[28]](_var[907]) == _var[907]) ? b(_var[1088])[_var[28]](_var[749], _var[749]): b(_var[1088])[_var[913]](_var[749])
            }
            if (g[_var[743]](_var[1030])) {
                var j = b[_var[18]](g[_var[23]](_var[926])[_var[29]](), _var[925]);
                var c = b[_var[18]](g[_var[23]](_var[928])[_var[29]](), _var[925]);
                var h = b[_var[18]](g[_var[23]](_var[926])[_var[28]](_var[930]), _var[925]);
                b(_var[1089])[_var[701]](j[_var[29]]());
                b(_var[890])[_var[701]](c[_var[29]]());
                b(_var[1090])[_var[701]](h[_var[29]]());
                b(_var[888])[_var[9]](b(_var[886], g)[_var[663]](_var[885])), b(_var[1091] + b(_var[768], g)[_var[663]](_var[876]) + _var[993])[_var[28]](_var[749], _var[749]);
                if (b(_var[896], g)[_var[88]]() > 0) {
                    b(_var[1092])[_var[28]](_var[749], _var[749])
                }
                b(_var[884])[_var[883]]({
                    range: _var[957],
                    min: 0,
                    value: b(_var[886], g)[_var[663]](_var[885])[_var[38]](_var[969], _var[44]),
                    max: g[_var[31]]() - b(_var[886], g)[_var[31]](),
                    start: function(n, m) {
                        var o = b(_var[886], g)[_var[31]]();
                        b(_var[768], g)[_var[663]](_var[876], _var[44]);
                        b(_var[1093])[_var[913]](_var[749]);
                        b(this)[_var[883]](_var[882], _var[957], g[_var[31]]() - o)
                    },
                    slide: function(n, m) {
                        b(_var[888])[_var[9]](m[_var[11]] + _var[969]);
                        b(_var[886], g)[_var[663]](_var[885], m[_var[11]] - 1)
                    }
                })
            }
            b(_var[1094])[_var[866]]()
        },
        code: function() {
            var j = this;
            var h = this[_var[157]];
            if (h[_var[195]]) {
                var g = guiBuilder[_var[861]];
                var e = g + h[_var[195]];
                var d = g + _var[1095] + h[_var[195]];
                var l = _var[1096] + h[_var[195]] + _var[1097];
                var k = 0;
                b(_var[1099])[_var[17]](function() {
                    k += b(this)[_var[1098]](true)
                });
                var i = _var[44];
                b[_var[1102]]({
                    url: e,
                    dataType: _var[1035],
                    type: _var[1100],
                    success: function(m) {
                        m = m[_var[38]](/\\/g, _var[44]);
                        b(_var[1101])[_var[9]](b[_var[702]](m))
                    }
                });
                var f = _var[44];
                b[_var[1102]]({
                    url: d,
                    dataType: _var[1035],
                    type: _var[1100],
                    success: function(m) {
                        m = m[_var[38]](/\\/g, _var[44]);
                        b(_var[1103])[_var[9]](b[_var[702]](m))
                    }
                });
                var c = _var[1104] + e + _var[1105] + h[_var[195]] + _var[1106] + h[_var[195]] + _var[1107] + l + _var[1108] + _var[1109] + d + _var[1110] + _var[1111] + e + _var[1112] + k + _var[1113] + i + _var[1114] + f + _var[1115];
                b(_var[695])[_var[858]]({
                    title: _var[218],
                    status: _var[856],
                    opacity: 0,
                    body: c,
                    width: 550,
                    overlay: false
                });
                b(function() {
                    b(_var[1118])[_var[1117]]({
                        heightStyle: _var[1116]
                    })
                });
                b(_var[1123])[_var[173]](function() {
                    if (b(this)[_var[879]](_var[878])) {
                        b(_var[1121])[_var[23]](_var[1120])[_var[17]](function() {
                            var m = b(this)[_var[701]]() || b(this)[_var[29]]();
                            b(this)[_var[701]](m[_var[38]](/http/g, _var[1119]))
                        })
                    } else {
                        b(_var[1121])[_var[23]](_var[1120])[_var[17]](function() {
                            var m = b(this)[_var[701]]() || b(this)[_var[29]]();
                            b(this)[_var[701]](m[_var[38]](/https/g, _var[1122]))
                        })
                    }
                })
            } else {
                j[_var[642]](_var[831])
            }
        },
        data: function() {},
        getDoc: function(d) {
            var e = null;
            try {
                if (d[_var[1124]]) {
                    e = d[_var[1124]][_var[1125]]
                }
            } catch (c) {}
            if (e) {
                return e
            }
            try {
                e = d[_var[1126]] ? d[_var[1126]] : d[_var[1125]]
            } catch (c) {
                e = d[_var[1125]]
            }
            return e
        },
        save: function(k) {
            var o = this;
            var n = this[_var[157]];
            var o = this;
            var k = k || false;
            var j = b(_var[1127])[_var[88]]() || 0;
            var l = b(_var[639]);
            var i = b(_var[1128])[_var[29]]();
            b(_var[1130])[_var[692]](_var[1129]);
            if (l[_var[88]]() == 0) {
                b(_var[1130])[_var[722]](_var[1129]);
                b(_var[695])[_var[858]]({
                    title: _var[856],
                    status: _var[856],
                    body: _var[1131]
                });
                return false
            } else {
                if (j > 0) {
                    b(_var[1130])[_var[722]](_var[1129]);
                    b(_var[695])[_var[858]]({
                        title: _var[1132],
                        status: _var[1132],
                        body: _var[1133]
                    });
                    return false
                } else {
                    var m = {};
                    var h = b[_var[35]](b[_var[702]](b(_var[700])[_var[701]]()));
                    var f = [_var[1030]];
                    o[_var[1134]]();
                    var i = b(_var[20])[_var[19]](b(_var[1128])[_var[671]]());
                    b(_var[1135], i)[_var[658]]();
                    b(_var[94], i)[_var[722]](_var[1136]);
                    var c = b(_var[20])[_var[19]](b(_var[668])[_var[671]]());
                    b(c)[_var[23]](_var[668])[_var[913]](_var[46])[_var[663]]({
                        height: _var[44],
                        top: _var[44],
                        left: _var[44]
                    });
                    b(c)[_var[23]](_var[1138])[_var[913]](_var[1137]);
                    b(c)[_var[23]](_var[1139])[_var[722]](_var[721]);
                    b(c)[_var[23]](_var[94])[_var[913]](_var[32]);
                    b(c)[_var[23]](_var[94])[_var[913]](_var[1140]);
                    b(c)[_var[23]](_var[668])[_var[663]]({
                        width: _var[1141],
                        "max-width": document[_var[1144]](_var[1143])[_var[1142]] - 30
                    });
                    b(c)[_var[23]](_var[821])[_var[722]](_var[1146])[_var[913]](_var[1145]);
                    b(c)[_var[23]](_var[1148])[_var[663]](_var[970], _var[44])[_var[722]](_var[1147]);
                    b(c)[_var[23]](_var[1150])[_var[913]](_var[1149]);
                    b(c)[_var[23]](_var[1135])[_var[658]]();
                    var f = [_var[1151], _var[1152], _var[1153], _var[1154]];
                    var e = [_var[849], _var[1155]];
                    var d = {};
                    b[_var[17]](e, function() {
                        d[this] = (b(i)[_var[23]](_var[1156] + this)[_var[88]]() > 0) ? 1 : 0
                    });
                    b[_var[17]](l, function() {
                        var t = this[_var[1158]][_var[48]](_var[1157])[1][_var[48]](_var[47])[0];
                        if (b[_var[717]](t, f) == -1) {
                            var q = b(this)[_var[28]](_var[772]);
                            var p = this[_var[1158]][_var[49]](/(\bf_)\S*/g);
                            var s = b(_var[20])[_var[19]](b(_var[762], this)[_var[671]]());
                            b(s)[_var[23]](_var[759])[_var[658]]();
                            s = (b[_var[702]](s[_var[9]]()) != _var[44]) ? b[_var[702]](s[_var[9]]()) : q;
                            var w = b(this)[_var[28]](_var[1137]);
                            var v = (b(_var[759], this)[_var[88]]() > 0) ? true : false;
                            m[this[_var[195]]] = {
                                name: q,
                                type: p[0],
                                label: s,
                                properties: {
                                    dataType: w
                                },
                                validation: {
                                    required: v
                                }
                            };
                            if (p == _var[1066]) {
                                m[this[_var[195]]][_var[871]][_var[9]] = b(_var[90], this)[_var[28]](_var[46])[_var[48]](_var[914])[1][_var[48]](_var[993])[0];
                                m[this[_var[195]]][_var[871]][_var[1159]] = true
                            } else {
                                if (p == _var[1059]) {
                                    var r = b(_var[90], this)[_var[28]](_var[964]);
                                    m[this[_var[195]]][_var[871]][_var[9]] = b(_var[90], this)[_var[28]](_var[872]);
                                    m[this[_var[195]]][_var[871]][_var[964]] = (r === a || r <= 0) ? false : parseInt(r);
                                    m[this[_var[195]]][_var[871]][_var[1159]] = (b(_var[90], this)[_var[28]](_var[898]) == _var[899]) ? true : false
                                } else {
                                    if (p == _var[1085]) {
                                        m[this[_var[195]]][_var[871]][_var[1160]] = b[_var[92]](b(_var[90], this)[_var[28]](_var[922])[_var[48]](_var[1161]), function(x) {
                                            return b[_var[702]](x)
                                        });
                                        m[this[_var[195]]][_var[871]][_var[1162]] = b(_var[90], this)[_var[28]](_var[966]);
                                        m[this[_var[195]]][_var[747]][_var[907]] = b(_var[90], this)[_var[53]](_var[907]) ? true : false
                                    } else {
                                        if (p == _var[1077]) {
                                            m[this[_var[195]]][_var[871]][_var[1163]] = (parseInt(b(_var[90], this)[_var[28]](_var[987])) > 2) ? 2 : parseInt(b(_var[90], this)[_var[28]](_var[987]))
                                        } else {
                                            if (p == _var[867]) {
                                                m[this[_var[195]]][_var[871]][_var[1164]] = b(_var[90], this)[_var[53]](_var[869]) ? parseInt(b(_var[90], this)[_var[28]](_var[869])) : _var[44];
                                                m[this[_var[195]]][_var[871]][_var[1165]] = b(_var[90], this)[_var[53]](_var[870]) ? parseInt(b(_var[90], this)[_var[28]](_var[870])) : _var[44]
                                            } else {
                                                if (p == _var[1079]) {
                                                    m[this[_var[195]]][_var[871]][_var[1166]] = b(_var[90], this)[_var[28]](_var[842])
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (p == _var[1027] || p == _var[938] || p == _var[937]) {
                                var u = (p == _var[1027]) ? _var[1167] : _var[90];
                                m[this[_var[195]]][_var[871]][_var[1168]] = b[_var[92]](b(u, this), function(x) {
                                    return b[_var[702]](x[_var[11]])
                                })
                            }
                        }
                    });
                    var m = {
                        title: h,
                        data: m,
                        include: d,
                        canvas: encodeURIComponent(i[_var[29]]()),
                        html: encodeURIComponent(c[_var[29]]()),
                        id: n[_var[195]]
                    };
                    var g = b(_var[1170], {
                        name: _var[1171],
                        style: _var[1172],
                        src: _var[1173]
                    })[_var[1169]](_var[191])[_var[706]]();
                    b(_var[1179], {
                        name: _var[1171],
                        id: _var[1171],
                        src: _var[1173],
                        action: ajaxurl,
                        method: _var[1100],
                        target: _var[1171]
                    })[_var[19]](_var[1174] + guiBuilder[_var[1175]] + _var[1176] + JSON[_var[1177]](m) + _var[1178])[_var[1169]](_var[191])[_var[706]]();
                    b[_var[1198]](o[_var[673]](), b(_var[1203])[_var[173]]())[_var[1196]](g[_var[1202]](function(p) {
                        var q = o[_var[1180]](g[0]);
                        var v = q[_var[191]] ? q[_var[191]] : q[_var[1181]];
                        b(_var[1182])[_var[658]]();
                        var s = b[_var[1184]](v[_var[1183]]);
                        n[_var[195]] = s[_var[195]];
                        b(_var[1130])[_var[722]](_var[1129]);
                        if (s[_var[1185]] == _var[1132]) {
                            b(_var[695])[_var[858]]({
                                title: s[_var[1185]],
                                status: s[_var[1185]],
                                body: _var[1186] + s[_var[856]] + _var[920]
                            })
                        } else {
                            if (k == _var[823]) {
                                var t = b(_var[1187])[_var[1075]]();
                                var u = b(_var[191])[_var[34]]() - 80;
                                n[_var[1188]] = t;
                                var r = ajaxurl + _var[1189] + guiBuilder[_var[1175]] + _var[1190] + u + _var[1191] + (t - 30) + _var[1192] + s[_var[195]];
                                tb_show(_var[206], r);
                                b[_var[1198]](b(_var[862])[_var[28]](_var[859], guiBuilder[_var[861]] + s[_var[195]])[_var[1197]](_var[173]))[_var[1196]](function(x, w, y) {
                                    timeout = setTimeout(function() {
                                        b(_var[1195])[_var[1194]]()[_var[23]](_var[1193])[_var[658]]();
                                        clearTimeout(timeout)
                                    }, 800)
                                });
                                b(_var[733])[_var[658]]();
                                b(_var[1199])[_var[28]](_var[859], r)[_var[1197]](_var[173])
                            } else {
                                if (k == _var[829] || k == _var[832]) {
                                    location[_var[859]] = guiBuilder[_var[107]] + _var[1200] + k + _var[1201] + s[_var[195]]
                                } else {
                                    if (k == _var[831]) {
                                        o[_var[831]]()
                                    } else {
                                        if (k == _var[640]) {
                                            return false
                                        } else {
                                            b(_var[695])[_var[858]]({
                                                title: _var[856],
                                                status: _var[856],
                                                body: _var[1186] + s[_var[856]] + _var[920]
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }))
                }
            }
        },
        uiDestroy: function() {
            b(_var[863])[_var[866]](_var[865]);
            b(_var[1204])[_var[849]](_var[865])
        },
        resetSaving: function() {
            var c = this;
            c[_var[698]]();
            c[_var[956]](_var[787], true);
            c[_var[956]](_var[867], true)
        },
        create: function() {
            location[_var[859]] = location[_var[859]][_var[48]](_var[1205])[0]
        },
        preview_screen: function(c) {
            var e = [this[_var[157]][_var[1188]], 240, 320, 480];
            var d = e[c] / 2;
            if (c == 0) {
                b(_var[1195])[_var[1194]]()[_var[23]](_var[1193])[_var[658]]()
            } else {
                if (c > 0 && c < 4) {
                    b(_var[1195])[_var[1194]]()[_var[23]](_var[1206])[_var[658]]();
                    b(_var[1195])[_var[1194]]()[_var[23]](_var[1210])[_var[19]](_var[1207] + guiBuilder[_var[1208]] + _var[1209])
                } else {
                    b(_var[862])[_var[3]](0)[_var[173]]()
                }
            }
            b(_var[1211])[_var[192]]({
                marginLeft: -d,
                width: e[c]
            }, 400)
        },
        preview: function() {
            (b(_var[1212])[_var[88]]() > 0) ? alert(_var[1213]): this[_var[642]](_var[823])
        },
        merge: function(g, f) {
            var c = this;
            var d = this;
            if (b(_var[1214])[_var[88]]() < 2) {
                b(_var[695])[_var[858]]({
                    title: _var[856],
                    status: _var[856],
                    body: _var[1215]
                })
            } else {
                var e = b(_var[20]);
                d[_var[1134]]();
                b(_var[1222])[_var[17]](function() {
                    b(this)[_var[722]](_var[1216]);
                    var i = b(this)[_var[28]](_var[46]);
                    var j = b(this)[_var[28]](_var[195]);
                    var h = b(this)[_var[28]](_var[772]);
                    var k = b[_var[35]](b(this)[_var[28]](_var[1137]), _var[735]);
                    b(e)[_var[19]](_var[1217] + j + _var[1218] + k + _var[1219] + h + _var[1220] + i + _var[1221] + b(this)[_var[29]]() + _var[945])
                });
                b(e)[_var[23]](_var[1224])[_var[722]](_var[1223]);
                b(_var[1228])[_var[28]](_var[195], _var[1225] + String(Math[_var[1227]]())[_var[1226]](2, 8));
                b(_var[1228])[_var[45]](/^f_/)[_var[913]](_var[772]);
                b(_var[1228])[_var[722]](_var[1080]);
                b(_var[1228])[_var[29]](e[_var[29]]())[_var[722]](_var[745])[_var[692]](_var[1229]);
                b(_var[1231])[_var[23]](_var[1230])[_var[692]](_var[721]);
                b(_var[1232])[_var[658]]();
                d[_var[673]]();
                d[_var[726]]()
            }
            c[_var[749]]()
        },
        remove: function(j, g) {
            var c;
            var f = this;
            j = (j == false) ? false : true;
            var i = b(_var[708]);
            var e = b(_var[1233]);
            if (g !== a) {
                c = g;
                i = (i[_var[23]](_var[741])[_var[88]]() > 0) ? b(_var[1234]) : b(_var[708]);
                i[_var[722]](_var[721])
            } else {
                if (i[_var[743]](_var[102])) {
                    c = (i[_var[23]](_var[741])[_var[88]]() > 0) ? b(_var[1234]) : b(_var[708])
                } else {
                    c = b(_var[1235])
                }
            }
            var h = (i[_var[743]](_var[102])) ? b(_var[1233])[_var[720]](c) : b(_var[719])[_var[720]](c);
            if (b(_var[708])[_var[743]](_var[102])) {
                var d = b(_var[1236])[_var[88]]() - 1
            } else {
                var d = b(_var[719])[_var[88]]() - 1
            }
            if (c[_var[88]]() > 0) {
                c[_var[692]](_var[1237]);
                c[_var[794]](800, function() {
                    if (b(_var[708])[_var[743]](_var[102]) && b(this)[_var[178]]()[_var[23]](_var[94])[_var[88]]() == 1) {
                        b(this)[_var[178]]()[_var[658]]()
                    }
                    b(this)[_var[658]]();
                    if (b(_var[708])[_var[743]](_var[102])) {
                        if (h < d) {
                            b(_var[1238] + h + _var[22])[_var[692]](_var[721])
                        } else {
                            if (d == 0) {
                                b(_var[1239])[_var[658]]();
                                b(_var[723] + h + _var[22])[_var[692]](_var[721]);
                                if (b(_var[708])[_var[743]](_var[102])) {
                                    b(_var[1240])[_var[692]](_var[721])
                                }
                            }
                        }
                    } else {
                        if (h < d) {
                            b(_var[723] + h + _var[22])[_var[692]](_var[721])
                        } else {
                            b(_var[725])[_var[692]](_var[721])
                        }
                        if (b(_var[708])[_var[743]](_var[102])) {
                            b(_var[1240])[_var[692]](_var[721])
                        }
                    }
                    if (b(_var[716])[_var[88]]() !== 0) {
                        if (b(_var[1241])[_var[88]]() == 0) {
                            b(_var[733])[_var[658]]()
                        } else {
                            if (j) {
                                f[_var[726]]()
                            }
                        }
                    }
                    if (j && b(_var[1242])[_var[88]]() > 0) {
                        f[_var[747]]();
                        f[_var[748]]()
                    }
                    f[_var[749]]()
                })
            }
            return false
        },
        required: function(f, e) {
            var d = this;
            var c = d._form();
            if (c[_var[88]]() > 0 && c[_var[743]](_var[1030]) == false) {
                if (b(e)[_var[743]](_var[703])) {
                    c[_var[23]](_var[759])[_var[658]]();
                    b(e)[_var[722]](_var[703])
                } else {
                    c[_var[23]](_var[762])[_var[19]](_var[761]);
                    b(e)[_var[692]](_var[703])
                }
            }
        },
        color_picker: function() {
            var c = this;
            b(_var[1255])[_var[1250]]({
                showInput: true,
                appendTo: _var[178],
                chooseText: _var[1243],
                showInitial: true,
                showAlpha: true,
                allowEmpty: true,
                preferredFormat: _var[1244],
                beforeShow: function(d) {
                    var i = this[_var[195]];
                    var g = b(_var[669])[_var[9]]()[_var[38]](/\s\s+/g, _var[44]);
                    var h = g[_var[48]](_var[1245])[1][_var[48]](_var[74])[0];
                    var f = g[_var[48]](_var[1246])[1][_var[48]](_var[74])[0];
                    var e = g[_var[48]](_var[1247])[1][_var[48]](_var[74])[0][_var[48]](_var[47])[3];
                    if (i == _var[1248]) {
                        b(this)[_var[1250]](_var[1249], f)
                    }
                    if (i == _var[1251]) {
                        b(this)[_var[1250]](_var[1249], e)
                    }
                    if (i == _var[1252]) {
                        b(this)[_var[1250]](_var[1249], h)
                    }
                },
                show: function(d) {
                    var e = this[_var[195]];
                    d = (d == null) ? _var[1253] : d;
                    c[_var[1254]](e, d)
                },
                dragstop: function(e, d) {
                    var f = this[_var[195]];
                    d = (d == null) ? _var[1253] : d;
                    c[_var[1254]](f, d)
                },
                change: function(d) {
                    var e = this[_var[195]];
                    d = (d == null) ? _var[1253] : d;
                    c[_var[1254]](e, d)
                }
            })
        },
        setColors: function(h, c) {
            var e = b(_var[669])[_var[9]]()[_var[38]](/\s\s+/g, _var[44]);
            if (h == _var[1248]) {
                var g = e[_var[48]](_var[1256])[1][_var[48]](_var[74])[0];
                b(_var[669])[_var[9]](b(_var[669])[_var[9]]()[_var[38]](g, c))
            } else {
                if (h == _var[1252]) {
                    var f = e[_var[48]](_var[1257])[1][_var[48]](_var[74])[0];
                    b(_var[669])[_var[9]](b(_var[669])[_var[9]]()[_var[38]](f, c))
                } else {
                    if (h == _var[1251]) {
                        var d = e[_var[48]](_var[1258])[1][_var[48]](_var[74])[0][_var[48]](_var[47])[2];
                        b(_var[669])[_var[9]](b(_var[669])[_var[9]]()[_var[38]](d, c))
                    }
                }
            }
        },
        colors: function(i, h) {
            b(_var[1259])[_var[722]](_var[703]);
            b(_var[1260])[_var[692]](_var[703]);
            var f = b(_var[669])[_var[9]]()[_var[38]](/\s\s+/g, _var[44]);
            var g = f[_var[48]](_var[1245])[1][_var[48]](_var[74])[0];
            var e = f[_var[48]](_var[1246])[1][_var[48]](_var[74])[0];
            var d = f[_var[48]](_var[1247])[1][_var[48]](_var[74])[0][_var[48]](_var[47])[3];
            var c = _var[1261] + g + _var[1262] + e + _var[1263] + d + _var[1264];
            b(_var[1265])[_var[29]](c);
            this[_var[1266]]();
            this[_var[749]]()
        },
        fonts: function(f, e) {
            b(_var[1259])[_var[722]](_var[703]);
            b(_var[1267])[_var[692]](_var[703]);
            var d = b(_var[669])[_var[9]]();
            d = d[_var[48]](_var[737])[1][_var[48]](_var[74])[0];
            var c = _var[1268];
            b[_var[17]](b[_var[87]].Fonts, function(h, g) {
                if (d[_var[48]](_var[1161])[0][_var[38]](/['", ]/g, _var[44]) == g[_var[48]](_var[1161])[0][_var[38]](/['", ]/g, _var[44])) {
                    c += _var[1269] + g + _var[1270] + g + _var[1221] + h + _var[804]
                } else {
                    c += _var[1271] + g + _var[1270] + g + _var[1221] + h + _var[804]
                }
            });
            c += _var[1272];
            b(_var[1273])[_var[29]](c);
            this[_var[749]]()
        },
        font_property: function() {
            var d = this._form();
            var c = _var[1274];
            var e = d[_var[23]](_var[840])[_var[663]](_var[839]);
            b[_var[17]](b[_var[87]].Fonts, function(g, f) {
                if (e[_var[38]](/'/g, _var[44]) == g[_var[38]](/'/g, _var[44])) {
                    c += _var[1275] + f + _var[1270] + f + _var[1221] + g + _var[101]
                } else {
                    c += _var[1276] + f + _var[1270] + f + _var[1221] + g + _var[101]
                }
            });
            c += _var[105];
            return c
        },
        css: function(e, d) {
            var c = _var[1277];
            b(_var[1278])[_var[29]](c);
            b(this[_var[1281]][0])[_var[692]](_var[1280])[_var[28]](_var[1279], true)[_var[663]]({});
            if (b(_var[665])[_var[88]]() == 0) {
                b(_var[666])[_var[1282]](_var[669])
            } else {
                b(_var[765])[_var[701]](b(_var[665])[_var[9]]())
            }
            this[_var[749]]()
        },
        properties: function(g, f) {
            var d;
            var e = this;
            var c = e._form();
            if (c[_var[743]](_var[787]) || c[_var[743]](_var[1027]) || c[_var[743]](_var[938]) || c[_var[743]](_var[937])) {
                b(_var[1028])[_var[1020]]()
            } else {
                b(_var[1028])[_var[706]]()
            }
            b(_var[708])[_var[743]](_var[102]) ? b(_var[1029])[_var[1020]]() : b(_var[1029])[_var[706]]();
            if (c[_var[743]](_var[1050])) {
                d = [_var[1283], _var[1284], _var[1285], _var[1286], _var[1287], _var[1288], _var[1289], _var[1290], _var[1291]]
            } else {
                if (c[_var[743]](_var[1055])) {
                    d = [_var[1283], _var[1284], _var[1285], _var[1292], _var[1288], _var[1289], _var[1290], _var[1293], _var[1291]]
                } else {
                    if (c[_var[743]](_var[802])) {
                        d = [_var[1283], _var[1284], _var[1285], _var[1294], _var[1289], _var[1290], _var[1293], _var[1291]]
                    } else {
                        if (c[_var[743]](_var[1059])) {
                            d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1297], _var[1298], _var[1299], _var[1300], _var[1301], _var[1302], _var[1303], _var[1304], _var[1291]]
                        } else {
                            if (c[_var[743]](_var[1065])) {
                                d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1301], _var[1300], _var[1302], _var[1291], _var[1305]]
                            } else {
                                if (c[_var[743]](_var[1027])) {
                                    d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1300], _var[1302], _var[1291]]
                                } else {
                                    if (c[_var[743]](_var[937]) || c[_var[743]](_var[938])) {
                                        d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1300], _var[1306], _var[1307], _var[1291]]
                                    } else {
                                        if (c[_var[743]](_var[1030])) {
                                            d = [_var[1283], _var[1284], _var[1285], _var[1308], _var[1309], _var[1310], _var[1311], _var[1312], _var[1313], _var[1291]]
                                        } else {
                                            if (c[_var[743]](_var[1085])) {
                                                d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1302], _var[1314], _var[1315], _var[1316], _var[1291]]
                                            } else {
                                                if (c[_var[743]](_var[1077])) {
                                                    d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1300], _var[1302], _var[1291], _var[1317]]
                                                } else {
                                                    if (c[_var[743]](_var[1079])) {
                                                        d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1300], _var[1302], _var[1318], _var[1291]]
                                                    } else {
                                                        if (c[_var[743]](_var[1062])) {
                                                            d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1297], _var[1299], _var[1302], _var[1291]]
                                                        } else {
                                                            if (c[_var[743]](_var[1066])) {
                                                                d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1301], _var[1300], _var[1302], _var[1304], _var[1291]]
                                                            } else {
                                                                if (c[_var[743]](_var[867])) {
                                                                    d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1302], _var[1319], _var[1320], _var[1291]]
                                                                } else {
                                                                    if (c[_var[743]](_var[787])) {
                                                                        d = [_var[1283], _var[1284], _var[1285], _var[1295], _var[1296], _var[1299], _var[1302], _var[1291]]
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
            }
            this[_var[1321]](d);
            this[_var[749]]()
        },
        tab_groups: function() {
            var e = this;
            var d = b(_var[1239]);
            var c = _var[44];
            d[_var[23]](_var[740])[_var[17]](function() {
                var h = this[_var[195]];
                var g = _var[44];
                if (b(this)[_var[23]](_var[762])[_var[88]]() > 0) {
                    g = b(this)[_var[23]](_var[762])[_var[9]]()
                } else {
                    if (b(this)[_var[743]](_var[802])) {
                        g = _var[1032]
                    } else {
                        if (b(this)[_var[743]](_var[1030])) {
                            g = _var[1322]
                        } else {
                            if (b(this)[_var[743]](_var[1050])) {
                                g = _var[1323]
                            } else {
                                if (b(this)[_var[743]](_var[1033])) {
                                    g = _var[1034]
                                } else {
                                    if (b(this)[_var[743]](_var[1055])) {
                                        g = _var[1324]
                                    }
                                }
                            }
                        }
                    }
                }
                c += _var[1325] + h[_var[48]](_var[757])[1] + _var[1326] + g + _var[1327]
            });
            b(_var[1329])[_var[29]](_var[1328] + c + _var[655]);
            var f;
            b(_var[1338])[_var[183]]({
                axis: _var[1330],
                forcePlaceholderSize: true,
                forceHelperSize: true,
                opacity: 0.9,
                scroll: true,
                handle: _var[1331],
                scrollSensitivity: 5,
                scrollSpeed: 5,
                placeholder: _var[1332],
                revert: true,
                tolerance: _var[1333],
                beforeStop: function(h, k) {
                    f = b(k[_var[193]])[_var[720]]();
                    var n = b(_var[1239]);
                    var m = _var[1334] + b(k[_var[1335]])[_var[28]](_var[195])[_var[48]](_var[757])[1];
                    if (b(_var[674] + m)[_var[743]](_var[867])) {
                        b(_var[674] + m)[_var[23]](_var[809])[_var[849]](_var[865])
                    }
                    if (b(_var[674] + m)[_var[743]](_var[787])) {
                        b(_var[674] + m)[_var[23]](_var[864])[_var[866]](_var[865])
                    }
                    var l = n[_var[23]](_var[674] + m)[_var[671]]();
                    var g = b(_var[1336])[_var[88]]();
                    n[_var[23]](_var[674] + m)[_var[658]]();
                    (f == (g - 2)) ? n[_var[19]](l): b(_var[1337] + f + _var[22], n)[_var[894]](l);
                    if (b(_var[674] + m)[_var[743]](_var[867])) {
                        var j = b(_var[674] + m)[_var[23]](_var[851])[_var[28]](_var[869]);
                        var i = b(_var[674] + m)[_var[23]](_var[851])[_var[28]](_var[870]);
                        b(_var[674] + m)[_var[23]](_var[851])[_var[849]]({
                            max: j,
                            min: i
                        })
                    }
                    if (b(_var[674] + m)[_var[743]](_var[787])) {
                        b(_var[674] + m)[_var[23]](_var[864])[_var[866]]()
                    }
                    if (b(_var[674] + m)[_var[743]](_var[1062])) {
                        var o = b(_var[674] + m)[_var[23]](_var[90])[_var[28]](_var[684]);
                        b(_var[674] + m)[_var[23]](_var[90])[_var[676]](o)
                    }
                }
            });
            b(document)[_var[703]](_var[173], _var[1339], function() {
                var g = b(this)[_var[178]]();
                g[_var[794]](_var[732], function() {
                    b(this)[_var[658]]()
                });
                b(_var[1340] + g[_var[720]]() + _var[22], d)[_var[706]](_var[732], function() {
                    b(this)[_var[658]]();
                    if (b(_var[740], d)[_var[88]]() == 0) {
                        e[_var[658]](true)
                    }
                })
            });
            this[_var[749]]()
        },
        tab_items: function() {
            var f = this;
            var d = f._form();
            var c = _var[44];
            c += _var[1341];
            d[_var[23]](_var[821])[_var[17]](function() {
                var h = this[_var[1183]];
                c += _var[1342] + h + _var[1343]
            });
            c += _var[655];
            c += _var[1344];
            b(_var[1345])[_var[29]](c);
            var e;
            var g;
            b(_var[1346])[_var[183]]({
                axis: _var[1330],
                forcePlaceholderSize: true,
                forceHelperSize: true,
                opacity: 0.9,
                scroll: true,
                handle: _var[1331],
                scrollSensitivity: 5,
                scrollSpeed: 5,
                placeholder: _var[1332],
                revert: true,
                tolerance: _var[1333]
            });
            this[_var[749]]()
        },
        tab_options: function() {
            var f = this;
            var d = f._form();
            var e = _var[44];
            if (d[_var[743]](_var[1027])) {
                d[_var[23]](_var[1167])[_var[17]](function() {
                    var j = b(this)[_var[28]](_var[11]);
                    var k = b(this)[_var[29]]();
                    var i = (b(this)[_var[879]](_var[1347])) ? _var[1348] : _var[1349];
                    if (j == k) {
                        e += _var[803] + i + _var[1350] + j + _var[1351] + j + _var[1352]
                    } else {
                        e += _var[803] + i + _var[1350] + k + _var[1351] + j + _var[1352]
                    }
                })
            }
            if (d[_var[743]](_var[787])) {
                b(_var[90], d)[_var[17]](function() {
                    var l = b(_var[695]);
                    var j = b(this)[_var[701]]();
                    var k = b(this)[_var[178]]()[_var[23]](_var[1353] + b(this)[_var[28]](_var[195]) + _var[1354])[_var[29]]();
                    var i = (b(this)[_var[879]](_var[878])) ? _var[1348] : _var[1349];
                    if (j == k) {
                        l[_var[19]](_var[803] + i + _var[1355] + j + _var[1356])
                    } else {
                        l[_var[19]](_var[803] + i + _var[1357] + j + _var[1358])
                    }
                    l[_var[23]](_var[1359])[_var[28]](_var[11], k);
                    e += l[_var[29]]()
                })
            }
            if (d[_var[743]](_var[937]) || d[_var[743]](_var[938])) {
                var g = _var[44];
                b[_var[17]](b(_var[990], d), function() {
                    var j = b(_var[90], this)[_var[701]]();
                    var k = b(_var[915], this)[_var[9]]();
                    var i = (b(this)[_var[23]](_var[90])[_var[879]](_var[878])) ? _var[1348] : _var[1349];
                    if (j == k) {
                        e += _var[803] + i + _var[1350] + j + _var[1351] + j + _var[1352]
                    } else {
                        e += _var[803] + i + _var[1350] + k + _var[1351] + j + _var[1352]
                    }
                })
            }
            var c = _var[1360];
            c += _var[1361];
            c += _var[1362];
            var h = d[_var[743]](_var[787]) ? this[_var[157]][_var[788]] : this[_var[157]][_var[786]];
            b[_var[17]](h, function(j, i) {
                c += _var[803] + j + _var[804]
            });
            b[_var[17]](guiBuilder[_var[157]], function(j, i) {
                c += _var[1363] + j + _var[804]
            });
            c += _var[1364] + e + _var[1365];
            c += _var[1366];
            b(_var[1367])[_var[29]](c);
            b(_var[784])[_var[183]]({
                axis: _var[1330],
                forcePlaceholderSize: true,
                forceHelperSize: true,
                opacity: 0.9,
                scroll: true,
                handle: _var[1331],
                scrollSensitivity: 5,
                scrollSpeed: 5,
                placeholder: _var[1332],
                revert: true,
                tolerance: _var[1333]
            });
            this[_var[749]]()
        },
        rebuild_options: function() {
            var e = this;
            var c = e._form();
            e[_var[1368]]();
            if (c[_var[743]](_var[937]) || c[_var[743]](_var[938])) {
                var d = c[_var[23]](_var[998])[_var[28]](_var[46])[_var[48]](_var[914])[1];
                d = (d === a) ? 1 : d[_var[48]](_var[993])[0];
                e[_var[974]](d)
            }
        },
        build_options: function() {
            var d = _var[44];
            var f = this[_var[157]];
            var g = this;
            var c = g._form();
            var e = b(_var[708])[_var[28]](_var[772]);
            var h = b(_var[1369], c)[_var[28]](_var[1137]);
            b(_var[793])[_var[17]](function() {
                var k = b[_var[702]](b(_var[1370], this)[_var[701]]());
                var j = b(_var[1371], this)[_var[701]]();
                var i = b(_var[1372], this)[_var[879]](_var[878]);
                j = b[_var[702]](j[_var[38]](/<\/?[^>]+(>|$)/g, _var[44]));
                j = b[_var[35]](j);
                i = (i) ? _var[1373] : _var[44];
                if (c[_var[743]](_var[1027])) {
                    i = (i) ? _var[1374] : _var[44];
                    d += _var[1375] + i + _var[1376] + j + _var[1221] + k + _var[101];
                    c[_var[23]](_var[712])[_var[29]](d)
                }
                if (c[_var[743]](_var[937])) {
                    d += _var[1377] + i + _var[1378] + h + _var[1379] + e + _var[1380] + j + _var[1381] + k + _var[1382];
                    c[_var[23]](_var[994])[_var[29]](d)
                }
                if (c[_var[743]](_var[938])) {
                    d += _var[1377] + i + _var[1378] + h + _var[1379] + e + _var[1383] + j + _var[1381] + k + _var[1382];
                    c[_var[23]](_var[996])[_var[29]](d)
                }
                if (c[_var[743]](_var[787])) {
                    var l = _var[1384] + String(Math[_var[1227]]())[_var[1226]](2, 8);
                    d += _var[754] + l + _var[1385] + i + _var[1376] + j + _var[1379] + e + _var[1386] + l + _var[1221] + k + _var[1387]
                }
            });
            if (c[_var[743]](_var[787])) {
                d = b(_var[1388])[_var[19]](d);
                c[_var[23]](_var[768])[_var[29]](d[_var[671]]());
                c[_var[23]](_var[864])[_var[866]]()
            }
            alert(_var[1389])
        },
        buildProperties: function(f) {
            var e = this;
            var d = e._form();
            var c = _var[44];
            c += _var[1390];
            b[_var[17]](f, function() {
                c += _var[1391] + this + _var[920];
                c += (e[_var[157]][_var[1016]][this][1] != _var[44]) ? _var[1392] + e[_var[157]][_var[1016]][this][1] + _var[920] : _var[44];
                c += _var[1393] + ((this == _var[1289]) ? e[_var[1394]]() : e[_var[157]][_var[1016]][this][0]) + _var[1395]
            });
            c += _var[1396];
            b(_var[1023])[_var[29]](c);
            b(_var[1398])[_var[17]](function() {
                var g = b(this)[_var[28]](_var[870]) || b(this)[_var[28]](_var[939]);
                var h = b(this)[_var[28]](_var[869]) || null;
                b(this)[_var[849]]({
                    min: g,
                    max: h,
                    numberFormat: _var[1397]
                })
            });
            b(_var[1259])[_var[722]](_var[703]);
            b(_var[1399])[_var[692]](_var[703]);
            if (d[_var[743]](_var[1079])) {
                b(_var[841])[_var[19]](_var[1400]);
                b(_var[1402])[_var[17]](function() {
                    b(_var[841])[_var[19]](_var[1401] + b(_var[90], this)[_var[28]](_var[27]) + _var[1221] + b(_var[762], this)[_var[9]]() + _var[101])
                })
            }
            this[_var[749]]()
        },
        checked: function() {
            var c = this._form();
            (c[_var[23]](_var[759])[_var[88]]() > 0) ? b(_var[1049])[_var[692]](_var[703]): b(_var[1049])[_var[722]](_var[703]);
            (c[_var[88]]() > 0) ? b(_var[1403])[_var[692]](_var[703]): b(_var[1403])[_var[722]](_var[703])
        }
    })
}(jQuery));
(function() {
    var b = jQuery;
    var a = {
        focus: null,
        id: guiform[_var[195]] || null,
        title: guiform[_var[653]],
        sortingItem: false,
        draggingItem: false,
        dragItem: null,
        dragItemID: null,
        canvasHeight: function() {
            if (b[_var[67]][_var[27]]() == _var[76] || b[_var[67]][_var[27]]() == _var[81]) {
                return screen[_var[34]] - 300
            }
            if (b[_var[67]][_var[27]]() == _var[1405] || b[_var[67]][_var[27]]() == _var[78]) {
                return screen[_var[34]] - 340
            }
            if (b[_var[67]][_var[27]]() == _var[70]) {
                return screen[_var[34]] - 290
            }
        },
        maxInputHeight: 500,
        activeProperties: false,
        Container: {
            parent: b(_var[1406]),
            canvas: b(_var[1407]),
            container: b(_var[1408]),
            containment: b(_var[1409]),
            tools: b(_var[1410]),
            contextMenu: b(_var[1411])
        },
        Selector: {
            parent: b(_var[645]),
            toolLi: b(_var[1412]),
            active: b(_var[1413]),
            contextMenu: b(_var[707])
        },
        Tag: {
            tools: _var[1414],
            property: _var[1415],
            propertyContent: _var[1416]
        },
        Tools: {
            form: {
                "Form Tools": {
                    t_text: [_var[1417], _var[1418]],
                    t_textarea: [_var[1419], _var[1420]],
                    t_select: [_var[1421], _var[1422]],
                    t_radio: [_var[1423], _var[1424]],
                    t_checkbox: [_var[1425], _var[1426]],
                    t_file: [_var[1427], _var[1428]],
                    t_password: [_var[1429], _var[1430]],
                    t_confirm_password: [_var[1431], _var[1430]],
                    t_submit: [_var[1031], _var[219]]
                },
                "Display Tools": {
                    t_heading: [_var[1432], _var[1433]],
                    t_letter: [_var[1286], _var[1434]],
                    t_list: [_var[1032], _var[1435]]
                },
                "Quick Tools": {
                    t_phone: [_var[1436], _var[1437]],
                    t_email: [_var[1438], _var[1439]],
                    t_spinner: [_var[1440], _var[1441]],
                    t_button: [_var[1442], _var[1443]]
                }
            }
        },
        Form: {
            heading: [_var[1444]],
            letter: [_var[1445]],
            list: [_var[1446]],
            text: [_var[1447], _var[1448]],
            textarea: [_var[1449], _var[1450]],
            select: [_var[1451], _var[1448]],
            radio: [_var[1452], _var[1448]],
            checkbox: [_var[1453], _var[1454]],
            file: [_var[1455], _var[1456]],
            submit: [_var[1457], _var[44]],
            password: [_var[1458], _var[1459]],
            confirm_password: [_var[1460], _var[44]],
            phone: [_var[1461], _var[1448]],
            email: [_var[1462], _var[1448]],
            spinner: [_var[1463], _var[1448]],
            button: [_var[1464], _var[1465]]
        },
        Context: {
            menu: {
                c_nextLineOn: _var[1466],
                c_nextLineOff: _var[1467],
                c_shrink: _var[1468],
                c_expand: _var[1469],
                c_blockLine: _var[1470],
                c_floatLine: _var[1471],
                c_delete: _var[1472],
                g_blockLine: _var[1473],
                g_floatLine: _var[1474],
                g_nextLineOn: _var[1475],
                g_nextLineOff: _var[1476]
            }
        }
    };
    a[_var[1477]] = function() {
        b(this[_var[1480]][_var[178]])[_var[19]](b(this[_var[1479]][_var[1478]]));
        b[_var[17]](this[_var[1482]][_var[1481]], function(e, d) {
            var c = _var[44];
            c += _var[1483] + e + _var[1484];
            c += _var[1485];
            b[_var[17]](a[_var[1482]][_var[1481]][e], function(g, f) {
                var h = f[0];
                var i = f[1];
                if (g == _var[1486]) {
                    c += _var[1487] + g + _var[1488] + i + _var[1489] + h + _var[1490]
                } else {
                    c += _var[1487] + g + _var[1491] + i + _var[1492] + h + _var[1490]
                }
            });
            c += _var[655];
            b(a[_var[1479]][_var[1478]])[_var[19]](c)
        })
    };
    a[_var[1493]] = function() {
        if (guiBuilder[_var[1143]] !== null) {
            b(_var[645])[_var[19]](guiBuilder[_var[1143]][_var[38]](/\\/g, _var[44]));
            b(_var[1494])[_var[658]]();
            b(_var[1495])[_var[28]](_var[195], _var[183])
        } else {
            b(_var[645])[_var[19]](b(this[_var[1479]][_var[1496]]));
            b(_var[1128])[_var[19]](b(this[_var[1479]][_var[1143]]));
            b(_var[668])[_var[29]](b(this[_var[1479]][_var[168]]))
        }
        var c = _var[1497];
        b(_var[1128])[_var[19]](c)
    };
    a[_var[1498]] = function(g) {
        var c = _var[44];
        var f = a[_var[1499]][_var[647]];
        var e = b(_var[708]);
        var d = (e[_var[743]](_var[102])) ? b(_var[758]) : b(a[_var[1480]][_var[721]][_var[1500]]);
        if (e[_var[743]](_var[102])) {
            c += (e[_var[743]](_var[1501])) ? f[_var[1502]] : f[_var[1503]];
            c += (e[_var[743]](_var[1504])) ? f[_var[1505]] : f[_var[1506]]
        }
        if (d[_var[743]](_var[1030]) || d[_var[743]](_var[1033])) {
            c += (d[_var[743]](_var[1504])) ? f[_var[1507]] : f[_var[1508]];
            c += (d[_var[743]](_var[1501])) ? f[_var[1509]] : f[_var[1510]];
            c += f[_var[1511]]
        } else {
            c += (d[_var[743]](_var[1080])) ? f[_var[1512]] : f[_var[1513]];
            c += (d[_var[743]](_var[1504])) ? f[_var[1507]] : f[_var[1508]];
            c += (d[_var[743]](_var[1501])) ? f[_var[1509]] : f[_var[1510]]
        }
        c + _var[1485] + c + _var[655];
        b(a[_var[1479]][_var[1498]])[_var[29]](c)[_var[663]]({
            left: (g[_var[165]]) + _var[969],
            top: (g[_var[166]]) + _var[969]
        })[_var[1020]]();
        g[_var[810]]()
    };
    a[_var[1514]] = function(d, c) {
        b(c)[_var[178]]()[_var[692]](_var[721]);
        b(_var[1515])[_var[658]]()
    };
    GuiForm = (function() {
        function c() {
            this[_var[1516]]()
        }
        c[_var[154]][_var[1516]] = function() {
            if (guiBuilder[_var[1481]] === null && guiform[_var[195]] !== _var[44]) {
                location[_var[859]] = location[_var[859]][_var[48]](_var[1517])[0]
            }
            b(_var[645])[_var[29]](_var[44]);
            b(_var[645])[_var[706]]();
            a[_var[1477]]();
            a[_var[1493]]();
            b(_var[191])[_var[19]](a[_var[1479]][_var[1498]]);
            b(_var[191])[_var[19]](_var[1518]);
            this[_var[1519]]();
            b(_var[1520])[_var[1478]]({
                title: a[_var[653]]
            });
            b(_var[645])[_var[799]](800)
        };
        c[_var[154]][_var[1481]] = function(f) {
            var g = f[_var[38]](_var[1521], _var[44]);
            var i = _var[1522] + String(Math[_var[1227]]())[_var[1226]](2, 6);
            var j = _var[1334] + String(Math[_var[1227]]())[_var[1226]](2, 8);
            var h = (a[_var[1523]] == _var[1524]) ? _var[912] : _var[44];
            if (a[_var[1525]] == false) {
                var e = b(_var[708]);
                var d = b(_var[1526]);
                (e[_var[88]]()) ? e[_var[797]](d): b(_var[1527])[_var[19]](d);
                d[_var[663]]({
                    opacity: _var[1529]
                })[_var[692]](_var[1528])[_var[722]](_var[745])[_var[192]]({
                    opacity: 1
                }, 1300, function() {
                    b(this)[_var[722]](_var[1136])
                })
            } else {
                var d = b(_var[668])[_var[23]](_var[1530])
            }
            d[_var[29]](a[_var[1531]][g][0])[_var[692]](f[_var[38]](_var[1521], _var[1157]) + _var[1532])[_var[28]](_var[772], i)[_var[28]](_var[1137], a[_var[1531]][g][1])[_var[28]](_var[195], j)[_var[23]](_var[1138])[_var[28]](_var[27], i + h);
            if (g == _var[1533]) {
                b(_var[1535] + i + _var[1536])[_var[28]](_var[684], _var[1534])[_var[676]](_var[1534])
            } else {
                if (g == _var[849]) {
                    b(_var[1535] + i + _var[1536])[_var[849]]()
                } else {
                    if (g == _var[1155]) {
                        d[_var[23]](_var[90])[_var[17]](function() {
                            var k = _var[1384] + String(Math[_var[1227]]())[_var[1226]](2, 8);
                            b(this)[_var[28]](_var[195], k);
                            b(this)[_var[1538]]()[_var[28]](_var[1537], k)
                        });
                        b(_var[674] + j)[_var[23]](_var[864])[_var[866]]()
                    } else {
                        if (g == _var[1153]) {
                            b(_var[1535] + i + _var[1536])[_var[28]](_var[27], _var[1153])
                        }
                    }
                }
            }
        };
        c[_var[154]][_var[1519]] = function() {
            var d = this;
            var f = a[_var[1480]];
            var g = a[_var[1539]];
            b(_var[1520])[_var[1117]]({
                heightStyle: _var[1116]
            })[_var[1540]]();
            b(_var[1412])[_var[155]]({
                appendTo: _var[191],
                helper: _var[671],
                containment: _var[1541],
                connectToSortable: _var[1542],
                revert: _var[1543],
                addClasses: _var[1543],
                delay: 50,
                scroll: true,
                scrollSensitivity: 10,
                scrollSpeed: 10,
                zIndex: 2000,
                start: function(j, i) {
                    b(_var[1544])[_var[658]]();
                    b(_var[1135])[_var[1020]]();
                    b(_var[707])[_var[706]]();
                    a[_var[1525]] = true;
                    a[_var[1545]] = b(this)[_var[28]](_var[195])[_var[38]](_var[1521], _var[44]);
                    a[_var[1523]] = b(this)[_var[28]](_var[195]);
                    b(i[_var[193]])[_var[663]]({
                        display: _var[1546],
                        width: b(_var[1520])[_var[31]]()
                    });
                    b(_var[1549])[_var[183]](_var[882], _var[1547], _var[1548])
                },
                stop: function(j, i) {
                    a[_var[1525]] = false
                }
            });
            b(_var[1549])[_var[1566]]({
                activeClass: _var[1562],
                hoverClass: _var[1563],
                accept: _var[1564],
                zIndex: 2000,
                drop: function(j, i) {
                    i[_var[155]][_var[692]](_var[1565])
                }
            })[_var[183]]({
                revert: true,
                axis: _var[1330],
                forcePlaceholderSize: true,
                forceHelperSize: true,
                opacity: 0.9,
                containment: false,
                scroll: true,
                scrollSensitivity: 5,
                scrollSpeed: 5,
                placeholder: _var[1332],
                tolerance: _var[1333],
                zIndex: 99999,
                out: function(j, i) {
                    b(_var[1412])[_var[155]](_var[1550]);
                    b(_var[1549])[_var[183]](_var[882], _var[1547], _var[1548]);
                    b(_var[1412])[_var[155]](_var[882], _var[1547], _var[1548]);
                    if (a[_var[1525]] == true) {
                        b(i[_var[193]])[_var[663]]({
                            display: _var[1546],
                            width: b(_var[1520])[_var[31]]()
                        })
                    }
                },
                start: function(j, i) {
                    if (a[_var[1525]] == true) {
                        d[_var[1481]](a[_var[1523]])
                    }
                    b(_var[1412])[_var[155]](_var[882], _var[1547], _var[1330]);
                    b(_var[1549])[_var[183]](_var[882], _var[187], true);
                    b(this)[_var[183]](_var[882], _var[168], false);
                    b(_var[1412])[_var[155]](_var[1551]);
                    b(_var[1553])[_var[663]]({
                        height: (a[_var[1525]] ? b(i[_var[1335]])[_var[34]]() : b(i[_var[1335]])[_var[1552]]() + 1.5)
                    });
                    if (i[_var[1335]][_var[743]](_var[1501])) {
                        b(_var[1549])[_var[183]](_var[882], _var[1547], _var[1548]);
                        b(_var[1553])[_var[663]]({
                            "float": _var[171],
                            clear: _var[904],
                            display: _var[1554],
                            width: b(i[_var[193]])[_var[1070]]()
                        })
                    } else {
                        b(_var[1549])[_var[183]](_var[882], _var[1547], _var[1330]);
                        b(_var[1553])[_var[663]]({
                            "float": _var[904],
                            clear: _var[1555],
                            display: _var[1546],
                            width: _var[33]
                        })
                    }
                    if (a[_var[1525]] == true) {
                        b(i[_var[193]])[_var[663]]({
                            width: b(i[_var[193]])[_var[1070]]() - 25
                        });
                        b(i[_var[193]])[_var[663]]({
                            left: b(_var[668])[_var[170]]()[_var[171]] + 10
                        })
                    }
                    if (i[_var[1335]][_var[743]](_var[102])) {
                        b(i[_var[188]])[_var[34]](b(i[_var[188]])[_var[1098]](true) - 22)
                    }
                    if (a[_var[1525]] == false && i[_var[1335]][_var[743]](_var[1501]) == false) {
                        b(_var[668])[_var[31]](b(i[_var[193]])[_var[1070]](true) + 30)
                    }
                },
                stop: function(j, i) {
                    b(_var[668])[_var[23]](_var[1139])[_var[663]]({
                        width: _var[33]
                    });
                    a[_var[1556]] = true;
                    b(_var[1412])[_var[155]](_var[1550]);
                    if (i[_var[1335]][_var[743]](_var[1501])) {
                        b(i[_var[1335]])[_var[663]](_var[1557], _var[1558])
                    }
                },
                beforeStop: function(j, i) {
                    b(_var[1561])[_var[663]](_var[1559], a[_var[1560]]);
                    b(_var[668])[_var[23]](_var[1530])[_var[658]]()
                }
            });
            var e;
            b(_var[668])[_var[1570]]({
                minWidth: a[_var[1567]],
                handles: _var[1568],
                zIndex: 1,
                create: function(j, i) {},
                start: function(j, i) {
                    e = i[_var[88]][_var[31]]
                },
                resize: function(l, j) {
                    var i = b(this)[_var[1570]](_var[882], _var[1569]);
                    b(_var[1571])[_var[663]]({
                        left: l[_var[165]] - 158,
                        top: l[_var[166]] - 45
                    })[_var[1020]]();
                    b(_var[1573])[_var[29]]((j[_var[88]][_var[31]] - 30) + _var[1572]);
                    (e > j[_var[88]][_var[31]]) ? b(_var[1575])[_var[19]](_var[1574]): b(_var[1573])[_var[19]](_var[1576]);
                    e = j[_var[88]][_var[31]];
                    var k = b(_var[191])[0];
                    if (k[_var[1577]] > k[_var[1578]]) {
                        if (b(_var[668])[_var[31]]() < a[_var[1579]]) {
                            b(window)[_var[181]](b(_var[668])[_var[31]]())
                        } else {
                            b(window)[_var[181]](b(window)[_var[181]]())
                        }
                    }
                },
                stop: function(j, i) {
                    b(this)[_var[663]](_var[31], b(this)[_var[31]]());
                    b(_var[1571])[_var[706]]();
                    b(_var[1582])[_var[663]](_var[1580], _var[1581])
                }
            });
            b(_var[1584])[_var[173]](function() {
                b(_var[645])[_var[663]](_var[31], _var[1583])
            });
            b(_var[1495])[_var[663]]({
                "min-height": a[_var[1585]]()
            });
            b(_var[645])[_var[663]](_var[31], _var[33]);
            b(document)[_var[1586]](function() {})[_var[703]](_var[173], _var[1412], function() {
                a[_var[1523]] = this[_var[195]];
                d[_var[1481]](this[_var[195]])
            });
            b(window)[_var[1590]](function() {
                b(_var[668])[_var[663]]({
                    height: b(_var[191])[_var[1552]]() - b(_var[668])[_var[170]]()[_var[172]] - 70
                })
            })[_var[1589]](function(i) {
                var q = b(window);
                var p = b(_var[645]);
                var r = b(_var[656]);
                var o = b(_var[1520]);
                var n = b(_var[661]);
                var m = p[_var[170]]()[_var[172]] - n[_var[1552]]();
                var l = p[_var[170]]()[_var[171]];
                var k = b(_var[1582]);
                (q[_var[180]]() < m) ? r[_var[663]]({
                    top: p[_var[170]]()[_var[172]] - q[_var[180]]()
                })[_var[722]](_var[1588]): r[_var[692]](_var[1588])[_var[663]]({
                    top: p[_var[170]]()[_var[172]] - (p[_var[170]]()[_var[172]] - n[_var[1552]]())
                });
                (q[_var[180]]() < m) ? o[_var[663]]({
                    top: p[_var[170]]()[_var[172]] - q[_var[180]]() + 1
                }): o[_var[663]]({
                    top: n[_var[1552]]() + 1
                });
                var j = 10;
                (q[_var[180]]() < m) ? k[_var[663]]({
                    top: _var[1583]
                }): k[_var[663]](_var[172], q[_var[180]]() - j - p[_var[170]]()[_var[172]] + r[_var[1552]]() - 1);
                (q[_var[181]]() < l) ? o[_var[722]](_var[1588])[_var[663]]({
                    left: p[_var[170]]()[_var[171]] - q[_var[181]]()
                }): o[_var[663]]({
                    left: 0
                });
                (q[_var[181]]() < l) ? r[_var[663]]({
                    left: p[_var[170]]()[_var[171]] - q[_var[181]]()
                }): r[_var[663]]({
                    left: 0
                })
            })[_var[1587]](function(k, i) {
                if (b(k[_var[836]])[0][_var[1158]][_var[48]](_var[47])[0] !== _var[1151]) {
                    k[_var[810]]();
                    var j = b(window)[_var[180]]();
                    b(window)[_var[180]](j - (i * 30))
                }
            });
            var h = 0;
            setInterval(function(m) {
                var l = b(window);
                var k = b(_var[656]);
                var j = b(_var[645]);
                var i = j[_var[170]]()[_var[171]];
                b(_var[1591])[_var[663]](_var[34], _var[33]);
                b(_var[668])[_var[663]]({
                    height: b(_var[191])[_var[1552]]() - b(_var[668])[_var[170]]()[_var[172]] - 70
                });
                b(_var[1128])[_var[663]](_var[31], screen[_var[31]] - (b(_var[1520])[_var[31]]() + b(_var[662])[_var[31]]() + 48));
                b(_var[664])[_var[663]](_var[660], screen[_var[31]] - (b(_var[662])[_var[31]]() + 50));
                (b(_var[1232])[_var[88]]() > 1) ? b(_var[1592])[_var[692]](_var[703]): b(_var[1592])[_var[722]](_var[703]);
                delete(a)
            }, 100);
            b(document)[_var[173]](function(i) {
                a[_var[6]] = b(i[_var[836]])[0][_var[709]][_var[68]]()
            })[_var[738]](function(l) {
                var i = l[_var[704]] || l[_var[705]] || 0;
                var j = document[_var[710]][_var[709]][_var[68]]() || a[_var[6]];
                if (l[_var[718]]) {
                    var k = b(_var[668])[_var[31]]();
                    if (i == 37) {
                        k--;
                        b(_var[668])[_var[663]](_var[31], k)
                    } else {
                        if (i == 39) {
                            k++;
                            b(_var[668])[_var[663]](_var[31], k)
                        }
                    }
                }
                if ((i == 38 || i == 40) && j !== _var[711]) {
                    return false
                }
            });
            b(_var[1148])[_var[703]](_var[739], _var[740], function(i) {
                b(_var[741])[_var[722]](_var[721]);
                b(this)[_var[692]](_var[721])
            });
            b(a[_var[1480]][_var[1594]][_var[1500]])[_var[155]](_var[882], _var[1593], true);
            b(_var[1596])[_var[173]](function(i) {
                b(_var[1595])[_var[663]](_var[172], _var[33])[_var[722]](_var[1588])
            });
            b(_var[191])[_var[1598]](_var[1597]);
            b(_var[1148])[_var[703]](_var[1597], _var[1150], function(i) {
                if (b(this)[_var[743]](_var[742])) {
                    b(document)[_var[1598]](_var[1597])
                } else {
                    a[_var[1498]](i)
                }
            });
            b(_var[1541])[_var[739]](function(i) {
                b(a[_var[1480]][_var[1498]][_var[1500]])[_var[706]]()
            });
            b(a[_var[1480]][_var[1498]][_var[1500]])[_var[173]](function(i) {
                b(a[_var[1480]][_var[1498]][_var[1500]])[_var[706]]()
            });
            b(_var[707])[_var[703]](_var[173], _var[1599], function(j) {
                var i = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(a[_var[1480]][_var[721]][_var[1500]]);
                i[_var[663]](_var[1557], _var[1600]);
                i[_var[23]](_var[762])[_var[663]](_var[31], _var[44]);
                i[_var[722]](_var[1601])[_var[692]](_var[1080]);
                b(_var[1082])[_var[849]](_var[882], _var[1081], true);
                b(_var[1082])[_var[701]](_var[44])
            });
            b(_var[707])[_var[703]](_var[173], _var[1602], function(j) {
                var i = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(a[_var[1480]][_var[721]][_var[1500]]);
                if (i[_var[743]](_var[1565]) == false) {
                    i[_var[663]](_var[1557], _var[44])
                }
                i[_var[722]](_var[1603])[_var[692]](_var[1601]);
                b(_var[1082])[_var[849]](_var[882], _var[1081], false);
                b(_var[1082])[_var[701]](i[_var[23]](_var[762])[_var[31]]())
            });
            b(_var[707])[_var[703]](_var[173], _var[1604], function(j) {
                var i = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(a[_var[1480]][_var[721]][_var[1500]]);
                i[_var[663]](_var[1557], _var[1600]);
                i[_var[722]](_var[1501])[_var[692]](_var[1565])
            });
            b(_var[707])[_var[703]](_var[173], _var[1605], function(j) {
                var i = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(a[_var[1480]][_var[721]][_var[1500]]);
                i[_var[663]](_var[1557], _var[1600]);
                i[_var[722]](_var[1565])[_var[692]](_var[1501])
            });
            b(_var[707])[_var[703]](_var[173], _var[1606], function(j) {
                var i = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(a[_var[1480]][_var[721]][_var[1500]]);
                i[_var[692]](_var[1504])
            });
            b(_var[707])[_var[703]](_var[173], _var[1607], function(j) {
                var i = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(a[_var[1480]][_var[721]][_var[1500]]);
                i[_var[722]](_var[1504])
            });
            b(_var[707])[_var[703]](_var[173], _var[915], function(j) {
                var i = (b(_var[708])[_var[743]](_var[102])) ? b(_var[758]) : b(a[_var[1480]][_var[721]][_var[1500]]);
                if (i[_var[743]](_var[1080]) || (i[_var[743]](_var[1080]) && i[_var[743]](_var[1601]))) {
                    b(_var[1608])[_var[28]](_var[1081], _var[1081]);
                    b(_var[1608])[_var[701]](_var[44])
                } else {
                    b(_var[1608])[_var[913]](_var[1081]);
                    b(_var[1608])[_var[701]](i[_var[23]](_var[762])[_var[31]]())
                }
            });
            b(_var[707])[_var[703]](_var[173], _var[1609], function(j) {
                var i = b(_var[708]);
                i[_var[663]](_var[1557], _var[1600]);
                i[_var[722]](_var[1501])[_var[692]](_var[1565])
            });
            b(_var[707])[_var[703]](_var[173], _var[1610], function(j) {
                var i = b(_var[708]);
                i[_var[663]](_var[1557], _var[1600]);
                i[_var[722]](_var[1565])[_var[692]](_var[1501])
            });
            b(_var[707])[_var[703]](_var[173], _var[1611], function(j) {
                var i = b(_var[708]);
                i[_var[692]](_var[1504])
            });
            b(_var[707])[_var[703]](_var[173], _var[1612], function(j) {
                var i = b(_var[708]);
                i[_var[722]](_var[1504])
            });
            b(_var[707])[_var[703]](_var[173], _var[1613], function(i) {
                b(_var[1403])[_var[1197]](_var[173])
            })
        };
        return c
    })();
    new GuiForm()
})[_var[0]](this);