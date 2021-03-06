/**
 * Created by topiniu on 2017/7/3.
 */
var localData = [];
$(function(){
    $("#j_checkBox").change(function(){
        var file = $("#j_checkBox").val();
        if(!v(file)){
            alert("Must be jpg or jpeg or png file");
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
            xhr: function(){
                var xhr = $.ajaxSettings.xhr();
                xhr.withCredentials = true;
                if(onprogress && xhr.upload){
                    xhr.upload.addEventListener("progress",onprogress,false);

                    return xhr;
                }
            },
            success: function(data){
                loadData(JSON.parse(data));
                saveData(JSON.parse(data));

            },
            error: function(e){
                alert("Something wrong");
            }
        });
    });

    $(".j_path").on("click",function(){
        // alert($(this));
        $(this).select()
    });

    new Clipboard('.btn',{
        target: function(trigger){
            return trigger;
        }
    });

    // new Clipboard('.btn');


    init();
});
function onprogress(evt){
    var loaded = evt.loaded;
    var tot = evt.total;
    var per = Math.floor(100*loaded/tot);
    console.log(per + "%");
}
function loadData(data){
    // $(".j_fullPath").text(data._fullPath);
    // $(".j_compressedPath").text(data._compressedPath);

    var newResult = $(".j_resultPanel").eq(0).clone(true);
    $(newResult).find(".j_fullPath").text(data._fullPath);
    $(newResult).find(".j_compressedPath").text(data._compressedPath);
    $(newResult).css("display","inline-block");

    $(".j_resultContainer").append(newResult);
}

function saveData(data){
    if(localData === null) {
        localData = [];
    }
    localData[0] = data;
    window.localStorage.clear();
    window.localStorage.setItem("data",JSON.stringify(localData));
}

function init(){
    localData = JSON.parse(window.localStorage.getItem("data"));

    for(var index in localData){
        loadData(localData[index]);
    }
}

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