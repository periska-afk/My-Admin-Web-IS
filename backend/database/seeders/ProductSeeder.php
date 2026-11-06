<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Macs',
                'slug' => Str::slug('Macs'),
                'description' => 'Produk Macs',
                'category_id' => 1,
                'price' => 23000000,
                'img' => 'products/macs.jpg',
                'stock' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Macbook 2',
                'slug' => Str::slug('Macbook 2'),
                'description' => 'Produk Macbook 2',
                'category_id' => 1,
                'price' => 23000000,
                'img' => 'products/macbook2.jpg',
                'stock' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Macbook333',
                'slug' => Str::slug('Macbook333'),
                'description' => 'Produk Macbook333',
                'category_id' => 1,
                'price' => 23000000,
                'img' => 'products/macbook333.jpg',
                'stock' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'keyb',
                'slug' => Str::slug('keyb'),
                'description' => 'Produk keyb',
                'category_id' => 1,
                'price' => 232,
                'img' => 'products/keyb.jpg',
                'stock' => 32,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
