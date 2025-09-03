import React from "react";
import { Line, Pie } from "@ant-design/charts";

const ChartComponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let newSpendings = [
    { tag: "food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "office", amount: 0 },
  ];

  spendingData.forEach((item) => {
    if (item.tag === "food") {
      newSpendings[0].amount += item.amount;
    } else if (item.tag === "education") {
      newSpendings[1].amount += item.amount;
    } else if (item.tag === "office") {
      newSpendings[2].amount += item.amount;
    }
  });

  const config = {
    data: data,
    width: 750,
    height: 400,
    autoFit: false,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: newSpendings,
    width: 350,
    height: 400,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;

  return (
    <div className="charts-wrapper">
      <div>
        <h2>Your Analytics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div>
        <h2>Your Spendings</h2>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
};

export default ChartComponent;