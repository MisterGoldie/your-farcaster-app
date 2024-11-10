import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import axios from "axios"

export async function PUT(request: NextRequest) {
  try {
    const { fid, outcome } = await request.json();
    
    const userRef = adminDb.collection('miniappusers').doc(fid);
    await userRef.set({
      wins: FieldValue.increment(outcome === 'win' ? 1 : 0),
      losses: FieldValue.increment(outcome === 'loss' ? 1 : 0),
      ties: FieldValue.increment(outcome === 'draw' ? 1 : 0),
      totalGames: FieldValue.increment(1),
    }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user stats:', error);
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');
    
    if (!fid) {
      return NextResponse.json({ error: 'FID is required' }, { status: 400 });
    }

    const userRef = adminDb.collection('miniappusers').doc(fid);
    const doc = await userRef.get();
    
    return NextResponse.json(doc.exists ? doc.data() : null);
  } catch (error) {
    console.error('Error getting user stats:', error);
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}
