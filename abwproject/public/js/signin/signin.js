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
    }
};

var Profile = {
    check: function (id) {
        if ($.trim($("#" + id)[0].value) == '') {
            $("#" + id)[0].focus();
            $("#" + id + "_alert").show();

            return false;
        };

        return true;
    },
    validate: function () {
        if (FormElement.check("name") == false) {
            return false;
        }
        if (FormElement.check("email") == false) {
            return false;
        }
        $("#profileForm")[0].submit();
    }
};

$(document).ready(function () {
    $("div.profile .alert").hide();
});