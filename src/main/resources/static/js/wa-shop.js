//one of the requirement of the exercise was to have one javascript file
//It could be better to have split in several files, because
//some of the code only apply to one web page


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
    var empty = true;
	$('.form-control').each( function() {
		//console.log("inside each for emptiness");
		//console.log("the id is: " +this.id + " the value is: "+this.value);
		if ($.trim(this.value).length != 0) {
			empty = false;
		}
		else
		{
			empty = true;
			return false;
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
		//console.log("this.id: " + this.id + "higher id: "+ waHigherId);
		var waLocalId = waGetNumberFromId(this.id);
		if (waHigherId < waLocalId) {
			waHigherId = waLocalId;
			//console.log("waHigherId: "+waHigherId);
		}
	});
	return ++waHigherId;
}


//new item button handler
function my_button_click_handler() {
	$(document).ready(function(){
		var waCount = selectHigherId();
		//Disable the submit button because new empty field is added
		waDisabledButton('#submit-order-button');
		
		//only for wa-update page.
		//Add checkbox for every item
		var waCheckboxDiv = "<td></td>";
		if ($('#order-title').prop('disabled')) {
			waCheckboxDiv = '\
				<td><div>\
				  <input type="checkbox" class="wa-add-checkbox" id="wa-checkbox-'+ waCount +'">\
				  <input type="hidden"  name="checkboxStatus[]" value="unchecked">\
				</div></td>';
		}
		
		//console.log("button disabled");
		//Insert the delete item button because when added a button there will be
		//at least another one.
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
        
        //Set focus to the new created item
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
	//only for wa-place-new-order
	if ($('#order-title .wa-disabled-button')) {
		waDisabledButton('#submit-order-button');
	}

	//to detect a textbox is not empty
	$('.form-form').on('keyup blur input', 'input', function(){
		//console.log("inside keyup blur input");
		checkEmptiness();
	});

	//Remove an item with the trash button
	//use event delegation because the button was dynamically added
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
	
	//Detect when a checkbox has been changed
	$('div').on('change', '.wa-add-checkbox', function() {
		//console.log("checkbox handler: "+this.id);
		waIsChecked = $(this).is(':checked');
		var waStyle = ( waIsChecked == true ) ? 'line-through' : 'none';
		var waIdOrderElement = "#order-element-" + waGetNumberFromId(this.id);
		$(waIdOrderElement).css('text-decoration', waStyle);
		var waChecked = ( waIsChecked == true ) ? 'checked' : 'unchecked';
		$(this).next('input[type="hidden"]').val(waChecked);
	});
	
	//only for wa-update-order page.
	//Update the text taking into account the value of the hidden field
	//it is necessary to use the hidden field because when a checkbox
	//is not checked the info is not sent to the server.
	if ($('#order-title').prop('disabled')) {
		//console.log("To update the checkboxes");
		$('.wa-add-checkbox').each(function() {
			//console.log("Checking status for checkbox: "+ this.id);
			if($(this).next().val() == "checked") {
				//console.log("Updating checkbox: "+ this.id);
				$(this).prop('checked',true);
				var waIdOrderElement = "#order-element-" + waGetNumberFromId(this.id);
				$(waIdOrderElement).css('text-decoration', 'line-through');
			}
		});
	}

	//only for wa-update-order page
	//Add the trash button when there is more than one element
	if ($('#order-title').prop('disabled')) {
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
	}
});
