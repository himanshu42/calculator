var custom = {
    clearTime: '',
    Attempts: 0,
    getCurrentSelectedLang: '',
    setTimeForTimeOut: [15000, 12000, 30000, 6000, 16000, 22000, 30000, 25000, 25000, 40000, 48000], //slide 1 time, slide 2 time, slide 3 time, slide 4 btn_1 click time, slide 4 btn_2 click time, slide 4 btn_3 click time,  slide 5 time, slide 6 time, slide 7 time, slide 8 time
    isQuizAnswered: false,
    shouldHintBtnCallNextPage: true,
    isNext: false,
    init: function () {
       // custom.getCountryLangByJSON();
       // custom.activeFullPageJs("#fullpage");
        custom.callWowAnimation();
        custom.createNavNextBackButton();
        custom.motionInMap(".mapHolder");
        custom.makePopupBox(".rgtBoxArea ul li img");
        custom.printPopupCon();
        custom.reportingDecl();
        custom.multipleSelection();
        custom.screenJump();
        custom.makeNavForced();
        custom.manageFullPageScroll(false);
        custom.popUpLetter();
    },

    activeFullPageJs: function (obj) {
        model.isexecuted = true;
        $(obj).fullpage({
            navigation: true,
            navigationPosition: 'right',
            // navigationTooltips: ['Home', 'Welcome', 'Chapter 1', 'Reporting Obligations', 'Safety and Quality Information Collected', 'Safety and Quality Information Collected', 'Quiz', 'Chapter 2', 'Handling of Relevant Information from Digital Activities', 'Chapter 3', 'Exchange of Safety and Quality Information with External Partners', 'Thank You'],

            afterLoad: function (anchorLink, index) {
                // if(API.getCurrentStatus() !="c"){
                //          API.setIncomplete();
                //  } 
                var get_index = index;
                model.pageIndex = index;
                console.log(index);
                custom.resetValuseOnSlide();
                clearTimeout(custom.clearTime);
                custom.setReverseAnimation();
                custom.checkSectionVisited(index);                 
                model.get_val = true; 
                 
                var st1 = setTimeout(function(){
                    $.fn.fullpage.setAllowScrolling(false, 'down'); 
                    $.fn.fullpage.setAllowScrolling(false, 'up'); 
                     
                    $.fn.fullpage.setKeyboardScrolling(false, 'down');                     
                    $.fn.fullpage.setKeyboardScrolling(false, 'up');

                    clearTimeout(st1);
                },10); 

                if (index == 1) {
                    var st2 = setTimeout(function(){
                        $.fn.fullpage.setAllowScrolling(false, 'down'); 
                        $.fn.fullpage.setAllowScrolling(false, 'up'); 
                        $.fn.fullpage.setKeyboardScrolling(false, 'down');                     
                        $.fn.fullpage.setKeyboardScrolling(false, 'up');
                        clearTimeout(st2)
                    },10); 
                }

                if (model.index == 4) {
                    $("#fp-nav .nextBtn").css("pointer-events", "none");
                } else {
                    $("#fp-nav .nextBtn").css("pointer-events", "auto");
                }

                if (model.pageIndex == 4 ) {                     
                    $("#fp-nav .nextBtn").css("pointer-events","none");
                }else{
                    $("#fp-nav .nextBtn").css("pointer-events","auto");
                }

                 

                if(index == 1){                   
                   
                    
                } else

                // var url = "content/audio/" + custom.getCurrentSelectedLang + "/" + "slide_" + index + ".mp3";

                if (index == 2) {
                    intro.setDefaultposition();
                    var st3 =  setTimeout(function(){  
                            intro.screen8_anim();                       
                            audioController.clearAudio();
                            var getAudioName1 = $("#section1").attr("audioName");
                            audioController.playSecAudio(getAudioName1);
                            clearTimeout(st3)
                    },500);
                    // second.slideAnimation();
                } else if (index == 3) {
                    intro.setDefaultposition();
                    var st4 =  setTimeout(function(){
                        intro.screen9_anim();
                        audioController.clearAudio();
                        var getAudioName1 = $("#section2").attr("audioName");
                        audioController.playSecAudio(getAudioName1);
                        clearTimeout(st4);
                    },500);
                    
                    // audioController.ajaxFunction(url,custom.thirdSlideAnimation);
                    //custom.thirdSlideAnimation();
                    // third.slideAnimation();

                } else if (index == 4) {
                    intro.setDefaultposition();
                    var st5 =  setTimeout(function(){
                        intro.screen10_anim();
                        audioController.clearAudio();
                        var getAudioName1 = $("#section3").attr("audioName");
                        audioController.playSecAudio(getAudioName1);
                        clearTimeout(st5);
                    },500);
                   
                    // audioController.ajaxFunction(url,custom.fourthSlideAnimation);
                    // custom.fourthSlideAnimation();
                   

                } else if (index == 5) {
                    intro.screen11_anim();
                    // audioController.ajaxFunction(url,custom.fifthSlideAnimation);
                    //custom.fifthSlideAnimation();
                    // fifth.slideAnimation();

                } else if (index == 6) {                    
                    $(".rightNavWrap .navWrap").eq(0).addClass("visited");
                    $(".rightNavWrap .navWrap").eq(1).addClass("visited");
                    $(".rightNavWrap .navWrap").eq(2).addClass("visited");
                    $(".rightNavWrap .navWrap").eq(3).addClass("visited");                    
                    $(".rightNavWrap .navWrap").removeClass("current");
                    $(".rightNavWrap .navWrap").eq(4).addClass("active current"); 

                    intro.setDefaultposition();
                    var st6 =  setTimeout(function(){
                        intro.screen12_anim();
                        audioController.clearAudio();
                        var getAudioName1 = $("#section5").attr("audioName");
                        audioController.playSecAudio(getAudioName1);
                        clearTimeout(st6);
                    },500);

                } else if (index == 7) {
                    //audioController.ajaxFunction(url,custom.seventhSlideAnimation);
                    // custom.seventhSlideAnimation();
                    $(".rightNavWrap .navWrap").removeClass("current");
                    $(".rightNavWrap .navWrap").eq(0).addClass("visited");
                    $(".rightNavWrap .navWrap").eq(1).addClass("visited");
                    $(".rightNavWrap .navWrap").eq(2).addClass("visited");
                    $(".rightNavWrap .navWrap").eq(3).addClass("visited");
                    $(".rightNavWrap .navWrap").eq(4).addClass("visited");
                                        
                    intro.setDefaultposition();
                    var st7 =  setTimeout(function(){
                     intro.screen13_anim();
                        audioController.clearAudio();
                        var getAudioName1 = $("#section6").attr("audioName");
                        audioController.playSecAudio(getAudioName1);
                        clearTimeout(st7);
                    },500);
                } else if (index == 8) { 

                    intro.setDefaultposition();
                    var st8 =  setTimeout(function(){
                        intro.screen14_anim();
                        audioController.clearAudio();
                        var getAudioName1 = $("#section7").attr("audioName");
                        audioController.playSecAudio(getAudioName1);
                        clearTimeout(st8);
                    },500);
                    // audioController.ajaxFunction(url,custom.eighthSlideAnimation);
                    // custom.eighthSlideAnimation();
                    
                } else if (index == 9) {
                    // audioController.ajaxFunction(url,custom.ninthSlideAnimation);
                    // custom.ninthSlideAnimation();
                } else if (index == 10) {
                    // audioController.ajaxFunction(url,custom.tenthSlideAnimation);
                    // custom.tenthSlideAnimation();
                } else if (index == 11) {
                    //  audioController.ajaxFunction(url,custom.eleventhSlideAnimation);
                    // custom.eleventhSlideAnimation();
                } else if (index == 12) {
                    //  audioController.ajaxFunction(url,custom.twelvSlideAnimation);
                    // custom.twelvSlideAnimation();
                }
                if (index == 8){
                    $(".rightNavWrap").hide();
                }else{
                    $(".rightNavWrap").show();
                }
            },
            load_Audio_End: function () {
                var kk1 = new afterLoad();
                kk1.get_index;
                $.fn.fullpage.moveSectionDown();
            },

            //responsiveWidth: 2000

        });
    },

    callWowAnimation: function () {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: function (box) {},
            scrollContainer: null
        });
        wow.init();
    },

    createNavNextBackButton: function () {
        
    },

    motionInMap: function (obj) {
        TweenMax.set($(obj), {
            x: -30,
            opacity: 1
        });
        TweenMax.staggerTo($(obj), 8, {
            x: 30,
            opacity: 1,
            ease: Linear.easeNone,
            delay: 0.1,
            repeat: -1,
            yoyo: true,
            timeScale: 0
        }, 0.1);
    },

    makeCarosalScreen: function (obj, loopVal, NavVal, autoplayVal, autoplayTimeoutVal, smartSpeedVal, itemInMob, itemInTab, itemInDesktop, autoHeightVal) {
        $(obj).owlCarousel({
            loop: loopVal,
            margin: 10,
            nav: NavVal,
            autoplay: autoplayVal,
            autoplayTimeout: autoplayTimeoutVal,
            smartSpeed: smartSpeedVal,
            autoHeight: autoHeightVal,
            touchDrag: false,
            mouseDrag: false,
            paginationNumbers: true,
            responsive: {
                0: {
                    items: itemInMob
                },
                600: {
                    items: itemInTab
                },
                1000: {
                    items: itemInDesktop
                }
            }
        });

    },

    makePopupBox: function (obj) {
        
    },
    oncompcall: function () {
       // alert("call");
    },

    openSecondSlideScreen: function () {

       
    },

    printPopupCon: function () {
        
    },

    reportingDecl: function () {

        
    },

    multipleSelection: function () {
        
    },

    screenJump: function () {
         
    },

    setDefaultAnimationPosition: function () {
        

    },


    fourthSlideAnimation: function () {
        
       
    },

    setBlueBGAnimation: function (obj) {
       

    },

    makeNavForced: function () {

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
    },

    manageFullPageScroll: function (val) {
        // $.fn.fullpage.setMouseWheelScrolling(val);
        // $.fn.fullpage.setAllowScrolling(val);
        // $.fn.fullpage.setKeyboardScrolling(val, 'up, down');
    },

    setLanguageSelectionScreenAnimation: function () {
        
    },

    languageSelectionScreenAnimation: function () {
        
    },

    animationForlangScreen: function () {
        
    },

    resetValuseOnSlide: function () {
        
    },

    autoSlide_1: function () {
        
        
    },

    autoSlide_2: function () {
        
        
    },

    autoSlide_3: function () {
        // alert()
        // TweenMax.set($(".layer_2"), {
        //     left: 580
        // });
        // TweenMax.staggerTo($(".layer_2"), 1.5, {
        //     left: 590,
        //     ease: Linear.easeNone,
        //     delay: 1,
        //     repeat: -1,
        //     yoyo: true
        // }, 0.7);
    },

    autoSlide_4: function () {
        
    },


    setprintPopupConentColor: function () {
        
    },
    
    setReverseAnimation: function () {
        
    },

    setReverseAnimation: function () {
       
    },
    checkSectionVisited: function (index) {
        

    },
    isPopUpOn: function () {
        $.fn.fullpage.setAllowScrolling(true, 'down');
        // $.fn.fullpage.setKeyboardScrolling(false, 'down')
        $.fn.fullpage.setAllowScrolling(true, 'up');
        // $.fn.fullpage.setKeyboardScrolling(false, 'up')

    },

    sliderslidedown: function (get_status) {
        
    },

    popUpLetter: function () {
       
    },

    getCountryLangByJSON: function(){
       
    }

}