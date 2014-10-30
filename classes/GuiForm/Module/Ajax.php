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
 * The module for all ajax request.
 *
 * @category GuiForm
 * @package Module
 *
 * @since 1.0
 */
class GuiForm_Module_Ajax extends GuiForm_Module {

	const NAME = __CLASS__;

  /**
	 * Used for table primary key comparison.
	 *
	 * @since 1.0
	 * @var integer
	 * @access private
	 */  
  public $_id;
  
  /**
	 * Current form id.
	 *
	 * @since 1.0
	 * @var integer
	 * @access private
	 */ 
  private $formId;
  
 
  /**
	 * Type of error.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $_errorType = '';
  
  /**
	 * Error message.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $_errorMessage = '';
  
  /**
	 * Store all errors.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $_error = array();
  
  /**
	 * Form list name.
	 *
	 * @since 1.0
	 * @var array
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
	 * Escape sting and number.
	 * '%s' for string
	 *  %d  for number
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $_esc = array();

	/**
	 * Constructor.
	 *
	 * @since 1.0
	 *
	 * @access public
	 * @param GuiForm_Plugin $plugin The instance of the plugin.
	 */
	public function __construct( GuiForm_Plugin $plugin ) {
		parent::__construct( $plugin );
		header('HTTP/1.1 200 OK');
		
		//session_destroy();
		$nonce = $_REQUEST['nonce'];
		$action = $_REQUEST['action'];
		
		if ( ! wp_verify_nonce( $nonce, 'guiform_nonce' ) && strpos($action, 'guiform-') !== false ) {
			$this->_sendResponse( array(
				'status'  => 'error',
				'message' => "<span>Security check!</span>"
			));
		}

		$this->_id = esc_sql($_REQUEST['id']);
		$this->_filter = 'guiform_filter_'. $this->_id .'_';
		
		
		//Front-end action
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_SAVE_ENTRY, 'saveEntry', true, true  );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_XHR_UPLOAD, 'xhrUpload', true, true  );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_FILE_UNLINK, 'fileUnlink', true, true  );
		
		//Admin action
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_SAVE_FORM, 'saveForm' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_SAVE_FORM_INIT, 'saveFormInit' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_FORM_PREVIEW, 'formPreview' );
		
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_MARK_UNREAD, 'markUnread' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_TRASH_ENTRY, 'trashEntry' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_DELETE_ENTRY, 'deleteEntry' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_RESTORE_ENTRY, 'restoreEntry' );
				
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_QUICK_EDIT_MAIL, 'mailEdit' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_QUICK_SAVE_MAIL, 'mailSave' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_MAIL_TEST, 'mailTest' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_MAIL_ACTIVATE, 'mailActivate' );
		
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_QUICK_DELETE, 'quickDelete' );
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_QUICK_DUPLICATE, 'quickDuplicate' );
		
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_NOTIFICATION_STATUS, 'notificationStatus');
		
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_EXPORT_ENTRY_FIELDS, 'exportEntryFields');
		
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_ACTIVATE_LICENSE, 'activateLicense');
		$this->_addAjaxAction( GuiForm_Plugin::ACTION_DEACTIVATE_LICENSE, 'deactivateLicense');
	}
	
	/**
	 * Activate license.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function activateLicense(){
		$param = call_user_func('esc_sql', $_POST);
		self::_sendResponse(GuiForm_Module_License::activateLicense($param));
		die();
	}
	
	/**
	 * Deactivate license.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function deactivateLicense(){
		$param = call_user_func('esc_sql', $_POST);
		self::_sendResponse(GuiForm_Module_License::deactivateLicense($param));
		die();
	}
	
	/**
	 * Create cancel and save button.
	 *
	 * @since 1.0
	 * @access private
	 * @return string
	 */
	private function _saveHTML(){
  	return "<p class='submit inline-edit-save'>
							<a class='button-secondary cancel alignleft' title='Cancel' href='javascript:void(0)'>Cancel</a>
						  <a class='button-primary save alignright' title='Save' href='javascript:void(0)'>Save</a>
						  <span class='spinner'></span>
							<br class='clear'>
						</p>";
  }
	
	/**
	 * Change entry status to trash.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function trashEntry(){
  	global $wpdb;
  	$form = esc_sql($_POST['form']);
  	$table = $wpdb->guiform_form.$form;
  	
  	if(has_action($this->_filter .'trash_entry')){
			do_action($this->_filter .'trash_entry', $form);
		}
		
  	$wpdb->update($table, array('guiform_status' => 0), array('id' => $this->_id), array('%d'), array('%d'));
  	
  	self::_checkError();
		if(!empty($this->errorType)){
			echo $this->errorMessage;
		} 
  	
  	die();
  }
  
  /**
	 * Remove entry completely.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function deleteEntry(){
  	global $wpdb;
  	$form = esc_sql($_POST['form']);
  	$table = $wpdb->guiform_form.$form;
  	
  	if(has_action($this->_filter .'delete_entry')){
			do_action($this->_filter .'delete_entry', $form);
		}
		
  	$wpdb->delete($table, array('id' => $this->_id), array('%d'));
  	
  	self::_checkError();
		if(!empty($this->errorType)){
			echo $this->errorMessage;
		} 
  	
  	die();
  }
  
  /**
	 * Restore entry status.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function restoreEntry(){
  	global $wpdb;
  	$form = esc_sql($_POST['form']);
  	$table = $wpdb->guiform_form.$form;
  	
  	if(has_action($this->_filter .'restore_entry')){
			do_action($this->_filter .'restore_entry', $form);
		}
		
  	$wpdb->update($table, array('guiform_status' => 1), array('id' => $this->_id), array('%d'), array('%d'));
  	self::_checkError();
		if(!empty($this->errorType)){
			echo $this->errorMessage;
		} 
  	
  	die();
  }
	
	/**
	 * Change entry status to unread.
	 *
	 * @since 1.0
	 * @access public
	 */	
	public function markUnread(){
  	global $wpdb;
  	
  	$form = esc_sql($_POST['form']);
  	$table = $wpdb->guiform_form.$form;
  	$wpdb->update($table, array('guiform_read' => 0), array('id' => $this->_id), array('%d'), array('%d'));
  	
  	self::_checkError();
  	
		if(!empty($this->errorType)){
			echo $this->errorMessage;
		} 
  	
  	die();
  }
	
	/**
	 * Upload file.
	 *
	 * @since 1.0
	 * @access public
	 */	
  public function xhrUpload(){
  	global $guiform;
  	
  	$form = esc_sql($_POST['form']);
  	$field = esc_html($_POST["field"]);
  	$item = esc_html($_POST["item"]);
  	$id = esc_html($_POST["id"]);
  	$file = esc_html($_POST["name"]);
  	

		$extension = strtolower(pathinfo($_FILES['file']["name"], PATHINFO_EXTENSION));
	
		$file_name = $_FILES['file']["name"];
		$size = $_FILES['file']["size"];
  	$guif_fields = $guiform->form($form, 'data');
  	
  	if(isset($guif_fields[$item])){
			$data = $guif_fields[$item];
			if(!in_array($extension, $data['validation']['extension'])){
				$data = array('id'      => $id, 
										  'item'    => $item, 
										  'field'   => $field, 
										  'file'    => $file,
										  'size'    => $size,
				  					  'message' => __("Upload failed, invalid file type !", GuiForm_Plugin::NAME)
				  					  );
				$this->error = $data;
			}
			else{
				$day = explode("-", $file);
				if(move_uploaded_file($_FILES['file']['tmp_name'], $guiform->tempDir($file))){
					$data = array('id'      => $id, 
											  'item'    => $item, 
											  'field'   => $field, 
											  'name'    => $file_name,
											  'file'    => $file,
											  'path'    => date('Y') .'/'. date('n') .'/'. $day[0],
											  'size'    => $size,
											  'type'    => $extension
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
				    					  'message' => __("Unknown error occurred!", GuiForm_Plugin::NAME)
				    					  );
					$this->error = $data;
				}
			}
			
			self::_displayError();
  	}
  	
  	if(isset($this->error)){
  		$this->_sendResponse( array(
				'status' => 'Error',
				'id'     => $id,
				'info'   => $this->error
			));
  	}
  	
  	
		$guiform->tempFileUpload($file);
		
		die();
  }
  
  /**
	 * Remove file.
	 *
	 * @since 1.0
	 * @access public
	 */
  public function fileUnlink(){
  	global $guiform;
  	if($guiform->isSerial($_POST['file'])){
  		$file = unserialize($_POST['file']);
  		@unlink($guiform->tempDir(esc_html($file['file'])));
  	}
  	else{
  		@unlink($guiform->tempDir(esc_html($_POST['file'])));
  	}
  	die();
  }
	
	/**
	 * Delete form and entry from GuiForm manager page.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function quickDelete(){
		global $wpdb;
		
		$type = esc_sql($_POST['type']);
		
		if($type == 'forms'){
			
			if(has_action($this->_filter .'delete_form')){
				do_action($this->_filter .'delete_form', $this->_id);
			}
			
	  	$wpdb->delete($wpdb->guiform, array('id' => $this->_id), array('%d'));
	  	$table = $wpdb->guiform_form.$this->_id;
	  	
			$wpdb->query("DROP TABLE IF EXISTS $table");
			$wpdb->delete($wpdb->guiform_options, array('name' => $this->_id, 'type' => 'notification'), array('%s', '%s'));
			$wpdb->delete($wpdb->guiform_options, array('name' => $this->_id, 'type' => 'confirmation'), array('%s', '%s'));
		}
		else{
			$wpdb->delete($wpdb->guiform_options, array('id' => $this->_id), array('%d'));
		}
		
  	$this->_checkError();
		if(!empty($this->_errorType)){
			echo $this->_errorMessage;
		} 
		
		die();
	}
	
	/**
	 * Duplicate form.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function quickDuplicate(){
		global $wpdb;
		
		$column = array();
		
		foreach ( $wpdb->get_col( "DESC " . $wpdb->guiform, 0 ) as $column_name ) {
		  $column[] = (sizeof($column) == 0) ? 'NULL' : "`". $column_name ."`";
		}
		
		$column_name = implode($column, ', ');
		
		$wpdb->query("INSERT INTO $wpdb->guiform SELECT $column_name FROM $wpdb->guiform WHERE `id` = $this->_id");
		
		$this->_id = $wpdb->insert_id;
		
		self::createTable();
		
		$this->_checkError();
		if(!empty($this->_errorType)){
			self::_sendResponse( array(
				'status'  => 'error',
				'id'      => $wpdb->insert_id,
				'message' => $this->_errorMessage
			));
		}
		else{
			self::_sendResponse( array(
				'status'  => 'success',
				'id'      => $wpdb->insert_id,
				'message' => __('Duplicate form successful.', GuiForm_Plugin::NAME)
			));
		}
		
		die();
	}
	
  /**
	 * Create modal box for preview screen.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function formPreview(){
		global $guiform;
		
		$height = esc_sql($_GET['height']) - 120;
		
		echo '<table style="background-color: #00ABEB; font-weight: bold; width: 100%; padding: 5px 10px 0;">
						<tr>
							<td style="width: 50%;"><div>Link :</div><input type="text" value="'. $guiform->permalink($this->_id, '', false) .'" style="width: 95%; background-color: #FFFFFF;" readonly="readonly"></td>
							<td style="width: 50%;"><div>Screen View:</div>
								<select id="preview-screen" style="width: 100%;">
									<option value="0">Default</option>
									<option value="1">240 Portrait (small phone)</option>
									<option value="2">320 Portrait (iPhone)</option>
									<option value="3">480 Landscaped (iPhone) and (small tablet)</option>
									<option value="4">New Window</option>
								</select>
							</td>
						</tr>
					</table>';
		
		echo "<iframe style='width: 100%; padding: 20px 0px; height: ".$height."px' src='". $guiform->permalink($this->_id, '', false) ."'></iframe>";
		die();
	}
	
	/**
	 * Save form initial settings.
	 *
	 * @since 1.0
	 * @access public
	 */
  public function saveFormInit(){ 
  	global $wpdb;
  	$post = $_POST["init"];
  	$wpdb->update( 
				$wpdb->guiform, 
				array( 'init' => serialize($_POST["init"])), 
				array( 'id' => $this->_id ), 
				array( '%s'	), 
				array( '%d' ) 
			);
		die();
  }
	
	/**
	 * Check for query error.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function _checkError(){
  	global $wpdb;
  	ob_start();
		$wpdb->show_errors();
		$wpdb->print_error(); 
		$error = ob_get_contents();
		ob_end_clean();
		preg_match('/\[(.*?)\]/', $error, $matches);
		$this->_errorMessage = $error;
		$this->_errorType = (!empty($matches[1])) ? $matches[1] : '';
  }
  
  /**
	 * Send error response message.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function _displayError(){
  	if(sizeof($this->error)){
			self::_sendResponse(array(
				'status' => 'error',
				'id'     => $this->_formId,
				'error'  => $this->error
			));
  	}
  }

	/**
	 * Create table for new form.
	 *
	 * @since 1.0
	 * @access public
	 */
  public function createTable(){
  	
		global $wpdb;
		
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
		
		$item = $wpdb->get_row( $wpdb->prepare("SELECT id, title, data FROM $wpdb->guiform WHERE id = %d", $this->_id));
		
		$query = '';
		$fields = unserialize($item->data);
		$COLUMNS = array('id', 'guiform_read', 'guiform_status', 'guiform_ip', 'guiform_date_submitted', 'guiform_browser', 'guiform_os');
		$table = $wpdb->guiform_form.$this->_id;
		
		
		
		if(sizeof($fields) > 0){
			foreach($fields as $value){
				if($value['type'] != 'f_image_captcha' && $value['type'] != 'f_confirm_password'){
					$query .= "`". $value['name'] ."` ". $value['properties']['dataType'] .",\r\n";
					$COLUMNS[] = $value['name'];
				}
			}
		}
		
		
		$sql = "CREATE TABLE `$table` (
		       `id` int(11) NOT NULL auto_increment,
		       `guiform_read` tinyint(1) NULL DEFAULT 0,
		       `guiform_status` tinyint(1) NULL DEFAULT 1,
		       `guiform_ip` varchar(25) NOT NULL DEFAULT '',
		       `guiform_date_submitted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,			       
		       `guiform_browser` varchar(25) NOT NULL DEFAULT '',
		       `guiform_os` varchar(25) NOT NULL DEFAULT '',
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
		
		$wpdb->update($wpdb->guiform, array('status' => 1), array('id' => $item->_id), array('%d'), array('%d'));
		
  }

	/**
	 * Sends json response.
	 *
	 * @since 1.0
	 *
	 * @access private
	 * @param array $results The response array.
	 */
	private function _sendResponse( $results ) {
		header( 'Content-type: application/json' );
		nocache_headers();
		echo json_encode( $results );
		exit;
	}

	/**
	 * Display form for adding email address.
	 *
	 * @since 1.0
	 *
	 * @access public
	 */
	public function mailEdit(){
		global $wpdb;
  	
  	if(!empty($this->_id)){
	  	$item     = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $this->_id));
	  	$row      = unserialize($item->value);
	  	$input_id = "<input type='hidden' value='$this->_id' name='form-id'>";
	  	if(empty($row['smtp_username'])) $row['smtp_username'] = " ";
  	}
  	else{
  		$input_id = "<input type='hidden' value='' name='form-id'>";
  		$row['smtp_username'] = " ";
  	}
  	
  	
  	echo "<tr class='inline-edit-row inline-edit-row-post inline-edit-post quick-edit-row quick-edit-row-post inline-edit-post'><td>
			  		$input_id
				  	<fieldset class='inline-edit-col-left'>
				  		<label>
								<span class='title'>Email<span style='color: red;'>*</span></span>
								<span class='input-text-wrap'><input type='text' value='$item->name' class='pname' name='email'></span>
							</label>
							
							<label>
								<span class='title'>Name<span style='color: red;'>*</span></span>
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
				 
				 		<fieldset class='inline-edit-col-center'  ". ($row['protocol'] == 'smtp' ? "" : "style='display:none;'" ) .">
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
								<span class='input-text-wrap'><input type='checkbox' ". ($row['smtp_auth'] == true ? " checked='checked' " : '' ) ." name='smtp_auth'> Use SMTP authentication.</span>
								<span class='input-text-wrap description'>If this is set to no, the values below are ignored.</span>
							</label>
							
							<div id='authentication' ". ($row['smtp_auth'] == true ? "" : "style='display:none;'" ) .">
								<label>
									<span class='title'>Username</span>
									<span class='input-text-wrap'><input type='text' value='".$row['smtp_username']."' class='pname' name='smtp_username'></span>
								</label>
					
								<label>
									<span class='title'>Password</span>
									<span class='input-text-wrap'><input type='password' value='".$row['smtp_password']."' class='pname' name='smtp_password'></span>
								</label>
							</div>
				  	</fieldset>
				  	". self::_saveHTML() ."
						</td>
					</tr>";  
					die();
	}
	
	/**
	 * Save email settings.
	 *
	 * @since 1.0
	 * @access public
	 */
  public function mailSave(){
  	global $wpdb, $guiform;
  	
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
				'message' => __('Email is required.', GuiForm_Plugin::NAME)
			));
		}
		elseif(is_email($email) == false){
			$this->_sendResponse( array(
				'status'  => 'error',
				'message' => __('Email address is invalid.', GuiForm_Plugin::NAME)
			));
		}
		
		if($this->_id == ''){
			$unique_email = $guiform->unique_option($email, 'name', 'mail');
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
				'message' => __('Name is required.', GuiForm_Plugin::NAME)
			));
		}
		
		if(!empty($this->_id)){
			$row = $guiform->getOption($name, $this->_id);
			$status = ($row->name == $email) ? $row->value['status'] : 0;
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
	
		if(!empty($this->_id)){
			$guiform->updateOption($email, $value, 'mail', $this->_id);
			self::_sendResponse( array(
				'status'  => 'Success',
				'message' => __("Update successful", GuiForm_Plugin::NAME)
			));
		}
		else{
			
			$wpdb->insert($wpdb->guiform_options, array('type' => 'mail', 'name' => $email, 'value' => serialize($value)), array('%s', '%s', '%s'));
			
			self::_sendResponse( array(
				'status'  => 'Success',
				'message' => __('Add successful.', GuiForm_Plugin::NAME)
			));
		}
							
		self::_checkError();
		if(!empty($this->errorType)){
			self::_sendResponse( array(
				'status'  => 'error',
				'message' =>  $this->errorMessage
			));
		}
  	
  }
  
  /**
	 * Sent test email.
	 *
	 * @since 1.0
	 * @access public
	 */
  public function mailTest(){
  	self::mailer('test-mail');
  	die();
  }
  
  /**
	 * Activate email address.
	 *
	 * @since 1.0
	 * @access public
	 */
  public function mailActivate(){
  	self::mailer('activation-mail');
  	die();
  }
  
  /**
	 * Send email.
	 *
	 * @since 1.0
	 * @access public
	 * @param $type string 
	 * @param $init array 
	 */
	public function mailer($type = 'mail', $init = array()){
		
		global $wpdb, $guiform;
		
		$subject = "";
		$MsgHTML = "";
		$sendTo = array_map('trim', explode(',', $init['to']));
		$sendCc = array_map('trim', explode(',', $init['cc']));
		$sendBcc = array_map('trim', explode(',', $init['bcc']));
		$sendReplyTo = array_map('trim', explode(',', $init['reply-to']));
		
		// Make sure the PHPMailer class has been instantiated 
		// (Re)create it, if it's gone missing
		if ( !is_object( $phpmailer ) || !is_a( $phpmailer, 'PHPMailer' ) ) {
			require_once ABSPATH . WPINC . '/class-phpmailer.php';
			require_once ABSPATH . WPINC . '/class-smtp.php';
			$phpmailer = new PHPMailer(TRUE);
		}
		
		if($type == 'test-mail'){
			$data = $wpdb->get_row($wpdb->prepare("SELECT name, value FROM $wpdb->guiform_options WHERE id = %d", $this->_id));
		  $sendTo = array($data->name);
		  $row = unserialize($data->value);
		  $row = array_map('trim', $row);
			$html = "<strong>". __('Greetings!', GuiForm_Plugin::NAME) ."</strong><br /><br />";
			$html .=  __("This is a test message generated by the GuiForm.", GuiForm_Plugin::NAME) ."<br /><br />";
			$MsgHTML = self::emailTpl($html);
			$phpmailer->SetFrom("noreply@guiform.com", "GuiForm");
			$phpmailer->Subject = __('Test Message', GuiForm_Plugin::NAME);
		}
		else if($type == 'activation-mail'){
			$data = $wpdb->get_row($wpdb->prepare("SELECT name, value FROM $wpdb->guiform_options WHERE id = %d", $this->_id));
		  $row = unserialize($data->value);
		  $row = array_map('trim', $row);
		  $mv_code = md5(time());
			$row['key'] = $mv_code;
			$guiform->updateOption($data->name, $row, 'mail', $this->_id);
			$phpmailer->Subject = __("Email Verification", GuiForm_Plugin::NAME);
			$sendTo = array($data->name);
			$vlink = get_site_url() ."/?". $guiform->getOption('permalink')->value['value'] .'='. $this->_id ."&mv-code=$mv_code";
		
			$html = "Hello ".$row['name'].",<br /><br />";
			$html .= __("To enable this email address from sending emails with your forms we must first verify by clicking the link below:", GuiForm_Plugin::NAME) ."<br /><br />";
			$html .= __("Verification Link: ", GuiForm_Plugin::NAME) ."<a target=\"_blank\" href=\"$vlink\">". __("click here!", GuiForm_Plugin::NAME) ."</a><br /><br />";
			$MsgHTML = self::emailTpl($html);
			$phpmailer->SetFrom("noreply@guiform.com", "GuiForm");
		}
		else if($type == 'mail'){	
				
			$init['message'] = str_replace("\\r\\n", "<br />", $init['message']);
			$init['message'] = stripcslashes($init['message']);
			
			//Do not remove &nbsp and <br />.
			$MsgHTML = $init['message'] ." &nbsp; <br />";
			
			$phpmailer->SetFrom($init['from']);
			$phpmailer->Subject = $init['subject'];
			
			if(sizeof($sendReplyTo)){
				foreach($sendReplyTo as $replyTo){
					if(is_email($replyTo)){
						$phpmailer->AddReplyTo($replyTo);
					}
				}
			}
			
			if(sizeof($sendCc)){
				foreach($sendCc as $mailCc){
					if(is_email($mailCc)){
				  	$phpmailer->AddCC($mailCc);
					}
				}
			}
			
			if(sizeof($sendBcc)){
				foreach($sendBcc as $mailBcc){
					if(is_email($mailBcc)){
				  	$phpmailer->AddCC($mailBcc);
					}
				}
			}
		}
		
		$phpmailer->Body = html_entity_decode($MsgHTML);
		$phpmailer->AltBody = strip_tags($MsgHTML);
		$phpmailer->Mailer = $row['protocol'];
		$phpmailer->IsHTML(true);
		$phpmailer->CharSet = "UTF-8";
		
		foreach($sendTo as $mailTo){
			if(is_email($mailTo)){
				$phpmailer->AddAddress($mailTo);
			}
		}
		
		
		$smtpSettings = $guiform->getOption($this->form, false, 'smtp')->value;
		
		if($smtpSettings->smtp_enable){
			$row['protocol'] = 'smtp';
			$row['smtp_host'] = $smtpSettings->smtp_host;
			$row['smtp_port'] = $smtpSettings->smtp_port;
		}
		
		$phpmailer->Mailer = $row['protocol'];
		
		if($row['protocol'] == 'smtp'){
			$phpmailer->IsSMTP();
			$phpmailer->SMTPSecure = $row['smtp_encryption'];
			$phpmailer->Host       = $row['smtp_host'];
			$phpmailer->Port       = $row['smtp_port'];
		}
		
		if(filter_var($row['smtp_auth'], FILTER_VALIDATE_BOOLEAN)) {
			$phpmailer->SMTPAuth = true;
			$phpmailer->Username = trim($row['smtp_username']);
			$phpmailer->Password = trim($row['smtp_password']);
		}
		
		if(!$phpmailer->Send()) {
			die( __("Mailer Error: ", GuiForm_Plugin::NAME) . $phpmailer->ErrorInfo);
		} else {
			if($type !== 'mail'){
				die( __("Message sent! Please check your email for message.", GuiForm_Plugin::NAME));
			}
		}
		
		$phpmailer->ClearAddresses();
	}
	
	/**
	 * Get email attachment real path.
	 *
	 * @since 1.0
	 * @access public
	 * @param $url string
	 * @return string
	 */
	public function getAttachmentPath($url){
		return realpath(str_replace(get_bloginfo('url'), ABSPATH, $url));
	}
	
	/**
	 * Email template.
	 *
	 * @since 1.0
	 * @access public
	 * @return string
	 */
	public function emailTpl($html){
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
															<td height=\"250\"  align=\"center\" width=\"570\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-family:'Cambria',Helvetica,sans-serif; color:#000000; font-size:15px; line-height:1.5em; text-align:justify;\">". $html ."</td>
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
	 * Export field entry.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function exportEntryFields(){
		global $wpdb, $guiform;

  	$fields = $wpdb->get_results($wpdb->prepare("SHOW COLUMNS FROM $wpdb->guiform_form%d", $this->_id), OBJECT_K);
  	$data = $guiform->form($this->_id, 'data');
  	$form_field = array('id'              => __('ID', GuiForm_Plugin::NAME), 
										  	'guiform_read'    => __('Read Status', GuiForm_Plugin::NAME), 
										  	'guiform_status'  => __('Entry Status', GuiForm_Plugin::NAME), 
										  	'guiform_ip'      => __('IP Address', GuiForm_Plugin::NAME), 
										  	'guiform_date_submitted' => __('Date Submitted', GuiForm_Plugin::NAME), 
										  	'guiform_browser' => __('Browser', GuiForm_Plugin::NAME), 
										  	'guiform_os'      => __('Operating System', GuiForm_Plugin::NAME));
  	
  	foreach($data as $value){
  		$form_field[$value['name']] = $value['label'];
  	}
  	
  	
  	$html = "<ul>";
  	$x = 0;
  	if(sizeof($fields)){
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
	 * Update email notification status.
	 *
	 * @since 1.0
	 * @access public
	 */
  public function notificationStatus(){
  	global $guiform;
  	$options = $guiform->getOption($_POST['form'], $this->_id)->value;
  	$options['status'] = $_POST['status'];
  	$guiform->updateOption($_POST['form'], $options, 'notification', $this->_id);
  	die();
  }
  
}