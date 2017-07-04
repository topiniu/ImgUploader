/**
 * Created by topiniu on 2017/7/3.
 */
$(function(){
    $("#j_checkBox").change(function(){
        var file = $("#j_checkBox").val();
        if(!v(file)){
            alert("Must be jpg or png file");
            $("#j_checkBox").val(null);
            return;
        }

        var form = $("#fileUploadForm")[0];

        var data = new FormData(form);
        // alert(data);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/Project_BackSky_New/uploadimg",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function(data){
                // alert(data);
            },
            error: function(e){
                alert("Something wrong");
            }
        });
    })
})

function v(name)
{
    if(name.match("png") ||
        name.match("jpg") ||
        name.match("JPG") ||
        name.match("PNG") ||
        name.match("jpeg") ||
        name.match("JPEG")){
        return true;
    }

    return false;
}