import React from "react";
import { BarsOutlined } from "@ant-design/icons";
import SearchUsers from "../../SearchUsers/SearchUsers";

const CardDescription = ({ item }) => {
  return (
    <section className="CardDescription">
      <div className="CardDescription-head">
        <div className="box">
          <BarsOutlined />
          <p className="title">{item.name}</p>
        </div>
      </div>
      <div className="CardDescription-body">
        <h1 className="title">{item.titleDescription}</h1>
        <p className="text">{item.description}</p>
        <SearchUsers />
      </div>
    </section>
  );
};

export default CardDescription;
