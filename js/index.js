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


        // $.ajax({
        //     method: "POST",
        //     url: "http://localhost:8080/Project_BackSky_N/uploadimg",
        //     data: {"file":file},
        //     content: "multipart/form-data"
        // }).done(function(msg){
        //     alert(msg);
        // })
    })
})

function v(name)
{
    if(name.match("png") || name.match("jpg")){
        return true;
    }

    return false;
}