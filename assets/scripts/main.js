$(document).ready(function () {

    var header = $(".navbar");
    if (header.hasClass('fixed-top')) {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 1) {
                header.addClass("scrolled");
            } else {
                header.removeClass("scrolled");
            }
        });
    }



    // Set the Access Token
    var accessToken = '2865fd485e757f3f12c81bc63e591bdc598353493cd1eb622e250fae6109d33f';

    // Call Dribble v2 API
    $.ajax({
        url: 'https://api.dribbble.com/v2/user/shots?per_page=100&access_token=' + accessToken,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                $.each(data.reverse(), function (i, val) {
                    $('#dribbble').prepend(
                        '<div class="shot"><a target="_blank" rel= "noopener" href="' + val.html_url + '" title="' + val.title + '"><img src="' + val.images.hidpi + '" title="' + val.title + '"/></a></div>'
                    )
                })
                $(".owl-carousel").owlCarousel({
                    center: true,
                    items: 2,
                    loop: true,
                    margin: 20,
                    autoplay:true,
                });
            } else {
                $('#dribbble').append('<p>No shots yet!</p>');
            }
        }
    });


    $('#authentication').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var articleID = button.data('uid')
        var modal = $(this)
        modal.find('.modal-body input.article-id').val(articleID);
    });

    $(".form-submit").click(function () {
        var postId = $("#article-id").val();
        var password = $("#password").val();
        if (password == '1234') {
            if (postId == 'kiosk') {
                window.location.href = "https://medium.com/@gptparth/the-story-of-kiosk-9236b6f61eb9";
            } else if (postId == 'perfios') {
                window.location.href = "https://medium.com/@gptparth/improving-the-funnel-perfios-comprehension-b677b0ee6392";
            } else {
                alert('Something went wrong')
            }

        } else {
            alert('Wrong Password!');
        }
    });

    $(".nav-link").click(function () {
        var linkSection = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(linkSection).offset().top
        }, 800);
    });




    function scrollFn() {

        var targetOffset = $("main").offset().top;
        var w = $(window).scrollTop();
        if (w > targetOffset - 200) {
            $("body").addClass("scrolled-color");
        } else {
            $("body").removeClass("scrolled-color");
        }
    };
    $(window).on('scroll', scrollFn);

    $('a[data-mail]').on('click', function (e) {
        var subj = $(this).attr("data-subject");
        e.preventDefault();
        var domain = 'gmail.com';
        window.location = 'mailto:' + $(this).data('mail') + '@' + domain.substring(0) + '?subject=' + subj + ' ';
    });


    // $(".case-study .owl-carousel").owlCarousel({
    //     center: true,
    //     items: 1,
    //     margin: 80,
    //     lazyLoad: true,
    //     loop: true,
    //     nav: true,
    //     navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    //     video: true,
    //     dots: false
    // });
});