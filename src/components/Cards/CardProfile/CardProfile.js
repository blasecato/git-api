import React from "react";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  GlobalOutlined,
  LinkOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

// The CardPrile is the card that shows us the personal information of the user
const CardProfile = ({ user }) => {
  return (
    <section className="CardProfile">
      <div className="CardProfile__container">
        <img className="avatar" src={user?.avatar_url} alt="avatar" />
        <h2 className="h2">{user?.name}</h2>
        <h6 className="h6">{user?.login}</h6>
        <div className="follow">
          <UsergroupAddOutlined />
          <div className="item">
            <p className="follow--text">
              <span>{user?.followers}</span>
              followers
            </p>
          </div>
          <div className="item">
            <p className="follow--text">
              <span>· {user?.following}</span>
              following
            </p>
          </div>
        </div>
        {user?.company && (
          <div className="item">
            <GlobalOutlined />
            <h4>{user?.company}</h4>
          </div>
        )}
        {user?.location && (
          <div className="item">
            <HomeOutlined />
            <h4>{user.location}</h4>
          </div>
        )}
        {user?.blog && (
          <div className="item">
            <LinkOutlined />
            <a href={user?.blog} target="_blank" rel="noreferrer">
              @{user?.blog}
            </a>
          </div>
        )}
        {user?.twitter_username && (
          <div className="item">
            <TwitterOutlined />
            <a
              target="_blank"
              href={`https://twitter.com/${user.twitter_username}`}
              rel="noreferrer"
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardProfile;
