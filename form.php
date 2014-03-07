<?php
	$id = $atts['id'];
	$row = $wpdb->get_row($wpdb->prepare("SELECT html FROM $wpdb->guiform WHERE id = %d", $id ));
	$rand = rand(10e16, 10e20);
	$frameID = base_convert($rand, 10, 36);
	
	if(isset($_GET['view'])){
		ob_start();
		include "view.php";
		$view = ob_get_contents();
		ob_end_clean();
		
		$content = $view;
		$content = str_replace('"', '\\"', $content);
		$content = str_replace('/', '\/', $content);
		//$content = trim(preg_replace('/\s\s+/', ' ', $content));
		$content = preg_replace("/[\\n\\r]+/", "", $content);
		$content = str_replace('> <', '><', $content);
		$content = "$content";
	}
	
if(!isset($atts['js'])){
	echo "<script type='text/javascript'>";
}
else{
	header("Content-Type:text/plain");
}


if(in_array($atts['responsive'], $atts)){
	$preview = $this->permalink($id, $atts['responsive'], false);
}
else{
	$preview = $this->permalink($id, '', false);
}

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
    	self.resizeWidth();
    	self.setTimer();
    },this.timeInterval);
    this.timeInterval = 1;
  };
  
  this.resizeWidth = function(){
	  	var F = this.iframe;
	  	try{
		  	var width = F.contentWindow.document.getElementById("canvas").style.width;
		  	F.style.width = width;
	  	}catch(e){ }     
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
    var htmlCode = "<i"+"frame id=\""+this.Id+"\" src=\"<?php echo $preview; ?>\" onload=\"window.parent.scrollTo(0,0)\" allowtransparency=\"true\" frameborder=\"0\" style=\"display: inline; height: auto; width: auto; border:none;\" scrolling=\"no\"></i"+"frame>";
		document.write(htmlCode);
		this.iframe = document.getElementById(this.Id);
		this.iframe.style.height = 'auto';
		this.addFrameContent();
	};
	
	this.addFrameContent = function(){
		var frame = this.iframe;
		<?php if(isset($_GET['view'])): ?>
		var doc = frame.contentDocument ? frame.contentDocument : (frame.contentWindow.document || frame.document);
		doc.open();
		doc.write("<?php echo $content; ?>");
		doc.close();
		<?php endif; ?>
		this.setTimer();
	}
	
	this.init();
}

var guiform = new GuiForm();

<?php if(!isset($atts['js'])): ?>
	</script>
<?php endif; ?>