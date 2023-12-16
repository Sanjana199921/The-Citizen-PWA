


console.log("=============== Data from Local storage");
console.log(JSON.parse(localStorage.getItem("Report")));
let data = JSON.parse(localStorage.getItem("Report"));
console.log(`============ address:${data.address}`);

let output ="";
const container = document.getElementById('report');
const reportImgContainer = document.getElementById('reportImage');
const reportDescContainer = document.getElementById('reportDesc');
const reportLocContainer = document.getElementById('reportLocation');



output+= `<h1 class="reportdetail__h1">${data.title}</h1>
<div class="reportinfo">
    <h3 class="reportdetail__h3">${new Date(data.createdAt.seconds*1000).toLocaleString()}</h3>
    <h3 class="reportdetail__h3">Posted by:${data.postedBy}</h3>
    <div class="status"><a href="#">${data.status}</a></div>
</div>`;

output += `<div class="tags">
<span class="filterIcon report clear"><a href="">Park</a></span>
<span class="filterIcon report clear"><a href="">Bench</a></span>
<span class="filterIcon report clear"><a href="">Garbage</a></span>
</div>`;

output += `<div class="icons">
<a href="#">
    <img  src="./assets/icons/comment-icon.svg" alt="comment icon"> <span>22</span>
</a>
<a href="#">
    <img  src="./assets/icons/upvote-icon.svg" alt="upvote icon"> <span>22</span>
</a>
<a href="#">
    <img  src="./assets/icons/share-icon.svg" alt="share icon"> <span>22</span>
</a>
</div>
</div>`;

container.innerHTML = output;

//Report Image Code Goes here
let output2;
//output = `<img src="assets/${data.images}" width="434px" height="376px">`;
output2 = `<img  src="assets/images/${data.images}" width="434px" height="376px">`;
console.log(`IMage Data assets/images/${data.images}`);
reportImgContainer.innerHTML = output2;
//reportImgContainer.append(output2);



//Report Description and Other Details goes here
output = `<div class="detailheading"><strong>${data.title}</strong></div>
<div class="detailtext">${data.description}</div>`;
reportDescContainer.innerHTML = output;


output = `<div class="detailheading"><strong>Location</strong></div>
<div class="detailtext">${data.address}</div>
<div class="map1" id="map1"></div>`;
reportLocContainer.innerHTML += output;










/**************************************************/
/*********************Map View *******************/
/**************************************************/
// Map View
let center=[data.longitude,data.latitude];
function map()
       {
           console.log('center: '+center)
        const map= tt.map({
       key:'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
       container: 'map1',
       center:center,
       zoom:10
       // style:'tomtom://vector/1/basic-main'
   });
       }
 
console.log("Calling Map");
map();
console.log("Map Called");

       
       
console.log(`Map Data ${center}`);
localStorage.removeItem('Report');


/*let mapView=document.getElementById('mapView')
let searchDiv=document.getElementById('search1')
let mapDiv=document.getElementById('map1')

mapView.addEventListener('click',()=>{
  
console.log('map View clicked')
    if(searchDiv.style.display==='none'&&mapDiv.style.display==='none')
    {
        mapView.innerHTML=''
        searchDiv.innerHTML=''
        const container=document.getElementById('cards')
        container.innerHTML=''
        searchDiv.style.display='inline'
        mapDiv.style.display='inline'
    }
    else{
        searchDiv.style.display='none'
        mapDiv.style.display='none'
    }


  
//search bar
var options = {
           searchOptions: {
               key: 'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
               language: 'en-GB',
               limit: 5
           },
           autocompleteOptions: {
               key: 'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
               language: 'en-GB'
           }
       };
       var ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
       var searchBoxHTML = ttSearchBox.getSearchBoxHTML();  
       document.getElementById('search').prepend(searchBoxHTML);
       ttSearchBox.on('tomtom.searchbox.resultsfound', function (data) {
           console.log(data);

       });
       searchBoxHTML.addEventListener('click', () => {
           let value = ttSearchBox.getValue();
           try {
               if (value !== '') {
                   // save lat and long in dastabase
                   function callbackFn(result) {
                       console.log(result.results[0].position.lng);
                       console.log(result.results[0].position.lat);

                      let long = result.results[0].position.lng;
                      let lat = result.results[0].position.lat;
                       center=[long,lat]
                       console.log('long: ' + long)
                       console.log('center ' + center)
                       map();
                       getReportsForMapView(long,lat)

                   };
                   tt.services.geocode({
                       key: 'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
                       query: value
                   }).then(callbackFn);

               }
           }
           catch (e) {
               console.log(`error:` + e)
           }

       });
     
       function map()
       {
           console.log('center: '+center)
        const map= tt.map({
       key:'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
       container: 'map',
       center:center,
       zoom:10
       // style:'tomtom://vector/1/basic-main'
   });
       }
 
       map();

    });

    //show result of mapview
    // get reports
async function getReportsForMapView(long,lat) {
    let categories = await getCategories('categories')
    const container = document.getElementById('cards')
    let output = '';
    for (let report of categories.values()) {
   console.log('fix '+Number(report.latitude).toFixed(1).toString())
   console.log('id '+report.title)

      if (lat.toFixed(1).toString()===report.latitude.toFixed(1).toString() &&
      long.toFixed(1).toString() === long.toFixed(1).toString()) {
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
      }
    }
    // show output
    container.innerHTML = output;
  }*/