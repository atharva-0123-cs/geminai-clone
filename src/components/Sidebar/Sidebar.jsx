import { useContext, useState } from "react"
import {assets} from "../../assets/assets"
import "./Sidebar.css"
import { Context } from "../../context/context";

export default function Sidebar() {

    const [extented,setExtented] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const {onSet,prevPrompt,setRecentPrompts,newChat} = useContext(Context);

    const loadPrompts = async (prompt) => {
        setRecentPrompts(prompt);
        await onSet(prompt)
    }

    const handelSidebar = () => {
        setExtented((p) => !p);
    }
  return (
    <div className="sidebar">
        <div className="top">
        <img src={assets.menu_icon} alt="" className="menu" onClick={handelSidebar} />
        <div onClick={() => newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extented && <p>New Chat</p>}
        </div>
        {extented && 
        <div className="recent">
            {extented && <p className="recent-title">Recent</p>}
            {prevPrompt.map((item,index) => {
                return ( 
                <div onClick={() => loadPrompts(item)} className="recent-entry" key={index}>
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)}...</p>
                </div>
                )
            })}
          
        </div>
        }   

        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extented && <p>Help</p>}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extented && <p>History</p>}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extented && <p>Setting</p>}
            </div>
        </div>
    </div>
  )
}
