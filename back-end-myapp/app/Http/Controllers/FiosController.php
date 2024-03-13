<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fios;
use Illuminate\Support\Facades\Validator;

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

    public function cadastrar(Request $request){
        $validacao = Validator::make($request->all(),[
        'titulo' => 'required|string|max:200',
        'comentario' => 'required|string|max:200',
        'imagem' => 'required|file|mimetypes:image/jpeg,image/png,video/mp4,video/quicktime|max:51200',
        'senha' => 'required|string|max:200',
    ]);

    if($validacao->fails()){
        return response()->json([
            'status' => 422,
            'errors' => $validacao->messages()
        ],422);
    }

    
    $fios = new Fios;
    $fios->titulo = $request->titulo;
    $fios->imagem = $request->imagem;
    $fios->comentario = $request->comentario;
    $fios->senha = $request->senha;
    /*$fios = Fios::cadastrar([
        'titulo' => $request->titulo,
        'comentario' => $request->comentario,
        'imagem' => $request->imagem,
        'senha' => $request->senha,
        ]);*/

        $fios->save();

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
    

    public function listar($id){
        $fios = Fios::find($id);
        if($fios){
            return response()->json ([
                'status' => 200,
                'fios' => $fios
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => "Fios nao encontrados."
            ],404);
        }
    }

    public function editar($id){
        $fios = Fios::find($id);
        if($fios){
            return response()->json ([
                'status' => 200,
                'fios' => $fios
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => "Fios nao encontrados."
            ],404);
        }
    }

    public function atualizar(Request $request, int $id){
        $validacao = Validator::make($request->all(),[
            'titulo' => 'required|string|max:200',
            'comentario' => 'required|string|max:200',
            'imagem' => 'required|file|mimetypes:image/jpeg,image/png,video/mp4,video/quicktime|max:51200',
            'senha' => 'required|string|max:200',
        ]);
    
        if($validacao->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validacao->messages()
            ],422);
        }else{
        $fios = Fios::find($id);   
            if($fios){
                $fios ->update([
                    'titulo' => $request->titulo,
                    'comentario' => $request->comentario,
                    'imagem' => $request->imagem,
                    'senha' => $request->senha,
                    ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Fio atualizado com sucesso"
                ],200);
            }else{
                return response()->json([
                    'status' => 500,
                    'message' => "Fio nao encontrado"
                ],500);           
            }
            }
    }
    public function apagar($id)
    {
        $student = Fios::find($id);
        if($fios){
            $fios->apagar();
            return response()->json([
                'status' => 200,
                'message' => "Fio deletado"
            ],404);
        }else{
            return response()->json([
                'status' => 404,
                'message' => "Fio nao encontrado"
            ],404);
        }
    }
}

