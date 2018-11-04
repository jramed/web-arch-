$(document).ready(function() {
	$('#submit-order-button').attr('disabled',true);
	$('#submit-order-button').removeClass("btn-template-outlined");
	$('#submit-order-button').addClass("btn-secondary");
	
    $('.form-form').on('keyup blur mouseleave', 'input',function() {
    	console.log("inside change function");
        var $emptyFields = $('.form-form input').filter(function() {
            console.log("The value: " + this.value );
        	return $.trim(this.value) === "";
        });

        if (!$emptyFields.length) {
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