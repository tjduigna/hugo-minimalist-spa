var collapser = function(main_scroll_element) {
	// HEADER
	this.header_element = document.getElementsByClassName("header")[0];
	this.general_layout_element = document.getElementsByClassName("general-layout")[0];
	this.header_margin = this.header_element.style.margin;
	
	this.collapsed = false;
	
	
	// NAVBAR
	this.navbar = document.getElementsByClassName("navbar")[0];
	this.collapse_button = this.navbar.getElementsByClassName("collapsible-menu")[0];
	this.navbar_elements = this.navbar.getElementsByClassName("navbar-element");
	
	this.menu_opened = false;
	this.menu_collapsible = false;
		
	
	// SCROLL
	this.main_scroll_element = main_scroll_element;
	this.last_y_scroll = this.main_scroll_element.scrollTop;
	this.scroll_threshold = 40;
	
	
	// CALLBACKS
	var current_context = this;
	
	window.addEventListener('resize', function(){current_context.resize()});
	this.main_scroll_element.addEventListener('scroll', function(){current_context.on_scroll()});
	this.navbar.addEventListener('click', function(){current_context.collapsible_menu_clicked()});
	
	this.resize();
}


//Defines the collapsing behaviour on scroll
collapser.prototype.on_scroll = function() {
	if (window.getComputedStyle(this.general_layout_element).flexDirection == "column") {
		var current_y_scroll = this.main_scroll_element.scrollTop;

		if (current_y_scroll < this.last_y_scroll - this.scroll_threshold || current_y_scroll == 0)
			this.expand();
		else if (current_y_scroll > this.last_y_scroll + this.scroll_threshold)
			this.collapse();
		
		this.last_y_scroll = current_y_scroll;
	}
}


//Resizes the header and navbar to properly fit the window
collapser.prototype.resize = function(){
	this.expand();
	this.last_y_scroll = this.main_scroll_element.scrollTop;
	
	this.resize_menu();
}


//Resizes the menu and decides wether it should
//be a full or collapsible menu based on its width
//and the width of its elements
collapser.prototype.resize_menu = function() {
	if (!this.collapsed) {
		//Set all elements to be displayed by default
		this.menu_collapsible = false;
		this.collapse_button.style.display= "none";
		this.navbar.style.flexDirection = "row";
		this.navbar.style.justifyContent = "space-evenly";
		this.expand_menu();

		//Calculate the navbar elements width
		var elements_width = 0;
		for (var i = 0; i < this.navbar_elements.length; i++){
			elements_width += this.navbar_elements[i].offsetWidth;
		}

		//If the displayed elements do not fit inside the navbar properly,
		//use the collapsible menu instead
		if (elements_width/this.navbar.offsetWidth > 0.75) {
			this.menu_collapsible = true;
			this.collapse_button.style.display= "block";
			this.navbar.style.flexDirection = "column";
			this.navbar.style.justifyContent = "start";
			this.collapse_menu();
		}
	}
}


//Expands the header and navbar
collapser.prototype.expand = function() {
	this.collapsed = false;
	
	this.header_element.style.maxHeight = "100%";
	this.header_element.style.margin = this.header_margin;
	
	this.collapse_menu();
}


//Collapses the header and navbar
collapser.prototype.collapse = function() {
	this.collapsed = true;
	
	this.header_element.style.maxHeight = "0";
	this.header_element.style.margin = "0";
	
	this.collapse_menu();
	this.navbar.style.maxHeight = "0";
}


//Defines the behaviour when the menu is clicked
collapser.prototype.collapsible_menu_clicked = function() {
	if (!this.collapsed && this.menu_collapsible) {
		if (this.menu_opened) this.collapse_menu();
		else this.expand_menu();
	}
}


//Expands the menu
collapser.prototype.expand_menu = function() {
	this.navbar.style.maxHeight = "100%";
	this.collapse_button.style.marginBottom = "0.7rem";
	
	this.menu_opened = true;
}


//Collapses the menu
collapser.prototype.collapse_menu = function() {
	this.navbar.style.maxHeight = window.getComputedStyle(this.collapse_button).height;
	this.collapse_button.style.marginBottom = "0";
	
	this.menu_opened = false;
}


collapser.prototype.constructor = collapser;