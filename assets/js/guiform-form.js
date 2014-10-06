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
 

 
var xhr = {};
var xhr_name = new Array();
var xhr_state = {};
var xhrData = {};
var xhrFiles = {};

(function() {
	
	var $ = jQuery;
	
	if(!Object.keys){
		Object.keys = function(obj){
		  return $.map(obj, function(v, k){
		    return k;
		  });
		};
	}
	
	//Remove class using regular expression
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
	
	$.fn.htmlSpecialCharsDecode = function(string, quote_style) {
  //       discuss at: http://phpjs.org/functions/htmlspecialchars_decode/
  //      original by: Mirek Slugen
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      bugfixed by: Mateusz "loonquawl" Zalega
  //      bugfixed by: Onno Marsman
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  //         input by: ReverseSyntax
  //         input by: Slawomir Kaniecki
  //         input by: Scott Cariss
  //         input by: Francois
  //         input by: Ratheous
  //         input by: Mailfaker (http://www.weedem.fr/)
  //       revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //        example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
  //        returns 1: '<p>this -> &quot;</p>'
  //        example 2: htmlspecialchars_decode("&amp;quot;");
  //        returns 2: '&quot;'

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString()
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}

	
	//Check class using regular expression
	$.fn.hasClassRegEx = function(regex){
    var classes = $(this).attr('class');
    if(!classes || !regex) return false;
    classes = classes.split(' ');
    for(var i=0, len=classes.length; i<len; i++)
      if(classes[i].match(regex)) return true;
    return false;
  };
  
  //Check attribute
	$.fn.hasAttr = function(attr){
    if(this.attr){
    	var _attr = this.attr(attr);
    }else{
    	var _attr = this.getAttribute(attr);
    }
    return (typeof _attr !== "undefined" && _attr !== false && _attr !== null);      
	};
  
  //File size convertion
  $.bytesToSize = function(bytes, unit) {
		unit = unit || true;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    unit = (unit) ? ' ' + sizes[i] : '';
    return Math.round(bytes / Math.pow(1024, i), 2) + unit;
	}
	
	//Bytes convertion
  $.bytesSize = function(size) {
    return parseInt(Math.pow(1024, 2) * size);
	}
	
	$.stripslashes = function(str){
	  return (str + '').replace(/\\(.?)/g, function (s, n1) {
	    switch (n1) {
	    case '\\':
	      return '\\';
	    case '0':
	      return '\u0000';
	    case '':
	      return '';
	    default:
	      return n1;
	    }
	  });
	}
	
	$.time = function(type){
		var time = new Date();
		return Date.parse();
	}
	//http://benalman.com/projects/jquery-replacetext-plugin/
	$.fn.replaceText = function( search, replace, text_only ) {
    return this.each(function(){
      var node = this.firstChild,
        val,
        new_val,
        
        // Elements to be removed at the end.
        remove = [];
      
      // Only continue if firstChild exists.
      if ( node ) {
        
        // Loop over all childNodes.
        do {
          
          // Only process text nodes.
          if ( node.nodeType === 3 ) {
            
            // The original node value.
            val = node.nodeValue;
            
            // The new value.
            new_val = val.replace( search, replace );
            
            // Only replace text if the new value is actually different!
            if ( new_val !== val ) {
              
              if ( !text_only && /</.test( new_val ) ) {
                // The new value contains HTML, set it in a slower but far more
                // robust way.
                $(node).before( new_val );
                
                // Don't remove the node yet, or the loop will lose its place.
                remove.push( node );
              } else {
                // The new value contains no HTML, so it can be set in this
                // very fast, simple way.
                node.nodeValue = new_val;
              }
            }
          }
          
        } while ( node = node.nextSibling );
      }
      
      // Time to remove those elements!
      remove.length && $(remove).remove();
    });
  }; 
  
	$.fn.replaceTag = function (newTagObj) {
		this.replaceWith(function () {
		    return $('<'+newTagObj+'/>', {
		        name: $(this).attr('name'),
		        html: $(this).html()
		    });
		});
	}

}).call(this);

(function( $, undefined ) {
	
	$.widget("GuiForm.guiform", {
		
		options : {
			submitText : "",
			loadText : ""
		},
		
		XMLHttpFactories: [
	    function () {return new XMLHttpRequest()},
	    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
		],

		createXMLHTTPObject: function(){
			var method = this;
	    var xmlhttp = false;
	    for(var i = 0; i < method.XMLHttpFactories.length; i++){
	        try{xmlhttp = method.XMLHttpFactories[i]();}
	        catch(e){continue;}
	        break;
	    }
	    return xmlhttp;
		},
		
		//Reset file input
		reset_file: function(file){
			var form = file.parent()
	    $('input', form).wrap('<form>').parent('form').trigger('reset');
	    $('input', form).attr('type', 'file').unwrap();
		},
	
		_create: function(event){
			var form = this.element;
			var method = this;
			$doc = $(document);
			
			this.options.submitText = $('button[type="submit"]', form).html() || "Submit";
			this.options.loadText = $('button[type="submit"]', form).attr('data-loader') || "Loading";
			$.mask.definitions['#'] = "[0-9]";
			$.mask.definitions['@'] = "[a-zA-Z]";
			$.mask.definitions['*'] = "[a-zA-Z0-9]";
			$.mask.definitions['~']='[+-]';
			
			$('.f_submit button[name=reset]').click( function(){
				
				$(this).parents('.page-content').hide('slide', {direction: "left"}, 400, function(){
					
					$('.page-content.page-1').show('highlight');
					
				});
			});
			
			if($('.button').size() > 0)	$('.button').buttonset();
			
			$('.ui-spinner').each( function(){
				var max = $(this).attr('data-max');
				var min =  $(this).attr('data-min');
				$(this).spinner({ max: max, min: min });
			})
			
			$doc.on('keydown', '.ui-spinner-input', function(event){
				var key = event.charCode || event.keyCode || 0; 
				if(event.shiftKey == true) return false;
				return (key == 13 || key == 8 || key == 9 || key == 46 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)); 				
				event.preventDefault();
			}).on("cut copy paste", '.ui-spinner-input', function(event) {
		    event.preventDefault();
		  });
			
			$('.f_phone input').each( function(){
				$(this).mask($(this).attr('data-mask'))	
			});
			
	    $('button[type="reset"]', form).click(function(event){
				method.reset();
			})
			
			$('.ui-button-text').each( function(){
				var title = $('[data-icon]', this).attr("title");
				$('[data-icon]', this).removeAttr('title');
				$(this).attr('title', title);
			});
			
			$('.f_password input[type="password"]', form).keyup( function(){
				var parent = $(this).parent();
				$('.guif-password', parent).remove();
				
				if(this.value !== ''){
					
					var html = $('<div class="guif-password">\
													<div class="clearfix"><span>Strength</span><span class="text">Too Short</span></div>\
													<div class="progress"><div class="strength"></div></div>\
												</div>');
					
					var password = this.value;
					
					//initial strength
					var strength = 0;
					
					var label = ['Too Short', 'Too Short', 'Weak', 'Fair', 'Good', 'Strong', 'Strong', 'Strong', 'Strong', 'Strong'];
					var color = ['#555555', '#555555', '#8F2533', '#E8C351', '#7C9AB4', '#0B6C0B', '#0B6C0B', '#0B6C0B', '#0B6C0B'];
					
					//if length is 8 characters or more, increase strength value
					if (password.length > 3) strength += 1
					
					if (password.length > 7) strength += 1
					
					if (password.length > 10) strength += 1
					
					if (password.length > 13) strength += 1
					
					//if password contains both lower and uppercase characters, increase strength value
					if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1
					
					//if it has numbers and characters, increase strength value
					if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1 
					
					//if it has one special character, increase strength value
					if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1
					
					//if it has two special characters, increase strength value
					if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
		
					html.find('.text').css('color', color[(strength - 1)]).text(label[strength]);
					html.find('.strength').css({'background-color' : color[(strength - 1)], 'width' : ((strength - 1) * 20) + "%"});
					
					$(this).parent().append(html)
					
				}
				else{
					$('.guif-password', parent).remove();
				}
			})
				
			method.file_input();
			method.default_value();
			method.replaceText();
			//method.tooltip('.ui-button-text');
			$(window).load(function(){
				$.when($("#guiform-loader").remove())
				.then( function(){
					method.reset();
					form.show();
					$('button[type="submit"]', form).removeAttr('disabled');
				});
				
			});
			
		},
		
		uiDestroy: function(){
			$('#canvas .button').buttonset('destroy');
			$('#canvas .ui-spinner-input').spinner('destroy');
		},
		
		replaceText: function(){
			var data = $("#sortable *").text().match(/[^{]+(?=\})/g);
			var str = '';
			$(data).each(function(){
				var text = this.split('|')[1] || '';
				var value = (text) ? this.split('|')[0]: this;
				var param1 = value.split('_')[0];
				var param2 = value.split(param1+'_')[1] || false;
				str = param2 ? str.replace("{"+this+"}", guiform[param1][param2] || text) : text;
				$("#canvas *").replaceText("{"+this+"}", $("<div/>").html(str).text());
			});
		},
		
		//Prepare file input
		file_input: function(){
			var method = this;
			var form = $(this.element);
			if(window.FormData !== undefined && window.File && window.FileList){
				method.FileInit();
			}
			else{
				
				$('input[type="file"][multiple="multiple"]').on('change', function(event){
					var id = Math.floor(Math.random() * 90000);
				
					form.append('<input type="hidden" class="guiform-file-'+id+'" name="guiform-upload" value="'+this.name+'">');
					form.append('<input type="hidden" class="guiform-file-'+id+'" name="guiform-item" value="'+$(this).parents('.item').attr('id')+'">');
					form.append('<input type="hidden" class="guiform-file-'+id+'" name="guiform-file" value="'+id+'">');
					
					var item = $(this).parents('.item');
					
					var html = '<div id="file-'+id+'" class="gui-file selected" title="Uploading file.">\
												<div class="gui-file-bar upload"></div>\
												<div class="gui-file-wrap clearfix">\
													<span class="gui-file-name">Loading</span>\
													<span class="gui-file-size"><img src="'+guiform.images+'/fb-loader.gif" /></span>\
													<span class="gui-file-remove cancel" title="cancel"><span data-icon="&#xe00d;"></span></span>\
												</div>\
											</div>';
											
					$('.gui-files', item).prepend(html)
					
					$('.gui-file.selected', form)
					.addClass('restored-item')
					.animate({opacity:1},1300, function(){
						$(this).removeClass('restored-item, selected');
					})
					
					$('button[type="submit"]').trigger('click')
				})
			}
			
			$(document).on('click', '.gui-file-remove', function(event){
	    	var id = $(this).parents('.gui-file').attr('id').split('-')[1];
	    	var form = $(this).parents('.item').find('input').attr('name').split('[')[0];
	    	var file = $(this).parents('.gui-file');
	    	method.FileRemove(form, id);
	    	
				file.addClass('removed-item').slideUp(800, function(){
					$(this).remove()
				})
				
	    })
		},
		
		//Prepare default value
		default_value: function(){
			$('[data-default]', this.element).each( function(){
				var str = $(this).attr('data-default');
				$(this).removeAttr('data-default');
				var data = str.match(/[^{]+(?=\})/g);
				
				$(data).each(function(){
					var text = this.split('|')[1] || '';
					var value = (text !== '') ? this.split('|')[0] : this;
					var param1 = value.split('_')[0];
					var param2 = value.split(param1+'_')[1] || false;
					str = param2 ? str.replace("{"+this+"}", guiform[param1][param2] || text) : text;
				});
				
				$(this).val($("<div/>").html(str).text());
			});
		},
		
		//Remove file in xhr object
		FileRemove: function(formName, id){
			var options = this.options;
			var method = this;
			var form = this.element;
			
			if(xhrData[id] === undefined || xhrData[id].file === undefined){
				var file = xhrData[id];
				delete xhrData[id];
			}
			else{
				var file = xhrData[id].file;
		    delete xhrData[id];
		    delete xhr[id];
			}
			
			if(xhr[id] !== undefined) xhr[id].abort();
			
    	var data = {
				'action' : 'guiform-file-unlink',
				'nonce'  : guiform.nonce, 
				'file'   : file
			};
			
			if($(".gui-file-bar.upload").size() < 1){
  			$('button[type="submit"]', parent).html(options.submitText).removeClass('disabled');
  		}
			
    	$.ajax({
    		url: guiform.ajax_url,
				data: data,
				dataType: 'html',
				cache: false,
				async: true,
				type: 'POST'
    	})
    	
		},
		
		//Reset form
		reset: function(){
			var form = this.element;
			var method = this;
			
			if(!$.browser.chrome && !$.browser.safari){
				$('input[type="file"]').each(function(){
					$(this).attr('type', 'text').attr('type', 'file');
				})
			}
			
			$('input[type="password"]').val('');
			
			$('.guif-password').remove();
		
			$('.gui-files', form).html('');
			
			method.remove_error();
			
			$.each(xhrData, function(){
					var data = {
						'action' : 'guiform_unlink', 
						'nonce'  : guiform.nonce, 
						'file'  : this.file
					};
		    	
		    	$.ajax({
		    		url: guiform.ajax_url,
						data: data,
						dataType: 'html',
						cache: false,
						async: true,
						type: 'POST'
		    	})
			})
			
			$.each(xhr, function(){
				this.abort();
			})
			
			$('button[type="submit"]', form).html(this.options.submitText).removeClass('disabled');
			
			
			
			
			
			xhr = {}; //unset
   		xhr_name = {}; //unset
			xhr_state = {}; //unset
			xhrData = {};
		},
		
		//Initialize file before sending
		FileInit: function(){
			var method = this;
			var options = this.options;
			var parent = this.element;
			
		  $('body').on('dragover', function (event) {
	  		event.preventDefault();
        event.stopPropagation();
        $('.guif-dropzone').addClass('drop').find('span').html("Drop here!")
	    }).on('dragleave', function (event) {
	    	$('.guif-dropzone').removeClass('drop').find('span').html("Add file")
	    })
	
	    $('body').bind('drop', function (event) {
	    	$('.guif-dropzone').removeClass('drop').find('span').html("Add file")

	    	if($(event.target).attr('type') !== 'file'){
	    		event.preventDefault();
	        event.stopPropagation();
	    	}
	    	else{
	    		$(event.target).removeClass('error').parent().find('.error-message').animate({'opacity':0}, 'slow', function(){$(this).remove()})
		  		$(event.target).parent().removeClass('error').parent().find('.error-message').animate({'opacity':0}, 'slow', function(){$(this).remove()})
	    	}
	    })
			
			$('.guif-dropzone input[type="file"]').on('change', function(event){
				
				
				var files = $(this).prop("files")
				
				var formName = this.name.split('[')[0];
				var form = $(this).parents('.item');
				var types = $(this).attr('file-accept').toLowerCase().replace(/\s/g, '').split(",");
				var max_size = $.bytesSize($(this).attr('file-maxsize'));
				
				$('button[type="submit"]', parent).html(options.loadText).addClass('disabled');
		
				$.each(files, function(){
					
					var file_name = this.name;
				  var id = Math.floor(Math.random() * 90000);
				  var type = file_name.substr((~-this.name.lastIndexOf(".") >>> 0) + 2).toLowerCase();
				  var file_size = this.size;
				  var error = 0;
				  var message = '';
					var name = guiform.today +'-'+ Math.random().toString(36).slice(3) +'.'+ type;
				  
				  if($.inArray(type, types) <= -1){
						html = '<span class="gui-file-error">Failed</span>';
						message += 'Upload FAILED, invalid file type !'
						error++;
					}
					else if(file_size > max_size){
						html = '<span class="gui-file-error">Failed</span>';
						message += 'Upload FAILED, file is too large !'
						error++;
					}
					else{
						html = '<span class="gui-file-size"><img src="'+guiform.images+'/fb-loader.gif" /></span>';
					}
				  
					var html = '<div id="file-'+id+'" class="gui-file selected" title="'+message+'">\
												<div class="gui-file-bar upload"></div>\
												<div class="gui-file-wrap clearfix">\
													<span class="gui-file-name">'+file_name+'</span>\
													'+html+'\
													<span class="gui-file-remove cancel" title="cancel"><span data-icon="&#xe00d;"></span></span>\
												</div>\
											</div>';
											
					$('.gui-files', form).prepend(html)
					
					$('.gui-file.selected', form)
					.addClass('restored-item')
					.animate({opacity:1},1300, function(){
						$(this).removeClass('restored-item, selected');
					})
				  
				  if(error == 0){
				  	
				  	var bar = $('#file-'+id).find('.gui-file-bar');
		        xhr[id] = method.createXMLHTTPObject();
		        xhr[id].open('POST', guiform.ajax_url+"?nonce="+ guiform.nonce, true);
	        	xhr[id].upload.onprogress = function(e){
	        		var width = parseInt(e.loaded / e.total * 100);
							bar.css('width', width+'%');
	        	}
		        
		        xhr[id].onreadystatechange = function(event) {
		        	
		        	if(xhr[id].readyState == 4){
		        		
		        		data = $.parseJSON(this.responseText);
		        		alert(this.responseText);
								if(data.status == "error"){
									$('#file-'+ data.error.id).attr('title', data.error.message)
									$('#file-'+ data.error.id).find('.gui-file-bar').remove()
									$('#file-'+ data.error.id).find('.gui-file-size').html('Failed')
									$('#file-'+ data.error.id).find('.gui-file-remove').removeClass('cancel').attr('title','remove');
									$(".guiform-file-"+ data.error.id).remove();
								}
								else{
									$('#file-'+ data.info.id).find('.gui-file-bar').removeClass('upload').addClass('success')
									$('#file-'+ data.info.id).attr('title', '')
									$('#file-'+ data.info.id).find('.gui-file-name').html(data.info.name)
									$('#file-'+ data.info.id).find('.gui-file-size').html($.bytesToSize(data.info.size))
									$('#file-'+ data.info.id).find('.gui-file-remove').removeClass('cancel').attr('title','remove');
									$(".guiform-file-"+ data.info.id).remove();
									xhrData[id] = data.info;
								}	
								
								if($(".gui-file-bar.upload").size() < 1){
		        			$('button[type="submit"]', parent).html(options.submitText).removeClass('disabled');
		        		}			
		        	}
		        };
		        
		        var formData = new FormData(); 
		        formData.append('file', this); 
		        formData.append('action', "guiform-xhr-upload"); 
		        formData.append('form', guiform.form_id);
		        formData.append('item', form.attr('id'));
		        formData.append('field', formName);
		        formData.append('name', name);
		        formData.append('id', id);
		        xhr[id].send(formData);
						xhrData[id] = {file : name, field : formName, name : file_name, size : file_size, type : type};
		      }
		      else{
		      	$("#file-"+ id).find(".gui-file-bar").remove();
		      	if($(".gui-file-bar.upload").size() < 1){
        			$('button[type="submit"]', parent).html(options.submitText).removeClass('disabled');
        		}
		      }
		      delete this;
				})
				
		  });
		},
		
		tooltip: function(element){
			//Create tooltip
			$(element).tooltip({
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
		
		// Remove error message
		remove_error: function(){
			var form = this.element;
			$('.error, .error-message', form).each(function(){
				//($(this).hasClass('error-message')) ? $(this).remove() : $(this).removeClass('error');	
				$(this).remove();
			})
		},
		
		_init: function(){
			var method = this;
			var form = this.element;
			
			form.submit(function(event){
				if($(".gui-file-bar.upload").size() > 0){
					alert('Uploading file!');
					method.submit(event);
				}
				else if($(".gui-file-bar.upload").size() < 1 && $('button[type="submit"]', form).hasClass('disabled')){
					event.stopPropagation();
					event.preventDefault();
					alert('Please wait while we process your form.');
				}
				else{
					method.remove_error();
					method.submit(event);
				}
			})
			
			$('input, select, textarea', form).focus( function(){
		  	$(this).parents('.wrap').find('.error-message').animate({'opacity':0}, 'slow', function(){$(this).remove()})
		  });
			
		},
		
		// Submit form
		submit: function(event){
			
			var form = this.element;
			var method = this;
			var options = this.options;
			var formObj = $(form);
			
			$('button[type="submit"]', form).html(options.loadText).addClass('disabled');
		  
			var iframeId = 'unique-' + (new Date().getTime());		
			var iframe = $('<iframe style="width: 100%; height : 300px;" src="javascript:false;" name="'+iframeId+'" />');
		  iframe.hide();
			
			if(Object.keys(xhrData).length && $("input[class^='guiform-file-']").size() == 0){
				formObj.append('<textarea style="display:none;" name="guiform-xhrData">'+JSON.stringify(xhrData)+'</textarea>');
			}
			
			formObj.attr('target', iframeId);
			formObj.attr('enctype', 'multipart/form-data');
			formObj.attr('Content-Type', 'application/octet-stream');
			iframe.appendTo('body');
			
			iframe.load(function(e){
				$("[name='guiform-xhrData']").remove();
				var doc = method.getDoc(iframe[0]);					
				var docRoot = doc.body ? doc.body : doc.documentElement;
				
				var data = docRoot.innerHTML;
				
				if(data.indexOf( "Fatal error" ) !== -1){
					alert("Fatal error: "+ data.split('Fatal error:')[1].split(" in ")[0]);
					$('button[type="submit"]', form).html(options.submitText).removeClass('disabled');
				}
				else if($("input[class^='guiform-file-']").size() > 0){
					
					data = $.parseJSON(data);
					
					if(data.status == "error"){
						$('#file-'+ data.error.id).attr('title', data.error.message)
						$('#file-'+ data.error.id).find('.gui-file-name').html(data.error.file)
						$('#file-'+ data.error.id).find('.gui-file-size').html('Failed')
						$('#file-'+ data.error.id).find('.gui-file-remove').removeClass('cancel').attr('title','remove');
						$('#file-'+ data.error.id).find('.gui-file-bar').remove();
						$(".guiform-file-"+ data.error.id).remove();
					}
					else{
						$('#file-'+ data.info.id).find('.gui-file-bar').removeClass('upload').addClass('success')
						$('#file-'+ data.info.id).attr('title', '')
						$('#file-'+ data.info.id).find('.gui-file-name').html(data.info.name)
						$('#file-'+ data.info.id).find('.gui-file-size').html($.bytesToSize(data.info.size))
						$('#file-'+ data.info.id).find('.gui-file-remove').removeClass('cancel').attr('title','remove');
						$(".guiform-file-"+ data.info.id).remove();
						xhrData[data.info.id] = data.info;
					}			
					
					$('button[type="submit"]', form).html(options.submitText).removeClass('disabled');
					$("iframe[name='"+iframeId+"']").remove();
				}
				else{
					var data = ($('pre', docRoot).html() === undefined) ?  $.parseJSON(data) : $.parseJSON($('pre', docRoot).html());
					
					$("iframe[name='"+iframeId+"']").remove();
					if(data.status == "fail"){
						$('button[type="submit"]', form).html(options.submitText).removeClass('disabled');
					}
					else if(data.status == "error"){
						if(data.message !== undefined){
							alert(data.message)
						}
						else{
							
							$.each(data.error, function(key, value){
								var wrap = $("#"+ key).find('.wrap');
								var width = wrap.width();
								wrap.append('<div class="error-message"><span class="arrow top left"></span><p>'+value+'</p></div>');
								$('.error-message', wrap).css('width', width);
								if($('.page-content').size()) $('.error-message').hide();
							});
							
							if($('.page-content').size()){
								if($('button[name=submit]').parents('.page-content').attr('class') != $('.error-message:first').parents('.page-content').attr('class')){
									$('button[name=submit]').parents('.page-content').hide('slide', {direction: "left"}, 400, function(){
										$('.error-message:first').parents('.page-content').show('highlight');
										$('.error-message').show();
									});
								}
								else{
									$('.error-message').show();
								}
							}
							
							if($(".ui-accordion-content").size()){
								$(".ui-accordion-content").each( function(){
									if($('.error-message', this).size()){
										var id = this.id.replace('panel', 'header');
										var error = ($('.error-message', this).size() > 1) ? 'Errors were found!' : 'Error were found!';
										$("#"+ id).append("<span class='error'>"+error+"</span>");
										$("#"+ id).find('.folding-text').hide();
									}	
								});
							}
							
						}
						$('button[type="submit"]', form).html(options.submitText).removeClass('disabled');
					}
					else if(Object.keys(data).length == 0 || data.confirmation.type == "default"){
						$("body").css('padding','30px').html("<p style=\"text-align: center;\"><span style=\"font-size: 16pt;\"><strong>Thank You!</strong></span></p> <p style=\"text-align: center;\">We will get in touch with you shortly.</p>")	
					}
					else if(data.confirmation.type == "redirect"){
						window.top.location.href = decodeURIComponent(data.confirmation.url);
					}
					else if(data.confirmation.type == "custom"){
						var html = decodeURIComponent(data.confirmation.custom.replace(/\+/g, ' '));
						$("body").css('padding','30px').html(html.replace(/\\/g, ''));
					}
				}
			})
		},
		
		getDoc: function(frame) {
			var doc = null;
			
			try {
				if (frame.contentWindow) {
					doc = frame.contentWindow.document;
				}
			}catch(err){}
			
			if(doc) return doc;
			
			try{
				doc = frame.contentDocument ? frame.contentDocument : frame.document;
			}catch(err) {
				doc = frame.document;
			}
			
			return doc;
		}
	});
	
	/*
	* Lets not redefine GuiForm, Prevent "Uncaught RangeError: Maximum call stack size exceeded"
	*/
	$.GuiForm.guiform = $.GuiForm.guiform || {};
	
	$("form[name='guiform']").guiform();
	
	//if($("#guiform-loader").size()) $("form").show();
	
}(jQuery));