document.addEventListener("DOMContentLoaded", () => {
    // Obtener los elementos del DOM
    const countryInput = document.getElementById("country-input");
    const searchBox = document.getElementById("search-box");
    const countryDetailsElem = document.getElementById("country-details");
    const countryName = document.getElementById("country-name");
    const capitalTxt = document.getElementById("capital-city");
    const areaTxt = document.getElementById("area");
    const populationTxt = document.getElementById("population");
    const densityTxt = document.getElementById("pop-density");
    const currencyTxt = document.getElementById("currency");
    const languagesTxt = document.getElementById("languages");
    const continentTxt = document.getElementById("continent");
    const flagImg = document.getElementById("flag");
    const errTxt = document.getElementById("errorTxt");
    
    // Función para obtener la lista de países
    async function getCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            displayCountryList(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    // Función para buscar un país por nombre
    async function getCountryByName(countryName) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            const data = await response.json();
            return data[0]; // Devuelve el primer país encontrado
        } catch (error) {
            console.error('Error fetching country by name:', error);
        }
    }

    // Función para mostrar los detalles de un país
    function displayCountryDetails(country) {
        countryName.textContent = country.name.common;
        capitalTxt.textContent = country.capital ? country.capital.join(", ") : "N/A";
        areaTxt.textContent = country.area || "N/A";
        populationTxt.textContent = country.population || "N/A";
        densityTxt.textContent = (country.population / country.area).toFixed(2) || "N/A";
        currencyTxt.textContent = country.currencies ? Object.values(country.currencies)[0].name : "N/A";
        languagesTxt.textContent = country.languages ? Object.values(country.languages).join(", ") : "N/A";
        continentTxt.textContent = country.continents ? country.continents.join(", ") : "N/A";
        flagImg.src = country.flags.svg || "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg"; // Default flag
        countryDetailsElem.classList.add("active");

        errTxt.style.display = 'none';  // Ocultar mensaje de error
    }

    // Función para mostrar la lista de países en el HTML
    function displayCountryList(countries) {
        const countryListContainer = document.getElementById("country-list");
        countryListContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar los nuevos países

        countries.forEach((country) => {
            const countryElement = document.createElement("div");
            countryElement.classList.add("country-item");
            countryElement.textContent = country.name.common;
            countryElement.addEventListener("click", () => displayCountryDetails(country));
            countryListContainer.appendChild(countryElement);
        });
    }

    // Manejar la búsqueda de países en el formulario del navbar
    const searchButton = document.querySelector("button[aria-label='search']"); // Seleccionamos el botón
    searchButton.addEventListener("click", async (e) => {
        e.preventDefault();  // Evita que el formulario se envíe de forma tradicional
        const countryNameValue = countryInput.value.trim();

        if (countryNameValue) {
            const country = await getCountryByName(countryNameValue);
            if (country) {
                displayCountryDetails(country);
            } else {
                errTxt.style.display = 'block';  // Mostrar mensaje de error
                errTxt.textContent = "Country not found!";
            }
        }
    });

    // Manejar la búsqueda de países en el formulario
    searchBox.addEventListener("submit", async (e) => {
        e.preventDefault();  // Evita que el formulario se envíe de forma tradicional
        const countryNameValue = countryInput.value.trim();

        if (countryNameValue) {
            const country = await getCountryByName(countryNameValue);
            if (country) {
                displayCountryDetails(country);
            } else {
                errTxt.style.display = 'block';  // Mostrar mensaje de error
                errTxt.textContent = "Country not found!";
            }
        }
    });

    // Llamar a la función para obtener la lista de países al cargar la página
    window.onload = () => {
        getCountries();
    };
});
