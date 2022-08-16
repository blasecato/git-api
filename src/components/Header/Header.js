import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useSelector } from "react-redux";
import logoPng from "../../assets/images/logo.png";
import SearchUsers from "../SearchUsers/SearchUsers";

const Header = () => {
  const user = useSelector((state) => state.user);
  const text = <span>Title</span>;
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <div className="Header">
      <div className="container">
        <div className="Header__box">
          <a href="/home">
            <img src={logoPng} className="logo" alt="logo" />
          </a>
          {user?.success?.user?.login ? (
            <p className="name">{user?.success?.user?.login}</p>
          ) : (
            <div className="buttons">
              <Button>Product</Button>
              <Popover
                placement="bottom"
                title={text}
                content={content}
                trigger="click"
              >
                <Button>
                  Team <DownOutlined />
                </Button>
              </Popover>
              <Button>Enterprice</Button>
            </div>
          )}
        </div>
        {user?.success?.user?.login && (
          <div className="Header__box">
            <SearchUsers />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
