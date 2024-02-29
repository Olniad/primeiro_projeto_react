<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fios;

class FiosController extends Controller
{
    public function index(){ 
        $fios = Fios::all();  
        if($fios->count() > 0){
            return response()->json([
                'status' => 200,
                'fios' =>$fios
                ],200);
        }else{
            return response()->json([
                'status' => 404,
                'fios' =>'Nao ha fio cadastrado'
                ],404);
        }   
    }

    public function cadastro(Request $request){
        $validacao = Validacaco::make($request->all(),[
        'titulo' => 'required|string|max:200',
        'comentario' => 'required|string|max200',
        'imagem' => 'required|file|mimetypes:image/jpeg,image/png,video/mp4,video/quicktime|max:51200',
        'senha' => 'required|string|max200',
    ]);

    if($validacao->fails()){
        return response()->json([
            'status' => 422,
            'errors' => $validacao->messages()
        ],422);
    }else{
    $fios = Fios::cadastrar([
        'titulo' => $request->titulo,
        'comentario' => $request->comentario,
        'imagem' => $request->imagem,
        'senha' => $request->senha,
        ]);

        if($fios){
            return response()->json([
                'status' => 200,
                'message' => "Fio cadastrado com sucesso"
            ],200);
        }else{
            return response()->json([
                'status' => 500,
                'message' => "algo deu errado"
            ],500);           
        }
        }
    }

/*    public function cadastrar(Request $request)
    {
        $fios = new Fios();
        $fios->titulo = $request->input('titulo');
        $fios->comentario = $request->input('comentario');
        $fios->imagem = $request->input('imagem');
        $fios->senha = $request->input('senha');
        $fios->save();

        return response()->json(['message' => 'Fio postado com sucesso!'], 201);
    }
    */
}

