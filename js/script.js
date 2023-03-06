// Pobieramy potrzebne dane, na których będziemy operować

const form = document.querySelector(".main-form");
const value = document.querySelector("#value");
const select = document.querySelector("#main-select");
const option = document.querySelectorAll("option");
const btn = document.querySelector("#main-submit");
const calculateValue = document.querySelector(".sumbit-value");
const divCalculate = document.querySelector(".main-currency-convertion");
const para = document.querySelector(".main-currency-convertion-para");
let selectedCurrency = "eur";

// Funkcja do pobierania wybranej opcji (waluty) przez użytkownika
const getCurrency = () => {
  selectedCurrency = select.options[select.selectedIndex].value;
  return selectedCurrency;
}

// Funkcja pobierająca aktualny kurs danej waluty, przeliczająca ją na złotówki i wyświetlająca wynik końcowy
const calculatedCurrency = (e) => {
  e.preventDefault();
  divCalculate.innerHTML = "";
  const currency = getCurrency();
  const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/`;

  const ldsRing = document.createElement("div");
  ldsRing.classList.add("lds-ring");
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    ldsRing.appendChild(div);
  }
  divCalculate.appendChild(ldsRing);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentCurrencyCurse = data.rates[0].mid;
      const calculate = Number(Math.round(`${currentCurrencyCurse * value.value}` + 'e+2') + 'e-2');
      setTimeout(() => {
        divCalculate.innerHTML = "";
        const p = document.createElement("p");
        divCalculate.appendChild(p);
        p.innerHTML = `It is <span class="sumbit-value">${calculate}</span>PLN.`;
      }, 5000);
    });
}

select.addEventListener("change", getCurrency);
form.addEventListener("submit", calculatedCurrency);