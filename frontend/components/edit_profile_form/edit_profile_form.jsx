import React from 'react';
import { Link, withRouter } from 'react-router';

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  componentWillMount() {
    this.state = this.props.user;
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  navigateToProfile() {
    this.props.router.push(`/users/${this.props.user.id}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.editUser(user);
    this.props.closeModal();
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{ error }</li>
        ))}
      </ul>
    );
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <br/>
          <label>Name
            <br/>
            <input type="text"
              value={this.state.name}
              onChange={this.update('name')} />
          </label>
          <br/>
          <label>About (optional)
            <br/>
            <textarea
              cols='30'
              rows='10'
              value={this.state.biography}
              onChange={this.update('biography')}></textarea>
          </label>
          <br/>
          <button type="submit" name="action" value="Submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditProfileForm);
