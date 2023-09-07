<?php

namespace App\Controllers;

class BasicFunctions extends BaseController
{
    public function checkNotEmpty($jsonData, bool $allowZeroTag = false): bool
    {
        foreach ($jsonData as $value) {
            if ($allowZeroTag) {
                if (empty($value) && $value !== "0") {
                    return false;
                }
            } else {
                if (empty($value)) {
                    return false;
                }
            }
        }
        return true;
    }

    public function Convert_Status_Data($status_data) {

        preg_match('/bin\((.*?)\)/', $status_data, $matches);
        $binaryString = $matches[1];
        $binaryDigits = array();
        for ($i = 0; $i < strlen($binaryString); $i++) {
            $binaryDigit = intval($binaryString[$i]);
            $binaryDigits[] = $binaryDigit;
        }
        $headers_status = array("missing_step","step_sag_down","step_sag_up","brake","comb_plate_down","comb_plate_up","broken_step_chain","broken_drive_chain","deck_stolen","reboot","water_level","handrail_entry_up","handrail_entry_down","landing_palte","skirting_right","skirting_left","NONE_1","NONE_2","NONE_3","NONE_4","run_motor","alaram_motor","speed_motor","NONE_5");
        $combinedArray = array_combine($headers_status, $binaryDigits);
        $keysToRemove = array("NONE_1", "NONE_2", "NONE_3", "NONE_4", "NONE_5");
        foreach ($keysToRemove as $key) {
        unset($combinedArray[$key]);
        }

        return $combinedArray;

    }



    public function Convert_Status_Data_Alaram($status_data) {

        preg_match('/bin\((.*?)\)/', $status_data, $matches);
        $binaryString = $matches[1];
        $binaryDigits = array();
        for ($i = 0; $i < strlen($binaryString); $i++) {
            $binaryDigit = intval($binaryString[$i]);
            $binaryDigits[] = $binaryDigit;
        }
        $headers_status = array("missing_step","step_sag_down","step_sag_up","brake","comb_plate_down","comb_plate_up","broken_step_chain","broken_drive_chain","deck_stolen","reboot","water_level","handrail_entry_up","handrail_entry_down","landing_palte","skirting_right","skirting_left","NONE_1","NONE_2","NONE_3","NONE_4","run_motor","alaram_motor","speed_motor","NONE_5");
        $combinedArray = array_combine($headers_status, $binaryDigits);
        $keysToRemove = array("NONE_1", "NONE_2", "NONE_3", "NONE_4", "NONE_5","run_motor","alaram_motor","speed_motor");
        foreach ($keysToRemove as $key) {
        unset($combinedArray[$key]);
        }

        return $combinedArray;

    }
    public function Convert_Motor_Data($motor_data) {
        $motor_data_array = array();
        preg_match('/motor\((.*?)\)/', $motor_data, $matches_motor);
        if ($matches_motor[1] == "motor-connect-fail" ) {
            $motor_data_array["frequency"]="0";
            $motor_data_array["bus_voltage"]="0";
            $motor_data_array["output_voltage"]="0";
            $motor_data_array["output_current"]="0";
            $motor_data_array["output_power"]="0";
            $motor_data_array["output_torque"]="0";
            $motor_data_array["motor_temperature"]="0";
            $motor_data_array["error_code"]="0";

        }else {
            $motor_split=str_split($matches_motor[1], 4);
            $motor_data_array["frequency"]=number_format(hexdec($motor_split[1])/100,2);
            $motor_data_array["bus_voltage"]=number_format(hexdec($motor_split[2])/10,2);
            $motor_data_array["output_voltage"]=hexdec($motor_split[3]);
            $motor_data_array["output_current"]=number_format(hexdec($motor_split[4])/100,2);
            $motor_data_array["output_power"]=hexdec($motor_split[5]);
            $motor_data_array["output_torque"]=hexdec($motor_split[6]);
            $motor_data_array["motor_temperature"]=hexdec($motor_split[7]);
            $motor_data_array["error_code"]=hexdec($motor_split[8]);
             }

        return $motor_data_array;
    }

    
    public function shamsi_date($format, $when="now", $persianNumber = 0)
    {
        $TZhours=0;
        $TZminute=0;
        $need="";
        $result1="";
        $result="";
        if($when=="now"){
            $year=date("Y");
            $month=date("m");
            $day=date("d");
            list( $Dyear, $Dmonth, $Dday ) = $this->gregorian_to_mds($year, $month, $day);
            $when=mktime(date("H")+$TZhours,date("i")+$TZminute,date("s"),date("m"),date("d"),date("Y"));
        }else{
            $when+=$TZhours*3600+$TZminute*60;
            $date=date("Y-m-d",$when);
            list( $year, $month, $day ) = preg_split ( '/-/', $date );
    
            list( $Dyear, $Dmonth, $Dday ) = $this->gregorian_to_mds($year, $month, $day);
            }
    
        $need= $when;
        $year=date("Y",$need);
        $month=date("m",$need);
        $day=date("d",$need);
        $i=0;
        $subtype="";
        $subtypetemp="";
        list( $Dyear, $Dmonth, $Dday ) = $this->gregorian_to_mds($year, $month, $day);
        while($i<strlen($format))
        {
            $subtype=substr($format,$i,1);
            if($subtypetemp=="\\")
            {
                $result.=$subtype;
                $i++;
                continue;
            }
    
            switch ($subtype)
            {
    
                case "A":
                    $result1=date("a",$need);
                    if($result1=="pm") $result.= "&#1576;&#1593;&#1583;&#1575;&#1586;&#1592;&#1607;&#1585;";
                    else $result.="&#1602;&#1576;&#1604;&#8207;&#1575;&#1586;&#1592;&#1607;&#1585;";
                    break;
    
                case "a":
                    $result1=date("a",$need);
                    if($result1=="pm") $result.= "&#1576;&#46;&#1592;";
                    else $result.="&#1602;&#46;&#1592;";
                    break;
                case "d":
                    if($Dday<10)$result1="0".$Dday;
                    else 	$result1=$Dday;
                    if($persianNumber==1) $result.= $this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "D":
                    $result1=date("D",$need);
                    if($result1=="Thu") $result1="&#1662;";
                    else if($result1=="Sat") $result1="&#1588;";
                    else if($result1=="Sun") $result1="&#1609;";
                    else if($result1=="Mon") $result1="&#1583;";
                    else if($result1=="Tue") $result1="&#1587;";
                    else if($result1=="Wed") $result1="&#1670;";
                    else if($result1=="Thu") $result1="&#1662;";
                    else if($result1=="Fri") $result1="&#1580;";
                    $result.=$result1;
                    break;
                case"F":
                    $result.=$this->monthname($Dmonth);
                    break;
                case "g":
                    $result1=date("g",$need);
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "G":
                    $result1=date("G",$need);
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                    case "h":
                    $result1=date("h",$need);
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "H":
                    $result1=date("H",$need);
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "i":
                    $result1=date("i",$need);
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "j":
                    $result1=$Dday;
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "l":
                    $result1=date("l",$need);
                    if($result1=="Saturday") $result1="&#1588;&#1606;&#1576;&#1607;";
                    else if($result1=="Sunday") $result1="&#1610;&#1603;&#1588;&#1606;&#1576;&#1607;";
                    else if($result1=="Monday") $result1="&#1583;&#1608;&#1588;&#1606;&#1576;&#1607;";
                    else if($result1=="Tuesday") $result1="&#1587;&#1607;&#32;&#1588;&#1606;&#1576;&#1607;";
                    else if($result1=="Wednesday") $result1="&#1670;&#1607;&#1575;&#1585;&#1588;&#1606;&#1576;&#1607;";
                    else if($result1=="Thursday") $result1="&#1662;&#1606;&#1580;&#1588;&#1606;&#1576;&#1607;";
                    else if($result1=="Friday") $result1="&#1580;&#1605;&#1593;&#1607;";
                    $result.=$result1;
                    break;
                case "m":
                    if($Dmonth<10) $result1="0".$Dmonth;
                    else	$result1=$Dmonth;
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "M":
                    $result.=$this->short_monthname($Dmonth);
                    break;
                case "n":
                    $result1=$Dmonth;
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "s":
                    $result1=date("s",$need);
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "S":
                    $result.="&#1575;&#1605;";
                    break;
                case "t":
                    $result.=$this->lastday ($month,$day,$year);
                    break;
                case "w":
                    $result1=date("w",$need);
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "y":
                    $result1=substr($Dyear,2,4);
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "Y":
                    $result1=$Dyear;
                    if($persianNumber==1) $result.=$this->Convertnumber2farsi($result1);
                    else $result.=$result1;
                    break;
                case "U" :
                    $result.=mktime();
                    break;
                case "Z" :
                    $result.=$this->days_of_year($Dmonth,$Dday,$Dyear);
                    break;
                case "L" :
                    list( $tmp_year, $tmp_month, $tmp_day ) = $this->mds_to_gregorian(1384, 12, 1);
                    echo $tmp_day;
                    break;
                default:
                    $result.=$subtype;
            }
            $subtypetemp=substr($format,$i,1);
        $i++;
        }
        return $result;
    }
    
    public function make_time($hour="",$minute="",$second="",$Dmonth="",$Dday="",$Dyear="")
    {
        if(!$hour && !$minute && !$second && !$Dmonth && !$Dmonth && !$Dday && !$Dyear)
            return mktime();
        if ($Dmonth > 11) die("Incorrect month number");
        list( $year, $month, $day ) = $this->mds_to_gregorian($Dyear, $Dmonth, $Dday);
        $i=mktime($hour,$minute,$second,$month,$day,$year);
        return $i;
    }
    
    public function mstart($month,$day,$year)
    {
        list( $Dyear, $Dmonth, $Dday ) = $this->gregorian_to_mds($year, $month, $day);
        list( $year, $month, $day ) = $this->mds_to_gregorian($Dyear, $Dmonth, "1");
        $timestamp=mktime(0,0,0,$month,$day,$year);
        return date("w",$timestamp);
    }
    
    public function lastday ($month,$day,$year)
    {
        $Dday2="";
        $jdate2 ="";
        $lastdayen=date("d",mktime(0,0,0,$month+1,0,$year));
        list( $Dyear, $Dmonth, $Dday ) = $this->gregorian_to_mds($year, $month, $day);
        $lastdatep=$Dday;
        $Dday=$Dday2;
        while($Dday2!="1")
        {
            if($day<$lastdayen)
            {
                $day++;
                list( $Dyear, $Dmonth, $Dday2 ) = $this->gregorian_to_mds($year, $month, $day);
                if($jdate2=="1") break;
                if($jdate2!="1") $lastdatep++;
            }
            else
            {
                $day=0;
                $month++;
                if($month==13)
                {
                        $month="1";
                        $year++;
                }
            }
    
        }
        return $lastdatep-1;
    }
    
    public function days_of_year($Dmonth, $Dday, $Dyear)
    {
        $year="";
        $month="";
        $year="";
        $result="";
        if($Dmonth=="01")
            return $Dday;
        for ($i=1;$i<$Dmonth || $i==12;$i++)
        {
            list( $year, $month, $day ) = $this->mds_to_gregorian($Dyear, $i, "1");
            $result+=$this->lastday($month,$day,$year);
        }
        return $result+$Dday;
    }
    
    public function monthname($month)
    {
    
        if($month=="01") return "&#1601;&#1585;&#1608;&#1585;&#1583;&#1610;&#1606;";
    
        if($month=="02") return "&#1575;&#1585;&#1583;&#1610;&#1576;&#1607;&#1588;&#1578;";
    
        if($month=="03") return "&#1582;&#1585;&#1583;&#1575;&#1583;";
    
        if($month=="04") return  "&#1578;&#1610;&#1585;";
    
        if($month=="05") return "&#1605;&#1585;&#1583;&#1575;&#1583;";
    
        if($month=="06") return "&#1588;&#1607;&#1585;&#1610;&#1608;&#1585;";
    
        if($month=="07") return "&#1605;&#1607;&#1585;";
    
        if($month=="08") return "&#1570;&#1576;&#1575;&#1606;";
    
        if($month=="09") return "&#1570;&#1584;&#1585;";
    
        if($month=="10") return "&#1583;&#1610;";
    
        if($month=="11") return "&#1576;&#1607;&#1605;&#1606;";
    
        if($month=="12") return "&#1575;&#1587;&#1601;&#1606;&#1583;";
    }
    
    public function short_monthname($month)
    {
    
        if($month=="01") return "&#1601;&#1585;&#1608;";
    
        if($month=="02") return "&#1575;&#1585;&#1583;";
    
        if($month=="03") return "&#1582;&#1585;&#1583;";
    
        if($month=="04") return  "&#1578;&#1610;&#1585;";
    
        if($month=="05") return "&#1605;&#1585;&#1583;";
    
        if($month=="06") return "&#1588;&#1607;&#1585;";
    
        if($month=="07") return "&#1605;&#1607;&#1585;";
    
        if($month=="08") return "&#1570;&#1576;&#1575;";
    
        if($month=="09") return "&#1570;&#1584;&#1585;";
    
        if($month=="10") return "&#1583;&#1610;";
    
        if($month=="11") return "&#1576;&#1607;&#1605;";
    
        if($month=="12") return "&#1575;&#1587;&#1601; ";
    }
    
    public function Convertnumber2farsi($srting)
    {
        $num0="&#1776;";
        $num1="&#1777;";
        $num2="&#1778;";
        $num3="&#1779;";
        $num4="&#1780;";
        $num5="&#1781;";
        $num6="&#1782;";
        $num7="&#1783;";
        $num8="&#1784;";
        $num9="&#1785;";
    
        $stringtemp="";
        $len=strlen($srting);
        for($sub=0;$sub<$len;$sub++)
        {
             if(substr($srting,$sub,1)=="0")$stringtemp.=$num0;
             elseif(substr($srting,$sub,1)=="1")$stringtemp.=$num1;
             elseif(substr($srting,$sub,1)=="2")$stringtemp.=$num2;
             elseif(substr($srting,$sub,1)=="3")$stringtemp.=$num3;
             elseif(substr($srting,$sub,1)=="4")$stringtemp.=$num4;
             elseif(substr($srting,$sub,1)=="5")$stringtemp.=$num5;
             elseif(substr($srting,$sub,1)=="6")$stringtemp.=$num6;
             elseif(substr($srting,$sub,1)=="7")$stringtemp.=$num7;
             elseif(substr($srting,$sub,1)=="8")$stringtemp.=$num8;
             elseif(substr($srting,$sub,1)=="9")$stringtemp.=$num9;
             else $stringtemp.=substr($srting,$sub,1);
        }
    return   $stringtemp;
    
    }
    
    public function is_kabise($year)
    {
        if($year%4==0 && $year%100!=0)
            return true;
        return false;
    }
    
    public function mcheckdate($month,$day,$year)
    {
        $m_days_in_month = array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);
        if($month<=12 && $month>0)
        {
            if($m_days_in_month[$month-1]>=$day && 	$day>0)
                return 1;
            if($this->is_kabise($year))
                echo "Asdsd";
            if($this->is_kabise($year) && $m_days_in_month[$month-1]==31)
                return 1;
        }
    
        return 0;
    
    }
    
    public function mtime()
    {
        return mktime()	;
    }
    
    public function mgetdate($timestamp="")
    {
        if($timestamp=="")
            $timestamp=mktime();
    
        return array(
            0=>$timestamp,
            "seconds"=>$this->shamsi_date("s",$timestamp),
            "minutes"=>$this->shamsi_date("i",$timestamp),
            "hours"=>$this->shamsi_date("G",$timestamp),
            "mday"=>$this->shamsi_date("j",$timestamp),
            "wday"=>$this->shamsi_date("w",$timestamp),
            "mon"=>$this->shamsi_date("n",$timestamp),
            "year"=>$this->shamsi_date("Y",$timestamp),
            "yday"=>$this->days_of_year($this->shamsi_date("m",$timestamp),$this->shamsi_date("d",$timestamp),$this->shamsi_date("Y",$timestamp)),
            "weekday"=>$this->shamsi_date("l",$timestamp),
            "month"=>$this->shamsi_date("F",$timestamp),
        );
    }
    
    public function div($a,$b) 
    {
        return (int) ($a / $b);
    }
    
    public function gregorian_to_mds ($g_y, $g_m, $g_d)
    {
        $g_days_in_month = array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        $m_days_in_month = array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);
        $gy = $g_y-1600;
        $gm = $g_m-1;
        $gd = $g_d-1;
    
       $g_day_no = 365*$gy+$this->div($gy+3,4)-$this->div($gy+99,100)+$this->div($gy+399,400);
    
       for ($i=0; $i < $gm; ++$i)
          $g_day_no += $g_days_in_month[$i];
       if ($gm>1 && (($gy%4==0 && $gy%100!=0) || ($gy%400==0)))
          $g_day_no++;
       $g_day_no += $gd;
    
       $m_day_no = $g_day_no-79;
    
       $j_np = $this->div($m_day_no, 12053);
       $m_day_no = $m_day_no % 12053;
    
       $jy = 979+33*$j_np+4*$this->div($m_day_no,1461); 
    
       $m_day_no %= 1461;
    
       if ($m_day_no >= 366) {
          $jy += $this->div($m_day_no-1, 365);
          $m_day_no = ($m_day_no-1)%365;
       }
    
       for ($i = 0; $i < 11 && $m_day_no >= $m_days_in_month[$i]; ++$i)
          $m_day_no -= $m_days_in_month[$i];
       $jm = $i+1;
       $jd = $m_day_no+1;
    
       return array($jy, $jm, $jd);
    }
    
    public function mds_to_gregorian($m_y, $j_m, $m_d)
    {
        $g_days_in_month = array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        $m_days_in_month = array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);
    
    
    
       $jy = $m_y-979;
       $jm = $j_m-1;
       $jd = $m_d-1;
    
       $m_day_no = 365*$jy + $this->div($jy, 33)*8 + $this->div($jy%33+3, 4);
       for ($i=0; $i < $jm; ++$i)
          $m_day_no += $m_days_in_month[$i];
    
       $m_day_no += $jd;
    
       $g_day_no = $m_day_no+79;
    
       $gy = 1600 + 400*$this->div($g_day_no, 146097); 
       $g_day_no = $g_day_no % 146097;
    
       $leap = true;
       if ($g_day_no >= 36525) 
       {
          $g_day_no--;
          $gy += 100*$this->div($g_day_no,  36524); 
          $g_day_no = $g_day_no % 36524;
    
          if ($g_day_no >= 365)
             $g_day_no++;
          else
             $leap = false;
       }
    
       $gy += 4*$this->div($g_day_no, 1461);
       $g_day_no %= 1461;
    
       if ($g_day_no >= 366) {
          $leap = false;
    
          $g_day_no--;
          $gy += $this->div($g_day_no, 365);
          $g_day_no = $g_day_no % 365;
       }
    
       for ($i = 0; $g_day_no >= $g_days_in_month[$i] + ($i == 1 && $leap); $i++)
          $g_day_no -= $g_days_in_month[$i] + ($i == 1 && $leap);
       $gm = $i+1;
       $gd = $g_day_no+1;
    
       return array($gy, $gm, $gd);
    }


}
