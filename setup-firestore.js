// Firestore Setup Script for Tutorly Waitlist
// Run this to set up the Firestore collection structure
// Make sure you have Firebase CLI installed: npm install -g firebase-tools

const firebase = require('firebase/compat/app');
const firestore = require('firebase/compat/firestore');

// Initialize Firebase (update with your config)
const firebaseConfig = {
  // Add your Firebase config here from the Firebase console
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Waitlist form data structure
const sampleWaitlistData = {
  role: 'Parent of a K-12 student',
  primaryUse: 'One-on-one personal tutoring',
  willingnessToPay: '₹999',
  preferredTutorFormat: 'Separate tutor for each subject/grade',
  learningStyle: 'Interactive (quizzes, practice)',
  biggestFrustration: 'High cost of tuition and inconsistent teaching quality',
  joinWaitlistPerks: 'Excited for early access + discounts'
};

// Add sample data (optional - for testing)
const addSampleData = async () => {
  try {
    const docRef = await db.collection('waitlist').add({
      ...sampleWaitlistData,
      submittedAt: firebase.firestore.Timestamp.now()
    });
    console.log('Sample document added with ID:', docRef.id);

    // Query sample to verify
    const waitlistRef = db.collection('waitlist');
    const querySnapshot = await waitlistRef.get();
    console.log('Number of documents in waitlist:', querySnapshot.size);

  } catch (error) {
    console.error('Error adding sample data:', error);
  }
};

// Functions to export data or validate structure
const exportWaitlistData = async () => {
  try {
    const querySnapshot = await db.collection('waitlist').get();
    console.log('Exporting waitlist data...');
    console.log('Total entries:', querySnapshot.size);

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });

  } catch (error) {
    console.error('Error exporting data:', error);
  }
};

// Setup Firestore rules (you'll need to do this in Firebase Console)
// Basic security rules for waitlist collection:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Waitlist data - only authenticated users can read their own data
    match /waitlist/{document=**} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
*/

module.exports = {
  addSampleData,
  exportWaitlistData
};

// If running this file directly
if (require.main === module) {
  console.log('Tutorly Firestore Setup');
  console.log('==================');
  console.log('Make sure you have:');
  console.log('1. Firebase CLI installed: npm install -g firebase-tools');
  console.log('2. Firebase project initialized: firebase init');
  console.log('3. Environment variables set in .env.local');
  console.log('');
  console.log('Waitlist data structure:');
  console.log(JSON.stringify({
    role: 'string (required)',
    primaryUse: 'string (required)',
    willingnessToPay: 'string (required)',
    preferredTutorFormat: 'string (required)',
    learningStyle: 'string (required)',
    biggestFrustration: 'string (optional)',
    joinWaitlistPerks: 'string (required)',
    submittedAt: 'timestamp'
  }, null, 2));
  console.log('');
  console.log('Navigate to /waitlist in your app to test the form!');
}
