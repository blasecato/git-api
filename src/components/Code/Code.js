import React from "react";
import { Button, Popover } from "antd";
import { BranchesOutlined, CaretDownOutlined } from "@ant-design/icons";
import CardReadmeTitle from "../Cards/CardReadmeTitle/CardReadmeTitle";
import CardDescription from "../Cards/CardDescription/CardDescription";
import avatar from "../../assets/images/avatar.png";

const Code = () => {
  const text = <span>Title</span>;
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const dummyItem = {
    id: 1,
    title: "mgiadach Update README.md",
    codeCommit: "d0c1684",
    date: "23 Jun",
    avatar: avatar,
    name: "README.md",
    titleDescription: "check here a git hub user",
    description:
      "His is a project where you can query a github user and see their repositories.",
  };
  return (
    <section className="Code">
      <div className="container">
        <div className="Code__head">
          <div className="Code__head__box">
            <Popover
              placement="bottomLeft"
              title={text}
              content={content}
              trigger="click"
            >
              <Button className="btn">
                <BranchesOutlined />
                master
                <CaretDownOutlined className="arrow" />
              </Button>
            </Popover>
            <p className="label">
              test
              <span>/</span>
              frontend
              <span>/</span>
            </p>
          </div>
          <Button className="btn">Go to file</Button>
        </div>
        <CardReadmeTitle item={dummyItem} />
        <CardDescription item={dummyItem} />
      </div>
    </section>
  );
};

export default Code;
