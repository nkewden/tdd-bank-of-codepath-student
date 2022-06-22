import * as React from "react";
import { useHref } from "react-router-dom";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import { useEffect } from "react";
import axios from "axios";

export default function Home({
  transactions,
  setTransactions,
  transfers,
  setTransfers,
  error,
  setError = () => {},
  isLoading,
  setIsLoading = () => {},
  filterInputValue,
  isCreating,
  setIsCreating,
  newTransactionForm,
  setNewTransactionForm
}) {
  async function getTransactions() {
    axios
      .get("http://localhost:3001/bank/transactions")
      .then((res) => {
        setTransactions(res.data.transactions);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }

  async function getTransfers() {
    axios
      .get("http://localhost:3001/bank/transfers")
      .then((res) => {
        setTransfers(res.data.transfers);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      getTransactions();
      getTransfers();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  let filteredTransactions = transactions;

  if (filterInputValue != "" && filteredTransactions != null) {
    console.log(transactions);
    // filteredTransactions = filteredTransactions.filter(transactions) => {transactions.description.toLowerCase().includes(filterInputValue.toLowerCase())}
  }

  //  async function handleOnSubmitNewTransaction()

  return (
    <div className="home">
      <AddTransaction isCreating={isCreating} setIsCreating={setIsCreating} form={newTransactionForm} setForm={setNewTransactionForm}/>
      {isLoading ? <h1>Loading...</h1> : <BankActivity />}

      {error !== "" ? <h2 className="error">{error}</h2> : null}
    </div>
  );
}
