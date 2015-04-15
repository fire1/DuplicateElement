
## Installation

Include script *after* the jQuery library:

	<script src="/path/to/duplicateElement.min.js"></script>

## Usage

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
		
## Description
Very simple script to dublicate and remove your elements in HTML. Can be used in form fieldsets


