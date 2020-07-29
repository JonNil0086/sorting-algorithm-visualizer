/* ***********************************************************************
 * index.js (reducers/setAnimationSpeed)
 * -----------------------------------------------------------------------
 * File containing a reducer used to manage the animation speed (in ms).
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

import {
    SET_ANIMATION_SPEED
} from '../../actions/setAnimationSpeed';

const INITIAL_STATE = (0);

/* setAnimationSpeedReducer
 * -------------------------------------------------------------
 * Reducer used to manage the animation speed (in ms).
 * -------------------------------------------------------------
 * Input:    (animationSpeed): The animation speed in ms
 *           (action): The action (payload of information)
 * Output:   animationSpeed / payload
 */
export const setAnimationSpeedReducer = (animationSpeed = INITIAL_STATE, action)  => {
    if (action.type === SET_ANIMATION_SPEED) {
        return action.payload;
    }
    return animationSpeed;
}