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
  		
  		$gui_db = $wpdb;
  		
  		$db = $guif->database($this->id);
  	
  		if($db > 0){
	  		$db = unserialize($guif->get_option($db));
	  		$wpdb = new wpdb($db['username'], $db['password'], $db['database'], $db['host'].':'.$db['port']);
  		}
  		
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
  		
  		
			$item = $gui_db->get_results( $gui_db->prepare( 
				"SELECT id, title, data FROM $gui_db->guiform WHERE id = %d", $this->id
			));
			
			$query = '';
			$item = $item[0];
			$fields = unserialize($item->data);
			$table = $gui_db->guiform_form.$this->id;
			
			foreach($fields as $value){
				$query .= "`". $value['name'] ."` ". $value['properties']['dataType'] .",\r\n";
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
			$wpdb = $gui_db;
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
	 * Check if URL exist or valid.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function urlExist($url){
	  $handle   = curl_init($url);
	  
	  if(false === $handle){
	  	return false;
	  }
	  
	  curl_setopt($handle, CURLOPT_HEADER, false);
	  curl_setopt($handle, CURLOPT_FAILONERROR, true);  // this works
	  curl_setopt($handle, CURLOPT_HTTPHEADER, Array("User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.15) Gecko/20080623 Firefox/2.0.0.15") ); // request as if Firefox
	  curl_setopt($handle, CURLOPT_NOBODY, true);
	  curl_setopt($handle, CURLOPT_RETURNTRANSFER, false);
	  $connectable = curl_exec($handle);
	  curl_close($handle);
	  return $connectable;
	}

	/**
	 * Display database form setting.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function database_quick_edit(){
  	global $wpdb;
  	
  	if($this->action == 'database-quick-edit'){
	  	$item = $wpdb->get_results($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $this->id));
	  	$item = $item[0];
	  	$row = unserialize($item->value);
	  	$input_id = "<input type='hidden' value='$this->id' name='form-id'>";
	  	$button = "<a id='update-database' class='button-primary alignright' title='Update Connection' href='javascript:void(0)'>Update Connection</a>";
  		if(empty($row['username'])) $row['username'] = " ";
  	}
  	
  	if($this->action == 'add-database'){
  		$input_id = "<input type='hidden' value='' name='form-id'>";
  		$button = "<a id='save-database' class='button-primary alignright' title='Save Database' href='javascript:void(0)'>Save Database</a>";
  	  $row['username'] = ' ';
  	}
  	
  	echo "<tr class='inline-edit-row inline-edit-row-post inline-edit-post quick-edit-row quick-edit-row-post inline-edit-post alternate'><td>
	  	
	  	<form id='quick-update'>
	  		$input_id
		  	<fieldset class='inline-edit-col-left'>
					<h4>Quick Edit</h4>
			
					<label>
						<span class='title'>Name</span>
						<span class='input-text-wrap'><input type='text' value='$item->name' class='pname' name='name'></span>
					</label>
		
					<label>
						<span class='title'>Host</span>
						<span class='input-text-wrap'><input type='text' value='".$row['host']."' name='host'></span>
					</label>
					
					<label>
						<span class='title'>Database</span>
						<span class='input-text-wrap'><input type='text' value='".$row['database'] ."' name='database'></span>
					</label>
					
					<label>
						<span class='title'>Username</span>
						<span class='input-text-wrap'><input type='text' value='". $row['username'] ."' name='username'></span>
					</label>
					
					<label>
						<span class='title'>Password</span>
						<span class='input-text-wrap'><input type='password' value='".$row['password']."' name='password'></span>
					</label>
					
					<label>
						<span class='title'>Port</span>
						<span class='input-text-wrap'><input class='port' type='text' value='".$row['port']."' name='port'></span>
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
  }
  
  /**
	 * Display font form setting.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function fonts_quick_edit(){
  	global $wpdb;
  	
  	if($this->action == 'fonts-quick-edit'){
	  	$item = $wpdb->get_results($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $this->id));
	  	$item = $item[0];
	  	$row = unserialize($item->value);
	  	$title = 'Quick Edit Font';
	  	$input_id = "<input type='hidden' value='$this->id' name='form-id'>";
	  	$button = "<a id='update-font' class='button-primary alignright' title='Update Font' href='javascript:void(0)'>Update Font</a>";
  	}
  	
  	if($this->action == 'add-font'){
  		$title = 'Add New Font';
  		$input_id = "<input type='hidden' value='' name='form-id'>";
  		$button = "<a id='save-font' class='button-primary alignright' title='Save Database' href='javascript:void(0)'>Save Font</a>";
  	}
  	
  		echo "<tr class='inline-edit-row inline-edit-row-post inline-edit-post quick-edit-row quick-edit-row-post inline-edit-post alternate'><td>
	  	<form id='quick-update'>
	  		$input_id
		  	<fieldset class='inline-edit-col-left'>
					<h4>$title</h4>
			
					<label>
						<span class='title'>Name</span>
						<span class='input-text-wrap'><input type='text' value='$item->name' class='name' name='name'></span>
					</label>
		
					<label>
						<span class='title'>Font Family </span>";
				echo'		<span class="input-text-wrap"><input type="text" value="'.stripslashes($row['font-family']).'" name="font-family"></span>';
				echo"	</label>
					
					<label>
						<span class='title'>Url</span>
						<span class='input-text-wrap'><input type='text' value='".stripslashes($row['url'])."' name='url'></span>
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
					<label>
						<span class='title'>Database</span>
						<span class='input-text-wrap'>
							". $this->select_conn() ."
						</span>
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
  }
  
  /**
	 * Save quick form edit settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function form_quick_edit_save(){
  	global $wpdb;
  	
  	$db = esc_html($_POST['db']);
  	$title = esc_html(trim($_POST['title']));
  	
  	
  	 $wpdb->update( 
				$wpdb->guiform, 
				array( 
					'title' => $title,	
					'database' => $db
				), 
				array('id' => $this->id), 
				array( 
					'%s',	
					'%d'	
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
  
  /**
	 * Save quick edit database settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function database_quick_save(){
  	
  	$name     = esc_sql($_POST['name']);
  	$host     = esc_sql($_POST['host']);
  	$database = esc_sql($_POST['database']);
  	$username = esc_sql($_POST['username']);
  	$password = esc_sql($_POST['password']);
  	$port     = $_POST['port'];
		
		
		if(!empty($port)) {
			if(!is_numeric($port)) {
				 echo "<div id='error'><p>Port is not numeric.</p></div>";
				 die();
			}
		}
		
		$test_connection = new wpdb($username, $password, $database, $host.':'.$port);
		
		if($test_connection->error) {
  		$test_connection->show_errors = TRUE;
			$test_connection->suppress_errors = FALSE;
			
			foreach($test_connection->error->errors as $error){
				echo "<div id='error'>$error[0]</div>";
			}
		  die();
		}
		
		
		$privileges = array('SELECT',
												'INSERT',
												'UPDATE',
												'DELETE',
												'CREATE',
												'DROP',
												'REFERENCES',
												'INDEX',
												'ALTER',
												'CREATE TEMPORARY TABLES',
												'LOCK TABLES',
												'EXECUTE',
												'CREATE VIEW',
												'SHOW VIEW',
												'CREATE ROUTINE',
												'ALTER ROUTINE',
												'EVENT',
												'TRIGGER'
												);
		
		$test_db = str_replace("_", "\_", $database);
		
		$query = "SELECT PRIVILEGE_TYPE FROM `information_schema`.`SCHEMA_PRIVILEGES` WHERE TABLE_SCHEMA = '%s'"; 
		$result = $test_connection->get_results($test_connection->prepare($query, $test_db), OBJECT_K);
		
		foreach($privileges as $row){
			if(!in_array($row, array_keys($result))){
				echo "<div id='error'><p>USER $username doesn't have $row PRIVILEGE on DATABASE $database.</p></div>";
				die();
			}
		}
		

		global $wpdb;
		
		$data = serialize(array(
									'host'     => $host, 
									'database' => $database, 
									'username' => $username, 
									'password' => $password,
									'port'     => $port));
			
		if(!empty($this->id)){
			$wpdb->update($wpdb->guiform_options, array('name' => $name, 'value' => $data), array('id' => $this->id), array('%s',	'%s'), array('%d'));	
		}
		else{
			$wpdb->insert($wpdb->guiform_options, array('type' => 'remote-database', 'name' => $name, 'value' => $data), array('%s', '%s', '%s'));	
		}
		
		$this->check_error();
		if(!empty($this->error_type)){
			echo $this->error_message;
		}
  	
  }
  
  /**
	 * Save quick edit font settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function font_quick_save(){
  	global $wpdb;
  	
  	$name        = esc_sql($_POST['name']);
  	$font_family = stripslashes(esc_sql(urldecode($_POST['font-family'])));
  	$url         = urldecode(esc_sql($_POST['url']));
  	
  	$value = serialize(
  						array('font-family' => $font_family, 
										'url'         => $url));
		
		if(empty($name)) {
			echo "<div id='error'><p>Name is required.</p></div>";
			die();
		}
		
		if(empty($font_family)) {
			echo "<div id='error'><p>Font Family is required.</p></div>";
			die();
		}
		
		if($this->urlExist($url) == '') {
			echo "<div id='error'><p>Url is not valid or existing.</p></div>";
			die();
		}
		
		if(!empty($this->id)){
			$wpdb->update($wpdb->guiform_options, array('name' => $name, 'value' => $value), array('id' => $this->id), array('%s',	'%s'), array('%d'));	
		}
		else{
			$wpdb->insert($wpdb->guiform_options, array('type' => 'font', 'name' => $name, 'value' => $value), array('%s', '%s', '%s'));	
		}
							
		$this->check_error();
		if(!empty($this->error_type)){
			echo $this->error_message;
		}
  	
  }
  
  /**
	 * Test database connection.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function test_db_con(){
  	global $wpdb;
  	$database = esc_sql($_POST['database']);
  	
		$wpdb->update( 
			$wpdb->guiform, 
			array('database' => $database), 
			array('id' => $this->id), 
			array('%d'), 
			array('%d') 
		);
  	
  	if($database > 0){
  		$item = $wpdb->get_results($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $database));
	  	$item = unserialize($item[0]->value);
	  	
	  	$test_connection = new wpdb($item['username'], $item['password'], $item['database'],$item['host'].':'.$item['port']);
		
			if ($test_connection->error) {
	  		$test_connection->show_errors = TRUE;
				$test_connection->suppress_errors = FALSE;
				
				foreach($test_connection->error->errors as $error){
					echo "<div id='error'>$error[0]</div>";
				}
			  die();
			}
	  	
  	}
  }
  
  /**
	 * Display data structure form settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function datastructure_quick_edit(){
  	global $wpdb;
  	
  	if($this->action == 'datastructure-quick-edit'){
	  	$item = $wpdb->get_results($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $this->id));
	  	$item = $item[0];
	  	$row = unserialize($item->value);
	  	$input_id = "<input type='hidden' value='$this->id' name='form-id'>";
	  	$button = "<a id='update-datastructure' class='button-primary alignright' title='Update Data Structure' href='javascript:void(0)'>Update Data Structure</a>";
  	}
  	
  	if($this->action == 'add-datastructure'){
  		$input_id = "<input type='hidden' value='' name='form-id'>";
  		$button = "<a id='save-datastructure' class='button-primary alignright' title='Save Data Structure' href='javascript:void(0)'>Save Data Structure</a>";
  	}
  	
  	echo "<tr class='inline-edit-row inline-edit-row-post inline-edit-post quick-edit-row quick-edit-row-post inline-edit-post alternate'><td>
	  	
	  	<form id='quick-update'>
	  		$input_id
		  	<fieldset class='inline-edit-col-left'>
					<h4>Add Data Structure</h4>
			
					<label>
						<span class='title'>Type</span>
						<span class='input-text-wrap'>
							". $this->data_type($row['type']) ."
						</span>
					</label>
					<label>
						<span class='title'>Length/Values</span>
						<span class='input-text-wrap'>
							<input type='text' value='".$row['length']."' class='name' name='length'>
						</span>
					</label>
					<!--label>
						<span class='title'>Default</span>
						<span class='input-text-wrap'>
							". $this->data_default_type() ."
							<p class='description'>Optional</p>
						</span>
					</label>
					<label id='default_value' style='display: none;'>
						<span class='title'>Default Value</span>
						<span class='input-text-wrap'>
							<input type='text' value='' class='default_value' name='default_value'>
							<p class='description'>Optional</p>
						</span>
					</label-->
					<label>
						<span class='title'>Collation</span>
						<span class='input-text-wrap'>
							". $this->data_collation($row['collation']) ."
							<p class='description'>Optional</p>
						</span>
						
					</label>
					<!--label>
						<span class='title'>Attributes</span>
						<span class='input-text-wrap'>
							". $this->data_attribute() ."
							<p class='description'>Optional</p>
						</span>
					</label>
					<label>
						<span class='title'>Null</span>
						<span class='input-text-wrap'>
							<input type='checkbox' value='NULL' class='null' name='null'>
							<p class='description'>Optional</p>
						</span>
					</label>
					<label>
						<span class='title'>AUTO INCREMENT</span>
						<span class='input-text-wrap'>
							<input type='checkbox' value='AUTO_INCREMENT' class='extra' name='auto_increment'>
							<p class='description'>Optional</p>
						</span>
					</label>
					<label>
						<span class='title'>Comments</span>
						<span class='input-text-wrap'>
							<input type='text' value='' class='comments' name='comments'>
							<p class='description'>Optional</p>
						</span>
					</label-->
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
  }
  
  /**
	 * Save quick edit data structure settings.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function datastructure_quick_save(){
  	global $wpdb;
  	
  	$type          = esc_sql(trim($_POST['type']));
  	$length        = esc_sql(trim($_POST['length']));
  	$collation     = esc_sql(trim($_POST['collation']));
  	
  	if(empty($length)){
	  	switch($type) {
		    case 'TINYINT':
		        $length = 4;
		        break;
		    case 'SMALLINT':
		        $length = 6;
		        break;
		    case 'MEDIUMINT':
		        $length = 9;
		        break;
		    case 'INT':
		        $length = 11;
		        break;
		    case 'BIGINT':
		        $length = 20;
		        break;
		    case 'DECIMAL':
		        $length = '10,0';
		        break;
		    case 'BOOLEAN':
		        $length = 1;
		        $type = 'TINYINT';
		        break;
		     
		  }
  	}
  	
  	$value = serialize(array('type'          => $type, 
												     'length'        => $length,
												     'collation'     => $collation
											 ));
		$length = (!empty($length)) ? "($length)" : '';
		
		if(!empty($collation)){
			$colkey = explode('_', $collation);
			$collation = "CHARACTER SET $colkey[0] COLLATE $collation";
		}
		else{
			$collation = '';
		}
		
		$not_null = "$collation NOT NULL";
		if($collation == ''){
			$not_null = "NOT NULL";
		}
		
		$name = "$type$length $not_null";
		
		$wpdb->query("ALTER TABLE `$wpdb->guiform` ADD `test_field` $name AFTER `id`");
		
		$this->check_error();
		if(!empty($this->error_type)){
			echo $this->error_message;
			die();
		}

		if(!empty($this->id)){
			$wpdb->update($wpdb->guiform_options, array('name' => $name, 'value' => $value), array('id' => $this->id), array('%s',	'%s'), array('%d'));	
		}
		else{
			$wpdb->insert($wpdb->guiform_options, array('type' => 'data-structure', 'name' => $name, 'value' => $value), array('%s', '%s', '%s'));	
		}
		
		$wpdb->query("ALTER TABLE `$wpdb->guiform` DROP `test_field`");
  }
  
  /**
	 * List of data type structure.
	 *
	 * @since 1.0
	 * @access private
	 * @return $output string
	 */
  private function data_type($selected = ''){
  	$type = array('INT',
  								'VARCHAR',
  								'TEXT',
  								'DATE',
  								'optgroup - NUMERIC' => array('TINYINT',
  																						'SMALLINT',
  																						'MEDIUMINT',
  																						'INT',
  																						'BIGINT',
  																						'-',
  																						'DECIMAL',
  																						'FLOAT',
  																						'DOUBLE',
  																					//'REAL',
  																						'-',
  																						'BIT',
  																						'BOOLEAN',
  																					//'SERIAL'
  																						),
  								'optgroup - DATE and TIME' => array('DATE',
  																						'DATETIME',
  																						'TIMESTAMP',
  																						'TIME',
  																						'YEAR'
  																						),
  								'optgroup - STRING' => array('CHAR',
  																						'VARCHAR',
  																						'-',
  																						'TINYTEXT',
  																						'TEXT',
  																						'MEDIUMTEXT',
  																						'LONGTEXT',
  																						'-',
  																						'BINARY',
  																						'VARBINARY',
  																						'-',
  																						'TINYBLOB',
  																						'MEDIUMBLOB',
  																						'BLOB',
  																						'LONGBLOB',
  																						'-',
  																						'ENUM',
  																						'SET'
  																						),
  								'optgroup - SPATIAL' => array('GEOMETRY',
  																						'POINT',
  																						'LINESTRING',
  																						'POLYGON',
  																						'POLYGON',
  																						'MULTIPOINT',
  																						'MULTILINESTRING',
  																						'MULTIPOLYGON',
  																						'GEOMETRYCOLLECTION'
  																						)
  								
  								);
  	$output = "<select name='type'>";							
  	foreach($type as $key => $val){
  		if(!is_array($val)){
  			$output .= ($key == $selected) ? "<option selected='selected'>$val</option>" : "<option>$val</option>";
  		}
  		else{
  			$label = explode(' - ', $key);
  			$output .= "<optgroup label='$label[1]'>";
  			foreach($val as $group_val){
  				if($group_val == '-'){
  					$output .= "<option disabled='disabled'>$group_val</option>";
  				}
  				else{
  					$output .= ($group_val == $selected) ? "<option selected='selected'>$group_val</option>" : "<option>$group_val</option>";
  				}
  			}
  			$output .= "</optgroup>";
  		}
  	}							
  	$output .= '</select>';
  	return $output;
  }
  
  /**
	 * Data default type.
	 *
	 * @since 1.0
	 * @access private
	 * @return $output string
	 */
  private function data_default_type($selected = ''){
  	$default_type = array('NONE'=>'None',
  												'USER_DEFINED'=>'As defined:',
  												'NULL'=>'NULL',
  												'CURRENT_TIMESTAMP'=>'CURRENT_TIMESTAMP'
  												);
  												
  	$output = "<select class='default_type' name='default_type'>";
  	foreach($default_type as $key => $val){
  		$output .= ($key == $selected) ? "<option selected='selected' value='$key'>$val</option>" : "<option value='$key'>$val</option>";
  	}
  	$output .= '</select>';
  	return $output;
  }
  
  /**
	 * Data Collation.
	 *
	 * @since 1.0
	 * @access private
	 * @return $output string
	 */
  private function data_collation($selected = ''){
  	$collation = array('optgroup -> armscii8 -> ARMSCII-8 Armenian'     => array('armscii8_bin'        => 'Armenian, Binary',
		  																																			'armscii8_general_ci' => 'Armenian, case-insensitive'
		  																																			),
  								'optgroup -> ascii -> US ASCII'                  => array('ascii_bin'        => 'West European (multilingual), Binary',
		  																																			'ascii_general_ci' => 'West European (multilingual), case-insensitive'
		  																																			),
  							  'optgroup -> big5 -> Big5 Traditional Chinese'   => array('big5_bin'        => 'Traditional Chinese, Binary',
		  																																			'big5_chinese_ci' => 'Traditional Chinese, case-insensitive'
		  																																			),
  								'optgroup -> binary -> Binary pseudo charset'  	 => array('binary' => 'Binary'),
  								'optgroup -> cp1250 -> Windows Central European' => array('cp1250_bin'         => 'Central European (multilingual), Binary',
		  																																			'cp1250_croatian_ci' => 'Croatian, case-insensitive',
		  																																			'cp1250_czech_cs'    => 'Czech, case-sensitive',
		  																																			'cp1250_general_ci'  => 'Central European (multilingual), case-insensitive',
		  																																			'cp1250_polish_ci'   => 'Polish, case-insensitive'
		  																																			),
  							  'optgroup -> cp1251 -> Windows Cyrillic'         => array('cp1251_bin'          => 'Cyrillic (multilingual), Binary',
		  																																			'cp1251_bulgarian_ci' => 'Bulgarian, case-insensitive',
		  																																			'cp1251_general_ci'   => 'Cyrillic (multilingual), case-insensitive',
		  																																			'cp1251_general_cs'   => 'Cyrillic (multilingual), case-sensitive',
		  																																			'cp1251_ukrainian_ci' => 'Ukrainian, case-insensitive'
		  																																			),
  								'optgroup -> cp1256 -> Windows Arabic' 					 => array('cp1256_bin' => 'Arabic, Binary',
		  																																			'cp1256_general_ci' => 'Arabic, case-insensitive'
		  																																			),
  								'optgroup -> cp1257 -> Windows Baltic'           => array('cp1257_bin' => 'Baltic (multilingual), Binary',
		  																																			'cp1257_general_ci' => 'Baltic (multilingual), case-insensitive',
		  																																			'cp1257_lithuanian_ci' => 'Lithuanian, case-insensitive'
		  																																			),
  							  'optgroup -> cp850 -> DOS West European'         => array('cp850_bin' => 'West European (multilingual), Binary',
		  																																			'cp850_general_ci' => 'West European (multilingual), case-insensitive'
		  																																			),
		  						'optgroup -> cp852 -> DOS Central European'      => array('cp852_bin' => 'Central European (multilingual), Binary',
		  																																			'cp852_general_ci' => 'Central European (multilingual), case-insensitive'
		  																																			),
		  						'optgroup -> cp866 -> DOS Russian'               => array('cp866_bin' => 'Russian, Binary',
		  																																			'cp866_general_ci' => 'Russian, case-insensitive'
		  																																			),
		  						'optgroup -> cp932 -> SJIS for Windows Japanese' => array('cp932_bin' => 'Japanese, Binary',
		  																																			'cp932_japanese_ci' => 'Japanese, case-insensitive'
		  																																			),
		  						'optgroup -> dec8 -> DEC West European'          => array('dec8_bin' => 'West European (multilingual), Binary',
		  																																			'dec8_swedish_ci' => 'Swedish, case-insensitive'
		  																																			),
		  						'optgroup -> eucjpms -> UJIS for Windows Japanese'=> array('eucjpms_bin' => 'Japanese, Binary',
		  																																			'eucjpms_japanese_ci' => 'Japanese, case-insensitive'
		  																																			),
		  					  'optgroup -> euckr -> EUC-KR Korean'             => array('euckr_bin' => 'Korean, Binary',
		  																																			'euckr_korean_ci' => 'Korean, case-insensitive'
		  																																			),
		  						'optgroup -> gb2312 -> GB2312 Simplified Chinese'=> array('gb2312_bin' => 'Simplified Chinese, Binary',
		  																																			'gb2312_chinese_ci' => 'Simplified Chinese, case-insensitive'
		  																																			),
		  						'optgroup -> gbk -> GBK Simplified Chinese'      => array('gbk_bin' => 'Simplified Chinese, Binary',
		  																																			'gbk_chinese_ci' => 'Simplified Chinese, case-insensitive'
		  																																			),
		  						'optgroup -> geostd8 -> GEOSTD8 Georgian'        => array('geostd8_bin' => 'Georgian, Binary',
		  																																			'geostd8_general_ci' => 'Georgian, case-insensitive'
		  																																			),
		  						'optgroup -> greek -> ISO 8859-7 Greek'          => array('greek_bin' => 'Greek, Binary',
		  																																			'greek_general_ci' => 'Greek, case-insensitive'
		  																																			),
		  						'optgroup -> hebrew -> ISO 8859-8 Hebrew'        => array('hebrew_bin' => 'Hebrew, Binary',
		  																																			'hebrew_general_ci' => 'Hebrew, case-insensitive'
		  																																			),
		  						'optgroup -> hp8 -> HP West European'            => array('hp8_bin' => 'West European (multilingual), Binary',
		  																																			'hp8_english_ci' => 'English, case-insensitive'
		  																																			),
		  						'optgroup -> keybcs2 -> DOS Kamenicky Czech-Slovak' => array('keybcs2_bin' => 'Czech-Slovak, Binary',
		  																																			'keybcs2_general_ci' => 'Czech-Slovak, case-insensitive'
		  																																			),
		  						'optgroup -> koi8r -> KOI8-R Relcom Russian'     => array('koi8r_bin' => 'Russian, Binary',
		  																																			'koi8r_general_ci' => 'Russian, case-insensitive'
		  																																			),
		  						'optgroup -> koi8u -> KOI8-U Ukrainian'          => array('koi8u_bin' => 'Ukrainian, Binary',
		  																																			'koi8u_general_ci' => 'Ukrainian, case-insensitive'
		  																																			),
		  						'optgroup -> latin1 -> cp1252 West European'     => array('latin1_bin' => 'West European (multilingual), Binary',
		  																																			'latin1_danish_ci' => 'Danish, case-insensitive',
		  																																			'latin1_general_ci' => 'West European (multilingual), case-insensitive',
		  																																			'latin1_general_cs' => 'West European (multilingual), case-sensitive',
		  																																			'latin1_german1_ci' => 'German (dictionary), case-insensitive',
		  																																			'latin1_german2_ci' => 'German (phone book), case-insensitive',
		  																																			'latin1_spanish_ci' => 'Spanish, case-insensitive',
		  																																			'latin1_swedish_ci' => 'Swedish, case-insensitive'
		  																																			),
		  						'optgroup -> latin2 -> ISO 8859-2 Central European'=> array('latin2_bin' => 'Central European (multilingual), Binary',
			  																																			'latin2_croatian_ci' => 'Croatian, case-insensitive',
			  																																			'latin2_czech_cs' => 'Czech, case-sensitive',
			  																																			'latin2_general_ci' => 'Central European (multilingual), case-insensitive',
			  																																			'latin2_hungarian_ci' => 'Hungarian, case-insensitive'
			  																																			),
		  						'optgroup -> latin5 -> ISO 8859-9 Turkish'       => array('latin5_bin' => 'Turkish, Binary',
		  																																			'latin5_turkish_ci' => 'Turkish, case-insensitive'
		  																																			),
		  						'optgroup -> latin7 -> ISO 8859-13 Baltic'       => array('latin7_bin'    => 'Baltic (multilingual), Binary',
		  																																			'latin7_estonian_cs' => 'Estonian, case-sensitive',
		  																																			'latin7_general_ci'  => 'Baltic (multilingual), case-insensitive',
		  																																			'latin7_general_cs'  => 'Baltic (multilingual), case-sensitive'
		  																																			),
		  						'optgroup -> macce -> Mac Central European'      => array('macce_bin' => 'Central European (multilingual), Binary',
		  																																			'macce_general_ci' => 'Central European (multilingual), case-insensitive'
		  																																			),
		  						'optgroup -> macroman -> Mac West European'      => array('macroman_bin' => 'West European (multilingual), Binary',
		  																																			'macroman_general_ci' => 'West European (multilingual), case-insensitive'
		  																																			),
		  						'optgroup -> sjis -> Shift-JIS Japanese'         => array('sjis_bin' => 'Japanese, Binary',
		  																																			'sjis_japanese_ci' => 'Japanese, case-insensitive'
		  																																			),
		  						'optgroup -> swe7 -> 7bit Swedish'               => array('swe7_bin' => 'Swedish, Binary',
		  																																			'swe7_swedish_ci' => 'Swedish, case-insensitive'
		  																																			),
		  						'optgroup -> tis620 -> TIS620 Thai'              => array('tis620_bin' => 'Thai, Binary',
		  																																			'tis620_thai_ci' => 'Thai, case-insensitive'
		  																																			),
		  						'optgroup -> ucs2 -> UCS-2 Unicode'              => array('ucs2_bin' => 'Unicode (multilingual), Binary',
		  																																			'ucs2_czech_ci' => 'Czech, case-insensitive',
		  																																			'ucs2_danish_ci' => 'Danish, case-insensitive',
		  																																			'ucs2_esperanto_ci' => 'Esperanto, case-insensitive',
		  																																			'ucs2_estonian_ci' => 'Estonian, case-insensitive',
		  																																			'ucs2_general_ci' => 'Unicode (multilingual), case-insensitive',
		  																																			'ucs2_general_mysql500_ci' => 'Unicode (multilingual)',
		  																																			'ucs2_hungarian_ci' => 'Hungarian, case-insensitive',
		  																																			'ucs2_icelandic_ci' => 'Icelandic, case-insensitive',
		  																																			'ucs2_latvian_ci' => 'Latvian, case-insensitive',
		  																																			'ucs2_lithuanian_ci' => 'Lithuanian, case-insensitive',
		  																																			'ucs2_persian_ci' => 'Persian, case-insensitive',
		  																																			'ucs2_polish_ci' => 'Polish, case-insensitive',
		  																																			'ucs2_roman_ci' => 'West European, case-insensitive',
		  																																			'ucs2_romanian_ci' => 'Romanian, case-insensitive',
		  																																			'ucs2_sinhala_ci' => 'unknown, case-insensitive',
		  																																			'ucs2_slovak_ci' => 'Slovak, case-insensitive',
		  																																			'ucs2_slovenian_ci' => 'Slovenian, case-insensitive',
		  																																			'ucs2_spanish2_ci' => 'Traditional Spanish, case-insensitive',
		  																																			'ucs2_spanish_ci' => 'Spanish, case-insensitive',
		  																																			'ucs2_swedish_ci' => 'Swedish, case-insensitive',
		  																																			'ucs2_turkish_ci' => 'Turkish, case-insensitive',
		  																																			'ucs2_unicode_ci' => 'Unicode (multilingual), case-insensitive'
		  																																			),
		  						'optgroup -> ujis -> EUC-JP Japanese'            => array('ujis_bin' => 'Japanese, Binary',
		  																																			'ujis_japanese_ci' => 'Japanese, case-insensitive'
		  																																			),
		  						'optgroup -> utf16 -> UTF-16 Unicode'            => array('utf16_bin' => 'unknown, Binary',
		  																																			'utf16_czech_ci' => 'Czech, case-insensitive',
		  																																			'utf16_danish_ci' => 'Danish, case-insensitive',
		  																																			'utf16_esperanto_ci' => 'Esperanto, case-insensitive',
		  																																			'utf16_estonian_ci' => 'Estonian, case-insensitive',
		  																																			'utf16_general_ci' => 'unknown, case-insensitive',
		  																																			'utf16_hungarian_ci' => 'Hungarian, case-insensitive',
		  																																			'utf16_icelandic_ci' => 'Icelandic, case-insensitive',
		  																																			'utf16_latvian_ci' => 'Latvian, case-insensitive',
		  																																			'utf16_lithuanian_ci' => 'Lithuanian, case-insensitive',
		  																																			'utf16_persian_ci' => 'Persian, case-insensitive',
		  																																			'utf16_polish_ci' => 'Polish, case-insensitive',
		  																																			'utf16_roman_ci' => 'West European, case-insensitive',
		  																																			'utf16_romanian_ci' => 'Romanian, case-insensitive',
		  																																			'utf16_sinhala_ci' => 'unknown, case-insensitive',
		  																																			'utf16_slovak_ci' => 'Slovak, case-insensitive',
		  																																			'utf16_slovenian_ci' => 'Slovenian, case-insensitive',
		  																																			'utf16_spanish2_ci' => 'Traditional Spanish, case-insensitive',
		  																																			'utf16_spanish_ci' => 'Spanish, case-insensitive',
		  																																			'utf16_swedish_ci' => 'Swedish, case-insensitive',
		  																																			'utf16_turkish_ci' => 'Turkish, case-insensitive',
		  																																			'utf16_unicode_ci' => 'Unicode (multilingual), case-insensitive'
		  																																			),
		  						'optgroup -> utf32 -> UTF-32 Unicode'            => array('utf32_bin' => 'unknown, Binary',
		  																																			'utf32_czech_ci' => 'Czech, case-insensitive',
		  																																			'utf32_danish_ci' => 'Danish, case-insensitive',
		  																																			'utf32_esperanto_ci' => 'Esperanto, case-insensitive',
		  																																			'utf32_estonian_ci' => 'Estonian, case-insensitive',
		  																																			'utf32_general_ci' => 'unknown, case-insensitive',
		  																																			'utf32_hungarian_ci' => 'Hungarian, case-insensitive',
		  																																			'utf32_icelandic_ci' => 'Icelandic, case-insensitive',
		  																																			'utf32_latvian_ci' => 'Latvian, case-insensitive',
		  																																			'utf32_lithuanian_ci' => 'Lithuanian, case-insensitive',
		  																																			'utf32_persian_ci' => 'Persian, case-insensitive',
		  																																			'utf32_polish_ci' => 'Polish, case-insensitive',
		  																																			'utf32_roman_ci' => 'West European, case-insensitive',
		  																																			'utf32_romanian_ci' => 'Romanian, case-insensitive',
		  																																			'utf32_sinhala_ci' => 'unknown, case-insensitive',
		  																																			'utf32_slovak_ci' => 'Slovak, case-insensitive',
		  																																			'utf32_slovenian_ci' => 'Slovenian, case-insensitive',
		  																																			'utf32_spanish2_ci' => 'Traditional Spanish, case-insensitive',
		  																																			'utf32_spanish_ci' => 'Spanish, case-insensitive',
		  																																			'utf32_swedish_ci' => 'Swedish, case-insensitive',
		  																																			'utf32_turkish_ci' => 'Turkish, case-insensitive',
		  																																			'utf32_unicode_ci' => 'Unicode (multilingual), case-insensitive'
		  																																			),
		  						'optgroup -> utf8 -> UTF-8 Unicode'              => array('utf8_bin'          => 'Unicode (multilingual), Binary',
			  																																		'utf8_czech_ci'     => 'Czech, case-insensitive',
			  																																		'utf8_danish_ci'    => 'Danish, case-insensitive',
			  																																		'utf8_esperanto_ci' => 'Esperanto, case-insensitive',
			  																																		'utf8_estonian_ci'  => 'Estonian, case-insensitive',
			  																																		'utf8_general_ci'   => 'Unicode (multilingual), case-insensitive',
			  																																		'utf8_general_mysql500_ci' => 'Unicode (multilingual)',
			  																																		'utf8_hungarian_ci' => 'Hungarian, case-insensitive',
			  																																		'utf8_icelandic_ci' => 'Icelandic, case-insensitive',
			  																																		'utf8_latvian_ci'   => 'Latvian, case-insensitive',
			  																																		'utf8_lithuanian_ci'=> 'Lithuanian, case-insensitive',
			  																																		'utf8_persian_ci'   => 'Persian, case-insensitive',
			  																																		'utf8_polish_ci'    => 'Polish, case-insensitive',
			  																																		'utf8_roman_ci'     => 'West European, case-insensitive',
			  																																		'utf8_romanian_ci'  => 'Romanian, case-insensitive',
			  																																		'utf8_sinhala_ci'   => 'unknown, case-insensitive',
			  																																		'utf8_slovak_ci'    => 'Slovak, case-insensitive',
			  																																		'utf8_slovenian_ci' => 'Slovenian, case-insensitive',
			  																																		'utf8_spanish2_ci'  => 'Traditional Spanish, case-insensitive',
			  																																		'utf8_spanish_ci'   => 'Spanish, case-insensitive',
			  																																		'utf8_swedish_ci'   => 'Swedish, case-insensitive',
			  																																		'utf8_turkish_ci'   => 'Turkish, case-insensitive',
			  																																		'utf8_unicode_ci'   => 'Unicode (multilingual), case-insensitive'
		  																																			),
		  						'optgroup -> utf8mb4 -> UTF-8 Unicode'           => array('utf8mb4_bin' => 'unknown, Binary',
	  																																			  'utf8mb4_czech_ci' => 'Czech, case-insensitive',
	  																																			  'utf8mb4_danish_ci' => 'Danish, case-insensitive',
	  																																			  'utf8mb4_esperanto_ci' => 'Esperanto, case-insensitive',
	  																																			  'utf8mb4_estonian_ci' => 'Estonian, case-insensitive',
	  																																			  'utf8mb4_general_ci' => 'unknown, case-insensitive',
	  																																			  'utf8mb4_hungarian_ci' => 'Hungarian, case-insensitive',
	  																																			  'utf8mb4_icelandic_ci' => 'Icelandic, case-insensitive',
	  																																			  'utf8mb4_latvian_ci' => 'Latvian, case-insensitive',
	  																																			  'utf8mb4_lithuanian_ci' => 'Lithuanian, case-insensitive',
	  																																			  'utf8mb4_persian_ci' => 'Persian, case-insensitive',
	  																																			  'utf8mb4_polish_ci' => 'Polish, case-insensitive',
	  																																			  'utf8mb4_roman_ci' => 'West European, case-insensitive',
	  																																			  'utf8mb4_romanian_ci' => 'Romanian, case-insensitive',
	  																																			  'utf8mb4_sinhala_ci' => 'unknown, case-insensitive',
	  																																			  'utf8mb4_slovak_ci' => 'Slovak, case-insensitive',
	  																																			  'utf8mb4_slovenian_ci' => 'Slovenian, case-insensitive',
	  																																			  'utf8mb4_spanish2_ci' => 'Traditional Spanish, case-insensitive',
	  																																			  'utf8mb4_spanish_ci' => 'Spanish, case-insensitive',
	  																																			  'utf8mb4_swedish_ci' => 'Swedish, case-insensitive',
	  																																			  'utf8mb4_turkish_ci' => 'Turkish, case-insensitive',
	  																																			  'utf8mb4_unicode_ci' => 'Unicode (multilingual), case-insensitive'
	  																																			  )
  																																			  								
  								);
  	$output = "<select name='collation'>";	
  	$output .= "<option value=''></option>";						
  	foreach($collation as $key => $val){
  			$label = explode(' -> ', $key);
  			$output .= "<optgroup title='$label[2]' label='$label[1]'>";
  			foreach($val as $group_key => $group_val){
  				$output .= ($group_key == $selected) ? "<option title='$group_val' selected='selected' value='$group_key'>$group_val</option>" : "<option value='$group_key'>$group_val</option>";
  			}
  			$output .= "</optgroup>";
  	}							
  	$output .= '</select>';
  	return $output;
  }
  
  /**
	 * Data Attributes.
	 *
	 * @since 1.0
	 * @access private
	 * @return $output string
	 */
  private function data_attribute($selected = ''){
  	$attribute = array(''=>'',
											'BINARY',
											'UNSIGNED',
											'UNSIGNED ZEROFILL',
											'on update CURRENT_TIMESTAMP'
											);
  												
  	$output = "<select class='attribute' name='attribute'>";
  	foreach($attribute as $val){
  		$output .= ($val == $selected) ? "<option selected='selected' value='$val'>$val</option>" : "<option value='$val'>$val</option>";
  	}
  	$output .= '</select>';
  	return $output;
  }
  
  /**
	 * Select database connection setting.
	 *
	 * @since 1.0
	 * @access private
	 * @return $output string
	 */
  private function select_conn($selected = ''){
  	global $wpdb;
  	$result = $wpdb->get_results("SELECT id, name FROM $wpdb->guiform_options WHERE type = 'remote-database' ORDER BY name ASC");
  	
  	$output = '<select name="db_con" style="width: 300px;">';
  	$output .= "<option value='0'>".get_bloginfo('name')." Database Installation</option>";
  	foreach($result as $row){
  		$output .= ($row->id == $selected) ? "<option selected='selected' value='$row->id'>$row->name</option>" : "<option value='$row->id'>$row->name</option>";
  	}
  	$output .= '</select>';
  	return $output;
  }
  
}  

// Instantiate class.
new Ajax();  
?>