import { RECEIVE_MESSAGE } from '../actions/chatActions';

export default function (state = [], action) {
  switch (action.type) {

    case RECEIVE_MESSAGE: return state.concat([action.message])

    default: return state;
  }
}