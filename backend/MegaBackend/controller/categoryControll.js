const Category=require("../model/category");

exports.createCategory=async(req,res)=>{
    try{
// fetch data
const {name,description}=req.body;

   if(!name || !description){
    return res.status(400).json({
            success:false,
            message:"All field are required"
        })
     }
const CategoryDetail=await Category.create({
    name:name,
    description:description,
})
    console.log(CategoryDetail);
    return res.status(200).json({
            success:true,
            message:"Category  created successfully"
        })
     }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
} 


exports.showCategory=async(req,res)=>{
    const id=req.params.id;
    try{
         const allCategory=await Category.find({},{name:true},{description:true})
        //  const category=await Category.find({},{name:true},{description:true})
         res.status(200).json({
            success:true,
            allCategory,

            message:"All Category show successfully"
         })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
};


// category Pagedetail

exports.categoryPageDetail=async (req,res)=>{
    try{
        const {categoryId}=req.body;
        console.log("inew",{categoryId})
        const  selectedCourse=await Category.findById(categoryId)
                                                      .populate("courses").exec()
         
         if(!selectedCourse){
          return res.status(400).json({
            success:false,
            message:"Data not found"
        })
         }   
         
         const  differentCategory=await Category.find({
            _id:{$ne:categoryId},
         }).populate("courses").exec();

         return res.status(200).json({
               success:true,
               data:{
                selectedCourse,
                differentCategory,
               }
         })
    }
    catch(err){
                return res.status(400).json({
            success:false,
            message:err.message
    })
}
}

// exports.categoryByid=async(req,res)=>{
//     const id=req.params.id;
      
//     try{
//         const category=Category.findById(id);

//         if(!category){
//             return res.status(400).json({
//             success:false,
//             message:"Category not found"
//         })
//         }

//     }
// }

