// JavaScript Document
var TodaysDate = new Date();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var shortMonths = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
var theMonth = months[TodaysDate.getMonth()];
var abbreviatedMonth = shortMonths[TodaysDate.getMonth()];
var theDay = days[TodaysDate.getDay()];
var theYear = TodaysDate.getFullYear();
var theDate = TodaysDate.getDate();
		
var theHour = TodaysDate.getHours();
var theMinute = TodaysDate.getMinutes();
var ampm = "AM";
theHour = checkAMPM(theHour);
theMinute = checkMin(theMinute);
var currentDate = theDay + ", " +abbreviatedMonth + " " + theDate;
var currentDate = currentDate.toUpperCase();
var currentTime = theHour + ":" + theMinute + " " + ampm;
var currentlyHTML = "";

var vid;
var videoDuration;
var videoDurationInMilliseconds;
var newsDuration;
var newsDurationInMilliseconds;
var customDuration;
var timeDateDuration;
var css;
var css2;
var head;
var style;
var duration2;
var imagefilepath;
/*var imagefilepath1 = "https://retail.adrenalineshot.com/rss/Xnews/news/1920/";
var imagefilepath2 = "https://retail.adrenalineshot.com/rss/Xnews/celeb/1920/";
var imagefilepath3 = "https://retail.adrenalineshot.com/rss/Xnews/sports/1920/";*/
var imagefilepath1 = "../xml/xnews/news/";
var imagefilepath2 = "../xml/xnews/celeb/";
var imagefilepath3 = "../xml/xnews/sports/";
var category;
var ranNums = shuffle([0,1,2,3,4,5,6,7,8,9]);
var noCacheVar = TodaysDate.valueOf();

var logo = "QuinteFirst.png";



// FUNCTIONS ------------------------------------------------------------------//





function checkMin(i) {
	if (i<10) {i = "0" + i};  	// add zero in front of numbers < 10
	return i;
}
function checkAMPM(i) {
	if(i>=12) {ampm = "PM"};	// change from military format
	if(i>12) {i = i - 12 };		// change from military format
	return i;
}

function loadXMLDoc(dname) {
	var xhttp;
	if (window.XMLHttpRequest) { 
		xhttp=new XMLHttpRequest();
	} else { 
		xhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
	}
	xhttp.open("GET",dname,false);
	xhttp.send();
	return xhttp.responseXML;
}



function shuffle(array) {
	var i = array.length,
		j = 0,
		temp;
		
	while (i--) {
		j = Math.floor(Math.random() * (i+1));
	
		// swap randomly chosen element with current element
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}


//---------------------------------------------------------------------//



window.onload = function() {
	//set duration of the video intro
	customDuration = document.getElementById('custom_intro_duration').value;
	if(customDuration === ""){
		//find the duration of the video
		vid = document.getElementById('intro');
		videoDuration = vid.duration;
	} else {
		videoDuration = customDuration;
	}
	videoDurationInMilliseconds = videoDuration * 1000;
	//get the requested duration for each of the news stories
	newsDuration = document.getElementById('news_image_duration').value;
	newsDurationInMilliseconds = newsDuration * 1000;
	//send new story duration to the modDuration function to build the css
	//modDuration(newsDuration);
	
	//determine category
	category = document.getElementById('newsType').value;
	//imagefilepath = document.getElementById('filePath').value;
	
	
	
	//store all elements with the class "new_image" in a variable, x
	var x = document.getElementsByClassName("news_image");
	// store all elements with the class "headline" in a variable, y
	if(document.getElementsByClassName("headline_group")) {
		var y = document.getElementsByClassName("headline_group");
		//alert(y.length);
	}
	if(document.getElementById("topBar")) {
		currentlyHTML = "<div id='rightColDiv'><p>" + currentTime + " | " + currentDate + "</p></div>";
		//currentlyHTML += "<div id='leftColDiv'><img src='" + logo + "' class='logo'></div>";
		document.getElementById("topBar").innerHTML = currentlyHTML;
	}
	if(document.getElementById("bottomBar")) {
		currentlyHTML = "<div id='rightColDiv'><p>" + currentTime + " | " + currentDate + "</p></div>";
		//currentlyHTML += "<div id='leftColDiv'><img src='" + logo + "' class='logo'></div>";
		document.getElementById("bottomBar").innerHTML = currentlyHTML;
		// if Financial graphics, style the bottom bar differently
		if(category === "Financial") {
			//currentlyHTML = "<div id='rightColDiv'><p>" + currentTime + " | " + currentDate + "</p></div>";
			currentlyHTML = "<div id='leftColDiv'><p>" + currentTime + " | " + currentDate + "</p></div>";
			document.getElementById("bottomBar").innerHTML = currentlyHTML;
			css2 = "#bottomBar { background-color: rgba(41, 143, 194, 0); } ";
		}
	}
	
	//send new story duration to the modDuration function to build the css
	modDuration(newsDuration, css2);
	
	//check if there are headlines
	if(document.getElementById('hl1')){
		//load the data to the headline div
		var xmlDoc1 = loadXMLDoc(imagefilepath1 + ranNums[0] + ".xml");
		var xmlDoc2 = loadXMLDoc(imagefilepath2 + ranNums[1] + ".xml");
		var xmlDoc3 = loadXMLDoc(imagefilepath3 + ranNums[2] + ".xml");
		
		var story1 = xmlDoc1.getElementsByTagName("story")[0].childNodes[0].nodeValue;
		var story2 = xmlDoc2.getElementsByTagName("story")[0].childNodes[0].nodeValue;
		var story3 = xmlDoc3.getElementsByTagName("story")[0].childNodes[0].nodeValue;
		
		document.getElementById('hl1').innerHTML = "<p>" + story1 + "</p>";
		document.getElementById('hl2').innerHTML = "<p>" + story2 + "</p>";
		document.getElementById('hl3').innerHTML = "<p>" + story3 + "</p>";
		
	} else {
		//alert("There are no headlines");
	}
	
	//load images into the image divs
	if(category !== "weatherPic"){
		document.getElementById('image1').innerHTML = "<img src='" + imagefilepath1 + ranNums[0] + ".jpg?" + noCacheVar + "'>";
		document.getElementById('image2').innerHTML = "<img src='" + imagefilepath2 + ranNums[1] + ".jpg?" + noCacheVar + "'>";
		document.getElementById('image3').innerHTML = "<img src='" + imagefilepath3 + ranNums[2] + ".jpg?" + noCacheVar + "'>";
	} else {
		//document.getElementById('image1').innerHTML = "<img src='" + imagefilepath + "?" + noCacheVar + "'>";
	}
	
	//var myIndex = 0;
	//set a time delay before carousel function is first called
	setTimeout(carousel, videoDurationInMilliseconds);	
	setTimeout(hideIntro, (videoDurationInMilliseconds+1000));
	
	
//--FUNCTIONS------------------------------------------------//	

	function hideIntro() {
		document.getElementById('intro').style.visibility = "hidden";
	}
	function carousel() {
		//attaches the animation classes to html objects on the fly after the the intro video has played
		for (var i = 0; i < x.length; i++) {
			if(i===0){ x[i].className += " fade_InOut1"; }
			if(i===1){ x[i].className += " fade_InOut2"; }
			if(i===2){ x[i].className += " fade_InOut3"; }
				
		   if(document.getElementById('hl1')) { 
				if(i===0){ y[i].className += " slide_inOut1"; }
				if(i===1){ y[i].className += " slide_inOut2"; }
				if(i===2){ y[i].className += " slide_inOut3"; }
			}
			//x[i].style.visibility = "visible";
			//y[i].style.visibility = "visible";
		}
		
		document.getElementById('intro').style.className += "fadeOut";
		if(document.getElementById("topBar")){
			document.getElementById("topBar").className += "slideInTop1";
		}
		if(document.getElementById("headline_group_BG")){
			document.getElementById("headline_group_BG").className += "fade_InOutExt";
		}
		
	}
	
	function modDuration(timeInSeconds, extraStyle){	
		//creates css based on the given news duration from HTML.
		//delay on the second and third animations to create image crossfade
		//alert(x);
		css = ".fade_InOut1{-webkit-animation:fading " + timeInSeconds + "s; -webkit-animation-delay: 0s; animation:fading " + timeInSeconds + "s; animation-delay: 0s;}";
		css += ".fade_InOut2{-webkit-animation:fading " + timeInSeconds + "s; -webkit-animation-delay: " + (timeInSeconds - 2)*1 + "s; animation:fading " + timeInSeconds + "s; animation-delay: " + (timeInSeconds - 2)*1 + "s;}";
		css += ".fade_InOut3{-webkit-animation:fading " + timeInSeconds + "s; -webkit-animation-delay: " + (timeInSeconds - 2)*2 + "s; animation:fading " + timeInSeconds + "s; animation-delay: " + (timeInSeconds - 2)*2 + "s;}";
		css += ".fade_InOutExt{-webkit-animation:fadingFast " + ((timeInSeconds*3)-2) + "s; -webkit-animation-delay: 0s; animation:fadingFast " + ((timeInSeconds*3)-2) + "s; animation-delay: 0s;}";
		
		css += ".slide_inOut1{-webkit-animation:sliding " + timeInSeconds + "s; -webkit-animation-delay: 0s; animation:sliding " + timeInSeconds + "s; animation-delay: 0s;}";
		css += ".slide_inOut2{-webkit-animation:sliding " + timeInSeconds + "s; -webkit-animation-delay: " + (timeInSeconds - 2)*1 + "s; animation:sliding " + timeInSeconds + "s; animation-delay: " + (timeInSeconds - 2)*1 + "s;}";
		css += ".slide_inOut3{-webkit-animation:sliding " + timeInSeconds + "s; -webkit-animation-delay: " + (timeInSeconds - 2)*2 + "s; animation:sliding " + timeInSeconds + "s; animation-delay: " + (timeInSeconds - 2)*2 + "s;}";
		
		css += ".slideInTop1{-webkit-animation:slidingTop " + ((timeInSeconds*1)-0) + "s; -webkit-animation-delay: 0s; animation:slidingTop " + ((timeInSeconds*1)-0) + "s; animation-delay: 0s;}";
		css += ".slideInBottom1{-webkit-animation:slidingBottom " + ((timeInSeconds*3)-3) + "s; -webkit-animation-delay: 0s; animation:slidingBottom " + ((timeInSeconds*3)-3) + "s; animation-delay: 0s;}";
		
		
		css += ".fadeOut{-webkit-animation:fadeOut 1s; -webkit-animation-delay: 0s; animation:fadeOut 1s; animation-delay: 0s;}";
		
		if(extraStyle) { css += css2; }
		//custom css style is attached to the head on the fly
		head = document.head || document.getElementsByTagName('head')[0];
		style = document.createElement('style');
			
		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
			
		head.appendChild(style);
	}
//-----------------------------------------------------------------//	
	
}