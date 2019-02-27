if(nutriPercent){
// 1.tool function
//create DOM element
function tag(tagName){
    return document.createElement(tagName);
}

function createPopUp1(entID){
    var div = tag('div');
    div.id = entID
    var title = tag('h2');
    title.id = 'nutriName'
    title.innerHTML = '';
    div.appendChild(title);
    var content = tag('p');
    content.id = 'nutriPercent'
    content.innerHTML = '';
    div.appendChild(content);

    var desc = tag('h4');
    desc.textContent = 'Inner Radius - ';
    div.appendChild(desc);

    var desc2 = tag('h4');
    desc2.textContent = 'Food Containment/Daily Intake Percentage';
    div.appendChild(desc2);

    var desc = tag('h4');
    desc.textContent = 'Outer Radius - ';
    div.appendChild(desc);

    var desc2 = tag('h4');
    desc2.textContent = 'Percentage of Various Nutrients Required Daily';
    div.appendChild(desc2);

    return div;
}

//create popup_left, enter div's id via para1
function createPopUp2(entID){
    var div = tag('div');
    div.id = entID;
    var divImg = tag('div');
    divImg.className = 'divImg';
    divImg.id = 'divImg'
    divImg.style.background = "";
    // console.log(divImg);
    div.appendChild(divImg);

    var title = tag('h3');
    title.id = 'gi-level'
    title.textContent = 'GI Level';
    div.appendChild(title);
    var content = tag('p');
    content.id = 'gi-level-value'
    content.textContent = '';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);

    var title = tag('h3');
    title.id = 'color'
    title.textContent = 'COLOR';
    div.appendChild(title);
    var content = tag('p');
    content.textContent = '';
    content.id = 'color-value'
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    
    var title = tag('h3');
    title.textContent = 'CATEGORY';
    title.id = 'category'
    div.appendChild(title);
    var content = tag('p');
    content.id = 'category-value'
    content.textContent = '';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    // console.log(div);

    var title = tag('h3');
    title.textContent = 'AMOUNT PER DAY';
    title.id = 'amount'
    div.appendChild(title);
    var content = tag('p');
    content.textContent = '';
    content.id = 'amount-value'
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    // console.log(div);

    return div;
}
function changeText2(info1,info2,info3,info4,info5){
    var dom1 = document.getElementById('gi-level-value');
    var dom2 = document.getElementById('color-value');
    var dom3 = document.getElementById('category-value');
    var dom4 = document.getElementById('amount-value');
    var dom5 = document.getElementById('divImg')
    dom1.innerHTML = info1
    dom2.innerHTML = info2
    dom3.innerHTML = info3
    dom4.innerHTML = info4
    dom5.style = info5
}

//draw ring chart, and set svg's id via entId



function drawRingchart(entId,index){
    // console.log(index)

 
    // console.log(value)
    var width = 460,
        height = 300,
        cwidth = 30;

    var color = d3.scale.category20c();

    var pie = d3.layout.pie()
        .sort(null);

    var arc = d3.svg.arc();
    var svg = d3.select("#popup_left").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('class','ringChart')
        .attr("id", entId)
        .append("g")
        .attr("transform", "translate(" + (-80 + width / 3) + "," + (height / 3 -10) + ")")

    var gs = svg.selectAll("g").data(d3.values(nutriPercent[index])).enter().append("g");
    var path = gs.selectAll("path")
        .data(function(d) { return pie(d); })
        .enter().append("path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", function(d, i, j) { return arc.innerRadius(16+cwidth*j).outerRadius(cwidth*(j+1))(d); });

    function drawRect(){
        var data2 = [
            {'name':'Carbohydrate(sugar)'},
            {'name':'Total fat'},
            {'name':'Protein'},
            {'name':'Mineral Substance'},
            {'name':'Fiber'},
            {'name':'Other'},
        ]
        // var data2 = [1,2,3,4,5,6]
        var w = 300;
        var h = 100;
        var gs2 = svg.selectAll("g").data(d3.values(data2)).enter().append("g");
        var rectangle = gs2.selectAll('rect')
                            .data(data2)
                            .enter()
                            .append("rect")
                            .attr("y", function(d, i) {
                                return (i * 18) - 50;  //Bar width of 20 plus 1 for padding
                            })
                            .attr("x", 80)
                            .attr("width", 16)
                            .attr("height", 6)
                            .attr("fill", function(d, i) { return color(i); });
        var text =gs2.selectAll('text')
                    .data(data2)
                    .enter()
                    .append('text')
                    .text(function(d,i) {
                        return data2[i].name;
                })
                .attr("y", function(d, i) {
                    return -45 +i * (w / data2.length)/2.7;
            })
            .attr("x", function(d) {
                    return 100 ;
            })
            .style("fill","#525e6a")
        }
        drawRect();

    return svg

}

//position popup window to certain div as my icon, the popup will appear when the mouse hover at "myicon",
//while whichpop determines which kind of popup to choose: popup_left or popup_down
function positionPopUp(entID,whichpop){
    var myicon = document.getElementById(entID);
    var currentPop = document.getElementById(whichpop);

    function showPopup(evt) {
    
        myicon.style = "cursor:pointer;opacity:0.95";
        
        var iconPos = myicon.getBoundingClientRect();
        if(whichpop == 'popup_left'){
            // console.log(iconPos.right);
            if(iconPos.right < 1200){
                currentPop.style.left = (iconPos.right + 20) + "px";
            }else{
                currentPop.style.left = (iconPos.right - 350) + "px";
            }
            
            currentPop.style.top = (window.scrollY + iconPos.top - 70) + "px";
        }else if(whichpop == 'popup_down'){
            currentPop.style.left = (iconPos.right -144) + "px";
            // console.log(iconPos.top);
            if(iconPos.top<400){
                currentPop.style.top = (window.scrollY + iconPos.top + 24) + "px";
            }else{
                currentPop.style.top = (window.scrollY + iconPos.top - 400) + "px";
            }
            
        }else{
            return;
        }
        currentPop.style.display = "block";
    }
    function hidePopup(evt) {
        if(evt.target.className.baseVal[4] === '-' || evt.target.className.baseVal[3] === '-' || evt.target.className.baseVal === 'st'){
            myicon.style = "opacity:0.6";
        }
       
        currentPop.style.display = "none";

    }
    myicon.addEventListener("mouseover", showPopup);
    myicon.addEventListener("mouseout", hidePopup);

}

function changeText(info1,info2){
    var name = document.getElementById('nutriName');
    var percent = document.getElementById('nutriPercent');
    name.innerText = info1
    percent.innerText = info2
}
function clearText(){
    var name = document.getElementById('nutriName');
    var percent = document.getElementById('nutriPercent');
    name.i=innerText = ''
}

///////////////////////////////////////////////////////////////////////
//2.监听全局点击事件
// var nutriCont = [
//     {'name':'total fat231','percentage':'8%'},
//     {'name':'Protein','percentage':'65%'}
// ]  

// document.onmouseover = function(eee){
//     tarNum = eee.target.className.baseVal;
//     var list=[]
//     switch(tarNum){
//         case 'st54':
//         console.log('first');
//         list=[];
//         list.push(nutriCont[0]);
//         enterCont(list[0].name,list[0].percentage)
//         positionPopUp("myicon",'popup_left');
//         break;
        
//         case 'st60':
//         list=[];
//         list.push(nutriCont[1]);
//         enterCont(list[0].name,list[0].percentage)
//         positionPopUp("myicon2",'popup_left');
//         break;
//     }
        
// }
var pop1 = createPopUp1('popup_left');
document.body.appendChild(pop1);

var pop2 = createPopUp2('popup_down');
document.body.appendChild(pop2);

$(function(){
    $.get('./data/data.json').then(function(response){
        // console.log(response[0].index)
        // console.log(response[0].name)
    $.get('./data/foodInfo.json').then(function(response2){



document.onmouseover = function(eee){
    num = eee.target.className.baseVal
    console.log(num)
    // console.log(num);
    // pop1 = createPopUp1('popup_left');
    let ind=undefined;

    $('#ringchart').remove()
    let lowGI = $('text[data-id="lowGI"]')
    let lowGI2 = $('tspan[data-id="lowGI"]')
    let mediumGI = $('text[data-id="mediumGI"]')
    let highGI = $('text[data-id="highGI"]')
    function init(){
    lowGI.removeClass('greenTxt')
    lowGI2.removeClass('greenTxt')
    mediumGI.removeClass('yellowTxt')
    highGI.removeClass('redTxt')
    }

    function computeVariable(index){
        ind=response[index].ind 
        info1 = response[index].name 
        info2 = response[index].percentage 
        return ind,info1,info2
    }
  
    function computeVariable2(index){
        info1 = response2[index].giLevel
        info2 = response2[index].color
        info3 = response2[index].category
        info4 = response2[index].amount
        info5 = response2[index].url
    }
    switch(num){
        
        case 'st1-014':
        computeVariable(0)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-016':
        computeVariable(1)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-020':
        computeVariable(2)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-025':
        computeVariable(3)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-026':
        computeVariable(4)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-041':
        computeVariable(5)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-018':
        computeVariable(6)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-019':
        computeVariable(7)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-023':
        computeVariable(8)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-180':
        computeVariable(9)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-021':
        computeVariable(10)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-022':
        computeVariable(11)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st1-042':
        computeVariable(12)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-14':
        computeVariable(13)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-20':
        computeVariable(14)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;
        
        case 'st2-25':
        computeVariable(15)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-31':
        computeVariable(16)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-18':
        computeVariable(17)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-19':
        computeVariable(18)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-23':
        computeVariable(19)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-24':
        computeVariable(20)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-180':
        computeVariable(21)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-21':
        computeVariable(22)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-22':
        computeVariable(23)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st2-42':
        computeVariable(24)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-16':
        computeVariable(25)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-20':
        computeVariable(26)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-25':
        computeVariable(27)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-35':
        computeVariable(28)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-31':
        computeVariable(29)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-33':
        computeVariable(30)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-19':
        computeVariable(31)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-23':
        computeVariable(32)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-21':
        computeVariable(33)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st3-22':
        computeVariable(34)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st4-22':
        computeVariable(35)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st5-28':
        computeVariable(36)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st5-16':
        computeVariable(37)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st5-17':
        computeVariable(38)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st5-31':
        computeVariable(39)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st5-22':
        computeVariable(40)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-16':
        computeVariable(41)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-25':
        computeVariable(42)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-32':
        computeVariable(43)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-37':
        computeVariable(44)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-31':
        computeVariable(45)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-30':
        computeVariable(46)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-26':
        computeVariable(47)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-41':
        computeVariable(48)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-19':
        computeVariable(49)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-23':
        computeVariable(50)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-24':
        computeVariable(51)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st6-22':
        computeVariable(52)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-14':
        computeVariable(53)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-20':
        computeVariable(54)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-25':
        computeVariable(55)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-31':
        computeVariable(56)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-30':
        computeVariable(57)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-18':
        computeVariable(58)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-19':
        computeVariable(59)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-23':
        computeVariable(60)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-24':
        computeVariable(61)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-180':
        computeVariable(62)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st7-21':
        computeVariable(63)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st8-28':
        computeVariable(64)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st8-32':
        computeVariable(65)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st8-29':
        computeVariable(66)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st8-36':
        computeVariable(67)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st8-26':
        computeVariable(68)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st8-39':
        computeVariable(69)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st8-18':
        computeVariable(70)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st8-24':
        computeVariable(71)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-14':
        computeVariable(72)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-28':
        computeVariable(73)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-16':
        computeVariable(74)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-36':
        computeVariable(75)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;
        
        case 'st9-26':
        computeVariable(76)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-39':
        computeVariable(77)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-18':
        computeVariable(78)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-19':
        computeVariable(79)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-23':
        computeVariable(80)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-24':
        computeVariable(81)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-18':
        computeVariable(82)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-21':
        computeVariable(83)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st9-22':
        computeVariable(84)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st10-28':
        computeVariable(85)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st10-32':
        computeVariable(86)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st10-29':
        computeVariable(87)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st10-26':
        computeVariable(88)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st10-41':
        computeVariable(89)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st10-19':
        computeVariable(90)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st10-24':
        computeVariable(91)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st11-16':
        computeVariable(92)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st11-31':
        computeVariable(93)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st11-19':
        computeVariable(94)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st11-24':
        computeVariable(95)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st11-22':
        computeVariable(96)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-16':
        computeVariable(97)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-32':
        computeVariable(98)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-29':
        computeVariable(99)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-31':
        computeVariable(100)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-30':
        computeVariable(101)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-26':
        computeVariable(102)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-34':
        computeVariable(103)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-18':
        computeVariable(104)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-19':
        computeVariable(105)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-24':
        computeVariable(106)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-21':
        computeVariable(107)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st12-22':
        computeVariable(108)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st13-16':
        computeVariable(109)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st13-32':
        computeVariable(110)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st13-29':
        computeVariable(111)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st13-31':
        computeVariable(112)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st13-22':
        computeVariable(113)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-28':
        computeVariable(114)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-16':
        computeVariable(115)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-17':
        computeVariable(116)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-32':
        computeVariable(117)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-29':
        computeVariable(118)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-36':
        computeVariable(119)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-30':
        computeVariable(120)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-26':
        computeVariable(121)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-41':
        computeVariable(122)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-19':
        computeVariable(123)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-23':
        computeVariable(124)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-24':
        computeVariable(125)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st14-21':
        computeVariable(126)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;
        
        case 'st14-22':
        computeVariable(127)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-14':
        computeVariable(128)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-20':
        computeVariable(129)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-25':
        computeVariable(130)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-32':
        computeVariable(131)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-36':
        computeVariable(132)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-30':
        computeVariable(133)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-33':
        computeVariable(134)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-26':
        computeVariable(135)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-39':
        computeVariable(136)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-41':
        computeVariable(137)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-18':
        computeVariable(138)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-19':
        computeVariable(139)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-23':
        computeVariable(140)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-24':
        computeVariable(141)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st15-42':
        computeVariable(142)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-14':
        computeVariable(143)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-38':
        computeVariable(144)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-35':
        computeVariable(145)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-36':
        computeVariable(146)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-30':
        computeVariable(147)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-33':
        computeVariable(148)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-26':
        computeVariable(149)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-39':
        computeVariable(150)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-41':
        computeVariable(151)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-34':
        computeVariable(152)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-18':
        computeVariable(153)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-19':
        computeVariable(154)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-23':
        computeVariable(155)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-24':
        computeVariable(156)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-240':
        computeVariable(157)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-18':
        computeVariable(158)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-21':
        computeVariable(159)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-22':
        computeVariable(160)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st16-42':
        computeVariable(161)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-14':
        computeVariable(162)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-20':
        computeVariable(163)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-25':
        computeVariable(164)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-36':
        computeVariable(165)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-30':
        computeVariable(166)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-33':
        computeVariable(167)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-26':
        computeVariable(168)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-39':
        computeVariable(169)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-41':
        computeVariable(170)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-34':
        computeVariable(171)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-19':
        computeVariable(172)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-23':
        computeVariable(173)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-24':
        computeVariable(174)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-18':
        computeVariable(175)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-22':
        computeVariable(176)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st17-42':
        computeVariable(177)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-14':
        computeVariable(178)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-25':
        computeVariable(179)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-30':
        computeVariable(180)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-33':
        computeVariable(181)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-26':
        computeVariable(182)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-39':
        computeVariable(183)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-41':
        computeVariable(184)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-34':
        computeVariable(185)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-18':
        computeVariable(186)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-19':
        computeVariable(187)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-23':
        computeVariable(188)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-24':
        computeVariable(189)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-180':
        computeVariable(190)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st18-42':
        computeVariable(191)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-14':
        computeVariable(192)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-25':
        computeVariable(193)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-30':
        computeVariable(194)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-33':
        computeVariable(195)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-26':
        computeVariable(196)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-39':
        computeVariable(197)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-41':
        computeVariable(198)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-34':
        computeVariable(199)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-18':
        computeVariable(200)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-19':
        computeVariable(201)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-23':
        computeVariable(202)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-24':
        computeVariable(203)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-18':
        computeVariable(204)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st19-42':
        computeVariable(205)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-14':
        computeVariable(206)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-25':
        computeVariable(207)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-30':
        computeVariable(208)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-33':
        computeVariable(209)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-26':
        computeVariable(210)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-39':
        computeVariable(211)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-41':
        computeVariable(212)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-18':
        computeVariable(213)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-19':
        computeVariable(214)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-23':
        computeVariable(215)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-24':
        computeVariable(216)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-180':
        computeVariable(217)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st20-42':
        computeVariable(218)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st21-14':
        computeVariable(219)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st21-16':
        computeVariable(220)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st21-20':
        computeVariable(221)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st21-25':
        computeVariable(222)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st21-34':
        computeVariable(223)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st21-18':
        computeVariable(224)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st21-22':
        computeVariable(225)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-28':
        computeVariable(226)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-16':
        computeVariable(227)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-17':
        computeVariable(228)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-25':
        computeVariable(229)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-29':
        computeVariable(230)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-31':
        computeVariable(231)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-33':
        computeVariable(232)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-39':
        computeVariable(233)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-41':
        computeVariable(234)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st22-19':
        computeVariable(235)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-16':
        computeVariable(236)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-17':
        computeVariable(237)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-29':
        computeVariable(238)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-31':
        computeVariable(239)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-26':
        computeVariable(240)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-34':
        computeVariable(241)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-19':
        computeVariable(242)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-23':
        computeVariable(243)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st23-24':
        computeVariable(244)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-16':
        computeVariable(245)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-17':
        computeVariable(246)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-29':
        computeVariable(247)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-26':
        computeVariable(248)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-18':
        computeVariable(249)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-19':
        computeVariable(250)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-24':
        computeVariable(251)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-180':
        computeVariable(252)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st24-21':
        computeVariable(253)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st25-14':
        computeVariable(254)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st25-17':
        computeVariable(255)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st26-17':
        computeVariable(256)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st26-32':
        computeVariable(257)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st27-28':
        computeVariable(258)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st28-14':
        computeVariable(259)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st28-17':
        computeVariable(260)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st28-35':
        computeVariable(261)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st28-31':
        computeVariable(262)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st29-14':
        computeVariable(263)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st29-17':
        computeVariable(264)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st29-35':
        computeVariable(265)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-28':
        computeVariable(266)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-16':
        computeVariable(267)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-17':
        computeVariable(268)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-32':
        computeVariable(269)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-29':
        computeVariable(270)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-35':
        computeVariable(271)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-31':
        computeVariable(272)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-18':
        computeVariable(273)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st31-24':
        computeVariable(274)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-14':
        computeVariable(275)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-17':
        computeVariable(276)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-20':
        computeVariable(277)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-25':
        computeVariable(278)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-32':
        computeVariable(279)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-36':
        computeVariable(280)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-30':
        computeVariable(281)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-39':
        computeVariable(282)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-41':
        computeVariable(283)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-34':
        computeVariable(284)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-19':
        computeVariable(285)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-23':
        computeVariable(286)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-24':
        computeVariable(287)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-240':
        computeVariable(288)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-18':
        computeVariable(289)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st32-42':
        computeVariable(290)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-14':
        computeVariable(291)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-28':
        computeVariable(292)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-16':
        computeVariable(293)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-17':
        computeVariable(294)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-25':
        computeVariable(295)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-29':
        computeVariable(296)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-36':
        computeVariable(297)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-30':
        computeVariable(298)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-360':
        computeVariable(299)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-26':
        computeVariable(300)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-39':
        computeVariable(301)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-34':
        computeVariable(302)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-23':
        computeVariable(303)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-24':
        computeVariable(304)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-230':
        computeVariable(305)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-22':
        computeVariable(306)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st33-42':
        computeVariable(307)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st34-31':
        computeVariable(308)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st34-24':
        computeVariable(309)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st34-21':
        computeVariable(310)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st34-22':
        computeVariable(311)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st35-16':
        computeVariable(312)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st35-29':
        computeVariable(313)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st35-19':
        computeVariable(314)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st35-24':
        computeVariable(315)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st35-22':
        computeVariable(316)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-16':
        computeVariable(317)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-32':
        computeVariable(318)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-29':
        computeVariable(319)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-31':
        computeVariable(320)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-36':
        computeVariable(321)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-30':
        computeVariable(322)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-18':
        computeVariable(323)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-19':
        computeVariable(324)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-24':
        computeVariable(325)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st36-22':
        computeVariable(326)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-14':
        computeVariable(327)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-28':
        computeVariable(328)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-16':
        computeVariable(329)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-25':
        computeVariable(330)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-36':
        computeVariable(331)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-18':
        computeVariable(333)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-19':
        computeVariable(334)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-23':
        computeVariable(335)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-24':
        computeVariable(336)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-180':
        computeVariable(337)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-21':
        computeVariable(338)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st37-22':
        computeVariable(339)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-16':
        computeVariable(340)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-25':
        computeVariable(341)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-31':
        computeVariable(342)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-36':
        computeVariable(343)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-30':
        computeVariable(344)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-360':
        computeVariable(345)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-26':
        computeVariable(346)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-34':
        computeVariable(347)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-18':
        computeVariable(348)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-19':
        computeVariable(349)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-23':
        computeVariable(350)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-24':
        computeVariable(351)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-240':
        computeVariable(352)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-21':
        computeVariable(353)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st38-22':
        computeVariable(354)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st39-31':
        computeVariable(355)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;
        
        case 'st40-31':
        computeVariable(356)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st40-24':
        computeVariable(357)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st41-17':
        computeVariable(358)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st41-32':
        computeVariable(359)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st41-29':
        computeVariable(360)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st41-31':
        computeVariable(361)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st41-26':
        computeVariable(362)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st41-24':
        computeVariable(363)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st42-16':
        computeVariable(364)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st42-17':
        computeVariable(365)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st42-32':
        computeVariable(366)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st42-29':
        computeVariable(367)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st42-31':
        computeVariable(368)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st42-36':
        computeVariable(369)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break; 

        case 'st42-360':
        computeVariable(370)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break; 

        case 'st42-26':
        computeVariable(371)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st42-24':
        computeVariable(372)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st43-17':
        computeVariable(373)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st43-32':
        computeVariable(374)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st43-29':
        computeVariable(375)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-28':
        computeVariable(376)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-16':
        computeVariable(377)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-17':
        computeVariable(378)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-29':
        computeVariable(379)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-31':
        computeVariable(380)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-36':
        computeVariable(381)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-26':
        computeVariable(382)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-41':
        computeVariable(383)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-23':
        computeVariable(384)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-24':
        computeVariable(385)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-21':
        computeVariable(386)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st44-22':
        computeVariable(387)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st45-18':
        computeVariable(388)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st45-22':
        computeVariable(389)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-16':
        computeVariable(390)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-20':
        computeVariable(391)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-36':
        computeVariable(392)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-18':
        computeVariable(393)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-19':
        computeVariable(394)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-23':
        computeVariable(395)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-18':
        computeVariable(396)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-21':
        computeVariable(397)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st46-22':
        computeVariable(398)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st47-22':
        computeVariable(399)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-20':
        computeVariable(400)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-25':
        computeVariable(401)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-32':
        computeVariable(402)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-38':
        computeVariable(403)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-35':
        computeVariable(404)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-350':
        computeVariable(405)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-26':
        computeVariable(406)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-39':
        computeVariable(407)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-41':
        computeVariable(408)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-34':
        computeVariable(409)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-18':
        computeVariable(410)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-19':
        computeVariable(411)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-23':
        computeVariable(412)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-24':
        computeVariable(413)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-240':
        computeVariable(414)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-180':
        computeVariable(415)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-21':
        computeVariable(416)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st48-42':
        computeVariable(417)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-14':
        computeVariable(418)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-28':
        computeVariable(419)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-16':
        computeVariable(420)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-25':
        computeVariable(421)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-30':
        computeVariable(422)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-33':
        computeVariable(423)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-26':
        computeVariable(424)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-180':
        computeVariable(425)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-23':
        computeVariable(426)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-18':
        computeVariable(427)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-21':
        computeVariable(428)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-22':
        computeVariable(429)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st49-42':
        computeVariable(430)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st50-29':
        computeVariable(431)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st50-26':
        computeVariable(432)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-14':
        computeVariable(433)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-20':
        computeVariable(434)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-25':
        computeVariable(435)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-33':
        computeVariable(436)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-26':
        computeVariable(437)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-39':
        computeVariable(438)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-41':
        computeVariable(439)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-19':
        computeVariable(440)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-23':
        computeVariable(441)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-24':
        computeVariable(442)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-18':
        computeVariable(443)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st51-42':
        computeVariable(444)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-14':
        computeVariable(445)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-25':
        computeVariable(446)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-38':
        computeVariable(447)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-35':
        computeVariable(448)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-33':
        computeVariable(449)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-39':
        computeVariable(450)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-180':
        computeVariable(451)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-19':
        computeVariable(452)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-23':
        computeVariable(453)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-24':
        computeVariable(454)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-18':
        computeVariable(455)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-21':
        computeVariable(456)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st52-42':
        computeVariable(457)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-14':
        computeVariable(458)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-16':
        computeVariable(459)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-20':
        computeVariable(460)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-25':
        computeVariable(461)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-32':
        computeVariable(462)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-29':
        computeVariable(463)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-17':
        computeVariable(464)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-30':
        computeVariable(465)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-33':
        computeVariable(466)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-26':
        computeVariable(467)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-34':
        computeVariable(468)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-180':
        computeVariable(469)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-19':
        computeVariable(470)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-23':
        computeVariable(471)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-24':
        computeVariable(472)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-18':
        computeVariable(473)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-21':
        computeVariable(474)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st53-22':
        computeVariable(475)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st54-25':
        computeVariable(476)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st54-23':
        computeVariable(477)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-14':
        computeVariable(478)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-25':
        computeVariable(479)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-30':
        computeVariable(480)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-33':
        computeVariable(481)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-26':
        computeVariable(482)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-39':
        computeVariable(483)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-41':
        computeVariable(484)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-18':
        computeVariable(485)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-19':
        computeVariable(486)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-23':
        computeVariable(487)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-24':
        computeVariable(488)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-180':
        computeVariable(489)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st55-42':
        computeVariable(490)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st56-25':
        computeVariable(491)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st56-33':
        computeVariable(492)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st56-26':
        computeVariable(493)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st56-39':
        computeVariable(494)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st56-19':
        computeVariable(495)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st56-23':
        computeVariable(496)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st56-24':
        computeVariable(497)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st56-42':
        computeVariable(498)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-14':
        computeVariable(499)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-28':
        computeVariable(500)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-16':
        computeVariable(501)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-25':
        computeVariable(502)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-35':
        computeVariable(503)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-36':
        computeVariable(504)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-30':
        computeVariable(505)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-26':
        computeVariable(506)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-34':
        computeVariable(507)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-18':
        computeVariable(508)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-19':
        computeVariable(509)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-23':
        computeVariable(510)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-24':
        computeVariable(511)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-180':
        computeVariable(512)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-21':
        computeVariable(513)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st58-22':
        computeVariable(514)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st59-25':
        computeVariable(515)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st59-33':
        computeVariable(516)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st59-26':
        computeVariable(517)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st59-39':
        computeVariable(518)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st59-19':
        computeVariable(519)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st59-24':
        computeVariable(520)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st59-240':
        computeVariable(521)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;
        
        case 'st59-18':
        computeVariable(522)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st59-42':
        computeVariable(523)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-14':
        computeVariable(524)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-20':
        computeVariable(525)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-25':
        computeVariable(526)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-39':
        computeVariable(527)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-18':
        computeVariable(528)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-23':
        computeVariable(529)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-24':
        computeVariable(530)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-43':
        computeVariable(531)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st60-180':
        computeVariable(532)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st61-16':
        computeVariable(533)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st61-26':
        computeVariable(534)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st61-22':
        computeVariable(535)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-14':
        computeVariable(536)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-20':
        computeVariable(537)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-25':
        computeVariable(538)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-36':
        computeVariable(539)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-30':
        computeVariable(540)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-26':
        computeVariable(541)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-39':
        computeVariable(542)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-41':
        computeVariable(543)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-18':
        computeVariable(544)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-23':
        computeVariable(545)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-24':
        computeVariable(546)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-180':
        computeVariable(547)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-21':
        computeVariable(548)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st62-42':
        computeVariable(549)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-14':
        computeVariable(550)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-16':
        computeVariable(551)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-20':
        computeVariable(552)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-25':
        computeVariable(553)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-35':
        computeVariable(554)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-17':
        computeVariable(555)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-30':
        computeVariable(556)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-33':
        computeVariable(557)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-26':
        computeVariable(558)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-18':
        computeVariable(559)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-19':
        computeVariable(560)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-23':
        computeVariable(561)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-24':
        computeVariable(562)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-180':
        computeVariable(563)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;


        case 'st63-21':
        computeVariable(564)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-22':
        computeVariable(565)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st63-42':
        computeVariable(566)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-16':
        computeVariable(567)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-17':
        computeVariable(568)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-32':
        computeVariable(569)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-29':
        computeVariable(570)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-35':
        computeVariable(571)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-31':
        computeVariable(572)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-36':
        computeVariable(573)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-30':
        computeVariable(574)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-33':
        computeVariable(575)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-26':
        computeVariable(576)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-41':
        computeVariable(577)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st64-24':
        computeVariable(578)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-14':
        computeVariable(579)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-16':
        computeVariable(580)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-17':
        computeVariable(581)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-20':
        computeVariable(582)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-25':
        computeVariable(583)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-35':
        computeVariable(584)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-36':
        computeVariable(585)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-26':
        computeVariable(586)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-18':
        computeVariable(587)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-19':
        computeVariable(588)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-23':
        computeVariable(589)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-24':
        computeVariable(590)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-180':
        computeVariable(591)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-21':
        computeVariable(592)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st65-22':
        computeVariable(593)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-14':
        computeVariable(594)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-16':
        computeVariable(595)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-17':
        computeVariable(596)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-20':
        computeVariable(597)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-25':
        computeVariable(598)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-35':
        computeVariable(599)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-26':
        computeVariable(600)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-18':
        computeVariable(601)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-19':
        computeVariable(602)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-23':
        computeVariable(603)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-24':
        computeVariable(604)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-21':
        computeVariable(605)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st66-22':
        computeVariable(606)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st67-16':
        computeVariable(607)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st67-17':
        computeVariable(608)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st67-25':
        computeVariable(609)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st67-31':
        computeVariable(610)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st67-36':
        computeVariable(611)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st67-18':
        computeVariable(612)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st67-21':
        computeVariable(613)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st67-22':
        computeVariable(614)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-28':
        computeVariable(615)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-16':
        computeVariable(616)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-17':
        computeVariable(617)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-29':
        computeVariable(618)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-31':
        computeVariable(619)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-36':
        computeVariable(620)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-26':
        computeVariable(621)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-19':
        computeVariable(622)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-24':
        computeVariable(623)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-21':
        computeVariable(624)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st68-22':
        computeVariable(625)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st70-14':
        computeVariable(626)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st70-31':
        computeVariable(627)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st70-39':
        computeVariable(628)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st70-40':
        computeVariable(629)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st70-34':
        computeVariable(630)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st70-23':
        computeVariable(631)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st70-36':
        computeVariable(632)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-28':
        computeVariable(633)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-16':
        computeVariable(634)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-35':
        computeVariable(635)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-31':
        computeVariable(636)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-18':
        computeVariable(637)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-19':
        computeVariable(638)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-24':
        computeVariable(639)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-21':
        computeVariable(640)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st71-22':
        computeVariable(641)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-16':
        computeVariable(642)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-17':
        computeVariable(643)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-25':
        computeVariable(644)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-32':
        computeVariable(645)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-29':
        computeVariable(646)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-35':
        computeVariable(647)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-31':
        computeVariable(648)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-27':
        computeVariable(649)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-30':
        computeVariable(650)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-33':
        computeVariable(651)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-26':
        computeVariable(652)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-18':
        computeVariable(653)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-19':
        computeVariable(654)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-23':
        computeVariable(655)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-24':
        computeVariable(656)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-180':
        computeVariable(657)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-21':
        computeVariable(658)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st72-22':
        computeVariable(659)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-28':
        computeVariable(660)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-16':
        computeVariable(661)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;
        
        case 'st73-29':
        computeVariable(662)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-26':
        computeVariable(663)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-18':
        computeVariable(664)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-19':
        computeVariable(665)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-23':
        computeVariable(666)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-24':
        computeVariable(667)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-21':
        computeVariable(668)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st73-22':
        computeVariable(669)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st74-28':
        computeVariable(670)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st74-17':
        computeVariable(671)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st74-24':
        computeVariable(672)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-14':
        computeVariable(673)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-28':
        computeVariable(674)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-16':
        computeVariable(675)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-25':
        computeVariable(676)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-27':
        computeVariable(677)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-30':
        computeVariable(678)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-33':
        computeVariable(679)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-26':
        computeVariable(680)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-18':
        computeVariable(681)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-19':
        computeVariable(682)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-180':
        computeVariable(683)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-21':
        computeVariable(684)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st75-22':
        computeVariable(685)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st76-16':
        computeVariable(686)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st76-17':
        computeVariable(687)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st76-24':
        computeVariable(688)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st76-21':
        computeVariable(689)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st77-16':
        computeVariable(690)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st77-17':
        computeVariable(691)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st77-32':
        computeVariable(692)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st77-29':
        computeVariable(693)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st77-31':
        computeVariable(694)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st77-21':
        computeVariable(695)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st78-14':
        computeVariable(696)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st78-28':
        computeVariable(697)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st78-16':
        computeVariable(698)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st78-17':
        computeVariable(699)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st78-29':
        computeVariable(700)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st78-18':
        computeVariable(701)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st79-14':
        computeVariable(702)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st79-28':
        computeVariable(703)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st79-16':
        computeVariable(704)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st79-17':
        computeVariable(705)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st79-29':
        computeVariable(706)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st80-14':
        computeVariable(707)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st80-16':
        computeVariable(708)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st80-20':
        computeVariable(709)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st80-25':
        computeVariable(710)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st80-26':
        computeVariable(711)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st81-14':
        computeVariable(712)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st81-16':
        computeVariable(713)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st81-17':
        computeVariable(714)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st81-20':
        computeVariable(715)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st81-18':
        computeVariable(716)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st81-19':
        computeVariable(717)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st81-21':
        computeVariable(718)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;

        case 'st81-22':
        computeVariable(719)
        changeText(info1, info2);
        ring = drawRingchart('ringchart',ind);
        break;
        

        case 'st10 st70 st71':
        info1 = foodInfo[0]["gi-level"]
        info2 = foodInfo[0].color
        info3 = foodInfo[0].category
        info4 = foodInfo[0].amount
        info5 = foodInfo[0].url
        changeText2(info1,info2,info3,info4,info5)
        break;

        
    }
    // console.log(ind)

    // row1
   
    positionPopUp('myicon','popup_left')
    positionPopUp('myicon2','popup_left')
    positionPopUp('myicon3','popup_left')
    positionPopUp('myicon4','popup_left')
    positionPopUp('myicon5','popup_left')
    positionPopUp('myicon6','popup_left')
    positionPopUp('myicon7','popup_left')
    positionPopUp('myicon8','popup_left')
    positionPopUp('myicon9','popup_left')
    positionPopUp('myicon10','popup_left')
    positionPopUp('myicon11','popup_left')
    positionPopUp('myicon12','popup_left')
    positionPopUp('myicon13','popup_left')
    
    //row2
    positionPopUp('myicon2-0','popup_left')
    positionPopUp('myicon2-1','popup_left')
    positionPopUp('myicon2-2','popup_left')
    positionPopUp('myicon2-3','popup_left')
    positionPopUp('myicon2-4','popup_left')
    positionPopUp('myicon2-5','popup_left')
    positionPopUp('myicon2-6','popup_left')
    positionPopUp('myicon2-7','popup_left')
    positionPopUp('myicon2-8','popup_left')
    positionPopUp('myicon2-9','popup_left')
    positionPopUp('myicon2-10','popup_left')
    positionPopUp('myicon2-11','popup_left')

    //row3
    positionPopUp('myicon3-0','popup_left')
    positionPopUp('myicon3-1','popup_left')
    positionPopUp('myicon3-2','popup_left')
    positionPopUp('myicon3-3','popup_left')
    positionPopUp('myicon3-4','popup_left')
    positionPopUp('myicon3-5','popup_left')
    positionPopUp('myicon3-6','popup_left')
    positionPopUp('myicon3-7','popup_left')
    positionPopUp('myicon3-8','popup_left')
    positionPopUp('myicon3-9','popup_left')

    //row4
    positionPopUp('myicon4-0','popup_left')

    //row5
    positionPopUp('myicon5-0','popup_left')
    positionPopUp('myicon5-1','popup_left')
    positionPopUp('myicon5-2','popup_left')
    positionPopUp('myicon5-3','popup_left')
    positionPopUp('myicon5-4','popup_left')

    //row6
    positionPopUp('myicon6-0','popup_left')
    positionPopUp('myicon6-1','popup_left')
    positionPopUp('myicon6-2','popup_left')
    positionPopUp('myicon6-3','popup_left')
    positionPopUp('myicon6-4','popup_left')
    positionPopUp('myicon6-5','popup_left')
    positionPopUp('myicon6-6','popup_left')
    positionPopUp('myicon6-7','popup_left')
    positionPopUp('myicon6-8','popup_left')
    positionPopUp('myicon6-9','popup_left')
    positionPopUp('myicon6-10','popup_left')

    //row7
    positionPopUp('myicon7-0','popup_left')
    positionPopUp('myicon7-1','popup_left')
    positionPopUp('myicon7-2','popup_left')
    positionPopUp('myicon7-3','popup_left')
    positionPopUp('myicon7-4','popup_left')
    positionPopUp('myicon7-5','popup_left')
    positionPopUp('myicon7-6','popup_left')
    positionPopUp('myicon7-7','popup_left')
    positionPopUp('myicon7-8','popup_left')
    positionPopUp('myicon7-9','popup_left')
    positionPopUp('myicon7-10','popup_left')

    //row8
    positionPopUp('myicon8-0','popup_left')
    positionPopUp('myicon8-1','popup_left')
    positionPopUp('myicon8-2','popup_left')
    positionPopUp('myicon8-3','popup_left')
    positionPopUp('myicon8-4','popup_left')
    positionPopUp('myicon8-5','popup_left')
    positionPopUp('myicon8-6','popup_left')
    positionPopUp('myicon8-7','popup_left')

    //row9
    positionPopUp('myicon9-0','popup_left')
    positionPopUp('myicon9-1','popup_left')
    positionPopUp('myicon9-2','popup_left')
    positionPopUp('myicon9-3','popup_left')
    positionPopUp('myicon9-4','popup_left')
    positionPopUp('myicon9-5','popup_left')
    positionPopUp('myicon9-6','popup_left')
    positionPopUp('myicon9-7','popup_left')
    positionPopUp('myicon9-8','popup_left')
    positionPopUp('myicon9-9','popup_left')
    positionPopUp('myicon9-10','popup_left')
    positionPopUp('myicon9-11','popup_left')
    positionPopUp('myicon9-12','popup_left')

    //row10
    positionPopUp('myicon10-0','popup_left')
    positionPopUp('myicon10-1','popup_left')
    positionPopUp('myicon10-2','popup_left')
    positionPopUp('myicon10-3','popup_left')
    positionPopUp('myicon10-4','popup_left')
    positionPopUp('myicon10-5','popup_left')
    positionPopUp('myicon10-6','popup_left')

    //row11 
    positionPopUp('myicon11-0','popup_left')
    positionPopUp('myicon11-1','popup_left')
    positionPopUp('myicon11-2','popup_left')
    positionPopUp('myicon11-3','popup_left')
    positionPopUp('myicon11-4','popup_left')

    //row12
    positionPopUp('myicon12-0','popup_left')
    positionPopUp('myicon12-1','popup_left')
    positionPopUp('myicon12-2','popup_left')
    positionPopUp('myicon12-3','popup_left')
    positionPopUp('myicon12-4','popup_left')
    positionPopUp('myicon12-5','popup_left')
    positionPopUp('myicon12-6','popup_left')
    positionPopUp('myicon12-7','popup_left')
    positionPopUp('myicon12-8','popup_left')
    positionPopUp('myicon12-9','popup_left')
    positionPopUp('myicon12-10','popup_left')
    positionPopUp('myicon12-11','popup_left')

    //row13
    positionPopUp('myicon13-0','popup_left')
    positionPopUp('myicon13-1','popup_left')
    positionPopUp('myicon13-2','popup_left')
    positionPopUp('myicon13-3','popup_left')
    positionPopUp('myicon13-4','popup_left')

    //row14
    positionPopUp('myicon14-0','popup_left')
    positionPopUp('myicon14-1','popup_left')
    positionPopUp('myicon14-2','popup_left')
    positionPopUp('myicon14-3','popup_left')
    positionPopUp('myicon14-4','popup_left')
    positionPopUp('myicon14-5','popup_left')
    positionPopUp('myicon14-6','popup_left')
    positionPopUp('myicon14-7','popup_left')
    positionPopUp('myicon14-8','popup_left')
    positionPopUp('myicon14-9','popup_left')
    positionPopUp('myicon14-10','popup_left')
    positionPopUp('myicon14-11','popup_left')
    positionPopUp('myicon14-12','popup_left')
    positionPopUp('myicon14-13','popup_left')

    //row15
    positionPopUp('myicon15-0','popup_left')
    positionPopUp('myicon15-1','popup_left')
    positionPopUp('myicon15-2','popup_left')
    positionPopUp('myicon15-3','popup_left')
    positionPopUp('myicon15-4','popup_left')
    positionPopUp('myicon15-5','popup_left')
    positionPopUp('myicon15-6','popup_left')
    positionPopUp('myicon15-7','popup_left')
    positionPopUp('myicon15-8','popup_left')
    positionPopUp('myicon15-9','popup_left')
    positionPopUp('myicon15-10','popup_left')
    positionPopUp('myicon15-11','popup_left')
    positionPopUp('myicon15-12','popup_left')
    positionPopUp('myicon15-13','popup_left')
    positionPopUp('myicon15-14','popup_left')

    //row15
    positionPopUp('myicon16-0','popup_left')
    positionPopUp('myicon16-1','popup_left')
    positionPopUp('myicon16-2','popup_left')
    positionPopUp('myicon16-3','popup_left')
    positionPopUp('myicon16-4','popup_left')
    positionPopUp('myicon16-5','popup_left')
    positionPopUp('myicon16-6','popup_left')
    positionPopUp('myicon16-7','popup_left')
    positionPopUp('myicon16-8','popup_left')
    positionPopUp('myicon16-9','popup_left')
    positionPopUp('myicon16-10','popup_left')
    positionPopUp('myicon16-11','popup_left')
    positionPopUp('myicon16-12','popup_left')
    positionPopUp('myicon16-13','popup_left')
    positionPopUp('myicon16-14','popup_left')
    positionPopUp('myicon16-15','popup_left')
    positionPopUp('myicon16-16','popup_left')
    positionPopUp('myicon16-17','popup_left')
    positionPopUp('myicon16-18','popup_left')

    //row16
    positionPopUp('myicon17-0','popup_left')
    positionPopUp('myicon17-1','popup_left')
    positionPopUp('myicon17-2','popup_left')
    positionPopUp('myicon17-3','popup_left')
    positionPopUp('myicon17-4','popup_left')
    positionPopUp('myicon17-5','popup_left')
    positionPopUp('myicon17-6','popup_left')
    positionPopUp('myicon17-7','popup_left')
    positionPopUp('myicon17-8','popup_left')
    positionPopUp('myicon17-9','popup_left')
    positionPopUp('myicon17-10','popup_left')
    positionPopUp('myicon17-11','popup_left')
    positionPopUp('myicon17-12','popup_left')
    positionPopUp('myicon17-13','popup_left')
    positionPopUp('myicon17-14','popup_left')
    positionPopUp('myicon17-15','popup_left')

    //row17
    positionPopUp('myicon18-0','popup_left')
    positionPopUp('myicon18-1','popup_left')
    positionPopUp('myicon18-2','popup_left')
    positionPopUp('myicon18-3','popup_left')
    positionPopUp('myicon18-4','popup_left')
    positionPopUp('myicon18-5','popup_left')
    positionPopUp('myicon18-6','popup_left')
    positionPopUp('myicon18-7','popup_left')
    positionPopUp('myicon18-8','popup_left')
    positionPopUp('myicon18-9','popup_left')
    positionPopUp('myicon18-10','popup_left')
    positionPopUp('myicon18-11','popup_left')
    positionPopUp('myicon18-12','popup_left')
    positionPopUp('myicon18-13','popup_left')

    //row18
    positionPopUp('myicon19-0','popup_left')
    positionPopUp('myicon19-1','popup_left')
    positionPopUp('myicon19-2','popup_left')
    positionPopUp('myicon19-3','popup_left')
    positionPopUp('myicon19-4','popup_left')
    positionPopUp('myicon19-5','popup_left')
    positionPopUp('myicon19-6','popup_left')
    positionPopUp('myicon19-7','popup_left')
    positionPopUp('myicon19-8','popup_left')
    positionPopUp('myicon19-9','popup_left')
    positionPopUp('myicon19-10','popup_left')
    positionPopUp('myicon19-11','popup_left')
    positionPopUp('myicon19-12','popup_left')
    positionPopUp('myicon19-13','popup_left')

    //row19
    positionPopUp('myicon20-0','popup_left')
    positionPopUp('myicon20-1','popup_left')
    positionPopUp('myicon20-2','popup_left')
    positionPopUp('myicon20-3','popup_left')
    positionPopUp('myicon20-4','popup_left')
    positionPopUp('myicon20-5','popup_left')
    positionPopUp('myicon20-6','popup_left')
    positionPopUp('myicon20-7','popup_left')
    positionPopUp('myicon20-8','popup_left')
    positionPopUp('myicon20-9','popup_left')
    positionPopUp('myicon20-10','popup_left')
    positionPopUp('myicon20-11','popup_left')
    positionPopUp('myicon20-12','popup_left')

    //row20
    positionPopUp('myicon21-0','popup_left')
    positionPopUp('myicon21-1','popup_left')
    positionPopUp('myicon21-2','popup_left')
    positionPopUp('myicon21-3','popup_left')
    positionPopUp('myicon21-4','popup_left')
    positionPopUp('myicon21-5','popup_left')
    positionPopUp('myicon21-6','popup_left')

    //row21
    positionPopUp('myicon22-0','popup_left')
    positionPopUp('myicon22-1','popup_left')
    positionPopUp('myicon22-2','popup_left')
    positionPopUp('myicon22-3','popup_left')
    positionPopUp('myicon22-4','popup_left')
    positionPopUp('myicon22-5','popup_left')
    positionPopUp('myicon22-6','popup_left')
    positionPopUp('myicon22-7','popup_left')
    positionPopUp('myicon22-8','popup_left')
    positionPopUp('myicon22-9','popup_left')

    //row22
    positionPopUp('myicon22-0','popup_left')
    positionPopUp('myicon22-1','popup_left')
    positionPopUp('myicon22-2','popup_left')
    positionPopUp('myicon22-3','popup_left')
    positionPopUp('myicon22-4','popup_left')
    positionPopUp('myicon22-5','popup_left')
    positionPopUp('myicon22-6','popup_left')
    positionPopUp('myicon22-7','popup_left')
    positionPopUp('myicon22-8','popup_left')

    //row22
    positionPopUp('myicon23-0','popup_left')
    positionPopUp('myicon23-1','popup_left')
    positionPopUp('myicon23-2','popup_left')
    positionPopUp('myicon23-3','popup_left')
    positionPopUp('myicon23-4','popup_left')
    positionPopUp('myicon23-5','popup_left')
    positionPopUp('myicon23-6','popup_left')
    positionPopUp('myicon23-7','popup_left')
    positionPopUp('myicon23-8','popup_left')

    //row23
    positionPopUp('myicon24-0','popup_left')
    positionPopUp('myicon24-1','popup_left')
    positionPopUp('myicon24-2','popup_left')
    positionPopUp('myicon24-3','popup_left')
    positionPopUp('myicon24-4','popup_left')
    positionPopUp('myicon24-5','popup_left')
    positionPopUp('myicon24-6','popup_left')
    positionPopUp('myicon24-7','popup_left')
    positionPopUp('myicon24-8','popup_left')

    //row24
    positionPopUp('myicon25-0','popup_left')
    positionPopUp('myicon25-1','popup_left')

    //row25
    positionPopUp('myicon26-0','popup_left')
    positionPopUp('myicon26-1','popup_left')

    //row26
    positionPopUp('myicon27-0','popup_left')

    //row27
    positionPopUp('myicon28-0','popup_left')
    positionPopUp('myicon28-1','popup_left')
    positionPopUp('myicon28-2','popup_left')
    positionPopUp('myicon28-3','popup_left')

    //row28
    positionPopUp('myicon29-0','popup_left')
    positionPopUp('myicon29-1','popup_left')
    positionPopUp('myicon29-2','popup_left')

     //row31
     positionPopUp('myicon31-0','popup_left')
     positionPopUp('myicon31-1','popup_left')
     positionPopUp('myicon31-2','popup_left')
     positionPopUp('myicon31-3','popup_left')
     positionPopUp('myicon31-4','popup_left')
     positionPopUp('myicon31-5','popup_left')
     positionPopUp('myicon31-6','popup_left')
     positionPopUp('myicon31-7','popup_left')
     positionPopUp('myicon31-8','popup_left')
    
     //row32
     positionPopUp('myicon32-0','popup_left')
     positionPopUp('myicon32-1','popup_left')
     positionPopUp('myicon32-2','popup_left')
     positionPopUp('myicon32-3','popup_left')
     positionPopUp('myicon32-4','popup_left')
     positionPopUp('myicon32-5','popup_left')
     positionPopUp('myicon32-6','popup_left')
     positionPopUp('myicon32-7','popup_left')
     positionPopUp('myicon32-8','popup_left')
     positionPopUp('myicon32-9','popup_left')
     positionPopUp('myicon32-10','popup_left')
     positionPopUp('myicon32-11','popup_left')
     positionPopUp('myicon32-12','popup_left')
     positionPopUp('myicon32-13','popup_left')
     positionPopUp('myicon32-14','popup_left')
     positionPopUp('myicon32-15','popup_left')

     //row33
     positionPopUp('myicon33-0','popup_left')
     positionPopUp('myicon33-1','popup_left')
     positionPopUp('myicon33-2','popup_left')
     positionPopUp('myicon33-3','popup_left')
     positionPopUp('myicon33-4','popup_left')
     positionPopUp('myicon33-5','popup_left')
     positionPopUp('myicon33-6','popup_left')
     positionPopUp('myicon33-7','popup_left')
     positionPopUp('myicon33-8','popup_left')
     positionPopUp('myicon33-9','popup_left')
     positionPopUp('myicon33-10','popup_left')
     positionPopUp('myicon33-11','popup_left')
     positionPopUp('myicon33-12','popup_left')
     positionPopUp('myicon33-13','popup_left')
     positionPopUp('myicon33-14','popup_left')
     positionPopUp('myicon33-15','popup_left')
     positionPopUp('myicon33-16','popup_left')

     //row34
     positionPopUp('myicon34-0','popup_left')
     positionPopUp('myicon34-1','popup_left')
     positionPopUp('myicon34-2','popup_left')
     positionPopUp('myicon34-3','popup_left')
 
     //row35
     positionPopUp('myicon35-0','popup_left')
     positionPopUp('myicon35-1','popup_left')
     positionPopUp('myicon35-2','popup_left')
     positionPopUp('myicon35-3','popup_left')
     positionPopUp('myicon35-4','popup_left')

    //row36
    positionPopUp('myicon36-0','popup_left')
    positionPopUp('myicon36-1','popup_left')
    positionPopUp('myicon36-2','popup_left')
    positionPopUp('myicon36-3','popup_left')
    positionPopUp('myicon36-4','popup_left')
    positionPopUp('myicon36-5','popup_left')
    positionPopUp('myicon36-6','popup_left')
    positionPopUp('myicon36-7','popup_left')
    positionPopUp('myicon36-8','popup_left')
    positionPopUp('myicon36-9','popup_left')

    //row37
    positionPopUp('myicon37-0','popup_left')
    positionPopUp('myicon37-1','popup_left')
    positionPopUp('myicon37-2','popup_left')
    positionPopUp('myicon37-3','popup_left')
    positionPopUp('myicon37-4','popup_left')
    positionPopUp('myicon37-5','popup_left')
    positionPopUp('myicon37-6','popup_left')
    positionPopUp('myicon37-7','popup_left')
    positionPopUp('myicon37-8','popup_left')
    positionPopUp('myicon37-9','popup_left')
    positionPopUp('myicon37-10','popup_left')
    positionPopUp('myicon37-11','popup_left')

    //row38
    positionPopUp('myicon38-0','popup_left')
    positionPopUp('myicon38-1','popup_left')
    positionPopUp('myicon38-2','popup_left')
    positionPopUp('myicon38-3','popup_left')
    positionPopUp('myicon38-4','popup_left')
    positionPopUp('myicon38-5','popup_left')
    positionPopUp('myicon38-6','popup_left')
    positionPopUp('myicon38-7','popup_left')
    positionPopUp('myicon38-8','popup_left')
    positionPopUp('myicon38-9','popup_left')
    positionPopUp('myicon38-10','popup_left')
    positionPopUp('myicon38-11','popup_left')
    positionPopUp('myicon38-12','popup_left')
    positionPopUp('myicon38-13','popup_left')
    positionPopUp('myicon38-14','popup_left')

    //row39
    positionPopUp('myicon39-0','popup_left')

    //row40
    positionPopUp('myicon40-0','popup_left')
    positionPopUp('myicon40-1','popup_left')

    //row41
    positionPopUp('myicon41-0','popup_left')
    positionPopUp('myicon41-1','popup_left')
    positionPopUp('myicon41-2','popup_left')
    positionPopUp('myicon41-3','popup_left')
    positionPopUp('myicon41-4','popup_left')
    positionPopUp('myicon41-5','popup_left')

    //row42
    positionPopUp('myicon42-0','popup_left')
    positionPopUp('myicon42-1','popup_left')
    positionPopUp('myicon42-2','popup_left')
    positionPopUp('myicon42-3','popup_left')
    positionPopUp('myicon42-4','popup_left')
    positionPopUp('myicon42-5','popup_left')
    positionPopUp('myicon42-6','popup_left')
    positionPopUp('myicon42-7','popup_left')
    positionPopUp('myicon42-8','popup_left')

    //row43
    positionPopUp('myicon43-0','popup_left')
    positionPopUp('myicon43-1','popup_left')
    positionPopUp('myicon43-2','popup_left')

    //row44
    positionPopUp('myicon44-0','popup_left')
    positionPopUp('myicon44-1','popup_left')
    positionPopUp('myicon44-2','popup_left')
    positionPopUp('myicon44-3','popup_left')
    positionPopUp('myicon44-4','popup_left')
    positionPopUp('myicon44-5','popup_left')
    positionPopUp('myicon44-6','popup_left')
    positionPopUp('myicon44-7','popup_left')
    positionPopUp('myicon44-8','popup_left')
    positionPopUp('myicon44-9','popup_left')
    positionPopUp('myicon44-10','popup_left')
    positionPopUp('myicon44-11','popup_left')

    //row45
    positionPopUp('myicon45-0','popup_left')
    positionPopUp('myicon45-1','popup_left')

     //row46
    positionPopUp('myicon46-0','popup_left')
    positionPopUp('myicon46-1','popup_left')
    positionPopUp('myicon46-2','popup_left')
    positionPopUp('myicon46-3','popup_left')
    positionPopUp('myicon46-4','popup_left')
    positionPopUp('myicon46-5','popup_left')
    positionPopUp('myicon46-6','popup_left')
    positionPopUp('myicon46-7','popup_left')
    positionPopUp('myicon46-8','popup_left')

    //row47
    positionPopUp('myicon47-0','popup_left')

    //row48
    positionPopUp('myicon48-0','popup_left')
    positionPopUp('myicon48-1','popup_left')
    positionPopUp('myicon48-2','popup_left')
    positionPopUp('myicon48-3','popup_left')
    positionPopUp('myicon48-4','popup_left')
    positionPopUp('myicon48-5','popup_left')
    positionPopUp('myicon48-6','popup_left')
    positionPopUp('myicon48-7','popup_left')
    positionPopUp('myicon48-8','popup_left')
    positionPopUp('myicon48-9','popup_left')
    positionPopUp('myicon48-10','popup_left')
    positionPopUp('myicon48-11','popup_left')
    positionPopUp('myicon48-12','popup_left')
    positionPopUp('myicon48-13','popup_left')
    positionPopUp('myicon48-14','popup_left')
    positionPopUp('myicon48-15','popup_left')
    positionPopUp('myicon48-16','popup_left')
    positionPopUp('myicon48-17','popup_left')

    //row49
    positionPopUp('myicon49-0','popup_left')
    positionPopUp('myicon49-1','popup_left')
    positionPopUp('myicon49-2','popup_left')
    positionPopUp('myicon49-3','popup_left')
    positionPopUp('myicon49-4','popup_left')
    positionPopUp('myicon49-5','popup_left')
    positionPopUp('myicon49-6','popup_left')
    positionPopUp('myicon49-7','popup_left')
    positionPopUp('myicon49-8','popup_left')
    positionPopUp('myicon49-9','popup_left')
    positionPopUp('myicon49-10','popup_left')
    positionPopUp('myicon49-11','popup_left')
    positionPopUp('myicon49-12','popup_left')

    //row50
    positionPopUp('myicon50-0','popup_left')
    positionPopUp('myicon50-1','popup_left')

    //row51
    positionPopUp('myicon51-0','popup_left')
    positionPopUp('myicon51-1','popup_left')
    positionPopUp('myicon51-2','popup_left')
    positionPopUp('myicon51-3','popup_left')
    positionPopUp('myicon51-4','popup_left')
    positionPopUp('myicon51-5','popup_left')
    positionPopUp('myicon51-6','popup_left')
    positionPopUp('myicon51-7','popup_left')
    positionPopUp('myicon51-8','popup_left')
    positionPopUp('myicon51-9','popup_left')
    positionPopUp('myicon51-10','popup_left')
    positionPopUp('myicon51-11','popup_left')

    //row52
    positionPopUp('myicon52-0','popup_left')
    positionPopUp('myicon52-1','popup_left')
    positionPopUp('myicon52-2','popup_left')
    positionPopUp('myicon52-3','popup_left')
    positionPopUp('myicon52-4','popup_left')
    positionPopUp('myicon52-5','popup_left')
    positionPopUp('myicon52-6','popup_left')
    positionPopUp('myicon52-7','popup_left')
    positionPopUp('myicon52-8','popup_left')
    positionPopUp('myicon52-9','popup_left')
    positionPopUp('myicon52-10','popup_left')
    positionPopUp('myicon52-11','popup_left')
    positionPopUp('myicon52-12','popup_left')

    //row53
    positionPopUp('myicon53-0','popup_left')
    positionPopUp('myicon53-1','popup_left')
    positionPopUp('myicon53-2','popup_left')
    positionPopUp('myicon53-3','popup_left')
    positionPopUp('myicon53-4','popup_left')
    positionPopUp('myicon53-5','popup_left')
    positionPopUp('myicon53-6','popup_left')
    positionPopUp('myicon53-7','popup_left')
    positionPopUp('myicon53-8','popup_left')
    positionPopUp('myicon53-9','popup_left')
    positionPopUp('myicon53-10','popup_left')
    positionPopUp('myicon53-11','popup_left')
    positionPopUp('myicon53-12','popup_left')
    positionPopUp('myicon53-13','popup_left')
    positionPopUp('myicon53-14','popup_left')
    positionPopUp('myicon53-15','popup_left')
    positionPopUp('myicon53-16','popup_left')
    positionPopUp('myicon53-17','popup_left')

    //row54
    positionPopUp('myicon54-0','popup_left')
    positionPopUp('myicon54-1','popup_left')

    //row55
    positionPopUp('myicon55-0','popup_left')
    positionPopUp('myicon55-1','popup_left')
    positionPopUp('myicon55-2','popup_left')
    positionPopUp('myicon55-3','popup_left')
    positionPopUp('myicon55-4','popup_left')
    positionPopUp('myicon55-5','popup_left')
    positionPopUp('myicon55-6','popup_left')
    positionPopUp('myicon55-7','popup_left')
    positionPopUp('myicon55-8','popup_left')
    positionPopUp('myicon55-9','popup_left')
    positionPopUp('myicon55-10','popup_left')
    positionPopUp('myicon55-11','popup_left')
    positionPopUp('myicon55-12','popup_left')

    //row56
    positionPopUp('myicon56-0','popup_left')
    positionPopUp('myicon56-1','popup_left')
    positionPopUp('myicon56-2','popup_left')
    positionPopUp('myicon56-3','popup_left')
    positionPopUp('myicon56-4','popup_left')
    positionPopUp('myicon56-5','popup_left')
    positionPopUp('myicon56-6','popup_left')
    positionPopUp('myicon56-7','popup_left')

    //row58
    positionPopUp('myicon58-0','popup_left')
    positionPopUp('myicon58-1','popup_left')
    positionPopUp('myicon58-2','popup_left')
    positionPopUp('myicon58-3','popup_left')
    positionPopUp('myicon58-4','popup_left')
    positionPopUp('myicon58-5','popup_left')
    positionPopUp('myicon58-6','popup_left')
    positionPopUp('myicon58-7','popup_left')
    positionPopUp('myicon58-8','popup_left')
    positionPopUp('myicon58-9','popup_left')
    positionPopUp('myicon58-10','popup_left')
    positionPopUp('myicon58-11','popup_left')
    positionPopUp('myicon58-12','popup_left')
    positionPopUp('myicon58-13','popup_left')
    positionPopUp('myicon58-14','popup_left')
    positionPopUp('myicon58-15','popup_left')

    //row59
    positionPopUp('myicon59-0','popup_left')
    positionPopUp('myicon59-1','popup_left')
    positionPopUp('myicon59-2','popup_left')
    positionPopUp('myicon59-3','popup_left')
    positionPopUp('myicon59-4','popup_left')
    positionPopUp('myicon59-5','popup_left')
    positionPopUp('myicon59-6','popup_left')
    positionPopUp('myicon59-7','popup_left')
    positionPopUp('myicon59-8','popup_left')

    //row60
    positionPopUp('myicon60-0','popup_left')
    positionPopUp('myicon60-1','popup_left')
    positionPopUp('myicon60-2','popup_left')
    positionPopUp('myicon60-3','popup_left')
    positionPopUp('myicon60-4','popup_left')
    positionPopUp('myicon60-5','popup_left')
    positionPopUp('myicon60-6','popup_left')
    positionPopUp('myicon60-7','popup_left')
    positionPopUp('myicon60-8','popup_left')

     //row61
    positionPopUp('myicon61-0','popup_left')
    positionPopUp('myicon61-1','popup_left')
    positionPopUp('myicon61-2','popup_left')

     //row62
    positionPopUp('myicon62-0','popup_left')
    positionPopUp('myicon62-1','popup_left')
    positionPopUp('myicon62-2','popup_left')
    positionPopUp('myicon62-3','popup_left')
    positionPopUp('myicon62-4','popup_left')
    positionPopUp('myicon62-5','popup_left')
    positionPopUp('myicon62-6','popup_left')
    positionPopUp('myicon62-7','popup_left')
    positionPopUp('myicon62-8','popup_left')
    positionPopUp('myicon62-9','popup_left')
    positionPopUp('myicon62-10','popup_left')
    positionPopUp('myicon62-11','popup_left')
    positionPopUp('myicon62-12','popup_left')
    positionPopUp('myicon62-13','popup_left')

     //row63
    positionPopUp('myicon63-0','popup_left')
    positionPopUp('myicon63-1','popup_left')
    positionPopUp('myicon63-2','popup_left')
    positionPopUp('myicon63-3','popup_left')
    positionPopUp('myicon63-4','popup_left')
    positionPopUp('myicon63-5','popup_left')
    positionPopUp('myicon63-6','popup_left')
    positionPopUp('myicon63-7','popup_left')
    positionPopUp('myicon63-8','popup_left')
    positionPopUp('myicon63-9','popup_left')
    positionPopUp('myicon63-10','popup_left')
    positionPopUp('myicon63-11','popup_left')
    positionPopUp('myicon63-12','popup_left')
    positionPopUp('myicon63-13','popup_left')
    positionPopUp('myicon63-14','popup_left')
    positionPopUp('myicon63-15','popup_left')
    positionPopUp('myicon63-16','popup_left')

     //row64
    positionPopUp('myicon64-0','popup_left')
    positionPopUp('myicon64-1','popup_left')
    positionPopUp('myicon64-2','popup_left')
    positionPopUp('myicon64-3','popup_left')
    positionPopUp('myicon64-4','popup_left')
    positionPopUp('myicon64-5','popup_left')
    positionPopUp('myicon64-6','popup_left')
    positionPopUp('myicon64-7','popup_left')
    positionPopUp('myicon64-8','popup_left')
    positionPopUp('myicon64-9','popup_left')
    positionPopUp('myicon64-10','popup_left')
    positionPopUp('myicon64-11','popup_left')

     //row65
    positionPopUp('myicon65-0','popup_left')
    positionPopUp('myicon65-1','popup_left')
    positionPopUp('myicon65-2','popup_left')
    positionPopUp('myicon65-3','popup_left')
    positionPopUp('myicon65-4','popup_left')
    positionPopUp('myicon65-5','popup_left')
    positionPopUp('myicon65-6','popup_left')
    positionPopUp('myicon65-7','popup_left')
    positionPopUp('myicon65-8','popup_left')
    positionPopUp('myicon65-9','popup_left')
    positionPopUp('myicon65-10','popup_left')
    positionPopUp('myicon65-11','popup_left')
    positionPopUp('myicon65-12','popup_left')
    positionPopUp('myicon65-13','popup_left')
    positionPopUp('myicon65-14','popup_left')

     //row66
    positionPopUp('myicon66-0','popup_left')
    positionPopUp('myicon66-1','popup_left')
    positionPopUp('myicon66-2','popup_left')
    positionPopUp('myicon66-3','popup_left')
    positionPopUp('myicon66-4','popup_left')
    positionPopUp('myicon66-5','popup_left')
    positionPopUp('myicon66-6','popup_left')
    positionPopUp('myicon66-7','popup_left')
    positionPopUp('myicon66-8','popup_left')
    positionPopUp('myicon66-9','popup_left')
    positionPopUp('myicon66-10','popup_left')
    positionPopUp('myicon66-11','popup_left')
    positionPopUp('myicon66-12','popup_left')

     //row67
    positionPopUp('myicon67-0','popup_left')
    positionPopUp('myicon67-1','popup_left')
    positionPopUp('myicon67-2','popup_left')
    positionPopUp('myicon67-3','popup_left')
    positionPopUp('myicon67-4','popup_left')
    positionPopUp('myicon67-5','popup_left')
    positionPopUp('myicon67-6','popup_left')
    positionPopUp('myicon67-7','popup_left')

     //row68
    positionPopUp('myicon68-0','popup_left')
    positionPopUp('myicon68-1','popup_left')
    positionPopUp('myicon68-2','popup_left')
    positionPopUp('myicon68-3','popup_left')
    positionPopUp('myicon68-4','popup_left')
    positionPopUp('myicon68-5','popup_left')
    positionPopUp('myicon68-6','popup_left')
    positionPopUp('myicon68-7','popup_left')
    positionPopUp('myicon68-8','popup_left')
    positionPopUp('myicon68-9','popup_left')
    positionPopUp('myicon68-10','popup_left')

     //row70
    positionPopUp('myicon70-0','popup_left')
    positionPopUp('myicon70-1','popup_left')
    positionPopUp('myicon70-2','popup_left')
    positionPopUp('myicon70-3','popup_left')
    positionPopUp('myicon70-4','popup_left')
    positionPopUp('myicon70-5','popup_left')
    positionPopUp('myicon70-6','popup_left')

     //row70
    positionPopUp('myicon71-0','popup_left')
    positionPopUp('myicon71-1','popup_left')
    positionPopUp('myicon71-2','popup_left')
    positionPopUp('myicon71-3','popup_left')
    positionPopUp('myicon71-4','popup_left')
    positionPopUp('myicon71-5','popup_left')
    positionPopUp('myicon71-6','popup_left')
    positionPopUp('myicon71-7','popup_left')
    positionPopUp('myicon71-8','popup_left')

    //row71
    positionPopUp('myicon72-0','popup_left')
    positionPopUp('myicon72-1','popup_left')
    positionPopUp('myicon72-2','popup_left')
    positionPopUp('myicon72-3','popup_left')
    positionPopUp('myicon72-4','popup_left')
    positionPopUp('myicon72-5','popup_left')
    positionPopUp('myicon72-6','popup_left')
    positionPopUp('myicon72-7','popup_left')
    positionPopUp('myicon72-8','popup_left')
    positionPopUp('myicon72-9','popup_left')
    positionPopUp('myicon72-10','popup_left')
    positionPopUp('myicon72-11','popup_left')
    positionPopUp('myicon72-12','popup_left')
    positionPopUp('myicon72-13','popup_left')
    positionPopUp('myicon72-14','popup_left')
    positionPopUp('myicon72-15','popup_left')
    positionPopUp('myicon72-16','popup_left')
    positionPopUp('myicon72-17','popup_left')

    //row72
    positionPopUp('myicon73-0','popup_left')
    positionPopUp('myicon73-1','popup_left')
    positionPopUp('myicon73-2','popup_left')
    positionPopUp('myicon73-3','popup_left')
    positionPopUp('myicon73-4','popup_left')
    positionPopUp('myicon73-5','popup_left')
    positionPopUp('myicon73-6','popup_left')
    positionPopUp('myicon73-7','popup_left')
    positionPopUp('myicon73-8','popup_left')
    positionPopUp('myicon73-9','popup_left')

    //row73
    positionPopUp('myicon74-0','popup_left')
    positionPopUp('myicon74-1','popup_left')
    positionPopUp('myicon74-2','popup_left')

    //row74
    positionPopUp('myicon75-0','popup_left')
    positionPopUp('myicon75-1','popup_left')
    positionPopUp('myicon75-2','popup_left')
    positionPopUp('myicon75-3','popup_left')
    positionPopUp('myicon75-4','popup_left')
    positionPopUp('myicon75-5','popup_left')
    positionPopUp('myicon75-6','popup_left')
    positionPopUp('myicon75-7','popup_left')
    positionPopUp('myicon75-8','popup_left')
    positionPopUp('myicon75-9','popup_left')
    positionPopUp('myicon75-10','popup_left')
    positionPopUp('myicon75-11','popup_left')
    positionPopUp('myicon75-12','popup_left')

    //row74
    positionPopUp('myicon76-0','popup_left')
    positionPopUp('myicon76-1','popup_left')
    positionPopUp('myicon76-2','popup_left')
    positionPopUp('myicon76-3','popup_left')
    
    //row75
    positionPopUp('myicon77-0','popup_left')
    positionPopUp('myicon77-1','popup_left')
    positionPopUp('myicon77-2','popup_left')
    positionPopUp('myicon77-3','popup_left')
    positionPopUp('myicon77-4','popup_left')
    positionPopUp('myicon77-5','popup_left')

    //row77
    positionPopUp('myicon78-0','popup_left')
    positionPopUp('myicon78-1','popup_left')
    positionPopUp('myicon78-2','popup_left')
    positionPopUp('myicon78-3','popup_left')
    positionPopUp('myicon78-4','popup_left')
    positionPopUp('myicon78-5','popup_left')

     //row78
     positionPopUp('myicon79-0','popup_left')
     positionPopUp('myicon79-1','popup_left')
     positionPopUp('myicon79-2','popup_left')
     positionPopUp('myicon79-3','popup_left')
     positionPopUp('myicon79-4','popup_left')

     //row80
     positionPopUp('myicon80-0','popup_left')
     positionPopUp('myicon80-1','popup_left')
     positionPopUp('myicon80-2','popup_left')
     positionPopUp('myicon80-3','popup_left')
     positionPopUp('myicon80-4','popup_left')

     //row81
     positionPopUp('myicon81-0','popup_left')
     positionPopUp('myicon81-1','popup_left')
     positionPopUp('myicon81-2','popup_left')
     positionPopUp('myicon81-3','popup_left')
     positionPopUp('myicon81-4','popup_left')
     positionPopUp('myicon81-5','popup_left')
     positionPopUp('myicon81-6','popup_left')
     positionPopUp('myicon81-7','popup_left')

/////popup_down

switch(num){
    case ('st51 st52 st53 text1'):
    computeVariable2(0)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case ('st51 st52 st53 text1 greenTxt'):
    computeVariable2(0)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text2':
    computeVariable2(1)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text2 greenTxt':
    computeVariable2(1)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text3':
    computeVariable2(2)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text3 greenTxt':
    computeVariable2(2)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text4':
    computeVariable2(3)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text4 greenTxt':
    computeVariable2(3)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text5':
    computeVariable2(4)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text5 greenTxt':
    computeVariable2(4)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text6':
    computeVariable2(5)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text6 greenTxt':
    computeVariable2(5)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text7':
    computeVariable2(6)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text7 greenTxt':
    computeVariable2(6)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text8':
    computeVariable2(7)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text8 greenTxt':
    computeVariable2(7)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text9':
    computeVariable2(8)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text9 greenTxt':
    computeVariable2(8)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text10':
    computeVariable2(9)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text10 greenTxt':
    computeVariable2(9)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text11':
    computeVariable2(10)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text11 greenTxt':
    computeVariable2(10)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text12':
    computeVariable2(11)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text12 greenTxt':
    computeVariable2(11)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text13':
    computeVariable2(12)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text13 greenTxt':
    computeVariable2(12)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text14':
    computeVariable2(13)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text14 greenTxt':
    computeVariable2(13)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text15':
    computeVariable2(14)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text15 greenTxt':
    computeVariable2(14)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text16':
    computeVariable2(15)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text16 greenTxt':
    computeVariable2(15)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text17':
    computeVariable2(16)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text17 greenTxt':
    computeVariable2(16)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text18':
    computeVariable2(17)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text18 greenTxt':
    computeVariable2(17)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text19':
    computeVariable2(18)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text19 greenTxt':
    computeVariable2(18)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text20':
    computeVariable2(19)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text20 greenTxt':
    computeVariable2(19)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text21':
    computeVariable2(20)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text21 greenTxt':
    computeVariable2(20)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text22':
    computeVariable2(21)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text22 greenTxt':
    computeVariable2(21)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text23':
    computeVariable2(22)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text23 greenTxt':
    computeVariable2(22)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text24':
    computeVariable2(23)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text24 greenTxt':
    computeVariable2(23)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text25':
    computeVariable2(24)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text25 redTxt':
    computeVariable2(24)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text26':
    computeVariable2(25)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text26 greenTxt':
    computeVariable2(25)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text27':
    computeVariable2(26)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text27 redTxt':
    computeVariable2(26)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text28':
    computeVariable2(27)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text28 greenTxt':
    computeVariable2(27)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text29':
    computeVariable2(28)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text29 greenTxt':
    computeVariable2(28)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text30':
    computeVariable2(29)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text30 greenTxt':
    computeVariable2(29)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text31':
    computeVariable2(30)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text31 greenTxt':
    computeVariable2(30)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text32':
    computeVariable2(31)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text32 greenTxt':
    computeVariable2(31)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text33':
    computeVariable2(32)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text33 greenTxt':
    computeVariable2(32)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text34':
    computeVariable2(33)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text34 yellowTxt':
    computeVariable2(33)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text35':
    computeVariable2(34)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text35 greenTxt':
    computeVariable2(34)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text36':
    computeVariable2(35)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text36 greenTxt':
    computeVariable2(35)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text37':
    computeVariable2(36)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text37 greenTxt':
    computeVariable2(36)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text38':
    computeVariable2(37)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text38 greenTxt':
    computeVariable2(37)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text39':
    computeVariable2(38)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text39 greenTxt':
    computeVariable2(38)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text40':
    computeVariable2(39)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text40 greenTxt':
    computeVariable2(39)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text41':
    computeVariable2(40)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text41 greenTxt':
    computeVariable2(40)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text42':
    computeVariable2(41)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text42 greenTxt':
    computeVariable2(41)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text43':
    computeVariable2(42)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text43 greenTxt':
    computeVariable2(42)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text44':
    computeVariable2(43)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text44 greenTxt':
    computeVariable2(43)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text45':
    computeVariable2(44)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text45 greenTxt':
    computeVariable2(44)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text46':
    computeVariable2(45)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text46 greenTxt':
    computeVariable2(45)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text47':
    computeVariable2(46)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text47 greenTxt':
    computeVariable2(46)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text48':
    computeVariable2(47)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text48 redTxt':
    computeVariable2(47)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text49':
    computeVariable2(48)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text49 yellowTxt':
    computeVariable2(48)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text50':
    computeVariable2(49)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text50 greenTxt':
    computeVariable2(49)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text51':
    computeVariable2(50)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text51 greenTxt':
    computeVariable2(50)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text52':
    computeVariable2(51)
    changeText2(info1,info2,info3,info4,info5)
    break;
 
    case 'st51 st52 st53 text52 redTxt':
    computeVariable2(51)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text53':
    computeVariable2(52)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text53 greenTxt':
    computeVariable2(52)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text54':
    computeVariable2(53)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text54 redTxt':
    computeVariable2(53)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text55':
    computeVariable2(54)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text55 greenTxt':
    computeVariable2(54)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text56':
    computeVariable2(55)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text56 greenTxt':
    computeVariable2(55)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text57':
    computeVariable2(56)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text58':
    computeVariable2(57)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text58 greenTxt':
    computeVariable2(57)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text59':
    computeVariable2(58)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text59 greenTxt':
    computeVariable2(58)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text60':
    computeVariable2(59)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text60 greenTxt':
    computeVariable2(59)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text61':
    computeVariable2(60)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text61 greenTxt':
    computeVariable2(60)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text62':
    computeVariable2(61)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text62 greenTxt':
    computeVariable2(61)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text63':
    computeVariable2(62)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text63 greenTxt':
    computeVariable2(62)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text64':
    computeVariable2(63)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text64 greenTxt':
    computeVariable2(63)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text65':
    computeVariable2(64)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text65 greenTxt':
    computeVariable2(64)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text66':
    computeVariable2(65)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text66 greenTxt':
    computeVariable2(65)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text67':
    computeVariable2(66)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text67 greenTxt':
    computeVariable2(66)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text68':
    computeVariable2(67)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text68 greenTxt':
    computeVariable2(67)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text69':
    computeVariable2(68)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text69 greenTxt':
    computeVariable2(68)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text70':
    computeVariable2(69)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text70 greenTxt':
    computeVariable2(69)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text71':
    computeVariable2(70)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text71 greenTxt':
    computeVariable2(70)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text72':
    computeVariable2(71)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text72 greenTxt':
    computeVariable2(71)
    changeText2(info1,info2,info3,info4,info5)
    break;
    
    case 'st51 st52 st53 text73':
    computeVariable2(72)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text73 yellowTxt':
    computeVariable2(72)
    changeText2(info1,info2,info3,info4,info5)
    break;
     
    case 'st51 st52 st53 text74':
    computeVariable2(73)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text74 greenTxt':
    computeVariable2(73)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text75':
    computeVariable2(74)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text75 greenTxt':
    computeVariable2(74)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text76':
    computeVariable2(75)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text76 greenTxt':
    computeVariable2(75)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text77':
    computeVariable2(76)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text77 yellowTxt':
    computeVariable2(76)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text78':
    computeVariable2(77)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text78 yellowTxt':
    computeVariable2(77)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text79':
    computeVariable2(78)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text79 yellowTxt':
    computeVariable2(78)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text80':
    computeVariable2(79)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text80 green':
    computeVariable2(79)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text81':
    computeVariable2(80)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text81 greenTxt':
    computeVariable2(80)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text82':
    computeVariable2(81)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text82 greenTxt':
    computeVariable2(81)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text83':
    computeVariable2(82)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text83 greenTxt':
    computeVariable2(82)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text84':
    computeVariable2(83)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text84 greenTxt':
    computeVariable2(83)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 text85':
    computeVariable2(84)
    changeText2(info1,info2,info3,info4,info5)
    break;

    case 'st51 st52 st53 greenTxt':
    computeVariable2(84)
    changeText2(info1,info2,info3,info4,info5)
    break;



}



positionPopUp('myfood','popup_down');
positionPopUp('myfood2','popup_down');
positionPopUp('myfood3','popup_down');
positionPopUp('myfood4','popup_down');
positionPopUp('myfood5','popup_down');
positionPopUp('myfood6','popup_down');
positionPopUp('myfood7','popup_down');
positionPopUp('myfood8','popup_down');
positionPopUp('myfood9','popup_down');
positionPopUp('myfood10','popup_down');

positionPopUp('myfood11','popup_down');
positionPopUp('myfood12','popup_down');
positionPopUp('myfood13','popup_down');
positionPopUp('myfood14','popup_down');
positionPopUp('myfood15','popup_down');
positionPopUp('myfood16','popup_down');
positionPopUp('myfood17','popup_down');
positionPopUp('myfood18','popup_down');
positionPopUp('myfood19','popup_down');
positionPopUp('myfood20','popup_down');

positionPopUp('myfood21','popup_down');
positionPopUp('myfood22','popup_down');
positionPopUp('myfood23','popup_down');
positionPopUp('myfood24','popup_down');
positionPopUp('myfood25','popup_down');
positionPopUp('myfood26','popup_down');
positionPopUp('myfood27','popup_down');
positionPopUp('myfood28','popup_down');
positionPopUp('myfood29','popup_down');
positionPopUp('myfood30','popup_down');

positionPopUp('myfood31','popup_down');
positionPopUp('myfood32','popup_down');
positionPopUp('myfood33','popup_down');
positionPopUp('myfood34','popup_down');
positionPopUp('myfood35','popup_down');
positionPopUp('myfood36','popup_down');
positionPopUp('myfood37','popup_down');
positionPopUp('myfood38','popup_down');
positionPopUp('myfood39','popup_down');
positionPopUp('myfood40','popup_down');

positionPopUp('myfood41','popup_down');
positionPopUp('myfood42','popup_down');
positionPopUp('myfood43','popup_down');
positionPopUp('myfood44','popup_down');
positionPopUp('myfood45','popup_down');
positionPopUp('myfood46','popup_down');
positionPopUp('myfood47','popup_down');
positionPopUp('myfood48','popup_down');
positionPopUp('myfood49','popup_down');
positionPopUp('myfood50','popup_down');

positionPopUp('myfood51','popup_down');
positionPopUp('myfood52','popup_down');
positionPopUp('myfood53','popup_down');
positionPopUp('myfood54','popup_down');
positionPopUp('myfood55','popup_down');
positionPopUp('myfood56','popup_down');
positionPopUp('myfood57','popup_down');
positionPopUp('myfood58','popup_down');
positionPopUp('myfood59','popup_down');
positionPopUp('myfood60','popup_down');

positionPopUp('myfood61','popup_down');
positionPopUp('myfood62','popup_down');
positionPopUp('myfood63','popup_down');
positionPopUp('myfood64','popup_down');
positionPopUp('myfood65','popup_down');
positionPopUp('myfood66','popup_down');
positionPopUp('myfood67','popup_down');
positionPopUp('myfood68','popup_down');
positionPopUp('myfood69','popup_down');
positionPopUp('myfood70','popup_down');

positionPopUp('myfood71','popup_down');
positionPopUp('myfood72','popup_down');
positionPopUp('myfood73','popup_down');
positionPopUp('myfood74','popup_down');
positionPopUp('myfood75','popup_down');
positionPopUp('myfood76','popup_down');
positionPopUp('myfood77','popup_down');
positionPopUp('myfood78','popup_down');
positionPopUp('myfood79','popup_down');
positionPopUp('myfood80','popup_down');

positionPopUp('myfood81','popup_down');
positionPopUp('myfood82','popup_down');
positionPopUp('myfood83','popup_down');
positionPopUp('myfood84','popup_down');
positionPopUp('myfood85','popup_down');


}



})
})
})
}else{
    alert('Unable to get data')
}
//pop2 内容全部改成0； 设置好其他的id，通过innerHTML改内容；加上：GI level（最前面）和对哪个身体部分好；
// 背景通过style.css改
//xhtml从外部引入json文件
//原图,按感觉规









