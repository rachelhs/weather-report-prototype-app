import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import breathing from 'file-loader!../../sounds/breathing.mp3'

export const Breathing = () => {
    return <div><h1 className='info-box-title'>insert breathing exercise here</h1>
        <AudioPlayer
            autoPlay
            // src="http://www.hochmuth.com/mp3/Haydn_Adagio.mp3"
            src={breathing}
            onPlay={e => console.log("onPlay")} />
    </div>
}

export const Meditating = () => {
    return <h1 className='info-box-title'>insert meditation exercise here</h1>
}

export const Grounding = () => {
    return <h1 className='info-box-title'>insert grounding exercise here</h1>
}

export const Stretching = () => {
    return <h1 className='info-box-title'>insert stretching exercise here</h1>
}

export const SafePlace = () => {
    return <h1 className='info-box-title'>insert safe place exercise here</h1>
}

export const LessStimulation = () => {
    return <h1 className='info-box-title'>insert less stimulation exercise here</h1>
}