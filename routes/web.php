<?php

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

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', 'ChatCtrl@chat');

Route::post('send', 'ChatCtrl@send');

Route::post('getOldMessage','ChatCtrl@getOldMessage');
Route::post('saveToSession','ChatCtrl@saveToSession');
Route::post('deleteSession','ChatCtrl@deleteSession');

Route::get('check',function(){
    return session('chat');
});

Route::get('/logout', 'Auth\LoginController@logout');
