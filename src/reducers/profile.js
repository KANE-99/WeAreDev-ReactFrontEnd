import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from '../actions/type';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: { ...payload, ...state.profile },
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        repos: []
      };

    default:
      return state;
  }
}
