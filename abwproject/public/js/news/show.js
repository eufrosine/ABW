/**
 * Created by HermawanRahmatHidaya on 03/10/2016.
 */

jQuery(document).ready(function($) {
    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

    $('#dateFromDiv').datetimepicker({
        locale:'en',
        format:'YYYY-MM-DD'
    });

    $('#dateToDiv').datetimepicker({
        locale:'en',
        format:'YYYY-MM-DD'
    });

    $('#startTimeDiv').datetimepicker({
        locale:'en',
        format:'YYYY-MM-DD'
    });

    $('#endTimeDiv').datetimepicker({
        locale:'en',
        format:'YYYY-MM-DD'
    });

    $(".btn-view").click(function() {
        var row = $(this).closest("tr");
        var author = row.find("td:nth-child(1)");
        var title = row.find("td:nth-child(2)");
        var content = row.data("content");
        var startTime = row.find("td:nth-child(3)");
        var endTime = row.find("td:nth-child(4)");
        var $background = row.data("image-link");
        $("#viewModal").modal('show');

        $("#view-modal-title").html(title.text());
        $("#view-content").html(content);
        $("#view-author").html("Written by : "+author.text());
        $("#view-bg-news").html("Background : <br><img src='"+$background+"' class='thumbnail img-responsive' width='300'/>");
        $("#view-start-time").html("Start Time : "+startTime.text());
        $("#view-end-time").html("End Time : "+endTime.text());
    });

    $(".btn-edit").click(function() {
        var row = $(this).closest("tr");
        $('#formEdit').prop("action","edit");
        $('#formEdit').prop("enctype","multipart/form-data");
        var author = row.data("id-of-person");
        var title = row.find("td:nth-child(2)");
        var content = row.data("content");
        var startTime = row.find("td:nth-child(3)");
        var endTime = row.find("td:nth-child(4)");
        var idOfNews = row.data("id-of-news");
        var $background = row.data("image-link");
        $("#editModal").modal('show');
        $("#edit-modal-title").html('Edit a News');

        $("#title").val(title.text());
        $("#title").prop('readonly', false);
        $("#content").val(content);
        $("#content").prop('readonly', false);
        $("#image").prop('readonly', false);
        $("#newsThumbnail").prop('src', $background);
        $("#startTime").val(new Date(startTime.text()).toDateInputValue());
        $("#startTime").prop('readonly', false);
        $("#endTime").val(new Date(endTime.text()).toDateInputValue());
        $("#endTime").prop('readonly', false);
        $("#idOfNews").val(idOfNews);
        $("#author").val(author);
        $("#helpBlock").html("P.S. This news can be image-mode-only if you have uploaded an image and delete the title & the content");
        $("#editButton").val("SAVE");
        $("#editButton").prop("class", "btn btn-warning");
    });

    $(".btn-delete").click(function() {
        var row = $(this).closest("tr");
        $('#formEdit').prop("action","delete");
        var author = row.data("id-of-person");
        var title = row.find("td:nth-child(2)");
        var content = row.data("content");
        var startTime = row.find("td:nth-child(3)");
        var endTime = row.find("td:nth-child(4)");
        var idOfNews = row.data("id-of-news");
        var $background = row.data("image-link");
        $("#editModal").modal('show');
        $("#edit-modal-title").html('Delete a News');

        $("#title").val(title.text());
        $("#title").prop('readonly', true);
        $("#content").val(content);
        $("#content").prop('readonly', true);
        $("#image").prop('readonly', true);
        $("#newsThumbnail").prop('src', $background);
        $("#startTime").val(new Date(startTime.text()).toDateInputValue());
        $("#startTime").prop('readonly', true);
        $("#endTime").val(new Date(endTime.text()).toDateInputValue());
        $("#endTime").prop('readonly', true);
        $("#idOfNews").val(idOfNews);

        $("#helpBlock").html("WARNING! This action will delete this news completely from the system.");
        $("#editButton").val("DELETE");
        $("#editButton").prop("class", "btn btn-danger");
    });
});

function formatDateString(s) {
    var s = s.split(/\D/);
    var date = new Date(s);
    return s[2] + '-' + s[1] + '-' + s[0];
}

// var datepickers = $(".datepicker").datepicker({ dateFormat: "yy-mm-dd" }).val();

$.each($(".datepicker"), function (i, val) {
    // val.datepicker({ dateFormat: "yy-mm-dd" }).val();
    console.log(val);
});
