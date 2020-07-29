/* ***********************************************************************
 * index.js (actions/setAnimationSpeed)
 * -----------------------------------------------------------------------
 * Contains available actions for the setAnimationSpeedReducer.
 * -----------------------------------------------------------------------
 * Author:      Jonas Nilsson
 * Version:     1.0
 * Date:        2020-07-27
 * ***********************************************************************/

// Available action types
export const SET_ANIMATION_SPEED  = 'SET_ANIMATION_SPEED';

/* setAnimationSpeed (action)
 * -------------------------------------------------------------
 * Action used to set the animation speed.
 * -------------------------------------------------------------
 * Input:    (animationSpeed): The animation speed (in ms)
 * Output:   Type, Payload
 */
export const setAnimationSpeed = (animationSpeed) => {
    return {
        type: SET_ANIMATION_SPEED,
        payload: animationSpeed
    };
};