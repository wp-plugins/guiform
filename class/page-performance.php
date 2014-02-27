<?php

global $guif;

?>

<form id="mainform" enctype="multipart/form-data" action="" method="post">

<table class="form-table">
	<tbody>
		<tr valign="top">
			<th scope="row" class="titledesc">
				<label for="step-1"><?php printf( __( 'Step %d', 'guiform' ), 1 ); ?></label>
			</th>
			<td>
				<label for="performance"><input type="checkbox" <?php echo ($guif->get_option(0, 'performance') ? " checked='checked' " : ''); ?> id="performance" name="performance" value="true"> <?php _e("Enable Form Speed and Performance Optimization.", 'guiform'); ?></label>                     
			</td>
		</tr>
		<?php if($guif->get_option(0, 'performance')): ?>
			<tr valign="top">
				<th scope="row">
					<label for="step-2"><?php printf( __( 'Step %d', 'guiform' ), 2 ); ?></label>
				</th>
				<td>
					<p>
						<?php printf( __( 'Copy and paste the code below in your main <code>%s</code> file.', 'guiform' ), '.htaccess' ); ?>
					</p>
					<textarea id="code" style="color: #AAAAAA; width: 50%; display: block; height: 400px;" readonly="readonly">
						
	## Enable g-zip file compression ##
	<IfModule mod_deflate.c>
	AddOutputFilterByType DEFLATE text/plain
	AddOutputFilterByType DEFLATE text/html
	AddOutputFilterByType DEFLATE text/xml
	AddOutputFilterByType DEFLATE text/css
	AddOutputFilterByType DEFLATE application/xml
	AddOutputFilterByType DEFLATE application/xhtml+xml
	AddOutputFilterByType DEFLATE application/rss+xml
	AddOutputFilterByType DEFLATE application/javascript
	AddOutputFilterByType DEFLATE application/x-javascript
	AddOutputFilterByType DEFLATE image/x-icon 
	AddOutputFilterByType DEFLATE image/svg+xml 
	AddOutputFilterByType DEFLATE application/vnd.ms-fontobject 
	AddOutputFilterByType DEFLATE application/x-font-ttf 
	AddOutputFilterByType DEFLATE font/opentype
	</IfModule>
	
	## EXPIRES CACHING ##
	<IfModule mod_expires.c>
	ExpiresActive On
	ExpiresByType image/jpg "access plus 1 year"
	ExpiresByType image/jpeg "access plus 1 year"
	ExpiresByType image/gif "access plus 1 year"
	ExpiresByType image/png "access plus 1 year"
	ExpiresByType application/pdf "access plus 1 month"
	ExpiresByType application/x-shockwave-flash "access plus 1 month"
	ExpiresByType image/x-icon "access plus 1 year"
	ExpiresByType text/css "access plus 1 month"
	ExpiresByType text/x-javascript "access plus 1 month"
	ExpiresByType application/javascript "access plus 1 month"
	</IfModule>	
					</textarea>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row" class="titledesc">
					<label for="step-3"><?php printf( __( 'Step %d', 'guiform' ), 3 ); ?></label>
				</th>
				<td>
					<p>
						<?php printf( __( 'Create your form <a href="%s">here</a>.', 'guiform' ), 'admin.php?page=guiform/form-builder' ); ?>
					</p>                     
				</td>
			</tr>
			<tr valign="top">
				<th scope="row" class="titledesc">
					<label for="step-4"><?php printf( __( 'Step %d', 'guiform' ), 4 ); ?></label>
				</th>
				<td>
					<p>
						<?php _e("Save the form and click the <code>Analyze Performance</code> navigation icon.", 'guiform'); ?>
					</p>                     
				</td>
			</tr>
		<?php endif; ?>
	</tbody>
</table>

<?php submit_button(); ?>	

</form>

<script type="text/javascript">
	(function() {
	  var code = document.getElementById('code');
	    code.addEventListener('click', function(event){
	    	return event.target.select();
	    });
	
	}).call(this);
</script>