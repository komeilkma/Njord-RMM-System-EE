<?php

namespace App\Controllers;

class DatabeseController extends BaseController
{
    public function getIndex()
    {

        $dbConfig = [
            'hostname' => $_ENV['database.default.hostname'],
            'username' => $_ENV['database.default.username'],
            'password' => $_ENV['database.default.password'],
            'database' => $_ENV['database.default.database'],
            'DBDriver' => $_ENV['database.default.DBDriver'],

        ];

        $db = \Config\Database::connect($dbConfig);
        if ($db->connect(false)) {
            return "Database connection successful!";
        } else {
            return "Database connection failed!";
        }
    }
}
