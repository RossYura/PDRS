import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { UserActions } from 'redux/actions';
import StorageService from 'services/storage';

class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
    const { email, authenticationToken, profileStatus } = await StorageService.User.get();
    const signUpStep = await StorageService.Common.get('signUpStep');

    axios.defaults.headers.common['X-User-Email'] = email;
    axios.defaults.headers.common['X-User-Token'] = authenticationToken;

    if (authenticationToken) {
      switch (profileStatus) {
      case 'unapproved':   
        if (signUpStep) {
          const profileStack = ['Profile', 'ProfileForm2', 'ProfileForm3', 'ProfileForm4'];  
          for (let i = 0; i < signUpStep; i++) {
            this.props.navigation.navigate(profileStack[i]);
          }
        } else {
          this.props.navigation.navigate('Profile');
        }
        return;
      case 'pending':
        this.props.navigation.navigate('Processing');
        return;
      case 'approved':
        this.props.navigation.navigate('ESign');
        return;
      case 'live':
        this.props.navigation.navigate('App');
        return;
      default:
        this.props.navigation.navigate('Auth');
      }
    } else {
      // if no authenticationToken -> auth flow 
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      null
    );
  }
}

let mapDispatchToProps = {
  ...UserActions,
};
let enhancer = connect(null, mapDispatchToProps);

export default enhancer(AuthLoadingScreen);
