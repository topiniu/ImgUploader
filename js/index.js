/**
 * Created by topiniu on 2017/7/3.
 */
var localData = [];
$(function () {
    $("#j_checkBox").change(function () {
        var file = $("#j_checkBox").val();
        if (!v(file)) {
            alert("Must be jpg or jpeg or png file");
            $("#j_checkBox").val(null);
            return;
        }

        $(".j_loadingCover").fadeIn("slow");

        var form = $("#fileUploadForm")[0];

        var data = new FormData(form);
        // alert(data);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://23.106.158.25:8080/Project_BackSky_New/uploadimg",
            // url: "http://localhost:8080/Project_BackSky_New/uploadimg",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                loadData(JSON.parse(data));
                saveData(JSON.parse(data));

                $(".j_loadingCover").fadeOut("slow");
            },
            error: function (e) {
                alert("Something wrong");
            }
        });
    });

    $(".j_funcBtn").on("click", function () {
        // alert($(this));
        // $(this).select()
        $("#msgBox").fadeIn();
        setTimeout(function () {
            $("#msgBox").fadeOut();
        }, 1500);
    });

    new Clipboard('.j_funcBtn', {
        text: function (trigger) {
            return trigger.getAttribute('attr-link');
        }
    });

    // new Clipboard('.btn');
    $("#j_checkBox").on("mouseenter", function () {
        $(".j_inputBox").css("backgroundColor", "#BDC0BA")
        // alert(0);
    });
    $("#j_checkBox").on("mouseleave", function () {
        $(".j_inputBox").css("backgroundColor", "rgb(145,152,159)")
        // alert(0);
    });
    getData();
});
function getData() {
    
    $.ajax({
        type: "GET",
        url: "http://23.106.158.25:8080/Project_BackSky_New/getImgList",
        success: function (data) {
            if (data === "") {
                return;
            }
            data = JSON.parse(data);
            // console.log(data);
            for (item in data) {
                loadData(data[item]);
            }
        },
        error: function (e) {
            alert("Something wrong");
        }
    });
}
function loadData(data) {
    // $(".j_fullPath").text(data._fullPath);
    // $(".j_compressedPath").text(data._compressedPath);
    // console.log(data._compressedPath);
    var n = $(".j_resultPanel").eq(0).clone(true);
    n.find(".j_review_img").attr('src',data._compressedPath);
    n.find(".j_compress").attr('attr-link',data._compressedPath);
    n.css('display','block');
    n.prependTo($('.j_all-img'));

    // var newResult = $(".j_resultPanel").eq(0).clone();
    // $(newResult).find(".j_review_img").attr('src',data._compressedPath);
    // $(newResult).find(".j_compress").attr('attr-link',data._compressedPath);
    // console.log(newResult);
    // $(newResult).css("display", "inline-block");

    // $(".j_all-img")[0].prepend($(newResult));
}

function saveData(data) {
    if (localData === null) {
        localData = [];
    }
    localData[0] = data;
    window.localStorage.clear();
    window.localStorage.setItem("data", JSON.stringify(localData));
}
function v(name) {
    if (name.match("png") ||
        name.match("jpg") ||
        name.match("JPG") ||
        name.match("PNG") ||
        name.match("jpeg") ||
        name.match("JPEG")) {
        return true;
    }

    return false;
}

function loading() {

}