window.onload = function () {
    'use strict' ;


    var URL = window.URL || window.webkitURL;
    var editcontainer = document.querySelector('.edit-image');
    var editimage = editcontainer.getElementsByTagName('img').item(0);

    var editcropper = new Cropper(editimage, {
      dragMode: 'move',
      autoCrop: false,
      dragCrop: false,
      autoCropArea: 0.65,
      restore: true,
      guides: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      minContainerWidth: 480,
      minContainerHeight: 700,
    });
}