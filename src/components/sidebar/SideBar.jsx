import React, { useContext, useState } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

const SideBar = () => {
    const [extended, setExtended] = useState(false);
    const { prevPrompts, onSent, setRecentPrompt, setShowResult } = useContext(Context);
    const loadPrompt = async (prompt) => {
        await onSent(prompt);
    }

    const handleNewChat = () => {
        setShowResult(false);
    }

    return (
        <>
            <div className={`side-bar`}>
                <div className="top">
                    <img
                        src={assets.menu_icon}
                        alt=""
                        className='menu'
                        onClick={() => setExtended(prev => !prev)}
                    />
                    <div className="new-chat" onClick={handleNewChat}>
                        <img src={assets.plus_icon} alt="" className='plus' />
                        {extended && <p>New Chat</p>}
                    </div>
                    {extended && <div className="recent">
                        <p className='recent-title'>Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div
                                    className="recent-entry"
                                    onClick={() => loadPrompt(item)}
                                    key={index}
                                >
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                <div className={`bottom ${!extended ? 'active' : ''}`}>
                    <div className="bottom-items recent-entry">
                        <img src={assets.question_icon} alt="" />
                        {extended && <p>Help</p>}
                    </div>
                    <div className="bottom-items recent-entry">
                        <img src={assets.history_icon} alt="" />
                        {extended && <p>Activity</p>}
                    </div>
                    <div className="bottom-items recent-entry">
                        <img src={assets.setting_icon} alt="" />
                        {extended && <p>Settings</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
