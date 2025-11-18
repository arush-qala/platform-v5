'use client';

import { use } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface TrackingStep {
  status: 'pending' | 'in-progress' | 'completed';
  title: string;
  description: string;
  date?: string;
}

export default function TrackingPage({ params }: { params: Promise<{ orderId: string }> }) {
  const resolvedParams = use(params);
  
  // Mock tracking data
  const trackingSteps: TrackingStep[] = [
    {
      status: 'completed',
      title: 'Enquiry Received',
      description: 'Your enquiry has been received by the designer',
      date: '2024-01-15',
    },
    {
      status: 'completed',
      title: 'Order Confirmed',
      description: 'Designer has confirmed your order',
      date: '2024-01-16',
    },
    {
      status: 'in-progress',
      title: 'In Production',
      description: 'Your items are being crafted',
      date: '2024-01-18',
    },
    {
      status: 'pending',
      title: 'Quality Check',
      description: 'Items undergoing quality inspection',
    },
    {
      status: 'pending',
      title: 'Ready to Ship',
      description: 'Items are ready for shipping',
    },
    {
      status: 'pending',
      title: 'Shipped',
      description: 'Items are on their way',
    },
    {
      status: 'pending',
      title: 'Delivered',
      description: 'Items have been delivered',
    },
  ];

  const getStatusIcon = (status: TrackingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-blue-500 animate-spin" />;
      default:
        return <Package className="w-6 h-6 text-gray-300" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] py-20">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-4xl font-light mb-4">Order Tracking</h1>
        <p className="text-gray-600 mb-12">Order ID: {resolvedParams.orderId}</p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-6 relative">
                  {index < trackingSteps.length - 1 && (
                    <div className="absolute left-[-9px] top-8 w-4 h-4 bg-white border-2 border-gray-200 rounded-full" />
                  )}
                  <h3 className={`text-xl font-light mb-2 ${
                    step.status === 'completed' ? 'text-gray-900' :
                    step.status === 'in-progress' ? 'text-blue-600' :
                    'text-gray-400'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  {step.date && (
                    <p className="text-sm text-gray-400">{step.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Automated Updates</h3>
              <p className="text-blue-700 text-sm">
                You will receive email notifications at each stage of your order. 
                No need to check back manually - we'll keep you informed every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

