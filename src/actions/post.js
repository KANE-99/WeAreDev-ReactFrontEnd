import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './type';

export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('api/posts');

		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const addLike = postId => async dispatch => {
	try {
		console.log(postId);
		const res = await axios.put(`/api/posts/likes/${postId}`);
		console.log(res.data);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id: postId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const removeLike = postId => async dispatch => {
	try {
		const res = await axios.put(`api/posts/unlikes/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id: postId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
