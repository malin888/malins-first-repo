//DOM CONTENT LOAD
window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

//GDP Data loading
let GDPData= await d3.csv("Assets/data/GDPwithCC.csv", (d)=>{
    return d
})

//Filtering out the GDP data without 2 digit codes:

GDPDataFiltered = GDPData.filter(
    d => d.code2Digits !== ""
)


// //Creating the list of billionaires add adding interactivity to list of names:

    //Forbes NAMES Dataloading
async function summarisenames(){
    return await d3.csv("Assets/data/ForbesByName.csv", (d)=>{
        return d})
    
}

let ForbesByName = await summarisenames()

    let people = ForbesByName.map((d) => {
        return d[0];
      })


var list = document.getElementById('BillList');

people.map(d=> {
    var Billname = d
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(Billname));
    list.appendChild(entry);


    entry.addEventListener("click", respondClick);
    entry.addEventListener("mouseover", respondMouseOver);
    entry.addEventListener("mouseout", respondMouseOut);

    function respondClick(event) {
        // document.documentElement.style.setProperty("--c-size", DataForZambia[0]["TotalGDP"])
        document.documentElement.style.setProperty("--bill-size", '200px')
    }
    function respondMouseOver(event) {
        entry.style.background = "#8441ae"
        entry.style.padding = "18px"
    
    }
    
    function respondMouseOut() {
        entry.style.background = "rgba(211, 211, 211, 0.294)"
        entry.style.padding = "15px"
       
    }


})
      

    


// Adding heatmap and hover opacity function


// defining colorscale for heatmap
colorscale= d3.scaleLog().domain([737, 125000]).range(["#160a01", "hsl(25, 100%, 93%)"])

//defining size scale for circles

sizescale= d3.scaleLinear().domain([4400000,23266768927430]).range([0, 500])

GDPDataFiltered.map(d => {

    let countrySVG = document.querySelector('#' + d.code2Digits)



    function respondMouseOver(event) {
        countrySVG.style.opacity = "50%"

        tooltip.style.top = event.clientY + 10 + 'px' ;
        tooltip.style.left = event.clientX + 10 + 'px';
         tooltip.classList.add('show');
         const countryname = tooltip.querySelector('#CountryNamePopUp');
         countryname.innerText = (d.Country)
         const population = tooltip.querySelector('#CountryPopulation');
         population.innerText = ("Population:" + d.population)
         const perCapita = tooltip.querySelector('#GDPPerCapita');
         perCapita.innerText = ("GDP per Capita:" + d.Value)
    }
    
    function respondMouseOut() {
        countrySVG.style.opacity = "100%"
        tooltip.classList.remove('show');

       
    }
    function respondClick(event) {
        // document.documentElement.style.setProperty("--c-size", DataForZambia[0]["TotalGDP"])
        
        document.documentElement.style.setProperty("--country-size", sizescale(d.TotalGDP) + 'px')
        console.log(d.Value * 100000000000000000000)

        //Experimenting with adding another circle
        // document.documentElement.style.setProperty("--pc-size", sizescale(d.Value *100000000) + 'px')
    }

    if(countrySVG){
        countrySVG.style.fill = colorscale(d.Value)

        //adding hover

        countrySVG.addEventListener("mouseover", respondMouseOver);
        countrySVG.addEventListener("mouseout", respondMouseOut);
        countrySVG.addEventListener("click", respondClick);
    }else{
        
    }
})


//scaling the forbes networth data so it's in billions


ForbesByName.map(d=>{
    // console.log(d[1])
})








//Attempting d3zoom

function handleZoom(e) {
    d3.select('#svgzoom')
      .attr('transform', e.transform);
  }
  
  let zoom = d3.zoom()
    .on('zoom', handleZoom)

    .scaleExtent([2, 3])
    .translateExtent([[0,0], [8000,8000]]);
  
  d3.select('#theMapSVG')
    .call(zoom);






//Workin on the graph with chart js

// const CHART = document.getElementById("lineChart")

// console.log(CHART)

// let lineChart = new Chart

}); //Close DOM