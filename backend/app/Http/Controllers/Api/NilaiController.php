<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Nilai;

class NilaiController extends Controller
{
    // Menampilkan semua data nilai
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Nilai::all()
        ]);
    }

    // Menambahkan data nilai
    public function store(Request $request)
    {
        $request->validate([
            'mahasiswa_id' => 'required|exists:mahasiswa,id',
            'matakuliah_id' => 'required|exists:mata_kuliah,matakuliah_id',
            'semester' => 'required|string',
            'nilai' => 'required|integer',
        ]);

        $nilai = Nilai::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Nilai berhasil ditambahkan',
            'data' => $nilai
        ], 201);
    }

    // Menampilkan detail nilai
    public function show(string $id)
    {
        $nilai = Nilai::find($id);

        if (!$nilai) {
            return response()->json([
                'success' => false,
                'message' => 'Data nilai tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $nilai
        ]);
    }

    // Mengubah data nilai
    public function update(Request $request, string $id)
    {
        $nilai = Nilai::find($id);

        if (!$nilai) {
            return response()->json([
                'success' => false,
                'message' => 'Data nilai tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'mahasiswa_id' => 'sometimes|required|exists:mahasiswa,id',
            'matakuliah_id' => 'sometimes|required|exists:mata_kuliah,matakuliah_id',
            'semester' => 'sometimes|required|string',
            'nilai' => 'sometimes|required|integer',
        ]);

        $nilai->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Nilai berhasil diubah',
            'data' => $nilai
        ]);
    }

    // Menghapus data nilai
    public function destroy(string $id)
    {
        $nilai = Nilai::find($id);

        if (!$nilai) {
            return response()->json([
                'success' => false,
                'message' => 'Data nilai tidak ditemukan'
            ], 404);
        }

        $nilai->delete();

        return response()->json([
            'success' => true,
            'message' => 'Nilai berhasil dihapus'
        ]);
    }
}
