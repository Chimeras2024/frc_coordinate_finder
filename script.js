
// $(".hover-container").on("click", function(event) {
// });
function calcCoords(event) {
    // var x = event.pageX - this.offsetLeft;
    // var y = event.pageY - this.offsetTop;
    var parentOffset = $(this).parent().offset();
    var x = event.pageX - parentOffset.left;
    var y = event.pageY - parentOffset.top;

    x -= 960; // make center the origin
    y -= 388.5;
    
    x *= 0.4625; // multiplier for pixel to inch conversion
    y *= 0.4625;

    y *= -1; // invert y

    x = Math.round(x * 100) / 100 // round to 2 decimal places
    y = Math.round(y * 100) / 100


    document.getElementById("X").value="X: ".concat(x);
    document.getElementById("Y").value="Y: ".concat(y);

    // alert("X Coordinate: " + x + " Y Coordinate: " + y);
}

$(".hover-container").on("mousemove", function(e) {
    var size = 46; // width of square in pixels (div inches by 0.4625 to get this value)
    var parentOffset = $(this).parent().offset();
    //or $(this).offset(); if you really just want the current element's offset
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    var picHeight = $('.hover-image').height();
    var picWidth = $('.hover-image').height();
    $('.hover-image')
    .css("left", relX - (size/2) + "px")
    .css("top", relY - (size/2) + "px")
    .css("background-position", (picWidth - relX - (size/2)) + "px " +
      (picHeight - relY - (size/2)) + "px")

    calcCoords(e);
});