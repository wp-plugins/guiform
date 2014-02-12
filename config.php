<?php

/**
  * Plugin version number.
	*
	* @since 1.0
	*/
define('GUIFORM_VERSION', '1.4.3');

/**
	* Setup global table prefix names.
	*
	* @since 1.0
	*/
global $wpdb;
$wpdb->guiform         = $wpdb->prefix.'guiform';
$wpdb->guiform_options = $wpdb->prefix.'guiform_options';
$wpdb->guiform_form    = $wpdb->prefix.'guiform_form_';