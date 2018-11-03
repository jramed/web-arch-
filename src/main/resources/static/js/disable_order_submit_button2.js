$(document).ready(function() {
	$('#submit-order-button').attr('disabled',true);
    $('.form-form input').keyup(function() {
    	console.log("inside keyup function");
        var $emptyFields = $('.form-form input').filter(function() {
        	console.log("inside filter");
        	console.log(this.value);
            return $.trim(this.value) === "";
        });

        if (!$emptyFields.length) {
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