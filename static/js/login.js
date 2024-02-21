$(document).ready(function(){
    var email = $('#email')
    var password = $('#password')
    var role = $("#role")

    email.blur(validate_email)
    email.keyup(validate_email)
    role.on('change',validate_role)
    password.blur(validate_password)
    password.keyup(validate_password)

    function validate_email(){
        var regex = /^[_a-z_A-Z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
        var email = $('#email')
        var email_help = $('#email_help')
        if(email.val().trim() === ""){
            email_help.addClass('text-danger capitalize-text').text("dont leave the field empty")
            return false
        }
        else if(!regex.test(email.val())){
            email_help.addClass('text-danger capitalize-text').text("enter valid email")
            return false
        }
        else{
            email_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function validate_password(){
        var password = $('#password')
        var password_help = $('#password_help')
        if(password.val().trim() === ""){
            password_help.addClass('text-danger capitalize-text').text("password field cannot be empty")
            return false
        }
        else{
            password_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function validate_role(){
        var role = $("#role")
        var role_help = $("#role_help")
        if(role.val().trim() === ""){
            role_help.addClass("text-danger capitalize-text").text("Choosing a role is mandatory")
            return false
        }
        else{
            role_help.removeClass("text-danger capitalize-text").text("")
            return true
        }
    }

    $("#loginForm").submit(function(e){
        e.preventDefault()
        if(validate_email() & validate_password() & validate_role()){
            $.ajax({
                type: "POST",
                url: "/loginHandler",
                data: $('#loginForm').serialize(),
                success: function (response) {
                    console.log(response);
                    $('#messages').show();
                    $("#messages").text(response.message).addClass('bg-warning text-center capitalize-text');
                    setTimeout(() => {
                        $("#messages").text('').removeClass('bg-warning text-center capitalize-text');
                    }, 3000);

                    if (response.success) {
                        window.location.href = response.redirect;
                    }
                },
                error: function (error) {
                    console.log(error)
                 }
            });
        }
    })
})