import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import TransactionDetail from "../TransactionDetail/TransactionDetail";
import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState(null);
  const [filterInputValue, setfilterInputValue] = useState("");
  const [newTransactionForm, setNewTransactionForm] = useState({category : "", description : "", amount : 0});
  const [isCreating, setIsCreating] = useState("");

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          filterInputValue={filterInputValue}
          setFilterInputValue={setfilterInputValue}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  transactions={transactions}
                  setTransactions={setTransactions}
                  transfers={transfers}
                  setTransfers={setTransfers}
                  error={error}
                  setError={setError}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  filterInputValue={filterInputValue}
                  newTransactionForm = {newTransactionForm}
                  setNewTransactionForm={setNewTransactionForm}
                  isCreating = {isCreating}
                  setIsCreating = {setIsCreating}
                />
              }
            />
            <Route
              path="/transactions/:transactionId"
              element={<TransactionDetail />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
