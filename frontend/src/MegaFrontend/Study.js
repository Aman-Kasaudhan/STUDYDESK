// import './Study.css'
// import { Routes, Route, Navigate } from 'react-router-dom'
// // import { useSelector } from 'react-redux'

// import Home from './reducer/pages/Home'
// import Login from './reducer/pages/Login'
// import Signup from './reducer/pages/Signup'
// import Contact from './reducer/pages/Contact'
// import NotFound from './reducer/pages/NotFound'
// import ForgetPassword from './reducer/pages/ForgetPassword'

// import UpdatePassword from './reducer/pages/UpdatePassword'
// import About from './reducer/pages/About'
// import Sidebar from './component/Dashboard/Sidebar'
// import MyProfile from './component/Dashboard/MyProfile'
// import EnrolledCourse from './component/Dashboard/EnrolledCourse'
// import Wishlist from './component/Dashboard/Wishlist'
// import AddCourse from './component/Dashboard/Instructor/Addcourse'
// import InstructorDashboard from './component/Dashboard/Instructor/InstructorDashboard'

// import Draft from './component/Dashboard/Instructor/Draft'
// import MyCourses from './component/Dashboard/Instructor/MyCourses'
// import CatalogPage from './common/Catlog'
// import StudentDasboard from './component/Dashboard/Student/StudentDasboard'
// import CourseDetail from './component/Dashboard/Student/CourseDetail'
// import Setting from './component/Dashboard/Setting'
// import { useSelector } from 'react-redux'
// import PublishForm from './component/Dashboard/Instructor/PublishForm'
// import CartItems from './component/Dashboard/Student/CartItem'
// import EditEmail from './component/Dashboard/Edit/EditEmail';
// import AllPayment from './component/Dashboard/Student/AllPayment'
// import SinglePayment  from './component/Dashboard/Student/SinglePayment'
// import PurchaseHistory from './component/Dashboard/Student/purchaseCourse'
// import GlobalLoader from './common/GlobalLoader'
// import EnrollFullCourse from './component/Dashboard/EnrollFullCourse'
// function Study() {
//   const token = useSelector((state) => state.auth.token);
//   const accounttype=useSelector((state)=>state.profile.user.accountType);
//   const loading = useSelector((state) => state.loader.loading);
//   return (
//     <div className='home'>
//       <GlobalLoader show={loading} />
//       <Routes>
//         {/* Redirect root "/" to dashboard if token is present, otherwise Home */}
//           {/* <Route path="/" element={ token ? (accounttype=="Instructor" ?<InstructorDashboard/> :<StudentDashboard/>):< Home/> } /> */}
//        <Route  path="/" element={<Home/>}/>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/forgetPassword" element={<ForgetPassword />} />
//         <Route path="/catalog/:id" element={<CatalogPage />} />

//         <Route path="/update-password/:token" element={<UpdatePassword />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/sidebar" element={<Sidebar />} />
//         <Route path="/dashboard/my-profile" element={<MyProfile />} />
//         <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse />} />
//         <Route path="/dashboard/wishlist" element={<Wishlist />} />
//         <Route path="/dashboard/add-courses" element={<AddCourse />} />
//         <Route path="/dashboard/draft" element={<Draft />} />
//         <Route path="/dashboard/my-courses" element={<MyCourses />} />
//         <Route path="/dashboardInstructor" element={<InstructorDashboard />} />
//         <Route path="/dashboardStudent" element={<StudentDasboard />} />
//         <Route path="/course-detail/:id" element={<CourseDetail />} />
//         <Route path="/cart-items" element={<CartItems />} />
//         <Route path="/dashboard/setting" element={<Setting/>}/>
//         <Route path='/dashboard/setting/edit-email' element={<EditEmail/>}/>
//         <Route path='/all-payment' element={<AllPayment/>} />
//         <Route path='/single-payment/:id' element={<SinglePayment/>} />
//         <Route path='/dashboard/purchase-history' element={<PurchaseHistory/>} />
//         <Route path='/course/:id' element={<EnrollFullCourse/>} />

//         {/* Catch-all for invalid routes */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default Study;



import './Study.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAutoLogout from './common/autoLogout'
import Home from './reducer/pages/Home'
import Login from './reducer/pages/Login'
import Signup from './reducer/pages/Signup'
import Contact from './reducer/pages/Contact'
import NotFound from './reducer/pages/NotFound'
import ForgetPassword from './reducer/pages/ForgetPassword'
import UpdatePassword from './reducer/pages/UpdatePassword'
import About from './reducer/pages/About'

import Sidebar from './component/Dashboard/Sidebar'
import MyProfile from './component/Dashboard/MyProfile'
import EnrolledCourse from './component/Dashboard/EnrolledCourse'
import Wishlist from './component/Dashboard/Wishlist'
import AddCourse from './component/Dashboard/Instructor/Addcourse'
import InstructorDashboard from './component/Dashboard/Instructor/InstructorDashboard'
import Draft from './component/Dashboard/Instructor/Draft'
import MyCourses from './component/Dashboard/Instructor/MyCourses'

import CatalogPage from './common/Catlog'
import StudentDasboard from './component/Dashboard/Student/StudentDasboard'
import CourseDetail from './component/Dashboard/Student/CourseDetail'
import Setting from './component/Dashboard/Setting'
import PublishForm from './component/Dashboard/Instructor/PublishForm'
import CartItems from './component/Dashboard/Student/CartItem'
import EditEmail from './component/Dashboard/Edit/EditEmail'
import AllPayment from './component/Dashboard/Student/AllPayment'
import SinglePayment from './component/Dashboard/Student/SinglePayment'
import PurchaseHistory from './component/Dashboard/Student/purchaseCourse'
import EnrollFullCourse from './component/Dashboard/EnrollFullCourse'

import GlobalLoader from './common/GlobalLoader'

// 🔐 route guards
import ProtectedRoute from './component/admin/ProtectedRoute'
import AdminRoute from './component/admin/AdminRoute'

// 👑 admin pages
import AdminDashboard from './component/admin/dashboard'
import Instructors from './component/admin/InstructorAdmin'
import Students from './component/admin/StudentAdmin'
import CreateCategory from './component/admin/createCategory'
function Study() {
  useAutoLogout();
  const loading = useSelector((state) => state.loader.loading);
  const token = useSelector((state) => state.auth.token);
  const accountType = useSelector(
    (state) => state.profile?.user?.accountType
  );
// console.log(token)
  return (
    <div className='home'>
      <GlobalLoader show={loading} />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path="/catalog/:id" element={<CatalogPage />} />


        {/* ================= PROTECTED ROUTES ================= */}
        <Route path="/sidebar" element={<ProtectedRoute> <Sidebar /></ProtectedRoute>} />
        <Route
          path="/dashboard/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
 <Route path="/course-detail/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />

        <Route
          path="/dashboard/enrolled-courses"
          element={
            <ProtectedRoute>
              <EnrolledCourse />
            </ProtectedRoute>
          }
        />

    <Route path="/dashboard/setting" element={<ProtectedRoute> <Setting/></ProtectedRoute>}/>
    <Route path='/dashboard/setting/edit-email' element={<ProtectedRoute><EditEmail/></ProtectedRoute>}/>

        <Route
          path="/dashboard/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* ================= INSTRUCTOR ROUTES ================= */}
        {accountType === "Instructor" && (
          <>
            <Route
              path="/dashboard/add-courses"
              element={<ProtectedRoute><AddCourse /></ProtectedRoute>}
            />
            <Route
              path="/dashboard/draft"
              element={<ProtectedRoute><Draft /></ProtectedRoute>}
            />
            <Route
              path="/dashboard/my-courses"
              element={<ProtectedRoute><MyCourses /></ProtectedRoute>}
            />
            <Route
              path="/dashboardInstructor"
              element={<ProtectedRoute><InstructorDashboard /></ProtectedRoute>}
            />
          </>
        )}

        {/* ================= STUDENT ROUTES ================= */}
        {accountType === "Student" && (
          <>
            <Route
              path="/dashboardStudent"
              element={<ProtectedRoute><StudentDasboard /></ProtectedRoute>}
            />
            <Route
              path="/cart-items"
              element={<ProtectedRoute><CartItems /></ProtectedRoute>}
            />
            <Route
              path="/dashboard/purchase-history"
              element={<ProtectedRoute><PurchaseHistory /></ProtectedRoute>}
            />

             <Route path='/all-payment' element={<ProtectedRoute><AllPayment/></ProtectedRoute>} />
        <Route path='/single-payment/:id' element={<ProtectedRoute><SinglePayment/></ProtectedRoute>} />
         <Route path='/course/:id' element={<ProtectedRoute><EnrollFullCourse/></ProtectedRoute>} />

          </>
        )}

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/instructors"
          element={
            <AdminRoute>
              <Instructors />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminRoute>
              <Students />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/createCategory"
          element={
            <AdminRoute>
             <CreateCategory/>
            </AdminRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Study;
