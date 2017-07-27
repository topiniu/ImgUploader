window.onload = function () {
  var img = document.getElementsByTagName("img");
  var forEach = Array.prototype.forEach;

  for (var i = 0; i < img.length; i++) {
    loadImg(img[i]);
  }
};

function loadImg(img) {
  console.log(img.style.position);
  var compressed = img.getAttribute("data-compress");
  var full = img.getAttribute("data-full");
  var cls = img.classList;

  var img_com = document.createElement("img");
  img_com.src = compressed;
  img_com.classList = cls;
  img_com.style.zIndex = 2;

  showComImg(img, img_com, false);

  var img_full = document.createElement("img");
  img_full.src = full;
  img_full.classList = cls;
  img_full.style.zIndex = 1;

  showComImg(img_com, img_full, true);
}

function showComImg(oldImg, newImg, flag) {

  newImg.style.position = "absolute";
  newImg.style.transition = "all 1s";
  newImg.style.opacity = 0;
  if (!flag) {
    newImg.style.filter = "blur(15px)";
  }

  newImg.onload = function () {
    oldImg.after(newImg);
    setTimeout(function () {
      oldImg.style.opacity = 0;
      newImg.style.opacity = 1;
      setTimeout(function () {
        oldImg.remove();
      }, 1500);
    }, 300);
  }
}