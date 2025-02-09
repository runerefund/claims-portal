'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AlertCircle, Info } from "lucide-react"

const ClaimForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    thorWalletAddress: '',
    solanaWalletAddress: '',
    lossAmountUsd: '',
    thorfiProduct: '',
    riskUnderstanding: '',
    insolvencyUnderstanding: '',
    impactStatement: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ... rest of your component logic ...

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">
              RUNE & THORFi Victim Compensation Portal
            </h1>
            <p className="text-gray-600 mb-8">
              Submit your claim for compensation related to RUNE and THORFi losses
            </p>

            {/* Security Notice */}
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                <div>
                  <p className="font-semibold text-red-800">SECURITY NOTICE:</p>
                  <p className="text-red-700">
                    We will NEVER ask you to connect your wallet or send funds. 
                    We only request a nominated wallet address to send your compensation funds.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Notice */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <p className="text-blue-700">
                  All claims are processed on a first-come, first-served basis. 
                  Please ensure all information provided is accurate and verifiable on-chain.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            {!submitted && (
              <div className="flex gap-2 mb-8">
                <div 
                  className={`h-2 flex-1 rounded ${
                    step === 1 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
                <div 
                  className={`h-2 flex-1 rounded ${
                    step === 2 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}

            {/* Form Steps */}
            {!submitted ? (
              step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main THORChain Wallet Address Affected
                    </label>
                    <input
                      type="text"
                      name="thorWalletAddress"
                      value={formData.thorWalletAddress}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your THORChain wallet address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loss Amount (in USD)
                    </label>
                    <input
                      type="number"
                      name="lossAmountUsd"
                      value={formData.lossAmountUsd}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter total loss amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      THORFi Product Used
                    </label>
                    <select
                      name="thorfiProduct"
                      value={formData.thorfiProduct}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select product</option>
                      <option value="savers">THORChain Savers</option>
                      <option value="lending">THORChain Lending</option>
                      <option value="both">Both Products</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.thorWalletAddress || !formData.lossAmountUsd || !formData.thorfiProduct}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Was it clear to you that THORChain Savers/Lending was short BTC?
                    </label>
                    <select
                      name="riskUnderstanding"
                      value={formData.riskUnderstanding}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select answer</option>
                      <option value="yes">Yes, it was clear</option>
                      <option value="no">No, it was not clear</option>
                      <option value="partial">It was partially clear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Was it clear that the protocol was insolvent?
                    </label>
                    <select
                      name="insolvencyUnderstanding"
                      value={formData.insolvencyUnderstanding}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select answer</option>
                      <option value="yes">Yes, it was clear</option>
                      <option value="no">No, it was not clear</option>
                      <option value="partial">It was partially clear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How has your loss in RUNE / THORFi negatively affected your life?
                    </label>
                    <textarea
                      name="impactStatement"
                      value={formData.impactStatement}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      placeholder="Please share how these losses have impacted you and your family"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solana Wallet Address for Compensation
                    </label>
                    <input
                      type="text"
                      name="solanaWalletAddress"
                      value={formData.solanaWalletAddress}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Address to receive compensation"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.riskUnderstanding || !formData.insolvencyUnderstanding || !formData.impactStatement || !formData.solanaWalletAddress}
                      className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                    </button>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-500 rounded-lg text-red-700">
                      {error}
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Claim Submitted Successfully</h3>
                <p className="text-gray-600">
                  Your claim has been received and will be reviewed by the RUNE Restitution Council.
                  You will receive updates about your claim status at your provided wallet addresses.
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-6 border-t">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-gray-500 mt-0.5" />
              <p className="text-sm text-gray-600">
                For questions about the compensation process or technical support,
                please contact the RUNE Restitution Council through official channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimForm;
