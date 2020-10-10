import { Breathing, BreathingInRoute, Meditating, Grounding, Stretching, SafePlace, LessStimulation } from './TextBasedExercises';
import Gratitude from './ReplayGratitude';
import PositiveMemory from './ReplayPosMemories';
import LikeAboutSelf from './ReplayLikeAboutSelf';
import ReplayContent from './ReplayContent';
import ReplayAnchors from './ReplayAnchors';
import ReplayCare from './ReplayCare';
import ChangeSituation from '../SharedComponents/MentalHealthQuestions';
import React from 'react';

export const SetExercises = (exercise) => {
    if (exercise == 'meditating') {
        return Meditating();
    }
    if (exercise == 'stretching') {
        return Stretching();
    }
    if (exercise == 'safePlace') {
        return SafePlace();
    }
    if (exercise == 'grounding') {
        return <Grounding />;
    }
    if (exercise == 'breathing') {
        return <Breathing />;
    }
    if (exercise == 'changeSituation') {
        return <ChangeSituation />
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
    if (exercise === 'selfCare') {
        return <ReplayCare />
    }
}