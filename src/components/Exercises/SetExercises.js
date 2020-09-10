import { Breathing, Meditating, Grounding, Stretching } from './TextBasedExercises';
import Gratitude from './ReplayGratitude';
import PositiveMemory from './ReplayPosMemories';
import LikeAboutSelf from './ReplayLikeAboutSelf';
import ReplayContent from './ReplayContent';
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
}