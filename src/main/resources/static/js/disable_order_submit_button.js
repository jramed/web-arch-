$(document).ready(function(){
	$('#submit-order-button').attr('disabled',true);
	console.log("button checkout disabled");
	
	$('.form-form').on('keyup blur mouseleave', 'input', function(){
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
			$('#submit-order-button').removeClass("btn-secondary");
			$('#submit-order-button').addClass("btn-template-outlined");
			console.log("enabled");
		}
		else
		{
			$('#submit-order-button').attr('disabled', true);
			$('#submit-order-button').removeClass("btn-template-outlined");
			$('#submit-order-button').addClass("btn-secondary");
			console.log("disabled");
		}
	});
});