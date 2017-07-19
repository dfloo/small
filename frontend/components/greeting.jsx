import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import SessionFormContainer from './session_form_container';

class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
    this.formType = '';

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(formType) {
    return () => {
      this.formType = formType;
      this.setState({ modalIsOpen: true });
    };
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div className="greeting">
          <span>Welcome {this.props.currentUser.username}!</span>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      );
    }
    return (
      <div className="login-signup">
        <Link onClick={this.openModal('/login')} to='/login'>Login</Link>
        &nbsp;
        <Link onClick={this.openModal('/signup')} to='/signup'>Sign Up</Link>
        <Modal className="modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Login Modal"
        >
          <SessionFormContainer formType={this.formType} />
        </Modal>
      </div>
    );
  }
}

export default Greeting;