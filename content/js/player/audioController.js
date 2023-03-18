var audioController = {
    audioElement: {},
    CorrectAnsaudioElement: {},
    audioCuePoints: [],
    audioCueOutPoints: [],
    isAudioPlaying: false,
    isAudioPageend: true,
    isPopupAudio: false,
    isVideoPaused: false,
    isVideoMuted: false,
    init: function() {
        this.audioElement = $("#player_audio");
        this.popupAudioElement = $("#popupAudio");
        this.tab1AudioElement = $("#tabAudio1");
        this.tab2AudioElement = $("#tabAudio2");
        this.tab3AudioElement = $("#tabAudio3");
        this.CorrectAnsaudioElement = $("#CorrectAns");
        this.audioElement.bind('canplaythrough', audioController.canPlayAudio);
        this.audioElement.bind('ended', audioController.audioEnded);
        this.audioElement.bind('loadstart', audioController.loadStarted);
        this.audioElement.bind('loadeddata', audioController.loaded);
        this.audioElement.bind('timeupdate', audioController.timeupdate);
        this.popupAudioElement.bind('ended', audioController.endPopupAudio);
        audioController.updateVolume();
    },


    loadAudio: function(audioFile) {
        model.isPause = false;
        controlsHandeler.playPauseEnabled = true;
        if (!model.useAudio || typeof(audioFile) == "undefined" || audioFile == "") {
            return;
        }
        this.clearAudio();               
        
        $('#play_pause').addClass("pauseBtn").removeClass("playBtn");
        this.audioElement.attr('src', audioFile);
        this.audioElement.get(0).load();
        this.audioElement.get(0).play();
        audioController.updateVolume();
        // alert("load");        
    },

    loadStarted: function() {
        // console.log("loadStarted");
    },

    loaded: function() {
        /* todo: change 8 */
        //console.log(model.audioElem.duration+"   dfffff");
        /*todo: change 2*/
        //console.log("event dispatched");

        model.audioElem.dispatchEvent(events.audioStarted);
        model.isLoading = "loaded";
         audioController.unmuteAudio();
        // console.log("loaded");   
        // audioController.playAudio();
    },

    canPlayAudio: function(e) {
        //console.log("canPlayAudio");
        if(!model.isMute){
            audioController.unmuteAudio();
        }
        else{
            audioController.muteAudio();
        }
        if (!audioController.isPopupAudio) {
            controller.startPlayingAudio();
        }
    },

    audioEnded: function() {
        console.log("audioEnded :::::::::::::::::::");
        model.isPause = true;
        //alert(audioController.isPopupAudio)
        if (!audioController.isPopupAudio) {
          
            controller.pageDivAudioFinished();
        } else {            
            controller.pagePopupAudioFinished();
            audioController.isPopupAudio = false;
        }

        if(model.index_audio){
            $("#Continue").removeClass("disable");
            model.index_audio = false;
            console.log("Index_audioEnded :::::::::::::::::::");
        }

        if(intro.currentScreen == 5){
             $('.tabContent1 .play').trigger('click');   
             $('.tabContent1 .play').removeClass("disable");
        } 

        if(intro.currentScreen == 7 && intro.get_attr1 == 3){
             $("#section3 .play").trigger('click');
              $('#section3 .play').removeClass("disable"); 
        } 

        

    },


    playMultiTabAudio:function(idx){
        
      this.isAudioPlaying = false;
        if (isFunction(this.popupAudioElement.get(0).pause)) {
            this.popupAudioElement.get(0).pause();
        }
        this.popupAudioElement.attr('src', '');

        var audioFilePath = model.getPageCurrentAudioPath(true, idx);
         audioController.isPopupAudio = true;
         alert(audioFilePath)
        this.popupAudioElement.attr('src', audioFilePath);
        this.popupAudioElement.get(0).load();
        this.popupAudioElement.get(0).play();
    },

    clearAudio: function() {
        this.isAudioPlaying = false;
        if (isFunction(this.audioElement.get(0).pause)) {
            this.audioElement.get(0).pause();
        }
        this.audioElement.attr('src', '');
               //this.CorrectAnsaudioElement.attr('src', '');
    },
    pauseAudio: function() {
        this.isAudioPlaying = false;
        this.audioElement.get(0).pause();        
    },
   pauseVideo:function(){
        $("video").each(function() {
            if ($(this).parent().attr('id') != "splash") {
               
                if  ($(this).get(0).currentTime > 0 && !$(this).get(0).paused && !$(this).get(0).ended && $(this).get(0).readyState > 2){
                    audioController.isVideoPaused = true;
                      $(this).get(0).pause();
                }

            }
        });
   },
    
    playVideo:function(){
     $("video").each(function() {
            if ($(this).parent().attr('id') != "splash") {
               if(audioController.isVideoPaused){
                if ($(this).get(0).currentTime > 0 && $(this).get(0).paused && !$(this).get(0).ended && $(this).get(0).readyState > 2)
                {
                    audioController.isVideoPaused = false
                      $(this).get(0).play();
                
                }
               }
                

            }
        });
    },

    playAudio: function() {
        this.isAudioPlaying = true;
        this.audioElement.get(0).play();
        if($('#audioOnOff').hasClass('audioON')){            
            audioController.updateVolume();             
        }else{
            this.audioElement.prop("volume", 0);
        }

    },
    
    muteAudio: function() {
        console.log("muted")
        //this.audioElement.prop('muted', true);
        this.audioElement.prop("volume", 0);
        this.popupAudioElement.prop("volume", 0);  
        this.tab1AudioElement.prop("volume", 0);  
        this.tab2AudioElement.prop("volume", 0);  
        this.tab3AudioElement.prop("volume", 0); 
      
    },
    muteVideo:function(){
        audioController.isVideoMuted = true;
        $("video").prop('muted', true);
    },
    unmuteVideo:function(){
        //alert(audioController.isVideoMuted)
        if(audioController.isVideoMuted){
             $("video").prop('muted', false);
              audioController.isVideoMuted = false;
        }
       
    },
    unmuteAudio: function() {
        audioController.updateVolume();        
    },

    unmuteAssessmentAudio: function() {
       // alert('sdsadsd')
        this.audioElement.prop('muted', false);
    },

    timeupdate: function() {
        if (audioController.audioCuePoints.length > 0 && audioController.audioElement.get(0).currentTime >= audioController.audioCuePoints[0]) {
            animationController.showWithAudioIDAndCueIn(model.pageCurrentAudioCount, audioController.audioCuePoints[0]);
            audioController.audioCuePoints.splice(0, 1);
        }
        if (audioController.audioCueOutPoints.length > 0 && audioController.audioElement.get(0).currentTime >= audioController.audioCueOutPoints[0]) {
            //console.log("time to go");
            animationController.hideWithAudioIDAndCueOut(model.pageCurrentAudioCount, audioController.audioCueOutPoints[0]);
            audioController.audioCueOutPoints.splice(0, 1);
        }
    },

    playTabAudio: function(tabIndex) {
        if (!model.useAudio) {
            controller.pagePopupAudioFinished();
            return;
        }
        
        audioController.isPopupAudio = true;

        //var audioFilePath = "content/audio/mp3/m" + model.currentModule + "_t" + model.currentTopic + "_p" + model.currentPage + "_pop" + tabIndex + ".mp3";
        var audioFilePath = model.getPageCurrentAudioPath(true, tabIndex);
        console.log("audio File:" + audioFilePath);      
        model.isLoading = "startLoading";

        var req = new XMLHttpRequest();
        req.open('GET', audioFilePath, true);
        req.responseType = 'blob';

        req.onload = function() {
            // Onload is triggered even on 404
            // so we need to check the status code
            if (this.status === 200) {
                //console.log("lodingDone  -------------- " + audioFilePath)
                var audioBlob = this.response;
                audioFilePath = URL.createObjectURL(audioBlob); // IE10+
                audioController.loadAudio(audioFilePath);
            }
        }
        req.onerror = function() {}
        req.send();
    },

    playSecAudio: function(audioName) {
        if (!model.useAudio) {
            controller.pagePopupAudioFinished();
            return;
        }        
        audioController.isPopupAudio = true;
        var audioFilePath = "content/audio/mp3/en/"+audioName+".mp3";

       // this.popupAudioElement.bind('ended', audioController.secAudioEnded(audioName));   

        console.log("audio File:" + audioFilePath);      
        model.isLoading = "startLoading";

        var req = new XMLHttpRequest();
        req.open('GET', audioFilePath, true);
        req.responseType = 'blob';

        req.onload = function() {
            // Onload is triggered even on 404
            // so we need to check the status code
            if (this.status === 200) {
                //console.log("lodingDone  -------------- " + audioFilePath)
                var audioBlob = this.response;
                audioFilePath = URL.createObjectURL(audioBlob); // IE10+
                audioController.loadAudio(audioFilePath);
            }
        }
        req.onerror = function() {}
        req.send();
    },
    secAudioEnded: function(fun){
        console.log(fun+"audio ended")
    },


     /*playCorrectAns:function(){
              
        this.clearAudio();
        var audioFilePath = "content/audio/mp3/Correct_answer.mp3";
        //console.log("audio File:" + audioFilePath);
        this.CorrectAnsaudioElement.attr('src', audioFilePath);
        this.CorrectAnsaudioElement.get(0).load();
        this.CorrectAnsaudioElement.get(0).play();
    },

     playInCorrectAns:function(){
              
        this.clearAudio();
        var audioFilePath = "content/audio/mp3/incorrect_answer.mp3";
        //console.log("audio File:" + audioFilePath);
        this.CorrectAnsaudioElement.attr('src', audioFilePath);
        this.CorrectAnsaudioElement.get(0).load();
        this.CorrectAnsaudioElement.get(0).play();
    },*/
    endPopupAudio: function () {
       /* var audioUrl = audioController.popupAudioElement.attr("src");

        if(audioUrl.indexOf("_correct_answer") > -1){
            $('.set_div').hide();
            $('.cont_button').css({'display':'block'});

        } else if(audioUrl.indexOf("_incorrect_answer") > -1){
            $('.set_div').hide();
            $('.cont_button').css({'display':'block'});
        } else {
             $('.over_look').hide();
             $('.over_look_1').hide();

        }
        if(page.questionViewed == 6){
            $('.set_div').hide();
            $("#continue_finish").fadeIn();
        }*/
        
    }, 
    /*congoCorrectAns:function(){    
        this.clearAudio();
        var audioFilePath = "content/audio/mp3/congratulations_nuggets.mp3";
        audioController.loadAudio(audioFilePath)
        //console.log("audio File:" + audioFilePath);
        // this.CorrectAnsaudioElement.attr('src', audioFilePath);
        // this.CorrectAnsaudioElement.get(0).load();
        // this.CorrectAnsaudioElement.get(0).play();
    },*/
     playChecklistAudio:function(arg,n1){ 
           if(n1 == undefined || n1 == 'undefined'){
            model.currentAudioNo = 1
           }else{
            model.currentAudioNo = n1;
           }
        this.clearAudio();
         //audioController.isPopupAudio = true;  
        model.currentAudioNo = n1;
        var audioFilePath = "content/audio/mp3/"+language.userlanguage+"/"+arg+".mp3";

        var req = new XMLHttpRequest();
        req.open('GET', audioFilePath, true);
        req.responseType = 'blob';

        req.onload = function() {
            // Onload is triggered even on 404
            // so we need to check the status code
            if (this.status === 200) {
                //console.log("lodingDone  -------------- " + audioFilePath)
                var audioBlob = this.response;
                audioFilePath = URL.createObjectURL(audioBlob); // IE10+
                audioController.loadAudio(audioFilePath);
            }
        }
        req.onerror = function() {}
        req.send();
        
    },
    updateVolume:function(){
        var value = $("#volcontrol").slider("value");        
        this.audioElement.prop("volume", (value / 100));
        this.popupAudioElement.prop("volume", (value / 100));  
        this.tab1AudioElement.prop("volume", (value / 100));  
        this.tab2AudioElement.prop("volume", (value / 100));  
        this.tab3AudioElement.prop("volume", (value / 100));  

       // setTimeout(function(){model.audio1Player.prop("volume", (value / 100));},100)   
        
    }    

};
