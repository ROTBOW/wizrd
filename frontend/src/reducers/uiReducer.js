import { UPDATE_MODAL } from '../actions/uiActions';

const initialState = {
  modal: false
}

const uiReducer = function (state = initialState, action) {
  switch (action.type) {
    
    case UPDATE_MODAL: return assignModal(state, action.modalName);

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