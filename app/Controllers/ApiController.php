<?php
// API Version : 1.0.0
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;

class ApiController extends ResourceController
{
    public function getData($id)
    {
        $data = [
            'id' => $id,
            'check' => 'test_api',
        ];

        return $this->respond($data);
    }

    public function authenticateUser()
    {
        $data = $this->request->getJSON();

        
        $db = \Config\Database::connect();
        $db->connect();
        $query = $db->table('users')->where('username', $data->username)->get();
        if ($query->getNumRows() === 1) {
            $user = $query->getRow();
            $hashedPassword = $user->password;

            if (password_verify($data->password, $hashedPassword)) {
                $key = getenv('api.jwt.secret');
                $payload = [
                    'time' => time(),
                    'username' => $data->username,
                    'exp' => time() + 3600,
                ];
                $token = JWT::encode($payload, $key, 'HS256');
                return $this->respond(['user' => $data->username, 'token' => $token]);
            }else {

                return $this->failUnauthorized("username or password is incorrect");
            }
        }else {
          
            return $this->failNotFound("profile was not found");

        }

    }
    
}
