import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    removeFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    // Every time when refresh the page, set it to log the user in automatically.
    // https://firebase.google.com/docs/auth/web/start?authuser=0
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.handleAuth({ user });
      } else {
        this.setState({ isLoading: false });
      }
    });
  }

  handleAuth = async authData => {
    console.log(authData);

    // 1. Look up the store data in Firebase
    const store = await base.fetch(`${this.props.storeId}`, {
      context: this,
    });

    // 2. Check if the store has owner in Firebase, if not set the new owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    // 3. Set the state of current log in user and store owner
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
      isLoading: false,
    });
  };

  /**
   * Handle the sign-in flow with the Firebase
   * https://firebase.google.com/docs/auth/web/github-auth?authuser=0
   */
  authenticate = provider => {
    // Create an instance of the provider object
    // ex. new firebase.auth.GithubAuthProvider();
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    // Connect to the auth portion of firebase
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.handleAuth);
  };

  logOut = async () => {
    await firebase.auth().signOut();

    // Clear the state of current user id
    this.setState({ uid: null });
  };

  render() {
    const logOutButton = (
      <button style={{ marginBottom: 20 }} onClick={this.logOut}>
        Log out
      </button>
    );

    // 0. Fix loggin buttons always load on the first screen. The page can't find uid immediately while Firebase Auth is still handling the sign-in flow.
    if (this.state.isLoading) {
      return (
        <div className="loader-wrapper">
          <div className="loader" />
        </div>
      );
    }

    // 1. Check if the user is not logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if the current log in user is the store owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the store owner.</p>
          {logOutButton}
        </div>
      );
    }

    // 3. Otherwise, render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logOutButton}
        {Object.keys(this.props.fishes).map(item => (
          <EditFishForm
            key={item}
            id={item}
            details={this.props.fishes[item]}
            updateFish={this.props.updateFish}
            removeFish={this.props.removeFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button className="load-sample" onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
