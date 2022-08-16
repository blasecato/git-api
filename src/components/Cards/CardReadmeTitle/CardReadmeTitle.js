import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { FieldTimeOutlined, FileOutlined } from "@ant-design/icons";

const CardReadmeTitle = ({ item }) => {
  return (
    <section className="CardReadmeTitle">
      <div className="CardReadmeTitle-head">
        <div className="box">
          <img src={item.avatar} className="avatar" alt="avatar" />
          <p className="title">{item.title}</p>
          <Button className="see-more">...</Button>
        </div>
        <div className="box">
          <p className="code-commit">{item.codeCommit}</p>
          <p className="code-commit">on {item.date}</p>
          <FieldTimeOutlined />
          <p className="history">History</p>
        </div>
      </div>
      <div className="CardReadmeTitle-body">
        <Link to="./">...</Link>
      </div>
      <div className="CardReadmeTitle-footer">
        <div className="box">
          <FileOutlined />
          <p>{item.name}</p>
        </div>
        <div className="box">
          <p className="text">Update README.md</p>
        </div>
        <div className="box">
          <p className="text">2 months ago</p>
        </div>
      </div>
    </section>
  );
};

export default CardReadmeTitle;
