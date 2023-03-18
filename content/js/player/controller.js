var controller = {
    content: '',
    contentAreaSize: '',
    isSoundManagerReady: false,
    isPlayerImagesLoaded: false,
    preLoadPageAudioCounter: 0,
    audioPopupClicked: false,
    audioPopupOpen: false,
    isFullAdapted: false,
    treeObj: {},
    currentPageObj: {},
    contentScale: 1,
    pageCurrentAudio:"",
   
    
    
    supportedSystems: {
        /*OS: {
            windows: {
                version: {
                    value: "7",
                    greaterVersion: false
                },
                version: {
                    value: "xp",
                    greaterVersion: false
                },
                version: {
                    value: "8",
                    greaterVersion: true
                },
                version: {
                    value: "vista",
                    greaterVersion: false
                }
            },
            mac: {
                version: {
                    value: "os x",
                    greaterVersion: false
                },
                version: {
                    value: "10.6",
                    greaterVersion: true
                }
            },
            ios: {
                version: {
                    value: "6",
                    greaterVersion: true
                }
            },
        },*/
        Browser: {
            ie: {
                version: {
                    value: "9"
                }
            },
            firefox: {
                version: {
                    value: "30"
                }
            },
            chrome: {
                version: {
                    value: "30"
                }
            },
            safari: {
                version: {
                    value: "5"
                }
            },
            opera: {
                version: {
                    value: "23"
                }
            }
        },
        Resolution: {
            width: "320",
            height: "460"
        }
    },

    init: function() {

        $(".player_container_style").show();
        if (device.iOS()) {
            $("#audioOnOff").addClass('disableBtnsUi');
            $("#player_audioBtn").css("display", "none");
            $("#player_audioBtnDivider").css("display", "none");
        }

        if (device.iPhone() || device.AndroidPhone()) {
            model.isIPhone = true;
        }
        model.isLocalStorageAvailable = isLocalStorage();
        window.onresize = this.playerSizeChanged;
        if (device.IE() && device.IE_version() < 9) {
            this.playerImgLoaded();
        } else {
            imageLoader.loadImages($('body'), this.playerImgLoaded);
        }
        /*todo: change 1*/
        events.createEvents();
        /*todo:  change 2*/
        model.audioElem = $("#player_audio").get(0);

        // $("#player_helpBtn").on("click", function() {
        //     $("#player_helpBtn span.menu_Active").hide();
        //     $("#player_helpBtn span.menu_Inactive").show();
        //     $("video").each(function() {
        //         $(this).get(0).pause();
        //     });
        //     TweenMax.to(model.tl, 2, {
        //         timeScale: 0
        //     })

        // });
        $("#shell_yes_btn").click(function() {
            window.top.close();
            $("#shell_e_ppopup").removeClass('on');
        });
        $("#cross_button").off('click').on("click", function() {
            audioController.pauseVideo();
            if ($("#shell_e_ppopup").hasClass('on')) { return; }
            if (!model.isPause) {
                controlsHandeler.playPauseBtnClicked();
            }
            $("#shell_e_ppopup").addClass('on');
            $("video").each(function() {
                $(this).get(0).pause();
            });
            // TweenMax.to(model.tl, 2, {
            //     timeScale: 0
            // })
        });
        $("#shell_no_btn").click(function() {
            audioController.playVideo();
            $("#shell_e_ppopup").removeClass('on');
            if (!model.isUserPaused) {
                controlsHandeler.playPauseBtnClicked();
            }
            /* $("video").each(function() {
                 if ($(this).parent().attr('id') != "splash") {
                     if (($(this).get(0).currentTime > 0) && ($(this).get(0).currentTime < $(this).get(0).duration)) {
                         $(this).get(0).play();
                     }

                 }
             });*/
            // TweenMax.to(model.tl, 2, {
            //     timeScale: (model.isPause ? 0 : 1)
            // });
        });

        this.adapted();
    },
    adapted: function() {
        var $el = $("#MainC");
        var elHeight = $el.outerHeight();
        var elWidth = $el.outerWidth();
        var $wrapper = $(window);
        controller.doResize();
    },
    doResize: function() {
        var $el = $("#MainC");
        var elHeight = $el.outerHeight();
        var elWidth = $el.outerWidth();
        var $wrapper = $(window);
        var scale;

        scale = Math.min(
            $wrapper.width() / elWidth,
            $wrapper.height() / elHeight
        );
        controller.contentScale = scale;
        if (($wrapper.width() == 1920) && controller.isFullAdapted != true) {
            $el.css({
                '-webkit-transform': 'translate(-50%, -50%)',
                '-moz-transform': 'translate(-50%, -50%)',
                '-ms-transform': 'translate(-50%, -50%)',
                '-o-transform': 'translate(-50%, -50%)',
                'transform': 'translate(-50%, -50%)'
            });
        } else {
            $el.css({
                '-webkit-transform': 'translate(-50%, -50%) scale(' + scale + ')',
                '-moz-transform': 'translate(-50%, -50%) scale(' + scale + ')',
                '-ms-transform': 'translate(-50%, -50%) scale(' + scale + ')',
                '-o-transform': 'translate(-50%, -50%) scale(' + scale + ')',
                'transform': 'translate(-50%, -50%) scale(' + scale + ')'
            });
        };
    },
    modelInitDone: function() {
        //debuggerController.init();
        if (device.IE_version() >= 9) {
            $("body").removeClass("notIE9");
        }
        // this.initDialogs();
        //debuggerController.log("controller.modelInitDone");
        if (model.isScorm) {
            this.initScorm();
        } else {
            model.setCurrent();
        }

        menuFunction();
        controller.treeObj = $.fn.zTree.getZTreeObj("treeMenu");
        controller.setMenuInitStatus();
        /*if (model.isForced == 1) {
            $('#MainC').addClass('forced')
        }*/
        if (model.isForced == 1) {
            controller.checkMenuStatus();
        }

    },


    setMenuInitStatus: function() {
        for (var i = 1; i <= model.courseXMLObj.totalModules; i++) {
            for (var j = 1; j <= model.courseXMLObj["mod_" + i].totalTopicInModule; j++) {
                for (var k = 1; k <= model.courseXMLObj["mod_" + i]["topic_" + j].totalPagesInTopic; k++) {
                    if (model.isForced == 1) {
                        $('#treeMenu > li').eq(j - 1).find('ul > li').eq(k - 1).find('a').addClass('menu_disabled')
                    }
                    if (model.courseXMLObj["mod_" + i]["topic_" + j]["page_" + k].status != 2) {
                        continue;
                    }
                    var temp = "m" + i + "_t" + j + "_p" + k;
                    var selectedNodes = controller.treeObj.getNodesByParam("id", temp);
                    if (selectedNodes[0].checked != true) {
                        controller.treeObj.checkNode(selectedNodes[0], "true", "true");
                    };
                }
            }
        }
    },
    checkCourseCompletion:function(){
        if(model.userSec == "outro" && model.userSlideN == 5){            
            SetLessonStatus("completed");
            doLMSCommit();
        }        
    },
    checkMenuStatus: function() {
        for (var i = 1; i <= model.courseXMLObj.totalModules; i++) {
            for (var j = 1; j <= model.courseXMLObj["mod_" + i].totalTopicInModule; j++) {

                if (model.courseXMLObj["mod_" + i]["topic_" + j].status == 2) {
                    $('#treeMenu > li').eq(j - 1).addClass("topiccheck");
                }
                for (var k = 1; k <= model.courseXMLObj["mod_" + i]["topic_" + j].totalPagesInTopic; k++) {

                    if (model.courseXMLObj["mod_" + i]["topic_" + j]["page_" + k].status == 2) {
                        $('#treeMenu > li').eq(j - 1).find('ul > li').eq(k - 1).find('a').removeClass('menu_disabled')
                        if (k == model.courseXMLObj["mod_" + i]["topic_" + j].totalPagesInTopic) {

                            $('#treeMenu > li').eq(j).find('ul > li').eq(0).find('a').removeClass('menu_disabled')
                        } else {

                            $('#treeMenu > li').eq(j - 1).find('ul > li').eq(k).find('a').removeClass('menu_disabled')
                        }
                    } else if (model.courseXMLObj["mod_" + i]["topic_" + j]["page_" + k].status == 1) {
                        $('#treeMenu > li').eq(j - 1).find('ul > li').eq(k - 1).find('a').removeClass('menu_disabled')
                    }

                }
            }
        }
    },

    setNuget: function() {

        if (model.currentTopic == 2) {

            $('.page_nav').fadeIn(1000);
            $('.fir_nug_yel').css({ 'display': 'block' });
            $('.sec_nug_yel').css({ 'display': 'none' });
            $('.thr_nug_yel').css({ 'display': 'none' });
            $('.for_nug_yel').css({ 'display': 'none' });
            $('.fiv_nug_yel').css({ 'display': 'none' });
        } else if (model.currentTopic == 4) {
            $('.page_nav').css({ 'display': 'block' });
            $('.fir_nug_yel').css({ 'display': 'none' });
            $('.thr_nug_yel').css({ 'display': 'block' });
            $('.sec_nug_yel').css({ 'display': 'none' });
            $('.for_nug_yel').css({ 'display': 'none' });
            $('.fiv_nug_yel').css({ 'display': 'none' });

        } else if (model.currentTopic == 3) {
            $('.page_nav').css({ 'display': 'block' });
            $('.sec_nug_yel').css({ 'display': 'block' });
            $('.for_nug_yel').css({ 'display': 'none' });
            $('.thr_nug_yel').css({ 'display': 'none' });
            $('.fiv_nug_yel').css({ 'display': 'none' });
            $('.fir_nug_yel').css({ 'display': 'none' });

        } else if (model.currentTopic == 5) {
            $('.page_nav').css({ 'display': 'block' });
            $('.sec_nug_yel').css({ 'display': 'none' });
            $('.fir_nug_yel').css({ 'display': 'none' });
            $('.thr_nug_yel').css({ 'display': 'none' });
            $('.fiv_nug_yel').css({ 'display': 'none' });
            $('.for_nug_yel').css({ 'display': 'block' });

        } else if (model.currentTopic == 6) {
            $('.page_nav').css({ 'display': 'block' });

            $('.for_nug_yel').css({ 'display': 'none' });
            $('.six_nug_yel').css({ 'display': 'none' });
            $('.fiv_nug_yel').css({ 'display': 'block' });
            $('.thr_nug_yel').css({ 'display': 'none' });
            $('.sec_nug_yel').css({ 'display': 'none' });
            $('.fir_nug_yel').css({ 'display': 'none' });

        } else {

            $('.page_nav').css({ 'display': 'none' });
        }
    },

    initScorm: function() {
        //debuggerController.init();
        //debuggerController.log("controller.initScorm");
        // Initialize();
        loadPage();
    },

    scormInitDone: function() {
        //debuggerController.log("controller.scormInitDone");
        model.setCurrent();
        controller.playerReady()
    },

    playerSizeChanged: function() {
        if ($(".player_content #pageDiv").hasClass("dragPage")) {
            if (model.dragDropIndex > 0) {
                $("#draggable").position({
                    my: "center",
                    at: "center",
                    of: $(".dotDiv" + (model.dragDropIndex))
                });

            } else {
                //model.visitedLi=[0,0,0,0,0,0];         
            }

        }

        //debuggerController.log("controller.playerSizeChanged");
        // if ($(window).width() < 900) {
        //     // alert("true");
        //    $('head').append('<meta name="viewport" content="width=900px, initial-scale=1"/>');
        // }
        if (model.isSplash) {
            var splashWidth = $(".player_container_style").width();
            var splashHeight = $(".player_container_style").height() + $(".player_middleNav").height();
            if (splashHeight > $("body").height()) {
                splashHeight = $("body").height();
            }
            // $("#splashContainer").height(splashHeight).width(splashWidth);
        }


        this.contentAreaSize = $(".player_container_style").height();
        //Change size and position of preloader to match that of player_content.


        console.log(" >>> preloader top >>  " + $("#player_content").offset().top);

        //  $("#player_preLoader").css("width", $("#player_content").width()).css("height", "720px").css("top", '40%').css('margin-top','-287px').css("left", $("#player_content").offset().left);
        //

        if ($(document).height() > $(document).width()) {
            model.isPortrait = true;
        } else {
            model.isPortrait = false;
        }

        if (model.isIPhone) {
            $("#player_backBtn").show();
            $("#player_nextBtn").show();
            $("#portraitControls").hide();
            $("header .player_topBtnDivider_2").hide();
            $("header .player_title_style").hide();
            $("#iphone_player_backBtn").show();
            $("#iphone_player_nextBtn").show();
            if (!model.isPortrait) {
                $("#phoneLandscapeMsg").hide();
                $("#splashContainer").hide();
            } else {
                $("#phoneLandscapeMsg").hide();
                $("#splashContainer").hide();
            }
        } else {
            if (model.isPortrait) {
                $("#portraitControls").show();
                $("#player_backBtn").show();
                $("#player_nextBtn").show();
                /*controlsHandeler.backBtn.css("margin-top", 0 + "px");
                controlsHandeler.nextBtn.css("margin-top", 0 + "px");*/
            } else {
                $("#portraitControls").hide();
                $("#player_backBtn").show();
                $("#player_nextBtn").show();
            }
        }


        if (model.isFloatingNavigation === true && !model.isPortrait && !model.isIPhone) {
            var topMargin = ((this.contentAreaSize - controlsHandeler.backBtn.height()) / 2) - $("#player_contentArea").offset().top;
            /* controlsHandeler.backBtn.css("margin-top", topMargin + "px");
             controlsHandeler.nextBtn.css("margin-top", topMargin + "px");*/
        };

        if (typeof pageVar != "undefined" && isFunction(pageVar.pageSizeChanged)) {
            pageVar.pageSizeChanged();
        }
        controller.initDialogs();
    },

    playerImgLoaded: function() {
        controller.isPlayerImagesLoaded = true;
        controller.controllerReady();
    },

    controllerReady: function() {
        if (this.isPlayerImagesLoaded) {
            audioController.init();
            // controlsHandeler.init();
            model.init();
        }
    },

    playerReady: function() {

        //debuggerController.log("controller.playerReady");
        if (model.isDebugger) {
            $("#player_debugger").css("display", "block");
        } else {
            $("#player_debugger").css("display", "none");
        }

        if (!model.isFloatingNavigation) {
            $("#player_backBtn").hide();
            $("#player_nextBtn").hide();
            $("#player_floatingControls").hide();
            $("footer").addClass("player_middleNav");
            $("#player_floatingControls").remove();
            $("#player_contentArea #player_backBtn").remove();
            $("#player_contentArea #player_nextBtn").remove();
        } else {
            $("#player_Controls").hide();
            $("#player_Controls").remove();
        }

        controlsHandeler.init();
        this.initDialogs();

        //this.content = $("#player_content");        

        this.playerSizeChanged();
        controlsHandeler.setCourseTitle();

        
        // if (device.isMobile() && !this.audioPopupClicked) {
        //     controller.audioPopupOpen = true;
        //     $('#player_audioPopupWrapper').dialog("open");
        // } else {
        //     controller.audioPopupClosed();
           
        // }

        controller.audioPopupClosed();

    },

    audioPopupClosed: function() {        
         language.init()
        // model.bookMarkData = "1**1**1"
        
    },

    initDialogs: function() {
        //debuggerController.log("controller.initDialogs");
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.6;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.7;

        if (model.isGlossary) {
            $("#player_glossaryWrapper").dialog({
                modal: true,
                width: dWidth,
                appendTo: (width != 1024) ? "#MainC" : "",
                height: dHeight,
                resizable: false,
                show: model.dilogEffect,
                autoOpen: false,
                title: "Resources",
                dialogClass: 'resources_class',
                position: {
                    my: "center",
                    at: "center"
                },
                beforeClose: function(event, ui) {
                    if (!model.isUserPaused) {
                        controlsHandeler.playPauseBtnClicked();
                    }
                }
            });
        } else {
            // $("#player_glossaryBtn").css("display", "none");
        }

        /*$("#player_bookmarkPopupWrapper").dialog({
            modal: true,
            resizable: false,
            show: model.dilogEffect,
            autoOpen: false,
            title: "Bookmark",
            position: {
                my: "center",
                at: "center"
            },
            open: function(event, ui) {
                $(".ui-dialog[aria-describedby='player_bookmarkPopupWrapper'] .ui-dialog-titlebar-close").hide();
            },
            beforeClose: function(event, ui) {
                model.showPage(model.currentModule, model.currentTopic, model.currentPage);
                // controller.closeBookmarkPopup();
            }
        });
*/
        if (model.isExitEnable === true) {
            $("#player_exitCouresPopupWrapper").dialog({
                modal: true,
                width: 300,
                height: 200,
                resizable: false,
                autoOpen: false,
                title: "Exit",
                position: {
                    my: "center",
                    at: "center"
                },
                buttons: {
                    "Yes": function() {
                        window.close();
                    },
                    "No": function() {
                        $(this).dialog('close');
                    }
                },
                beforeClose: function(event, ui) {
                    if (!model.isUserPaused) {
                        controlsHandeler.playPauseBtnClicked();
                    }
                }
            });
        } else {
            // controlsHandeler.couresExitBtn.hide();
            // $("#player_exitCouresPopupWrapper").hide();
        }
        windowInnerWidth = $('.player_container_style').width();
        windowMainWidth = $("body").width();
        percentTotalWidth = 100 * windowInnerWidth / windowMainWidth;
        NewPercentHeight = percentTotalWidth - 10;

        if (windowMainWidth > 1024) {
            dWidth = NewPercentHeight + "%";
        } else {
            dWidth = "90%";
        }
        $("#player_helpWrapper").dialog({
            modal: true,
            width: dWidth,
            appendTo: "#MainC",
            resizable: false,
            autoOpen: false,
            show: model.dilogEffect,
            dialogClass: 'player_helpWrapperClass',
            title: "Navigation help",
            position: {
                my: "center center",
                at: "center center",
                of: ".player_container_style"
            },
            beforeClose: function(event, ui) {

                if (!model.isUserPaused) {
                    controlsHandeler.playPauseBtnClicked();
                }
                $("video").each(function() {
                    if ($(this).parent().attr('id') != "splash") {
                        if (($(this).get(0).currentTime > 0) && ($(this).get(0).currentTime < $(this).get(0).duration)) {
                            $(this).get(0).play();
                        }

                    }
                });
            },
            close: function(event, ui) {

                TweenMax.to(model.tl, 2, {
                    timeScale: (model.isPause ? 0 : 1)
                })
            },
        });


        if (model.isResource) {
            $("#player_resourceWrapper").dialog({
                width: dWidth,
                height: dHeight,
                resizable: false,
                autoOpen: false,
                modal: true,

                show: model.dilogEffect,
                title: "Resource",
                position: {
                    my: "center",
                    at: "center"
                },
                beforeClose: function(event, ui) {
                    if (!model.isUserPaused) {
                        controlsHandeler.playPauseBtnClicked();
                    }
                }
            });
        } else {
            $("#player_resourceBtn").css("display", "none");
        }

        $("#player_searchWrapper").dialog({
            modal: true,
            width: dWidth,
            height: dHeight,
            resizable: false,
            autoOpen: false,
            show: model.dilogEffect,
            title: "Search",
            position: {
                my: "center",
                at: "center"
            },
            beforeClose: function(event, ui) {
                if (!model.isUserPaused) {
                    controlsHandeler.playPauseBtnClicked();
                }
            }
        });

        var menuWidth = 500;
        var menuHeight = 420;
        if (model.isIPhone) {
            menuWidth = 300;
            // menuHeight =
        }

        $('#player_audioPopupWrapper').dialog({
            modal: true,
            title: "Multimedia",
            appendTo: "#MainC",
            resizable: false,
            autoOpen: false,
            show: model.dilogEffect,
            dialogClass: 'player_audioPopupWrapperClass',
            position: {
                my: "center center",
                at: "center center",
                of: ".player_container_style"
            },
            closeOnEscape: false,
            open: function(event, ui) {
                $(".ui-dialog[aria-describedby='player_audioPopupWrapper'] .ui-dialog-titlebar-close").hide();
            }
        });

      /*  if (device.isMobile() && !this.audioPopupClicked) {
            controller.audioPopupOpen = true;
            $('#player_audioPopupWrapper').dialog("open");
        }*/
        // $("#player_searchWrapper").dialog("open");

        var transcriptWidth;
        var transcriptHeight;

        if (model.isTranscript === true) {
            if (model.isIPhone) {
                transcriptWidth = wWidth * 0.80;
                transcriptHeight = wHeight * 0.60;
            } else if (device.iPad() || device.AndroidTablet()) {
                transcriptWidth = wWidth * 0.50;
                transcriptHeight = wHeight * 0.50;
            } else {
                transcriptWidth = wWidth * 0.40;
                transcriptHeight = wHeight * 0.30;
            }

            $("#transcriptDilogWrapper").dialog({
                modal: false,
                width: transcriptWidth,
                height: transcriptHeight,
                resizable: false,
                autoOpen: false,
                show: model.dilogEffect,
                title: "Transcript",
                position: {
                    my: "center center",
                    at: "center center"
                },
                closeOnEscape: true,
                dialogClass: "transcriptPosition",
                open: function(event, ui) {
                    // $(".ui-dialog[aria-describedby='transcriptDilogWrapper'] .ui-dialog-titlebar-close").hide();
                },
                dragStart: function(event, ui) {
                    if ($(".transcriptPosition")) {
                        $(".transcriptPosition").removeClass("transcriptPosition");
                    };
                },
                beforeClose: function(event, ui) {
                    model.isTranscriptPopup = false;
                    $('#player_transcriptDilogBtn').removeClass('clicked');
                }
            });
        } else {
            /* $("#player_transcriptDilogBtn, #player_transcriptBtnDivider").css("display", "none");*/
            $("#player_tranPrintBtnDivider").css("display", "none");
            //controlsHandeler.transcriptPrintBtn.hide();
        }
    },

    updateView: function() {
        //debuggerController.log("controller.updateView");
        if (controller.currentPageObj && isFunction(controller.currentPageObj.unload)) {
            controller.currentPageObj.unload();
        }
        controller.currentPageObj = {};
        //this.content.html('');
        // if(model.currentPage!=1)
        // $("#player_preLoader, .topicLoader").css({"visibility": "visible", "display": "block","background": "url(content/images/pages/preloadBg/"+model.currentTopic+".jpg)"});
         
        audioController.clearAudio();
        $("#popupAudio").get(0).pause();
        audioController.isPopupAudio = false;
        $("#nextBtnText").hide();
         audioController.clearAudio();
        audioController.isPopupAudio = false;
         model.pageAudioIdArray = [];
        model.pageTotalAudioCount = 0;
        model.pageCurrentAudioCount = 0;
        model.pageHasAudio = false;
        controller.pageCurrentAudio = "";



        this.updatePageCountText();
        controlsHandeler.isOpen = false;
        $('#player_nextBtn').removeClass('hideCursor');
        $('#player_backBtn').removeClass('hideCursor');
        if (model.tl) {
            model.tl.clear();
        }
        //alert("sadsad")
        controller.Transtion_Pahse_start();
     /*   if(model.currentPagePath =="m1_t1_p1"){

        }else{
        // $('.player_content').load('content/pages/'+language.userlanguage+'/' + model.currentPagePath + ".html", controller.pageLoaded);
        $('.player_content').load('content/pages/'+language.userlanguage+'/' + model.currentPagePath + ".html",controller.loadAudio);
  
        }*/

        $('.player_content').load('content/pages/'+language.userlanguage+'/' + model.currentPagePath + ".html",controller.loadAudio);


    },
    
    loadAudio: function(){
      if (model.useAudio) {
            model.pageAudioIdArray = controller.findPageAudioIds();
            model.pageHasAudio = (model.pageAudioIdArray.length > 0) ? true : false;
            model.pageCurrentAudioCount = 1;
        }
        controller.pageCurrentAudio = "";
        //alert(model.getPageCurrentAudioPath())
        var audioPath = model.getPageCurrentAudioPath();
        var req = new XMLHttpRequest();
            req.open('GET', audioPath, true);
            req.responseType = 'blob';

            req.onload = function() {
                // Onload is triggered even on 404
                // so we need to check the status code
                if (this.status === 200) {
                    //console.log("lodingDone  -------------- " + audioPath)
                    var audioBlob = this.response;
                    controller.pageCurrentAudio = URL.createObjectURL(audioBlob); // IE10+
                    controller.pageLoaded()
                }
            }
            req.onerror = function() {}

            req.send();
        
    },
    pageLoaded: function() {
        //console.clear();
        if (model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].status < 2) {
            model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].status = 1;
        }

        $("#player_menuWrapper").css("display", "block");
        console.log("pageLoaded--" + model.isBranched)
        model.isPause = true;
        controlsHandeler.setState("nextBtn", false);
        controlsHandeler.setState("backBtn", true);

        var backIcon = model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].backIcon;
        var NextIcon = model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].nextIcon;

        var overridePrevTitle = $.trim(model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].overridePrevTitle);
        var overrideNextTitle = $.trim(model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].overrideNextTitle);

        if (overridePrevTitle != "" && overridePrevTitle != undefined) {
            overridePrevTitle = overridePrevTitle.slice(0, 6);
            $('#player_backBtn h3 span').text('').text(overridePrevTitle + "...")
        }

        if (overrideNextTitle != "" && overrideNextTitle != undefined) {
            overrideNextTitle = overrideNextTitle.slice(0, 6)

            $('#player_nextBtn h3 span').text('').text(overrideNextTitle + "...")
        }



        if (backIcon != "" && backIcon != undefined) {
            $('#player_backBtn .next').find('img').attr('src', 'content/images/shell/menuImages/' + backIcon)
        }

        if (NextIcon != "" && NextIcon != undefined) {
            $('#player_nextBtn .next').find('img').attr('src', 'content/images/shell/menuImages/' + NextIcon)
        }

        /*var temp = "m" + model.currentModule + "_t" + model.currentTopic + "_p" + model.currentPage;
        var selectedNodes = controller.treeObj.getNodesByParam("id", temp);
        controller.treeObj.selectNode(selectedNodes[0]);*/

       /* audioController.clearAudio();
        audioController.isPopupAudio = false;

        model.pageAudioIdArray = [];
        model.pageTotalAudioCount = 0;
        model.pageCurrentAudioCount = 0;
        model.pageHasAudio = false;*/

        $('.transcriptDilog').html(model.getCurrentPageTranscript());
        $("#player_preLoader, .topicLoader").css({"visibility": "hidden", "display": "none"});
        controlsHandeler.transcriptBtnExitClicked();

        if (typeof page != "undefined" && isFunction(page.pageInit)) {
            page.pageInit();
        }
        model.jumpOnSpecificOnBackClicked = page.jumpOnSpecificOnBackClicked;

        /*$("#player_moduleTitle").html(titleFormat);
        $(".next_pg_title").html(nextPageTitle);
        $(".back_pg_title").html(lastPageTitle);*/

        var pageContent = $(".player_content #pageDiv");
        pageContent.prepend('<div class="main_title"><div class="logo_aa">Duis aute irure dolor in reprehenderit | Lorem ipsum dolor sit, consectetur HRDs</div></div><utility><buttons id="cross_button" class="spriteIcon closeBtn" title="Close"></buttons><buttons id="player_helpBtn" class="spriteIcon helpBtn" title="Help"></buttons><buttons id="player_glossaryBtn" class="spriteIcon bookBtn" title="Resources"></buttons></utility>');
        template.init();

        $(".player_content #pageDiv #cross_button").off('click').on("click", function() {            
            audioController.pauseVideo();
            if ($("#shell_e_ppopup").hasClass('on')) { return; }
            if (!model.isPause) {
                controlsHandeler.playPauseBtnClicked();
            }
            $("#shell_e_ppopup").addClass('on');
            $("video").each(function() {
                $(this).get(0).pause();
            });
        });

        $(".player_content #pageDiv #player_helpBtn").off("click").on("click",controlsHandeler.helpBtnClicked);
        $(".player_content #pageDiv #player_glossaryBtn").off("click").on("click",controlsHandeler.glossaryBtnClicked);

        // controlsHandeler.closeBtn();
        // Added by Team
        model.loadPageType = pageContent.attr("pageType");

        if ($(".player_content #pageDiv[pageType='SAMC']").length > 0 || $(".player_content #pageDiv[pageType='SAMC_NoSubmit']").length > 0 || $('.player_content #pageDiv[pageType="MAMC"]').length > 0 || $('.player_content #pageDiv[pageType="truefalse"]').length > 0 || $('.player_content #pageDiv[pageType="fill_blanks"]').length > 0) {
            controller.currentPageObj = question;
            // question.init();
        } else if ($('.player_content #pageDiv[pageType="filp_card"]').length) {
            //controller.currentPageObj = flipvar;
        } else if ($('.player_content #pageDiv[pageType="animateBox"]').length == 1) {
            controller.currentPageObj = animateBox;
        } else if ($('.player_content #pageDiv[pageType="accordion"]').length == 1) {
            controller.currentPageObj = accordion;
        } else if ($('.player_content #pageDiv[pageType="carousal"]').length) {
            controller.currentPageObj = carousal;
            // carousal.init();
        } else if ($('.player_content #pageDiv[pageType="dnd"], .player_content #pageDiv[pageType="dndcontainer"], .player_content #pageDiv[pageType="dndseq"]').length) {
            controller.currentPageObj = dragAndDrop;
        } else if ($('.player_content #pageDiv[pageType="clickAndLearn1"], .player_content #pageDiv[pageType="clickAndLearn2"], .player_content #pageDiv[pageType="clickAndLearn3"], .player_content #pageDiv[pageType="clickAndLearn4"], .player_content #pageDiv[pageType="clickAndLearn5"], .player_content #pageDiv[pageType="dispopup"]').length) {
            controller.currentPageObj = interactivePopup;
        } else if ($('.player_content #pageDiv[pageType="imgText"]').length) {
            template.setImgPosition();
        } else if ($('.player_content #pageDiv[pageType="vidText"]').length) {
            template.setVideoPosition();
        } else if ($('.player_content #pageDiv[pageType="timeline"]').length) {
            controller.currentPageObj = timeline;
        } else if ($('.player_content #pageDiv[pageType="assessment"]').length) {
            controller.currentPageObj = assessment;
        }
        else if ($('.player_content #pageDiv[pageType="postAssessment"]').length) {           
            controller.currentPageObj = postAssessment;
        }

        if (model.setBg == "true") {
            setTimeout(function() {
                $('.player_container_style').addClass('alternate');
            }, 100);

        } else {
            //setTimeout(function(){
            $('.player_container_style').removeClass('alternate');
            //},500);

        }

        $("#player_nextBtn").removeClass("nextBlink");


        if (model.varNavigationBtnClicked != "next" && model.varNavigationBtnClicked != "back") {
            model.varNavigationBtnClicked = "normal";
        }

        if (model.varNavigationBtnClicked == "next") {

            TweenMax.staggerFromTo($('.player_content'), 1, { "left": model.getWidth + "px" }, {
                "left": "0px",
                onComplete: function() {
                    //controlsHandeler.setState("nextBtn", true);
                    //controlsHandeler.setState("backBtn", true);
                    $('.rem').remove();
                    controller.callAudioInit();
                },
            }, 1);
            TweenMax.staggerFromTo($('.rem'), 1, { "left": 0 + "px" }, {
                "left": -model.getWidth + "px",
                onComplete: function() {
                    // controlsHandeler.setState("nextBtn", true);
                    $('.rem').remove();

                },
            }, 1);

            //$('.set_div').css({ 'display': 'block' });

        } else if (model.varNavigationBtnClicked == "back") {

            TweenMax.staggerFromTo($('.player_content'), 1, { "left": -model.getWidth + "px" }, {
                "left": "0px",
                onComplete: function() {
                    // controlsHandeler.setState("nextBtn", true);
                    // controlsHandeler.setState("backBtn", true);
                    $('.rem').remove();
                    controller.callAudioInit();
                },
            }, 1);
            TweenMax.staggerFromTo($('.rem'), 1, { "left": 0 + "px" }, {
                "left": model.getWidth + "px",
                onComplete: function() {
                    // controlsHandeler.setState("backBtn", true);
                    $('.rem').remove();
                },
            }, 1);

        } else if (model.varNavigationBtnClicked == "normal") {

            TweenMax.staggerFromTo($('.player_content'), 1, { "opacity": "0" }, {
                "opacity": "1",
                onComplete: function() {
                    // controlsHandeler.setState("backBtn", true);
                    $('.rem').remove();
                    controller.callAudioInit();
                },
            }, 1);
        }

        

        if ($("#audioOnOff").hasClass("audioOFF")) {
            model.isMute = true;
        }

        controller.toggleMute();
        

        if(model.isMute){
            audioController.muteVideo()
        }
        else{
            audioController.unmuteVideo()
        }

        if(model.currentPagePath == "m1_t6_p4"){
            $("#play_pause, #progressSlider").addClass("makeDisableForUser");      
        }else{
            $("#play_pause, #progressSlider").removeClass("makeDisableForUser");      
        }

        var getPageNo = model.getCurrentPageCount();
        var get_path = "m" + model.currentModule + "_t" + model.currentTopic + "_p" + model.currentPage;
        preloadImages.init(get_path, getPageNo);
        
        imageLoader.loadImages($('.courseImages'), controller.pageContentLoaded);

    },

    Transtion_Pahse_start: function() {
        $('#player_menuBtn, #player_glossaryBtn, #player_helpBtn, #cross_button, #player_ResourcesBtn').css('pointer-events', 'none');
    },
    Transtion_Pahse_End: function() {
        $('#player_menuBtn, #player_glossaryBtn, #player_helpBtn, #cross_button, #player_ResourcesBtn, .footarea').css('pointer-events', 'auto');
    },

    callAudioInit: function() {


        //controlsHandeler.setState("nextBtn", true);
         controlsHandeler.setState("backBtn", true);

        model.wheelNav = false;


        if ($('.player_content #pageDiv[animType="audioTimeline"]').length) {
            clearInterval(model.nextBlinkInterval);
            if ($('.player_content  #pageDiv *').css('opacity') != 0) {
                $('.player_content  #pageDiv *').addClass('hideMyInitalContent');
            }
            /*todo: change 1*/
            audioTimeline.init();


        }
        if (controller.currentPageObj && isFunction(controller.currentPageObj.init)) {
            controller.currentPageObj.init();
        }

        if (model.isForced == 2 && model.currentPageType != INTERACTIVE) {
            model.updatePageDone();
            // controller.updateMenuStatus();
        }

        controller.playerSizeChanged();
        setTimeout(function() {
            controller.Transtion_Pahse_End();
            if (!model.isBranched) {
                if (model.currentModule <= 1 && model.currentTopic <= 1 && model.currentPage <= 1) {
                    controlsHandeler.setState("backBtn", false);
                } else {
                    // controlsHandeler.setState("backBtn", true);
                }

                if (model.currentModule == model.totalModules && model.currentTopic == model.totalTopicInModule && model.currentPage == model.totalPagesInTopic) {
                    controlsHandeler.setState("nextBtn", false);
                } else {
                    var astr = model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].target
                    if (astr == "m1_t1_p3") {
                        controlsHandeler.setState("nextBtn", false);
                    } else {

                        if (model.isForced == 1) {
                            if (model.isCurrentPageDone()) {
                                controlsHandeler.setState("nextBtn", true);
                            } else {
                                controlsHandeler.setState("nextBtn", false);
                            }
                        } else {
                            controlsHandeler.setState("nextBtn", true);
                        }
                    }

                }
            } else {
                // controlsHandeler.setState("nextBtn", true);
                controlsHandeler.setState("backBtn", false);
            }
        }, 50)

        // if(pageContent.attr('pageType') != "assessment"){
        //     controller.pageDone();
        // }        

        if (model.useAudio) {
            model.pageAudioIdArray = controller.findPageAudioIds();
            model.pageHasAudio = (model.pageAudioIdArray.length > 0) ? true : false;
        }
        if (model.pageHasAudio) {
            animationController.hideAllWithAudioId();
            controlsHandeler.setPlayPauseState(true);
            model.pageTotalAudioCount = model.pageAudioIdArray.length;

            model.pageCurrentAudioCount = 1;
            controller.loadPageCurrentAudio();

            return;
        }

        controlsHandeler.setPlayPauseState(false);

        if (model.useDelay) {
            animationController.hideAllWithDelay();
            model.pageAudioIdArray = $(".player_content #pageDiv [delayDuration]:not([noHide])");
            model.pageTotalAudioCount = model.pageAudioIdArray.length;
            model.pageCurrentAudioCount = 1;
            controller.playNextAudio();
            // controller.startPlayingAudio();
            return;
        }
        //When no audio or delay
        $(".ui-progress").css("width", 95 + "%");
        $(".ui-progress").attr("disabled", true);
        controlsHandeler.setParaBtnState();
        animationController.showAllPageDiv();
        controller.pageAllAudioDone();


    },

    findPageAudioIds: function() {
        $(".ui-progress").attr("disabled", false);

        var tempObj = new Object();
        $(".player_content #pageDiv [audioId]").each(function() {
            tempObj[$(this).attr('audioId')] = $(this).attr('audioId');
        });

        var pageAudioIdArray = new Array();
        for (var i in tempObj) {
            pageAudioIdArray.push(i);
        }
        pageAudioIdArray.sort();

        return pageAudioIdArray;
    },

    findCueIns: function(val) {
        var tempObj = new Object();
        $(".player_content #pageDiv [audioId=" + val + "]").each(function() {
            if ($(this).attr("audioCueIn") || $(this).attr("audioCueIn") === "") {
                tempObj[$(this).attr('audioCueIn')] = $(this).attr('audioCueIn');
            }
        });

        var cueInArray = new Array();
        for (var i in tempObj) {
            cueInArray.push(i);
        }
        cueInArray.sort(function(a, b) {
            return a - b;
        });

        return cueInArray;
    },

    loadPageCurrentAudio: function() {
        //debuggerController.log("controller.loadPageCurrentAudio");
        // console.log("loadPageCurrentAudio", model.pageCurrentAudioCount);
        this.showHideAudioPreloader(true);
        audioController.pauseAudio();
        audioController.audioCuePoints = [];
        audioController.audioCuePoints = controller.findCueIns(model.pageCurrentAudioCount);

        $(".player_content #pageDiv [audioId=" + model.pageCurrentAudioCount + "]").each(function(i) {
            /*if ($(this).attr("audioCueIn") || $(this).attr("audioCueIn") === "") {
                console.log("audioCueIn", $(this).attr("audioCueIn"));
                audioController.audioCuePoints.push($(this).attr("audioCueIn"));
            }*/
            if ($(this).attr("audioCueOut")) {
                console.log($(this).attr("audioCueOut"));
                audioController.audioCueOutPoints.push($(this).attr("audioCueOut"));
            }
        });

        audioController.loadAudio(controller.pageCurrentAudio);
        // audioController.loadAudio('content/audio/mp3/' + 'm' + model.currentModule + '_t' + model.currentTopic + '_p' + model.currentPage + '_' + (model.pageCurrentAudioCount) + '.mp3');
    },


    startPlayingAudio: function() {
        //debuggerController.log("controller.startPlayingAudio:" + model.pageCurrentAudioCount);
        //console.log("startPlayingAudio", model.pageCurrentAudioCount);
        if (model.pageTotalAudioCount > 0) {
            var tempPercent = model.pageCurrentAudioCount / model.pageTotalAudioCount * 95;
            $(".ui-progress").css("width", tempPercent + "%");
        }

        this.showHideAudioPreloader(false);
        controlsHandeler.setParaBtnState();
        if (model.isPause) {
            controlsHandeler.playPauseBtnClicked();
        }
        var tempObj = new Object();
        if (model.pageHasAudio) {
            animationController.showWithAudioID(model.pageCurrentAudioCount);
            tempObj = $(".player_content #pageDiv [audioId=" + model.pageCurrentAudioCount + "]");
        } else if (model.useDelay) {
            tempObj = $(model.pageAudioIdArray[model.pageCurrentAudioCount - 1]);
            model.pauseAfterFinish = (tempObj.attr('pauseAfterFinish') == undefined) ? false : true;
            var delayTime = (tempObj.attr('delayDuration') == undefined) ? model.delayBtwnAudio : parseInt(tempObj.attr('delayDuration'));
            setTimeout(function() {
                animationController.showObj(tempObj);
                controller.pageDivAudioFinished();
            }, delayTime);
        }
        model.pauseAfterFinish = (tempObj.attr('pauseAfterFinish') == undefined) ? false : true;
    },

    pageDivAudioFinished: function() {

        //debuggerController.log("controller.pageDivAudioFinished" + model.pageCurrentAudioCount, "#009933");
        // console.log("pageDivAudioFinished", model.pageCurrentAudioCount);
        var divAudioDoneFunction = "";
        if (typeof page != "undefined") {
            divAudioDoneFunction = page['audio_' + model.currentAudioNo + '_Done'];
        }
        if (isFunction(divAudioDoneFunction)) {
            divAudioDoneFunction();
        } else {
            // console.log("pageDivAudioFinished else", divAudioDoneFunction, model.pageCurrentAudioCount);
        }


        model.pageCurrentAudioCount++;
        controlsHandeler.setParaBtnState();
        if (!model.pauseAfterFinish) {
            controller.playNextAudio();
        } else {
            console.log("paused after pageDivAudioFinished. User Action required");
        }
    },

    pagePopupAudioFinished: function() {
        //debuggerController.log("controller.pagePopupAudioFinished");
        console.log("pagePopupAudioFinished");
        if(isFunction(page.popupAudioFinished))
        {
            page.popupAudioFinished();
        }
        audioController.isPopupAudio = false;
        var popupAudioDoneFunction = "";
        if (typeof page != "undefined") {
            popupAudioDoneFunction = page['popupAudio_Done'];
            console.log(popupAudioDoneFunction);
        }
        if (isFunction(popupAudioDoneFunction)) {
            popupAudioDoneFunction();
        }
    },

    playNextAudio: function() {
        if (model.pageCurrentAudioCount <= model.pageTotalAudioCount) {
            if (model.pageHasAudio) {
                controller.loadPageCurrentAudio();
            } else {
                controller.startPlayingAudio();
            }
        } else {
            controller.pageAllAudioDone();
        }
    },

    pageAllAudioDone: function() {
        debuggerController.log("controller.pageAllAudioDone");
        console.log("pageAllAudioDone", model.currentPageType);
        /*controlsHandeler.setPlayPauseState(false);*/
        if (model.currentPageType != INTERACTIVE) {
            //this.pageDone();
        }
    },

    showNextBlinker: function() {
        controller.pageDone();
        var nextBlinkCount = 0;
        audioController.muteAudio();
        width = window.innerWidth;
        if (width != 1024) {
            $(".itextNext").fadeIn().animate({
                right: "0px",
            });
        } else {
            $(".itextNext").fadeIn().animate({
                right: "0px",
            });
        }
       // $("#player_nextBtn").addClass("nextBlink");
        // model.nextBlinkInterval = setInterval(function() {
        //     if (nextBlinkCount % 2 == 0) {
        //         //$(".nextBlink").addClass('blink')
        //         $(".nextBlink").addClass('blink').fadeTo(500, 0.5).fadeTo(500, 1);
        //      } 
        //     else {
        //         //$(".nextBlink").removeClass('blink')
        //         $(".nextBlink").removeClass('blink').fadeTo(500,0.5).fadeTo(500, 1)
        //     }
        //     nextBlinkCount++;
        // }, 800);
    },

    setNextBtnState: function(bool) {
        $("#player_nextBtn").hide()
    },

    pageDone: function() {

        model.updatePageDone();

        //var temp = "m" + model.currentModule + "_t" + model.currentTopic + "_p" + model.currentPage;
        //var selectedNodes = controller.treeObj.getNodesByParam("id", temp);

        // console.log("page child Nod: ", selectedNodes, currentModNodes, currentTopicNodes);

        /*if (selectedNodes[0].checked != true) {
            controller.treeObj.checkNode(selectedNodes[0], "true", "true");
        };*/

        if (model.currentModule == model.totalModules && model.currentTopic == model.totalTopicInModule && model.currentPage == model.totalPagesInTopic) {

        } else {
            if ($(".player_content #pageDiv").attr("isClubbed") == true || $(".player_content #pageDiv").attr("isClubbed") == "true") {

            } else {
                controlsHandeler.setState("nextBtn", true);
            }

            if (model.isAutoAdvance) {
                controlsHandeler.nextBtnClicked();
            } else {
                if ($(".player_content #pageDiv").attr("isClubbed") == true || $(".player_content #pageDiv").attr("isClubbed") == "true") {

                } else {
                    $('#player_nextBtn').css('cursor', 'pointer');
                    // controlsHandeler.setState("nextBtn", true);
                }
            }
        }

       // $("#player_nextBtn").addClass("nextBlink");
        // clearInterval(model.nextBlinkInterval)

    },

    updateMenuStatus: function() {
        if (model.courseXMLObj["mod_" + model.currentModule]["topic_" + model.currentTopic]["page_" + model.currentPage].status < 2) {
            return;
        }
        var temp = "m" + model.currentModule + "_t" + model.currentTopic + "_p" + model.currentPage;
        var selectedNodes = controller.treeObj.getNodesByParam("id", temp);

        if (selectedNodes[0].checked != true) {
            controller.treeObj.checkNode(selectedNodes[0], "true", "true");
        };
    },

    setPageBranchId: function(branchId) {
        if (branchId && branchId > 0) {
            model.isBranched = true;
            model.branchId = branchId;
        } else {
            model.isBranched = false;
            model.branchId = -1;
        }
        //alert(model.currentModule+"::"+model.currentTopic+"::"+model.currentPage)
        model.showPage(model.currentModule, model.currentTopic, model.currentPage);
    },

    updatePageCountText: function() {
        //debuggerController.log("controller.updatePageCountText");
        // var text = model.getCurrentPageCount() + "<span class='player_pageNumber_divider'>/</span>";
        if (Number(model.getCurrentPageCount()) < 10) {
            var text = "<hgroup><b>0" + Number(model.getCurrentPageCount()) + "</b></hgroup><span class='player_pageNumber_divider'>/</span>";
        } else {
            var text = "<hgroup><b>" + Number(model.getCurrentPageCount()) + "</b></hgroup><span class='player_pageNumber_divider'>/</span>";
        }
        var count = 0;
        switch (model.pageNumberLevel) {
            case 1:
                text += model.getTotalPagesInCourse();
                break;
            case 2:
                text += model.getTotalPagesInModule(model.currentModule);
                break;
            case 3:
                text += model.getTotalPagesInTopic(model.currentModule, model.currentTopic);
                break;
        }
        // $("#player_pageNumber").text(text);
        $("#player_pageNumber").html(text);
    },

    updateSaveData: function() {              
        if (!model.isLocalStorageAvailable && !model.isScorm) {
            return;
        }        
        if (model.courseXMLObj['mod_' + model.currentModule]["topic_" + model.currentTopic].status == 2) {
            $('#treeMenu > li').eq(model.currentTopic - 1).addClass("topiccheck")
        }

        if (model.isForced == 1) {
            controller.checkMenuStatus();
        }

        if (model.isScorm) {
            //console.clear();
            var bookMarkDataVar = model.userSec + "**" + intro.currentScreen + "**"+ model.curretSlideMoved;           
            fnSaveBookmark(bookMarkDataVar);
            //console.log("bookmark", bookMarkDataVar);

            if(model.userSec == "outro" && model.userSlideN == 4){
                $(".ExitBtn#exitCourse").show();
                SetLessonStatus("completed");
                doLMSCommit();
            }
            else{
                $(".ExitBtn#exitCourse").hide();
            }
            var menuStateObj = {
                menuState: model.menuCompletedState
            }

            var suspendDataVar = JSON.stringify($.extend({},model.screenStatusData,menuStateObj) );   
          //  suspendDataVar = suspendDataVar.substring(1, suspendDataVar.length-1);
            console.log("suspendDataVar => "+ suspendDataVar);      

            SetSuspendedData(suspendDataVar);                      
            //console.log("suspendData uploading in LMS", suspendDataVar);

        } else {
            var temp = {
                currentModule: model.currentModule,
                currentTopic: model.currentTopic,
                currentPage: model.currentPage,
                courseDoneTill: model.courseDoneTill
            };
            str = JSON.stringify(temp);

            localStorage[model.courseName] = str;
        }

        controller.checkCourseCompletion();
    },

    sectionStatusFn: function(){
        var getTotalTopicSec = $(".topicSection").length;
        for(var i = 0; i < getTotalTopicSec; i++){
            var sectionScreenCount = $(".topicSection").eq(i).find(".sCreenCount").length;

            var tempObj = {
                "T": '',
                "ST": []
            };

            tempObj.T = $(".topicSection").eq(i).attr("sectionID");

            for(var j = 0; j < sectionScreenCount; j++){
                var STObj = {
                    "id": "",
                    "S": ""
                }
                var getSTID = $(".topicSection").eq(i).find(".sCreenCount").eq(j).attr("id");
                getSTID = getSTID.toLowerCase();                    

                STObj.id = getSTID;                    

                if(model.screenStatusData.length == 0 || model.screenStatusData[i] == undefined){
                    STObj.S = false;
                }                    
                else{
                    if(model.screenStatusData[i].ST[j].S == undefined || model.screenStatusData[i].ST[j].S == false){
                        STObj.S = false;
                    }
                    else{
                       STObj.S = true; 
                    }
                }                     

                tempObj.ST.push(STObj);                                    
            }
            model.screenStatusData.push(tempObj);                 
        }
    },

    checkResourseCompletion:function(){
           $(".sowaccord ul").each(function(i){
            var bo = true
            $( this ).find('li').each(function(j){
                //alert($( this ).find('a').hasClass('actme'))
                if(!$( this ).hasClass('actme')){
                   bo = false
                }
            })

            //alert(bo)
            if(bo){
                $('.clickaccord').eq(i).addClass("rsdone")
            }
               /* if(model.resource_Array[i] == 1){
                    $(this).addClass("actme");
                }*/
            })
    },

    togglePlayPause: function() {
        //debuggerController.log("controller.togglePlayPause");
        model.isPause = !model.isPause;
        if (model.isPause) {
            audioController.pauseAudio();
        } else {
            audioController.playAudio();
        }
    },

    toggleMute: function() {
        // debuggerController.log("controller.toggleMute");    
        if (model.isMute) {
            audioController.muteAudio();
        } else {
            audioController.unmuteAudio();
        }
    },


    setUserAudioPreference: function(val) {
        //debuggerController.log("controller.setUserAudioPreference " + val);
        model.userAudioPref = val == 1 ? true : false;
        model.useAudio = val == 1 ? true : false;
        if (model.userAudioPref || model.useAudio) {
            if (model.bookMarkData != "" && model.bookMarkData != undefined && model.bookMarkData != "undefined" && model.bookMarkData != null && model.bookMarkData != "null") {
                $("#splashContainer").hide();                
            } else {
                //videojs("splash").play();
              //  #player_audio_yes.startInit
                $("#player_audio_yes").addClass("disable");
                model.index_audio = true;
                audioPath = "content/audio/mp3/en/index_audio.mp3";
                audioController.loadAudio(audioPath);
            }

            console.log("setUserAudioPreference in if");
            document.querySelector('audio').load();
            document.querySelector('audio').play();
            
            // controller.loadPageCurrentAudio();
            this.audioPopupClicked = true;
        }
        controller.audioPopupOpen = false;
        $('#player_audioPopupWrapper').dialog("close");
        controller.audioPopupClosed();        
    },

    unloadPage: function() {        
        audioController.pauseAudio();
        audioController.clearAudio();
        controller.updateSaveData();
        unloadPage();
    },

    showHideAudioPreloader: function(val) {
        //debuggerController.log("controller.showHideAudioPreloader");
        if (val) {
            $("#player_audioPreloader").css("visibility", "visible");
        } else {
            $("#player_audioPreloader").css("visibility", "hidden");
        }
    },

    enableDisableStageClick: function() {
        if (model.isUserPaused) {
            document.getElementById("player_content").addEventListener('click', controller.killClick, true);
        } else {
            document.getElementById("player_content").removeEventListener('click', controller.killClick, true);
        }
    },

    killClick: function(event) {
        console.log("killClick");
        event.stopImmediatePropagation();
        event.preventDefault();
        event.stopPropagation();
        return false;
    },
    isOnlyLandscape: function() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            $("#player_orientationPortrait").show();
        } else {
            $("#player_orientationPortrait").hide();
        }
    },

    callPinCompletedFn: function(){        
        $.each(model.screenStatusData, function(k, v){
            var hasTopicVisted = true;
            $.each(v.ST, function(a, b){
                if(!b.S){
                   hasTopicVisted = false; 
                }
            });
            if(hasTopicVisted){
                $('.mapModule .map_icon[secPin='+v.T+']').addClass("vistedTopic");
            }            
        });
        model.userSec = "map";
        controller.updateSaveData();
    },

    setScreensAsPerLMSData: function(){
        if(model.userSec != "map"){
            $(".slide1, .topicSection").fadeOut(); 
            $(".playerCenterBtns").show();
            $(".topicSection[sectionID='"+model.userSec+"']").show();            
            var tempObjName = controller.getObjFn();
            tempObjName.pageInit();
            tempObjName.checkMenuVisited();
            tempObjName.currentScreen = model.userSlideN;

            if(model.userSec == "outro" && model.userSlideN == 4){
                $(".ExitBtn#exitCourse").show();
                SetLessonStatus("completed");
                doLMSCommit();
            }
            else{
                $(".ExitBtn#exitCourse").hide();
            }

            if(tempObjName.currentScreen > 1){
                tempObjName.currentScreen -= 1;
            }
            if(model.userSlideN == 1){
                $("#player_bookmarkPopupWrapper").removeClass('on');
                $('.footer, .header, .player_contentArea_style').show();                
                setTimeout(function(){                
                    page.playFirstSecAudio(model.userSec);
                },500);
            }
            else{ 
                if(model.userSlideN >= 2){
                    tempObjName.once_moved_to_2 = true;
                } 

                setTimeout(function(){    
                   if(model.curretSlideMoved == 0){
                       tempObjName.play_nextfunction();  
                       var adN = $(".topicSection[sectionID='"+model.userSec+"'] #screen"+(tempObjName.currentScreen)+"").attr("audioname");
                        audioController.playSecAudio(adN); 

                        var tempSel = $(".topicSection[sectionID='"+model.userSec+"'] #screen"+(tempObjName.currentScreen)+" video");
                        for(var i = 0; i< tempSel.length; i++){
                           tempSel.eq(i).load(); 
                        }
                   } else{

                       intro.slideMaindiv(model.curretSlideMoved);
                   }               
                    
                    

                    $("#player_bookmarkPopupWrapper").removeClass('on');
                    $('.footer, .header, .player_contentArea_style').show();                    
                },1000)  


                                                     
            }

            $(".navBtnContainer").show();
            $(".aeroplane").hide();
            $(".backtohome").hide();
        } 
        else{
            $(".slide1.mapModule").show();
            var tempObjName = controller.getObjFn();
            tempObjName.pageInit();
            $(".navBtnContainer").hide();
            $(".aeroplane").hide();
            $(".backtohome").hide();
            $(".playerCenterBtns").hide();
            controller.hasAllPinsVistedFn();        
            setTimeout(function(){
                $("#player_bookmarkPopupWrapper").removeClass('on');
                $('.footer, .header, .player_contentArea_style').show();
            },1000)      
        } 

        $.each(model.screenStatusData, function(k, v){
            var hasTopicVisted = true;
            $.each(v.ST, function(a, b){
                if(!b.S){
                   hasTopicVisted = false; 
                }
            });
            if(hasTopicVisted){
                $('.mapModule .map_icon[secPin='+v.T+']').addClass("vistedTopic");
            }            
        }); 


    },

    getObjFn: function(){
        if(model.userSec == "intro"){
            return intro;
        }
        else if(model.userSec == "map"){
            return map;
        }
        else if(model.userSec == "leaps"){
            return leaps;
        }
        else if(model.userSec == "wallStreet"){
            return wallStreet;
        }
        else if(model.userSec == "brussels"){
            return brussels;
        }
        else if(model.userSec == "blend"){
            return blend;
        }
        else if(model.userSec == "kenya"){
            return kenya;
        }
        else if(model.userSec == "supplier"){
            return supplier;
        }
        else if(model.userSec == "outro"){
            return outro;
        }
    },

    hasAllPinsVistedFn: function(){
        var hasAllTopicVisted = true;
        $.each(model.screenStatusData, function(k, v){           
            if(v.T != "outro"){
                $.each(v.ST, function(a, b){
                    if(!b.S){
                       hasAllTopicVisted = false; 
                    }
                });
            }                                   
        });  
        $(".aeroplane").hide();
        if(hasAllTopicVisted){            
            $("#endJournySecPopup").show();
            endJourny.pageInit();
        }
        else{
            $("#endJournySecPopup").hide();
            $(".aeroplane").show();
        }  

        $(".endJournySec .backToWM").off("click").on("click", function(){
            $("#endJournySecPopup").hide();
            audioController.playSecAudio("Chooseyourdestinationbymov");   
            $(".aeroplane").show();
            $(".jumptobacksec").show();
        });

        $(".endJournySec .jumpToOutro").off("click").on("click", function(){
            $(".jumptobacksec").hide();
            $("#endJournySecPopup").hide();
            $(".slide1, .topicSection").fadeOut(); 
            $(".playerCenterBtns").show();
            $(".topicSection[sectionID='outro']").show();
            outro.pageInit();
            setTimeout(function(){
                page.playFirstSecAudio("outro");
            },500);
            $(".navBtnContainer").show();
            $(".aeroplane").hide();
            $(".backtohome").hide();
            model.userSec = "outro";  
            model.userSlideN = 1;
            $('.CTABtn').hide();
        });
    },

    slideVistedStFn: function(){                
        if(model.userSlideN == 1){
            setTimeout(function(){
                $("#section_backBtn").addClass("backDisable");
                $("#section_nextBtn").addClass("nextDisable"); 
            },1000)               
        }
        else{
            $("#section_backBtn").addClass("backDisable");
            $("#section_nextBtn").removeClass("nextDisable");  
            setTimeout(function(){
                if(model.userSec == "outro" && model.userSlideN == 2){
                   //Do Nothing
                }
                if(model.userSec == "outro" && model.userSlideN == 4){
                    $("#section_backBtn").removeClass("backDisable").removeAttr("style");
                    $("#section_nextBtn").removeAttr("style");
                }
                else{
                    $("#section_backBtn").removeClass("backDisable").removeAttr("style");
                }                
            },1000)
        }
        $.each(model.screenStatusData, function(k, v){
            if(v.T == model.userSec){                
                if(v.T == "intro"){
                    //controller.disableNextBtnForclyFn();
                    controller.enableNextBtnFn();
                }
                else if(v.T == "leaps"){
                    if(model.userSlideN != 1){
                        //controller.disableNextBtnForclyFn();
                        controller.enableNextBtnFn();
                    }
                    else{
                       controller.enableNextBtnFn(); 
                    }
                }
                else if(v.T == "wallStreet"){
                    if(model.userSlideN == 2 || model.userSlideN == 10){
                       // controller.disableNextBtnForclyFn();
                        controller.enableNextBtnFn();
                    }
                    else{
                        controller.enableNextBtnFn();
                    }
                }
                else if(v.T == "brussels"){
                    if(model.userSlideN == 2 || model.userSlideN == 4 || model.userSlideN == 3){
                        //controller.disableNextBtnForclyFn();
                        controller.enableNextBtnFn();
                    }
                    else{
                        controller.enableNextBtnFn();
                    }
                }
                else if(v.T == "blend"){
                    if(model.userSlideN != 1){
                        //controller.disableNextBtnForclyFn();
                        controller.enableNextBtnFn();
                    }
                    else{
                        controller.enableNextBtnFn();
                    }
                }
                    else if(v.T == "outro"){
                    if(model.userSlideN == 3){
                       // controller.disableNextBtnForclyFn();
                       controller.enableNextBtnFn();
                    }
                    else{
                        controller.enableNextBtnFn();
                    }
                }
                else if(v.T == "kenya"){
                    if(model.userSlideN == 2 || model.userSlideN == 3){
                        //controller.disableNextBtnForclyFn();
                        controller.enableNextBtnFn();
                    }
                    else{
                        controller.enableNextBtnFn();
                    }
                }
                else if(v.T == "supplier"){
                    if(model.userSlideN != 1){
                        //controller.disableNextBtnForclyFn();
                        controller.enableNextBtnFn();
                    }
                    else{
                        controller.enableNextBtnFn();
                    }
                }
                else if(v.T == "outro"){
                    if(model.userSlideN == 2){
                        //controller.disableNextBtnForclyFn();
                        controller.enableNextBtnFn();
                        setTimeout(function(){
                            $("#section_backBtn").addClass("backDisable");
                        },1001)                        
                    }
                    else{
                        controller.enableNextBtnFn();
                    }
                }
                else{
                    controller.enableNextBtnFn();
                }
                return false;
            }
        });  

        controller.callCTABtnFn(); 
    },

    disableNextBtnForclyFn: function(){
        $("#section_nextBtn").removeAttr("style");
        $("#section_nextBtn").removeClass("visitedSlide");
        $("#section_nextBtn").addClass("nextDisable"); 
    },

    enableNextBtnFn: function(){
        $.each(model.screenStatusData, function(k, v){
            if(v.T == model.userSec){  
                var tempObjName = controller.getObjFn();                
                if(tempObjName.currentScreen < v.ST.length){
                   if(v.ST[tempObjName.currentScreen-1].S){
                        $("#section_nextBtn").removeClass("visitedSlide");
                        $("#section_nextBtn").addClass("nextDisable");
                        setTimeout(function(){
                            $("#section_nextBtn").addClass("visitedSlide");
                            $("#section_nextBtn").removeClass("nextDisable")
                        },1000)                        
                    }
                    else{ 
                        $("#section_nextBtn").removeClass("visitedSlide nextDisable");                        
                    } 
                }
                else{
                    $("#section_nextBtn").removeClass("visitedSlide");
                    $("#section_nextBtn").addClass("nextDisable");
                }
                return false;
            }
        });  
    },

    callCTABtnFn: function(){
        var tempObjName = controller.getObjFn();
        var CTABtnTxt = controller.CTABtnTxtFn(model.userSec);
        $.each(model.screenStatusData, function(k, v){ 
            //if(model.userSec == "outro" || model.userSec == "kenya"){
                if(model.userSec == "kenya"){
                return false;
            }
            else{
               if(v.T == model.userSec){
                    if(tempObjName.currentScreen == v.ST.length-1){                        
                        $(".CTABtn").removeClass("disable_cta");
                        $(".CTABtn").removeAttr("id");
                        $('#section_nextBtn').addClass("disable_next_BTN");
                        $(".CTABtn").show().attr("id", model.userSec+"Ctabtn");
                        $(".CTABtn").html("<div class='cta_text'>"+CTABtnTxt+"</div>");
                        $(".CTABtn").off("click").on("click", function(){
                            $('#section_nextBtn').trigger('click');
                            $(".CTABtn").hide();
                        });


                        if((model.userSec == "intro") &&(model.introctabtn == true)){
                            $(".CTABtn").addClass("disable_cta");
                           
                        }else if((model.userSec == "blend") &&(model.blendCtaBtn == true)){
                            $(".CTABtn").addClass("disable_cta");
                           
                        }else if((model.userSec == "supplier") &&(model.supplierCtaBtn == true)){
                            $(".CTABtn").addClass("disable_cta");
                           
                        }else if((model.userSec == "wallStreet") &&(model.wallStreetCtaBtn == true)){
                            $(".CTABtn").addClass("disable_cta");
                            
                        }else if((model.userSec == "brussels") &&(model.brusselsCtaBtn == true)){
                            $(".CTABtn").addClass("disable_cta");
                           
                        }else if((model.userSec == "leaps") &&(model.leapsCtaBtn == true)){
                            $(".CTABtn").addClass("disable_cta");
                           
                        }
                        else if((model.userSec == "outro")  && (model.outroCtaBtn == true))
                        {
                                $(".CTABtn").addClass("disable_cta");
                        }
                    }
                    else{
                        $(".CTABtn").hide();
                        $('#section_nextBtn').removeClass("disable_next_BTN");
                        
                    }
                    return false; 

                } 
            }            
            
        });
    },

    CTABtnTxtFn: function(){
        if(model.userSec == "intro"){
            return "Finish boarding";
        }
        else if(model.userSec == "blend"){
            return "Leave Berlin";
        }
        else if(model.userSec == "kenya"){
            return "kenya";
        }
        else if(model.userSec == "supplier"){
            return "Leave harbor";
        }
        else if(model.userSec == "outro"){
            return "Leave hangar";
        }
        else if(model.userSec == "leaps"){
            return "End the dive";
        }
        else if(model.userSec == "brussels"){
            return "End discussion";
        }
        else if(model.userSec == "wallStreet"){
            return "Leave New York";
        }        
    }    
};