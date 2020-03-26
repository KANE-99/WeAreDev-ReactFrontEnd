import { GET_PROFILE, PROFILE_ERROR } from '../actions/type';

const initialState = {
  profile: {},
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
}
