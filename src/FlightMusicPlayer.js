import React, {Fragment, useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import muzak from './sound/muzak.mp3'
import abame from './sound/announcement-abame.mp3';
import { findAudio} from './dataUtils'

const propTypes = {
    /** the audio file to play */
    flightAnnouncement: PropTypes.string.isRequired,
    flightStatus: PropTypes.oneOf(["Normal", "Canceled"]).isRequired,
}

const FlightMusicPlayer = ({flightAnnouncement, flightStatus})=> {
    const [muzakState, setMuzakState] = useState(Sound.status.PLAYING)
    const [announcementFile, setAnnouncementFile] = useState(abame);

    
    const handleAnnouncementEnd = ()=> {
        setMuzakState(Sound.status.PLAYING);
    }

    // if the sound file changes pause the muzak until it finishes
    useEffect(()=> {
        if (flightAnnouncement && flightStatus !== 'Canceled') {
            setMuzakState(Sound.status.PAUSED);
        }
    }, [flightAnnouncement, flightStatus])

    useMemo(()=> {
        if (flightAnnouncement && flightStatus !== 'Canceled') {
            setAnnouncementFile(findAudio(flightAnnouncement))
        }
    },[flightAnnouncement, flightStatus]);

    return <Fragment>
        <Sound playStatus={muzakState} autoload loop url={muzak}/>
        {flightAnnouncement?<Sound playStatus={muzakState === Sound.status.PLAYING ? Sound.status.PAUSED : Sound.status.PLAYING} onFinishedPlaying={handleAnnouncementEnd} autoload url={announcementFile}/>:null}
    </Fragment>
}

FlightMusicPlayer.propTypes = propTypes;

export default FlightMusicPlayer;