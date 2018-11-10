
function checkRemoval() {
	return confirm("Please confirm or cancel the operation");
}

function waEnabledButton(waElementId) {
	$(waElementId).attr('disabled', false);
	$(waElementId).addClass("btn-template-outlined");
}

function waDisabledButton(waElementId) {
	$(waElementId).attr('disabled', true);
	$(waElementId).removeClass("btn-template-outlined");
}

//check if some field is still empty in form.
//Useful when the removed field was the one
//that disable the submit button
//Equal for update order and place new order
function checkEmptiness(){
    var empty = false;
	$('.form-form input').each( function() {
		if ($.trim(this.value).length == 0) {
			empty = true;
		}
	});

	if (!empty) {
		waEnabledButton('#submit-order-button');
	} else {
		waDisabledButton('#submit-order-button');
	}
}

function waGetNumberFromId(waIdElement){
	var waTokenizedId = waIdElement.split("-",3);
	return waTokenizedId[2];
}

function selectHigherId() {
	var waHigherId = 2;
	$('.wa-row').each(function(){
		console.log("this.id: " + this.id + "higher id: "+ waHigherId);
		var waLocalId = waGetNumberFromId(this.id);
		if (waHigherId < waLocalId) {
			waHigherId = waLocalId;
			console.log("waHigherId: "+waHigherId);
		}
	});
	return ++waHigherId;
}

function my_button_click_handler() {
	$(document).ready(function(){
		var waCount = selectHigherId();
		//Disable the submit button because new empty field is added
		waDisabledButton('#submit-order-button');
		
		var waCheckboxDiv = "<td></td>";
		if ($('#order-title').prop('disabled')) {
			waCheckboxDiv = '<td><div><input type="checkbox" class="wa-add-checkbox" id="wa-checkbox-'+ waCount +'"></div></td>';
		}
		
		console.log("button disabled");
		$(".wa-insert-new-text-box").before('\
			<tr class="wa-row" id="wa-row-' +waCount+'"><div class="form-group">\
			'+ waCheckboxDiv + '\
			<td>\
                <input id="order-element-'+ waCount +'" type="text" name="productNames[]" class="form-control">\
            </td>\
            <td><div class="wa-add-class" </div>\
                <button type="button" class="wa-remove-element" id="delete-element-' + waCount+ '">\
				    <i class="fa fa-trash"></i></button>\
			</td>\
			</div>\
			</tr>\
        ')
        
		var setFocusTo = "#order-element-"+ waCount;
		$(setFocusTo).focus();
        
        waCount++;
		
        //If there was just one textbox, the first one does not have trash button
        //jquery return the former status, not the new one.
        if ($('.wa-remove-element').length == 1){
        	//if the first field was removed before add the button, the number
        	//must be gathered from the tr id, because it is not 1.
        	var waIdNumber = waGetNumberFromId($('.wa-row')[0].id);
			$('.wa-trash-button').after('<button type="button" id="delete-elemen-'+ waIdNumber +'" class="wa-remove-element" >\
									<i class="fa fa-trash"></i></button>');
			//Remove the class to avoid to add more that one button to first field
			$("div").removeClass("wa-trash-button");
		}
        
	});
	return false;
}

$(document).ready(function(){
	waDisabledButton('#submit-order-button');

	$('.form-form').on('keyup blur input', 'input', function(){
		var empty = false;
		$('input').each(function() {
			if ($.trim(this.value).length == 0) {
				empty = true;
			}
		});

		if (!empty) {
			waEnabledButton('#submit-order-button');
		}
		else
		{
			waDisabledButton('#submit-order-button');
		}
	});
});


$(document).ready(function() {
	//use event delegation because the button was dinamically added
	//https://learn.jquery.com/events/event-delegation/
	$('.form-form').on('click', '.wa-remove-element', function() {
		var waOwnId = this.id;
		var waIdTableRow = "wa-row-" + waGetNumberFromId(waOwnId);
		var numItems = $('.wa-remove-element').length;
		if (numItems > 1) {
			$("#" + waIdTableRow).remove();
			checkEmptiness();
		}
		
		//The number of item was 2, so after the removal only left
		//one, so remove the trash button
		if (numItems == 2)
		{
			$('.wa-remove-element').remove();
			//Add class to allow add the trash button to first field 
			//when added the second one
			$('.wa-add-class').addClass('wa-trash-button');
		}
	});
	
	$('div').on('change', '.wa-add-checkbox', function() {
		console.log(this.id);
		waIsChecked = $(this).is(':checked');
		var waStyle = ( waIsChecked == true ) ? 'line-through' : 'none';
		var waIdOrderElement = "#order-element-" + waGetNumberFromId(this.id);
		$(waIdOrderElement).css('text-decoration', waStyle);
	});
});

$(document).ready(function(){
	if ($('.wa-row').length > 1){
		$('.wa-row').each(function(){
			var waIdNumber = waGetNumberFromId(this.id);
			var waFirstElementTrashButton = $('div.wa-trash-button:first');
			waFirstElementTrashButton.after('<button type="button"\
					id="delete-elemen-'+ waIdNumber +'" class="wa-remove-element" >\
			<i class="fa fa-trash"></i></button>');
			//Remove the class to avoid to add more that one button to first field
			waFirstElementTrashButton.removeClass("wa-trash-button");
		});
	}
});
