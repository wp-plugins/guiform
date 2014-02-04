<?php
class Settings_Mail_List_Table extends WP_List_Table {
	
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
	  $actions = array(
	    'delete'    => __("Delete")
	  );
	  return $actions;
	}
	
	function process_bulk_action() {
		global $wpdb;
	
		switch( $this->current_action() ) {
			case 'delete' :
			if(sizeof($_POST['wp_list_text_link']) > 0){
				foreach ($_POST['wp_list_text_link'] as $id ) {
					$wpdb->delete($wpdb->guiform_options, array('id' => $id), array('%d' ));
				}
				$this->_message = true;
			}
			break;
		}
	}
	
	function show_message(){
		if($this->_message){
			switch( $this->current_action() ) {
				case 'delete' :
					echo '<div id="message" class="updated">
						    	<p><strong>'. __("Delete mail successful.") .'</strong></p>
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
	function get_column_info(){
		$columns  = get_column_headers( $this->_screen );
		$hidden   = get_hidden_columns( $this->_screen );
		$sortable = $this->get_sortable_columns();

		return array( $columns, $hidden, $sortable );
	}
	
	/* or
	 * 'internal-name' => array( 'orderby', true )
	 *
	 * The second format will make the initial sorting order be descending
	 *
	 * @since 1.0
	 * @access public
	 *
	 * @return array
	 */
	public function get_sortable_columns() {
		return $sortable = array(
			'mail'=> array('mail', true )
		);
	}
	
	function column_mail($item) {
		
	  $actions = array(
	  					'quick_edit' => sprintf('<a class="mail-quick-edit" id="item-%d" href="javascript:void(0)">Quick Edit</a>',$item['id']),
	            'delete'     => sprintf('<a class="delete" data-type="mail" id="item-%d" href="javascript:void(0)">Delete</a>', $item['id'])
	            );
	 
	  $title = "<a style='display: block;' href='javascript:void(0)'>".$item['name']."</a>";
	  return sprintf('%1$s %2$s', $title, $this->row_actions($actions) );
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
	function search_box( $text, $input_id ) {
	    parent::search_box( $text, $input_id );
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
	function get_columns(){
		return $columns = array(
			'cb' 			    => "<input type='checkbox' />",
			'mail'        => __('Mail'),
			'test_button' => __('Test Mail'),
			'mail_name'   => __('Name'),
			'protocol'    => __('Mail Protocol')
		);
	}
	
	
	function column_cb( $item ){
		return sprintf( '<input type="checkbox" name="%1$s[]" value="%2$s" />', $this->_args['singular'], $item['id'] );
	}
	
	function column_default( $item, $column_name ){
		return $item[$column_name];
	}
	
	/**
	 * Message to be displayed when there are no items
	 *
	 * @since 1.0
	 * @access public
	 */
	function no_items() {
	  _e( 'No item available.' );
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
		global $wpdb;
		
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
			
		  
			$table = $wpdb->guiform_options;
			
			
			/* -- Preparing your query -- */
			$query = "SELECT id, name, value FROM $table WHERE type = 'mail'";
			//echo $query;
			/* -- Ordering parameters -- */
			//Parameters that are going to be used to order the result
			$orderby = !empty($_GET["orderby"]) ? mysql_real_escape_string($_GET["orderby"]) : 'ASC';
			$order = !empty($_GET["order"]) ? mysql_real_escape_string($_GET["order"]) : '';
			if(!empty($orderby) & !empty($order)){ 
				$query.=' ORDER BY '.$orderby.' '.$order; 
			}
			else{
				$query.=' ORDER BY name DESC';
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
	    
	    
	    $result = $wpdb->get_results($query);
	    $items = array();
	    
	    foreach($result as $value){
	    	$row = unserialize($value->value);
	    	if($row['status'] == 1)
	    		$input = "<input type='button' value='". __("Send Test Mail") ."' class='button-primary test-mail-button' id='mail-$value->id'>";
	    	else
	    		$input = "<input type='button' value='". __("Send Verification Code") ."' class='button-primary activation-key-button' id='mail-$value->id'>";
	    		
	    	$items[] =
				array(
					'id'          => $value->id,
					'name'        => $value->name,
					'test_button' => $input,
					'mail_name'   => $row['name'],
					'protocol'    => strtoupper($row['protocol'])
				);
	    }
	     
	     
	    $this->items = $items;
	    
	
		/* -- Register the pagination -- */
			$this->set_pagination_args( array(
				"total_items" => $totalitems,
				"total_pages" => $totalpages,
				"per_page"    => $perpage,
			) );
			//The pagination links are automatically built according to those parameters
		
			/* — Register the Columns — */
			$columns = $this->get_columns();
			$hidden = array();
			$sortable = $this->get_sortable_columns();
			$this->_column_headers = array($columns, $hidden, $sortable);
	}

	
}