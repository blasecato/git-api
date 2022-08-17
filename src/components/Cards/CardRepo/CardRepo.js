import React from "react";
import { StarOutlined, ForkOutlined } from "@ant-design/icons";

// This is the card that shows us the repository information
const CardRepo = ({ repo }) => {
  return (
    <section className="CardRepo">
      <div className="row">
        <a className="link" href={repo.html_url}>
          {repo.name}
        </a>
        <div className="row__rigth">
          <p>{repo.private ? "Private" : "Public"}</p>
        </div>
      </div>
      <div className="row row-start">
        <div className="item">
          <div className="circle" />
          <p className="language-text">{repo.language}</p>
        </div>
        <div className="item">
          <StarOutlined />
          <p className="start-text">{repo.stargazers_count}</p>
        </div>
        <div className="item">
          <ForkOutlined />
          <p className="start-text">{repo.forks}</p>
        </div>
      </div>
    </section>
  );
};

export default CardRepo;
