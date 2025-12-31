import React from "react";
import { GiNinjaStar } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";  
import {RiDeleteBin6Line} from "react-icons/ri";

// import {ReactStars} from "react-icons"
function Wishlist(){

    function handleBuyCourse(){
        const courses=cart.map((course)=>course._id)
        console.log("Bought courses",courses);
    }
   
   const dispatch=useDispatch();
    const {cart}=useSelector((state)=>state.cart);
    const {removeFromCart}=useSelector((state)=>state.cart);
    const {total}=useSelector((state)=>state.cart);
    const {totalItems}=useSelector((state)=>state.cart);
    return(
        <div className="maincart">
           <h1>Your Cart</h1>

           <p>{totalItems} Courses in Cart</p>

           {
            total>0 ?( <div>
           
       
            {
                cart.map((course,index)=>(
                   

                   <div>

                   <div>
                        <img src={course?.thumbnail}></img>
                   </div>

                     <p>{course?.courseName}</p>
                     <p>{course?.category?.name}</p>
                    
                    <div>
                        <span>4.4</span>
                        {/* <ReactStars
                        count={5}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<GiNinjaStar/>}
                        fullIcon={<GiNinjaStar/>}
                        /> */}
                    <span>{course?.rateReveiw.length}</span>
                    </div>

                   
                    
 
            <div>
                <button onClick={()=>dispatch(removeFromCart(course._id))}>
                  <RiDeleteBin6Line/>
                   <span>Remove</span>
                </button>

                <p>{course?.price}</p>
            </div>

        </div>
                ))
            }
        


          <div>
                <div>Toatl:</div>
                <div>Rs {total}</div>

              <button onClick={handleBuyCourse()}>
                   Buy Now
              </button>

          </div>

          </div>
            ):(<p>Your Cart is empty</p>)
        }
    {/* </div> */}
        </div>
    )

}
export default Wishlist;