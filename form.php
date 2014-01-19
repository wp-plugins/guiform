<?php

	$id = absint(trim($query[1]));
	$html = $wpdb->get_results($wpdb->prepare("SELECT html FROM $wpdb->guiform WHERE id = %d", 2));
	$rand = rand(10e16, 10e20);
	$frameID = base_convert($rand, 10, 36);
	$preview = $this->permalink() ."$id?type=plain";
	$content = file_get_contents($preview);
	$content = str_replace('"', '\\"', $content);
	$content = str_replace('/', '\/', $content);
	//$content = trim(preg_replace('/\s\s+/', ' ', $content));
	$content = preg_replace("/[\\n\\r]+/", "", $content);
	$content = str_replace('> <', '><', $content);
	$content = "$content";
		
?>

/*!
 * GuiForm Plugin
 * https://www.guiform.com
 *
 * By: Russell C. Pabon
 * http://russellpabon.com
 *
 */
 
function GuiForm(){

	this.Id = '';
	this.iframe = null;
	this.content = "";
	this.timeInterval = 100;
	
	this.init = function(){
		this.buidFrame();
	};
	
	this.setTimer = function(){
    var self = this;
    this.interval = setTimeout(function(){
    	self.resizeHeight();
    	self.setTimer();
    },this.timeInterval);
    this.timeInterval = 1;
  };
  
  this.resizeHeight = function(){
    var F = this.iframe;
    var height;
    
    try{
			if(F.contentWindow.document.height){
                
         height = F.contentWindow.document.height;
          
         if(F.contentWindow.document.body.scrollHeight){
             height = F.contentWindow.document.body.scrollHeight;
         }
          
         if(F.contentWindow.document.body.offsetHeight){
             height = F.contentWindow.document.body.offsetHeight;
         }
      }
      else if(F.contentWindow.document.body){
          
         if(F.contentWindow.document.body.scrollHeight){
              height = F.contentWindow.document.body.scrollHeight;
         }
          
         if(F.contentWindow.document.body.offsetHeight){
              height = F.contentWindow.document.body.offsetHeight;
         }
      }  
      
      F.style.height = height +'px';
      
    }catch(e){ }            
	}
	
	this.buidFrame = function(){
		this.Id = 'GuiForm-'+Math.floor(Math.random() * 90000);
    var htmlCode = "<i"+"frame id=\""+this.Id+"\" onload=\"window.parent.scrollTo(0,0)\" allowtransparency=\"true\" frameborder=\"0\" style=\"width:100%; height: auto; border:none;\" scrolling=\"no\"></i"+"frame>";
		document.write(htmlCode);
		this.iframe = document.getElementById(this.Id);
		this.iframe.style.height = 'auto';
		this.addFrameContent();
		
	};
	
	this.addFrameContent = function(){
		var frame = this.iframe;
		var doc = frame.contentDocument ? frame.contentDocument : (frame.contentWindow.document || frame.document);
		doc.open();
		doc.write("<?php echo $content; ?>");
		doc.close();
		this.setTimer();
	}
	
	this.init();
}

var guiform = new GuiForm();