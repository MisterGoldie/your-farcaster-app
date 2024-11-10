import admin from 'firebase-admin';

let db: admin.firestore.Firestore | null = null;

try {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase configuration environment variables');
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  }

  db = admin.firestore();
} catch (error) {
  console.error('Error in Firebase initialization:', error);
}

const getDb = () => {
  if (db) {
    return db;
  }
  throw new Error('Firestore is not initialized');
};

// Function to update user stats in miniappusers collection
export const updateUserStats = async (fid: string, outcome: 'win' | 'loss' | 'draw') => {
  const userRef = getDb().collection('miniappusers').doc(fid);
  await userRef.set({
    wins: admin.firestore.FieldValue.increment(outcome === 'win' ? 1 : 0),
    losses: admin.firestore.FieldValue.increment(outcome === 'loss' ? 1 : 0),
    ties: admin.firestore.FieldValue.increment(outcome === 'draw' ? 1 : 0),
    totalGames: admin.firestore.FieldValue.increment(1),
  }, { merge: true });
};

// Function to get user stats from miniappusers collection
export const getUserStats = async (fid: string) => {
  const userRef = getDb().collection('miniappusers').doc(fid);
  const doc = await userRef.get();
  return doc.exists ? doc.data() : null;
};
