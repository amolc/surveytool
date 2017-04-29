<?php
session_start();
include('config.php');
$cID = $_SESSION['cID'];
$array=array();
			//$res = mysql_query("select category.*,count(master_survey_count.surveyId) AS total_survey_count from category,master_survey_count where category.catID=master_survey_count.catId GROUP BY category.cat_name ORDER BY total_survey_count DESC");
			
	
			$ansqry = mysql_query("select category.*,count(master_survey.itemID) AS answer_count from category,master_survey where master_survey.userID=".$cID." AND category.catID=master_survey.categoryID GROUP BY category.cat_name ORDER BY answer_count DESC");

			//$res = mysql_query("select category.*,count(item.catID) AS total_survey_count from category,item where category.catID=item.catID GROUP BY category.cat_name ORDER BY total_survey_count DESC");
			$res = mysql_query("select category.* from category,item where category.catID=item.catID GROUP BY category.cat_name");
			$n=mysql_num_rows($res);
			if(!$n)
			{
				$response['Error']='No data found';
			}

			while($row=mysql_fetch_assoc($res))
			{
				array_push($array,$row);				
			}															
			while ($ansrow=mysql_fetch_assoc($ansqry) ) 
			{
				foreach ($array as $key => $value) 
	    			if($value['catID']==$ansrow['catID'])
	    				$array[$key]['answer_count'] = $ansrow['answer_count']; 
			}
			$trendqry = mysql_query("select count(userId) as total_survey_count,catId from master_survey_count GROUP BY catId");
			while ($trendrow=mysql_fetch_assoc($trendqry) ) 
			{
				foreach ($array as $key => $value) 
	    			if($value['catID']==$trendrow['catId'])
	    				$array[$key]['total_survey_count'] = $trendrow['total_survey_count']; 
			}
			echo $_GET['callback'] . '' .json_encode($array) . '';
?>