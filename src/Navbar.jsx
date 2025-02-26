
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
        <div className="w-auto p-3 bg-black">
            <div className="container text-white xl fs-4  d-flex align-items-center justify-content-around">

              <NavLink to={'/'} className={'text-decoration-none text-dark text-white'}>
                Crud App
              </NavLink>

               
                <div className="text-white d-flex space-x-6 gap-5">
                  <NavLink to={'/'}  className={'text-decoration-none text-dark text-white'}>
                    Add Product
                  </NavLink>
                  <NavLink to={'/productdata'} className={'text-decoration-none text-dark text-white'}>
                    Product Data
                  </NavLink>
                </div>


            </div>
        </div>
    </div>
  )
}

export default Navbar