'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Package, RotateCcw, MessageSquare } from 'lucide-react';
import { brands } from '@/data/brands';

interface Order {
  id: string;
  brandName: string;
  brandId: string;
  productName: string;
  productImage: string;
  date: string;
  status: 'pending' | 'confirmed' | 'in-production' | 'shipped' | 'delivered';
  rating?: number;
  feedback?: string;
}

export default function DashboardPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      brandName: 'Ethereal Couture',
      brandId: '1',
      productName: 'Silk Floral Maxi Dress',
      productImage: 'https://picsum.photos/seed/dress-1/400/500',
      date: '2024-01-15',
      status: 'in-production',
      rating: 5,
      feedback: 'Excellent quality and beautiful design!',
    },
    {
      id: 'ORD-002',
      brandName: 'Minimalist Luxe',
      brandId: '2',
      productName: 'Structured Blazer',
      productImage: 'https://picsum.photos/seed/blazer-1/400/500',
      date: '2024-01-10',
      status: 'delivered',
      rating: 4,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = (orderId: string) => {
    // In a real app, this would submit feedback to the backend
    alert('Feedback submitted successfully!');
    setSelectedOrder(null);
  };

  const handleReorder = (order: Order) => {
    // Navigate to brand page to reorder
    window.location.href = `/brand/${order.brandId}`;
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] py-20">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-4xl font-light mb-12">My Dashboard</h1>

        {/* Orders Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="relative w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={order.productImage}
                    alt={order.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-light mb-1">{order.productName}</h3>
                      <p className="text-gray-600">{order.brandName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'in-production' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">Order Date: {order.date}</p>
                  
                  <div className="flex gap-4">
                    <Link
                      href={`/tracking/${order.id}`}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      Track Order
                    </Link>
                    
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reorder
                    </button>
                    
                    {order.status === 'delivered' && !order.feedback && (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Leave Feedback
                      </button>
                    )}
                  </div>

                  {order.rating && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-sm text-gray-600">Your Rating:</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < order.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-light mb-6">Leave Feedback</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setRating(i + 1)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback
                </label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedOrder(null);
                    setRating(0);
                    setFeedback('');
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmitFeedback(selectedOrder.id)}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

