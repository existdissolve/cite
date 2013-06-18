CKEDITOR.plugins.add( 'cite', {
	lang : "en",
	requires: [ 'dialog' ],
	icons: "cite",
	init : function( editor ) {
		var pluginCmd='citeDialog';
		// Add the link and unlink buttons.
		editor.addCommand( pluginCmd, new CKEDITOR.dialogCommand( pluginCmd, {} ) );
		// register dialog for our plugin (will be used for editing content)
		CKEDITOR.dialog.add( pluginCmd, this.path+"dialogs/cite.js" );
		// add button to main CKEditor button toolbar		
		editor.ui.addButton( 'Cite', {
			label : editor.lang.cite.toolbar,
			command : pluginCmd,
			toolbar: 'insert'
		});

		// add context-menu entry
		if( editor.contextMenu ) {
			// register group to editor context menu
			editor.addMenuGroup( editor.lang.cite.menu );
			// add item to editor context menu group
			editor.addMenuItem( 'cite', {
				label : editor.lang.cite.edit,
				icon : this.path + 'icons/cite.png',
				command : pluginCmd,
				group : editor.lang.cite.menu
			});
			
			// if the selected item is a cite html element, we'll be all over it
			editor.contextMenu.addListener( function( element ) {
				var selection={};
				if ( element.getAscendant( 'cite', true ) ) {
					selection[ 'cite' ] = CKEDITOR.TRISTATE_OFF;
					return selection;
				}
			});
			
		}	
		/**
		 * on() registers a listener for the specified event on the object
		 * @param {String} eventName
		 * @param {Function} listenerFunction
		 * @param {Object} scopeObj
		 * @param {Object} listenerData
		 * @param {Number} priority
		 */
		editor.on( 'doubleclick', function( evt ) {
			var element = evt.data.element;
			if ( element && element.is( 'cite' ) )  {
				evt.data.dialog = pluginCmd;
				// prevent default browser action on context menu event
				evt.cancelBubble = true; 
				evt.returnValue = false;
				evt.stop();	
			}
		}, null, null, 1);
		
	}	
});