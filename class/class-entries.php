<?php


class Entries_List_Table extends WP_List_Table {
	
	var $_screen;
	var $_columns;
	var $_message = false;
  var $current_user;
  var $id;
  var $form;
  var $table;
  
	/**
	* Constructor, we override the parent to pass our own arguments
	* We usually focus on three parameters: singular and plural labels, as well as whether the class supports AJAX.
	*/
	function __construct($screen, $columns = array()) {
		global $wpdb;
		
		$this->current_user = get_current_user_id();
		$this->current_filter_action();
		$this->id = $this->form_selected();
		$this->form = $this->form();
		$this->table = $wpdb->guiform_form.$this->id;
		
		
		if ( is_string( $screen ) )
			$screen = convert_to_screen( $screen );

		$this->_screen = $screen;
		
		if ( !empty( $columns ) ) {
			$this->_columns = $columns;
			add_filter( 'manage_' . $screen->id .'/'. $form . '_columns', array( &$this, 'get_columns' ), 0 );
		}
		
		
		parent::__construct( array(
			'singular'=> 'wp_list_text_link', //Singular label
			'plural' => 'wp_list_test_links', //plural label, also this well be one of the table css class
			'ajax'	=> false //We won't support Ajax for this table
			) 
		);
		
		$this->process_bulk_action();
		
	}
	
	function form(){
		global $wpdb;
		$result = $wpdb->get_results($wpdb->prepare("SELECT id, title, entry_field FROM $wpdb->guiform WHERE id = %d", $this->id));
		return $result[0];
	}
	
	function show_message(){
		if($this->_message){
			switch( $this->current_action() ) {
				case 'delete' :
					echo '<div id="message" class="updated">
						        <p><strong>'. __('Delete entries successful.', 'guiform') .'</strong></p>
						    </div>';
					$this->_message = false;
				break;
			}
			
		}
	}
	
	/**
	 * Get a list of all, hidden and sortable columns, with filter applied
	 *
	 * @since 1.0
	 * @access public
	 *
	 * @return array
	 */
	public function get_column_info() {
		$columns = get_column_headers( $this->_screen );
		$hidden = get_hidden_columns( $this->_screen );
		$sortable = $this->get_sortable_columns();

		return array( $columns, $hidden, $sortable );
	}
	
	function date_filter() {
		global $wpdb, $wp_locale, $guif;
		
		$db = $guif->database($this->id);
  	$guif_db = '';
		if($db > 0){
			$guif_db = $wpdb;
  		$db = unserialize($guif->get_option($db));
  		$wpdb = new wpdb($db['username'], $db['password'], $db['database'], $db['host'].':'.$db['port']);	
  	}
	  	
		$status = ( !empty($_REQUEST['entry_status']) ? $_REQUEST['entry_status'] : 'all');
		
		if($status == 'all') $status = 'guif_status = 1 ';
		if($status == 'trash') $status = 'guif_status = 0 ';
		if($status == 'spam') $status = 'guif_status = 2 ';
		if($status == 'unread') $status = 'guif_read = 0 ';
			
		$date = $wpdb->get_results( "
			SELECT DISTINCT YEAR(guif_date_submitted) AS year, MONTH(guif_date_submitted ) AS month
			FROM $this->table
			WHERE $status
			ORDER BY guif_date_submitted DESC
		");

		$size = count($date);
		$output = '';
		if ($size > 0 || !empty($size)){
			 
			$output .= "<select name='date'>
				<option value='0'>Show all dates</option>";		
	
			foreach ( $date as $row ) {
				$month = zeroise( $row->month, 2 );
				$year = $row->year;
				$output .= "<option ". selected($this->date_selected(), $year.$month, false ) ." value='". $row->year . $month. "'>". $year .' '. $wp_locale->get_month( $month ) ."</option>";		
			}
	
			$output .= "</select>";
			
			if($db > 0){
				$wpdb = $guif_db;
			}
			
			print $output;
		}

	}
	
	/**
	 * Extra controls to be displayed between bulk actions and pagination
	 *
	 * @since 1.0
	 * @access public
	 */
 	public function extra_tablenav( $which ) {
		if ( $which == "top" ){
			global $wpdb;
			//$wpdb = new wpdb('root', '', 'wordpress-3-5-2', 'localhost');
			$cols = $wpdb->get_results( "SELECT id, title FROM $wpdb->guiform ORDER BY id ASC" );
	
			if ( 'top' == $which ) {
				echo '<div class="alignleft actions">';
				$this->date_filter();
				echo '<select id="form-list" name="form-list">';
					
				foreach ( $cols as $form ) {
					echo '<option value="' . $form->id . '"' . selected( $this->form_selected(), $form->id ) . '>' . $form->id .' : '. $form->title . '</option>';
				}
	
				echo '</select>
					<input type="submit" value="' . __( 'Filter' , 'guiform') . '" class="button-secondary" />
					</div>';
			}
		}
		if ( $which == "bottom" ){
		}
	}
	
	function current_filter_action() {
		
		if($_REQUEST['entry_status'] != get_user_meta($this->current_user, 'guiform_entry_status', true)){
			update_user_meta($this->current_user, 'guiform_date_selected', 0);
			update_user_meta($this->current_user, 'guiform_entry_status', $_REQUEST['entry_status']);
		}
		
		if(isset($_REQUEST['date'])){
			update_user_meta($this->current_user, 'guiform_date_selected', $_REQUEST['date']);
		}
		
		if(isset($_REQUEST['form-list']) && $_REQUEST['form-list'] != $this->form_selected()){
			update_user_meta($this->current_user, 'guiform_date_selected', 0);
		}
		
		if(isset($_REQUEST['form-list'])){
			update_user_meta($this->current_user, 'guiform_form_selected', $_REQUEST['form-list']);
		}
	}
	
	function form_selected(){
		return get_user_meta($this->current_user, 'guiform_form_selected', true);
	}
	
	function date_selected(){
		return get_user_meta($this->current_user, 'guiform_date_selected', true);
	}
	
	
	/**
	* Decide which columns to activate the sorting functionality on
	* @return array $sortable, the array of columns that can be sorted by the user
	*/
	public function get_sortable_columns() {
		$data['id'] = array('id', false);
		$data['guif_ip'] = array('guif_ip', false);
		$data['guif_date_submitted'] = array('guif_date_submitted', true);
		$data['guif_browser'] = array('guif_browser', false);
		$data['guif_os'] = array('guif_os', true);
		if(!empty($this->form->entry_field)){
			foreach(unserialize($this->form->entry_field) as $value){
				if($value != 'id' || $value != 'guif_ip' || $value != 'guif_date_submitted' || $value != 'guif_browser' || $value != 'guif_os'){
					$data[$value] = array($value, false);
				}
			}
		}
		return $data;
	}
	
	/**
	 * Display the search box.
	 *
	 * @since 1.0
	 * @access public
	 *
	 * @param string $text The search button text
	 * @param string $input_id The search input id
	 */
	public function search_box( $text, $input_id ) {
	    //parent::search_box( $text, $input_id );
	}
	
	/**
	 * Get a list of columns. The format is:
	 * 'internal-name' => 'Title'
	 *
	 * @since 1.0
	 * @access public
	 * @abstract
	 *
	 * @return array
	 */
	public function get_columns() {
		
		$data['cb'] = '<input type="checkbox" />';
		$data['id'] = 'ID';
		$data['guif_ip'] = 'IP Address';
		$data['guif_date_submitted'] = 'Date Sumitted';
		$data['guif_browser'] = 'Browser';
		$data['guif_os'] = 'Operating System';
		if(!empty($this->form->entry_field)){
			foreach(unserialize($this->form->entry_field) as $value){
				if($value != 'id' && $value != 'guif_ip' &&  $value != 'guif_date_submitted'&& $value != 'guif_browser' &&  $value != 'guif_os'){
					$data[$value] = $value;
				}
			}
		}
		
		return $data;
	}
	
	
	function column_cb( $item ){
		return sprintf( '<input type="checkbox" name="%1$s[]" value="%2$s" />', $this->_args['singular'], $item->id );
	}
	
	function column_guif_ip($item) {
		$form_id = $this->form_selected();
		$view = add_query_arg(array('page' => 'guiform_entries', 'form' => $form_id, 'entry' => $item->id));
	  $actions = array(
	            'view'   => sprintf("<a href='%s'>View</a>", $view),
	            'trash'  => sprintf('<a class="delete-entry" id="form-%d" href="javascript:void(0)">Trash</a>', $item->id)
	            );
	  
	  $title = "<a style='display: block;' href='$view'>$item->guif_ip</a>";
	  return sprintf('%1$s %2$s', $title, $this->row_actions($actions) );
	}
	
	/**
	 * Generate row actions div
	 *
	 * @since 1.0
	 * @access public
	 *
	 * @param array $actions The list of actions
	 * @param bool $always_visible Whether the actions should be always visible
	 * @return string
	 */
	function row_actions( $actions, $always_visible = false ) {
		$action_count = count( $actions );
		$i = 0;

		if ( !$action_count )
			return '';

		$out = '<div class="' . ( $always_visible ? 'row-actions-visible' : 'row-actions' ) . '">';
		foreach ( $actions as $action => $link ) {
			++$i;
			( $i == $action_count ) ? $sep = '' : $sep = ' | ';
			$action = ($action == "trash") ? 'guif-action' : $action;
			$out .= "<span class='$action'>$link$sep</span>";
		}
		$out .= '</div>';

		return $out;
	}
	
	function column_guif_date_submitted($item) {
	 return sprintf('%1$s', date("Y F d, g:i a", strtotime($item->guif_date_submitted)));
	}
	
	/**
	 * Get an associative array ( option_name => option_title ) with the list
	 * of bulk actions available on this table.
	 *
	 * @since 1.0
	 * @access public
	 *
	 * @return array
	 */
	function get_bulk_actions() {
		
		$entry_status = ( !empty($_REQUEST['entry_status']) ? $_REQUEST['entry_status'] : 'all');
		
		if($entry_status == 'all'){
			$actions = array(
		    'spam'    => 'Mark as Spam',
		    'unread'  => 'Mark as Unread',
		    'read'    => 'Mark as Read',
		    'trash'   => 'Move to Trash',
		    'delete'  => 'Delete Permanently',
		  );
		}
		
		if($entry_status == 'unread'){
			$actions = array(
			  'read'    => 'Mark as Read',
		    'spam'    => 'Mark as Spam',
		    'trash'   => 'Move to Trash',
		    'delete'  => 'Delete Permanently'
		  );
		}
		
		if($entry_status == 'trash'){
			$actions = array(
		    'restore' => 'Restore',
		    'delete'  => 'Delete Permanently'
		  );
		}
		
		if($entry_status == 'spam'){
			$actions = array(
				'restore' => 'Restore',
		    'trash'   => 'Move to Trash',
		    'delete'  => 'Delete Permanently',
		  );
		}
		
	  return $actions;
	}
	
	function process_bulk_action() {
		global $wpdb, $guif;
		
		if(!isset($_POST['action']) || count($_POST['wp_list_text_link']) == 0){
			return;
		}
		
		$db = $guif->database($this->id);
  	$guif_db = '';
		if($db > 0){
			$guif_db = $wpdb;
  		$db = unserialize($guif->get_option($db));
  		$wpdb = new wpdb($db['username'], $db['password'], $db['database'], $db['host'].':'.$db['port']);	
  	}
		switch( $this->current_action() ) {
			case 'delete' :
				foreach ($_POST['wp_list_text_link'] as $id ) {
					$wpdb->delete($this->table, array('id' => $id), array('%d'));
				}
				
				$this->_message = true;
			break;
			
			case 'trash' :
				foreach ($_POST['wp_list_text_link'] as $id ) {
					$wpdb->update($this->table, array('guif_status' => 0), array('id' => $id), array('%d'), array('%d'));
				}
				
				$this->_message = true;
			break;
			
			case 'unread' :
				foreach ($_POST['wp_list_text_link'] as $id ) {
					$wpdb->update($this->table, array('guif_read' => 0), array('id' => $id), array('%d'), array('%d'));
				}
				
				$this->_message = true;
			break;
			
			case 'read' :
				foreach ($_POST['wp_list_text_link'] as $id ) {
					$wpdb->update($this->table, array('guif_read' => 1), array('id' => $id), array('%d'), array('%d'));
				}
				
				$this->_message = true;
			break;
			
			case 'restore' :
				foreach ($_POST['wp_list_text_link'] as $id ) {
					$wpdb->update($this->table, array('guif_status' => 1), array('id' => $id), array('%d'), array('%d'));
				}
				
				$this->_message = true;
			break;
			
			case 'spam' :
				foreach ($_POST['wp_list_text_link'] as $id ) {
					$wpdb->update($this->table, array('guif_status' => 2), array('id' => $id), array('%d'), array('%d'));
				}
				
				$this->_message = true;
			break;
		}
		
		
		if($db > 0){
			$wpdb = $guif_db;
		}
		
	}
	
	/**
	 * Message to be displayed when there are no items
	 *
	 * @since 1.0
	 * @access public
	 */
	function no_items() {
	  _e( 'No entry available.' );
	}
	
	function column_default( $item, $column_name ){
		return $item->$column_name;
	}
	
	/**
	 * Get an associative array ( id => link ) with the list
	 * of views available on this table.
	 *
	 * @since 1.0
	 * @access public
	 *
	 * @return array
	 */
	function get_views() {
		
		global $wpdb, $guif;
		
		$db = $guif->database($this->id);
  	$guif_db = '';
		if($db > 0){
			$guif_db = $wpdb;
  		$db = unserialize($guif->get_option($db));
  		$wpdb = new wpdb($db['username'], $db['password'], $db['database'], $db['host'].':'.$db['port']);	
  	}
	  	
		$views = array();
		$current = (!empty($_REQUEST['entry_status']) ? $_REQUEST['entry_status'] : 'all');
		
			
		//All link
		$all_size = $wpdb->get_var("SELECT COUNT(*) FROM $this->table WHERE guif_status = 1");
		$all_size = (!empty($all_size) ? $all_size : '0');
		$class = ($current == 'all' ? ' class="current"' :'');
		$all_url = remove_query_arg(array('entry_status', 'order', 'orderby'));
		$views['all'] = "<a href='{$all_url}' {$class} >All <span class='count'>(<span class='pending-count'>$all_size</span>)</span></a>";
		
		//Unread link
		$unread_size = $wpdb->get_var("SELECT COUNT(*) FROM $this->table WHERE guif_read = 0");
		$unread_size = (!empty($unread_size) ? $unread_size : '0');
		$class = ($current == 'unread' ? ' class="current"' :'');
		$unread_url = add_query_arg('entry_status','unread');
		$views['unread'] = "<a href='{$unread_url}' {$class} >Unread <span class='count'>(<span class='pending-count'>$unread_size</span>)</span></a>";
		
		
		//Foo link
		$trash_size = $wpdb->get_var("SELECT COUNT(*) FROM $this->table WHERE guif_status = 0");
		$trash_size = (!empty($trash_size) ? $trash_size : '0');
		$trash_url = add_query_arg('entry_status','trash');
		
		
		$class = ($current == 'trash' ? ' class="current"' :'');
		$views['trash'] = "<a href='{$trash_url}' {$class} >Trash <span class='count'>(<span class='pending-count'>$trash_size</span>)</span></a>";
		
		
		//Bar link
		$spam_size = $wpdb->get_var("SELECT COUNT(*) FROM $this->table WHERE guif_status = 2");
		$spam_size = (!empty($spam_size) ? $spam_size : '0');
		$spam_url = add_query_arg('entry_status','spam');
		$class = ($current == 'spam' ? ' class="current"' :'');
		$views['spam'] = "<a href='{$spam_url}' {$class} >Spam <span class='count'>(<span class='pending-count'>$spam_size</span>)</span></a>";
		
		
		if($db > 0){
			$wpdb = $guif_db;
		}
			
		return $views;
	
	}
	
	/**
	 * Prepares the list of items for displaying.
	 * @uses WP_List_Table::set_pagination_args()
	 *
	 * @since 1.0
	 * @access public
	 * @abstract
	 */
	function prepare_items() {
		global $wpdb, $_wp_column_headers, $guif;
		
		$db = $guif->database($this->id);
    
  	$guif_db = '';
		if($db > 0){
			$guif_db = $wpdb;
  		$db = unserialize($guif->get_option($db));
  		$wpdb = new wpdb($db['username'], $db['password'], $db['database'], $db['host'].':'.$db['port']);	
  	}
	  	
		if($wpdb->query("DESCRIBE $this->table") && !empty($this->form->id)){
		
			// get the current user ID
			$user = get_current_user_id();
	
			// get the current admin screen
			$screen = get_current_screen();
	
			// retrieve the "per_page" option
			$screen_option = $screen->get_option( 'per_page', 'option' );
	
			// retrieve the value of the option stored for the current user
			$perpage = get_user_meta( $user, $screen_option, true );
	
			// get the default value if none is set
			if ( empty ( $perpage) || $perpage < 1 ){
				$perpage = $screen->get_option( 'per_page', 'default' );
			}
			
			
		// Get entries search terms
			$search = ( !empty( $_REQUEST['s'] ) ) ? trim( $_REQUEST['s'] ) : '';
			$status = ( !empty($_REQUEST['entry_status']) ? $_REQUEST['entry_status'] : 'all');
		
			if($status == 'all') $status = ' guif_status = 1 ';
			if($status == 'trash') $status = ' guif_status = 0 ';
			if($status == 'spam') $status = ' guif_status = 2 ';
		  if($status == 'unread') $status = ' guif_read = 0 ';
		  
		  if(!empty($search) || !empty($status)){
		  	$WHERE = " WHERE ";
		  }
		  
		  if(!empty($search)){
		  	$WHERE .= " title LIKE '%$search%' ";
		  }
		  
		  if(!empty($search) && !empty($status)){
		  	$WHERE .= " AND ";
		  }
		  
		  if(!empty($status)){
		  	$WHERE .= $status;
		  }
		  
		  $date =  $this->date_selected();
		 
			// Parse month/year and build the clause
			if ( $date > 0) {
				$year = substr( $date, 0, 4 );
				$month = substr( $date, -2 );
			
				$WHERE .= " AND YEAR(guif_date_submitted) = $year AND MONTH(guif_date_submitted) = $month ";
			}
		  
			 
			
			$field = unserialize($this->form->entry_field);
			
			
			
			$field = implode(', ', $field);
			
			
			/* -- Preparing your query -- */
			$query = "SELECT $field, guif_read FROM $this->table ". $WHERE;
			
			/* -- Ordering parameters -- */
			//Parameters that are going to be used to order the result
			$orderby = !empty($_GET["orderby"]) ? mysql_real_escape_string($_GET["orderby"]) : 'ASC';
			$order = !empty($_GET["order"]) ? mysql_real_escape_string($_GET["order"]) : '';
			if(!empty($orderby) & !empty($order)){ 
				$query.=' ORDER BY '.$orderby.' '.$order; 
			}
			else{
				$query.=' ORDER BY id DESC';
			}	
				
				
		/* -- Pagination parameters -- */
		  //Number of elements in your table?
		  
  	
		  $totalitems = $wpdb->query($query); //return the total number of affected rows
		 
		  //How many to display per page?
		  //echo "<h1>$totalitems</h1>";
		  
			// retrieve the "per_page" option
		  //Which page is this?
		  $paged = !empty($_GET["paged"]) ? mysql_real_escape_string($_GET["paged"]) : '';
		  //Page Number
		  if(empty($paged) || !is_numeric($paged) || $paged<=0 ){ $paged=1; }
		  //How many pages do we have in total?
		  $totalpages = ceil($totalitems / $perpage);
		  //adjust the query to take pagination into account
	    if(!empty($paged) && !empty($perpage)){
		    $offset=($paged-1)*$perpage;
	  		$query.=' LIMIT '.(int)$offset.','.(int)$perpage;
	    }
	    
	    
	    
  	
	    $this->items = $wpdb->get_results($query);
	
		/* -- Register the pagination -- */
			$this->set_pagination_args( array(
				"total_items" => $totalitems,
				"total_pages" => $totalpages,
				"per_page" => $perpage,
			) );
			//The pagination links are automatically built according to those parameters
		
			/* — Register the Columns — */
			$columns = $this->get_columns();
			$hidden = array();
			$sortable = $this->get_sortable_columns();
			$this->_column_headers = array($columns, $hidden, $sortable);
			
		}
		
		if($db > 0){
			$wpdb = $guif_db;
		}
		
	}

	/**
	 * Display the pagination.
	 *
	 * @since 1.0
	 * @access public
	 */
	function pagination( $which ) {
		if ( empty( $this->_pagination_args ) )
			return;

		extract( $this->_pagination_args, EXTR_SKIP );

		$output = '<span class="displaying-num">' . sprintf( _n( '1 entry', '%s entries', $total_items ), number_format_i18n( $total_items ) ) . '</span>';

		$current = $this->get_pagenum();

		$current_url = set_url_scheme( 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );

		$current_url = remove_query_arg( array( 'hotkeys_highlight_last', 'hotkeys_highlight_first' ), $current_url );

		$page_links = array();

		$disable_first = $disable_last = '';
		if ( $current == 1 )
			$disable_first = ' disabled';
		if ( $current == $total_pages )
			$disable_last = ' disabled';

		$page_links[] = sprintf( "<a class='%s' title='%s' href='%s'>%s</a>",
			'first-page' . $disable_first,
			esc_attr__( 'Go to the first page' ),
			esc_url( remove_query_arg( 'paged', $current_url ) ),
			'&laquo;'
		);

		$page_links[] = sprintf( "<a class='%s' title='%s' href='%s'>%s</a>",
			'prev-page' . $disable_first,
			esc_attr__( 'Go to the previous page' ),
			esc_url( add_query_arg( 'paged', max( 1, $current-1 ), $current_url ) ),
			'&lsaquo;'
		);

		if ( 'bottom' == $which )
			$html_current_page = $current;
		else
			$html_current_page = sprintf( "<input class='current-page' title='%s' type='text' name='paged' value='%s' size='%d' />",
				esc_attr__( 'Current page' ),
				$current,
				strlen( $total_pages )
			);

		$html_total_pages = sprintf( "<span class='total-pages'>%s</span>", number_format_i18n( $total_pages ) );
		$page_links[] = '<span class="paging-input">' . sprintf( _x( '%1$s of %2$s', 'paging' ), $html_current_page, $html_total_pages ) . '</span>';

		$page_links[] = sprintf( "<a class='%s' title='%s' href='%s'>%s</a>",
			'next-page' . $disable_last,
			esc_attr__( 'Go to the next page' ),
			esc_url( add_query_arg( 'paged', min( $total_pages, $current+1 ), $current_url ) ),
			'&rsaquo;'
		);

		$page_links[] = sprintf( "<a class='%s' title='%s' href='%s'>%s</a>",
			'last-page' . $disable_last,
			esc_attr__( 'Go to the last page' ),
			esc_url( add_query_arg( 'paged', $total_pages, $current_url ) ),
			'&raquo;'
		);

		$pagination_links_class = 'pagination-links';
		if ( ! empty( $infinite_scroll ) )
			$pagination_links_class = ' hide-if-js';
		$output .= "\n<span class='$pagination_links_class'>" . join( "\n", $page_links ) . '</span>';

		if ( $total_pages )
			$page_class = $total_pages < 2 ? ' one-page' : '';
		else
			$page_class = ' no-pages';

		$this->_pagination = "<div class='tablenav-pages{$page_class}'>$output</div>";

		echo $this->_pagination;
	}
	
	/**
	 * Generates content for a single row of the table
	 *
	 * @since 1.0
	 * @access public
	 *
	 * @param object $item The current item
	 */
	function single_row($item) {
		static $row_class = '';
		 $class = array();
		
		if($row_class == ''){
			$class[0] = 'alternate';
			$row_class = 'alternate';
		}
		else{
			$row_class = '';
		}
		
		if($item->guif_read == 0){
			$class[1] = 'unread';
		}
		
		$class = implode(' ', $class);

		echo "<tr class='$class'>";		
		echo $this->single_row_columns($item);
		echo '</tr>';
	}
	
}
