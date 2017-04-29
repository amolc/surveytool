<?php
session_start();
include('config.php');
//if ( isset($_SESSION['username']) && isset($_SESSION['cio']))
if ( isset($_SESSION['username']) && isset($_SESSION['cio']))
{	
    $name = $_SESSION['username'];
    $type = $_SESSION['cio'];

    if (isset($_SESSION['corperate_email'])) {

        $corperate_email = $_SESSION['corperate_email'];
        $cID = $_SESSION['cID'];
        $uquery = mysql_query("SELECT * FROM all_cio WHERE emailID ='$corperate_email' and registration_id=$cID ");
        while ($uinfo = mysql_fetch_array($uquery))
        {
       		$firstname = $uinfo['firstname'];
        	$lastname = $uinfo['lastname'];
        	$company = $uinfo['company'];
        	$mobile_number = $uinfo['mobile_number'];
        	$company_address = $uinfo['company_address'];
        	$city = $uinfo['city'];
        	$state = $uinfo['state'];            	    	
        	$designation = $uinfo['business_title'];            	
        	$email = $uinfo['emailID']; 
        	$password = $uinfo['password'];      
        }

    }
} else
{
	    header('Location: cio_login.php');
    
}
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to CFOHONOUR AWARDS Home</title>
	<link rel="shortcut icon" href="fav.png" type="image/x-icon">
    <link href="css/cio.css" rel="stylesheet" type="text/css">
	<link href="css/text_style.css" rel="stylesheet" type="text/css">
	 <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
    <link href="css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
    <link href="css/tinycarousel.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.tinycarousel.js"></script>
    <!-- Carousel -->
    <link href="css/bootstrap-carousel.css" rel="stylesheet" type="text/css" />
	 <script type="text/javascript" src="js/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="js/jquery-ui.js"></script>
   <!-- Latest compiled and minified JavaScript -->
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            // alert('okk');
            $('.carousel').carousel({
                interval: 7000
            });
        });
    </script>
    <script type="text/javascript">
        $(document).ready(function(){
            $('.change_pass').click(function(){
                var old_pass = $('.old_pass').val();
                var new_pass = $('.new_pass' ).val();
                var re_pass = $( '.re_pass' ).val();
                $.ajax({
                    type: 'post',
                    url: 'ajax_change_password.php',
                    data: {old_pass:old_pass,new_pass:new_pass,re_pass:re_pass,},
                    success: function(mesg) {
                        alert(mesg);
                        $('.mesg').empty().append(mesg);
                    }
                });
            });
        });
//var companytag=[];
function autosuggest(i)
{
    function split( val ) {
	return val.split( /,\s*/ );
	}
	function extractLast( term ) {
	return split( term ).pop();
	}
  var itemid = $( '#item_'+i ).val();

$( '#textarea_'+i )
// don't navigate away from the field on tab when selecting an item
.bind( "keydown", function( event ) {
if ( event.keyCode === $.ui.keyCode.TAB &&
$( this ).autocomplete( "instance" ).menu.active ) {
event.preventDefault();
}
})
.autocomplete({
	source: function( request, response ) {
	$.getJSON( "search.php", {

	term: extractLast( request.term ),item_id:itemid
	}, response );
	},
	focus: function() {
	// prevent value inserted on focus
	return false;
	},
	select: function( event, ui ) {
	var terms = split( this.value );
	// remove the current input
	terms.pop();
	// add the selected item
	terms.push( ui.item.value );
	// add placeholder to get the comma-and-space at the end
	terms.push( "" );
	//companytag.push(this.value);

	this.value = terms.join( "," );
		return false;
	}
});
  
}
function tagvalues()
{
	$.post("tag.php" ,{'company': companytag}).done(function( data ) {   
	if(data=='OK')
		{
			alert("company inserted");
		}
	
	});
}
		
function getCategory()
{
	
	$("#div_2").html("<div align='center' style='margin-top:150px;margin-bottom:150px;'><img src=images/loader.gif width='150px' align=center></div>");
	$.getJSON('cio_listcats.php/?callback=?' , function(array) {
		console.log("for respone function");
	var tbl_body = "";
	var tbl_row ="<tr>";
	var id='';
	var i=0;
	name='';
    var odd_even = false;
    $.each(array, function(key,val) {
        var tbl_row = "";
    	$.each(this, function(k , v) {
        })
		id=array[i].catID;
		name=array[i].cat_name;
		if(i%2==0)
		{
			tbl_row +="<tr class=\""+( odd_even ? "odd" : "even")+"\">"
		}
		tbl_row += "<td><div class='btn-box'><div class='clsButton_red fr'><a href='javascript:void(0);'class='mrgn partner' onClick='get_div(3);get_item("+id+","+'/'+name+'/'+");'>"+array[i].cat_name+"</a></div></div></td>";
		tbl_row +="<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>";
		if(i%2==0)
		{
			tbl_body +="</tr>";
		}
		tbl_body += ""+tbl_row+"";
        odd_even = !odd_even; 
		 i++;            		          
    })	

	 $("#div_2").html(tbl_body);
	 $("#div_2").show();
 	   
});
}
function ucfirst(str) {
   str += '';
  var f = str.charAt(0)
    .toUpperCase();
  return f + str.substr(1);
}
function get_item(catID,name)
{	
	//name = name.substring(1);
	//console.log(name.substring);
	name = String(name);
	name = name.substring(1,name.length-1);
	var catname = name;
	$("#div_3").html("<div align='center' style='margin-top:150px;margin-bottom:150px;'><img src=images/loader.gif width='150px' align=center></div>");
	var tbl_body ="";
	 //tbl_body +="<h2 style='text-align: center;' >"+name+"</h2>";
	$.getJSON('cio_get_items.php/?callback=?',"catID="+catID+"" ,function(items_array) {
	console.log("Beforeee");
	console.log(items_array);
	var id='';
	var i=0;
	var k=0;
	var j = 0;
	total_items = items_array.length;
	pages = Math.ceil(total_items/3);
	var item_row_wrapper_start = '';	
	var pageno = 1;
    var odd_even = false;
    var submit_shown = 0;
    var submit_btn = "";
    $.each(items_array, function(key,val) {
        var tbl_row = "";
		id=items_array[i].item_ID;
		name=items_array[i].item_name;
		if(items_array[i].cname!=undefined)
			cmpname = items_array[i].cname;
		else
			cmpname = '';
		if(k == 2)
	   		{
	   			k = 0;
 			}
		
		if(k == 0)
	   		{	
	   			//tbl_body +=	""
	   			tbl_body += "<div class='box_wrapper'  ><h2 class='cat_title' style='text-align: center;padding:15px' >Please enter the companies you wish to endorse for "+catname+"</h2>";
	   			
 			}

		//tbl_row += "<div style='margin-top:15px;background:red;'><textarea  name='item' placeholder=' "+items_array[i].item_name+"' style='border:1px solid red; border-radius:15px; float:left;width: 275px; height: 65px;' id='textarea_"+i+"' onClick='autosuggest("+i+");'>"+cmpname+"</textarea><input type='hidden' value='"+id+"' id='item_"+i+"'><input type='hidden' value=' "+items_array[i].item_name+"' id='item_name"+i+"'></div>";
		tbl_row +="<div style='width:305px;' class='clsLD_Bx'><div class=''> <div class='' > <div class='clsLD_cont1 dynamic_base_color' style='color: #fff;border-top-left-radius: 9px;border-top-right-radius: 9px;height: 50px;font-size: 18px;padding-top: 15px;text-align: center;'>"+items_array[i].item_name;
		tbl_row +="<div class='clsChart_bx' style='text-align:center;'>";
		//tbl_row += "<div class='item_details' style='' id='donutchart"+i+"'  >"+items_array[i].item_description+"</div>";
		tbl_row += "<div style='margin-top:15px;background:red;'><input type='hidden' value='"+id+"' id='item_"+i+"'><input type='hidden' value=' "+items_array[i].item_name+"' id='item_name"+i+"'></div>";
		tbl_row += "</div></div>";
		tbl_row += "<div class='item_details' style='' id='donutchart"+i+"'  >"+ucfirst(items_array[i].item_description)+"</div>";
//		tbl_row += "<input autocomplete='off' type='text' class='vendor_item' name='item' placeholder='Enter Company Name' id='textarea_"+i+"' value='"+cmpname+"' onClick='autosuggest("+i+");'>";		
		tbl_row += "<textarea autocomplete='off'  class='vendor_item' name='item' placeholder='Enter Company Name' id='textarea_"+i+"'  onClick='autosuggest("+i+");'>"+cmpname+"</textarea>";		
		
		tbl_row +="</div></div></div>";
        tbl_body += tbl_row;
        odd_even = !odd_even; 

        if(k==2 && i < total_items && total_items !=2 && pages != 1 && pageno != pages && pages > pageno)
        {
        	tbl_body += "<div style='text-align:center;margin: 30px;'><button class='survey_btn_1 next_btn' style='cursor:pointer;margin: 35px;'>Next</buttoln></div>";
        }
        
    	tbl_body += "<span style='font-size: 20px;position: absolute;right:0;bottom:-15px;left: 48%;'>"+pageno+" of  "+pages+"</span>";
    	var submit_shown1 = 0;
        if( (total_items) == (pageno*3) && submit_shown == 0  && submit_shown1 == 0 )
    		{
    			submit_btn = "<div class='submit_btn' style='display:none;' ><div class='submit_button' style='text-align:center;margin-bottom: 20px;'><button style='margin: 35px;' class='survey_btn_1' onClick='insrt_into_cart("+i+","+catID+");'>SUBMIT POLL</button></div></div>";
    			submit_shown = 1;
    			submit_shown1 = 1;
			}
        //if( k == 2)
        
    	if( k == 2)
    		pageno = pageno + 1;	
        if( j == total_items || k==2){
        	 tbl_body += "</div>";  
        }       
     //    if( submit_shown1 === 1 )
    	// 	tbl_body += submit_btn;
    	// submit_btn = "";
          j++;
          i++;
          k++;

    })
	//tbl_body += "<tr class=\""+( odd_even ? "odd" : "even")+"\"><td><br></td></tr>";
	tbl_body += "";
	 //if( i == total_items){
	 	console.log(pageno , pages);
	 		 if(pageno == pages )
        		tbl_body += "<div style='clear: both;' align='center'></div><div class='submit_button' style='text-align:center;margin-bottom: 20px;'><button style='margin: 35px;' class='survey_btn_1' onClick='insrt_into_cart("+i+","+catID+");'>SUBMIT POLL</button></div>";	   	

       // }
	$("#div_3").html(tbl_body);
	if(pageno != pages || pages != 1 )
	{
		$(".advisory_wrapper .box_wrapper:last").append(submit_btn);
	}
	$('#div_3').show();
	$( ".box_wrapper  .submit_btn:last" ).css( "display", "block" );
});
}

function insrt_into_cart(n,catID)
{	
	$("#preloader").show();
	console.log(n, catID);
	$('.cat_title').remove();
	var survey = [];
	var itemID=[];
	var itemName=[];
	for(i=0;i<n+3;i++)
	{
		//console.log('textarea_'+i);
		
		if(document.getElementById('textarea_'+i) != null && document.getElementById('textarea_'+i).value!='')
		{
			console.log(document.getElementById('textarea_'+i).value);
			survey.push(document.getElementById('textarea_'+i).value);
			itemID.push(document.getElementById('item_'+i).value);
			itemName.push(document.getElementById('item_name'+i).value);
		}
	}
	console.log(survey);
	$.post("survey.php" ,{'survey_array': survey,'item_id':itemID,'catID':catID,'item_name':itemName}).done(function( data ) {   
		data = data.trim();
		if(data=='OK')
		{
			$("#preloader").hide();
			var url = String(window.location).split("&")[0];
			window.location.replace(url+'?catID='+catID);
		} else{

			$("#preloader").hide();
			alert(data);
			alert("Something went wrong. Try again");
		}
	});
}

function get_div(id)
{
	for(i=1;i<=6;i++)
	{
		$('#div_'+i).hide();	
	}	
	$('#div_'+id).show();	
}
function save_profile()
{	
	$.post("update_cio_profile.php" ,
	{
		'cname':$('#ucompany').val() ,
		'add1':$('#uaddress').val() ,
		'city': $('#ucity').val(),
		'mobile_number':$('#umobile').val(),
		'firstname':$('#ufname').val(),
		'lastname':$('#ulname').val(),
		'email':$('#uemail').val(),
		'designation': $('#ubtitle').val(),		
		'upassword': $('#upassword').val(),		
		}).done(function( data ) { 
		data=data.trim(); 
		console.log(data); 			
		$("#div_5").prepend("<h2 style='color:green;' >Profile Updated</h2>");
		get_div(5);
	});
}
</script>
    <script type="text/javascript">
        $(document).ready(function(){

        	$('#div_3').on('click', '.next_btn', function(){
        		$(this).hide();
        		$('.box_wrapper').hide();
        		//$(this).parent().previous().hide();
        		$(this).parent().parent().next().show();

        	});
        	listCategory();

            $(".logincontainer").click(function () {
                $(".logbar").toggle("slow");
            });

        });

function listCategory()
{	
	var narray = [];	
	$("#category_div").html("<div align='center' style='margin-top:150px;margin-bottom:150px;'><img src=images/loader.gif width='150px' align=center></div>");
	/*$.post('list_category.php/?callback=?' , function(array) {	});*/
	$.post("list_category.php/?callback=", function(cats_array){
		ncats_array = cats_array;			
		 cats_array = JSON.parse(cats_array);
		var tbl_row ="";
		var id='';
		var i=0;
		name='';
		var odd_even = false;
		var tbl_body = "";

	 	$.each(cats_array, function(key,val) {
		 	var tbl_row = "";
			id=cats_array[i].catID;
			name=cats_array[i].cat_name;	
			tscount = cats_array[i].total_survey_count;
			
			if(cats_array[i].answer_count != undefined )
				answer_count = cats_array[i].answer_count;
			else
				answer_count = 0;
			if(tscount == undefined )
				tscount = 0;
			tbl_row +="<div style='padding-bottom:10px;' class='clsLD_Cont clearfix'>";
			tbl_row +="<div style='margin-right: 30px;padding:10px;' class='clsLD_Bx'>";
			tbl_row +="<div class='clsCo_frt_top_LD'><div class='clsC1_list_cont'>";		
			tbl_row += "<div class='clsLD_cont1'><h1><a onclick='get_div(3);get_item("+id+",/"+name+"/);' href='javascript:void(0);' style='color: black'>"+cats_array[i].cat_name+"</a></h1></div>";
			tbl_row +="<div class='clsLD_cont2 clearfix'><div id='"+id+"' class='clsChart_bx' style='text-align:center;'><div style='height:130px;font-size:17px;font-weight: bold;' id='donutchart"+i+"' ><div title='Number of questions answered by you.' style='  padding: 10px;float: left;width: 37%;background: #ACACAC;color: #414141;margin-bottom: 5px;margin-right: 5px;'>Answered</div><div title='Number of companies listed by other CIO' style='padding: 10px;float:left;width:44%;margin-bottom: 15px;background: #acacac;color:#414141;'>Market Trends</div><div style='padding: 10px;float:left;width:40%;'  class='cont_digit "+id+"'> "+answer_count+" </div><div style='color: #035903;padding: 10px;float:left;width:40%;' class='cont_digit "+id+"'>"+tscount+"</div></div><a onclick='get_div(3);get_item("+id+",/"+name+"/);' href='javascript:void(0);' class='take_survey_link'>OPINION POLL</a></div></div>";		
			tbl_body +="</div></div><br /></div>";		
			tbl_body += ""+tbl_row+"";
		    odd_even = !odd_even; 
		 	i++;	  	
			alert(tbl_body);
		 	$("#category_div").html(tbl_body);	 
		 	$("#category_div").show();	
	    });
		
  	});
	
}

    </script>
    <style type="text/css">
        #container {
            width:918px;
            position: relative;
            margin: 0 auto;
            background:#e73535;
        }
        .carousel-indicators li {
            display: inline-block;
            width: 15px;
            height: 15px;
            text-indent: -999px;
            cursor: pointer;
            background-color: #000;
            border: 0px solid #000;
        }
        .carousel-indicators .active {
            width: 13px;
            height: 13px;
            margin: 0;
            background-color: #fff;
            border: 3px solid #000;
        }
      #div_5  #saveprofile {
	float: right;
width: 130px;
height: 51px;
line-height: 46px;
font-size: 20px;
margin: 10px 0px 0px 180px;
font-family: 'Lato';
text-transform: uppercase;
letter-spacing: 1px;
color: #ffffff !important;
font-weight: bold;
text-align: center;
text-decoration: none;
background: url("css/../images/submit.png") no-repeat;
border: none;
cursor: pointer;
text-shadow: 1px 1px #581010;
-webkit-transition: background .5s ease-in;
-o-transition: background 0.5s ease-in;
-moz-transition: background .5s ease-in;
-ms-transition: background .5s ease-in;
transition: background .5s ease-in;
opacity: 0.9;
}
    </style>
    <style type="text/css">
        .logout a:hover {
            color: #ADADAD!important;
        }
    </style>
    <style type="text/css">
    	.fixed-nav{
    		position: fixed;
    		top: 0px;
    	}
    </style>
    <script src="js/jquery.easytabs.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            //alert('developer');
            function parseurl(val) {
			    var result = "Not found",
			        tmp = [];
			    location.search
			    //.replace ( "?", "" ) 
			    // this is better, there might be a question mark inside
			    .substr(1)
			        .split("&")
			        .forEach(function (item) {
			        tmp = item.split("=");
			        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
			    });
			    return result;
			}

			var animatecatId = parseurl('catID');
            setTimeout(function(){

             $('.'+animatecatId).each(function () {
				  var $this = $(this);
				  $("#"+animatecatId).parent().css( "background", "#dff0d8" );
				  //alert($this.text());
				  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
				    duration: 1000,
				    easing: 'swing',
				    step: function () {
				      $this.text(Math.ceil(this.Counter));
				    }
				  });
				}); }, 1000);

            $('#tab-container').easytabs();
        });
    </script>
    <script type="text/javascript">
    	var num = 200; //number of pixels before modifying styles

$(window).scroll(function () {
    if ($(window).scrollTop()) {
        $('#black_wrapper').addClass('fixed-nav');
    } else {
        $('#black_wrapper').removeClass('fixed-nav');
    }
		    
		});
    </script>
	<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['corechart']}]}"></script>	
</head>
<body>
<?php
// include('config.php');
include('top_header.php');
include('config.php'); 
//include "libchart/classes/libchart.php";
include('header.php');
?>
<div style="display: none;" id="preloader"></div>
<?php
if(isset($_REQUEST['show_modal']) && $_REQUEST['show_modal'] ==1)
 {

 	include 'cio_welcome_modal.php';
}
?>
<div id="shadow_wrapper"></div>
<div id="black_wrapper" style="width: 100%;z-index:999;">
    <div class="inner_nav">
		<div class="nav fl">
        	<ul>
			  <li><a class="menu_ancher" href="javascript:void(0);" onClick="get_div(1);">DASHBOARD</a></li>
			  <li><a class="menu_ancher" href="javascript:void(0);" onclick="get_div(5);">PROFILE</a></li>
			  <!-- <li><a class="menu_ancher" href="javascript:void(0);" onClick="get_div(2);getCategory();">SURVEY</a></li> -->
			  <!-- <li><a class="menu_ancher" href="javascript:void(0);" onClick="get_div(4);" >FAQ</a></li>			   -->
			</ul>
		</div>
		<div class="top_login fl" style="margin-right:10px; background:black; color:white;float:right;margin-top: 22px;" >
					<?php
						if(!isset($_SESSION))
							session_start();
						if(isset($_SESSION['username']))
						{ 
							$username = $_SESSION['firstname']." ".$_SESSION['lastname'];
							if(isset($_SESSION['username']))
						{ 
							$type = $_SESSION['type'];
						}
							
					?>	
							<li><a href=""></a></li>
							<a href="javascript:void(0);" onclick="get_div(5);"><img style="margin-top: 5px;" src="images/register_icon.png" width="12" height="16"><?php echo strtoupper($username); ?></a>													
							<?php if($type == 'cio_landing.php')
							{?>
								<a href="cio_logout.php" class="border"><img style="margin-top: 6px;" src="images/login_icon.png" width="12" height="16">LOGOUT</a>
							<?php }else {?>
									<a href="vendor_logout.php" class="border"><img style="margin-top: 6px;" src="images/login_icon.png" width="12" height="16">LOGOUT</a>
							<?php }?>
					<?php
						}
						else
						{
					?>						
							<!--<a href="login.php"><img style="margin-top: 6px;" src="images/login_icon.png" width="12" height="16">LOGIN</a>
							<a href="registration.php" class="border"><img style="margin-top: 5px;" src="images/register_icon.png" width="12" height="16">REGISTER</a>-->
					<?php
						}
						?>
						 	
		</div>
    </div>
</div>
<div class="landing_head advisory_wrapper"  style="margin-top:75px;;min-height: 350px;" id="div_1" >
     <div class="clsMiddle" style="width: 995px; float: left;">
     <div class="row col-md-6">
		<div class="clsMid_cont_cio" id="category_div" style="padding: 0px; ">
			<div class='clsCat_tlt'><h2>Dashboard</h2></div>
		</div>	
	</div>				
	</div>	
</div>

<div class="advisory_wrapper landing_head" style="margin-top:30px;display:none;;min-height: 350px;"  id="div_2">
</div>
<div class="advisory_wrapper landing_head" style="min-height: 270px;display:none;text-align: center;;min-height: 350px;"  id="div_6">
	<h1 style="padding:15px;"> Thank You for taking survey.</h1>
	<button  style="padding:10px;margin: 15px;cursor: pointer;" class="take_survey_link" onClick="location.reload();">
		Goto Dashboard  
	</button>
</div>
<div class="advisory_wrapper landing_head" style="margin-top:95px;display:none;min-height: 350px;"  id="div_3">
</div>
<script type="text/javascript">
	$(document).ready(function(){	
	$("#accordion li").first().addClass("active_faq");
	});
</script>

<div class="row col-md-6">

<div id="div_4" class="advisory_wrapper landing_head" style="margin-bottom:30px;margin-top:20px;display:none;;min-height: 350px;">
	<div class="advisory_panel fl" style="height:auto;">
              	<div class="faqs fl">
                 </div>
                	<div class="faqs_question fl">
                    	<ul id="accordion">
						<?php
							$faq_result = mysql_query("SELECT * FROM faq where faq_type='CIO'");
							//fetch tha data from the database 
							while ($faq_row = mysql_fetch_array($faq_result))  
							{
								$faq_row['faq_description'] = str_replace('<p>','', $faq_row['faq_description']);
								$faq_row['faq_description'] = str_replace('</p>','', $faq_row['faq_description']);
						?>
							<li><?php echo $faq_row['faq_heading']; ?></li>
							<ul>
								<li><?php echo $faq_row['faq_description']; ?></li>
							</ul>
						<?php							
							}
						?>                
                    </ul>
                    </div>
    </div>
</div>

</div>
<div class=" advisory_wrapper landing_head" style="display:none;margin-bottom:30px;margin-top:120px;min-height: 350px;" id="div_5" >
   <div class="advisory_panel_1 mrgn_top" style="margin-left: -20px;"><h1 style="font-size: 30px; font-family: " lato';text-transform:="" uppercase;'="">UPDATE PROFILE</h1></div>
 <div class="contact_form fr" style="width: 59%;margin-right: 210px;" name="registration" id="registration" > 
     <form role="form" name="register_venor"   method="post">
        	
          <label> First name*</label>
            <input style="font-size: 15px;width: 300px;height:38px;" id="ufname" name="fname" type="text"  value="<?php echo $firstname; ?>" required>
          <label> Last name*</label>
            <input style="font-size: 15px;width: 300px;height:38px;" id="ulname" name="lname" type="text" value="<?php echo $lastname; ?>" required>
		  <label> Company*</label>
            <input style="font-size: 15px;width: 300px;height:38px;" id="ucompany" name="company" type="text" value="<?php echo $company; ?>" required>
             <label>Designation*</label>
            <input style="font-size: 15px;width: 300px;height:38px;" id="ubtitle" name="btitle" type="text" value="<?php echo $designation; ?>" required>
             <label> Email*</label>
            <input style="font-size: 15px;width: 300px;height:38px;" id="uemail" name="email" type="text" value="<?php echo $email; ?>" required>
             <label> Mobile No.*</label>
            <input style="font-size: 15px;width: 300px;height:38px;" placeholder="+65" id="umobile" name="mobile" type="text" value="<?php echo $mobile_number; ?>" required>
            <label> Address*</label>
            <input style="font-size: 15px;width: 300px;height:38px;" id="uaddress" name="company_address" type="text"  value="<?php echo $company_address; ?>" required>
            <label>City*</label>
            <input style="font-size: 15px;width: 300px;height:38px;" id="ucity" name="city" type="text" value="<?php echo $city; ?>" required>
            <label>Password*</label>
            <input style="display:none;" id="upassword" name="password" type="text" value="<?php echo $password; ?>" required>
          <button  id="saveprofile" style="margin-left: 10px;" onClick="save_profile();" >Update</button>
	</form>
    </div>
	
</div>
<?php
include('quick_contact.php');
include('footer.php');
?>
<script>
$("#accordion > li").click(function(){
  $("#accordion li").removeClass("active_faq");
        $(this).addClass("active_faq");
	if(false == $(this).next().is(':visible')) {
		$('#accordion > ul').slideUp(300);
	}
	$(this).next().slideToggle(300);
});

$('#accordion > ul:eq(0)').show();
</script>
</body>
</html>

