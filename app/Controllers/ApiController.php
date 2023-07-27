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

    public function Create_User() {
        $data = $this->request->getJSON();
        $invitation_code = getenv('api.invitation.code');
        if ( $data->invitationcode == $invitation_code) {
            $db = \Config\Database::connect();
            $db->connect();
            $querycheck = $db->table('users')->where('username', $data->username)->get();
            if ($querycheck->getNumRows() === 1) {
                return $this->failUnauthorized("Username Exist");
            }else {
            $query = $db->table('users');
            $register_data = [
                'username'       => $data->username,
                'password'        => password_hash($data->password,PASSWORD_DEFAULT),
            ];
            $query->insert($register_data); 
            return $this->respond(['user' => $data->username, 'status' => "Register Complete"]);
        }
        }else {

            return $this->failUnauthorized("for register need invitation code");
        }


    }
    
}
