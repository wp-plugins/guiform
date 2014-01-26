<?php

if(isset($_GET['mv-code'])){
	$id = mysql_escape_string(trim($_GET['id']));
	$mv_code = mysql_escape_string(trim($_GET['mv-code']));
	$option = $guif->get_option($id);
	
	$data = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->guiform_options WHERE id = %d", $id));
	$row = unserialize($data->value);
	
	if($row['key'] == $mv_code){
		$row['key'] = '';
		$row['status'] = 1;
		$guif->update_option($id, $data->name, $row);
		$blog_id = get_current_blog_id();
		$path = "admin.php?page=guiform%2Fsettings&tab=mail";
		$path = get_admin_url( $blog_id, $path);
		
		$html = "<strong>Congratulations!</strong><br /><br />
						You can now use your email address for sending confirmation message with your form.<br /><br />
						<a href=\"$path\">Click here to continue.</a><br /><br />
						GuiForm Team<br />";
		echo $guif->email_tpl($html);
	}
	else{
		$blog_id = get_current_blog_id();
		$path = "admin.php?page=guiform%2Fsettings&tab=mail";
		$path = get_admin_url( $blog_id, $path);
		
		$html = "<strong>Invalid Code!</strong><br /><br />
						You entered invalid email verification code. Please check your email or send a new verification code request.<br /><br />
						<a href=\"$path\">Click here to continue.</a><br /><br />
						GuiForm Team<br />";
		echo $guif->email_tpl($html);
	}
	
	die();
}


require_once('format.php');

$format = new Format(); 
$id = absint(trim($this->id));
$type = esc_html(trim($_GET['type']));
$form = $wpdb->get_row($wpdb->prepare("SELECT title, html FROM $wpdb->guiform WHERE id = %d", $id));

$url = $this->permalink() .$id;
$ajax_url = plugins_url('guiform/ajax.php');

add_action('wp_footer', array(&$this, 'footer_script'), 10, 2);

header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Accept-Language: en-us");

//OS for devices.
$devices = array('iPhone', 'iPad', 'iPod', 'Android', 'BlackBerry', 'Mobile', 'Firefox OS', 'Windows Phone');

?>

<!DOCTYPE html>
<html>
<head>
<title><?php echo $form->title; ?></title>
<meta http-equiv="Content-Type" content="text/html;" />

<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="HandheldFriendly" content="true">

<link rel="stylesheet"  href="<?php echo plugins_url('guiform/library/jquery-ui/css/custom-theme/jquery-ui-1.9.2.custom.min.css'); ?>" type="text/css" media="all" />			
<link rel="stylesheet"  href="<?php echo plugins_url('guiform/css/guiform.css'); ?>" type="text/css" media="all" />

<?php if(in_array($guif->os, $devices)): ?>

<link rel="stylesheet"  href="<?php echo plugins_url('guiform/css/responsive.css'); ?>" type="text/css" media="all" />

<?php endif; ?>
</head>
<body id="GuiForm" <?php echo (isset($_GET['preview'])) ? " style='padding-top: 35px;'" : ''; ?>>
	
<form enctype="multipart/form-data" name="guiform" id="guiForm_<?php echo rand(); ?>" method="POST" action="<?php echo $url; ?>">
	<?php
	$html = preg_replace("/[\\n\\r]+/", "", $form->html);
	$html = trim(preg_replace('/\s\s+/', '', $html));
	$html = str_replace('option><option', "option>\n<option", $format->HTML($html));
	echo $html;	
	
	?>
</form>

<?php wp_footer(); ?>
</body>
</html>