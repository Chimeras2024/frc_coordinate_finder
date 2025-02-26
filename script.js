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
    var robotWidthInch = 32; // width of square in inches
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




    document.getElementById("X").value="Xin: ".concat(xInch);
    document.getElementById("Y").value="Yin: ".concat(yInch);
    document.getElementById("X2").value="Xm: ".concat(xUnit);
    document.getElementById("Y2").value="Ym: ".concat(yUnit);

    document.documentElement.style.setProperty('--box-width', robotWidthInch + "px");
    document.documentElement.style.setProperty('--inch2px', in2pxRatio);


    // alert("X Coordinate: " + x + " Y Coordinate: " + y);
});

function promptPoint(){
    var xy=prompt("X and Y coordinate in meters","0");
    xy = xy.split(" ");
    var x = parseFloat(xy[0]);
    var y = parseFloat(xy[1]);
    if (x!=null && y!=null) {
        makeDot(x* 1/inchToUnits, y* 1/inchToUnits, 15);    
    } else {
        alert("error")
    }
}

window.addEventListener('keydown', function(event) {
    if (event.key == "p") {
        promptPoint()
    }
});


// makeDot(300,300, 30);
// makeDot(0,0, 30);

var pointsx = [];
pointsx[0] = 3.14;
pointsx[1] = 3.155;
pointsx[2] = 3.775;
pointsx[3] = 4.04;
pointsx[4] = 5.185;
pointsx[5] = 5.438;
pointsx[6] = 5.96;
pointsx[7] = 5.945;
pointsx[8] = 5.324;
pointsx[9] = 5.05;
pointsx[10] = 3.914;
pointsx[11] = 3.66;
// pointsx[12] = 17.55/2;

var pointsy = [];
pointsy[0] = 4.13;
pointsy[1] = 3.83;
pointsy[2] = 2.86;
pointsy[3] = 2.73;
pointsy[4] = 2.78;
pointsy[5] = 2.95;
pointsy[6] = 3.97;
pointsy[7] = 4.27;
pointsy[8] = 5.23;
pointsy[9] = 5.368;
pointsy[10] = 5.311;
pointsy[11] = 5.148;
// pointsy[12] = 8.05/2;

// Display points around red reef
// for (let i = 0; i < pointsx.length; i++) {
//     makeDot(pointsx[i] * 1/inchToUnits, pointsy[i] * 1/inchToUnits, 15);
// }


// Create a dot on the map, coordinates in inches.
function makeDot(x, y, w) {
    x *= in2pxRatio;
    y *= in2pxRatio;

    x += xZeroOffset;
    y += yZeroOffset;

    const dot = document.createElement('div');
    dot.style.width = w+'px';
    dot.style.height = w+'px';
    dot.style.backgroundColor = 'white';
    dot.style.borderRadius = '50%';
    dot.style.position = 'absolute';
    dot.style.left = x - (w/2) + 'px';
    dot.style.top = document.documentElement.scrollHeight - y - (w) + 'px';
    // dot.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(dot);
    return dot;
}