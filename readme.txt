=== GuiForm ===
Contributors: russellpabon
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=T68UXN46V3MEC
Tags: form, forms, form builder, contact form builder, responsive form, contact form, contact forms, form creator, form to email, email form, email, input, validation, jquery, shortcode, form manager
Requires at least: 3.5
Tested up to: 3.8
Stable tag: 1.4.8
License: GPLv2 or later

Build your responsive, beautiful and reusable forms and no coding required with this awesome form builder plug-in.

== Description ==

Awesome form builder with lots of features like what you see is what you get user interface, display form in other website, no conflict with themes CSS and much more.


= Features =

* WYSIWYG - What you see is what you get UI form builder.
* AJAX - Create your form without page load.
* Server side data entry validation.
* GZIP Compression and Speed Performance Optimization ready.
* Drag-and-drop - Adding and shorting of field is easy as ease.
* Form anywhere - Add your form not only in your Wordpress site but also in other website as well.
* Multiple forms - Embed multiple forms in one website page.
* Populate text and default value from POST and GET variable or URL query string.
* Shortcode and Source code.
* Required field.
* No conflict with themes CSS.
* Manage form entries.
* Drag and Drop file upload.
* Separate Entry Table.
* Add your own CSS.
* Font icon CSS built-in.
* Customized form submission message and redirect page. 
* Multiple Column field - Indefinite column with drag-and-drop shorting.
* Responsive Form - Output form provide optimal viewing experience for a wide range of devices.
* Merge Fields - Combine multiple fields.
* Resizable form width.
* Color Scheme - Change form builder color settings (WordPress 3.8 or higher only).
* Export entry


= Field Types =

* Heading
* Text
* Ordered List
* Text input (single line)
* Textarea (multiple lines)
* Checkbox
* Radio
* Select dropdown
* Password (with password strength algorithm)
* Email
* Phone (with input mask)
* Number
* Buttonset (Multiple options)
* Spinner
* Input Mask
* File Upload (Multiple files with drag and drop)
* Multiple File Upload (Support IE7 to IE9)
* Submit
* Reset


= Mail =

* Notification message
* Customize your own email message
* Include field value
* Setup SMPT account with SSL/TLS encryption and authentication
* Email activation to prevent user from using other email account for sending message
* Test mail message to know if it sending properly to the intended email address


= Source Code =

* URL - form link
* WordPress shortcode - Works on any types of Post, Page and Widget area.
* Javascript source code 
* Javascript embedded code 
* PHP short code
* HTML source code 


= Entry Manager =

* Show screen (hide and show)
* Screen layout (1 and 2 column)  
* Sortable metaboxes
* Collapsible metaboxes


= Capture data =

* IP address
* Operating System
* Browser Name
* Date Submitted


== Installation ==

1. Go to Plugins > Add New
1. Click the Upload link
1. Click Browse and locate the `guiform.x.x.zip` file
1. Click Install Now
1. After WordPress installs, click on the Activate Plugin link


== Screenshots ==
	
1. GuiForm builder page
2. Form output
3. Entries management page
4. View entry page
5. Form management page
6. Settings page


== Frequently Asked Questions ==

= Form is not working after upgrade? =

Edit your form and click save button then test your form.

= How can i use font icons? =

You can use the code below in label, short description, text paragraph, switch button, submit, reset and other field properties. Check the plugin font icons reference page.

1. &lt;span title="Male" data-icon="&amp;&#35;xe047;"&gt;&lt;/span&gt;
1. &lt;strong title="Female" data-icon="&amp;&#35;xe06c;"&gt;&lt;/strong&gt;


= Bigger files like videos are not uploading or having error? =

Edit your php.ini or add this to your .htaccess file. Make sure the value is greater than the required file size.

1. php_value upload_max_filesize 50M
1. php_value post_max_size 50M


== Changelog ==


**Version 1.4.8 - Feb 27, 2014**

* Added POST and GET method to populate text and default field value, check help tab for detailed instruction on how to use.
* Added form quick edit option Save Entries, enable to save entry or not.
* Added redirect URL parameter options.
* Added default value property.
* Fix miss spelled word default.
* Fix broken custom message styling.
* Fix broken thank you message window.
* Fix form saving issues.


**Version 1.4.7 - Feb 21, 2014**

* Alter guiform table COLUMN `init`, `template` and `database`.
* Add Speed Performance settings page.
* Add Analyze Performance navigation menu in form builder page.
* Fix textarea html email output.


**Version 1.4.6 - Feb 19, 2014**

* Add UTF-8 encoding in notification mail.
* Add display tool ordered list.
* Add uninstall page.
* Alter guiform table column init property to accept NULL.
* Improve CSS form output.
* Fix database error field 'init' doesn't have a default value.
* Fix bug form not updating.


**Version 1.4.5 - Feb 15, 2014**

* Fix bug with font icons that cause the text not to display in other browser.
* Fix conflict with other plugins
* Fix email notification not receiving
* Add multiple button options in switch field
* Add load text property in submit field
* Minor CSS update


**Version 1.4.4 - Feb 12, 2014**

* Fix label text not showing in Chrome.
* Fix loading message in submit button after submitting form.


**Version 1.4.3 - Feb 11, 2014**

* Fix file upload bug for safari and chrome.
* Fix shortcode property responsive not working.
* Fix file upload path for single upload field.
* Fix email verification link.
* Fix multiple upload for mobile device that do not support FormData object.
* Add password strength algorithm.
* Add entry parameter in redirect link.
* Add Font icon in submit, switch button, labels and more.
* Add screen size preview for mobile devices.
* Improve responsive css.


**Version 1.4.2 - Feb 10, 2014**

* Fix gallery library page shows blank.
* Fix required navigation color not showing red.
* Fix generated shortcode.
* Add unique value property in textbox field.


**Version 1.4.1 - Feb 9, 2014**

* Fix not redirect to URL after form is submitted.
* Fix bug for multiple form page.
* Fix bug for bulk options delete.
* Fix minor CSS for IE compatibility.
* Fix enable autosave and time not saving in general setting page.
* Fix internal server error in .
* Change keypress event to button click when saving in options tab.
* Add shortcode property responsive.
* Add option text width property for checkbox and radio field.
* Add thickbox preview.
* Add help tab in formbuilder page.
* Add textarea view in entry page.
* Add font icons reference page for switch button.


**Version 1.4 - Feb 5, 2014**

* Add support for multiple file upload in IE7 - IE9.
* Add font icon in switch button tool.
* Include file size in view entry page.
* Fix missing export file page.
* Fix CSS conflict for template that uses wp_footer hook to print the style.
* Fix edit link in form manager.
* Fix preview button.
* Fix spinner not changing property value when typing.


**Version 1.3.1 - Jan 27, 2014**

* Add export entry page.
* Add field variable for sending email.
* Fix form preview 404 error.
* Fix shortcode bug.
* Fix edit link in form manager.


**Version 1.3 - Jan 19, 2014**

* Add Heading tool.
* Add Text tool.
* Add edit clear form text value.
* Fix widget area shortcode not showing.
* Fix custom link not saving.
* Remove the 0 bug after sending a test email.


**Version 1.2 - Jan 18, 2014**

* Add missing files in version 1.1
* Minor updates with CSS.


**Version 1.1 - Jan 18, 2014**

* Add heading tool and properties.
* Fix file upload required error message.
* Minor updates with CSS.


== Upgrade Notice ==

= 1.4.7 =

Recommended update immediately!