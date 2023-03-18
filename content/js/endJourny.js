var endJourny = {
        tl: null,
        mySlider: null,
        pageInit: function() {
            endJourny.setDefaultposition();
            var getAudioName = $(".endJournySec").attr("audioName");
            audioController.playSecAudio(getAudioName);
            endJourny.endScreenDone();
        },
        endScreenDone: function(){
            $('.endJournySec .line').addClass('lineanim');               
            model.twinmaxstaggerToVal(".endJournySec #scrn1_1", 0.5, 0, 0, 1, Linear.easeNone, 0.5, null, null, 0.6, null); 
            model.twinmaxstaggerToVal(".endJournySec #scrn1_2", 0.5, 0, 0, 1, Linear.easeNone, 1, null, null, 0.6, null);
            model.twinmaxstaggerToVal(".endJournySec #scrn1_3", 0.5, 0, 0, 1, Linear.easeNone, 1, null, null, 0.6, null);
            model.twinmaxstaggerToVal(".endJournySec #scrn1_4", 0.5, 0, 0, 1, Linear.easeNone, 2, null, null, 0.6, null);
            model.twinmaxstaggerToVal(".endJournySec #scrn1_5", 0.5, 0, 0, 1, Linear.easeNone, 5, null, null, 0.6, null);
            model.twinmaxstaggerToVal(".endJournySec #scrn1_6", 0.5, 0, 0, 1, Linear.easeNone, 5, null, null, 0.6, null);
           
        },
        setDefaultposition: function(){
            model.twinmaxSetVal(".endJournySec #scrn1_1", 0, -20, 0);
            model.twinmaxSetVal(".endJournySec #scrn1_2", -20, null, 0);
            model.twinmaxSetVal(".endJournySec #scrn1_3", 0, -20, 0);
            model.twinmaxSetVal(".endJournySec #scrn1_4", -20, null, 0);
            model.twinmaxSetVal(".endJournySec #scrn1_5", -20, null, 0);
            model.twinmaxSetVal(".endJournySec #scrn1_6", 20, null, 0);
        }
    }