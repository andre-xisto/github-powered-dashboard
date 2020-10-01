import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@primer/octicons-react';

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: [],
      repos: []
    };
  }

  componentDidMount() {
    // const login = this.props.match.params.login;
    const repos = this.props.location.state.repos;
    const userDetails = this.props.location.state.userDetails;

    this.setState({
      user: userDetails,
      repos,
      loaded: true
    });
  }

  render() {
    const user = this.state.user;
    const repos = this.state.repos;
    return (
      <div className="container">
        {this.state.loaded && (
          <div className="profileView">
            <div className="row">
              <Link className="mx-auto my-5" to={'/'}>
                Return to Dashboard
              </Link>
            </div>
            <div className="row">
              <div className="col-sm text-center">
                <img src={user.avatar_url} alt={user.login} />
                <h1>{user.name}</h1>
                <h3>{user.login}</h3>
                <p>{user.bio}</p>

                <p>
                  {user.followers} followers · {user.following} following · {user.public_repos} repositories
                </p>
              </div>
              <div className="col-sm">
                {repos.map(repo => (
                  <div className="repo" key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      <h4>{repo.name}</h4>
                      <p className="stars">
                        <StarIcon size={16} className="icon" /> {repo.stargazers_count}
                      </p>
                      <p>{repo.description}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileView;
