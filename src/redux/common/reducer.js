import {
  SHOW_MODAL,
  HIDE_MODAL,
  TOGGLE_MODAL,
  SWITCH_MODAL,
  ENABLE_LOADER,
  DISABLE_LOADER,
} from './actionTypes';

const initialState = {
  modals: {
    pdfViewer: {
      visible: false,
      uri: '',
      local: true,
      onHideModal: null,
    },
    chipInSuccess: {
      visible: false,
    },
    tipModal: {
      visible: false,
    },
    payment: {
      visible: false,
    },
    fab: {
      visible: false,
    },
  },
  loaders: {
    authSubmitting: false,
    chipInSubmitting: false,
    paymentSubmitting: false,
  },
};

const commonReducer = (state = initialState, action) => {
  const { type, payload, error, meta } = action;
  switch (type) {
  case ENABLE_LOADER: {
    return {
      ...state,
      loaders: {
        ...state.loaders,
        [action.payload]: true,
      },
    };
  }
  case DISABLE_LOADER: {
    return {
      ...state,
      loaders: {
        ...state.loaders,
        [action.payload]: false,
      },
    };
  }
  case SHOW_MODAL:
    return {
      ...state,
      modals: {
        ...state.modals,
        [payload.modalName]: {
          ...state.modals[payload.modalName],
          visible: true,
          ...payload.modalParams,
        },
      },
    };
  case HIDE_MODAL: {
    const { modalName, keepParams } = payload;
    return {
      ...state,
      modals: {
        ...state.modals,
        [modalName]: !keepParams
          ? initialState.modals[modalName]
          : {
            ...state.modals[modalName],
            visible: false,
          },
      },
    };
  }
  case SWITCH_MODAL: {
    const { from, to, additionalModalParams, keepPayload } = payload;
    const { visible, ...prevModalProps } = state.modals[from];

    return {
      ...state,
      modals: {
        ...state.modals,
        [from]: {
          ...initialState.modals[from],
        },
        [to]: {
          ...keepPayload ? prevModalProps : initialState.modals[to],
          ...additionalModalParams,
          visible: true,
        },
      },
    };
  }
  case TOGGLE_MODAL:
    return {
      ...state,
      modals: {
        ...state.modals,
        [payload.modalName]: {
          ...state.modals[payload.modalName],
          visible: !state.modals[payload.modalName].visible,
        },
      },
    };

  default:
    return state;
  }
};

export default commonReducer;