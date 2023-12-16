import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'
import { documentId, getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, query, where } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js'
import { NewReport } from '/src/js/models/NewReport.js';
// import { createRequire } from '/module'; // 
// const require = createRequire(import.meta.url);
// const geofire = require('geofire-common');

const firebaseConfig = {
  apiKey: "AIzaSyAdZBkcMY0QDKR6vkdC0kSDr5j8ekVH4_k",
  authDomain: "the-citizen-d6e2b.firebaseapp.com",
  projectId: "the-citizen-d6e2b",
  storageBucket: "the-citizen-d6e2b.appspot.com",
  messagingSenderId: "354032824353",
  appId: "1:354032824353:web:308a097b92191146e9f360",
  measurementId: "G-PLD04JLWCB",
  databaseURL: "https://the-citizen-d6e2b.northamerica-northeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//get collection 
function getCollection(name) {
  return collection(db, name);
}
/*--------Get Category Id-------------*/
export async function getCategory(collectionName, key, value) {
  let categoryId = null;
  try {
    console.log('category Id for:' + value)
    let documents = getCollection(collectionName);
    documents = query(documents, where(key, "==", value));
    let collection = await getDocs(documents);
    collection.forEach((doc) => {
      categoryId = doc.id;
    });
    return categoryId;
  }
  catch (e) {
    console.log('error in getting category id: ' + e);
    return categoryId;
  }
}

/*----------Add New Reports----------*/
//add new report
export async function addNewReport(newReport) {
  try {
    console.log('in addNewReports')
    const docRef = await addDoc(collection(db, "reports"), {
   
      title: newReport.getTitle,
      address: newReport.getAddress,
      createdAt: newReport.getCreatedAt,
      description: newReport.getDescription,
      images: newReport.getImages,
      latitude: newReport.getLatitude,
      longitude: newReport.getLongitude,
      postedBy: "",
      status: newReport.getStatus,
      updatedAt: "",
      upvotes: ""
    });
    console.log('docRef: ' + docRef.id);
    return docRef;
  } catch (e) {
    console.log(e)
    return null;
  }
}
//add new report_category
export async function addNewReportCategory(newReportCategory) {
  try {
    console.log('in addNewReports')
    const docRef = await addDoc(collection(db, "report_category"), {
      category: newReportCategory.getCategoryId,
      createdAt: newReportCategory.getCreatedAt,
      report: newReportCategory.getReportId,
      updatedAt: "",
    });
    console.log('docRef: ' + docRef.id);
    return docRef;
  } catch (e) {
    console.log(e)
    return null;
  }
}

/*---------- Add users-------------- */

//add new user
async function addNewUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: "Ada",
      password: "Lovelace",

    });
  } catch (e) {
  }
}

/*---------- Get All Reports--------------- */
//get categories
export async function getCategories(collectionName, key, value) {
  let collectionIdMap = new Map();
  let documents = null;
  let filter = false;
  documents = getCollection(collectionName)
  if (key != null && value != null) {
    documents = query(documents, where(key, "==", value));
    filter = true;

  }
  let collection = await getDocs(documents);
  collection.forEach((doc) => {
    collectionIdMap.set(doc.id, doc.data().name)
  });
  console.log('call getReports Ids')
  let reports = await getReportsIds(collectionIdMap, filter)
  return reports;
}

//get report id
async function getReportsIds(collectionIdMap, filter) {
  console.log('in getReportsIds')
  let documents = null;
  documents = getCollection('report_category');
  let reportFilter = false;

  if (filter === true) {
    reportFilter = true;
    let Key = []
    for (let key of collectionIdMap.keys()) {
      Key.push(key);
      console.log("category Key: " + key)
    }
    documents = query(documents, where('category', 'in', Key));
  }
  console.log('move towards getReports')
  let collection = await getDocs(documents);
  let reportIdMap = new Map();
  collection.forEach((doc) => {
    if (collectionIdMap.has(doc.data().category)) {
      reportIdMap.set(doc.data().report, collectionIdMap.get(doc.data().category))
    }
  });
  let reports = await getReports(reportIdMap, reportFilter)
  return reports;
}

//get reports
async function getReports(reportIdMap, reportFilter) {
  let documents = null;
  documents = getCollection('reports');
  if (reportFilter === true) {
    let Key = []
    for (let key of reportIdMap.keys()) {
      Key.push(key.toString());
    }
    documents = query(documents, where(documentId(), 'in', Key));
  }
  let collection = await getDocs(documents);
  collection.forEach((doc) => {
    if (reportIdMap.has(doc.id)) {
      console.log('category:' + reportIdMap.get(doc.id))
      let report = new NewReport(doc.data().address, doc.data().createdAt, doc.data().description, doc.data().images,
        doc.data().postedBy, doc.data().status, doc.data().title, doc.data().updatedAt,
        doc.data().upvotes, doc.data().geohash, doc.data().latitude, doc.data().longitude, reportIdMap.get(doc.id));
      reportIdMap.set(doc.id, report)
      console.log('after saving object' + reportIdMap.get(doc.id).address)
    }
  })
  return reportIdMap;
}









