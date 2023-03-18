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
    settingsXML: '',
    gloassaryXML: '',
    resourceXML: '',
    isScorm: false,
    isBookmarked: false,
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
    assessmentPassPercent: 0,
    overrideBookmarkData: '',
    overrideSuspendData: '',
    courseName: '',
    pageNumberLevel: 1, //1:All pages in course, 2:All pages in module, 3:All Pages in topic
    menuLevel: 1,
    totalModules: 0,
    totalTopicInModule: 0,
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
    nextBlinkInterval:-1,
    currentAttempt:0,
    totalAttempts:2,
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
    inAssesment: false,
    tt:'',
    getHeight:"",
    getWidth:"",
    wheelNav:false,
    mypageLoded: false,
    assessmentData: [],
    setBg:false,
    ssessmentResult:false,
    resource_Array:[],
    sliderVar:false,
    NugeetData:{"Nug1":{"linkSection":[8],"completed":false},"Nug2":{"linkSection":[3,9],"completed":false},"Nug3":{"linkSection":[0,4,6],"completed":false},"Nug4":{"linkSection":[1,2],"completed":false},"Nug5":{"linkSection":[5,7],"completed":false}},
    currentAudioNo:1,
    isPageM1T1P3: false,
    topic5lastpageTarget:"",
    NugetCompletion: false,
    // m1_t3_p4_Clicked:false,
    // m1_t3_p10_Clicked:[0, 0, 0, 0],
    // m1_t3_p10_visited:false,



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
           // $('.debbugger_popup').find(".content_debugger").append("<p>Bookmark Data Get:"+model.bookMarkData+"</p><br>")
            model.suspendData = getSuspendData();
             //$('.debbugger_popup').find(".content_debugger").append("<p>Suspend Data Get:"+model.suspendData+"</p><br>")

            //model.bookMarkData = "1**1**1";
            //model.suspendData = '{"m_1":{"s":0,"t_1":{"s":0,"p_1":{"s":2},"p_2":{"s":0},"p_3":{"s":0}},"t_2":{"s":0,"p_1":{"s":0}},"t_3":{"s":0,"p_1":{"s":0},"p_2":{"s":0},"p_3":{"s":0},"p_4":{"s":0},"p_5":{"s":0},"p_6":{"s":0},"p_7":{"s":0},"p_8":{"s":0},"p_9":{"s":0},"p_10":{"s":0},"p_11":{"s":0},"p_12":{"s":0},"p_13":{"s":0},"p_14":{"s":0},"p_15":{"s":0},"p_16":{"s":0},"p_17":{"s":0}},"t_4":{"s":0,"p_1":{"s":0},"p_2":{"s":0},"p_3":{"s":0},"p_4":{"s":0},"p_5":{"s":0}},"t_5":{"s":0,"p_1":{"s":0},"p_2":{"s":0},"p_3":{"s":0},"p_4":{"s":0},"p_5":{"s":0}},"t_6":{"s":0,"p_1":{"s":0},"p_2":{"s":0},"p_3":{"s":0},"p_4":{"s":0}},"t_7":{"s":0,"p_1":{"s":0},"p_2":{"s":0},"p_3":{"s":0}},"t_8":{"s":0,"p_1":{"s":0},"p_2":{"s":0}}},"CDT":[1,1,1]}**{"isUserCorrect":false,"sectiontext":"Understanding Healthcare compliance","sectiontopic":"Healthcare Compliance"}|||{"isUserCorrect":false,"sectiontext":"Aligning with antitrust","sectiontopic":"Antitrust"}|||{"isUserCorrect":false,"sectiontext":"Trading within the limits of export control","sectiontopic":"Export Control"}|||{"isUserCorrect":true,"sectiontext":"Ensuring data privacy","sectiontopic":"Data Privacy"}|||{"isUserCorrect":false,"sectiontext":"Avoiding corruption and bribery","sectiontopic":"ABAC"}|||{"isUserCorrect":true,"sectiontext":"The valuing of HR business principles","sectiontopic":"HR"}|||{"isUserCorrect":false,"sectiontext":"Quality, always","sectiontopic":"Q&R"}|||{"isUserCorrect":true,"sectiontext":"Ensuring security","sectiontopic":"Security"}|||{"isUserCorrect":true,"sectiontext":"Prioritizing health and safety at work","sectiontopic":"Health & Safety"}|||{"isUserCorrect":false,"sectiontext":"Using social media responsibly","sectiontopic":"Social Media"}|||{"isUserCorrect":true,"sectiontext":"Respecting Human rights","sectiontopic":"Human rights"}$$11$$0****{"Nug1":{"linkSection":[8],"completed":true},"Nug2":{"linkSection":[3,9],"completed":false},"Nug3":{"linkSection":[0,4,6],"completed":false},"Nug4":{"linkSection":[1,2],"completed":false},"Nug5":{"linkSection":[5,7],"completed":true}}**false';

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
                var suspendArr = suspendData.split("**");

                var statusObj = JSON.parse(suspendArr[0]);
                model.VarAssesmentData = suspendArr[1];
                //$('.debbugger_popup').find(".content_debugger").append("<p>Assesment Data Get in model:"+model.VarAssesmentData+"</p><br>")
                model.resource_Array = [];
                model.resource_Array = suspendArr[2].split(',');
                model.NugeetData = JSON.parse(suspendArr[3]);
                model.NugetCompletion = suspendArr[4];
                //alert(model.resource_Array)
                //model.resource_Array = [1,,,,,,1,,,,,1,,,1]
                 $(".sowaccord ul li").each(function(i){
                    if(model.resource_Array[i] == 1){
                        $(this).addClass("actme");
                    }
                })
                 controller.checkResourseCompletion()
                console.log("statusObj", statusObj);

                for (var i = 1; i <= model.courseXMLObj.totalModules; i++) {
                    model.courseXMLObj["mod_" + i].status = statusObj["m_" + i].s;
                    for (var j = 1; j <= model.courseXMLObj["mod_" + i].totalTopicInModule; j++) {
                        model.courseXMLObj["mod_" + i]["topic_" + j].status = statusObj["m_" + i]["t_" + j].s;
                        for (var k = 1; k <= model.courseXMLObj["mod_" + i]["topic_" + j].totalPagesInTopic; k++) {
                            model.courseXMLObj["mod_" + i]["topic_" + j]["page_" + k].status = statusObj["m_" + i]["t_" + j]["p_" + k].s;
                        }
                    }
                }

                model.courseDoneTill = statusObj.CDT;
                
            }
        }
     
        controller.playerReady();
    },
    
setBookmarkLocation: function() {
        var arr = model.bookMarkData.split("**");
        var temp = {};
        temp.currentModule = parseInt(arr[0]);
        temp.currentTopic = parseInt(arr[1]);
        temp.currentPage = parseInt(arr[2]);
        //var vidVisit = arr[3].split(',');

        //model.setVideoState(vidVisit);   

        model.currentModule = temp.currentModule;
        model.currentTopic = temp.currentTopic;
        model.currentPage = temp.currentPage;



        //$("#player_bookmarkPopupWrapper").dialog("close");
        $("#player_bookmarkPopupWrapper").removeClass('on');
            $('.footer, .header, .player_contentArea_style').show();
         model.showPage(model.currentModule, model.currentTopic, model.currentPage);
        // added jeewan for bookmark in jump lego game
       /*  if(model.currentTopic==2){
            model.showPage(1, 2, 2);
            
        }else{
      
           model.showPage(model.currentModule, model.currentTopic, model.currentPage);
        }*/
    },

   
    closeBookmarkPopup: function() {
        var arr = model.bookMarkData.split("**");
     
        //var vidVisit = arr[3].split(',');;;
       // model.setVideoState(vidVisit);

        model.VarAssesmentData = "";
        model.currentModule = 1;
        model.currentTopic = 1;
        model.currentPage = 1;

       // $("#player_bookmarkPopupWrapper").dialog("close");
        $("#player_bookmarkPopupWrapper").removeClass('on');
               /* $('.footer, .header, .player_contentArea_style').show();
        model.showPage(model.currentModule, model.currentTopic, model.currentPage);*/
        language.playSplashIfOn()
    },
    jsonLoadDone: function(data) {

        model.courseData = data;
       
        $('.logo_aa').html(model.courseData.courseTitle.Title);
        ////////////////////Bookmarking Data////////////////////////////
        $('#player_bookmarkPopupWrapper').find('.feedbackTitle').html(model.courseData.uidialogues.Bookmarking.feedbackTitle);
        $('#player_bookmarkPopupWrapper').find('.feedcontent').html(model.courseData.uidialogues.Bookmarking.feedcontent);
        $('#player_bookmarkPopupWrapper').find('.Yesbutton').html(model.courseData.uidialogues.Bookmarking.Yesbutton);
        $('#player_bookmarkPopupWrapper').find('.Nobutton').html(model.courseData.uidialogues.Bookmarking.Nobutton);
        

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
            $.each(model.courseData.uidialogues.Resources,function(k,v){
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
               
            })
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
                //alert(j+ "topic no")
                if(j == 4){
                    tempTopicObj.totalPagesInTopic = 5
                 var  topic5Array = [[{"index":1,"type":"expo"},{"index":7,"type":"anti"}],[{"index":2,"type":"expo"},{"index":3,"type":"anti"}],[{"index":4,"type":"expo"},{"index":5,"type":"anti"}],[{"index":6,"type":"expo"},{"index":8,"type":"anti"}]]
                 var pageLenFotTopic = 4;
                 var temp = [0];
                 var temp1 = []
                 //var expo = 0
                 var sele = '';
                     for(var l=0;l<4;l++){
                        var n1 = getRandomInt(1, topic5Array.length)
                        
                        var arr = topic5Array.splice(n1-1,1)
                        var n2 = getRandomInt(0, 1)
                       // console.log(arr)
                        // alert(n1+" dd "+n2+arr[0][n2].type)
                        if(sele == ''){
                           sele = arr[0][n2].type
                           console.log(sele+"   blank")
                        }else{
                              /* console.log(arr[0][n2].type.toString()+"   sdadsas   "+sele.toString())
                               console.log(arr[0][n2].type.toString() == sele.toString())*/
                            if(arr[0][n2].type.toString() == sele.toString()){
                                n2 = 1-n2;
                                sele = arr[0][n2].type
                            }else{
                                sele = arr[0][n2].type
                            }
                             //console.log(sele+"   not blank")
                        }
                        
                        temp1.push(sele)
                        /* if(arr[0][n2].type == "expo"){
                            expo++

                         }
                         if(l==3 && (expo == 4 || expo == 0)){
                            console.log(n2)
                            n2 = 1-n2;
                            console.log(n2+" updated")
                         }*/
                        temp.push(arr[0][n2].index)
                     }
                    // console.log(temp1)
                     console.log(temp)
                   for (var k = 0; k < temp.length; k++) {
                         tempTopicObj['page_' + (k + 1)] = {};
                        var tempPageObj = tempTopicObj['page_' + (k + 1)];
                        tempPageObj.id = k+1;
                        tempPageObj.target = pageXML.eq(Number(temp[k])).attr('target');
                        if(k == temp.length-1){
                            model.topic5lastpageTarget = tempPageObj.target
                        }
                        tempPageObj.setBg = pageXML.eq(Number(temp[k])).attr('setBg');
                        
                        tempPageObj.overrideNextTitle = pageXML.eq(Number(temp[k])).attr('overrideNextTitle');
                        //alert(pageXML.eq(k).attr('overridePrevTitle'))
                        tempPageObj.overridePrevTitle = pageXML.eq(Number(temp[k])).attr('overridePrevTitle');
                        
                        tempPageObj.myPrevTarget = pageXML.eq(Number(temp[k])).attr('myPrevTarget');
                        tempPageObj.myNextTarget = pageXML.eq(Number(temp[k])).attr('myNextTarget');
                        /**/
                        tempPageObj.title = pageXML.eq(Number(temp[k])).find('title').eq(0).text();
                        //tempPageObj.transcript = pageXML.eq(k).find('transcript').eq(0).text();
                           tempPageObj.transcript = [];
                        for (var l = 0; l < pageXML.eq(Number(temp[k])).find('transcript').length; l++) {
                            tempPageObj.transcript.push(pageXML.eq(Number(temp[k])).find('transcript').eq(l).text());
                        }



                        tempPageObj.type = pageXML.eq(Number(temp[k])).attr('type') == "interactive" ? INTERACTIVE : NON_INTERACTIVE;
                        tempPageObj.status = 0;
                        tempPageObj.module = (i + 1);
                        tempPageObj.topic = (j + 1);
                        tempPageObj.page = (Number(temp[k]) + 1);

                        coursePagesTemp.push(tempPageObj);

                        model.courseXMLObj.totalPagesInCourse++;
                        tempModObj.totalPagesInMod++;
                    } 
                }else{
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
        if(model.currentModule == 1 && model.currentTopic == 1 && model.currentPage == 1){
            $("#audioOnOff,.highligher_onoff").hide();
        }
        else
        {
            $("#audioOnOff,.highligher_onoff").show();
        }
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

        if (this.isBookmarked) {
            controller.updateSaveData();
        }

       


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
};
