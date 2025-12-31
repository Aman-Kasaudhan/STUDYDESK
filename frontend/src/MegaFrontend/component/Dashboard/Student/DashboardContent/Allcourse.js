import NewCourse from './NewCourse'
import AiMl from './AiMl'
import WebD from './WebD'
import Language from './Language'

function AllCourse(){
    return(
        <div className="Allcourse">

        <div className="newCourse">
        <NewCourse/>
       </div>

       <div className="aiCourse" >
           <AiMl/>
       </div>

        <div className="webDevelpopmentCourse" >
        <WebD/>
       </div>

       <div className="boostYourLanguage">
      <Language/>
       </div>
        </div>
    )
}

export default AllCourse;