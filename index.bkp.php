 <!doctype html>
<html>
<link rel="icon" href="fav.png" />  
<?php
if(isset($_COOKIE['type']) && isset($_COOKIE['username']) && $_COOKIE['type']== "cio_landing.php")
        {
            
            header("location:cio_landing.php");
            //echo "settttttttt";
            exit();
        }
        include('config.php');
        include('top_header.php');
        include('header.php');
?>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="CXO HONOUR is a B2B platform that enables industry leading CIOs to share and exchange their success with ICT vendors in their peer networks and the community at large. The platform truly promotes the \"Voice of the CFO \" to select and honour Products, Services and Solutions; recognising the ICT vendors for their outstanding commitment to service quality and professionalism in the \'local\' context.">
        <meta name="author" content="CXO HONOUR">
        <meta name="keywords" content="CIO, ICT Vendor, products, services, solutions, success">                
        <title>Welcome to CFOHONOUR AWARDS Home</title>  

        <link rel="shortcut icon" href="fav.png" type="image/x-icon">
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <link href="css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css" />
        
        <!-- Required CSS -->

        <!--[if lt IE 9]>
        <link href="css/movingboxes-ie.css" rel="stylesheet" media="screen" />
        <![endif]-->
        <script type="text/javascript" src="js/jquery.js"></script> 
        <script src="http://jwpsrv.com/library/c+e6yqaJEeO1oCIACmOLpg.js"></script>
        <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
        <link href="css/developerdevday7.css" type="text/css" rel="stylesheet">
        <script type="text/javascript" src="js/jquery.sky.carousel-1.0.2.min.js"></script>
        
        <link href="css/twitter-styles.css" rel="stylesheet" type="text/css" />
        <link href="css/rcarousel.css" rel="stylesheet" type="text/css">

        <!--  added for the video player -->
        <!-- Chang URLs to wherever Video.js files will be hosted -->
        <link href="video-js.css" rel="stylesheet" type="text/css">
        <!-- video.js must be in the <head> for older IEs to work. -->
        <script src="video.js"></script>
<style type="text/css">
#container {
 width:1250px;
 position: relative;
 margin: 0 auto;
 background:#e73535;
}

#carousel {
 width:1250px;
 margin: 0 auto;
}

#ui-carousel-next, #ui-carousel-prev {
 width: 60px;
 height:60px;
 background: url(images/arrow-left.png) #fff center center no-repeat;
 display: block;
 position: absolute;
 top: 0;
 z-index: 100;
}

#ui-carousel-next {
 right: 0;
 top:45%;
 background-image: url(images/arrow-right.png);
}

#ui-carousel-prev {
 left: 0;
 top:45%;
}

#ui-carousel-next > span, #ui-carousel-prev > span {
 display: none;
}

.slide {
 margin: 0;
 position: relative;
}

.slide  h1 {
 font: 45px/1 'Source Sans Pro'; 
 color: #fff;
 font-weight:bold;
 margin:-30px 0px 0px 140px;
 height:auto;
 line-height:50px;
 padding: 0;
 width:630px;
 text-transform:capitalize;
}

.slide  p {
 font: 20px/1 'Source Sans Pro'; 
 color: #fff;
 margin-top:15px;
 padding: 0;
}

#slide01 > img {
 position: absolute;
 bottom:77px;
 right:285px;
}

#slide01 > .text {
 position: absolute;
 left:0px;
 top: 115px;
}

#slide02 > img {
 position: absolute;
 bottom:77px;
 right:285px;
}

#slide02 > .text {
 position: absolute;
 left:0px;
 top:115px;
}

#slide03 > img {
 position: absolute;
 bottom:77px;
 right:285px;
}

#slide03 > .text {
 position: absolute;
 left:0px;
 top:115px;
}

#slide04 > img {
 position: absolute;
 bottom:77px;
 right:285px;
}

#slide04 > .text {
 position: absolute;
 left:0px;
 top:115px;
}

#slide05 > img {
 position: absolute;
 bottom:77px;
 right:285px;
}

#slide05 > .text {
 position: absolute;
 left:0px;
 top:115px;
}

#slide06 > img {
 position: absolute;
 bottom: 10px;
 right: 20px;
}

#slide06 > .text {
 position: absolute;
 left:0px;
 top:115px;
}

#pages {
    bottom: -40px;
    left: 44%;
    margin: 0 auto;
    position: absolute;
    width: 150px;
}

.bullet {
 background: url(images/page-off.png) center center no-repeat;
 display: block;
 width: 18px;
 height: 18px;
 margin: 0;
 margin-right: 5px;
 float: left;    
}

.video {
    
    box-shadow: 0 5px 5px #231F20;
    height: 600px;
    left: 60px;
    margin: 0;
    position: absolute;
    top: 88px;
    width: 100%;
    z-index: 1;
}
</style>   
        <!-- Unless using the CDN hosted version, update the URL to the Flash SWF -->
        <script>
            videojs.options.flash.swf = "video-js.swf";
        </script>
        <!-- added for the video player -->

        <script type="text/javascript">
            $(function() {
                $('.sky-carousel').carousel({
                    itemWidth: 260,
                    itemHeight: 260,
                    distance: 12,
                    selectedItemDistance: 75,
                    selectedItemZoomFactor: 1,
                    unselectedItemZoomFactor: 0.5,
                    unselectedItemAlpha: 0.6,
                    motionStartDistance: 210,
                    topMargin: 115,
                    circular: true,
                    autoSlideshow :false,
                    loop: false,
                    preload: true,
                    loopRewind: true,
                    gradientStartPoint: 0.35,
                    gradientOverlayColor: "#ebebeb",
                    gradientOverlaySize: 190,
                    selectByClick: false
                });
            });
        </script>
        <style type="text/css">
            @media only screen and (min-width: 960px) {#portfolio-wrapper img {min-height: 147px;}} 
            @media only screen and (min-width: 768px) and (max-width: 959px) {#portfolio-wrapper img {min-height: 115px;}}
        </style>
        <script src="js/jquery.easytabs.min.js" type="text/javascript"></script>

        <script type="text/javascript">
            $(document).ready(function() {
                //alert('developer');
                $('#tab-container').easytabs();
            });
        </script> 
    </head>

    <body>

        <?php

        //include( "phpjobscheduler/firepjs.php"); 
        
        
        ?>

        <div id="black_wrapper">
        <!--<a href="http://www.phpjobscheduler.co.uk/" title="phpJobScheduler"><img src="https://cio.cxohonour.com/dev/phpjobscheduler/firepjs.php?return_image=1" border="0" alt="phpJobScheduler"></a>-->
            <div class="">
              <div class="">
                 <!--carousel start-->
                        <div id="container"> 
                            <!-- <div id="carousel">
                                <div>
                                    <a target="_blank" href="advisory_panel.php?year=2016">
                                        <img style="height: 600px;width: 1250px;" src="images/ca1.jpg" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a  href="advisory_panel.php?year=2016">
                                        <img style="height: 600px;width: 1250px;" src="images/ca2.jpg" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a  href="awards.php">
                                        <img style="height: 600px;width: 1250px;" src="images/ca3.png" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a target="_blank" href="http://cioacademyasia.org">
                                        <img style="height: 600px;width: 1250px;" src="images/ca4.jpg" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a target="_blank" href="http://www.ideationedgeasia.org/">
                                        <img style="height: 600px;width: 1250px;" src="images/ca5.jpg" alt="" />
                                    </a>
                                </div>                          
                            </div> -->
                            <div id="carousel">
                                <div>
                                    <a target="_blank" href="awards.php?year=2015">
                                        <img style="height: 600px;width: 1250px;" src="images/1_Winners-2016.jpg" alt=""/>
                                    </a>
                                </div>
                                <div>
                                    <a  href="advisory_panel.php?year=2016">
                                        <img style="height: 600px;width: 1250px;" src="images/2_Advisory Council 2016.jpg" alt=""/>
                                    </a>
                                </div>
                                <div>
                                    <a  href="awards.php?year=2015">
                                        <img style="height: 600px;width: 1250px;" src="images/3_Winners-2015.png" alt=""/>
                                    </a>
                                </div>
                                <div>
                                    <a target="_blank" href="advisory_panel.php?year=2015">
                                        <img style="height: 600px;width: 1250px;" src="images/4_Advisory Council 2015.jpg" alt=""/>
                                    </a>
                                </div>
                                <div>
                                    <a target="_blank" href="http://cioacademyasia.org/">
                                        <img style="height: 600px;width: 1250px;" src="images/carasaulone.jpg" alt=""/>
                                    </a>
                                </div>  
                                <div>
                                    <a target="_blank" href="http://www.ideationedgeasia.org/">
                                        <img style="height: 600px;width: 1250px;" src="images/carasaultwo.jpg" alt=""/>
                                    </a>
                                </div>                          
                            </div>
                            <div id="pages"></div>
                        </div>
                        <!--carousel end-->
                
            </div>
            </div>
            <!-- VIDEO GALLERY -->
        </div>
    </div>
   
    <div style="padding-top:75px;" id="advisory_wrapper">
        <div class="sixteen columns">
            <div class="project">
                <div class="sky-carousel sc-no-select" style="visibility: visible;">
                    <div class="sky-carousel-wrapper" style="visibility: visible; opacity: 1;">
                        <h1 style="text-align:center; margin-top:37px; color:#20201F; font-size: 30px;font-weight: bold;">Our Advisory Council</h1>
                        <ul class="sky-carousel-container" style=" left: -1405px;">
                            <?php
                            $advisory_query1 = mysql_query("select * from advisory_panel");
                            $counter = 0;$imageSlider ='';
                            while ($advisory_res = mysql_fetch_array($advisory_query1))
                            {
                                $advisory_image = $advisory_res['advisory_image'];
                                $advisory_name = $advisory_res['advisory_name'];
                                $advisory_desination = $advisory_res['advisory_desination'];
                                $advisory_description = $advisory_res['advisory_description'];
                                $advisory_description = strip_tags($advisory_description,"<h1><h2><h3><h4><h5><h6><p>");
                                $advisory_description = str_replace("<div>", "", $advisory_description);
                                $advisory_description = str_replace("</div>", "", $advisory_description);
                                $advisory_description = str_replace("<p>", "", $advisory_description);
                                $advisory_description = str_replace("</p>", "", $advisory_description);    
                                
                                if (strlen($advisory_description) > 190)
                                {

                                    // truncate string
                                    $stringCut = substr($advisory_description, 0, 300);
                                    $advisory_description = substr($stringCut, 0, strrpos($stringCut, ' ')) . '<a style="font-weight:bold;" href="advisory_detail.php?id=' . $advisory_res['advisory_id'] . '"> Read more</a>';
                                }
                                
                             // $imageSlider = explode("=", $advisory_image); 
                                ?>

                                <li style="-webkit-transform-origin: 50% 139px; -webkit-transform: translate(0px, 0px) scale(0.5) translateZ(0px); opacity: 0.6;">
                                    <?php 
                                      //  $advisory_image = explode("=", $advisory_image);
                                    ?>
                                    <img style="" src="<?php echo $web_url.'../media/advisory_panel_img/'.$advisory_image;?>"  alt="" class="sc-image">

                                   
                                    <div class="sc-content">
                                        <h2><a style="font-weight:bold; border:none; font-size:26px;" href="advisory_detail.php?id=<?php echo $advisory_res['advisory_id']; ?>"><?php echo $advisory_name; ?></a></h2>
                                        <p><?php echo $advisory_description; ?></p>
                                    </div>
                                </li>


                                <?php
                                $counter++;
                            }
                            ?>

                        </ul>
                    </div>
                    <div class="sc-preloader" style="display: none;"></div><div class="sc-content-wrapper">
                        <div class="sc-content-container" style="visibility: visible; opacity: 1;">
                            <div class="sc-content">
                                <h2></h2><p></p></div></div></div> 
                    <div class="sc-overlay sc-overlay-left" width="190" height="1" style="width: 370px;background: #FFF;"></div>
                    <div class="sc-overlay sc-overlay-right" width="190" height="1" style="width: 370px;background: #FFF;"></div>
                    <a href="#" class="sc-nav-button sc-prev sc-no-select"></a>
                    <a href="#" class="sc-nav-button sc-next sc-no-select">
                    </a>

                </div>
            </div>
        </div>

    </div>
</div>

<?php
    //include('events_panel.php'); 
    include('quick_contact.php');
    include('footer.php');
?>                                

<!-- Google CDN jQuery with fallback to local-->
<script type="text/javascript" src="js/jquery.mCustomScrollbar.concat.min.js"></script>
    <script type="text/javascript">
        (function($){
            $(window).load(function(){
                $("#content_6").mCustomScrollbar({
                    scrollButtons:{
                        enable:true
                    },
            advanced:{
               updateOnContentResize:true
                },

                    theme:"dark-thick"
                });
                $("#content_7").mCustomScrollbar({
                    scrollButtons:{
                        enable:true
                    },

            advanced:{
               updateOnContentResize:true
                },

                    theme:"dark-thick"
                });
                $("#content_8").mCustomScrollbar({
                    scrollButtons:{
                        enable:true
                    },
            advanced:{
               updateOnContentResize:true
                },


                    theme:"dark-thick"
                });
            });
        })(jQuery);
    </script>
  <script type="text/javascript" src="js/jquery.ui.widget.js"></script>
 <script type="text/javascript" src="js/jquery.ui.rcarousel.js" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
        jQuery(function($) {

            function generatePages() {
                var _total, i, _link;

                _total = $("#carousel").rcarousel("getTotalPages");

                for (i = 0; i < _total; i++) {
                    count ++;
                    _link = $("<a href='#'></a>");

                    $(_link)
                            .bind("click", {page: i},
                            function(event) {
                                $("#carousel").rcarousel("goToPage", event.data.page);
                                event.preventDefault();
                            }
                            )
                            .addClass("bullet off")
                            .appendTo("#pages");
                }

                // mark first page as active
                $("a:eq(0)", "#pages")
                        .removeClass("off")
                        .addClass("on")
                        .css("background-image", "url(images/page-on.png)");

            }
       

            function pageLoaded(event, data) {
                $("a.on", "#pages")
                        .removeClass("on")
                        .css("background-image", "url(images/page-off.png)");

                $("a", "#pages")
                        .eq(data.page)
                        .addClass("on")
                        .css("background-image", "url(images/page-on.png)");
            }

            $("#carousel").rcarousel(
                    {
                        visible: 1,
                        step: 1,
                        speed: 700,
                        auto: {
                            enabled: true,
                            interval: 7000
                        },
                        width: 1250,
                        height: 600,
                        start: generatePages,
                        pageLoaded: pageLoaded
                    }
            );


            $("#ui-carousel-next")
                    .add("#ui-carousel-prev")
                    .add(".bullet")
                    .hover(
                            function(){
                                $(this).css("opacity", 0.7);
                            },
                            function(){
                                $(this).css("opacity", 1.0);
                            }
                    );

                
                var count = 0;
                count = 5; // number ob images in caresol 

                    if(count == 1){
                        $('#pages .off').remove();
                    }


            $.fn.videoPlay = function() {
                $("#carousel").rcarousel(
                    {
                        visible: 1,
                        step: 1,
                        speed: 700,
                        auto: {
                            enabled: false,
                            interval: 7000
                        },
                        width: 1250,
                        height: 600,
                        start: generatePages,
                        pageLoaded: pageLoaded
                    }
                );
            };

            $.fn.videoPause = function() {
                $("#carousel").rcarousel(
                    {
                        visible: 1,
                        step: 1,
                        speed: 700,
                        auto: {
                            enabled: true,
                            interval: 7000
                        },
                        width: 1250,
                        height: 600,
                        start: generatePages,
                        pageLoaded: pageLoaded
                    }
                );
            };

        });


    </script>

</body>
</html>
