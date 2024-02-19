$(document).ready(function () {
    getAllEmployees()
    $("#employeeTable1").DataTable()
    // --------- Form dialog ------------
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
                $(".help").text("")
                $("#employeeForm")[0].reset()
            }
        },
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        }
    })

    // ---------- dialog open ----------
    $("#addBtn").on('click',function(){
        formdiv.dialog("open")
        $('#form-type').val("createform")
        $(".pfp").empty()
    })

    // ---------- validation functions ----------

    var username = $("#username")
    var email = $("#email")
    var password = $("#password")

    var username_help = $("#username_help")
    var email_help = $("#email_help")
    var password_help = $("#password_help")

    username.blur(validate_username)
    username.keyup(validate_username)
    email.blur(validate_email)
    email.keyup(validate_email)
    password.blur(validate_password)
    password.keyup(validate_password)

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

    function validate_pfp(){
        var fileInput = $("#pfp").val()

        if (!fileInput){
            $("#photo_help").text("Profile photo is a required field").addClass("text-danger capitalize-text")
            return false
        }
        else{
            $("#photo_help").text("").removeClass("text-danger capitalize-text")
            return true
        }
    }

    $("#employeeForm").submit(function(e){
        e.preventDefault();
        if (validate_email() & validate_password() & validate_username() & validate_pfp() ){
            if ($("#form-type").val()=='createform'){
                addEmployee()
            }
            else if ($("#form-type").val()=='updateform'){
                updateEmployee()
            }
        }
        else{
            console.log("There was an error submitting the form")
        }
    })

});
function addEmployee(){
    var formData = new FormData($("#employeeForm")[0])
    $.ajax({
        type: "POST",
        url: "/addEmployee",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.status == 'success'){
                console.log(formData)
                $("#messages").show()
                $("#employeeForm")[0].reset()
                $("#formdiv").dialog("close")
                getAllEmployees()
                $("#messages").text(response.message).addClass("bg-success capitalize-text")
                setTimeout(() => {
                    $("#messages").text("").removeClass("bg-success capitalize-text")
                }, 3000);
            }
            else{
                console.log(formData)
                $("#employeeForm")[0].reset()
                $("#formdiv").dialog("close")
                $("#messages").show()
                getAllEmployees()
                $("#messages").text(response.message).addClass("bg-warning capitalize-text")
                setTimeout(() => {
                    $("#messages").text("").removeClass("bg-warning capitalize-text")
                }, 3000);
            }
        }
    });
}

// ----------- Update -----------
function updateEmployee(){
    var formData = new FormData($("#employeeForm")[0])
    $.ajax({
        type: "POST",
        url: "/updateEmployee",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.status == 'success'){
                console.log(formData)
                $("#messages").show()
                $("#employeeForm")[0].reset()
                $("#formdiv").dialog("close")
                getAllEmployees()
                $("#messages").text(response.message).addClass("bg-success capitalize-text")
                setTimeout(() => {
                    $("#messages").text("").removeClass("bg-success capitalize-text")
                }, 3000);
            }
            else{
                console.log(formData)
                $("#employeeForm")[0].reset()
                $("#formdiv").dialog("close")
                $("#messages").show()
                getAllEmployees()
                $("#messages").text(response.message).addClass("bg-warning capitalize-text")
                setTimeout(() => {
                    $("#messages").text("").removeClass("bg-warning capitalize-text")
                }, 3000);
            }
        }
    });
}

function updateFormSet(id,role){
    var data = {'id':id,'role':role}
    $.ajax({
        type: "POST",
        url: "/hr/getEmployees",
        data: data,
        success: function (response) {
            // console.log(response)
            $("#formdiv").dialog("open")
            $("#form-type").val("updateform")
            $("#employeeId").val(response[0][0])
            $("#username").val(response[0][2])
            $("#email").val(response[0][3])
            $("#password").val(response[0][4])
            $(".pfp").empty()

            if (response[0][5]){
                var imgPath = "/static/profiles/" + response[0][5]
                $(".pfp").append(`<img src="${imgPath}" alt="profile picture" class="img-thumbnail ">`)
                $("#oldpfp").val(response[0][5]);
            }
        }
    });
}

// ----------- Delete -----------
function deleteEmployee(id,role){
    var result = confirm("Are you sure you want to remove this employee ?")
    if (result){
        $.ajax({
            type: "POST",
            url: "/removeEmployee",
            data: {'id':id,'role':role},
            success: function (response) {
                if (response.status == 'success'){
                    $("#messages").show()
                    $("#messages").text(response.message).addClass("bg-success capitalize-text")
                    setTimeout(() => {
                        $("#messages").text("").removeClass("bg-success capitalize-text")
                    }, 3000);
                    getAllEmployees()
                }
                else{
                    $("#messages").show()
                    $("#messages").text(response.message).addClass("bg-warning capitalize-text")
                    setTimeout(() => {
                        $("#messages").text("").removeClass("bg-warning capitalize-text")
                    }, 3000);
                    getAllEmployees()
                }
            }
        });
    }

}

// ------------ LISTING FUNCTIONS -----------
function getAllEmployees() {
    var role = 'employee'
    $.ajax({
        type: "POST",
        url: "/admin/getEmployees",
        data: {'id':"",'role':role},
        success: function (response) {
            var tableId = "employeeTable1"
            if ($.fn.DataTable.isDataTable("#" + tableId)) {
                $("#" + tableId).DataTable().destroy();
            }

            // Update table content
            listingEmployees(response, role);

            // Reinitialize DataTable
            $("#" + tableId).DataTable();
        },
        error:function(error){
            console.log(error)
        }
    });
}

function listingEmployees(response, tabId){
    var listing = $("#employeeListing");
    listing.empty()
    for (i=0;i<response.length;i++){
        var employee = response[i]
        var tr = $("<tr>")

        for (j=0;j<5;j++){
            var td = $("<td>")
            td.text(employee[j])
            tr.append(td);
        }

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