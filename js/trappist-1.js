var going,units,conversion,config,time;
function init(){
    going = false;
    units = ' km';
    conversion = 1;
    config = {minimumFractionDigits : 0, maximumFractionDigits: 0}
    updateDistance();
}
function goBack() {
    window.history.back();
}
function goto(input){
    var position;
    switch(input) {
        case 'A':
            position = '#atext'
            break;
        case 'B':
            position = '#btext'
            break;
        case 'C':
            position = '#ctext'
            break;
        case 'D':
            position = '#dtext'
            break;
        case 'E':
            position = '#etext'
            break;
        case 'F':
            position = '#ftext'
            break;
        case 'G':
            position = '#gtext'
            break;
        case 'H':
            position = '#htext'
            break;
        case 'M':
            position = '#mtext'
            break;
        case 'T':
            position = '#earthtext'
            break;
    }
    $('html, body').animate({scrollLeft: $(position).offset().left}, 800);
}

function updateDistance(){
    var px = (window.pageXOffset - $('#solarsystem').position().left) - 1000;
    if(px < 0)px=0;
    $('#distance').text(Number(px * 320 * conversion).toLocaleString(undefined,config) + units)
}
$(window).scroll(updateDistance);

function changedistance(){
    switch(units) {
        case ' km':
            units = ' mi'
            conversion = 0.621371
            break;
        case ' mi':
            units = ' px'
            conversion = 1/320;
            break;
        case ' px':
            units = ' earths'
            conversion = 1/40000;
            config = {minimumFractionDigits : 2, maximumFractionDigits: 2}
            break;
        case ' earths':
            units = ' au'

            conversion = 1/149597870;
            config = {minimumFractionDigits : 8, maximumFractionDigits: 8}
            break;
        case ' au':
            units = ' ly'
            conversion = 1/9460730472580;
            config = {minimumFractionDigits : 10, maximumFractionDigits: 10}
            break;
        case ' ly':
            units = ' horses'
            conversion = 416.66
            config = {minimumFractionDigits : 0, maximumFractionDigits: 0}
            break;
        case ' horses':
            units = ' km'
            conversion = 1
            break;
        default:
            units = ' km'
            conversion = 1
    }
    updateDistance();
}
function lightspeed(){
    going = !going;
    if(going){
        $("#time").css({visibility: 'visible'})
    }
    else{
        $("#time").css({visibility: 'hidden'})
    }
    time = new Date().getTime();
    speed();
}
function speed(){
    $('html, body').scrollLeft(window.pageXOffset + 30);
    $('#time').text(gettime());
    if(going){
        setTimeout(speed, 30)
    }
}
function gettime(){
    holder = (new Date().getTime() - time )/1000
    if( Math.floor(holder/60 >= 1)){

        return (Math.floor(holder/60)).toLocaleString(undefined, {minimumFractionDigits : 0, maximumFractionDigits: 0}) + " m " + (Math.floor(holder % 60)).toLocaleString(undefined, {minimumFractionDigits : 0, maximumFractionDigits: 0}) + " s"
    }
    else{
        return (Math.floor(holder % 60)).toLocaleString(undefined, {minimumFractionDigits : 0, maximumFractionDigits: 0}) + " s"
    }
}
function switchstar(){
    if ($("#a").width() == '500'){
        $("#a").css({fill: '#fde301',width:4350,height:4350})
        $("#awrap").css({left: -2138, top: -2077})
    }
    else{
        $("#a").css({fill: '#ff3422'})
        $("#a").css({fill: '#ff3422',width:500,height:500})
        $("#awrap").css({left: -250, top: -175})
    }
}
