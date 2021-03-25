<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;

class ProveedorController extends Controller
{
    public function index(){   
        if (Session::has('id')){
            return view('Home.proveedor');
        }else{
            return view('Login.login');
        }
    }
}
