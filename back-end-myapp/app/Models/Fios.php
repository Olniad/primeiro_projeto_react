<?php
// app/Models/Fios.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fios extends Model
{
    protected $fillable = ['titulo', 'comentario', 'imagem', 'senha'];
}
?>