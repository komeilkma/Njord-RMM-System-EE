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


}
