var assessment = {
    assessmentXMLObj: {},
    isRandom: false,
    totalAttempts: 5,
    currentAttempt: 1,
    currentQuestCount: 0,     
    dndCurrentDragItem: "",
    dndCurrentDropItem: "",
    totalQuestion: 0,
    currentQuestObj: {},
    shownQuestionArr: [],
    resultPerCol: 20,   
    ATTEMPT: 10,
    REVIEW: 20,
    mode: -1,
    passingMarks: 100,
    correctDoneIdArr: [],
    varAssesmentDataArray: [],
    DragCPos: {},
    DragNDropCAns: [],
    DragNDropCPos: [],
    DragTopPos: 0,
    arr_val: {
        0: "Step 1",
        1: "Step 2",
        2: "Step 3"
    },
    DndReviewPostion: [],
    ArrDndDropCpntainer: [],
    scenarioObj: {},
    PreAsessentCorAud: "",
    PreAsessentInCorAud: "",
    blankblob: '',
    feedbackAudCount: 0,
    select_value_heading: "",
    varquestionNoCounter: 0,   
    willDrop: false,  
    dropOutSide: true,

    init: function() {        
        //assessment.varquestionNoCounter = 0;
        assessment.ArrDndDropCpntainer = [];
        assessment.DndReviewPostion = [];
        assessment.DragTopPos = 0,
        assessment.assessmentXMLObj = {};
        assessment.currentQuestCount = 0;
        assessment.currentQuestObj = {};
        //assessment.shownQuestionArr = [];
        //assessment.correctDoneIdArr = [];
        assessment.mode = assessment.ATTEMPT;
        assessment.currentAttempt = 1;
        $("#player_reloadPageBtn").css("pointer-events", "auto");
        // $('.debbugger_popup').find(".content_debugger").append("<p>Assesment Data Get in Assesment:"+model.VarAssesmentData+"</p><br>")
        //alert(model.VarAssesmentData)
        if (model.VarAssesmentData != "") {              
            assessment.mode = -1;
            setTimeout(function() {
                model.tl.progress(1);
                assessment.showResult();                               
            }, 500)



        } else {
            //$('.debbugger_popup').find(".content_debugger").append("<p>Assesment Data Set in Assesment1:"+model.VarAssesmentData+"</p><br>")
            //assessment.feedback_audioLoad();
            model.loadXML('content/xml/' + language.userlanguage + '/assessment.xml', assessment.parseXML);

        }
        //assessment.doStartAssessment()
        //alert(assessment.shownQuestionArr.length)

        // $("#sbmt_btn").one("click", assessment.showResult2);
        // $(".tab").trigger("click");

        // $("#sbmt_btn").one("click", assessment.showResult2);
        // $(".tab").trigger("click");
    },


    playScenario: function() {      
       
       $(".icondiv1").removeClass("visited_info");
        
        assessment.select_value_heading = "";
        assessment.select_value_heading = $(this).find("span").text().trim();
        var getPrevCon = $("#player_moduleTitle").html();
        $("#player_moduleTitle").html("").html(assessment.select_value_heading+": "+getPrevCon);
        
        $(this).addClass("isclicked");          
        
        
        $('.nextpopup_Ver, .nextpopup_Hor').hide();
        $('.noteSection').hide();
        $(".grid").hide();
        $(".page_heading").css("opacity","0");
        var audioPath = "content/audio/mp3/" + language.userlanguage + "/Assesment/landingaudio.mp3"
            //audioController.loadAudio(audioPath)
        assessment.currentQuestCount = $(this).attr('SectionId');        
        assessment.currentQuestObj = assessment.assessmentXMLObj.quesArray[assessment.currentQuestCount];
        assessment.shownQuestionArr[assessment.currentQuestCount] = assessment.currentQuestObj
            //assessment.shownQuestionArr.push(assessment.currentQuestObj);
       // $(".nextpopup_" + assessment.currentQuestObj.orientation).show();
        $(".nextpopup_" + assessment.currentQuestObj.orientation + " .title_text p").html(''),
            $(".nextpopup_" + assessment.currentQuestObj.orientation + " .title_text p").html(assessment.currentQuestObj.scenarioText);
        $(".nextpopup_" + assessment.currentQuestObj.orientation + " .info_box p").html(''),
            $(".nextpopup_" + assessment.currentQuestObj.orientation + " .info_box p").html(assessment.currentQuestObj.scenarioInfo);

        // var path = "content/images/pages/m1_t1_p3/" + assessment.currentQuestObj.imagePath;

        // var path = "content/images/pages/m1_t1_p1/" + assessment.currentQuestObj.imagePath;

        var path = "content/images/pages/m1_t1_p3/" + assessment.currentQuestObj.imagePath;

        $(".nextpopup_" + assessment.currentQuestObj.orientation + " .left_bg img").attr('src', path);

        $("#ques_img").attr('src', path);
        
        // var iconpath = "content/images/pages/m1_t1_p1/icon/" + assessment.currentQuestObj.iconPath;

        // var iconpath = "content/images/pages/m1_t1_p1/icon/" + assessment.currentQuestObj.iconPath;

        var iconpath = "content/images/pages/m1_t1_p1/icon/" + assessment.currentQuestObj.iconPath;

        $(".nextpopup_" + assessment.currentQuestObj.orientation + " .title_box img").attr('src', iconpath);

        


        // $(".continue_btn").off('click').on("click", assessment.doStartAssessment);
        $(this).removeClass("firstblink");
        //       $(".transcriptBtn").addClass("disableBtnsUi");
        $(".ams1, .ams2, .ams3, .ams4").show();
        $(".footauto, .navBtnContainer").hide();
        
        // $(".abbotdiv_nw").show();
        // $("#player_helpBtn, #cross_button, #player_reloadPageBtn").addClass("disableBtnsUi");
        // $('.assessment .scenariocontainer').show();

        assessment.doStartAssessment();

        if(assessment.currentQuestObj.type == "DND"){
            // $(".main_title").css("color", "#dbcfe9")
            $(".main_title").addClass("light_color");
            $(".main_title").removeClass("dark_color");
        }
        else{
            $(".main_title").addClass("dark_color");
            $(".main_title").removeClass("light_color");

            // $(".main_title").css("color", "#7d0063")
        }

        
    },
    doStartAssessment: function() {

        $(".nextpopup_" + assessment.currentQuestObj.orientation + " .left_bg img").attr('src', '')
            //alert("vvvvv")
        $(".assessment .page_heading").hide();
        model.inAssesment = true;
        $(".transcriptBtn").removeClass('activeTranscript');
        model.freezButtns = true;
        // $("#player_menuBtn,#audioOnOff,#player_transcriptDilogBtn,#player_reloadPageBtn").addClass("disableBtnsUi");

        model.isTranscriptPopup = false;
        $(".transcriptDilog").hide();
        $(".player_container_style").addClass("noHover");

        $("#introScreen").hide();
        $("#questionContainer").show();
        // $(".playerCenterBtns").append("<div class='transcript_Overlay' id='transcript_Overlay'></div>");

        audioController.clearAudio();
        controlsHandeler.setState("backBtn", false);
        $('.nextpopup_Ver, .nextpopup_Hor').hide();
        $('.noteSection').hide();
        $(".assessment .tabcontainer").show();
        $("#transcript_Overlay").show();
        $("#transcript_Container").hide();
        $('.assessment .contenerBox').hide();
        //assessment.totalQuestion = assessment.assessmentXMLObj.quesArray.length;
        //alert(assessment.totalQuestion +"::1::"+assessment.assessmentXMLObj.quesArray.length)

        //if (assessment.totalQuestion > assessment.assessmentXMLObj.quesArray.length) {
        if (assessment.assessmentXMLObj.quesArray.length <= 0) {
            //debuggerController.logError("not enough questions in pool");
            console.error("not enough questions in pool");
            // alert("::2::")
        } else {

            assessment.handleAssessment();
        }
        //alert(assessment.totalQuestion+":::nn:::"+assessment.assessmentXMLObj.quesArray.length)
        //assessment.handleAssessment();
    },


    parseXML: function(xml) {

        var tempXML = $(xml);
        assessment.scenarioObj = tempXML.find("scenarios");
        assessment.isRandom = tempXML.find("isRandom").attr("val") == "true" ? true : false;
        assessment.totalAttempts = parseInt(tempXML.find("attempts").attr("val"));
        assessment.totalQuestion = parseInt(tempXML.find("totalQuestion").attr("val"));

        // alert("gggg:::"+tempXML.find("section").length)

        if (assessment.totalAttempts < 1) {
            assessment.totalAttempts = 1;
        }

        var tempQuestion = tempXML.find("section");
        var arrQues = [];
        var numAdvance = 0;
        var numQuestion;
        var strSeverity;
        var numInsert;
        var numBox = tempXML.find("section").length;
        var numQues = 3;
        /*$.each(tempQuestion,function(k,v){
            console.log(k+"  fff "+v)
        })*/

        /*var rand = function() {
        return Math.floor(Math.random()*(numBox+1));
        };*/

        for (var i = 0; i < numBox; i++) {
            numQuestion = tempXML.find("section").eq(i).find("question").length
                //alert(numQuestion)

            //alert(numBox-i)
            if (numBox - i == 3) {
                //alert(numAdvance+"  3")
                if (numAdvance == 0) {
                    var j = numQuestion - 1
                } else {
                    if (numAdvance < 3) {
                        var j = Math.floor((Math.random() * numQuestion));
                    } else {
                        var j = Math.floor((Math.random() * (numQuestion - 1)))
                    }
                }
            } else if (numBox - i == 2) {
                if (numAdvance == 1) {
                    var j = numQuestion - 1
                } else {
                    if (numAdvance < 3) {
                        var j = Math.floor((Math.random() * numQuestion));
                    } else {
                        var j = Math.floor((Math.random() * (numQuestion - 1)))
                    }
                }
            } else if (numBox - i == 1) {
                if (numAdvance == 2) {
                    var j = numQuestion - 1
                } else {
                    if (numAdvance < 3) {
                        var j = Math.floor((Math.random() * numQuestion));
                    } else {
                        var j = Math.floor((Math.random() * (numQuestion - 1)))
                    }
                }
            } else {
                if (numAdvance < 3) {
                    var j = Math.floor((Math.random() * numQuestion));
                } else {
                    var j = Math.floor((Math.random() * (numQuestion - 1)))
                }

            }
            /*if(numAdvance<3)    
              var j = Math.floor((Math.random()*numQuestion));              
            else
              var j = Math.floor((Math.random()*(numQuestion-1))); */

            //alert(j+"    jjjjjjjjjjjjjj")
            var strSeverity = tempXML.find("section").eq(i).find("question").eq(j).attr("severity");
            arrQues.push(j);
            if (strSeverity == "advance")
                numAdvance++;



        }
        // alert(tempQuestion.length)
        //alert(numAdvance+"Ques:::"+arrQues)        
        //alert("tempXML::::"+tempXML)


        //alert("no. of questions:::"+tempQuestion.length)
        //        alert("vvv:::"+arrQues)
        var tempQuesLen = tempQuestion.length;

        assessment.assessmentXMLObj.quesArray = [];

        /*  for(var i=0;i<tempQuesLen;i++)
          {
              var tempObj = {};
              var temp = tempXML.find("section").eq(i).find("question").eq(arrQues[i]);             
              tempObj.type = temp.attr('type');
              tempObj.correctAnswer = temp.attr('correctAnswer');
              tempObj.quesText = temp.find("quesText").eq(0).text();
              tempObj.iText = temp.find("iText").eq(0).text();
              tempObj.options = [];
              tempObj.additionalInfo = [];
              tempObj.submitAnswers = [];
              alert("mmmvvm:::"+tempObj.quesText)

          }*/

        for (var i = 0; i < tempQuesLen; i++) {
            /* var tempObj = {};
             var temp = tempQuestion.eq(i);

             tempObj.type = temp.attr('type');
             tempObj.correctAnswer = temp.attr('correctAnswer');
             tempObj.quesText = temp.find("quesText").eq(0).text();
             tempObj.iText = temp.find("iText").eq(0).text();
             tempObj.options = [];
             tempObj.additionalInfo = [];
             tempObj.submitAnswers = [];*/

            var tempObj = {};

            var temp = tempXML.find("section").eq(i).find("question").eq(arrQues[i]);
            var scenario = temp.find("scenario");
            tempObj.sectiontext = tempXML.find("section").eq(i).attr("sectiontext");
            tempObj.secID = tempXML.find("section").eq(i).attr("secID");
            tempObj.sectiontopic = tempXML.find("section").eq(i).attr("sectiontopic");
            tempObj.toolkitText = tempXML.find("section").eq(i).attr("toolkitText");
            tempObj.orientation = scenario.attr("orientation");
            tempObj.imagePath = scenario.attr("imagePath");
            tempObj.iconPath = scenario.attr("iconPath")
            tempObj.scenarioText = scenario.eq(0).text();
            tempObj.scenarioInfo = temp.find("scenarioInfo").eq(0).text();
            tempObj.type = temp.attr('type');
            tempObj.correctAnswer = temp.attr('correctAnswer');
            tempObj.questioIndex = temp.attr('questioIndex');
            tempObj.quesText = temp.find("quesText").eq(0).text();
            tempObj.iText = temp.find("iText").eq(0).text();
            tempObj.infoText = temp.find("infoText").eq(0).text();
            tempObj.scenario_info = temp.find("scenario").eq(0).text();
            tempObj.options = [];
            tempObj.additionalInfo = [];
            tempObj.submitAnswers = [];
            tempObj.currentAttempt = 0;

            var tempOptions = temp.find("option");
            var optionLen = tempOptions.length;
            for (var j = 0; j < optionLen; j++) {
                tempObj.options.push(tempOptions.eq(j).text());
                if (tempObj.type == "DROPDOWN") {   
                    var myListItems = String(tempOptions.eq(j).attr("items"));
                    var myCorrect = Number(tempOptions.eq(j).attr("correct"));
                    var myType = Number(tempOptions.eq(j).attr("type"));


                    var objT = {
                        myList: myListItems,
                        myCorr: myCorrect,
                        myType: myType
                    }

                    tempObj.additionalInfo.push(objT);
                }
                if (tempObj.type == "DND") { 
                    tempObj.secondCorrectAnswer = temp.attr('secondCorrectAnswer');                
                    tempObj.DropLength = temp.attr('DropLength')
                    tempObj.DropID = temp.attr('DropID')
                    tempObj.dragsUID = temp.attr('dragsUID')
                    tempObj.tableHead = temp.find("tableHead").eq(0).text();
                    tempObj.tableLft = temp.find("tableLft").eq(0).text();
                    tempObj.tableBottom = temp.find("tableBottom").eq(0).text();                    
                }
            }
            var tempFeedback = temp.find("feedback");
            tempObj.correctFeedback = tempFeedback.find("correctFeedback").eq(0).text();
            tempObj.incorrectFeedback = tempFeedback.find("incorrectFeedback").eq(0).text();
            tempObj.incorrectFeedbackpop = tempFeedback.find("incorrectFeedbackpop").eq(0).text();

            assessment.assessmentXMLObj.quesArray.push(tempObj);

        }
        $('.section_box').one("click", assessment.playScenario);
        //assessment.createNewQuestionArray()
    },
    movetoHomePage: function() {
        // $(".main_title").css({"color": "#dbcfe9", "opacity": "1"});
        audioController.clearAudio();        
        // audioController.loadAudio(assessment.blankblob)
        //console.log(assessment.shownQuestionArr.length+"weee")
        //alert(assessment.varquestionNoCounter)
        
        if (assessment.varquestionNoCounter < 11) { 
            $(".assessment .page_heading").show();
            $(".assessment .contenerBox").show(); 
            $(".grid").show();
            $(".page_heading").css("opacity","1");
            $('.noteSection').show();
            $(".nextpopup_Ver, .nextpopup_Hor").hide();
            $(".tabcontainer").hide();
            $('.pageBG_rt').hide();
            $("#sbmt_btn").one("click", assessment.doStartAssessment);
        } else {
             $('.noteSection').hide();
            /* for(var i=0;i<assessment.shownQuestionArr.length;i++){
                 alert(assessment.shownQuestionArr[i].isUserCorrect)
                 
             }*/
             
            // $.each(model.NugeetData, function(k, v) {
            //     var bo = true;
            //     $.each(v.linkSection, function(k1, v1) {
            //         if (!assessment.shownQuestionArr[v1].isUserCorrect) {
            //             bo = false
            //         }
            //     })

            //     if (bo) {
            //         v.completed = true;
            //     }

            // })
            // console.log(model.NugeetData)
                
            assessment.showResult();
        }

    },
    handleAssessment: function() {
        if(assessment.currentQuestObj.questioIndex == 9){
            $("#questionContainer").addClass("Q9");
        } else{
            $("#questionContainer").removeClass("Q9");
        }

        $("#questionContainer").html('');
        assessment.createQuestion();
        //alert(assessment.currentQuestObj.questioIndex)

        // var n1 = Number(assessment.currentQuestObj.questioIndex)
        // audioPath = "content/audio/mp3/" + language.userlanguage + "/Assesment/ques" + n1 + ".mp3";

        // var req = new XMLHttpRequest();
        // req.open('GET', audioPath, true);
        // req.responseType = 'blob';

        // req.onload = function() {            
        //     if (this.status === 200) {                
        //         var audioBlob = this.response;
        //         audioPath = URL.createObjectURL(audioBlob);
        //         audioController.loadAudio(audioPath);
        //     }
        // }
        // req.onerror = function() {}
        // req.send();        


    },

    createQuestion: function() {

        console.log("here i am", assessment.mode);
        /*if (assessment.mode == assessment.ATTEMPT) {
            assessment.currentQuestObj = assessment.getCurrentQuest();
            assessment.shownQuestionArr.push(assessment.currentQuestObj);
        } else {
            //alert(assessment.currentQuestCount)
            assessment.currentQuestObj = assessment.shownQuestionArr[assessment.currentQuestCount - 1];
        }*/
        //alert(assessment.assessmentXMLObj.quesArray)


        var temp;
        $(".pageBG_rt").show();
        $(".pageBG_rt").removeClass('hide_img');
        $(".pageBG_rt").css('visibility', 'visible')
        $(".tabcontainer").removeClass("drag_dnd");

        switch (assessment.currentQuestObj.type) {
            case 'MCQ':
                temp = assessment.createMCQ(assessment.currentQuestObj.options);
                $("#questionContainer").removeClass("dnd_cont");
                break;
            case 'MMCQ':
                temp = assessment.createMMCQ(assessment.currentQuestObj.options);
                $("#questionContainer").removeClass("dnd_cont");
                break;
            case 'MMCQ_OR':
                temp = assessment.createMMCQ_OR(assessment.currentQuestObj.options);
                $("#questionContainer").removeClass("dnd_cont");
                break;    
            case 'DROPDOWN':
                temp = assessment.createDropDown(assessment.currentQuestObj.options);
                $("#questionContainer").removeClass("dnd_cont");
                break;
            case 'DND':
                temp = assessment.createDND1(assessment.currentQuestObj);
                $("#questionContainer").addClass("dnd_cont");
                tempClass = 'DND1_C';
                $(".pageBG_rt").hide();
                $(".pageBG_rt").addClass('hide_img');
                $(".pageBG_rt").css('visibility', 'hidden')
                $(".tabcontainer").addClass("drag_dnd");
                break;
            default:
                console.log("CHECK !!!");
                break;
        }
        /*var str = "<div>" + assessment.currentQuestObj.quesText + "</div><div><em style='color:#BC141A;'>" + assessment.currentQuestObj.iText + "</em></div><div id='optionContainer'>" + temp + "</div>";*/
        //$(".assessment .page_heading").html("");
        //if(model.VarAssesmentData == ""){
        //var strQuestion = "Question " + assessment.currentQuestCount + " of " + assessment.totalQuestion;
        // $(".assessment .page_heading").append(strQuestion);
        /* }else{
              var strQuestion = "Result";
            $(".assessment .page_heading").append(strQuestion);
        }*/

        //console.clear();

        
        var getPageCount = "Question: <span>"+parseInt(eval(assessment.currentQuestCount)+1)+' of '+assessment.assessmentXMLObj.quesArray.length+"</span>";       
       

       if(assessment.currentQuestObj.type == "DND"){
        var str = "<div class='cuPageCount'>"+getPageCount+"</div> <div class='scenarioHeading'>" + assessment.currentQuestObj.scenario_info + "</div> <div class='quesHeading'>" + assessment.currentQuestObj.quesText + "</div><div class='emdiv'><em>" + assessment.currentQuestObj.iText + "</em></div><div class='tableTop'>"+assessment.currentQuestObj.tableHead+"</div><div class='tableLft'>"+assessment.currentQuestObj.tableLft+"</div><div id='optionContainer'>" + temp + "</div><div class='tableBot'>"+assessment.currentQuestObj.tableBottom+"</div>";
       }
       else{
        var str = "<div class='cuPageCount'>"+getPageCount+"</div> <div class='scenarioHeading'>" + assessment.currentQuestObj.scenario_info + "</div> <div class='quesHeading'>" + assessment.currentQuestObj.quesText + "</div><div class='emdiv'><em>" + assessment.currentQuestObj.iText + "</em></div><div id='optionContainer'>" + temp + "</div>";
       }

        

        $("#questionContainer").append(str);
        var breakQues = $('.cuPageCount').text().split(":")[0];
        if(language.userlanguage == 'en'){
            $('.cuPageCount').html($('.cuPageCount').html().replace(breakQues,'Question'));
        }

           
        if (assessment.currentQuestObj.type == "DROPDOWN") {
            var nLen = assessment.currentQuestObj.additionalInfo.length;
            for (var t = 0; t < nLen; t++) {
                var strT = assessment.currentQuestObj.additionalInfo[t].myList;
                var optT = assessment.currentQuestObj.additionalInfo[t].myType;
                var arrT = strT.split("^^");
                for (var l = 0; l < arrT.length; l++) {
                    if (optT == 1) {

                        var elem = $('<option>' + arrT[l] + '</option>')
                        $("#item_" + t).addClass("optipnType1")
                        $("#item_" + t).append(elem);
                    } else {

                        var elem = $('<option>' + arrT[l] + '</option>')
                        $("#item_" + t).addClass("optipnType2")
                        $("#item_" + t).append(elem);
                    }

                }
            }
        }
        /* if(assessment.currentQuestObj.type == "DND"){
             //alert("fsfsdf");
             // var str = "<div class='qs_title'>" + assessment.currentQuestObj.quesText +" "+(MCQ.currentQuestCount+1+ " of 15") + "</div><div class='questionContainer2'><div class='questionStem'>" + MCQ.currentQuestObj.quesText + "</div><div id='optionContainer'><div class='hotspotOpt_"+MCQ.currentQuestObj.id+"'>" + temp + "</div></div></div>";
              var str = "<div >" + assessment.currentQuestObj.quesText + "</div><div><div class='itext_dnd'>" + assessment.currentQuestObj.iText + "</div></div><div id='optionContainerFourth'>" + temp + "</div>";

               $("#questionContainer").append(str); 
         }*/
        //console.log("assessment.mode",assessment.mode)

        //     if (assessment.mode == assessment.ATTEMPT) {
        //         str = "<button id='quesSubmit' class='button1'><span>Submit</span></button>";
        //         $("#questionContainer").append(str);
        //         assessment.setSubmitState(false);
        //         assessment.makeFunctional();
        //     } else {
        //         str = "<button id='quesBack' class='clickButton' style='margin-top: 2%;'>Back</button>";
        //         str += "<button id='quesNext' class='clickButton' style='margin-top: 2%; margin-left: 2%;'>Next</button>";
        //         str += "<button id='quesScoreCard' class='clickButton' style='margin-top: 2%; margin-left: 2%;'>Scorecard</button>";

        //         //console.log("str",str)

        //         $("#questionContainer").append(str);
        //         assessment.reviewQuestion();
        //         $("#quesScoreCard").one("click", assessment.showResult);
        //         $("#quesBack").one("click", assessment.doReviewBack);
        //         $("#quesNext").one("click", assessment.doReviewNext);
        //         assessment.setReviewNextBackState();

        //         $(".tabcontainer").show();
        //     }
        // },

        if (assessment.mode == assessment.ATTEMPT) {
            if (assessment.currentQuestObj.type == "DND") {
                if (assessment.currentQuestObj.hint != undefined && assessment.currentQuestObj.hint != "") {
                    str += "<div id='quesHintButton' class='hintButton'></div>";
                    $('#hintText').html("");
                    $('#hintText').html(assessment.currentQuestObj.hint);
                }
            }
            if (language.userlanguage == 'en') {
               str = "<button id='quesSubmit' class='button1 hvr-bounce-to-left'>Submit</button> <div class='abbotdiv'></div>  <button id='reset_btn' class='button1 hvr-bounce-to-left disabled'>Reset</button>";
            } 


            $("#questionContainer").append(str);
            $('#reset_btn').hide();
            assessment.setSubmitState(false);
            assessment.makeFunctional();
        } else {
            if (language.userlanguage == 'en') {
                    str = "<button id='quesBack' class='clickButton' style='margin-top: 1.5%;'>Back</button>";
                    str += "<button id='quesNext' class='clickButton' style='margin-top: 1.5%; margin-left: 2%;'>Next</button>";
                    str += "<button id='quesScoreCard' class='clickButton' style='margin-top: 1.5%; margin-left: 2%;'>Scorecard</button>";
                } 
           
            
            
            // if(assessment.currentQuestObj.type == "DND"){
            //     if(assessment.currentQuestObj.userAnswer != assessment.currentQuestObj.correctAnswer){
            //     var userAnswer = assessment.currentQuestObj.userAnswer.split("");
            //     var correctAnswer = assessment.currentQuestObj.correctAnswer.split("");
            //     for(var i=0; i<userAnswer.length; i++){
            //         var indexOfAns = jQuery.inArray(userAnswer[i], correctAnswer);
            //         str += "<div class='playerSubmitBtn' style='margin-left: 383px;'> Step-" + (parseInt(indexOfAns) + 1).toString() +"</div>";
            //     }
            // }
            //     }
            //console.log("str",str)
            // str = "<div id='bottomContainer'>"+str+"</div>";
            // $(".player_content #pageDiv").append(str);
            $("#questionContainer").append(str);
            assessment.reviewQuestion();
            $("#quesScoreCard").one("click", assessment.showResult);
            $("#quesBack").one("click", assessment.doReviewBack);
            $("#quesNext").on("click", assessment.doReviewNext);
            // $("#approveBtn").on("click", assessment.markQuestionCorrect);
            // $("#disApproveBtn").on("click", assessment.markQuestionIncorrect);
            // $("#feedbackBtn").on("click", assessment.showFeedbackBox);
            //$("#quesNext").addClass("blink_me")


            // if (assessment.currentQuestCount > 1) {
            //     $("#quesBack").show();
            // }else{
            //     $("#quesBack").hide();
            // }



            // if(model.assessmentCorrectData[assessment.currentQuestObj.sequenceNumber-1] == "1"){
            //     $(".checkIcon").addClass("buttonSelected");  
            //     $(".crossIcon").removeClass("buttonSelected");
            // }else if(model.assessmentCorrectData[assessment.currentQuestObj.sequenceNumber-1] == "2"){
            //     $(".checkIcon").removeClass("buttonSelected"); 
            //     $(".crossIcon").addClass("buttonSelected");
            // }else if(model.assessmentCorrectData[assessment.currentQuestObj.sequenceNumber-1] == "0"){
            //     $(".checkIcon").removeClass("buttonSelected");     
            //     $(".crossIcon").removeClass("buttonSelected");                
            // }


            assessment.setReviewNextBackState();

            $(".tabcontainer").show();
        }
    },

    ResetDND1: function() {
        var locObj = assessment.currentQuestObj;
        var dragsUID = locObj.DropID;
        assessment.setSubmitState(false);
        assessment.setResetState(false);
        $(".drops1 .dragTxt").remove();
        $(".drags1").css("visibility", "visible");
        $.each(assessment.DragCPos, function(k, v) {            
            $("#" + k).animate({
                left: v.left,
                top: v.top
            });
            $("#" + k).draggable('enable').attr('drop', '-1').removeClass("droped" + dragsUID);
            $("#" + k).draggable({
                revert: true
            });
            // $(this).droppable( "option", "disabled", true );
        })
        assessment.DragNDropCPos = [];
        assessment.DragNDropCAns = [];
        $(".drops" + dragsUID).droppable('enable');
        assessment.DragTopPos = 0;
        $(".drags1").each(function() {
            $(this).removeClass("drop1_1_child").removeClass("drop1_2_child").removeClass("drop1_3_child");
        })

    },
    setResetState: function(bo) {
        if (bo) {
            $("#reset_btn").prop("disabled", false);
            $("#reset_btn").removeClass("disabled");
            // $(".reset_itext").fadeIn();

        } else {
            $("#reset_btn").prop("disabled", true);
            $("#reset_btn").addClass("disabled");
            //$(".reset_itext").hide();
        }
    },
    initDND1: function() {
        //alert("drag_item");
        var locObj = assessment.currentQuestObj;
        var dragsUID = locObj.DropID;
        assessment.DragNDropCAns = [];
        //alert(dragsUID);
        var scaleRatio = controller.contentScale;
        $(".drags" + dragsUID).draggable({
            containment: "#pageDiv",
            revert: true,
            tolerance: 'fit',
            drag: function(event, ui) {
                //alert(scaleRatio)                
                if (scaleRatio < 1) {
                    var changeLeft = ui.position.left - ui.originalPosition.left;
                    var newLeft = ui.originalPosition.left + changeLeft / ((scaleRatio));
                    var changeTop = ui.position.top - ui.originalPosition.top;
                    var newTop = ui.originalPosition.top + changeTop / scaleRatio;
                    ui.position.left = newLeft;
                    ui.position.top = newTop;
                }
                //$(this).attr("initTop", ui.position.top).attr("initLeft",  ui.position.left);
            },
            start: function(event, ui) {
                assessment.dropOutSide = true;
                assessment.willDrop = true;
                $(this).css({
                    "z-index": 999999999
                });
                assessment.dndCurrentDragItem = $(this).attr("id");
                assessment.dndCurrentDropItem = $(this).attr("drop");
                console.log("start--------"+ $(this).attr("id"));
            },
            stop: function() {
                $(this).css({
                    "z-index": 99
                });
                if(assessment.dropOutSide){
                   console.log("stopfun---"+assessment.dropOutSide);  
                   var get_drop = assessment.dndCurrentDropItem;
                   var get_drop_id = assessment.dndCurrentDragItem;
                   $("#"+get_drop).attr("child","");
                   $("#"+get_drop).droppable("enable");
                   $("#"+get_drop_id).removeClass(get_drop+"_child");
                   $("#"+get_drop_id).attr("style","");
                   $("#"+get_drop_id).css("position","relative");
                   $("#"+get_drop_id).attr("drop",-1);
                   $("#"+get_drop_id).removeClass("droped1");

                var index_id = assessment.DragNDropCAns.indexOf(get_drop_id);
                if (index_id > -1) {
                  assessment.DragNDropCAns.splice(index_id, 1);
                }

               console.log("----->>>>>"+assessment.dropOutSide);
                if (assessment.DragNDropCAns.length == locObj.options.length) {
                    assessment.setSubmitState(true);
                }else{
                    assessment.setSubmitState(false);
                }

                }
            },
            containment: "#pageDiv"
        });
        // $("#reset_btn").on("click", assessment.ResetDND1);

        assessment.ArrDndDropCpntainer = [];

        $(".drops" + dragsUID).each(function(i) {
            var arr = [];
            assessment.ArrDndDropCpntainer.push(arr);
        })

        $(".drops" + dragsUID).droppable({
            drop: assessment.DropFun,
            snap: true,
        });

        $('#reset_btn').show().off("click").on("click", assessment.ResetDND1)

            // $("#reset_btn").on("click", assessment.ResetDND1);
        var dragLength = $(".dragsC" + dragsUID + " .drags" + dragsUID).length;

        for (var i = 0; i < dragLength; i++) {
            var GetDragLeft = $("#drag" + dragsUID + "_" + (i + 1)).css('left');
            var GetDropTop = $("#drag" + dragsUID + "_" + (i + 1)).css('top');
            if (GetDragLeft == 'auto') {
                GetDragLeft = '0px';
            };
            if (GetDropTop == 'auto') {
                GetDropTop = '0px';
            };
            var d = "drag" + dragsUID + "_" + (i + 1);
            assessment.DragCPos[d] = {
                "left": GetDragLeft,
                "top": GetDropTop
            };
            //alert(d)
        };
        //alert(assessment.DragCPos)

    },
    DropFun: function(e, ui) {
        console.log("dropfun"+assessment.dropOutSide);
        if(assessment.willDrop){
            assessment.willDrop = false;
        }
        else{
            return;
        }      
        assessment.dropOutSide = false;

        if(!assessment.dropOutSide){
        var locObj = assessment.currentQuestObj;
        var dragsUID = locObj.DropID;
       
        var DragId = ui.draggable.attr("id");

       // $(this).append("ui.draggable.html()");
       // ui.draggable.css("visibility", "hidden");
        var DropId = $(this).attr("id");
        var locObj = assessment.currentQuestObj;
        var dragsUID = locObj.DropID;
        var DropID_var = locObj.dragsUID;
       
        var drag_id = ui.draggable.attr("id").split("_");
        var drop_id = DropId.split("_");        

        if (DropID_var == 1) {
            if ((((drop_id[1] == 1) || (drop_id[1] == 2) || (drop_id[1] == 3))&&((drag_id[1] == 3) || (drag_id[1] == 6) || (drag_id[1] == 9))) || (((drop_id[1] == 4) || (drop_id[1] == 5) || (drop_id[1] == 6))&&((drag_id[1] == 2) || (drag_id[1] == 4) || (drag_id[1] == 8))) || (((drop_id[1] == 7) || (drop_id[1] == 8) || (drop_id[1] == 9))&&((drag_id[1] == 1) || (drag_id[1] == 5) || (drag_id[1] == 7)))){  

                 assessment.setResetState(true);              

                 $(".drops" + dragsUID).each(function() {
                    if ($(this).attr('child') == ui.draggable.attr('id')) {
                        $(this).attr("child", "");
                        $(this).droppable("option", "disabled", false);
                    }
                })        
                $(this).attr("child", ui.draggable.attr('id'))
                  setTimeout(function(){                
                        $("#"+DropId).droppable("disable");
                },100);

                ui.draggable.attr("drop", DropId);
                if ($(ui.draggable).hasClass("drop1_1_child") || $(ui.draggable).hasClass("drop1_2_child") || $(ui.draggable).hasClass("drop1_3_child")) {
                    $(ui.draggable).removeClass("drop1_1_child").removeClass("drop1_2_child").removeClass("drop1_3_child");
                }
                ui.draggable.addClass(DropId + "_child");

                  ui.draggable.draggable({
                    revert: false
                });
                ui.draggable.position({
                    of: $(this),
                    my: "center center",
                    at: "center center"
                });
                ui.draggable.addClass('droped' + dragsUID);
                //  ui.draggable.draggable('disable');
                //  $(this).droppable("option", "disabled", true);
                assessment.DragNDropCAns.push(DragId);
                if (assessment.DragNDropCAns.length == locObj.options.length) {
                    assessment.setSubmitState(true);
                }

            }else{              
               var get_drop = ui.draggable.attr("drop");
               var get_drop_id = ui.draggable.attr("id");
               $("#"+get_drop).attr("child","");
               $("#"+get_drop).droppable("enable");
               $("#"+get_drop_id).removeClass(get_drop+"_child");
               $("#"+get_drop_id).attr("style","");
               $("#"+get_drop_id).css("position","relative");
               $("#"+get_drop_id).attr("drop",-1);
               $("#"+get_drop_id).removeClass("droped1");
               

               var index_id = assessment.DragNDropCAns.indexOf(get_drop_id);
                if (index_id > -1) {
                  assessment.DragNDropCAns.splice(index_id, 1);
                }

               console.log("----->>>>>"+assessment.dropOutSide);
                if (assessment.DragNDropCAns.length == locObj.options.length) {
                    assessment.setSubmitState(true);
                }else{
                    assessment.setSubmitState(false);
                }
            }
            // alert(ui.draggable.attr("id"));
            // alert(DropId);           
        }
        }else{
            
        }

    },
    makeFunctional: function() {
        switch (assessment.currentQuestObj.type) {
            case 'MCQ':
                $('input').on('change', function() {
                    assessment.setSubmitState(true);
                });
                break;
            case 'MMCQ':
                var tempArr = [];
                $('input').on('change', function() {
                    tempArr = ($('input[name=assessmentQuestion]:checked').map(function() {
                        return this.value;
                    }).get());
                    if (tempArr.length > 0) {
                        assessment.setSubmitState(true);
                    } else {
                        assessment.setSubmitState(false);
                    }
                });
                break;
            case 'MMCQ_OR':
                var tempArr = [];
                $('input').on('change', function() {
                    tempArr = ($('input[name=assessmentQuestion]:checked').map(function() {
                        return this.value;
                    }).get());
                    if (tempArr.length > 0) {
                        assessment.setSubmitState(true);
                    } else {
                        assessment.setSubmitState(false);
                    }
                });
                break;
            case 'DROPDOWN':
                $("select").each(function(i) {
                    $(this).bind("change", function() {
                        var n = Number($(this).attr("id").split("_")[1])
                        assessment.currentQuestObj.submitAnswers[n] = String($(this).find('option:selected').text());
                        $(this).addClass("selected_activ");
                        assessment.isAllSelected()
                    });
                });
                break;
            case 'DND':
                assessment.initDND1();
                // assessment.setResetState(false);

                break;
            default:
                console.log("CHECK !!!");
        }
        $("#quesSubmit").one("click", assessment.submitQuestion);
    },

    isAllSelected: function() {
        var bool = true;
        $("select").each(function(i) {
            if ($(this).find('option:selected').text() == "Select") {
                bool = false;
            }
        })
        assessment.setSubmitState(bool);
    },

    getCurrentQuest: function() {
        var obj = {};
        if (assessment.isRandom) {
            var tempIndex = getRandomInt(0, assessment.assessmentXMLObj.quesArray.length - 1);
            obj = assessment.assessmentXMLObj.quesArray.splice(tempIndex, 1)[0];
        } else {
            obj = assessment.assessmentXMLObj.quesArray.shift();
        }
        //alert("remaining:::"+assessment.assessmentXMLObj.quesArray.length)
        return obj;
    },

    createMCQ: function(obj) {
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            str += "<div class='optionsBG'><div id='tickCross" + (i + 1) + "' class='tickcross'></div><input type='radio' class='option_radio' id='option" + (i + 1) + "' name='assessmentQuestion' value=" + (i + 1) + " /><label class='option_text' for='option" + (i + 1) + "'>" + obj[i] + "</label></div>";
        }
        return str;
    },

    createMMCQ: function(obj) {
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            str += "<div class='optionsBG'><div id='tickCross" + (i + 1) + "' class='tickcross'></div><input type='checkbox' class='option_radio' id='option" + (i + 1) + "' name='assessmentQuestion' value=" + (i + 1) + " /><label class='option_text' for='option" + (i + 1) + "'>" + obj[i] + "</label></div>";
        }
        return str;
    },

    createMMCQ_OR: function(obj) {
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            str += "<div class='optionsBG'><div id='tickCross" + (i + 1) + "' class='tickcross'></div><input type='checkbox' class='option_radio' id='option" + (i + 1) + "' name='assessmentQuestion' value=" + (i + 1) + " /><label class='option_text' for='option" + (i + 1) + "'>" + obj[i] + "</label></div>";
        }
        return str;
    },

    createDropDown: function(obj) {
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            str += "<div class='optionsBG drop_div'><div id='tickCross" + (i + 1) + "' class='tickcross'></div><div class='option_textDD'>" + obj[i] + "</div><span class='select_wrapper'><select id='item_" + (i) + "' class='dropdown'></select></span></div>";

        }
        return str;
    },
    createDND1: function(obj) {

        //var locObj = assessment.tempQuestionBank.questions.question[parseInt(obj.id-1)];
        var temDrags = obj.options;
        var temDrops = parseInt(obj.DropLength);
        var dragsUID = obj.DropID;
        //alert(temDrags+"  ddd "+temDrops+"  dd "+dragsUID)

        var str = "<div class='dragsC" + dragsUID + "'>";
        for (var i = 0; i < temDrags.length; i++) {
            str += "<div id='drag" + dragsUID + "_" + (i + 1) + "' drop='-1' class='drags" + dragsUID + "'><div class='dragTxt'>" + temDrags[i] + "</div></div>";
        }

        str += "</div><div class='dropsC" + dragsUID + "'>";
        for (var i = 0; i < temDrops; i++) {
            // str += "<div id='drop"+dragsUID+"_"+(i+1)+"' class='drops"+dragsUID+"'>" + assessment.arr_val[i] + "</div>";
            str += "<div id='drop" + dragsUID + "_" + (i + 1) + "' class='drops" + dragsUID + "'><div class='drop_block poos1'></div><div class='drop_block poos2'></div><div class='drop_block poos3'></div><div class='drop_block poos4'></div><div class='drop_block poos5'></div><div class='drop_block poos6'></div><div class='dragTxt'></div></div>";
        }
        
        str += "</div>";
        return str;

    },
    submitQuestion: function() {        
        switch (assessment.currentQuestObj.type) {
            case 'MCQ':
                assessment.submitMCQ();
                break;
            case 'MMCQ':
                assessment.submitMMCQ();
                break;
            case 'MMCQ_OR':
                assessment.submitMMCQ_OR();
                break;
            case 'DROPDOWN':
                assessment.submitDropDown();
                break;
            case 'DND':
                assessment.submitDND();
                break;
            default:
                console.log("CHECK !!!");
        }
        //assessment.handleAssessment();
        assessment.animateFeedback();        
        model.current_active_ques++;
        assessment.varquestionNoCounter++;
        if(model.isBookmarked) {
            controller.updateSaveData();
        }

    },
    closeFeedback: function() {
        TweenMax.to($("#feedback_ques"), model.defaultAnimationDuration, {
            scale: 0,
            opacity: 0,
            ease: Back.easeOut,
            onStart: function() {                
            },
            onComplete: function() {                
            }

        })
        $("#blocker_div, .resultOverlay").fadeOut();
        $("#blocker_div").removeClass("open");
        $(".popup-wrapper").removeClass("newon");

        if(assessment.currentQuestObj.type == "DND" && !assessment.currentQuestObj.isUserCorrect){
            $("#quesSubmit, #reset_btn").hide();
            $("#questionContainer").append('<div class="QHomeScreen button1  hvr-bounce-to-left">Continue</div>');
            assessment.setDNDCorrectAns();
        }
        else{
            assessment.movetoHomePage();
        }

        $("#questionContainer .QHomeScreen").off("click").on("click", function(){
            assessment.movetoHomePage();
        });

    },

    setDNDCorrectAns: function(){
        // $(".main_title").css({"color": "#dbcfe9", "opacity": "1"});

        var qCorrectVal = assessment.currentQuestObj.correctAnswer.toString(10).replace(/\D/g, '0').split('').map(Number);
        $.each(assessment.DndReviewPostion, function(k, v){
            $("#drop1_"+qCorrectVal[k]).css({left: "50%", top: "50%"});
            $("#drop1_"+qCorrectVal[k]).animate({
                left: v.leftValue,
                top: v.topValue,
            });
            $("#drop1_"+qCorrectVal[k]).css("position", "absolute");
            $("#drop1_"+qCorrectVal[k]).find(".dragTxt").html("").html(assessment.currentQuestObj.options[qCorrectVal[k]-1])
        });
        $(".drags1").hide();

    },


    animateincPopup: function() {
        audioController.clearAudio();
        $("#Inc_popup").show();
        $("#feedback_ques").hide();
        $("#Inc_popup").find('.popup_content').html('');
        $("#Inc_popup").find('.popup_content').html(assessment.currentQuestObj.incorrectFeedbackpop);         
       

        $("#Inc_closebtn").one('click', function() {
            $("#Inc_popup").hide();
            $("#feedback_ques").show();
        })

        /* TweenMax.fromTo($("#Inc_popup"), model.defaultAnimationDuration, {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    ease: Back.easeOut,
                    onStart: function() {
                        // $(".popup_result").css("max-height","150px");
                        $("#blocker_div").fadeIn().addClass("open");
                        $("#feedback_ques, .resultOverlay").show();
                        $(".overlay_pop").show();
                      //  $('.trumpCardBox').show();
                    }
                });*/
    },
    animateFeedback: function() {


        TweenMax.fromTo($("#feedback_ques"), model.defaultAnimationDuration, {
            scale: 0,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            ease: Back.easeOut,
            onStart: function() {
                // $(".popup_result").css("max-height","150px");
                $("#blocker_div").fadeIn().addClass("open");
                $("#feedback_ques, .resultOverlay").show();               
                $('.trumpCardBox').show();
                $(".popup-wrapper").addClass("newon");
                if(assessment.currentQuestObj.type == "DND" || assessment.currentQuestObj.isUserCorrect){
                    $(".info_content").hide()
                }
                else{
                    $(".info_content").show()
                }
            }
        });
        var n1 = Number(assessment.currentQuestCount) + 1;
        //audioPath = "";
        $(".info_text").html('');
        $(".info_text").html(assessment.currentQuestObj.infoText);
        // alert(assessment.currentQuestObj.correctAnswer);
        // var getcorrect_ans = assessment.currentQuestObj.correctAnswer;          

        if (assessment.currentQuestObj.isUserCorrect) {
            // temp.push("content/audio/mp3/"+language.userlanguage+"/Assesment/quesfeedcorrect.mp3?Gcube");
            // temp.push("content/audio/mp3/"+language.userlanguage+"/Assesment/quesfeedincorrect.mp3?Gcube");
            audioPath = "content/audio/mp3/"+language.userlanguage+"/Assesment/pre_quesfeedcorrect.mp3";
            //audioPath = "content/audio/mp3/" + language.userlanguage + "/Assesment/quesfeedcorrect.mp3"
                //alert(audioPath)
                //audioPath = assessment.PreAsessentCorAud
            $("#feedback_popup_title").removeClass('incorrect_red').addClass("correct_green");
            $("#feedback_popup_title").html('');
            $("#feedback_popup_title").html('Correct').css('color','#7d0063');
            if (language.userlanguage == 'en') {
                $("#feedback_popup_title").text("Correct");
            } 
            $("#feedback_ques > .newproce > .popupscroll > .popup_content").html('')
            $("#feedback_ques > .newproce > .popupscroll > .popup_content").html(assessment.currentQuestObj.correctFeedback);
            
            audioController.loadAudio(audioPath);
            $('.popup_result > #popNext').show().off('click').on("click", function() {
                audioController.clearAudio();
                 $(".main_title").removeClass("dark_color");
                $(".main_title").addClass("light_color");
                $(".loopuls li").removeClass("active_li");
                $(".loopuls li").eq(model.current_active_ques).addClass("active_li");
                assessment.isPartial = false;
                //assessment.handleAssessment()
                //assessment.movetoHomePage();
                // $('.popup_result').fadeOut()
                assessment.closeFeedback();

                // var tempStr = $("#player_moduleTitle").html();
                // tempStr = tempStr.split(": ")[1];
                // $("#player_moduleTitle").html(" ").html(tempStr);

            });
            $('.popup_result > #popRetry').hide();
        } else {

            audioPath = "content/audio/mp3/" + language.userlanguage + "/Assesment/pre_quesfeedincorrect.mp3"
                //audioPath = assessment.PreAsessentInCorAud
            $("#feedback_popup_title").removeClass('correct_green').addClass("incorrect_red");
            $("#feedback_ques > .newproce > .popupscroll > .popup_content").html('')

            if (assessment.isPartial) {
                $("#feedback_popup_title").html('');
                $("#feedback_popup_title").html('Partially correct')
                if (language.userlanguage == 'en') {
                    $("#feedback_popup_title").text("Partially correct");
                } 
                // alert(assessment.currentQuestObj.partial2Feedback)

                ("#feedback_ques > .newproce > .popupscroll > .popup_content").html(assessment.currentQuestObj.incorrectFeedback);
            } else {

                $("#feedback_popup_title").html('');
                $("#feedback_popup_title").html('Incorrect').css('color','#7d0063');
                if (language.userlanguage == 'en') {
                    $("#feedback_popup_title").text("Incorrect");
                } 
                $("#feedback_ques > .newproce > .popupscroll > .popup_content").html(assessment.currentQuestObj.incorrectFeedback);
            }
            //$("#feedback_ques > .popup_content").html(assessment.currentQuestObj.incorrect2Feedback);
            if(assessment.currentQuestObj.type == "DND"){
                audioPath = "content/audio/mp3/" + language.userlanguage + "/Assesment/pre_quesfeedincorrectDND.mp3"
                audioController.loadAudio(audioPath);
            }
            else{
                audioController.loadAudio(audioPath);
            }
            audioController.loadAudio(audioPath);
            $('.popup_result > #popNext').show().off('click').on("click", function() {
            audioController.clearAudio();       
              $(".main_title").removeClass("dark_color");
                $(".main_title").addClass("light_color");        
                $(".loopuls li").removeClass("active_li");
                $(".loopuls li").eq(model.current_active_ques).addClass("active_li");
                assessment.isPartial = false;
                //assessment.handleAssessment() 

                // if(assessment.currentQuestObj.type != "DND"){
                //     assessment.movetoHomePage();
                // }
                
                assessment.closeFeedback();

            });
            $('.popup_result > #popRetry').hide();

            //alert(assessment.currentQuestObj.currentAttempt)
            //assessment.currentQuestObj.currentAttempt++
            /*if (assessment.currentQuestObj.currentAttempt < 2) {
                $("#feedback_ques > .popup_content").html('')
                if (assessment.isPartial) {
                    $("#feedback_popup_title").html('');
                    $("#feedback_popup_title").html('Partially correct')
                    $("#feedback_ques > .popup_content").html(assessment.currentQuestObj.partial1Feedback);
                } else {
                    $("#feedback_popup_title").html('');
                    $("#feedback_popup_title").html('Incorrect')
                    $("#feedback_ques > .popup_content").html(assessment.currentQuestObj.incorrect1Feedback);

                }
                $('.popup_result > #popNext').hide();
                $('.popup_result > #popRetry').show().off('click').on("click", function() {
                    assessment.isPartial = false;
                    assessment.closeFeedback();
                    $("#questionContainer").html('')
                    $("#questionContainer").html(assessment.currentQuestionString)
                    assessment.currentQuestObj.isUserCorrect = false;
                    assessment.setSubmitState(false);
                    assessment.makeFunctional();

                });
            } else {
                $("#feedback_ques > .popup_content").html('') 

                if (assessment.isPartial) {
                     $("#feedback_popup_title").html('');
                    $("#feedback_popup_title").html('Partially correct')
                    $("#feedback_ques > .popup_content").html(assessment.currentQuestObj.partial2Feedback);
                } else {
                 
                     $("#feedback_popup_title").html('');
                    $("#feedback_popup_title").html('Incorrect')
                    $("#feedback_ques > .popup_content").html(assessment.currentQuestObj.incorrect2Feedback);
                }
                $('.popup_result > #popNext').show().off('click').on("click", function() {
                    assessment.isPartial = false;
                    assessment.handleAssessment()
                    assessment.closeFeedback();
                });
                $('.popup_result > #popRetry').hide();
            }*/
        }
        $(".incIcon").off("click").on("click", function() {
            assessment.animateincPopup();
        })

        // var req = new XMLHttpRequest();
        // req.open('GET', audioPath, true);
        // req.responseType = 'blob';

        // req.onload = function() {            
        //     if (this.status === 200) {                
        //         var audioBlob = this.response;
        //         audioPath = URL.createObjectURL(audioBlob);
        //         audioController.loadAudio(audioPath);
        //     }
        // }
        // req.onerror = function() {}
        // req.send();
        
    },
    submitMCQ: function() {

        var userAnswer = $('input[name=assessmentQuestion]:checked').val();
        assessment.currentQuestObj.userAnswer = userAnswer;
        assessment.currentQuestObj.isUserCorrect = false;
        if (userAnswer == assessment.currentQuestObj.correctAnswer) {
            assessment.currentQuestObj.isUserCorrect = true;
        } 

        $(".tickcross").addClass("tick_wrong");
        $("#tickCross"+assessment.currentQuestObj.correctAnswer).removeClass("tick_wrong");
        $("#tickCross"+assessment.currentQuestObj.correctAnswer).addClass("tick_right");

      

    },

    submitMMCQ: function() {
        var userAnswer = ($('input[name=assessmentQuestion]:checked').map(function() {
            return this.value;
        }).get());
        userAnswer.sort();
        assessment.currentQuestObj.userAnswer = userAnswer;
        assessment.currentQuestObj.isUserCorrect = false;
        assessment.currentQuestObj.correctAnswer = assessment.currentQuestObj.correctAnswer.split(",");
        assessment.currentQuestObj.correctAnswer.sort();
        if (userAnswer.toString() == assessment.currentQuestObj.correctAnswer.toString()) {
            assessment.currentQuestObj.isUserCorrect = true;
        }
        $(".tickcross").addClass("tick_wrong");
        for(var i=0; i<assessment.currentQuestObj.correctAnswer.length; i++){            
            $("#tickCross"+assessment.currentQuestObj.correctAnswer[i]).removeClass("tick_wrong");
            $("#tickCross"+assessment.currentQuestObj.correctAnswer[i]).addClass("tick_right");
        }

    },

    submitMMCQ_OR: function() {
        var userAnswer = ($('input[name=assessmentQuestion]:checked').map(function() {
            return this.value;
        }).get());       
        userAnswer.sort();
        assessment.currentQuestObj.userAnswer = userAnswer;
        assessment.currentQuestObj.isUserCorrect = false;
        assessment.currentQuestObj.correctAnswer = assessment.currentQuestObj.correctAnswer.split(",");
        assessment.currentQuestObj.correctAnswer.sort(); 
        $.each(userAnswer, function(k, v){
            if(jQuery.inArray(v, assessment.currentQuestObj.correctAnswer) != -1) {
                assessment.currentQuestObj.isUserCorrect = true;
            } else {
                assessment.currentQuestObj.isUserCorrect = false;
                return false;
            } 
        });        
    },

    submitDropDown: function() {

        var bool = true;
        for (var i = 0; i < assessment.currentQuestObj.additionalInfo.length; i++) {
            var strT1 = String(assessment.currentQuestObj.submitAnswers[i])
            var strT2 = String(assessment.currentQuestObj.additionalInfo[i].myList.split("^^")[assessment.currentQuestObj.additionalInfo[i].myCorr])

            if (strT1 != strT2) {
                bool = false;
            }
        }
        assessment.currentQuestObj.isUserCorrect = bool;
    },
    submitDND: function() {       
        var ansDND = "";  
        $('.drops1').each(function(i) {            
                var obj = {};
                obj.topValue = $(this).position().top;
                obj.leftValue = $(this).position().left;
                assessment.DndReviewPostion.push(obj);
                assessment.currentQuestObj.submitAnswers.push($(this).attr('child'))
            })  

        for (var j = 0; j < assessment.currentQuestObj.submitAnswers.length; j++) {
            ansDND += assessment.currentQuestObj.submitAnswers[j].split('_')[1];
        }
        assessment.currentQuestObj.userAnswer = ansDND;
        assessment.currentQuestObj.isUserCorrect = false;
        model.assessmentData.push(assessment.currentQuestObj.submitAnswers.join("&*&"));
        if (ansDND.toString() == assessment.currentQuestObj.correctAnswer.toString()) {
            assessment.currentQuestObj.isUserCorrect = true;
        }
        else if (ansDND.toString() == assessment.currentQuestObj.secondCorrectAnswer.toString()) {
            assessment.currentQuestObj.isUserCorrect = true;
        }

        
    },
    showResult: function() {        
        assessment.varquestionNoCounter = 0;
        $(".assessment .page_heading").hide();
        $(".grid").hide();
        controller.showNextBlinker();
        $(".abbotdiv_nw").hide();
        $(".ams1, .ams2, .ams3, .ams4").hide();
        $(".footauto, .navBtnContainer").show();
        // $(".assessment .page_heading").html("Result");
        /*$("#player_reloadPageBtn").css("pointer-events","none");*/
        var temp_arry = [];

        if (model.VarAssesmentData != "") {
            var valueArray = model.VarAssesmentData.split("$$")
            assessment.varAssesmentDataArray = valueArray[0].split("|||");

            for (var i = 0; i < assessment.varAssesmentDataArray.length; i++) {
                assessment.varAssesmentDataArray[i] = JSON.parse(assessment.varAssesmentDataArray[i])
                temp_arry[i] = assessment.varAssesmentDataArray[i]
                    // assessment.shownQuestionArr[i] = JSON.parse(assessment.varAssesmentDataArray[i])
            }
            assessment.totalQuestion = valueArray[1]
            model.currentAttempt = valueArray[2]
        } else {
            for (var i = 0; i < assessment.assessmentXMLObj["quesArray"].length; i++) {
                var obj = {};                
                obj.id = assessment.assessmentXMLObj["quesArray"][i].id;
                obj.isUserCorrect = assessment.assessmentXMLObj["quesArray"][i].isUserCorrect;
                obj.sectiontext = assessment.assessmentXMLObj["quesArray"][i].sectiontext.trim();
                obj.sectiontopic = assessment.assessmentXMLObj["quesArray"][i].sectiontopic.trim();
                obj.secID = assessment.assessmentXMLObj["quesArray"][i].secID.trim()
                temp_arry.push(obj);
            }
        }
        //alert(model.currentAttempt+"  dddd   "+model.VarAssesmentData)
        //model.audioElem.currentTime = model.audioElem.duration
        // model.tl.progress(15)
        /*  setTimeout(function(){
            model.tl.progress(0.99)
          },500)*/

        // $('#progressSlider').attr("aria-disabled", true);
        //audioTimeline.jumpPage(1)
        model.freezButtns = false;
        $('.m1t6p1').css('background', 'none');
        $(".pageBG_rt").hide();
        $(".pageBG_rt").addClass('hide_img');
        $(".pageBG_rt").css('visibility', 'hidden')
            // model.isTranscriptPopup = true;
        //$(".transcriptDilog").show();       
        $("#player_menuBtn,#audioOnOff,#player_reloadPageBtn").removeClass("disableBtnsUi");
        $(".player_container_style").removeClass("noHover");
        var score = 0;
        var finalResult = "";
        if (language.userlanguage == 'en') {
            var str = "<div class='clearfix'></div><div class='tableStyle'><div class='evenDiv'><div class='qNumber'>Question Number</div><div class='quesHead'>Related Topic</div><div class='ansHead'>Your Score</div><ul class='result_table'>";
        } 



        // var str = "<div class='clearfix'></div><div class='tableStyle'><div class='evenDiv'><div class='quesHead'>Topic</div><div class='questopic'>QRG related to</div><div class='ansHead'>Your Score</div><ul class='result_table'>";





        for (var i = 0; i < temp_arry.length; i++) {
            //var obj = {};
            // obj.id = temp_arry[i].id;
            //obj.isUserCorrect = temp_arry[i].isUserCorrect;
            //obj.quesText = temp_arry[i].quesText.trim();
            // obj.type = temp_arry[i].type;
            // obj.userAnswer = temp_arry[i].userAnswer;
            if (i % assessment.resultPerCol == 0 && i != 0) {
              if (language.userlanguage == 'en') {
                    str += "</div></div><div class='tableStyle'><div><div><div class='quesHead'>Question No.</div><div class='ansHead'>Your Score</div></div> <ul class='result_table'>";
                } 
            }
            //console.log(,"temp_arry")
            if (temp_arry[i].isUserCorrect) {
                //score++;
                assessment.correctDoneIdArr.push(temp_arry[i].id);
            }
            var temp = (temp_arry[i].isUserCorrect == true) ? "tick" : "cross";
            str += "<li><div class='cQNumber'>"+(i+1)+"</div><div class='quesContent'>" + temp_arry[i].sectiontext + "</div><div class='ansTick'><div id='tickCross" + i + "' class='tickCross " + temp + "'></div></div></li>";
            assessment.varAssesmentDataArray[i] = JSON.stringify(temp_arry[i]);
        }        

        model.VarAssesmentData = assessment.varAssesmentDataArray.join("|||");
        //$('.debbugger_popup').find(".content_debugger").append("<p>Assesment Data Set in Assesment2:"+model.VarAssesmentData+"</p><br>")

        str += "</ul></div></div>";


        for (var i = 0; i < temp_arry.length; i++) {
            if (temp_arry[i].isUserCorrect) {
                score++;
                // assessment.correctDoneIdArr.push(assessment.shownQuestionArr[i].id);
            }
        }

        if(score == model.current_active_ques){
            $("#RetryAssessment_btn").hide();
        }
        else{
            $("#RetryAssessment_btn").show();
        }

        //var lmsScaledPassingScore = 80;
        //var lmsScaledScore = score / temp_arry.length;

        $(".tableStyle").remove()

        controlsHandeler.setState("nextBtn", false);
        controlsHandeler.setState("backBtn", false);
        $(".scoreCardContainer").after(str);
        $("#transcript_Overlay").hide();

        //var status = doLMSGetValue("cmi.core.lesson_status");
        //var lmsScore = parseInt(GetStudentScore());
        var scorePercent = Math.floor((score / temp_arry.length) * 100);

        if (scorePercent == assessment.passingMarks) {            
                // $(".tickCross").css("cursor", "pointer").on("click", assessment.showUserAttempt);
            model.assessmentResult = true;
            $(".prePass").show();
            $(".preFail").hide();
            $(".preFailAll").hide();
            audioController.playTabAudio(1);
            //console.log("prePass >><<");
        } else if (scorePercent < assessment.passingMarks && scorePercent != 0){
            $(".tickCross").addClass("fix-color")
            model.assessmentResult = false;
            $(".prePass").hide();
            $(".preFail").show();
            $(".preFailAll").hide();
            audioController.playTabAudio(2);
            //console.log("preFail >><<");
        } else {
            $(".tickCross").addClass("fix-color")
            model.assessmentResult = false;
            $(".prePass").hide();
            $(".preFail").hide();
            $(".preFailAll").show();
            audioController.playTabAudio(3);
            //console.log("preFailAll >><<");
        }

        /* if (lmsScore < scorePercent || isNaN(lmsScore)) {
             ReportScore(scorePercent, 100, 0);
         };*/

        $(".scoreMain").show();
        $(".questionCountMain").hide();
        if (language.userlanguage == 'en') {
            var resultpercText80 = "<b>Scoreboard</b>";
            resultpercText80 += "You answered " + score + " out of " + assessment.totalQuestion + " questions correctly.";
        } 

        // var resultpercText80 = "You answered " + score + " out of " + assessment.totalQuestion + " questions correctly.";
        $(".feedback_mainText").text("").append(resultpercText80);
        /* $("#RetryAssessment_btn").show();
         $("#retakeassessment").show();
         $("#Restart_btn").show();*/

        //$("#transcript_Overlay").removeClass("transcript_Overlay");

        /*var isRetry = "</br></br>Click <b>Retry</b> to reattempt the assessment";

        var resultpercText80 = "You answered " + score + " out of " + assessment.totalQuestion + " questions correctly and attained " + scorePercent + "%.</br> Congratulations! You have passed the test.";


        var resultTextFirstThreeAttempt = "You answered " + score + " out of " + assessment.totalQuestion + " questions correctly and attained " + scorePercent + "%. </br>Sorry, you could not pass the test. It is recommended that you review the module and retake the assessment test.";

        var resultTextFourthAttemp = "You answered " + score + " out of " + assessment.totalQuestion + " questions correctly and attained " + scorePercent + "%.</br> Sorry, you could not pass the test. You have one final attempt to retake the assessment. It is recommended that you review the course first and then retake the assessment test. ";

        var resultTextFifthAttemp = "You answered " + score + " out of " + assessment.totalQuestion + " questions correctly and attained " + scorePercent + "%.</br> Sorry, you could not pass the test. ";

        var resulttrasFail = "You have reached the end of the assessment. Here is a summary of your results.";

        $(".transcriptDilog").html(resulttrasFail);*/

        /* var status = doLMSGetValue("cmi.core.lesson_status");
       
         var lastUserScore = parseInt(GetStudentScore());
         var tempScore = scorePercent;
         if (lastUserScore != "" && !isNaN(lastUserScore)) {
             if (tempScore < lastUserScore) {
                 tempScore = lastUserScore;
             }
         }

         ReportScore(lmsScaledPassingScore, lmsScaledScore, tempScore, 100, 0);*/
        $("#RetryAssessment_btn").on("click", function() {
            model.current_active_ques = 0;
            assessment.varquestionNoCounter = 0;
            assessment.DndReviewPostion = [];
            assessment.DragTopPos = 0,
                model.currentAttempt++;
            model.VarAssesmentData = "";
            // $('.debbugger_popup').find(".content_debugger").append("<p>Assesment Data Set in Assesment3:"+model.VarAssesmentData+"</p><br>")

            controller.updateSaveData();
            model.varNavigationBtnClicked = "normal";
            controller.updateView();

            // assessment.ResetDND1();

        })


        //$(".feedback_mainText").html('');
        /*if (scorePercent >= assessment.passingMarks) {
            
            $("#scoreCardContainer").show();
            $(".pageBG_rt").hide();
            $(".pageBG_rt").addClass('hide_img');
            $(".pageBG_rt").css('visibility','hidden')
           
            controlsHandeler.setState("nextBtn", true);
           
            $("#player_nextBtn").removeClass("hideCursor");
            $("#player_nextBtn").removeClass("player_nextBtnDisabled_style");
            model.assessmentVisited = true;
            controller.showNextBlinker();
            
            $('#player_nextBtn').removeClass('hideCursor');
        
            SetSuccessStatus("passed");
            doLMSCommit();
            SetLessonStatus("completed");
            doLMSCommit();


            $("#RetryAssessment_btn").show();
            
            $("#Restart_btn").show();
            $("#text-instruction").hide();
        } else {

            SetLessonStatus("failed");
            doLMSCommit();

            if (model.currentAttempt < 3 && scorePercent <= assessment.passingMarks) {
                $("#scoreCardContainer").show();
                $("#RetryAssessment_btn").show();
                $("#Restart_btn").show();

            } else if (model.currentAttempt == 3 && scorePercent <= assessment.passingMarks) {
                $("#scoreCardContainer").show();
                $("#RetryAssessment_btn").show();
                $("#Restart_btn").show();
            } else if (model.currentAttempt == 4 && scorePercent <= assessment.passingMarks) {
                $("#scoreCardContainer").show();
                $("#RetryAssessment_btn").hide();
                controlsHandeler.setState("backBtn", true);
                $("#player_nextBtn").removeClass("hideCursor");
                $("#player_nextBtn").removeClass("player_nextBtnDisabled_style");
                controller.showNextBlinker();
                $("#retakeassessment").hide();
            }



        }*/
        audioController.unmuteAssessmentAudio();
        /*if (assessment.mode == assessment.ATTEMPT) {
            audioController.playTabAudio(1);
        }*/
        /*controller.pageDone();*/
        // alert("dsad")
        $("#questionContainer").hide();        
        $(".tabcontainer, .contenerBox").hide();
        //$(".assessment .page_heading").html("Result");
        $("#scoreCardContainer").show();
        $('.noteSection').hide();
        $("#scoreCardContainer .score").html(scorePercent);
        if ($("#audioOnOff").hasClass("audioOFF")) {
            audioController.muteAudio();
        }
        //alert(model.currentAttempt)
        
        model.VarAssesmentData = model.VarAssesmentData + "$$" + assessment.totalQuestion + "$$" + model.currentAttempt

        controller.updateSaveData();
        $(".contenerBox").hide();
        //audioController.playTabAudio(1);
        $('.playerCenterBtns .abbot').hide().removeClass("showAbbot"); 
        $(".transcriptDilog").show();
    },

    showUserAttempt: function(e) {
        assessment.mode = assessment.REVIEW;
        assessment.currentQuestCount = $(e.currentTarget).attr('id').substr(9);
        $("#scoreCardContainer").hide();
        $("#questionContainer").show();
        assessment.handleAssessment();
        $(".pageBG_rt").show();
        $(".pageBG_rt").removeClass('hide_img');
        $(".pageBG_rt").css('visibility', 'visible')
    },



    doReviewBack: function() {
        assessment.currentQuestCount -= 2;
        assessment.handleAssessment();
    },

    doReviewNext: function() {
        assessment.handleAssessment();
    },

    setReviewNextBackState: function() {
        if (assessment.currentQuestCount <= 1) {
            $("#quesBack").prop("disabled", true);
        } else {
            $("#quesBack").prop("disabled", false);
        }

        if (assessment.currentQuestCount >= assessment.totalQuestion) {
            $("#quesNext").prop("disabled", true);
        } else {
            $("#quesNext").prop("disabled", false);
        }
    },

    setSubmitState: function(bo) {
        audioController.clearAudio();
        if (bo) {
            $("#quesSubmit").prop("disabled", false);
            // $("#quesSubmit").css("background", "#0094d4");
            $(".abbotdiv").hide();
            $("#quesSubmit").css('cursor', 'pointer');
        } else {
            $("#quesSubmit").prop("disabled", true);
            $(".abbotdiv").show();
            // $("#quesSubmit").css("background", "#ccc");
            $("#quesSubmit").css('cursor', 'no-drop');
        }
    },

    doRestartAssessment: function() {
        $(".pageBG_rt").show();
        $(".pageBG_rt").removeClass('hide_img');
        $(".pageBG_rt").css('visibility', 'visible')
        assessment.currentAttempt++;
        assessment.currentQuestCount = 0;
        assessment.currentQuestObj = {};
        assessment.shownQuestionArr = [];
        assessment.mode = assessment.ATTEMPT;
        $("#sbmt_btn").one("click", assessment.doStartAssessment);
        $("#introScreen").show();
        $(".tab").show();
        $(".tabcontainer").show();

        $("#questionContainer").hide();
        $("#scoreCardContainer").hide();
    },

    unload: function() {
        assessment.assessmentXMLObj = {};
        assessment.currentQuestCount = 0;
        assessment.correctDoneIdArr = [];
        $("#sbmt_btn").off("click", assessment.doStartAssessment);
    },

    openToolkit:function(){  
          var clickedSectionText = $(this).get(0).currentQuestObj.toolkitText;  
            controlsHandeler.glossaryBtnClicked();
            $( ".clickaccord" ).each(function( index ) {
         if($(this).attr('tool-value') == clickedSectionText ){        
            $(".sowaccord").slideUp('slow');  
            $(this).addClass('rsdone');  
            $(this).toggleClass("addcls").siblings().removeClass("addcls");
            $(this).parent(".myaccording").siblings().children(".addcls").toggleClass("addcls");
            $(this).next(".sowaccord").slideToggle('slow').siblings(".sowaccord").slideUp('slow');
            $(this).parent(".myaccsording").siblings().children(".sowaccord").slideUp('slow');           
           }         
        });
    },
}