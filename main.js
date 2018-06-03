


(function($) {
    "use strict";
    $(document).ready(function () {

        var year = new Date().getFullYear();
        $('.year').append(year);

        // Set the Access Token
        var accessToken = '2865fd485e757f3f12c81bc63e591bdc598353493cd1eb622e250fae6109d33f';
        var userID = 'builtbydezine';
        var behanceApiKey = 'mi5pbmpy0xX6lYkhyfZBtaR70SkEeGZn';

        // Call Dribble v2 API
        $.ajax({
            url: 'https://api.dribbble.com/v2/user/shots?per_page=100&access_token=' + accessToken,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                if (data.length > 0) {
                    $.each(data.reverse(), function (i, val) {
                        $('#dribbble').prepend(
                            '<a class="shot" target="_blank" rel= "noopener" href="' + val.html_url + '" title="' + val.title + '"><div class="title">' + val.title + '</div><img src="' + val.images.hidpi + '" title="' + val.title + '"/></a>'
                        )
                    })
                }
                else {
                    $('#dribbble').append('<p>No shots yet!</p>');
                }
            }
        });

        // Call Behance Dev API
        $.ajax({
            url: 'https://api.behance.net/v2/users/' + userID + '/projects?per_page=100&callback=?&client_id=' + behanceApiKey,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                var myProjects = data.projects;
                if (myProjects.length > 0) {
                    $.each(myProjects.reverse(), function (i, val) {
                        $('#behance').prepend(
                            '<a class="shot" target="_blank" rel= "noopener" href="' + val.url + '" title="' + val.name + '"><div class="title">' + val.name + '</div><img src="' + val.covers[404] + '" alt="' + val.name + '"/></a>'
                        )
                    })
                }
                else {
                    $('#behance').append('<p>Behance Says, No shots yet!</p>');
                }
            }
        });

        $('a[data-mail]').on('click', function (e) {
            e.preventDefault();
            var domain = 'gmail.com';
            window.location = 'mailto:' + $(this).data('mail') + '@' + domain.substring(0) + '?subject=Work Enquiry';
        });


        var body = $("body");
        setTimeout(function () {
            body.addClass("loaded")
        }, 150);
        var shotContainer = $(".shot");
        $.each(shotContainer, function (b, c) {
            var $this = $(this);
            $this.imagesLoaded(function () {
                setTimeout(function () {
                    $this.addClass("loaded")
                }, 50 + 150 * b)
            })
        });
    })

   

    $(window).on('load', function () {
        // will first fade out the loading animation
        $(".loader-wrapper").fadeOut();
        // will fade out the whole DIV that covers the website.
        $(".preloader").delay(1000).fadeOut("slow");
    });
    
})(window.jQuery);
