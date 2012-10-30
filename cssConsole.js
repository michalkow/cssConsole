(function( $ ){

	// Updates the position of the caret
	var updateCursor = function(element, blinkingInterval) {
		$(element).find('.cssConsoleDisplay span').removeClass("selected");
		clearInterval(element.cursor);
		if(element.cursor_position!=$(element).find('.cssConsoleDisplay span').length) {
			$(element).find('.cssConsoleCursor').css({ visibility: 'hidden' }); 
			$(element).find('.cssConsoleDisplay span').eq(element.cursor_position).addClass('selected');
			  element.cursor = window.setInterval(function() {
			  if ($(element).find('.cssConsoleDisplay span').eq(element.cursor_position).hasClass('selected')) {
				$(element).find('.cssConsoleDisplay span').eq(element.cursor_position).removeClass('selected');
			  } else {
				$(element).find('.cssConsoleDisplay span').eq(element.cursor_position).addClass('selected');
			  }  
			  }, blinkingInterval);
		} else {
			$(element).find('.cssConsoleCursor').css({ visibility: 'visible' }); 
			  element.cursor = window.setInterval(function() {
			  if ($(element).find('.cssConsoleCursor').css('visibility') === 'visible') {
				$(element).find('.cssConsoleCursor').css({ visibility: 'hidden' });
			  } else {
				$(element).find('.cssConsoleCursor').css({ visibility: 'visible' });  
			  }  
			  }, blinkingInterval);
		}
		return element;
	}
	

  var methods = {
    init : function( options ) {
	 
	// Default settings 
	 var settings = $.extend( {
      type : 'text',
	  inputId : null,
	  inputName : null,
	  inputValue : null,
	  blinkingInterval: 500,
	  charLimit : 0,
	  preventEnter : true,
	  onEnter: function (){ } 
    }, options);

       return this.each(function(){
			var root = this;
			var $this=$(this);
			root.cursor;
			root.cursor_position=0;
			root.inputVal='';
			root.blinkingInterval=settings.blinkingInterval;
			
			// Creating additional html elements
			$this.addClass('cssConsole');
			$this.append('<span class="cssConsoleDisplay"></span>');
			$this.append('<div class="cssConsoleCursor"></div>');
			$this.append('<input class="cssConsoleInput" type="'+settings.type+'" />');
			// Sets input id if 'inputId' have been set
			if(settings.inputId) {
				$this.find('.cssConsoleInput').attr('id', settings.inputId);
			}
			// Sets input name if 'inputName' have been set
			if(settings.inputName) {
				$this.find('.cssConsoleInput').attr('name', settings.inputName);
			}

			// Setting input value if 'inputValue' have been set
			if(settings.inputValue) {
				if(settings.charLimit > 0 && settings.charLimit < settings.inputValue.length) {
					settings.inputValue=settings.inputValue.substring(0, settings.charLimit);
				}
				root.cursor_position=settings.inputValue.length;
				for(var i=0;i<settings.inputValue.length;i++) {
					$this.find('.cssConsoleDisplay').append("<span>"+settings.inputValue.charAt(i)+"</span>");
				}
				$this.find('.cssConsoleInput').val(settings.inputValue);
				root.inputVal=settings.inputValue;
			}
					
			$this.on('click', function() {
			   $this.find('.cssConsoleInput').focus();
				updateCursor(root, settings.blinkingInterval);
			});			
			
			$this.find('.cssConsoleInput').on('focus', function() {
				updateCursor(root, settings.blinkingInterval);
			});

			// Removes caret on blur
			$this.find('.cssConsoleInput').on('blur', function() {
				clearInterval(root.cursor);
				if(root.cursor_position!=$this.find('.cssConsoleDisplay span').length) {
					$this.find('.cssConsoleDisplay span').removeClass("selected");
				} else {
					$this.find('.cssConsoleCursor').css({ visibility: 'hidden' });
				}	

			});

			// Handles arrow keys, backspace, delete and enter keys
			
			$this.find('.cssConsoleInput').on('keydown', function(e) {  
					if(e.which==8) {
						//backspace
						if(root.cursor_position>0){
							$this.find('.cssConsoleDisplay span').eq(root.cursor_position-1).remove();
							root.inputVal=root.inputVal.slice(0, root.cursor_position-1) + root.inputVal.slice(root.cursor_position, root.inputVal.length);
							root.cursor_position--;
						}
					} else if(e.which==13) {
						//enter
						//Prevents default behavior if option is set
						if(settings.preventEnter) {
							e.preventDefault();
						}
						//Function that will execute on keydown Enter if set 
						settings.onEnter();
					} else if(e.which==46) {
						//delete
						if(root.cursor_position<$this.find('.cssConsoleDisplay span').length){
							$this.find('.cssConsoleDisplay span').eq(root.cursor_position).remove();
						}
						root.inputVal=root.inputVal.slice(0, root.cursor_position) + root.inputVal.slice(root.cursor_position+1, root.inputVal.length);
					} else if(e.which==35) {
						//end
						root.cursor_position=$this.find('.cssConsoleDisplay span').length;
					} else if(e.which==36) {
						//home
						root.cursor_position=0;
					} else if(e.which==37) {
						//arrow left
						if(root.cursor_position>0){
							root.cursor_position--;
						}
					} else if(e.which==39) {
						//arrow right
						if(root.cursor_position<$this.find('.cssConsoleDisplay span').length){
							root.cursor_position++;
						}
					} else {
					}
					if($this.find('.cssConsoleInput').is(":focus")) {
						updateCursor(root, settings.blinkingInterval);
					}
			});
			  
			// Adding characters to cssConsoleDisplay on keyup
			$this.find('.cssConsoleInput').on('keyup', function(e) {
				//prevent backspace and delete
				if(e.which!=8 && e.which!=46) {
					if(root.inputVal!=$this.find('.cssConsoleInput').val()) {
						$this.find('.cssConsoleDisplay').empty();
						if(root.inputVal.length==$this.find('.cssConsoleInput').val().length){
							for(var i=0;i<$this.find('.cssConsoleInput').val().length;i++){
								if(settings.type=='password') {
									$this.find('.cssConsoleDisplay').append("<span>*</span>");
								} else {
									$this.find('.cssConsoleDisplay').append("<span>"+$this.find('.cssConsoleInput').val().charAt(i)+"</span>");
								}
							}
						} else {
							if(settings.charLimit > 0 && settings.charLimit < $this.find('.cssConsoleInput').val().length) {
								$this.find('.cssConsoleInput').val($this.find('.cssConsoleInput').val().substring(0, settings.charLimit));
							}
							for(var i=0;i<$this.find('.cssConsoleInput').val().length;i++){
								if(settings.type=='password') {
									$this.find('.cssConsoleDisplay').append("<span>*</span>");
								} else {
									$this.find('.cssConsoleDisplay').append("<span>"+$this.find('.cssConsoleInput').val().charAt(i)+"</span>");
								}
							}
							root.cursor_position=root.cursor_position+$this.find('.cssConsoleInput').val().length-root.inputVal.length;
						}
						root.inputVal=$this.find('.cssConsoleInput').val();
						updateCursor(root, settings.blinkingInterval);
					}
				}
			});
		
			return this;		
       });
    },
	
	// Destroy cssConsole
    destroy : function( ) {
       return this.each(function(){
				var root = this;
				var $this=$(this);
				root.cursor_position=0;
				clearInterval(root.cursor);
				$this.find('.cssConsoleInput').val('');
				$this.empty();
				$this.removeClass('cssConsole');
				return this;
       });
    },
	
	// Reseting input
	reset : function( ) {
       return this.each(function(){
				var root = this;
				var $this=$(this);
				root.cursor_position=0;
				if(root.cursor_position!=$this.find('.cssConsoleDisplay span').length) {
					$this.find('.cssConsoleDisplay span').removeClass("selected");
				} 
				$this.find('.cssConsoleInput').val('');
				root.inputVal='';
				if($this.find('.cssConsoleInput').is(":focus")) {
					updateCursor($this, root.blinkingInterval);
				} else {
					clearInterval(root.cursor);
					$this.find('.cssConsoleCursor').css({ visibility: 'hidden' });
				}
				$this.find('.cssConsoleDisplay').empty();
				return this;
       });
    }
	
  };

  $.fn.cssConsole = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.cssConsole' );
    }    
  
  };

})( jQuery );