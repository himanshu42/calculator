var preloadImages = {

    init: function(get_page, get_path) {
        $('.courseImages').html('');

        var imgPath = "<img src='content/images/pages/";
        var closeDiv = " />";
        var imageContainer = $('.courseImages');

        if (get_page == "m1_t1_p1") {           
            // imageContainer.append(imgPath + "global/001.png' />");
            // imageContainer.append(imgPath + "global/002.png' />");
            // imageContainer.append(imgPath + "global/Arrow_Icon.png' />");
            // imageContainer.append(imgPath + "global/as001.png' />");
            // imageContainer.append(imgPath + "global/as002.png' />");
            // imageContainer.append(imgPath + "global/back.png' />");
            // imageContainer.append(imgPath + "global/bg.png' />");
            // imageContainer.append(imgPath + "global/bg_lancher.jpg' />");
            // imageContainer.append(imgPath + "global/btn.png' />");
            // imageContainer.append(imgPath + "global/bullet1.png' />");
            // imageContainer.append(imgPath + "global/bullet1_.png' />");
            // imageContainer.append(imgPath + "global/bullet2.png' />");
            // imageContainer.append(imgPath + "global/bullet3.png' />");
            // imageContainer.append(imgPath + "global/button_Hover.png' />");
            // imageContainer.append(imgPath + "global/button_normal.png' />");
            // imageContainer.append(imgPath + "global/callout-bg.png' />");
            // imageContainer.append(imgPath + "global/callout.png' />");
            // imageContainer.append(imgPath + "global/cir.png' />");
            // imageContainer.append(imgPath + "global/cloud.png' />");
            // imageContainer.append(imgPath + "global/Comp_10.jpg' />");
            // imageContainer.append(imgPath + "global/congo.png' />");
            // imageContainer.append(imgPath + "global/continue.png' />");
            // imageContainer.append(imgPath + "global/continue2.png' />");
            // imageContainer.append(imgPath + "global/continue_1.png' />");
            // imageContainer.append(imgPath + "global/continue_2.png' />");
            // imageContainer.append(imgPath + "global/correct.png' />");
            // imageContainer.append(imgPath + "global/cross_icn.png' />");
            // imageContainer.append(imgPath + "global/dot.jpg' />");
            // imageContainer.append(imgPath + "global/downdv.png' />");
            // imageContainer.append(imgPath + "global/Flage_Sprite_Vertical.png' />");
            // imageContainer.append(imgPath + "global/global-hover.png' />");
            // imageContainer.append(imgPath + "global/global.png' />");
            // imageContainer.append(imgPath + "global/globe-hover.png' />");
            // imageContainer.append(imgPath + "global/globe.png' />");
            // imageContainer.append(imgPath + "global/hut.png' />");
            // imageContainer.append(imgPath + "global/incorrect.png' />");
            // imageContainer.append(imgPath + "global/info_ic_hover.png' />");
            // imageContainer.append(imgPath + "global/info_ic_normal.png' />");
            // imageContainer.append(imgPath + "global/line.png' />");
            // imageContainer.append(imgPath + "global/logo.png' />");
            // imageContainer.append(imgPath + "global/map.jpg' />");
            // imageContainer.append(imgPath + "global/mappin.png' />");
            // imageContainer.append(imgPath + "global/next-hover.png' />");
            // imageContainer.append(imgPath + "global/next.png' />");
            // imageContainer.append(imgPath + "global/PlayIcon.png' />");
            // imageContainer.append(imgPath + "global/pre-hover.png' />");
            // imageContainer.append(imgPath + "global/pre.png' />");
            // imageContainer.append(imgPath + "global/resources_icon.png' />");
            // imageContainer.append(imgPath + "global/return_hover.png' />");
            // imageContainer.append(imgPath + "global/return_normal.png' />");
            // imageContainer.append(imgPath + "global/right.png' />");
            // imageContainer.append(imgPath + "global/right_w.png' />");
            // imageContainer.append(imgPath + "global/scroll.png' />");
            // imageContainer.append(imgPath + "global/shield.png' />");
            // imageContainer.append(imgPath + "global/sprite.png' />");
            // imageContainer.append(imgPath + "global/sprite2.png' />");
            // imageContainer.append(imgPath + "global/sub_bullet1.png' />");
            // imageContainer.append(imgPath + "global/sub_bullet2.png' />");
            // imageContainer.append(imgPath + "global/sub_bullet3.png' />");
            // imageContainer.append(imgPath + "global/thankyou-shield.png' />");
            // imageContainer.append(imgPath + "global/tick.png' />");
            // imageContainer.append(imgPath + "global/tickicon.png' />");
            // imageContainer.append(imgPath + "global/tick_icn.png' />");
            // imageContainer.append(imgPath + "global/volumebtn.png' />");
            // imageContainer.append(imgPath + "global/wrong.png' />");
            // imageContainer.append(imgPath + "global/wrong_w.png' />");
            // imageContainer.append(imgPath + "global/yelcir.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/abbie_lennox.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/bayer_transparency_final.jpg' />");
            // imageContainer.append(imgPath + "m1_t1_p1/bg.jpg' />");
            // imageContainer.append(imgPath + "m1_t1_p1/christine.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/christine_over.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/david.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/jacobe.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/jacobe_over.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/jurgen.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/mike.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/monika.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/nick.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/nick_over.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/page2_bg.jpg' />");
            // imageContainer.append(imgPath + "m1_t1_p1/robert.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/shirley.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/shirley_over.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/Contract-based-partnerships/img1.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/Contract-based-partnerships/img2.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/Contract-based-partnerships/img3.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/Contract-based-partnerships/james.png' />");
            // imageContainer.append(imgPath + "m1_t1_p1/key_objective/upperImg.jpg' />");
            // imageContainer.append(imgPath + "m1_t1_p1/science-collaboration-explorer/drop_img.jpg' />");
            // imageContainer.append(imgPath + "m1_t1_p1/science-collaboration-explorer/tab.png' />");
            // imageContainer.append(imgPath + "preloadBg/auditoriam.jpg' />");
            // imageContainer.append(imgPath + "preloadBg/earth.jpg' />");
            // imageContainer.append(imgPath + "preloadBg/explorer.jpg' />");
            // imageContainer.append(imgPath + "preloadBg/page1.jpg' />");
                        
        }
    },

}