import { Input, Radio, Select, Table } from "antd";
import { parse, unparse } from "papaparse";
import React, { useState } from "react";
import { toast } from "react-toastify";
 import image from "../../assets/search.svg";




const TransactionsTable = ({ transactions, addTransaction, fetchTransactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransactions = transactions.filter((transaction) => {
    if (
      transaction.name.toLowerCase().includes(search.toLowerCase()) &&
      transaction.type.includes(typeFilter)
    ) {
      return transaction;
    }
  });

  let sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportCSV(){
    // let csv = unparse({
    //   fields: ["Name", "Type", "Tag", "Date", "Amount"],
    //   data: transactions,
    // })
    const csv = unparse(
  transactions.map((t) => ({
    name: t.name,
    type: t.type,
    tag: t.tag,
    date: t.date,
    amount: t.amount,
  }))
);

    const blob = new Blob([csv], { type: "text/csv;charset-ut-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCsv(event){
    event.preventDefault();
    try{
      parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          for(const transaction of results.data){
            if(transaction.amount != "" && transaction.type != "" && transaction.name != "" && transaction.date != "" && transaction.tag != ""){
              const newTransaction = {
                ...transaction,
                amount: parseFloat(transaction.amount),
              }
              await addTransaction(newTransaction, true);
            }
          }
        }
      })
      toast.success("All Transactions Added");
       fetchTransactions();
      event.target.files = null;
    }catch(err){
      toast.error(err.message);  
    }
  }

  return (
    <div style={{ width: "100%", padding: "0rem 2rem" }}>
      <div
        style={{
            width:'97%',
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={image} width="16" alt="image" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Seach by name"
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </div>
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>
          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort By Date</Radio.Button>
            <Radio.Button value="amount">Sort By Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportCSV}>Export to CSV</button>
            <label htmlFor="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              onChange={importFromCsv}
              required
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table dataSource={sortedTransactions} columns={columns} />
      </div>
    </div>
  );
};

export default TransactionsTable;