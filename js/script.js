// Pobieramy potrzebne dane, na których będziemy operować

const form = document.querySelector(".main-form");
const value = document.querySelector("#value");
const select = document.querySelector("#main-select");
const option = document.querySelectorAll("option");
const btn = document.querySelector("#main-submit");
const calculateValue = document.querySelector(".sumbit-value");
let selectedCurrency = "eur";

// Funkcja do pobierania wybranej opcji (waluty) przez użytkownika
const getCurrency = () => {
  selectedCurrency = select.options[select.selectedIndex].value;
  return selectedCurrency;
}

// Funkcja pobierająca aktualny kurs danej waluty, przeliczająca ją na złotówki i wyświetlająca wynik końcowy
const calculatedCurrency = (e) => {
  e.preventDefault();
  const currency = getCurrency();
  const url = `http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentCurrencyCurse = data.rates[0].mid;
      const calculate = Number(Math.round(`${currentCurrencyCurse * value.value}` + 'e+2') + 'e-2');
      calculateValue.innerText = calculate;
    });
}


select.addEventListener("change", getCurrency);
form.addEventListener("submit", calculatedCurrency);