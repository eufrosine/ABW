/**
 * Created by HermawanRahmatHidaya on 26/11/2016.
 */
var peopleData = {director:null,staff:null,student:null};
var newsData = [];
var slidedNewsData = [];

var dataRoom = document.getElementsByTagName("body")[0].getAttribute("data-room");
var urlPersonUpdate = "../signage/data?person=true&room="+dataRoom;

var hasBeenAnimated = false;

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
    var temp = {director:[],staff:[],student:[] };
    var tempNews = [];
    $.ajax({
        url: urlPersonUpdate,
        success: function(response){
            if(!response.error){
                $.each(response.people, function(i, val){
                    switch(i){
                        case "director":
                            temp.director.push(val);
                            break;
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
                console.log("Error");
            }
        },
        complete: function () {
            peopleData = temp;
            newsData = tempNews;
            console.log("Updated");
            setTimeout(update, 5000);
            if(!hasBeenAnimated){
                hasBeenAnimated = true;
                startSlider();
                startStudentList();
                setNewsToSlider();
                setTimeout(slideNews, 10000);
            }
            if(!newsData.equals(slidedNewsData)){
                console.log("News Updated");
                setNewsToSlider();
            }

        }
    })
}

update();

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
    textDiv.innerHTML += "<div class='person-name'>" + person.name + "</div>";
    textDiv.innerHTML += "<div class='person-description'>" + person.description + "</div>";
    if(person.last_checked_in != null){
        textDiv.innerHTML += "<div class='person-last-checked-in'>" + moment(person.last_checked_in, "YYYY-MM-DD H:mm:ss").fromNow();
        if(person.message != null){
            textDiv.innerHTML += " - " + person.message;
        }
        textDiv.innerHTML += "</div>";
    }else{
        textDiv.innerHTML += "Never Checked In";
    }
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
    switch(currentRoleOrder) {
        case 0:
            setTitleList("Directors");
            if (peopleData.director.length == 0) {
                currentRoleOrder++;
                numShownOfARole = 0;
                startSlider();
            } else {
                if (numShownOfARole < peopleData.director[0].length) {
                    reminder = peopleData.director[0].length - numShownOfARole;
                    if (reminder > numMaxList) {
                        for (i = 0; i < numMaxList; i++) {
                            addAList(peopleData.director[0][numShownOfARole++]);
                        }
                    } else {
                        for (i = 0; i < reminder; i++) {
                            addAList(peopleData.director[0][numShownOfARole++]);
                        }
                        currentRoleOrder++;
                        numShownOfARole = 0;
                    }
                }
                setTimeout(startSlider, timeoutSlider);
            }
            break;
        case 1:
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
                if(peopleData.director.length > 0 || peopleData.staff.length >0) {
                    setTimeout(startSlider, timeoutSlider);
                }
            }
            break;
    }
}


function addAStudentList(person, num){
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
function startStudentList() {
    clearStudentList();
    var reminder;
    var i=0;
    if (peopleData.student.length == 0) {
        // No Student
    } else {
        var shown = false;
        if (numOfShownStudents < peopleData.student[0].length) {
            reminder = peopleData.student[0].length - numOfShownStudents;
            console.log("remider " + reminder);
            if (reminder > numMaxStudentList) {
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
            }
        }
        setTimeout(startStudentList, timeoutStudentList);
    }
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
    console.log(slideNumber);

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