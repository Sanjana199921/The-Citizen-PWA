import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from '../data/config';

export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);