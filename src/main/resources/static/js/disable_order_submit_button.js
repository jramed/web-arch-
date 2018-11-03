$(document).ready(function(){
	$('#submit-order-button').attr('disabled',true);
	console.log("before funcion");
//	$('.form-control').keyup(function(){
	$('input').keyup(function(){

        var empty = false;
        $('input').each(function() {
            if ($(this).val().length == 0) {
                empty = true;
                console.log("set empty a true for: " + this.value);
            }
        });

//		if($.trim($(this).val()).length !=0){
        if (!empty) {
			$('#submit-order-button').attr('disabled', false);
			console.log("enabled");
		}
		else
		{
			$('#submit-order-button').attr('disabled', true);
			console.log("disabled");
		}
	})
	console.log("function end");
});