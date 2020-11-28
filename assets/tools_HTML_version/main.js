$(document).ready(function () {
  //$('[data-toggle="tooltip"]').tooltip();

  // Change the selector if needed
  var $table = $(".scroll-table");
    $bodyCells = $table.find("tbody tr:first").children(),
    colWidth;

  // Adjust the width of thead cells when window resizes
  $(window)
    .resize(function() {
      // Get the tbody columns width array
      colWidth = $bodyCells
        .map(function() {
          return $(this).width();
        })
        .get();

      // Set the width of thead columns
      $table
        .find("thead tr")
        .children()
        .each(function(i, v) {
          $(v).width(colWidth[i]);
        });
    })
    .resize(); // Trigger resize handler

  

    //Add the modified thead
    tableHead = $table
      .find("thead")
      .clone()
      .addClass("fixed-header");
    $table.prepend(tableHead);

  $(".toggle-sidemodal a").on("click", function (e) {
    e.preventDefault();
    $(".sidemodal").toggleClass("shown");
  });





var content = ['<table class="table"><tbody><tr><td>User Address</td><td># 30, Sanjeevini Nagar, 560091, Bangalore, Karnataka</td></tr>','<tr><td>Aadhaar Address</td><td># 10 devalapura hobli, nagamangala taluk,haradanahalli,mandya</td></tr></tbody></table>'].join('');


$('body').popover({
  selector: '[data-rel=extra-info]',
  trigger: 'hover',
  content : content,
  placement: "right",
  html: true
});

$('.offcanvas-links a').click(function (e) {
  e.preventDefault();
  $('a[href="' + $(this).attr('href') + '"]').tab('show');
})




  $(".clickable-row").on("click", "tr", function (e) {
    // prevent the event in case an actionable element within row is triggered
    if ($(e.target).is("a,input,button"))
      return;
    // get the URL
    var link = $(this).data('url');
    // check if link is present
    if (typeof link !== typeof undefined && link !== false) {
      // check if ctrl/cmd key are pressed
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        // open in new tab
        window.open(link, '_blank');
      } else {
        // open in same tab
        window.location = link;
      }
    }
  });


});


fixedTableHeader(document.querySelector('.scroll-table'));
