// image is 888in  x 360in
// image is 2663px x 1079px
// image x to field x=0: 99.125in
// image y to field y=0: 21.5

// 2663 / 888 = 2.998
// 1079 / 360 = 2.997


var imageWidthPx = 2663;   
var imageHeightPx = 1079;

var imageWidthIn = 888;
var imageHeightIn = 360; 

// Offset from edge of image to y=x=0 on coordinate system
var xOffsetInch = 99.125;
var yOffsetInch = 21.5;

// multiplier for inches to desired end units
var inchToUnits = 0.0254; // CURRENTLY METERS




//// CONVERSION FACTORS ////
// given unit * (desired unit / given unit)

// multiplier to convert from pixels to inches
var in2pxRatio = imageWidthPx / imageWidthIn 
var px2inRatio = imageWidthIn / imageWidthPx

//// OFFSETS ////
// Offset from edge of image to y=x=0 on coordinate system
var xZeroOffset = xOffsetInch * in2pxRatio;
var yZeroOffset = yOffsetInch * in2pxRatio;

// Coordinate system with center at 0,0
if (false) {
    xZeroOffset = imageWidthPx / 2;
    yZeroOffset = imageHeightPx / 2;
}

$(".hover-container").on("mousemove", function(e) {

    //// BOX AROUND CURSOR ////
    // Find the robot's width in pixels
    var robotWidthInch = 27.5; // width of square in inches
    robotWidth = robotWidthInch * in2pxRatio;

    var parentOffset = $(this).parent().offset();
    //or $(this).offset(); if you really just want the current element's offset
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    var picHeight = $('.hover-image').height();
    var picWidth = $('.hover-image').height();
    $('.hover-image')
    .css("left", relX - (robotWidth/2) + "px")
    .css("top", relY - (robotWidth/2) + "px")


    //// CALCULATE COORDINATES ////

    // var x = event.pageX - this.offsetLeft;
    // var y = event.pageY - this.offsetTop;
    var parentOffset = $(this).parent().offset();
    var x = event.pageX - parentOffset.left;
    var y = event.pageY - parentOffset.top;

    // Offset (0,0)
    x -= xZeroOffset;
    y += yZeroOffset - imageHeightPx; // start from bottom

    y *= -1; // invert y
    
    // Convert from our image's pixels to real world units
    var xInch = x * px2inRatio; 
    var yInch = y * px2inRatio;


    var xUnit = Math.round(xInch * inchToUnits * 100) / 100;
    var yUnit = Math.round(yInch * inchToUnits * 100) / 100;

    xInch = Math.round(xInch * 100) / 100; // round to 2 decimal places
    yInch = Math.round(yInch * 100) / 100;




    document.getElementById("X").value="X: ".concat(xInch);
    document.getElementById("Y").value="Y: ".concat(yInch);
    document.getElementById("X2").value="X2: ".concat(xUnit);
    document.getElementById("Y2").value="Y2: ".concat(yUnit);

    document.documentElement.style.setProperty('--box-width', robotWidthInch + "px");
    document.documentElement.style.setProperty('--inch2px', in2pxRatio);


    // alert("X Coordinate: " + x + " Y Coordinate: " + y);
});