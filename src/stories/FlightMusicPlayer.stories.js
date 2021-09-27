import { select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import FlightMusicPlayer from '../FlightMusicPlayer'

export default {
    title: 'FlightMusicPlayer',
    decorators: [withKnobs],
}

export const flightMusicPlayer = () => (
    <FlightMusicPlayer
        flightAnnouncement={select(
            'destination',
            [
                'Abame',
                'Absurdistan',
                'West Egg',
                'Neverwhere',
                'New Crobuzon',
                'The Night Kitchen',
                'Yoknapatawpha County',
            ],
            'Abame'
        )}
        flightStatus={'Canceled'}
    />
)
