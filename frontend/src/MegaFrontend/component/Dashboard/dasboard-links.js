import { ACCOUNT_TYPE } from "./constant";

export const sidebarLinks=[
    {
  id:1,
  name:"My Profile",
  path:"/dashboard/my-profile",
  icon:"VscAccount"
    },

    {
  id:2,
  name:"Dashboard",
  path:"/dashboardInstructor",
  type:ACCOUNT_TYPE.INSTRUCTOR,
  icon:"VscDashboard"

    },
    {
  id:3,
  name:"Dashboard",
  path:"/dashboardStudent",
  type:ACCOUNT_TYPE.STUDENT,
  icon:"VscDashboard"

    },

    {
  id:3,
  name:"My Courses",
  path:"/dashboard/my-courses",
  type:ACCOUNT_TYPE.INSTRUCTOR,

  icon:"VscVm"

    },


    {
  id:4,
  name:"Add Course",
  path:"/dashboard/add-courses",
  type:ACCOUNT_TYPE.INSTRUCTOR,

  icon:"VscAdd"

    },{
  id:5,
  name:"Enrolled Courses",
  path:"/dashboard/enrolled-courses",
  type:ACCOUNT_TYPE.STUDENT,
  icon:"VscMortarBoard"
    },


    {
  id:6,
  name:"Purchase History",
  path:"/dashboard/purchase-history",
   type:ACCOUNT_TYPE.STUDENT,
  icon:"VscHistory"
    },
      {
  id:7,
  name:"Wishlist",
  path:"/dashboard/wishlist",
   type:ACCOUNT_TYPE.STUDENT,
  icon:"VscHeart"
    },
     {
  id:8,
  name:"Draft",
  path:"/dashboard/draft",
  type:ACCOUNT_TYPE.INSTRUCTOR,

  icon:"VscEdit"

    },
]