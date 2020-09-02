import { Breathing, Meditating, Grounding } from './TextBasedExercises';
import Gratitude from './ReplayExercises';
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
    if (exercise == 'gratitude') {
        return <Gratitude />;
    }
}