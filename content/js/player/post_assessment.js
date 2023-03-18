var postAssessment = {
    assessmentXMLObj: {},
    isRandom: false,
    totalAttempts: 0,
    // currentAttempt: 1,
    currentQuestCount: 0,
    totalQuestion: 0,
    currentQuestObj: {},
    shownQuestionArr: [],
    resultPerCol: 20,
    ATTEMPT: 10,
    REVIEW: 20,
    mode: -1,
    passingMarks: 80,
    correctDoneIdArr: [],
    varAssesmentDataArray:[],
    DragCPos: {},
    DragNDropCAns: [],
    arr_val: {0: "3 rd",1: "2 nd",2: "1 st"},
    DndReviewPostion:[],
    

    init: function() {
         
   //$("#player_reloadPageBtn").css("pointer-events","auto");      
        postAssessment.DndReviewPostion = [];   
        postAssessment.assessmentXMLObj = {};
        postAssessment.currentQuestCount = 0;
        postAssessment.currentQuestObj = {};
        //postAssessment.shownQuestionArr = [];
        //postAssessment.correctDoneIdArr = [];
        postAssessment.mode = postAssessment.ATTEMPT;
        // postAssessment.currentAttempt = 1;             

        $("#sbmt_btn").one("click", postAssessment.doStartAssessment);
        
        

        // $("#sbmt_btn").one("click", postAssessment.showResult2);
        // $(".tab").trigger("click");

        // $("#sbmt_btn").one("click", postAssessment.showResult2);
        // $(".tab").trigger("click");
    },

    doStartAssessment: function() {
        // $("#questionContainer").removeClass("coverhover");
        $(".questionsoverlayy").hide();
        $(".pageBG_rt").hide();
        $('#pageVideot6p1').hide();
        model.inAssesment = true;
        $(".transcriptBtn").removeClass('activeTranscript');
        model.freezButtns = true;
        $("#player_menuBtn,#player_glossaryBtn, #audioOnOff,#player_transcriptDilogBtn,#player_reloadPageBtn").addClass("disableBtnsUi");
        $('#progressSlider').addClass('disableSlider');

        $(".desablearea").show();
         $('#progressOverlay').show().addClass('stop');
        $(".desablearea.des8, .desablearea.des9").hide();


        model.isTranscriptPopup = false;
        $(".transcriptDilog").hide();
        $(".player_container_style").addClass("noHover");

        model.loadXML('content/xml/'+language.userlanguage+'/post_assessment.xml', postAssessment.parseXML);        

        $("#introScreen").hide();
        $("#questionContainer").show();
        // $(".playerCenterBtns").append("<div class='transcript_Overlay' id='transcript_Overlay'></div>");
        $(".tab").hide();
        audioController.clearAudio();
        controlsHandeler.setState("backBtn", false);

        $(".assessment .tabcontainer").show();
        $(".footer, .navBtnContainer").show();
        $(".main_title").css("color","#e9c5cb");
        $(".m1t6p2").addClass("ass_start");
        $("#transcript_Overlay").show();
        $("#transcript_Container").hide();
        
        //$(".pageBG_rt").show();
        $(".pageBG_rt.pageBG_rt2").hide();

    },

    parseXML: function(xml) {
        var tempXML = $(xml);
        postAssessment.isRandom = tempXML.find("isRandom").attr("val") == "true" ? true : false;
        postAssessment.totalAttempts = parseInt(tempXML.find("attempts").attr("val"));
        postAssessment.totalQuestion = parseInt(tempXML.find("totalQuestion").attr("val"));

        if (postAssessment.totalAttempts < 1) {
            postAssessment.totalAttempts = 1;
        }

        var tempQuestion = tempXML.find("question");
        var tempQuesLen = tempQuestion.length;
        postAssessment.assessmentXMLObj.quesArray = [];

        for (var i = 0; i < tempQuesLen; i++) {
            var tempObj = {};
            var temp = tempQuestion.eq(i);

            tempObj.type = temp.attr('type');
            tempObj.correctAnswer = temp.attr('correctAnswer');
            tempObj.quesText = temp.find("quesText").eq(0).text();
            tempObj.iText = temp.find("iText").eq(0).text();
            tempObj.infoText = temp.find("infoText").eq(0).text();
            tempObj.options = [];
            tempObj.additionalInfo = [];
            tempObj.submitAnswers = [];


            var tempOptions = temp.find("option");
            var optionLen = tempOptions.length;
            for (var j = 0; j < optionLen; j++) {
                tempObj.options.push(tempOptions.eq(j).text());
                if (tempObj.type == "DROPDOWN") {
                    var myListItems = String(tempOptions.eq(j).attr("items"));
                    var myCorrect = Number(tempOptions.eq(j).attr("correct"));
                    var myType = Number(tempOptions.eq(j).attr("type"));


                    var objT = { myList: myListItems, myCorr: myCorrect, myType: myType }

                    tempObj.additionalInfo.push(objT);
                }
                 if(tempObj.type == "DND")
                {   
                    //alert(temp.attr('DropType'))
                    tempObj.DropLength = temp.attr('DropLength')
                    tempObj.DropID = temp.attr('DropID')
                    //var myListItems = String(tempOptions.eq(j).attr("items"));
                    //var myCorrect = Number(tempOptions.eq(j).attr("correct"));

                   // var objT = {myList:myListItems, myCorr:myCorrect}

                    //tempObj.additionalInfo.push(objT);
                }
            }

            var tempFeedback = temp.find("feedback");
            tempObj.correctFeedback = tempFeedback.find("correctFeedback").eq(0).text();
            tempObj.incorrectFeedback = tempFeedback.find("incorrectFeedback").eq(0).text();
            tempObj.incorrectFeedbackpop = tempFeedback.find("incorrectFeedbackpop").eq(0).text();

            postAssessment.assessmentXMLObj.quesArray.push(tempObj);
        }

        if (postAssessment.totalQuestion > postAssessment.assessmentXMLObj.quesArray.length) {
            //debuggerController.logError("not enough questions in pool");
            console.error("not enough questions in pool");
        } else {
            if (postAssessment.totalQuestion < 1) {
                postAssessment.totalQuestion = postAssessment.assessmentXMLObj.quesArray.length;
            }
            postAssessment.handleAssessment();
        }
    },

    handleAssessment: function() {
        $("#questionContainer").html('');
        //console.log(postAssessment.currentQuestCount + "::" + postAssessment.totalQuestion);
        if (Number(postAssessment.currentQuestCount) < Number(postAssessment.totalQuestion)) {
            postAssessment.currentQuestCount++;
            postAssessment.createQuestion();
        } else {
            postAssessment.showResult();

        }
    },

    handleAssessmentView: function() {
        //$("#questionContainer").html('');
        //console.log(postAssessment.currentQuestCount + "::" + postAssessment.totalQuestion);
        if (Number(postAssessment.currentQuestCount) < Number(postAssessment.totalQuestion)) {
            postAssessment.currentQuestCount++;
            postAssessment.createQuestion();
        } else {
            postAssessment.showResult();

        }
    },

    createQuestion: function() {
        //console.log("here i am", postAssessment.mode);
        if (postAssessment.mode == postAssessment.ATTEMPT) {
            postAssessment.currentQuestObj = postAssessment.getCurrentQuest();
            postAssessment.shownQuestionArr.push(postAssessment.currentQuestObj);
        } else {
            postAssessment.currentQuestObj = postAssessment.shownQuestionArr[postAssessment.currentQuestCount - 1];
        }
        var temp;

        switch (postAssessment.currentQuestObj.type) {
            case 'MCQ':
                $(".pageBG_rt1").show()
                temp = postAssessment.createMCQ(postAssessment.currentQuestObj.options);
                $("#questionContainer").removeClass("dnd_cont");
                break;
            case 'MMCQ':
                $(".pageBG_rt1").show()
                temp = postAssessment.createMMCQ(postAssessment.currentQuestObj.options);
                $("#questionContainer").removeClass("dnd_cont");
                break;
            case 'DROPDOWN':
                $(".pageBG_rt1").show()
                temp = postAssessment.createDropDown(postAssessment.currentQuestObj.options);
                $("#questionContainer").removeClass("dnd_cont");
                $(".dropdown").css("cursor", "pointer");
                $(".select_wrapper").css("pointer-events", "auto");
                break;
            case 'DND':
                temp = postAssessment.createDND1(postAssessment.currentQuestObj);
                $("#questionContainer").addClass("dnd_cont");
                $('.pageBG_rt1').hide();
                tempClass='DND1_C';
            break;
            default:
                console.log("CHECK !!!");
                break;
        }
        /*var str = "<div>" + postAssessment.currentQuestObj.quesText + "</div><div><em style='color:#BC141A;'>" + postAssessment.currentQuestObj.iText + "</em></div><div id='optionContainer'>" + temp + "</div>";*/
         $(".assessment .page_heading").html("");
      // if(model.VarPostAssesmentData == ""){
          var strQuestion = "Question <b>" + postAssessment.currentQuestCount + "</b> of <b>" + postAssessment.totalQuestion+"</b>";
           $(".assessment .page_heading").append(strQuestion);
       /* }else{
             var strQuestion = "Result";
           $(".assessment .page_heading").append(strQuestion);
       }*/


        var str = "<div class='quesHeading'>" + postAssessment.currentQuestObj.quesText + "</div><div class='emd'><em>" + postAssessment.currentQuestObj.iText + "</em></div><div id='optionContainer'>" + temp + "</div><div class='sideimg'></div>";

        $("#questionContainer").append(str);

        $(".info_text").html('');
        $(".info_text").html(postAssessment.currentQuestObj.infoText);

        if (postAssessment.currentQuestObj.type == "DROPDOWN") {
            var nLen = postAssessment.currentQuestObj.additionalInfo.length;
            for (var t = 0; t < nLen; t++) {
                var strT = postAssessment.currentQuestObj.additionalInfo[t].myList;
                var optT = postAssessment.currentQuestObj.additionalInfo[t].myType;
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
       /* if(postAssessment.currentQuestObj.type == "DND"){
            //alert("fsfsdf");
            // var str = "<div class='qs_title'>" + postAssessment.currentQuestObj.quesText +" "+(MCQ.currentQuestCount+1+ " of 15") + "</div><div class='questionContainer2'><div class='questionStem'>" + MCQ.currentQuestObj.quesText + "</div><div id='optionContainer'><div class='hotspotOpt_"+MCQ.currentQuestObj.id+"'>" + temp + "</div></div></div>";
             var str = "<div >" + postAssessment.currentQuestObj.quesText + "</div><div><div class='itext_dnd'>" + postAssessment.currentQuestObj.iText + "</div></div><div id='optionContainerFourth'>" + temp + "</div>";

              $("#questionContainer").append(str); 
        }*/
        //console.log("postAssessment.mode",postAssessment.mode)

    //     if (postAssessment.mode == postAssessment.ATTEMPT) {
    //         str = "<button id='quesSubmit' class='button1'><span>Submit</span></button>";
    //         $("#questionContainer").append(str);
    //         postAssessment.setSubmitState(false);
    //         postAssessment.makeFunctional();
    //     } else {
    //         str = "<button id='quesBack' class='playerSubmitBtn gradient_theme' style='margin-top: 2%;'>Back</button>";
    //         str += "<button id='quesNext' class='playerSubmitBtn gradient_theme' style='margin-top: 2%; margin-left: 2%;'>Next</button>";
    //         str += "<button id='quesScoreCard' class='playerSubmitBtn gradient_theme' style='margin-top: 2%; margin-left: 2%;'>Scorecard</button>";

    //         //console.log("str",str)

    //         $("#questionContainer").append(str);
    //         postAssessment.reviewQuestion();
    //         $("#quesScoreCard").one("click", postAssessment.showResult);
    //         $("#quesBack").one("click", postAssessment.doReviewBack);
    //         $("#quesNext").one("click", postAssessment.doReviewNext);
    //         postAssessment.setReviewNextBackState();

    //         $(".tabcontainer").show();
    //     }
    // },
        
        if (postAssessment.mode == postAssessment.ATTEMPT) {
            if(postAssessment.currentQuestObj.type == "DND"){
                if(postAssessment.currentQuestObj.hint != undefined && postAssessment.currentQuestObj.hint != ""){
                        str += "<div id='quesHintButton' class='hintButton'></div>";
                        $('#hintText').html("");
                        $('#hintText').html(postAssessment.currentQuestObj.hint);
                 }
            }
            str = "<div class='botbtn'><button id='quesSubmit' class='button1 continue_btn3 hvr-bounce-to-left'>Submit</button> <div class='nodrop aque'></div> <button id='quesReset' class='button1'>Reset</button></div>";
            $("#questionContainer").append(str);
            $("#quesReset").hide();
            postAssessment.setSubmitState(false);
            postAssessment.makeFunctional();
        } else {
            str = "<button id='quesBack' class='clickButton startButton hvr-bounce-to-left' style='margin-top: 2%;'>Back</button>";
            str += "<button id='quesNext' class='clickButton startButton hvr-bounce-to-left' style='margin-top: 2%; margin-left: 2%;'>Next</button>";
            str += "<button id='quesScoreCard' class='clickButton startButton hvr-bounce-to-left' style='margin-top: 2%; margin-left: 2%;'>Scorecard</button>";
            str += "<div class='bk_nodrop'></div><div class='nx_nodrop'></div>";
        // if(postAssessment.currentQuestObj.type == "DND"){
        //     if(postAssessment.currentQuestObj.userAnswer != postAssessment.currentQuestObj.correctAnswer){
        //     var userAnswer = postAssessment.currentQuestObj.userAnswer.split("");
        //     var correctAnswer = postAssessment.currentQuestObj.correctAnswer.split("");
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
            
            postAssessment.reviewQuestion();
            $("#quesScoreCard").one("click", postAssessment.showResult);
            $("#quesBack").one("click", postAssessment.doReviewBack);
            $("#quesNext").on("click", postAssessment.doReviewNext);
            // $("#approveBtn").on("click", postAssessment.markQuestionCorrect);
            // $("#disApproveBtn").on("click", postAssessment.markQuestionIncorrect);
            // $("#feedbackBtn").on("click", postAssessment.showFeedbackBox);
            //$("#quesNext").addClass("blink_me")
            

            // if (postAssessment.currentQuestCount > 1) {
            //     $("#quesBack").show();
            // }else{
            //     $("#quesBack").hide();
            // }

            

            // if(model.assessmentCorrectData[postAssessment.currentQuestObj.sequenceNumber-1] == "1"){
            //     $(".checkIcon").addClass("buttonSelected");  
            //     $(".crossIcon").removeClass("buttonSelected");
            // }else if(model.assessmentCorrectData[postAssessment.currentQuestObj.sequenceNumber-1] == "2"){
            //     $(".checkIcon").removeClass("buttonSelected"); 
            //     $(".crossIcon").addClass("buttonSelected");
            // }else if(model.assessmentCorrectData[postAssessment.currentQuestObj.sequenceNumber-1] == "0"){
            //     $(".checkIcon").removeClass("buttonSelected");     
            //     $(".crossIcon").removeClass("buttonSelected");                
            // }


            postAssessment.setReviewNextBackState();

            $(".tabcontainer").show();
            $(".footer, .navBtnContainer").show();
            $(".main_title").css("color","#e9c5cb");
            $(".m1t6p2").addClass("ass_start");

            
        }
    },

     ResetDND1 : function(){
        var locObj = postAssessment.currentQuestObj;
        var dragsUID = locObj.DropID;
         postAssessment.setSubmitState(false);
          postAssessment.setResetState(false);
       $.each(postAssessment.DragCPos,function(k,v){
         $("#"+k).animate({left: v.left,top:v.top});
        $("#"+k).draggable('enable').attr('drop','-1').removeClass("droped"+dragsUID);
        $("#"+k).removeClass('hideBgcolor');
         $("#"+k).draggable({ revert: true } );
           // $(this).droppable( "option", "disabled", true );
       })
       postAssessment.DragNDropCPos=[];
       postAssessment.DragNDropCAns=[];
        $(".drops"+dragsUID).droppable('enable');
        $(".drops"+dragsUID).each(function(i){

            $('#drop1_' + (i+1)).find('.droptitle1').text((3 - i) + ' rd');
        })
        postAssessment.DragTopPos=0;
        },
    setResetState: function(bo) {
        if (bo) {
            $("#quesReset").prop("disabled", false);
            $("#quesReset").removeClass("disabled");
            //$(".reset_itext").fadeIn();
            $(".aque2").hide();

        } else {
            $("#quesReset").prop("disabled", true);
            $("#quesReset").addClass("disabled");
            $(".aque2").show();
           // $(".reset_itext").hide();
        }
    },
    initDND1:function(){
        //alert("drag_item");
        var locObj = postAssessment.currentQuestObj;
        var dragsUID = locObj.DropID;
        postAssessment.DragNDropCAns=[];
        
        //alert(dragsUID);
         $(".drags"+dragsUID).draggable({
            revert: true,
             drag: function(event, ui) {
                  if(controller.contentScale<1){
                   /*  var changeLeft = ui.position.left - ui.originalPosition.left;
                    var newLeft = ui.originalPosition.left + changeLeft / (( controller.contentScale));  
                    var changeTop = ui.position.top - ui.originalPosition.top; 
                    var newTop = ui.originalPosition.top + changeTop / controller.contentScale; 
                        ui.position.left = newLeft;
                       ui.position.top = newTop;*/
                  }
                   
                       
                        //$(this).attr("initTop", ui.position.top).attr("initLeft",  ui.position.left);

             },
             start: function() {
                $(this).css({"z-index": 999999999});
              },
              stop: function() {
                $(this).css({"z-index":99});
              },
            containment: ".player_content #pageDiv"});
        // $("#reset_btn").on("click", postAssessment.ResetDND1);
       // alert($(".drops"+dragsUID).length)
        $(".drops"+dragsUID).droppable({ drop:postAssessment.DropFun});
        $("#quesReset").show().off("click").on("click", postAssessment.ResetDND1);
         //$('#reset_btn').show();
         // $("#reset_btn").on("click", postAssessment.ResetDND1);
        var dragLength = $(".dragsC"+dragsUID+ " .drags"+dragsUID).length; 
        for (var i = 0; i < dragLength; i++) {
            var GetDragLeft = $("#drag"+dragsUID+"_"+(i+1)).css('left');
            var GetDropTop = $("#drag"+dragsUID+"_"+(i+1)).css('top');
            if (GetDragLeft == 'auto') {
                GetDragLeft='0px';
            };
            if (GetDropTop == 'auto') {
                GetDropTop='0px';
            };
            var d = "drag"+dragsUID+"_"+(i+1);
            postAssessment.DragCPos[d] = {"left":GetDragLeft,"top":GetDropTop};
            //alert(d)
        };
        //alert(postAssessment.DragCPos)

    },
    DropFun:function(e,ui){
         
       var locObj = postAssessment.currentQuestObj;
        var dragsUID = locObj.DropID;
       // alert(dragsUID)
        $(".drops"+dragsUID).each(function(i){
          if($(this).attr('child') == ui.draggable.attr('id')){
            $(this).attr("child","")
             $(this).droppable( "option", "disabled", false );
             $('#drop1_' + (i+1)).find('.droptitle1').text((3 - i) + ' rd');
            
          }
       })
        $(this).attr("child",ui.draggable.attr('id'))
        var DragId = ui.draggable.attr("id");
        console.log(DragId)
        var DropId = $(this).attr("id");
        var locObj = postAssessment.currentQuestObj;
        var dragsUID = locObj.DropID;
        ui.draggable.attr("drop",DropId);
         postAssessment.setResetState(true);
        ui.draggable.draggable({ revert: false } );

        ui.draggable.position({of: $(this),my: "center center",at: "center center"});
        postAssessment.makeDrop($(this), ui.draggable)
        //var t = $(this).offset().top;
       // var l = $(this).offset().left;
         //alert(t+" dd "+l)
       // ui.draggable.offset().top = t;
       // ui.draggable.offset().left = l
        $(this).find('.droptitle1').text('');
        ui.draggable.addClass("hideBgcolor")
        ui.draggable.addClass('droped'+dragsUID);
        ui.draggable.draggable('disable');
        $(this).droppable( "option", "disabled", true );
        postAssessment.DragNDropCAns.push(DragId);
        if(postAssessment.DragNDropCAns.length == locObj.options.length){
            postAssessment.setSubmitState(true);
        }
    },
    makeDrop: function(obj1, obj2){
     

       
        obj2.position({of: obj1,my: "center center",at: "center center"});

    },
    makeFunctional: function() {
        switch (postAssessment.currentQuestObj.type) {
            case 'MCQ':
                $('input').on('change', function() {
                    postAssessment.setSubmitState(true);
                });
                break;
            case 'MMCQ':
                var tempArr = [];
                $('input').on('change', function() {
                    tempArr = ($('input[name=assessmentQuestion]:checked').map(function() {
                        return this.value;
                    }).get());
                    if (tempArr.length > 0) {
                        postAssessment.setSubmitState(true);
                    } else {
                        postAssessment.setSubmitState(false);
                    }
                });
                break;
            case 'DROPDOWN':
                $("select").each(function(i) {
                    $(this).bind("change", function() {
                        var n = Number($(this).attr("id").split("_")[1])
                        postAssessment.currentQuestObj.submitAnswers[n] = String($(this).find('option:selected').text());
                         $(this).addClass("selected_activ");
                        postAssessment.isAllSelected()
                    });
                });
                break;
            case 'DND':
                   postAssessment.initDND1();
                   // postAssessment.setResetState(false);

                break;                
            default:
                console.log("CHECK !!!");
        }
        $("#quesSubmit").one("click", postAssessment.submitQuestion);
    },
    isAllSelected: function() {
        var bool = true;
        $("select").each(function(i) {
            if ($(this).find('option:selected').text() == "Select") {
                bool = false;
            }
        })
        postAssessment.setSubmitState(bool);
    },

    getCurrentQuest: function() {
        var obj = {};
        if (postAssessment.isRandom) {
            var tempIndex = getRandomInt(0, postAssessment.assessmentXMLObj.quesArray.length - 1);
            obj = postAssessment.assessmentXMLObj.quesArray.splice(tempIndex, 1)[0];
        } else {
            obj = postAssessment.assessmentXMLObj.quesArray.shift();
        }
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
    createDropDown: function(obj) {
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            str += "<div class='optionsBG drop_div'><div id='tickCross" + (i + 1) + "' class='tickcross'></div><div class='option_textDD'>" + obj[i] + "</div><span class='select_wrapper'><select id='item_" + (i) + "' class='dropdown'></select></span></div>";

        }
        return str;
    },
    createDND1: function(obj) {
        //var locObj = postAssessment.tempQuestionBank.questions.question[parseInt(obj.id-1)];
        var temDrags = obj.options;
        var temDrops = parseInt(obj.DropLength);
        var dragsUID = obj.DropID;
        //alert(temDrags+"  ddd "+temDrops+"  dd "+dragsUID)
      
        var str = "<div class='dragsC"+dragsUID+"'>";
        for (var i = 0; i < temDrags.length; i++) {
            str += "<div id='drag"+dragsUID+"_"+(i+1)+"' drop='-1' class='drags"+dragsUID+"'>" + temDrags[i] + "</div>";
        }

        str += "</div><div class='dropsC"+dragsUID+"'>";
         for (var i = 0; i < temDrops; i++) {
                    str += "<div id='drop"+dragsUID+"_"+(i+1)+"' class='drops"+dragsUID+"'><div class='droptitle"+dragsUID+"'>" + postAssessment.arr_val[i] +"</div> </div>";
                }
        str += "</div>";
        return str;
         
    },
    submitQuestion: function() {
        switch (postAssessment.currentQuestObj.type) {
            case 'MCQ':
                postAssessment.submitMCQ();
                break;
            case 'MMCQ':
                postAssessment.submitMMCQ();
                break;
            case 'DROPDOWN':
                postAssessment.submitDropDown();
                break;
             case 'DND':
                postAssessment.submitDND();
                break;                
            default:
                console.log("CHECK !!!");
        }
        // postAssessment.handleAssessment();
        postAssessment.animateFeedback();     
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
        });

        $("#blocker_div, .resultOverlay").fadeOut();
        $("#blocker_div").removeClass("open");
        $(".popup-wrapper").removeClass("newon");

         
    },

    animateincPopup: function() {
        audioController.clearAudio();
        $("#Inc_popup").show();
        $("#feedback_ques").hide();
        $("#Inc_popup").find('.popup_content').html('');
        $("#Inc_popup").find('.popup_content').html(postAssessment.currentQuestObj.incorrectFeedbackpop);
 

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
                 if(postAssessment.currentQuestObj.isUserCorrect){
                    $(".info_content").hide()
                }
                else{
                    $(".info_content").show()
                }
                 
            }
        });
        var n1 = Number(postAssessment.currentQuestCount) + 1;
        //audioPath = "";
        // $(".info_text").html('');
        // $(".info_text").html(postAssessment.currentQuestObj.infoText);
        // alert(postAssessment.currentQuestObj.correctAnswer);
        // var getcorrect_ans = postAssessment.currentQuestObj.correctAnswer;  
        

        if (postAssessment.currentQuestObj.isUserCorrect) {
            // temp.push("content/audio/mp3/"+language.userlanguage+"/Assesment/quesfeedcorrect.mp3?Gcube");
            // temp.push("content/audio/mp3/"+language.userlanguage+"/Assesment/quesfeedincorrect.mp3?Gcube");
            audioPath = "content/audio/mp3/"+language.userlanguage+"/Assesment/quesfeedcorrect.mp3";
            // audioPath = "content/audio/mp3/" + language.userlanguage + "/Assesment/quesfeedcorrect.mp3"
            //     alert(audioPath)
            //     audioPath = postAssessment.PreAsessentCorAud
            $("#feedback_popup_title").removeClass('incorrect_red').addClass("correct_green");
            $("#feedback_popup_title").html('');
            $("#feedback_popup_title").html('Correct').css('color','#7d0063');
            if (language.userlanguage == 'en') {
                $("#feedback_popup_title").text("Correct");
            } 
            $("#feedback_ques > .newproce > .popupscroll > .popup_content").html('')
            $("#feedback_ques > .newproce > .popupscroll > .popup_content").html(postAssessment.currentQuestObj.correctFeedback);
            audioController.loadAudio(audioPath);
            $('.popup_result > #popNext_post').show().off('click').on("click", function() {
                audioController.clearAudio();
                 $(".main_title").removeClass("dark_color");
                $(".main_title").addClass("light_color");
                $(".loopuls li").removeClass("active_li");
                $(".loopuls li").eq(model.current_active_ques).addClass("active_li");
                postAssessment.isPartial = false;
                postAssessment.handleAssessment();
                //postAssessment.movetoHomePage();
                // $('.popup_result').fadeOut()
                postAssessment.closeFeedback();

                // var tempStr = $("#player_moduleTitle").html();
                // tempStr = tempStr.split(": ")[1];
                // $("#player_moduleTitle").html(" ").html(tempStr);

            });
            $('.popup_result > #popRetry').hide();
        } else { 
            audioPath = "content/audio/mp3/" + language.userlanguage + "/Assesment/quesfeedincorrect.mp3"
                //audioPath = postAssessment.PreAsessentInCorAud
            $("#feedback_popup_title").removeClass('correct_green').addClass("incorrect_red");
            $("#feedback_ques > .newproce > .popupscroll > .popup_content").html('')

            if (postAssessment.isPartial) {
                $("#feedback_popup_title").html('');
                $("#feedback_popup_title").html('Partially correct')
                if (language.userlanguage == 'en') {
                    $("#feedback_popup_title").text("Partially correct");
                } 
                // alert(postAssessment.currentQuestObj.partial2Feedback)

                ("#feedback_ques > .newproce > .popupscroll > .popup_content").html(postAssessment.currentQuestObj.incorrectFeedback);
            } else {

                $("#feedback_popup_title").html('');
                $("#feedback_popup_title").html('Incorrect').css('color','#7d0063');
                if (language.userlanguage == 'en') {
                    $("#feedback_popup_title").text("Incorrect");
                } 
                $("#feedback_ques > .newproce > .popupscroll > .popup_content").html(postAssessment.currentQuestObj.incorrectFeedback);
            }
            audioController.loadAudio(audioPath);
            //$("#feedback_ques > .popup_content").html(postAssessment.currentQuestObj.incorrect2Feedback);
            $('.popup_result > #popNext_post').show().off('click').on("click", function() {  
            audioController.clearAudio();     
              $(".main_title").removeClass("dark_color");
                $(".main_title").addClass("light_color");
               
                
                postAssessment.isPartial = false;
                postAssessment.handleAssessment() 

                // if(postAssessment.currentQuestObj.type != "DND"){
                //     postAssessment.movetoHomePage();
                // }
                
                postAssessment.closeFeedback();

            });
            $('.popup_result > #popRetry').hide();

            //alert(postAssessment.currentQuestObj.currentAttempt)
            //postAssessment.currentQuestObj.currentAttempt++
            /*if (postAssessment.currentQuestObj.currentAttempt < 2) {
                $("#feedback_ques > .popup_content").html('')
                if (postAssessment.isPartial) {
                    $("#feedback_popup_title").html('');
                    $("#feedback_popup_title").html('Partially correct')
                    $("#feedback_ques > .popup_content").html(postAssessment.currentQuestObj.partial1Feedback);
                } else {
                    $("#feedback_popup_title").html('');
                    $("#feedback_popup_title").html('Incorrect')
                    $("#feedback_ques > .popup_content").html(postAssessment.currentQuestObj.incorrect1Feedback);

                }
                $('.popup_result > #popNext_post').hide();
                $('.popup_result > #popRetry').show().off('click').on("click", function() {
                    postAssessment.isPartial = false;
                    postAssessment.closeFeedback();
                    $("#questionContainer").html('')
                    $("#questionContainer").html(postAssessment.currentQuestionString)
                    postAssessment.currentQuestObj.isUserCorrect = false;
                    postAssessment.setSubmitState(false);
                    postAssessment.makeFunctional();

                });
            } else {
                $("#feedback_ques > .popup_content").html('') 

                if (postAssessment.isPartial) {
                     $("#feedback_popup_title").html('');
                    $("#feedback_popup_title").html('Partially correct')
                    $("#feedback_ques > .popup_content").html(postAssessment.currentQuestObj.partial2Feedback);
                } else {
                 
                     $("#feedback_popup_title").html('');
                    $("#feedback_popup_title").html('Incorrect')
                    $("#feedback_ques > .popup_content").html(postAssessment.currentQuestObj.incorrect2Feedback);
                }
                $('.popup_result > #popNext_post').show().off('click').on("click", function() {
                    postAssessment.isPartial = false;
                    postAssessment.handleAssessment()
                    postAssessment.closeFeedback();
                });
                $('.popup_result > #popRetry').hide();
            }*/
        }
        $(".incIcon").off("click").on("click", function() {
            postAssessment.animateincPopup();
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
        postAssessment.currentQuestObj.userAnswer = userAnswer;
        postAssessment.currentQuestObj.isUserCorrect = false;
        if (userAnswer == postAssessment.currentQuestObj.correctAnswer) {
            postAssessment.currentQuestObj.isUserCorrect = true;
        }

        $(".tickcross").addClass("tick_wrong");
        $("#tickCross"+postAssessment.currentQuestObj.correctAnswer).removeClass("tick_wrong");
        $("#tickCross"+postAssessment.currentQuestObj.correctAnswer).addClass("tick_right");
    },

    submitMMCQ: function() {
        var userAnswer = ($('input[name=assessmentQuestion]:checked').map(function() {
            return this.value;
        }).get());
        userAnswer.sort();
        postAssessment.currentQuestObj.userAnswer = userAnswer;
        postAssessment.currentQuestObj.isUserCorrect = false;
        postAssessment.currentQuestObj.correctAnswer = postAssessment.currentQuestObj.correctAnswer.split(",");
        postAssessment.currentQuestObj.correctAnswer.sort();
        if (userAnswer.toString() == postAssessment.currentQuestObj.correctAnswer.toString()) {
            postAssessment.currentQuestObj.isUserCorrect = true;
        }
        $(".tickcross").addClass("tick_wrong");
        for(var i=0; i<postAssessment.currentQuestObj.correctAnswer.length; i++){            
            $("#tickCross"+postAssessment.currentQuestObj.correctAnswer[i]).removeClass("tick_wrong");
            $("#tickCross"+postAssessment.currentQuestObj.correctAnswer[i]).addClass("tick_right");
        }
    },

    submitDropDown: function() {
        var bool = true;
        for (var i = 0; i < postAssessment.currentQuestObj.additionalInfo.length; i++) {
            var strT1 = String(postAssessment.currentQuestObj.submitAnswers[i])
            var strT2 = String(postAssessment.currentQuestObj.additionalInfo[i].myList.split("^^")[postAssessment.currentQuestObj.additionalInfo[i].myCorr])

            if (strT1 != strT2) {
                bool = false;
            }
        }
        postAssessment.currentQuestObj.isUserCorrect = bool;
    },
     submitDND:function()
    {
        //var bool = true;
        var ansDND = "";

        /*for(var i = 0; i < postAssessment.currentQuestObj.options.length; i++)
        {

           
        
        }*/

        $('.drags1').each(function(i){
            //alert($(this).attr('drop'))
            var obj = {};
            obj.topValue = $(this).position().top;
            obj.leftValue = $(this).position().left;
            postAssessment.DndReviewPostion.push(obj);
            postAssessment.currentQuestObj.submitAnswers.push($(this).attr('drop'))
            
        })
       // alert(postAssessment.currentQuestObj.submitAnswers)
       for(var j=0; j< postAssessment.currentQuestObj.submitAnswers.length ; j++){
        ansDND += postAssessment.currentQuestObj.submitAnswers[j].split('_')[1];
       }
       postAssessment.currentQuestObj.userAnswer = ansDND;
        postAssessment.currentQuestObj.isUserCorrect = false;
        model.postAssessmentData.push(postAssessment.currentQuestObj.submitAnswers.join("&*&"));
        if (ansDND.toString() == postAssessment.currentQuestObj.correctAnswer.toString()) {
            postAssessment.currentQuestObj.isUserCorrect = true;
        }

        //postAssessment.currentQuestObj.isUserCorrect = bool;
    },
    showResult: function() {
        $(".assessment .page_heading").html("Result");
        $("#ReviewAssessment_btn").hide();
        model.freezButtns = false;
        $('.m1t6p1').css('background', 'none');
        $(".pageBG_rt1").hide();
        // model.isTranscriptPopup = true;
        $(".transcriptDilog").show();
        $(".transcriptDilog").html("");
        $('#player_moduleTitle').html("Result");
        $("#player_menuBtn, #player_glossaryBtn, #audioOnOff,#player_transcriptDilogBtn,#player_reloadPageBtn").removeClass("disableBtnsUi");
        $('#progressSlider').removeClass('disableSlider');
        $(".desablearea").hide();
        $('#progressOverlay').show().addClass('stop');
        $(".backabot").hide();

        $(".player_container_style").removeClass("noHover");       

        var score = 0;
        
        var finalResult = "";
        
        var str = "<div class='clearfix'></div><div class='tableStyle'><div class='evenDiv'><div class='quesHead'>Question</div><div class='ansHead'>Your Response</div><ul class='result_table'>";
        for (var i = 0; i < postAssessment.shownQuestionArr.length; i++) {
             //var obj = {};
            // obj.id = postAssessment.shownQuestionArr[i].id;
             //obj.isUserCorrect = postAssessment.shownQuestionArr[i].isUserCorrect;
             //obj.quesText = postAssessment.shownQuestionArr[i].quesText.trim();
            // obj.type = postAssessment.shownQuestionArr[i].type;
            // obj.userAnswer = postAssessment.shownQuestionArr[i].userAnswer;
            if (i % postAssessment.resultPerCol == 0 && i != 0) {
                str += "</div></div><div class='tableStyle'><div><div><div class='quesHead'>Question No.</div><div class='ansHead'>Your Response</div></div> <ul class='result_table'>";
            }
            //console.log(,"postAssessment.shownQuestionArr")
            if (postAssessment.shownQuestionArr[i].isUserCorrect) {
                //score++;
                postAssessment.correctDoneIdArr.push(postAssessment.shownQuestionArr[i].id);
            }
            var temp = (postAssessment.shownQuestionArr[i].isUserCorrect == true) ? "tick" : "cross";
            str += "<li><div class='quesContent'>" + postAssessment.shownQuestionArr[i].quesText + "</div><div class='ansTick'><div id='tickCross" + i + "' class='tickCross " + temp + "'></div></div></li>";
            //postAssessment.VarPostAssesmentDataArray[i] =  JSON.stringify(postAssessment.shownQuestionArr[i])

        }

        //model.VarPostAssesmentData = postAssessment.VarPostAssesmentDataArray.join("|||")
        str += "</ul></div></div>";
        

        //alert('My Scope -- '+ postAssessment.shownQuestionArr.length);

        for (var i = 0; i < postAssessment.shownQuestionArr.length; i++) {
            if (postAssessment.shownQuestionArr[i].isUserCorrect) {
                score++;
                //console.log("score - " + score);
                // postAssessment.correctDoneIdArr.push(postAssessment.shownQuestionArr[i].id);
            }
        }
       // console.log("Current Attempt"+model.currentAttempt);
         var lmsScaledPassingScore = 80;
        var lmsScaledScore = score/postAssessment.shownQuestionArr.length;
        $(".tableStyle").remove()

        $(".scoreCardContainer").after(str);
        $("#transcript_Overlay").hide();

        var status = doLMSGetValue("cmi.core.lesson_status");
        var lmsScore = parseInt(GetStudentScore());
        var scorePercent = Math.floor((score / postAssessment.shownQuestionArr.length) * 100);

        $("#ReviewAssessment_btn").css("cursor", "pointer").on("click", postAssessment.showUserAttempt);

        $(".scoreMain").show();
        $(".questionCountMain").hide();

        $("#RetryAssessment_btn").show();
        $("#retakeassessment").show();
        $("#Restart_btn").show();

        //$("#transcript_Overlay").removeClass("transcript_Overlay");

        var isRetry = "</br></br>Click <b>Retry</b> to reattempt the assessment";

        //alert(model.currentAttempt + "" +postAssessment.totalAttempts);

      /*  if(model.currentAttempt >= postAssessment.totalAttempts){
            $("#RetryAssessment_btn").hide();
        }*/

        // var resultpercText80 = "You answered " + score + " out of " + postAssessment.totalQuestion + " questions correctly and attained " + scorePercent + "%.</br> Congratulations! You have passed the test.";


        // var resultTextFirstThreeAttempt = "You answered " + score + " out of " + postAssessment.totalQuestion + " questions correctly and attained " + scorePercent + "%. </br>Sorry, you could not pass the test. It is recommended that you re-review the module and retake the assessment test.";

        // var resultTextFourthAttemp = "You answered " + score + " out of " + postAssessment.totalQuestion + " questions correctly and attained " + scorePercent + "%.</br> Sorry, you could not pass the test. You have one final attempt to retake the postAssessment. It is recommended that you review the course first and then retake the assessment test. ";

        // var resultTextFifthAttemp = "You answered " + score + " out of " + postAssessment.totalQuestion + " questions correctly and attained " + scorePercent + "%.</br> Sorry, you could not pass the test. ";

        // // var resulttrasPass = "You have reached the end of the postAssessment. Here is a summary of your results.";
        // var resulttrasFail = "You have reached the end of the postAssessment. Here is a summary of your results.";


        var resultpercText80 = "<italic>Congratulations! You have scored " + scorePercent + "% in the assessment and passed this course.</italic><div class='flex_table'><flexsection><div>Correct answer</div><div>" + score + "</div></flexsection><flexsection><div>Total questions</div><div>"+ postAssessment.totalQuestion +"</div></flexsection><flexsection><div>Percentage</div><div>"+ scorePercent +"%</div></flexsection></div>";


        var resultTextFirstThreeAttempt = "<italic>Sorry! You have scored " + scorePercent + "%, which is less than what is required to pass the test and complete the course.</italic><br><br><italic><i>Click <b>Retake Assessment</b> to attempt again.</i></italic><div class='flex_table'><flexsection><div>Correct answer</div><div>" + score + "</div></flexsection><flexsection><div>Total questions</div><div>"+ postAssessment.totalQuestion +"</div></flexsection><flexsection><div>Percentage</div><div>"+ scorePercent +"%</div></flexsection></div>";

        var resultTextFourthAttemp = "<italic>Sorry! You have scored " + scorePercent + "%, which is less than what is required to pass the test and complete the course. As this was your third attempt, it is recommended that you take the course again.</italic><br><br><italic><i>Click <b>Revisit course</b> to begin the course.</i></italic><div class='flex_table'><flexsection><div>Correct answer</div><div>" + score + "</div></flexsection><flexsection><div>Total questions</div><div>"+ postAssessment.totalQuestion +"</div></flexsection><flexsection><div>Percentage</div><div>"+ scorePercent +"%</div></flexsection></div>";

        var resultTextFifthAttemp = "<italic>Sorry! You have scored " + scorePercent + "%, which is less than what is required to pass the test and complete the course. As this was your third attempt, it is recommended that you take the course again.</italic><br><br><italic><i>Click <b>Revisit course</b> to begin the course.</i></italic><div class='flex_table'><flexsection><div>Correct answer</div><div>" + score + "</div></flexsection><flexsection><div>Total questions</div><div>"+ postAssessment.totalQuestion +"</div></flexsection><flexsection><div>Percentage</div><div>"+ scorePercent +"%</div></flexsection></div>";

        // var resulttrasPass = "You have reached the end of the postAssessment. Here is a summary of your results.";
        var resulttrasFail = "You have reached the end of the postAssessment. Here is a summary of your results.";

        $(".transcriptDilog").html(resulttrasFail);

        //var title = "Result";
      //  $('#player_moduleTitle').html(title);

        var status = doLMSGetValue("cmi.core.lesson_status");
        /*var lmsScore = parseInt(GetStudentScore());

        if (lmsScore < scorePercent || isNaN(lmsScore)) {
            ReportScore(scorePercent, 100, 0);
        };*/

         var lastUserScore = parseInt(GetStudentScore());
        var tempScore = scorePercent;
       // alert("lastUserScore" + "   " + lastUserScore + "   " + GetStudentScore());
        if(lastUserScore != "" && !isNaN(lastUserScore)) {
            if(tempScore < lastUserScore) {
                tempScore = lastUserScore;
            }
        }

        ReportScore(lmsScaledPassingScore,lmsScaledScore,tempScore,100,0);

        if(scorePercent >= postAssessment.passingMarks){
            SetSuccessStatus("passed");
            doLMSCommit();
            SetLessonStatus("completed");
            doLMSCommit();
        }

        $("#RetryAssessment_btn").on("click", function() {
             postAssessment.DndReviewPostion = [];
             postAssessment.shownQuestionArr= [];
            model.currentAttempt++;
            model.VarPostAssesmentData = ""
            controller.updateView();
            controller.updateSaveData();
            model.varNavigationBtnClicked = "normal";
             $("#player_reloadPageBtn").css("display","none"); 
             $("#play_pause").css("display","block");

        })


        
        //$("#ReviewAssessment_btn").off("click").on("click", postAssessment.showUserAttempt);

       /* $("#RetryAssessment_btn").on("click", function() {
             postAssessment.DndReviewPostion = [];
            model.currentAttempt++;
            model.VarPostAssesmentData = ""
            controller.updateView();
            controller.updateSaveData();
            model.varNavigationBtnClicked = "normal";
             $("#player_reloadPageBtn").css("display","none"); 
             $("#play_pause").css("display","block");

        });*/


        $("#Restart_btn").on("click", function() {
            model.current_active_ques = 0;
            postAssessment.DndReviewPostion = [];
            postAssessment.shownQuestionArr= [];
            model.currentAttempt = 1;
            model.VarPostAssesmentData = "";
            $(".footer, .navBtnContainer").show();
            model.showPage(1, 1, 1);
            model.varNavigationBtnClicked = "normal";
            // model.currentAttempt = 0;

            // $("#transcript_Overlay").show();
            $(".assessment .page_heading").show();
            $(".feedback_mainText").html("")


            $(this).unbind("click");

            $(".feedback_mainText").text("");
            // For showing the menu
            $('.before_bg_accordion').show();
            $('.accordion_menu_btn').show();
            $('.before_bg_accordion_btm_1').show();
            $('.transcript_bottom_box').show();

            $("#player_transcriptDilogBtn_con, #player_reloadPageBtn_con, #player_backBtn_con, #player_menuBtn").css("pointer-events", "auto");
            $(".icon_notes, .icon_replay, span.men").removeClass("disabled");
        })
        if (scorePercent >= postAssessment.passingMarks) {
            $("#ReviewAssessment_btn").css("display","inline-block");
            $("#scoreCardContainer, .thankyouWrapper").show();
            $(".footer, .navBtnContainer").hide();
            $(".m1t6p2").addClass("show_result");
            $(".pageBG_rt").hide();
            $(".feedback_mainText").text("").append(resultpercText80);
            audioPath = "content/audio/mp3/"+language.userlanguage+"/Assesment/resultCongratulationsAudio.mp3";
            audioController.loadAudio(audioPath);
             controlsHandeler.setState("nextBtn", true);
            $("#player_nextBtn").removeClass("hideCursor");
            $("#player_nextBtn").removeClass("additional_class");
            $("#player_nextBtn").addClass("player_nextBtnDisabled_style");
            $('#player_nextBtn').addClass('hideCursor');
            model.postAssessmentVisited = true;
             model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].status = 2;
             model.updatePageDone();
            $("#RetryAssessment_btn").hide();
            $("#ExitAssessment_btn").addClass('startButton');
            $(".nextabot").show();
            $("#Restart_btn").hide();
            $("#text-instruction").hide();
            // $('.backBtn').removeClass('player_backBtnDisabled_style');
        } else {
            $("#ReviewAssessment_btn").hide();
             SetLessonStatus("failed");
             doLMSCommit();

            $("#ExitAssessment_btn").removeClass('startButton');
            if (model.currentAttempt < 3 && scorePercent <= postAssessment.passingMarks) {              
                $("#scoreCardContainer, .thankyouWrapper").show();
                $(".footer, .navBtnContainer").hide();
                $(".m1t6p2").addClass("show_result");
                $(".feedback_mainText").append(resultTextFirstThreeAttempt);
                audioPath = "content/audio/mp3/"+language.userlanguage+"/Assesment/resultFirstThreeAttemptAudio.mp3";
                audioController.loadAudio(audioPath);
                $("#RetryAssessment_btn").show().addClass('startButton');
                $("#Restart_btn").show();

            } else if (model.currentAttempt == 3 && scorePercent <= postAssessment.passingMarks) {
                $(".feedback_mainText").append(resultTextFourthAttemp);
                audioPath = "content/audio/mp3/"+language.userlanguage+"/Assesment/resultFourthAttempAudio.mp3";
                audioController.loadAudio(audioPath);
                $("#scoreCardContainer, .thankyouWrapper").show();
                $(".footer, .navBtnContainer").hide();
                $(".m1t6p2").addClass("show_result");
                $("#Restart_btn").show().addClass('startButton');
                $("#Restart_btn").show();
                $("#RetryAssessment_btn").hide();
                // audioController.playTabAudio(1);
                // $(".transcriptDilog").html(resulttrasFail); 
            } else if (model.currentAttempt >= 4 && scorePercent <= postAssessment.passingMarks) {
                $(".feedback_mainText").append(resultTextFifthAttemp);
                audioPath = "content/audio/mp3/"+language.userlanguage+"/Assesment/resultFifthAttempAudio.mp3";
                audioController.loadAudio(audioPath);
                $("#scoreCardContainer, .thankyouWrapper").show();
                $(".footer, .navBtnContainer").hide();
                $(".m1t6p2").addClass("show_result");
                $("#Restart_btn").show().addClass('startButton');
                controlsHandeler.setState("backBtn", true);
                 $("#player_nextBtn").removeClass("hideCursor");
                $("#player_nextBtn").removeClass("additional_class");
                 $("#player_nextBtn").removeClass("player_nextBtnDisabled_style");
                 //controller.showNextBlinker();
                $("#retakeassessment").hide();
                // $("#RetryAssessment_btn").show();
               // $("#Restart_btn").hide();
                // audioController.playTabAudio(1);
                // $(".transcriptDilog").html(resulttrasFail); 
            }        
           
            if(model.isBookmarked) {
                controller.updateSaveData();
            } 

        }
        audioController.unmuteAssessmentAudio();
      if(postAssessment.mode == postAssessment.ATTEMPT){
            //audioController.playTabAudio(1);
        }
        /*controller.pageDone();*/
        $("#questionContainer").hide();
        $(".tabcontainer").hide();
        $(".main_title").css("color","#7d0063");
        $(".m1t6p2").removeClass("ass_start");
        $(".assessment .page_heading").html("Result");
        $("#scoreCardContainer, .thankyouWrapper").show();
        $(".footer, .navBtnContainer").hide();
        $(".m1t6p2").addClass("show_result");
        $("#scoreCardContainer .score").html(scorePercent);
        if ($("#audioOnOff").hasClass("audioOFF")) {
            audioController.muteAudio();
        }
        // alert(model.currentAttempt)
        //model.VarPostAssesmentData = model.VarPostAssesmentData+"$$"+postAssessment.totalQuestion+"$$"+model.currentAttempt

        //controller.updateSaveData();

        $("#ExitAssessment_btn").off("click").on("click", function(){
            window.top.close();
        });
        
    },

    showUserAttempt: function(e) {
        //alert()
        postAssessment.mode = postAssessment.REVIEW;
        postAssessment.currentQuestCount = 0;
        $("#scoreCardContainer, .thankyouWrapper").hide();
        $(".footer, .navBtnContainer").show();
        $(".m1t6p2").removeClass("show_result");
        $("#questionContainer").show();
        $(".pageBG_rt").show();
        postAssessment.handleAssessment();
         $('#progressOverlay').show().addClass('stop');
       // postAssessment.handleAssessmentView();
    },

    reviewQuestion: function() {
        // audioController.clearPopAudio();
        //alert("1")
        // $("#questionContainer").addClass("coverhover");
        $(".questionsoverlayy").show();
        $(".tabcontainer").show();
        $(".footer, .navBtnContainer").show();
        $(".main_title").css("color","#e9c5cb");
        $(".m1t6p2").addClass("ass_start");
        audioController.clearAudio();
        $(".feedback_mainText").html("");
        switch (postAssessment.currentQuestObj.type) {
            case 'MCQ':
                $('input[name=assessmentQuestion]').attr("disabled", true);
                $('input[name=assessmentQuestion][value=' + postAssessment.currentQuestObj.userAnswer + ']').prop('checked', true);
                console.log($("#tickCross" + postAssessment.currentQuestObj.userAnswer).length);
                if (postAssessment.currentQuestObj.userAnswer == postAssessment.currentQuestObj.correctAnswer) {
                    $("#tickCross" + postAssessment.currentQuestObj.userAnswer).addClass("tick").css("visibility", "visible");
                } else {
                    $("#tickCross" + postAssessment.currentQuestObj.userAnswer).addClass("cross").css("visibility", "visible");
                    $("#tickCross" + postAssessment.currentQuestObj.correctAnswer).addClass("tick").css("visibility", "visible");
                }
                break;
            case 'MMCQ':
                $('input[name=assessmentQuestion]').attr("disabled", true);
                for (var i = 0; i < postAssessment.currentQuestObj.userAnswer.length; i++) {
                    $('input[name=assessmentQuestion][value=' + postAssessment.currentQuestObj.userAnswer[i] + ']').prop('checked', true);
                    if (postAssessment.currentQuestObj.correctAnswer.indexOf(postAssessment.currentQuestObj.userAnswer[i]) == -1) {
                        $("#tickCross" + postAssessment.currentQuestObj.userAnswer[i]).addClass("cross").css("visibility", "visible");
                    }
                }

                for (i = 0; i < postAssessment.currentQuestObj.correctAnswer.length; i++) {
                    $("#tickCross" + postAssessment.currentQuestObj.correctAnswer[i]).addClass("tick").css("visibility", "visible");
                }
                break;
            case 'DROPDOWN':
                for (var i = 0; i < postAssessment.currentQuestObj.submitAnswers.length; i++) {
                   $(".dropdown").css("cursor", "default");
                    $(".select_wrapper").css("pointer-events", "none");
                   
                    $('.dropdown').prop("disabled", true);
                   $('#item_'+i).find("option").each(function(){
                      if(String($(this).text()) == postAssessment.currentQuestObj.submitAnswers[i]){
                        $('#item_'+i).val($(this).val())
                      }


                   
                   })
                  var strT1 = String(postAssessment.currentQuestObj.submitAnswers[i])
                  var strT2 = String(postAssessment.currentQuestObj.additionalInfo[i].myList.split("^^")[postAssessment.currentQuestObj.additionalInfo[i].myCorr])
                  if(strT1 != strT2){
                    $("#tickCross" +(i+1)).addClass("cross").css("visibility", "visible");
                  }else{
                     $("#tickCross" + (i+1)).addClass("tick").css("visibility", "visible");
                  }

                
                }
                
                $('.dropdown').prop("disabled", true);
                break;
            case 'DND':
           // alert("kkkk")
            //$('input[name=assessmentQuestion]').attr("disabled", true);
            //alert(postAssessment.currentQuestObj.submitAnswers)
           // alert(postAssessment.currentQuestObj.submitAnswers)
           //alert(postAssessment.currentQuestObj.correctAnswer)
           var arr = postAssessment.currentQuestObj.correctAnswer.split('');
           var numArray = [2, 1, 3];
            $(".drags1").each(function(i) {
                $(this).prepend('<div class=stap_tab>'+numArray[i]+'</div>')
                $(this).css("cursor","default");
                $(this).css("position","absolute");
                $(this).addClass("hideBgcolor");
                $('.dropsC1').find('.droptitle1').text('');

                //var obj = $('#'+postAssessment.currentQuestObj.submitAnswers[i])
                //alert(obj.offset().top)
                //alert(controller.contentScale)
                /*if(controller.contentScale < 1){
                            $(this).offset({
                        top: obj.offset().top*controller.contentScale,
                        left: obj.offset().left*controller.contentScale
                      })
                }else{
                         $(this).offset({
                    top: obj.offset().top,
                    left: obj.offset().left
                  })
                }*/

                 /*$(this).offset({
                    top: postAssessment.DndReviewPostion[i].topValue,
                    left: postAssessment.DndReviewPostion[i].leftValue
                  })
               */
                var currID = $(this).attr("id");
               if(controller.contentScale<1){
                


               document.getElementById(currID).style.top = (postAssessment.DndReviewPostion[i].topValue/controller.contentScale) + "px";
               document.getElementById(currID).style.left = (postAssessment.DndReviewPostion[i].leftValue/controller.contentScale) + "px";
           }else{
              document.getElementById(currID).style.top = (postAssessment.DndReviewPostion[i].topValue) + "px";
               document.getElementById(currID).style.left = (postAssessment.DndReviewPostion[i].leftValue) + "px";
           }
              
             
              /* $(this).find('option').each(function(){
                    //alert($(this).text()+" dd "+postAssessment.currentQuestObj.submitAnswers[i])
                  if($(this).text() == postAssessment.currentQuestObj.submitAnswers[i]) {
                    $(this).attr('selected', 'selected');            
                  }    
               })*/
                                           
            });
                //$("#enteredText").append(postAssessment.currentQuestObj.submitAnswers);
                //$("#enteredText").attr("disabled", true);
                break;                
            default:
                console.log("CHECK !!!");
        }
    },

    doReviewBack: function() {
        postAssessment.currentQuestCount -= 2;
        postAssessment.handleAssessment();
    },

    doReviewNext: function() {
        postAssessment.handleAssessment();
    },

    setReviewNextBackState: function() {
        if (postAssessment.currentQuestCount <= 1) {
            $("#quesBack").prop("disabled", true);
            $(".bk_nodrop").show();
        } else {
            $("#quesBack").prop("disabled", false);
            $(".bk_nodrop").hide();
        }

        if (postAssessment.currentQuestCount >= postAssessment.totalQuestion) {
            $("#quesNext").prop("disabled", true);
            $(".nx_nodrop").show();
        } else {
            $("#quesNext").prop("disabled", false);
            $(".nx_nodrop").hide();
        }
    },

    setSubmitState: function(bo) {
        if (bo) {
            // $("#quesSubmit").prop("disabled", false);
            $(".aque").hide();

            // $("#quesSubmit").css("background", "#0094d4");
            $("#quesSubmit").css('cursor', 'pointer');
            $("#quesSubmit").css('pointer-events', 'auto');

        } else {
            // $("#quesSubmit").prop("disabled", true);
            // $("#quesSubmit").css("background", "#ccc");
            $(".aque").show();
            $("#quesSubmit").css('cursor', 'default');
            $("#quesSubmit").css('pointer-events', 'none');
        }
    },

    doRestartAssessment: function() {
        $(".pageBG_rt").hide();
        // postAssessment.currentAttempt++;
        postAssessment.currentQuestCount = 0;
        postAssessment.currentQuestObj = {};
        postAssessment.shownQuestionArr = [];
        postAssessment.mode = postAssessment.ATTEMPT;
        $("#sbmt_btn").one("click", postAssessment.doStartAssessment);
        $("#introScreen").show();
        $(".tab").show();        
        $(".tabcontainer").show();
        $(".footer, .navBtnContainer").show();
        $(".main_title").css("color","#e9c5cb");
        $(".m1t6p2").addClass("ass_start");

        $("#questionContainer").hide();
        $("#scoreCardContainer, .thankyouWrapper").hide();
        $(".footer, .navBtnContainer").show();
        $(".m1t6p2").removeClass("show_result");
    },

    unload: function() {
        postAssessment.assessmentXMLObj = {};
        postAssessment.currentQuestCount = 0;
        postAssessment.correctDoneIdArr = [];
        $("#sbmt_btn").off("click", postAssessment.doStartAssessment);
    }
}
