import React from 'react';

class Tagging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.showTags = this.showTags.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  componentWillMount() {
    this.props.requestUserPets(this.props.currentUserId);
  }

  taggingButton() {
    if (this.props.currentUserId === this.props.photo.owner_id) {
      return (
        <div>
          <button onClick={ this.buttonClicked }>Tag Photo</button>
          { this.showTags() }
        </div>
      );
    }
  }

  showTags() {
    let taggedPetIds = this.props.photo.taggings.map(function(tag) {return tag.pet_id;});
    let untaggedPets = this.props.pets.filter(
      pet => !(taggedPetIds.includes(pet.id))
    );
    if (this.state.clicked) {
      return(
        <div>
          <ul>
            {untaggedPets.map(pet => (
              <li>
                <button onClick={ this.createTag(pet) }>{pet.pet_name}</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  createTag(pet) {
    return (e) => {
      e.preventDefault();
      this.props.createTagging(
        {
          pet_id: pet.id,
          photo_id: this.props.photo.id
        }
      );
    };
  }

  buttonClicked(e) {
    e.preventDefault();
    this.setState({ clicked: true });
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            { this.props.photo.taggings.map(tag => <li>{tag.pet_name}</li>) }
          </ul>
        </div>
        { this.taggingButton() }
      </div>
    );
  }

}

export default Tagging;
