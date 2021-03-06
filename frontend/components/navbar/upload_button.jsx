import React from 'react';
import { withRouter } from 'react-router';

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  navigateToProfile() {
    this.props.router.push(`/users/${this.props.currentUser.id}`);
  }

  upload(e){
    e.preventDefault();
    cloudinary.openUploadWidget(window.cloudinary_options, function(error, results){
      if(!error) {
        let newPhoto = {
          photo_url: results[0].url,
          owner_id: this.props.currentUser.id,
          title: "New Photo",
          height: results[0].height,
          width: results[0].width
        };
        this.props.postPhoto({photo: newPhoto});
        this.navigateToProfile();
      }
    }.bind(this));
  }

  render() {
    return(
      <div>
        <a className="nav-button" onClick={this.upload}>Upload</a>
      </div>
    );
  }
}

export default withRouter(UploadButton);
