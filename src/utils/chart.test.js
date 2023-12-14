import { createChartData, transformData } from "./chart";

describe("Utils: transformData test", () => {
  const inputData = {
    housePrices: [{ value: 100 }, { value: 200 }, { value: 300 }],
    interestRates: [{ value: 1 }, { value: 2 }, { value: 3 }],
  };

  it("should transform data when normalized is true", () => {
    const expectedOutput = {
      housePrices: [0, 0.5, 1],
      interestRates: [0, 0.5, 1],
    };

    const result = transformData(inputData);
    expect(result).toEqual(expectedOutput);
  });

  it("should transform data without normalization when normalized is false", () => {
    const expectedOutput = {
      housePrices: [100, 200, 300],
      interestRates: [1, 2, 3],
    };

    const result = transformData(inputData, false);
    expect(result).toEqual(expectedOutput);
  });

  it("should throw an exception if min and max values are equal and normalization is set to true", () => {
    const inputData = {
      housePrices: [{ value: 100 }, { value: 100 }, { value: 100 }],
      interestRates: [{ value: 1 }, { value: 2 }, { value: 3 }],
    };

    expect(() => {
      transformData(inputData, true);
    }).toThrow("Minimum and maximum values are equal. Division by zero.");
  });
});

describe("Utils: createChartData test", () => {
  it("should create chart data with given data and labels", () => {
    const chartData = {
      housePrices: [0.2, 0.4, 0.6],
      interestRates: [0.1, 0.3, 0.5],
    };
    const labels = [2015, 2016, 2017];

    const expectedChartData = {
      labels,
      datasets: [
        {
          label: "Ceny mieszkań",
          data: chartData.housePrices,
        },
        {
          label: "Stopy procentowe",
          data: chartData.interestRates,
        },
      ],
    };

    const result = createChartData(chartData, labels);
    expect(result).toEqual(expectedChartData);
  });
});
