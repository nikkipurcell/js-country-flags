// Using 2 different APIs
const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
      return res.json();
    })
}

const whereAmI = function(lat, lng) {
  getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`, 'Problem w geocoding')
    .then(data => {
      console.log('data1', data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return getJSON(`https://restcountries.eu/rest/v2/name/${data.country}`, 'Country not found')
    })
    .then(data => {
      console.log('data2', data[0]);
      renderCountry(data[0])
    })
    .catch(err => console.error(`${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
      btn.style.opacity = 0;
    })
}

btn.addEventListener('click', function() {
  whereAmI('52.508', '13.381');
})
