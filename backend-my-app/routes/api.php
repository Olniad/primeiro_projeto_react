<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use App\Fio;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('upload', function(Request $request){
    //validando imagem
    $validator = $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg',
        'titulo' => 'required|string',
        'comentario' => 'required|string',
        'senha' => 'required|string|max:10',
    ]);

    //verifacação para lidar com os erros de validação.
    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 422);
    }

    $titulo = $request->get('titulo');
    $comentario = $request->get('comentario');
    $senha = $request->get('senha');
    $image = $request->file('image');

    //salvando imagem
    $imageName = $image->store('photos');
    $path = Storage::path($imageName);

    $newImg = Image::make($path)->resize(400, 400, function($c){
        $c->aspectRatio();
        $c->upsize();
    })->save();

    //salvando os dados na table
    $fio = new Fio();
    $fio->titulo = $titulo;
    $fio->comentario = $comentario;
    $fio->imagem = $imageName;
    $fio->senha = $senha;
    $fio->save();

    return ['status' => 'ok'];
});

Route::get('list', function(Request $request){
    $fios = Fio::all();
    foreach($fios as $key => $fio){
        $fios[$key]['imagem_url'] = asset($fio['imagem']);
    }
    return $fios;
});