$(document).ready(function(){
	$('#submit-order-button').attr('disabled',true);
	console.log("button checkout disabled");
	
	$('.form-form').on('keyup blur', 'input', function(){
		console.log("inside function keyup");
        var empty = false;
        $('input').each(function() {
        	console.log("inside function each");
        	console.log("Value: " + this.value)
            if ($.trim(this.value).length == 0) {
            	console.log("empty");
                empty = true;
            }
        });

        if (!empty) {
			$('#submit-order-button').attr('disabled', false);
			console.log("enabled");
		}
		else
		{
			$('#submit-order-button').attr('disabled', true);
			console.log("disabled");
		}
	});
});