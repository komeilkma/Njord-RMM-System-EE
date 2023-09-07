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

    public function Get_Gateway_Data($id)
    {

        $db = \Config\Database::connect();
        $db->connect();
        $query = $db->table('customgateways')->where('serial', $id)->get();
        $gw_data = $query->getRow();
        if ($query->getNumRows() === 1) {
        $gateway_data = [
            'id'       => $gw_data->id,
            'status_data'       => $this->BasicFunctions->Convert_Status_Data($gw_data->status_data),
            'motor_data'       => $this->BasicFunctions->Convert_Motor_Data($gw_data->motor_data),
            'shamsi_date'        => $this->BasicFunctions->shamsi_date('Y-m-d , H:i',time(), 0),
            'serial'       => $gw_data->serial,
            'imsi'        => $gw_data->imsi,
            'imei'        => $gw_data->imei,
            'softversion'        => $gw_data->softversion,
            'configstat'        => $gw_data->configstat,
            'last_connection'        => $gw_data->shamsi_date,
            'location'        => $gw_data->location,
        ];


        return $this->respond($gateway_data);
    }else {

        return $this->failNotFound("gateway was not found");

    }
    }

    public function Authenticate_User()
    {
        $data = $this->request->getJSON();

    
        $db = \Config\Database::connect();
        $db->connect();
        $query = $db->table('users')->where('Username', $data->username)->get();
        if ($query->getNumRows() === 1) {
            $user = $query->getRow();
            $hashedPassword = $user->PasswordHash;

            if (password_verify($data->password, $hashedPassword)) {
                $key = getenv('api.jwt.secret');
                $payload = [
                    'time' => time(),
                    'username' => $data->username,
                    'exp' => time() + 864000,
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
            $querycheck = $db->table('users')->where('Username', $data->username)->orWhere('email', $data->email)->get();
            if ($querycheck->getNumRows() > 0) {
                return $this->failResourceExists("User Exist");
            }else {

            if ($this->BasicFunctions->checkNotEmpty($data,false)) {
                $query = $db->table('users');
                $register_data = [
                    'Username'       => $data->username,
                    'PasswordHash'        => password_hash($data->password,PASSWORD_DEFAULT),
                    'Email'        => $data->email,
                    'UserRole'        => "user",
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

   public function Insert_Gateway_Data() {
        $data = $this->request->getJSON();
        $db = \Config\Database::connect();
        $db->connect();

        $querycheck = $db->table('customgateways')->where('serial', $data->serial)->get();
        if ($this->BasicFunctions->checkNotEmpty($data,true)) {
        if ($querycheck->getNumRows() === 1) {
            $old_status_data = $querycheck->getRow()->status_data;
            $query = $db->table('customgateways')->where('serial', $data->serial);
            $gateway_data = [
                'status_data'       => $data->status_data,
                'motor_data'       => $data->motor_data,
                'serial'       => $data->serial,
                'imsi'        => $data->imsi,
                'imei'        => $data->imei,
                'softversion'        => $data->softversion,
                'configstat'        => $data->configstat,
                'shamsi_date'        => $this->BasicFunctions->shamsi_date('Y-m-d , H:i',time(), 0),
            ];
            if ( $old_status_data != $data->status_data) {
                $alertquery = $db->table('customalerts');
                $alert_gateway_data = [
                    'status_data'       => $data->status_data,
                    'motor_data'       => $data->motor_data,
                    'serial'       => $data->serial,
                    'shamsi_date'        => $this->BasicFunctions->shamsi_date('Y-m-d , H:i',time(), 0),
                ];
                $alertquery->insert($alert_gateway_data);
            }
            $query->update($gateway_data); 
            return $this->respond(['serial' => $data->serial, 'status' => "gateway data updated"]);
        }else {
            $query = $db->table('customgateways');
            $gateway_data = [
                'status_data'       => $data->status_data,
                'motor_data'       => $data->motor_data,
                'serial'       => $data->serial,
                'imsi'        => $data->imsi,
                'imei'        => $data->imei,
                'softversion'        => $data->softversion,
                'configstat'        => $data->configstat,
                'shamsi_date'        => $this->BasicFunctions->shamsi_date('Y-m-d , H:i',time(), 0),
                'first_connection'        => $this->BasicFunctions->shamsi_date('Y-m-d , H:i',time(), 0),
            ];
            $query->insert($gateway_data); 
            return $this->respond(['serial' => $data->serial, 'status' => "new gateway inserted"]);
        }
    }else {

        return $this->failValidationError("incomplete data");
    }
    }


    public function Get_Gateway_Alerts() {

        $data = $this->request->getJSON();
        $db = \Config\Database::connect();
        $db->connect();
        if ($data->descending_order){
        $querycheck = $db->table('customalerts')->where('serial', $data->serial)->orderBy('id', 'DESC')->limit(10, (intval($data->page)-1) * 10)->get();
        }else {
        $querycheck = $db->table('customalerts')->where('serial', $data->serial)->limit(10, (intval($data->page)-1) * 10)->get();  
        }
         if ($querycheck->getNumRows() >= 1) {
            $alarms = $querycheck->getResultArray();
            foreach ($alarms as &$object) {
                $status_data = $object['status_data'];
                $result = $this->BasicFunctions->Convert_Status_Data_Alaram($status_data);
                $object['status_data'] = $result;
            }
        return $this->respond(['serial' => $data->serial, 'alaram' => $alarms ]);
        }else {

            return $this->failNotFound("gateway was not found");

        }


    }



    public function Get_Gateways_List() {

        $data = $this->request->getJSON();
        $db = \Config\Database::connect();
        $db->connect();
        if ($data->descending_order){
        $querycheck = $db->table('customgateways')->orderBy('id', 'DESC')->limit(10, (intval($data->page)-1) * 10)->get();
        }else {
        $querycheck = $db->table('customgateways')->limit(10, (intval($data->page)-1) * 10)->get();
        }
         if ($querycheck->getNumRows() >= 1) {
        return $this->respond(['page' => $data->page, 'gateways' => $querycheck->getResultArray() ]);
        }else {

            return $this->failNotFound("There is no gateway");

        }


    }

    public function Get_Alerts_Count() {

        $data = $this->request->getJSON();
        $db = \Config\Database::connect();
        $db->connect();
        $querycheck = $db->table('customalerts')
        ->select("DATE_FORMAT(shamsi_date, '%Y-%m-%d') AS formatted_date, SUM(1) AS count")
        ->where('shamsi_date >=', $data->start_date)
        ->where('shamsi_date <=', $data->end_date)
        ->groupBy('formatted_date, MONTH(shamsi_date), DAY(shamsi_date)')
        ->orderBy('formatted_date, MONTH(shamsi_date), DAY(shamsi_date)')
        ->get();
         $results = $querycheck->getResult();

         return $this->respond(['count' => $results ]);

    }

  

    public function Get_Gateways_Count() {

        $data = $this->request->getJSON();
        $db = \Config\Database::connect();
        $db->connect();
        if ( $data->all_time == "1" ){
            $querycheck = $db->table('customgateways')
            ->select('COUNT(*) AS row_count')
            ->where("STR_TO_DATE(CONCAT(SUBSTRING_INDEX(first_connection, ' , ', 1), ' ', SUBSTRING_INDEX(first_connection, ' , ', -1)), '%Y-%m-%d %H:%i') BETWEEN '{$data->start_date} {$data->start_time}' AND '{$data->end_date} {$data->end_time}'")
            ->get();
             $results = $querycheck->getResult();

        }else {
            $querycheck = $db->table('customgateways')
            ->select("DATE_FORMAT(STR_TO_DATE(CONCAT(SUBSTRING_INDEX(first_connection, ' , ', 1), ' ', SUBSTRING_INDEX(first_connection, ' , ', -1)), '%Y-%m-%d %H:%i'), '%Y-%m') AS month, COUNT(*) AS row_count")
            ->where("STR_TO_DATE(CONCAT(SUBSTRING_INDEX(first_connection, ' , ', 1), ' ', SUBSTRING_INDEX(first_connection, ' , ', -1)), '%Y-%m-%d %H:%i') BETWEEN '{$data->start_date} {$data->start_time}' AND '{$data->end_date} {$data->end_time}'")
            ->groupBy('month')
            ->orderBy('month')
            ->get();
             $results = $querycheck->getResult();
         } 


         return $this->respond(['count' => $results ]);

    }


}
