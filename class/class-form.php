<?php


class Form_List_Table extends WP_List_Table {
	
	var $_screen;
	var $_columns;
	var $_message = false;

	/**
	* Constructor, we override the parent to pass our own arguments
	* We usually focus on three parameters: singular and plural labels, as well as whether the class supports AJAX.
	*/
	function __construct($screen, $columns = array()) {
	 	
		if ( is_string( $screen ) )
			$screen = convert_to_screen( $screen );

		$this->_screen = $screen;

		if ( !empty( $columns ) ) {
			$this->_columns = $columns;
			add_filter( 'manage_' . $screen->id . '_columns', array( &$this, 'get_columns' ), 0 );
		}
		
		parent::__construct( array(
			'singular'=> 'wp_list_text_link', //Singular label
			'plural' => 'wp_list_test_links', //plural label, also this well be one of the table css class
			'ajax'	=> false //We won't support Ajax for this table
			) 
		);
		
		$this->process_bulk_action();
		
	}
	
	function show_message(){
		if($this->_message){
			
			switch( $this->current_action() ) {
				case 'delete-permanently' :
					echo '<div id="message" class="updated">
						        <p><strong>Delete form successful.</strong></p>
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
	public function row_actions( $actions, $always_visible = false ) {
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
	
	/**
	 * Get a list of sortable columns. The format is:
	 * 'internal-name' => 'orderby'
	 * or
	 * 'internal-name' => array( 'orderby', true )
	 *
	 * The second format will make the initial sorting order be descending
	 *
	 * @since 1.0
	 * @access protected
	 *
	 * @return array
	 */
	public function get_sortable_columns() {
		return $sortable = array(
			'id'         => array('id', false ),
			'form_title' => array('title', true),
			'last_update'=> array('last_update', false),
			'new'        => array('new', true),
			'unread'     => array('unread', true),
			'total'      => array('total', true),
			'created'    => array('created', false )
		);
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
	   // parent::search_box( $text, $input_id );
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
	function get_columns() {
		return $columns = array(
			'cb' 			    => "<input type='checkbox' />",
			'id'          => __('ID#'),
			'form_title'  => __('Form Title'),
			'new'         => __('Today'),
			'unread'      => __('Unread'),
			'total'       => __('Total'),
			'last_update' => __('Last Update'),
			'created'     => __('Date Created')
		);
	}
	
	function column_total( $item ){
		global $wpdb;
		$size = $wpdb->get_var("SELECT COUNT(id) FROM $wpdb->guiform_form$item->id");
		return "<div>$size</div>";
	}
	
	function column_new( $item ){
		global $wpdb;
		$size = $wpdb->get_var("SELECT COUNT(id) FROM $wpdb->guiform_form$item->id WHERE guif_date_submitted >= curdate()");
		return "<div style='font-weight: bold;'>$size</div>";
	}
	
	function column_unread( $item ){
		global $wpdb;
		$size = $wpdb->get_var("SELECT COUNT(id) FROM $wpdb->guiform_form$item->id WHERE guif_read = 0");
		return "<div style='font-weight: bold;'>$size</div>";
	}
	
	function column_cb( $item ){
		return sprintf( '<input type="checkbox" name="%1$s[]" value="%2$s" />', $this->_args['singular'], $item->id );
	}
	
	function column_status_icon( $item ){
		return "<span class='status-icon' title='status'></span>";
	}
	
	function column_form_title($item) {
		global $guif;
		$entries_url = add_query_arg(array('page'=>'guiform_entries', 'form'=> $item->id));
		$preview_url = $guif->permalink($item->id, '', false);
	  $actions = array(
		  					'edit'       => sprintf('<a href="?page=guiform/form-builder&form=%d">Edit</a>',$item->id),
		            'view'       => "<a target='_blank' href='$preview_url'>Preview</a>",
		            'quick_edit' => sprintf('<a id="form-%d" href="javascript:void(0)">Quick Edit</a>',$item->id),
		            'entries'    => sprintf("<a href='$entries_url'>Entries</a>"),
		            'trash'      => sprintf('<a class="delete-form" id="form-%d" href="javascript:void(0)">Trash</a>', $item->id)
		            );
	  
	  if($item->save_entries == false) unset($actions['entries']);	
	  $title = "<a style='display: block;' href='admin.php?page=guiform/form-builder&form=$item->id'>$item->title</a>";
	  return sprintf('%1$s %2$s', $title, $this->row_actions($actions) );
	}
	
	function column_created($item) {
	 return sprintf('%1$s', date("Y F d, g:i a", strtotime($item->created)));
	}
	
	function column_last_update($item) {
	 return sprintf('%1$s', date("Y F d, g:i a", strtotime($item->last_update)));
	}
	
	function process_bulk_action() {
		global $wpdb;
		
		if(!isset($_POST['action']) && count($_POST['wp_list_text_link']) == 0){
			return;
		}
		
		switch( $this->current_action() ) {
			case 'delete-permanently' :
			if(sizeof($_POST['wp_list_text_link']) > 0){
				foreach ($_POST['wp_list_text_link'] as $id ) {
					$table = $wpdb->guiform_form.$id;
					$wpdb->delete($wpdb->guiform, array('id' => $id), array('%d' ));
					$wpdb->query("DROP TABLE IF EXISTS $table");
				}
				$this->_message = true;
			}
			break;
		}
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
	public function get_bulk_actions() {
	  $actions = array(
	    'delete-permanently'    => 'Delete'
	  );
	  return $actions;
	}
	
	/**
	 * Message to be displayed when there are no items
	 *
	 * @since 1.0
	 * @access public
	 */
	function no_items() {
	  _e( 'No form available.' );
	}
	
	function column_default( $item, $column_name ){
		return $item->$column_name;
	}
	
	/**
	 * Prepares the list of items for displaying.
	 * @uses WP_List_Table::set_pagination_args()
	 *
	 * @since 1.0
	 * @access public
	 * @abstract
	 */
	public function prepare_items() {
		global $wpdb, $_wp_column_headers;
		
		// get the current user ID
		$user = get_current_user_id();

		// get the current admin screen
		$screen = get_current_screen();

		// retrieve the "per_page" option
		$screen_option = $screen->get_option( 'per_page', 'option' );

		$perpage = get_user_meta( $user, $screen_option, true );
		
		// get the default value if none is set
		if (empty($perpage) || $perpage < 1 ){
			$perpage = $screen->get_option( 'per_page', 'default' );
		}
		
		
	// Get entries search terms
		$search = ( !empty( $_REQUEST['s'] ) ) ? trim( $_REQUEST['s'] ) : '';
	  
	  if(!empty($search)){
	  	$search_query = " WHERE title LIKE '%$search%' ";
	  }
		 
		/* -- Preparing your query -- */
		$query = "SELECT id, title, status, save_entries, last_update, created FROM $wpdb->guiform ". $search_query;
		
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
    
    $this->items = $wpdb->get_results($query);;

	/* -- Register the pagination -- */
		$this->set_pagination_args( array(
			"total_items" => $totalitems,
			"total_pages" => $totalpages,
			"per_page" => $perpage,
		));
		//The pagination links are automatically built according to those parameters
	
		/* — Register the Columns — */
		$columns = $this->get_columns();
		$hidden = array();
		$sortable = $this->get_sortable_columns();
		$this->_column_headers = array($columns, $hidden, $sortable);
	}

}
