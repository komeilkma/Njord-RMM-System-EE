<?php
// API Version : 1.0.0
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;
use App\Controllers\BasicFunctions;

class ApiController extends ResourceController
{
    protected $BasicFunctions;

    public function __construct()
    {
        $this->BasicFunctions = new BasicFunctions();
    }

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
                return $this->failResourceExists("Username Exist");
            }else {
            
            if ($this->BasicFunctions->checkNotEmpty($data,false)) {
                $query = $db->table('users');
                $register_data = [
                    'username'       => $data->username,
                    'password'        => password_hash($data->password,PASSWORD_DEFAULT),
                    'email'        => $data->email,
                ];
                $query->insert($register_data); 
                return $this->respond(['user' => $data->username, 'status' => "Register Complete"]);
               
            }else {
                return $this->failValidationError("incomplete data");
            }
        }
        }else {

            return $this->failUnauthorized("for register need invitation code");
        }


    }

   public function insert_gateway_data() {
        $data = $this->request->getJSON();
        $db = \Config\Database::connect();
        $db->connect();

        $querycheck = $db->table('gateways')->where('serial', $data->serial)->get();
        if ($this->BasicFunctions->checkNotEmpty($data,true)) {
        if ($querycheck->getNumRows() === 1) {
            $query = $db->table('gateways')->where('serial', $data->serial);
            $gateway_data = [
                'status_data'       => $data->status_data,
                'motor_data'       => $data->motor_data,
                'serial'       => $data->serial,
                'imsi'        => $data->imsi,
                'imei'        => $data->imei,
                'softversion'        => $data->softversion,
                'configstat'        => $data->configstat,
            ];
            $query->update($gateway_data); 
            return $this->respond(['serial' => $data->serial, 'status' => "gateway data updated"]);
        }else {
            $query = $db->table('gateways');
            $gateway_data = [
                'status_data'       => $data->status_data,
                'motor_data'       => $data->motor_data,
                'serial'       => $data->serial,
                'imsi'        => $data->imsi,
                'imei'        => $data->imei,
                'softversion'        => $data->softversion,
                'configstat'        => $data->configstat,
            ];
            $query->insert($gateway_data); 
            return $this->respond(['serial' => $data->serial, 'status' => "new gateway inserted"]);
        }
    }else {

        return $this->failValidationError("incomplete data");
    }
    }

  
}
