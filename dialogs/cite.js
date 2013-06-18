CKEDITOR.dialog.add( 'citeDialog', function( editor ) {
	return {
		title : editor.lang.cite.title,
		minWidth : 550,
		minHeight : 100,
		resizable: CKEDITOR.DIALOG_RESIZE_NONE,
		contents : [
			{
				id : 'CiteEditor',
				label : editor.lang.cite.dialogTitle,
				elements : [
					{
						type: 'textarea',
						id: 'CiteText',
						label: editor.lang.cite.elementLabel,
						'default': '',
						// Function to be run before submission to validate the dialog
						validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.cite.emptyText ),
						// Function to be run when window is open; quite useful for setting default values, etc.
						setup : function( element, dialog ) {
							var sel = editor.getSelection();
							// if we're adding from a selection of text
							if( dialog.insertMode ) {
								this.setValue( sel.getSelectedText() );
							}
							// editing an existing citation
							else {
								this.setValue( sel.getStartElement().getHtml() );
							}
                  		},
                  		// Function to be run when the commitContent method of the parent dialog window is called.
                  		// Set the element's text content to the value of this field.
                  		commit : function( element ) {
                     		element.setHtml( this.getValue() );
						}
					},
					{
						type: 'text',
						id: 'CiteTitle',
						label: editor.lang.cite.titleLabel,
						// Function to be run when window is open; quite useful for setting default values, etc.
						setup: function( element, dialog ) {
							var value = element.getAttribute( 'title' ) ? element.getAttribute( 'title' ) : '';
							this.setValue( value );
						},
						// Function to be run when the commitContent method of the parent dialog window is called.
                  		// Set the element's text content to the value of this field.
						commit: function( element ) {
							element.setAttribute( 'title', this.getValue() );
						}
					}
				]
			}
		],
		/**
		 * onShow() - executed when the dialog is loaded (opened)
		 */		
		onShow : function() {
			// Get the element selected in the editor.
			var sel = editor.getSelection(),
	         	// Assigning the element in which the selection starts to a variable.
	         	element = sel.getStartElement();			
	        // Get the <cite> element closest to the selection.
	    	if ( element ) {
	    		element = element.getAscendant( 'cite', true );
	    	}	
	    	// Create a new <cite> element if it does not exist.
	    	// For a new <cite> element set the insertMode flag to true.
	    	if ( !element || element.getName() != 'cite' ) {
	        	this.element = editor.document.createElement( 'cite' );
	            this.insertMode = true;
	        }
	    	// If an <cite> element already exists, set the insertMode flag to false.
	    	else {
	    		this.insertMode = false;
	            // Store the reference to the <cite> element in a variable.
	            this.element = element;
	   		}
	   		// Invoke the setup functions of the element.
	    	this.setupContent( this.element, this );
		},
		/**
		 * onOk() - executed when the OK button is pressed
		 */
		onOk : function() {
			// A dialog window object.
	    	var dialog = this,
	    	     cite = this.element;
	    	 // If we are not editing an existing fiddle element, insert a new one.
	    	if ( this.insertMode ) {
	    	    editor.insertElement( cite );
	   		}
	   		// Populate the element with values entered by the user (invoke commit functions).
	    	this.commitContent( cite );
		}
	};
});