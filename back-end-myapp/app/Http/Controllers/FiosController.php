<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fios;
use Illuminate\Support\Facades\Validator;

class FiosController extends Controller
{
    public function index()
    { 
        $fios = Fios::all();

        if ($fios->count() > 0) {
            return response()->json([
                'status' => 200,
                'fios' => $fios
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Não há fios cadastrados'
            ], 404);
        }
    }

    public function cadastrar(Request $request)
    {
        $validacao = Validator::make($request->all(), [
            'titulo' => 'required|string|max:200',
            'comentario' => 'required|string|max:200',
            'imagem' => 'required|file|mimetypes:image/jpeg,image/png,video/mp4,video/quicktime|max:51200',
            'senha' => 'required|string|max:200',
        ]);

        if ($validacao->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validacao->messages()
            ], 422);
        }

        $filename = NULL;
        $path = NULL;

        if ($request->has('imagem')) {
            $file = $request->file('imagem');
            $extension = $file->getClientOriginalExtension();

            $filename = time() . '.' . $extension;
            $path = 'public/uploads/category/';
            $file->move($path, $filename);
        }

        $fio = Fios::create([
            'titulo' => $request->titulo,
            'imagem' => $path . $filename,
            'comentario' => $request->comentario,
            'senha' => $request->senha,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Registro criado com sucesso!',
            'fio' => $fio
        ], 200);
    }

    public function listar($id)
    {
        $fio = Fios::find($id);
        if ($fio) {
            return response()->json([
                'status' => 200,
                'fio' => $fio
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Fio não encontrado."
            ], 404);
        }
    }

    public function atualizar(Request $request, $id)
    {
        $validacao = Validator::make($request->all(), [
            'titulo' => 'required|string|max:200',
            'comentario' => 'required|string|max:200',
            'imagem' => 'required|file|mimetypes:image/jpeg,image/png,video/mp4,video/quicktime|max:51200',
            'senha' => 'required|string|max:200',
        ]);

        if ($validacao->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validacao->messages()
            ], 422);
        }

        $fio = Fios::find($id);
        if ($fio) {
            $filename = $fio->imagem;
            $path = 'uploads/category/';

            if ($request->has('imagem')) {
                $file = $request->file('imagem');
                $extension = $file->getClientOriginalExtension();

                $filename = time() . '.' . $extension;
                $file->move($path, $filename);
            }

            $fio->update([
                'titulo' => $request->titulo,
                'comentario' => $request->comentario,
                'imagem' => $path . $filename,
                'senha' => $request->senha,
            ]);

            return response()->json([
                'status' => 200,
                'message' => "Fio atualizado com sucesso",
                'fio' => $fio
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Fio não encontrado"
            ], 404);
        }
    }

    public function apagar(Request $request, $id)
    {
        $fio = Fios::find($id);
    
        if (!$fio) {
            return response()->json([
                'status' => 404,
                'message' => "Fio não encontrado"
            ], 404);
        }
    
        // Verificando se a senha fornecida é a mesma armaznada no fio
        if ($request->input('senha') !== $fio->senha) {
            return response()->json([
                'status' => 403,
                'message' => "Senha incorreta"
            ], 403);
        }
    
        $fio->delete();
    
        return response()->json([
            'status' => 200,
            'message' => "Fio deletado com sucesso"
        ], 200);
    }
    
}