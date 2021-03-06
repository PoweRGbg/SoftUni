// On changing select options extra html is added to the extraDetails correctly
document.body.innerHTML = `
<div id="wrapper">
        <h1>Make Reservation</h1>
        <h4>Please fill in the following information in order to proceed with your reservation:</h4>
        <div class="block">
            <div class="inputLabel">Full Name<input id="fullName"></div><br>
            <div class="inputLabel">E-mail<input id="email"></div><br>
            <div class="inputLabel">Phone Number<input id="phoneNumber"></div><br>
            <div class="inputLabel">Address<input id="address"></div><br>
            <div class="inputLabel">Postal Code<input id="postalCode"></div>
            <button class="buttonMargined" id="submit">Submit</button>
        </div>
        <div class="block">
            <label style="font-size: inherit;">Preview your information:</label><br>
            <div class="preview">
                <ul id="infoPreview">
                </ul>
            </div>
            <button class="buttonMargined" id="edit" disabled>Edit</button>
            <button id="continue" disabled>Continue</button>
        </div>
        <div id="container">
        </div>
    </div>
`;

result('#container');

$('#fullName').val('Joro Italianeza');
$('#email').val('joroitalianeza@gmail.com');
$('#phoneNumber').val('0888 888 888');
$('#address').val('Simeonovo');
$('#postalCode').val('1000');

$('#submit').trigger('click');
$('#continue').trigger('click');

$('#paymentOptions').val('creditCard').change();

expect($('#extraDetails').html()).to.contains('<div class="inputLabel">Card Number<input></div><br>', 'Card number input field was not added to the container');
expect($('#extraDetails').html()).to.contains('<div class="inputLabel">Expiration Date<input></div><br>', 'Expiration date input field was not added to the container');
expect($('#extraDetails').html()).to.contains('<div class="inputLabel">Security Numbers<input></div><br>', 'Security number input field was not added to the container');
expect($('#extraDetails').html()).to.contains('<button id="checkOut">Check Out</button>', 'Checkout button was not added to the container');

expect($('#extraDetails').html()).not.to.contains('<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>', 'Bank account information should not be shown for the credit card payment option');

$('#paymentOptions').val('bankTransfer').change();

expect($('#extraDetails').html()).to.contains('<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>', 'Bank account information was not added to the container');
expect($('#extraDetails').html()).to.contains('<button id="checkOut">Check Out</button>', 'Checkout button was not added to the container');

expect($('#extraDetails').html()).not.to.contains('<div class="inputLabel">Card Number<input></div><br>', 'Credit card form should not be shown for the bank transfer payment option');
expect($('#extraDetails').html()).not.to.contains('<div class="inputLabel">Expiration Date<input></div><br>', 'Credit card form should not be shown for the bank transfer payment option');
expect($('#extraDetails').html()).not.to.contains('<div class="inputLabel">Security Numbers<input></div><br>', 'Credit card form should not be shown for the bank transfer payment option');