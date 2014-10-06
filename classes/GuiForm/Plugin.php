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
 * The core plugin class.
 *
 * @category GuiForm
 *
 * @since 1.0
 */
class GuiForm_Plugin {

	const NAME     = 'guiform';
	const PACKAGE  = 'GuiForm';
	const AUTHOR   = 'Russell Pabon';
	const VERSION  = '1.6';
	const SERVER   = 'https://www.guiform.com';
	
	// Action for ajax
	const ACTION_SAVE_FORM            = 'guiform-save-form';
	const ACTION_SAVE_FORM_INIT       = 'guiform-save-form-init';
	const ACTION_FORM_PREVIEW         = 'guiform-form-preview';

	const ACTION_XHR_UPLOAD           = 'guiform-xhr-upload';
	const ACTION_FILE_UNLINK          = 'guiform-file-unlink';
	
	const ACTION_MARK_UNREAD          = 'guiform-mark-unread';
	const ACTION_TRASH_ENTRY          = 'guiform-trash-entry';
	const ACTION_DELETE_ENTRY         = 'guiform-delete-entry';
	const ACTION_RESTORE_ENTRY        = 'guiform-restore-entry';
	
	const ACTION_QUICK_EDIT_FORMS     = 'guiform-quick-edit-forms';
	const ACTION_QUICK_SAVE_FORMS     = 'guiform-quick-save-forms';
	
	const ACTION_QUICK_EDIT_MAIL      = 'guiform-quick-edit-mail';
	const ACTION_QUICK_SAVE_MAIL      = 'guiform-quick-save-mail';
	
	const ACTION_MAIL_TEST            = 'guiform-mail-test';
	const ACTION_MAIL_ACTIVATE        = 'guiform-mail-activate';
	
	const ACTION_QUICK_DELETE         = 'guiform-quick-delete';
	const ACTION_QUICK_DUPLICATE      = 'guiform-quick-duplicate';
	
	const ACTION_DISPLAY_ENTRY        = 'guiform-display-entry';
	const ACTION_DISPLAY_ENTRY_SAVE   = 'guiform-display-entry-save';
	
	const ACTION_NOTIFICATION_STATUS  = 'guiform-notification-status';
	
	const ACTION_EXPORT_ENTRY_FIELDS  = 'guiform-export-entry-fields';
	
	//Action for admin post
	const ACTION_EXPORT_ENTRY_CSV     = 'guiform-export-entry-csv';
	const ACTION_EXPORT_FORM_SQL      = 'guiform-export-form-sql';
	const ACTION_EXPORT_FORM_PHP      = 'guiform-export-form-php';
	const ACTION_IMPORT_FORM_PHP      = 'guiform-import-form-php';
	const ACTION_IMPORT_PHP           = 'guiform-import-php';
	const ACTION_SAVE_ENTRY           = 'guiform-save-entry';
	
	/**
	 * Singletone instance of the plugin.
	 *
	 * @since 1.0
	 *
	 * @access private
	 * @var GuiForm_Plugin
	 */
	private static $_instance = null;

	/**
	 * The array of registered modules.
	 *
	 * @since 1.0
	 *
	 * @access private
	 * @var array
	 */
	private $_modules = array();

	/**
	 * Private constructor.
	 *
	 * @since 1.0
	 *
	 * @access private
	 */
	private function __construct() {
		global $guiform;
		session_start();
		$guiform = new GuiForm_Module_Api();
		$guiform->init();
	}

	/**
	 * Private clone method.
	 *
	 * @since 1.0
	 *
	 * @access private
	 */
	private function __clone() {}

	/**
	 * Returns singletone instance of the plugin.
	 *
	 * @since 1.0
	 *
	 * @static
	 * @access public
	 * @return GuiForm_Plugin
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new GuiForm_Plugin();
		}

		return self::$_instance;
	}

	/**
	 * Returns a module if it was registered before. Otherwise NULL.
	 *
	 * @since 1.0
	 *
	 * @access public
	 * @param string $name The name of the module to return.
	 * @return GuiForm_Module|null Returns a module if it was registered or NULL.
	 */
	public function getModule( $name ) {
		return isset( $this->_modules[$name] ) ? $this->_modules[$name] : null;
	}

	/**
	 * Determines whether the module has been registered or not.
	 *
	 * @since 1.0
	 *
	 * @access public
	 * @param string $name The name of a module to check.
	 * @return boolean TRUE if the module has been registered. Otherwise FALSE.
	 */
	public function hasModule( $name ) {
		return isset( $this->_modules[$name] );
	}

	/**
	 * Register new module in the plugin.
	 *
	 * @since 1.0
	 *
	 * @access public
	 * @param string $module The name of the module to use in the plugin.
	 */
	public function setModule( $class ) {
		$this->_modules[$class] = new $class( $this );
	}

}