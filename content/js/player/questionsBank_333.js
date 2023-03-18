var question = {
    /*all variables start here*/
    SAMC: "SAMC",
    MAMC: "MAMC",
    questionType: "",
    optionType: "",
    userAnswer: -1,
    correctAnswer: "",
    isUserCorrect: false,
    attempts: 0,
    partialCorrect: false,
    incorrect: false,

    init: function() {
        question.isUserCorrect = false;
        question.correctAnswer = $(".player_content #pageDiv").attr("ans");
        question.attempts = parseInt($(".player_content #pageDiv").attr("attempts"));

        if ($(".player_content #pageDiv").attr("pageType") == question.SAMC) {
            question.questionType = question.SAMC;
            question.optionType = "radio";
        } else if ($(".player_content #pageDiv").attr("pageType") == question.MAMC) {
            question.questionType = question.MAMC;
            question.correctAnswer = question.correctAnswer.split(",");
            question.correctAnswer.sort();
            question.optionType = "checkbox";
        } else {
            console.log("invalid type, check page");
            return;
        }

        question.createQuestion();
        question.adjustinputHeight();
        question.makeFunctional();
        question.enableDisableAll(false);
    },

    createQuestion: function() {
        $(".option").each(function(i) {
            // var tempStr = "<span class='tick'></span><div class='input_box'><input id=option" + (i + 1) + " type=" + question.optionType + " name='cyu' value=" + (i + 1) + " /><label for=option" + (i + 1) + ">&#160;</label></div>";
            var tempStr = "<span class='tick'></span><input id=option" + (i + 1) + " type=" + question.optionType + " name='cyu' value=" + (i + 1) + " />";
            $(this).prepend(tempStr);
        });
    },

    adjustinputHeight: function() {
        console.log($(".option").css("min-height"));
        $(".option").each(function(i) {
            if ($(this).height() > parseInt($(".option").css("min-height"))) {
                // $(this).find(".input_box").css("height", $(this).height()+"px");
                $(this).find("label").css("padding-top", "0px");
            }
        });
    },

    makeFunctional: function() {
        switch (question.questionType) {
            case question.SAMC:
                $('input').on('change', function() {
                    question.setSubmitState(true);
                });
                break;
            case question.MAMC:
                var tempArr = [];
                $('input').on('change', function() {
                    tempArr = ($('input[name=cyu]:checked').map(function() {
                        return this.value;
                    }).get());
                    if (tempArr.length > 0) {
                        question.setSubmitState(true);
                    } else {
                        question.setSubmitState(false);
                    }
                });
                break;
        }
        $("#sbmt_btn").one("click", question.submitQuestion);
    },

    submitQuestion: function() {
        question.attempts--;
        $('input[name=cyu]').attr("disabled", true);
        $('input[type=radio], input[type=checkbox],  #optionContainer label').css('cursor', 'default').attr("disabled", "");
        question.setSubmitState(false);
        switch (question.questionType) {
            case question.SAMC:
                question.submitSAMC();
                break;
            case question.MAMC:
                question.submitMAMC();
                break;
        }
        question.showFeedback();
    },

    submitSAMC: function() {
        var userAnswer = $('input[name=cyu]:checked').val();
        question.userAnswer = userAnswer;
        question.isUserCorrect = false;
        if (userAnswer == question.correctAnswer) {
            $("#correctContainer").show();
            $("#incorrectContainer").hide();
            audioController.playChecklistAudio('Correct_answer');
            question.showTickCross();
            if (typeof page != "undefined" && isFunction(page.questionDone)) {
                page.questionDone();
            }
            if ($(".player_content #pageDiv").attr("isClubbed") == true || $(".player_content #pageDiv").attr("isClubbed") == "true") {} else {
                controller.showNextBlinker();
            }

        } else {
            $("#correctContainer").hide();
            $("#incorrectContainer").show();
            audioController.playChecklistAudio('incorrect_answer');
            // question.showTickCross();
        }

    },

    submitMAMC: function() {
        var userAnswer = ($('input[name=cyu]:checked').map(function() {
            return this.value;
        }).get());
        userAnswer.sort();
        question.userAnswer = userAnswer;
        question.isUserCorrect = false;
        question.partialCorrect = false;
        question.incorrect = false;
        var cnt = 0;
        for (var i = 0; i < question.correctAnswer.length; i++) {
            for (var j = 0; j < userAnswer.length; j++) {
                if (question.correctAnswer[i] == userAnswer[j]) {
                    cnt = cnt + 1;
                }
            }
        }
        if (question.correctAnswer.length == cnt && userAnswer.length == question.correctAnswer.length) {
            question.isUserCorrect = true;
        } else if (cnt > 0) {
            question.partialCorrect = true;
        } else if (cnt == 0) {
            question.incorrect = true;
        }
    },

    showFeedback: function() {
        $(".input_box input").css("cursor", "default");
        $(".feedbackWapper").addClass('on');
        $("#partialContainer1").hide();
        $("#partialContainer2").hide();
        $("#incorrectContainer").hide();
        $("#feedbck_IncorrectFinal").hide();
        if (question.isUserCorrect) {
            $("#correctContainer").show();
            audioController.playChecklistAudio('Correct_answer');
            question.showTickCross();
            if (typeof page != "undefined" && isFunction(page.questionDone)) {
                page.questionDone();
            }
            if ($(".player_content #pageDiv").attr("isClubbed") == true || $(".player_content #pageDiv").attr("isClubbed") == "true") {} else {
                controller.showNextBlinker();
            }

        } else {
            if (question.attempts > 0) {
                if (question.partialCorrect) {
                    $("#partialContainer1").show();
                    audioController.playChecklistAudio('incorrect_answer');
                } else {
                    $("#incorrectContainer").show();
                    audioController.playChecklistAudio('incorrect_answer');
                }
                $(".closeFeedback").on("click", question.resetQuestion);
            } else {
                if (question.partialCorrect) {
                    $("#partialContainer2").show();
                    audioController.playChecklistAudio('incorrect_answer');
                } else {
                    $("#resetContainer").show();
                    audioController.playChecklistAudio('incorrect_answer');
                }

                $("#playAgain").one("click", function() {
                    model["level_" + model.currentTopic + "_attempted"] = true;
                });
                question.showTickCross();
                if (typeof page != "undefined" && isFunction(page.questionDone)) {
                    page.questionDone();
                }
                if ($(".player_content #pageDiv").attr("isClubbed") == true || $(".player_content #pageDiv").attr("isClubbed") == "true") {} else {
                    controller.showNextBlinker();
                }
            }
        }        
        $(".closeFeedback").one("click", question.hidefeedback);
    },
    hidefeedback: function() {
        // $(".feedbackWapper,.feedbackContainer").hide();
        $(".feedbackWapper").removeClass('on');
        // $(".overLayOnboarding_cyu").css("display", "none");
        $(".blocker").hide();
        if (question.attempts > 0 && !question.isUserCorrect) {
            //$("#tryAgain").prop("disabled", false);
        }
    },

    resetQuestion: function() {
        question.userAnswer = -1;
        question.isUserCorrect = false;
        //$("#tryAgain").prop("disabled", true);
        $('input[name=cyu]').removeAttr('checked');
        $('input[name=cyu]').removeAttr('disabled');

        $('input[type=radio], input[type=checkbox],  #optionContainer label').css('cursor', 'pointer').removeAttr("disabled");
        $("#incorrectContainer").hide();
        $("#resetContainer").hide();
        $("#correctContainer").hide();
        $("#feedbck_IncorrectFinal").hide();
        // $(".feedbackWapper,.feedbackContainer").hide();
        $(".feedbackWapper").removeClass('on');
        $(".blocker").hide();
        $("#sbmt_btn").one("click", question.submitQuestion);
        $(".input_box input").css("cursor", "pointer");
    },

    showTickCross: function() {
        $(".tick").css("visibility", "visible");
        $('.option').each(function(i) {
            var temp = $(this).attr("id");
            temp = temp.substr(4, 1);
            if (question.questionType == question.SAMC) {

                if (temp == question.correctAnswer) {
                    $(this).children("span").addClass("correct");
                } else {
                    if (question.userAnswer - 1 == i) {
                        $(this).children("span").addClass("Incorrect");
                    }
                }

            } else if (question.questionType == question.MAMC) {
                if (question.correctAnswer.indexOf(temp) > -1) {
                    $(this).children("span").addClass("correct");
                } else {
                    //$(this).children("span").addClass("Incorrect");
                    var temp1 = question.userAnswer.length;
                    for (var j = 0; j < temp1; j++) {
                        if (question.checkValueExist(question.correctAnswer, question.userAnswer[j]) == 0) {

                            $("#opt_" + question.userAnswer[j] + " span").addClass("Incorrect");
                        }
                    }
                }
            }

        });
    },

    checkValueExist: function(arr, val) {
        var temp = arr.length;
        for (var i = 0; i < temp; i++) {
            if (arr[i] == val) {
                return 1;
            } else if (i == (temp - 1)) {
                return 0;
            }
        };
    },

    setSubmitState: function(bo) {
        if (bo) {
            // $("#sbmt_btn").removeClass("disabled");
            $(".abbotdiv_samc").css("display", "none");

            //$("#tryAgain").prop("disabled", true);
        } else {
            $(".abbotdiv_samc").css("display", "block");
            // $("#sbmt_btn").addClass("disabled");

        }
    },

    enableDisableAll: function(bo) {

        if (bo) {
            $('input[type=radio], input[type=checkbox]').prop("disabled", false);
            $('input[type=radio], input[type=checkbox],  #optionContainer label').css('cursor', 'pointer').removeClass("disabled");
        } else {
            $('input[type=radio], input[type=checkbox]').prop("disabled", true);
            $('input[type=radio], input[type=checkbox],  #optionContainer label').css('cursor', 'default').addClass("disabled");

        }
    },


    unload: function() {
        question.partialCorrect = false;
        question.incorrect = false;

    }
};