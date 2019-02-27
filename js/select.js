let node1 = document.getElementById('node1');
let icon1 = document.getElementById('font-icon-1');
node1.addEventListener("click", highlight1);
icon1.addEventListener("click", highlight1);
var clicked = false
function highlight1(){
    if(!clicked){
        node1.style = "cursor:pointer"
        icon1.style = "cursor:pointer"
        var txt1 = document.getElementById('brain');
        txt1.style = "opacity:1.0"
        var g1 = document.getElementById('Layer01');
        var c = g1.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }
        
    }else{
    var g1 = document.getElementById('Layer01');
    var txt1 = document.getElementById('brain');
    txt1.style = "opacity:0.61"
    var c = g1.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked = !clicked
}

//好蠢啊！！但是传参数有bug啊！等我闲了再调吧 ；（
let node2 = document.getElementById('node2');
let icon2 = document.getElementById('font-icon-2');
node2.addEventListener("click", highlight2);
icon2.addEventListener("click", highlight2);
var clicked2 = false
function highlight2(){
    if(!clicked2){
        node2.style = "cursor:pointer"
        icon2.style = "cursor:pointer"
        var txt2 = document.getElementById('eyes');
        txt2.style = "opacity:1.0"
        var g2 = document.getElementById('Layer02');
        var c = g2.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }

    }else{
    var g2 = document.getElementById('Layer02');
    var txt2 = document.getElementById('eyes');
    txt2.style = "opacity:0.61"
    var c = g2.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked2 = !clicked2
}

let node3 = document.getElementById('node3');
let icon3 = document.getElementById('font-icon-3');
console.log(icon3)
node3.addEventListener("click", highlight3);
icon3.addEventListener("click", highlight3);
var clicked3 = false
function highlight3(){
    if(!clicked3){
        node3.style = "cursor:pointer"
        icon3.style = "cursor:pointer"
        var txt3 = document.getElementById('skin');
        txt3.style = "opacity:1.0"
        var g3 = document.getElementById('Layer03');
        var c = g3.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }

    }else{
    var g3 = document.getElementById('Layer03');
    var txt3 = document.getElementById('skin');
    txt3.style = "opacity:0.61"
    var c = g3.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked3 = !clicked3
}

let node4 = document.getElementById('node4');
let icon4 = document.getElementById('font-icon-4');
console.log(icon3)
node4.addEventListener("click", highlight4);
icon4.addEventListener("click", highlight4);
var clicked4 = false
function highlight4(){
    if(!clicked4){
        node4.style = "cursor:pointer"
        icon4.style = "cursor:pointer"
        var txt4 = document.getElementById('digestion');
        txt4.style = "opacity:1.0"
        var g4 = document.getElementById('Layer04');
        var c = g4.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }

    }else{
    var g4 = document.getElementById('Layer04');
    var txt4 = document.getElementById('digestion');
    txt4.style = "opacity:0.61"
    var c = g4.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked4 = !clicked4
}



let node5 = document.getElementById('node5');
let icon5 = document.getElementById('font-icon-5');
node5.addEventListener("click", highlight5);
icon5.addEventListener("click", highlight5);
var clicked5 = false
function highlight5(){
    if(!clicked5){
        node5.style = "cursor:pointer"
        icon5.style = "cursor:pointer"
        var txt5 = document.getElementById('anti');
        txt5.style = "opacity:1.0"
        var g5 = document.getElementById('Layer05');
        var c = g5.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }

    }else{
    var g5 = document.getElementById('Layer05');
    var txt5 = document.getElementById('anti');
    txt5.style = "opacity:0.61"
    var c = g5.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked5 = !clicked5
}

let node6 = document.getElementById('node6');
let icon6 = document.getElementById('font-icon-6');
node6.addEventListener("click", highlight6);
icon6.addEventListener("click", highlight6);
var clicked6 = false
function highlight6(){
    if(!clicked6){
        node6.style = "cursor:pointer"
        icon6.style = "cursor:pointer"
        var txt6 = document.getElementById('strong');
        txt6.style = "opacity:1.0"
        var g6 = document.getElementById('Layer06');
        var c = g6.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }

    }else{
    var g6 = document.getElementById('Layer06');
    var txt6 = document.getElementById('strong');
    txt6.style = "opacity:0.61"
    var c = g6.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked6 = !clicked6
}

let node7 = document.getElementById('node7');
let icon7 = document.getElementById('font-icon-7');
node7.addEventListener("click", highlight7);
icon7.addEventListener("click", highlight7);
var clicked7 = false
function highlight7(){
    if(!clicked7){
        node7.style = "cursor:pointer"
        icon7.style = "cursor:pointer"
        var txt7 = document.getElementById('immune');
        txt7.style = "opacity:1.0"
        var g7 = document.getElementById('Layer07');
        var c = g7.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }

    }else{
    var g7 = document.getElementById('Layer07');
    var txt7 = document.getElementById('immune');
    txt7.style = "opacity:0.61"
    var c = g7.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked7 = !clicked7
}

let node8 = document.getElementById('node8');
let icon8 = document.getElementById('font-icon-8');
node8.addEventListener("click", highlight8);
icon8.addEventListener("click", highlight8);
var clicked8 = false
function highlight8(){
    if(!clicked8){
        node8.style = "cursor:pointer"
        icon8.style = "cursor:pointer"
        var txt8 = document.getElementById('heart');
        txt8.style = "opacity:1.0"
        var g8 = document.getElementById('Layer08');
        var c = g8.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }

    }else{
    var g8 = document.getElementById('Layer08');
    var txt8 = document.getElementById('heart');
    txt8.style = "opacity:0.61"
    var c = g8.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked8 = !clicked8
}

let node9 = document.getElementById('node9');
let icon9 = document.getElementById('font-icon-9');
node9.addEventListener("click", highlight9);
icon9.addEventListener("click", highlight9);
var clicked9 = false
function highlight9(){
    if(!clicked9){
        node9.style = "cursor:pointer"
        icon9.style = "cursor:pointer"
        var txt9 = document.getElementById('lower');
        txt9.style = "opacity:1.0"
        var g9 = document.getElementById('Layer09');
        var c = g9.childNodes;
        num = c.length
        for(var i = 0; i< num -1; i++){
            if(i%2 !== 0){
                c[i].style = "stroke-width:3px;stroke: #fff"
            }
        }

    }else{
    var g9 = document.getElementById('Layer09');
    var txt9 = document.getElementById('lower');
    txt9.style = "opacity:0.61"
    var c = g9.childNodes;
    num = c.length
    for(var i = 0; i< num -1; i++){
        if(i%2 !== 0){
            c[i].style = "stroke-width:2px"
        }
    }
    }
    clicked9 = !clicked9
}

$(".selectBox").change(function() {
    let selected = $('select.selectBox').val()
    let lowGI = $('text[data-id="lowGI"]')
    let lowGI2 = $('tspan[data-id="lowGI"]')
    let mediumGI = $('text[data-id="mediumGI"]')
    let highGI = $('text[data-id="highGI"]')
console.log('111'+lowGI)
    if(selected == 1){
        $(".select-dropdown").removeClass('active1 active2 active3 active4')
        $(".select-dropdown").addClass('active1')
        lowGI.addClass('greenTxt')
        lowGI2.addClass('greenTxt')
        mediumGI.removeClass('yellowTxt')
        highGI.removeClass('redTxt')
    }else if(selected == 2){
        console.log('medium GI')
        $(".select-dropdown").removeClass('active1 active2 active3 active4')
        $(".select-dropdown").addClass('active2')
        mediumGI.addClass('yellowTxt')
        lowGI.removeClass('greenTxt')
        lowGI2.removeClass('greenTxt')
        highGI.removeClass('redTxt')

    }else if(selected == 3){
        console.log('high GI')
        $(".select-dropdown").removeClass('active1 active2 active3 active4')
        $(".select-dropdown").addClass('active3')
        highGI.addClass('redTxt')
        lowGI.removeClass('greenTxt')
        lowGI2.removeClass('greenTxt')
        mediumGI.removeClass('yellowTxt')

    }else if(selected ==4 ){
        console.log('none')
        $(".select-dropdown").removeClass('active1 active2 active3 active4')
        $(".select-dropdown").addClass('active4')
        lowGI.removeClass('greenTxt')
        lowGI2.removeClass('greenTxt')
        mediumGI.removeClass('yellowTxt')
        highGI.removeClass('redTxt')

    } 
});