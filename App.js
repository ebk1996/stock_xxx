
import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, Star, TrendingUp, Filter, Grid, List, User, CreditCard } from 'lucide-react';

// Mock StockX API data with realistic streetwear products
const DEMO_PRODUCTS = [
  {
    id: '1',
    name: 'Nike Air Jordan 1 Retro High OG "Chicago"',
    brand: 'Nike',
    category: 'Sneakers',
    price: 289,
    retailPrice: 170,
    images: ['https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'],
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    description: 'The legendary Chicago colorway returns in this classic Air Jordan 1 silhouette.',
    condition: 'New',
    rating: 4.8,
    sales: 2847,
    trending: true,
    featured: true
  },
  {
    id: '2',
    name: 'Supreme Box Logo Hoodie FW23',
    brand: 'Supreme',
    category: 'Hoodies',
    price: 450,
    retailPrice: 178,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic Supreme Box Logo hoodie from Fall/Winter 2023 collection.',
    condition: 'New',
    rating: 4.9,
    sales: 1923,
    trending: true,
    featured: false
  },
  {
    id: '3',
    name: 'Off-White Jordan 4 "Sail"',
    brand: 'Off-White x Nike',
    category: 'Sneakers',
    price: 1850,
    retailPrice: 200,
    images: ['https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'],
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11'],
    description: 'Virgil Abloh\'s iconic take on the classic Jordan 4 silhouette.',
    condition: 'New',
    rating: 4.7,
    sales: 892,
    trending: false,
    featured: true
  },
  {
    id: '4',
    name: 'Travis Scott x McDonald\'s Vintage Tee',
    brand: 'Travis Scott',
    category: 'T-Shirts',
    price: 125,
    retailPrice: 35,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Limited edition Travis Scott McDonald\'s collaboration vintage t-shirt.',
    condition: 'New',
    rating: 4.6,
    sales: 1456,
    trending: true,
    featured: false
  },
  {
    id: '5',
    name: 'Yeezy Boost 350 V2 "Zebra"',
    brand: 'adidas Yeezy',
    category: 'Sneakers',
    price: 320,
    retailPrice: 220,
    images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400'],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    description: 'The iconic Zebra colorway in Kanye\'s revolutionary Boost 350 V2.',
    condition: 'New',
    rating: 4.8,
    sales: 3201,
    trending: false,
    featured: true
  },
  {
    id: '6',
    name: 'Chrome Hearts Cross Pendant Chain',
    brand: 'Chrome Hearts',
    category: 'Jewelry',
    price: 890,
    retailPrice: 650,
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400'],
    sizes: ['One Size'],
    description: 'Sterling silver cross pendant chain from Chrome Hearts luxury collection.',
    condition: 'New',
    rating: 4.9,
    sales: 234,
    trending: false,
    featured: false
  },
  {
    id: '7',
    name: 'Fear of God Essentials Hoodie',
    brand: 'Fear of God',
    category: 'Hoodies',
    price: 180,
    retailPrice: 120,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Minimalist luxury hoodie from Fear of God Essentials line.',
    condition: 'New',
    rating: 4.7,
    sales: 987,
    trending: true,
    featured: false
  },
  {
    id: '8',
    name: 'Stone Island Compass Badge Jacket',
    brand: 'Stone Island',
    category: 'Jackets',
    price: 650,
    retailPrice: 495,
    images: ['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Technical jacket with iconic compass badge from Stone Island.',
    condition: 'New',
    rating: 4.8,
    sales: 445,
    trending: false,
    featured: true
  },
  {
    id: '9',
    name: 'Kaws Companion Figure (Pink)',
    brand: 'Kaws',
    category: 'Collectibles',
    price: 2500,
    retailPrice: 300,
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'],
    sizes: ['One Size'],
    description: 'Limited edition pink Companion figure by renowned artist Kaws.',
    condition: 'New',
    rating: 4.9,
    sales: 156,
    trending: true,
    featured: true
  },
  {
    id: '10',
    name: 'Stussy World Tour Long Sleeve',
    brand: 'Stussy',
    category: 'T-Shirts',
    price: 95,
    retailPrice: 45,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'https://images.unsplash.com/photo-1583743814966-8936f37f630?w=400'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic Stussy World Tour long sleeve tee with vintage graphics.',
    condition: 'New',
    rating: 4.5,
    sales: 1789,
    trending: false,
    featured: false
  }
];

// Context for cart management
const CartContext = createContext(null);

// Custom hooks
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Cart Provider Component
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product, size) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1, cartId: Date.now() }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      getTotalItems,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Product Card Component
const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      setShowSizes(false);
      setSelectedSize('');
    } else {
      setShowSizes(true);
    }
  };

  const profitMargin = ((product.price - product.retailPrice) / product.retailPrice * 100).toFixed(0);

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Product Badge */}
      {product.trending && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <TrendingUp size={12} />
          Trending
        </div>
      )}
      
      {/* Like Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full transition-all hover:bg-white"
      >
        <Heart 
          size={18} 
          className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onClick={() => onViewDetails(product)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">${product.price}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 line-through">${product.retailPrice}</span>
              <span className="text-green-600 font-medium">+{profitMargin}%</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">{product.sales} sold</div>
            <div className="text-xs text-gray-400">Last sale</div>
          </div>
        </div>

        {/* Size Selection */}
        {showSizes && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Size</label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.slice(0, 8).map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 text-sm border rounded-lg transition-all ${
                    selectedSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
          >
            {showSizes ? 'Add to Cart' : 'Quick Buy'}
          </button>
          <button 
            onClick={() => onViewDetails(product)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all"
          >
            <Grid size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart Sidebar Component
const CartSidebar = () => {
  const { cartItems, isOpen, setIsOpen, getTotalPrice, getTotalItems, updateQuantity, removeFromCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (showCheckout) {
    return (
      <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CreditCard size={24} />
            Secure Checkout
          </h2>
          <button
            onClick={() => {setIsOpen(false); setShowCheckout(false);}}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items ({getTotalItems()})</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Authentication</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
              <div className="space-y-2">
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="4242 4242 4242 4242" />
                <div className="flex gap-2">
                  <input type="text" className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="MM/YY" />
                  <input type="text" className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="CVC" />
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95"
            onClick={() => alert(`Order placed! Total: $${getTotalPrice().toFixed(2)}`)}
          >
            Complete Purchase - ${getTotalPrice().toFixed(2)}
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">SSL</div>
            <span>256-bit SSL secured checkout</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingCart size={24} />
          Cart ({getTotalItems()})
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.cartId} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                  <p className="text-xs text-gray-500">Size: {item.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="border-t p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
          >
            Secure Checkout
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">
            Free shipping & authentication included
          </p>
        </div>
      )}
    </div>
  );
};

// Product Detail Modal Component
const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      onClose();
    } else {
      alert('Please select a size');
    }
  };

  const profitMargin = ((product.price - product.retailPrice) / product.retailPrice * 100).toFixed(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{product.brand}</span>
              {product.trending && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <TrendingUp size={10} />
                  Trending
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.sales} sales)</span>
              </div>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-1 text-gray-600 hover:text-red-500"
              >
                <Heart size={16} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
                <span className="text-sm">Save</span>
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">${product.price}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 line-through">Retail: ${product.retailPrice}</span>
                    <span className="text-green-600 font-bold">+{profitMargin}% profit</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">StockXXX Price</div>
                  <div className="text-sm text-green-600 font-medium">Best Market Price</div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Size</label>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-sm border rounded-xl transition-all font-medium ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
              >
                Add to Cart
              </button>
              <button className="px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all">
                <Heart size={20} />
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Condition:</span>
                <span className="font-medium">{product.condition}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Authentication:</span>
                <span className="font-medium text-green-600">✓ Guaranteed Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const StockXXXApp = () => {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, setIsOpen } = useCart();

  const categories = ['All', 'Sneakers', 'Hoodies', 'T-Shirts', 'Jackets', 'Jewelry', 'Collectibles'];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'trending': return b.trending - a.trending || b.sales - a.sales;
        case 'newest': return b.featured - a.featured;
        default: return 0;
      }
    });

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StockXXX
              </div>
              <div className="ml-2 text-xs bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-1 rounded-full font-semibold">
                BETTER PRICES
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for brands, products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <User size={20} />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full md:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Better Than StockX
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Same products. Better prices. Superior experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">15%</div>
              <div className="text-sm opacity-80">Lower Prices</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">FREE</div>
              <div className="text-sm opacity-80">Authentication</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort and View Options */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="trending">Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>

            <div className="flex border border-gray-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory} 
            <span className="text-gray-500 font-normal ml-2">({filteredProducts.length})</span>
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={showProductDetail}
        onClose={() => setShowProductDetail(false)}
      />

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                StockXXX
              </div>
              <p className="text-gray-400">
                The better marketplace for authentic streetwear and collectibles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Authentication</li>
                <li>Shipping</li>
                <li>Returns</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StockXXX. All rights reserved. Better than StockX.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App with Cart Provider
export default function App() {
  return (
    <CartProvider>
      <StockXXXApp />
    </CartProvider>
  );
}
