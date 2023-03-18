var controlsHandeler = {
    menuBtn: '',
    backBtn: '',
    nextBtn: '',
    sliderOpenCloseBtn: '',
    playPauseBtn: '',
    audioBtn: '',
    audioPausePlayBtn: '',
    resourceBtn: '',
    glossaryBtn: '',
    glossaryExitBtn: '',
    searchBtn: '',
    bottomControls: '',
    nextEnabled: true,
    backEnabled: true,
    bottomSliderToggle: true,
    helpBtn: '',
    helpExitBtn: '',
    closeBtn: '',
    courseTitle: '',
    paraNextBtn: '',
    paraBackBtn: '',
    reloadBtn: '',
    paraNextEnabled: true,
    paraBackEnabled: true,
    playPauseEnabled: true,
    glossaryPopUp: '',
    resourcePopUp: '',
    rearchPopUp: '',
    menuPopUp: '',
    searchPopupBtn: '',
    transcriptBtn: '',
    transcriptBtnExit: '',
    transcriptPrintBtn: '',
    couresExitBtn: '',
    exitCouresPopup: '',
    playerPageNumber: '',
    isOpen: false,
    audiobtnclk: '',
    varAssResAud: false,
    resourceExitBtn: '',
    hutclcBtn: '',
    homeSecBtn: '',
    homethrBtn: '',


    init: function() {
        this.menuBtn = $('#player_menuBtn');
        this.hutclcBtn = $('#hutClic');
        this.audiobtnclk = $('#audioOnOff');
        this.couresExitBtn = $('#player_exitBtn');
        this.exitCouresPopup = $('#player_exitCouresPopupWrapper');
        this.backBtn = $('.player_backBtn_style');
        this.nextBtn = $('.player_nextBtn_style');
        this.sliderOpenCloseBtn = $('#player_sliderOpenCloseBtn');
        this.playPauseBtn = $('#play_pause');
        this.audioBtn = $('#player_audioBtn');
        this.resourceBtn = $('#player_ResourcesBtn');
        this.transcriptBtn = $('#player_transcriptDilogBtn');
        this.audioPausePlayBtn = $('#audioOnOff');
        this.transcriptBtnExit = $('.transcipt_close');
        this.transcriptPrintBtn = $('#player_transcriptPrintBtn');
        this.glossaryBtn = $('#player_glossaryBtn');
        this.glossaryExitBtn = $('#shell_glossary_popup_exit');
        this.resourceExitBtn = $('#shell_resource_popup_exit');
        this.bottomControls = $('#player_floatingControls');
        this.courseTitle = $("#player_title");
        this.paraNextBtn = $("#player_paraNextBtn");
        this.paraBackBtn = $("#player_paraBackBtn");
        this.reloadBtn = $("#player_reloadPageBtn");
        this.searchBtn = $("#player_searchBtn");
        this.glossaryPopUp = $("#player_glossaryWrapper");
        this.resourcePopUp = $("#player_resourceWrapper");
        this.transcriptPopup = $("#transcriptDilogWrapper");
        this.menuPopUp = $("#player_menuWrapper");
        this.searchPopUp = $("#player_searchWrapper");
        this.searchPopupBtn = $("#player_searchPopupBtn");
        this.helpBtn = $('#player_helpBtn');
        this.helpExitBtn = $('#shell_help_popup_exit');
        this.closeBtn = $('#cross_button');
        this.helpPopUp = $("#player_helpWrapper");
        this.playerPageNumber = $("#player_pageNumber");

        this.homeSecBtn = $('#homeSec');
        this.homethrBtn = $('#homethr');
        this.hutclcBtn = $('#hutClic');
        this.hutclcBtn = $('#hutClic');

        this.makeBtnFunctional();
    },

    makeBtnFunctional: function() {
        this.hutclcBtn.click(this.Home);
        this.homeSecBtn.click(this.homeSec);
        this.homethrBtn.click(this.homethr);
        this.menuBtn.click(this.menuBtnClicked);
        this.couresExitBtn.click(this.couresExitBtnClicked);
        this.backBtn.click(this.backBtnClicked);
        this.nextBtn.click(this.nextBtnClicked);
        this.sliderOpenCloseBtn.click(this.sliderOpenCloseBtnClicked);
        this.audiobtnclk.click(this.audiobtnclkClicked);
        // this.playPauseBtn.click(this.playPauseBtnClicked);
        this.playPauseBtn.click(this.playPauseClickedDirectly);
        this.audioBtn.click(this.audioBtnClicked);
        this.resourceBtn.click(this.resourceBtnClicked);
        this.transcriptBtn.off('click').on('click', function() {controlsHandeler.transcriptBtnClicked()});
        this.audioPausePlayBtn.click(this.audioPausePlayBtnClicked);
        this.transcriptBtnExit.click(this.transcriptBtnExitClicked);
        this.transcriptPrintBtn.click(this.transcriptPrintBtnClicked);
        this.glossaryBtn.click(this.glossaryBtnClicked);
        this.glossaryExitBtn.click(this.glossaryExitBtnClicked);
        this.resourceExitBtn.click(this.resourceExitBtnClicked);
        this.paraNextBtn.click(this.paraNextBtnClicked);
        this.paraBackBtn.click(this.paraBackBtnClicked);
        this.reloadBtn.click(this.reloadBtnClicked);
        this.searchBtn.click(this.searchBtnClicked);
        this.searchPopupBtn.click(this.searchPopupBtnClicked);
        this.helpBtn.click(this.helpBtnClicked);
        this.helpExitBtn.click(this.helpExitBtnClicked);
        this.closeBtn.click(this.closeBtnClicked);
        this.playerPageNumber.focus(this.playerPageNumberFocus).keypress(this.playerPageNumberKeypress).focusout(this.playerPageNumberFocusout);
        // this.playerPageNumber.keyup(this.playerPageNumberKeyUp);
    },

    homethr: function() {
        model.showPage(1, 3, 1);
        $(this).css({ 'pointer-events': 'none' });
        $('#homefiv').css({ 'pointer-events': 'auto' });
        $('#homefor').css({ 'pointer-events': 'auto' });
        $('#homeSic').css({ 'pointer-events': 'auto' });
        $('#homeSec').css({ 'pointer-events': 'auto' });
        $('#hutClic').css({ 'pointer-events': 'auto' });

    },

    homeSec: function() {
        model.showPage(1, 2, 1);
        $(this).css({ 'pointer-events': 'none' });
        $('#homefiv').css({ 'pointer-events': 'auto' });
        $('#homefor').css({ 'pointer-events': 'auto' });
        $('#homethr').css({ 'pointer-events': 'auto' });
        $('#homeSic').css({ 'pointer-events': 'auto' });
        $('#hutClic').css({ 'pointer-events': 'auto' });
    },

    Home: function() {
        model.showPage(1, 1, 3);
        $('#homefiv').css({ 'pointer-events': 'auto' });
        $('#homefor').css({ 'pointer-events': 'auto' });
        $('#homethr').css({ 'pointer-events': 'auto' });
        $('#homeSec').css({ 'pointer-events': 'auto' });
        $('#homeSic').css({ 'pointer-events': 'auto' });

    },

    stageEventAdded: function(bool) {
        if (bool) {
            $(".player_content #pageDiv").on("click", controlsHandeler.menuBtnClicked)
        } else {
            $(".player_content #pageDiv").off("click", controlsHandeler.menuBtnClicked)
        }
    },


    menuBtnClicked: function() {


        if (!model.freezButtns) {
            $(".footer").toggleClass("zindexdv");
            if ($("#shell_e_ppopup").hasClass('on')) {
                $("#shell_e_ppopup").removeClass('on');
                $("#shell_no_btn").trigger("click");
            }
            if (!model.isPause) {
                controlsHandeler.playPauseBtnClicked();
            }

            controlsHandeler.isOpen = !controlsHandeler.isOpen;
            // $(this).toggleClass("cldv").attr('title', 'close');

            if ($(this).hasClass('cldv')) {
                $(this).removeClass("cldv").attr('title', 'Menu');
                $("#player_backBtn, #player_nextBtn").removeClass("z_index_button");
            } else {
                $(this).addClass("cldv").attr('title', 'Close');
                $("#player_backBtn, #player_nextBtn").addClass("z_index_button");

            }
            $(".tree_wrapper .enscroll-track").toggleClass("menuslider");
            //$(this).prop('title', 'close')
            $('#player_menuBtn').css('pointer-events', 'none')
            setTimeout(function() { $('#player_menuBtn').css('pointer-events', 'auto') }, 1200);
            $(".mp-menu ul li").removeClass("loo_main");
            $("#treeMenu li").find("a.curSelectedNode").parent("#treeMenu li").addClass("loo_main");
            controlsHandeler.menuPopUp.toggleClass("slidemenu");

            $('.playerCenterBtns, #treeMenu, #treemenu_image,  .helpBtnContainer').toggleClass('on');
            $('.footer').toggleClass('on', 1000);
            $(".menu_bg,.menuSome").toggleClass("grow");
            $(".main_title").toggleClass("on", 1000);
            $(".main_title .logo_container").toggleClass("on", 800);
            topic = model.currentTopic;

            for (i = 0; i <= $('#treeMenu > li').length; i++) {
                if (i == topic) {
                    $('#treemenu_image img').attr('src', 'content/images/pages/menu/' + topic + '.jpg');
                }
            }
            $("#treeMenu > li").off("click").on('click', function() {
                topic = $(this).index();
                //alert(topic)
                $('#treemenu_image img').attr('src', 'content/images/pages/menu/' + (topic + 1) + '.jpg');
            });

            $('.offset_menu').removeClass('offset_menu')
            $('#treeMenu > li').eq(model.currentTopic - 1).find('ul > li').eq(model.currentPage - 1).addClass('offset_menu')

            //alert($('#treeMenu').offset().top + "  " +  $('.offset_menu').offset().top)

            if ($('#treeMenu').offset().top < $('.offset_menu').offset().top) {
                $('#treeMenu').animate({
                    scrollTop: $('.offset_menu').offset().top - 500
                }, 100);
            } else {
                $('#treeMenu').animate({
                    scrollTop: $('.offset_menu').offset().top
                }, 100);
            }

            // }



            controlsHandeler.setPlayPauseState(true);
        }

    },

    audiobtnclkClicked: function() {

        if ($('#audioOnOff').hasClass("disableBtnsUi")) { return; }
        if ($('#audioOnOff').hasClass("audioON")) {
            // $('#volcontrol').show();
            audioController.muteVideo()
            if (!model.isPause) {
                audioController.muteAudio()
            }
            $('#audioOnOff').addClass("audioOFF").removeClass("audioON");
            model.isMute = true;

        } else {
            // $('#volcontrol').hide();
            audioController.unmuteVideo()
            if (!model.isPause) {
                audioController.unmuteAudio()
            }
            $('#audioOnOff').addClass("audioON").removeClass("audioOFF");
            model.isMute = false;

        }


    },

    couresExitBtnClicked: function() {
        if (!model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }
        controlsHandeler.exitCouresPopup.dialog("open");
    },

    backBtnClicked: function() {
         if(model.wheelNav){
            return
        }
        model.wheelNav = true;
        model.varNavigationBtnClicked = "back";
       



        $("#progressSlider").children().css("width", "auto");

        $('#player_content').removeClass('player_content').addClass('rem').after('<div id="player_content" class="player_content_style player_content" style="" ></div>');
        if (controlsHandeler.backEnabled) {
            controlsHandeler.setState("backBtn", false);
            controlsHandeler.setState("nextBtn", false);
            /*var mod = model.currentModule;
            var topic = model.currentTopic;
            var page = model.currentPage;

            if (model.currentPage > 1) {
                page--;
            } else {
                if (topic > 1) {
                    topic--;
                    page = model.getTotalPagesInTopic(mod, topic);

                } else {
                    mod--;
                    topic = model.getTopicInModule(mod);
                    page = model.getTotalPagesInTopic(mod, topic);
                }
            }*/

            // reset the variables
            model.branchDnDPage = 1;
            model.isNav = false;

            model.jumpPage('prev');
            
            //model.showPage(mod, topic, page);
        }


        controlsHandeler.currentPageAnimation = model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].pageAnimation;
    },

    nextBtnClicked: function() {
        
        if(model.wheelNav){
            return
        }
        model.wheelNav = true;

        controlsHandeler.setState("backBtn", false);
        controlsHandeler.setState("nextBtn", false);
        
        $('.itextNext').fadeOut();

        var targetPage;

        $('#player_content').removeClass('player_content').addClass('rem').after('<div id="player_content" class="player_content_style player_content" style="" ></div>');

        if (model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].myNextTarget != undefined) {
            targetPage = Number(model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].myNextTarget.split(",")[2]);
        }

        if ($('.player_content #pageDiv').hasClass('topicLastPage')) {
            model.showPage(1, 1, 2);
            return;
        }

        if (model.isNav) {
            if (targetPage != undefined) {
                clearInterval(model.nextBlinkInterval);
                var mod = model.currentModule;
                var topic = model.currentTopic;
                model.isNav = false;
                return;
            } else {
                controlsHandeler.callNextPageFromMainNavigation();
                return;
            }
        }


        controlsHandeler.callNextPageFromMainNavigation();


        if (controlsHandeler.nextEnabled) {
            controlsHandeler.closeMenu() // close if menu open
            controlsHandeler.callNextPageFromMainNavigation();
        }
    },

    callNextPageFromMainNavigation: function() {

        model.varNavigationBtnClicked = "next";

        // this is for stopping the audio
        $("#progressSlider").children().css("width", "auto");
        //------------------------------------
        /*var mod = model.currentModule;
        var topic = model.currentTopic;
        var page = model.currentPage;
        if (model.currentPage < model.totalPagesInTopic) {
            page++;
        } else {
            if (topic < model.totalTopicInModule) {
                topic++;
                page = 1;
            } else {
                mod++;
                topic = 1;
                page = 1;
            }
        }*/
        //controlsHandeler.menuPopUp.hide('slide', {direction: 'down'}, 500);

        // reset the variables
        clearInterval(model.nextBlinkInterval);
        model.branchDnDPage = 1;
        model.isBranchedDnd = false;
        model.jumpPage('next');

        //model.showPage(mod, topic, page);
    },


    sliderOpenCloseBtnClicked: function() {
        var distance = controlsHandeler.bottomControls.width() - controlsHandeler.sliderOpenCloseBtn.width();
        if (controlsHandeler.bottomSliderToggle) {
            controlsHandeler.bottomControls.animate({
                'marginRight': -distance + 'px'
            }, 500);
            controlsHandeler.sliderOpenCloseBtn.removeClass().addClass("player_sliderOpenBtn");
        } else {
            controlsHandeler.bottomControls.animate({
                'marginRight': '0px'
            }, 500);
            controlsHandeler.sliderOpenCloseBtn.removeClass().addClass("player_sliderCloseBtn");
        }
        controlsHandeler.bottomSliderToggle = !controlsHandeler.bottomSliderToggle;
    },

    playPauseBtnClicked: function(e) {
        /* if (model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].target == 'm1_t6_p1') {
             if (model.VarAssesmentData != "") {
                controlsHandeler.playPausetab();
                 

             } else {
                 controlsHandeler.playPauseNormal();
             }
         } else {*/
        if (audioController.isPopupAudio) {
            controlsHandeler.playPausetab();
        } else {
            controlsHandeler.playPauseNormal();
        }

        //}

    },
    playPausetab: function() {
        //alert("ASdasdads")
        if (!audioController.isPopupAudio) return;

        if (!controlsHandeler.varAssResAud) {
            audioController.audioElement.get(0).pause();
            controlsHandeler.varAssResAud = true;
        } else {
            //alert("sdasd")
            audioController.audioElement.get(0).play();
            if ($('#audioOnOff').hasClass('audioON')) {
                audioController.audioElement.prop("volume", 1);
            } else {
                audioController.audioElement.prop("volume", 0);
            }
            controlsHandeler.varAssResAud = false;
        }
    },

    playPauseNormal: function() {

        //alert(model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].target)
        // var astr = model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].target
        // alert(controlsHandeler.playPauseEnabled)
        // if (!controlsHandeler.playPauseEnabled && astr != "m1_t1_p1") {
        //     return;
        // }
        //  alert(model.isPause+"  sss")
        if (model.isPause) {
            return;
        }
        // alert($('#play_pause').hasClass("playBtn"))
        if ($('#play_pause').hasClass("playBtn")) {
            audioController.playAudio()
            $('#play_pause').addClass("pauseBtn").removeClass("playBtn");
            $('#progressOverlay').hide();
            TweenMax.to(model.tl, 0, {
                timeScale: 1
            })
        } else {
            $('#progressOverlay').show();
            audioController.pauseAudio();
            $('#play_pause').addClass("playBtn").removeClass("pauseBtn");
            //if(model.currentPageType !="interactive"){          
            TweenMax.to(model.tl, 0, {
                timeScale: 0
            })
            //}

        }
    },

    playPauseClickedDirectly: function(e) {
        if (!controlsHandeler.playPauseEnabled) {
            return;
        }

        if ($('#play_pause').hasClass("playBtn")) {
            model.isPause = false;
            audioController.playAudio()
            $('#progressOverlay').hide();
            $('#play_pause').addClass("pauseBtn").removeClass("playBtn");
            TweenMax.to(model.tl, 0, {
                timeScale: 1
            })
        } else {
            model.isPause = true;
            audioController.pauseAudio();
            $('#progressOverlay').show();
            $('#play_pause').addClass("playBtn").removeClass("pauseBtn")
            TweenMax.to(model.tl, 0, {
                timeScale: 0
            })

        }
    },

    audioBtnClicked: function() {
        if (model.isMute) {
            controlsHandeler.audioBtn.removeClass().addClass("player_audioBtn_class");
        } else {
            controlsHandeler.audioBtn.removeClass().addClass("player_audioDisableBtn_class");
        }
        model.isMute = !model.isMute;
        controller.toggleMute();
    },



    transcriptBtnClicked: function() {

        setTimeout(function() {
            $(".transcript_Container_inner").scrollTop(0);
        }, 100);

        if ($("#player_transcriptDilogBtn").hasClass('disableBtnsUi')) {
            return
        }
        if (!model.freezButtns) {
            if (model.isTranscriptPopup === false) {
                controlsHandeler.transcriptPopup.dialog("open");
                model.isTranscriptPopup = true;
                controlsHandeler.transcriptBtn.addClass('activeTranscript');
                $("#transcript_Container").fadeIn();
            } else {
                controlsHandeler.transcriptPopup.dialog("close");
                model.isTranscriptPopup = false;
                $('#player_transcriptDilogBtn').removeClass('activeTranscript');
                $("#transcript_Container").fadeOut();
            }
        }
    },
    transcriptBtnExitClicked: function() {
        controlsHandeler.transcriptPopup.dialog("close");
        model.isTranscriptPopup = false;
        $('#player_transcriptDilogBtn').removeClass('activeTranscript');
        $("#transcript_Container").hide();
    },

    transcriptPrintBtnClicked: function() {
        var printData = model.getCurrentPageTranscript();
        var mywindow = window.open('', 'Transcript', 'height=500,width=600');
        mywindow.document.write('<html><head><title>Print Transcript</title></head><body>' + printData + '</body></html>');
        mywindow.print();
        mywindow.close();
    },

    glossaryBtnClicked: function() {

        if ($("#shell_e_ppopup").hasClass('on')) {
            $("#shell_e_ppopup").removeClass('on');
            $("#shell_no_btn").trigger("click");
        }
        controller.checkResourseCompletion()
        audioController.pauseVideo()
        if (!model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }

        $('#bg1, #glossaryPopup').addClass("active");
        // $('#content1').fadeIn(250).addClass("active");
    },

    glossaryExitBtnClicked: function() {
        audioController.playVideo()
         $(".sowaccord").slideUp('slow'); 
         $(".clickaccord").removeClass('rsdone');  
        if (!model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }

        $('#bg1, #glossaryPopup').removeClass("active");
        // $('#content1').hide().removeClass("active");
    },


    // for glossary btn click start here
    resourceBtnClicked: function() {

        if ($("#shell_e_ppopup").hasClass('on')) {
            $("#shell_e_ppopup").removeClass('on');
            $("#shell_no_btn").trigger("click");
        }
        if (!model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }
        $('#bg3, #resourcePopup').addClass("active");
        $('#content3').fadeIn(300).addClass("active");
    },

    // for glossary btn click end here

    // for glossary exit btn click start here
    resourceExitBtnClicked: function() {

        if (!model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }
        $('#bg3, #resourcePopup').removeClass("active");
        $('#content3').hide().removeClass("active");
    },

    // for glossary exit btn click end here


    // for glossary search start here
    glossarytextClear: function() {
        $("#myInput").val('');
        controlsHandeler.glossarySearch()


    },
    glossarySearch: function() {

        var input, filter, ul, li, a, i;
        input = $("#myInput");
        filter = input.val().toUpperCase();
        if (filter == "") {
            $('.SearchTextCross').hide();
        } else {
            $('.SearchTextCross').show();
        }
        ul = $("#myUL");
        li = $("#myUL li");

        for (i = 0; i < li.length; i++) {
            a = $(li).eq(i).find("a");
            if (a.text().toUpperCase().indexOf(filter) > -1) {
                $(li).eq(i).show();
            } else {
                $(li).eq(i).hide();

            }


        }

    },

    // for glossary search end here


    helpBtnClicked: function() {

        audioController.pauseVideo();
        if ($("#shell_e_ppopup").hasClass('on')) {
            $("#shell_e_ppopup").removeClass('on');
            $("#shell_no_btn").trigger("click");
        }
        if (!model.isPause) {

            controlsHandeler.playPauseBtnClicked();
        }
        $('#bg, #HelpDiv').addClass("active");
        $('#content').fadeIn(250).addClass("active");

    },

    helpExitBtnClicked: function() {

        audioController.playVideo();
        if (!model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }
        $('#bg, #HelpDiv').removeClass("active");
        $('#content').hide().removeClass("active");
    },
    closeBtnClicked: function() {
        /*if (!model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }*/
        // controlsHandeler.helpPopUp.dialog("open");
    },
    setCourseTitle: function() {
        this.courseTitle.text(model.courseTitle);
    },

    setState: function(btn, state) {
        if (btn == "nextBtn") {
            if (state) {
                this.nextBtn.removeClass("player_nextBtnDisabled_style").addClass("player_nextBtn_style");
            } else {
                this.nextBtn.removeClass("player_nextBtn_style").addClass("player_nextBtnDisabled_style");
            }
            this.nextEnabled = state;
        } else if (btn == "backBtn") {
            if (state) {
                this.backBtn.removeClass("player_backBtnDisabled_style").addClass("player_backBtn_style");
            } else {
                this.backBtn.removeClass("player_backBtn_style").addClass("player_backBtnDisabled_style");
            }
            this.backEnabled = state;
        }
    },

    paraNextBtnClicked: function() {
        if (controlsHandeler.paraNextEnabled) {
            // soundManager.stop('pageAudio' + (model.pageCurrentAudioCount - 1));
            // soundManager.stopAll();
            model.pageCurrentAudioCount++;
            controller.playNextAudio();
        } else {
            console.log("para next else");
        }

    },

    paraBackBtnClicked: function() {
        if (controlsHandeler.paraBackEnabled) {
            // soundManager.stopAll();
            animationController.hideWithAudioID(model.pageCurrentAudioCount);
            model.pageCurrentAudioCount--;
            controller.playNextAudio();
        } else {
            console.log("para back else");
        }
    },

    reloadBtnClicked: function() {

        if ($("#player_reloadPageBtn").hasClass('disableBtnsUi')) {
            return
        }

        


        $("#player_reloadPageBtn").css("display", "none");
        $("#play_pause").css("display", "block");
        model.varNavigationBtnClicked = "normal";
        if (!model.freezButtns) {

            // soundManager.stopAll();
            // animationController.hideAll();
            // model.pageCurrentAudioCount = 1;
            // controller.startPlayingAudio();
            // reset the variables
            model.branchDnDPage = 1;
            //model.isBranched = false;          
            model.branchId = 0;
            model.dragDropIndex = 0;

            clearInterval(model.nextBlinkInterval);
            controller.updateView();
        }


    },

    searchBtnClicked: function() {
        if (!model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }
        controlsHandeler.searchPopUp.dialog("open");
    },

    searchPopupBtnClicked: function() {
        var str = $('#player_searchInput').val();
        if (str != '') {
            $('#player_search_resultContainer').html('');
            search.doSearch(str.trim());
        }
    },

    playerPageNumberFocus: function(e) {
        $(this).val("");
    },
    playerPageNumberFocusout: function(e) {
        var val = $(this).val();
        if (isNaN(val)) {
            return;
        }
        if (val == "") {
            controller.updatePageCountText();
            return;
        }
        val = Number(val);
        if (val > model.courseXMLObj.coursePages.length) {
            val = model.courseXMLObj.coursePages.length;
        }
        var temp = model.courseXMLObj.coursePages[val - 1];
        model.showPage(temp.module, temp.topic, temp.page);
        $(controlsHandeler.playerPageNumber).blur();
    },
    playerPageNumberKeypress: function(e) {
        var val = $(controlsHandeler.playerPageNumber).val();
        var keyCode = e.which;
        if (keyCode != 48 && keyCode != 49 && keyCode != 50 && keyCode != 51 && keyCode != 52 && keyCode != 53 && keyCode != 54 && keyCode != 55 && keyCode != 57 && keyCode != 13) {
            e.stopPropagation();
            e.key = null;
            return false;
        } else if (keyCode === 13 && val != "") {
            if (val > model.courseXMLObj.coursePages.length) {
                val = model.courseXMLObj.coursePages.length;
            }
            console.log("model.courseXMLObj.coursePages: ", model.courseXMLObj.coursePages, val);
            var temp = model.courseXMLObj.coursePages[val - 1];
            model.showPage(temp.module, temp.topic, temp.page);
            $(controlsHandeler.playerPageNumber).blur();
        } else if (keyCode === 13) {
            e.stopPropagation();
            $(controlsHandeler.playerPageNumber).blur();
        }
    },


    setParaBtnState: function() {
        if (model.pageCurrentAudioCount <= 1) {
            this.paraBackEnabled = false;
            controlsHandeler.paraBackBtn.removeClass('player_paraBackBtn_style').addClass('player_paraBackBtnDisabled_style');
            // controlsHandeler.paraBackBtn.css("cursor", "default");
        } else {
            this.paraBackEnabled = true;
            controlsHandeler.paraBackBtn.removeClass('player_paraBackBtnDisabled_style').addClass('player_paraBackBtn_style');
        }

        // console.log(model.pageCurrentAudioCount >= model.pageTotalAudioCount);
        if (model.pageCurrentAudioCount >= model.pageTotalAudioCount) {
            this.paraNextEnabled = false;
            controlsHandeler.paraNextBtn.removeClass('player_paraNextBtn_style').addClass('player_paraNextBtnDisabled_style');
        } else {
            this.paraNextEnabled = true;
            controlsHandeler.paraNextBtn.removeClass('player_paraNextBtnDisabled_style').addClass('player_paraNextBtn_style');
        }
    },

    setPlayPauseState: function(bo) {
        if (bo) {

            $('#play_pause').removeClass('player_pauseBtnDisabled_style').addClass("player_pauseBtn_style");
        } else {
            $('#play_pause').removeClass('player_pauseBtn_style').addClass("player_pauseBtnDisabled_style");
        }

        controlsHandeler.playPauseEnabled = bo;

    }
};