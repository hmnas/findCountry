let countryContainer = document.querySelector('.container')
let neighbourR = document.querySelector('.neighbour')
let neighbourR2 = document.querySelector('.neighbour2')
let country = prompt('Enter Country')
function getCountry(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {
            renderCountry(data[0])
            console.log(data)

            const neighbour = data[0].borders[0];
            const neighbour2 = data[0].borders[1]
            if (neighbour) {

                fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
                    .then(response => response.json())

                    .then(data => renderCountry(data[0], 'neighbour'))
            }
            if (neighbour2) {

                fetch(`https://restcountries.com/v3.1/alpha/${neighbour2}`)
                    .then(response => response.json())

                    .then(data => renderCountry(data[0], 'neighbour2'))
            }
        })
        .catch((err) => {
            alert('Country is not correct', err)
        })


}
getCountry(country)
function renderCountry(data, className = ' ') {
    let html = `
    <div class="country">
    <div class="country-flag">
        <img src='${data.flags.svg}'
            alt="flag">
    </div>
    <div class="country-data">
        <div>
            <p class="country-name">${data.name.common}</p>
            <p class="country-region">${data.region}</p>
        </div>
        <p class="country-lang row"> ${Object.values(data.languages).join(',')}</p>
        <p class="country-currency row"> ${Object.values(data.currencies)[0].name}</p>
        <p class="country-capital row">${data.capital}</p>

    </div>
</div>`
    countryContainer.insertAdjacentHTML('beforeend', html)
}
