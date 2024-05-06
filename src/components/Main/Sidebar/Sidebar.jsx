import React, { useState } from 'react'
import './Sidebar.css' 
import { assets} from '../../../gemini-clone-assets/assets/assets'
const Sidebar = () => {

    const [extended,setExtended] = useState(false)
  return (
    <div className='sidebar'>

        <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon}alt="" />

        <div className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended?<p>New Chat</p>:null}
        </div>
       {extended?
       <div className="recent">
       <p className="recent">
           <div className="recent-title">
               Recent
               <div className="recent-entry">
                   <img src={assets.message_icon} alt="" />
                   <p>What is React... </p>
               </div>
           </div>
           </p>
        </div>
           :null
    }
        
         
        </div>

        <div className="bottom">

        <div className="bottom-it recent-entry ">
            <img src={assets.question_icon} alt="" />
           {extended? <p>Help</p> :null}
        </div>

        <div className="bottom-it recent-entry ">
            <img src={assets.history_icon} alt="" />
            {extended? <p>History</p> :null}
        </div>

        <div className="bottom-it recent-entry ">
            <img src={assets.setting_icon} alt="" />
            {extended? <p>Setting</p> :null}
        </div>

        
        </div>
    </div>
  )
}

export default Sidebar