'use strict';

const btn = document.querySelector('.btn-country-two');
const input = document.querySelector('.input-country-two');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function(data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
}

///////////////////////////////////////

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}
///////////////////////////////////////

// In this fetch example:
// first the fetch returns a promise
// we handle that promise using the then method
// to read the data from response we need to call the json method on the res obj
// the return line will also return a promise from the then method
// we handle the return promise using the 2nd then method

const getCountryAndNeighbor = function(country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => { // this repeatable code can be abstracted to a func
      if (!response.ok)
        throw new Error(`First Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      if(!neighbor) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`)
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Second Country not found (${response.status})`);

        return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong! ${err.message}. Try again!`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
};

btn.addEventListener('click', function() {
  getCountryAndNeighbor(input.value.trim());
});
