var carousal = {
    currentSelected: 0,
    showNext :false,
    carousalVisited :false,
    carousalVisited :false,
    objArr:["-1","-1","-1","-1","-1","-1"],
    isDone :false,
    init: function() {
        carousal.isDone = false;
        carousal.objArr = ["-1","-1","-1","-1","-1","-1"],
        $("#player_preLoader").css("visibility", "visible");
        $("#info .contentBox").hide();
        imageLoader.loadImages($('.player_content #pageDiv'), carousal.initCarousal);
        
       
    },
 checkData:function() {    
        carousal.showNext = true;
        console.log(" carousal.objArr.length " + carousal.objArr.length);
        for(var i= 0; i < carousal.objArr.length; i++) {
            if(carousal.objArr[i] == "-1"){
                carousal.showNext = false;
                break;
            }           
        }
        
        if(carousal.showNext && !carousal.isDone){
            carousal.isDone = true;
           
            setTimeout(function() {
                if(carousal.carousalVisited == false){
                    carousal.carousalVisited = true;
                  //  audioController.playTabAudio(1);
                    $(".resources_icon").fadeIn();
              //       setTimeout(function() {
              //           controller.pageDone();
              // controller.showNextBlinker();         
              //       }, 9200);
                }
           }, 500);
        }


    },
    initCarousal: function() {
        carousal.carousalVisited = false;
        carousal.currentSelected = Math.floor($('.carousal .cover').length / 2);
        carousal.showNext = false;
        carousal.objArr = ["-1","-1","-1","-1","-1","-1"];
       
        /*if ($.fn.reflect) {
            $('.carousal .cover').reflect();
        }*/
      // $(this).addClass("tabaaaa");

        $('.carousal').coverflow({
            index: carousal.currentSelected,
            density: 1,
            /*width: 10,*/
            innerOffset: 0,
            innerScale: 1,
            outerAngle: 0,
            visible: 'all',
            selectedCss: {
                opacity: 1
            },
            outerCss: {
                opacity: 0.5
            },
            select: function(event, cover) {
                $(".contentBox").hide();
                $("#info #tab" + carousal.currentSelected).hide();
                var img = $(cover).children().andSelf().filter('img').last();
                carousal.currentSelected = img.attr("id");
                $("#info #name").text(img.data('name') || 'unknown');
                //$("#info #tab" + carousal.currentSelected).hide();
               $('.carousal').css("pointer-events","none");  
                setTimeout(function(){
                    $('.carousal').css("pointer-events","auto");  
                $("#info #tab" + carousal.currentSelected).fadeIn();
                    
                },500)
                    
              

                //$("#info #tab" + carousal.currentSelected).show();      
                //carousal.objArr[carousal.currentSelected-1] = ('selected'+carousal.currentSelected); 
                carousal.checkData();
            }
        });

        $(window).on("resize", carousal.refreshCarousal);
        $('.carousal').coverflow('refresh');
        $("#player_preLoader").css("visibility", "hidden");
    },

  
    refreshCarousal: function() {
        carousal.isDone = false;
        $('.carousal').coverflow('refresh');
    },

    unload: function() {
        carousal.isDone = false;
        $(window).off("resize", carousal.refreshCarousal);
        $('.carousal').coverflow('destroy');
        carousal.currentSelected = 0;
        carousal.isDone = false;
    }
}
