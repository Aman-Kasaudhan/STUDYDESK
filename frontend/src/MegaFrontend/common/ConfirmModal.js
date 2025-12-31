import React from "react";
import IconBtn from "./Iconbtn";
function ConfirmModal({modalData}){
    return(
        <div>
            <div>
                <p>{modalData.text1}</p>
                <p>{modalData.text2}</p>
            </div>

            <div>
                <IconBtn onclick={modalData?.btn1Handler}
                text={modalData?.btn1Text}/>

                <button onclick={modalData?.btn2Handler}
                text={modalData?.btn2Text}>

                </button>
            </div>

        </div>
    )
}

export default ConfirmModal