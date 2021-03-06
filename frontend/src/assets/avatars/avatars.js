import deer from './deer.png';
import fox from './fox.png';
import hedgehog from './hedgehog.png';
import owl from './owl.png';
import racoon from './racoon.png'

// the avatars work by importing them all above and exporting them as an array,
// that way any component that needs them can import this file, and the saved 
// avatar number in the user should correspond to the avatar in this array

const avatars = [
  fox,
  deer,
  hedgehog,
  owl,
  racoon
];

export default avatars;