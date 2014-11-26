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
 * The module for all post request.
 *
 * @category GuiForm Pro
 * @package Module
 *
 * @since 1.0
 */
class GuiForm_Module_Post extends GuiForm_Module {

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
	 * Prefix name for hook action.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $_hookAction;
  
  /**
	 * Prefix name for hook filter.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $_hookFilter;
  
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
	 * Store sql query.
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
  private $_sql = '';
    
	/**
	 * Constructor.
	 *
	 * @since 1.0
	 *
	 * @access public
	 * @param GuiForm_Plugin $plugin The instance of the plugin.
	 */
	public function __construct(GuiForm_Plugin $plugin){
		parent::__construct($plugin);
		
		header('HTTP/1.1 200 OK');
		header("Expires: 0");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-cache, must-revalidate");
    header("Pragma: no-cache");
		
		$nonce = isset($_REQUEST['guiform_nonce']) ?  $_REQUEST['guiform_nonce'] : $_REQUEST['nonce'];
		if(isset($_POST['guiform_save_entry'])) $_POST['action'] = 'guiform-save-entry';
	
		if(!wp_verify_nonce($nonce, 'guiform_nonce')){
			$this->_sendResponse(array(
				'status'  => 'error',
				'message' => __("Security check: Invalid token!", GuiForm_Plugin::NAME)
			));
		}
		
		$this->_id = esc_sql($_REQUEST['id']);
		$this->_hookFilter = 'guiform_filter_'. $this->_id .'_';
		$this->_hookAction = 'guiform_action_'. $this->_id .'_';
		$this->_addAdminAction(GuiForm_Plugin::ACTION_EXPORT_ENTRY_CSV, 'exportEntryCsv');
		$this->_addAdminAction(GuiForm_Plugin::ACTION_EXPORT_ENTRY_SQL, 'exportEntrySql');
		$this->_addAdminAction(GuiForm_Plugin::ACTION_EXPORT_FORM_SQL, 'exportFormSql');
		$this->_addAdminAction(GuiForm_Plugin::ACTION_EXPORT_FORM_PHP, 'exportFormPhp');
		$this->_addAdminAction(GuiForm_Plugin::ACTION_IMPORT_FORM_PHP, 'importFormPhp');
		$this->_addAdminAction(GuiForm_Plugin::ACTION_SAVE_FORM, 'saveForm');
		
		
		if($_POST['action'] == GuiForm_Plugin::ACTION_SAVE_FORM){
			//Fix for 404 error not found.
			$this->saveForm();
		}
		
	}
	
	/**
	 * Save form layout and settings.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function saveForm(){
		global $wpdb, $guiform;
		
		$post = json_decode(stripslashes($_POST['data']), true);
  	$this->_id = $post['id'];
  	$title   = esc_html($post['title']);
  	$data    = serialize($post['data']);
  	$include = serialize($post['include']);
  	$html    = urldecode($post['html']);
  	$canvas  = urldecode($post['canvas']);
  	
  	
  	$entry_fields = array('id' => array('ID', true), 
													'guiform_ip' => array(__('IP Address', GuiForm_Plugin::NAME), true, 'default'), 
													'guiform_browser' => array(__('Browser', GuiForm_Plugin::NAME), true, 'default'), 
													'guiform_os' => array(__('Operating System', GuiForm_Plugin::NAME), true, 'default'),
													'guiform_date_submitted' => array(__('Date Submitted', GuiForm_Plugin::NAME), true, 'default')
													);
																											
		foreach($post['data'] as $item){
			if($item['type'] != "f_image_captcha" && $item['type'] != "f_confirm_password" ){
				$entry_fields[$item['name']] = array($item['label'], false, $item['type']);
			}
		}
		
  	if($this->_id > 0){
  		$wpdb->update( 
				$wpdb->guiform, 
				array( 
					'title'       => $title,	
					'data'        => $data,
					'canvas'      => $canvas,
					'entry_field' => serialize($entry_fields),
					'html'        => $html,
					'status'      => 1	 
				), 
				array( 'id' => $this->_id ), 
				array( '%s', '%s', '%s', '%s', '%s', '%s', '%d'	), 
				array( '%d' ) 
			);
			
			GuiForm_Module_Ajax::createTable();
			
			self::_checkError();
			if(!empty($this->_errorType)){
				self::_sendResponse( array(
					'status'  => 'error',
					'id'      => $this->_id,
					'message' => $this->_errorMessage
				));
			}
   		else{
   			self::_sendResponse( array(
					'status'  => 'success',
					'id'      => $this->_id,
					'message' => "Update successful."
				));
   		}
  	}
  	else{
  		
    	$wpdb->insert($wpdb->guiform, 
	  					 array('title'       => $title, 
				  					 'data'        => $data, 
				  					 'entry_field' => serialize($entry_fields),
				  					 'canvas'      => $canvas, 
				  					 'html'        => $html,
				  					 'status'      => 1,
				  					 'created'     => date('Y-m-d H:i:s')
	  					 ), 
	  					 array('%s', '%s', '%s', '%s', '%s', '%d', '%s')
    				 ); 
    				 
  		$this->_id = $wpdb->insert_id;
  		
  		$confirmation = array('type' => 'default', 'url' => site_url(), 'custom' => '');
			
			$guiform->addOption($this->_id, $confirmation, 'confirmation');
			
			$smtp = array('smtp_enable' => false, 'smtp_host' => '', 'smtp_port' => '');
			
			$guiform->addOption($this->_id, $smtp, 'smtp');
			
			GuiForm_Module_Ajax::createTable();
			
   		self::_checkError();
			if(!empty($this->errorType)){
				self::_sendResponse( array(
					'status'  => 'error',
					'id'      => $this->_id,
					'message' => $this->_errorMessage
				));
			}
			else{
				self::_sendResponse( array(
					'status'  => 'success',
					'id'      => $this->_id,
					'message' => __("Save successful", GuiForm_Plugin::NAME)
				));
   		}
   	}
	}
	
	/**
	 * Sends json response.
	 *
	 * @since 1.0
	 *
	 * @access private
	 * @param $results object 
	 */
	private function _sendResponse($results) {
		nocache_headers();
		echo json_encode( $results );
		exit;
	}
	
	/**
	 * Display error message.
	 *
	 * @since 1.0
	 * @access private
	 */
  private function _displayError(){
  	if(sizeof($this->error)){
			self::_sendResponse(array(
				'status' => 'error',
				'id' => $this->_formId,
				'error' => $this->error
			));
  	}
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
	 * Export entries to csv file.
	 *
	 * @since 1.0
	 * @access private
	 */
	public function exportEntryCsv(){
		global $wpdb, $guiform;
		
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
		
		$data = $guiform->form($args['form'], 'data');
  	
  	$form_field = array(
  		'id'                     => __('ID', GuiForm_Plugin::NAME), //Do not remove the space before th ID word. 
	  	'guiform_read'           => __('Read Status', GuiForm_Plugin::NAME), 
	  	'guiform_status'         => __('Entry Status', GuiForm_Plugin::NAME), 
	  	'guiform_ip'             => __('IP Address', GuiForm_Plugin::NAME), 
	  	'guiform_date_submitted' => __('Date Submitted', GuiForm_Plugin::NAME), 
	  	'guiform_browser'        => __('Browser', GuiForm_Plugin::NAME), 
	  	'guiform_os'             => __('Operating System', GuiForm_Plugin::NAME)
	  	);
										  	
		$HEADER = array();								  	
  	foreach($data as $value){
  		$form_field[$value['name']] = $value['label'];
  	}
  	
  	foreach($args['fields'] as $value){
  		$HEADER[] = (!isset($_POST['field_name'])) ? ((array_key_exists($value, $form_field)) ? $form_field[$value] : $value) : $value;
  	}
  	
  	date_default_timezone_set('GMT');
		$filename = date("Y-m-d-H-i", strtotime("now"-8)) . $POST['name'];
		$filename = strtolower(str_replace(" ", "-", $filename));
		$fields = implode(", ", $args['fields']);
		
		$where = ($args['date-from'] || $args['date-to']) ? " WHERE " : "";
		
		if($args['date-from']){
			$where .= $wpdb->prepare( "guiform_date_submitted >= %s", date( 'Y-m-d', strtotime( $args['date-from'] ) ) );
		}
		
		if($args['date-to']){
			$and = ($args['date-from']) ? " AND " : "";
			$where .= $wpdb->prepare( " $and guiform_date_submitted < %s", date( 'Y-m-d', strtotime( $args['date-to'] ) ) );
		}
		
		$data = $wpdb->get_results( "SELECT $fields FROM $table $where ORDER BY id ASC", ARRAY_A );
		
  	$content_type = 'text/csv';
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
	 * Export entries to sql file.
	 *
	 * @since 1.1
	 * @access private
	 */
	public function exportEntrySql(){
		global $wpdb, $guiform;
		
		$table = $wpdb->guiform_form . esc_sql($_POST['form']);
		
		//cycle through data
		$return = "";
		$return .= "-- ". GuiForm_Plugin::PACKAGE ." SQL Dump \n";
		$return .= "-- Plugin Version ". GuiForm_Plugin::VERSION ." \n";
		$return .= "-- Site: https://www.guiform.com \n";
		$return .= "-- \n";
		$return .= "-- Host: ". get_site_url() ." \n";
		$return .= "-- Generation Time: ". date('M d, Y \a\t h:i a', strtotime("now"-8)) ."\n";
		$return .= "-- MYSQL Version: ". $wpdb->db_version() ." \n";
		$return .= "-- PHP Version: ". phpversion() ." \n";
		
		$return .= "\n\n--\n-- ";
		$return .= "Table structure for table `". $table ."`\n--\n";
		
		$column = $wpdb->get_col("SHOW COLUMNS FROM $table");
		$result = $wpdb->get_results("SELECT * FROM $table", ARRAY_A);
		
		if(sizeof($result) > 0){
		
			$entry_function = 'INSERT'; 
			$return.=  $entry_function .' INTO `'.$table."` (";
			
		  $return .= '`'. implode("`, `", $column) .'`';
		
			$return.= ") VALUES \n";
			
			
			foreach($wpdb->col_info as $col) {
				$info[$col->name] = $col;
			}
			
			foreach($result as $value) {
				$param['data'] = $value;
				$param['info'] = $info;
				$data = GuiForm_Module_Setup::isString($param);
				$INSERT[] = '('. implode(", ", $data) .')';
			}
			
			$return .= implode(",\n", $INSERT) .";";
		
		}
		else{
			$return .= "-- \n";
			$return .= "-- ". __('No Record Found.', GuiForm_Plugin::NAME). "\n";
			$return .= "-- \n";
		}
		
		date_default_timezone_set('GMT');
		$filename = date("Y-m-d-H-i", strtotime("now"-8));
		$filename = strtolower(str_replace(" ", "-", $filename));
		
		$content_type = 'text/sql';
		header( 'Cache-Control: must-revalidate, post-check=0, pre-check=0' );
		header( 'Content-Description: File Transfer' );
		header( 'Content-Disposition: attachment; filename=' . $filename .'.sql' );
		header( "Content-Type: $content_type; charset=" . get_option( 'blog_charset' ), true );
		header( 'Expires: 0' );
		header( 'Pragma: public' );
		echo $return;
	}
	
	/**
	 * Export form settings to sql file.
	 *
	 * @since 1.0
	 * @access public
	 * @param $table array
	 * @param $zip boolean
	 */
	public function exportFormSql($table = array(), $zip = false){
		global $wpdb, $guiform;
		
		$forms = array_map('esc_html', $_POST['forms']);
	  $form_column = $wpdb->get_col("SHOW COLUMNS FROM $wpdb->guiform");
		$form_field .= '`'. implode("`, `", $form_column) .'`';
		
		//cycle through data
		$return = "";
		$return .= "-- ". GuiForm_Plugin::PACKAGE ." SQL Dump \n";
		$return .= "-- Plugin Version ". GuiForm_Plugin::VERSION ." \n";
		$return .= "-- Site: https://www.guiform.com \n";
		$return .= "-- \n";
		$return .= "-- Host: ". get_site_url() ." \n";
		$return .= "-- Generation Time: ". date('M d, Y \a\t h:i a', strtotime("now"-8)) ."\n";
		$return .= "-- MYSQL Version: ". $wpdb->db_version() ." \n";
		$return .= "-- PHP Version: ". phpversion() ." \n\n\n";
		
		
		foreach($forms as $id) {
			
			$form_row = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform WHERE id = %d", $id), ARRAY_A);
			$param = $info = array();
			
			foreach($wpdb->col_info as $col) {
				$info[$col->name] = $col;
			}
			
			$param['data'] = $form_row;
			$param['info'] = $info;
			
			$form_row = GuiForm_Module_Setup::isString($param);
			$return .= "-- ---------------------------------------------------------------- \n";
		  $return .= "-- \n";
			$return .= "-- Dumping form data \n";
			$return .= "-- \n";
			$return .= "REPLACE INTO `$wpdb->guiform` (". $form_field .") VALUES\n";
			$return .= "(". implode(", ", $form_row) .");";
			
			$INSERT = $param = $info = array();
			$table = $wpdb->guiform_form.$id;
			
			if(isset($_POST['schema'])){
				$return .= "\n\n--\n-- ";
				$return .= "Table structure for table `". $table ."`\n--\n";
							
				$structure = $wpdb->get_row("SHOW CREATE TABLE $table", ARRAY_A);
			
				if(isset($_POST['drop_table'])) $return .= "DROP TABLE IF EXISTS `$table`;\n";
				$return.= str_replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS', $structure['Create Table']) .";\n\n";
			}
			
			$column = $wpdb->get_col("SHOW COLUMNS FROM $table");
			$result = $wpdb->get_results("SELECT * FROM $table", ARRAY_A);
	    
	    $return.= "\n\n--\n-- Dumping data for table `". $table ."`\n--\n";
				
	    if(sizeof($result) > 0){
				if(isset($_POST['entry'])){
					
				  $entry_function = ($_POST['entry_function'] == 'insert') ? 'INSERT' : 'REPLACE'; 
					$return.=  $entry_function .' INTO `'.$table."` (";
					
				  $return .= '`'. implode("`, `", $column) .'`';
				
					$return.= ") VALUES \n";
					
					
					foreach($wpdb->col_info as $col) {
						$info[$col->name] = $col;
					}
					
					foreach($result as $value) {
						$param['data'] = $value;
						$param['info'] = $info;
						$data = GuiForm_Module_Setup::isString($param);
						$INSERT[] = '('. implode(", ", $data) .')';
					}
					
					$return .= implode(",\n", $INSERT) .";";
				}
			}
			else{
				$return .= "\n\n-- \n";
				$return .= "-- ". __('No Record Found.', GuiForm_Plugin::NAME). "\n";
				$return .= "--";
			}
			
			$return.="\n\n\n";
		}
		
		
		date_default_timezone_set('GMT');
		$filename = date("Y-m-d-H-i", strtotime("now"-8));
		$filename = strtolower(str_replace(" ", "-", $filename));
		
		
		//save file
		if($_POST['zip']){
			$zip = new ZipArchive;
			$zip_name = $filename .'.zip';
			$res = $zip->open($zip_name, ZipArchive::CREATE);
			if ($res === TRUE) {
		    $zip->addFromString('guiform.sql', $return);
		    $zip->close();
			} 

			header( 'Cache-Control: must-revalidate, post-check=0, pre-check=0' );
			header( 'Content-Description: File Transfer' );
			header( 'Content-Disposition: attachment; filename="'.$zip_name.'"');
			header( 'Content-type: application/zip');
			header( 'Content-Length: ' . strlen($return));
			header( 'Expires: 0' );
			header( 'Pragma: public' );
			readfile($zip_name);
			unlink($zip_name);

//			$zp = gzopen(ABSPATH. '/' . 'db-backup-'.time().'-'.(md5(implode(',',$tables))).'.sql.gz', "w9");
//			gzwrite($zp, $return);
//			gzclose($zp);
		} 
		else{
			$content_type = 'text/sql';
			header( 'Cache-Control: must-revalidate, post-check=0, pre-check=0' );
			header( 'Content-Description: File Transfer' );
			header( 'Content-Disposition: attachment; filename=' . $filename .'.sql' );
			header( "Content-Type: $content_type; charset=" . get_option( 'blog_charset' ), true );
			header( 'Expires: 0' );
			header( 'Pragma: public' );
			echo $return;
		}
		exit();
		
	}
	
	/**
	 * Export form settings to PHP array.
	 *
	 * @since 1.0
	 * @access public
	 * @param $table array
	 * @param $zip boolean
	 */
	public function exportFormPhp($table = array(), $zip = false){
		global $wpdb, $guiform;
		
		$forms = array_map('esc_html', $_POST['forms']);
	  $form_column = $wpdb->get_col("SHOW COLUMNS FROM $wpdb->guiform");
	  $data = array();
		
		foreach($forms as $id) {
			
			$table = $wpdb->guiform_form.$id;
			
			$form = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform WHERE id = %d", $id), ARRAY_A);
			
			$data[$id]['form'] = $form;
			$data[$id]['function'] = esc_html($_POST['entry_function']);			
			
			if(isset($_POST['drop_table'])) $data[$id]['drop'] = "DROP TABLE IF EXISTS `$table`;";
				
			if(isset($_POST['schema'])){
				$structure = $wpdb->get_row("SHOW CREATE TABLE $table", ARRAY_A);
			  $schema = str_replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS', $structure['Create Table']);
				$data[$id]['schema'] = str_replace("\n", '', $schema);
			}
			
			if(isset($_POST['entry'])){
				$data[$id]['data'] = $wpdb->get_results("SELECT * FROM $table", ARRAY_A);
			}
		}
		
		date_default_timezone_set('GMT');
		$filename = date("Y-m-d-H-i", strtotime("now"-8));
		$filename = strtolower(str_replace(" ", "-", $filename));
		
		
		//save file
		if($_POST['zip']){
			$zip = new ZipArchive;
			$zip_name = $filename .'.zip';
			$res = $zip->open($zip_name, ZipArchive::CREATE);
			if ($res === TRUE) {
				
				ob_start();
				echo "<?php\n\n";
				echo '$data = ';
				var_export($data);
				echo "\n\n?>";
				$text = ob_get_contents();
				ob_end_clean();
		
		    $zip->addFromString('export-data.php', $text);
		    $zip->close();
			} 

			header( 'Content-Description: File Transfer' );
			header( 'Content-Disposition: attachment; filename="'.$zip_name.'"');
			header( 'Content-Length: ' . strlen($text));
			readfile($zip_name);
			unlink($zip_name);
		} 
		else{
			$content_type = 'text/php';
			header( 'Content-Description: File Transfer' );
			header( 'Content-Disposition: attachment; filename=' . $filename .'.php' );
			header( "Content-Type: $content_type; charset=" . get_option( 'blog_charset' ), true );
			
			echo "<?php\n\n";
			echo '$data = ';
			var_export($data);
			echo "\n\n?>";
		}
		exit();
	}
	
	/**
	 * Import form settings.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function importFormPhp(){
		
		if(strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION)) == "php"){
			include_once( $_FILES['file']['tmp_name'] );
			global $wpdb, $guiform;
			
			if(@is_file(ABSPATH.'/wp-admin/includes/upgrade.php')) {
				include_once(ABSPATH.'/wp-admin/includes/upgrade.php');
			}elseif(@is_file(ABSPATH.'/wp-admin/upgrade-functions.php')) {
				include_once(ABSPATH.'/wp-admin/upgrade-functions.php');
			}else {
				die('We have problem finding your \'/wp-admin/upgrade-functions.php\' and \'/wp-admin/includes/upgrade.php\'');
			}
			
			if(sizeof($data)){
				foreach($data as $id => $row){
					if(isset($row['drop']) && $row['function'] == 'replace'){
						$wpdb->query($row['drop']);
					}
					
					if($row['function'] == 'insert'){
						$old_id = $id;
						$id = $wpdb->get_var($wpdb->prepare("SELECT `id` FROM $wpdb->guiform ORDER BY `id` DESC")) + 1;
						$row['schema'] = str_replace($wpdb->guiform_form.$old_id, $wpdb->guiform_form.$id, $row['schema']);
					  $row['form']['id'] = $id;
					  $wpdb->insert( $wpdb->guiform, $row['form'] );
					}
					else{
						$wpdb->replace( $wpdb->guiform, $row['form'] );
					}
					
					maybe_create_table($wpdb->guiform_form.$id, $row['schema']);	
					
					if(sizeof($row['data'])){
						$values = array();
						$esc = array();
						$index = 0;
						$column = implode("`, `", array_keys($row['data'][0]));
						$query = "INSERT INTO ". $wpdb->guiform_form.$id ." (`". $column ."`) VALUES ";
						foreach($row['data'] as $key => $entry){
							$values[$index++] = "('". implode("', '", array_values($entry)) ."')";
						}
						
						$query .= implode(", ", $values) .";";
						
						$wpdb->query($query);
					}
					
				}
			}
		}
		
	  exit();
	}
	
}