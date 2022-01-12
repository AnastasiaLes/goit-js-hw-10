

function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        return response.json();
    })
       .then(country => {
           if (country.length < 10) {
            console.log(country);
           console.log(country.length);
        }
           else {
               Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
               console.log("Too many matches found. Please enter a more specific name.")
           }
    })

    .catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
    }) 

};