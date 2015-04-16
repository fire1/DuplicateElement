## Installation

Include script *after* the jQuery library:

	<script src="/path/to/duplicateElement.min.js"></script>

## Usage
	Basic:
		<script>
            $(function () {
				// Dublicate target
                $('#additional-field-model').duplicateElement({
					// Create/Remove buutons in target
                    "class_remove": ".remove-this-field",
                    "class_create": ".create-new-field"
                });
            });
        </script>
		
	With callback:
		<script>
		$(function () {
		    $('#additional-field-model').duplicateElement({
	        class_remove: ".remove-this-field",
	        class_create: ".create-new-field",
	        onCreate: function (el) {
				// Reseting values 
	            el.find("select").prop('defaultSelected');
	            el.find("input").val('');
	            el.find(".module-price").text('00');
	        }
 		});
	</script>
		
	
		
## Description
Very simple script to dublicate and remove your elements in HTML. Can be used in form fieldsets.




## [ Demo ](http://fire1.github.io/DuplicateElement/)


