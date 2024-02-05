<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Fio; // Adicione esta linha para importar a classe Fio
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}

class FioController extends Controller
{
   public function listarFios()
   {
       $fios = Fio::all();
       foreach ($fios as $key => $fio) {
           $fios[$key]['imagem_url'] = asset($fio['imagem']);
       }
       return $fios;
   }

   public function cadastrarFio(Request $request)
   {
       // validar os dados
       $request->validate([
           'titulo' => 'required|string',
           'comentario' => 'required|string',
           'imagem' => 'required|image|mimes:jpeg,png,jpg',
           'senha' => 'required|string|max:10',
       ]);

       // pegar os dados do form
       $titulo = $request->input('titulo');
       $comentario = $request->input('comentario');
       $senha = $request->input('senha');
       $imagem = $request->file('imagem');

       // Salvar imagem
       $imagemNome = $imagem->store('fios', 'public');

       // Salvar os dados do fio 
       $fio = new Fio();
       $fio->titulo = $titulo;
       $fio->comentario = $comentario;
       $fio->imagem = $imagemNome;
       $fio->senha = $senha;
       $fio->save();

       return response()->json(['status' => 'ok']);  
   }  
}
