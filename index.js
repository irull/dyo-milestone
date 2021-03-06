const canvas = new fabric.Canvas("tshirt-canvas");

function updateTshirtImage(imageURL) {
  fabric.Image.fromURL(imageURL, function (img) {
    img.scaleToHeight(300);
    img.scaleToWidth(300);
    canvas.centerObject(img);
    canvas.add(img);
    canvas.renderAll();
  });
}

const btn = document.querySelectorAll(".tshirt-color button");
btn.forEach((button) => {
  button.addEventListener(
    "click",
    function getvalue() {
      document.getElementById("tshirt-div").style.backgroundColor = this.value;
    },
    false
  );
});

const images = document.querySelectorAll(".design-container img");
images.forEach((image) => {
  image.addEventListener(
    "click",
    function () {
      // console.log(this.src);
      updateTshirtImage(this.src);
    },
    false
  );
});

//upload custom design
document.getElementById("tshirt-custompicture").addEventListener(
  "change",
  function (e) {
    var render = new FileReader();

    render.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;

      //load picture, create image in Fabric.js
      imgObj.onload = function () {
        var img = new fabric.Image(imgObj);

        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
      };
    };
    //If user selected picture, load it
    if (e.target.files[0]) {
      render.readAsDataURL(e.target.files[0]);
    }
  },
  false
);
//Dell key obj remove
document.addEventListener("keydown", function (e) {
  var keyCode = e.keyCode;

  if (keyCode == 46) {
    // console.log("Removing selected element on Fabric.js on DELETE key !");
    canvas.remove(canvas.getActiveObject());
  }
});

function myFunction() {
  canvas.remove(canvas.getActiveObject());
}

//download

$(document).ready(function () {
  $("#download").click(function () {
    domtoimage.toBlob(document.getElementById("tshirt-div")).then(
      function (blob) {
        window.saveAs(blob, "myDesign.png");
      },
      iziToast.show({
        transitionIn: "bounceInLeft",
        color: "green",
        title: "Berhasil",
        message: "Gambar berhasil disimpan",
      })
    );
  });
});
