var intro = {
  tl: null,
  mySlider: null,
  getStatus: false,
  setTime1: "",
  setTime2: "",
  setTime3: "",
  setTime4: "",
  setTime5: "",
  setTime6: "",
  setTime7: "",
  get_attr1: 0,
  get_Upattr1: 0,
  screen3Status: false,
  pageTwobtnActive: "",
  total_duration: 0.5,
  SkrnCount: 0,
  currentScreen: 1,
  count_length: "",
  Screen_width: "",
  Screen_height: "",
  get_id: "",
  setTime_Characters: "",
  setTime_Characters_questions: "",
  once_moved_to_1: false,
  once_moved_to_2: false,
  once_moved_to_3: false,
  once_moved_to_7: false,
  once_video_viewed: false,
  screen1_Done: false,
  screen2_Done: false,
  screen3_Done: false,
  screen4_Done: false,
  screen5_Done: false,
  screen6_Done: false,
  screen7_Done: false,
  screen8_Done: false,
  screen9_Done: false,
  screen10_Done: false,
  screen11_Done: false,
  screen12_Done: false,
  screen13_Done: false,
  screen14_Done: false,
  screen15_Done: false,
  pageInit: function () {
    intro.currentScreen = 1;
    intro.SkrnCount = 0;
    intro.once_moved_to_2 = false;

    // clearTimeout(intro.setTime6);
    // clearTimeout(intro.setTime7);
    clearTimeout(intro.pageTwobtnActive);

    $(window).resize(intro.resizeEle);
    intro.setDefaultposition();
    intro.screen1_anim();

    if (intro.currentScreen == 1) {
      $(".rightNavWrap").addClass("navHide");
    } else {
      $(".rightNavWrap").removeClass("navHide");
    }

    $("#scrn14_4.CTA_button_position").on("click", function () {
      window.top.close();
    });

    var tempAA = setTimeout(function () {
      $("#splashContainer, #player_audioPopupWrapper").hide();
      $("#splashContainer").addClass("hidevedio");
      $(
        ".footer, .header, .player_contentArea_style, #player_contentArea"
      ).show();
      clearTimeout(tempAA);
    }, 3000);

    intro.SkrnCount = $(".Intro_module .sCreenCount").length;
    $(".pagecount").html(
      intro.currentScreen + "&nbsp;&nbsp;/&nbsp;&nbsp;" + intro.SkrnCount + ""
    );

    // if ($(window).width() > 1920) {
    //     intro.Screen_width = 1920;
    // } else {
    //     intro.Screen_width = $(window).width();
    // }

    if ($(window).width() >= 1920) {
      intro.Screen_width = 1920;
      intro.Screen_height = 969;
    } else if ($(window).width() > 1366 && $(window).width() < 1920) {
      intro.Screen_width = 1920;
      intro.Screen_height = 969;
    } else if ($(window).width() <= 1366) {
      intro.Screen_width = 1920;
      intro.Screen_height = 969;
    }
    intro.setLineHeight();

    var wrap_width = intro.SkrnCount * intro.Screen_width;
    $(".Intro_module .innerWarpperarea").css("left", 0);
    $(".Intro_module .innerWarpperarea").css("width", wrap_width);
    $(".Intro_module .sCreenCount").css("width", intro.Screen_width);

    for (i = 1; i <= intro.SkrnCount; i++) {
      var left_margin = intro.Screen_width * (i - 1);
      $(".Intro_module #screen" + i).css("left", left_margin);
    }

    $(".click1")
      .off()
      .on("click", function () {
        var clickId = $(this).attr("data-id");
        /*if(clickId == 1){
                intro.screen3a_anim();
            }*/
        if (intro.once_video_viewed) {
          $(".popClose").fadeIn();
        }
        intro.screen3a_anim();
        intro.volumeBlue_Nonactive();
        $(this).addClass("visited");
        $(".rightNavWrap").addClass("navHide");
        $(".popupBox#pop" + clickId).show();
        $(".scrn3contantdiv").addClass("overlay-open");
        $(".contentscale").addClass("open");

        audioController.clearAudio();
        $(".Intro_module #myVideo3_1").attr(
          "src",
          "content/video/en/m1_t1_p1/popup_anim.mp4"
        );
        $(".Intro_module #myVideo3_1").get(0).play();
        /*var getAudioName = $(this).attr("audioN");
            audioController.playSecAudio(getAudioName);*/
      });

    $(".Down_arrowIcon1")
      .off()
      .on("click", function () {
        model.twinmaxstaggerToVal(
          ".Down_arrowIcon1",
          1,
          0,
          0,
          1,
          Linear.easeNone,
          0,
          null,
          null,
          0.6,
          downAnim1
        );
      });

    function downAnim1() {
      intro.setDefaultposition();
      audioController.clearAudio();
      intro.get_attr1 = 1;
      intro.sendBookMrkData(1);
      model.curretSlideMoved = intro.get_attr1;
      controller.updateSaveData();
      intro.slideMaindiv(intro.get_attr1);
    }

    //         window.addEventListener('wheel', function(event)
    // {
    //  if (event.deltaY < 0)
    //  {

    //   console.log('scrolling up');

    //   var getSectionId = event.target.getAttribute("data-attr");
    //   console.log(getSectionId)
    // intro.slideMaindiv(getSectionId);
    //  }
    //  else if (event.deltaY > 0)
    //  {
    //   console.log('scrolling down');

    //   var getSectionId = event.target.getAttribute("data-attr");
    //   console.log(getSectionId)
    //             intro.slideMaindiv(getSectionId);
    //  }
    // });

    $(".move_bottom")
      .off()
      .on("click", function () {
        intro.setDefaultposition();
        audioController.clearAudio();
        intro.get_attr1 = parseInt($(this).attr("secId"));
        model.curretSlideMoved = intro.get_attr1;
        controller.updateSaveData();
        intro.slideMaindiv(intro.get_attr1);
        if (model.curretSlideMoved != 0) {
          $("#myVideo1_1").attr("src", "");
        }
      });

    $(".move_up")
      .off()
      .on("click", function () {
        // intro.setDefaultposition();
        audioController.clearAudio();
        intro.get_Upattr1 = parseInt($(this).attr("secId"));
        model.curretSlideMoved = intro.get_Upattr1;
        controller.updateSaveData();
        intro.slideUpMaindiv(intro.get_Upattr1);
        if (model.curretSlideMoved == 0) {
          $("#myVideo1_1").attr(
            "src",
            "content/video/en/m1_t1_p1/Real_Design_Principles.mp4"
          );
          $("#myVideo1_1").get(0).play();

          audioController.clearAudio();
        } else {
          $("#myVideo1_1").attr("src", "");
        }
      });

    $(".closeWrap")
      .off()
      .on("click", function () {
        intro.once_video_viewed = true;
        intro.volumeBlue_active();
        $(".Intro_module #myVideo3_1").get(0).pause();
        //$('.Intro_module #myVideo3_1')[0].currentTime(0);
        $(".contentscale").removeClass("open");
        $(".scrn3contantdiv").removeClass("overlay-open");
        $(".popupBox").hide();
        $(".rightNavWrap").removeClass("navHide");
        audioController.clearAudio();

        intro.screen3a_Defaultanim();
        $(".Intro_module #scrn3a_7.closeWrap").removeClass("active");

        /*if($('#screen3 .clickWrap.visited').length == 1){
                $("#screen3 .rightScreen .clickWrap.click2").removeClass("disable").addClass("active");
            }
            else if($('#screen3 .clickWrap.visited').length == 2){
                $("#screen3 .rightScreen .clickWrap.click3").removeClass("disable").addClass("active");
            }
            else if($('#screen3 .clickWrap.visited').length == 3){
                $(".Intro_module #screen3 .stbtncontner").removeClass("disable").addClass("active");
            }*/
        if ($("#screen3 .stbtncontner1.visited").length == 1) {
          $(".Intro_module #screen3 .stbtncontner")
            .removeClass("disable")
            .addClass("active");
        }
      });

    $(".popClose")
      .off()
      .on("click", function () {
        intro.volumeBlue_active();
        $(".Intro_module #myVideo3_1").get(0).pause();
        //$('.Intro_module #myVideo3_1')[0].currentTime(0);
        $(".contentscale").removeClass("open");
        $(".scrn3contantdiv").removeClass("overlay-open");
        $(".popupBox").hide();
        $(".rightNavWrap").removeClass("navHide");
        audioController.clearAudio();

        intro.screen3a_Defaultanim();
        $(".Intro_module #scrn3a_7.closeWrap").removeClass("active");

        if ($("#screen3 .stbtncontner1.visited").length == 1) {
          $(".Intro_module #screen3 .stbtncontner")
            .removeClass("disable")
            .addClass("active");
        }
      });

    $("#section_nextBtn")
      .off()
      .on("click", function () {
        intro.play_nextfunction();
      });

    $(".rightNavWrap .navWrap").hover(
      function () {
        $(this).addClass("hover_Class");
      },
      function () {
        $(".rightNavWrap .navWrap").removeClass("hover_Class");
      }
    );

    $(".rightNavWrap .navWrap").on("click", function () {
      // $('#section3 .stop').trigger('click');
      $(".tabContent1 .stop").trigger("click");
      $(".tabContent2 .stop").trigger("click");
      intro.setDefaultposition();
      var get_attr = parseInt($(this).attr("data-attr"));
      intro.get_attr1 = parseInt($(this).attr("secId"));

      intro.slideMaindiv(intro.get_attr1);

      switch (get_attr) {
        case 1:
          var left_margin1 = intro.Screen_width * 1;
          $(".introPage .innerWarpperarea").css("left", 0 - left_margin1);
          intro.setDefaultposition();
          intro.active_Firstmenu();
          TweenMax.killAll(false, true, true, true);
          // $.fn.fullpage.moveTo(1);
          var cs = setTimeout(function () {
            intro.currentScreen = 2;
            clearTimeout(cs);
          }, 500);
          intro.screen2_anim();

          audioController.clearAudio();
          model.curretSlideMoved = 0;
          // intro.setDefaultposition();
          // var getAudioName = $(".Intro_module .sCreenCount").eq(1).attr("audioName");
          // audioController.playSecAudio(getAudioName);
          break;
        case 2:
          var left_margin2 = intro.Screen_width * 2;
          $(".introPage .innerWarpperarea").css("left", 0 - left_margin2);
          intro.active_Secondmenu();
          // $.fn.fullpage.moveTo(1);
          var cs = setTimeout(function () {
            intro.currentScreen = 3;
            clearTimeout(cs);
          }, 500);

          intro.screen3_anim();
          audioController.clearAudio();
          model.curretSlideMoved = 0;
          intro.setDefaultposition();
          // var getAudioName = $(".Intro_module .sCreenCount").eq(2).attr("audioName");
          // audioController.playSecAudio(getAudioName);
          break;
        case 3:
          var left_margin3 = intro.Screen_width * 3;
          $(".introPage .innerWarpperarea").css("left", 0 - left_margin3);
          intro.active_Thirdmenu();
          // $.fn.fullpage.moveTo(1);
          var cs = setTimeout(function () {
            intro.currentScreen = 4;
            clearTimeout(cs);
          }, 500);

          intro.screen4_anim();
          audioController.clearAudio();
          model.curretSlideMoved = 0;
          intro.setDefaultposition();
          // var getAudioName = $(".Intro_module .sCreenCount").eq(3).attr("audioName");
          // audioController.playSecAudio(getAudioName);
          break;
        case 4:
          var left_margin4 = intro.Screen_width * 5;
          $(".introPage .innerWarpperarea").css("left", 0 - left_margin4);
          intro.active_Fourthmenu();
          // $.fn.fullpage.moveTo(1);
          var cs = setTimeout(function () {
            intro.currentScreen = 6;
            clearTimeout(cs);
          }, 500);
          intro.screen7_anim();
          audioController.clearAudio();
          model.curretSlideMoved = 0;
          intro.setDefaultposition();
          // var getAudioName = $(".Intro_module .sCreenCount").eq(5).attr("audioName");
          // audioController.playSecAudio(getAudioName);
          break;
        case 5:
          $(".introPage .innerWarpperarea").css("left", 0 - left_margin4);
          intro.active_Fifthmenu();
          // $.fn.fullpage.moveTo(1);
          var cs = setTimeout(function () {
            intro.currentScreen = 6;
            clearTimeout(cs);
          }, 500);
          intro.screen6_anim();
          audioController.clearAudio();
          model.curretSlideMoved = 0;
          // var getAudioName = $(".Intro_module .sCreenCount").eq(5).attr("audioName");
          // audioController.playSecAudio(getAudioName);
          audioController.clearAudio();
          intro.setDefaultposition();
          break;
      }
    });

    $("#section_backBtn")
      .off()
      .on("click", function () {
        TweenMax.killAll(false, true, true, true);
        //$('.Intro_module .stbtncontner').removeClass('active');
        intro.setDefaultposition();

        // clearTimeout(intro.setTime6);
        // clearTimeout(intro.setTime7);
        clearTimeout(intro.pageTwobtnActive);
        if (intro.currentScreen > 1) {
          intro.currentScreen--;
          model.userSlideN = intro.currentScreen;
          controller.updateSaveData();
          // $('#screen'+intro.currentScreen+'').show().siblings('.sCreenCount').hide();
          $("#section_backBtn").addClass("active");
          audioController.clearAudio();
          //audioController.playTabAudio(intro.currentScreen);

          var get_left = $(".Intro_module .innerWarpperarea").css("left");
          var get_left1 = get_left.split("px");
          var get_left2 = parseInt(get_left1[0]);
          var get_totalSlide = parseInt(get_left2 + intro.Screen_width);
          $(".Intro_module .innerWarpperarea").css("left", get_totalSlide);

          if (intro.currentScreen == 1) {
            $(".rightNavWrap").addClass("navHide");
          } else {
            $(".rightNavWrap").removeClass("navHide");
          }

          if (intro.currentScreen == 1) {
            $(".Intro_module #myVideo").get(0).load();
            $(".Intro_module #myVideo").get(0).play();
            $("#section_backBtn").css("pointer-events", "none");
            $("#section_backBtn").css("opacity", "0.5");
            /*if ($('.Intro_module .overlayLeft2').hasClass('add2')) {
                        $('.Intro_module .overlayLeft2').removeClass('add2');
                    }
                    if ($('.Intro_module .line2').hasClass('lineanim2')) {
                        $('.Intro_module .line2').removeClass('lineanim2');
                    }
                    if ($('.Intro_module .overlayLeft4').hasClass('add4')) {
                        $('.Intro_module .overlayLeft4').removeClass('add4');
                    }
                    if ($('.Intro_module .line4').hasClass('lineanim4')) {
                        $('.Intro_module .line4').removeClass('lineanim4');
                    }*/
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn1_1",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            $(".Intro_module .overlayLeft").addClass("add");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn1_2",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn1_2Done
            );
            $(".Intro_module .line").addClass("lineanim");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn1_3",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn1_4",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn1_5",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn1_6",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn1_7",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.btnActive
            );
          }

          if (intro.currentScreen == 2) {
            //$('.Intro_module #myVideo2')[0].play();
            // intro.screen2_anim()
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn2_1",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn2_1Done
            );
            $(".Intro_module .overlayLeft2").addClass("add2");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn2_2",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn2_2Done
            );
            $(".Intro_module .line2").addClass("lineanim2");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn2_3",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn2_4",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn2_5",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn2_6",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn2_7",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn2_8",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.btnActive
            );
          }

          if (intro.currentScreen == 3) {
            //$('.Intro_module #myVideo3')[0].play();
            // intro.screen2_anim();
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_1",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn3_1Done
            );
            $(".Intro_module .overlayLeft2").addClass("add2");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_2",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn3_2Done
            );
            $(".Intro_module .line2").addClass("lineanim2");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_3",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_4",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_5",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_6",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_6_1",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_6_2",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.btnActive
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_7",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_8",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_9",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_10",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_11",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_12",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_13",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_14",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn3_15",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.btnActive
            );
          }

          /*if (intro.currentScreen == 3) {
                    $('.Intro_module .click_tab').removeClass('disabled');
                    $('.Intro_module .charac_div').addClass('disabled');
                    if ($('.Intro_module .overlayscreen5').hasClass('screen4add')) {
                        $('.Intro_module .overlayscreen5').removeClass('screen4add');
                    }
                    if ($('.Intro_module .overlayLeft2').hasClass('add2')) {
                        $('.Intro_module .overlayLeft2').removeClass('add2');
                    }
                    if ($('.Intro_module .line2').hasClass('lineanim2')) {
                        $('.Intro_module .line2').removeClass('lineanim2');
                    }
                    if ($('.Intro_module .overlayLeft4').hasClass('add4')) {
                        $('.Intro_module .overlayLeft4').removeClass('add4');
                    }
                    if ($('.Intro_module .line4').hasClass('lineanim4')) {
                        $('.Intro_module .line4').removeClass('lineanim4');
                    }
                    $("#backAudio").get(0).play();
                }*/

          if (intro.currentScreen == 4) {
            $(".Intro_module #myVideo4").get(0).load();
            $(".Intro_module #myVideo4").get(0).play();
            // intro.screen2_anim()
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn4_1",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn4_1Done
            );
            $(".Intro_module .overlayLeft4").addClass("add4");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn4_2",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn4_2Done
            );
            $(".Intro_module .line4").addClass("lineanim4");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn4_3",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn4_4",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn4_5",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn4_6",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn4_7",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn4_8",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.btnActive
            );
          }

          if (intro.currentScreen == 5) {
            //$('.Intro_module #myVideo5')[0].play();
            // intro.screen2_anim()
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_1",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_1_1",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn5_1Done
            );
            //$('.Intro_module .overlayLeft5').addClass('add5');
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_2",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn5_2Done
            );
            //$('.Intro_module .line5').addClass('lineanim5');
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_3",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_4",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_5",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_6",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_7",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn5_8",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.btnActive
            );
          }

          if (intro.currentScreen == 6) {
            $(".Intro_module #myVideo6").get(0).load();
            $(".Intro_module #myVideo6").get(0).play();
            // intro.screen2_anim()
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn6_1",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn4_1Done
            );
            $(".Intro_module .overlayLeft6").addClass("add6");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn6_2",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.scrn4_2Done
            );
            $(".Intro_module .line6").addClass("lineanim6");
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn6_3",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn6_4",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn6_5",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn6_6",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn6_7",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              null
            );
            model.twinmaxstaggerToVal(
              ".Intro_module #scrn6_8",
              0.5,
              0,
              0,
              1,
              Linear.easeNone,
              0,
              null,
              null,
              0.6,
              intro.btnActive
            );
          }
        }

        $(".pagecount").html(
          intro.currentScreen +
          "&nbsp;&nbsp;/&nbsp;&nbsp;" +
          intro.SkrnCount +
          ""
        );

        $("#section_backBtn").css("pointer-events", "none");
        $("#section_backBtn").css("opacity", "0.5");
        // if(intro.currentScreen > 1){
        //     setTimeout(function(){
        //         $('#section_backBtn').css("pointer-events", "auto");
        //         $('#section_backBtn').css("opacity", "1");
        //     },1000)
        // }

        controller.slideVistedStFn();
      });

    $(".Intro_module .startbtn")
      .off()
      .on("click", function () {
        intro.sendBookMrkData(1);
        intro.play_nextfunction();
      });

    $(".startDiv .starttxt")
      .off()
      .on("click", function () {
        $(".startDivWrap").hide();
        intro.play_nextfunction();
      });

    controller.slideVistedStFn();
    //  intro.slideMaindiv(2);

    $(".click_div")
      .off()
      .on("click", function (e) {
        TweenMax.killAll(false, true, true, true);
        var getSectionId = e.target.getAttribute("data-attr");
        intro.slideMaindiv(getSectionId);
      });

    $(".click_div1")
      .off()
      .on("click", function (e) {
        // e.target.classList.add("visited");
        // var getSectionId = e.target.getAttribute("data-attr");

        $(this).addClass("visited");
        var getSectionId = $(this).attr("data-attr");

        intro.slideMaindiv(getSectionId);

        // if($(".visited").length >= 4){
        //     $("#section2 .Down_arrowIcon").fadeIn();
        // }
      });
  },
  slideMaindiv: function (val) {
    if (intro.Screen_width >= 1920) {
      intro.addsectionClass(val, intro.Screen_height);
    } else if (intro.Screen_width > 1366 && $(window).width() < 1920) {
      intro.addsectionClass(val, intro.Screen_height);
    } else if (intro.Screen_width <= 1366) {
      intro.addsectionClass(val, intro.Screen_height);
    }
  },
  addsectionClass: function (a, b) {
    // for (var i = 1; i < $(".section").length; i++) {
    //         $(".warpperarea").removeClass("section"+i+"_slide"+b);
    //     }
    if (a == 0) {
      intro.setDefaultposition();
      $(".warpperarea").css("margin-top", 0);
      audioController.clearAudio();
      $("#myVideo1_1").attr(
        "src",
        "content/video/en/m1_t1_p1/Real_Design_Principles.mp4"
      );
      $("#myVideo1_1").get(0).play();
      $(".rightNavWrap").addClass("navHide");
    } else {
      var get_topM = -(a * b);
      $(".warpperarea").css("margin-top", get_topM);
      $(".rightNavWrap").removeClass("navHide");
    }

    if (a == 1) {
      intro.setDefaultposition();
      var st2 = setTimeout(function () {
        if (model.verticalScreenStatusData[7]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section1").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen1a_anim();
        } else {
          intro.screen1a_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section1").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }
        clearTimeout(st2);
      }, 500);
      SetLessonStatus("completed");
      doLMSCommit();
      // second.slideAnimation();
    } else if (a == 2) {
      intro.setDefaultposition();
      var st3 = setTimeout(function () {
        if (model.verticalScreenStatusData[0]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section2").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen2_anim();
        } else {
          intro.screen2_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section2").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }
        clearTimeout(st3);
      }, 500);
      SetLessonStatus("completed");
      doLMSCommit();
      // second.slideAnimation();
    } else if (a == 3) {
      intro.setDefaultposition();
      var st4 = setTimeout(function () {
        if (model.verticalScreenStatusData[1]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section3").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen3_anim();
        } else {
          intro.screen3_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section3").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }

        clearTimeout(st4);
      }, 500);
      SetLessonStatus("completed");
      doLMSCommit();
    } else if (a == 4) {
      intro.setDefaultposition();
      var st5 = setTimeout(function () {
        if (model.verticalScreenStatusData[2]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section4").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen4_anim();
        } else {
          intro.screen4_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section4").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }

        clearTimeout(st5);
      }, 500);
      SetLessonStatus("completed");
      doLMSCommit();
    } else if (a == 5) {
      intro.setDefaultposition();
      var st6 = setTimeout(function () {
        if (model.verticalScreenStatusData[3]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section5").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen5_anim();
        } else {
          intro.screen5_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section5").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }

        clearTimeout(st6);
      }, 500);
      intro.active_Fifthmenu();
    } else if (a == 6) {
      //audioController.ajaxFunction(url,custom.seventhSlideAnimation);
      // custom.seventhSlideAnimation();
      intro.setDefaultposition();
      var st7 = setTimeout(function () {
        if (model.verticalScreenStatusData[4]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section6").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen6_anim();
        } else {
          intro.screen6_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section6").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }
        clearTimeout(st7);
      }, 500);
      SetLessonStatus("completed");
      doLMSCommit();
    } else if (a == 7) {
      intro.setDefaultposition();
      var st8 = setTimeout(function () {
        if (model.verticalScreenStatusData[5]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section7").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen7_anim();
        } else {
          intro.screen7_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section7").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }

        clearTimeout(st8);
      }, 500);

      SetLessonStatus("completed");
      doLMSCommit();
    } else if (a == 8) {
      intro.setDefaultposition();
      var st9 = setTimeout(function () {
        if (model.verticalScreenStatusData[6]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section8").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen8_anim();
        } else {
          intro.screen8_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section8").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }
        clearTimeout(st9);
      }, 500);
      // audioController.ajaxFunction(url,custom.eighthSlideAnimation);
      // custom.eighthSlideAnimation();
      SetLessonStatus("completed");
      doLMSCommit();
    } else if (a == 9) {
      intro.setDefaultposition();
      var st10 = setTimeout(function () {
        if (model.verticalScreenStatusData[8]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section9").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen9_anim();
        } else {
          intro.screen9_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section9").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }
        clearTimeout(st10);
      }, 500);
      // audioController.ajaxFunction(url,custom.eighthSlideAnimation);
      // custom.eighthSlideAnimation();
      SetLessonStatus("completed");
      doLMSCommit();
    } else if (a == 10) {
      intro.setDefaultposition();
      var st11 = setTimeout(function () {
        if (model.verticalScreenStatusData[9]) {
          audioController.clearAudio();
          var getAudioName1 = $("#section10").attr("audioName");
          audioController.playSecAudio(getAudioName1);
          intro.screen10_anim();
        } else {
          intro.screen9_anim();
          audioController.clearAudio();
          var getAudioName1 = $("#section10").attr("audioName");
          audioController.playSecAudio(getAudioName1);
        }
        clearTimeout(st11);
      }, 500);
      // audioController.ajaxFunction(url,custom.eighthSlideAnimation);
      // custom.eighthSlideAnimation();
      SetLessonStatus("completed");
      doLMSCommit();
    }

    // var get_slideDiv = setTimeout(function(){
    //     $(".warpperarea").addClass("section"+a+"_slide"+b);
    // },100);
  },
  active_Firstmenu: function () {
    $(".rightNavWrap .navWrap").removeClass("current");
    $(".rightNavWrap .navWrap").eq(0).addClass("active current");
  },
  active_Secondmenu: function () {
    model.menuCompletedState[0] = 1;
    $(".rightNavWrap .navWrap").eq(0).addClass("visited");
    $(".rightNavWrap .navWrap").removeClass("current");
    $(".rightNavWrap .navWrap").eq(1).addClass("active current");
  },
  active_Thirdmenu: function () {
    model.menuCompletedState[1] = 1;
    $(".rightNavWrap .navWrap").eq(0).addClass("visited");
    $(".rightNavWrap .navWrap").eq(1).addClass("visited");
    $(".rightNavWrap .navWrap").removeClass("current");
    $(".rightNavWrap .navWrap").eq(2).addClass("active current");
  },
  active_Fourthmenu: function () {
    model.menuCompletedState[2] = 1;
    $(".rightNavWrap .navWrap").eq(0).addClass("visited");
    $(".rightNavWrap .navWrap").eq(1).addClass("visited");
    $(".rightNavWrap .navWrap").eq(2).addClass("visited");
    $(".rightNavWrap .navWrap").removeClass("current");
    $(".rightNavWrap .navWrap").eq(3).addClass("active current");
  },
  active_Fifthmenu: function () {
    model.menuCompletedState[3] = 1;
    $(".rightNavWrap .navWrap").eq(0).addClass("visited");
    $(".rightNavWrap .navWrap").eq(1).addClass("visited");
    $(".rightNavWrap .navWrap").eq(2).addClass("visited");
    $(".rightNavWrap .navWrap").eq(3).addClass("visited");
    $(".rightNavWrap .navWrap").removeClass("current");
    $(".rightNavWrap .navWrap").eq(4).addClass("active current");
  },
  visitedAllmenu: function () {
    model.menuCompletedState[4] = 1;
    $(".rightNavWrap .navWrap").removeClass("current");
    $(".rightNavWrap .navWrap").eq(0).addClass("visited");
    $(".rightNavWrap .navWrap").eq(1).addClass("visited");
    $(".rightNavWrap .navWrap").eq(2).addClass("visited");
    $(".rightNavWrap .navWrap").eq(3).addClass("visited");
    $(".rightNavWrap .navWrap").eq(4).addClass("visited");
  },
  checkMenuVisited: function () {
    $(model.menuCompletedState).map(function (index, val) {
      if (val == 1) {
        $(".rightNavWrap .navWrap").eq(index).addClass("visited");
        intro.setDefaultposition();
      }
    });
  },
  slideUpMaindiv: function (val) {
    if (intro.Screen_width >= 1920) {
      intro.addsectionUpClass(val, intro.Screen_height);
    } else if (intro.Screen_width > 1366 && $(window).width() < 1920) {
      intro.addsectionUpClass(val, intro.Screen_height);
    } else if (intro.Screen_width <= 1366) {
      intro.addsectionUpClass(val, intro.Screen_height);
    }
  },
  addsectionUpClass: function (a, b) {
    // for (var i = 1; i < $(".section").length; i++) {
    //         $(".warpperarea").removeClass("section"+i+"_slide"+b);
    //     }

    if (a == 0) {
      intro.currentScreen == 7;
      $(".warpperarea").css("margin-top", 0);
      var left_margin = 0;
      $(".introPage .innerWarpperarea").css("left", 0 - left_margin);
      audioController.clearAudio();
      var getAudioName = $(".Intro_module .sCreenCount")
        .eq(0)
        .attr("audioName");
      //audioController.playSecAudio(getAudioName);
      intro.screen7_anim();
      $(".rightNavWrap").removeClass("navHide");
    } else {
      var get_topM = -(a * b);
      $(".warpperarea").css("margin-top", get_topM);
    }

    if (a == 0) {
      intro.setDefaultposition();
      intro.screen7_animStop();
      audioController.clearAudio();
    } else if (a == 1) {
      intro.setDefaultposition();
      intro.screen8_animStop();
      audioController.clearAudio();
    } else if (a == 2) {
      intro.setDefaultposition();
      intro.screen9_animStop();
      audioController.clearAudio();
    } else if (a == 3) {
      intro.setDefaultposition();
      intro.screen10_animStop();
      audioController.clearAudio();
      /*} else if (a == 4) {
                     intro.setDefaultposition();
                    intro.screen11_animStop(); 
                    audioController.clearAudio(); */
    } else if (a == 4) {
      intro.active_Fifthmenu();

      intro.setDefaultposition();
      intro.screen12_animStop();
      audioController.clearAudio();
    } else if (a == 5) {
      intro.visitedAllmenu();
      intro.setDefaultposition();
      intro.screen13_animStop();
      audioController.clearAudio();
    } else if (a == 6) {
      intro.setDefaultposition();
      intro.screen14_animStop();
      audioController.clearAudio();
    } else if (a == 7) {
      intro.setDefaultposition();
      intro.screen14_animStop();
      audioController.clearAudio();
    } else if (a == 8) {
      intro.setDefaultposition();
      intro.screen14_animStop();
      audioController.clearAudio();
    } else if (a == 9) {
      intro.setDefaultposition();
      intro.screen14_animStop();
      audioController.clearAudio();
    }

    if (a == 6) {
      $(".rightNavWrap").hide();
    } else {
      $(".rightNavWrap").show();
    }

    // var get_slideDiv = setTimeout(function(){
    //     $(".warpperarea").addClass("section"+a+"_slide"+b);
    // },100);
  },
  play_nextfunction: function () {
    intro.getStatus = model.screenStatusData;

    $("#section3 .stop").trigger("click");
    $(".tabContent1 .stop").trigger("click");
    $(".tabContent2 .stop").trigger("click");
    TweenMax.killAll(false, true, true, true);

    // clearTimeout(intro.setTime6);
    // clearTimeout(intro.setTime7);
    clearTimeout(intro.pageTwobtnActive);
    if (intro.currentScreen < intro.SkrnCount) {
      intro.sendBookMrkData(1);
      intro.currentScreen++;

      controller.updateSaveData();
      // $('#screen'+intro.currentScreen+'').show().siblings('.sCreenCount').hide();

      if (intro.currentScreen == 1) {
        $(".rightNavWrap").addClass("navHide");
        intro.setDefaultposition();
        $("#section_backBtn").addClass("active");
        audioController.clearAudio();
      } else {
        $(".rightNavWrap").removeClass("navHide");
      }

      if (intro.currentScreen == 2) {
        //$('.Intro_module #myVideo2')[0].play();
        intro.once_moved_to_2 = true;
        //$('.Intro_module .stbtncontner').removeClass('active');
        //$('.Intro_module .line2').removeClass('lineanim2');
        // intro.setTime6 = setTimeout(function(){
        //$('.Intro_module .overlayLeft2').removeClass('add2');
        // },500);
        // intro.setTime7 = setTimeout(function(){
        intro.setDefaultposition();
        $("#section_backBtn").addClass("active");
        audioController.clearAudio();

        var get_left = $(".Intro_module .innerWarpperarea").css("left");
        var get_left1 = get_left.split("px");
        var get_totalSlide = get_left1[0] - intro.Screen_width;
        $(".Intro_module .innerWarpperarea").css("left", get_totalSlide);
        // },1500);
        if (intro.getStatus[0].ST[1].S) {
          intro.screen2_animStop();
        } else {
          intro.screen2_anim();
          var getAudioName = $(".Intro_module .sCreenCount")
            .eq(intro.currentScreen - 1)
            .attr("audioName");
          audioController.playSecAudio(getAudioName);
        }
      } else if (intro.currentScreen == 3) {
        //$('.Intro_module #myVideo3')[0].play();
        //intro.once_moved_to_3 = true;
        //$('.Intro_module .stbtncontner').removeClass('active');
        //$('.Intro_module .line3').removeClass('lineanim3');
        // intro.setTime6 = setTimeout(function(){
        //$('.overlayLeft2').removeClass('add');
        // },500);
        // intro.setTime7 = setTimeout(function(){
        intro.setDefaultposition();
        $("#section_backBtn").addClass("active");
        audioController.clearAudio();

        var get_left = $(".Intro_module .innerWarpperarea").css("left");
        var get_left1 = get_left.split("px");
        var get_totalSlide = get_left1[0] - intro.Screen_width;
        $(".Intro_module .innerWarpperarea").css("left", get_totalSlide);
        // },1500);
        if (intro.getStatus[0].ST[2].S) {
          intro.screen3_animStop();
        } else {
          intro.screen3_anim();
          var getAudioName = $(".Intro_module .sCreenCount")
            .eq(intro.currentScreen - 1)
            .attr("audioName");
          audioController.playSecAudio(getAudioName);
        }
      } else if (intro.currentScreen == 4) {
        $(".Intro_module #myVideo4")[0].play();
        intro.once_moved_to_4 = true;
        //$('.Intro_module .stbtncontner').removeClass('active');
        //$('.Intro_module .line4').removeClass('lineanim4');
        intro.setDefaultposition();
        $("#section_backBtn").addClass("active");
        audioController.clearAudio();

        var get_left = $(".Intro_module .innerWarpperarea").css("left");
        var get_left1 = get_left.split("px");
        var get_totalSlide = get_left1[0] - intro.Screen_width;
        $(".Intro_module .innerWarpperarea").css("left", get_totalSlide);
        if (intro.getStatus[0].ST[3].S) {
          intro.screen4_animStop();
        } else {
          intro.screen4_anim();
          var getAudioName = $(".Intro_module .sCreenCount")
            .eq(intro.currentScreen - 1)
            .attr("audioName");
          audioController.playSecAudio(getAudioName);
        }
      } else if (intro.currentScreen == 5) {
        if (!intro.screen5_Done) {
          //$('.Intro_module #myVideo5')[0].play();
          intro.once_moved_to_5 = true;
          //$('.Intro_module .stbtncontner').removeClass('active');
          //$('.Intro_module .line5').removeClass('lineanim5');
          intro.setDefaultposition();
          $("#section_backBtn").addClass("active");
          audioController.clearAudio();
          var getAudioName = $(".Intro_module .sCreenCount")
            .eq(intro.currentScreen - 1)
            .attr("audioName");
          audioController.playSecAudio(getAudioName);

          var get_left = $(".Intro_module .innerWarpperarea").css("left");
          var get_left1 = get_left.split("px");
          var get_totalSlide = get_left1[0] - intro.Screen_width;
          $(".Intro_module .innerWarpperarea").css("left", get_totalSlide);
          intro.screen5_anim();
        } else {
          intro.screen5_animStop();
        }
      } else if (intro.currentScreen == 6) {
        $(".Intro_module #myVideo6")[0].play();
        intro.once_moved_to_6 = true;
        //$('.Intro_module .stbtncontner').removeClass('active');
        //$('.Intro_module .line6').removeClass('lineanim6');
        intro.setDefaultposition();
        $("#section_backBtn").addClass("active");
        audioController.clearAudio();

        var get_left = $(".Intro_module .innerWarpperarea").css("left");
        var get_left1 = get_left.split("px");
        var get_totalSlide = get_left1[0] - intro.Screen_width;
        $(".Intro_module .innerWarpperarea").css("left", get_totalSlide);

        if (intro.getStatus[0].ST[5].S) {
          intro.screen6_animStop();
        } else {
          intro.screen6_anim();
          var getAudioName = $(".Intro_module .sCreenCount")
            .eq(intro.currentScreen - 1)
            .attr("audioName");
          audioController.playSecAudio(getAudioName);
        }
      } else if (intro.currentScreen == 7) {
        intro.once_moved_to_7 = true;
        intro.setDefaultposition();
        audioController.clearAudio();

        var get_left = $(".Intro_module .innerWarpperarea").css("left");
        var get_left1 = get_left.split("px");
        var get_totalSlide = get_left1[0] - intro.Screen_width;
        $(".Intro_module .innerWarpperarea").css("left", get_totalSlide);

        if (intro.getStatus[0].ST[6].S) {
          intro.screen7_animStop();
        } else {
          intro.screen7_anim();
          var getAudioName = $(".Intro_module .sCreenCount")
            .eq(intro.currentScreen - 1)
            .attr("audioName");
          audioController.playSecAudio(getAudioName);
        }
      } else {
        intro.setDefaultposition();
        $("#section_backBtn").addClass("active");
        audioController.clearAudio();
        var getAudioName = $(".Intro_module .sCreenCount")
          .eq(intro.currentScreen - 1)
          .attr("audioName");
        audioController.playSecAudio(getAudioName);

        var get_left = $(".Intro_module .innerWarpperarea").css("left");
        var get_left1 = get_left.split("px");
        var get_totalSlide = get_left1[0] - intro.Screen_width;
        $(".Intro_module .innerWarpperarea").css("left", get_totalSlide);
      }
    }

    $(".pagecount").html(
      intro.currentScreen + "&nbsp;&nbsp;/&nbsp;&nbsp;" + intro.SkrnCount + ""
    );

    /*if (intro.currentScreen == 5) {
            if ($('.Intro_module .overlayLeft2').hasClass('add2')) {
                $('.Intro_module .overlayLeft2').removeClass('add2');
            }
            if ($('.Intro_module .line2').hasClass('lineanim2')) {
                $('.Intro_module .line2').removeClass('lineanim2');
            }
            if ($('.Intro_module .overlayLeft4').hasClass('add4')) {
                $('.Intro_module .overlayLeft4').removeClass('add4');
            }
            if ($('.Intro_module .line4').hasClass('lineanim4')) {
                $('.Intro_module .line4').removeClass('lineanim4');
            }
            if ($('.Intro_module .overlayLeft6').hasClass('add6')) {
                $('.Intro_module .overlayLeft6').removeClass('add6');
            }
            if ($('.Intro_module .line6').hasClass('lineanim6')) {
                $('.Intro_module .line6').removeClass('lineanim6');
            }
        }*/
    model.userSlideN = intro.currentScreen;

    switch (intro.currentScreen) {
      case 2:
        intro.active_Firstmenu();
        break;
      case 3:
        intro.active_Secondmenu();
        break;
      case 4:
        intro.active_Thirdmenu();
        break;
      case 5:
        intro.active_Thirdmenu();
        break;
      case 6:
        intro.active_Fourthmenu();
        break;
      case 7:
        intro.active_Fourthmenu();
        break;
    }

    intro.resizeEle();
    controller.slideVistedStFn();
  },

  sendBookMrkData: function (num) {
    var secID = "intro";
    var curScr = intro.currentScreen - num;
    $.each(model.screenStatusData, function (k, v) {
      if (v.T == secID) {
        v.ST[curScr].S = true;
        controller.updateSaveData();
        return false;
      }
    });
  },

  animnextscreen1Done: function () {
    if (intro.currentScreen == 2) {
    } else {
      if (!intro.once_moved_to_2) {
        $("#section_nextBtn").trigger("click");
        intro.once_moved_to_2 = true;
      }
      $("#section_nextBtn").addClass("nextBlink active");
    }

    // intro.setTime1 = setTimeout(function() {
    // intro.play_nextfunction();
    // $("#interactiveVideo").get(0).play();
    // $(".overlayLeft2").addClass("add2");
    // }, 2000);
    // model.isPause = true;
    // audioController.muteAudio()
    // $('#audioOnOff').addClass("audioOFF").removeClass("audioON");
    // model.isMute = true;
  },
  resizeEle: function () {
    if ($(window).width() >= 1920) {
      intro.Screen_width = 1920;
      intro.Screen_height = 969;
    } else if ($(window).width() > 1366 && $(window).width() < 1920) {
      intro.Screen_width = 1920;
      intro.Screen_height = 969;
    } else if ($(window).width() <= 1366) {
      intro.Screen_width = 1920;
      intro.Screen_height = 969;
    }
    intro.setLineHeight();
    intro.resSlideMaindiv(intro.get_attr1);

    //  intro.Screen_width = $(window).width();
    var wrap_width = intro.SkrnCount * intro.Screen_width;
    $(".Intro_module .innerWarpperarea").css("width", wrap_width + "px");
    $(".Intro_module .innerWarpperarea").css(
      "left",
      "-" + (intro.currentScreen - 1) * intro.Screen_width + "px"
    );
    $(".Intro_module .sCreenCount").css("width", intro.Screen_width + "px");
    for (i = 1; i <= intro.SkrnCount; i++) {
      var left_margin = intro.Screen_width * (i - 1);
      $(".Intro_module #screen" + i).css("left", left_margin + "px");
    }
  },
  resSlideMaindiv: function (val) {
    if (intro.Screen_width >= 1920) {
      intro.resAddsectionClass(val, intro.Screen_height);
    } else if (intro.Screen_width > 1366 && $(window).width() < 1920) {
      intro.resAddsectionClass(val, intro.Screen_height);
    } else if (intro.Screen_width <= 1366) {
      intro.resAddsectionClass(val, intro.Screen_height);
    }
  },
  resAddsectionClass: function (a, b) {
    // for (var i = 1; i < $(".section").length; i++) {
    //         $(".warpperarea").removeClass("section"+i+"_slide"+b);
    //     }
    if (a == 0) {
      $(".warpperarea").css("margin-top", 0);
    } else {
      var get_topM = -(a * b);
      $(".warpperarea").css("margin-top", get_topM);
    }
  },
  setLineHeight: function () {
    var screenHeight = 0;
    if ($(window).width() >= 1920) {
      screenHeight = 969;
    } else if ($(window).width() > 1366 && $(window).width() < 1920) {
      screenHeight = 969;
    } else if ($(window).width() <= 1366) {
      screenHeight = 969;
    }
    $(".mask, .mask2").css("height", screenHeight);
  },

  unloadPage: function () {
    console.log("page unloaded");
    model.tl.clear();
  },
  onComplete: function () {
    console.log("TL completed");
  },
  /****screen1****/
  screen1_anim: function () {
    intro.volumeBlue_active();
    $(".Intro_module .sCreenCount").removeClass("visibility_hidden");
    model.twinmaxstaggerToVal(
      ".Intro_module #scrn1_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      intro.screen1_video
    );
    model.twinmaxstaggerToVal(
      ".Intro_module #scrn1_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      93,
      null,
      null,
      0.6,
      intro.sec2_active_da
    );
    z=0;
    i=0;
  },
  screen1_video: function () {
    $(".mutebtn").removeAttr("hidden");
    $("#myVideo1_1").attr(
      "src",
      "content/video/en/m1_t1_p1/Real_Design_Principles.mp4"
    );
    $("#myVideo1_1").get(0).play();

    $("#myVideo1_1").attr("controls", "true");
  },
  sec2_active_da: function () {
    $(".mutebtn").css("display", "block");
    $("#mutebtn").css("display", "block");
    $("#section0 .Down_arrowIcon").removeClass("disable");
    $("#section0 .Down_arrowIcon").addClass("bounce");
    //model.verticalScreenStatusData[0] = true;
  },
  screen1a_animStop: function () {
    intro.volumeBlue_active();
    $(".Intro_module .sCreenCount").removeClass("visibility_hidden");
    model.twinmaxstaggerToVal(
      ".Intro_module #scrn1_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      ".Intro_module #scrn1_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },

  /*scrn1_1Done: function() {
        $('.Intro_module .overlayLeft').addClass('add');
        model.twinmaxstaggerToVal(".Intro_module #scrn1_2", 0.5, 0, 0, 1, Linear.easeNone, 0.5, null, null, 0.6, intro.scrn1_2Done);
    },*/
  // scrn1_2Done: function() {
  //     $('.Intro_module .line').addClass('lineanim');
  //     model.twinmaxstaggerToVal(".Intro_module #scrn1_3", 0.5, 0, 0, 1, Linear.easeNone, 3, null, null, 0.6, null);
  //     model.twinmaxstaggerToVal(".Intro_module #scrn1_4", 0.5, 0, 0, 1, Linear.easeNone, 3.5, null, null, 0.6, null);
  //     model.twinmaxstaggerToVal(".Intro_module #scrn1_5", 0.5, 0, 0, 1, Linear.easeNone, 7, null, null, 0.6, intro.scrn1_3Done);
  // },
  // scrn1_3Done: function() {
  //     if(!intro.once_moved_to_1){
  //         intro.once_moved_to_1= true;
  //         $(".startDivWrap").fadeIn();
  //         var getAudioName = "m1_t1_p1_pop1_1";
  //         audioController.playSecAudio(getAudioName);
  //     }
  //     model.twinmaxstaggerToVal(".Intro_module #scrn1_6", 0.5, 0, 0, 1, Linear.easeNone, 1, null, null, 0.6, null);

  // },

  screen1a_anim: function () {
    model.verticalScreenStatusData[7] = true;
    $(".sidenav").css("top", "-13px");
    $("#myVideo1_1").get(0).pause();
    $("#intro").attr("id", "navintro");
    $("#dprinciple").attr("id", "dp");
    $("#dguidance").attr("id", "dg");
    spcolor = "White";
    $("#mtbtn").attr(
      "src",
      "content/pages/image/" + spcolor + "_" + spstatus + ".png"
    );
    $(".mutebtn").css("display", "block");
    model.twinmaxstaggerToVal(
      "#scrn1_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6
    );
    model.twinmaxstaggerToVal(
      "#scrn1_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_9",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      4,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_10",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      7.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_10a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      13.5,
      null,
      null,
      0.6,
      intro.screen111a_anim
    );
  },

  screen111a_anim: function () {
    // $("#section1 .btn-primary").removeClass("disable1");
    spcolor = "Blue";
    $("#mtbtn").attr(
      "src",
      "content/pages/image/" + spcolor + "_" + spstatus + ".png"
    );
    model.twinmaxSetVal("#scrn1_7a", 0, null, 0);
    model.twinmaxstaggerToVal(
      "#scrn1_11",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_12",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    // model.twinmaxstaggerToVal("#scrn1_12b", 0.5, 0, 0, 1, Linear.easeNone, 5, null, null, 0.6, null);
    model.twinmaxstaggerToVal(
      "#scrn1_13",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_14",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      3,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_15",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      8,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_16",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_17",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_18",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      5,
      null,
      null,
      0.6,
      intro.screen1a_animDone
    );
  },
  screen1a_animDone: function () {
    // $("#section1 .btn-primary").removeClass("disable2");
    $("#section1 .Down_arrowIcon").removeClass("disable");
    $("#section1 .Down_arrowIcon").addClass("bounce");
  },

  screen1a_animStop: function () {
    model.verticalScreenStatusData[7] = true;

    model.twinmaxstaggerToVal(
      "#scrn1_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_9",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_10",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_10a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_11",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_12",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_13",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_14",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_15",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_16",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_17",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn1_18",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    // model.twinmaxstaggerToVal("#scrn1_12a", 0.5, 0, 0, 1, Linear.easeNone, 0, null, null, 0.6, null);
    // model.twinmaxstaggerToVal("#scrn1_12b", 0.5, 0, 0, 1, Linear.easeNone, 0, null, null, 0.6, null);
  },

  /****screen2****/
  screen2_anim: function () {
    intro.volumeBlue_Nonactive();
    $(".sidenav").css("top", "97px");
    $("#dp").attr("id", "dprinciple");
    $("#navintro").attr("id", "intro");
    $("#dguidance").attr("id", "dg");
    spcolor = "Blue";
    $("#mtbtn").attr(
      "src",
      "content/pages/image/" + spcolor + "_" + spstatus + ".png"
    );
    model.twinmaxstaggerToVal(
      "#scrn2_1a1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.7,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.6,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      5.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      7,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      intro.scrn2_1Done
    );
    model.twinmaxstaggerToVal(
      "#scrn2_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      14,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_9",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      22,
      null,
      null,
      0.6,
      intro.scrn2_2Done
    );

    model.twinmaxstaggerToVal(
      "#scrn2_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_11",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      10.5,
      null,
      null,
      0.6,
      intro.scrn2_2aDone
    );

    model.twinmaxstaggerToVal(
      "#scrn2_12",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      21,
      null,
      null,
      0.6,
      intro.scrn2_2bDone
    );

    model.twinmaxstaggerToVal(
      "#scrn2_13",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      21,
      null,
      null,
      0.6,
      intro.scrn2_2cDone
    );

    model.twinmaxstaggerToVal(
      "#scrn2_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      22,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_5a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      23.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_5b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      23,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_5c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      23.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_10",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      24,
      null,
      null,
      0.6,
      intro.scrn2_3Done
    );

    model.twinmaxstaggerToVal(
      "#scrn2_14",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      38,
      null,
      null,
      0.6,
      intro.scrn2_2dDone
    );
  },
  scrn2_2aDone: function () {
    $("#section1 .middle_div.step2 .cir2.cir .cir_Title p").fadeIn();
    $(".highlight").removeClass("highlighter");
    $(".cir2_highlighter").addClass("highlighter");
  },
  scrn2_2bDone: function () {
    $("#section1 .middle_div.step2 .cir3.cir .cir_Title p").fadeIn();
    $(".highlight").removeClass("highlighter");
    $(".cir3_highlighter").addClass("highlighter");
  },
  scrn2_2cDone: function () {
    $("#section1 .middle_div.step2 .cir4.cir .cir_Title p").fadeIn();
    $(".highlight").removeClass("highlighter");
    $(".cir4_highlighter").addClass("highlighter");
  },
  scrn2_2dDone: function () {
    model.verticalScreenStatusData[0] = true;
    $(".butons_div").removeClass("disable");
    $("#section2 .Down_arrowIcon").removeClass("disable");
    $("#section2 .Down_arrowIcon").addClass("bounce");
  },
  scrn2_1Done: function () {
    $(".middle_div").addClass("step2");
  },
  scrn2_2Done: function () {
    $(".middle_div").addClass("step3");
    $("#section1 .middle_div.step2 .cir1.cir .cir_Title p").fadeIn();
    $("#scrn2_6").fadeOut();

    if (!model.verticalScreenStatusData[0]) {
      $(".highlight").removeClass("highlighter");
      $(".cir1_highlighter").addClass("highlighter");
    }
  },
  scrn2_3Done: function () {
    $(".highlight").removeClass("highlighter");
    $(".middle_div").addClass("step4");
    $(".bubble_down").show();
  },
  screen2_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn2_1a1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_4d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_5a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_5b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_5c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_9",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_10",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_11",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn2_12",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_13",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );

    model.twinmaxstaggerToVal(
      "#scrn2_14",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },

  /****screen3****/
  screen3_anim: function () {
    model.verticalScreenStatusData[1] = true;
    spcolor = "White";
    $("#mtbtn").attr(
      "src",
      "content/pages/image/" + spcolor + "_" + spstatus + ".png"
    );
    model.twinmaxstaggerToVal(
      "#scrn3_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3d1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3d2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18.7,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_6a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19,
      null,
      null,
      0.6,
      intro.scale6aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn3_6b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19,
      null,
      null,
      0.6,
      intro.scale7aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn3_7b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18,
      null,
      null,
      0.6,
      intro.scr3Done
    );
  },
  scale6aDone: function () {
    $("#scrn3_6a").addClass("scale100");
  },
  scale7aDone: function () {
    $("#scrn3_7a").addClass("scale100");
  },
  scr3Done: function () {
    $("#section3 .Down_arrowIcon").removeClass("disable");
    $("#section3 .Down_arrowIcon").addClass("bounce");
  },
  /****screen4****/
  screen3_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn3_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.6,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3d1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_3d2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_6a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_6b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_7b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn3_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },
  /****screen4****/
  activeTab: function () {
    $(".col3_1.click_div1").removeClass("disable");
    // $("#section3 .click_icon").removeClass("disable");
    // $("#section3 .highlighter_div").removeClass("disable");
    $("#section3 .Down_arrowIcon").removeClass("disable");
    $("#section3 .Down_arrowIcon").addClass("bounce");
  },
  activeTabStop: function () {
    $("#section3 .Down_arrowIcon").removeClass("enable");
    $("#section3 .Down_arrowIcon").addClass("bounce");
  },
  volumeBlue_active: function () {
    $("#volcontrol").addClass("blue_volumeButton");
    $("#volcontrol").removeClass("green_volumeButton");
    $("#audiocontrolShow").addClass("blue_Button");
    $("#audiocontrolShow").removeClass("green_Button");

    $("#blue_volIcon").css("fill", "#10384f");
    $("#blue_volIcon1").css("fill", "#10384f");
    $("#blue_volIcon2").css("fill", "#10384f");
    $("#blue_volIcon3").css("fill", "#10384f");
    $("#blue_volIcon4").css("fill", "#10384f");
    $("#blue_volIcon5").css("fill", "#10384f");
    $("#blue_volIcon6").css("fill", "#10384f");
  },
  volumeBlue_Nonactive: function () {
    $("#volcontrol").addClass("green_volumeButton");
    $("#volcontrol").removeClass("blue_volumeButton");
    $("#audiocontrolShow").addClass("green_Button");
    $("#audiocontrolShow").removeClass("blue_Button");

    $("#blue_volIcon").css("fill", "#89d329");
    $("#blue_volIcon1").css("fill", "#89d329");
    $("#blue_volIcon2").css("fill", "#89d329");
    $("#blue_volIcon3").css("fill", "#89d329");
    $("#blue_volIcon4").css("fill", "#89d329");
    $("#blue_volIcon5").css("fill", "#89d329");
    $("#blue_volIcon6").css("fill", "#89d329");
  },
  scrn3_1Done: function () {
    //$('.overlayLeft2').addClass('add2');
    model.twinmaxstaggerToVal(
      ".Intro_module #scrn3_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      intro.scrn3_2Done
    );
  },

  scrn3_btnEnable: function () {
    if (!intro.once_moved_to_3) {
      intro.once_moved_to_3 = true;
      $("#screen3 .rightScreen .clickWrap.click1")
        .removeClass("disable")
        .addClass("active");
    }
  },

  /****screen4****/
  screen4_anim: function () {
    model.verticalScreenStatusData[2] = true;

    model.twinmaxstaggerToVal(
      "#scrn4_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3d3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3d1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3d2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19.7,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_6a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      20,
      null,
      null,
      0.6,
      intro.scale4_6aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn4_6b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      20,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      20,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      20,
      null,
      null,
      0.6,
      intro.scale4_7aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn4_7b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      20,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      19,
      null,
      null,
      0.6,
      intro.scr4Done
    );
  },
  scale4_6aDone: function () {
    $("#scrn4_6a").addClass("scale100");
  },
  scale4_7aDone: function () {
    $("#scrn4_7a").addClass("scale100");
  },
  scr4Done: function () {
    $("#section4 .Down_arrowIcon").removeClass("disable");
    $("#section4 .Down_arrowIcon").addClass("bounce");
  },
  /****screen4****/
  screen4_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn4_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3d3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3d1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_3d2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_6a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_6b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_7b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn4_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },
  /****screen4****/
  screen5_anim: function () {
    model.verticalScreenStatusData[3] = true;

    model.twinmaxstaggerToVal(
      "#scrn5_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3d1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3d2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      17.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      17,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      17.8,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_6a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18.1,
      null,
      null,
      0.6,
      intro.scale5_6aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn5_6b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18.1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18.1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18.1,
      null,
      null,
      0.6,
      intro.scale5_7aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn5_7b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      18.1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      17,
      null,
      null,
      0.6,
      intro.activeTab1
    );
  },
  scale5_6aDone: function () {
    $("#scrn5_6a").addClass("scale100");
  },
  scale5_7aDone: function () {
    $("#scrn5_7a").addClass("scale100");
  },
  activeTab1: function () {
    $(".col3_1.click_div1").removeClass("disable");

    // $("#section5 .click_icon1").removeClass("disable");
    // $("#section5 .highlighter_div1").removeClass("disable");

    $("#section5 .Down_arrowIcon").removeClass("disable");
    $("#section5 .Down_arrowIcon").addClass("bounce");
  },
  activeTab1Stop: function () {
    $("#section5 .Down_arrowIcon").removeClass("disable");
    $("#section5 .Down_arrowIcon").addClass("bounce");
  },
  scr5Done: function () {
    //$("#section4 .overview_div").removeClass("disable");
    $("#section5 .Down_arrowIcon").removeClass("disable");
    $("#section5 .Down_arrowIcon").addClass("bounce");
  },
  /****screen4****/
  screen5_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn5_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3d1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_3d2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_6a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_6b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_7b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn5_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      intro.activeTab1Stop
    );
  },
  /****screen4****/
  screen6_anim: function () {
    model.verticalScreenStatusData[4] = true;

    model.twinmaxstaggerToVal(
      "#scrn6_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3d1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3d2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      12.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      12,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      13,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_6a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      13.2,
      null,
      null,
      0.6,
      intro.scale6_6aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn6_6b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      13.2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      13.2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      13.2,
      null,
      null,
      0.6,
      intro.scale6_7aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn6_7b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      13.2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      12,
      null,
      null,
      0.6,
      intro.scr6Done
    );
  },
  scale6_6aDone: function () {
    $("#scrn6_6a").addClass("scale100");
  },
  scale6_7aDone: function () {
    $("#scrn6_7a").addClass("scale100");
  },
  scr6Done: function () {
    // $("#section5 .overview_div").removeClass("disable");
    $("#section6 .Down_arrowIcon").removeClass("disable");
    $("#section6 .Down_arrowIcon").addClass("bounce");
  },
  /****screen4****/
  screen6_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn6_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3d",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3d1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_3d2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_6a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_6b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_7a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_7b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn6_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },
  /****screen4****/
  screen7_anim: function () {
    model.verticalScreenStatusData[5] = true;
    $(".sidenav").css("top", "200px");
    $("#dg").attr("id", "dguidance");
    $("#dprinciple").attr("id", "dp");
    $("#navintro").attr("id", "intro");
    pcolor = "Blue";
    $("#mtbtn").attr(
      "src",
      "content/pages/image/" + spcolor + "_" + spstatus + ".png"
    );
    model.twinmaxstaggerToVal(
      "#scrn7_1a1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_9",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_9a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      4.8,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_10",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2.2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_11",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2.7,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_11a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      11,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_12",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_13",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      11,
      null,
      null,
      0.6,
      intro.screen7part1Done
    );
  },

  screen7part1Done: function () {
    $("#section1 .slidenew1").fadeOut();
    model.twinmaxSetVal("#scrn7_3", 0, null, 0);

    model.twinmaxstaggerToVal(
      "#scrn7_14",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_15",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_15a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      3,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_15b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_15c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_16",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_17",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      5.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_17a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_17b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6.3,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_17c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6.9,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_18",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      13,
      null,
      null,
      0.6,
      intro.screen7part3Done
    );
  },
  screen7part3Done: function () {
    // $("#section5 .overview_div").removeClass("disable");

    $("#section7 .Down_arrowIcon").removeClass("disable");
    $("#section7 .Down_arrowIcon").addClass("bounce");
  },
  /****screen4****/
  screen7_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn7_1a1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_9",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_9a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_10",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_11",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_12",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_13",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_14",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_15",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_15a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_15b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_15c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_16",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_17",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_17a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_17b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_17c",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn7_18",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },
  /****screen4****/
  screen8_anim: function () {
    model.verticalScreenStatusData[6] = true;

    model.twinmaxstaggerToVal(
      "#scrn8_1a1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      3,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_3a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      4,
      null,
      null,
      0.6,
      intro.scale8_3aDone
    );
    model.twinmaxstaggerToVal(
      "#scrn8_3b",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      5,
      null,
      null,
      0.6,
      intro.scale8_3bDone
    );
    model.twinmaxstaggerToVal(
      "#scrn8_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      7,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      3.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      4.2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_9",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      4.2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      8,
      null,
      null,
      0.6,
      intro.scr8Done
    );
  },
  scale8_3aDone: function () {
    $("#scrn8_3a").addClass("scale100");
  },
  scale8_3bDone: function () {
    $("#scrn8_3b").addClass("scale100");
  },
  scr8Done: function () {
    // $("#section5 .overview_div").removeClass("disable");

    $("#section8 .Down_arrowIcon").removeClass("disable");
    $("#section8 .Down_arrowIcon").addClass("bounce");
  },
  /****screen4****/
  screen8_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn8_1a1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_8",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn8_9",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },
  /****screen9****/
  screen9_anim: function () {
    model.verticalScreenStatusData[7] = true;

    model.twinmaxstaggerToVal(
      "#scrn9_1a1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1.2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      3,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      8,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      9,
      null,
      null,
      0.6,
      intro.scr7Done
    );
  },
  scr9Done: function () {
    // $("#section8 .overview_div").removeClass("disable");
  },
  /****screen9****/
  screen9_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn9_1a1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_1a",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn9_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },
  /****screen9****/
  /****screen9****/
  screen10_anim: function () {
    model.verticalScreenStatusData[8] = true;

    model.twinmaxstaggerToVal(
      "#scrn10_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      1.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      2,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      3,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      6,
      null,
      null,
      0.6,
      intro.scr7Done
    );
  },
  scr10Done: function () {
    $("#section9 .overview_div").removeClass("disable");
  },
  /****screen9****/
  screen10_animStop: function () {
    model.twinmaxstaggerToVal(
      "#scrn10_1",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_2",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_3",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_4",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_5",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_6",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
    model.twinmaxstaggerToVal(
      "#scrn10_7",
      0.5,
      0,
      0,
      1,
      Linear.easeNone,
      0.5,
      null,
      null,
      0.6,
      null
    );
  },
  /****screen9****/
  active_anim14: function () {
    model.verticalScreenStatusData[5] = true;
  },
  sec7func1: function () {
    $("#screen7 .ver_line").addClass("lineanim7");
  },
  sec7func2: function () { },
  sec7func3: function () {
    intro.sendBookMrkData(1);
  },

  btnActive: function () {
    if (intro.currentScreen == 1) {
      $(".Intro_module #scrn1_6.stbtncontner").addClass("active");
    }
    if (intro.currentScreen == 2) {
      $(".Intro_module #scrn2_7.stbtncontner").addClass("active");
    }
    if (intro.currentScreen == 3) {
      $(".Intro_module #scrn3_6.stbtncontner1").addClass("active");
    }
    if (intro.currentScreen == 4) {
      $(".Intro_module #scrn4_8.stbtncontner").addClass("active");
    }
    if (intro.currentScreen == 6) {
      $(".Intro_module #scrn6_7.stbtncontner").addClass("active");
    }
    if (intro.currentScreen == 7) {
      $(".Intro_module #scrn7_7.stbtncontner").addClass("active");
    }
    if (intro.currentScreen == 8) {
      $(".Intro_module #scrn8_7.stbtncontner").addClass("active");
    }
    if (intro.currentScreen == 9) {
      $(".Intro_module #scrn9_7.stbtncontner").addClass("active");
    }
    intro.sendBookMrkData(1);
  },
  btnCloseActive: function () {
    $(".Intro_module #scrn3a_7.closeWrap").addClass("active");
  },

  setDefaultposition: function () {
    model.twinmaxSetVal("#scrn1_1", 0, null, 0);
    model.twinmaxSetVal("#scrn1_2", 0, null, 0);

    model.twinmaxSetVal("#scrn1_1a", -20, null, 0);
    model.twinmaxSetVal("#scrn1_3", -20, null, 0);
    model.twinmaxSetVal("#scrn1_4", -20, null, 0);
    model.twinmaxSetVal("#scrn1_5", -20, null, 0);
    model.twinmaxSetVal("#scrn1_6", -20, null, 0);
    model.twinmaxSetVal("#scrn1_7", 0, 100, 0);
    model.twinmaxSetVal("#scrn1_7a", 0, null, 0);
    model.twinmaxSetVal("#scrn1_8", 0, 150, 0);
    model.twinmaxSetVal("#scrn1_9", 0, null, 0);
    model.twinmaxSetVal("#scrn1_10", 0, null, 0);
    model.twinmaxSetVal("#scrn1_10a", 20, null, 0);
    model.twinmaxSetVal("#scrn1_11", 0, null, 0);
    model.twinmaxSetVal("#scrn1_12", 0, -80, 0);
    model.twinmaxSetVal("#scrn1_12a", 20, null, 0);
    model.twinmaxSetVal("#scrn1_12b", 20, null, 0);
    model.twinmaxSetVal("#scrn1_13", 0, -60, 0);
    model.twinmaxSetVal("#scrn1_14", 0, -60, 0);
    model.twinmaxSetVal("#scrn1_15", 0, -60, 0);
    model.twinmaxSetVal("#scrn1_16", 0, -60, 0);
    model.twinmaxSetVal("#scrn1_17", 0, 100, 0);
    model.twinmaxSetVal("#scrn1_18", 20, null, 0);
    // model.twinmaxSetVal("#scrn1_19", 20, null, 0);

    model.twinmaxSetVal("#scrn2_1a1", -20, null, 0);
    model.twinmaxSetVal("#scrn2_1", -100, null, 0);
    model.twinmaxSetVal("#scrn2_2", 100, null, 0);
    model.twinmaxSetVal("#scrn2_3", -20, null, 0);
    model.twinmaxSetVal("#scrn2_4", -20, null, 0);
    model.twinmaxSetVal("#scrn2_4a", 0, -20, 0);
    model.twinmaxSetVal("#scrn2_4b", 0, -20, 0);
    model.twinmaxSetVal("#scrn2_4c", 0, -20, 0);
    model.twinmaxSetVal("#scrn2_4d", 0, -20, 0);
    model.twinmaxSetVal("#scrn2_5", -20, null, 0);
    model.twinmaxSetVal("#scrn2_5a", 70, null, 0);
    model.twinmaxSetVal("#scrn2_5b", 0, -70, 0);
    model.twinmaxSetVal("#scrn2_5c", -70, null, 0);
    model.twinmaxSetVal("#scrn2_6", 0, null, 0);
    model.twinmaxSetVal("#scrn2_7", 0, 100, 0);
    model.twinmaxSetVal("#scrn2_8", -20, null, 0);
    model.twinmaxSetVal("#scrn2_9", -20, null, 0);
    model.twinmaxSetVal("#scrn2_10", -20, null, 0);
    model.twinmaxSetVal("#scrn2_11", -20, null, 0);
    model.twinmaxSetVal("#scrn2_12", -20, null, 0);
    model.twinmaxSetVal("#scrn2_13", -20, null, 0);
    model.twinmaxSetVal("#scrn2_14", -20, null, 0);
    model.twinmaxSetVal("#scrn2_15", -20, null, 0);

    $("#section1 .middle_div.step2 .cir2.cir .cir_Title p").fadeOut();
    $(".highlight").addClass("highlighter");
    $(".cir2_highlighter").removeClass("highlighter");

    $("#section1 .middle_div.step2 .cir3.cir .cir_Title p").fadeOut();
    $(".highlight").addClass("highlighter");
    $(".cir3_highlighter").removeClass("highlighter");

    $("#section1 .middle_div.step2 .cir4.cir .cir_Title p").fadeOut();
    $(".highlight").addClass("highlighter");
    $(".cir4_highlighter").removeClass("highlighter");

    $(".butons_div").addClass("disable");

    $(".middle_div").removeClass("step2");

    $(".middle_div").removeClass("step3");
    $("#section1 .middle_div.step2 .cir1.cir .cir_Title p").fadeOut();
    $("#scrn2_6").fadeIn();

    $(".highlight").addClass("highlighter");
    $(".highlight").addClass("highlighter");
    $(".cir1_highlighter").removeClass("highlighter");
    $(".middle_div").removeClass("step4");
    $(".bubble_down").hide();

    model.twinmaxSetVal("#scrn3_1a", 0, 500, 0);
    model.twinmaxSetVal("#scrn3_1", 0, 500, 0);
    model.twinmaxSetVal("#scrn3_2", 0, 500, 0);
    model.twinmaxSetVal("#scrn3_3", -20, null, 0);
    model.twinmaxSetVal("#scrn3_3a", 0, null, 0);
    model.twinmaxSetVal("#scrn3_3b", 0, null, 0);
    model.twinmaxSetVal("#scrn3_3c", 0, -150, 0);
    model.twinmaxSetVal("#scrn3_3d", -80, null, 0);
    model.twinmaxSetVal("#scrn3_3d1", -80, null, 0);
    model.twinmaxSetVal("#scrn3_3d2", -80, null, 0);
    model.twinmaxSetVal("#scrn3_4", 0, -40, 0);
    model.twinmaxSetVal("#scrn3_5", 0, 180, 0);
    model.twinmaxSetVal("#scrn3_6", 0, null, 0);
    model.twinmaxSetVal("#scrn3_6a", 0, null, 0);
    model.twinmaxSetVal("#scrn3_6b", 0, null, 0);
    model.twinmaxSetVal("#scrn3_7", 0, null, 0);
    model.twinmaxSetVal("#scrn3_7a", 0, null, 0);
    model.twinmaxSetVal("#scrn3_7b", 0, null, 0);
    model.twinmaxSetVal("#scrn3_8", -20, null, 0);
    model.twinmaxSetVal("#scrn3_9", -20, null, 0);
    model.twinmaxSetVal("#scrn3_10", -20, null, 0);
    model.twinmaxSetVal("#scrn3_11", -20, null, 0);
    model.twinmaxSetVal("#scrn3_12", -20, null, 0);
    model.twinmaxSetVal("#scrn3_13", -20, null, 0);
    model.twinmaxSetVal("#scrn3_14", -20, null, 0);
    model.twinmaxSetVal("#scrn3_15", -20, null, 0);
    model.twinmaxSetVal("#scrn3_16", -20, null, 0);
    model.twinmaxSetVal("#scrn3_17", -20, null, 0);
    model.twinmaxSetVal("#scrn3_18", -20, null, 0);
    model.twinmaxSetVal("#scrn3_19", -20, null, 0);
    model.twinmaxSetVal("#scrn3_20", -20, null, 0);
    model.twinmaxSetVal("#scrn3_21", -20, null, 0);

    model.twinmaxSetVal("#scrn4_1a", 0, 500, 0);
    model.twinmaxSetVal("#scrn4_1", 0, 500, 0);
    model.twinmaxSetVal("#scrn4_2", 0, 500, 0);
    model.twinmaxSetVal("#scrn4_3", -20, null, 0);
    model.twinmaxSetVal("#scrn4_3a", 0, null, 0);
    model.twinmaxSetVal("#scrn4_3b", 0, null, 0);
    model.twinmaxSetVal("#scrn4_3c", 0, -150, 0);
    model.twinmaxSetVal("#scrn4_3d", -80, null, 0);
    model.twinmaxSetVal("#scrn4_3d1", -80, null, 0);
    model.twinmaxSetVal("#scrn4_3d2", -80, null, 0);
    model.twinmaxSetVal("#scrn4_3d3", -80, null, 0);
    model.twinmaxSetVal("#scrn4_4", 0, -40, 0);
    model.twinmaxSetVal("#scrn4_5", 0, 180, 0);
    model.twinmaxSetVal("#scrn4_6", 0, null, 0);
    model.twinmaxSetVal("#scrn4_6a", 0, null, 0);
    model.twinmaxSetVal("#scrn4_6b", 0, null, 0);
    model.twinmaxSetVal("#scrn4_7", 0, null, 0);
    model.twinmaxSetVal("#scrn4_7a", 0, null, 0);
    model.twinmaxSetVal("#scrn4_7b", 0, null, 0);
    model.twinmaxSetVal("#scrn4_8", -20, null, 0);

    model.twinmaxSetVal("#scrn5_1a", 0, 500, 0);
    model.twinmaxSetVal("#scrn5_1", 0, 500, 0);
    model.twinmaxSetVal("#scrn5_2", 0, 500, 0);
    model.twinmaxSetVal("#scrn5_3", -20, null, 0);
    model.twinmaxSetVal("#scrn5_3a", 0, null, 0);
    model.twinmaxSetVal("#scrn5_3b", 0, null, 0);
    model.twinmaxSetVal("#scrn5_3c", 0, -150, 0);
    model.twinmaxSetVal("#scrn5_3d", -80, null, 0);
    model.twinmaxSetVal("#scrn5_3d1", -80, null, 0);
    model.twinmaxSetVal("#scrn5_3d2", -80, null, 0);
    model.twinmaxSetVal("#scrn5_4", 0, -40, 0);
    model.twinmaxSetVal("#scrn5_5", 0, 180, 0);
    model.twinmaxSetVal("#scrn5_6", 0, null, 0);
    model.twinmaxSetVal("#scrn5_6a", 0, null, 0);
    model.twinmaxSetVal("#scrn5_6b", 0, null, 0);
    model.twinmaxSetVal("#scrn5_7", 0, null, 0);
    model.twinmaxSetVal("#scrn5_7a", 0, null, 0);
    model.twinmaxSetVal("#scrn5_7b", 0, null, 0);
    model.twinmaxSetVal("#scrn5_8", -20, null, 0);
    model.twinmaxSetVal("#scrn5_9", -20, null, 0);
    model.twinmaxSetVal("#scrn5_10", -20, null, 0);
    model.twinmaxSetVal("#scrn5_11", -20, null, 0);
    model.twinmaxSetVal("#scrn5_12", -20, null, 0);
    model.twinmaxSetVal("#scrn5_13", -20, null, 0);
    model.twinmaxSetVal("#scrn5_14", -20, null, 0);
    model.twinmaxSetVal("#scrn5_15", -20, null, 0);
    model.twinmaxSetVal("#scrn5_16", -20, null, 0);
    model.twinmaxSetVal("#scrn5_17", -20, null, 0);
    model.twinmaxSetVal("#scrn5_18", -20, null, 0);
    model.twinmaxSetVal("#scrn5_19", -20, null, 0);
    model.twinmaxSetVal("#scrn5_20", -20, null, 0);
    model.twinmaxSetVal("#scrn5_21", -20, null, 0);

    model.twinmaxSetVal("#scrn6_1a", 0, 500, 0);
    model.twinmaxSetVal("#scrn6_1", 0, 500, 0);
    model.twinmaxSetVal("#scrn6_2", 0, 500, 0);
    model.twinmaxSetVal("#scrn6_3", -20, null, 0);
    model.twinmaxSetVal("#scrn6_3a", 0, null, 0);
    model.twinmaxSetVal("#scrn6_3b", 0, null, 0);
    model.twinmaxSetVal("#scrn6_3c", 0, -150, 0);
    model.twinmaxSetVal("#scrn6_3d", -80, null, 0);
    model.twinmaxSetVal("#scrn6_3d1", -80, null, 0);
    model.twinmaxSetVal("#scrn6_3d2", -80, null, 0);
    model.twinmaxSetVal("#scrn6_4", 0, -40, 0);
    model.twinmaxSetVal("#scrn6_5", 0, 180, 0);
    model.twinmaxSetVal("#scrn6_6", 0, null, 0);
    model.twinmaxSetVal("#scrn6_6a", 0, null, 0);
    model.twinmaxSetVal("#scrn6_6b", 0, null, 0);
    model.twinmaxSetVal("#scrn6_7", 0, null, 0);
    model.twinmaxSetVal("#scrn6_7a", 0, null, 0);
    model.twinmaxSetVal("#scrn6_7b", 0, null, 0);
    model.twinmaxSetVal("#scrn6_8", 20, null, 0);
    model.twinmaxSetVal("#scrn6_9", 20, null, 0);
    model.twinmaxSetVal("#scrn6_10", 20, null, 0);

    model.twinmaxSetVal("#scrn7_1a1", 0, 100, 0);
    model.twinmaxSetVal("#scrn7_1", 0, 100, 0);
    model.twinmaxSetVal("#scrn7_2", 0, 100, 0);
    model.twinmaxSetVal("#scrn7_3", 0, 100, 0);
    model.twinmaxSetVal("#scrn7_4", -20, null, 0);
    model.twinmaxSetVal("#scrn7_5", -20, null, 0);
    model.twinmaxSetVal("#scrn7_6", 20, null, 0);
    model.twinmaxSetVal("#scrn7_7", 0, null, 0);
    model.twinmaxSetVal("#scrn7_8", 0, -60, 0);
    model.twinmaxSetVal("#scrn7_9", 0, -60, 0);
    model.twinmaxSetVal("#scrn7_9a", 0, null, 0);
    model.twinmaxSetVal("#scrn7_10", 0, -60, 0);
    model.twinmaxSetVal("#scrn7_11", 0, -60, 0);
    model.twinmaxSetVal("#scrn7_12", 0, -150, 0);
    model.twinmaxSetVal("#scrn7_13", 20, null, 0);
    model.twinmaxSetVal("#scrn7_14", 0, 100, 0);
    model.twinmaxSetVal("#scrn7_15", 20, null, 0);
    model.twinmaxSetVal("#scrn7_15a", 0, -40, 0);
    model.twinmaxSetVal("#scrn7_15b", 0, -40, 0);
    model.twinmaxSetVal("#scrn7_15c", 0, -40, 0);
    model.twinmaxSetVal("#scrn7_16", -20, null, 0);
    model.twinmaxSetVal("#scrn7_17", 0, null, 0);
    model.twinmaxSetVal("#scrn7_17a", 0, null, 0);
    model.twinmaxSetVal("#scrn7_17b", 0, null, 0);
    model.twinmaxSetVal("#scrn7_17c", 0, null, 0);
    model.twinmaxSetVal("#scrn7_18", 20, null, 0);

    model.twinmaxSetVal("#scrn8_1a1", 0, 100, 0);
    model.twinmaxSetVal("#scrn8_1a", 0, 100, 0);
    model.twinmaxSetVal("#scrn8_1", 0, 100, 0);
    model.twinmaxSetVal("#scrn8_2", 0, 100, 0);
    model.twinmaxSetVal("#scrn8_3", -60, null, 0);
    model.twinmaxSetVal("#scrn8_3a", 0, null, 0);
    model.twinmaxSetVal("#scrn8_3b", 0, null, 0);
    model.twinmaxSetVal("#scrn8_4", 0, null, 0);
    model.twinmaxSetVal("#scrn8_5", 0, null, 0);
    model.twinmaxSetVal("#scrn8_6", -20, null, 0);
    model.twinmaxSetVal("#scrn8_7", 0, -100, 0);
    model.twinmaxSetVal("#scrn8_8", 0, null, 0);
    model.twinmaxSetVal("#scrn8_9", 0, null, 0);
    model.twinmaxSetVal("#scrn8_10", -20, null, 0);
    model.twinmaxSetVal("#scrn8_11", -20, null, 0);
    model.twinmaxSetVal("#scrn8_12", -20, null, 0);
    model.twinmaxSetVal("#scrn8_13", -20, null, 0);
    model.twinmaxSetVal("#scrn8_14", -20, null, 0);
    model.twinmaxSetVal("#scrn8_15", -20, null, 0);
    model.twinmaxSetVal("#scrn8_16", -20, null, 0);
    model.twinmaxSetVal("#scrn8_17", -20, null, 0);

    model.twinmaxSetVal("#scrn9_1a1", 0, 100, 0);
    model.twinmaxSetVal("#scrn9_1a", 0, 100, 0);
    model.twinmaxSetVal("#scrn9_1", 0, 100, 0);
    model.twinmaxSetVal("#scrn9_2", 0, -80, 0);
    model.twinmaxSetVal("#scrn9_3", 0, -60, 0);
    model.twinmaxSetVal("#scrn9_4", 0, -60, 0);
    model.twinmaxSetVal("#scrn9_5", 0, -60, 0);
    model.twinmaxSetVal("#scrn9_6", 0, -60, 0);
    model.twinmaxSetVal("#scrn9_7", -20, null, 0);

    model.twinmaxSetVal("#scrn10_1", -20, null, 0);
    model.twinmaxSetVal("#scrn10_2", 20, null, 0);
    model.twinmaxSetVal("#scrn10_3", -20, null, 0);
    model.twinmaxSetVal("#scrn10_4", -20, null, 0);
    model.twinmaxSetVal("#scrn10_5", -20, null, 0);
    model.twinmaxSetVal("#scrn10_6", -20, null, 0);
    model.twinmaxSetVal("#scrn10_7", -20, null, 0);
  },
  anim1Done: function () { },
};
