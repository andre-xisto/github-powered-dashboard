import React from 'react';
import { Link } from 'react-router-dom';
import { PersonIcon, StarIcon } from '@primer/octicons-react';

import './style.scss';

function UserCard(props) {
  const user = props.user;
  return (
    <div className="userCard">
      <div className="topbar">{/* <img src={user.userDetails.avatar_url} alt={user.userDetails.name} /> */}</div>
      <img src={user.userDetails.avatar_url} alt={user.userDetails.name} />
      <h4>{user.userDetails.name ? user.userDetails.name : user.userDetails.login}</h4>
      <p>{user.userDetails.email}</p>
      <p>
        <PersonIcon size={24} className="icon" /> {user.userDetails.followers} Followers
      </p>
      <hr className="break" />
      <div className="mostStarredRepo">
        {(user.repos[0] && (
          <>
            <div className="row justify-content-between">
              <div className="col-75">
                <h5>{user.repos[0].name}</h5>
              </div>
              <div className="col-25">
                <p className="stars">
                  <StarIcon size={24} className="icon" />
                  <span className="starCounter"> {user.repos[0].stargazers_count}</span>
                </p>
              </div>
            </div>
            <p>{user.repos[0].description}</p>
          </>
        )) || <p>The user has no repositories created</p>}
      </div>
      <Link className="profileButton" to={{ pathname: `/profile/${user.userDetails.login}`, state: user }}>
        OPEN PROFILE
      </Link>
    </div>
  );
}

export default UserCard;
