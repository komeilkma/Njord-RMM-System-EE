<?php

use Dotenv\Dotenv;

class Dotenv
{
    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(APPPATH);
        $dotenv->load();
    }
}
