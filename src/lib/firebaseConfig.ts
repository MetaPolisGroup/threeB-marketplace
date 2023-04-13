import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  WhereFilterOp,
  where,
  getDocs,
  QueryConstraint,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { CollectionType, Collection } from '../../constants/Entities/index.entity';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);
export async function getCollection(
  col: Collection,
  conditions: { field: string; operator: WhereFilterOp; value: string }[],
) {
  try {
    const colRef = collection(db, col);
    let querySnapshot: QuerySnapshot<DocumentData>;
    if (conditions.length > 0) {
      const queryArr: QueryConstraint[] = [];
      conditions.map((condition) => queryArr.push(where(condition.field, condition.operator, condition.value)));
      querySnapshot = await getDocs(query(colRef, ...queryArr));
    } else {
      querySnapshot = await getDocs(colRef);
    }

    if (!querySnapshot.empty) {
      const results: {
        id: string;
        data: DocumentData;
      }[] = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      return results;
    } else {
      console.log(`Collection ${col} is empty`);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getDocument(col: Collection, documentId: string) {
  try {
    const docRef = doc(db, col, documentId);
    const doccument = await getDoc(docRef);
    if (document) {
      return doccument;
    } else {
      console.log(`Document ${documentId} not found`);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function upsert(col: Collection, documentId: string, data: CollectionType) {
  try {
    const docRef = doc(db, col, documentId);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.log(error);
  }
}

// Storage Firebase
export async function uploadImage(file: Blob) {
  const storage = getStorage();
  const storageRef = ref(storage, 'some-child');

  const result = await uploadBytes(storageRef, file);

  console.log(result.ref);
  console.log(result.metadata);

  return result.ref;
}
