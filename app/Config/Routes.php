<?php
use App\Controllers\ApiController;
namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);
$routes->setAutoRoute(true);
/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Login::index');
$routes->get('/Dashboard', 'Pages::dashboard');
$routes->get('/Dashboard/DMG', 'Pages::DMG');
$routes->get('/', 'ApiController::index');

//temporary test
$routes->get('api/v1/custom/gatewaydata/(:segment)', 'ApiController::Get_Gateway_Data/$1' ,['filter' => 'auth']);
$routes->post('api/v1/custom/authenticate', 'ApiController::Authenticate_User');
$routes->post('api/v1/custom/creatuser', 'ApiController::Create_User',['filter' => 'auth']);
$routes->post('api/v1/custom/insertgateway', 'ApiController::Insert_Gateway_Data' ,['filter' => 'auth']);
$routes->post('api/v1/custom/gatewayalerts', 'ApiController::Get_Gateway_Alerts' ,['filter' => 'auth']);
$routes->post('api/v1/custom/gatewayslist', 'ApiController::Get_Gateways_List' ,['filter' => 'auth']);
$routes->post('api/v1/custom/gatewayalertcount', 'ApiController::Get_Alerts_Count' ,['filter' => 'auth']);
$routes->post('api/v1/custom/gatewaycount', 'ApiController::Get_Gateways_Count' ,['filter' => 'auth']);
$routes->get('api/v1/general/(:num)', 'GeneralApiController::getData/$1' ,['filter' => 'auth']);

/*,
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
