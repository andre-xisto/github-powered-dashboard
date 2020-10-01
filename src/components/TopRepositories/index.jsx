import React, { Component } from 'react';
import { loadTopRepositories } from './../../services/github';
import { StarIcon } from '@primer/octicons-react';

import './style.scss';

class index extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      topRepositories: []
    };
  }

  componentDidMount() {
    let topRepositories = [];
    loadTopRepositories()
      .then(data => {
        topRepositories = data.items.slice(0, 4);
        return topRepositories;
      })
      .then(repos => {
        console.log(repos);
        this.setState({
          topRepositories: repos,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Top Repositories</h2>
        <div className="row">
          {this.state.loaded &&
            this.state.topRepositories.map(repo => (
              <div className="col-sm" key={repo.id}>
                <div className="repoCard">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <h4>{repo.name}</h4>
                    <p className="stars">
                      <StarIcon size={24} className="icon" /> {repo.stargazers_count}
                    </p>
                    <p>{repo.description}</p>
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default index;
