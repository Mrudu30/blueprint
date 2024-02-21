$(document).ready(function(){
    // =============== LISTING CALL ================
    getAllEmployees()
    // Attach event listeners for tab switching
    $('#myTabs a').on('show.bs.tab', function (e) {
        var tabId = e.target.id;
        $('#currentTab').val(tabId);
        getAllEmployees();
    });

    // ================ FORM DIALOG ==================
    var formdiv = $("#formdiv")
    formdiv.dialog({
        autoOpen: false,
        title:'Add Employee',
        show: {
            effect: "fold",
            duration: 1000
        },
        hide: {
            effect: "fold",
            duration: 1000
        },
        modal: true,
        resizable: false,
        width: 400,
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
                $(".pfp").empty()
                $(".help").text("")
                $("#employeeForm")[0].reset()
                $(".help").text("")
            }
        },
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        }
    })

    $("#addBtn").on('click',function(){
        formdiv.dialog("open")
        $('#form-type').val("createform")
        $(".admin").prop("disabled", false);
        $(".hr").prop("disabled", false);
        $(".employee").prop("disabled", false);
    })

    // --------------- Duplicate Functions -----------------
    function duplicate_username(usernameValue, role, callback) {
        $.ajax({
            type: "POST",
            url: "/checkUsername",
            data: { 'username': usernameValue, 'role': role },
            success: function (response) {
                if (response.status === 'success') {
                    username_help.text("").removeClass("text-danger capitalize-text");
                    $("#username").addClass('duplicate');
                    callback(true);
                } else {
                    username_help.text("username already exists").addClass("text-danger capitalize-text");
                    $("#username").removeClass('duplicate');
                    callback(false);
                }
            },
            error: function () {
                console.error('Error in AJAX request');
                callback(false);
            }
        });
    }

    function duplicate_email(emailValue, role, callback) {
        $.ajax({
            type: "POST",
            url: "/checkEmail",
            data: { 'email': emailValue, 'role': role },
            success: function (response) {
                if (response.status === 'success') {
                    email_help.text("").removeClass("text-danger capitalize-text");
                    $("#email").addClass('duplicate');
                    callback(true);
                } else {
                    email_help.text("email already exists").addClass("text-danger capitalize-text");
                    $("#email").removeClass('duplicate');
                    callback(false);
                }
            },
            error: function () {
                console.error('Error in AJAX request');
                callback(false);
            }
        });
    }

    // ----------- VALIDATION FUNCTIONS --------------
    var username = $("#username")
    var email = $("#email")
    var password = $("#password")
    var role = $(".role")

    var username_help = $("#username_help")
    var email_help = $("#email_help")
    var password_help = $("#password_help")
    var role_help = $("#role_help")

    username.blur(validate_username)
    username.keyup(validate_username)
    email.blur(validate_email)
    email.keyup(validate_email)
    password.blur(validate_password)
    password.keyup(validate_password)
    role.on('click',validate_role)
    role.on('change',validate_role)

    function validate_username(){
        var username = $("#username").val();
        var usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

        if (!usernameRegex.test(username)) {
            if (username.length < 3) {
                username_help.text("Username must be at least 3 characters.").addClass("text-danger capitalize-text");
            } else if (username.length > 20) {
                username_help.text("Username cannot exceed 20 characters.").addClass("text-danger capitalize-text");
            } else {
                username_help.text("Invalid characters in the username. Use only letters, numbers, underscore, and hyphen.").addClass("text-danger capitalize-text");
            }

            return false;
        } else {
            username_help.text("").removeClass("text-danger capitalize-text");
            return true;
        }
    }

    function validate_email(){
        var emailValue = email.val()
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(emailValue.trim() === ""){
            email_help.text("Email is a required field").addClass("text-danger capitalize-text")
        }
        else if (!emailRegex.test(emailValue)) {
            $("#email_help").text("Please enter a valid email address.").addClass("text-danger capitalize-text")
            return false;
        } else {
            $("#email_help").text("").removeClass("text-danger capitalize-text");
            return true;
        }
    }

    function validate_password() {
        var password = $("#password").val();
        var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

        if (password.trim() == ""){
            password_help.text("password is a required field").addClass("text-danger capitalize-text")
        }
        else if (!passwordRegex.test(password)) {
            $("#password_help").text("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, one special character (@ $ ! % * ? &).").addClass("text-danger capitalize-text");
            return false;
        } else {
            password_help.text("").removeClass("text-danger capitalize-text");
            return true;
        }
    }

    function validate_role() {
        var selectedRole = $("input[name='role']:checked").val();

        if (!selectedRole) {
            role_help.text("Please select a role.").addClass("text-danger capitalize-text");
            return false;
        }
        else {
            $("#role_help").text("").removeClass("text-danger capitalize-text");
            return true;
        }

    }

    function validate_image() {
        var fileInput = $('#pfp')[0];
        var oldFileInput = $('#oldpfp').val();
        var file = fileInput.files.length > 0 ? fileInput.files[0] : undefined;

        if (file) {
            var fileExtension = file.name.split('.').pop().toLowerCase();
            var allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            if (allowedExtensions.includes(fileExtension)) {
                $("#photo_help").text('').removeClass('text-danger capitalize-text');
                return true;
            } else {
                $("#photo_help").text('Invalid file type. Please select a valid image.').addClass('text-danger capitalize-text');
                return false;
            }
        }
        else if (oldFileInput) {
            $("#photo_help").text('').removeClass('text-danger capitalize-text');
            return true;
        }
        else {
            $("#photo_help").text('Please upload a photo.').addClass('text-danger capitalize-text');
            return false;
        }
    }

    // --------- status value set ---------
    function statusValue(){
        var isChecked = $("#statusSwitch").prop("checked")
        var stats = isChecked ? 'Active' : 'Inactive';

        $("#statusValue").val(stats)
    }

    // form ajax
    $("#employeeForm").submit(function(e){
        e.preventDefault();
        statusValue()
        if (validate_email() & validate_password() & validate_role() & validate_username()  & validate_image() ){
            if ($("#form-type").val()=='createform'){
               // Callback function to handle results
                function handleResults(resultDuplicateUsername, resultDuplicateEmail) {
                    console.log(resultDuplicateEmail, resultDuplicateUsername);

                    if (resultDuplicateEmail && resultDuplicateUsername) {
                        addEmployee();
                    }
                }
                // calling ajax request
                duplicate_username($("#username").val(), $("input[name='role']:checked").val(), function (resultDuplicateUsername) {
                    duplicate_email($("#email").val(), $("input[name='role']:checked").val(), function (resultDuplicateEmail) {
                        handleResults(resultDuplicateUsername, resultDuplicateEmail);
                    });
                });
            }
            else if ($("#form-type").val()=='updateform'){
                updateEmployee()
            }
        }
        else{
            console.log("There was an error submitting the form")
            console.log(validate_email() , validate_password() , validate_role() , validate_username()  , validate_image())
        }
    })
})
// ================ MESSAGE RENDER ==============
function messageShow(response){
    $("#messages").show()
    if (response.status=="success"){
        $("#messages").text(response.message).addClass("bg-success capitalize-text")
        setTimeout(() => {
            $("#messages").text("").removeClass("bg-success capitalize-text")
        }, 3000);
    }
    else{
        $("#messages").text(response.message).addClass("bg-warning capitalize-text")
        setTimeout(() => {
            $("#messages").text("").removeClass("bg-warning capitalize-text")
        }, 3000)
    }
}

// ================ ADD / UPDATE EMPLOYEE ================
function addEmployee(){
    var formData = new FormData($("#employeeForm")[0])
    $.ajax({
        type: "POST",
        url: "/addEmployee",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            $("#employeeForm")[0].reset()
            $("#formdiv").dialog("close")
            $(".pfp").empty()
            $(".help").text("")
            getAllEmployees()
            messageShow(response)
        }
    });
}

function updateFormSet(id,role){
    var data = {'id':id,'role':role}
    // console.log(data)
    $.ajax({
        type: "POST",
        url: "/admin/getEmployees",
        data: data,
        success: function (response) {
            // console.log(response)
            $("#formdiv").dialog({
                autoOpen: false,
                title:'Update Employee',
                show: {
                    effect: "fold",
                    duration: 1000
                },
                hide: {
                    effect: "fold",
                    duration: 1000
                },
                modal: true,
                resizable: false,
                width: 400,
                buttons: {
                    "Cancel": function () {
                        $(this).dialog("close");
                        $(".pfp").empty()
                        $(".help").text("")
                        $("#employeeForm")[0].reset()
                        $(".help").text("")
                        $(".employee").prop("disabled", false);
                        $(".admin").prop("disabled", false);
                        $(".hr").prop("disabled", false);
                    }
                },
                open: function (event, ui) {
                    $(".ui-dialog-titlebar-close").hide();
                }
            })
            $("#formdiv").dialog("open")
            $("#form-type").val("updateform")
            $("#employeeId").val(response[0][0])
            $("#username").val(response[0][2])
            $("#email").val(response[0][3])
            $("#password").val(response[0][4])

            if (role === "admin") {
                $(".admin").prop("checked", true);
                $(".hr").prop("disabled", true);
                $(".employee").prop("disabled", true);
            } else if (role === "hr") {
                $(".hr").prop("checked", true);
                $(".admin").prop("disabled", true);
                $(".employee").prop("disabled", true);
            } else if (role === "employee") {
                $(".employee").prop("checked", true);
                $(".admin").prop("disabled", true);
                $(".hr").prop("disabled", true);
            }

            var isChecked = response[0][5] == 'Active' ? true:false
            if(isChecked){
                $('#statusSwitch').prop("checked",true)
            }
            else{
                $('#statusSwitch').prop("checked",false)
            }

            if (response[0][6]){
                var imgPath = "/static/profiles/" + response[0][6]
                $(".pfp").append(`<img src="${imgPath}" alt="profile picture" class="img-thumbnail ">`)
                $("#oldpfp").val(response[0][6]);
            }
        },
        error: function(e){
            console.log(e)
        },
    });
}

function updateEmployee(){
    var formData = new FormData($("#employeeForm")[0])

    $.ajax({
        type: "POST",
        url: "/updateEmployee",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            // console.log(formData)
            $("#employeeForm")[0].reset()
            $("#formdiv").dialog("close")
            $(".pfp").empty()
            $(".help").text("")
            $(".admin").prop("disabled", false);
            $(".hr").prop("disabled", false);
            $(".employee").prop("disabled", false);
            getAllEmployees()
            messageShow(response)
        }
    });
}


// =============== DELETE EMPLOYEE ==============
function deleteEmployee(id,role){
    if (role=='admin'){
        $("#messages").show()
        $("#messages").text("Admin cannot be deleted").addClass("bg-warning capitalize-text")
        setTimeout(() => {
            $("#messages").text("").removeClass("bg-warning capitalize-text")
        }, 3000);
    }
    else{
        var result = confirm("Are you sure you want to remove this employee ?")
        if (result){
            $.ajax({
                type: "POST",
                url: "/removeEmployee",
                data: {'id':id,'role':role},
                success: function (response) {
                    messageShow(response)
                    getAllEmployees()
                }
            });
        }
    }
}

// =============== STATUS UPDATE ============
function statuschange(id,role){
    var isChecked = $(`#statusSwitch_${id}`).prop('checked');
    var stats = isChecked ? 'Active' : 'Inactive';
    var data = {'id':id,'role':role,'status':stats}

    $.ajax({
        type: "POST",
        url: "/updateStatus",
        data: data,
        success: function (response) {
            messageShow(response)
        }
    });
}

// ================ LISTING FUNCTIONS ================
function getAllEmployees() {
    var role = $("#currentTab").val()
    $.ajax({
        type: "POST",
        url: "/admin/getEmployees",
        data: {'id':"",'role':role},
        success: function (response) {
            var tableId = role + "Table1"
            if ($.fn.DataTable.isDataTable("#" + tableId)) {
                $("#" + tableId).DataTable().destroy();
            }

            // Update table content
            listingEmployees(response, role);

            // Reinitialize DataTable
            $("#" + tableId).DataTable({
                order: [[0, 'desc']],
            });
        },
        error:function(error){
            console.log(error)
        }
    });
}

function listingEmployees(response, tabId){
    var listing = $("#" + tabId + "Listing");
    listing.empty()
    for (i=0;i<response.length;i++){
        var employee = response[i]
        var tr = $("<tr>")

        for (j=0;j<5;j++){
            var td = $("<td>")
            td.text(employee[j])
            tr.append(td);
        }

        var statusSwitch = employee[5] === 'Active' ? 'checked' : ''

        tr.append($('<td>').html(`
            <div class="mb-3 form-check form-switch text-left">
                <input class="form-check-input" type="checkbox" role="switch" id="statusSwitch_${employee[0]}"  onchange="statuschange(${employee[0]},'${employee[1]}')" name="statusSwitch" ${statusSwitch}>
            </div>
        `));

        var action = $("<td>").html(`
            <div>
            <span onclick="updateFormSet(${employee[0]},'${employee[1]}')"><i class="fas fa-pencil-alt"></i></span>
                <span onclick="deleteEmployee(${employee[0]}, '${employee[1]}')"><i class="fa fa-trash"></i></span>
            </div>
        `);

        tr.append(action)
        listing.append(tr)
    }
}