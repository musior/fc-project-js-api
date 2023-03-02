// Pobieramy potrzebne dane, na których będziemy operować

const form = document.querySelector(".main-form");
const value = document.querySelector("#value");
const select = document.querySelector("#main-select");
const option = document.querySelectorAll("option");
const btn = document.querySelector("#main-submit");
const calculateValue = document.querySelector(".sumbit-value");
let selectedCurrency = "eur";

const urlChf = "http://api.nbp.pl/api/exchangerates/rates/a/chf/";
const urlUsd = "http://api.nbp.pl/api/exchangerates/rates/a/usd/";
const urlEur = "http://api.nbp.pl/api/exchangerates/rates/a/eur/";

const getCurrency = () => {
  selectedCurrency = select.options[select.selectedIndex].value;
  console.log(selectedCurrency);
  return selectedCurrency;
}

select.addEventListener("change", getCurrency);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(urlEur)
  .then((response) => response.json())
  .then((data) => {
    const currentCurrencyCurse = data.rates[0].mid;
    console.log(currentCurrencyCurse * value.value);
    calculateValue.innerText = `${currentCurrencyCurse * value.value}`;
  });
})