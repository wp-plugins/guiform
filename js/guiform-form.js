/*!
 * GuiForm 1.0
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
	
	$ = jQuery;
	
	//Get current cursor positioning
	$.fn.getCursorPosition = function() {
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
	
	//Check userAgent
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
	
	//Check element if existing
	$.fn.exists = function(){
		return this.length > 0 ? this : false;
	}
	
	//Serialize form before sending for POST validation instead of javascript.
	//Using server validation is more secure
	$.fn.serializeForm = function() {
	
	  if ( this.length < 1) {
	    return false;
	  }
	  
	  var data = {};
	  var lookup = data; //current reference of data
	  var selector = ':input[type!="reset"]';
	  var parse = function() {
	
	    // Ignore disabled elements
	    if (this.disabled) {
	      return;
	    }
	
	    // data[a][b] becomes [ data, a, b ]
	    var named = this.name.replace(/\[([^\]]+)?\]/g, ',$1').split(',');
	    var cap = named.length - 1;
	    var $el = $( this );
	    
	    // Ensure that only elements with valid `name` properties will be serialized
	    if ( named[ 0 ] ) {
	      for ( var i = 0; i < cap; i++ ) {
	        // move down the tree - create objects or array if necessary
	        lookup = lookup[ named[i] ] = lookup[ named[i] ] ||
	          ( (named[ i + 1 ] === "" || named[ i + 1 ] === '0') ? [] : {} );
	      }
		
		
	      // at the end, push or assign the value
	      if ( lookup.length !== undefined ) {
	      	
	        if($el.attr('ty'+'pe') == "fi"+"le" && $el.hasAttr('mult'+'iple')){
	        	var name = $el.attr('name').replace("[]", "");
	        	var x = 0;
	        	var item = {}
	        	$.each(xhrData, function(){
	        		if(this.field == name){
	        			item[x++] = {name : this.name, file : this.file};
	        		}
	        	})
	        	
        		lookup.push('');
        		xhrFiles[name] = item;
	        	
					}
					else{
						
						if($el.is(':checked')){
							lookup.push($el.val());
						}
						else{
							lookup.push('')
						}
					}
	      }else {
	      	if($el.attr('ty'+'pe') == "radio"){
	      		var value = $("input[name='"+named[ cap ]+"']:checked").val();
	      		
	      		lookup[ named[ cap ] ] = (value !== undefined) ? value : '';
	      	}
	      	else{
	      		lookup[ named[ cap ] ] = $el.val();
	      	}
						
	      }
	
	      // assign the reference back to root
	      lookup = data;
	    }
	  };
	
	  // first, check for elements passed into this function
	  this.filter( selector ).each( parse );
	
	  // then parse possible child elements
	  this.find( selector ).each( parse );
	
	  // return data
	  return data;
	};
	
}).call(this);

(function( $, undefined ) {
	
	$.widget("GuiForm.form", {
		
		//Declare options variable
		options: {
			Field : {},
			Condition: {}
		},
		
		//Count the number of file
		file_counter : 0,
		
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
	    $('input', form).unwrap();
		},
	
		_create: function(){
			
			var form = this.element;
			var method = this;
			var options = this.options;
			
			$.mask.definitions['#'] = "[0-9]";
			$.mask.definitions['@'] = "[a-zA-Z]";
			$.mask.definitions['*'] = "[a-zA-Z0-9]";
			$.mask.definitions['~']='[+-]';
			
			if(window.File && window.FileList) method.FileInit();
			
			if($('.switch').size() > 0)	$('.switch').buttonset();
			
			$('.ui-spinner').each( function(){
				var max = $(this).attr('data-max');
				var min =  $(this).attr('data-min');
				$(this).spinner({ max: max, min: min });
			})
			
			$('input[type="file"]').each( function(){						
				if($(this).hasAttr('multiple') && $.browser.version() <= 9 && $.browser.name() == "msie"){
				  var clone = $(this).clone();
				  var wrap = $(this).parents('.wrap');
				  $(this).parent().remove();
				  wrap.html(clone);
				}
			})
			
			$('.f_phone input').each( function(){
				$(this).mask($(this).attr('data-mask'))	
			});
			
			$(document).on('click', '.gui-file-remove', function(){
				var form = $(this).parent().parent();
				var parent = form.parent();
				form.addClass('removed-item').slideUp(800, function(){
					$(this).remove()
					if($('.gui-file', parent).size() == 0) method.reset_file(parent);
				})
			});
			
			$(document).on('keydown', '.ui-spinner-input', function(event){
				var key = event.charCode || event.keyCode || 0; 
				if(event.shiftKey == true) return false;
				return (key == 13 || key == 8 || key == 9 || key == 46 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)); 				
				event.preventDefault();
			}).on("cut copy paste", '.ui-spinner-input', function(event) {
		    event.preventDefault();
		  });
		  
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
	    
	    $(window).on('load', function(event){
	    	method.reset();
	    })
	    
	    $(document).on('click', '.gui-file-remove', function(event){
	    	var id = $(this).parents('.gui-file').attr('id').split('-')[1];
	    	var form = $(this).parents('.item').find('input').attr('name').split('[')[0];
	    	method.FileRemove(form, id);
	    })
	    
	    $('input[type="reset"]', this.element).click(function(event){
				method.reset();
			})
			
		},
		
		//Remove file in xhr object
		FileRemove: function(formName, id){
			var options = this.options;
			var method = this;
			var form = this.element;
			
    	var data = {
				'action' : 'unlink', 
				'file'  : xhrData[id].file
			};
			
    	xhr[id].abort();
      delete xhr[id];
    	delete xhrData[id];
    	
    	$.ajax({
    		url: guif.ajax_url,
				data: data,
				dataType: 'html',
				cache: false,
				async: true,
				type: 'POST',
				success: function(data){
					if(xhr_state[id] == false) method.file_counter--;
    			if(method.file_counter == 0) $('input[type="submit"]', form).val('Submit').removeClass('disabled');
				} 
    	})
    	
		},
		
		//Reset form
		reset: function(){
			var form = this.element;
			var method = this;
			$('.gui-files', form).html('');
			method.remove_error();
			$(form).get(0).reset();
			
			$.each(xhrData, function(){
					var data = {
						'action' : 'unlink', 
						'file'  : this.file
					};
		    	
		    	$.ajax({
		    		url: guif.ajax_url,
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
			
			$('input[type="submit"]', form).val('Submit').removeClass('disabled');
			
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
			var x = 0;
			
			$('.guif-dropzone input[type="file"]').on('change', function(event){
				
				var files = $(this).prop("files")
				var formName = this.name.split('[')[0];
				var form = $(this).parents('.item');
				var types = $(this).attr('file-accept').toLowerCase().replace(/\s/g, '').split(",");
				var max_size = $(this).attr('file-maxsize');
				
				if($(this).prop('multiple') == false && $('.gui-file', form).size() > 0){
					var id = $('.gui-file', form).attr('id').split('-')[1];
					$('.gui-files', form).html('');
					method.FileRemove(formName, id);
				}
				
				$.each(files, function(){
					var id = Math.floor(Math.random() * 90000);
					var file_name = this.name;
					var type = file_name.substr((~-this.name.lastIndexOf(".") >>> 0) + 2).toLowerCase();
					var size = $.bytesToSize(this.size);
					var file_size = this.size;
					var error = 0;
					var html = '';
					var message = '';
					var day = new Date();
					var name = day.getDate() +'-'+ Math.random().toString(36).slice(2) +'.'+ type;
					
					if($.inArray(type, types) > -1){
						html = '<span class="gui-file-size">'+size+'</span>';
					}
					else{
						html = '<span class="gui-file-error">Failed</span>';
						message += 'Upload FAILED, invalid file type !'
						error++;
					}
					
					if(file_size > max_size){
						html = '<span class="gui-file-error">Failed</span>';
						message += 'Upload FAILED, file is too large !'
						error++;
					}
					
					var html = '<div id="file-'+id+'" class="gui-file selected" title="'+message+'">\
												<div class="gui-file-bar"></div>\
												<div class="gui-file-wrap clearfix">\
													<span class="gui-file-name">'+file_name+'</span>\
													'+html+'\
													<span class="gui-file-remove cancel icon-forbidden" title="cancel"></span>\
												</div>\
											</div>';
										
					$('.gui-files', form).prepend(html)
					
					if(error > 0){
						$('#file-'+id).find('.gui-file-remove').removeClass('cancel, icon-forbidden').addClass('icon-fontawesome-webfont').attr('title','remove');
					}
					
					$('.gui-file.selected', form)
					.addClass('restored-item')
					.animate({opacity:1},1300, function(){
						$(this).removeClass('restored-item, selected');
					})
					
					if(error == 0){
						xhr[id] = method.createXMLHTTPObject();
						xhr_state[id] = false;
						method.file_counter++;
						// progress bar
						var bar = $('#file-'+id).find('.gui-file-bar');
						
						$('input[type="submit"]', parent).val('Loading').addClass('disabled');
						
						xhr[id].upload.addEventListener("progress", function(e){
							var width = parseInt(e.loaded / e.total * 100);
							bar.css('width', width+'%');
						}, false);
						
						// file received/failed
						xhr[id].onreadystatechange = function(e) {
							
							if(xhr[id].readyState == 4){
								$('#file-'+id).addClass('file-checked')
								.find('.gui-file-remove')
								.removeClass('cancel, icon-forbidden')
								.addClass('icon-fontawesome-webfont')
								.attr('title','remove');
								
								method.file_counter--;
								xhr_state[id] = true;
								
								if(method.file_counter == 0) $('input[type="submit"]', parent).val('Submit').removeClass('disabled');
								
								if(xhr[id].status == 200){
									bar.css('width', 'auto').addClass('success')
								}
								else{
									bar.attr('title', xhr[id].responseText)
									bar.css('width', 'auto').addClass('error')
								}
							}
						};
						
						// send file
						xhr[id].open("POST", guif.ajax_url, true);
						xhr[id].setRequestHeader("X-Requested-With", "XMLHttpRequest");
						xhr[id].setRequestHeader("X_FILENAME", name);
						xhr[id].setRequestHeader("X_ACTION", 'file-upload');
						xhr[id].setRequestHeader("Content-Type", "application/octet-stream");
						xhr[id].send(this);
						xhrData[id] = {file : name, field : formName, name : file_name};
						
					}
				})
				
				//Create tooltip
				$(".gui-file").tooltip({
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
				
		  });
		},
		
		_init: function(){
			this._events();
		},
		
		// Remove error message
		remove_error: function(){
			var form = this.element;
			$('.error, .error-message', form).each(function(){
				($(this).hasClass('error-message')) ? $(this).remove() : $(this).removeClass('error');	
			})
		},
		
		_events: function(){
			var method = this;
			var form = this.element;
			
			form.submit(function(event){
				if(method.file_counter > 0){
					alert('Please wait while we process your file upload!');
				}
				else if(method.file_counter == 0 && $('input[type="submit"]', form).hasClass('disabled')){
					alert('Please wait while we process your form.');
				}
				else{
					method.remove_error();
					method.submit(event);
				}
				
				if(window.File && window.FileList){
					event.preventDefault();
				}
			})
			
			$('input, select, textarea', form).focus( function(){
		  	$(this).parents('.wrap').find('.error-message').animate({'opacity':0}, 'slow', function(){$(this).remove()})
		  });
			
		},
		
		// Submit form
		submit: function(event){
			
			//event.stopPropagation(); // Stop stuff happening
			//event.preventDefault(); // Totally stop stuff happening
			
			var form = this.element;
			var method = this;
			var formObj = $(form);
			var formURL = formObj.attr("action");
			$('input[type="submit"]', form).val('Loading').addClass('disabled');
			
			if(window.File && window.FileList){
				
				var data = {
					'action' : 'save-entries', 
					'form'   : guif.form_id,
					'files'  : xhrFiles,
					'data'   : $(form).serializeForm()
				};
				
				
				$.ajax({
	    		url: guif.ajax_url,
					data: data,
					dataType: 'html',
					cache: false,
					type: 'POST',
					success: function(data){
						if(data.contains('Fatal error')){
							alert("Fatal error: "+ data.split('Fatal error:')[1].split(" in ")[0])
						}
						else{
							data = JSON.parse(data);
							if(data.status == "fail"){
								alert(data.message)
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
										wrap.find('.error-message').css('width', width);
									})
								}
							}
							else if(data.thank_you.checked == "defualt"){
								$("body").css('padding','30px').html("<p style=\"text-align: center;\"><span style=\"font-size: 16pt;\"><strong>Thank You!</strong></span></p> <p style=\"text-align: center;\">We will get in touch with you shortly.</p>")	
							}
							else if(data.thank_you.checked == "redirect"){
								window.top.location.href = data.thank_you.url;
							}
							else if(data.thank_you.checked == "custom"){
								$("body").css('padding','30px').html(data.thank_you.message.replace(/\\/g, ''));
							}
						}
						
						$('input[type="submit"]', form).val('Submit').removeClass('disabled');
					}
	    	})
			}
			else{
				var  iframeId = 'unique' + (new Date().getTime());		
				var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
				iframe.hide();
				formObj.attr('target',iframeId);
				formObj.attr('enctype','multipart/form-data');
				iframe.appendTo('body');
				iframe.load(function(e){
					var doc = method.getDoc(iframe[0]);					
					var docRoot = doc.body ? doc.body : doc.documentElement;
					var data = docRoot.innerHTML;
					$("body").html('');
				});
			}
		},
		
		//Check browser language
		language: function(){
			return window.navigator.userLanguage || window.navigator.language;
		},
		
		getDoc: function(frame) {
			var doc = null;
			
			try {
				if (frame.contentWindow) {
					doc = frame.contentWindow.document;
				}
			}catch(err){}
			
			if(doc){ 
         return doc;
      }
			
			try{
				doc = frame.contentDocument ? frame.contentDocument : frame.document;
			}catch(err) {
				doc = frame.document;
			}
			
			return doc;
		}
		
	});
	
	$("form").form();
	
}(jQuery));