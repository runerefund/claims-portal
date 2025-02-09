'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit claim');
      }

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Main THORChain Wallet Address Affected</label>
        <input
          type="text"
          name="thorWalletAddress"
          value={formData.thorWalletAddress}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your THORChain wallet address"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Loss Amount (in USD)</label>
        <input
          type="number"
          name="lossAmountUsd"
          value={formData.lossAmountUsd}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter total loss amount"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">THORFi Product Used</label>
        <select
          name="thorfiProduct"
          value={formData.thorfiProduct}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
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
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Was it clear to you that THORChain Savers/Lending was short BTC?
        </label>
        <select
          name="riskUnderstanding"
          value={formData.riskUnderstanding}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select answer</option>
          <option value="yes">Yes, it was clear</option>
          <option value="no">No, it was not clear</option>
          <option value="partial">It was partially clear</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Was it clear that the protocol was insolvent?
        </label>
        <select
          name="insolvencyUnderstanding"
          value={formData.insolvencyUnderstanding}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select answer</option>
          <option value="yes">Yes, it was clear</option>
          <option value="no">No, it was not clear</option>
          <option value="partial">It was partially clear</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">How has your loss in RUNE / THORFi negatively affected your life?</label>
        <textarea
          name="impactStatement"
          value={formData.impactStatement}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md h-32"
          placeholder="Please share how these losses have impacted you and your family"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Solana Wallet Address for Compensation</label>
        <input
          type="text"
          name="solanaWalletAddress"
          value={formData.solanaWalletAddress}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          placeholder="Address to receive compensation"
        />
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setStep(1)}
          className="w-1/2 bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.riskUnderstanding || !formData.insolvencyUnderstanding || !formData.impactStatement || !formData.solanaWalletAddress}
          className="w-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Claim'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-500 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-4">
      <div className="mx-auto h-12 w-12 text-green-500">✓</div>
      <h3 className="text-xl font-semibold">Claim Submitted Successfully</h3>
      <p className="text-gray-600">
        Your claim has been received and will be reviewed by the RUNE Restitution Council.
        You will receive updates about your claim status at your provided wallet addresses.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="w-full bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">RUNE & THORFi Victim Compensation Portal</h2>
            <p className="text-gray-600 mb-6">
              Submit your claim for compensation related to RUNE and THORFi losses
            </p>

            <div className="mb-4 p-3 border-2 border-red-500 bg-red-50 text-red-700 rounded-md">
              <p className="font-medium">
                SECURITY NOTICE:
                <br />
                We will NEVER ask you to connect your wallet or send funds. 
                We only request a nominated wallet address to send your compensation funds.
              </p>
            </div>

            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p>
                All claims are processed on a first-come, first-served basis. 
                Please ensure all information provided is accurate and verifiable on-chain.
              </p>
            </div>

            {!submitted ? (
              <div className="space-y-6">
                <div className="flex justify-center space-x-4 mb-8">
                  <div className={`h-2 w-1/2 rounded ${step === 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  <div className={`h-2 w-1/2 rounded ${step === 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                </div>
                {step === 1 ? renderStep1() : renderStep2()}
              </div>
            ) : (
              renderSuccess()
            )}
          </div>

          <div className="bg-gray-50 p-4 text-sm text-gray-600 rounded-b-lg border-t">
            <div className="flex items-start space-x-2">
              <span className="mt-1">ℹ️</span>
              <p>
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
