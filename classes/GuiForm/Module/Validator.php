<?php

// +----------------------------------------------------------------------+
// | Copyright 2013 GuiForm Pro (email : info@guiform.com)                |
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

/**
 * Frontend module class.
 *
 * @category GuiForm Pro
 * @package Module
 *
 * @since 1.0
 */
class GuiForm_Module_Validator extends GuiForm_Module {
	
	const NAME = __CLASS__;

	private $_id;
	
	private $_form;
	
	private $_data;
	
	private $_randID;
	
	private $_feedbackIcons;

	/**
	 * Constructor.
	 *
	 * @since 1.0.3
	 *
	 * @access public
	 * @param GuiForm_Plugin $plugin The instance of the plugin.
	 */
	public function __construct(GuiForm_Plugin $plugin){
		parent::__construct($plugin);	
	}
	
	public function init($id, $formId, $form){
		$this->_id = $id;
		$this->_randID = $formId;
		$this->_feedbackIcons = self::_feedbackIcons();
		
		$this->_form = $form;
		$this->_data = unserialize($this->_form->data);
		
		
	}
	
	private function _sendResponse($results) {
		nocache_headers();
		return json_encode( (object) $results);
	}
	
	private function _feedbackIcons(){
		return array( 'valid'      => 'fa fa-check',
			            'invalid'    => 'fa fa-times',
			            'validating' => 'fa fa-refresh',
			            'required'   => 'fa fa-asterisk');
	}
	
	public function object(){
		$data = array();
		$data['feedbackIcons'] = self::_feedbackIcons();
		$data['fields'] = self::_fields();
		
		
		return self::_sendResponse($data);
	}
	
	public function _fields(){
		$fields = array();
		
		if(sizeof($this->_data)){
			foreach($this->_data as $key => $value){
				
				$validators = array();
				
				if($value['validation']['required']['enable']){
					$validators['notEmpty'] = array('message' => $value['validation']['required']['text']);
				}
				
				if($value['validation']['format']['enable']){
					$validators[$value['validation']['format']['type']] = array('message' => $value['validation']['format']['text']);
				}
				
				if($value['type'] == 'f_password' && $value['validation']['match']['enable']){
					$validators['identical'] = array(
						'field'   => $value['validation']['match']['field'],
						'message' => $value['validation']['match']['text']
					);
				}
				
				if($value['validation']['distinct']['enable']){
					$validators['remote'] = 
					array(
	          'type'    => 'POST',
	          'url'     => admin_url('admin-ajax.php'),
	          'message' => $value['validation']['distinct']['text'],
	          'delay'   => '1000',
	          'data'    => array(
	          	'nonce' => wp_create_nonce( "guiform_nonce" ),
	          	'id'    => $this->_id,
	          	'name'  => $value['name'], 
	          	'action' => 'guiform-tools-validate-distinct'
          	)
          );
				}
						
				if($value['type'] == 'f_phone'){
					$validators[$value['validation']['format']['type']]['country'] = $value['validation']['format']['country'];
				}
				
				if($value['type'] == 'f_file'){
					$validators['file'] = array('extension' => $value['validation']['extension']['type'],
																			'type'      => $value['validation']['extension']['mime'],
																			'message'   => $value['validation']['extension']['text']);
				}
				
				$fields[$value['name']] = array(
					'validators' => $validators,
					'excluded' => false
				);
				
				
			}
			
			return $fields;
		}
		
	}
	
	public function printJS($wrapper = true){
		return self::_build();
	}
	
	
	private function _build(){
		
		$output = '<script type="text/javascript">'."\n";
			$output .= '$ = jQuery;'."\n";
			$output .= '$(document).ready(function() { ' ."\n";
			
				$output .= '
				
				$.getDoc = function(frame) {
						var doc = null;
						
						try {
							if (frame.contentWindow) doc = frame.contentWindow.document;
						}catch(err){}
						
						if(doc) return doc;
						
						try{
							doc = frame.contentDocument ? frame.contentDocument : frame.document;
						}catch(err) {
							doc = frame.document;
						}
						
						return doc;
					}
					
					$.submitEnable = function(element){
						$(".f_submit", element).each( function(){
							var submitText = $(this).attr("data-submittext");
							$(this).find(".btn-primary .fa").removeClass("icon-spin fa-refresh").addClass("fa-check");
							$(this).find(".btn-primary .btn-text").html(submitText);
						});
					}
					
					$.submitDisable = function(element){
						$(".f_submit", element).each( function(){
							var loaderText = $(this).attr("data-loadertext");
							$(this).find(".btn-primary .fa").removeClass("fa-check").addClass("icon-spin fa-refresh");
							$(this).find(".btn-primary .btn-text").html(loaderText);
						});
					}
				
					
					$doc = $("#'. $this->_randID .'");
					
					$doc.on("keydown", ".ui-spinner-input",function(event){
						var key = event.charCode || event.keyCode || 0; 
						if(event.shiftKey == true) return false;
						return (key == 8 || key == 9 || key == 46 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
		        				
						event.preventDefault();
					}).on("cut copy paste", ".ui-spinner-input", function(event) {
			      event.preventDefault();
				  });
			  
					$doc.on("change", ".btn-file :file", function() {
						var input = $(this),
				    numFiles = input.get(0).files ? input.get(0).files.length : 1,
				    label = input.val();
				    input.trigger("fileselect", [numFiles, label]);
			    });
		    	
					$doc.on("fileselect", ".btn-file :file", function (event, numFiles, label) {
						var input = $(this).parents(".input-group").find(":text"), log = numFiles > 1 ? numFiles + " files selected" : label;
						if (input.length) {
							input.val(log);
						} 
					});
					
					$doc.on("click", ".f_submit button[type=reset]", function(event){	
							$("#'. $this->_randID .'")
	            .bootstrapValidator("resetForm", true)
	            .bootstrapValidator("disableSubmitButtons", false)  // Enable the submit buttons
	           
	            if($(".folding", "#'. $this->_randID .'").size()){
			        	$(".folding", "#'. $this->_randID .'").each( function(){
			        		$(this).accordion({ active: 0});
			        	});
			        }
	            
	            $("#'. $this->_randID .'").find(".form-control-feedback, .error-message").hide();
							$.submitEnable($("#'. $this->_randID .'"));
					});
				
				
				$.mask.definitions["#"] = "[0-9]";
				$.mask.definitions["@"] = "[a-zA-Z]";
				$.mask.definitions["*"] = "[a-zA-Z0-9]";
				$.mask.definitions["~"] = "[+-]";
					
				$("#'. $this->_randID .' .f_phone input").each( function(){
					if($(this).attr("data-mask") != ""){
						$(this).mask($(this).attr("data-mask"));
					}
				});
			

				if($("#'. $this->_randID .' .button").size() > 0)	$("#'. $this->_randID .' .button").buttonset();
			
				$("#'. $this->_randID .' .ui-spinner").each( function(){
					var max = $(this).attr("data-max");
					var min =  $(this).attr("data-min");
					$(this).spinner({ 
						max: max,
						min: min,
						numberFormat: "n"
					}).spinner("value", $(this).attr("data-default"));
				})
				
				$("#'. $this->_randID .'")
				.on("init.form.bv", function(e, data) {
            // $(e.target)  --> The form instance
            // data.bv      --> The BootstrapValidator instance
            // data.options --> The form options
            
        })
        .bootstrapValidator(' ."\n";
					$output .=  self::object()."\n";
				$output .= ')'. self::_addEvents() .';'."\n";
			$output .= '});'."\n";
		$output .= '</script>'."\n";
		
		return $output;
	}
	
	private function _addEvents(){
		
		return '
			.on("error.field.bv", function(e, data) {
			  if($(data.element).closest(".item").hasClass("f_radio") || $(data.element).closest(".item").hasClass("f_checkbox"))
			  	$(data.element).closest(".wrap").find(".error-message p").html(data.bv.getMessages()[0]);
			  else
			  	$(data.element).closest(".wrap").find(".error-message p").html(data.bv.getMessages(data.element)[0]);
			  
				$(data.element).closest(".wrap").find("small.help-block").hide();
				$(data.element).closest(".wrap").find(".error-message").show();
				$(e.target).bootstrapValidator("disableSubmitButtons", false);
				$("#'. $this->_randID .'").bootstrapValidator("disableSubmitButtons", false); 
				$.submitEnable($("#'. $this->_randID .'"));
			})
			
			.on("success.field.bv", function(e, data) {
	      $(data.element).closest(".wrap").find(".error-message").hide();
	      $("#'. $this->_randID .'").bootstrapValidator("disableSubmitButtons", false);
	      $.submitEnable($("#'. $this->_randID .'"));
	     })
	     
	     .on("status.field.bv", function(e, data) {
		      $.submitDisable($("#'. $this->_randID .'"));
	     })
	     
	     .on("error.validator.bv", function(e, data) {
					$(data.element).closest(".wrap").find(".error-message").hide();
          data.element
              .data("bv.messages")
              .find(".help-block[data-bv-for=\'" + data.field + "\']").hide();
          $("#'. $this->_randID .'").bootstrapValidator("disableSubmitButtons", false);    
        })
    	
				.on("error.form.bv", function(e) {
						e.preventDefault();
						
		        var invalidFields = $(e.target).data("bootstrapValidator").getInvalidFields();
		        var $form         = $(e.target);
		        
		        $form.bootstrapValidator("disableSubmitButtons", false);
		        $.submitEnable($("#'. $this->_randID .'"));
		        
		        if($("body#GuiForm").size()){
		         var frame = 0;
							$(parent.document.getElementsByTagName("iframe")).each(function(iel, el) {
							  if(el.contentWindow === window){
							  	frame = $(el).offset().top;
							  }
							});
			        
			        var adminBar = ($(parent.document.getElementById("wpadminbar")).size()) ? $(parent.document.getElementById("wpadminbar")).height() : 0;
							var item =  $(".has-error").first().parents(".item").offset().top;
							
							$(parent.document.getElementsByTagName("html")[0]).animate({scrollTop: frame + item - adminBar},"slow", function(){
								$(".has-error").first().closest(".item").find("input, select, textarea").focus();
							});
							$(parent.document.getElementsByTagName("body")[0]).animate({scrollTop: frame + item - adminBar},"slow", function(){
								$(".has-error").first().closest(".item").find("input, select, textarea").focus();
							});
    			  }
		        else{
		        	var adminBar = ($(parent.document.getElementById("wpadminbar")).size()) ? $(parent.document.getElementById("wpadminbar")).height() : 0;
							var item =  $("#'. $this->_randID .' .has-error").first().parents(".item").offset().top;
							$(parent.document.getElementsByTagName("html")[0]).animate({scrollTop: item - adminBar},"slow", function(){
								$("#'. $this->_randID .' .has-error").first().closest(".item").find("input, select, textarea").focus();
							});
							$(parent.document.getElementsByTagName("body")[0]).animate({scrollTop: item - adminBar},"slow", function(){
								$("#'. $this->_randID .' .has-error").first().closest(".item").find("input, select, textarea").focus();
							});
    			  }
		     })
		    
		    .on("success.form.bv", function(e) {
					// Prevent form submission
					
					// Get the form instance
					var $form = $(e.target);
					// Get the BootstrapValidator instance
					var bv = $form.data("bootstrapValidator");
					
					$form.bootstrapValidator("disableSubmitButtons", true);
					$.submitDisable($form);
					
					if(window.FormData === undefined){
						var iframeId = "unique-" + (new Date().getTime());
						var iframe = $("<iframe style=\"width: 100%; height : 300px;\" src=\"javascript:false;\" name="+iframeId+" />");
					  
					  iframe.hide();
					  $form.attr("target", iframeId);
						$form.attr("enctype", "multipart/form-data");
						$form.attr("Content-Type", "application/octet-stream");
					  iframe.appendTo("body");
					  
					  iframe.load(function(e){
					  	var doc = $.getDoc(iframe[0]);					
							var docRoot = doc.body ? doc.body : doc.documentElement;
							var data = docRoot.innerHTML;
							
							$form.bootstrapValidator("disableSubmitButtons", false);
							
							$.submitEnable($form);
							
							if(data.indexOf( "Fatal error" ) !== -1){
								alert("Fatal error: "+ data.split("Fatal error:")[1].split(" in ")[0]);
							}
							else{
								var data = ($("pre", docRoot).html() === undefined) ?  $.parseJSON(data) : $.parseJSON($("pre", docRoot).html());
								
								if(Object.keys(data).length == 0 || data.confirmation.type == "default"){
									$("body").html("<p style=\"text-align: center;\"><span style=\"font-size: 16pt;\"><strong>Thank You!</strong></span></p> <p style=\"text-align: center;\">We will get in touch with you shortly.</p>")	
								}
								else if(data.confirmation.type == "redirect"){
									window.top.location.href = decodeURIComponent(data.confirmation.url);
								}
								else if(data.confirmation.type == "custom"){
									var html = decodeURIComponent(data.confirmation.custom.replace(/\+/g, " "));
									$("body").html("<div id=\"GuiForm-response\" style=\"display: table, margin: auto;\">"+ html.replace(/\\+/g, "") +"</div>");
									parent.document.getElementsByTagName("iframe")[0].style.maxWidth = document.getElementById("GuiForm-response")[0].offsetWidth +"px";
								}
								
								if(data.confirmation.type == "default" || data.confirmation.type == "custom"){
									
									$(parent.document.getElementsByTagName("iframe")).each(function(iel, el) {
									  if(el.contentWindow === window){
									  	frame = $(el).offset().top;
									  }
									});
									
									if(typeof frame !== "undefined"){
										var adminBar = ($(parent.document.getElementById("wpadminbar")).size()) ? $(parent.document.getElementById("wpadminbar")).height() : 0;
										$(parent.document.getElementsByTagName("html")[0]).animate({scrollTop: frame - 60}, "slow");
										$(parent.document.getElementsByTagName("body")[0]).animate({scrollTop: frame - 60}, "slow");
									}
									else{
										var adminBar = ($("#wpadminbar").size()) ? $("#wpadminbar").height() : 0;
										$("html").animate({scrollTop: $("#'. $this->_randID .' #canvas").offset().top - 60}, "slow");
										$("body").animate({scrollTop: $("#'. $this->_randID .' #canvas").offset().top - 60}, "slow");
									}
								}
							}
					  });
					}
					else{
					
						e.preventDefault();
					
						$.ajax( {
				      url: "'. admin_url("admin-ajax.php") .'?id='. $this->_id .'",
				      type: "POST",
				      data: new FormData( this ),
				      processData: false,
				      dataType: "json",
				      contentType: false,
				      success:function(data){
								
								
								$form.bootstrapValidator("disableSubmitButtons", false);
								
								$.submitEnable($form);
								
								if(data.status == "error"){
									if(data.message !== undefined)
										alert(data.message)
									else
										method.errorDisplay();
									
								}
								else if(data.confirmation.type == "default"){
									if($("body").attr("id") == "GuiForm"){
										$("body").css("padding","30px").html("<p style=\"text-align: center;\"><span style=\"font-size: 16pt;\"><strong>Thank You!</strong></span></p> <p style=\"text-align: center;\">We will get in touch with you shortly.</p>");
									}
									else{
										$("#'. $this->_randID .' #canvas").css({"padding" : "25px 0px", "margin-bottom" : "20px"}).html("<p style=\"text-align: center;\"><span style=\"font-size: 16pt;\"><strong>Thank You!</strong></span></p> <p style=\"text-align: center;\">We will get in touch with you shortly.</p>");
									}
								}
								else if(data.confirmation.type == "custom"){
									var html = decodeURIComponent(data.confirmation.custom.replace(/\+/g, " "));
									
									if($("body").attr("id") == "GuiForm"){
										$("body").html("<div id=\"GuiForm-response\" style=\"display: table, margin: auto;\">"+ html.replace(/\+/g, "") +"</div>");
										$("head link:not(#wp-tinymce-css)").remove();
										
										if(parent.document.getElementsByTagName("iframe")[0] !== undefined){
											parent.document.getElementsByTagName("iframe")[0].style.maxWidth = document.getElementById("GuiForm-response")[0].offsetWidth +"px";
										}
									}
									else{
										$("#'. $this->_randID .' #canvas").css({"padding" : "25px 0px", "margin-bottom" : "20px"}).html(html);
									}
								}
								else if(data.confirmation.type == "redirect"){
									window.top.location.href = decodeURIComponent(data.confirmation.url);
								}
								
								if(data.confirmation.type == "default" || data.confirmation.type == "custom"){
									
									$(parent.document.getElementsByTagName("iframe")).each(function(iel, el) {
									  if(el.contentWindow === window){
									  	frame = $(el).offset().top;
									  }
									});
									
									if(typeof frame !== "undefined"){
										var adminBar = ($(parent.document.getElementById("wpadminbar")).size()) ? $(parent.document.getElementById("wpadminbar")).height() : 0;
										$(parent.document.getElementsByTagName("html")[0]).animate({scrollTop: frame - 60}, "slow");
										$(parent.document.getElementsByTagName("body")[0]).animate({scrollTop: frame - 60}, "slow");
									}
									else{
										var adminBar = ($("#wpadminbar").size()) ? $("#wpadminbar").height() : 0;
										$("html").animate({scrollTop: $("#'. $this->_randID .' #canvas").offset().top - 60}, "slow");
										$("body").animate({scrollTop: $("#'. $this->_randID .' #canvas").offset().top - 60}, "slow");
									}
								}
							}
				    });
					}
					
				});
		';
	}
}