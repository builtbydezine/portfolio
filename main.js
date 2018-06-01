! function(a) {
    "use strict";
    a(document).ready(function() {
        function b() {
            window.location = i
        }
        var e = a(".site-title"),
            f = a("body");
        setTimeout(function() {
            f.addClass("loaded")
        }, 150);
        var i;
        a("a").on("click", function(a) {
            return "" == this.href || null == this.href ? void a.preventDefault() : void(-1 == this.href.indexOf("#") && -1 == this.href.indexOf("mailto:") && -1 == this.href.indexOf("javascript:") && "_blank" != this.target && (a.preventDefault(), i = this.href, f.removeClass("loaded"), setTimeout(b, 250)))
        })
    })
}(window.jQuery);

 // Set the Access Token
var accessToken = '2865fd485e757f3f12c81bc63e591bdc598353493cd1eb622e250fae6109d33f';
var userID = 'builtbydezine';
var behanceApiKey = 'mi5pbmpy0xX6lYkhyfZBtaR70SkEeGZn';

// Call Dribble v2 API
$.ajax({
    url: 'https://api.dribbble.com/v2/user/shots?access_token='+accessToken,
    dataType: 'json',
    type: 'GET',
    success: function(data) {  
      if (data.length > 0) { 
        $.each(data.reverse(), function(i, val) {                
          $('#dribbble').prepend(
            '<a class="shot" target="_blank" href="'+ val.html_url +'" title="' + val.title + '"><div class="title">' + val.title + '</div><img src="'+ val.images.hidpi +'"/></a>'
            )
        })
      }
      else {
        $('#dribbble').append('<p>Dribbble says, No shots yet!</p>');
      }
    }
});
var size = '202';

// Call Behance Dev API
$.ajax({
    url: 'https://api.behance.net/v2/users/builtbydezine/projects?client_id=mi5pbmpy0xX6lYkhyfZBtaR70SkEeGZn',
    dataType: 'json',
    type: 'GET',
    success: function(data) {  
      if (data.length > 0) { 
        $.each(data.reverse(), function(i, val) {                
          $('#behance').prepend(
            '<a class="shot" target="_blank" href="'+ val.projects.url +'" title="' + val.projects.name + '"><div class="title">' + val.projects.name + '</div><img src="'+ val.covers[404] +'"/></a>'
            )
        })
      }
      else {
        $('#behance').append('<p>Behance says, No shots yet!</p>');
      }
    }
});


// API Variables

//Image width 800x600 (Animated)
  // val.images.hidpi 
//Image width 400x300
  // val.images.normal
//Image width 200x150
  // val.images.teaser
//Title
  // val.title
//Description
  // val.description
//URL
  // val.html_url





  
