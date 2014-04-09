<?php
 
class GuiForm_Ajax{  
  
  /**
	 * Used for table primary key comparison.
	 *
	 * @since 1.0
	 * @var integer
	 * @access private
	 */  
  private $id;
  
  /**
	 * Type of method.
	 *
	 * @since 1.0
	 * @var string
	 * @access private 	 	
	 */  
  private $action;
  
  /**
	 * Form list name.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $item;
  
  /**
	 * Used to store temporary value.
	 *
	 * @since 1.0
	 * @var any types
	 * @access private
	 */
  private $value;
  
  /**
	 * Type of error.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $error_type = '';
  
  /**
	 * Error message.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $error_message = '';
  
  /**
	 * Store all errors.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $error = array();
  
  /**
	 * Escape sting and number.
	 * '%s' for string
	 *  %d  for number
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $esc = array();
  

  private static $instances = array();
  
  function __construct(){}
  protected function __clone() {}
  public function __wakeup(){
      throw new Exception("Cannot unserialize singleton");
  }

  public static function getInstance(){
    $cls = get_called_class(); // late-static-bound class name
    if (!isset(self::$instances[$cls])) {
        self::$instances[$cls] = new $cls;
    }
    return self::$instances[$cls];
  }
  
  /**
	 * Constructor.
	 *
	 * @access public
	 */
  function init(){
  	
  	$this->id = esc_sql($_POST['id']);
  	
		if(isset($_POST['export'])){
			add_action('admin_init', array($this, 'export_csv'));
		}
		
		if(strpos($_POST['action'], 'guiform_') !== false){
  		$this->action();
		}
  }  
   
  /**
	 * Check type of method.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */  
  private function action(){  
  	$this->action = esc_sql($_POST['action']);
		$callback = str_replace("guiform_", "", $this->action);
		$callback = str_replace('-', '_', $callback);
		$nonce = $_REQUEST['nonce'];
		
		if ( ! wp_verify_nonce( $nonce, 'guiform_nonce' ) && strpos($this->action, 'guiform') !== false && $callback != 'save_entries') {
			$this->_sendResponse( array(
				'status'  => 'error',
				'message' => "<span>Security check!</span>"
			));
		}
		
		add_action("wp_ajax_$this->action", array($this, $callback));
		if($callback == 'save_entries'){
			$this->save_entries();
		}
  }
  
  /**
	 * Sends json response.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 * @param array $results The response array.
	 */
	private function _sendResponse( $results ) {
		header( 'Content-type: application/json' );
		nocache_headers();
		die(json_encode( $results ));
	}
	
  /**
	 * Send email activation key.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function send_activation_key(){
  	global $guif;
  	$guif->mailer($this->id, 'activation-mail');
  }

	/**
	 * Sent test email.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function send_test_mail(){
  	global $guif;
  	$guif->mailer($this->id, 'test-mail');
  }
  
	/**
	 * Save entry.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function save_entries(){
  	global $wpdb, $guif;
  	$nonce = $_REQUEST['guiform_nonce'];
  	
  	if ( ! wp_verify_nonce( $nonce, '_guiform_nonce' )) {
			die(json_encode(array(
				'status'  => 'fail',
				'message' => "Security check!"
			)));
		}
  	
  	$this->id = esc_sql($_POST['form']);
  	$unique = esc_sql($_POST['unique']);
  	$fields = array();
  	$table = $wpdb->guiform_form;
  	$guif->create_upload_dir();
  	$form = $guif->form($this->id);
  	
  	if(isset($_POST['guiform-upload'])){
  		$this->field =  str_replace("[]", "", esc_html($_POST["guiform-upload"]));
  		$this->item = esc_html($_POST["guiform-item"]);
  		$guif_fields = $guif->guiform($this->id, 'data');
  		$file_id = esc_html($_POST["guiform-file"]);
  		$ext = strtolower(pathinfo($_FILES[$this->field]["name"][0], PATHINFO_EXTENSION));
  		
  		if(isset($guif_fields[$this->item])){
  			$data = $guif_fields[$this->item];
  			$file_name = $_FILES[$this->field]["name"][0];
  			$file_size = $_FILES[$this->field]["size"][0];
  			
				if(!in_array($ext, $data['validation']['extension'])){
					$data = array('id'      => $file_id, 
											  'item'    => $this->item, 
											  'field'   => $this->field, 
											  'file'    => $file_name,
				    					  'message' => __("Upload FAILED, invalid file type !", 'guiform')
				    					  );
					$this->error = $data;
				}
				else if($file_size > $guif->formatBytes($data['validation']['maxsize'])){
					$data = array('id'      => $file_id, 
											  'item'    => $this->item, 
											  'field'   => $this->field, 
											  'file'    => $file_name,
				    					  'message' => __("Upload FAILED, file is too large !", 'guiform')
				    					  );
					$this->error = $data;
				}
				else{
					$day = date('j', time());
					$file = $day .'-'.$guif->random_string(11).'.'.$ext;
					if(move_uploaded_file($_FILES[$this->field]['tmp_name'][0], $guif->temp_dir($file))){
						$data = array('id'      => $file_id, 
												  'item'    => $this->item, 
												  'field'   => $this->field, 
												  'name'    => $file_name,
												  'file'    => $file,
												  'path'    => date('Y') .'/'. date('n') .'/'. $day,
												  'size'    => $file_size,
												  'type'    => $ext
					    					  );
					  
					  $this->_sendResponse( array(
							'status' => 'success',
							'id'     => $this->id,
							'info'   => $data
						));
					}
					else{
						$data = array('id'      => $file_id, 
												  'item'    => $this->item, 
												  'field'   => $this->field, 
												  'file'    => $file_name,
					    					  'message' => __("Unknown error occurred !", 'guiform')
					    					  );
						$this->error = $data;
					}
				}
  		}
  		
	  	//Check for error before we continue.
	  	$this->display_error();
	  	die();
  	}
  	else{
	  	unset($_POST['form']);
	  	unset($_POST['action']);
	  	unset($_POST['submit']);
	  	unset($_POST['reset']);
	  	$guif_fields = $guif->guiform($this->id, 'data');
	  	$FILES = array();
	  	$xhrFields = array();
	  	$data_files = array();
	  	
	  	if(sizeof($guif_fields) == 0){
	  		$this->_sendResponse( array(
					'status'  => 'fail',
					'message' => "Unable to process you form!"
				));
	  	}
	  	
	  	if(isset($_POST["guiform-xhrData"])){
	  		$xhrData = json_decode(stripslashes($_POST["guiform-xhrData"]));
	  		foreach($xhrData as $data){
	  			$FILES[$data->file] = array('name' => $data->name, 'path' => $data->path, 'size' => $data->size, 'field' => $data->field);
	  			$xhrFields[] = $data->field;
	  		}
	  		$xhrFields = array_unique($xhrFields);
	  	}
	  	
	  	foreach($guif_fields as $key => $value){
	  		$this->field = $value['name'];
  			$this->value = $_POST[$this->field];
  			$this->item = $key;
  			
  			$required = filter_var($value['validation']['required'], FILTER_VALIDATE_BOOLEAN);
	  		
	  		if($required && $value['type'] != 'f_file' && $_POST[$this->field] != "0" && (!isset($_POST[$this->field]) || empty($_POST[$this->field]))){
	  			$this->error[$this->item] = __('This field is required.', 'guiform');
	  		}
	  		else if(isset($_FILES[$this->field])){
	  			$multiple = filter_var($value['properties']['multiple'], FILTER_VALIDATE_BOOLEAN);
	  			if(($required && empty($_FILES[$this->field]['name'])) || ($required && !in_array($this->field, $xhrFields) && $multiple)){
	  				$this->error[$this->item] = __('This field is required.', 'guiform');
	  			}
	  			else if($multiple){
	  				foreach($FILES as $key => $file){
	  					if(in_array($this->field, $file)){
	  						$this->value[$key] = $file;
	  					}
			  		}
			  		$this->esc[] = '%s';
	  			}
	  			else{	
	  				if(isset($_FILES[$this->field]) && !empty($_FILES[$this->field]["name"])){
		  				$ext = pathinfo($_FILES[$this->field]["name"], PATHINFO_EXTENSION);
		  				$file_size = $_FILES[$this->field]["size"];
		  				$file_name = $_FILES[$this->field]["name"];
		  				
		  				if(!in_array($ext, $value['validation']['extension'])){
		  					$this->error[$this->item] = __("Upload FAILED, invalid file type !", 'guiform');
							}
							else if($file_size > $guif->formatBytes($value['validation']['maxsize'])){
							  $this->error[$this->item] = __("Upload FAILED, file is too large !", 'guiform');
							}
							else{
								$day = date('j', time());
								$file = $day .'-'.$guif->random_string(11).'.'.$ext;
								$path = date('Y') .'/'. date('n') .'/'. $day;
								
								$this->value[$file] = array('name'  => $file_name, 
																						'path'  => $path,
																						'field' => $this->field, 
																						'size'  => $file_size,
																						'type'  => $ext
																						);
								$data_files[$file] = array('file' => $_FILES[$this->field]['tmp_name'], 'path' => $path);												
								$this->esc[] = '%s';
							}
						}
	  			}
	  		}
	  		else if($value['type'] == 'f_email' || $value['type'] == 'f_text' || $value['validation']['text'] == "email"){
					
					$this->valid_text($value['validation']['text'], $value);
					$this->value = esc_sql($this->value);
					$this->esc[] = ($value['validation']['text'] == "numeric") ? '%d' : '%s';
					
				}
	  		else if($value['type'] == 'f_checkbox' || $value['type'] == 'f_radio'){
					$this->esc[] = '%s';
				}
				else if($value['type'] == 'f_spinner'){
					$this->value = esc_sql($this->value);
					$this->esc[] = '%d';
				}
				else if($value['type'] == 'f_textarea'){
					$this->value = esc_html($this->value);
					$this->esc[] = '%s';
				}
				else if($value['type'] == 'f_password'){
					$this->value = md5($this->value);
					$this->esc[] = '%s';
				}
				else{
					$this->value = esc_sql($this->value);
					$this->esc[] = '%s';
				}
				
				$fields[$this->field] = (is_array($this->value)) ? serialize($this->value) : esc_sql($this->value);
	  	}
	  	
	  }
  	
  	//Check for error before we continue.
  	$this->display_error();
  	
  	$fields['guif_ip'] = $guif->ip;
  	$esc[] = '%s';
  	$fields['guif_os'] = $guif->os;
  	$esc[] = '%s';
  	$fields['guif_browser'] = $guif->browser;
  	$esc[] = '%s';
  	
  	if($form->save_entries){
  		$wpdb->insert($table.$this->id, $fields, $this->esc); 
  		$insert_id = $wpdb->insert_id;
  	}
  	
	  if(sizeof($FILES) > 0){
			foreach($FILES as $key => $file){
				$temp = $guif->temp_folder.'/'.$file['path'].'/'.$key;
				$upload = $guif->upload_folder($key, $file['path']);
				@rename($temp, $upload);
			}
		}
		
		if(sizeof($data_files) > 0){
			foreach($data_files as $file => $tmp){
				@move_uploaded_file($tmp['file'], $guif->upload_folder($file, $tmp['path']));
			}
		}
		
  	$this->check_error();
		if(!empty($this->error_type)){
			$this->_sendResponse( array(
				'status'  => 'error',
				'id'      => $this->id,
				'message' => $this->error_message
			));
		}
		else{
			
			$response = $guif->guiform($this->id, 'init');
			$response['notification']['message'] = $response['notification']['message'] ."\n\t";
			$title = $response['title'];
			$types = array('thank_you' => true, 'notification' => $response['notification']['notify']);
					
			foreach($types as $type => $value){
				if(filter_var($value, FILTER_VALIDATE_BOOLEAN)){
					$message = ($type == 'thank_you' && $response[$type]['checked'] == "redirect") ? "url" : "message";
					$response[$type]['type'] = $type;
					$response[$type][$message] = str_replace("{ip_address}", $guif->ip, $response[$type][$message]);
					$response[$type][$message] = str_replace("{form_id}", $this->id, $response[$type][$message]);
					$response[$type][$message] = str_replace("{form_title}", $title, $response[$type][$message]);
					$response[$type][$message] = str_replace("{entry_id}", $insert_id, $response[$type][$message]);
				
					if(preg_match_all('/{([^}]*)}/', $response[$type]["subject"], $matches) || 
					   preg_match_all('/{([^}]*)}/', $response[$type]["mailto"], $matches) || 
					   preg_match_all('/{([^}]*)}/', $response[$type][$message], $matches)){
						
						foreach($matches[1] as $key){
						
							if($guif->is_serial($fields[$key])){
								$count = 0;
								
								$html = "<ul style='margin: 0px; padding: 0px; list-style-position: inside;'>";
								foreach(unserialize($fields[$key]) as $row => $val){
									if(is_array($val)){
										$file = $guif->upload_folder($row, $val['path'], true);
										$html .= "<li><a target='_blank' href='$file'>".$val['name']."</a></li>";
							   	  $count++;
							    }
									else{
										if(!empty($val)){
											$html .= "<li>$val</li>";
											$count++;
										}
									}
								}
								$html .= '</ul>';
								$fields[$key] = ($count > 0) ? $html : '';
							}
							$response[$type][$message]  = str_replace("{{$key}}", $fields[$key], $response[$type][$message]);	
							$response[$type]['subject'] = str_replace("{{$key}}", $fields[$key], $response[$type]['subject']);	
							$response[$type]['sender']  = str_replace("{{$key}}", $fields[$key], $response[$type]['sender']);
							$response[$type]['mailto']  = str_replace("{{$key}}", $fields[$key], $response[$type]['mailto']);
						}
						
						if($type == 'notification'){
							$guif->mailer(0, 'mail', $response[$type]);
						}
					}
					
				}
			}
			
			unset($response['notification']);
			unset($response['database']);
			
			(isset($_POST['unique'])) ? die(json_encode($response)) : die($this->tooString($response));
		}
  }
  
  /**
	 * Display error message.
	 *
	 * @since 1.4
	 * @access private
	 */
  private function display_error(){
  	if(sizeof($this->error)){
			die(json_encode(array(
				'status' => 'error',
				'id'     => $this->id,
				'error'  => $this->error
			)));
  	}
  }
  
  /**
	 * Sanitize html string for decoding.
	 *
	 * @since 1.4
	 * @access private
	 */
  public function tooString($arrays){
  	$string = "";
  	foreach($arrays as $keys => $rows){
  		if(is_array($rows)){
  			$text = "";
  			foreach($rows as $key => $row){
  				$row = str_replace(" : ", "&#58;", $row);
  				$text .= '"'.$key.'" : "'. urlencode($row).'", ';
  			}
  			$text = '"'.$keys.'" : {'. rtrim($text, ", ") .'}, ';
  			$string .= rtrim($text, ",");
  		}
  		else{
  			$string .= '"'.$keys.'" : "'. rtrim($rows, ", ") .'", ';
  		}
  	}
  	
  	return str_replace("}, }","}}",rtrim(str_replace(',",',"","{{$string}}"), ","));
	}
  
  /**
	 * Get all form fields.
	 *
	 * @since 1.3.1
	 * @access private
	 */
	public function export_get_fields(){
		global $wpdb, $guif;

  	$fields = $wpdb->get_results($wpdb->prepare("SHOW COLUMNS FROM $wpdb->guiform_form%d", $this->id), OBJECT_K);
  	$data = $guif->guiform($this->id, 'data');
  	$form_field = array('id'           => 'Entry ID', 
										  	'guif_read'    => 'Read Status', 
										  	'guif_status'  => 'Mail Location Status', 
										  	'guif_ip'      => 'IP Address', 
										  	'guif_date_submitted' => 'Date Submitted', 
										  	'guif_browser' => 'Browser', 
										  	'guif_os'      => 'Operating System');
  	
  	foreach($data as $value){
  		$form_field[$value['name']] = $value['label'];
  	}
  	
  	$html = "<ul>";
  	$x = 0;
  	if(sizeof($fields) > 0){
  		foreach($fields as $row){
  		  $label = (array_key_exists($row->Field, $form_field)) ? $form_field[$row->Field] : $row->Field ." <strong><i>(Unused Field)</i></strong>";
				$html .= "<li><label for='field-$x'><input id='field-$x' type='checkbox' checked='checked' value='$row->Field' name='field[]'> $label <i style='color:#909090;'>($row->Field)</i> </label>";
				$x++;
  		}
  	}
  	
  	echo $html;
  	
		die();
	}
	
	/**
	 * Export entries to csv file.
	 *
	 * @since 1.3.1
	 * @access private
	 */
	public function export_csv(){
		global $wpdb, $guif;
		
		$args = array();
		$args['fields'] = array_map( 'esc_html',  $_POST['field'] );
		unset($_POST['submit']);
		unset($_POST['field']);
		
		$POST = array_map( 'esc_html',  $_POST );		
		$args['date-from'] = $POST['from'];
		$args['date-to'] = $POST['to'];
		$args['format'] = $POST['format'];
		$args['form'] = $POST['form'];
		$table = $wpdb->guiform_form.$args['form'];
		
		//Header label
		$data = $guif->guiform($args['form'], 'data');
  	$form_field = array();
  	$HEADER = array();
  	
  	foreach($data as $value){
  		$form_field[$value['name']] = $value['label'];
  	}
  	
  	foreach($args['fields'] as $value){
  		//$HEADER[] = (array_key_exists($value, $form_field)) ? $form_field[$value] : $value;
  		$HEADER[] = $value;
  	}
  	
  	
		$filename = date("Y-m-d") ."-". $POST['name'];
		$filename = strtolower(str_replace(" ", "-", $filename));
		$fields = implode(", ", $args['fields']);
		$content_type = 'text/csv';
		$where = ($args['date-from'] || $args['date-to']) ? " WHERE " : "";
		
		if($args['date-from']){
			$where .= $wpdb->prepare( "guif_date_submitted >= %s", date( 'Y-m-d', strtotime( $args['date-from'] ) ) );
		}
		
		if($args['date-to']){
			$and = ($args['date-from']) ? " AND " : "";
			$where .= $wpdb->prepare( " $and guif_date_submitted < %s", date( 'Y-m-d', strtotime( $args['date-to'] ) ) );
		}
		
		$data = $wpdb->get_results( "SELECT $fields FROM $table $where ORDER BY id ASC", ARRAY_A );
		
		header( 'Cache-Control: must-revalidate, post-check=0, pre-check=0' );
		header( 'Content-Description: File Transfer' );
		header( 'Content-Disposition: attachment; filename=' . $filename .'.csv' );
		header( "Content-Type: $content_type; charset=" . get_option( 'blog_charset' ), true );
		header( 'Expires: 0' );
		header( 'Pragma: public' );
		
		$csv = @fopen( 'php://output', 'w' );
		fputcsv( $csv, $HEADER, "," );
		
		foreach($data as $row){
			fputcsv( $csv, $row, "," );
		}
		
		fclose( $csv );
		
		exit();
	}
	
  /**
	 * Validate text entry.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function valid_text($type = "", $value = array()){
  	if(!empty($this->value)){
  		if($type == "email"){
				if(is_email($this->value) == false){
					$this->error[$this->item] = __('Email address is invalid.', 'guiform');
				}
				else if(filter_var($value['validation']['unique'], FILTER_VALIDATE_BOOLEAN)){
					$this->unique_value();
				}
  		}
  		else if($type == "numeric" && !is_numeric($this->value)){
  			$this->error[$this->item] = __('Your input is invalid for this field.', 'guiform');
  		}
  		else if($type == "alphabet" && !ctype_alpha($this->value)){
  			$this->error[$this->item] = __('Your input is invalid for this field.', 'guiform');
  		}
  		else if($type == "alphanum" && !preg_match('/^[\w\-]+$/', $this->value)){
  			$this->error[$this->item] = __('Your input is invalid for this field.', 'guiform');
  		}
  		else if($value['type'] == "f_text" && filter_var($value['validation']['unique'], FILTER_VALIDATE_BOOLEAN)){
				$this->unique_value();
			}
  	}
  }
  
  /**
	 * Check value if unique.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function unique_value(){ 
  	global $wpdb;
  	if(count($wpdb->get_row($wpdb->prepare("SELECT $this->field FROM $wpdb->guiform_form$this->id WHERE $this->field = '%s'", $this->value), ARRAY_N)) > 0){
  		$this->error[$this->item] = $this->value .' '. __("is already exist.", 'guiform');
  	}
  }
  
  /**
	 * Save email settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function mail_quick_save(){
  	global $wpdb, $guif;
  	
  	$email           = esc_sql($_POST['email']);
  	$name            = esc_sql($_POST['name']);
  	$return_path     = esc_sql($_POST['return_path']);
  	$protocol        = esc_sql($_POST['protocol']);
  	$smtp_host       = esc_sql($_POST['smtp_host']);
  	$smtp_port       = esc_sql($_POST['smtp_port']);
  	$smtp_encryption = esc_sql($_POST['smtp_encryption']);
  	$smtp_auth       = esc_sql($_POST['smtp_auth']);
  	$smtp_username   = esc_sql($_POST['smtp_username']);
  	$smtp_password   = esc_sql($_POST['smtp_password']);
  	$key             = "";
  	$status          = 0;
		
		if(empty($email)){
			$this->_sendResponse( array(
				'status'  => 'error',
				'message' => __('Email is required.', 'guiform')
			));
		}
		
		if($this->id == ''){
			$unique_email = $guif->unique_option($email, 'name', 'mail');
			if(!empty($unique_email)){
				$this->_sendResponse( array(
					'status'  => 'error',
					'message' =>  $unique_email
				));
			}
		}
		
		if(empty($name)){
			$this->_sendResponse( array(
				'status'  => 'error',
				'message' => __('Name is required.', 'guiform')
			));
		}
		
		if($this->id != ''){
			$row = $wpdb->get_row($wpdb->prepare("SELECT name FROM $wpdb->guiform_options WHERE id = %d", $this->id));
			$status = ($row->name == $email) ? 1 : 0;
		}
		
  	$value = array('name'            => $name, 
									 'return_path'     => $return_path,
									 'protocol'        => $protocol,
									 'smtp_host'       => $smtp_host,
									 'smtp_port'       => $smtp_port,
									 'smtp_encryption' => $smtp_encryption,
									 'smtp_auth'       => $smtp_auth,
									 'smtp_username'   => $smtp_username,
									 'smtp_password'   => $smtp_password,
									 'status'          => $status,
									 'key'             => $key);
		
		if(!empty($this->id)){
			$data = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $this->id));
			$row = unserialize($data->value);
			$value['status'] = $status;
			$guif->update_option($this->id, $email, $value);
			
			$this->_sendResponse( array(
				'status'  => 'Success',
				'message' => __("Update mail successful", 'guiform')
			));
		}
		else{
			$wpdb->insert($wpdb->guiform_options, array('type' => 'mail', 'name' => $email, 'value' => serialize($value)), array('%s', '%s', '%s'));
			
			$this->_sendResponse( array(
				'status'  => 'Success',
				'message' => __('Add mail successful.', 'guiform')
			));
		}
							
		$this->check_error();
		if(!empty($this->error_type)){
			echo $this->error_message;
		}
  	
  }
  
  /**
	 * Display email setting form.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function mail_quick_edit(){
  	global $wpdb;
  	
  	if(!empty($this->id)){
	  	$item     = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $this->id));
	  	$row      = unserialize($item->value);
	  	$input_id = "<input type='hidden' value='$this->id' name='form-id'>";
	  	$button   = "<a id='update-mail' class='button-primary alignright' title='Update Mail' href='javascript:void(0)'>Update Mail</a>";
  		if(empty($row['smtp_username'])) $row['smtp_username'] = " ";
  	}
  	else{
  		$input_id = "<input type='hidden' value='' name='form-id'>";
  		$button   = "<a id='save-mail' class='button-primary alignright' title='Save Mail' href='javascript:void(0)'>Save Mail</a>";
  		$row['smtp_username'] = " ";
  	}
  	
  	echo "<tr class='inline-edit-row inline-edit-row-post inline-edit-post quick-edit-row quick-edit-row-post inline-edit-post alternate'><td>
	  	<form id='quick-update'>
	  		$input_id
		  	<fieldset class='inline-edit-col-left'>
		  		<label>
						<span class='title'>Email</span>
						<span class='input-text-wrap'><input type='text' value='$item->name' class='pname' name='email'></span>
					</label>
					
					<label>
						<span class='title'>Name</span>
						<span class='input-text-wrap'><input type='text' value='".$row['name']."' class='pname' name='name'></span>
					</label>
		
					<label>
						<span class='title'>Return Path</span>
						<span class='input-text-wrap'><input type='checkbox' ". ($row['return_path'] == 1 ? " checked='checked' " : '' ) ." name='return_path'> Set the return-path to match the From Email.</span>
					</label>
					
					<label>
						<span class='title'>Mail Protocol</span>
						<span class='input-text-wrap'>
							<label for='protocol_php'><input type='radio' ". ($row['protocol'] == 'php' || !isset($row['protocol']) ? " checked='checked' " : '' ) ." value='php' name='protocol' id='protocol_php'>	Use the PHP mail() function to send emails.</label>
							<label for='protocol_smtp'><input type='radio' ". ($row['protocol'] == 'smtp' ? " checked='checked' " : '' ) ." value='smtp' name='protocol' id='protocol_smtp'>	Send emails via SMTP.</label>
						</span>
					</label>
					
		  	</fieldset>
		 
		 		<fieldset class='inline-edit-col-center'>
		  		<h2>SMTP Settings</h2>
					<label>
						<span class='title'>Host</span>
						<span class='input-text-wrap'><input type='text' value='".$row['smtp_host']."' class='pname' name='smtp_host'></span>
					</label>
		
					<label>
						<span class='title'>Port</span>
						<span class='input-text-wrap'><input type='text' style='width: 100px;' value='".$row['smtp_port']."' class='pname' name='smtp_port'></span>
					</label>
					
					<label>
						<span class='title'>Encryption</span>
						<span class='input-text-wrap'>
							<label for='smtp_encryption_none'><input type='radio' ". ($row['smtp_encryption'] == '' || !isset($row['smtp_encryption']) ? " checked='checked' " : '' ) ." value='' name='smtp_encryption' id='smtp_encryption_none'>	No encryption.</label>
							<label for='smtp_encryption_ssl'><input type='radio' ". ($row['smtp_encryption'] == 'ssl' ? " checked='checked' " : '' ) ." value='ssl' name='smtp_encryption' id='smtp_encryption_ssl'>	Use SSL encryption (Recommended).</label>
							<label for='smtp_encryption_tls'><input type='radio' ". ($row['smtp_encryption'] == 'tls' ? " checked='checked' " : '' ) ." value='tls' name='smtp_encryption' id='smtp_encryption_tls'>	Use TLS encryption.</label>
						</span>
					</label>
					
					<label>
						<span class='title'>Authentication</span>
						<span class='input-text-wrap'><input type='checkbox' ". ($row['smtp_auth'] == 1 ? " checked='checked' " : '' ) ." name='smtp_auth'> Use SMTP authentication.</span>
						<span class='input-text-wrap description'>If this is set to no, the values below are ignored.</span>
					</label>
					
					<label>
						<span class='title'>Username</span>
						<span class='input-text-wrap'><input type='text' value='".$row['smtp_username']."' class='pname' name='smtp_username'></span>
					</label>
		
					<label>
						<span class='title'>Password</span>
						<span class='input-text-wrap'><input type='password' value='".$row['smtp_password']."' class='pname' name='smtp_password'></span>
					</label>
		  	</fieldset>
		  	
		  	<p class='submit inline-edit-save'>
					<a class='button-secondary cancel alignleft' title='Cancel' href='javascript:void(0)'>Cancel</a>
						$button
						<span class='spinner'></span>
						<input type='hidden' value='list' name='post_view'>
					<input type='hidden' value='edit-post' name='screen'>
					<span style='display:none' class='error'></span>
					<br class='clear'>
				</p></td>
			</form>
		</tr>";  
		die();
  }
  
  /**
	 * Remove file.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function unlink(){
  	global $guif;
  	if($guif->is_serial($_POST['file'])){
  		$file = unserialize($_POST['file']);
  		@unlink($guif->temp_dir(esc_html($file['file'])));
  	}
  	else{
  		@unlink($guif->temp_dir(esc_html($_POST['file'])));
  	}
  	die();
  }
  	
  /**
	 * Upload file.
	 *
	 * @since 1.0
	 * @access private
	 */	
  public function xhr_upload(){
  	global $guif;
  	
  	$form = esc_sql($_POST['form']);
  	$field = esc_html($_POST["field"]);
  	$item = esc_html($_POST["item"]);
  	$id = esc_html($_POST["id"]);
  	$file = esc_html($_POST["name"]);

		$extension = strtolower(pathinfo($_FILES['file']["name"], PATHINFO_EXTENSION));
	
		$file_name = $_FILES['file']["name"];
		$size = $_FILES['file']["size"];
  	$guif_fields = $guif->guiform($form, 'data');
  	if(isset($guif_fields[$item])){
			$data = $guif_fields[$item];
			if(!in_array($extension, $data['validation']['extension'])){
				$data = array('id'      => $id, 
										  'item'    => $item, 
										  'field'   => $field, 
										  'file'    => $file,
										  'size'    => $size,
				  					  'message' => __("Upload FAILED, invalid file type !", 'guiform')
				  					  );
				$this->error = $data;
			}
			else{
				$day = explode("-", $file);
				if(move_uploaded_file($_FILES['file']['tmp_name'], $guif->temp_dir($file))){
					$data = array('id'      => $id, 
											  'item'    => $item, 
											  'field'   => $field, 
											  'name'    => $file_name,
											  'file'    => $file,
											  'path'    => date('Y') .'/'. date('n') .'/'. $day[0],
											  'size'    => $size,
											  'type'    => $ext
				    					  );
				  
			  	$this->_sendResponse( array(
						'status' => 'Success',
						'id'     => $id,
						'info'   => $data
					));  					  
				}
				else{
					$data = array('id'      => $id, 
											  'item'    => $item, 
											  'field'   => $field, 
											  'file'    => $file,
				    					  'message' => __("Unknown error occurred !", 'guiform')
				    					  );
					$this->error = $data;
				}
			}
			
			$this->display_error();
  	}
  	
		$guif->temp_file_upload($file);
		
		die();
  }
  
  /**
	 * Remove option settings.
	 *
	 * @since 1.0
	 * @access private
	 */	
  public function delete(){ 
  	global $wpdb;
  	$wpdb->delete($wpdb->guiform_options, array('id' => $this->id), array('%d'));
  	die();
  }  
  
  /**
	 * Delete form.
	 *
	 * @since 1.0
	 * @access private
	 */	
  public function delete_form(){ 
  	global $wpdb;
  	$wpdb->delete($wpdb->guiform, array('id' => $this->id), array('%d'));
  	$table = $wpdb->guiform_form.$this->id;
		$wpdb->query("DROP TABLE IF EXISTS $table");
  	$this->check_error();
		if(!empty($this->error_type)){
			echo $this->error_message;
		} 
		die();
  }
  
  /**
	 * Delete entry.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function delete_entry(){
  	global $wpdb, $guif;
  	$form = esc_sql($_POST['form']);
  	$table = $wpdb->guiform_form.$form;
  	$wpdb->update($table, array('guif_status' => 0), array('id' => $this->id), array('%d'), array('%d'));
  	$this->check_error();
		if(!empty($this->error_type)){
			echo $this->error_message;
		} 
  	die();
  }
  
  public function unread_entry(){
  	global $wpdb, $guif;
  	$form = esc_sql($_POST['form']);
  	$table = $wpdb->guiform_form.$form;
  	$wpdb->update($table, array('guif_read' => 0), array('id' => $this->id), array('%d'), array('%d'));
  	$this->check_error();
		if(!empty($this->error_type)){
			echo $this->error_message;
		} 
  	
  	die();
  }
  
  /**
	 * Save form.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function save_form(){  
  	global $wpdb, $guif;
  	
  	$title = esc_html(trim($_POST['title']));
  	$data = serialize($_POST['data']);
  	$html = urldecode($_POST['html']);
  	$canvas = urldecode($_POST['canvas']);
  	
  	if($this->id > 0){
  		$wpdb->update( 
				$wpdb->guiform, 
				array( 
					'title'  => $title,	
					'data'   => $data,
					'canvas' => $canvas,
					'html'   => $html,
					'init'   => '',
					'status' => 0	 
				), 
				array( 'id' => $this->id ), 
				array( 
					'%s',	
					'%s',
					'%s',
					'%s',
					'%s',
					'%d'	
				), 
				array( '%d' ) 
			);
		
			$this->create_table();
			
			$this->check_error();
			if(!empty($this->error_type)){
				$this->_sendResponse( array(
					'status'  => 'error',
					'id'      => $this->id,
					'message' => $this->error_message
				));
			}
   		else{
   			$this->_sendResponse( array(
					'status'  => 'success',
					'id'      => $this->id,
					'message' => "<span>Update successful.</span>"
				));
   		}
  	}
  	else{
  		
  		$entry_fields = serialize(array('id', 'guif_ip', 'guif_date_submitted', 'guif_browser', 'guif_os'));
			$status = 1;
			
    	$wpdb->insert($wpdb->guiform, 
	  					 array('title'   => $title, 
				  					 'data'    => $data, 
				  					 'entry_field' => $entry_fields,
				  					 'canvas'  => $canvas, 
				  					 'html'    => $html,
				  					 'init'    => '',
				  					 'status'  => $status,
				  					 'created' => date('Y-m-d H:i:s', time())
	  					 ), 
	  					 array('%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s')
    				 ); 
    				 
  		$this->id = $wpdb->insert_id;
			$this->create_table();
			
   		$this->check_error();
			if(!empty($this->error_type)){
				$this->_sendResponse( array(
					'status'  => 'error',
					'id'      => $this->id,
					'message' => $this->error_message
				));
			}
			else{
				$this->_sendResponse( array(
					'status'  => 'success',
					'id'      => $this->id,
					'message' => "<span>Save successful.</span>"
				));
 			}
   	}
  }  
  
  /**
	 * Save form settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function save_init(){ 
  	global $wpdb;
  	$post = $_POST["init"];
  	$wpdb->update( 
				$wpdb->guiform, 
				array( 
					'init'  => serialize($_POST["init"])
				), 
				array( 'id' => $this->id ), 
				array( 
					'%s'
				), 
				array( '%d' ) 
			);
  }
  
  /**
	 * Save form table.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function create_table(){
  	if($this->id != ''){
  		global $wpdb, $guif;
  		
  		if(@is_file(ABSPATH.'/wp-admin/includes/upgrade.php')) {
				include_once(ABSPATH.'/wp-admin/includes/upgrade.php');
			}elseif(@is_file(ABSPATH.'/wp-admin/upgrade-functions.php')) {
				include_once(ABSPATH.'/wp-admin/upgrade-functions.php');
			} elseif(@is_file(ABSPATH.'/wp-admin/includes/upgrade.php')) {
				include_once(ABSPATH.'/wp-admin/includes/upgrade.php');
			} else {
				die("We have problem finding your '/wp-admin/upgrade-functions.php' and '/wp-admin/includes/upgrade.php'");
			}
  		
  		$charset_collate = '';
			if($wpdb->supports_collation()) {
				if(!empty($wpdb->charset)) {
					$charset_collate = "DEFAULT CHARACTER SET $wpdb->charset";
				}
				if(!empty($wpdb->collate)) {
					$charset_collate .= " COLLATE $wpdb->collate";
				}
			}
  		
			$item = $wpdb->get_results( $wpdb->prepare( 
				"SELECT id, title, data FROM $wpdb->guiform WHERE id = %d", $this->id
			));
			
			$query = '';
			$item = $item[0];
			$fields = unserialize($item->data);
			$COLUMNS = array('id', 'guif_read', 'guif_status', 'guif_ip', 'guif_date_submitted', 'guif_browser', 'guif_os');
			$table = $wpdb->guiform_form.$this->id;
			
			if(sizeof($fields) > 0){
				foreach($fields as $value){
					$query .= "`". $value['name'] ."` ". $value['properties']['dataType'] .",\r\n";
					$COLUMNS[] = $value['name'];
				}
			}
			
			$sql = "CREATE TABLE `$table` (
			       `id` int(11) NOT NULL auto_increment,
			       `guif_read` tinyint(1) NULL default 0,
			       `guif_status` tinyint(1) NULL default 1,
			       `guif_ip` varchar(25) NULL,
			       `guif_date_submitted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,			       
			       `guif_browser` varchar(25) NULL,
			       `guif_os` varchar(25) NULL,
			       $query
			       PRIMARY KEY (`id`)
						 ) $charset_collate;";
						 
			dbDelta( $sql );
			
			$FIELDS = $wpdb->get_results("SHOW columns FROM `$table`", OBJECT);
			
			foreach($FIELDS as $column){
				if(!in_array($column->Field, $COLUMNS)){
					$wpdb->query("ALTER TABLE `$table` DROP `$column->Field`");
				}
			}
			
			$wpdb->update($wpdb->guiform, array('status' => 1), array('id' => $item->id), array('%d'), array('%d'));
			
  	}
  }
  
  /**
	 * Check for query error.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function check_error(){
  	global $wpdb;
  	ob_start();
		$wpdb->show_errors();
		$wpdb->print_error(); 
		$error = ob_get_contents();
		ob_end_clean();
		preg_match('/\[(.*?)\]/', $error, $matches);
		$this->error_message = $error;
		$this->error_type = (!empty($matches[1])) ? $matches[1] : '';
  }

  /**
	 * Display quick edit form setting.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function form_quick_edit(){
  	global $wpdb;
  	
  	$form = $wpdb->get_row($wpdb->prepare("SELECT id, title, save_entries FROM $wpdb->guiform WHERE id = %d", $this->id));
  	
  	if($form->save_entries){
  		$save_entries = "<span class='input-text-wrap'><input type='checkbox' value='1' checked='checked' class='save_entries' name='save_entries'> Save user input in your database.</span>";
  	}
  	else{
  		$save_entries = "<span class='input-text-wrap'><input type='checkbox' value='1' class='save_entries' name='save_entries'> Save user input in your database.</span>";
  	}
  	
  	echo "<tr class='inline-edit-row inline-edit-row-post inline-edit-post quick-edit-row quick-edit-row-post inline-edit-post alternate'><td>
	  	<!--input type='text' value='$entry_field'-->
	  	<form id='quick-update'>
	  	  <input type='submit' value='submit' name='submit' style='display:none;' disabled='disabled'>
	  		<input type='hidden' value='$this->id' name='form-id'>
		  	<fieldset class='inline-edit-col-left'>
					<h4>Quick Edit: $form->title</h4>
					<label>
						<span class='title'>Title</span>
						<span class='input-text-wrap'><input type='text' value='$form->title' class='ptitle' name='title'></span>
					</label>
					<label>
						<span class='title'>Save Entries</span>
						$save_entries 
					</label>
		  	</fieldset>
		  	<p class='submit inline-edit-save'>
					<a class='button-secondary cancel alignleft' title='Cancel' href='javascript:void(0)'>Cancel</a>
						<a class='button-primary save alignright' title='Update' href='javascript:void(0)'>Update</a>
						<span class='spinner'></span>
								<input type='hidden' value='list' name='post_view'>
					<input type='hidden' value='edit-post' name='screen'>
					<span style='display:none' class='error'></span>
					<br class='clear'>
				</p></td>
				
			</form>
		</tr>";
		die();
  }
  
  /**
	 * Save quick form edit settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  public function form_quick_edit_save(){
		global $wpdb;
		
		$title = esc_html(trim($_POST['title']));
		$save_entries = $_POST['save_entries'];
			
		$wpdb->update( 
			$wpdb->guiform, 
			array( 
				'title'  => $title,
				'save_entries'  => $save_entries
			), 
			array( 'id' => $this->id ), 
			array( '%s', '%d'	), 
			array( '%d' ) 
		);
		
		$this->check_error();
		if(!empty($this->error_type)){
			$this->_sendResponse( array(
				'status'  => 'error',
				'id'      => $this->id,
				'message' => $this->error_message
			));
		}
		else{
			$this->_sendResponse( array(
				'status'  => 'success',
				'id'      => $this->id,
				'message' => "<span>Update Successful.</span>"
			));
		}
  }
} 
?>