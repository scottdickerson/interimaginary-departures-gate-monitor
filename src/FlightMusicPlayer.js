import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import muzak from './sound/muzak.mp3'
import abame from './sound/abame.mp3';

const propTypes = {
    /** the url of the sound file to play */
    flightAnnouncement: PropTypes.string.isRequired
}

const FlightMusicPlayer = ({flightAnnouncement})=> {
    const [muzakState, setMuzakState] = useState(Sound.status.PLAYING)
    const [announcementState, setAnnouncementState] = useState(Sound.status.PLAYING);
    
    const handleAnnouncementEnd = ()=> {
        setMuzakState(Sound.status.PLAYING);
        setAnnouncementState(Sound.status.PAUSED);
    }

    // if the sound file changes pause the muzak until it finishes
    useEffect(()=> {
        if (flightAnnouncement) {
            setMuzakState(Sound.status.PAUSED);
            setAnnouncementState(Sound.status.PLAYING);
        }
    }, [flightAnnouncement])

    return <Fragment>
        <Sound playStatus={muzakState} autoload loop url={muzak}/>
        {flightAnnouncement?<Sound playStatus={announcementState} onFinishedPlaying={handleAnnouncementEnd} autoload url={abame}/>:null}
    </Fragment>
}

FlightMusicPlayer.propTypes = propTypes;

export default FlightMusicPlayer;