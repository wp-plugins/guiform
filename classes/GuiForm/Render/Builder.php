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
 * Form builder page.
 *
 * @category GuiForm
 * @package Render
 *
 * @since 1.0
 */
class GuiForm_Render_Builder extends GuiForm_Module{
	
  const NAME = __CLASS__;
	
	private $id;
	
	/**
	 * Constructor.
	 *
	 * @since 1.0
	 *
	 * @access public
	 * @param array $data The data what has to be associated with this render.
	 */
	public function __construct($screen) { 
		$this->id = (isset($_GET['form'])) ? esc_html($_GET['form']) : '';
		
		if($screen->id == 'guiform_page_guiform-builder'){
			$this->_addAction('admin_head','hideUpdate');
		}
		
		$this->_addAction( 'admin_enqueue_scripts', 'scripts' );
	 
	}
	
	public function hideUpdate(){
		remove_action( 'admin_notices', 'update_nag', 3 );
	}
	
	private function _skin(){
		
		global $_wp_admin_css_colors;
		
		$theme = get_user_option('admin_color');
		$themes = array('fresh', 'light', 'blue', 'coffee', 'ectoplasm', 'midnight', 'ocean', 'sunrise');
		$colors = $_wp_admin_css_colors[$theme];
		$color = $colors->icon_colors;
		
		if(in_array($theme, $themes)){
			switch($theme){
				case 'fresh':
				
					$bcolor[0] = $colors->colors[1]; //header color
					$bcolor[1] = $colors->colors[0]; //header hover color
					$bcolor[2] = $colors->colors[2]; //list active color
					$bcolor[3] = "#111111";          //list hover color
				 
				  $fcolor['base']    = $color['base'];
				  $fcolor['focus']   = $color['focus'];
				  $fcolor['current'] = $color['current'];
				  
				  break;
				case 'light':
				  $bcolor[0] = $colors->colors[1]; //header color
					$bcolor[1] = $colors->colors[0]; //header hover color
					$bcolor[2] = $colors->colors[2]; //list active color
					$bcolor[3] = "#333333";          //list hover color
				 
				  $fcolor['base']    = "#686868";
				  $fcolor['focus']   = "#0074A2";
				  $fcolor['current'] = $color['current'];
				  break;
				case 'blue':
				  $bcolor[0] = $colors->colors[1]; //header color
					$bcolor[1] = $colors->colors[0]; //header hover color
					$bcolor[2] = $colors->colors[2]; //list active color
					$bcolor[3] = $colors->colors[3];          //list hover color
				 
				  $fcolor['base']    = "#E2ECF1";
				  $fcolor['focus']   = "#FFFFFF";
				  $fcolor['current'] = $color['current'];
				  break;
				case 'coffee':
				  $bcolor[0] = $colors->colors[0]; //header color
					$bcolor[1] = $colors->colors[1]; //header hover color
					$bcolor[2] = $colors->colors[2]; //list active color
					$bcolor[3] = $colors->colors[3]; //list hover color
				 
				  $fcolor['base']    = $color['base'];
				  $fcolor['focus']   = $color['focus'];
				  $fcolor['current'] = $color['current'];
				  break;
				case 'ectoplasm':
				  $bcolor[0] = $colors->colors[0]; //header color
					$bcolor[1] = $colors->colors[1]; //header hover color
					$bcolor[2] = $colors->colors[2]; //list active color
					$bcolor[3] = $colors->colors[3]; //list hover color
				 
				  $fcolor['base']    = $color['base'];
				  $fcolor['focus']   = $color['focus'];
				  $fcolor['current'] = $color['current'];
				  break;
				case 'midnight':
				  $bcolor[0] = $colors->colors[0]; //header color
					$bcolor[1] = $colors->colors[1]; //header hover color
					$bcolor[2] = $colors->colors[2]; //list active color
					$bcolor[3] = $colors->colors[3]; //list hover color
				 
				  $fcolor['base']    = $color['base'];
				  $fcolor['focus']   = $color['current'];
				  $fcolor['current'] = $colors->colors[3];
				  break;
				case 'ocean':
				  $bcolor[0] = $colors->colors[0]; //header color
					$bcolor[1] = $colors->colors[1]; //header hover color
					$bcolor[2] = $colors->colors[2]; //list active color
					$bcolor[3] = $colors->colors[3]; //list hover color
				 
				  $fcolor['base']    = $color['base'];
				  $fcolor['focus']   = $colors->colors[2];
				  $fcolor['current'] = $color['current'];
				  break;
				case 'sunrise':
				 $bcolor[0]  = $colors->colors[0]; //header color
					$bcolor[1] = $colors->colors[1]; //header hover color
					$bcolor[2] = $colors->colors[2]; //list active color
					$bcolor[3] = $colors->colors[3]; //list hover color
				 
				  $fcolor['base']    = $color['base'];
				  $fcolor['focus']   = "#FFFFFF";
				  $fcolor['current'] = $color['current'];
				  break;
				default:
			}
		}
		
		$css = "/*------------------------ Base font color --------------------------------------*/
						
						#GuiForm #header span,
						#formName,
						#tools li span,
						#tools li span.icon{
						color: ".$fcolor['base'].";
						}
						
						/*------------------------ Focus font color --------------------------------------*/
						
						#GuiForm #header li:hover,
						#GuiForm #header li:hover span,
						#formName:hover,
						#tools h3.ui-accordion-header:hover,
						#tools li:hover span{
						color: ".$fcolor['focus'].";
						}
						
						/*------------------------ End Focus font color --------------------------------------*/
						
						
						#GuiForm #header{
						background: ".$bcolor[0].";
						border-radius: 0;	
						border: 1px solid ".$bcolor[0].";
						}
						
						#GuiForm #header ul {
						padding: 0px;
						}
						
						#GuiForm #header li:hover{
						background-color: ".$bcolor[1].";
						}
						
						#GuiForm #header span{
						text-shadow: none;
						}
						
						#header .formName-list {
						width: 40%;
						padding: 5px !important;
						}
						
						#formName {
						margin: 0px;
						text-shadow: inherit;
						}
						
						#GuiForm .ui-resizable-e {
						border-left: 1px solid ".$bcolor[0].";
						border-right: 1px solid ".$bcolor[0].";
						background-color: ".$bcolor[0]." !important;
						}
						
						#container {
						margin-top: 45px;
						}
						
						#container {
						border: 1px solid ".$bcolor[0].";
						border-radius: 0;
						box-shadow: none;
						margin-left: 200px;
						border-top: none;
						}
						
						#canvas{
						border-radius: 0;
						}
						
						#tools {
						width: 200px;
						margin-top: 50px;
						}
						
						#tools h3.ui-accordion-header:hover{
						background-color: ".$bcolor[3].";
						}
						
						#tools h3.ui-state-active, 
						#tools h3.ui-state-active:hover{
						background: none repeat scroll 0 0 ".$bcolor[2].";
						color: ".$fcolor['current'].";
						}
						
						#tools h3{
						background: ".$bcolor[0].";
						border-radius: 0;
						margin: 0;
						border: none;
						font-weight: normal;
						padding: 8px 30px;
						font-size: 14px;
						text-shadow: none;
						}
						
						#tools li {
						background-color: ".$bcolor[1].";
						border: none;
						}
						
						#tools li span {
						font-size: 13px;
						line-height: 18px;
						text-shadow: none;
						font-weight: normal;
						}
						
						#tools li span.icon{
						left: 20px;
						font-size: 16px;
						}
						
						#tools .ui-accordion-content {
						border-radius: 0;
						border: none;
						}
						
						#tools ul.ui-accordion-content-active li:last-of-type,
						#tools h3.ui-state-default:last-of-type, 
						#tools .ui-accordion-content:last-of-type {
						border-bottom: medium none;
						border-radius: 0;
						}
						
						#guiform-notice {
						border: 1px solid ".$bcolor[0].";
						border-radius: 0;
						color: #333333;
						}
						
						#guiform-notice h1{
						text-align: center;
						}
						
						#guiform-notice p{
						text-align: justify;
						}";

		wp_add_inline_style('default', $css);
	}
	
	public function scripts($hook_suffix){
		global $wpdb, $guiform;
	
		if($hook_suffix == 'guiform_page_guiform-builder'){
			//Load all wordpress jquery necessary files
			$js = array('jquery',
			            'jquery-ui-draggable',
									'jquery-ui-droppable',
									'jquery-ui-sortable',
									'jquery-ui-core',
									'jquery-ui-widget',
									'jquery-ui-resizable',
									'jquery-ui-accordion',
									'jquery-ui-tabs',
									'jquery-ui-slider',
									'jquery-ui-mouse',
									'jquery-ui-spinner',
									'jquery-ui-button',
									'jquery-ui-datepicker',
									'jquery-ui-tooltip',
									'jquery-touch-punch',
									'jquery-effects-core',
									'jquery-color',
									'thickbox'
									);
			
		  wp_enqueue_script('maskedinput', $guiform->assets('js/jquery.maskedinput.min.js'), false, null);
			wp_enqueue_script('mousewheel', $guiform->assets('js/jquery.mousewheel.js'), false, null);
			wp_enqueue_script('spectrum', $guiform->vendor('spectrum/spectrum.js'), false, null);
			wp_enqueue_script('switch-button', $guiform->assets('js/jquery.switchButton.js'), false, null);
			wp_enqueue_script('guifbox', $guiform->assets('js/guifbox.js'), $js, GuiForm_Plugin::VERSION);
			wp_enqueue_script('guiform', $guiform->assets('js/guiform.js'), '', GuiForm_Plugin::VERSION, true);
			
			wp_enqueue_style('thickbox');
			wp_enqueue_style('jquery-ui-theme', $guiform->vendor('jquery-ui/css/custom-theme/jquery-ui-1.9.2.custom.min.css'), false, null);
			wp_enqueue_style('spectrum', $guiform->vendor('spectrum/spectrum.css'), false, null);
			wp_enqueue_style('default', $guiform->assets('skin/default/default.css'), false, GuiForm_Plugin::VERSION, 'all');
			wp_enqueue_style('guifbox', $guiform->assets('css/guifbox.css'), false, GuiForm_Plugin::VERSION, 'all');
			wp_enqueue_style('guiform', $guiform->assets('css/guiform.css'), false, GuiForm_Plugin::VERSION, 'all');
			wp_enqueue_style('icon', $guiform->assets('fonts/icons.css'), false, GuiForm_Plugin::VERSION, 'all');
			
			self::_skin();
			
			if(!empty($this->id)){
				$data = $guiform->form($this->id);
				$localize = array('id' => $this->id, 'title' => $data->title);
				wp_localize_script('guifbox', 'guiform', $localize);
			}
			else{
				wp_localize_script('guifbox', 'guiform', array('title' => __('Untitled Form', GuiForm_Plugin::NAME)));
			}
			
			wp_localize_script('guifbox', 'guiBuilder', array(
			  'database'    => $data->database,
			  'canvas'      => $data->canvas,
			  'nonce'       => wp_create_nonce( "guiform_nonce" ),
			  'emails'      => $guiform->get_mail(),
				'performance' => $guiform->getOption('performance'),
				'version'     => GuiForm_Plugin::VERSION,
				'guiform_url' => admin_url('admin.php?page=guiform'),
				'admin_url'		=> admin_url('admin-post.php'),
				'site_name'   => get_bloginfo('name'),
				'plugins_url' => plugins_url('guiform/'),
				'preview_url' => $guiform->permalink('', '', false),
				'settings'    => $wpdb->get_results("SELECT name, value FROM $wpdb->guiform_options WHERE type = 'settings' AND name != 'license_key'", OBJECT_K),
			));
		}
		
	}

	public function help(){
		$screen = get_current_screen();
		$user = wp_get_current_user();
		
		$screen->add_help_tab( array(
			'id' => 'guiform-help-tab-form-builder-navigation',
			'title' => 'Navigation',
			'content' => "<p><strong>Save Form</strong> - Save or update form.</p>
										<p><strong>Create New Form</strong> - Empty workspace for new form.</p>
										<p><strong>Form Preview</strong> - Display form output.</p>
										<p><strong>Form Style</strong> - Display form styling options such as colors fonts and costume CSS.</p>
										<p><strong>Required</strong> - Add required validation in your field.</p>
										<p><strong>Merge Field</strong> - Merge multiple field in one group.</p>
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
		
		$screen->add_help_tab( array(
		  'id' => 'guiform-help-tab-defualt-value',
		  'title' => 'Defualt Value',
			'content' => '<p>Enable to pass the value from another form or using URL query string to populate the text and default value of your form.</p>
										<ul>
											<li><p><strong>{current_IP}</strong> - User public IP address.</p></li>
											<li><p><strong>{current_OS}</strong> - User operating system.</p></li>
											<li><p><strong>{current_browser}</strong> - User browser.</p></li>
											<li>
												<p><strong>{user_[key]}</strong> - Get the current loggin user.</p>
												<p><strong>{user_id}</strong> - User ID.</p> 
											  <p><strong>{user_username}</strong> - User username.</p> 
											  <p><strong>{user_email}</strong> - User email address.</p> 
											  <p><strong>{user_firstname}</strong> - User first name.</p> 
											  <p><strong>{user_lastname}</strong> - User last name.</p> 
											  <p><strong>{user_display_name}</strong> - User display name.</p> 
											</li>
											<li>
												<p><strong>{request_[key]}</strong> - Retrieve value from $_POST and $_GET variable.</p>
											</li>
											<li>
												<p><strong>{server_[key]}</strong> - Retrieve value from $_SERVER variable.</p>
											</li>
											<li>
												<p><strong>{session_[key]}</strong> - Retrieve value from $_SESSION variable.</p>
											</li>
											<li>
												<p><strong>{key|default value}</strong> - Seperate by single pipe, display default value if the key is false.</p>
												<p><code>Example: {user_display_name|Guest}</code></p>
												<p><strong>{user_username|Guest}</strong> - display <code>'. $user->user_login .'</code> if loggin else <code>Guest</code></p>
												<p><strong>{user_email}</strong> - display <code>'. $user->user_email .'</code> if loggin else display <code>nothing</code></p>
											</li>
										</ul>'
		));
		
		$screen->set_help_sidebar(
			"<p><strong>For more information:</strong></p>
			 <p><a target='_blank' href='https://www.guiform.com/docs'>Documentation</a></p>
			 <p><a target='_blank' href='https://www.guiform.com/support'>Support Forums</a></p>"
		);
	}
	
	public function loadHelpTab($screen){
		$this->_addAction("load-". $screen, 'help');
	} 	
	
	public function toHTML(){	
		global $guiform;
				
		$html = "<a id='window-preview' target='_blank' title='". __('Window Preview', GuiForm_Plugin::NAME) ."'></a>
						 <div id='GuiForm' class='container form-builder clearfix'>
							 <div style='display: none; text-align: center; margin-top: 10%;'>
							 	<img src='". $guiform->assets('images/guiform-loader.gif') ."'>
							 	<p style='font-weight: bold; letter-spacing: 5px; font-size: 16px;'>". __('WARNING: An Error occurred, please refresh the page and try again.', GuiForm_Plugin::NAME) ."</p>
							 </div>
						 </div>";
		echo "\n\n\n$html\n\n\n";
		self::_getInfo();
	}
	
	private function _getInfo(){
		?>
		
		<div id='content-notice' style="display: none;">
			<div id="guiform-notice"><?php echo self::_getContent(); ?><div>
		</div>
	
		<?php
	}
	
	private function _getContent(){
		global $guiform;
		
		// data to send in our API request		
		$api_params = array(
			'content'    => true,
			'sslverify'  => true,
			'package'    => GuiForm_Plugin::PACKAGE,
			'version'    => GuiForm_Plugin::VERSION        
		);
		
		
		$output = get_transient('guiform_notice');
		
		if ( !$output ) {
			// Call the custom API.
			$response = wp_safe_remote_post(GuiForm_Plugin::SERVER ."?api=key&", array( 'timeout' => 30, 'sslverify' => true, 'body' => $api_params ) );
	
	
			// make sure the response came back okay
			if (is_wp_error( $response ) ){
				delete_transient('guiform_notice');
				return '<h2 style="text-align: center; line-height: 38px; font-size: 24px; margin: 40px 20px;">Upgrade to <a href="https://www.guiform.com/" target="_blank" style="text-decoration: none;">GuiForm Pro</a> now and get more <span style="color: #ee2c49;">Tools</span> and <span style="color: #ee2c49;">Features</span> or visit our <a href="http://demo.guiform.com/wp-admin/admin.php?page=guiform-builder" target="_blank" style="text-decoration: none;">Demo</a>.</h2>';
		  }
			else{
				$data =  wp_remote_retrieve_body( $response ) ;
				set_transient('guiform_notice', $data, DAY_IN_SECONDS );
				return $data;
			}
		}
		else{
			return $output;
		}
	}
	
}