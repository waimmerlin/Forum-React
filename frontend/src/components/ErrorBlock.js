import React from "react";
import { FaCircleExclamation } from "react-icons/fa6";

const ErrorBlock = ({ errorMessage, handleModalClose }) => {
    return (
        //     <div className="error-block-container">
        //         <div className="error-block-header">
        //             <div className="error-block-title">
        //                 <FaCircleExclamation />
        //                 <strong>Error</strong>                    
        //             </div>
        //             <span className="close-icon" onClick={handleModalClose}>
        //                 &times;
        //             </span>
        //         </div>
        //         <div className="error-block-content">
        //             <div>{errorMessage}</div>
        //         </div>
        //     </div>  
        <div className="error-block-container" onClick={handleModalClose}>
            <div className="error-block-header">
                <div className="error-block-title">
                    <FaCircleExclamation />
                    <strong>Error &gt;&gt;</strong>    
                    {errorMessage}                
                </div>
            </div>
        </div>    

    )
}
export default ErrorBlock