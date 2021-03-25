<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;

class VentasController extends Controller
{
    public function indexpedido(){   
        if (Session::has('id')){
            return view('Home.pedido');
        }else{
            return view('Login.login');
        }
    }
    public function indexventas(){   
        if (Session::has('id')){
            return view('Home.ventas');
        }else{
            return view('Login.login');
        }
    }
}
