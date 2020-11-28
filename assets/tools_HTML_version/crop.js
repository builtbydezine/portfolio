window.onload = function () {
    'use strict';

    var container = document.querySelector('.img-container');
    var $img = document.querySelector('.view-image');
    // get the active image from the uploaded documents
    var image = container.querySelector('.active');
    var doc_actions = document.querySelector('.actions');
    var edit_actions = document.querySelector('.edit-actions');
    var options = {
        dragMode: 'move',
        aspectRatio: 16 / 9,
        autoCrop: false,
        dragCrop: false,
        autoCropArea: 0.65,
        restore: true,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
    }
    var editModal = $('#editModal');
    var cropperOptions = {
        //viewMode: 2,
        dragMode: 'move',
        dragCrop: false,
        autoCropArea: 0.7,
        restore: true,
        rotable: true,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        //minContainerWidth: 480,
        minContainerHeight: 600,
    }

    var originalImageURL = $img.src;
    var uploadedImageType = 'image/jpeg';
    var uploadedImageName = 'cropped.jpg';
    var uploadedImageURL;

    if (!document.createElement('canvas').getContext) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    // Methods
    function methods(cropper, actions) {
        actions.querySelector('.docs-buttons').onclick = function (event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            var cropped;
            var result;
            var data;

            if (!cropper) {
                return;
            }

            while (target !== this) {
                if (target.getAttribute('data-method')) {
                    break;
                }

                target = target.parentNode;
            }

            if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
                return;
            }

            data = {
                method: target.getAttribute('data-method'),
                mode: image.getAttribute('data-mode'),
                target: target.getAttribute('data-target'),
                option: target.getAttribute('data-option') || undefined,
                secondOption: target.getAttribute('data-second-option') || undefined
            };

            cropped = cropper.cropped;

            if (data.method) {

                switch (data.method) {
                    case 'rotate':
                        if (cropped && options.viewMode > 0) {
                            cropper.clear();
                        }

                        break;

                    case 'getCroppedCanvas':
                        try {
                            data.option = JSON.parse(data.option);
                        } catch (e) {
                            console.log(e.message);
                        }

                        if (uploadedImageType === 'image/jpeg') {
                            if (!data.option) {
                                data.option = {};
                            }

                            data.option.fillColor = '#fff';
                        }

                        break;
                }

                result = cropper[data.method](data.option, data.secondOption);
                switch (data.method) {
                    case 'getCroppedCanvas':
                        if (result && data.mode == "primary") {
                            // Destroy the existing croppers (crop/mask/edit) 
                            // Add the result image to crop modal
                            editModal.modal().find('.modal-body').html(result);
                            // Add the result to edit modal
                            // Add the result to mask modal
                        }
                        break;
                }
            }
        };

        document.body.onkeydown = function (event) {
            var e = event || window.event;

            if (e.target !== this || !cropper || this.scrollTop > 300) {
                return;
            }

            switch (e.keyCode) {
                case 37:
                    e.preventDefault();
                    cropper.move(-1, 0);
                    break;

                case 38:
                    e.preventDefault();
                    cropper.move(0, -1);
                    break;

                case 39:
                    e.preventDefault();
                    cropper.move(1, 0);
                    break;

                case 40:
                    e.preventDefault();
                    cropper.move(0, 1);
                    break;
            }
        };

    };



    // Create Cropper
    // create primary
    // on crop/mask modal show create secondary
    // on edit modal show create edit
    var newCropper = new Cropper(image, options);

    $('#cropperModal').on('shown.bs.modal', function () {

        var $image = document.getElementById('cropimage');
        modalCropper = new Cropper($image, {
            dragMode: 'move',
            autoCropArea: 0.75,
            cropBoxMovable: false,
            ready: function () {
                //Should set crop box data first here
                modalCropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
            }
        });
    }).on('hidden.bs.modal', function () {
        cropBoxData = modalCropper.getCropBoxData();
        canvasData = modalCropper.getCanvasData();
        modalCropper.destroy();
    });

    methods(newCropper, doc_actions);

    editModal.on('shown.bs.modal', function () {

        // destroy the old cropper.js instance if one exists
        if (image.cropper === 'object') {
            image.cropper.destroy();
        }
        var cropper2 = new Cropper(editimage, cropperOptions);
        methods(cropper2, edit_actions);
    }).on('hidden.bs.modal', function () {
        cropper2.destroy();
    });

}