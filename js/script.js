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
	
	$("form")[0].reset();
	
	$( "#from" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		changeYear: true,
		numberOfMonths: 3,
		onClose: function( selectedDate ) {
			$( "#to" ).datepicker( "option", "minDate", selectedDate );
		}
	});
	
	$( "#to" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		changeYear: true,
		numberOfMonths: 3,
		onClose: function( selectedDate ) {
			$( "#from" ).datepicker( "option", "maxDate", selectedDate );
		}
	});
	
	$("#guif-export select[name='form']").change( function(){
		if(this.value){
			
			$("input[name='name']").val($.trim($("option:selected", this).text().split(":")[1]));
			
			var data = {
						'action': 'guiform-export-get-fields', 
						'id' : $.trim(this.value)
					};
			
		  $.ajax({
				url: ajaxurl,
				data: data,
				dataType: 'html',
				cache: false,
				type: 'POST',
				success:function(html){
					$("#display-fields").html(html);
					$("#row-fields, #row-button").show();
				}
			})
		}
		else{
			$("#display-fields").html("");
			$("#row-fields, #row-button").hide();
		}
	})
	
	$("#guif-export form").submit( function(event){
		event.stopPropagation(); // Stop stuff happening
    var form = $(this);
    var iframeId = 'unique' + (new Date().getTime());		
    var formURL = form.attr("action");
		var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
		iframe.hide();
		form.attr('target',iframeId);
		iframe.appendTo('body');
		iframe.load(function(e){
			var doc = $.getDoc(iframe[0]);					
			var docRoot = doc.body ? doc.body : doc.documentElement;
			var data = docRoot.innerHTML;
		});
	})
	
}).call(this);	