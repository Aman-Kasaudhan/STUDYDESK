import Coupan from "./DashboardContent/Coupan"
import AllCourse from "./DashboardContent/Allcourse"
import StudentImageDashboard from "./DashboardContent/StudentImageDashboard"
import './StudentDasboard.css'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";

function StudentDasboard(){
  const {user}=useSelector( (state)=>state.profile)
  const {totalItems}=useSelector( (state)=>state.cart)
 
    return(
        <div className="studentDashboard">

       <div className="dashboard-top">

      <div className="dashboardcoupan">
            <Coupan/>
      </div>   
        
                {
                    user && user?.accountType!="Instructor" &&(
                        <Link to="/cart-items" className="carticon" title="Your Cart">
    <FaShoppingCart size={29} style={{ cursor: "pointer"}} className="we"/>
                           
                        {
                            totalItems>0&&(
                                <span className='cartNumberItem1'
                                >
                                    {totalItems}
                                </span>
                            )

                          }
                    </Link>
                    )
                }
                    
        <div className="userImage">
        <StudentImageDashboard/>
        </div>
 
       </div>

       <div className="AllCourses">
        <AllCourse/>
        {/* <CourseDetail/> */}
       </div>

       

</div>
    )
}
export default StudentDasboard