import React, { Fragment, useEffect, useState, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import Sound from 'react-sound'
import { findAudio } from './api/audioUtils'
import silence from './sound/silence.mp3'
import ding from './sound/ding.wav'
import StartAudioPopup from './StartAudioPopup'

const propTypes = {
    /** the audio file to play */
    flightAnnouncement: PropTypes.string.isRequired,
    flightStatus: PropTypes.oneOf(['Normal', 'Canceled']).isRequired,
}

const AUDIO_PLAYING_STATES = {
    FLIGHT_ANNOUNCEMENT_PLAYING: 'FLIGHT_ANNOUNCEMENT_PLAYING',
    DING_PLAYING: 'DING_PLAYING',
    NOTHING_PLAYING: 'NOTHING_PLAYING'
}

const AUDIO_CAN_PLAY = {
    CHECKING: 'CHECKING',
    YES: 'YES',
    NO: 'NO',
}

const FlightMusicPlayer = ({ flightAnnouncement }) => {
    // In chrome until the user interacts (unless we start chrome with a certain flag chrome.exe --autoplay-policy=no-user-gesture-required)
    const [audioCanPlay, setAudioCanPlay] = useState()
  
    const [audioState, setAudioState] = useState(AUDIO_PLAYING_STATES.NOTHING_PLAYING)
    const silenceMP3Ref = useRef()

    // If we are not allowed to play audio, listen for the click to turn it on
    useEffect(() => {
        let clickListener
        // If we know we can't play prompt the user
        if (audioCanPlay === AUDIO_CAN_PLAY.NO) {
            clickListener = window.addEventListener('click', () =>
                setAudioCanPlay(AUDIO_CAN_PLAY.YES)
            )
        } else if (
            audioCanPlay === AUDIO_CAN_PLAY.CHECKING &&
            silenceMP3Ref.current
        ) {
            // try and play
            silenceMP3Ref.current // try and play the audios
                .play()
                .then(() => {
                    console.log('Autoplay is enabled')
                    setAudioCanPlay(AUDIO_CAN_PLAY.YES)
                })
                .catch(() => {
                    console.log('Autoplay is prevented')
                    setAudioCanPlay(AUDIO_CAN_PLAY.NO)
                })
        }
        return window.removeEventListener('click', clickListener)
    }, [audioCanPlay])

    // This is really DUMB, but I have to do a setState so the ref on the audio actually gets stored so I can try to play, it is not set initially
    useEffect(() => setAudioCanPlay(AUDIO_CAN_PLAY.CHECKING), [])

    // once the announcement finishes, SILENCE!
    const handleAnnouncementEnd = () => {
      setAudioState(AUDIO_PLAYING_STATES.NOTHING_PLAYING)
    }

    // if the sound file changes pause the muzak until it finishes, then play the ding
    useEffect(() => {
        if (flightAnnouncement) {
           setAudioState(AUDIO_PLAYING_STATES.DING_PLAYING)
        }
    }, [flightAnnouncement])

    const announcementFile = useMemo(() => {
        if (flightAnnouncement) {
           return findAudio(flightAnnouncement)
        }
    }, [flightAnnouncement])

    return audioCanPlay === AUDIO_CAN_PLAY.YES ? (
        <Fragment>
            <Sound
                playStatus={audioState === AUDIO_PLAYING_STATES.DING_PLAYING ? Sound.status.PLAYING : Sound.status.PAUSED}
                // when we've finished the ding, start the announement
                onFinishedPlaying={() => setAudioState(AUDIO_PLAYING_STATES.FLIGHT_ANNOUNCEMENT_PLAYING)}
                autoload
                url={ding}
            />

            {flightAnnouncement ? (
                <Sound
                    playStatus={
                  audioState === AUDIO_PLAYING_STATES.FLIGHT_ANNOUNCEMENT_PLAYING
                            ? Sound.status.PLAYING
                            : Sound.status.PAUSED
                    }
                    onFinishedPlaying={handleAnnouncementEnd}
                    autoload
                    url={announcementFile}
                />
                ) : null}
        </Fragment>
    ) : audioCanPlay === AUDIO_CAN_PLAY.NO ? (
        <StartAudioPopup></StartAudioPopup>
    ) : (
        <audio src={silence} ref={silenceMP3Ref} />
    )
}

FlightMusicPlayer.propTypes = propTypes

export default FlightMusicPlayer
