import './Navbar.css'
import { Link, matchPath, useLocation } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import { useSelector } from 'react-redux';
// import {OutlinesShoppingCart} from 'react-icons'

import { useEffect, useState } from 'react';
import InstructorDashboard from '../Dashboard/Instructor/InstructorImageDashboard';
import StudentImageDashboard from '../Dashboard/Student/DashboardContent/StudentImageDashboard';
import axios from 'axios';
function Navbar(){
    const {token}=useSelector( (state)=>state.auth);
    const accounttype=useSelector((state)=>state.profile.user.accountType);
    const {user}=useSelector( (state)=>state.profile)
    const {totalItems}=useSelector( (state)=>state.cart)
    const location=useLocation();
const [categories,setCategories]=useState([])

 useEffect(() => {
    axios.get("http://localhost:4000/api/v1/course/showCategory")
      .then(response => setCategories(response.data.allCategory || []))
      .catch(console.error);
  }, []);
 
    function Matchlocation(route){
    return matchPath({path:route},location.pathname)
    }


return(
        <div className='Navbar7'>
            <div className='Navbar71'>

              <nav className='Navbar72'>
            <Link to='/' className='studyImage'>StudyNotion</Link>
                <div className='Navbar73'>
                    {
                    NavbarLink.map( (link,index)=>{
                              return(
          <div key={index} className='Navbar74'>
                {
                    link.title==="Catalog" ?
                    (
                    <div className='catlog'  >
                        <p className='catlogtext'>{link.title}</p>
                        
                        <div className='catlogbox'>
                         

                                 <div className='catlogtri'>
                                 </div>
                             
                         {
                            categories.length >0 ?
             (
                categories.map((category)=>(
                 <Link to={`/catalog/${category._id}`}key={category._id} >
                     <p>{category.name}</p>
                             </Link>
                  ))
                       ):(<div>No items</div>)
                    }
             
                              </div>
                              </div>
    
                          
                         ):
                         (
                         <Link to={link?.path}>
                             <p className={ ` match ${ Matchlocation(link?.path)? 'active':''}`}>
                                
                                 {link.title}</p>
                         </Link>
                         )
                                      }
                                </div>
                            
                                                                                        
                            )
                            } 
                            )
                    }
                        
                </div>
                
            
              </nav>
              {/* Login/Signup */}
              
              {/* <div>
                {
                    user && user?.accountType!="Instructor" &&(
                        <Link to="/dashboard/cart" className=''>
                           
                        {
                            totalItems>0&&(
                                <span>
                                    {totalItems}
                                </span>
                            )

                          }
                    </Link>
                    )
                }
                    </div> */}
             
                <div  className={`auth-buttons ${token ? "hidden" : ""}`}>
  <Link to="/login"><button>Login</button></Link>
  <Link to="/signup"><button>Signup</button></Link>
</div>

             
              </div>
        </div>
    )
}
export default Navbar;