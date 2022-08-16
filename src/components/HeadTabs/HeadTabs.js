import React from "react";
import {
  FileTextOutlined,
  ForkOutlined,
  StarOutlined,
  RightOutlined,
  LeftOutlined,
  PlayCircleOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import Code from "../Code/Code";

const { TabPane } = Tabs;

const HeadTabs = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <section className="HeadTabs">
      <div className="HeadTabs__bettwen">
        <div className="HeadTabs__bettwen__box">
          <FileTextOutlined className="icon" />
          <p className="title">
            luuna-tech<span>/</span>test
          </p>
          <div className="label">
            <p>Public</p>
          </div>
        </div>
        <div className="HeadTabs__bettwen__box HeadTabs__bettwen__box--two">
          <Button className="btn-head">Notifications</Button>
          <Button className="btn-head">
            <ForkOutlined />
            Fork<span className="number">13</span>
          </Button>
          <Button className="btn-head">
            <StarOutlined />
            Star<span className="number">3</span>
          </Button>
        </div>
      </div>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane
          tab={
            <div className="title">
              <div className="arrows">
                <LeftOutlined className="arrow" />
                <RightOutlined className="arrow" />
              </div>
              Code
            </div>
          }
          key="1"
        >
          <Code />
        </TabPane>
        <TabPane
          tab={
            <div>
              <PlayCircleOutlined />
              Issues
            </div>
          }
          key="2"
        >
          <div className="empty">
            <h2>this section is empty</h2>
          </div>
        </TabPane>
        <TabPane
          tab={
            <div>
              <BranchesOutlined />
              Pull requests
            </div>
          }
          key="3"
        >
          <div className="empty">
            <h2>this section is empty</h2>
          </div>
        </TabPane>
      </Tabs>
    </section>
  );
};

export default HeadTabs;
