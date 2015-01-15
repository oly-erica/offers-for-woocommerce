(function ( $ ) {
	"use strict";

	$(function () {

		// Place your administration-specific JavaScript here
        $(document).ready(function(){
            $('#offer-quantity').autoNumeric('init',
                {vMin: '0',
                    mDec: '0',
                    lZero: 'deny',
                    aForm: false}
            );

            $('#offer-price-per').autoNumeric('init',
                {
                    mDec: '2',
                    aSign: '',
                    //wEmpty: 'sign',
                    lZero: 'keep',
                    aForm: false
                }
            );

            updateTotal();

            // AJAX - Add Offer Note
            $('#angelleye-woocommerce-offers-ajax-addnote-btn').click(function()
            {
                var targetID = $(this).attr('data-target');
                var noteContent = $('#angelleye-woocommerce-offers-ajax-addnote-text').val();
                var data = {
                    'action': 'addOfferNote',
                    'targetID': targetID,
                    'noteContent': noteContent
                };

                // post it
                $.post(ajaxurl, data, function(response) {
                    if ( 'failed' !== response )
                    {
                        var redirectUrl = response;
                        top.location.replace(redirectUrl);
                        return true;
                    }
                    else
                    {
                        alert('add note failed');
                        return false;
                    }
                });
                /*End Post*/
            });
        });

        // Update totals
        var updateTotal = function () {
            var input1 = $('#offer-quantity').autoNumeric('get');
            var input2 = $('#offer-price-per').autoNumeric('get');
            if (isNaN(input1) || isNaN(input2)) {
                $('#offer-total').val('');
            } else {
                var theTotal = (input1 * input2);
                $('#offer-total').val( parseFloat(theTotal, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString() );
            }
        };

        // offer quantity input keyup
        $('#offer-quantity').keyup(function() {
            updateTotal();
        });

        // offer price each input keyup
        $('#offer-price-per').keyup(function() {
            updateTotal();
        });
	});

}(jQuery));