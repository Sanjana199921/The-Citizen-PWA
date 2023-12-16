if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("../serviceWorker.js")
    })
}

const firebaseConfig = {
    apiKey: "AIzaSyAdZBkcMY0QDKR6vkdC0kSDr5j8ekVH4_k",
    authDomain: "the-citizen-d6e2b.firebaseapp.com",
    projectId: "the-citizen-d6e2b",
    storageBucket: "the-citizen-d6e2b.appspot.com",
    messagingSenderId: "354032824353",
    appId: "1:354032824353:web:308a097b92191146e9f360",
    measurementId: "G-PLD04JLWCB"
};

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const global = {
    latitude: null,
    longitude: null,
    reports: [],
}

function setPosition(position) {
    global.latitude = position.coords.latitude;
    global.longitude = position.coords.longitude;
}

(function() {
  if (navigator.geolocation) {
    console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
})();

class Report {
    state = {
        title: "",
        description: "",
        latitude: null,
        longitude: null,
        postedBy: "users/vRPgBGdaW7QmnNZI5V0cNhRxx983",
        status: "in review",
        upvotes: 0,
        images: [],
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
    }

    getInput() {
        this.title = document.querySelector("#title")?.value;
        this.description = document.querySelector("#description")?.value;
        this.latitude = global.latitude;
        this.longitude = global.longitude;
    }

    displayReportData () {
        console.log(this.state);
    }

    async submitData (db) {
        const reportsRef = collection(db, 'reports');
        await setDoc(reportsRef, this.state);
    }
}

const report = new Report();

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener('click', async function(e) {
    e.preventDefault();
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
	video.srcObject = stream;
});

click_button.addEventListener('click', function(e) {
    e.preventDefault();
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');
    console.log(report);
    report.images.push(image_data_url);
   	console.log(image_data_url);
});

report_submit.addEventListener('click', function(e) {
    e.preventDefault();
    report.getInput();
    report.submitData()
    console.log(report.displayReportData())
    window.location.href = "/success.html";

});
