/**
 * Created by HermawanRahmatHidaya on 21/08/2016.
 */
var FormElement = {
    check: function (id) {
        if ($.trim($("#" + id)[0].value) == '') {
            $("#" + id)[0].focus();
            $("#" + id + "_alert").show();

            return false;
        };

        return true;
    },
    validate: function () {
        $("#registerForm .alert").hide();

        var staff = $("#type option:selected").text();
        var isValid = true;
        if (FormElement.check("id_of_person") == false) {
            isValid = false;
        }
        if (FormElement.check("name") == false) {
            isValid = false;
        }

        if(staff == "Lecturer" || staff == "Staff"){
            if (FormElement.check("email") == false) {
                isValid = false;
            }

            if (FormElement.check("password") == false) {
                isValid = false;
            }

            if ($("#password")[0].value != $("#repeatPassword")[0].value) {
                $("#repeatPassword")[0].focus();
                $("#repeatPassword_alert").show();

                isValid = false;
            }
        }

        if (FormElement.check("description") == false) {
            isValid = false;
        }
        if (FormElement.check("rfid") == false) {
            isValid = false;
        }

        if(!isValid){return false;}

        $("#registerForm")[0].submit();
    }
}

$(document).ready(function () {
    $("#registerForm .alert").hide();
});


function staffChecks(){
    var staff = $("#type option:selected").text();
    if(staff == "Lecturer" || staff == "Staff"){
        document.getElementById('staffForm').style.display = 'block';
        document.getElementById('description').setAttribute("value", "");
        document.getElementById('faculty').value = "";
        $("#departmentGroup").hide();
        $("#buildingGroup").hide();
        $("#roomGroup").hide();
    }else{
        document.getElementById('staffForm').style.display = 'none';
        document.getElementById('description').setAttribute("value", "Student");
    }
}
