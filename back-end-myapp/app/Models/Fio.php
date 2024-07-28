<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fio extends Model
{
    use HasFactory;

    protected $table = 'fios';

    protected $fillable  = [
        'titulo',
        'comentario',
        'imagem',
        'senha',
        //'foto',
    ];
}
