/**
 * Created by HermawanRahmatHidaya on 26/11/2016.
 */
var peopleData = {staff:null,student:null};
var newsData = [];
var slidedNewsData = [];

var dataRoom = document.getElementsByTagName("body")[0].getAttribute("data-room");
var urlPersonUpdate = "../signage/data?person=true&room="+dataRoom;

var hasBeenAnimated = false;

//var switchVideo = false;
var switchVideo = true; // default = true
var playNews = false;

var timeInput;
var loopTime;


function refresh(){
    location.reload(true);
}

//setTimeout(refresh, 900000);

// Warn if overriding existing method
if(Array.prototype.equals) console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a false value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] instanceof  Object && array[i] instanceof Object){
            for(var propertyName in this[i]){
                if(this[i][propertyName] !== array[i][propertyName]){
                    return false;
                }
            }
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

if(Object.prototype.equals) console.warn("Overriding existing Object.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function update(){
    var temp = {staff:[],student:[] };
    var tempNews = [];
    $.ajax({
        url: urlPersonUpdate,
        success: function(response){
            if(!response.error){
                $.each(response.people, function(i, val){
                    switch(i){
                        case "staff":
                            temp.staff.push(val);
                            break;
                        case "student":
                            temp.student.push(val);
                            break;
                    }
                });
                $.each(response.news, function(i, val){
                    tempNews.push(val);
                });
            }else{
                setTimeout(refresh, 5000);
                // console.log("Error");
            }
        },
        error: function(){
            setTimeout(refresh, 5000);
        },
        complete: function () {
            peopleData = temp;
            newsData = tempNews;
            setTimeout(update, 5000);
            if(!hasBeenAnimated){
                hasBeenAnimated = true;
                startSlider();
                startStudentList();
            }
        }
    })
}

function videoAndNews() {
    var tempNews = [];
    $.ajax({
        url: urlPersonUpdate,

        success: function (response) {
            $.each(response.news, function (i, val) {
                tempNews.push(val);
            });
        },
        error: function(){
            setTimeout(refresh, 5000);
        },

        complete: function () {
            setTimeout(videoAndNews, 5000);
            if (switchVideo) {
                onPlayerReady(); // play
            }
            if (!switchVideo) {
                if (!playNews) {
                    playNews = true;
                    console.log("loop time started");
                    setNewsToSlider();
                    setTimeout(refresh, loopTime); //15 minutes
                    setTimeout(slideNews, 10000);
                }
                if (!newsData.equals(slidedNewsData)) {
                    console.log("News Updated");
                    setNewsToSlider();
                }
            }



        }

    })
}

var videoList = [];
var urlVideo = "../signage/video?person=true&room="+dataRoom;
function getLink(){
    var tempLink = [];
    $.ajax({
        url: urlVideo,

        success: function (response){

            if(!response.error){
                $.each(response.video, function (i,val) {
                    tempLink.push(val);

                });
            }
            else{
                console.log("video Error");
            }
        },
        complete : function () {
            videoList = tempLink;
            console.log("video updated");
            console.log(videoList.length);
            if (videoList.length >1){
                   callplayer();
               }

            else
            {
                switchVideo = false;
            }

        }

    })

}


function reloadTime(){
    if (sessionStorage.getItem('timeInput', timeInput) == null){
        timeInput = 15;// minutes
        console.log("manual input  " + timeInput);
    }else{
        timeInput = sessionStorage.getItem('timeInput', timeInput);
    }
    loopTime = timeInput*60*1000;
    console.log("loop  "+loopTime);
}

function promptLoop(){
    timeInput = prompt("Show News for \n(minutes)\nThe default is 15 minutes", "15");
    refresh();
    if (timeInput !=null && timeInput >=1 ){
        if (timeInput % 1 === 0){
            sessionStorage.setItem('timeInput', timeInput);
        }
       else {
            promptLoop();
        }
    }else if (timeInput <1){
        promptLoop();
    }
}

function checkAPI() {
    var myScript = document.createElement('script');
    myScript.src = 'https://youtube.com/iframe_api';
    myScript.onload = function() {
        console.log('youtube loaded');
    };

      if  (document.body.appendChild(myScript)){
          return true;
      }
      else{
          switchVideo = false;
      }

}

getLink();
//checkAPI();
update();
videoAndNews();
// interrupt if enter key press, prompting for user input
$(document).keyup(function(e) {
    if (e.keyCode === 13) {
        promptLoop();
    }
});

reloadTime();

console.log("session storage  " + sessionStorage.getItem('timeInput', timeInput));

function addAList(person){
    var list = document.getElementById('list-people');
    var newLI = document.createElement('li');

    // Add Profile Picture
    var img = document.createElement('img');
    img.className = "img-rounded person-picture";
    img.setAttribute("width", "64");
    img.setAttribute("height", "64");
    img.setAttribute("src", person.image_link);
    newLI.appendChild(img);

    // Add text descriptions
    var textDiv = document.createElement("div");
    textDiv.className = "text-div";
    textDiv.innerHTML += "<div class='person-name ellipsis'>" + person.name + "</div>";
    textDiv.innerHTML += "<div class='person-description ellipsis'>" + person.description + "</div>";
    var temp = "<div class='person-last-checked-in ellipsis'>";
    if(person.last_checked_in != null){
        temp += moment(person.last_checked_in, "YYYY-MM-DD H:mm:ss").fromNow();
    }else{
        temp += "Never Checked In";
    }
    if(person.message != null){
        temp += " - " + person.message;
    }
    temp += "</div>";
    textDiv.innerHTML += temp;
    newLI.appendChild(textDiv);

    // Add Status Button
    var status = document.createElement('button');
    status.setAttribute("type", "button");
    status.className = "status-btn btn";
    if(person.is_presence){
        status.className += " btn-success";
        status.innerHTML = "IN";
    }else{
        status.className += " btn-danger";
        status.innerHTML = "OUT";
    }
    newLI.appendChild(status);
    newLI.className = "list-group-item hidden-list fade swing";
    list.appendChild(newLI);

    setTimeout(function() {
        newLI.className = newLI.className + " show";
    }, 100);
}

function setTitleList(title) {
    document.getElementById("title-list").innerHTML=title;
}

function clearPeopleList(){
    document.getElementById('list-people').innerHTML = "";
}

var currentRoleOrder = 0;
var numShownOfARole = 0;
var numMaxList = 6;
var timeoutSlider = 8000;
function startSlider() {
    clearPeopleList();
    var reminder;
    var i=0;
    setTitleList("Staffs");
    if (peopleData.staff.length == 0) {
        currentRoleOrder = 0;
        numShownOfARole = 0;
        startSlider();
    } else {
        if (numShownOfARole < peopleData.staff[0].length) {
            reminder = peopleData.staff[0].length - numShownOfARole;
            if (reminder > numMaxList) {
                for (i = 0; i < numMaxList; i++) {
                    addAList(peopleData.staff[0][numShownOfARole++]);
                }
            } else {
                for (i = 0; i < reminder; i++) {
                    addAList(peopleData.staff[0][numShownOfARole++]);
                }
                currentRoleOrder = 0;
                numShownOfARole = 0;
            }
        }
        setTimeout(startSlider, timeoutSlider);
    }
}


function addAStudentList(person){
    var list = document.getElementById('list-students');
    var newLI = document.createElement('li');

    // Add Profile Picture
    var img = document.createElement('img');
    img.className = "img-rounded student-picture";
    img.setAttribute("width", "74px");
    img.setAttribute("height", "74px");
    img.setAttribute("src", person.image_link);
    newLI.appendChild(img);

    // Add text descriptions
    var textDiv = document.createElement("div");
    textDiv.className = "text-student-div";
    textDiv.innerHTML += "<div class='student-name'>" + person.name + "</div>";
    textDiv.innerHTML += "<div class='student-description'>" + person.description + "</div>";
    newLI.appendChild(textDiv);
    newLI.className = "list-group-item list-group-item-horizontal hidden-list fade swing";
    list.appendChild(newLI);

    setTimeout(function() {
        newLI.className = newLI.className + " show";
    }, 100);
}


function clearStudentList(){
    document.getElementById('list-students').innerHTML = "";
}

var numOfShownStudents = 0;
var numMaxStudentList = 6;
var timeoutStudentList = 5000;
var reminder = 0;
function startStudentList() {
    clearStudentList();
    var i=0;

    if (peopleData.student.length === 0) {
        // No Student
    } else {

        var shown = false;
       // console.log("Number shown of student :"+numOfShownStudents);
       // console.log("Number length of student :"+peopleData.student[0].length);
        if (numOfShownStudents < peopleData.student[0].length) {
            //    console.log("Hola 3");
            reminder = peopleData.student[0].length - numOfShownStudents;
         //   console.log("reminder " + reminder);
            if (reminder > numMaxStudentList) {
                //  console.log("Hola, reminder > capacity");
                for (i = 0; i < numMaxStudentList; i++) {
                    if(numOfShownStudents > peopleData.student[0].length-1){
                        numOfShownStudents = 0;
                        break;
                    }
                    if(peopleData.student[0][numOfShownStudents].is_presence){
                        addAStudentList(peopleData.student[0][numOfShownStudents++],i);
                        shown = true;
                    }else{
                        numOfShownStudents++;
                        i--;
                    }
                }
            } else {

                for (i = 0; i < reminder; i++) {
                    if(numOfShownStudents > peopleData.student[0].length-1){
                        break;
                    }
                    if(peopleData.student[0][numOfShownStudents].is_presence){
                        addAStudentList(peopleData.student[0][numOfShownStudents++], i);
                        shown = true;
                    }else{
                        numOfShownStudents++;
                        i--;
                    }
                }
                numOfShownStudents = 0;
                console.log("reset");
            }
        }else{
            numOfShownStudents = 0;
            console.log("reset");
        }
    }

    setTimeout(startStudentList, timeoutStudentList);
}

// News Handler
function doAnimations( elems ) {
    //Cache the animationend event in a variable
    var animEndEv = 'webkitAnimationEnd animationend';

    elems.each(function () {
        var $this = $(this),
            $animationType = $this.data('animation');
        $this.addClass($animationType).one(animEndEv, function () {
            $this.removeClass($animationType);
        });
    });
}

var $newsCarousel = $('#newsCarousel');

var slideNumber = 0;
function setNewsToSlider() {
    slideNumber = 0;
    slidedNewsData = newsData;
    var newsWrapper = document.getElementById("newsWrapper");
    var newsIndicator = document.getElementById("newsIndicator");
    newsWrapper.innerHTML = "";
    newsIndicator.innerHTML = "";
    slidedNewsData.forEach(function(value, i){
        // console.log(value);
        var divItem = document.createElement('div');
        divItem.className = "item";
        if(i==0){divItem.className = "item active";}

        var img = document.createElement('img');
        img.className = "carousel-img";
        img.setAttribute("src", value.image_link);
        divItem.appendChild(img);

        var divCarouselCaption = document.createElement("div");
        divCarouselCaption.className = "carousel-caption";
        var divContainerCaption = document.createElement("div");
        divContainerCaption.className = "container";

        var newsTitle = document.createElement("h2");
        newsTitle.className = "news-title";
        newsTitle.innerHTML = value.title;
        newsTitle.setAttribute("data-animation", "animated bounceInLeft");
        divContainerCaption.appendChild(newsTitle);

        var newsContent = document.createElement("p");
        newsContent.className = "news-content";
        newsContent.innerHTML = value.content;
        newsContent.setAttribute("data-animation", "animated bounceInRight");
        divContainerCaption.appendChild(newsContent);

        var newsAuthor = document.createElement("p");
        newsAuthor.className = "news-author";
        newsAuthor.innerHTML = value.author;
        newsAuthor.setAttribute("data-animation", "animated zoomInRight");
        divContainerCaption.appendChild(newsAuthor);

        divCarouselCaption.appendChild(divContainerCaption);
        divItem.appendChild(divCarouselCaption);
        newsWrapper.appendChild(divItem);

        var bullet = document.createElement("li");
        bullet.setAttribute("data-target", "#newsCarousel");
        bullet.setAttribute("data-slide-to", i);
        if(i == 0){bullet.className="active";}
        newsIndicator.appendChild(bullet);
    });
    // console.log(slideNumber);

    var $firstAnimatingElems = $newsCarousel.find('.item:first').find("[data-animation ^= 'animated']");
    $newsCarousel.carousel();

    doAnimations($firstAnimatingElems);
    $newsCarousel.carousel('pause');

    $newsCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });
}

function slideNews(){
    $newsCarousel.carousel('next');
    slideNumber++;
    setTimeout(slideNews, 20000);
}



// Video Player handler
function callplayer(){
    if( typeof(YT) === 'undefined' || typeof(YT.Player) ==='undefined' ){
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function(){
            onYoutubePlayer();
        }
    } else{
        onYoutubePlayer();
    }

}



var player;
function onYoutubePlayer() {
   player = new YT.Player('player', {
        height: '95%',
        width: '100%',
        playerVars: {rel: 0, controls: 0},

        events: {

            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

var index=1;

function onPlayerReady(event) {
    try{
        event.target.setVolume(0);
        event.target.loadVideoById(videoList[index].videolink, 0, "medium");
        event.target.playVideo();
    }
       catch (e){
        switchVideo = true;
       }


}

var done = false;

function onPlayerStateChange(event) {
    try {
        if (event.data === 0) {
            if (index < videoList.length - 1) {
                index++;
                event.target.loadVideoById(videoList[index].videolink, 0, "medium");
            }
            else if (index = videoList.length) {
                index = 1;
                switchVideo = false;
                event.target.destroy();

            }
// if buffering take too long
            else if (event.data === 3) {
                event.target.destroy();
                switchVideo = false;

            }

            else if (event.data === 5) {
                event.target.destroy();
                switchVideo = false;
            }
        }
    }
    catch (e){switchVideo = true;}
}