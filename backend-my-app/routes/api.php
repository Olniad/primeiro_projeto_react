<?php

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\FioController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// rota para upload de imagem e cadastro de fio
Route::post('upload', function(Request $request){
   // validando dadops
   $validator = Validator::make($request->all(), [
       'image' => 'required|image|mimes:jpeg,png,jpg',
       'titulo' => 'required|string',
       'comentario' => 'required|string',
       'senha' => 'required|string|max:10',
   ]);


   // verificacao para lidar com erros da validacao
   if ($validator->fails()) {
       return response()->json(['error' => $validator->errors()], 422);
   }


   $titulo = $request->input('titulo');
   $comentario = $request->input('comentario');
   $senha = $request->input('senha');
   $image = $request->file('image');


   // salvando imagem
   $imageName = $image->store('fios');
   $path = Storage::path($imageName);


   $newImg = Image::make($path)->resize(400, 400, function($constraint){
       $constraint->aspectRatio();
       $constraint->upsize();
   });


   // salvando os dados
   $fio = new Fio();
   $fio->titulo = $titulo;
   $fio->comentario = $comentario;
   $fio->imagem = $imageName;
   $fio->senha = $senha;
   $fio->save();


   return ['status' => 'ok'];
});
//rota para cadastrar fios
Route::post('/cadastrar-fio', [FioController::class, 'cadastrarFio']);


// rota para listar fios
Route::get('/list', [FioController::class, 'listarFios'])->name('fio.listarFios');
