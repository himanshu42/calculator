userName = "";

function isFunction(val) {
	return (typeof(val) == typeof(Function));
}

function isLocalStorage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Method is for getting IE version.
function isIE() {
    ua = window.navigator.userAgent;
    msie = ua.indexOf("MSIE ");
    IEV = 0;

    if (msie > 0) {
        IEV = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 0);
    } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
        IEV = 11;
    } else {
        IEV = 0;
    }
    return IEV;
}

function checkSystem(supportedSystems) {
	systemDetect = new SystemDetect();
	systemDetect.init();

	var deviceType = systemDetect.deviceType;
	var os = systemDetect.osName;
	var osVer = systemDetect.osVersion;
	var browserVersion = Number(systemDetect.browserVersion);
	var browserName = systemDetect.browserName;

	var wW = screen.width;
	var wH = screen.height;

	if(supportedSystems.Browser.hasOwnProperty(browserName)) {
		if(browserVersion >= supportedSystems.Browser[browserName].version.value) {
			if((wW >= supportedSystems.Resolution.width && wH >= supportedSystems.Resolution.height) || (wW >= supportedSystems.Resolution.height && wH >= supportedSystems.Resolution.width)) {
				return true;
			}
		}
	}

	return false;
}

function ReportScore(obtained, maximum, minimum) {
	/*pipwerks.SCORM.data.set("cmi.core.score.raw", obtained);
	pipwerks.SCORM.data.set("cmi.core.score.max", maximum);
	pipwerks.SCORM.data.set("cmi.core.score.min", minimum);*/
	doLMSSetValue("cmi.core.score.raw", obtained);
	doLMSSetValue("cmi.core.score.max", maximum);
	doLMSSetValue("cmi.core.score.min", minimum);
	doLMSCommit();
	//	alert("marks:"+obtained)
}

function SetSuspendedData(data) {
	// pipwerks.SCORM.data.set("cmi.suspend_data", data);
	doLMSSetValue("cmi.suspend_data", data);
	doLMSCommit();
	//alert("setting\n\n"+data);
}

function GetSuspendedData() {
	// var str = pipwerks.SCORM.data.get("cmi.suspend_data");
	var str = doLMSGetValue("cmi.suspend_data");
	//var str=5;
	//alert("getting\n\n"+str);
	return str;
}

function GetLessonStatus() {
	// return pipwerks.SCORM.data.get("cmi.core.lesson_status");
	return doLMSGetValue("cmi.core.lesson_status");
	//alert(doLMSGetValue("cmi.core.lesson_status")+" lesson_status")
}

function SetLessonStatus(arg) {
	// return pipwerks.SCORM.data.get("cmi.core.lesson_status");
	return doLMSSetValue("cmi.core.lesson_status", arg);
	alert(doLMSGetValue("cmi.core.lesson_status")+" lesson_status")
}

function GetStudentName() {
	// var str1 = pipwerks.SCORM.data.get("cmi.core.student_name");
	var str1 = doLMSGetValue("cmi.core.student_name");
	//alert("Name\n\n"+str1);
	return str1;
}

function GetStudentId() {
	var str2 = doLMSGetValue("cmi.core.student_id");
	return str2;
}

function GetStudentScore() {
	// return pipwerks.SCORM.data.get("cmi.core.score.raw");
	return doLMSGetValue("cmi.core.score.raw");
}

function fnSaveBookmark(arg) {
	// pipwerks.SCORM.data.get("cmi.core.lesson_location", arg);
	//alert("fnSaveBookmark----"+ doLMSSetValue("cmi.core.lesson_location", arg))
	doLMSSetValue("cmi.core.lesson_location", arg);
	doLMSCommit();
}

function getBookmarkData() {
	// return pipwerks.SCORM.data.get("cmi.core.lesson_location", false);
	//alert("getBookmarkData----"+ doLMSGetValue("cmi.core.lesson_location"))
	return doLMSGetValue("cmi.core.lesson_location");

}

function getSuspendData() {
	// pipwerks.SCORM.data.get("cmi.suspend_data", false);
	return doLMSGetValue("cmi.suspend_data");
}

function setObjectSizes(context, arr) {
    for (var i = 0; i < arr.length; i++) {
        var temp = document.getElementById(arr[i]);
        if (temp == null) {
            continue;
        }
        var computedStyle = getComputedStyle(temp);
        var tempWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
        temp.style.height = getProportinalHeight(context[arr[i] + 'DimensionArr'], tempWidth) + "px";
    }
}

function getProportinalHeight(arr, actualWidth) {
    var ratio = actualWidth / arr[0];
    var height = arr[1] * ratio;
    return height;
}