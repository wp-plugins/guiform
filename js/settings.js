/*!
 * GuiForm Plugin
 * https://www.guiform.com
 *
 * By: Russell C. Pabon
 * http://russellpabon.com
 *
 */
(function() {
	
	var $ = jQuery;
	
	$("form")[0].reset();
	
	function valid_email(email){
	  return /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(email)
	      && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email);
	}
	
	setInterval(function(event){
		var size = $(".wp-list-table thead th").size();
		var hide = $(".wp-list-table thead th[style*='display: none']").size();
		$(".wp-list-table .inline-edit-row td").attr('colspan', size - hide);
	},1);
	
	$('.delete-form').click( function(){
		
		if(confirm('Are you sure you want to delete this form?')){
			
			var id = this.id.split('-')[1];
			var tr = $(this).parent().parent().parent().parent();
			var data = {
						'action': 'delete-form', 
						'id' : id
					};
			
		  $.ajax({
				url: ajaxurl,
				data: data,
				dataType: 'html',
				cache: false,
				type: 'POST',
				success:function(result){
					tr.hide( 'slide', '', 1000);
					alert(result)
				}
			})
		} 	
		
	})
	
	$('.delete').click( function(){
		var id = this.id.split('-')[1];
		var type = $(this).attr('data-type');
		var tr = $(this).parent().parent().parent().parent();
		
		var data = {
						'action': 'delete', 
						'type': type,
						'id' : id
					};
		
		$(this).guifbox({
			title:'Please confirm your action.',
			status:'confirm',
			body:'<p>Are you sure you want to delete this record?</p>',
			url: ajaxurl,
			data: data,
			dataType: 'html',
			cache: false,
			type: 'POST',
			success: function(result){
				if(result != ''){
					$(this).guifbox({title: 'error', status: 'error', body: result});
				}
				else{
					$(this).guifbox({reload: true, title: 'message', status: 'success', body: '<p>Delete successful.</p>'});
				}
			}
		})
			
		return false;
	
	})
	
	$('.quick_edit').click(function(){
		var id = $(this).find('a').attr('id').split('-')[1];
		var action = $(this).find('a').attr('class');
		var parent = $(this).parent().parent().parent();
		$('.inline-edit-row').remove();
		$('#the-list tr').show();	
		parent.addClass('hide').hide();
		var data = {
					'action': action, 
					'id' : id
				};
		
		$(this).guifbox({
			url: ajaxurl,
			data: data,
			dataType: 'html',
			cache: false,
			type: 'POST',
			success: function(result){
				$('#the-list tr:eq('+parent.index()+')').after(result);
			}
		})
			
		return false;
		
	});
	
	$('#settings').on('click', '#add-mail, #add-database, #add-font, #add-datastructure', function(){
	
		$('.inline-edit-row').remove();
		$('#the-list tr.hide').show().removeClass('hide');
		$('#loader').remove();
		
		var data = {
					'action': this.id
				};
				
		$('<div>').guifbox({
			url: ajaxurl,
			data: data,
			dataType: 'html',
			cache: false,
			type: 'POST',
			success: function(result){
				$('#the-list tr:eq(0)').before(result);
			}
		})
			
	});
	
	$('.wp-list-table').on('click', '#save-database, #update-database', function(){
		
		var id       = $.trim($("input[name=form-id]").val());
		var name     = $.trim($("input[name=name]").val());
		var host     = $.trim($("input[name=host]").val());
		var database = $.trim($("input[name=database]").val());
		var username = $.trim($("input[name=username]").val());
		var password = $.trim($("input[name=password]").val());
		var port     = $.trim($("input[name=port]").val());
		$('.spinner').show();
		
		var data = {
					'action'   : 'database-quick-save', 
					'id'       : id,
					'name'     : name,
					'host'     : host,
					'database' : database,
					'username' : username,
					'password' : password,
					'port'     : port
				};
		
		$('<div>').guifbox({
			url: ajaxurl,
			data: data,
			dataType: 'html',
			cache: false,
			type: 'POST',
			success: function(result){
				$('.spinner').hide();
				var html = $("<div />").append($(result).clone()).html();
				
				if($(html).attr('id') == 'error'){
					$(this).guifbox({title: 'error', status: 'error', body: html});
					return;
				}
				
				if(id != ''){
					$(this).guifbox({title: 'success', status: 'success', body: '<p>Update database connection successful</p>', reload: true});
				}
				else{
					$(this).guifbox({title: 'success', status: 'success', body: '<p>Add database connection successful</p>', reload: true});
				}
				
			}
		})
		
	});
	
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
		
		if(valid_email(email) == false){
			$('<div>').guifbox({title: 'Invalid Email', status: 'error', body: '<p>Invalid email address.</p>'});
			return false;
		}
		
		
		var data = {
					'action'          : 'mail-quick-save', 
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
				
				if(data.status == "error"){
					$(this).guifbox({title: 'error', status: 'error', body: data.message});
				}
				else{
					if(id != ''){
						$(this).guifbox({title: 'success', status: 'success', body: '<p>Update mail successful</p>', reload: true});
					}
					else{
						$(this).guifbox({title: 'success', status: 'success', body: '<p>Add mail successful</p>', reload: true});
					}
				}
			}
		})
		
	});
	
	$('.wp-list-table').on('click', '.test-mail-button', function(){
		var id = this.id.split('-')[1];
		
		var data = {
					'action' : 'send-test-mail',
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
					$(this).guifbox({title: 'success', status: 'message', body: '<p>'+result+'</p>', reload: false});
				}
			}
		})
		
	});
	
	$('.wp-list-table').on('click', '.activation-key-button', function(){
		var id = this.id.split('-')[1];
		
		var data = {
					'action' : 'send-activation-key',
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
					$(this).guifbox({title: 'success', status: 'message', body: '<p>'+result+'</p>', reload: false});
				}
			}
		})
		
	});
	
	$('.wp-list-table').on('click', '#save-datastructure, #update-datastructure', function(){
		
		var id            = $.trim($("input[name=form-id]").val());
		var type          = $.trim($("select[name=type]").val());
		var length        = $.trim($("input[name=length]").val());
		var default_type  = $.trim($("select[name=default_type]").val());
		var default_value = $.trim($("input[name=default_value]").val());
		var collation     = $.trim($("select[name=collation]").val());
		var attribute     = $.trim($("select[name=attribute]").val());
		$('.spinner').show();
		
		var data = {
					'action'         : 'datastructure-quick-save', 
					'id'             : id, 
					'type'           : type,
					'length'         : length,
					'collation'      : collation
				};
		
		$('<div>').guifbox({
			url: ajaxurl,
			data: data,
			dataType: 'html',
			cache: false,
			type: 'POST',
			success: function(result){
				$('.spinner').hide();
				var html = $("<div />").append($(result).clone()).html();
				
				if($(html).attr('id') == 'error'){
					$(this).guifbox({title: 'error', status: 'error', body: html});
					return;
				}
				
				if(id != ''){
					$(this).guifbox({title: 'success', status: 'success', body: '<p>Update data structure successful</p>', reload: true});
				}
				else{
					$(this).guifbox({title: 'success', status: 'success', body: '<p>Add data structure successful</p>', reload: true});
				}
				
			}
		})
		
		return false;
	});
	
	$('.wp-list-table').on('click', '#save-font, #update-font', function(){
		var id          = $.trim($("input[name=form-id]").val());
		var name        = $.trim($("input[name=name]").val());
		var font_family = $.trim($("input[name=font-family]").val());
		var url         = $.trim($("input[name=url]").val());
		
		$('.spinner').show();
		
		var data = {
					'action'      : 'font-quick-save', 
					'id'          : id,
					'name'        : name,
					'font-family' : encodeURIComponent(font_family.replace(/"/g, "'")),
					'url'         : encodeURIComponent(url)
				};
				
		$('<div>').guifbox({
			url: ajaxurl,
			data: data,
			dataType: 'html',
			cache: false,
			type: 'POST',
			success: function(result){
				$('.spinner').hide();
				var html = $("<div />").append($(result).clone()).html();
				
				if($(html).attr('id') == 'error'){
					$(this).guifbox({title: 'error', status: 'error', body: html});
					return;
				}
				
				if(id != ''){
					$(this).guifbox({title: 'success', status: 'success', body: '<p>Update font successful</p>', reload: true});
				}
				else{
					$(this).guifbox({title: 'success', status: 'success', body: '<p>Add font successful</p>', reload: true});
				}
				
			}
		})
		
	});
	
	$('.wp-list-table').on('click', '.button-secondary.cancel', function(){
		$('.inline-edit-row').hide(600);
		$('#the-list tr.hide').show(600).removeClass('hide');	
	});
	
}).call(this);