<?php

// +----------------------------------------------------------------------+
// | Copyright 2013 GuiForm (email : info@guiform.com)                    |
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
 * Renders icon page.
 *
 * @category GuiForm
 * @package Render
 * @subpackage Settings
 *
 * @since 1.0
 */
class GuiForm_Render_Settings_Icons extends GuiForm_Render_Settings {

	public function __construct( ) { 
		add_action( 'admin_enqueue_scripts', array( &$this, 'scripts' ));
	}
	
	function scripts($hook_suffix){
		if($hook_suffix == GuiForm_Plugin::NAME .'_page_guiform-settings'){
			global $guiform;
			wp_enqueue_style('guiform-icons', $guiform->assets('fonts/icons.css'), false, GuiForm_Plugin::VERSION, 'all');
			wp_enqueue_style('guiform-style', $guiform->assets('css/style.css'), false, GuiForm_Plugin::VERSION, 'all');
		}
	}


	/**
	 * Renders page template.
	 *
	 * @since 1.0
	 *
	 * @access protected
	 */
	protected function _toHTML(){
		
		//GuiForm_Render_Settings::header("icons");
		
		?>
		
		
<link href="http://fonts.googleapis.com/css?family=Dosis:400,500,700" rel="stylesheet" type="text/css">
<style type="text/css">
	ol,ul{list-style:none}
	table{border-collapse:separate;border-spacing:0;vertical-align:middle}
	caption,th,td{text-align:left;font-weight:normal;vertical-align:middle}
	a img{border:none}
	*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}
	.container{margin:15px auto;width:90%}
	h1{margin:40px 0 20px;font-weight:700;font-size:38px;line-height:32px;color:#fb565e}
	.small{font-size:14px;color:#a5adb4;}
	.small a{color:#a5adb4;}
	.small a:hover{color:#fb565e}
	.glyphs.character-mapping{margin:0 0 20px 0;padding:20px 0 20px 30px;color:rgba(0,0,0,0.5);border:1px solid #d8e0e5;-webkit-border-radius:3px;border-radius:3px;}
	.glyphs.character-mapping li{margin:0 30px 20px 0;display:inline-block;width:90px}
	.glyphs.character-mapping .icon{margin:10px 0 10px 15px;padding:15px;position:relative;width:55px;height:55px;color:#162a36 !important;overflow:hidden;-webkit-border-radius:3px;border-radius:3px;font-size:32px;}
	.glyphs.character-mapping .icon svg{fill:#000}
	.glyphs.character-mapping input{margin:0;padding:5px 0;line-height:12px;font-size:12px;display:block;width:100%;border:1px solid #d8e0e5;-webkit-border-radius:5px;border-radius:5px;text-align:center;outline:0;}
	.glyphs.character-mapping input:focus{border:1px solid #fbde4a;-webkit-box-shadow:inset 0 0 3px #fbde4a;box-shadow:inset 0 0 3px #fbde4a}
	.glyphs.character-mapping input:hover{-webkit-box-shadow:inset 0 0 3px #fbde4a;box-shadow:inset 0 0 3px #fbde4a}
	.glyphs.css-mapping{margin:0 0 60px 0;padding:30px 0 20px 30px;color:rgba(0,0,0,0.5);border:1px solid #d8e0e5;-webkit-border-radius:3px;border-radius:3px;}
	.glyphs.css-mapping li{margin:0 30px 20px 0;padding:0;display:inline-block;overflow:hidden}
	.glyphs.css-mapping .icon{margin:0;margin-right:10px;padding:13px;height:50px;width:50px;color:#162a36 !important;overflow:hidden;float:left;font-size:24px}
	.glyphs.css-mapping input{margin:0;margin-top:5px;padding:8px;line-height:16px;font-size:16px;display:block;width:150px;height:40px;border:1px solid #d8e0e5;-webkit-border-radius:5px;border-radius:5px;background:#fff;outline:0;float:right;}
	.glyphs.css-mapping input:focus{border:1px solid #fbde4a;-webkit-box-shadow:inset 0 0 3px #fbde4a;box-shadow:inset 0 0 3px #fbde4a}
	.glyphs.css-mapping input:hover{-webkit-box-shadow:inset 0 0 3px #fbde4a;box-shadow:inset 0 0 3px #fbde4a}

</style>

<div class="container">
  <h1>GuiForm Icons</h1>
  <h2>Character mapping</h2>
  <h2 style="margin-top: 0px; text-transform: none;">Example: &lt;span title="Male" data-icon="&amp;#xe047;"&gt;&lt;/span&gt;</h2>
	<ul class="glyphs character-mapping">
	  <li>
	    <div data-icon="&#xe000;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe000;">
	  </li>
	  <li>
	    <div data-icon="&#xe003;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe003;">
	  </li>
	  <li>
	    <div data-icon="&#xe004;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe004;">
	  </li>
	  <li>
	    <div data-icon="&#xe005;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe005;">
	  </li>
	  <li>
	    <div data-icon="&#xe00a;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe00a;">
	  </li>
	  <li>
	    <div data-icon="&#xe00c;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe00c;">
	  </li>
	  <li>
	    <div data-icon="&#xe00d;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe00d;">
	  </li>
	  <li>
	    <div data-icon="&#xe013;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe013;">
	  </li>
	  <li>
	    <div data-icon="&#xe016;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe016;">
	  </li>
	  <li>
	    <div data-icon="&#xe01a;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe01a;">
	  </li>
	  <li>
	    <div data-icon="&#xe01b;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe01b;">
	  </li>
	  <li>
	    <div data-icon="&#xe01c;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe01c;">
	  </li>
	  <li>
	    <div data-icon="&#xe01d;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe01d;">
	  </li>
	  <li>
	    <div data-icon="&#xe01e;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe01e;">
	  </li>
	  <li>
	    <div data-icon="&#xe023;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe023;">
	  </li>
	  <li>
	    <div data-icon="&#xe026;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe026;">
	  </li>
	  <li>
	    <div data-icon="&#xe027;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe027;">
	  </li>
	  <li>
	    <div data-icon="&#xe029;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe029;">
	  </li>
	  <li>
	    <div data-icon="&#xe02a;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe02a;">
	  </li>
	  <li>
	    <div data-icon="&#xe02b;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe02b;">
	  </li>
	  <li>
	    <div data-icon="&#xe02e;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe02e;">
	  </li>
	  <li>
	    <div data-icon="&#xe033;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe033;">
	  </li>
	  <li>
	    <div data-icon="&#xe036;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe036;">
	  </li>
	  <li>
	    <div data-icon="&#xe037;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe037;">
	  </li>
	  <li>
	    <div data-icon="&#xe038;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe038;">
	  </li>
	  <li>
	    <div data-icon="&#xe03b;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe03b;">
	  </li>
	  <li>
	    <div data-icon="&#xe03d;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe03d;">
	  </li>
	  <li>
	    <div data-icon="&#xe03e;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe03e;">
	  </li>
	  <li>
	    <div data-icon="&#xe040;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe040;">
	  </li>
	  <li>
	    <div data-icon="&#xe041;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe041;">
	  </li>
	  <li>
	    <div data-icon="&#xe047;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe047;">
	  </li>
	  <li>
	    <div data-icon="&#xe04e;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe04e;">
	  </li>
	  <li>
	    <div data-icon="&#xe04f;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe04f;">
	  </li>
	  <li>
	    <div data-icon="&#xe052;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe052;">
	  </li>
	  <li>
	    <div data-icon="&#xe054;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe054;">
	  </li>
	  <li>
	    <div data-icon="&#xe055;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe055;">
	  </li>
	  <li>
	    <div data-icon="&#xe056;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe056;">
	  </li>
	  <li>
	    <div data-icon="&#xe057;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe057;">
	  </li>
	  <li>
	    <div data-icon="&#xe059;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe059;">
	  </li>
	  <li>
	    <div data-icon="&#xe063;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe063;">
	  </li>
	  <li>
	    <div data-icon="&#xe069;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe069;">
	  </li>
	  <li>
	    <div data-icon="&#xe06a;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe06a;">
	  </li>
	  <li>
	    <div data-icon="&#xe06b;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe06b;">
	  </li>
	  <li>
	    <div data-icon="&#xe06c;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe06c;">
	  </li>
	  <li>
	    <div data-icon="&#xe06d;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe06d;">
	  </li>
	  <li>
	    <div data-icon="&#xe06f;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe06f;">
	  </li>
	  <li>
	    <div data-icon="&#xe070;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe070;">
	  </li>
	  <li>
	    <div data-icon="&#xe071;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe071;">
	  </li>
	  <li>
	    <div data-icon="&#xe072;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe072;">
	  </li>
	  <li>
	    <div data-icon="&#xe073;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe073;">
	  </li>
	  <li>
	    <div data-icon="&#xe075;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe075;">
	  </li>
	  <li>
	    <div data-icon="&#xe07b;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe07b;">
	  </li>
	  <li>
	    <div data-icon="&#xe07c;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe07c;">
	  </li>
	  <li>
	    <div data-icon="&#xe080;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe080;">
	  </li>
	  <li>
	    <div data-icon="&#xe082;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe082;">
	  </li>
	  <li>
	    <div data-icon="&#xe089;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe089;">
	  </li>
	  <li>
	    <div data-icon="&#xe08c;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe08c;">
	  </li>
	  <li>
	    <div data-icon="&#xe093;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe093;">
	  </li>
	  <li>
	    <div data-icon="&#xe097;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe097;">
	  </li>
	  <li>
	    <div data-icon="&#xe098;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe098;">
	  </li>
	  <li>
	    <div data-icon="&#xe099;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe099;">
	  </li>
	  <li>
	    <div data-icon="&#xe09a;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe09a;">
	  </li>
	  <li>
	    <div data-icon="&#xe09d;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe09d;">
	  </li>
	  <li>
	    <div data-icon="&#xe077;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe077;">
	  </li>
	  <li>
	    <div data-icon="&#xe0a6;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0a6;">
	  </li>
	  <li>
	    <div data-icon="&#xe0a8;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0a8;">
	  </li>
	  <li>
	    <div data-icon="&#xe0b5;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0b5;">
	  </li>
	  <li>
	    <div data-icon="&#xe0b6;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0b6;">
	  </li>
	  <li>
	    <div data-icon="&#xe0b9;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0b9;">
	  </li>
	  <li>
	    <div data-icon="&#xe0c4;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0c4;">
	  </li>
	  <li>
	    <div data-icon="&#xe0dc;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0dc;">
	  </li>
	  <li>
	    <div data-icon="&#xe0bd;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0bd;">
	  </li>
	  <li>
	    <div data-icon="&#xe0c0;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0c0;">
	  </li>
	  <li>
	    <div data-icon="&#xe09b;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe09b;">
	  </li>
	  <li>
	    <div data-icon="&#xe0ac;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0ac;">
	  </li>
	  <li>
	    <div data-icon="&#xe0b7;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0b7;">
	  </li>
	  <li>
	    <div data-icon="&#xe0d3;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0d3;">
	  </li>
	  <li>
	    <div data-icon="&#xe0d7;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0d7;">
	  </li>
	  <li>
	    <div data-icon="&#xe0d6;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe0d6;">
	  </li>
	  <li>
	    <div data-icon="&#xe014;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe014;">
	  </li>
	  <li>
	    <div data-icon="&#xe02d;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe02d;">
	  </li>
	  <li>
	    <div data-icon="&#xe017;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe017;">
	  </li>
	  <li>
	    <div data-icon="&#xe019;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe019;">
	  </li>
	  <li>
	    <div data-icon="&#xe01f;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe01f;">
	  </li>
	  <li>
	    <div data-icon="&#xe022;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe022;">
	  </li>
	  <li>
	    <div data-icon="&#xe020;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe020;">
	  </li>
	  <li>
	    <div data-icon="&#xe025;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe025;">
	  </li>
	  <li>
	    <div data-icon="&#xe028;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe028;">
	  </li>
	  <li>
	    <div data-icon="&#xe02f;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe02f;">
	  </li>
	  <li>
	    <div data-icon="&#xe032;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe032;">
	  </li>
	  <li>
	    <div data-icon="&#xe018;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe018;">
	  </li>
	  <li>
	    <div data-icon="&#xe032;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe032;">
	  </li>
	  <li>
	    <div data-icon="&#xe009;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe009;">
	  </li>
	  <li>
	    <div data-icon="&#xe00f;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe00f;">
	  </li>
	  <li>
	    <div data-icon="&#xe010;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe010;">
	  </li>
	  <li>
	    <div data-icon="&#xe001;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe001;">
	  </li>
	  <li>
	    <div data-icon="&#xe002;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe002;">
	  </li>
	  <li>
	    <div data-icon="&#xe006;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe006;">
	  </li>
	  <li>
	    <div data-icon="&#xe008;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe008;">
	  </li>
	  <li>
	    <div data-icon="&#xe011;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe011;">
	  </li>
	  <li>
	    <div data-icon="&#xe007;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe007;">
	  </li>
	  <li>
	    <div data-icon="&#xe00b;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe00b;">
	  </li>
	  <li>
	    <div data-icon="&#xe012;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe012;">
	  </li>
	  <li>
	    <div data-icon="&#xe015;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe015;">
	  </li>
	  <li>
	    <div data-icon="&#xe024;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe024;">
	  </li>
	  <li>
	    <div data-icon="&#xe02c;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe02c;">
	  </li>
	  <li>
	    <div data-icon="&#xe030;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe030;">
	  </li>
	  <li>
	    <div data-icon="&#xe031;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe031;">
	  </li>
	  <li>
	    <div data-icon="&#xe034;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe034;">
	  </li>
	  <li>
	    <div data-icon="&#xe035;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe035;">
	  </li>
	  <li>
	    <div data-icon="&#xe039;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe039;">
	  </li>
	  <li>
	    <div data-icon="&#xe03a;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe03a;">
	  </li>
	  <li>
	    <div data-icon="&#xe03c;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe03c;">
	  </li>
	  <li>
	    <div data-icon="&#xe03f;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe03f;">
	  </li>
	  <li>
	    <div data-icon="&#xe021;" class="icon"></div>
	    <input type="text" readonly="readonly" value="&amp;#xe021;">
	  </li>
	  <li>
      <div data-icon="&#xe00e;" class="icon"></div>
      <input type="text" readonly="readonly" value="&amp;#xe00e;">
    </li>
    <li>
      <div data-icon="&#xe042;" class="icon"></div>
      <input type="text" readonly="readonly" value="&amp;#xe042;">
    </li>
    <li>
      <div data-icon="&#xe043;" class="icon"></div>
      <input type="text" readonly="readonly" value="&amp;#xe044;">
    </li>
     <li>
	     <div data-icon="&#xe045;" class="icon"></div>
	     <input type="text" readonly="readonly" value="&amp;#xe045;">
     </li>
     <li>
			 <div data-icon="&#xe046;" class="icon"></div>
			 <input type="text" readonly="readonly" value="&amp;#xe046;">
		 </li>
		 <li>
       <div data-icon="&#xe048;" class="icon"></div>
       <input type="text" readonly="readonly" value="&amp;#xe048;">
     </li>
	</ul>
</div>
    
<script type="text/javascript">
	(function() {
	  var glyphs, _i, _len, _ref;
	
	  _ref = document.getElementsByClassName('glyphs');
	  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    glyphs = _ref[_i];
	    glyphs.addEventListener('click', function(event) {
	      if (event.target.tagName === 'INPUT') {
	        return event.target.select();
	      }
	    });
	  }
	
	}).call(this);
</script>

		
		
	  <?php
	}


}