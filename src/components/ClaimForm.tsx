'use client';

import { useState } from 'react';
import { AlertCircle, Info } from "lucide-react";
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const claimSchema = z.object({
  thorWalletAddress: z.string().min(10, 'Invalid THORChain address'),
  solanaWalletAddress: z.string().min(10, 'Invalid Solana address'),
  lossAmountUsd: z.number().min(1, 'Amount must be at least $1'),
  thorfiProduct: z.enum(['savers', 'lending', 'both']),
  riskUnderstanding: z.enum(['yes', 'no', 'partial']),
  insolvencyUnderstanding: z.enum(['yes', 'no', 'partial']),
  impactStatement: z.string().min(100, 'Impact statement must be at least 100 characters'),
});

type FormData = z.infer<typeof claimSchema>;

const ClaimForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(claimSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Submission failed');
    }
  };

  const handleNext = async () => {
    const valid = await trigger(step === 1 ? ['thorWalletAddress', 'lossAmountUsd', 'thorfiProduct'] : []);
    if (valid) setStep(prev => prev + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {errors.thorWalletAddress && (
        <p className="text-red-500 text-sm">{errors.thorWalletAddress.message}</p>
      )}
      {/* Add similar error displays for all fields */}
      {/* ... rest of the component ... */}
    </div>
  );
};

export default ClaimForm;
