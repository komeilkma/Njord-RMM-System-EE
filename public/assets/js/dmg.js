/*
Author: Darth Vader
Version: 1.0.0
*/


function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null; // Cookie not found
}

function getErrorDetails(parameter) {
    var error = "";

    switch (parameter) {
        case "missing_step":
            error = "پله‌های پله برقی شکسته یا از دست رفته";
            break;
        case "step_sag_down":
            error = "خطا در استپ سگ پایینی";
            break;
        case "step_sag_up":
            error = "خطا در استپ سگ بالایی";
            break;
        case "brake":
            error = "خطای ترمز پله برقی";
            break;
        case "comb_plate_down":
            error = "خطای صفحه شانه ی پایینی";
            break;
        case "comb_plate_up":
            error = "خطای صفحه شانه بالایی";
            break;
        case "broken_step_chain":
            error = "خطای پاره شدن زنجیر پله";
            break;
        case "broken_drive_chain":
            error = "خطای خرابی زنجیر درایو";
            break;
        case "deck_stolen":
            error = "دزدیده شدن deck پله برقی";
            break;
        case "reboot":
            error = "خطای راه اندازی مجدد";
            break;
        case "water_level":
            error = "خطای افزایش سطح آب";
            break;
        case "handrail_entry_up":
            error = "خطای ورودی نرده ی بالا";
            break;
        case "handrail_entry_down":
            error = "خطای ورودی نرده ی پایین";
            break;
        case "landing_palte":
            error = "خرابی صفحه ی فرود پله برقی";
            break;
        case "skirting_right":
            error = "گیر کردن لباس در سمت راست پله برقی";
            break;
        case "skirting_left":
            error = "گیر کردن لباس در سمت چپ پله برقی";
            break;
        default:
            break;
    }

    return error;
}

function checkAndLogErrors(alaramData) {
    var statusData = alaramData.status_data;
    var hasError = false;
    var errorLog = [];
	var tablelist = [];

    for (var key in statusData) {
        if (statusData.hasOwnProperty(key)) {
            if (statusData[key] === 1) {
                hasError = true;
                errorLog.push(key);
            }
        }
    }

    if (hasError) {
        errorLog.forEach(function (error) {
			
			tablelist.push(getErrorDetails(error));

        });
    } else {
        return ['خطاها برطرف شدند'];
    }
	return tablelist;
}




function get_data() {
	
var settings = {
  "url": "http://localhost:8080/api/v1/custom/gatewaydata/"+window.location.href.split("?")[1],
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer "+getCookie("token")
  },
};



$.ajax(settings).done(function (response) {


       console.log(response);
       
				 		if ( response.imsi.substring(0, 5) == "43235" ) {
	
			document.getElementById("operat-status").innerHTML="اپراتور فعال : ایرانسل";
			 document.getElementById("operat-status").classList.remove("badge-success")
			 document.getElementById("operat-status").classList.remove("badge-info")
			 document.getElementById("operat-status").classList.remove("badge-primary")
			 document.getElementById("operat-status").classList.remove("badge-secondary")
			 document.getElementById("operat-status").classList.add("badge-warning")
			
			
		}else if  ( response.imsi.substring(0, 5) == "43220" ) {
		
            document.getElementById("operat-status").innerHTML="اپراتور فعال : رایتل";
						 document.getElementById("operat-status").classList.remove("badge-success")
			 document.getElementById("operat-status").classList.remove("badge-info")
			 document.getElementById("operat-status").classList.add("badge-primary")
			 document.getElementById("operat-status").classList.remove("badge-secondary")
			 document.getElementById("operat-status").classList.remove("badge-warning")
		
	}else if  ( response.imsi.substring(0, 5) == "43244" ) {
		
             document.getElementById("operat-status").innerHTML="اپراتور فعال : مبین نت";
			 
			 			 document.getElementById("operat-status").classList.add("badge-success")
			 document.getElementById("operat-status").classList.remove("badge-info")
			 document.getElementById("operat-status").classList.remove("badge-primary")
			 document.getElementById("operat-status").classList.remove("badge-secondary")
			 document.getElementById("operat-status").classList.remove("badge-warning")
		
	}else if  ( response.imsi.substring(0, 5) == "43211" ) {
		
             document.getElementById("operat-status").innerHTML="اپراتور فعال : همراه اول";
			 			 document.getElementById("operat-status").classList.remove("badge-success")
			 document.getElementById("operat-status").classList.add("badge-info")
			 document.getElementById("operat-status").classList.remove("badge-primary")
			 document.getElementById("operat-status").classList.remove("badge-secondary")
			 document.getElementById("operat-status").classList.remove("badge-warning")
		
	}else if  ( response.imsi.substring(0, 5) == "43208" ) {
		
             document.getElementById("operat-status").innerHTML="اپراتور فعال : شاتل موبایل";
			 			 document.getElementById("operat-status").classList.remove("badge-success")
			 document.getElementById("operat-status").classList.remove("badge-info")
			 document.getElementById("operat-status").classList.remove("badge-primary")
			 document.getElementById("operat-status").classList.add("badge-secondary")
			 document.getElementById("operat-status").classList.remove("badge-warning")
		
	}


 document.getElementById("freq").innerHTML=response.motor_data.frequency+" (Hz)";
	document.getElementById("volbus").innerHTML=response.motor_data.bus_voltage+" (V)";
	document.getElementById("volout").innerHTML=response.motor_data.output_voltage+" (V)";
	document.getElementById("currout").innerHTML=response.motor_data.output_current+" (A)";
	document.getElementById("powerout").innerHTML=response.motor_data.output_power+" (KW)";
	document.getElementById("torq").innerHTML=response.motor_data.output_torque+" (N.m)";
	document.getElementById("temp").innerHTML=response.motor_data.motor_temperature+" (°C)";
	if ( response.motor_data.error_code == 0 ) {
		document.getElementById("statmotor").innerHTML="نرمال";
	}else if ( response.motor_data.error_code == 255 ) {
		document.getElementById("statmotor").innerHTML="قطع";
	}else {
		document.getElementById("statmotor").innerHTML="کد خطا:"+response.motor_data.error_code;
	}
				
				
				
				 if (response.status_data.run_motor == 1) {
	 
	
	 if ( response.status_data.speed_motor == 1 ) {
		 
		  document.getElementById("bat").innerHTML="پله برقی روشن است و سرعت حرکت بالاست"
	 }else {
		 
		 document.getElementById("bat").innerHTML="پله برقی روشن است و سرعت حرکت پایین است"
		 
	 }
	 
 }else {
	 
	 if ( response.status_data.alaram_motor == 1 ) {
		 
		 document.getElementById("bat").innerHTML="پله برقی خاموش است و دارای اخطار میباشد"
		  document.getElementById("animate_esc").src='/assets/images/stop.png'
		 
	 }else {
		 
		 document.getElementById("bat").innerHTML="پله برقی خاموش است و بدون اخطار میباشد"
		 document.getElementById("animate_esc").src='/assets/images/stop.png'
	 }
	 
	 
	 
 }
				
				 document.getElementById("time3").innerHTML = response.last_connection;
				 
				                   var tarikh = new persianDate();
                  var dategw=response.last_connection.split(" , ")[0];
                  var datealan=tarikh.toLocale('en').format().split(" ")[0];

                     if (  dategw != datealan ) {
						 
						 document.getElementById("offon").innerHTML = "آفلاین";
						 document.getElementById("offon").classList.remove("badge-success")
						 document.getElementById("offon").classList.add("badge-danger")
					 }else {
						 
				  var houralan=tarikh.toLocale('en').format().split(" ")[1].split(":")[0];
				  var hourgw=response.last_connection.split(" , ")[1].split(":")[0];
				  if (  houralan != hourgw ) {
					  document.getElementById("offon").innerHTML = "آفلاین";
					  	 document.getElementById("offon").classList.remove("badge-success")
						 document.getElementById("offon").classList.add("badge-danger")
					  
					  
				  }else {
					  
					  
					    var minalan=tarikh.toLocale('en').format().split(" ")[1].split(":")[1];
				  var mingw=response.last_connection.split(" , ")[1].split(":")[1];
				  var ekhtelaph=Number(minalan)-Number(mingw);
				  if (  ekhtelaph > 10 ) {
					  document.getElementById("offon").innerHTML = "آفلاین";
					  	 document.getElementById("offon").classList.remove("badge-success")
						 document.getElementById("offon").classList.add("badge-danger")
					  
					  
				  }else {
					  
					  
					  
					    document.getElementById("offon").innerHTML = "آنلاین";
					  	 document.getElementById("offon").classList.add("badge-success")
						 document.getElementById("offon").classList.remove("badge-danger")
				  }
				  
						 
						 
					 }
					 
					 }
				 

});


     




	
	
}





function check_pages() {
	var settings = {
		"url": "http://localhost:8080/api/v1/custom/gatewaydata/DMG-8613207",
		"method": "GET",
		"timeout": 0,
		"headers": {
		  "Authorization": "Bearer "+getCookie("token")
		},
	  };
	  
	  $.ajax(settings).done(function (response) {
	   console.log(response);
	  })
	  .fail(function (jqXHR, textStatus, errorThrown) {
		if (errorThrown == "Unauthorized"){

			window.location.href="/";
		}
	  });

}


function get_off_on(last_connection) {
	
	
	var tarikh = new persianDate();
var dategw=last_connection.split(" , ")[0];
var datealan=tarikh.toLocale('en').format().split(" ")[0];

   if (  dategw != datealan ) {
	   
	  return '<span style="font-size:12px" class="badge badge-danger" id="offon">آفلاین</span>'
   }else {
	   
var houralan=tarikh.toLocale('en').format().split(" ")[1].split(":")[0];
var hourgw=last_connection.split(" , ")[1].split(":")[0];
if (  houralan != hourgw ) {
  return '<span style="font-size:12px" class="badge badge-danger" id="offon">آفلاین</span>'
	
	
}else {
	  var minalan=tarikh.toLocale('en').format().split(" ")[1].split(":")[1];
var mingw=last_connection.split(" , ")[1].split(":")[1];
var ekhtelaph=Number(minalan)-Number(mingw);
if (  ekhtelaph > 10 ) {
  return '<span style="font-size:12px" class="badge badge-danger" id="offon">آفلاین</span>'
	
}else {
  return '<span style="font-size:12px" class="badge badge-success" id="offon">آنلاین</span>';
}
	 
	   
   }
   
   }



}


function dashboard_data () {
	
	
  var settings = {
    "url": "http://localhost:8080/api/v1/custom/gatewaycount",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer "+getCookie("token"),
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "start_date": "1402-01-01",
      "start_time": "00:00",
      "end_date": "1402-12-30",
      "end_time": "23:59",
      "all_time": "1"
    }),
  };
  

		var tarikh = new persianDate()
		var settings_this_month = {
      "url": "http://localhost:8080/api/v1/custom/gatewaycount",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+getCookie("token"),
        "Content-Type": "application/json"
      },
  "data": JSON.stringify({
    "start_date": tarikh.toLocale('en').format().split(" ")[0].substring(0, 7)+'-01',
    "start_time": "00:00",
    "end_date": tarikh.toLocale('en').format().split(" ")[0].substring(0, 7)+'-31',
    "end_time": "23:59",
	"all_time" : "1"
  }),
};



		var settings_per_month = {
      "url": "http://localhost:8080/api/v1/custom/gatewaycount",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+getCookie("token"),
        "Content-Type": "application/json"
      },
  "data": JSON.stringify({
    "start_date": tarikh.toLocale('en').format().split(" ")[0].split("-")[0]+'-0'+(Number(tarikh.toLocale('en').format().split(" ")[0].split("-")[1])-1)+'-'+'01',
    "start_time": "00:00",
    "end_date": tarikh.toLocale('en').format().split(" ")[0].split("-")[0]+'-0'+(Number(tarikh.toLocale('en').format().split(" ")[0].split("-")[1])-1)+'-'+'31',
    "end_time": "23:59",
	"all_time" : "1"
  }),
};


$.ajax(settings).done(function (response) {
	
   document.getElementById("devicecount").innerHTML=response.count[0].row_count;
	
	});
	
$.ajax(settings_this_month).done(function (response) {
	
   document.getElementById("this_month").innerHTML=response.count[0].row_count;
	
	});
	
	$.ajax(settings_per_month).done(function (response) {
	
   document.getElementById("per_month").innerHTML=response.count[0].row_count;
	
	});
	
	

	var table_settings = {
		"url": "http://localhost:8080/api/v1/custom/gatewayslist",
		"method": "POST",
		"timeout": 0,
		"headers": {
		  "Authorization": "Bearer "+getCookie("token"),
		  "Content-Type": "application/json"
		},
		"data": JSON.stringify({
		  "page": "1",
		  "descending_order": 1
		}),
	  };

	  
	  $.ajax(table_settings).done(function (response) {
	
		var tableBody = document.getElementById("list_data");
        response.gateways.forEach(function (gateway) {
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${gateway.shamsi_date}</td>
                <td>${gateway.serial}</td>
                <td>${gateway.reg_date}</td>
                <td>${get_off_on(gateway.shamsi_date)}</td>
                <td><a href='Dashboard/DMG?${gateway.serial}' class='btn btn-primary btn-sm'>مشاهده پروفایل</a></td>
            `;
            tableBody.appendChild(row);
        });
		 
		 });

	
}







function get_data_first() {
	
  var settings = {
    "url": "http://localhost:8080/api/v1/custom/gatewaydata/"+window.location.href.split("?")[1],
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer "+getCookie("token")
    },
  };



$.ajax(settings).done(function (response) {
	randi = Math.floor((Math.random() * 5414452620) + 1);
	document.getElementById("softversion").innerHTML=response.softversion;
	document.getElementById("mappic").src="/assets/images/"+window.location.href.split("?")[1]+".png?"+randi;
	document.getElementById("gateway_name").innerHTML=window.location.href.split("?")[1];
	document.getElementById("loc").innerHTML=response.location;

				 if (response.status_data.run_motor == 1) {
	 
	
	 if ( response.status_data.speed_motor == 1 ) {
		 
		  document.getElementById("bat").innerHTML="پله برقی روشن است و سرعت حرکت بالاست"
	 }else {
		 
		 document.getElementById("bat").innerHTML="پله برقی روشن است و سرعت حرکت پایین است"
		 
	 }
	 
 }else {
	 
	 if ( response.status_data.alaram_motor == 1 ) {
		 
		 document.getElementById("bat").innerHTML="پله برقی خاموش است و دارای اخطار میباشد"
		 document.getElementById("animate_esc").src='/assets/images/stop.png'
		 
	 }else {
		 
		 document.getElementById("bat").innerHTML="پله برقی خاموش است و بدون اخطار میباشد"
		 document.getElementById("animate_esc").src='/assets/images/stop.png'
	 }
	 
	 
	 
	 
 }
 
 
 document.getElementById("freq").innerHTML=response.motor_data.frequency+" (Hz)";
	document.getElementById("volbus").innerHTML=response.motor_data.bus_voltage+" (V)";
	document.getElementById("volout").innerHTML=response.motor_data.output_voltage+" (V)";
	document.getElementById("currout").innerHTML=response.motor_data.output_current+" (A)";
	document.getElementById("powerout").innerHTML=response.motor_data.output_power+" (KW)";
	document.getElementById("torq").innerHTML=response.motor_data.output_torque+" (N.m)";
	document.getElementById("temp").innerHTML=response.motor_data.motor_temperature+" (°C)";
	if ( response.motor_data.error_code == 0 ) {
		document.getElementById("statmotor").innerHTML="نرمال";
	}else if ( response.motor_data.error_code == 255 ) {
		document.getElementById("statmotor").innerHTML="قطع";
	}else {
		document.getElementById("statmotor").innerHTML="کد خطا:"+response.motor_data.error_code;
	}
 
 
 
 document.getElementById("imsii").innerHTML=response.imsi;
 		if ( response.imsi.substring(0, 5) == "43235" ) {
	
			document.getElementById("operat-status").innerHTML="اپراتور فعال : ایرانسل";
			 document.getElementById("operat-status").classList.remove("badge-success")
			 document.getElementById("operat-status").classList.remove("badge-info")
			 document.getElementById("operat-status").classList.remove("badge-primary")
			 document.getElementById("operat-status").classList.remove("badge-secondary")
			 document.getElementById("operat-status").classList.add("badge-warning")
			
			
		}else if  ( response.imsi.substring(0, 5) == "43220" ) {
		
            document.getElementById("operat-status").innerHTML="اپراتور فعال : رایتل";
						 document.getElementById("operat-status").classList.remove("badge-success")
			 document.getElementById("operat-status").classList.remove("badge-info")
			 document.getElementById("operat-status").classList.add("badge-primary")
			 document.getElementById("operat-status").classList.remove("badge-secondary")
			 document.getElementById("operat-status").classList.remove("badge-warning")
		
	}else if  ( response.imsi.substring(0, 5) == "43244" ) {
		
             document.getElementById("operat-status").innerHTML="اپراتور فعال : مبین نت";
			 
			 			 document.getElementById("operat-status").classList.add("badge-success")
			 document.getElementById("operat-status").classList.remove("badge-info")
			 document.getElementById("operat-status").classList.remove("badge-primary")
			 document.getElementById("operat-status").classList.remove("badge-secondary")
			 document.getElementById("operat-status").classList.remove("badge-warning")
		
	}else if  ( response.imsi.substring(0, 5) == "43211" ) {
		
             document.getElementById("operat-status").innerHTML="اپراتور فعال : همراه اول";
			 			 document.getElementById("operat-status").classList.remove("badge-success")
			 document.getElementById("operat-status").classList.add("badge-info")
			 document.getElementById("operat-status").classList.remove("badge-primary")
			 document.getElementById("operat-status").classList.remove("badge-secondary")
			 document.getElementById("operat-status").classList.remove("badge-warning")
		
	}else if  ( response.imsi.substring(0, 5) == "43208" ) {
		
             document.getElementById("operat-status").innerHTML="اپراتور فعال : شاتل موبایل";
			 			 document.getElementById("operat-status").classList.remove("badge-success")
			 document.getElementById("operat-status").classList.remove("badge-info")
			 document.getElementById("operat-status").classList.remove("badge-primary")
			 document.getElementById("operat-status").classList.add("badge-secondary")
			 document.getElementById("operat-status").classList.remove("badge-warning")
		
	}
 
	          document.getElementById("time3").innerHTML = response.last_connection;  

                  var tarikh = new persianDate();
                  var dategw=response.last_connection.split(" , ")[0];
                  var datealan=tarikh.toLocale('en').format().split(" ")[0];

                     if (  dategw != datealan ) {
						 
						 document.getElementById("offon").innerHTML = "آفلاین";
						 document.getElementById("offon").classList.remove("badge-success")
						 document.getElementById("offon").classList.add("badge-danger")
					 }else {
						 
				  var houralan=tarikh.toLocale('en').format().split(" ")[1].split(":")[0];
				  var hourgw=response.last_connection.split(" , ")[1].split(":")[0];
				  if (  houralan != hourgw ) {
					  document.getElementById("offon").innerHTML = "آفلاین";
					  	 document.getElementById("offon").classList.remove("badge-success")
						 document.getElementById("offon").classList.add("badge-danger")
					  
					  
				  }else {
					  
					  
					    var minalan=tarikh.toLocale('en').format().split(" ")[1].split(":")[1];
				  var mingw=response.last_connection.split(" , ")[1].split(":")[1];
				  var ekhtelaph=Number(minalan)-Number(mingw);
				  if (  ekhtelaph > 10 ) {
					  document.getElementById("offon").innerHTML = "آفلاین";
					  	 document.getElementById("offon").classList.remove("badge-success")
						 document.getElementById("offon").classList.add("badge-danger")
					  
					  
				  }
				  
						 
						 
					 }
					 
					 }
			  
	          document.getElementById("dmg1").innerHTML = response.serial_number;   
	          document.getElementById("dmg2").innerHTML = response.serial_number;   
	          document.getElementById("dmg3").innerHTML = response.serial_number; 
			  document.title = response.serial_number;

});



var alert_table_settings = {
	"url": "http://localhost:8080/api/v1/custom/gatewayalerts",
	"method": "POST",
	"timeout": 0,
	"headers": {
	  "Authorization": "Bearer "+getCookie("token"),
	  "Content-Type": "application/json"
	},
	"data": JSON.stringify({
	  "serial": window.location.href.split("?")[1],
	  "page": "1",
	  "descending_order": 1
	}),
  };

  
  $.ajax(alert_table_settings).done(function (response) {

	response.alaram.forEach(function (entry) {
		var tableBody = document.getElementById("table_body");
		var table_list_array = checkAndLogErrors(entry);
		//var table_list_array = "<tr>" + table_list_array + "</tr>";
		console.log(table_list_array)
		//console.log(entry.shamsi_date)
		var row = document.createElement("tr");
		var td1 = document.createElement("td");
		for (var j = 0; j < table_list_array.length; j++) {
			var div = document.createElement("div");
			div.innerHTML = table_list_array[j];
			if (table_list_array[j] == "خطاها برطرف شدند"){

				div.classList.add("text-success");

			}else {
				div.classList.add("text-danger");

			}
			td1.appendChild(div);
		  }
		  var td2 = document.createElement("td");
		  td2.textContent = entry.shamsi_date;
		  row.appendChild(td2)
		  row.appendChild(td1)
		  tableBody.appendChild(row)	

	});
	 
	 });

	
}




