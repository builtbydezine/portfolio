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
            } else if(postId == 'perfios') {
                window.location.href = "https://medium.com/@gptparth/improving-the-funnel-perfios-comprehension-b677b0ee6392";
            } else {
                alert('Something went wrong')
            }

        } else {
                alert('Wrong Password!');
            }
    });

    $(".nav-link").click(function() {
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


    $(".case-study .owl-carousel").owlCarousel({
        center: true,
        items: 1,
        margin: 80,
        lazyLoad: true,
        loop: true,
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        //navContainer: '.custom-nav',
        video: true,
        dots: false
    });
});