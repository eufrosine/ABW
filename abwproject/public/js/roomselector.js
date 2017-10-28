/**
 * Created by HermawanRahmatHidaya on 11/09/2016.
 */

function facultyCheck(){
    var facultyName = $("#faculty option:selected").text();
    var facultyID = $("#faculty").val();

    $("#department").html("<option disabled selected value> -- Select from options below -- </option>");
    $("#buildingGroup").hide();
    $("#roomGroup").hide();

    $.each(departments, function(key,val){
        if(val["facultyID"] == facultyID){
            $('#department').append($('<option/>',{
                value: val["departmentID"],
                text: val["departmentName"]
            }));
        }
    });

    $("#departmentGroup").show();
}

function departmentCheck(){
    var departmentName = $("#department option:selected").text();
    var departmentID = $("#department").val();

    $("#building").html("<option disabled selected value> -- Select from options below -- </option>");
    $("#roomGroup").hide();

    $.each(buildings, function(key,val){
        if(val["departmentID"] == departmentID){
            $('#building').append($('<option/>',{
                value: val["buildingID"],
                text: val["buildingName"]
            }));
        }
    });

    $("#buildingGroup").show();
}

function buildingCheck(){
    var buildingName = $("#building option:selected").text();
    var buildingID = $("#building").val();

    $("#room").html("<option disabled selected value> -- Select from options below -- </option>");

    $.each(rooms, function(key,val){
        if(val["buildingID"] == buildingID && (val["roomName"] != "Meeting Room" && val["roomName"] != "Depo" && val["roomName"] != "Toilet" && val["roomName"] != "Class Room" && val["roomName"] != "Common Room")){
            $('#room').append($('<option/>',{
                value: val["roomID"],
                text: "("+val["roomCode"]+") " + "(Level " + val["roomFloor"] + " floor) " + val["roomName"]
            }));
        }
    });

    $("#roomGroup").show();
}


/*function roomCheck(){
    var position = $("#type option:selected").text();
    var roomID = $("#room").val();
    for(var i=0; i<rooms.length; i++){
        if(rooms[i]["roomID"] == roomID){
            var roomName = rooms[i]["roomName"];
            var descriptionText = position + " at " + roomName;
            document.getElementById("description").setAttribute("value", descriptionText);
            break;
        }
    }
}*/

$.each(faculties, function(key,value){
    $('#faculty').append($('<option/>',{
        value: value["facultyID"],
        text: value["facultyName"]
    }));
});