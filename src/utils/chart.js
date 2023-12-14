export const createChartData = (transformedData, labels) => {
  const chartD = {
    labels,
    datasets: [
      {
        label: "Ceny mieszkań",
        data: transformedData.housePrices,
      },
      {
        label: "Stopy procentowe",
        data: transformedData.interestRates,
      },
    ],
  };
  return chartD;
};

export const transformData = (data, normalized = true) => {
  if (!normalized) {
    return {
      housePrices: data.housePrices.map((house) => house.value),
      interestRates: data.interestRates.map(
        (interestRate) => interestRate.value
      ),
    };
  }
  const housePricesArray = data.housePrices.map((obj) => obj.value);
  const interestRatesArray = data.interestRates.map((obj) => obj.value);

  const minHousePrice = Math.min(...housePricesArray);
  const maxHousePrice = Math.max(...housePricesArray);

  const minInterestRate = Math.min(...interestRatesArray);
  const maxInterestRate = Math.max(...interestRatesArray);

  return {
    housePrices: data.housePrices.map(
      (house) => (house.value - minHousePrice) / (maxHousePrice - minHousePrice)
    ),
    interestRates: data.interestRates.map(
      (interestRate) =>
        (interestRate.value - minInterestRate) /
        (maxInterestRate - minInterestRate)
    ),
  };
};
