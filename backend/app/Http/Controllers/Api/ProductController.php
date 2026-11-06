<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    

public function index(Request $request)
{
    $query = Product::with('category');

    // Search berdasarkan nama produk
    if ($request->filled('keyword')) {
        $query->where('name', 'like', '%' . $request->keyword . '%');
    }

    // Filter berdasarkan kategori
    if ($request->filled('category_id')) {
        $query->where('category_id', $request->category_id);
    }

    // Filter berdasarkan stok
    if ($request->input('stock_status') === 'tersedia') {
        $query->where('stock', '>', 0);
    } elseif ($request->input('stock_status') === 'habis') {
        $query->where('stock', '<=', 0);
    }

    // Pagination
    $limit = $request->input('limit', 10);
    $products = $query->paginate($limit)->withQueryString();

    return ProductResource::collection($products);
}


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,category_id',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'img' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $path = '';

        if ($request->hasFile('img')) {
            $path = $request->file('img')->store('products', 'public');
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'stock' => $request->stock,
            'img' => $path,
            'slug' => Str::slug($request->name),
        ]);

        return new ProductResource($product);
    }

    public function show(string $id)
    {
        $product = Product::with('category')->findOrFail($id);

        return new ProductResource($product);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,category_id',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'img' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'stock' => $request->stock,
            'slug' => Str::slug($request->name),
        ];

        if ($request->hasFile('img')) {
            if ($product->img && Storage::disk('public')->exists($product->img)) {
                Storage::disk('public')->delete($product->img);
            }

            $data['img'] = $request->file('img')->store('products', 'public');
        }

        $product->update($data);

        return new ProductResource($product);
    }

    public function destroy(string $id)
    {
        $product = Product::find($id);

        if ($product !== null) {
            if ($product->img && Storage::disk('public')->exists($product->img)) {
                Storage::disk('public')->delete($product->img);
            }

            $product->delete();

            return response()->json([
                'message' => 'Product deleted successfully',
            ]);
        }

        return response()->json([
            'message' => 'Product not found',
        ], 404);
    }
}
