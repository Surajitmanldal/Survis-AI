import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './main.css'
import { Context } from '../../context/Context'
import Nav from '../nav/Nav'
const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    } = useContext(Context);


    const handleEnterPress = (e) => {
        if (input.trim() !== '') {
            if (e.key === 'Enter') {
                onSent();
            }
        }
    }

    return (
        <div className='main'>

            <div className="main-container">
                {!showResult ?

                    (<> <div className="greet">
                        <p><span>Hello,Dev.</span></p>
                        <p>How can I help you today?</p>
                    </div>
                        <div className="cards">
                            <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent("Tell me about React js and React native")}>
                                <p>Tell me about React js and React native</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    )
                    : <div className="result">
                        <div className="result-title">
                            <img src={assets.surajit} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? <div className='loader'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div> :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}

                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Enter a prompt here' onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={handleEnterPress} />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input.trim() !== '' && <img src={assets.send_icon} alt="" onClick={() => onSent()} />}

                        </div>
                    </div>
                    <p className="bottom-info">
                        Survis AI may display inaccurate info, including about people, so double-check its responses
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
