import { useEffect, useState } from 'react'
import './App.css'
import IncomeModal from './components/IncomeModal'
import ExpenseModal from './components/ExpenseModal';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [income, setIncome] = useState(() => {
    const storedincome = JSON.parse(localStorage.getItem("income"));
    return (storedincome) ? storedincome : 0;
  });
  const [expenses, setExpenses] = useState(() => {
    const storedexpenses = JSON.parse(localStorage.getItem("expenses"));
    return (storedexpenses) ? storedexpenses : [];
  });
  const [balance, setBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isIncomModalOpen, setIsIncomModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const deleteNotify = () => toast.success("Successfully deleted !", {
    transition: Flip,
    autoClose: 500,
    pauseOnHover: true,
  });


  const openIncomModal = () => {
    setIsIncomModalOpen(true);
  };

  const handleIncomModalClose = () => {
    setIsIncomModalOpen(false);
  };

  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };

  const handleIncome = (amount) => {
    setIncome(income + +amount);
    handleIncomModalClose();
  }

  const addExpense = (expeseObj) => {
    const newExpAr = [...expenses, expeseObj];

    setBalance(income - expeseObj.expense)
    setExpenses(newExpAr);
  }
  const delitem = (index) => {
    if (window.confirm("do you want to del this obj")) {
      const newItems = expenses.filter((exp, i) => i != index);
      setExpenses(newItems);
      deleteNotify();
    }
  }

  useEffect(() => {
    let totalExp = 0;
    expenses.forEach((exp) => {
      totalExp += +exp.expense;
    });
    setBalance(income - totalExp);
    setTotalExpense(totalExp);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("income", JSON.stringify(income));
  }, [expenses, income])

  return (
    <>
      <div className='container'>
        <div className='bg-dark text-white p-3'>
          <h1 className='text-center mb-5'>Expense Tracker</h1>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <h3>Amount In</h3>
              <h5 className='text-success'>${income}</h5>
              <button className='btn btn-success' onClick={openIncomModal}>Add Income</button>

              <IncomeModal handleIncome={handleIncome} isIncomModalOpen={isIncomModalOpen} handleIncomModalClose={handleIncomModalClose} />

            </div>

            <div className='col-md-4 text-center'>
              <h3>Expenses</h3>
              <h5 className='text-warning'>${totalExpense}</h5>
            </div>

            <div className='col-md-4 text-center'>
              <h3>Balance</h3>
              <h5 className='text-danger'>${balance}</h5>
              <button className='btn btn-danger' onClick={openExpenseModal}>Add Expense</button>
              <ExpenseModal addExpense={addExpense} setIsExpenseModalOpen={setIsExpenseModalOpen} isExpenseModalOpen={isExpenseModalOpen} closeExpenseModal={closeExpenseModal} />
            </div>
          </div>
        </div>
        <div className='p-3 bg-white'>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>action </th>
              </tr>
            </thead>
            <tbody>
              {
                expenses.map((exp, i) => {
                  return (
                    <tr key={i}>
                      <td>{exp.date}</td>
                      <td>{exp.detail}</td>
                      <td>{exp.category}</td>
                      <td>${exp.expense}</td>
                      <td>
                        <button onClick={() => { delitem(i) }} className="btn btn-danger">Del</button>

                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
