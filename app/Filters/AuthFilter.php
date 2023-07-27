<?php
  
namespace App\Filters;
  
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthFilter implements FilterInterface
{

    public function before(RequestInterface $request, $arguments = null)
    {
        $key = getenv('api.jwt.secret');
        $header = $request->getHeader("Authorization");
        $token = null;
  
        if(!empty($header)) {
            if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                $token = $matches[1];
            }
        }
  
        if(is_null($token) || empty($token)) {
            return $this->unauthorizedResponse('You need a token');
        }
  
        try {
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
        } catch (\Exception $e) {
           return $this->unauthorizedResponse('Invalid token');
        }
    }
  
    protected function unauthorizedResponse($message = 'Unauthorized')
    {
        return service('response')->setStatusCode(401)->setJSON(['status' => 401,'error' => 401,'messages' => ['error' => $message]]);
    }
  
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //after
    }
}