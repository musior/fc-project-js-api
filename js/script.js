// Pobieramy potrzebne dane, na których będziemy operować

const form = document.querySelector(".main-form");
const inputValue = document.querySelector("#value");
const select = document.querySelector("#main-select");
const btn = document.querySelector("#main-submit");
const resultCalculate = document.querySelector(".main-currency-convertion");

// Funkcja tworząca loader
const loaderCreate = () => {
  const ldsRing = document.createElement("div");
  ldsRing.classList.add("lds-ring");
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    ldsRing.appendChild(div);
  }
  resultCalculate.appendChild(ldsRing);
  return ldsRing;
}

// Funkcja pobierająca aktualny kurs danej waluty, przeliczająca ją na złotówki i wyświetlająca wynik końcowy
const calculatedCurrency = (e) => {
  e.preventDefault();
  resultCalculate.innerHTML = "";
  const currency = select.options[select.selectedIndex].value;
  const url = `http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`;

  loaderCreate();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentCurrencyCurse = data.rates[0].mid;
      const calculate = Number(Math.round(`${currentCurrencyCurse * inputValue.value}` + 'e+2') + 'e-2');
      setTimeout(() => {
        resultCalculate.innerHTML = "";
        const p = document.createElement("p");
        resultCalculate.appendChild(p);
        p.innerHTML = `It is <span class="sumbit-value">${calculate}</span>PLN.`;
      }, 1500);
    });
}

form.addEventListener("submit", calculatedCurrency);