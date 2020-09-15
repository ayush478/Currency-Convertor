import React from "react";

export const CurrencyRow = ({
  currencyOption,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount
}) => {
  return (
    <div>
      <input type="number" name="" id="" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOption.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
