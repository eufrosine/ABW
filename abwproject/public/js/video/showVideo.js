//
//
//
jQuery(document).ready(function($) {
    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });

    $(".btn-delete-video").click(function () {
        var row = $(this).closest("tr");
        $('#videoEdit').prop("action", "deletevideo");
        var author = row.data("id-of-person");
        var title = row.find("td:nth-child(2)");
        var video_link = row.find("td:nth-child(3)");
        var video_id = row.data("data-id-of-video");


        $("#editModalVideo").modal('show');
        $("#edit-video-modal-title").html('Delete a Video');

        $('#video_id').val(video_id);
        $('#author').val(author);

        $('#title').val(title.text()).prop('readonly', true);
        $('#video').val(video_link.text()).prop('readonly', true);

        $("#help-block-video").html("WARNING! This action will delete this news completely from the system.");
        $("#editVideoButton").val("DELETE").prop("class", "btn btn-danger");
    });


    $(".btn-setting-video").click(function(){

    })
});

