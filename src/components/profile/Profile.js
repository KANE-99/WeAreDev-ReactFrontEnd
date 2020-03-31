import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileByID } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({
	profile: { profile, loading },
	auth,
	getProfileByID,
	match
}) => {
	useEffect(() => {
		getProfileByID(match.params.id);
	}, [getProfileByID, match.params.id]);

	return (
		<Fragment>
			{loading || profile === null ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back To Profiles
					</Link>

					{auth.isAuthenticated &&
						!auth.loading &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
					<div class='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getProfileByID: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
