import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // GET ALL PRODUCTS
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      return res.data;
    },
  });

  // SHOW PRODUCT DETAIL
  const getProductById = async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  };

  // SHOW CATEGORY DETAIL
  const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data;
  };

  // GET PRODUCTS WITH FILTER AND PAGINATION
  const getProducts = async ({
    page = 1,
    limit = 10,
    category_id = "",
    keyword = "",
    stock_status = "",
  }) => {
    const res = await apiClient.get("/products", {
      params: {
        page,
        limit,
        category_id,
        keyword,
        stock_status,
      },
    });

    return res.data;
  };

  // STORE PRODUCT
  const addProduct = async (formData) => {
    const response = await apiClient.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    queryClient.invalidateQueries({ queryKey: ["products"] });
    return response;
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, formData) => {
    const response = await apiClient.post(
      `/products/${id}?_method=PUT`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    queryClient.invalidateQueries({ queryKey: ["products"] });
    return response;
  };

  // DELETE PRODUCT
  const deleteProduct = useMutation({
    mutationFn: async (id) => await apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        isError,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        getCategories,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
