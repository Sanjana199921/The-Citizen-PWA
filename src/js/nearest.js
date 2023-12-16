import { getCategories } from './index1.js'

const nearest = document.getElementById("nearest");
nearest.addEventListener('click', () => {
  getUserLocation();
})



//get user current location
export function getUserLocation() {
  try {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`check the points`)
        console.log(position.coords.longitude.toString())
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log(`coordinates: ${lat}, ${lng}`)
        console.log(isNaN(lat) + isNaN(lng))
        if (!isNaN(lat) && !isNaN(lng)) {
          getReports(position);
        }
      })
    }
    else {
      console.error('No geolation Found')
    }
  }
  catch (e) {
    console.error("error in getting user current location: " + e);
  }
}

// get reports
async function getReports(position) {
  let categories = await getCategories('categories')
  const container = document.getElementById('cards')
  let welcomeHeader = document.getElementById('nearestCount')
  
  let output = '';
  let count=0;
  for (let report of categories.values()) {
    console.log('lat '+report.latitude.toFixed(1).toString())
    console.log('lat '+report.longitude.toFixed(1).toString())
    
    if (position.coords.latitude.toFixed(1).toString()===report.latitude.toFixed(1).toString() &&
      position.coords.longitude.toFixed(1).toString() === report.longitude.toFixed(1).toString()) {
        count++;
        let image=report.images.toLowerCase();
        //  let imageUrl=`./assets/images/${report.category}.jpg`;
        let imageUrl=`./assets/images/${image}`;
        output += `<div class="card">
        <img class="cardImg" src=${imageUrl} alt="img1">
        <div class="cardDetail">
        <h3>${report.title}</h3>
        <span class="location"><h4>${report.address}</h4></span>
        <span class="time"><h4>${new Date(report.createdAt.seconds * 1000).toLocaleString()}</h4></span>
        <div class="tags">
        <span class="filterIcon activeIcon clear"><a href="">${report.category}</a></span>                
        </div>
        </div>
        </div>`;
        welcomeHeader.innerHTML=`<h3>There's <a href="#" >${count} new issues</a> reported in your neighbourhood</h3>`
      }
  }
  // show output
  container.innerHTML = output;
}

// export default getUserLocation;





