import React from 'react'
import styles from './StartAudioPopup.module.css'
const StartAudioPopup = () => {
    // We're going to be allowed to let audio play on localhost because we're going to startup Chrome with a special flag
    return (
        <>
            <div className={styles.startAudioPopup}></div>
            <div className={styles.startAudioPopupText}>
                You have to click on the page to start the sound
            </div>
        </>
    )
}

export default StartAudioPopup
