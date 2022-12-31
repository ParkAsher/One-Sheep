$('.radio-role').on('click', function () {
    let checkedRole = $('input[name=role]:checked').val();

    if (checkedRole === 'driver') {
        $('#register-image').removeAttr('disabled');
    } else {
        $('#register-image').attr('disabled', true);
    }
});
