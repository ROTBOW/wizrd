import red from './avatarRed.png';
import green from './avatarGreen.png';
import yellow from './avatarYellow.png';

// the avatars work by importing them all above and exporting them as an array,
// that way any componet that needs them can import this file, and the saved avatar number in the user should 
// correspond to the avatar in this array

export default [
    red,
    green,
    yellow
];