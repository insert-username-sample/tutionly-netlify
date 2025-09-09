import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { collection, addDoc, Firestore } from 'firebase/firestore';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const db = getDb();
    const data = await request.json();
    await addDoc(collection(db as Firestore, 'waitlist'), data);
    return NextResponse.json({ message: 'Successfully joined the waitlist!' });
  } catch (error) {
    console.error('Error in waitlist API:', error);
    return NextResponse.json({ message: 'Error joining the waitlist.' }, { status: 500 });
  }
}
