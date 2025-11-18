'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Package, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<'review' | 'submitted'>('review');
  const [enquiryData, setEnquiryData] = useState({
    storeName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitted');
    // In a real app, this would send the enquiry to the backend
  };

  if (step === 'submitted') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f3]">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-light mb-4">Enquiry Submitted</h1>
          <p className="text-gray-600 mb-8">
            Your enquiry has been sent to the designer. You will receive a confirmation email shortly.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            View Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] py-20">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-4xl font-light mb-12 text-center">Submit Enquiry</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name *
            </label>
            <input
              type="text"
              required
              value={enquiryData.storeName}
              onChange={(e) => setEnquiryData({ ...enquiryData, storeName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Name *
            </label>
            <input
              type="text"
              required
              value={enquiryData.contactName}
              onChange={(e) => setEnquiryData({ ...enquiryData, contactName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={enquiryData.email}
                onChange={(e) => setEnquiryData({ ...enquiryData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={enquiryData.phone}
                onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address *
            </label>
            <textarea
              required
              rows={3}
              value={enquiryData.address}
              onChange={(e) => setEnquiryData({ ...enquiryData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={4}
              value={enquiryData.notes}
              onChange={(e) => setEnquiryData({ ...enquiryData, notes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Any special requests or customization details..."
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-lg"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

