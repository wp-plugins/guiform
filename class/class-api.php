<?php

// API Class		
class GuiForm_API{

	public $skin = 'green';
	
	/**
	 * Get operating system used.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $os;
	
	/**
	 * Get IP address used.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $ip;
	
	/**
	 * Get browser used.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $browser;
	
	/**
	 * Get user agent used.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $user_agent;
	
	/**
	 * Server request time.
	 *
	 * @since 1.0
	 * @var time
	 * @access public
	 */
	public $request_time;
	
	/**
	 * Temporary folder.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $temp_folder;
	
	/**
	 * Upload folder.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $upload_folder;
	
	/**
	 * Temporary folder categorize by date.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	private $temp_dir_now;
	
	/**
	 * Form url.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $permalink;
	
	/**
	 * Root folder.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $root_folder = ABSPATH;
	
	/**
	 * Plugin version.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $version = GUIFORM_VERSION;
	
	/**
	 * Server URI.
	 *
	 * @since 1.0
	 * @var string
	 * @access public
	 */
	public $server = GUIFORM_SERVER;
	
	/**
	 * Constructor.
	 *
	 * @access public
	 */
	function __construct(){
		$this->_init();
	}
	
	/**
	 * Initialize variables.
	 *
	 * @since 1.0
	 * @access public
	 */
 	private function _init(){
		$this->request_time  = esc_html($_SERVER['REQUEST_TIME']);
		$this->user_agent    = esc_html($_SERVER["HTTP_USER_AGENT"]);
		$this->permalink     = $this->get_option(0, 'permalink');
		$this->ip            = $this->_ip();
		$this->os            = $this->_os();
		$this->mobile        = $this->_mobile();
		$this->desktop       = $this->_desktop();
		$this->browser       = $this->_browser();
		$this->upload_folder = $this->_upload_folder();
		$this->temp_folder   = $this->_temp_folder();
		$this->temp_dir_now  = $this->temp_folder.'/'.date('Y').'/'.date('n').'/'.date('j').'/';
	}
	
	/**
	 * Upload folder.
	 *
	 * @since 1.0
	 * @access public
	 * @return $url string
	 */
	public function upload_folder($file = "", $path = "", $link = false){
		$url = ($link) ? get_site_url() .'/'. $this->get_option(0, 'upload_folder') : $this->root_folder .'/'. $this->get_option(0, 'upload_folder');
		return $url .'/'. $path.'/'.$file;
	}
	
	/**
	 * Check upload folder setting.
	 *
	 * @since 1.0
	 * @access private
	 * @return string
	 */
	private function _upload_folder(){
		return $this->root_folder.$this->get_option(0, 'upload_folder');
	}
	
	/**
	 * Check database server setting.
	 *
	 * @since 1.0
	 * @access public
	 * @return array
	 */
	public function server($form){
		$db = $this->database($form);
		if($db == 0){
			return array('host' => 'localhost'); 
		}
		else{
			return unserialize($this->get_option($db));
		}
	}
	
	/**
	 * Convert string to integer.
	 *
	 * @since 1.3.1
	 * @access public
	 * @return integer
	 */
	public function int($s){
		return(int)preg_replace('/[^\-\d]*(\-?\d*).*/', '$1', $s);
	}
	
	/**
	 * Check operating system.
	 *
	 * @since 1.0
	 * @access private
	 * @return $os string
	 */
	private function _os(){
		$os    =   'Unknown OS';
    $os_array       =   array (
		    '/wpdesktop/i'          => 'Windows Phone',
		    '/zunewp7/i'            => 'Windows Phone',
   			'/windows phone/i'      => 'Windows Phone',
        '/windows nt 6.2/i'     => 'Windows 8',
        '/windows nt 6.1/i'     => 'Windows 7',
        '/windows nt 6.0/i'     => 'Windows Vista',
        '/windows nt 5.2/i'     => 'Windows Server 2003/XP x64',
        '/windows nt 5.1/i'     => 'Windows XP',
        '/windows xp/i'         => 'Windows XP',
        '/windows nt 5.0/i'     => 'Windows 2000',
        '/windows me/i'         => 'Windows ME',
        '/win98/i'              => 'Windows 98',
        '/win95/i'              => 'Windows 95',
        '/win16/i'              => 'Windows 3.11',
        '/macintosh|mac os x/i' => 'Mac OS X',
        '/mac_powerpc/i'        => 'Mac OS 9',
        '/linux/i'              => 'Linux',
        '/ubuntu/i'             => 'Ubuntu',
        '/iphone/i'             => 'iPhone',
        '/ipod/i'               => 'iPod',
        '/ipad/i'               => 'iPad',
        '/android/i'            => 'Android',
        '/blackberry/i'         => 'BlackBerry',
        '/webos/i'              => 'Mobile',
        '/gecko\/18.0/i'        => 'Firefox OS'
    );

    foreach($os_array as $regex => $value){ 
    	if(preg_match($regex, $this->user_agent)) $os = $value;
    }   

    return $os;
	}
	
	/**
	 * List of desktop operating system.
	 *
	 * @since 1.4.1
	 * @access private
	 * @return array
	 */
	private function _desktop(){
    return array ('Unknown OS',
							    'Windows 8',
							    'Windows 7',
							    'Windows Vista',
							    'Windows Server 2003/XP x64',
							    'Windows XP',
							    'Windows 2000',
							    'Windows ME',
							    'Windows 98',
							    'Windows 95',
							    'Windows 3.11',
							    'Mac OS X',
							    'Mac OS 9',
							    'Linux',
							    'Ubuntu'
							    );
	}
	
	/**
	 * List of moble device operating system.
	 *
	 * @since 1.4.1
	 * @access private
	 * @return array
	 */
	private function _mobile(){
    return array('Unknown OS',
								 'Windows Phone',
								 'iPhone',
								 'iPod',
								 'iPad',
							   'Android',
								 'BlackBerry',
								 'Mobile',
								 'Firefox OS'
								 );
	}
	
	/**
	 * Check browser name.
	 *
	 * @since 1.0
	 * @access private
	 * @return #browser string
	 */
	private function _browser(){
		$browser        =   "Unknown Browser";
    $browser_array  =   array (
        '/msie/i'       => 'Internet Explorer',
        '/firefox/i'    => 'Firefox',
        '/safari/i'     => 'Safari',
        '/chrome/i'     => 'Chrome',
        '/opera/i'      => 'Opera',
        '/netscape/i'   => 'Netscape',
        '/maxthon/i'    => 'Maxthon',
        '/konqueror/i'  => 'Konqueror',
        '/mobile/i'     => 'Handheld Browser'
    );

    foreach($browser_array as $regex => $value){ 
    	if(preg_match($regex, $this->user_agent)) $browser = $value;
    }

    return $browser;
	}
	
	/**
	 * Get form entry result.
	 *
	 * @since 1.0
	 * @access public
	 * @return $entry array
	 */
	public function entry($form, $entry){
		global $wpdb;
		if(!empty($form) && !empty($entry)){
  		$entry = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform_form$form WHERE id = %d", $entry), ARRAY_A);
			return $entry;
		}
	}
	
	/**
	 * Email template.
	 *
	 * @since 1.0
	 * @access public
	 * @return string
	 */
	public function email_tpl($html){
		return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
						<html xmlns=\"http://www.w3.org/1999/xhtml\">
						<head>
						<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
						</head>
						<body style=\"background-color: #e5e5e5;\">
						<table width=\"100%\" style=\"width: 100%; background-color: #e5e5e5;\" align=\"center\" bgcolor=\"#e5e5e5\" cellpadding=\"0\" cellspacing=\"0\">
							<tbody>
								<tr>
									<td cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%; background-color: #e5e5e5; padding: 30px 0px 30px 0px;\" align=\"center\" bgcolor=\"#e5e5e5\" width=\"100%\">
										<table align=\"center\" width=\"600\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
											<tr>
												<td valign=\"top\" width=\"600\" height=\"11\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
													<img src=\"http://cdn.guiform.com/email/images/top.png\" width=\"600\" height=\"11\" style=\"border:none; display:block;\" />
												</td>
											</tr>
											<tr>
												<td bgcolor=\"#FFFFFF\" align=\"center\" valign=\"top\" width=\"600\" height=\"280\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
													<table height=\"250\" align=\"center\" width=\"570\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
														<tr>
															<td height=\"250\"  align=\"center\" width=\"570\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-family:'Cambria',Helvetica,sans-serif; color:#000000; font-size:15px; line-height:1.5em; text-align:justify;\">$html</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td valign=\"top\" width=\"600\" height=\"11\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
													<img src=\"http://cdn.guiform.com/email/images/bottom.png\" width=\"600\" height=\"11\" style=\"border:none; display:block;\" />
												</td>
											</tr>
											<tr>
												<td valign=\"top\" width=\"600\" height=\"38\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
													<img src=\"http://cdn.guiform.com/email/images/shadow.png\" width=\"600\" height=\"38\" style=\"border:none; display:block;\" />
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						</body>
						</html>";
	}
	
	/**
	 * Check value if serialize array.
	 *
	 * @since 1.0
	 * @access public
	 * @return string
	 */
	public function is_serial($string) {
    return (@unserialize($string) !== false || $string == 'b:0;');
	}
	
	/**
	 * Check database setting.
	 *
	 * @since 1.0
	 * @access public
	 * @return $db array
	 */
	public function database($id){
		global $wpdb;
		$db =  $wpdb->get_var($wpdb->prepare("SELECT `database` FROM $wpdb->guiform WHERE id = %d", $id), 0);
		return !empty($db) ? $db : 0; 
	}
	
	/**
	 * Check array key column and value.
	 *
	 * @since 1.0
	 * @access public
	 * @return $db array
	 */
	public function array_column($array, $colName, $key){
	  $results=array();
	  if(!is_array($array)) return $results;
	  foreach($array as $child){
      if(!is_array($child)) continue;
    	if(!is_array($colName)){
        $results[$child[$key]] = $child[$colName];
      }
      else{
      	foreach($colName as $name){
      		$results[$child[$key]][] = $child[$name];
      	}
      }
	  }
	  return $results;
  }
	
	/**
	 * Get form datas.
	 *
	 * @since 1.0
	 * @access public
	 * @return $db array
	 */
	public function guiform($id, $type = ""){
		global $wpdb;
		if(empty($type))
  		return $wpdb->get_results("SELECT * FROM $wpdb->guiform");
  	else if($type == "row")
  		return $this->form($id);
  	else if($type == "data")
  		return unserialize($wpdb->get_var($wpdb->prepare("SELECT `data` FROM $wpdb->guiform WHERE id = %d", $id)));
  	else if($type == "init")
  		return unserialize($wpdb->get_var($wpdb->prepare("SELECT `init` FROM $wpdb->guiform WHERE id = %d", $id)));
  }
  
  public function form($id){
  	global $wpdb;
  	return $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform WHERE id = %d", $id), OBJECT);
  }
  
  /**
	 * Add options settings.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function add_option($name, $value, $type = 'text'){
		$value = (is_array($value)) ? serialize($value) : $value;
		$wpdb->insert($wpdb->guiform_options, 
	  					 array('type' => $type, 
				  					 'name' => $name, 
				  					 'value' => $value), 
	  					 array('%s', '%s', '%s')
    				 ); 
	}
	
	/**
	 * Get options settings.
	 *
	 * @since 1.0
	 * @access public
	 * @return $option array
	 */
	public function get_option($id, $name = ""){
		global $wpdb;
		
		if($id != 0 || !empty($name)){
			if($id == 0){
				$key = 'name';
				$value = $name;
				$type = '%s';
			}
			else{
				$key = 'id';
				$value = $id;
				$type = '%d';
			}
			
			$option = $wpdb->get_row($wpdb->prepare("SELECT value FROM $wpdb->guiform_options WHERE $key = $type", $value), ARRAY_A);
			
			if(empty($option['value']) && $option['value'] !== '0'){
				return false;
			}
			else if($this->is_serial($option['value'])){
				return unserialize($option['value']);
			}
			else{
				return $option['value'];
			}
		}
	}
	
	public function formatBytes($size){
		return $size*pow(1024,2);
	}
	
	public function bytesToSize($bytes){
		$sizes = array('Bytes', 'KB', 'MB', 'GB', 'TB');
		if ($bytes == 0) return '';
		$i = intval(floor(log($bytes) / log(1024)));
		if ($i == 0) return $bytes . ' ' . $sizes[$i]; 
		return round(($bytes / pow(1024, $i)),1,PHP_ROUND_HALF_UP). ' ' . $sizes[$i];
	}
	
	/**
	 * Check if option name is existing.
	 *
	 * @since 1.0
	 * @access public
	 * @return string
	 */
	public function unique_option($key, $field, $type){ 
  	global $wpdb;
  	if(count($wpdb->get_row("SELECT name FROM $wpdb->guiform_options WHERE name = '$key' AND type = '$type'", ARRAY_N)) > 0){
  		return "$key is already exist.";
  	}
  }
	
	/**
	 * Update option setting.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function update_option($id, $name, $data){
		global $wpdb;
		
		if($id == 0){
			$key = 'name';
			$value = $name;
		}
		else{
			$key = 'id';
			$value = $id;
		}
		
		$data = (is_array($data)) ? serialize($data) : $data;
		
		$wpdb->update($wpdb->guiform_options, 
										array('name'  => $name, 'value' => $data), 
										array($key => $value), 
										array('%s', '%s'), 
										array('%s')
									);
						
		//Update variables.				
		$this->_init();
	}
	
	/**
	 * Get the URL of the form.
	 *
	 * @since 1.0
	 * @access public
	 * @return $link string
	 */
	public function permalink($param1 = "", $param2 = "", $query = true){
		$_REQUEST['responsive'] = $param2;
	
		if(get_option('permalink_structure')){
			$and = "?";
  		$link = get_site_url() ."/". $this->permalink['value'] ."/".$param1. (($param2 != "") ? $and.http_build_query(array('param' => $_REQUEST)) : '');
  	}
  	else{
  		$and = "&";
  		$link = get_site_url() ."/?". $this->permalink['value'] ."=".$param1. (($param2 != "") ? $and.http_build_query(array('param' => $_REQUEST)) : '');
  	}
  	
  	return (strpos($param2, 'js/') !== false || $query == false) ? $link : $link.$and.http_build_query(array('param' => $_REQUEST));
	}
	
	/**
	 * Temporary folder.
	 *
	 * @since 1.0
	 * @access private
	 * @return string
	 */
	private function _temp_folder(){
		return $this->root_folder ."temp";
	}
	
	/**
	 * Temporary file directory.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function temp_file_upload($file){
		file_put_contents(
			$this->temp_dir($file),
			file_get_contents('php://input')
		);
	}
	
	/**
	 * Temporary file directory.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function temp_dir($file){
		
		$dir = $this->temp_folder;
		$upload_dir = $this->upload_folder;
		$day = explode('-', $file);
		
		$var = array(
						date('Y'), // Year
						date('n'), // Month
						$day[0]       // day
					 );
					 
		if(!file_exists($dir)){
			mkdir($dir);
		}
					 
		foreach($var as $folder){
			$dir = $dir.'/'.$folder;
			if(!file_exists($dir)){
				mkdir($dir);
			}
		}
		
		$this->create_upload_dir();
		
		return $dir .'/'. $file;
	}
	
	public function create_upload_dir(){
		
    $upload_dir = $this->upload_folder;
    
    if(!file_exists($upload_dir)){
			mkdir($upload_dir);
		}
    
		$var = array(
						date('Y'), // Year
						date('n'), // Month
						date('j')  // day
					 );
					 
		$dir = implode("/", $var);	
		if(!file_exists($upload_dir.'/'.$dir)){				
			foreach($var as $folder){
				$upload_dir = $upload_dir.'/'.$folder;
				if(!file_exists($upload_dir)){
					mkdir($upload_dir);
				}
			}
		}
	}
	
	/**
	 * Generate random string.
	 *
	 * @since 1.0
	 * @access public
	 * @return $string string
	 */
	public function random_string($length = 15){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $string = '';
    for ($i = 0; $i < $length; $i++) {
    	$string .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $string;
	}
	
	/**
	 * Check user IP address.
	 *
	 * @since 1.0
	 * @access private
	 * @return $ipaddress string
	 */
	private function _ip(){
		$ipaddress = '';
		if (getenv('HTTP_CLIENT_IP'))
		   $ipaddress = getenv('HTTP_CLIENT_IP');
		else if(getenv('HTTP_X_FORWARDED_FOR'))
		   $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
		else if(getenv('HTTP_X_FORWARDED'))
		   $ipaddress = getenv('HTTP_X_FORWARDED');
		else if(getenv('HTTP_FORWARDED_FOR'))
		   $ipaddress = getenv('HTTP_FORWARDED_FOR');
		else if(getenv('HTTP_FORWARDED'))
		  $ipaddress = getenv('HTTP_FORWARDED');
		else if(getenv('REMOTE_ADDR'))
		   $ipaddress = getenv('REMOTE_ADDR');
		else
		   $ipaddress = 'UNKNOWN';
		
		return $ipaddress; 
	}
	
	/**
	 * Send email.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function mailer($id, $type = 'mail', $init = array()){
		
		global $wpdb;
		$subject = "";
		$MsgHTML = "";
		
		
		// Make sure the PHPMailer class has been instantiated 
		// (Re)create it, if it's gone missing
		if ( !is_object( $phpmailer ) || !is_a( $phpmailer, 'PHPMailer' ) ) {
			require_once ABSPATH . WPINC . '/class-phpmailer.php';
			require_once ABSPATH . WPINC . '/class-smtp.php';
			$phpmailer = new PHPMailer(TRUE);
		}
		
		if($type == 'mail'){
			$data = $this->get_option(0, $init['sender']);
			$row = $data;
			
			if($init['type'] == 'notification'){
				$init['message'] = str_replace("\\r\\n", "<br />", $init['message']);
				$init['message'] = stripslashes(stripslashes(stripslashes($init['message'])));
			}
			
			$AddAddress = $init['mailto'];
			$subject = $init['subject'];
			//Do not remove &nbsp and break.
			$MsgHTML = $init['message'] ." &nbsp; <br />"; 
			$init['sender'] = trim($init['sender'], '{}');
			$phpmailer->SetFrom($init['sender']);
			
		}
		else if($type == 'test-mail'){
			$data = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $id));
		  $row = unserialize($data->value);
			$AddAddress = $data->name;
			$subject = __('GuiForm - Test Mail', 'guiform');
			$html = "<strong>Greetings!</strong><br /><br />
							This is a test email generated by the GuiForm WordPress plugin.<br /><br />";
			$MsgHTML = $this->email_tpl($html);
			$phpmailer->SetFrom($data->name, "GuiForm");
			$data = unserialize($data->value);
		}
		else if($type == 'activation-mail'){
			$data = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $id));
		  $row = unserialize($data->value);
			$mv_code = md5(time());
			$row['key'] = $mv_code;
			$this->update_option($id, $data->name, $row);
			$subject = __("GuiForm - Email Verification", 'guiform');
			$AddAddress = $data->name;
			$data->name = "noreply@guiform.com";
			
			$vlink = get_site_url() ."/?". $this->permalink['value'] ."=$id&mv-code=$mv_code";
			
			$html = "Hello ".$row['name'].",<br /><br />
							To enable this email address from sending emails with your forms we must first verify by clicking the link below: <br /><br />
							Verification Link: <a target=\"_blank\" href=\"$vlink\">click here!</a><br /><br />";
			$MsgHTML = $this->email_tpl($html);
			$phpmailer->SetFrom($data->name, "GuiForm");
			$data = unserialize($data->value);
		}
		
		$phpmailer->CharSet = "UTF-8";
    $phpmailer->IsHTML(true);
		$phpmailer->Subject = $subject;
		$phpmailer->Body = $MsgHTML;
		$phpmailer->AddAddress($AddAddress);
		$phpmailer->Mailer = $row['protocol'];
		
		if($row['protocol'] == 'smtp')
		$this->mailer_init_smtp($phpmailer, $data);
		
		
		if($row['smtp_auth'] == 1) {
			$phpmailer->SMTPAuth = true;
			$phpmailer->Username = $row['smtp_username'];
			$phpmailer->Password = $row['smtp_password'];
		}
		
	
		if(!$phpmailer->Send()) {
			die( "Mailer Error: " . $phpmailer->ErrorInfo);
		} else {
			if($type !== 'mail'){
				die( __("Message sent! Please check your email for message.", 'guiform'));
			}
		}
	}
	
	/**
	 * Initialize data form data.
	 *
	 * @since 1.0
	 * @access public
	 * @return $data array
	 */
	public function init_loop($post){
  	$data = array();
  	
  	foreach($post as $key => $value){
  		if(is_array($value)){
  			$data[$key] = $this->init_loop($value);
  		}
  		else{
  			$value = stripslashes($value);
  			if($value == "true" || $value == "false"){
  				$value = filter_var($value, FILTER_VALIDATE_BOOLEAN);
  			}
  			$data[$key] = $value;
  		}
  	}
	  
  	return $data;
	}
	
	public function init_default($id = ''){
		return array('id'   => $id,
								'title' => 'Untitled Form',
								'notification' => array('notify'  => false,
																				'subject' => '',
																				'sender'  => get_option('admin_email'), 
																				'mailto'  => get_option('admin_email'), 
																				'message' => ''),
								'autoresponse' => array('response'=> false,
																				'subject' => '',
																				'sender'  => get_option('admin_email'), 
																				'mailto'  => get_option('admin_email'), 
																				'message' => ''),
						    'thank_you'    => array('checked' => 'default',
						    										    'url'     => get_bloginfo('url') .'/thankyou?entry={entry_id}',
						    										    'message' => '<p style="text-align: center;"><span style="font-size: 16pt;"><strong>'. __('Thank You!') .'</strong></span></p><p style="text-align: center;">'. __('We will get in touch with you shortly.') .'</p>')
							);
	}
	
	/**
	 * Return verified email list.
	 *
	 * @since 1.4.2
	 * @access public
	 */
	public function get_mail(){
		global $wpdb;
		$result = $wpdb->get_results("SELECT name, value FROM $wpdb->guiform_options WHERE type = 'mail' ORDER BY name ASC");
		$emails = array();
		
		foreach($result as $row){
			$value = unserialize($row->value);
			if($value['status'] == 1){
				$emails[] = array('name' => $row->name);
			}
		}
		
		return $emails;
	}
	
	/**
	 * Setup PHPMailer.
	 *
	 * @since 1.0
	 * @access public
	 * @return $data array
	 */
	private function mailer_init_smtp($phpmailer, $data){
	
		$phpmailer->SMTPSecure = $data['smtp_encryption'];
		$phpmailer->Host       = $data['smtp_host'];
		$phpmailer->Port       = $data['smtp_port'];
		if($data['smtp_auth']){
			$phpmailer->SMTPAuth = TRUE;
			$phpmailer->Username = $data['smtp_username'];
			$phpmailer->Password = $data['smtp_password'];
		}
		
	}
}