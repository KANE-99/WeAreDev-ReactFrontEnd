import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  profile,
  getCurrentProfile
  //  auth
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
  // auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
