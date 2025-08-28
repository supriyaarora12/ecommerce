"use client";

import { useState, useEffect, useCallback } from 'react';
import { getAllProducts, addProduct, updateProduct, deleteProduct, Product, searchProducts } from '../../../src/services/products';
import { useToast } from '../../context/ToastContext';
import Image from 'next/image';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    category: ''
  });

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      let result;
      
      if (searchQuery.trim()) {
        result = await searchProducts(searchQuery);
        setTotalProducts(result.length);
      } else {
        result = await getAllProducts();
        setTotalProducts(result.length);
      }
      
      setProducts(result);
    } catch (error) {
      console.error('Error loading products:', error);
      showError('Error loading products');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, showError]);

  useEffect(() => {
    loadProducts();
  }, []); // Empty dependency array

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    loadProducts();
  }, [loadProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id!, formData);
        showSuccess('Product updated successfully');
      } else {
        await addProduct(formData);
        showSuccess('Product created successfully');
      }
      
      setShowCreateForm(false);
      setEditingProduct(null);
      resetForm();
      loadProducts();
    } catch (error) {
      showError('Error saving product');
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        showSuccess('Product deleted successfully');
        loadProducts();
      } catch (error) {
        showError('Error deleting product');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      category: ''
    });
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl || '',
      category: product.category || ''
    });
    setShowCreateForm(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-red-500">{totalProducts}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <input
              type="text"
              placeholder="Product name, description, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Page Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items per page
            </label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Refresh Button */}
          <div className="flex items-end">
            <button
              onClick={() => loadProducts()}
              disabled={loading}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {/* Add Product Button */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setShowCreateForm(true);
                setEditingProduct(null);
                resetForm();
              }}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Create New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingProduct(null);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.description?.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {product.category || 'Uncategorized'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' : 
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.createdAt ? formatDate(product.createdAt) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedProduct(selectedProduct?.id === product.id ? null : product)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        {selectedProduct?.id === product.id ? 'Hide' : 'View'}
                      </button>
                      <button
                        onClick={() => editProduct(product)}
                        className="text-green-500 hover:text-green-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id!)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Product Details
                </h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {selectedProduct.imageUrl ? (
                    <Image
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-md bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">No Image</span>
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{selectedProduct.name}</h4>
                    <p className="text-sm text-gray-600">{selectedProduct.category || 'Uncategorized'}</p>
                    <p className="text-lg font-bold text-red-500">${selectedProduct.price}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">
                    {selectedProduct.description || 'No description available'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Stock Information</h4>
                    <div className="text-sm text-gray-600 mt-2">
                      <p><strong>Available:</strong> {selectedProduct.stock} units</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedProduct.stock > 10 ? 'bg-green-100 text-green-800' : 
                          selectedProduct.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedProduct.stock > 10 ? 'In Stock' : 
                           selectedProduct.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Product Information</h4>
                    <div className="text-sm text-gray-600 mt-2">
                      <p><strong>Product ID:</strong> {selectedProduct.id}</p>
                      <p><strong>Created:</strong> {selectedProduct.createdAt ? formatDate(selectedProduct.createdAt) : 'N/A'}</p>
                      <p><strong>Updated:</strong> {selectedProduct.updatedAt ? formatDate(selectedProduct.updatedAt) : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
