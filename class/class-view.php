<?php

class View{
	
	var $entry;
	var $data;
	var $form;
	var $pagehook;
	var $server;
	
	function __construct($screen){
		global $guif;
		$this->pagehook = $screen->id;
		$this->entry    = esc_html($_GET['entry']);
		$this->form     = $guif->guiform(esc_sql($_GET['form']), 'row');
		$this->field    = $guif->entry($this->form['id'], $this->entry);
		$this->data     = $guif->guiform($this->form['id'], 'data');
		$this->server   = $guif->server($this->form['id']);
		add_action('load-'. $this->pagehook, $this->init());
	}
	
	function init(){
		add_filter('screen_layout_columns', array(&$this, 'on_screen_layout_columns'), 10, 2);
		add_meta_box('guiform-metaboxes-details', 'Details', array(&$this, 'metabox_details'), $this->pagehook, 'side', 'high');
		add_meta_box('guiform-metaboxes-page', 'Page', array(&$this, 'metabox_page'), $this->pagehook, 'side', 'core');
		add_meta_box('guiform-metaboxes-entry', 'Information', array(&$this, 'metabox_entry'), $this->pagehook, 'normal', 'core');
		add_meta_box('guiform-metaboxes-header', 'Navigation', array(&$this, 'metabox_header'), $this->pagehook, 'advance', 'core');		
	}
	
	function on_screen_layout_columns($columns, $screen){
		if (!defined( 'WP_NETWORK_ADMIN' ) && !defined( 'WP_USER_ADMIN' )) {
			if ($screen == $this->pagehook) {
				$columns[$this->pagehook] = 2;
			}
		}
		return $columns;
	}
	
	function metabox_details($data){
		
		$date_submitted = sprintf('%1$s', date("Y M d, g:i a", strtotime($data['guif_date_submitted'])));
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
					 	<span><strong>'. __('IP Address' , 'guiform') .' : </strong>'. $data['guif_ip'] .'</span>
					 </div>
					 <div class="misc-pub-section">
					 	<span><strong>'. __('OS' , 'guiform') .' : </strong>'. $data['guif_os'] .'</span>
					 </div>
					 <div class="misc-pub-section">
					 	<span><strong>'. __('Browser' , 'guiform') .' : </strong>'. $data['guif_browser'] .'</span>
					 </div>
				 </div>';
		
	}
	
	function metabox_entry(){
		global $guif;
		
		unset($this->field['id']);
		unset($this->field['guif_read']);
		unset($this->field['guif_status']);
		unset($this->field['guif_ip']);
		unset($this->field['guif_date_submitted']);
		unset($this->field['guif_browser']);
		unset($this->field['guif_os']);
		$labels = $guif->array_column($this->data, array('label', 'type'), 'name');

		$html = "<table class='widefat'><tbody>";
		
		if(count($this->field) > 0){
			foreach($this->field as $key => $value){
				$label = !empty($labels[$key]) ? $labels[$key] : $key;
				if($guif->is_serial($value)){
					$value = unserialize($value);
					$html .= "<tr class='label'><td>$label[0] :</td></tr><tr class='value'><td><ul>";
					foreach($value as $file => $row){
						if($labels[$key][1] == "f_file"){
							$file = $guif->upload_folder($file, true);
							$html .= "<li><a target='_blank' href='$file'>$row[0]</a></li>";
						}
						else{
							$html .= "<li>$row</li>";
						}
					}
					$html .= "</ul></td></tr>";
				}
				else{
					$label = is_array($label) ? $label[0] : $label;
					$html .= "<tr class='label'><td>$label :</td></tr><tr class='value'><td>$value</td></tr>";
			
				}
			}
		}
		else{
				$html .= "<tr class='value'><td>No entry found.</td></tr>";
		}
		
		$html .= "</tbody></table>";
		echo $html;
		
	}
	
	function metabox_page(){
		global $wpdb, $guif;
		
		$entry = esc_sql(trim($_REQUEST['entry']));
		$form = esc_sql(trim($_REQUEST['form']));
		$table = $wpdb->guiform_form.$form;
		
		$status = (isset($_REQUEST['entry_status'])) ? $_REQUEST['entry_status'] : 'all';
	
		if($status === 'all') $status = 1;
		if($status === 'trash') $status = 0;
		if($status === 'spam') $status = 2;
		  
		$sql = "SELECT(SELECT id FROM $table WHERE id < %d AND guif_status = %d ORDER BY id DESC LIMIT 1) AS previd,
						(SELECT id FROM $table WHERE id > %d AND guif_status = %d ORDER BY id ASC LIMIT 1) AS nextid";
						
		$sql_size = "SELECT COUNT(*) FROM $table WHERE guif_status = %d";	
		$sql_pos = "SELECT COUNT(*) FROM $table WHERE id <= %d AND guif_status = %d";			
  
  	$wpdb->update($table, array('guif_read' => 1), array('id' => $entry), array('%d'), array('%d'));
		
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
				  	<a href='$prev_url'><span class='button icon-fontawesome-webfont-18' title='Preview'></span></a>
				  	<a href='$next_url'><span class='button icon-fontawesome-webfont-24' title='Next'></span></a>
			    </div>";
	}
	
	function metabox_header(){
		
		global $guif;
		
		$form    = add_query_arg(array('page'  => 'guiform/form-builder', 'form'  => $this->form['id'], 'entry' => false)); 
		$entries = add_query_arg(array('entry' => false));
		$preview = $guif->permalink().$this->form['id']; 
		
		echo "<ul>
						<li style='width: 100px;'><a href='$form'><div class='icon' data-icon='&#xe070;'><span> Form Builder</span></div></a></li>
						<li style='width: 75px;'><a target='_blank' href='$preview'><div class='icon' data-icon='&#xe09a;'><span> Preview</span></div></a></li>
						<li style='width: 70px;'><a href='$entries'><div class='icon' data-icon='&#xe01d;'><span> Entries</span></div></a></li>
						<li style='width: 100px;' class='guif-action'><a class='unread-entry' id='entry-". $this->entry ."' href='javascript:void(0);'><div class='icon' data-icon='&#xe021;'><span> Mark unread</span></div></a></li>
						<li style='width: 60px;' class='guif-action'><a class='delete-entry' id='entry-". $this->entry ."' href='javascript:void(0);'><div class='icon' data-icon='&#xe000;'><span> Trash</span></div></a></li>
					</ul>";
	}
	
	function on_show_page(){
		
		global $screen_layout_columns;
		$data = $this->field;
		
		?>
		<div id="guif-view-entry" class="wrap">
			<?php screen_icon('themes'); ?>
			<h2><?php echo $this->form['title']; ?></h2>
	
			<form action="admin-post.php" method="post">
				<?php wp_nonce_field('guiform-metaboxes-general'); ?>
				<?php wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false); ?>
				<?php wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false); ?>
				<input type="hidden" id="form-list" value="<?php echo $_GET['form']; ?>">
				<div id="guiform" class="metabox-holder columns-<?php echo $screen_layout_columns; ?>">
					<div class="postbox-container" id="container-1">
						<?php do_meta_boxes($this->pagehook, 'advance', $data); ?>
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
		
		<script type="text/javascript">
			//<![CDATA[
			jQuery(document).ready( function($) {
				// close postboxes that should be closed
				$('.if-js-closed').removeClass('if-js-closed').addClass('closed');
				// postboxes setup
				postboxes.add_postbox_toggles('<?php echo $this->pagehook; ?>');
			});
			//]]>
		</script>
		
		<?php
	}
}