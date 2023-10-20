import Footer from './components/Footer'
import Nav from './components/Nav'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import "../src/App.css"
import PrivateComponenet from './components/PrivateComponenet'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList'
import UpdateProduct from './components/UpdateProduct'


function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Nav/>
          <Routes>

            <Route element={<PrivateComponenet/>}>
              <Route path="/" element={<ProductList/>}/>
              <Route path="/add" element={<AddProduct/>}/>
              <Route path="/update/:id" element={<UpdateProduct/>}/>
              <Route path="/logout" element={<h1>From Logout components</h1>}/>
              <Route path="/profile" element={<h1>From Profile components</h1>}/>
            </Route>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
