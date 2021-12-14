// // variables

const showBtn = document.querySelector(".filter__icon");
const searchBtn = document.querySelector(".search__icon");
const regionContainer = document.querySelector(".filter__values");
const countriesContainer = document.querySelector(".countries__container");
const toggle = document.querySelector(".mode-label");
const checkbox = document.querySelector(".checkbox");
const header = document.querySelector(".header");
const filterItems = document.querySelectorAll(".filter__item");
const currentFilter = document.querySelector(".filter__text span");
const searchInput = document.querySelector(".search__input");
const toTopBtn = document.querySelector("#to-top") ; 

// dark / light Mode
function toggleMode() {
  let rootElement = document.documentElement;
  rootElement.classList.toggle("light");
}

// Expand List
function showItem() {
  showBtn.classList.toggle("open");
  let listItemsNbr = regionContainer.childElementCount;
  let listHeight =
    regionContainer.firstElementChild.offsetHeight * listItemsNbr +
    (12 * listItemsNbr - 1) +
    30; // 12px margin-bottom + 30px padding
  regionContainer.classList.toggle("hide");
  if (!regionContainer.classList.contains("hide")) {
    regionContainer.style.setProperty("--list-height", `${listHeight}px`);
  } else {
    regionContainer.style.setProperty("--list-height", `0px`);
  }
}


// to top button 

  window.onscroll = ()=>{
    if(this.scrollY >=1000){
        toTopBtn.classList.remove("hide");
    }else{
        toTopBtn.classList.add("hide");
    }
  }
  function scrollToTop(){
    window.scrollTo({
      left:0 , top:0, behavior:"smooth"
  })
}
    


// Get Data from api

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    const poopIndex = data.findIndex((c) => c["cca3"] == "ISR");
    data.splice(poopIndex, 1); // Remove Non-country from api
    // console.log(data[25]);
    let randomCountry = new Set().add(data[25]); // Tunisia
    while (randomCountry.size < 200) {
      let randomIndex = Math.floor(Math.random() * data.length + 1);
      randomCountry.add(data[randomIndex]);
    }
    randomCountry.forEach((c) => {
      const html = `
        <div class="country-box" data-region="${c?.region}" data-country="${
        c?.name?.common
      }">
            <img src="${c?.flags?.svg}"
                alt="flag" class="country__flag">
            <div class="country__info">
                <div class="country__name">${c?.name?.common}</div>
                <div class="country__population">Population : <span>${
                  c?.population
                } </span>🙍‍♂️</div>
                <div class="country__region">Region : <span>${
                  c?.region
                }</span> <i class="fas fa-globe-${c?.region.toLowerCase()}"></i></div>
                <div class="country__capital">Capital : <span>${
                  c?.capital
                }</span> 🏠</div>
            </div>
        </div>
    `;

      countriesContainer.insertAdjacentHTML("beforeend", html);
    });
    const countries = document.querySelectorAll(".country-box");
    filter([...countries]);
    // search([...countries]);
    
  }); 
function filter(countries){
  let filtredByRegion;
  let filtredBySearch;


  // filter by region 
  filterItems.forEach((item) => {
        item.addEventListener("click", () => {
          region = item.dataset.region;
          currentFilter.textContent = region;
    
          // close List
          showBtn.classList.remove("open");
          regionContainer.classList.add("hide");
          regionContainer.style.setProperty("--list-height", `0px`);
          // Filter
          filtredByRegion =  countries.filter((c)=>  c.dataset.region == region || region=="All")
          show(countries , filtredByRegion,filtredBySearch ?? filtredByRegion)
        })
    
})

// filter by search
searchInput.addEventListener("input",()=>{
  if(searchInput.value.length> 0){
    filtredBySearch  =  countries.filter((c)=> c.dataset.country.toLowerCase().includes(searchInput.value.toLowerCase()))
  }else{
    filtredBySearch = countries ; 
  }
  show(countries , filtredByRegion ?? filtredBySearch,filtredBySearch)
})
}


function show(countries,arr1,arr2){
   countries.forEach((c)=> arr2.indexOf(c) == -1 || arr1.indexOf(c) == -1 ? c.classList.add("hide") : c.classList.remove("hide") ) ; 
}


/*


First Try 

// function filterAndShow(countries) {
//   let region;
//   filterItems.forEach((item) => {
//     item.addEventListener("click", () => {
//       region = item.dataset.region;
//       currentFilter.textContent = region;

//       // close List
//       showBtn.classList.remove("open");
//       regionContainer.classList.add("hide");
//       regionContainer.style.setProperty("--list-height", `0px`);
//       // SEARCH

//       // filter
//       countries.forEach((c) => {
//         if (c.dataset.region == region || region == "All") {
//           c.classList.remove("hide");
//         } else {
//           c.classList.add("hide");
//         }
//       });
//     });
//   });
// }

// function searchAndShow(countries) {
//   const filtredCountries = countries.filter(
//     (c) => !c.classList.contains("hide")
//   );
//   searchInput.addEventListener("input", (e) => {
//     filtredCountries.forEach((c) => {
//       if (e.currentTarget.value.length >= 1) {
//         if (
//           !c.dataset.country
//             .toLowerCase()
//             .includes(e.currentTarget.value.toLowerCase())
//         ) {
//           c.classList.add("hide");
//         } else {
//           c.classList.remove("hide");
//         }
//       } else {
//         c.classList.remove("hide");
//       }
//     });
//   });
// }

*/