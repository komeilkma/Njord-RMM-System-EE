<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class Pages extends Controller
{
    public function Dashboard()
    {
        return view('Dashboard');
    }

    public function DMG()
    {
        return view('DMG');
    }
}
