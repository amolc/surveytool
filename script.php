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



            tbl_body+="<div style='padding-bottom:10px;' class='clsLD_Cont clearfix'>";
				tbl_body+="<div style='margin-right: 30px;padding:10px;' class='clsLD_Bx'>"
				tbl_body+="<div class='clsCo_frt_top_LD'><div class='clsC1_list_cont'>"		
				tbl_body+= "<div class='clsLD_cont1'><h1><a onclick='get_div(3);get_item("+id+",/"+name+"/);' href='javascript:void(0);' style='color: black'>"+cats_array[i].cat_name+"</a></h1></div>"
				tbl_body+="<div class='clsLD_cont2 clearfix'><div id='"+id+"' class='clsChart_bx' style='text-align:center;'><div style='height:130px;font-size:17px;font-weight: bold;' id='donutchart"+i+"' ><div title='Number of questions answered by you.' style='  padding: 10px;float: left;width: 37%;background: #ACACAC;color: #414141;margin-bottom: 5px;margin-right: 5px;'>Answered</div><div title='Number of companies listed by other CIO' style='padding: 10px;float:left;width:44%;margin-bottom: 15px;background: #acacac;color:#414141;'>Market Trends</div><div style='padding: 10px;float:left;width:40%;'  class='cont_digit "+id+"'> "+answer_count+" </div><div style='color: #035903;padding: 10px;float:left;width:40%;' class='cont_digit "+id+"'>"+tscount+"</div></div><a onclick='get_div(3);get_item("+id+",/"+name+"/);' href='javascript:void(0);' class='take_survey_link'>OPINION POLL</a></div></div>"	
				tbl_body+="</div></div><br /></div>"


        
        <div style='padding-bottom:10px;' class='clsLD_Cont clearfix'>
		<div style='margin-right: 30px;padding:10px;' class='clsLD_Bx'>
		<div class='clsCo_frt_top_LD'><div class='clsC1_list_cont'>	
		<div class='clsLD_cont1'>
            <h1><a onclick='get_div(3);get_item("+id+",/"+name+"/);' href='javascript:void(0);' style='color: black'>"+cats_array[i].cat_name+"</a></h1>
        </div>
		<div class='clsLD_cont2 clearfix'>
        <div id='"+id+"' class='clsChart_bx' style='text-align:center;'>
        <div style='height:130px;font-size:17px;font-weight: bold;' id='donutchart"+i+"' ><div title='Number of questions answered by you.' style='  padding: 10px;float: left;width: 37%;background: #ACACAC;color: #414141;margin-bottom: 5px;margin-right: 5px;'>Answered</div>
        <div title='Number of companies listed by other CIO' style='padding: 10px;float:left;width:44%;margin-bottom: 15px;background: #acacac;color:#414141;'>Market Trends</div>
        <div style='padding: 10px;float:left;width:40%;'  class='cont_digit "+id+"'> "+answer_count+" </div>
        <div style='color: #035903;padding: 10px;float:left;width:40%;' class='cont_digit "+id+"'>"+tscount+"</div></div>
        <a onclick='get_div(3);get_item("+id+",/"+name+"/);' href='javascript:void(0);' class='take_survey_link'>OPINION POLL</a></div></div>	
		</div></div><br /></div>		