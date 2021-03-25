<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;

use Hash;

use Session;

use Redirect;

class LoginController extends Controller
{
    public function index(){   
        if (Session::has('id')){
            return view('Home.home');
        }else{
            return view('Login.login');
        }
    }  
    public function login(Request $r)
    {
        //$ps = md5($r->password);
        // return $r;
        $user = DB::table("tbl_users")->where("usuario", "=", "$r->name")->get();
        // return $user;
        if ($user) {
            if ($user != '[]') {
                if (Hash::check($r->pass, $user[0]->password)) {
                    Session::put('id', $user[0]->id_users);
                    Session::put('username', $user[0]->usuario);
                    Session::put('name', $user[0]->nombre);
                    // Session::put('lastname', $user[0]->lastname);
                    Session::put('tipo', $user[0]->tipo);
                    Session::put('tiponom', $user[0]->tiponom);
                    Session::put('cell', $user[0]->celular);
                    Session::put('photo', $user[0]->photo);
                    Session::put('correo', $user[0]->correo);
                    Session::put('estado', $user[0]->estado);
                    Session::put('cedula', $user[0]->cedula);
                    return response()->json(["RES" => 1]);
                } else {
                    return response()->json(["RES" => 2]);
                }
            } else {
                return response()->json(["RES" => 3]);
            }
        } else {
            return response()->json(["RES" => false]);
        }
    }

    public function logout()
    {
        Session::flush();
        return Redirect::to('/');
    }
}
