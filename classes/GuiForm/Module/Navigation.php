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
 * The module navigation.
 *
 * @category GuiForm
 * @package Module
 *
 * @since 1.0
 */
class GuiForm_Module_Navigation extends GuiForm_Module {

	const NAME = __CLASS__;
	
	var $_screen; 
	var $_param; 
	var $form;
	var $entry;
	var $type;
	var $settings = array();
	
	/**
	 * Constructor.
	 *
	 * @since 1.0
	 *
	 * @access public
	 * @param GuiForm_Plugin $plugin The instance of the plugin.
	 */
	public function __construct() {
		parent::__construct(GuiForm_Plugin::instance());
		$this->_screen = get_current_screen();
		$this->settings = array('GuiForm_Render_Forms_Notification', 
													  'GuiForm_Render_Forms_Confirmation', 
													  'GuiForm_Render_Forms_Attachment', 
													  'GuiForm_Render_Forms_Settings');
	}
	
	public function printScript(){
		?>
		<script type="text/javascript">
			//<![CDATA[
			jQuery(document).ready( function($) {
				// close postboxes that should be closed
				$('.if-js-closed').removeClass('if-js-closed').addClass('closed');
				// postboxes setup
				postboxes.add_postbox_toggles('<?php echo $this->_screen->id; ?>');
			});
			
			jQuery(document).ready( function($) {
				jQuery('.meta-box-sortables').sortable({
					start: function(event, ui){
						jQuery("#guiform-manager .meta-box-sortables").css({'min-height':'100px'})
					},
					beforeStop: function(){
						jQuery("#guiform-manager .meta-box-sortables").css({'min-height':'inherit'})
					}
				})
			});
			//]]>
		</script>
		<?php
	}
	
	private function _type($type){
		global $guiform;
		
		if(in_array($type, $this->settings)){
			$param = array( 'title' => __('Navigation', GuiForm_Plugin::NAME),
										  'items' => array(
										  						  array('label'  => __('Add Form', GuiForm_Plugin::NAME),
										  								   'href'   => add_query_arg(array('page' => 'guiform-builder', 'form' => false, 'tab' => false, 'action' => false, 'orderby' => false, 'order' => false)),
										  								   'icon'   => '&#xe054;'
										  							),
										  							array('label'  => __('Edit Form', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform-builder', 'form' => $this->form, 'tab' => false, 'action' => false, 'orderby' => false, 'order' => false)),
										  								    'icon'   => '&#xe070;'
										  							),
										  							array('label'  => __('Add Notification', GuiForm_Plugin::NAME),
										  								   'href'   => add_query_arg(array('page' => 'guiform', 'form' => $this->form, 'tab' => 'notification', 'action' => 'add', 'orderby' => false, 'order' => false, 'id' => false)),
										  								   'icon'   => '&#xe03e;'
										  							),
										  						  array('label'  => __('Preview', GuiForm_Plugin::NAME),
										  								    'href'   => $guiform->permalink($this->form, false, false),
										  								    'icon'   => '&#xe09a;',
										  								    'target' => '_blank'
										  							),
										  							array('label'  => __('Form Entry', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform-entry', 'form' => $this->form, 'tab' => false, 'action' => false, 'orderby' => false, 'order' => false)),
										  								    'icon'   => '&#xe01d;'
										  							)
										  					)
										);
			
		}
		else if($type == 'GuiForm_Render_Forms'){
			$param = array( 'title' => __('Navigation', GuiForm_Plugin::NAME),
										  'items' => array(
										  						  array('label'  => __('Add Form', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform-builder', 'form' => false, 'tab' => false)),
										  								    'icon'   => '&#xe054;'
										  							)
										  					)
										);
		}
		else if($type == 'GuiForm_Render_View'){
			$param = array( 'title' => __('Navigation', GuiForm_Plugin::NAME),
										  'items' => array(
										  						  array('label'  => __('Add Form', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform-builder', 'form' => false, 'tab' => false, 'entry' => false, 'orderby' => false, 'order' => false, 'entry_status' => false)),
										  								    'icon'   => '&#xe054;'
										  							),
										  							array('label'  => __('Edit Form', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform-builder', 'form' => $this->form, 'tab' => false, 'entry' => false, 'orderby' => false, 'order' => false, 'entry_status' => false)),
										  								    'icon'   => '&#xe070;'
										  							),
										  							array('label'  => __('Preview', GuiForm_Plugin::NAME),
										  								    'href'   => $guiform->permalink($this->form, false, false),
										  								    'icon'   => '&#xe09a;',
										  								    'target' => '_blank'
										  							),
										  							array('label'  => __('Settings', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform', 'form' => $this->form, 'tab' => false, 'entry' => false, 'orderby' => false, 'order' => false, 'entry_status' => false)),
										  								    'icon'   => '&#xe00c;'
										  							),
										  							array('label'  => __('Form Entry', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform-entry', 'form' => $this->form, 'tab' => false, 'entry' => false)),
										  								    'icon'   => '&#xe01d;'
										  							),
										  							array('label'  => __('Mark unread', GuiForm_Plugin::NAME),
										  								    'href'   => "javascript:void(0);",
										  								    'icon'   => '&#xe098;',
										  								    'data-action' => 'mark-unread',
										  								    'data-id'     => $this->entry
										  							),
										  							array('label'  => __('Move to trash', GuiForm_Plugin::NAME),
										  								    'href'   => "javascript:void(0);",
										  								    'icon'   => '&#xe000;',
										  								    'data-action' => 'trash-entry',
										  								    'data-id'     => $this->entry
										  							)
										  					)
										);
		}
		else if($type == 'GuiForm_Render_Entry'){
			$param = array( 'title' => __('Navigation', GuiForm_Plugin::NAME),
										  'items' => array(
										  						  array('label'  => __('Add Form', GuiForm_Plugin::NAME),
										  								   'href'   => add_query_arg(array('page' => 'guiform-builder', 'form' => false, 'tab' => false)),
										  								   'icon'   => '&#xe054;'
										  							),
										  							array('label'  => __('Edit Form', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform-builder', 'form' => $this->form, 'tab' => false, 'orderby' => false, 'order' => false, 'entry_status' => false)),
										  								    'icon'   => '&#xe070;'
										  							),
										  							array('label'  => __('Preview', GuiForm_Plugin::NAME),
										  								    'href'   => $guiform->permalink($this->form, false, false),
										  								    'icon'   => '&#xe09a;',
										  								    'target' => '_blank'
										  							),
										  							array('label'  => __('Settings', GuiForm_Plugin::NAME),
										  								    'href'   => add_query_arg(array('page' => 'guiform', 'form' => $this->form, 'tab' => false, 'orderby' => false, 'order' => false, 'entry_status' => false)),
										  								    'icon'   => '&#xe00c;'
										  							)
										  					)
										);
		}
		
		$this->_param = $param;
	}
	
	public function metabox_header(){
		global $guiform;
		$forms = $guiform->form($this->form, "row", array('id', 'title'));
	  ?>
		
		<ul class='metabox-icons'>
			<?php foreach($this->_param['items'] as $item): ?>
				<li><a id="<?php echo $item['id']; ?>" data-action="<?php echo $item['data-action']; ?>" target="<?php echo $item['target']; ?>" href="<?php echo $item['href']; ?>"><span class="icon" data-icon="<?php echo $item['icon']; ?>"></span><?php echo $item['label']; ?></a></li>
			<?php endforeach; ?>
			<?php if(in_array($this->type, $this->settings)): ?>
				<li class="switch-form">
					<select name="switch-form">
						<?php foreach($forms as $form): ?>
							<option value="<?php echo $form->id; ?>" <?php selected( $this->form, $form->id )?> ><?php echo $form->id .' : '. $form->title; ?></option>
						<?php endforeach; ?>
					<select>
				</li>
			<?php endif; ?>
			
		</ul>
	
	<?php	
	}
	
	public function init($type, $form = false, $entry = false){
		$this->form = $form;
		$this->entry = $entry;
		$this->type = $type;
		self::_type($type);
		$this->_addAction( 'admin_print_footer_scripts', 'printScript');
		$this->_addAction( 'admin_enqueue_scripts', 'scripts');
		$this->_addMetaBox('guiform_metaboxes-notification-header',  $this->_param['title'],  'metabox_header',  $this->_screen->id, 'advance', 'core');
	}
	
	public function scripts($hook_suffix){
		global $guiform;
		wp_enqueue_script('common');
		wp_enqueue_script('wp-lists');
		wp_enqueue_script('postbox');
		wp_enqueue_script('jquery-ui-draggable');
		wp_enqueue_style('guiform-icons', $guiform->assets('fonts/icons.css'), false, GuiForm_Plugin::VERSION, 'all');
		wp_enqueue_style('guiform-style', $guiform->assets('css/style.css'), false, GuiForm_Plugin::VERSION, 'all');
	}
	
	public function toHTML(){
		wp_nonce_field('guiform-metaboxes-general'); 
		wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false); 
		wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false); 
		do_meta_boxes($this->_screen->id, 'advance', $data);
	}
}