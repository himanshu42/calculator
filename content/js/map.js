 var map = {
        tl: null,
        mySlider: null,
        animation1:'',
        animation2:'',
        animation3:'',
        animation4:'',
        total_duration: 11,
        pageInit: function() { 
            $("#earthVideo").get(0).play();
            map.setDefaultposition();
            // setTimeout(function(){
            //      supplier.screen1_anim(); 
            // },1000);

            setTimeout(function(){
                map.animCall();
            },1000); 
             
                $(".navBtnContainer").hide();
             
           
           
            var vid = document.getElementById("earthVideo");
            vid.oncanplay = function() {
                setTimeout(function(){
                    $('.footer, .header, .player_contentArea_style').show();
                    $("#splashContainer, #player_audioPopupWrapper").hide(1000);
                    $("#splashContainer").addClass("hidevedio");
                    // $("#bg_player").attr("src", "content/audio/mp3/en/background_music.mp3"); 
                    // $("#bg_player").get(0).load();
                    // $("#bg_player").get(0).play();
                    // document.getElementById("bg_player").volume = 0.2
                },1000)              
            };           
 
            
            $(".map_icon_overlay").on("click", function(){
                 $(this).hide();
                 $(".map_infodiv").fadeOut();
                 $(".map_infodiv").removeClass("active");  
                 $(".map_icon").removeClass("active");                    
                 $(".map_infodiv_inner div").removeClass("fade_div");    
                 $(".info_discover").addClass("disable");       
            }); 
            

            $(".map_icon").hover(function(e){
                if($(this).hasClass("active")){

                }else{                                      
                    $(".map_icon_overlay").show();   
                     $(".info_discover").addClass("disable");        
                    $(".map_icon").removeClass("active");
                    $(".map_icon.map_icon3").removeClass("visited"); 
                    $(this).addClass("active");
                   // $(this).addClass("visited");
                   $(".info_img, .info_title, .info_text, .info_discover").removeClass("fade_div");  
                   clearTimeout(map.animation1);
                   clearTimeout(map.animation2);
                   clearTimeout(map.animation3);
                   clearTimeout(map.animation4);
                    var Getid = $(this).attr("data-attr");
                    $(".map_infodiv").hide();
                    $(".map_infodiv").removeClass("active");
                    $("#"+Getid).fadeIn();
                    $("#"+Getid).addClass("active");

                   map.animation1 = setTimeout(function(){
                        $(".info_img").addClass("fade_div");                        
                    },500);
                   map.animation2 =  setTimeout(function(){                       
                        $(".info_title").addClass("fade_div");                       
                    },1000);
                   map.animation3 =  setTimeout(function(){                        
                        $(".info_text").addClass("fade_div");                       
                    },1500);
                   map.animation4 =  setTimeout(function(){
                        $(".info_discover").addClass("fade_div");
                        $(".info_discover").removeClass("disable");
                    },2000);
                }                
            })
            controller.slideVistedStFn();
        },
        animCall: function(){            
            model.twinmaxstaggerToVal(".mapModule #scrn1_08", 0.5, 0, 0, 1, Linear.easeNone, 0, null, null, 0.6, null); 

            model.twinmaxstaggerToVal(".mapModule #scrn1_1", 0.5, 0, 0, 1, Linear.easeNone, 0, null, null, 0.6, map.anim1_Done); 
           
            model.twinmaxstaggerToVal(".mapModule #scrn1_4", 0.5, 0, 0, 1, Linear.easeNone, 1, null, null, 0.6, map.anim4_Done); 
            model.twinmaxstaggerToVal(".mapModule #scrn1_5", 0.5, 0, 0, 1, Linear.easeNone, 2, null, null, 0.6, map.anim5_Done); 
            model.twinmaxstaggerToVal(".mapModule #scrn1_6", 0.5, 0, 0, 1, Linear.easeNone, 2.5, null, null, 0.6, map.anim6_Done);
            
            // model.twinmaxstaggerToVal(".mapModule #scrn1_7", 0.5, 0, 0, 1, Linear.easeNone, 3, null, null, 0.6, map.anim7_Done); 
            // model.twinmaxstaggerToVal(".mapModule #scrn1_8", 0.5, 0, 0, 1, Linear.easeNone, 1.5, null, null, 0.6, map.anim8_Done); 
            
            model.twinmaxstaggerToVal(".mapModule #scrn1_9", 0.5, 0, 0, 1, Linear.easeNone, 3, null, null, 0.6, map.anim9_Done); 
            model.twinmaxstaggerToVal(".mapModule #scrn1_10", 0.5, 0, 0, 1, Linear.easeNone, 3.5, null, null, 0.6, map.anim10_Done); 
            model.twinmaxstaggerToVal(".mapModule #scrn1_11", 0.5, 0, 0, 1, Linear.easeNone, 3, null, null, 0.6, map.anim11_Done); 
            model.twinmaxstaggerToVal(".mapModule #scrn1_12", 0.5, 0, 0, 1, Linear.easeNone, 3.5, null, null, 0.6, map.anim12_Done); 
            model.twinmaxstaggerToVal(".mapModule #scrn1_13", 0.5, 0, 0, 1, Linear.easeNone, 4, null, null, 0.6, null); 
            model.twinmaxstaggerToVal(".mapModule #scrn1_14", 0.5, 0, 0, 1, Linear.easeNone, 4.5, null, null, 0.6, null); 
            model.twinmaxstaggerToVal(".mapModule #scrn1_15", 0.5, 0, 0, 1, Linear.easeNone, 4.5, null, null, 0.6, map.anim15_Done);
        },
        anim1_Done: function(){
            $(".map_icon1").addClass("map_icon_animation");
            // if(model.courseXMLObj["mod_" + 1]["topic_" + 1]["page_" + 1].status == 2) {               
            //     model.tl.progress(99); 
            // } 
        },
        anim4_Done: function(){
            document.getElementById("bg_player").volume = 0.2
        },
        anim5_Done: function(){
            $(".map_icon2").addClass("map_icon_animation");
        },
        anim6_Done: function(){
            $(".map_icon3").addClass("map_icon_animation");
        },
        anim7_Done: function(){
            $(".map_icon4").addClass("map_icon_animation");
        },
        anim8_Done: function(){
            $(".map_icon5").addClass("map_icon_animation");
        },
        anim9_Done: function(){
            $(".map_icon6").addClass("map_icon_animation");
        },
        anim10_Done: function(){
            $(".map_icon7").addClass("map_icon_animation");
        },
        scrn1_08_Done: function(){
            $(".map_icon8").addClass("map_icon_animation");
        },
        anim11_Done: function(){
            // if(model.courseXMLObj["mod_" + 1]["topic_" + 1]["page_" + 1].status == 2) { 
            //      $(".helicopter_div").addClass("helicopter_animation");
            //     $(".helicopter_div_inner").addClass("helicopter_animation_nonanim");
            // }else{

               // $(".helicopter_div").addClass("helicopter_animation"); 
                $(".helicopter_div_inner").addClass("helicopter_animation1");
            // }
            //$(".helicopter_div").addClass("helicopter_animation");
            //$(".helicopter_div_inner").addClass("helicopter_animation1");  
        },
        anim12_Done: function(){   
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
            if(!hasAllTopicVisted){
                map.pop_audio("Chooseyourdestinationbymov");
            }
        },
        anim15_Done: function(){
            $(".map_icon").removeClass("disable");
        },
        pop_audio:function(sourceUrl){            
            var audio = $("#audio_player");
            sourceUrl1 = "content/audio/mp3/en/"+sourceUrl+".mp3";
            audio.attr("src", sourceUrl1);            
            audio.get(0).load();
            audio.get(0).play(); 
                     
        },
        setDefaultposition: function(){
            model.twinmaxSetVal(".mapModule #scrn1_08", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_1", 0, null, 0);            
            model.twinmaxSetVal(".mapModule #scrn1_4", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_5", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_6", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_7", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_8", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_9", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_10", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_11", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_12", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_13", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_14", 0, null, 0);
            model.twinmaxSetVal(".mapModule #scrn1_15", 0, null, 0);
        },
        unloadPage: function() {
            model.tl.clear();
        },
        onComplete: function() {
            
        }
    }