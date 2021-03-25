<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/',"LoginController@index");

Route::post('/login', 'LoginController@login');
Route::get('/logout', 'LoginController@logout');

// Clientes route
Route::get('/clientes', 'ClienteController@index');
Route::get('/clientes/getclientes', 'ClienteController@getclientes');
Route::post('/clientes/getclienteId', 'ClienteController@getclienteId');
Route::post('/clientes/buscarCliente', 'ClienteController@buscarCliente');
Route::post('/clientes/regCliente', 'ClienteController@regCliente');
Route::post('/clientes/removeCliente', 'ClienteController@removeCliente');

// Productos route
Route::get('/productos', 'ProductosController@index');
Route::get('/productos/getproductos', 'ProductosController@getproductos');
Route::post('/productos/getproductoId', 'ProductosController@getproductoId');
Route::post('/productos/buscarProducto', 'ProductosController@buscarProducto');
Route::post('/productos/regProducto', 'ProductosController@regProducto');
Route::post('/productos/removeProducto', 'ProductosController@removeProducto');