<?php

if(!current_user_can('manage_guiform')) {
	die('Access Denied');
}

class Uninstall{
	
	private $tables = array();
	private $wpdb;
	
	private function __construct(){}
	
	public function init(){
		global $wpdb;
		$this->wpdb = $wpdb;	
		$this->tables = self::_tables();
		self::_page_title();
		if(isset($_POST['do']) && $_POST['uninstall_guiform_yes'] == 'yes')
			self::_process();
		else
			self::_display();
	}
	
	private function _page_title(){
		?>
		<h2><?php _e('Uninstall GuiForm', 'guiform'); ?></h2>
		<?php
	}	
	
	private function _process(){
		delete_option('GUIFORM_VERSION');
		echo '<div id="message" class="updated fade" style="margin: 0px;">';
		echo '<p>';
		$tables = array($this->wpdb->guiform, $this->wpdb->guiform_options);
		foreach($tables as $table) {
			$this->wpdb->query("DROP TABLE {$table}");
			echo '<font style="color: green;">';
			printf(__('Table \'%s\' has been deleted.', 'guiform'), "<strong><em>{$table}</em></strong>");
			echo '</font><br />';
		}
		echo '</p>';
		echo '<p>';
		foreach($this->tables as $row) {
			$table = $this->wpdb->guiform_form.$row->id;
			$this->wpdb->query("DROP TABLE {$table}");
			echo '<font style="color: green;">';
			printf(__('Table \'%s\' has been deleted.', 'guiform'), "<strong><em>{$table}</em></strong>");
			echo '</font><br />';
		}
		echo '</p>';
		echo '</div>'; 
		
		self::_deactivate();
	}
	
	private function _deactivate(){
		$deactivate_url = wp_nonce_url('plugins.php?action=deactivate&amp;plugin=guiform/guiform.php', 'deactivate-plugin_guiform/guiform.php');
		echo '<div class="wrap">';
		echo '<p><strong>'.sprintf(__('<a href="%s">Click Here</a> To Finish The Uninstallation And GuiForm Will Be Deactivated Automatically.', 'guiform'), $deactivate_url).'</strong></p>';
		echo '</div>';
	}
	
	private function _tables(){
		return $this->wpdb->get_results("SELECT id, title FROM ". $this->wpdb->guiform, OBJECT);
	}
	
	private function _display(){
		?>
		<form method="post" action="<?php echo admin_url('admin.php?page=guiform/uninstall'); ?>">
		<div class="wrap">
			<p>
				<?php _e('Deactivating GuiForms plugin does not remove any data that may have been created, such as form entries and tables. To completely remove this plugin, you can uninstall it here.', 'guiform'); ?>
			</p>
			<p style="color: red">
				<strong><?php _e('WARNING:', 'guiform'); ?></strong><br />
				<?php _e('Once uninstalled, this cannot be undone. You should use a Database Backup plugin of WordPress to back up all the data first.', 'guiform'); ?>
			</p>
			<p style="color: red">
				<strong><?php _e('The following WordPress Tables will be DELETED:', 'guiform'); ?></strong><br />
			</p>
			<table class="widefat">
				<thead>
					<tr>
						<th><?php _e('GuiForm Tables', 'guiform'); ?></th>
					</tr>
				</thead>
				<tr>
					<td valign="top">
						<ol>
							<li><?php echo $this->wpdb->guiform; ?></li>
							<li><?php echo $this->wpdb->guiform_options; ?></li>
						<?php
							foreach($this->tables as $row){
								$table = $this->wpdb->guiform_form.$row->id;
								if($this->wpdb->get_var("SHOW TABLES LIKE '$table'") == $table){
									echo '<li>'. $table . "<i style='font-weight: bold;'> (Form Title: $row->title)</i>"	.'</li>'."\n";
								}
							}
						?>
						</ol>
					</td>
				</tr>
			</table>
			<p style="text-align: center;">
				<?php _e('Do you really want to uninstall GuiForm?', 'guiform'); ?><br /><br />
				<input type="checkbox" name="uninstall_guiform_yes" value="yes" />&nbsp;<?php _e('Yes', 'guiform'); ?><br /><br />
				<input type="submit" name="do" value="<?php _e('UNINSTALL GuiForm', 'guiform'); ?>" class="button-primary" onclick="return confirm('<?php _e('You Are About To Uninstall GuiForm From WordPress.\nThis Action Is Not Reversible.\n\n Choose [Cancel] To Stop, [OK] To Uninstall.', 'guiform'); ?>')" />
			</p>
		</div>
		</form>
		<?php
	}
}

Uninstall::init();