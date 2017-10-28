/**
 * Created by HermawanRahmatHidaya on 01/10/2016.
 */

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        //window.document.location = $(this).data("href");
        //alert($(this).data("id_of_staff"));
        $("#myModal").modal('show');
        $idOfPerson = $(this).find("td:nth-child(1)");
        $name = $(this).find("td:nth-child(2)");
        $fromRoomName = $(this).find("td:nth-child(3)");
        console.log($idOfPerson.text());
        document.getElementById("id_of_person").setAttribute("value", $idOfPerson.text());
        console.log($name.text());
        document.getElementById("name").setAttribute("value", $name.text());
        console.log($fromRoomName.text());
        document.getElementById("from_name").setAttribute("value", $fromRoomName.text());
    });
});