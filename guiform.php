<?php
/*
Plugin Name: GuiForm
Plugin URI: https://www.guiform.com
Description: Awesome form builder with lots of features like <strong>wysiwyg user interface, display form in other website, no conflict with themes css and much more</strong>.
Author: Russell C. Pabon
Author URI: http://russellpabon.com
Version: 1.4.7
*/

/*  Copyright 2013-2014 Russell C. Pabon (email: russellpabon@guiform.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

/**
 * Remove unwanted error or display of message from other plugins.
 * 
 * @since 1.3.1
 */
ob_get_clean();

/**
 * Plugin absolute file path.
 *
 * @since 1.0
 */
define('GUIFORM_ABSPATH', trailingslashit(plugin_dir_path(__FILE__)));

// Load configuration file
require_once(GUIFORM_ABSPATH .'config.php');

// Load API class
require_once(GUIFORM_ABSPATH .'class/class-api.php');
require_once(GUIFORM_ABSPATH .'class/class-ajax.php');

// Main Class
class GuiForm extends GuiForm_API{

	/**
	 * Form id
	 *
	 * @since 1.0
	 * @var integer
	 * @access private
	 */
	private $id;
	
	/**
	 * Current admin URL
	 *
	 * @since 1.0
	 * @var string
	 * @access private
	 */
	private $admin_url;
	
	/**
	 * Constructor. Register core filters and actions.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function __construct(){
		
		parent::__construct(); 
		
		global $pagenow;
		$this->id = (isset($_GET['form'])) ? esc_sql($_GET['form']) : "";
		$this->actions();
		$this->filter();
		//Check current page
		if(isset($_GET['page'])){
			$this->admin_url = get_admin_url().$pagenow.'?page='.trim($_GET['page']).(isset($_GET['entry_status']) ? '&entry_status='.$_GET['entry_status'] : '');
		}
	}
	
	/**
	 * Register hook add_action.
	 *
	 * @since 1.0
	 * @access private
	 */
	private function actions(){
		add_action('admin_init', array($this, 'flush_rewrite'));
		add_action('enqueue_footer_script', array($this, 'footer_script'));
		add_action('generate_rewrite_rules', array(&$this, 'rewrite_rules'));
		add_action('admin_menu', array(&$this, 'menu'));
		add_action('admin_enqueue_scripts', array(&$this, 'admin_scripts'));
		add_action('activate_guiform/guiform.php', array(&$this, 'create_table'));
		add_action('media_buttons', array($this, 'add_media_button'), 777);
		add_action("wp_ajax_guiform_media_button", array($this, "ajax_media_button"));
		add_action("wp_ajax_guiform_form_preview", array($this, "ajax_form_preview"));
		add_shortcode('GuiForm', array(&$this, 'form_output'));
		add_action('parse_request', array($this, 'action_parse_request'));
		add_action('plugins_loaded', array(&$this, 'update_plugin'));
	}
	
	
	/**
	 * Check for update and options settings.
	 *
	 * @since 1.4.7
	 * @access private
	 */
	public function update_plugin(){
		global $wpdb; 
		
		@unlink(GUIFORM_ABSPATH .'.htaccess');
		@unlink(GUIFORM_ABSPATH .'format.php');
		@unlink(GUIFORM_ABSPATH .'api.php');
		@unlink(GUIFORM_ABSPATH .'ajax.php');
		@unlink(GUIFORM_ABSPATH .'class/class-settings-general.php');
		
		$wpdb->delete($wpdb->guiform_options, array('type' => 'data-structure'), array('%s'));
		$wpdb->query("ALTER TABLE $wpdb->guiform CHANGE COLUMN `init` `init` MEDIUMTEXT NULL AFTER `html`");
		$wpdb->query("ALTER TABLE $wpdb->guiform CHANGE COLUMN `template` `template` VARCHAR(100) NULL AFTER `database`");
		$wpdb->query("ALTER TABLE $wpdb->guiform CHANGE COLUMN `database` `database` SMALLINT(6) NOT NULL DEFAULT '0' AFTER `init`");
	
		if(count($wpdb->get_row($wpdb->prepare("SELECT name FROM $wpdb->guiform_options WHERE name = '%s'", 'performance'))) == 0)
			$wpdb->insert($wpdb->guiform_options, array('type' => 'settings', 'name' => 'performance', 'value' => 0));
	}
	
	/**
	 * Register hook add_action.
	 *
	 * @since 1.4.1
	 * @access private
	 */
	public function ajax_form_preview(){
		global $guif;
		$id = esc_sql($_GET['id']);
		$height = esc_sql($_GET['height']) - 120;
		
		echo '<table style="background-color: #00ABEB; font-weight: bold; width: 100%; padding: 5px 10px 0;">
						<tr>
							<td style="width: 50%;"><div>Link :</div><input type="text" value="'. $guif->permalink($id) .'" style="width: 95%; background-color: #FFFFFF;" readonly="readonly"></td>
							<td style="width: 50%;"><div>Screen View:</div>
								<select id="preview-screen" style="width: 100%;">
									<option value="0">Defualt</option>
									<option value="1">240 Portrait (small phone)</option>
									<option value="2">320 Portrait (iPhone)</option>
									<option value="3">480 Landscaped (iPhone) and (small tablet)</option>
									<option value="4">New Window</option>
								</select>
							</td>
						</tr>
					</table>';
		
		echo "<iframe style='width: 100%; padding: 20px 0px; height: ".$height."px' src='". $guif->permalink($id) ."'></iframe>";
		die();
	}
	
	/**
	 * Remove rewrite rules and then recreate rewrite rules.
	 *
	 * @see WP_Rewrite::flush_rules()
	 * @since 1.3.1
	 *
	 * Whether to update .htaccess (hard flush) or just update.
	 */
	public function flush_rewrite(){
		$rules = get_option('rewrite_rules') ;
		if(gettype(get_option('rewrite_rules')) == "array"){
			if(!array_key_exists($this->permalink['value'] ."/(.+)", $rules)){
				flush_rewrite_rules();
			}
		}
	}
	
	/**
	 * Add URL rewrite for form preview.
	 *
	 * @since 1.0
	 * @access public
	 */    
	public function rewrite_rules($wp_rewrite){
	  $new_rules = array($this->permalink['value'] ."/(.+)" => "index.php?". $this->permalink['value'] ."=". $wp_rewrite->preg_index(1));	
	  $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
	}
	
	/**
	 * filter slugs.
	 *
	 * @since 1.0
	 * @access public
	 * @return $query_vars array
	 */
	public function filter_query_vars($query_vars){
	  $query_vars[] = $this->permalink['value'];
	  return $query_vars;
	}
	
	/**
	 * Add media button in wordpress editor.
	 *
	 * @since 1.0
	 * @access public
	 */  
  public function add_media_button(){
  	if(current_user_can('manage_guiform') || is_admin()){
			?>
				<a href="<?php echo add_query_arg(array('action' => 'guiform_media_button'), admin_url('admin-ajax.php')); ?>" class="button-primary add_media thickbox" title="Add GuiForm">
					<?php _e('Add GuiForm', 'guiform'); ?>
				</a>
			<?php
		}
	}

	/**
	 * Display Wordpress media box.
	 *
	 * @since 1.0
	 * @access public
	 */ 
	public function ajax_media_button(){
		global $wpdb;

		$forms = $wpdb->get_results("SELECT id, title FROM $wpdb->guiform ORDER BY title");
	?>
		<script type="text/javascript">
			jQuery(document).ready(function($) {
				jQuery('#guiform_form').submit(function(e){
					e.preventDefault();
					var value = jQuery.trim(jQuery('input[name="responsive"]:checked').val());
					var responsive = (value !== 'none') ? ' responsive="'+value+'"'  : ''; 
					window.send_to_editor('[GuiForm id="' + jQuery('#guiform-item').val() + '"'+responsive+']');
					window.tb_remove();
				});
			});
		</script>
		<div id="guiform-box">
			<form id="guiform_form" class="media-upload-form type-form validate">
				<h3 class="media-title">Insert Form</h3>
				<p>Select a form below to insert into any Post or Page.</p>
				<select id="guiform-item" name="vfb_forms" class="select input-select" style="width: 300px;">
					<?php foreach($forms as $form) : ?>
						<option value="<?php echo $form->id; ?>"><?php echo '#'. $form->id .": ". $form->title; ?></option>
					<?php endforeach; ?>
				</select>
				<p>Enable responsive output.</p>
				<div>
					<ul>
						<li><label><input type="radio" value="none" name="responsive">None</label></li>
						<li><label><input type="radio" checked="checked" value="mobile" name="responsive">Mobile devices only</label></li>
						<li><label><input type="radio" value="desktop" name="responsive">Desktop only</label></li>
						<li><label><input type="radio" value="all" name="responsive">Both mobile devices and desktop.</label></li>
					</ul>
				</div>
				<p><input type="submit" class="button-primary" value="Insert Form" /></p>
			</form>
		</div>
	<?php
	die();
	}

  /**
	 * Add filters for action links and query vars hooks.
	 *
	 * @since 1.0
	 * @access private
	 */ 
	private function filter(){
		add_filter('widget_text', 'do_shortcode');
		add_filter('query_vars', array(&$this, 'filter_query_vars'));
		add_filter('plugin_action_links',  array(&$this, 'action_links'), 10, 2);
	}
	
	/**
	 * Add options page to Settings menu
	 *
	 * @since 1.0
	 * @access public
	 */
	public function menu(){
		
		global $pages_options;
		
		$pages_options['form']         = add_object_page(__('GuiForm', 'guiform'), __('GuiForm', 'guiform'), 'manage_guiform', 'guiform', array(&$this, 'page_list_table' ), plugins_url('guiform/images/guiform-icon.png'));
		$pages_options['forms']        = add_submenu_page('guiform', __('GuiForm', 'guiform'), __('Manage Forms', 'guiform'), 'manage_guiform', 'guiform', array(&$this, 'page_list_table'));
		$pages_options['entries']      = add_submenu_page('guiform', __('Manage Entries', 'guiform_entries'), __('Manage Entries', 'guiform_entries'), 'manage_guiform', 'guiform_entries', array(&$this, 'page_list_table'));
		$pages_options['form-builder'] = add_submenu_page('guiform', __('Form Builder', 'guiform/form-builder'), __('Form Builder', 'guiform/form-builder'), 'manage_guiform', 'guiform/form-builder', array(&$this, 'page_list_table'));
		$pages_options['export']       = add_submenu_page('guiform', __('Export', 'guiform/export'), __('Export', 'guiform/export'), 'manage_guiform', 'guiform/export', array(&$this, 'page_list_table'));
		$pages_options['icons']        = add_submenu_page('guiform', __('Icons Reference', 'guiform/icons'), __('Icons Reference', 'guiform/icons'), 'manage_guiform', 'guiform/icons', array(&$this, 'icons_reference'));
		$pages_options['settings']     = add_submenu_page('guiform', __('Settings', 'guiform/settings'), __('Settings', 'guiform/settings'), 'manage_guiform', 'guiform/settings',  array(&$this, 'page_list_table'));
		$pages_options['uninstall']    = add_submenu_page('guiform', __('Uninstall', 'guiform/uninstall'), __('Uninstall', 'guiform/settings'), 'manage_guiform', 'guiform/uninstall',  array(&$this, 'page_list_table'));
		
		//Load Help Tabs
		add_action('load-'. $pages_options['form-builder'], array(&$this, 'help_form_builder'));

	  $class_list = array('forms', 'entries', 'settings', 'form-builder');
	  foreach($class_list as $class){
	  	// Set a Screen Options
			add_filter('load-'. $pages_options[$class], array(&$this, 'set_screen_options'));
			// Adds a Screen Options
			add_filter('load-'. $pages_options[$class], array(&$this, 'form_screen_options'));
			// Load Screen Options
			add_action('load-'. $pages_options[$class], array(&$this, 'class_list_table'));
	  }
	}
	
	/**
	 * Display icon reference page
	 *
	 * @since 1.4.1
	 * @access public
	 */
	public function icons_reference(){
		include 'icons-reference.html';
	}
	
	/**
	* Display help screen tab
	*
	* @since 1.4.1
	* @access public
	*/
	public function help_form_builder(){
		$screen = get_current_screen();
		
		$screen->add_help_tab( array(
			'id' => 'guiform-help-tab-form-builder-navigation',
			'title' => 'Navigation',
			'content' => "<p><strong>Save Form</strong> - Save or update form.</p>
										<p><strong>Create New Form</strong> - Empty workspace for new form.</p>
										<p><strong>Form Preview</strong> - Display form output.</p>
										<p><strong>Form Style</strong> - Display form styling options such as colors fonts and costume CSS.</p>
										<p><strong>Required</strong> - Add required validation in your field.</p>
										<p><strong>Combined Field</strong> - Merge multiple field in one group.</p>
										<p><strong>Remove Field</strong> - Remove selected field.</p>
										<p><strong>Field Properties</strong> - Display field properties.</p>
										<p><strong>Source Code</strong> - Generate WordPress shortcode, link, Embedded JavaScript, Iframe, Raw HTML and JavaScript.</p>
										<p><strong>Thank You Message</strong> - Customize form redirect link or display message after form submission.</p>
										<p><strong>Email Settings</strong> - Customize email notification.</p>
										<p><strong>Analyze Performance</strong> - Display speed performance report using GTmetrix Website Speed and Performance Optimization.</p>
										<p><strong>Form Title</strong> - Name of the form.</p>"
		));
		
		$screen->add_help_tab( array(
			'id' => 'guiform-help-tab-form-builder-tools',
			'title' => 'Tools',
			'content' => "<p><strong>Form Tools</strong> - Basic fields used for creating forms.</p>
										<p><strong>Display Tools</strong> - Used to display text content within your form.</p>
										<p><strong>Quick Tools</strong> - Personalized fields used for specific kind of data input.</p>"
		));
		
		$screen->add_help_tab( array(
		  'id' => 'guiform-help-tab-form-builder-properties',
		  'title' => 'Shortcut Keys',
			'content' => "<ul>
											<li><p><strong>Delete Key</strong> - Remove selected field.</p></li>
											<li><p><strong>Esc Key</strong> - Hide property box.</p></li>
											<li><p><strong>Double Left Click of Mouse</strong> - Display field properties.</p></li>
											<li><p><strong>Ctrl + Left Arrow Key</strong> - Minimize workspace area.</p></li>
											<li><p><strong>Ctrl + Right Arrow Key</strong> - Maximize workspace area.</p></li>
											<li><p><strong>Arrow Keys</strong> - Navigate to form field.</p></li>
										</ul>"
		));
		
		$screen->add_help_tab( array(
		  'id' => 'guiform-help-tab-form-builder-context-menu',
		  'title' => 'Context Menu',
			'content' => "<p>A context menu appears upon user interaction, such as a right-click mouse in the form field. A context menu offers a limited set of choices that are listed below.</p>
										<ul><li><p><strong>Shrink</strong> - Input field is display below the text label.</p></li>
											<li><p><strong>Expand</strong> - Input field is display next to the text label.</p></li>
											<li><p><strong>Next Line</strong> - Force inline field to display next line.</p></li>
											<li><p><strong>Display Inline</strong> - Takes up only as much width as it needs, and does not force new lines.</p></li>
											<li><p><strong>Display Block</strong> - Takes up the full width available, with a new line before and after.</p></li>
											<li><p><strong>Delete</strong> - Remove selected field.</p></li>
										</ul>"
		));
		
		$screen->set_help_sidebar(
			"<p><strong>For more information:</strong></p>
			 <p><a target='_blank' href='https://www.guiform.com/docs'>Documentation</a></p>
			 <p><a target='_blank' href='https://www.guiform.com/support'>Support Forums</a></p>"
		);
	}
	
	/**
	 * Set screen options
	 *
	 * @since 1.0
	 * @access public
	 */
	public function set_screen_options(){
		if(isset($_POST['wp_screen_options']['value'])){
			$user = get_current_user_id();
			$value = sanitize_text_field($_POST['wp_screen_options']['value']);
			if ($value == round($value) && $value > 0) {
				update_user_meta($user, $_POST['wp_screen_options']['option'], $_POST['wp_screen_options']['value']);
			}
		}
	}

	/**
	 * Page screen options
	 *
	 * @since 1.0
	 * @access public
	 */
	public function form_screen_options(){
		
		global $pages_options;
       
    $screen = get_current_screen();
    
    if(!is_object($screen))
            return;
    switch($screen->id) :
      case $pages_options['form'] :
      $args = array(
              'label' => __('Item per page'),
              'default' => 15,
              'option' => 'guiform_form_row_per_page'
      );
      add_screen_option( 'per_page', $args );
      break;
      case $pages_options['entries'] :
	      if(isset($_REQUEST['form']) &&  isset($_REQUEST['entry'])) :
					add_screen_option( 'layout_columns', array(
						'max'		=> 2,
						'default'	=> 2
					));
				else :
					$args = array(
            'label' => __('Item per page'),
            'default' => 15,
            'option' => 'guiform_entry_row_per_page'
		      );
		      add_screen_option( 'per_page', $args );
				endif;
      break;
      
      case $pages_options['settings']:
      $args = array(
              'label' => __('Item per page'),
              'default' => 15,
              'option' => 'guiform_settings_database_row_per_page'
      );
      add_screen_option( 'per_page', $args );
      
      case $pages_options['settings'] :
      
      $tab = esc_sql($_REQUEST['tab']);
      
      if($tab == 'general'){
	      add_screen_option( 'per_page', false );
      }
      
      break;
      
    endswitch;
	}
	
	/**
	 * Load necessary javascript library and css.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function admin_scripts($hook_suffix){
		global $wpdb, $guif;
		
		if($hook_suffix == 'guiform_page_guiform/form-builder'){
	    
	    //Load all wordpress jquery necessary files
			$js = array('jquery-ui-draggable',
									'jquery-ui-droppable',
									'jquery-ui-sortable',
									'jquery-ui-core',
									'jquery-ui-widget',
									'jquery-ui-resizable',
									'jquery-ui-accordion',
									'jquery-ui-tabs',
									'jquery-ui-slider',
									'jquery-ui-spinner',
									'jquery-ui-button',
									'jquery-ui-tooltip',
									'jquery-touch-punch',
									'jquery-color',
									'thickbox'
									);
			
			wp_enqueue_style('thickbox');
			
		  wp_enqueue_script('tinymce', plugins_url('guiform/library/tinymce/tinymce.min.js'), false, null, true);
		  wp_enqueue_script('maskedinput', plugins_url('guiform/js/jquery.maskedinput.min.js'), false, null, true);
		  wp_enqueue_script('caret', plugins_url('guiform/js/jquery.caret.min.js'), false, null, true);
			wp_enqueue_script('mousewheel', plugins_url('guiform/js/jquery.mousewheel.js'), false, null, true);
			wp_enqueue_script('guifcolors', plugins_url('guiform/js/guifcolors.js'), false, null, true);
			wp_enqueue_script('guifbox', plugins_url('guiform/js/guifbox.js'), array('jquery'), GUIFORM_VERSION, true);
			wp_enqueue_script('guiform-builder', plugins_url('guiform/js/guiform.js'), $js, GUIFORM_VERSION, true);
			
			wp_enqueue_style('jquery-ui-theme', plugins_url('guiform/library/jquery-ui/css/custom-theme/jquery-ui-1.9.2.custom.min.css'), false, null);
			wp_enqueue_style('guifcolors', plugins_url('guiform/css/guifcolors.css'), false, null);
			wp_enqueue_style('default', plugins_url('guiform/skin/default/default.css'), false, GUIFORM_VERSION, 'all');
			wp_enqueue_style('print', plugins_url('guiform/css/print.css'), false, GUIFORM_VERSION, 'screen, print');
			wp_enqueue_style('guifbox', plugins_url('guiform/css/guifbox.css'), false, GUIFORM_VERSION, 'all');
			wp_enqueue_style('guiform', plugins_url('guiform/css/guiform.css'), false, GUIFORM_VERSION, 'all');
			wp_enqueue_style('guiForm-icons', plugins_url('guiform/fonts/icons.css'), false, GUIFORM_VERSION, 'all');
			
			$fonts = $wpdb->get_results("SELECT value FROM $wpdb->guiform_options WHERE type = 'font'");
	    $items = array();
	    
	    foreach($fonts as $value){
	    	$row = unserialize($value->value);
	    	$items[] =
				array(
					'font_family' => stripslashes($row['font-family']),
					'url' 		    => stripslashes($row['url'])
				);
	    }
			
			if(get_bloginfo('version') >= 3.8){
				ob_start();
				include GUIFORM_ABSPATH .'skin/skin.css.php';
				$skin = ob_get_clean();
				wp_add_inline_style('default', $skin);
			}
			
			$data = $guif->guiform($this->id, "row");
			
			if(!empty($this->id)){
				$init = unserialize($wpdb->get_var("SELECT init FROM $wpdb->guiform WHERE id = $this->id"));
				
				if(!empty($init)){
					$localize = array_merge($guif->init_loop($init), array('id' => $this->id, 'title' => $data->title));
					wp_localize_script('guiform-builder', 'guiform', $localize);
				}
				else{
					wp_localize_script('guiform-builder', 'guiform', $guif->init_default($this->id));
				}
			}
			else{
				wp_localize_script('guiform-builder', 'guiform', $guif->init_default());
			}
			
			wp_localize_script('guiform-builder', 'guiBuilder', array(
			  'database'    => $data->database,
			  'emails'      => $guif->get_mail(),
				'license_key' => $guif->get_option(0, 'license_key'),
				'performance' => $guif->get_option(0, 'performance'),
				'version'     => $guif->version,
				'request_time'=> $guif->request_time,
				'server'      => $guif->server,
				'form'        => $this->canvas(), 
				'admin_url'   => admin_url('admin.php?page=guiform%2Fsettings&tab=mail'),
				'site_name'   => get_bloginfo('name'),
				'ajax_url'    => plugins_url('guiform/class/class-ajax.php'),
				'images'      => plugins_url('guiform/images/'),
				'plugins_url' => plugins_url('guiform/'),
				'preview_url' => $this->permalink(),
				'settings'    => $wpdb->get_results("SELECT name, value FROM $wpdb->guiform_options WHERE type = 'settings'", OBJECT_K),
				'data_type'   => $wpdb->get_results("SELECT name FROM $wpdb->guiform_options WHERE type = 'data-structure' ORDER BY name ASC", OBJECT_K),
				'remote_db'   => $wpdb->get_results("SELECT id, name FROM $wpdb->guiform_options WHERE type = 'remote-database' ORDER BY name ASC", OBJECT_K)
			));
		}
		else if($hook_suffix == 'guiform_page_guiform/settings'){
			
			wp_enqueue_script('jquery-ui-core');
			wp_enqueue_script('jquery-ui-widget');
			
			wp_enqueue_script('guifbox', plugins_url('guiform/js/guifbox.js'), array('jquery'), GUIFORM_VERSION, true);
		 	wp_enqueue_style('guifbox', plugins_url('guiform/css/guifbox.css'), false, GUIFORM_VERSION, 'all');
			
			wp_enqueue_style('guiform-settings', plugins_url('guiform/css/settings.css'), false, GUIFORM_VERSION, 'all');
			wp_enqueue_script('guiform-settings', plugins_url('guiform/js/settings.js'), array('jquery'), GUIFORM_VERSION, true);
			
			wp_localize_script('guiform-settings', 'guiform', array(
				'ajax_url' => plugins_url('guiform/class/class-ajax.php'),
				'plugins_url' => plugins_url('guiform/'),
				'images' => plugins_url('guiform/images/'),
			));
		}
		else if($hook_suffix == 'guiform_page_guiform_entries'){
			wp_enqueue_script('common');
			wp_enqueue_script('wp-lists');
			wp_enqueue_script('postbox');
			wp_enqueue_script('jquery-ui-sortable');
			
			wp_enqueue_style('guiForm-fonts', plugins_url('guiform/fonts/icons.css'));
			
			wp_enqueue_script('guifbox', plugins_url('guiform/js/guifbox.js'), array('jquery'), GUIFORM_VERSION, true);
		 	wp_enqueue_style('guifbox', plugins_url('guiform/css/guifbox.css'), false, GUIFORM_VERSION, 'all');
			
			wp_enqueue_style('guiform-manage', plugins_url('guiform/css/manage-form.css'), false, GUIFORM_VERSION, 'all');	
			
			wp_enqueue_script('guiform-manage', plugins_url('guiform/js/manage-form.js'), array('jquery'), GUIFORM_VERSION, true);
			wp_localize_script('guiform-manage', 'guiform', array(
				'ajax_url' => plugins_url('guiform/class/class-ajax.php'),
				'plugins_url' => plugins_url('guiform/'),
				'entries_url' => add_query_arg(array('entry' => false))
			));
		}
		else if($hook_suffix == 'toplevel_page_guiform' || $hook_suffix == 'guiform_page_guiform_entries'){
			
			wp_enqueue_script('jquery-ui-core');
			wp_enqueue_script('jquery-ui-widget');
			wp_enqueue_script('jquery-ui-sortable');
			
			wp_enqueue_style('jquery-ui-theme', plugins_url('guiform/library/jquery-ui/css/custom-theme/jquery-ui-1.9.2.custom.min.css'), false, GUIFORM_VERSION, 'all');
			wp_enqueue_style('guiform-settings', plugins_url('guiform/css/settings.css'), false, GUIFORM_VERSION, 'all');
					
			wp_enqueue_script('guifbox', plugins_url('guiform/js/guifbox.js'), array('jquery'), GUIFORM_VERSION, true);
		 	wp_enqueue_style('guifbox', plugins_url('guiform/css/guifbox.css'), false, GUIFORM_VERSION, 'all');
			wp_enqueue_style('guiForm-icons', plugins_url('guiform/fonts/icons.css'));
			
			wp_enqueue_script('guiform-manage', plugins_url('guiform/js/manage-form.js'), array('jquery'), GUIFORM_VERSION, true);
			wp_enqueue_style('guiform-manage', plugins_url('guiform/css/manage-form.css'), false, GUIFORM_VERSION, 'all');	
			wp_localize_script('guiform-manage', 'guiform', array(
				'ajax_url' => plugins_url('guiform/class/class-ajax.php'),
				'plugins_url' => plugins_url('guiform/')
			));
		}
		else if($hook_suffix == "guiform_page_guiform/export"){
			wp_enqueue_script('jquery-ui-core');
			wp_enqueue_script('jquery-ui-widget');
			wp_enqueue_script('jquery-ui-datepicker');
			wp_enqueue_script('guiform-script', plugins_url('guiform/js/script.js'), array('jquery'), GUIFORM_VERSION, true);
			wp_enqueue_style('guiform-settings', plugins_url('guiform/css/settings.css'), false, GUIFORM_VERSION, 'all');
			wp_enqueue_style('jquery-ui-theme', plugins_url('guiform/library/jquery-ui/css/custom-theme/jquery-ui-1.9.2.custom.min.css'), false, GUIFORM_VERSION, 'all');
			
		}
		else if($hook_suffix == 'guiform_page_guiform/icons'){
			wp_enqueue_style('icons', plugins_url('guiform/fonts/icons.css'), false, GUIFORM_VERSION, 'all');
		}
	}
	
	/**
	 * Display plugin pages.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function page_list_table($hook_suffix){
		global $guif_class, $settings;
		
		### Check Whether User Can Manage
		if(!current_user_can('manage_guiform') || !is_admin()) {
			die("<h1 class='access-denied'>Access Denied</h1>");
		}
		
		$screen = get_current_screen();
		if($screen->id == 'guiform_page_guiform/form-builder'){
			echo $guif_class->display();	
		}
		else if($screen->id == 'toplevel_page_guiform'){	  
			$guif_class->show_message();		
			echo '<div class="wrap"><div class="icon32" id="icon-themes"><br></div>';
			echo '<h2> Manage Forms <a href="'. admin_url('admin.php?page=guiform/form-builder') .'" class="add-new-h2">Add New</a> </h2>';
			echo '<div id="manage-form">';
			$guif_class->prepare_items();
			echo "<form id='forms-filter' method='post' action='$this->admin_url'>";
			$guif_class->search_box( 'search', 'search_id' );		
			$guif_class->display();
			$guif_class->get_column_info();
			echo '</div></div>';
		}
		else if($screen->id == 'guiform_page_guiform_entries'){
			if(isset($_GET["form"]) && isset($_GET["entry"])){
				$guif_class->on_show_page();
			}
			else{
				$guif_class->show_message();
				echo '<div class="wrap"><div class="icon32" id="icon-themes"><br></div>';
				echo '<h2> Manage Entries <a href="'. admin_url('admin.php?page=guiform/form-builder') .'" class="add-new-h2">Add Form</a> </h2>';		
				echo '<div id="manage-entries">';
				$guif_class->views();
				$guif_class->prepare_items();
				echo "<form id='forms-filter' method='post' action='$this->admin_url'>";
				$guif_class->search_box( 'search', 'search_id' );		
				$guif_class->display();
				$guif_class->get_column_info();
				echo '</div></div>';
			}
		}
		else if($screen->id == 'guiform_page_guiform/settings'){
			$settings->build();
		}
		else if($screen->id == 'guiform_page_guiform/export'){
			require_once(GUIFORM_ABSPATH .'class/export.php');
		}
		else if($screen->id == 'guiform_page_guiform/uninstall'){
			require_once(GUIFORM_ABSPATH .'class/uninstall.php');
		}
		
		return $_wp_admin_css_colors;
	}
	
	/**
	 * Instantiate page class.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function class_list_table(){
		
		global $guif_class, $settings;
		$screen = get_current_screen();
		
		if($screen->id == 'toplevel_page_guiform'){
			require_once(GUIFORM_ABSPATH .'class/class-form.php');
			$guif_class = new Form_List_Table($screen);
		}
		else if($screen->id == 'guiform_page_guiform_entries' && isset($_GET['form']) && isset($_GET['entry'])){
			require_once(GUIFORM_ABSPATH .'class/class-view.php');
			$guif_class = new View($screen);
		}
		else if($screen->id == 'guiform_page_guiform_entries'){
			
			require_once(GUIFORM_ABSPATH .'class/class-entries.php');
			$guif_class = new Entries_List_Table($screen);
		}
		else if($screen->id == 'guiform_page_guiform/form-builder'){
			require_once(GUIFORM_ABSPATH .'class/form-builder.php');
			$guif_class = new Form_builder();
		}
		else if($screen->id == 'guiform_page_guiform/settings'){
			
			require_once(GUIFORM_ABSPATH .'class/settings.php');
			$settings = new Settings_Page();
			
			if(isset($_GET['tab']) && $_GET['tab'] == 'mail'){
				require_once(GUIFORM_ABSPATH .'class/class-settings-mail.php');
				$guif_class = new Settings_Mail_List_Table($screen);
			}
		}
	}
	
	/**
	 * Short code output.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function form_output($atts, $output = ''){
		global $wpdb, $guif;
		$id = $atts['id'];
		
		if(count($wpdb->get_row($wpdb->prepare("SELECT id FROM $wpdb->guiform WHERE id = %d", $id), ARRAY_N)) > 0){
			if(isset($_SERVER['HTTP_ORIGIN'])){
				header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
				header('Access-Control-Allow-Credentials: true');
				header('Access-Control-Max-Age: 86400');    // cache for 1 day
			}
			
			ob_start();
			include 'form.php';
			$skin = ob_get_clean();
			return $skin;
  	}
	}

	/**
	 * Create guiform table
	 *
	 * @since 1.0
	 * @access public
	 */
	public function create_table(){
		global $wpdb;
		
		$version =  get_option("GUIFORM_VERSION");
		
		if(!file_exists(ABSPATH."wp-content/uploads")){
			mkdir(ABSPATH."wp-content/uploads");
		}
		
		if(@is_file(ABSPATH.'/wp-admin/includes/upgrade.php')) {
			include_once(ABSPATH.'/wp-admin/includes/upgrade.php');
		}elseif(@is_file(ABSPATH.'/wp-admin/upgrade-functions.php')) {
			include_once(ABSPATH.'/wp-admin/upgrade-functions.php');
		} elseif(@is_file(ABSPATH.'/wp-admin/includes/upgrade.php')) {
			include_once(ABSPATH.'/wp-admin/includes/upgrade.php');
		} else {
			die('We have problem finding your \'/wp-admin/upgrade-functions.php\' and \'/wp-admin/includes/upgrade.php\'');
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
		
		$create_table = array();
		
		$create_table['guiform'] = "CREATE TABLE IF NOT EXISTS `$wpdb->guiform` (
									`id` INT(11) NOT NULL AUTO_INCREMENT,
									`title` VARCHAR(50) NULL,
									`data` MEDIUMTEXT NOT NULL,
									`entry_field` TEXT NULL,
									`canvas` MEDIUMTEXT NOT NULL,
									`html` MEDIUMTEXT NOT NULL,
									`init` MEDIUMTEXT NULL,
									`database` SMALLINT(6) NOT NULL DEFAULT '0',										
									`template` VARCHAR(100) NULL,
									`status` TINYINT(1) NOT NULL DEFAULT '0',
									`last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
									`created` DATETIME NOT NULL,
									PRIMARY KEY (`id`)
								) $charset_collate;";
								
		$create_table['guiform_options'] = "CREATE TABLE IF NOT EXISTS `$wpdb->guiform_options` (
			`id` INT(11) NOT NULL AUTO_INCREMENT,
			`type` VARCHAR(65) NOT NULL,
			`name` VARCHAR(150) NOT NULL,
			`value` TEXT NOT NULL,
			PRIMARY KEY (`id`)
		)	$charset_collate;";					
								
		maybe_create_table($wpdb->guiform, $create_table['guiform']);	
		maybe_create_table($wpdb->guiform_options, $create_table['guiform_options']);						
			
		$options = array(array('settings', 'license_key', 'BETA TEST'),
										 array('settings', 'permalink', 
										 				serialize(array('selection' => 'default', 'value' => 'form'))
										 			),
										 array('settings', 'autosave', 1),
										 array('settings', 'autosave_time', 300),
										 array('settings', 'upload_folder', 'wp-content/uploads/guiform'),
										 array('settings', 'performance', 0),
										 array('mail', get_bloginfo('admin_email'),
										 				serialize(array(
										 						'name'            => get_bloginfo('name'),
														    'return_path'     => 0,
														    'protocol'        => 'php',
														    'smtp_host'       => '',
														    'smtp_port'       => '',
														    'smtp_encryption' => '',
														    'smtp_auth'       => 0,
														    'smtp_username'   => '',
														    'smtp_password'   => '',
														    'status'          => 1,
														    'key'             => '')
														)
										 			)
										 );	
			
		foreach($options as $option){
			$wpdb->insert($wpdb->guiform_options, 
  					 array('type'  => $option[0], 
			  					 'name'  => $option[1], 
			  					 'value' => $option[2]
  					 ), 
  					 array('%s', '%s', '%s')
  				 ); 
		}	
			
		
		update_option("GUIFORM_VERSION", GUIFORM_VERSION);	
		
		$role = get_role('administrator');
		if(!$role->has_cap('manage_guiform')) {
			$role->add_cap('manage_guiform');
		}
	}
	
	/**
	 * Prepare workspace
	 *
	 * @since 1.0
	 * @access private
	 * @return $query_vars object
	 */
	private function canvas(){
		global $wpdb;
		$form = $wpdb->get_row($wpdb->prepare("SELECT title, canvas FROM $wpdb->guiform WHERE id = %d", $this->id), OBJECT);
		return $form;
	}
	
	/**
	 * Parse header request.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function action_parse_request(&$wp){
		global $wpdb, $guif;
		
		if(!is_admin()){
			
			$this->flush_rewrite();
			
			if(strpos($wp->query_vars[$this->permalink['value']], 's/') == 1){
				$atts['id'] = str_replace("js/", "", $wp->query_vars[$this->permalink['value']]);
				$atts['js'] = 'text';
				include 'form.php';
				die();
			}
			
		  if(array_key_exists($this->permalink['value'], $wp->query_vars) || in_array($this->permalink['value'], $wp->query_vars)) {
		  
				$name = $this->permalink['value'];
				$id = $wp->query_vars[$this->permalink['value']];
			
	  		$this->id = $id;	
		  	$preview = esc_sql($_GET["view"]);
		
		  	if(isset($_POST['submit'])){
		  		global $guif;
		  		
		  		$_POST["action"] = "guiform_save_entries";
		  		$_POST["form"] = $this->id;
		  		
		  		if(!isset($_POST['unique'])){
		  		// Load AJAX class
						require_once(GUIFORM_ABSPATH .'class/class-ajax.php');
						$Ajax = new GuiForm_Ajax;
						$Ajax->init();
					}
		  		
					die();
				}
	
	  		include "view.php";
		  	die();
		  }
		  
		}
	}
	
	/**
	 * Add plugin quick links. 
	 *
	 * @since 1.0
	 * @return $links array Links
	 */
	public function action_links($links, $file){
    $this_plugin = basename(GUIFORM_ABSPATH) .'/guiform.php';
    if($file == $this_plugin){
  		$links[] = '<a href="admin.php?page=guiform/form-builder">'. __('Form Builder', 'guiform') .'</a>';
      $links[] = '<a href="admin.php?page=guiform/settings">'. __('Settings', 'guiform') .'</a>';
    }
    return $links;
	}
	
	/**
	 * Enqueue footer jquery library.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function footer_script() {
		global $guif;
		if($guif->get_option(0, 'performance')){
			$this->load_jquery_ui_google_cdn();
			return;
		}
		
		$js = array('jquery-ui-core', 'jquery-ui-widget', 'jquery-ui-spinner', 'jquery-ui-tooltip', 'jquery-touch-punch', 'jquery-ui-button');
								
		wp_deregister_script('jquery');
		wp_register_script('jquery', '');
		wp_register_script('guiform-jquery', includes_url('js/jquery/jquery.js'));
		wp_register_script('guiform-migrate', includes_url('js/jquery/jquery-migrate.min.js'));
		wp_register_script('maskedinput', plugins_url('guiform/js/jquery.maskedinput.min.js'));						
		wp_register_script('guiform-form', plugins_url('guiform/js/guiform-form.js'), $js, GUIFORM_VERSION);
		
		wp_localize_script('guiform-form', 'guif', array(
		  'ajax_url' => admin_url( 'admin-ajax.php' ),
		  'images'   => plugins_url('guiform/images/'),
		  'today'    => date('j', time()),
		  'form_id'  => $this->id
		));
		
		wp_print_scripts('guiform-jquery');
		wp_print_scripts('guiform-migrate');
		wp_print_scripts('maskedinput');
		wp_print_scripts('guiform-form');
	}
	
	public function load_jquery_ui_google_cdn(){
		
		global $wp_scripts;
 
    wp_enqueue_script('jquery-ui-core');
 
    // get the jquery ui object
    $version = $wp_scripts->query('jquery-ui-core');
 
    // load the jquery ui script
    $url = "//ajax.googleapis.com/ajax/libs/jqueryui/".$version->ver."/jquery-ui.min.js";
    
		wp_deregister_script('jquery');
		
		wp_register_script('jquery', '');
		wp_register_script('guiform-jquery', includes_url('js/jquery/jquery.js'));
		wp_register_script('jquery-ui', $url, false, null);		
		wp_register_script('guiform-migrate', includes_url('js/jquery/jquery-migrate.min.js'));
		wp_register_script('maskedinput', plugins_url('guiform/js/jquery.maskedinput.min.js'));						
		wp_register_script('guiform-form', plugins_url('guiform/js/guiform-form.js'), $js, GUIFORM_VERSION);
		
		wp_localize_script('guiform-form', 'guif', array(
		  'ajax_url' => admin_url( 'admin-ajax.php' ),
		  'images'   => plugins_url('guiform/images/'),
		  'today'    => date('j', time()),
		  'form_id'  => $this->id
		));
		
		wp_print_scripts('guiform-jquery');
		wp_print_scripts('jquery-ui');
		wp_print_scripts('guiform-migrate');
		wp_print_scripts('maskedinput');
		wp_print_scripts('guiform-form');

	}
	
}

if(!isset($guif)){
	// Create global variable.
	global $guif;
	
	// Instantiate API Class.
	$guif = new GuiForm();
	
	// Load AJAX class
	$GuiForm_Ajax = new GuiForm_Ajax;  // correct
	$GuiForm_Ajax->init();
}