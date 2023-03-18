var INTERACTIVE = "interactive"; //JS doesn't support const
var NON_INTERACTIVE = "non_interactive"; //JS doesn't support const
var model = {
    AnimID : [], /*todo:change 3*/
    AnimID2 : [], /*todo:change 3*/
    act : null, /*todo:change 4*/
    audioElem : null, /*todo:change 5*/
    AnimObj : null, /*todo:change 5*/
    tl : null, /*todo:change 5*/
    tlIntr : null, /*todo:change 5*/
    intrEvtID : null, /*todo:change 5*/
    evtObj : null, /*todo:change 5*/
    dilogEffect: "",
    courseXML: '',
    audio1Player:'',
    settingsXML: '',
    gloassaryXML: '',
    resourceXML: '',
    screen3Status:false,
    isScorm: false,
    isBookmarked: false,
    brussels_screen3: true,
    outer_screen3:true,
    introctabtn:true,
    blendCtaBtn:true,
    supplierCtaBtn:true,
    wallStreetCtaBtn:true,
    brusselsCtaBtn:true,
    leapsCtaBtn:true,
    anim_helicopter:true,
    outroCtaBtn:true,
    isForced: false,
    isGlossary: false,
    hasSplash: false,
    isResource: false,
    isTranscript: false,
    isExitEnable: false,
    isTranscriptPopup: false,
    isAutoAdvance: false,
    isUserOverride: false,
    isDebugger: false,
    isProfiler: false,
    assessmentPassPercent: 0,
    overrideBookmarkData: '',
    overrideSuspendData: '',
    courseName: '',
    pageNumberLevel: 1, //1:All pages in course, 2:All pages in module, 3:All Pages in topic
    menuLevel: 1,
    totalModules: 0,
    totalTopicInModule: 0,
    current_active_ques:0,
    totalPagesInTopic: 0,
    currentModule: 0,
    currentPage: 0,
    currentTopic: 0,
    currentPageType: '',
    currentPagePath: '',
    courseTitle: '',
    courseXMLObj: {},
    settingXMLObj: {},
    pageTotalAudioCount: 0,
    pageCurrentAudioCount: 0,
    pageAudioIdArray: [],
    delayBtwnAudio: 0,
    isLocalStorageAvailable: false,
    isPause: false,
    isMute: false,
    courseDoneTill: [0, 0, 0],
    userAudioPref: false,
    pageHasAudio: false,
    useAudio: false,
    useDelay: false,
    useAnimation: false,
    defaultAnimationType: '',
    defaultAnimationDuration: 0,
    defaultEaseType: '',
    attempts: '',
    pauseAfterFinish: false,
    isUserPaused: false,
    isFloatingNavigation: false,
    isBranched: false,
    branchId: 0,
    isPortrait: false,
    isIPhone: false,
    bookMarkData: "",
    loadPageType:"",
    assessmentVisited:false,
    postAssessmentVisited:false,
    nextBlinkInterval:-1,
    currentAttempt:1,
    // totalAttempts:2,
    slideFinised:false,
    branchDnDPage:1,
    isNav:false,
    dragDropIndex:0,
    nestedPageNo:3,
    isNavReturn:false,
    isNextEnable:false,
    isBackEnable:false,
    currentTabClicked:0,
    visitedLi:[0,0,0,0,0,0],
    visitedItem:0,
    isLoading:"startLoading",
    freezButtns:false,
    visitedLi:[0,0,0],
    jumpOnSpecificOnBackClicked:false,
    VarAssesmentData:"",
    VarPostAssesmentData:"",
    inAssesment: false,
    tt:'',
    getHeight:"",
    getWidth:"",
    wheelNav:false,
    mypageLoded: false,
    assessmentData: [],
    postAssessmentData: [],
    setBg:false,
    ssessmentResult:false,
    resource_Array:[],
    sliderVar:false,   
    currentAudioNo:1,
    isPageM1T1P3: false,
    topic5lastpageTarget:"",
    //NugetCompletion: false,
    nextDisableTimer: 250, 
    m1t5p1_click: false,
    index_audio: false,
    topicFiveDone: false,
    screenStatusData: [],
    verticalScreenStatusData: [false,false,false,false,false,false,false,false],
    userSec: "intro",
    userSlideN: 1,
    isComingFrmLms: false,
    curretSlideMoved:0,
    menuCompletedState:[0,0,0,0,0],
    init: function() {
        //this.loadXML('content/xml/courseData.xml', model.parseCourseXML);
        model.loadXML('content/xml/settings.xml', model.parseSettingsXML);
    },
     loadCourse:function(){
        this.loadJson('content/json/'+language.userlanguage+'.json', model.jsonLoadDone)

      //this.loadXML('content/xml/courseData.xml', model.parseCourseXML);
      
 
    },
    xmlLoadDone: function() {
        if (this.isGlossary) {
            glossary.init();
        }

        if (this.isResource) {
            resources.init();
        }

        course_colors.init();

        controller.modelInitDone();
    },

    setCurrent: function() {
        model.currentModule = 1;
        model.currentTopic = 1;
        model.currentPage = 1;
        model.courseDoneTill = [0, 0, 0];

        var scormHasData = false;
        if (this.isScorm) {
            var bookMarkData = getBookmarkData();

            model.bookMarkData = bookMarkData;           
            model.suspendData = getSuspendData();            
 
            //model.bookMarkData = "intro**5**4";
            //model.suspendData = '{"T":"intro","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false},{"id":"screen5","S":false}]},{"T":"blend","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false}]},{"T":"kenya","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false},{"id":"screen5","S":false},{"id":"screen6","S":false},{"id":"screen7","S":false}]},{"T":"supplier","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false}]},{"T":"outro","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false}]},{"T":"leaps","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false},{"id":"screen5","S":false}]},{"T":"brussels","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false},{"id":"screen5","S":false}]},{"T":"wallStreet","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false},{"id":"screen5","S":false},{"id":"screen6","S":false},{"id":"screen7","S":false},{"id":"screen8","S":false},{"id":"screen9","S":false},{"id":"screen10","S":false},{"id":"screen11","S":false}]}';

            //model.suspendData = '{"0":{"T":"intro","ST":[{"id":"screen1","S":false},{"id":"screen2","S":false},{"id":"screen3","S":false},{"id":"screen4","S":false},{"id":"screen5","S":false},{"id":"screen6","S":false},{"id":"screen7","S":false}]},"menuState":[1,1,1,1,1]}';

            if (model.bookMarkData != "" && model.bookMarkData != undefined && model.bookMarkData != "undefined" && model.bookMarkData != null && model.bookMarkData != "null" || model.suspendData != "" && model.suspendData != undefined && model.suspendData != "undefined" && model.suspendData != null && model.suspendData != "null") {
                model.scormHasData = true;
            }
        }
        var suspendData;
        if (this.isUserOverride) {

            var bookMarkData = this.overrideBookmarkData;
            suspendData = this.overrideSuspendData;
        } else {
            suspendData = model.suspendData;
        }

        var temp = {};
        if (this.isUserOverride) {
            var arr = bookMarkData.split("**");
            temp.currentModule = parseInt(arr[0]);
            temp.currentTopic = parseInt(arr[1]);
            temp.currentPage = parseInt(arr[2]);
            temp.courseDoneTill = suspendData.split(",");

            userScore = parseInt(arr[3]);

            this.currentModule = temp.currentModule;
            this.currentTopic = temp.currentTopic;
            this.currentPage = temp.currentPage;
            this.courseDoneTill = temp.courseDoneTill;
        } else {
            if (model.scormHasData) {
                //suspendData = "["+suspendData+"]";
                var arr = [];
                arr.push(JSON.parse(suspendData)[0]);
                model.screenStatusData = arr; 
                model.menuCompletedState = JSON.parse(suspendData).menuState; 

            }
        }     
        controller.playerReady();
    },
    
setBookmarkLocation: function() { 
        $(".bookmarkPopupButton .Yesbutton").css("pointer-events", "none"); 
        $(".bookmarkPopupButton .Nobutton").css("pointer-events", "none");       
        var arr = model.bookMarkData.split("**");               
        model.userSec = arr[0];
        model.userSlideN = eval(arr[1]);
        model.curretSlideMoved = arr[2];
        model.currentModule = 1;
        model.currentTopic = 1;
        model.currentPage = 1;        
        $("#splashContainer, #player_audioPopupWrapper").show(); 
        language.loadInitialContent();
        // model.showPage(model.currentModule, model.currentTopic, model.currentPage);
    },

   
    closeBookmarkPopup: function() {
        $(".bookmarkPopupButton .Yesbutton").css("pointer-events", "none"); 
        $(".bookmarkPopupButton .Nobutton").css("pointer-events", "none");

        model.VarAssesmentData = "";
        model.currentModule = 1;
        model.currentTopic = 1;
        model.currentPage = 1; 

        model.screenStatusData = [];
        model.userSec = "intro";
        model.userSlideN = 1;            
        
        $("#player_bookmarkPopupWrapper").removeClass('on');
        $("#splashContainer, #player_audioPopupWrapper").show(); 
        language.loadInitialContent();
        // $('.footer, .header, .player_contentArea_style').show();
        // model.showPage(model.currentModule, model.currentTopic, model.currentPage);
    },
    jsonLoadDone: function(data) {

        model.courseData = data;
       
        $('.logo_aa').html(model.courseData.courseTitle.Title);
        ////////////////////Bookmarking Data////////////////////////////
        $('#player_bookmarkPopupWrapper').find('.feedbackTitle').html(model.courseData.uidialogues.Bookmarking.feedbackTitle);
        $('#player_bookmarkPopupWrapper').find('.feedcontent').html(model.courseData.uidialogues.Bookmarking.feedcontent);
        $('#player_bookmarkPopupWrapper').find('.Yesbutton').html(model.courseData.uidialogues.Bookmarking.Yesbutton);
        $('#player_bookmarkPopupWrapper').find('.Nobutton').html(model.courseData.uidialogues.Bookmarking.Nobutton);
        $('#player_bookmarkPopupWrapper').find('.noteContent').html(model.courseData.uidialogues.Bookmarking.noteContent);

        ////////////////////UI Title////////////////////////////
        $("#player_menuBtn").attr('title',model.courseData.uititle.Menu);
        $(".menu_cursor_no_drop").attr('title',model.courseData.uititle.Menu);
        $("#player_helpBtn").attr('title',model.courseData.uititle.Help);
        $("#player_glossaryBtn").attr('title',model.courseData.uititle.Resources);
        $("#cross_button").attr('title',model.courseData.uititle.Exit);
        $("#player_transcriptDilogBtn").attr('title',model.courseData.uititle.Transcript);
        $(".transcipt_close").attr('title',model.courseData.uititle.tClose);
        $("#audioOnOff").attr('title',model.courseData.uititle.Audio);
        $("#play_pause").attr('title',model.courseData.uititle.PlayPause);
        $("#player_reloadPageBtn").attr('title',model.courseData.uititle.Replay);
        $("#player_backBtn").attr('title',model.courseData.uititle.Back);
        $("#player_nextBtn").attr('title',model.courseData.uititle.Next);
        $("#shell_help_popup_exit").attr('title',model.courseData.uititle.hClose);
        $("#shell_glossary_popup_exit").attr('title',model.courseData.uititle.gClose);
        $("#shell_glossary_popup_exit").attr('title',model.courseData.uititle.rClose);
        

        /////////////////////////////////////////////First PAge//////////////////////////////
        
        $('.worlddiv .ldtext').find('h1').html(model.courseData.uidialogues.FirstPage.ldtext1);
        $('.worlddiv .ldtext').find('h2').html(model.courseData.uidialogues.FirstPage.ldtext2);
        $('.worlddiv .ldtext').find('.continue_btn2').html(model.courseData.uidialogues.FirstPage.continue_btn2);
        $('.worlddiv .quotedv').find('.at1').html(model.courseData.uidialogues.FirstPage.quotedv1);
        $('.worlddiv .quotedv').find('.at2').html(model.courseData.uidialogues.FirstPage.quotedv2);
        //////////////////UiDialouges//////////////////////////////////////////////////////////
        $('#player_audioPopupWrapper .player_popupScreenContainer').find('p').html(model.courseData.uidialogues.player_popupScreenContainer)
        ///////////////////////////Transcript////////////////////
         $('#transcript_Container').find('.transcript_Container_heading').html(model.courseData.uidialogues.Transcript.transcriptTitle);

        /////////////////////////////////////////ExitPopup///////////////////////////////
         $('#shell_e_ppopup').find('.feedbackTitle').html(model.courseData.uidialogues.Exitpopup.feedbackTitle);
        $('#shell_e_ppopup').find('.feedcontent').html(model.courseData.uidialogues.Exitpopup.feedcontent);
        $('#shell_e_ppopup').find('.Yesbutton').html(model.courseData.uidialogues.Exitpopup.Yesbutton);
        $('#shell_e_ppopup').find('.Nobutton').html(model.courseData.uidialogues.Exitpopup.Nobutton);
         /////////////////////////////////////////Help Popup//////////////////////////////

         $('#HelpDiv').find('.shell_popup_header h2').html(model.courseData.uidialogues.HelpPopup.feedbackTitle);
         $('#HelpDiv').find('.helptop .hpcon').html(model.courseData.uidialogues.HelpPopup.feedcontent);
         $('#HelpDiv').find('.fullaged ul li').each(function(i){
            $(this).find('.righttrt').html(model.courseData.uidialogues.HelpPopup.iconText[i])
         })

        ///////////////////////////////////////Menu Popup///////////////////////////
        $('#player_menuWrapper').find('.menu_text').html(model.courseData.uidialogues.MenuPopup.feedcontent);
        $('.player_container_style').find('.tool_tip').each(function(i){
           
            $(this).html(model.courseData.uidialogues.MenuPopup.iconText[i])
         })
        
        /////////////////////////////////////////////////Resourses Popup////////////////////////////////
/*       $('#glossaryPopup').find('.shell_h_popup_header').find('.shell_popup_header h2').html(model.courseData.uidialogues.Resources[0].TitleContent1);
       $('#glossaryPopup').find('.shell_h_popup_header').find('p').html(model.courseData.uidialogues.Resources[1].TitleContent2);
*/            
            /*$.each(model.courseData.uidialogues.Resources,function(k,v){
                if(k == 0){
                       $('#glossaryPopup').find('.shell_h_popup_header').find('.shell_popup_header h2').html(model.courseData.uidialogues.Resources[k].TitleContent1);

                }else if(k == 1){
                      $('#glossaryPopup').find('.shell_h_popup_header').find('p').html(model.courseData.uidialogues.Resources[k].TitleContent2);

                }else{
                    $.each(model.courseData.uidialogues.Resources[k],function(k1,v1){
                        $('#glossaryPopup').find('.clickaccord > span').eq(k-2).html(k1)
                         $.each(v1,function(k2,v2){
                            $('#glossaryPopup').find('.sowaccord').eq(k-2).find("ul li").eq(k2).find('a').html(v2.text);
                            $('#glossaryPopup').find('.sowaccord').eq(k-2).find("ul li").eq(k2).find('a').attr('href',v2.path)
                        })
                            

                    })

                }
               
            })*/
       //////////////////////////////////////////////////////End///////////////////////

        model.loadXML('content/xml/'+language.userlanguage+'/courseData.xml', model.parseCourseXML);

       

    },
    parseCourseXML: function(xml) {
        model.courseXML = $(xml);

        var rootNode = model.courseXML.find("courseData");
        model.courseTitle = rootNode.find("courseTitle").text();

        var modulesXML = model.courseXML.find("module");

        var modLen = modulesXML.length;
        model.totalModules = modLen;

        model.courseXMLObj.totalModules = modLen;
        model.courseXMLObj.totalPagesInCourse = 0;

        var coursePagesTemp = [];
        var count = 1;

        for (var i = 0; i < modLen; i++) {
            model.courseXMLObj['mod_' + (i + 1)] = {};
            var tempModObj = model.courseXMLObj['mod_' + (i + 1)];
            tempModObj.id = modulesXML.eq(i).attr('id');
            tempModObj.title = modulesXML.eq(i).find('title').eq(0).text();
            tempModObj.status = 0;

            var topicsXML = modulesXML.eq(i).find('topic');
            var topicLen = topicsXML.length;

            tempModObj.totalTopicInModule = topicLen;
            tempModObj.totalPagesInMod = 0;

            for (var j = 0; j < topicLen; j++) {
                tempModObj['topic_' + (j + 1)] = {};
                var tempTopicObj = tempModObj['topic_' + (j + 1)];
                tempTopicObj.id = topicsXML.eq(j).attr('id');
                tempTopicObj.title = topicsXML.eq(j).find('title').eq(0).text();
                tempTopicObj.status = 0;

                var pageXML = topicsXML.eq(j).find('page');
                var pageLen = pageXML.length;

                tempTopicObj.totalPagesInTopic = pageLen;
                
                
                for (var k = 0; k < pageLen; k++) {
                    tempTopicObj['page_' + (k + 1)] = {};
                    var tempPageObj = tempTopicObj['page_' + (k + 1)];
                    tempPageObj.id = pageXML.eq(k).attr('id');
                    tempPageObj.target = pageXML.eq(k).attr('target');
                    tempPageObj.setBg = pageXML.eq(k).attr('setBg');
                    
                    tempPageObj.overrideNextTitle = pageXML.eq(k).attr('overrideNextTitle');
                    //alert(pageXML.eq(k).attr('overridePrevTitle'))
                    tempPageObj.overridePrevTitle = pageXML.eq(k).attr('overridePrevTitle');
                    
                    tempPageObj.myPrevTarget = pageXML.eq(k).attr('myPrevTarget');
                    tempPageObj.myNextTarget = pageXML.eq(k).attr('myNextTarget');
                    /**/
                    tempPageObj.title = pageXML.eq(k).find('title').eq(0).text();
                    //tempPageObj.transcript = pageXML.eq(k).find('transcript').eq(0).text();
                       tempPageObj.transcript = [];
                    for (var l = 0; l < pageXML.eq(k).find('transcript').length; l++) {
                        tempPageObj.transcript.push(pageXML.eq(k).find('transcript').eq(l).text());
                    }

                    tempPageObj.type = pageXML.eq(k).attr('type') == "interactive" ? INTERACTIVE : NON_INTERACTIVE;
                    tempPageObj.status = 0;
                    tempPageObj.module = (i + 1);
                    tempPageObj.topic = (j + 1);
                    tempPageObj.page = (k + 1);

                    coursePagesTemp.push(tempPageObj);

                    model.courseXMLObj.totalPagesInCourse++;
                    tempModObj.totalPagesInMod++;
                }  
                
                
            }
        }
        model.courseXMLObj.coursePages = coursePagesTemp;
        controller.checkMenuStatus();
        model.setCurrent();
        //model.loadXML('content/xml/settings.xml', model.parseSettingsXML);
    },

    parseSettingsXML: function(xml) {

        model.settingsXML = $(xml);
        model.isScorm = model.settingsXML.find("isScorm").attr("val") == "true" ? true : false;
        model.isBookmarked = model.settingsXML.find("isBookmarked").attr("val") == "true" ? true : false;
        model.isForced = parseInt(model.settingsXML.find("isForced").attr("val"));
        model.pageNumberLevel = parseInt(model.settingsXML.find("pageNumberLevel").attr("val"));
        model.menuLevel = parseInt(model.settingsXML.find("menuLevel").attr("val"));
        model.delayBtwnAudio = parseInt(model.settingsXML.find("delayBtwnAudio").attr("val"));
        model.assessmentPassPercent = parseInt(model.settingsXML.find("assessmentPassPercent").attr("val"));
        model.courseName = model.settingsXML.find("courseName").attr("val");
        model.isGlossary = model.settingsXML.find("isGlossary").attr("val") == "true" ? true : false;
        model.hasSplash = model.settingsXML.find("hasSplash").attr("val") == "true" ? true : false;
        model.isResource = model.settingsXML.find("isResource").attr("val") == "true" ? true : false;
        model.isTranscript = model.settingsXML.find("isTranscript").attr("val") == "true" ? true : false;
        model.isExitEnable = model.settingsXML.find("isExitEnable").attr("val") == "true" ? true : false;
        model.isAutoAdvance = model.settingsXML.find("isAutoAdvance").attr("val") == "true" ? true : false;
        model.isDebugger = model.settingsXML.find("isDebugger").attr("val") == "true" ? true : false;
        model.isProfiler = model.settingsXML.find("isProfiler").attr("val") == "true" ? true : false;
        model.isUserOverride = model.settingsXML.find("isUserOverride").attr("val") == "true" ? true : false;
        model.overrideBookmarkData = model.settingsXML.find("overrideBookmarkData").attr("val");
        model.overrideSuspendData = model.settingsXML.find("overrideSuspendData").attr("val");
        model.dilogEffect = model.settingsXML.find("isDilogEffect").attr("val") != "" ? model.settingsXML.find("isDilogEffect").attr("val") : "fade";
        model.useAudio = model.settingsXML.find("useAudio").attr("val") == "true" ? true : false;
        model.useDelay = model.settingsXML.find("useDelay").attr("val") == "true" ? true : false;
        model.useAnimation = model.settingsXML.find("useAnimation").attr("val") == "true" ? true : false;
        model.defaultAnimationType = model.settingsXML.find("defaultAnimationType").attr("val");
        model.defaultAnimationDuration = parseInt(model.settingsXML.find("defaultAnimationDuration").attr("val"));
        model.defaultEaseType = model.settingsXML.find("defaultEaseType").attr("val");
        model.attempts = parseInt(model.settingsXML.find("attempts").attr("val"));
        model.submitbtn = model.settingsXML.find("submitbtn").attr("val");
        model.feedbck = model.settingsXML.find("feedbck").attr("val");
        model.flipClick = model.settingsXML.find("flipClick").attr("val");
        model.isFloatingNavigation = model.settingsXML.find("isFloatingNavigation").attr("val") == "true" ? true : false;
        model.mainCourseColor = model.settingsXML.find("CourseColor").attr("mainBG");
        model.lighterBGColor = model.settingsXML.find("CourseColor").attr("lighterBGColor");
        model.borderColor = model.settingsXML.find("CourseColor").attr("borderColor");
        model.gradientColor = model.settingsXML.find("CourseColor").attr("gradientColor");
        model.gradientFontColor = model.settingsXML.find("CourseColor").attr("gradientFontColor");
        model.headingcolor = model.settingsXML.find("CourseColor").attr("headingcolor");
        model.contentcolor = model.settingsXML.find("CourseColor").attr("contentcolor");
        model.gradientHover = model.settingsXML.find("CourseColor").attr("gradientHover");
        model.disabledColor = model.settingsXML.find("CourseColor").attr("disabledColor");
        model.userDefineTitle = model.settingsXML.find("userDefineTitle").attr("val");

        model.xmlLoadDone();
        /*model.settingsXML.find('settings').children().each(function(){
            model.settingXMLObj[model.tagName] = $(model).attr("val");
        });*/
    },

    setTotalTopicInModule: function() {
        this.totalTopicInModule = this.courseXMLObj["mod_" + this.currentModule].totalTopicInModule;
    },

    setTotalPagesInTopic: function() {
        this.totalPagesInTopic = this.courseXMLObj["mod_" + this.currentModule]["topic_" + this.currentTopic].totalPagesInTopic;
    },

    getCurrentPagePath: function() {
        var path = this.courseXMLObj["mod_" + this.currentModule]["topic_" + this.currentTopic]["page_" + this.currentPage].target;

        if (model.isBranched) {
            path += "_b" + model.branchId;             
        }
        console.log("branch page path::"+path)
        return path;
    },

    getCurrentPageType: function() {
        return this.courseXMLObj["mod_" + this.currentModule]["topic_" + this.currentTopic]["page_" + this.currentPage].type;
    },

    getTopicInModule: function(module) {
        return this.courseXMLObj["mod_" + module].totalTopicInModule;
    },

    getTotalPagesInCourse: function() {
        return this.courseXMLObj.totalPagesInCourse;
    },

    getTotalPagesInModule: function(module) {
        return this.courseXMLObj["mod_" + module].totalPagesInMod;
    },

    getTotalPagesInTopic: function(module, topic) {
        return this.courseXMLObj["mod_" + module]["topic_" + topic].totalPagesInTopic;
    },

    getCurrentPageBg: function() {
        return  this.courseXMLObj["mod_" + this.currentModule]["topic_" + this.currentTopic]["page_" + this.currentPage].setBg;
    },



    getCurrentPageTranscript: function() {
        /*return this.courseXMLObj["mod_" + this.currentModule]["topic_" + this.currentTopic]["page_" + this.currentPage].transcript;
*/
     var str = "";
   
        if (model.isBranchedDnd) {
            str = this.courseXMLObj["mod_" + this.currentModule]["topic_" + this.currentTopic]["page_" + this.currentPage].transcript[model.branchDnDPage];
       
       } else {
            str = this.courseXMLObj["mod_" + this.currentModule]["topic_" + this.currentTopic]["page_" + this.currentPage].transcript[0];
        }
        //str += "<br /><br />";

        return str;

    },

    getCurrentPageCount: function() {
        var count = 0;
        switch (this.pageNumberLevel) {
            case 1:
                for (var i = 1; i < this.currentModule; i++) {
                    count += this.courseXMLObj["mod_" + i].totalPagesInMod;
                }
                //fall through
            case 2:
                for (i = 1; i < this.currentTopic; i++) {
                    count += this.courseXMLObj["mod_" + this.currentModule]["topic_" + i].totalPagesInTopic;
                }
                //fall through
            case 3:
                count += this.currentPage;
                break;
            default:
                console.log("Something went wrong!! Not valid");
        }
        return count;
    },

    getPageCurrentAudioPath: function(isPopupAudio, tabIndex) {
       var path = 'content/audio/mp3/'+language.userlanguage+'/' + this.courseXMLObj["mod_" + this.currentModule]["topic_" + this.currentTopic]["page_" + this.currentPage].target + '_';

       // console.log("model.isBranched--"+model.isBranched)
        if (model.isBranched) {
            path += "b" + model.branchId + "_";   
                    
        }
        if (isPopupAudio) {
            path = path + "pop" + tabIndex;
        } else {
            path += (model.pageCurrentAudioCount);
        }
        // path = 'content/audio/mp3/blank';
        path += ".mp3?Gcube";
         console.log("getPageCurrentAudioPath", path);
        return path;
    },
    showPageWithAnimation:function(module, topic, page,direction){
         model.varNavigationBtnClicked = direction;
        var targetPage;

        $('#player_content').removeClass('player_content').addClass('rem').after('<div id="player_content" class="player_content_style player_content" style="" ></div>');

        if (model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].myNextTarget != undefined) {
            targetPage = Number(model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].myNextTarget.split(",")[2]);
        }
        model.showPage(module,topic,page)
    },

    showPage: function(module, topic, page) {

        model.currentAudioNo = 1;

        $("#audioOnOff,#player_transcriptDilogBtn,#player_reloadPageBtn").removeClass("disableBtnsUi");
        
        $('.playerCenterBtns .abbot').hide().removeClass('showAbbot');

        
        model.inAssesment = false;
        $("#player_reloadPageBtn").css("display","none"); 
        $("#play_pause").css("display","block");
        console.log( module +" << >> "+ topic +" << >> "+ page );        

        this.setCurrentPage(module, topic, page);

        var moduleTitle = model.courseXMLObj["mod_" + module].title;
        var topicTitle = model.courseXMLObj["mod_" + module]["topic_" + topic].title;
        var pageTitle = model.courseXMLObj["mod_" + module]["topic_" + topic]["page_" + page].title;
        var lastPageTitle;
        var nextPageTitle;
        var totalPagesInTopic;

        /*console.log("lund",module,topic,page,this.totalPagesInTopic,this.totalTopicInModule,this.totalModules);*/

        if (page > 1 && page <= this.totalPagesInTopic) {
            lastPageTitle = model.courseXMLObj["mod_" + module]["topic_" + topic]["page_" + (parseInt(page)-1)].title;
        } else if (page == 1 && topic > 1){
            lastPageTitle = model.courseXMLObj["mod_" + module]["topic_" + (parseInt(topic)-1)]["page_" + this.getTotalPagesInTopic(1,(parseInt(topic)-1))].title;
        }

        var pageObj;
        pageObj = model.courseXMLObj["mod_" + module]["topic_" + topic]["page_" + parseInt(page)];

        if (page < this.totalPagesInTopic) {
            nextPageTitle = model.courseXMLObj["mod_" + module]["topic_" + topic]["page_" + (parseInt(page)+1)].title;
        } else if (page == this.totalPagesInTopic && topic != this.totalTopicInModule) {
            nextPageTitle = model.courseXMLObj["mod_" + module]["topic_" + (parseInt(topic)+1)]["page_1"].title;
        }
        if(pageObj.overrideNextTitle == "true")
        {
            var newMod = pageObj.myNextTarget.split(",")[0];
            var newTop = pageObj.myNextTarget.split(",")[1];
            var newPage = pageObj.myNextTarget.split(",")[2];
            
            
            nextPageTitle = model.courseXMLObj["mod_" + newMod]["topic_" + newTop]["page_" + newPage].title;               
        }
        
        if(pageObj.overridePrevTitle == "true")
        {
            var newMod1 = pageObj.myPrevTarget.split(",")[0];
            var newTop1 = pageObj.myPrevTarget.split(",")[1];
            var newPage1 = pageObj.myPrevTarget.split(",")[2];
            
            lastPageTitle = model.courseXMLObj["mod_" + newMod1]["topic_" + newTop1]["page_" + newPage1].title;               
        }


        
        var titleFormat = (model.userDefineTitle).split(",");

        for (a = 0; a < titleFormat.length; a++) {
            if (titleFormat[a] == "#") {
                titleFormat[a] = moduleTitle;
            } else if (titleFormat[a] == "##") {
                titleFormat[a] = topicTitle;
            } else if (titleFormat[a] == "###") {
                titleFormat[a] = pageTitle;
            }
        }

        if(model.isNav)
        {
            if(model.currentModule == 1 && model.currentTopic == 3 && model.currentPage == 10)
            {
                nextPageTitle = model.courseXMLObj["mod_" + module]["topic_" + topic]["page_" + (parseInt(page)+1)].title;
            }
        }
        // if(model.currentModule == 1 && model.currentTopic == 1 && model.currentPage == 1){
        //     $("#audioOnOff,.highligher_onoff").hide();
        // }
        // else
        // {
        //     $("#audioOnOff,.highligher_onoff").show();
        // }
        $("#player_moduleTitle").html(titleFormat);
        $(".next_pg_title").html(nextPageTitle);
        $(".back_pg_title").html(lastPageTitle);

        model.getHeightN();
        model.getWidthN();

       // alert(model.getCurrentPageBg);
       this.setBg = this.getCurrentPageBg();

       controller.setNuget();       
      
       
       
    },

    setCurrentPage: function(module, topic, page) {
        this.currentModule = module;
        this.currentTopic = topic;
        this.currentPage = page;

        this.setTotalTopicInModule();
        this.setTotalPagesInTopic();

        this.currentPagePath = this.getCurrentPagePath();
        this.currentPageType = this.getCurrentPageType();        

        controller.updateView();
    },

    updatePageDone: function() {
        this.courseDoneTill[0] = Math.max(this.courseDoneTill[0], this.currentModule);
        this.courseDoneTill[1] = Math.max(this.courseDoneTill[1], this.currentTopic);
        this.courseDoneTill[2] = Math.max(this.courseDoneTill[2], this.currentPage);

        model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].status = 2;
        model.updateTopicDone();
        model.updateModuleDone();

        console.log("-----completed", model.getCompletedModCount(), model.totalModules);
        if (model.getCompletedModCount() == model.totalModules) {
            console.log("in iffffff");
       
        }

        if (this.isBookmarked) {
            controller.updateSaveData();
        }
    },

    getPageStatus: function(topic,page) {
        var bo = false;
        if (model.courseXMLObj['mod_' + model.currentModule]["topic_" + topic]["page_" + page].status == 2) {
            bo = true;
        }
        return bo;
    },

    isCurrentPageDone: function() {
        var bo = false;
        if (model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].status == 2) {
            bo = true;
        }
        return bo;
    },
    
    getTopicStatus: function(topic) {
        var bo = false;
        if (model.courseXMLObj['mod_' + model.currentModule]["topic_" + topic].status == 2) {
            bo = true;
        }
        return bo;
    },
    updateTopicDone: function() {
        //model.totalTopicInModule
        if (model.currentTopic == model.totalTopicInModule) {
            var len = Number(model.totalPagesInTopic) - 1;
            for (var i = 1; i <= len; i++) {
                if (model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + i].status < 2) {
                    return;
                }
            }
            model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic].status = 2;
        } else {
            var len = model.totalPagesInTopic;
            for (var i = 1; i <= len; i++) {
                if (model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + i].status < 2) {
                    return;
                }
            }
            model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic].status = 2;
        }

    },
    updateModuleDone: function() {
        var len = model.totalTopicInModule;
        for (var i = 1; i <= len; i++) {
            if (model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic].status < 2) {
                return;
            }
        }
        model.courseXMLObj['mod_' + model.currentModule].status = 2;
    },

    getCompletedModCount: function() {
        var count = 0;

        for (var i = 1; i <= model.totalModules; i++) {
            if (model.courseXMLObj['mod_' + i].status == 2) {
                count++;
            }
        }

        return count;
    },
     loadJson:function(arg, fnCallback){
       $.ajax({
          url:arg,
          dataType: "text",
          success: function(data) {

                var json = $.parseJSON(data);
                fnCallback(json);
            }
       });
    },

    loadXML: function(arg, fnCallback) {
        $.ajax({
            type: "GET",
            url: arg,
            dataType: "xml",
            success: function(xml) {
                fnCallback(xml);
            },
            error: function(err) {
             //alert(arg)
                $(".player_container_style").hide();
                $(".player_chromeError_style").show();
            }
        });
    },
    getHeightN: function() {
        this.getHeight = $('#player_contentArea').height();
        return this.getHeight;
    },
    getWidthN: function(){
        this.getWidth = $('#player_contentArea').width();
        return this.getWidth;
    },
    jumpPage: function(direction){
        var courseData = model.courseXMLObj.coursePages;
        var currentPage = model.currentPagePath;
        if(currentPage == undefined || courseData == undefined){return;}
        var currentPageObj = undefined;
        for (var i = 0; i < courseData.length; i++) {
            if ( courseData[i].target == currentPage){
                currentPageObj = courseData[i];
                break;
            }
        }
        if(currentPageObj == undefined){return;}
        if(direction == 'next'){
            if(currentPageObj.myNextTarget == undefined){return;}
            //var arr = currentPageObj.myNextTarget.match('(m([0-9]{1,2})_t([0-9]{1,2})_p([0-9]{1,2}))');
            var arr = currentPageObj.myNextTarget.split('_');
        }else if(direction == 'prev'){
            if(currentPageObj.myPrevTarget == undefined){return;}
            //var arr = currentPageObj.myPrevTarget.match('(m([0-9]{1,2})_t([0-9]{1,2})_p([0-9]{1,2}))');
            var arr = currentPageObj.myPrevTarget.split('_');
        }else{
            return;
        }
        arr[0] = arr[0].replace('m','');
        arr[1] = arr[1].replace('t','');
        arr[2] = arr[2].replace('p','');
        console.log('going '+direction+' to m'+arr[0]+'_t'+arr[1]+'_p'+arr[2] );
        if(arr[0]==null || arr[0]==undefined || arr[0]=='' || arr[0]==0 || arr[1]==null || arr[1]==undefined || arr[1]=='' || arr[1]==0 || arr[2]==null || arr[2]==undefined || arr[2]=='' || arr[2]==0 ){
            return;
        }else{
            model.showPage(arr[0],arr[1],arr[2]);
        }
    },
    twinmaxSetVal: function (obj, xVal, yVal, setOpacity) {
        TweenMax.set($(obj), {
            x: xVal,
            y: yVal,
            opacity: setOpacity
        });
    },

    twinmaxstaggerToVal: function (obj, animDuration, xVAl, yVal, opacityVal, easeMarhod, delayVal, repeatVal, yoyoVAl, animTravelTime, callFunctionOnCompleteAnimation) {
        TweenMax.staggerTo($(obj), animDuration, {
            x: xVAl,
            y: yVal,
            opacity: opacityVal,
            ease: easeMarhod,
            delay: delayVal,
            repeat: repeatVal,
            yoyo: yoyoVAl,
            onComplete: callFunctionOnCompleteAnimation
        }, animTravelTime);
    } 
};
