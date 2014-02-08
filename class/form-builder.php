<?php
class Form_builder{
	public function display(){
		global $guif;
		$html = "<a id='thickbox-preview' class='add_media thickbox' title='Form Preview'></a>
						 <div id='GuiForm' class='container form-builder clearfix'></div>";
		return "\n\n\n$html\n\n\n";
	}
}
?>