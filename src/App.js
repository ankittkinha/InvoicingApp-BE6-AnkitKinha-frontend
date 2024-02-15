import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import InvoiceList from './components/InvoiceList/InvoiceList';
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import InvoiceItems from "./components/InvoiceItems/InvoiceItems";
import ItemForm from "./components/ItemForm/ItemForm";
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<ProtectedRoute><InvoiceList /></ProtectedRoute>}>
        </Route>
        <Route path='newInvoice' element={<ProtectedRoute><InvoiceForm /></ProtectedRoute>}>
        </Route>
        <Route path='/:id' element={<ProtectedRoute><InvoiceItems /></ProtectedRoute>}>
        </Route>
        <Route path='/:id/newItem' element={<ProtectedRoute><ItemForm /></ProtectedRoute>}>
        </Route>
        <Route path='/user/signup' element={<RegisterPage />}>
        </Route>
        <Route path='/user/login' element={<LoginPage />}>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
