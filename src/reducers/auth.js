import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	AUTH_ERROR,
	USER_LOADED,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	ACCOUNT_DELETED
} from '../actions/type';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
	user: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				token: null
			};
		default:
			return state;
	}
}
