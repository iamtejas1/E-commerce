
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './Navbar'
import { Home } from './Home'
import ProductData from './ProductData'
import EditProduct from './editProduct'



function App() {

  

  return (
    <>
      <Router>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/productdata' element={<ProductData/>}></Route>
          <Route path='/edit/:id'element={<EditProduct/>} ></Route>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
