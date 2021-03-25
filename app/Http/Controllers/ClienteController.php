<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use DB;
class ClienteController extends Controller
{
    public function index(){   
        if (Session::has('id')){
            return view('Home.cliente');
        }else{
            return view('Login.login');
        }
    }

    public function getclientes(){
        $cliente = DB::table('view_clientes')->orderBy('id')->get();
        if ($cliente) {
            return response()->json($cliente);
        } else {
            return response()->json(['RES' => false]);
        }
    }

    public function getclienteId(Request $r){
        $cliente = DB::table('view_clientes')->where('id',$r->id)->get();
        if ($cliente) {
            return response()->json($cliente);
        } else {
            return response()->json(['RES' => false]);
        }
    }

    public function buscarCliente(Request $r){
        $cliente = DB::table('view_clientes')
        ->whereRaw("LOWER(nombre) LIKE ? ",['%'.strtolower($r["query"]).'%'])
        ->orWhereRaw("LOWER(apellido) LIKE ? ",['%'.strtolower($r["query"]).'%'])
        ->orWhere("documento","like",['%'.strtolower($r["query"]).'%'])
        // ->where('nombre',$r->query)
        // ->where('apellido',$r->query)
        ->orderBy('id')->get();
        if ($cliente) {
            return response()->json(['RES' => $cliente]);
        } else {
            return response()->json(['RES' => false]);
        }
    }

    public function regCliente(Request $r){
        // return $r;

        if ($r->id) {
            $dato = DB::table('tbl_cliente')
              ->where('id', $r->id)
              ->update(['tipo_doc' => $r->tipoDoc,
              'documento' => $r->documento,
              'nombre' => $r->nombre,
              'apellido' => $r->apellido,
              'direccion' => $r->direccion,
              'telefono' => $r->telefono,
              'correo' => $r->correo]);
        } else {
            $dato = DB::table('tbl_cliente')->insertGetId(
                ['tipo_doc' => $r->tipoDoc,
                'documento' => $r->documento,
                'nombre' => $r->nombre,
                'apellido' => $r->apellido,
                'direccion' => $r->direccion,
                'telefono' => $r->telefono,
                'correo' => $r->correo]
            );
        }


        if ($dato != '[]') {
            return response()->json(["RES" => $dato]);
        } else {
            return response()->json(["RES" => false]);
        }


    }

    public function removeCliente(Request $r){
        // return json_encode($r->id);
        $cliente = DB::table('tbl_cliente')->where('id', $r->id)->delete();
        return response()->json(['RES'=>$cliente]);
    }
}
