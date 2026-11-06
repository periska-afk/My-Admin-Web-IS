<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    protected $table = 'nilai';
    protected $primaryKey = 'nilai_id';

    protected $fillable = [
        'mahasiswa_id',
        'matakuliah_id',
        'semester',
        'nilai',
    ];
}