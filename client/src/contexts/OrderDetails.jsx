import * as React from "react";
import { pricePerItem } from "../constants";

const OrderDetails = React.createContext();

export function useOrderDetails() {
  const contextValue = React.useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetails Provider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = React.useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionsType) {
    const newOptionCounts = { ...optionCounts };

    newOptionCounts[optionsType][itemName] = newItemCount;

    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  function calculateTotal(optionsType) {
    const countsArr = Object.values(optionCounts[optionsType]);
    const totalCount = countsArr.reduce((total, value) => total + value, 0);
    return totalCount * pricePerItem[optionsType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
