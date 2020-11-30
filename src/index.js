import React from "react";
import ReactDOM from "react-dom";
import * as axios from "axios";
import "./app.css";

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="container">
        <img src={profile.avatar_url} alt="img" />
        <a href={profile.html_url}>
          <div className="name">Name: {profile.name}</div>
        </a>
        <div>Type: {profile.type}</div>
        <div>Repos: {profile.public_repos}</div>
        <div>Followers: {profile.followers}</div>
        <div>Company:{profile.company}</div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: []
  };
  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };
  render() {
    return (
      <>
        <div className="title">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </>
    );
  }
}

ReactDOM.render(
  <App title="Github API Cards" />,
  document.getElementById("root")
);
