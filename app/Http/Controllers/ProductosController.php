<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use DB;
class ProductosController extends Controller
{
    public function index(){   
        if (Session::has('id')){
            return view('Home.producto');
        }else{
            return view('Login.login');
        }
    }

    public function getproductos(){
        $producto = DB::table('tbl_producto')->orderBy('id')->get();
        if ($producto) {
            return response()->json($producto);
        } else {
            return response()->json(['RES' => false]);
        }
    }

    public function getproductoId(Request $r){
        $producto = DB::table('tbl_producto')->where('id',$r->id)->get();
        if ($producto) {
            return response()->json($producto);
        } else {
            return response()->json(['RES' => false]);
        }
    }

    public function buscarProducto(Request $r){
        $producto = DB::table('tbl_producto')
        ->whereRaw("LOWER(descripcion) LIKE ? ",['%'.strtolower($r["query"]).'%'])
        ->orWhere("codigo","like",['%'.strtolower($r["query"]).'%'])
        // ->where('nombre',$r->query)
        // ->where('apellido',$r->query)
        ->orderBy('id')->get();
        if ($producto) {
            return response()->json(['RES' => $producto]);
        } else {
            return response()->json(['RES' => false]);
        }
    }

    public function regProducto(Request $r){
        // return $r;

        if ($r->id) {
            $dato = DB::table('tbl_producto')
              ->where('id', $r->id)
              ->update(
                  ['descripcion' => $r->descripcion,
                    'codigo' => $r->codigo,
                    'stock' => $r->stock,
                    'costo' => $r->costo,
                    'precio' => $r->precio
                    ]);
        } else {
            $dato = DB::table('tbl_producto')->insertGetId(
                ['descripcion' => $r->descripcion,
                'codigo' => $r->codigo,
                'stock' => $r->stock,
                'costo' => $r->costo,
                'precio' => $r->precio]
            );
        }


        if ($dato != '[]') {
            return response()->json(["RES" => $dato]);
        } else {
            return response()->json(["RES" => false]);
        }


    }

    public function removeProducto(Request $r){
        // return json_encode($r->id);
        $producto = DB::table('tbl_producto')->where('id', $r->id)->delete();
        return response()->json(['RES'=>$producto]);
    }
}
