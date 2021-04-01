# js-country-flags

This app uses the RESTCountries API to find a country and it's neighbor country and display both of their flags in the UI.

## How Its Done

It uses the fetch api to get a data response then based on the result of that data, does another fetch to find the neighbor country.

### FetchExample1.js

This is a full demo of how I used the fetch api and the steps that followed.

### script.js

This is the final refactored script that abstracted out the fetch and first then method (w/error handling). Since we repeated the code it was removed and put into a new function called getJSON. That greatly reduced the lines of code.

