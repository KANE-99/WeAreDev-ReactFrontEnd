import axios from 'axios';
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED
} from './type';
import { setAlert } from './alert';

export const getCurrentProfile = () => async dispatch => {
	try {
		console.log('object');
		const res = await axios.get('/api/profile/me');
		console.log('res', res);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const createProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.post('/api/profile', formData, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (error) {
		const err = error.response.data.errors;

		if (err)
			err.forEach(error => {
				dispatch(setAlert(error.msg, 'danger', 5000));
			});

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const addExperience = (formData, history) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.put('/api/profile/experience', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Experience added', 'success'));

		history.push('/dashboard');
	} catch (error) {
		const err = error.response.data.errors;

		if (err)
			err.forEach(error => {
				dispatch(setAlert(error.msg, 'danger', 5000));
			});

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const addEducation = (formData, history) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.put('/api/profile/education', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Education added', 'success'));

		history.push('/dashboard');
	} catch (error) {
		const err = error.response.data.errors;

		if (err)
			err.forEach(error => {
				dispatch(setAlert(error.msg, 'danger', 5000));
			});

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const deleteEducation = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Removed Education', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const deleteExperience = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Removed Experience', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete User Account
export const deleteAccount = () => async dispatch => {
	if (window.confirm('Are you sure? These can NOT be undone.')) {
		try {
			await axios.delete('api/profile');

			dispatch({
				type: CLEAR_PROFILE
			});

			dispatch({
				type: ACCOUNT_DELETED
			});

			dispatch(setAlert('Your Account has been permanently deleted!'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};
