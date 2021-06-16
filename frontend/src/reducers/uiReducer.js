import { UPDATE_MODAL } from '../actions/uiActions';

const initialState = {
  modal: false
}

const uiReducer = function (state = initialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    
    case UPDATE_MODAL: return assignModal(newState, action.modalName);

    default: return state;
  }
}

function assignModal (state, modalName) {
  if (state.modal) {  
    state['modal'] = false;
  } else {
    state['modal'] = modalName;
  }

  return state;
}

export default uiReducer;