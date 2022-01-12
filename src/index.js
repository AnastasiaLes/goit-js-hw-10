import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountry } from './fetchCountry.js'
const DEBOUNCE_DELAY = 300;

var debounce = require('lodash.debounce');

const input = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const oneCountry = document.querySelector('.country-info');


input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY) );

function onInput(event) {
    const name = event.target.value;
   fetchCountry(name)
    .then(renderCountry)
    .catch(onFetchError) 
}

function renderCountry(country) {
    if (country.length > 1 && country.length < 10) {
               oneCountry.innerHTML = ''; 
               const countryMarkup = country.map(({ name, flags }) => 
                   `<li style = "display: flex; align-items: center;"><img src = "${flags.png}" alt = "${name.official}" width = "30" > 
                    <p style = "margin: 5px 0 5px 10px;"> ${name.official} </p> </li>`)
                    .join('');
               countryList.innerHTML = countryMarkup;
                console.log(country);
                console.log(country.length);
           }
            else if (country.length <= 1) {
               countryList.innerHTML = '';
               const oneCountryMarkup = country.map(({name, capital, flags, languages, population}) => 
                   `<div style = "display: flex; align-items: center;"> 
                    <img style="margin-right: 10px;" src = "${flags.png}" alt = "${name.official}" width = "30"> 
                    <h2> ${name.official} </h2> </div>
                    <p> <strong> Capital: </strong> ${capital}</p>
                    <p> <strong>Population: </strong> ${population}</p>
                    <p> <strong>Languges: </strong> ${Object.values(languages)}</p>`)
                   .join('');
               oneCountry.innerHTML = oneCountryMarkup;
               console.log("One country!!!")
               console.log(country);
            }
           else {
               countryList.innerHTML = '';
               oneCountry.innerHTML = ''; 
               Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
               console.log("Too many matches found. Please enter a more specific name.")
           }
}

function onFetchError(error) {
    countryList.innerHTML = '';
    oneCountry.innerHTML = ''; 
    console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
}