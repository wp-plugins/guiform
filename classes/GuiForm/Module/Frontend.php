<?php

// +----------------------------------------------------------------------+
// | Copyright 2013 GuiForm (email : info@guiform.com)                    |
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
 * @category GuiForm
 * @package Module
 *
 * @since 1.0
 */
class GuiForm_Module_Frontend extends GuiForm_Module {

	const NAME = __CLASS__;

	private $_id;
	
	private $_form;
	
	private $_atts = array();

	/**
	 * Constructor.
	 *
	 * @since 1.0
	 * @uses add_filter() To add "do_shortcode" hook for "widget_text" and "term_description" filters.
	 *
	 * @access public
	 * @param GuiForm_Plugin $plugin The instance of the plugin.
	 */
	public function __construct(GuiForm_Plugin $plugin){
		parent::__construct($plugin);	
		
		session_start();
		
		if(isset($_REQUEST['mv-code'])) self::_activateMail();		
		
    $this->_addAction('generate_rewrite_rules', 'rewriteRules');
    $this->_addAction('parse_request', 'parseRequest');
		$this->_addFilter('query_vars', 'filterQueryVars');
    $this->_addShortcode('GuiForm', 'renderShortCode');
    $this->_addFilter('widget_text', 'doShortCode');
	}
	
	public function doShortCode($atts){
		return do_shortcode($atts);
	}
	
	private function _activateMail(){
		global $guiform, $wpdb;
		$mv_code = esc_sql(trim($_GET['mv-code']));
		$id = $_REQUEST[$guiform->getOption('permalink')->value['value']];
		$data = $wpdb->get_row($wpdb->prepare("SELECT name, value FROM $wpdb->guiform_options WHERE id = %d", $id));
		$row = unserialize($data->value);
	
		if($row['key'] == $mv_code){
			$row['key'] = '';
			$row['status'] = 1;
			$guiform->updateOption($data->name, $row, 'mail', $id);
			$blog_id = get_current_blog_id();
			$path = "admin.php?page=guiform-settings&tab=mail";
			$path = get_admin_url( $blog_id, $path);
			
			$html = "<strong>Congratulations!</strong><br /><br />
							You can now use ". $data->name ." for sending confirmation message with your form.<br /><br />
							<a href=\"$path\">Click here to continue.</a><br /><br />";
			echo GuiForm_Module_Ajax::emailTpl($html);
		}
		else{
			$blog_id = get_current_blog_id();
			$path = "admin.php?page=guiform-settings&tab=mail";
			$path = get_admin_url( $blog_id, $path);
			
			$html = "<strong>Invalid Code!</strong><br /><br />
							You entered invalid email verification code. Please check your email or send a new verification code request.<br /><br />
							<a href=\"$path\">Click here to continue.</a><br /><br />";
			echo GuiForm_Module_Ajax::emailTpl($html);
		}
		
		die();
	}
	
	public function renderShortCode($atts){
		
		global $guiform;
		$this->_atts = $atts;
		
		$this->_id = $this->_atts['id'];
		$this->_form = $guiform->form($this->_atts['id']);

		return self::renderScript();
	}
	
	/**
	 * Add URL rewrite for form preview.
	 *
	 * @since 1.0
	 * @access public
	 */    
	public function rewriteRules($wp_rewrite){
		global $guiform;
	  $new_rules = array($guiform->permalink['value'] ."/(.+)" => "index.php?". $guiform->permalink['value'] ."=". $wp_rewrite->preg_index(1));	
	  $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
	}
	
	/**
	 * filter slugs.
	 *
	 * @since 1.0
	 * @access public
	 * @return $query_vars array
	 */
	public function filterQueryVars($query_vars) {
		global $guiform;
	  $query_vars[] = $guiform->permalink['value'];
	  return $query_vars;
	}
	
	private function _accessControl(){
		if(isset($_SERVER['HTTP_ORIGIN'])){
			header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
			header('Access-Control-Allow-Credentials: true');
			header('Access-Control-Max-Age: 86400');    // cache for 1 day
		}
	}
	
	public function parseRequest(&$wp){
		global $wpdb, $guiform, $wp;
		
		self::_accessControl();
		
		GuiForm_Module_Setup::flushRewrite();
		
		$query = $wp->query_vars[$guiform->permalink['value']];
		
		$this->_id = (strpos($query, 'js') !== false) ? preg_replace('/\D/', '', $query) : $query;
		
		if( array_key_exists( $guiform->permalink['value'], $wp->query_vars ) || in_array( $guiform->permalink['value'], $wp->query_vars ) ) {
	    
	    if(isset($_REQUEST['param']) && is_array($_REQUEST['param'])) $param = array_map('esc_sql', $_REQUEST['param']);
			
	    $this->_atts = array('responsive' => isset($param['responsive']) ? $param['responsive'] : 'all');
									   
			$this->_form = $guiform->form($this->_id);
					   
			if (strpos($query, 'js') !== false){
				$this->_atts['js'] = true;
				header("content-type: application/javascript");
				echo self::renderScript();
			}
			else{
				$this->_atts['js'] = false;
				echo self::renderForm();
			}
			
	  	die();
	  }
		
	}
	
	/**
	 * Enqueue footer jquery library.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function footerScript($js){
		global $guiform;
		
		echo '<script src="'. includes_url('js/jquery/jquery.js') .'" type="text/javascript"></script>'."\n";
		echo '<script src="'. includes_url('js/jquery/jquery-migrate.min.js') .'" type="text/javascript"></script>'."\n";
		echo '<script src="'. includes_url('js/jquery/ui/jquery.ui.core.min.js') .'" type="text/javascript"></script>'."\n";
		echo '<script src="'. includes_url('js/jquery/ui/jquery.ui.widget.min.js') .'" type="text/javascript"></script>'."\n";
		echo '<script src="'. includes_url('js/jquery/jquery.ui.touch-punch.js') .'" type="text/javascript"></script>'."\n";
		echo '<script src="'. $guiform->assets('js/jquery.maskedinput.min.js') .'" type="text/javascript"></script>'."\n";
		
		if(sizeof($js) > 0){
				
			if($js['time_picker'] || $js['datetime_picker'] || $js['slider']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.mouse.min.js');
			
			//Print datepicker and timepicker script.
			if($js['time_picker'] || $js['datetime_picker'] || $js['slider']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.slider.min.js');
			if($js['time_picker'] || $js['datetime_picker']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.datepicker.min.js');
			if($js['time_picker'] || $js['datetime_picker']) self::_include('assets', 'js/jquery-ui-timepicker-addon.js');
			
			//Print pagebreak script.
			if($js['page_break'] || $js['switch']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.effect.min.js');
			if($js['page_break']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.effect-slide.min.js');
			if($js['page_break']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.effect-highlight.min.js');
			
			//Print pagebreak script.
			if($js['folding']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.accordion.min.js');
			
			//Print colorpicker script.
			if($js['color_picker']) self::_include('vendor', 'spectrum/spectrum.js');
			
			//Print spinner script.
			if($js['spinner'] || $js['button']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.button.min.js');
			if($js['spinner']) self::_include('includes_url', 'js/jquery/ui/jquery.ui.spinner.min.js');
			
			//Print switch button script.
			if($js['switch']) self::_include('assets', 'js/jquery.switchButton.js');
			
		}
		
		echo '<script type="text/javascript">'."\n";
		echo '/* &lt;![CDATA[ */'."\n";
		echo self::wp_localize_script() ."\n";
		echo '/* ]]&gt; */'."\n";
		echo '</script>'."\n";
		echo '<script src="'. $guiform->assets('js/guiform-form.js?ver='. GuiForm_Plugin::VERSION) .'" type="text/javascript"></script>'."\n";
			
	}
	
	private function _include($type, $path, $extension = 'js'){
		global $guiform;
		
		if($type == 'includes_url') $url = call_user_func($type, $path);
		if($type == 'assets') $url = $guiform->assets($path);
		if($type == 'vendor') $url = $guiform->vendor($path);
		
		if($extension == 'js'){
			echo '<script src="'. $url .'?ver='. GuiForm_Plugin::VERSION .'" type="text/javascript"></script>'."\n";	
		}
		else{
			echo '<link rel="stylesheet"  href="'. $url .'?ver='. GuiForm_Plugin::VERSION .'" type="text/css" media="all" />'."\n";	
		}	
	}
	
	private function wp_localize_script(){
  	global $guiform;
  	
		$object = array(
		  'nonce'    => wp_create_nonce("guiform_nonce"),
		  'ajax_url' => admin_url('admin-ajax.php'),
		  'images'   => $guiform->assets('images'),
		  'today'    => date('j', time()),
		  'form_id'  => $this->_id
		);
		
		return "guiform = ". json_encode($object);
	}
	
	private function _varCondition($condition = "==", $var1, $var2 = false){
		if($condition == "is_empty")
			return empty($var1);
		else if($condition == "is_filled")
			return !empty($var1);
		else if($condition == "==")
			return $var1 == $var2;
		else if($condition == "!=")
			return $var1 != $var2;
		else if($condition == ">")
			return $var1 > $var2;
		else if($condition == "<")
			return $var1 < $var2;
		else if($condition == ">=")
			return $var1 >= $var2;
		else if($condition == "<=")
			return $var1 <= $var2;
		else if($condition == "in_array")
			return in_array($var1, $var2);
		else if($condition == "contains")
			return strpos($var1, $var2);
		else if($condition == "starts_with")
			return substr($var1, 0, strlen($var2)) === $var2;
		else if($condition == "ends_width"){
			$length = strlen($var2);
			return !$length || substr($var1, - $length) === $var2;
		}
	}		
	
	public function renderForm(){
		global $guiform, $wpdb;
		
		$unique_id = rand();
				
		?>
		<!DOCTYPE html>
		<html>
		<head>
		<title><?php echo $this->_form->title; ?></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="HandheldFriendly" content="true">
		
		<link rel="stylesheet"  href="<?php echo $guiform->vendor('jquery-ui/css/custom-theme/jquery-ui-1.9.2.custom.min.css'); ?>" type="text/css" media="all" />			
		
		<?php 
			//Print colorpicker style.
			$include = unserialize($this->_form->include);
			if($include['color_picker']) self::_include('vendor', 'spectrum/spectrum.css', 'css');
		
		  echo "<link href='". includes_url('js/tinymce/skins/lightgray/content.min.css') ."'  rel='stylesheet' type='text/css'>";
		?>
		
		<link rel="stylesheet"  href="<?php echo $guiform->assets('fonts/icons.css'); ?>" type="text/css" media="all" />
						
		<link rel="stylesheet"  href="<?php echo $guiform->assets('fonts/icons.css'); ?>" type="text/css" media="all" />
		<link rel="stylesheet"  href="<?php echo $guiform->assets('css/guiform.css?ver='. GuiForm_Plugin::VERSION); ?>" type="text/css" media="all" />			
		
		<?php if(($guiform->browser->isMobile() && $this->_atts['responsive'] == 'mobile') || $this->_atts['responsive'] == 'all' || $this->_atts['responsive'] == 'desktop'): ?>
			<link id="responsive-style" rel="stylesheet" href="<?php echo $guiform->assets('css/responsive.css?ver='. GuiForm_Plugin::VERSION); ?>" type="text/css" media="all" />
		<?php endif; ?>
		
		</head>
		<body id="GuiForm" <?php echo (isset($_GET['preview'])) ? " style='padding-top: 35px;'" : ''; ?>>
		<?php if(!empty($this->_form->html)): ?>
			<!--div style="padding: 20px 0; text-align: center;" id="guiform-loader"><img src="<?php echo $guiform->assets('images/save-loader.gif'); ?>"></div-->
			<form class="GuiForm" enctype="multipart/form-data"  name="guiform" id="GuiForm_<?php echo $unique_id; ?>" method="POST" action="<?php echo admin_url("admin-post.php?id=". $this->_id); ?>">
				<input type="hidden" value="<?php echo $unique_id; ?>" name="guiform_unique">
				<input type="hidden" value="guiform-save-entry" name="guiform_save_entry">
				<?php
				  wp_nonce_field('guiform_nonce','guiform_nonce');
				  $content = $this->_form->html;
				  $styles = array();
				  $count = 0;
				  preg_match_all('/<style.*?\>(.*?)<\/style>/si', $content, $matches);
					foreach($matches[1] as $string){
						$styles['guiform_replacement_style_'. $count] = $string;
						$content = str_replace($string, 'guiform_replacement_style_'. $count++, $content);
					}
					
					$content = self::_valueReplace($content);	
					$content = self::_strReplace($content);	
					
					foreach($styles as $key => $style){
						$content = str_replace($key, $style, $content);
					}
					
					echo $content;			
				?>
			</form>
		<?php endif; ?>
		
		<?php self::footerScript(unserialize($this->_form->include));	?>
		
		</body>
		</html>
		<?php
	}
	
	private function _vars($values, $method){
		global $guiform;
		
		$user = wp_get_current_user();
		
		$vars = array('user'    => array('id' => $user->ID,
																		 'username' => $user->user_login,
																		 'email' => $user->user_email,
																		 'firstname' => $user->user_firstname,
																		 'lastname' => $user->user_lastname,
																		 'display_name' => $user->display_name),
									'current' => array('IP' => $guiform->ip,
																		 'OS' => $guiform->os,
																		 'browser' => $guiform->browser->getBrowser()
																		),
									'post'    => array_map('esc_sql', $_POST),							
									'get'     => array_map('esc_sql', $_GET)
						);
		
		$types = array('user', 'current', 'post', 'get', 'request', 'server', 'session', 'date');				
		$array = explode('|', $values);
		$output = array();
		
		foreach($array as $rows){
			$row = explode('_', $rows);
			$key = $row[0];
			unset($row[0]);
			$value = implode('_', $row) ;
			
			if(!in_array($key, $types))
				$output[] = $rows;
			else if($key == 'date')
				$output[] = date(trim($value, '[]'));
			else if(isset($vars[$key][trim($value, '[]')]))
				$output[] = $vars[$key][trim($value, '[]')];
			else
				$output[] = '';
		}				
		
		if($method == 'value'){
			return '['.implode('|', $output).']';
		}
		else if($method == 'string'){
			foreach($output as $value){
				if($value != ''){
					return $value;
				}
			}
		}
		else{
			return '{'.implode('|', $output).'}';
		}
	}
	
	private function _strReplace($content){
		global $guiform;
		
		$keys = array('current', 'user', 'session', 'post', 'get', 'request', 'server', 'date');
		
		preg_match_all('/[^{]+(?=\})/', $content, $matches );
		
		foreach($matches[0] as $string){
			$content = str_replace("{{$string}}", self::_vars($string, 'string'), $content);
		}
		
		return $content;
	}
	
	private function _valueReplace($content){
		global $guiform;
		
		$content = preg_replace("/[\\n\\r]+/", "", $content);
		$content = trim(preg_replace('/\s\s+/', '', $content));
		$content = str_replace('option><option', "option>\n<option", GuiForm_Module_Format::HTML($content));

		$keys = array('current', 'user', 'session', 'post', 'get', 'request', 'server', 'date');
		//preg_match_all('/[^{]+(?=\})/', $content, $matches );
		preg_match_all("/(?<=data-default=(\"|'))[^\"']+(?=(\"|'))/", $content, $matches );
		
		foreach($matches[0] as $string){
			preg_match_all('/[^{]+(?=\})/', $string, $output );
			foreach($output[0] as $value){
				$content = str_replace("{{$value}}", self::_vars($value, 'value'), $content);
			}
		}
		
		return stripslashes($content);
	}
	
	private function _getFormContent(){
		ob_start();
		self::renderForm();
		$view = ob_get_contents();
		ob_end_clean();
		
		global $guiform;
		
		$content = $view;
		$content = str_replace('"', '\\"', $content);
		$content = str_replace('/', '\/', $content);
		$content = preg_replace("/[\\n\\r]+/", "", $content);
		$content = preg_replace("/[\\t]+/", "", $content);
		$content = str_replace('> <', '><', $content);
		$content = "$content";
		
		return $content;
	}
	
	public function renderScript(){
		global $guiform;

		ob_start();
		
		if($this->_atts['js'] == false) echo '<script type="text/javascript">';
		
		?>
/*!
 * GuiForm Plugin
 * https://www.guiform.com
 *
 * By: Russell C. Pabon
 * http://russellpabon.com
 *
 */
 
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
 
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
    this.iframe = document.getElementById(this.Id);
    this.interval = setTimeout(function(){
    	self.resizeHeight();
    	self.resizeWidth();
    	self.setTimer();
    },this.timeInterval);
    this.timeInterval = 1;
  };
  
  this.resizeWidth = function(){
	  	var F = document.getElementById(this.Id);
	  	try{
		  	var maxWidth = F.contentWindow.document.getElementById("canvas").style.maxWidth;
		  	F.style.maxWidth = maxWidth;
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
      
      F.style.height = (isSafari) ? height + 10 +'px' : height +'px';
      
    }catch(e){ }            
	}
	
	
	this.buidFrame = function(){
		this.Id = 'GuiForm-'+Math.floor(Math.random() * 90000);
    var htmlCode = "<i"+"frame id=\""+this.Id+"\" src=\"<?php echo $guiform->permalink($this->_form->id, $this->_atts['responsive'], false); ?>\" onload=\"window.parent.scrollTo(0,0)\" allowtransparency=\"true\" frameborder=\"0\" style=\"display: inline; height: auto; width: 100%; border:none;\" scrolling=\"no\"></i"+"frame>";
		document.write(htmlCode);
		this.iframe = document.getElementById(this.Id);
		this.iframe.style.height = 'auto';
		this.setTimer();
	};
	
	this.init();
}

var guiform = new GuiForm();
		
		<?php
		if($this->_atts['js'] == false) echo '</script>';
		$view = ob_get_contents();
		ob_end_clean();
		return $view;
	}
}