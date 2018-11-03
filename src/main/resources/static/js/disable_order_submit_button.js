$(document).ready(function(){
	$('#submit-order-button').attr('disabled',true);

	$('.form-form input').keyup(function(){

        var empty = false;
        $('.form-form input').each(function() {
            if ($.trim($(this).val()).length == 0) {
                empty = true;
            }
        });

        if (!empty) {
			$('#submit-order-button').attr('disabled', false);
		}
		else
		{
			$('#submit-order-button').attr('disabled', true);
		}
	})
});