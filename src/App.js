import React, { useEffect, useState } from "react";
import { CurrencyRow } from "./CurrencyRow";

import "./App.css";
const BASE_URL = " https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOption, setcurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  // console.log(currencyOption);
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const firstCurrency = Object.keys(data.rates)[0];
        setcurrencyOption([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Convert</h1>
        <CurrencyRow
          currencyOption={currencyOption}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => {
            setFromCurrency(e.target.value);
          }}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <h1 className="equals">=</h1>
        <CurrencyRow
          currencyOption={currencyOption}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => {
            setToCurrency(e.target.value);
          }}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </div>
  );
}

export default App;
