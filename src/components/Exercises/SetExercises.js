import { Breathing, Meditating, Grounding, Stretching, SafePlace, LessStimulation } from './TextBasedExercises';
import Gratitude from './ReplayGratitude';
import PositiveMemory from './ReplayPosMemories';
import LikeAboutSelf from './ReplayLikeAboutSelf';
import ReplayContent from './ReplayContent';
import ReplayAnchors from './ReplayAnchors';
import React from 'react';

export const SetExercises = (exercise) => {
    if (exercise == 'breathing') {
        return Breathing();
    }
    if (exercise == 'meditating') {
        return Meditating();
    }
    if (exercise == 'grounding') {
        return Grounding();
    }
    if (exercise == 'stretching') {
        return Stretching();
    }
    if (exercise == 'safePlace') {
        return SafePlace();
    }
    if (exercise == 'lessStimulation') {
        return LessStimulation();
    }
    if (exercise == 'gratitude') {
        return <Gratitude />
    }
    if (exercise == 'positive') {
        return <PositiveMemory />
    }
    if (exercise === 'selflike') {
        return <LikeAboutSelf />
    }
    if (exercise === 'content') {
        return <ReplayContent />
    }
    if (exercise === 'anchors') {
        return <ReplayAnchors />
    }
}