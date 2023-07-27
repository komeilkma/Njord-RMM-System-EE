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


}
