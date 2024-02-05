<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
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
    $validator - $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg',
        'legend' => 'required|string'
    ]);

    $legend = $request->get('legend');
    $image = $request->file('image');

    $imageName = $image->store('fios');
    $path = Storage::path($imageName);

    $newImg = Image::make($path)->resize(400, 400, function($c){
        $c->aspectRatio();
        $c->upsize();
    })->save();

    $fio = new App\Fio();
    $fio->url = $imageName;
    $fio->legend = $legend;
    $fio->save();
    return[
        'status' => 'ok'
    ];
});

Route::get('list', function(Request $request){
    $fios = App\Fio::all();
    foreach($fios as $key => $fio){
        $fios[$key]['url'] = asset($fio['url']);
    }
    return $fios;
});