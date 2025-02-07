document.addEventListener("DOMContentLoaded", () => {
    const regionSelect = document.getElementById("region-select");
    const countryListContainer = document.getElementById("region-country-list");
    const modal = document.getElementById("country-modal");
    const closeModal = document.querySelector(".close");

    async function getCountriesByRegion(region) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error("Error al obtener países por región:", error);
        }
    }

    function displayCountries(countries) {
        countryListContainer.innerHTML = ""; 
        if (countries.length === 0) {
            countryListContainer.innerHTML = "<p>No se encontraron países.</p>";
            return;
        }

        countries.forEach(country => {
            const countryElement = document.createElement("div");
            countryElement.classList.add("country-item");
            countryElement.innerHTML = `
                <p><strong>${country.name.common}</strong></p>
                <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" width="100">
            `;

            countryElement.addEventListener("click", () => displayCountryDetails(country));

            countryListContainer.appendChild(countryElement);
        });
    }

    function displayCountryDetails(country) {
        document.getElementById("modal-country-name").textContent = country.name.common;
        document.getElementById("modal-capital").textContent = country.capital ? country.capital.join(", ") : "N/A";
        document.getElementById("modal-area").textContent = country.area || "N/A";
        document.getElementById("modal-population").textContent = country.population || "N/A";
        document.getElementById("modal-density").textContent = country.area ? (country.population / country.area).toFixed(2) : "N/A";
        document.getElementById("modal-currency").textContent = country.currencies ? Object.values(country.currencies)[0].name : "N/A";
        document.getElementById("modal-languages").textContent = country.languages ? Object.values(country.languages).join(", ") : "N/A";
        document.getElementById("modal-continent").textContent = country.continents ? country.continents.join(", ") : "N/A";
        document.getElementById("modal-flag").src = country.flags.svg || "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg";

        modal.style.display = "flex";
    }

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    regionSelect.addEventListener("change", () => {
        const selectedRegion = regionSelect.value;
        if (selectedRegion) {
            getCountriesByRegion(selectedRegion);
        } else {
            countryListContainer.innerHTML = "";
        }
    });
});

