<?php

if(!current_user_can('manage_guiform')){
	die('Access Denied');
}

class Settings_Page{
	
	var $tab;
	
	function __construct(){
		$this->tab = (isset($_GET['tab'])) ? $_GET['tab'] : 'general';
	}
	
	function build(){
		echo "<div id='settings'>";
		$this->header($this->tab);
		$this->page();
		echo "</div>";
	}
	
	function header($current = 'general'){
		$tabs = array('general'       => 'General', 
									'mail'          => 'Mail Setup',
									'performance'   => 'Speed Performance'
									); 
									
	  $links = array();
	  
	  echo '<div id="icon-themes" class="icon32"><br></div>';
	  echo '<h2 class="nav-tab-wrapper">';
	  foreach( $tabs as $tab => $name ){
			$url = add_query_arg(array('tab' => $tab, 'orderby' => false, 'order' => false ));
			$class = ( $tab == $current ) ? ' nav-tab-active' : '';
			echo "<a class='nav-tab$class' href='{$url}'>$name</a>";
	  }
	  echo '</h2>';
	}
	
	function page(){
		switch($this->tab) {
			case 'general':
			$this->page_general_update();			
			$this->page_general();
			break;
			case 'mail':
			$this->page_mail();
			break;
			case 'performance':
			$this->page_performance_update();	
			$this->page_performance();
			break;
		}
	}
	
	private function page_mail(){
		global $guif_class;
		$url = add_query_arg('','');
		$guif_class->process_bulk_action();
		$guif_class->show_message();
		echo "<form id='mail-filter' method='post' action='$url'>";
		echo '<div><a id="add-mail" class="button-primary" title="Add Database Connection" href="javascript:void(0)">Add New Mail</a></div>';
		$guif_class->views();
		$guif_class->prepare_items();
		$guif_class->display();
		$guif_class->get_column_info();
		echo "</form>";
	}
	
	private function page_general(){
		require_once('page-general-settings.php');
	}
	
	private function page_performance(){
		require_once('page-performance.php');
	}
	
	private function page_general_update(){
		global $guif;
		
		if(isset($_POST['submit'])){
			
			$autosave = $_POST['autosave'];
			$autosave_time = intval($_POST['autosave_time']);
			$skin = esc_html($_POST['skin']);
			$upload_folder = esc_html(trim($_POST['upload_folder']));
			$selection = esc_html($_POST['selection']);
			$guif->update_option(0, 'skin', $skin);
			
			if(isset($autosave)){
				$guif->update_option(0, 'autosave', 1);
			}
			else{
				$guif->update_option(0, 'autosave', 0);
			}
			
			if(is_int($autosave_time)){
				if($autosave_time < 60){
					$guif->update_option(0, 'autosave_time', 60);
				}
				else{
					$guif->update_option(0, 'autosave_time', $autosave_time);
				}
			}
			
			if(isset($upload_folder)){
				if(empty($upload_folder)){
					$guif->update_option(0, 'upload_folder', 'wp-content/uploads/guiform');
				}
				else{
		      $dir = ABSPATH;
					$dir = $dir.'/'.$upload_folder;
					$current_folder = $guif->get_option(0, 'upload_folder');
					
					if($upload_folder != $current_folder){
						if(!file_exists($dir)){
						
							if (!@mkdir($dir, 0700, true)) {
								echo '<div class="error"><p><strong>Invalid Upload Folder.</strong></p></div>';
								$guif->update_option(0, 'upload_folder', 'wp-content/uploads/guiform');
							}
							else{
								$guif->update_option(0, 'upload_folder', $upload_folder);
							}
							
							$source = ABSPATH.$current_folder;
							$this->copy_directory($source, $dir);
							$this->delete_directory($source);
						}
						else{
							echo '<div class="error"><p><strong>Directory is already exist.</strong></p></div>';
						}
					}
				}
			}
			
			$custom = esc_html($_POST['custom']);
			if($selection == 'custom' && !empty($custom)){
				$permalink = $guif->get_option(0, 'permalink');
				$permalink['selection'] =  'custom';
				$permalink['value']     =  esc_html($_POST['custom']);
				$guif->update_option(0, 'permalink', $permalink);
			}
			else{
				$permalink['selection'] =  'default';
				$permalink['value']     =  'form';
				$guif->update_option(0, 'permalink', $permalink);
			}
			
			echo '<div class="updated"><p><strong>Update settings succesful.</strong></p></div>';
		}
	}
	
	private function copy_directory( $source, $destination ) {
		if ( is_dir( $source ) ) {
		@mkdir( $destination );
			$directory = dir( $source );
			while ( FALSE !== ( $readdirectory = $directory->read() ) ) {
			  if ( $readdirectory == '.' || $readdirectory == '..' ) {
			      continue;
			  }
			  $PathDir = $source . '/' . $readdirectory; 
			  if ( is_dir( $PathDir ) ) {
			      $this->copy_directory( $PathDir, $destination . '/' . $readdirectory );
			      continue;
			  }
			  copy( $PathDir, $destination . '/' . $readdirectory );
			}
			
			$directory->close();
		}else {
			copy( $source, $destination );
		}
	}
	
	private function delete_directory($source){
		return is_file($source) ?
            @unlink($source) :
            array_map(array(&$this, 'delete_directory'), glob($source.'/*')) == @rmdir($source);
  }
  
  private function page_performance_update(){
		global $guif;
		
		if(isset($_POST['submit'])){
			
			$autosave = $_POST['performance'];
			
			if(isset($autosave)){
				$guif->update_option(0, 'performance', 1);
			}
			else{
				$guif->update_option(0, 'performance', 0);
			}
			
			
			echo '<div class="updated"><p><strong>Update settings succesful.</strong></p></div>';
		}
	}
  
}