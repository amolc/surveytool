// =======================
// get the packages we need ============
// =======================


var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var async = require('async');
var nodemailer = require('nodemailer');
var crontab = require('node-crontab');

var CRUD = require('mysql-crud');
var connection = mysql.createPool({
    database: 'cfo_singapore',
    user: 'ciochoice',
    password: '10gXWOqeaf',
    host: 'cio.cxohonour.com',
});
var port = 8866;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
});

var jobsCRUD = CRUD(connection, 'event_job');
var settingsCRUD = CRUD(connection, 'settings');

var createJob = crontab.scheduleJob("*/30 * * * *", function() { //This will call this function every 2 minutes
    console.log("createJob called");
    createjobs();
});


var tweetJob = crontab.scheduleJob("*/30 * * * *", function() { //This will call this function every 2 minutes
    jobs();
});


// crontab
var sendmailJob = crontab.scheduleJob("*/30 * * * *", function() { //This will call this function every 2 minutes
    sendmailbyJob();
});


var contains = function(needle) {
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

//  tweet config
var client = new Twitter({
    consumer_key: 'VuuuZMV54Z4xhXQyE9oXjolar',
    consumer_secret: 'zPCGI3N68TsRCiy8rYAbnMIK5hWivfvjZTCuOHkdWyWe3td0EE',
    access_token_key: '2838905491-PWlY81Hhu6JFMCWFBRcbYuVLIpvnAsTMOdlXLu1',
    access_token_secret: 'JyXYbYGdVwBRGBScVuEMScbn6JpnrVyS63BMKhqDekN6z'
});

//  NODEMAILER DECLARATION
var transporter = nodemailer.createTransport({
    host: 'smtp.mandrillapp.com',
    port: '587',
    auth: {
        user: 'cxohonour2016',
        pass: 'oXDZkuLdBFIrDbg8cUffyA'
    }
});


function send_mail(company_type, staff, company_name, item_name, cio_settings) {
    if(company_type == 'new'){
        var mailOptions2 = {
            strictSSL: false,
            to: cio_settings.site_support_name + '<' + cio_settings.site_support_email + '>', // sender address
            from: cio_settings.system_name + '<' + cio_settings.system_email + '>', // list of receivers
            subject: 'A new company '+company_name+' has been voted', // Subject line,
            html: templates.emailbodyadmin("A new company<strong> "+company_name+" </strong> has been voted. Please create the COMPANY and CONTACT details about  <strong>"+company_name+"</strong>", cio_settings)
        };

        transporter.sendMail(mailOptions2, function(error, info) {
            if (error) {
                console.log(error, '156');
                //   return error;
            } else {
                console.log('FOR Admin new Mail sent: ' , info);
            }
        });

    } else{
        console.log('in sendmail');
        console.log(company_type, staff, company_name, item_name, cio_settings);
        var sub = '';
        var body = '';
        if (company_type == 'pink') {
            userbody = 'Congratulations! Your company has been endorsed by the CFO Community of  '+cio_settings.site_country+' For Excellence.<br/>ICM Category: <strong>'+item_name+'</strong><br>This is a great opportunity for you to be recognised as an Industry Leader. You may Participate in the CFOHONOUR Awards program by registering below.<br> <a style="width:100%;line-height:22px;padding:15px 0px;text-align:center;float:left;color:#fff;font-weight:bold;font-size:16px;text-decoration:none;border-radius:5px;text-transform:uppercase;letter-spacing:1px;background:#E73535;display:block;" href="'+cio_settings.site_url+'new_vendor_registration.php"> VENDOR REGISTRATION </a>';
            usersub = 'CFOHONOUR AWARDS - You have been Nominated by the CFO';
            adminsub = company_name + ' has been endorsed by the CFO Community (In pink list)';
            adminbody = company_name + ' has been endorsed by the CFO Community of  ' + cio_settings.site_country + ' For Excellence.<br/>ICM Category: <strong>' + item_name + ' (In pink list)</strong><br>';
        }

        if (company_type == 'red') {
            usersub = 'CFOHONOUR AWARDS - Your company is endorsed by CFO';
            userbody = 'Congratulations! Your company has been endorsed by the CFO Community of ' + cio_settings.site_country + ' For Excellence. <br/>ICM Category: <strong>' + item_name + '</strong><br>Keep up the good work. This is a great opportunity for you to be recognised as the Industry Leader!';
            adminsub = company_name + ' has been endorsed by the CFO Community (In red list)';
            adminbody = company_name + ' has been endorsed by the CFO Community of  ' + cio_settings.site_country + ' For Excellence.<br/>ICM Category: <strong>' + item_name + ' (In red list)</strong><br>';
        }
         var mailOptions1 = {
            to: staff.first_name+' ' +staff.last_name+ '<' + staff.contact_email + '>', // sender address
            from: cio_settings.site_support_name + '<' + cio_settings.site_support_email + '>', // from address
            subject: usersub, // Subject line,
            html: templates.emailbody(userbody,staff, cio_settings,item_name)
        };

        var mailOptions2 = {
            strictSSL: false,
            to: cio_settings.site_support_name + '<' + cio_settings.site_support_email + '>', // sender address
            from: cio_settings.system_name + '<' + cio_settings.system_email + '>', // list of receivers
            subject: adminsub, // Subject line,
            html: templates.emailbodyadmin(adminbody, cio_settings)
        };
        transporter.sendMail(mailOptions1, function(error, info) {
            if (error) {
                console.log(error, '148');
                //   return error;
            } else {
                console.log('FOR User Mail sent: ' , info);
            }
        });
        transporter.sendMail(mailOptions2, function(error, info) {
            if (error) {
                console.log(error, '156');
                //   return error;
            } else {
                console.log('FOR Admin Mail sent: ' , info);
            }
        });
    }
}
//  function to tweet
function tweet(message) {
    client.post('statuses/update', {
        status: message
    }, function(error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
        console.log('error tweet', error);
    });
}
function updateJobStatus(current_job, callback) {
                // console.log('current_job', current_job);
                var update_query = "update event_job SET status='completed' where jobID=" + current_job.jobID;
                //console.log('search_query', search_query);
                // console.log('###################');
                connection.query(update_query, function(error, result) {
                    console.log('result', result);
                    if (error) {
                        console.log('error ', error);
                    }
                });
            }
function updateEmailJobStatus(current_job, callback) {
                console.log('updateEmailJobStatus ', current_job);
                var update_query = "update event_job SET email='sent' where jobID=" + current_job.jobID;
                //console.log('search_query', search_query);
                // console.log('###################');
                connection.query(update_query, function(error, result) {
                    console.log('result', result);
                    if (error) {
                        console.log('error 215', error);
                    }
                });
            }            
// CREATE JOBS in event_job table

function createjobs() {
    console.log("in createjobs api");
    // get jobs from master table
    var job_query = "insert into event_job (userID,categoryID,company_shortname,itemID,item_name)  select a.userID,a.categoryID,a.company_name,a.itemID,b.item_name from master_survey  a,item b  where a.status='pending' and a.itemID=b.item_ID";
    var update_job_query = "update master_survey set status='done' where status='pending'";
    connection.query(job_query, function(error, result) {
        if (!error) {
            connection.query(update_job_query, function(error, result) {
                console.log("Job created", result);
            });
        } else {
            console.log('error', error);
        }
    });
}

function jobs() {
     console.log("In jobs");
     jobsCRUD.load({
            status: 'pending'
        }, function(err, val) {
            if(!err){
                console.log('Result Array',val);

                var pendingJobs = val;
                async.each(pendingJobs, function(current_job, callback) {
                    console.log("current_job");
                    console.log(current_job);
                    var all_companies = current_job.company_shortname.split(',');
                    //remove duplicates if exists
                    all_companies = all_companies.filter(function(item, pos) {
                        return all_companies.indexOf(item) == pos;
                    });
                    for(var j = all_companies.length - 1; j >= 0; j--) {
                        if(all_companies[j] == ' ' || all_companies[j] == ', ' || all_companies[j] == ',') {
                           all_companies.splice(i, 1);
                        }
                    }
                    console.log('all_companieslength');
                    console.log(all_companies.length);
                    var no_of_companies = all_companies.length;
                    var i = 0;
                    async.each(all_companies, function(current_company, companies_callback) {
                        // console.log("current companie ");
                        // console.log(current_company);
                        var search_query = "select * from company where short_name like '" + current_company + "'";
                                connection.query(search_query, function(error, result) {
                                    // console.log('resultlength ',result.length);
                                    if(error){
                                        // console.log('error 126', error);
                                        callback();
                                    }else{
                                        if (result.length > 0 ) {
                                            if (result[0].twitterhandle) {
                                                var message = " Congrats #" + current_company + " endorsed by the CXO community for Excellence in " + current_job.item_name + " #CXOHONOUR #SINGAPORE";
                                                if(current_company.length >= 2 )
                                                    tweet(message);
                                                i++;
                                                if(all_companies.length == i)
                                                    updateJobStatus(current_job);
                                                companies_callback();
                                            } else {
                                                var message = " Congrats #" + current_company + " endorsed by the CXO community for Excellence in " + current_job.item_name + " #CXOHONOUR #SINGAPORE";
                                                if(current_company.length >= 2 )
                                                 tweet(message);
                                                i++;
                                                if(all_companies.length == i)
                                                    updateJobStatus(current_job);
                                                companies_callback();
                                            }
                                            
                                        }else {
                                                var message = " Congrats #" + current_company + " endorsed by the CXO community for Excellence in " + current_job.item_name + " #CXOHONOUR #SINGAPORE";
                                                if(current_company.length >= 2 )
                                                    tweet(message);
                                                i++;
                                                if(all_companies.length == i)
                                                    updateJobStatus(current_job);
                                                companies_callback();
                                            }
                                    }
                                })
                            }, function(async_error1, async_success) {
                            if (!async_error1) {
                                // res.jsonp({
                                //     status: true,
                                // });
                            }
                        });
                    }, function(async_error, async_success) {
                    if (!async_error) {
                        res.jsonp({
                            status: true,
                            records: val
                        });
                    }
                });
            } else{
                console.log('error while fetching jobs', err);
            }
         })
    };



// mail template for admin and user
var templates = {
    emailbody: function(body,data, setting_data, item_name) {
        var message_body = '<body style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; width: 100%;">\
   <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden"></div>\
   <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin: 0; padding: 0; text-align: left; width: 100%; line-height: 100%;background: #F2F2F2;" class="backgroundTable" valign="top">\
      <tbody>\
         <tr>\
            <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse;">\
               <table cellpadding="0" cellspacing="0" border="0" width="600" class="email-content" align="center" style="margin: 30px auto;box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"> <tbody>\
                     <tr>\
                        <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse;">\
                           <div>\
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                 <tbody>\
                                    <tr>\
                                       <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="image-container" bgcolor="#FFFFFF">\
                                          <a target="_blank" href="http://www.cxohonour.com/" style="color: #E27B3E; text-decoration: none;"><img src="' + setting_data.site_url + 'images/CXOHonourBanner.jpg" width="800" height="300" alt="" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block; border: none;"></a>\
                                       </td>\
                                    </tr>\
                                 </tbody>\
                              </table>\
                           </div>\
                           <div>\
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                 <tbody>\
                                    <tr>\
                                       <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="vertical-grid">\
                                          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                             <tbody>\
                                                <tr>\
                                                   <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; font-size: 1px; line-height: 1px;" class="horizontal-gutter" bgcolor="#FFFFFF" width="100%" height="30">&nbsp;</td>\
                                                </tr>\
                                                <tr>\
                                                   <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="horizontal-grid" bgcolor="#FFFFFF" width="100%">\
                                                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                                         <tbody>\
                                                            <tr>\
                                                               <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="vertical-gutter side-padding" width="30">&nbsp;</td>\
                                                               <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="vertical-grid">\
                                                                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                                                     <tbody>\
                                                                        <tr>\
                                                                           <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; font-size: 18px; line-height: 25px; color: #000000; font-family: lato, sans-serif; font-weight: normal;" class="text-container" width="100%">Dear <b>' + data.first_name + ' ' + data.last_name + '</b></td>\
                                                                        </tr>\
                                                                        <tr>\
                                                                           <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; font-size: 1px; line-height: 1px;" class="horizontal-gutter" width="100%" height="20">&nbsp;</td>\
                                                                        </tr>\
                                                                        <tr>\
                                                                           <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; color: #4e4e4e; font-family: lato, sans-serif; font-size: 16px; line-height: 25px; font-weight: normal;" class="text-container" width="100%">'+body+'</td>\
                                                                        </tr>\
                                                                         <tr>\
                                                                           <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; font-size: 1px; line-height: 1px;" class="horizontal-gutter" width="100%" height="100">&nbsp;</td>\
                                                                        </tr>\
                                                                        <tr>\
                                                                           <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; color: #4e4e4e; font-family: lato, sans-serif; font-size: 16px; line-height: 25px; font-weight: normal;" class="text-container" width="100%">Best wishes,</td>\
                                                                        </tr>\
                                                                        <tr>\
                                                                           <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; color: #4e4e4e; font-family: lato, sans-serif; font-size: 16px; line-height: 25px; font-weight: normal;" class="text-container" width="100%"><strong>CXOHONOUR Team</strong></td>\
                                                                        </tr>\
                                                                     </tbody>\
                                                                  </table>\
                                                               </td>\
                                                               <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="vertical-gutter side-padding" width="30">&nbsp;</td>\
                                                            </tr>\
                                                         </tbody>\
                                                      </table>\
                                                   </td>\
                                                </tr>\
                                                <tr>\
                                                   <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; background: #f9f9f9;padding:15px 0;" class="button-container" width="100%">\
                                                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto; height: 35;">\
                                                         <tbody>\
                                                            <tr>\
                                                               <td valign="top" width="15" height="35" style="mso-line-height-rule: exactly; border-collapse: collapse; background: #f9f9f9;">&nbsp;</td>\
                                                               <td valign="top" width="35" height="35" style="mso-line-height-rule: exactly; border-collapse: collapse; background: #f9f9f9;"><img src="http://cio.cxohonour.com/edm/cio/24/4/2015/registration/question.png" width="35" height="35" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block;"></td>\
                                                               <td valign="top" width="15" height="35" style="mso-line-height-rule: exactly; border-collapse: collapse; background: #f9f9f9;">&nbsp;</td>\
                                                               <td valign="middle" style="mso-line-height-rule: exactly; border-collapse: collapse;color: #383838; text-decoration: none; text-align: left; font-family: lato, sans-serif; font-size: 14px; line-height: 18px;" height="35">\
                                                              <a style="background: #f9f9f9; color: #383838; text-decoration: none; text-align: left; font-family: lato, sans-serif; font-size: 14px; line-height: 18px;"\
                                                                     href="' + setting_data.site_url + 'contact_us.php" target="_blank">Need help?<br/>Send us your questons</a>\
                                                               </td>\
                                                            </tr>\
                                                         </tbody>\
                                                      </table>\
                                                   </td>\
                                                </tr>\
                                             </tbody>\
                                          </table>\
                                       </td>\
                                    </tr>\
                                 </tbody>\
                              </table>\
                           </div>\
                           <div>\
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                 <tbody>\
                                    <tr>\
                                       <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;font-family: lato, sans-serif; font-size: 10px;     color: #fff; background: #212121;padding:15px;" class="horizontal-gutter">This e-mail was sent to <a href="#" style="text-decoration:underline;color:#efefef;">' + data.contact_email + '</a> and contains information directly related to your CXOHONOUR account. This is a one-time email. You received this email because you signed up for a CXOHONOUR account. Please do not reply to this email. If you want to contact us, please contact us directly.</td>\
                                    </tr>\
                                 </tbody>\
                              </table>\
                           </div>\
                        </td>\
                     </tr>\
                  </tbody>\
               </table>\
            </td>\
         </tr>\
      </tbody>\
   </table>\
</body>';
        return message_body;
    },

    emailbodyadmin: function(body, setting_data) {
        var admin_body = '<body style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; width: 100%;">\
         <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden"></div>\
         <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin: 0; padding: 0; text-align: left; width: 100%; line-height: 100%;background: #F2F2F2;" class="backgroundTable" valign="top">\
            <tbody>\
               <tr>\
                  <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse;">\
                     <table cellpadding="0" cellspacing="0" border="0" width="600" class="email-content" align="center" style="margin: 30px auto;box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                        <tbody>\
                           <tr>\
                              <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse;">\
                                 <div>\
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                       <tbody>\
                                          <tr>\
                                             <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="image-container" bgcolor="#FFFFFF">\
                                                <a target="_blank" href="http://www.cxohonour.com/" style="color: #E27B3E; text-decoration: none;"><img src="' + setting_data.site_url + 'images/CXOHonourBanner.jpg" width="800" height="300" alt="" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block; border: none;"></a>\
                                             </td>\
                                          </tr>\
                                       </tbody>\
                                    </table>\
                                 </div>\
                                 <div>\
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                       <tbody>\
                                          <tr>\
                                             <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="vertical-grid">\
                                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                                   <tbody>\
                                                      <tr>\
                                                         <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; font-size: 1px; line-height: 1px;" class="horizontal-gutter" bgcolor="#FFFFFF" width="100%" height="30">&nbsp;</td>\
                                                      </tr>\
                                                      <tr>\
                                                         <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="horizontal-grid" bgcolor="#FFFFFF" width="100%">\
                                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                                               <tbody>\
                                                                  <tr>\
                                                                     <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="vertical-gutter side-padding" width="30">&nbsp;</td>\
                                                                     <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="vertical-grid">\
                                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                                                           <tbody>\
                                                                              <tr>\
                                                                                 <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; font-size: 18px; line-height: 25px; color: #000000; font-family: lato, sans-serif; font-weight: normal;" class="text-container" width="100%"><b> ' + setting_data.site_support_name + '</b></td>\
                                                                              </tr>\
                                                                              <tr>\
                                                                                 <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; font-size: 1px; line-height: 1px;" class="horizontal-gutter" width="100%" height="20">&nbsp;</td>\
                                                                              </tr>\
                                                                              <tr>\
                                                                                 <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; color: #4e4e4e; font-family: lato, sans-serif; font-size: 16px; line-height: 25px; font-weight: normal;" class="text-container" width="100%">' + body + '</td>\
                                                                              </tr>\
                                                                              <tr>\
                                                                                 <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; font-size: 1px; line-height: 1px;" class="horizontal-gutter" width="100%" height="100">&nbsp;</td>\
                                                                              </tr>\
                                                                           </tbody>\
                                                                        </table>\
                                                                     </td>\
                                                                     <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;" class="vertical-gutter side-padding" width="30">&nbsp;</td>\
                                                                  </tr>\
                                                               </tbody>\
                                                            </table>\
                                                         </td>\
                                                      </tr>\
                                                      <tr>\
                                                         <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left; background: #f9f9f9;padding:15px 0;" class="button-container" width="100%">\
                                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto; height: 35;">\
                                                               <tbody>\
                                                                  <tr>\
                                                                     <td valign="top" width="15" height="35" style="mso-line-height-rule: exactly; border-collapse: collapse; background: #f9f9f9;">&nbsp;</td>\
                                                                     <td valign="top" width="35" height="35" style="mso-line-height-rule: exactly; border-collapse: collapse; background: #f9f9f9;"><img src="http://cio.cxohonour.com/edm/cio/24/4/2015/registration/question.png" width="35" height="35" style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block;"></td>\
                                                                     <td valign="top" width="15" height="35" style="mso-line-height-rule: exactly; border-collapse: collapse; background: #f9f9f9;">&nbsp;</td>\
                                                                     <td valign="middle" style="mso-line-height-rule: exactly; border-collapse: collapse;color: #383838; text-decoration: none; text-align: left; font-family: lato, sans-serif; font-size: 14px; line-height: 18px;" height="35">\
                                                                        <a style="background: #f9f9f9; color: #383838; text-decoration: none; text-align: left; font-family: lato, sans-serif; font-size: 14px; line-height: 18px;" href="' + setting_data.site_url + 'contact_us.php" target="_blank">Need help?<br/>Send us your questons</a>\
                                                                     </td>\
                                                                  </tr>\
                                                               </tbody>\
                                                            </table>\
                                                         </td>\
                                                      </tr>\
                                                   </tbody>\
                                                </table>\
                                             </td>\
                                          </tr>\
                                       </tbody>\
                                    </table>\
                                 </div>\
                                 <div>\
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">\
                                       <tbody>\
                                          <tr>\
                                             <td valign="top" style="mso-line-height-rule: exactly; border-collapse: collapse; text-align: left;font-family: lato, sans-serif; font-size: 10px;color: #fff; background: #212121;padding:15px;" class="horizontal-gutter">This e-mail was sent to <a href="#" style="text-decoration:underline;color:#efefef;">' + setting_data.site_support_email + '</a> and contains information directly related to your CXOHONOUR account. This is a one-time email. You received this email because you signed up for a CXOHONOUR account. Please do not reply to this email. If you want to contact us, please contact us directly.</td>\
                                          </tr>\
                                       </tbody>\
                                    </table>\
                                 </div>\
                              </td>\
                           </tr>\
                        </tbody>\
                     </table>\
                  </td>\
               </tr>\
            </tbody>\
         </table>\
      </body>';
        return admin_body;
    }
};
function sendmailbyJob() {
    settingsCRUD.load({}, function(setting_error, settings) {
                    
                    
                if(!setting_error){
                    var select_query = "select tagged_companies,red_companies,item_name from item ";
                    var all_pink_companies = [];
                    var all_red_companies = [];
                    connection.query(select_query, function(error, endorsed_companies) {
                        if(!error){                            
                            if(endorsed_companies.length){
                            for (var i = 0; i < endorsed_companies.length; i++) {                                    
                                    all_pink_companies = all_pink_companies.concat(endorsed_companies[i].tagged_companies.split(','));
                                    all_red_companies = all_red_companies.concat(endorsed_companies[i].red_companies.split(','));
                                }
                            }
                            all_pink_companies = all_pink_companies.filter(function(item, pos) {
                                    return all_pink_companies.indexOf(item) == pos;
                            });
                            all_red_companies = all_red_companies.filter(function(item, pos) {
                                    return all_red_companies.indexOf(item) == pos;
                            });
                            function checkExists(name) {
                                if(name.length && name != ' ' && name != ', '  && name != ',')
                                    return name.trim();
                            }
                            all_pink_companies = all_pink_companies.filter(checkExists);
                            all_red_companies = all_red_companies.filter(checkExists);                                                       
                            settings = settings[0];
                            jobsCRUD.load({
                                email: 'pending'
                                }, function(err, pending_jobs) {
                                    // console.log('sendmail pending_jobs');
                                    // console.log(pending_jobs);
                                    async.each(pending_jobs, function(current_job, callback) {
                                        var all_companies = current_job.company_shortname.split(',');
                                        //remove duplicates if exists
                                            all_companies = all_companies.filter(function(item, pos) {
                                                return all_companies.indexOf(item) == pos;
                                        });
                                        all_companies = all_companies.filter(function(item, pos) {
                                                if(item.length && item != ' ' && item != ', '  && item != ',')
                                                return item.trim();
                                        });
                                           
                                        console.log('all_companies');                                                                                                                      
                                        console.log(all_companies);                                                                                                                    
                                        var no_of_companies = all_companies.length;
                                        var i = 0;
                                        async.each(all_companies, function(current_company, callback) {
                                            // console.log("current_job");
                                            // console.log(current_job);
                                            // console.log("sendmail settings");
                                            // console.log(settings);  
                                            // console.log('all_pink_companies ', all_pink_companies);
                                            // console.log('all_red_companies ', all_red_companies);                                              
                                            // console.log('sendmail all_companieslength');
                                            // console.log(all_companies.length);
                                            // console.log("sendmail current_company");
                                            // console.log(current_company);
                                            
                                            var search_query = "select * from company where short_name like '" + current_company + "' limit 1";
                                                connection.query(search_query, function(error2, result2) {
                                                  if(!error2){
                                                        if(result2.length ){
                                                                var staff_query = "select * from company_staff where cid =" + result2[0].cid;
                                                                connection.query(staff_query, function(error3, result3) {
                                                                    if(!error3){
                                                                        if(result3.length){
                                                                            async.each(result3, function(staff, callback) {
                                                                                // console.log("staff");
                                                                                // console.log(staff);
                                                                                var isPink =  contains.call(all_pink_companies, current_company);
                                                                                var isRed =  contains.call(all_red_companies, current_company);                                                                    
                                                                                // console.log("isPink ", isPink);
                                                                                // console.log("isRed ", isRed);
                                                                                if(isPink){
                                                                                    send_mail('pink', staff, current_company, current_job.item_name, settings);
                                                                                    i++;
                                                                                    if(all_companies.length == i)
                                                                                        updateEmailJobStatus(current_job);
                                                                                    // mail as pink
                                                                                } else if(isRed){
                                                                                    // mail as red
                                                                                    send_mail('red', staff, current_company, current_job.item_name, settings);
                                                                                    i++;
                                                                                    if(all_companies.length == i)
                                                                                        updateEmailJobStatus(current_job);
                                                                                }
                                                                                isRed = false;
                                                                                isPink = false;
                                                                                }, function(async_error1, async_success) {
                                                                                    if (!async_error1) {
                                                                                        // res.jsonp({
                                                                                        //     status: true,
                                                                                        // });
                                                                                    } else{
                                                                                        console.log(async_error1, '318');
                                                                                    }
                                                                            });
                                                                        } else{
                                                                            updateEmailJobStatus(current_job);
                                                                            i++;
                                                                        }
                                                                    }else{
                                                                        console.log(error3, '305');
                                                                    }

                                                            })
                                                        } else{
                                                            //new company mail to admin
                                                            // console.log('new company', current_company);
                                                            send_mail('new', '', current_company, '', settings);                                                            
                                                            updateEmailJobStatus(current_job);
                                                            company_query = "insert into company(name, short_name) values ('"+current_company+"','"+current_company.toUpperCase()+"')";
                                                            connection.query(company_query, function(error, result) {
                                                                if(!error){
                                                                    // console.log("company Inserted");
                                                                    // console.log(result);
                                                                } else{
                                                                    console.log("insert error for  new company ",error);
                                                                }
                                                            });
                                                        }
                                                    }else{
                                                        console.log(error2, '296');
                                                    }
                                            })
                                        }, function(async_error, async_success) {
                                            if (!async_error) {
                                                // res.jsonp({
                                                //     status: true,
                                                // });
                                            } else{
                                                console.log(async_error, '239');
                                            }
                                        });    
                                    }, function(async_error, async_success) {
                                    if (!async_error) {
                                        // res.jsonp({
                                        //     status: true,
                                        // });
                                    } else{
                                        console.log(async_error, '248');
                                }
                            });
                         })
                    } else{
                    console.log(error, '267');
                    }
                   });                 
                }else{
                    console.log(setting_error);
                }
            
    })
}
app.use('/api', router);

// start the server ======
// =======================
app.listen(port);
console.log('Magic @ : ' + port);
