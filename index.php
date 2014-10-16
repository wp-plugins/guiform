<?php
/*
Plugin Name: GuiForm
Plugin URI: http://wordpress.org/plugins/guiform/
Description: This plugin has a simple drag and drop function and user-friendly customization commands that would let anyone create forms in a flash. No need to code anything - the plugin will do it for you.
Version: 1.6.2
Author: russellpabon
Author URI: https://www.odesk.com/users/~01ef85c3851e913703
Donate link: 
License: GPL v2 or later
License URI: http://www.opensource.org/licenses/gpl-license.php
*/

global $wpdb;
$wpdb->guiform         = $wpdb->prefix.'guiform';
$wpdb->guiform_options = $wpdb->prefix.'guiform_options';
$wpdb->guiform_form    = $wpdb->prefix.'guiform_form_';

// prevent direct access to the plugin folder
if ( !defined( 'ABSPATH' ) ) {
	header( 'HTTP/1.0 404 Not Found', true, 404 );
	exit;
}

// don't load the plugin, if it has been already loaded
if ( class_exists( 'GuiForm_Plugin', false ) ) {
   return;
}

//Check if wp_verify_nonce is not exist.
if(!function_exists('wp_verify_nonce')) {
	require_once(ABSPATH .'wp-includes/pluggable.php');
}



/**
 * Automatically loads classes for the plugin. Checks a namespace and loads only
 * approved classes.
 *
 * @since 1.0
 *
 * @param string $class The class name to autoload.
 * @return boolean Returns TRUE if the class is located. Otherwise FALSE.
 */
function guiform_autoloader( $class ) {
	$namespaces = array('GuiForm');
	foreach ( $namespaces as $namespace ) {
		if ( substr( $class, 0, strlen( $namespace ) ) == $namespace ) {
			$filename = dirname( __FILE__ ) . str_replace( '_', DIRECTORY_SEPARATOR, "_classes_{$class}.php" );
			if ( is_readable( $filename ) ) {
				require $filename;
				return true;
			}
		}
	}

	return false;
}

/**
 * Instantiates the plugin and setup all modules.
 *
 * @since 1.0
 */
function guiform_launch() {
	// setup environment
	define( 'GUIFORM_BASEFILE', __FILE__ );
	define( 'GUIFORM_ABSURL', plugins_url( '/', __FILE__ ) );
	define( 'GUIFORM_ABSPATH', dirname( __FILE__ ) .'/' );
	
	if(file_exists(GUIFORM_ABSPATH .'functions.php')){
		require_once('functions.php');
	}
	
	// instantiate the plugin
	$plugin = GuiForm_Plugin::instance();

	// set general modules
	$plugin->setModule( GuiForm_Module_Setup::NAME );
	
	// don't load the plugin if cron job is running or doing autosave
	$doing_autosave = defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE;
	$doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;
	$doing_ajax = defined( 'DOING_AJAX' ) && DOING_AJAX;
	$doing_admin_post = defined( 'WP_ADMIN' ) && WP_ADMIN;

	if ( $doing_autosave || $doing_cron ) {
		return;
	}

	if ( $doing_ajax) {
		if($_POST['action'] == GuiForm_Plugin::ACTION_SAVE_FORM){
			$plugin->setModule( GuiForm_Module_Post::NAME );
		}
		else{
			// set ajax modules
			$plugin->setModule( GuiForm_Module_Ajax::NAME );
		}
	} 
	else if(basename($_SERVER["PHP_SELF"]) == 'admin-post.php'){
		$plugin->setModule( GuiForm_Module_Post::NAME );
	}
	else {
		if ( is_admin() ) {
			// set admin modules
			$plugin->setModule( GuiForm_Module_Admin::NAME );
		} else {
			// set frontend modules
			$plugin->setModule( GuiForm_Module_Frontend::NAME );
		}
	}
}

// register autoloader function
spl_autoload_register( 'guiform_autoloader' );

// launch the plugin
guiform_launch();