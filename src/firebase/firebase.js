import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, get, remove, query, orderByChild, equalTo } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyB-7q16cx8Hp0VBIENSn56omk4g9l_q4GI",
  authDomain: "karina-nails-lashes.firebaseapp.com",
  databaseURL: "https://karina-nails-lashes-default-rtdb.firebaseio.com",
  projectId: "karina-nails-lashes",
  storageBucket: "karina-nails-lashes.firebasestorage.app",
  messagingSenderId: "300064001407",
  appId: "1:300064001407:web:4c337677a1fc0d00745e4a"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { database, ref, push, get, remove, query, orderByChild, equalTo }