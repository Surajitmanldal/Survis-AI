import React, { useContext, useState, useRef } from 'react'
import { assets } from '../../assets/assets'
import './main.css'
import Nav from '../nav/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { InputDataSliceActions } from '../../store/InputDataSlice'
import { onSent } from '../../store/FetchingData'
const Main = () => {
    const recent = useSelector(store => store.recentStatus);
    const showResult = useSelector(store => store.resultStatus);
    const loading = useSelector(store => store.loadingStatus);
    const resultData = useSelector(store => store.resultDataStatus);
    const input = useSelector(store => store.inputDataStatus);

    const dispatch = useDispatch();



    const handleEnterPress = (e) => {
        if (input.trim() !== '') {
            if (e.key === 'Enter') {
                dispatch(onSent());
            }
        }
    }
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);
    // Check for browser support
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && !recognitionRef.current) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.interimResults = false;
        recognitionRef.current.continuous = false;
        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);

        recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            dispatch(InputDataSliceActions.setInput(transcript))
        };

        recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };
    }

    const handleMicClick = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
        }
    };


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
                            <p>{recent}</p>
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
                        <input type="text" placeholder='Enter a prompt here' onChange={(e) => dispatch(InputDataSliceActions.setInput(e.target.value))} value={input} onKeyDown={handleEnterPress} />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" onClick={handleMicClick} className={`mic-button ${isListening ? "listening" : ""}`} />

                            {input.trim() !== '' && <img src={assets.send_icon} alt="" onClick={() => dispatch(onSent())} />}

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
