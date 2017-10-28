/**
 * Created by HermawanRahmatHidaya on 01/01/2017.
 */

$('.dropdown-submenu a.test').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
});

$('.room-node').on("click", function (e) {
    var idOfRoom = $(this).get(0).getAttribute("data-id-of-room");
    var orderAccess = $(this).get(0).getAttribute("data-order-access");
    var name = $(this).get(0).getAttribute("data-name");
    $("#room-"+orderAccess).attr("value", name);
    $("#id_of_room-"+orderAccess).attr("value", idOfRoom);
});

$("#btn-add-access").on("click", function (e) {
    var $hiddenDiv = $(this).next('div');
    if($hiddenDiv.css("display") === "none"){
        $hiddenDiv.show();
        $(this).html("-");
        $(this).attr("class", "btn btn-danger btn-xs");
    }else{
        $hiddenDiv.hide();
        $(this).html("+");
        $(this).attr("class", "btn btn-info btn-xs");
        var orderAccess = $hiddenDiv.get(0).getAttribute("data-access-order");
        $("#room-"+orderAccess).attr("value", null);
        $("#id_of_room-"+orderAccess).attr("value", null);
        $("#description-"+orderAccess).attr("value", null);
    }
});

function post(path, parameters) {
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", path);

    $.each(parameters, function(key, value) {
        var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    $(document.body).append(form);
    form.submit();
}

$('.btn-delete').on("click", function (e) {
    var orderAccess = $(this).parent().get(0).getAttribute("data-access-order");
    var id_of_person = $("#id_of_person").get(0).getAttribute("value");
    console.log(orderAccess);
    console.log(id_of_person);
    post("delete", {"access_order": orderAccess-1, "id_of_person":id_of_person});
});