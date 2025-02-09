import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.thorWalletAddress || !body.solanaWalletAddress) {
      return NextResponse.json(
        { error: 'Wallet addresses are required' },
        { status: 400 }
      );
    }

    // Save to database
    await sql`
      INSERT INTO claims (
        thor_address, 
        solana_address, 
        amount, 
        product, 
        risk_understanding,
        insolvency_understanding,
        impact_statement
      ) VALUES (
        ${body.thorWalletAddress},
        ${body.solanaWalletAddress},
        ${body.lossAmountUsd},
        ${body.thorfiProduct},
        ${body.riskUnderstanding},
        ${body.insolvencyUnderstanding},
        ${body.impactStatement}
      )
    `;

    return NextResponse.json(
      { message: 'Claim submitted successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
