<?php

// +----------------------------------------------------------------------+
// | Copyright 2013  GuiForm  (email : info@guiform.com)                  |
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
 * View entry page.
 *
 * @category GuiForm
 * @package Render
 *
 * @since 1.0
 */
class GuiForm_Render_View extends GuiForm_Module  {
	
	const NAME = __CLASS__;
		
	var $entry;
	var $data;
	var $form;
	var $pagehook;
	var $server;
	var $field;
	var $navigation;
	
	public function __construct($screen) {
		global $guiform;
		$this->pagehook = $screen->id;
		$this->entry    = esc_html($_GET['entry']);
		$this->form     = $guiform->form($_GET['form'], 'row');
		$this->field    = $guiform->entry($_GET['form'], $this->entry);
		$this->data     = $guiform->form($_GET['form'], 'data');
		$this->server   = $guiform->server($_GET['form']);
		$this->_addAction('load-'. $this->pagehook, $this->init());
		$this->_addAction('admin_enqueue_scripts', 'scripts');
		
		$this->navigation = new GuiForm_Module_Navigation();
		$this->navigation->init(GuiForm_Render_View::NAME, $_REQUEST['form'], $this->entry);
	}
	
	public function init(){
		$this->_addFilter('screen_layout_columns', 'on_screen_layout_columns', 10, 2);
		$this->_addMetaBox('guiform-metaboxes-details', 'Details',     'metabox_details', $this->pagehook, 'side',    'high');
		$this->_addMetaBox('guiform-metaboxes-page',    'Page',        'metabox_page',    $this->pagehook, 'side',    'core');
		$this->_addMetaBox('guiform-metaboxes-entry',   'Information', 'metabox_entry',   $this->pagehook, 'normal',  'core');
		//$this->_addMetaBox('guiform-metaboxes-header',  'Navigation',  'metabox_header',  $this->pagehook, 'advance', 'core');		
	}
	
		/**
	 * Load necessary javascript library and css.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function scripts($hook_suffix){
		global $wpdb;
		
		if($hook_suffix == 'toplevel_page_guiform' || $hook_suffix == 'guiform_page_guiform-entry'){
			global $guiform;
			
			wp_enqueue_script('jquery-ui-sortable');
			wp_enqueue_script('postbox');
			
			wp_enqueue_style('guiForm-fonts', $guiform->assets('fonts/icons.css'));
			
			wp_enqueue_script('guifbox', $guiform->assets('js/guifbox.js'), array('jquery'), GuiForm_Plugin::VERSION, true);
		 	wp_enqueue_style('guifbox', $guiform->assets('css/guifbox.css'), false, GuiForm_Plugin::VERSION, 'all');
			
			wp_enqueue_style('guiform-manage', $guiform->assets('css/manage-form.css'), false, GuiForm_Plugin::VERSION, 'all');	
			
			wp_enqueue_script('guiform-script', $guiform->assets('js/script.js'), array('jquery'), GuiForm_Plugin::VERSION, true);
			wp_localize_script('guiform-script', 'guiform', array(
			  'nonce'       => wp_create_nonce( "guiform_nonce" ),
				'plugins_url' => plugins_url('guiform/'),
				'form'        => esc_sql($_REQUEST['form']),
				'entry'       => esc_sql($_REQUEST['entry']),
				'type'        => 'view',
				'entries_url' => add_query_arg(array('entry' => false))
			));
		}
	}
	
	public function on_screen_layout_columns($columns, $screen){
		if (!defined( 'WP_NETWORK_ADMIN' ) && !defined( 'WP_USER_ADMIN' )) {
			if ($screen == $this->pagehook) {
				$columns[$this->pagehook] = 2;
			}
		}
		return $columns;
	}
	
	public function metabox_details($data){
		
		$date_submitted = sprintf('%1$s', date("Y M d, g:i a", strtotime($data['guiform_date_submitted'])));
		echo'<div id="misc-publishing-actions">
					 <div class="misc-pub-section">
					 	<span><strong>'. __('Entry Id' , 'guiform') .' : </strong>'. $data['id'] .'</span>
					 </div>
					 <div class="misc-pub-section">
					 	<span><strong>'.  __('Date Submitted' , 'guiform') .' : </strong>'. $date_submitted .'</span>
					 </div>
					 <div class="misc-pub-section">
					 	<span><strong>'. __('Database Server' , 'guiform') .' : </strong>'. $this->server['host'] .'</span>
					 </div>
					 <div class="misc-pub-section">
					 	<span><strong>'. __('IP Address' , 'guiform') .' : </strong>'. $data['guiform_ip'] .'</span>
					 </div>
					 <div class="misc-pub-section">
					 	<span><strong>'. __('OS' , 'guiform') .' : </strong>'. $data['guiform_os'] .'</span>
					 </div>
					 <div class="misc-pub-section">
					 	<span><strong>'. __('Browser' , 'guiform') .' : </strong>'. $data['guiform_browser'] .'</span>
					 </div>
				 </div>';
		
	}
	
	/**
	 * Check array key column and value.
	 *
	 * @since 1.0
	 * @access public
	 * @return $db array
	 */
	public function arrayColumn($array, $colName, $key){
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
	
	public function metabox_entry(){
		global $guiform;
		
		unset($this->field['id']);
		unset($this->field['guiform_read']);
		unset($this->field['guiform_status']);
		unset($this->field['guiform_ip']);
		unset($this->field['guiform_date_submitted']);
		unset($this->field['guiform_browser']);
		unset($this->field['guiform_os']);
		$labels = self::arrayColumn($this->data, array('label', 'type'), 'name');

		$html = "<table class='widefat'><tbody>";
		if(count($this->field) > 0){
			
			foreach($this->field as $key => $value){
				$value = stripslashes_deep($value);
				$label = !empty($labels[$key]) ? $labels[$key] : $key;
				if($guiform->isSerial($value)){
					
					$value = unserialize($value);
					$html .= "<tr class='label'><td>$label[0] :</td></tr><tr class='value'><td><ul>";
					foreach($value as $file => $row){
						if($labels[$key][1] == "f_file"){
							$file = $guiform->uploadFolder($file, $row['path'], true);
							$html .= "<li><a target='_blank' href='$file'>".$row['name']." <span class='size'>".$guiform->bytesToSize($row['size']) ."</span></a></li>";
						}
						else{
							$html .= "<li>$row</li>";
						}
					}
					$html .= "</ul></td></tr>";
				}
				else{
					$label = is_array($label) ? $label[0] : $label;
					if($labels[$key][1] == 'f_textarea'){
						$value = str_replace(array("\\r\\n", "\\t"), array("\r\n", "\t"), "$value");
						$value = stripcslashes($value);
						$value = (!empty($value)) ? "<textarea readonly='readonly' style='width: 97%; height: 394px; resize: vertical;'>$value</textarea>" : '';
						$html .= "<tr class='label'><td>$label :</td></tr><tr class='value'><td>$value</td></tr>";
					}
					else if($labels[$key][1] == 'f_password'){
						$value = stripslashes($value);
						$html .= "<tr class='label'><td>$label : <i>(md5 Encrypted)</i></td></tr><tr class='value'><td>$value</td></tr>";
					}
					else{
						$value = stripslashes($value);
						$html .= "<tr class='label'><td>$label :</td></tr><tr class='value'><td>$value</td></tr>";
					}
				}
			}
		}
		else{
			$html .= "<tr class='value'><td>No entry found.</td></tr>";
		}
		
		$html .= "</tbody></table>";
		echo $html;
		
	}
	
	public function metabox_page(){
		global $wpdb;
		
		$entry = esc_sql(trim($_REQUEST['entry']));
		$form = esc_sql(trim($_REQUEST['form']));
		$table = $wpdb->guiform_form.$form;
		
		$status = (isset($_REQUEST['entry_status'])) ? $_REQUEST['entry_status'] : 'all';
	
		if($status === 'all') $status = 1;
		if($status === 'trash') $status = 0;
		if($status === 'spam') $status = 2;
		  
		$sql = "SELECT(SELECT id FROM $table WHERE id < %d AND guiform_status = %d ORDER BY id DESC LIMIT 1) AS previd,
						(SELECT id FROM $table WHERE id > %d AND guiform_status = %d ORDER BY id ASC LIMIT 1) AS nextid";
						
		$sql_size = "SELECT COUNT(*) FROM $table WHERE guiform_status = %d";	
		$sql_pos = "SELECT COUNT(*) FROM $table WHERE id <= %d AND guiform_status = %d";			
  
  	$wpdb->update($table, array('guiform_read' => 1), array('id' => $entry), array('%d'), array('%d'));
		
  	$size = $wpdb->get_var($wpdb->prepare($sql_size, array($status)));
	 	$pos  = $wpdb->get_var($wpdb->prepare($sql_pos, array($entry, $status)));
		$row  = $wpdb->get_row($wpdb->prepare($sql, array($entry, $status, $entry, $status)), ARRAY_A);
     
		$prev_url = add_query_arg(array('entry' => $row['previd']));  
		if(empty($row['previd'])){
			$prev_url = "javascript:void(0)"; 
		}  
		  
		$next_url = add_query_arg(array('entry' => $row['nextid']));  
		if(empty($row['nextid'])){
			$next_url = "javascript:void(0)"; 
		}   
		
    echo "<div class='button-wrap'> 
            <span class='guif-size'>Page <strong>$pos</strong> of <strong>$size</strong></span>
				  	<a href='$prev_url'><span class='button' data-icon='&#xe099;' title='Preview'></span></a>
				  	<a href='$next_url'><span class='button' data-icon='&#xe09d;' title='Next'></span></a>
			    </div>";
	}
	
	public function metabox_header(){
		
		global $guiform;
		
		$form    = add_query_arg(array('page'  => 'guiform-builder', 'form'  => $_REQUEST['form'], 'entry' => false)); 
		$entries = add_query_arg(array('entry' => false));
		$preview = $guiform->permalink($_REQUEST['form'], false, false); 
		
		echo "<ul>
						<li style='width: 100px;'><a href='$form'><div class='icon' data-icon='&#xe070;'><span> Form Builder</span></div></a></li>
						<li style='width: 75px;'><a target='_blank' href='$preview'><div class='icon' data-icon='&#xe09a;'><span> Preview</span></div></a></li>
						<li style='width: 70px;'><a href='$entries'><div class='icon' data-icon='&#xe01d;'><span> Entries</span></div></a></li>
						<li style='width: 100px;'><a class='guif-action' data-id='". $this->entry ."' data-action='mark-unread' href='javascript:void(0);'><div class='icon' data-icon='&#xe098;'><span> Mark unread</span></div></a></li>
						<li style='width: 60px;'><a class='guif-action' data-id='". $this->entry ."' data-action='trash-entry' href='javascript:void(0);'><div class='icon' data-icon='&#xe000;'><span> Trash</span></div></a></li>
					</ul>";
	}
	
	public function toHTML(){
		global $screen_layout_columns;
		$data = $this->field;		
		?>
		<div id="guiform-manager" class="wrap view-entry metabox-holder">
		<!--div id="guif-view-entry" class="wrap"-->
			<?php screen_icon('themes'); ?>
			<h2><?php echo $this->form->title; ?></h2>
	
			<form action="admin-post.php" method="post">
				<?php wp_nonce_field('guiform-metaboxes-general'); ?>
				<?php wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false); ?>
				<?php wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false); ?>
				<input type="hidden" id="form" value="<?php echo $_GET['form']; ?>">
				<div id="guiform" class="metabox-holder columns-<?php echo $screen_layout_columns; ?>">
					<div class="postbox-container" id="container-1">
						<?php $this->navigation->toHTML(); ?>
						<!--?php do_meta_boxes($this->pagehook, 'advance', $data); ?-->
					</div>
					<div class="postbox-container" id="container-2">
						<?php do_meta_boxes($this->pagehook, 'normal', $data); ?>
					</div>
					<div class="postbox-container" id="container-3">
						<?php do_meta_boxes($this->pagehook, 'side', $data); ?>
					</div>
				</div>	
			</form>
		</div>
		<?php
	}
}