var language = {
    defaultLang: "eng_",
    isUserSelectLang: false,
    setLang: 'English',
    userlanguage: "en",
    isScorm: false,
    courseVideoArr: [],
    convertedVideoArr: [],
    videoCount: 0,
    scormData: '',
    hasLanguageScreenLoaded: true,

    init: function() {           
        $(".player_container_style").show();
        $('.scrollcover .lang1').change(function() {
            $('.btn_sele').removeClass('disabled')
        });    
        
        if(language.hasLanguageScreenLoaded){
            if(!model.isProfiler){
                language.userlanguage = "en";                
                language.languageScreen();
            }
            else{
                $(".scrollcover").show();
                $('.btn_sele').off('click').on('click', function() {
                    language.languageScreen();
                })
            } 
            language.hasLanguageScreenLoaded = false;
        }
        
    },

    languageScreen: function(){
        $('.user_name').html('')
        $('.user_name').html(GetStudentName())
        $('.worlddiv').find('.languageName').html('')                
        $('.continue_btn2').show();
        $('.worlddiv').hide();
        $('.worlddiv').find('h1').html('')
        $('.worlddiv').find('h1').html(language.setLang);        
        $('.scrollcover').hide();
        language.isUserSelectLang = true;
        model.menuPopup = "block";   
        $("#splashContainer").show();     
        language.proceedtoNext();
    }, 

    proceedtoNext: function() {
        // videojs('splash').src('content/video/' + language.userlanguage + '/splash.mp4');
        // videojs('splash').load();        
        $('.worlddiv').hide();        
        if (model.bookMarkData != "" && model.bookMarkData != undefined && model.bookMarkData != "undefined" && model.bookMarkData != null && model.bookMarkData != "null" || model.suspendData != "" && model.suspendData != undefined && model.suspendData != "undefined" && model.suspendData != null && model.suspendData != "null") {
            $("#player_bookmarkPopupWrapper").addClass('on');
            $("#splashContainer, #player_audioPopupWrapper").hide();
            $('.footer, .header, .player_contentArea_style').hide();
        } else {
            if (model.hasSplash) 
            {
                language.playSplashIfOn()
            } 
            else 
            {
                model.showPage(model.currentModule, model.currentTopic, model.currentPage);
                $('.footer, .header, .player_contentArea_style').show();
                if (device.isMobile() && !this.audioPopupClicked) {
                    controller.audioPopupOpen = true;
                    $('#player_audioPopupWrapper').dialog("open");
                } else {
                    $("#splashContainer, #player_audioPopupWrapper").hide();
                }
            }
        }
        model.loadCourse();
    },

    playSplashIfOn:function()
    {
        model.isSplash = true;        
        $(".player_middleNav").hide();
        var video = {};
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0 && (isMobile.any != null || !isMobile.any)) {
            var width = screen.width;
            var height = screen.height;
            var left = (screen.width - 1024) / 2;
            $("#splashContainer .vidContainer").css("left", left);
        }        

        $("#player_preLoader").css({"visibility": "hidden", "display": "none"});
        
        $(".letsGoBtn").one("click", function() {
            language.loadInitialContent();
        });

        var splashWidth = $(".player_container_style").width();
        var splashHeight = $(".player_container_style").height();       

        if (splashHeight > $("body").height()) {
            splashHeight = $("body").height();
        }

        $("#splashContainer").css("height", "100%");
        $("#splashContainer").css("width", "100%");
        $("#splashContainer").show();    
    },

    loadInitialContent: function() {
        model.isSplash = false;
        $("#player_bookmarkPopupWrapper").removeClass('on');
        $('.mediaPlayBtn').hide();
        $('.courseLoading').fadeIn(function() {
           $(this).addClass('startTimer'); 
        });
        var getPageNo = 1;
        var get_path = "m1_t1_p1";
        if(model.curretSlideMoved == 0){
            preloadImages.init(get_path, getPageNo);
        }else{
            intro.slideMaindiv(model.curretSlideMoved);
        }
        imageLoader.loadImages($('.courseImages'), language.loadFullModuleVideo);
        
    },
    loadFullModuleVideo: function() {
        language.courseVideoArr = [];
        language.convertedVideoArr = [];
        language.videoCount = 0;
        language.createBlobURL();
    },

    // checkVideoArr: function() {
    //     if(language.courseVideoArr[language.changedModuleVideoCount]) {
    //         if(language.courseVideoArr[language.changedModuleVideoCount].video.length > language.convertedVideoArr[language.changedModuleVideoCount].video.length) {
    //             language.videoCount = 0;
    //             language.createBlobURL();
    //         }
    //     } else {
    //         language.intializePage();
    //     }
    // },

    createBlobURL: function() {
        if(language.courseVideoArr.length > language.convertedVideoArr.length) {
            var req = new XMLHttpRequest();
            req.open('GET', language.courseVideoArr[language.videoCount], true);
            req.responseType = 'blob';
            req.onload = function() {
               // Onload is triggered even on 404
               // so we need to check the status code
               if (this.status === 200) {
                  var videoBlob = this.response;
                  var vid = URL.createObjectURL(videoBlob); // IE10+
                  // Video is now downloaded
                  // and we can set it as source on the video element
                  language.convertedVideoArr[language.videoCount] = vid
                  language.videoCount++;
                  language.createBlobURL();
                  // video.src = vid;
               }
            }
            req.onerror = function() {
               // Error
            }
            req.send();
        } else {
            // console.log(language.convertedVideoArr);
            language.intializePage();
        }
    },

    intializePage: function() {        
        if (!controller.audioPopupOpen) {
            model.showPage(model.currentModule, model.currentTopic, model.currentPage);               
        }
    }


}