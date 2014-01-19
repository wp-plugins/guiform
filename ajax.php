<?php

class Ajax{  
  
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
	 * Server request type.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */ 
  private $x_action;
  
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
  
  /**
	 * Constructor.
	 *
	 * @access public
	 */
  function __construct(){
  	$this->action = esc_sql($_POST['action']);
  	$this->x_action = esc_sql($_SERVER['HTTP_X_ACTION']);
  	$this->id = esc_sql($_POST['id']);
  	$this->action();
  	$this->x_action();
  	
  	if($this->action == 'save-entries'){
  		add_action( 'wp_ajax_nopriv_guiform_save-entries', array(&$this, 'save_entries'));
  	}
  	else{
  		add_action( 'wp_ajax_guiform_$this->action', array(&$this, str_replace("-", "_", $this->action)));
  		add_action( 'wp_ajax_guiform_$this->x_action', array(&$this, str_replace("-", "_", $this->x_action)));
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
  	switch($this->action) {
	    case 'save':
	        $this->save_form();
	        break;
	    case 'save-init':
	        $this->save_init();
	        break;
	    case 'delete':
	        $this->delete();
	        break;
	    case 'delete-form':
	        $this->delete_form();
	        break;
	    case 'delete-entry':
	        $this->delete_entry();
	        break;
	    case 'unread-entry':
	        $this->unread_entry();
	        break;    
	    case 'create-table':
	        $this->create_table();
	        break;
	    case 'form-quick-edit-save':
	        $this->form_quick_edit_save();
	        break;   
	    case 'form-quick-edit':
	        $this->form_quick_edit();
	        break;  
	    case 'add-mail':
	    case 'mail-quick-edit':
	        $this->mail_quick_edit();
	        break;  
	    case 'mail-quick-save':
	        $this->mail_quick_save();
	        break;
	    case 'send-test-mail':
	        $this->send_test_mail();
	        break; 
	    case 'send-activation-key':
	        $this->send_activation_key();
	        break;
	    case 'unique-email':
	        $this->unique_email();
	        break; 
     case 'unlink':
	        $this->unlink();
	        break; 
	   case 'save-entries':
	        $this->save_entries();
	        break; 
	   case 'download':
	        $this->download();
	        break;   
		}
  }
  
  /**
	 * Send email activation key.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function send_activation_key(){
  	global $guif;
  	$guif->mailer($this->id, 'activation-mail');
  }

	/**
	 * Sent test email.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function send_test_mail(){
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
  	
  	$form = esc_sql($_POST['form']);
  	$this->id = $form;
  	$fields = array();
  	$data_files = array();
  	$data_files_index = 0;
  	$table = $wpdb->guiform_form;
  	
  	
  	unset($_POST['form']);
  	unset($_POST['action']);
  	unset($_POST['data']['submit']);
  	unset($_POST['data']['reset']);
  	
  	$POST = array_keys($_POST['data']);
  	
  	if(sizeof($_POST['data']) > 0){
  		
  		$guif_fields = $guif->guiform($form, 'data');
  		$num = 0;
  		
  		
  		foreach($guif_fields as $key => $value){
  			
  			$this->field = $value['name'];
  			$this->value = $_POST['data'][$this->field];
  			$this->item = $key;
  			$required = filter_var($value['validation']['required'], FILTER_VALIDATE_BOOLEAN);
  			
  			$size = 0;
  			if($value['type'] == 'f_checkbox' && $required){
  				foreach($this->value as $row){
  					if(!empty($row)){
  						$size++;
  					}
  				}
  			}
  			
  			
  			if($value['name'] == $POST[$num] || !isset($POST[$num])){
					if(($required && empty($this->value)) || ($required && !isset($_POST['data'][$this->field]))){
						$this->error[$this->item] = __('This field is required.', 'guiform');
					}
					else if($value['type'] == 'f_checkbox'){
						
						if($required && $size == 0){
							$this->error[$this->item] = __('This field is required.', 'guiform');
						}
						else{
							$this->esc[] = '%s';
						}
						
					}
					else if($value['type'] == 'f_email' || $value['type'] == 'f_text' || $value['validation']['text'] == "email"){
						$this->valid_text($value['validation']['text'], $value);
						$this->value = esc_html($this->value);
						$this->esc[] = ($value['validation']['text'] == "numeric") ? '%d' : '%s';
					}
					else if($value['type'] == 'f_file'){
						if(sizeof($_POST['files'][$this->field])){
							$x = 0;
							unset($this->value);
							foreach($_POST['files'][$this->field] as $file){
								$data_files[$data_files_index++] = $file['file'];
								$this->value[$file['file']] = array($file['name'], $guif->upload_folder());
				  		}
				  	}
				  	else{
				  		$this->error[$this->item] = __('This field is required.', 'guiform');
				  	}
					}
					else if($value['type'] == 'f_spinner'){
						$this->value = esc_html($this->value);
						$this->esc[] = '%d';
					}
					else{
						$this->value = esc_html($this->value);
						$this->esc[] = '%s';
					}
					
					$fields[$this->field] = (is_array($this->value)) ? serialize($this->value) : esc_sql($this->value);
					$num++;
				}
				else{
					die(json_encode(array('status' => 'error', 'message' => __('Failure saving your entry, please refresh the page and try it again.', 'guiform'))));
					die();
				}
  		}
  	}
  	
  	if(sizeof($this->error)){
  		die(json_encode(array('status' => 'error', 'id' => $this->id, 'error' => $this->error)));
  		die();
  	}
  	
  	$fields['guif_ip'] = $guif->ip;
  	$esc[] = '%s';
  	$fields['guif_os'] = $guif->os;
  	$esc[] = '%s';
  	$fields['guif_browser'] = $guif->browser;
  	$esc[] = '%s';
  	
  	$wpdb->insert($table.$this->id, $fields, $this->esc); 
  	$insert_id = $wpdb->insert_id;
  
		foreach($data_files as $file){
			@rename($guif->temp_dir($file), $guif->upload_folder($file));
		}
		
  	$this->check_error();
		if(!empty($this->error_type)){
			die(json_encode(array('status' => 'error', 'id' => $this->id, 'message' => $this->error_message)));
		}
		else{
			
			$response = $guif->guiform($form, 'init');
			$title = $response['title'];
			$types = array('thank_you' => true, 'notification' => $response['notification']['notify']);
			
			foreach($types as $type => $value){
				if(filter_var($value, FILTER_VALIDATE_BOOLEAN)){
					
					$response[$type]['message'] = str_replace("{ip_address}", $guif->ip, $response[$type]['message']);
					$response[$type]['message'] = str_replace("{form_id}", $form, $response[$type]['message']);
					$response[$type]['message'] = str_replace("{form_title}", $title, $response[$type]['message']);
					$response[$type]['message'] = str_replace("{entry_id}", $insert_id, $response[$type]['message']);
						
					if(preg_match_all('/{([^}]*)}/', $response[$type]['message'], $matches)){
						foreach($matches[1] as $key){
							if($guif->is_serial($fields[$key])){
								$count = 0;
								$html = "<ul style='margin: 0px; padding: 0px; list-style-position: inside;'>";
								foreach(unserialize($fields[$key]) as $row => $val){
									if(is_array($val)){
										$html .= "<li><a target='_blank' href='". $guif->upload_folder($row, true) ."'>$val[0]</a></li>";
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
							
							$response[$type]['message'] = str_replace("{{$key}}", $fields[$key], $response[$type]['message']);	
						}
						
						if($type == 'notification'){
							$guif->mailer(0, 'mail', $response[$type]);
						}
					}
				}
			}
			
			unset($response['notification']);
			unset($response['database']);
			die(json_encode($response));
		}
  }
  
  /**
	 * Validate text entry.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function valid_text($type = "", $value = ""){
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
  	}
  }
  
  /**
	 * Check value if unique.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function unique_value(){ 
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
  private function mail_quick_save(){
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
			die(json_encode(array('status' => 'error', 'message' => __('Email is required.', 'guiform'))));
			die();
		}
		
		if($this->id == ''){
			$unique_email = $guif->unique_option($email, 'name', 'mail');
			if(!empty($unique_email)){
				die(json_encode(array('status' => 'error', 'message' => $unique_email)));
				die();
			}
		}
		
		if(empty($name)){
			die(json_encode(array('status' => 'error', 'message' => __('Name is required.', 'guiform'))));
			die();
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
			$value['status'] = $row->status;
			$value['key'] = $row->key;
			$guif->update_option($this->id, $email, $value);
			
			die(json_encode(array('status' => 'Success', 'message' => __('Update mail successful', 'guiform'))));
			
		}
		else{
			$wpdb->insert($wpdb->guiform_options, array('type' => 'mail', 'name' => $email, 'value' => serialize($value)), array('%s', '%s', '%s'));	
			
			die(json_encode(array('status' => 'Success', 'message' => __('Add mail successful.', 'guiform'))));
			
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
  private function mail_quick_edit(){
  	global $wpdb;
  	
  	
  	if($this->action == 'mail-quick-edit'){
	  	$item     = $wpdb->get_results($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $this->id));
	  	$item     = $item[0];
	  	$row      = unserialize($item->value);
	  	$input_id = "<input type='hidden' value='$this->id' name='form-id'>";
	  	$button   = "<a id='update-mail' class='button-primary alignright' title='Update Mail' href='javascript:void(0)'>Update Mail</a>";
  		if(empty($row['smtp_username'])) $row['smtp_username'] = " ";
  	}
  	
  	if($this->action == 'add-mail'){
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
							<label for='protocol_smtp'><input type='radio' ". ($row['protocol'] == 'smtp' ? " checked='checked' " : '' ) ." value='smtp' name='protocol' id='protocol_smtp'>	Send all WordPress emails via SMTP.</label>
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
	 * $_SERVER request action type.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function x_action(){
  	switch($this->x_action) {
	    case 'file-upload':
	        $this->file_upload();
	        break;
	  }
  }
  
  /**
	 * Remove file.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function unlink(){
  	global $guif;
  	$file = esc_html($_POST['file']);
  	unlink($guif->temp_dir($file));
  	exit();
  }
  	
  /**
	 * Upload file.
	 *
	 * @since 1.0
	 * @access private
	 */	
  private function file_upload(){
  	global $guif;
  	$file      = esc_sql($_SERVER['HTTP_X_FILENAME']);
		$extension = pathinfo($file, PATHINFO_EXTENSION);
		$guif->temp_file_upload($file);
		die();
  }
  
  /**
	 * Remove option settings.
	 *
	 * @since 1.0
	 * @access private
	 */	
  private function delete(){ 
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
  private function delete_form(){ 
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
  private function delete_entry(){
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
  
  private function unread_entry(){
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
  private function save_form(){  
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
					'status' => 0	 
				), 
				array( 'id' => $this->id ), 
				array( 
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
				die(json_encode(array('status' => 'error', 'id' => $this->id, 'message' => $this->error_message)));
			}
   		else{
   			die(json_encode(array('status' => 'success', 'id' => $this->id, 'message' => "<span>Update successful.</span>")));
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
				  					 'status'  => $status,
				  					 'created' => date('Y-m-d H:i:s', time())
	  					 ), 
	  					 array('%s', '%s', '%s', '%s', '%s', '%d', '%s')
    				 ); 
    				 
  		$this->id = $wpdb->insert_id;
			$this->create_table();
			
   		$this->check_error();
			if(!empty($this->error_type)){
				die(json_encode(array('status' => 'error', 'id' => $this->id, 'message' => $this->error_message)));
			}
			else{
 				die(json_encode(array('status' => 'success', 'id' => $this->id, 'message' => "<span>Update successful.</span>")));
   		}
   	}
  }  
  
  /**
	 * Save form settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function save_init(){ 
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
  private function create_table(){
  	
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
			$table = $wpdb->guiform_form.$this->id;
			
			if(sizeof($fields) > 0){
				foreach($fields as $value){
					$query .= "`". $value['name'] ."` ". $value['properties']['dataType'] .",\r\n";
				}
			}
			
			$sql = "CREATE TABLE `$table` (
			       `id` int(11) NOT NULL auto_increment,
			       `guif_read` tinyint(1) NOT NULL default 0,
			       `guif_status` tinyint(1) NOT NULL default 1,
			       `guif_ip` varchar(25) NOT NULL,
			       `guif_date_submitted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,			       
			       `guif_browser` varchar(25) NOT NULL,
			       `guif_os` varchar(25) NOT NULL,
			       $query
			       PRIMARY KEY (`id`)
						 ) $charset_collate;";
						 
			dbDelta( $sql );
			
			$wpdb->update($wpdb->guiform, array('status' => 1), array('id' => $item->id), array('%d'), array('%d'));
			
  	}
  	
  }
  
  /**
	 * Check for query error.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function check_error(){
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
  private function form_quick_edit(){
  	global $wpdb;
  	
  	$form = $wpdb->get_results($wpdb->prepare("SELECT id, title, entry_field, status, last_update, created FROM $wpdb->guiform WHERE id = %d", $this->id));
  	$form = $form[0];
  	
  	$table = $wpdb->guiform_form.$this->id;
  	$entry_field = (empty($form->entry_field)) ? array() : unserialize($form->entry_field);
  	$fields .= "<li class='popular-category'>
									<label class='selectit'><input checked='checked' class='fields' disabled='disabled' type='checkbox' name='entry[]' value='id'> ID </label>
								</li> 
								<li class='popular-category'>
									<label class='selectit'><input checked='checked' class='fields' disabled='disabled' type='checkbox' name='entry[]' value='guif_ip'> IP Addess </label>
								</li> 	
								<li class='popular-category'>
									<label class='selectit'><input checked='checked' class='fields' disabled='disabled' type='checkbox' name='entry[]' value='guif_date_submitted'> Date Submitted </label>
								</li>
								<li class='popular-category'>
									<label class='selectit'><input checked='checked' class='fields' disabled='disabled' type='checkbox' name='entry[]' value='guif_browser'> Browser </label>
								</li> 	
								<li class='popular-category'>
									<label class='selectit'><input checked='checked' class='fields' disabled='disabled' type='checkbox' name='entry[]' value='guif_os'> Operating System </label>
								</li>";
  	
  	$COLUMNS = $wpdb->get_results($wpdb->prepare("DESCRIBE '%s'", $table));
  	
  	$unset = array('id', 'guif_ip', 'guif_date_submitted', 'guif_status', 'guif_browser', 'guif_os', 'guif_read');
  	
  	foreach($COLUMNS as $value){
  		if(in_array($value->Field, $unset) == false){
	  		$fields .= "<li class='popular-category' id='category-1'>
											<label class='selectit'><input type='checkbox' ". ((in_array($value->Field, $entry_field)) ? 'checked="checked"' : '') ." class='fields' name='entry[]' value='$value->Field'> $value->Field </label>
										</li>";
			}
  	}
  	
  	echo "<tr class='inline-edit-row inline-edit-row-post inline-edit-post quick-edit-row quick-edit-row-post inline-edit-post alternate'><td>
	  	<!--input type='text' value='$entry_field'-->
	  	<form id='quick-update'>
	  		<input type='hidden' value='$this->id' name='form-id'>
		  	<fieldset class='inline-edit-col-left'>
					<h4>Quick Edit $form->title</h4>
					<label>
						<span class='title'>Title</span>
						<span class='input-text-wrap'><input type='text' value='$form->title' class='ptitle' name='title'></span>
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
  private function form_quick_edit_save(){
  	global $wpdb;
  	
  	$title = esc_html(trim($_POST['title']));
  	
  	 $wpdb->update( 
				$wpdb->guiform, 
				array( 
					'title' => $title
				), 
				array('id' => $this->id), 
				array( 
					'%s'
				), 
				array('%d') 
			);
		
			$this->check_error();
			if(!empty($this->error_type)){
				echo $this->error_message;
			}
			else{
 				die(json_encode(array('status' => 'success', 'id' => $this->id, 'message' => "<span>Update Successful.</span>")));
   		}
   		
  }
  
}  

// Instantiate class.
new Ajax();  
?>