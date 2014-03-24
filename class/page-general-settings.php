<?php

global $guif;

$profile_url = admin_url("profile.php");

$profile = sprintf( __( 'Change the admin color scheme <a href="%s">here</a> .', 'guiform' ), esc_url($profile_url));

?>
<form id="mainform" enctype="multipart/form-data" action="" method="post">
<h3 class="title"><?php _e("Common Settings", 'guiform'); ?></h3>
<table class="form-table">
	<tbody>
		<tr valign="top">
			<th class="titledesc" scope="row">
				<label for=""><?php _e("Enable/Disable", 'guiform'); ?></label>
			</th>
			<td>
				<label for="autosave"><input id="autosave" type="checkbox" <?php echo ($guif->get_option(0, 'autosave') ? " checked='checked' " : ''); ?> value="1" name="autosave" style=""> Enable Auto save when creating a form.</label>                     
			</td>
		</tr>
		<tr valign="top">
			<th class="titledesc" scope="row">
			</th>
			<td>
				<input type="text" value="<?php echo $guif->get_option(0, 'autosave_time'); ?>" size="4" name="autosave_time">
				<code><?php _e("Number in seconds the Auto save will trigger (Minimum value is 60 seconds).", 'guiform'); ?></code>   
			</td>
		</tr>
		<tr valign="top">
			<th scope="row"><label for="blogname"><?php _e("Upload Folder", 'guiform'); ?></label></th>
			<td>
				<label for="upload_folder">
					<code><?php echo ABSPATH; ?></code>
					<input type="text" style="width: 300px;" value="<?php echo $guif->get_option(0, 'upload_folder'); ?>" name="upload_folder" id="upload_folder">
				</label>
			</td>
		</tr>
	</tbody>
</table>
<h3 class="title">Form Link</h3>
<table class="form-table">
	<tbody>
		<tr>
			<th><label><input type="radio" <?php echo ($guif->permalink['selection'] == 'default') ? ' checked="checked" ' : ''; ?> value="default" name="selection"> <?php _e("Default", 'guiform'); ?></label></th>
			<td>
				<code>
					<?php
						if(get_option('permalink_structure')){
				  		echo "<code>". get_site_url() ."/form/123</code>";
				  	}
				  	else{
				  		echo "<code>". get_site_url() ."/?form=123</code>";
				  	}
					?>
				</code>
			</td>
		</tr>
		<tr>
			<th><label><input type="radio"  <?php echo ($guif->permalink['selection'] == 'custom') ? ' checked="checked" ' : ''; ?> value="custom" name="selection"> <?php _e("Custom Link", 'guiform'); ?></label></th>
			<td>
				<?php
				$value = ($guif->permalink['selection'] == 'custom') ? $guif->permalink['value'] : '';
				if(get_option('permalink_structure')){
		  		echo "<code>". get_site_url() ."/</code>
					  		<input type='text' name='custom' value='". $value ."' style='width: 150px;'>
					  		<code>/123</code>";
		  	}
		  	else{
		  		echo "<code>". get_site_url() ."/?</code>
					  		<input type='text' name='custom' value='". $value ."' style='width: 150px;'>
					  		<code>=123</code>";
		  	}
				?>
				
				
			</td>
		</tr>
	</tbody>
</table>

<?php if(get_bloginfo('version') >= 3.8) : ?>
	<h3 class="title"><?php _e("Color Scheme", 'guiform'); ?></h3>
	<p><?php echo $profile; ?></p>
<?php endif; ?>


<?php submit_button(); ?>		
</form>