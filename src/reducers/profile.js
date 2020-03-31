import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_REPOS
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
				profile: { ...state.profile, ...payload },
				error: {}
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
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
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false
			};

		default:
			return state;
	}
}
