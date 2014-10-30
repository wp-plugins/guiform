
// +----------------------------------------------------------------------+
// | Copyright 2013 GuiForm (email : info@guiform.com)                      |
// +----------------------------------------------------------------------+
// | This program is free software; you can redistribute it and/or modify |
// | it under the terms of the GNU General Public License, version 2, as  |
// | published by the Free Software Foundation.                           |
// |                                                                      |
// | This program is distributed in the hope that it will be useful,      |
// | but WITHOUT ANY WARRANTY; without even the implied warranty of       |
// | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the        |
// | GNU General Public License for more details.                         |
// |                                                                      |
// | You should have received a copy of the GNU General Public License    |
// | along with this program; if not, write to the Free Software          |
// | Foundation, Inc., 51 Franklin St, Fifth Floor, Boston,               |
// | MA 02110-1301 USA                                                    |
// +----------------------------------------------------------------------+
// | Author: Russell Pabon <russellpabon@guiform.com>                     |
// +----------------------------------------------------------------------+


(function( $, undefined ) {
	
	$.support.placeholder = (function(){
    var i = document.createElement('input');
    return 'placeholder' in i;
	})();
	
	$.getDoc = function(frame) {
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
	};
	
	$.ucFirst = function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	}
	
	$.widget("GuiForm.script", {
		options : {
			submitText : "",
			loadText : "",
			caret : false
		},
		
		_type : null,
				
		_create: function(){
			
			var method = this;
			
			this.action();
			this.event();
			if($("#guiform-manager.forms").size()) this.formsManager();
			if($("#guiform-manager.entry-manager").size()) this.entryManager();
			if($("#guiform-manager.view-entry").size()) this.viewEntry();
			if($("#guiform-manager.mail").size()) this.mailSetup();
			if($("#guiform-manager.form-settings").size()) this.formSettings();
			if($("#guiform-manager.form-notification").size()) this.formNotification();
			if($("#guiform-manager.form-confirmation").size()) this.formConfirmation();
			if($("#guiform-manager.export").size()) this.export();
			if($("#guiform-manager.license").size()) this.license();
			method.switchForm();
			if(!$.support.placeholder) { 
				var active = document.activeElement;
				$(':text').focus(function () {
					if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
						$(this).val('').removeClass('hasPlaceholder');
					}
				}).blur(function () {
					if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
						$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
					}
				});
				$(':text').blur();
				$(active).focus();
				$('form').submit(function () {
					$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
				});
			}
		},
		
		event: function(){
			var trigger_delete = true;
			var $doc = $(document);
			$doc.on('click', '#options-list .add', function(){
				var index = $('#options-list tbody tr').index($(this).parents('tr'));
				var html = '<tr class="hide" style="display: none;">\
											<td style="width: 30%"><input type="text" name="label" value="Text"></td>\
											<td style="width: 30%"><input type="text" name="value" value="value"></td>\
											<td style="width: 5%"><span data-icon="&#xe093;" class="delete"></span></td>\
											<td style="width: 5%"><span data-icon="&#xe004;" class="add"></span></td>\
											<td style="width: 5%"><span data-icon="&#xe08c;" class="move"></span></td>\
										</tr>';
				$('#options-list tbody tr:eq('+index+')').after(html);
				$('#options-list .hide').fadeIn('slow');
			}).on('click', '#options-list .delete', function(){
				if(trigger_delete == true){
					trigger_delete = false;
					if($('#options-list tbody tr').size() < 2) trigger_delete = true;
					if($('#options-list tbody tr').size() > 1){
						$(this).parent().parent().fadeOut('slow', function(){
							$(this).remove();
							trigger_delete = true;
						})
					}
				}
			})
		},
		
		viewEntry: function(){
			var method = this;
			var $doc = $(document);
			
			$('.post-image').magnificPopup({
				delegate: 'a',
				type: 'image',
				closeBtnInside : true,
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title');
					}
				}
			});
			
		},
		
		license: function(){
			$doc = $(document);
			var method = this;
			
			$doc.on('click', ".activate-license", function(){
				
				var _that = this;
				
				method._type = 'activate-license';
				
				$('<div>').guifbox({
					url: ajaxurl,
					data: method.data(this),
					dataType: 'json',
					cache: false,
					type: 'POST',
					success: function(data){
						if(data.success == false){
							$(this).guifbox({title: 'Invalid license key', status: 'error', body: '<p style="padding: 10px;">'+ $.ucFirst(data.error).replace(/_/g, ' ') +'</p>'});
						}
						else if(data.license == "error" || typeof(data) == 'string'){
							var message = data.message ? data.message : data;
							$(this).guifbox({title: 'error', status: 'error', body: '<p style="padding: 10px;">'+ message +'</p>'});
						}
						else if(data.license == "invalid"){
							$(this).guifbox({title: 'Invalid license key', status: 'error', body: '<p style="padding: 10px;">You entered invalid license key.</p>'});
						}						
						else{
							$(_that).parents('tr').find('.activate-license').attr('title', 'Deactivate License').text('Deactivate License').addClass('deactivate-license').removeClass('activate-license');$(_that).parents('tr').find('.activate-license').attr('title', 'Deactivate License').text('Deactivate License').addClass('deactivate-license').removeClass('activate-license');
							$(_that).parents('tr').find('.status').text(data.license);
							$(_that).parents('tr').find('.expiration').text(data.expires);
							var reload = (data.item_name == 'GuiForm+Pro') ? true : false;
							$('<div>').guifbox({reload : reload, title: 'message', status: 'success', body: '<p style="padding: 10px;">License key activated.</p>', location: location.href.replace(/&tab=license/g, '') +"&tab=license"});
						}
					}
				});
			});
			
			$doc.on('click', ".deactivate-license", function(){
				
				var _that = this;
				
				method._type = 'deactivate-license';
				
				$('<div>').guifbox({
					url: ajaxurl,
					data: method.data($(this)),
					dataType: 'json',
					cache: false,
					type: 'POST',
					success: function(data){
						if(data.license == 'failed'){
							$(this).guifbox({title: 'Failed to deactivate.', status: 'error', body: '<p style="padding: 10px;">You entered invalid license key.</p>'});
						}
						else{
							$(_that).parents('tr').find('.expiration').html('');
							$(_that).parents('tr').find('.deactivate-license').attr('title', 'Activate License').text('Activate License').addClass('activate-license').removeClass('deactivate-license');
							$(_that).parents('tr').find('.status').text(data.license);
							var reload = (data.item_name == 'GuiForm+Pro') ? true : false;
							$('<div>').guifbox({reload : reload, title: 'message', status: 'success', body: '<p style="padding: 10px;">License key deactivated.</p>', location: location.href.replace(/&tab=license/g, '') +"&tab=license"});
						
						}
					}
				});
			});
		},
		
		export: function(){
			$doc = $(document);
			var method = this;
			
			$('#accordion').accordion({heightStyle: "content"});
			
			$( "#from" ).datepicker({
				defaultDate: "+1w",
				changeMonth: true,
				changeYear: true,
				onClose: function( selectedDate ) {
					$( "#to" ).datepicker( "option", "minDate", selectedDate );
				}
			});
			
			$( "#to" ).datepicker({
				defaultDate: "+1w",
				changeMonth: true,
				changeYear: true,
				onClose: function( selectedDate ) {
					$( "#from" ).datepicker( "option", "maxDate", selectedDate );
				}
			});
			
			$doc.on('change', "#export-entry select[name='form']", function(){
				if(this.value){
					$('#export-entry .display-fields img').show();
					$("#export-entry .display-fields ul").remove();
					method._type = 'export-entry-fields';
					$.ajax({
						url: ajaxurl,
						data: method.data($(this)),
						dataType: 'html',
						cache: false,
						type: 'POST',
						success:function(html){
							$("#export-entry .display-fields").append(html);
							$("#export-entry .row-button").css('visibility', 'visible');
							$('#export-entry .display-fields img').hide();
						}
					})
				}
				else{
					$("#export-entry .display-fields ul").remove();
					$("#export-entry .row-button").css('visibility', 'hidden');
				}
			});
			
			$doc.on('change', "#export-entry select[name='action']", function(){
				(this.value == 'guiform-export-entry-sql') ? $('#table-field').hide() : $('#table-field').show()
			})
			
			
			$doc.on('submit', "#import-data", function(event){
				
			  var form = $(this);
			  $('img', this).show();
		    var iframeId = 'unique-' + (new Date().getTime());		
				var iframe = $('<iframe style="width: 100%; height : 300px;"  src="javascript:false;" name="'+iframeId+'" />');
			  iframe.hide();
				
				form.attr('target', iframeId);
				form.attr('enctype', 'multipart/form-data');
				form.attr('Content-Type', 'application/octet-stream');
				iframe.appendTo('body');
				
				iframe.load(function(e){
					var doc = $.getDoc(iframe[0]);					
					var docRoot = doc.body ? doc.body : doc.documentElement;
					var data = docRoot.innerHTML;
					$('img', form).hide();
				});
			});
		},
		
		entryManager: function(){
			
			var method = this;
			$doc = $(document);
			
			$('.post-image').magnificPopup({
				delegate: 'a',
				type: 'image',
				closeBtnInside : true,
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title');
					}
				}
			}); 
			
		},
		
		switchForm: function(){
			var $doc = $(document);
			$doc.on('change', '.switch-form', function(){
				var id = $('option:selected', this).val();
				var href = window.location.href;
				var location = href.split("&form=")[0] +"&form="+ id +"&"+ href.split("&form=")[1].split("&")[1];
				window.location.href = location;
			})
		},
		
		formSettings: function(){
			var method = this;
		},
		
		formNotification: function(){
			
			var $doc = $(document);
			var method = this;
			var options = this.options;
			
			method.delete();
			
			$(window).scroll(function(event){	
				var win = $(window);
				var tools = $(".float-list");
				var wpbar = $("#wpadminbar");
				var query_top = $('.table-settings').offset().top - wpbar.innerHeight();
				(win.scrollTop() > query_top) ? tools.css({"margin-top": win.scrollTop() - query_top}) :  tools.css({"margin-top": 0});	
			})
			
			$('.switch-button').switchButton({
				width: 50,
			  height: 20,
			  button_width: 25,
				on_callback: function(event){
					method.switchButton($(this.element), 1);
				},
				off_callback: function(event){
					method.switchButton($(this.element), 0);
				}
			});
			
			$('#add-notification').click( function(){
				location.href = location.href + "&action=add";
			});
			
			guiform.caret = 'subject';
			
			$doc.on('focus', 'input, textarea', function(){
				guiform.caret = this.name;
			});
			
			$doc.on('click', '.add', function(){
				var type = this.id.split('-')[1];
				type = (type == 'replyto') ? 'reply-to' : type;
				$('input[name='+type+']').parents('tr').removeClass('hide');
				$(this).addClass('hide');
				$('.column-attachment').attr('rowspan', parseInt($('.column-attachment').attr('rowspan')) + 1);
				if($('tr.hide').size() > 0) $('#attachment-item').css('height', parseInt($('#attachment-item').css('height')) + 50);
				if($('.add.hide').size() == 3) $(this).parents('tr').addClass('hide');
			});
			
			$doc.on('click', '.wp-switch-editor', function(){
				guiform.caret = (this.id == 'message-html') ? 'message' : 'tinymce';
			});
			
			$doc.on('click', '.float-list li',function(){
				var value = $(this).attr('data-field');
				
				if($.trim(guiform.caret) == '' || guiform.caret == 'tinymce' || guiform.caret == false)
					tinyMCE.execCommand("mceInsertContent", false, value);
				else if(guiform.caret == 'message')
					$("textarea[name="+guiform.caret+"]").atCaret('insert', value);
				else
					$("input[name="+guiform.caret+"]").atCaret('insert', value);
				return false;
			});
			
			$('.col-remove .remove').click( function(){
				var type = this.id.split('-')[1];
				$(this).parents('tr').addClass('hide');
				$(this).parents('tr').find('input').val('');
				$('a[id=add-'+type+']').removeClass('hide');
				$('a[id=add-'+type+']').parents('tr').removeClass('hide');
				$('.column-attachment').attr('rowspan', parseInt($('.column-attachment').attr('rowspan')) - 1);
				if($('tr.hide').size() > 1) $('#attachment-item').css('height', parseInt($('#attachment-item').css('height')) - 50);
			});
			
			$doc.on('click', '#attachment-item .remove',function(){
				$(this).parents('.item').hide('slow', function(){
					$(this).remove();	
				});
			});
			
			if($('#attachment').size() > 0){
				
				$(window).scroll(function(event){	
					var win = $(window);
					var tools = $(".float-list");
					var wpbar = $("#wpadminbar");
					var query_top = $('.table-settings').offset().top - wpbar.innerHeight();
					(win.scrollTop() > query_top) ? tools.css({"margin-top": win.scrollTop() - query_top}) :  tools.css({"margin-top": 0});	
				});
			
			
				// Uploading files
				var file_frame;
				var wp_media_post_id = wp.media.model.settings.post.id; // Store the old id
				var set_to_post_id = 10; // Set this
			}
			
			$('.uploader #attachment').click(function(event) {
			 
			 	
				event.preventDefault();
				 
				// If the media frame already exists, reopen it.
				if ( file_frame ) {
					// Set the post ID to what we want
					file_frame.uploader.uploader.param( 'post_id', set_to_post_id );
					// Open frame
					file_frame.open();
					return;
				} 
				else {
					// Set the wp.media post id so the uploader grabs the ID we want when initialised
					wp.media.model.settings.post.id = set_to_post_id;
				}
				 
				// Create the media frame.
				file_frame = wp.media.frames.file_frame = wp.media({
						title: $( this ).data( 'uploader_title' ),
						button: {
						text: $( this ).data( 'uploader_button_text' ),
					},
						multiple: true // Set to true to allow multiple files to be selected
				});
				 
				// When an image is selected, run a callback.
				file_frame.on( 'select', function() {
					// We set multiple to false so only get one image from the uploader
					//attachment = file_frame.state().get('selection').toJSON();
					guiform.caret = ($('#wp-message-wrap').hasClass('tmce-active')) ? 'tinymce' : 'message';
			 
					$.each(file_frame.state().get('selection').toJSON(), function(){
						//Generate random id.
						var id = Math.random().toString().slice(2,11);
						var name = ($.trim(this.filename) != '') ? this.filename : this.name+'.'+this.subtype;
						var html = '<li>\
													<div class="item">\
													  <input type="hidden" name="attachment['+id+'][url]" value="'+this.url+'">\
													  <input type="hidden" name="attachment['+id+'][name]" value="'+ name +'">\
														<span class="label">'+ name +'</span>\
														<span title="Remove" class="remove" data-icon="&#xe003;"></span>\
													</div>\
												</li>';
												
						$('#attachment-item ul').append(html);
					});
				});
			 
				// Finally, open the modal
				file_frame.open();
			});
		},
		
		switchButton: function(element, value){
			var method = this;
			method._type = 'notification-status';
			
			$.ajax({
				url: ajaxurl,
				data: method.data(element, value),
				cache: false,
				async: false,
				type: 'POST'
			})
			
		},
		
		formConfirmation: function(){
			
			var $doc = $(document);
			var method = this;
			var options = this.options;
			
			$(window).scroll(function(event){	
				var win = $(window);
				var tools = $(".float-list");
				var wpbar = $("#wpadminbar");
				var query_top = $('.table-settings').offset().top - wpbar.innerHeight();
				(win.scrollTop() > query_top) ? tools.css({"margin-top": win.scrollTop() - query_top}) :  tools.css({"margin-top": 0});	
			})
			
			$doc.on('click', '.wp-switch-editor', function(){
				guiform.caret = (this.id == 'custom-html') ? 'custom' : 'tinymce';
			});
			
			$doc.on('change', 'select[name=type]', function(){
				var value = this.value;
				guiform.caret = (value == 'custom') ? 'tinymce' : (value == 'redirect') ? 'url' : null;
				$('.table-settings tr.row:not("tr#row-'+value+'")').addClass('hide');
				$('.table-settings tr#row-'+ value).removeClass('hide');
			});
			
			$doc.on('click', '.float-list li',function(){
				var value = $(this).attr('data-field');
				if(guiform.caret == 'tinymce')
					tinyMCE.execCommand("mceInsertContent",false, value);
				else if(guiform.caret == 'custom')
					$("textarea[name="+guiform.caret+"]").atCaret('insert', value);
				else if(guiform.caret == 'url' || guiform.caret == 'redirect'){
					guiform.caret = 'url';
					$("[name="+guiform.caret+"]").atCaret('insert', value);
				}
				return false;
			});
		},
		
		buildOptions: function(){
			$('#options-list tbody').sortable({
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
		},
		
		validEmail: function(email){
		  return /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(email)
		      && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email);
		},
		
		mailSetup: function(){
			var method = this;
			method.quickEdit();
			method.quickSave();
			method.cancel();
			method.delete();
			
			$('.wp-list-table').on('click', '#save-mail, #update-mail', function(){
				
				$('.spinner').show();
				
				var id              = $.trim($("input[name=form-id]").val());
				var email           = $.trim($("input[name=email]").val());
				var name            = $.trim($("input[name=name]").val());
				var return_path     = ($("input[name=return_path]").is(':checked')) ? 1 : 0;
				var protocol        = $("input[name=protocol]:checked").val();
				var smtp_host       = $.trim($("input[name=smtp_host]").val());
				var smtp_port       = $.trim($("input[name=smtp_port]").val());
				var smtp_encryption = $("input[name=smtp_encryption]:checked").val();
				var smtp_auth       = ($("input[name=smtp_auth]").is(':checked')) ? 1 : 0;
				var smtp_username   = $.trim($("input[name=smtp_username]").val());
				var smtp_password   = $.trim($("input[name=smtp_password]").val());
				
				if(method.validEmail(email) == false){
					$('<div>').guifbox({title: 'Invalid Email', status: 'error', body: '<p style="padding: 10px;">Invalid email address.</p>'});
					return false;
				}
				
				
				var data = {
							'action'          : 'guiform-quick-save-mail', 
							'nonce'           : guiform.nonce,
							'id'              : id,
							'email'           : email,
							'name'            : name,
							'return_path'     : return_path,
							'protocol'        : protocol,
							'smtp_host'       : smtp_host,
							'smtp_port'       : smtp_port,
							'smtp_encryption' : smtp_encryption,
							'smtp_auth'       : smtp_auth,
							'smtp_username'   : smtp_username,
							'smtp_password'   : smtp_password
						};
				
				$('<div>').guifbox({
					url: ajaxurl,
					data: data,
					dataType: 'json',
					cache: false,
					type: 'POST',
					success: function(data){
						$('.spinner').hide();
						if(data.status == "error" || typeof(data) == 'string'){
							var message = data.message ? data.message : data;
							$(this).guifbox({title: 'error', status: 'error', body: '<p style="padding: 10px;">'+ message +'</p>'});
						}
						else{
							$(this).guifbox({title: 'success', status: 'success', body: '<p style="padding: 10px;">'+ data.message +'</p>', reload: true});
						}
					}
				})
				
			});
			
			$('.wp-list-table').on('click', '.test-mail-button', function(){
				var id = $(this).parents('.row').attr('id');
				var data = {
							'action' : 'guiform-mail-test',
							'nonce'  : guiform.nonce,
							'id'     : id
						};
						
				$('<div>').guifbox({
					url: ajaxurl,
					data: data,
					dataType: 'html',
					cache: false,
					type: 'POST',
					success: function(result){
						if(result.split("!")[0] != 'Message sent'){
							$(this).guifbox({title: 'error', status: 'error', body: result.split(" in ")[0]});
						}
						else{
							$(this).guifbox({title: 'success', status: 'message', body: '<p style="padding: 10px;">'+result+'</p>', reload: false});
						}
					}
				})
				
			});
			
			$('.wp-list-table').on('click', '.activation-key-button', function(){
				var id = $(this).parents('.row').attr('id');
				
				var data = {
							'action' : 'guiform-mail-activate',
							'nonce'  : guiform.nonce,
							'id'     : id
						};
						
				$('<div>').guifbox({
					url: ajaxurl,
					data: data,
					dataType: 'html',
					cache: false,
					type: 'POST',
					success: function(result){
						if(result.split("!")[0] != 'Message sent'){
							$(this).guifbox({title: 'error', status: 'error', body: result.split(" in ")[0]});
						}
						else{
							$(this).guifbox({title: 'success', status: 'message', body: '<p style="padding: 10px;">'+result+'</p>', reload: false});
						}
					}
				})
				
			});
			
			$('.wp-list-table').on('click', 'input[name="protocol"]', function(){
				if($(this).val() == "smtp")
					$('.wp-list-table .inline-edit-col-center').show();
				else
					$('.wp-list-table .inline-edit-col-center').hide();
			})
			
			$('.wp-list-table').on('click', 'input[name="smtp_auth"]', function(){
				if($(this).is(':checked'))
					$('#authentication').show();
				else
					$('#authentication').hide();
			})
			
		},
		
		action: function(){
			var method = this;
			
			$(document).on('click', ".metabox-icons [data-action]:not([data-action='']), .quick-action", function(){
				var location = guiform.entries_url;
				method._type = $(this).attr('data-action');
				
				$('<div>').guifbox({
					title:'Please confirm your action.',
					status:'confirm',
					body:'<p style="padding: 10px;">Are you sure?</p>',
					url: ajaxurl,
					data: method.data($(this)),
					dataType: 'html',
					cache: false,
					type: 'POST',
					success: function(result){
						if(result != ''){
							var text = $(result).text().split('[')[1].split(']')[0]
							$(this).guifbox({title: 'error', status: 'error', body: result});
						}
						else{
							$(this).guifbox({reload: true, location: location, title: 'message', status: 'success', body: '<p style="padding: 10px;">Successful.</p>'});
						}
					}
				})
			
				return false;
			})
		},
		
		_column:	function(event){
			var size = $(".wp-list-table thead th:not(.wp-list-table thead th:hidden)").size();
			$(".wp-list-table .inline-edit-row td:not(.wp-list-table #options-list td)").attr('colspan', size);
		},
		
		formsManager: function(){
			this.quickEdit();
			this.quickSave();
			this.delete();
			this.cancel();
			this.duplicate();
		}, 
		
		cancel: function(){
			$('.wp-list-table').on('click', '.button-secondary.cancel', function(){
				$('.inline-edit-row').remove();
				$('#the-list .hide').show(500, function(){
					$(this).removeClass('hide');	
				});	
			});
		},
		
		data: function(element, value){
		
			if(guiform.type == 'forms'){
				var data = {
							'action'      : 'guiform-quick-save-'+ guiform.type, 
							'id'          : $("input[name=id]").val(),
							'nonce'       : guiform.nonce,
							'title'       : $.trim($("input[name=title]").val()) || 'Untitled',
							'saveEntries' : $("input[name=save_entries]").is(":checked") ? 1 : 0
						};
			}		
			else if(guiform.type == 'mail'){
				var data = {
					'action'          : 'guiform-quick-save-'+ guiform.type, 
					'id'              : $("input[name=form-id]").val(),
					'nonce'           : guiform.nonce,
					'email'           : $("input[name=email]").val(),
					'name'            : $("input[name=name]").val(),
					'return_path'     : $("input[name=return_path]").is(":checked") ? true : false,
					'protocol'        : $("input[name=protocol]:checked").val(),
					'smtp_host'       : $("input[name=smtp_host]").val(),
					'smtp_port'       : $("input[name=smtp_port]").val(),
					'smtp_encryption' : $("input[name=smtp_encryption]:checked").val(),
					'smtp_auth'       : $("input[name=smtp_auth]").is(":checked") ? true : false,
					'smtp_username'   : $("input[name=smtp_username]").val(),
					'smtp_password'   : $("input[name=smtp_password]").val()
				};
			}
			else if(guiform.type == 'entry' || this._type == 'mark-unread' || this._type == 'trash-entry'){
				var data = {
					'action'    : 'guiform-'+ this._type, 
					'form'      : guiform.form,
					'id'        : guiform.entry || element.attr('data-id'),
					'nonce'     : guiform.nonce
				};
			}
			else if(this._type == 'notification-status'){
				var data = {
					'action' : 'guiform-'+ this._type, 
					'form'   : guiform.form,
					'id'     : element.val(),
					'status' : value,
					'nonce'  : guiform.nonce
				};
			}
			else if(this._type == 'export-entry-fields'){
				var data = {
					'action'  : 'guiform-'+ this._type, 
					'id' : element.val(),
					'nonce'   : guiform.nonce
				};
			}
			else if(this._type == 'activate-license'){
				var row = $(element).parents('tr');
				var data = {
					'action'  : 'guiform-'+ this._type, 
					'license' : $.trim(row.find('input[name=license]').val()),
					'name'    : $.trim(row.find('input[name=name]').val()),
					'package' : $.trim(row.find('input[name=package]').val()),
					'nonce'   : guiform.nonce
				};
				
			}
			else if(this._type == 'deactivate-license'){
				var row = $(element).parents('tr');
				var data = {
					'action'  : 'guiform-'+ this._type, 
					'license' : $.trim(row.find('input[name=license]').val()),
					'name'    : $.trim(row.find('input[name=name]').val()),
					'package' : $.trim(row.find('input[name=package]').val()),
					'nonce'   : guiform.nonce
				};
			}
			
			return data;
		},
		
		quickEdit: function(){
			var method = this;
			$('.wp-list-table .quick_edit, #add-mail, #add-structure, #add-database, #add-options').click(function(){
				var id = $(this).parents('.row').attr('id');
				var row = $(this).parents('.row');	
				var alternate = row.hasClass('alternate');
				$('.inline-edit-row').remove();
				$('#the-list tr').show();	
				row.addClass('hide').hide();
				$('#the-list tr:eq('+ (id === undefined ? 0 : row.index()) +')').before("<tr id='loader' class='"+ (alternate ? 'alternate' : '') +"'><td colspan='0' align='center'><img src='"+ guiform.assets +"images/save-loader.gif'></td></tr>");
		
				var data = {
					'action' : 'guiform-quick-edit-'+ guiform.type, 
					'nonce' : guiform.nonce,
					'id'    : id
				};
				
				$.ajax({
					url: ajaxurl,
					data: data,
					dataType: 'html',
					cache: false,
					async: false,
					type: 'POST',
					success:function(result){
						$('#loader').remove();
						$('#the-list tr:eq('+ (id === undefined ? 0 : row.index()) +')').before(result);
						if(alternate) $('.inline-edit-row').addClass('alternate');
						method._column();						
						if(guiform.type == 'options') method.buildOptions();
					}
				})
					
			});
		},
		
		quickSave: function(){
			var method = this;
			
			$('.wp-list-table').on('click', '.save', function(){
				
				$('.spinner').show();
				
				var data = method.data();
				
				$.ajax({
					url: ajaxurl,
					data: data,
					dataType: 'json',
					cache: false,
					async: false,
					type: 'POST',
					success:function(data){
						$('.spinner').hide();
						if(data.status == "error")
							$('<div>').guifbox({title: 'error', status: 'error', body: '<p style="padding: 10px;">'+ data.message +'</p>'});
						else
							$('<div>').guifbox({reload: true, location: location.href, title: 'message', status: 'success', body: '<p style="padding: 10px;">'+ data.message +'</p>'});	
					},
					error: function( jqXHR, textStatus, errorThrown ){
						if(jqXHR.readyState == 4){
							$('.spinner').hide();
							$('<div>').guifbox({title: 'error', status: 'error', body: '<p style="padding: 10px;">'+ jqXHR.responseText +'</p>'});
						}
					}
				})
				
			});
		},
		
		delete: function(){
			var method = this;
			
			$('.wp-list-table .delete').click(function(){
			
				var id = $(this).parents('.row').attr('id');
				
				var data = {
						'action': "guiform-quick-delete", 
						'nonce' : guiform.nonce,
						'id'    : id,
						'type'  : guiform.type, 
					};
					
			  $('<div>').guifbox({
					title:'Please confirm your action.',
					status:'confirm',
					body:'<p style="padding: 10px;">Are you sure?</p>',
					url: ajaxurl,
					data: data,
					dataType: 'html',
					cache: false,
					type: 'POST',
					success: function(result){
						($("#the-list tr").size() > 1) ? $('#'+id).hide('slow', function(){$(this).remove()}) : $("#the-list").html('<tr class="no-items"><td colspan="'+ $('.wp-list-table thead th').size() +'" class="colspanchange">No form available.</td></tr>');
					}
				})
			})
		},
		
		duplicate: function(){
			$('.wp-list-table .duplicate').click(function(){
				
				var id = $(this).parents('.row').attr('id');
				
				var data = {
						'action': "guiform-quick-duplicate", 
						'nonce' : guiform.nonce,
						'id'    : id,
						'type'  : guiform.type, 
					};
					
			  $('<div>').guifbox({
					title:'Please confirm your action.',
					status:'confirm',
					body:'<p style="padding: 10px;">Are you sure?</p>',
					url: ajaxurl,
					data: data,
					dataType: 'json',
					cache: false,
					type: 'POST',
					success: function(data){
						if(data.status == "error")
							$('<div>').guifbox({title: 'error', status: 'error', body: '<p style="padding: 10px;">'+ data.message +'</p>'});
						else
							$('<div>').guifbox({reload: true, location: location.href, title: 'message', status: 'success', body: '<p style="padding: 10px;">'+ data.message +'</p>'});	
					}
				})
			})
		}
	});
	
	$(document).script();
	
}(jQuery));