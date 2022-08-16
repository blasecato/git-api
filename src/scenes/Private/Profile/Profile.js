import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import {
  CloseCircleOutlined,
  LoadingOutlined,
  FolderOpenOutlined,
  BookOutlined,
} from "@ant-design/icons";
import usersActions from "../../../services/users/actions";
import Layout from "../../../components/Layout/Layout";
import CardProfile from "../../../components/Cards/CardProfile/CardProfile";
import RepositoriesOverview from "../../../components/RepositoriesOverview/RepositoriesOverview";
import SearchUsers from "../../../components/SearchUsers/SearchUsers";
import logoPng from "../../../assets/images/logo.png";
import CardRepo from "../../../components/Cards/CardRepo/CardRepo";

const { TabPane } = Tabs;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    console.log("username", username);
    dispatch(usersActions.getUser(username));
    dispatch(usersActions.getRepos(username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <section className="Profile">
        <div className="container">
          {user?.success?.user !== undefined ? (
            <>
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <div className="title-tab">
                      <FolderOpenOutlined />
                      Overview
                    </div>
                  }
                  key="1"
                >
                  <CardProfile user={user.success.user} />
                  {user?.loading?.repos ? (
                    <div className="Profile-rth Profile-rth--spin">
                      <LoadingOutlined />
                    </div>
                  ) : (
                    <div className="Profile-rth">
                      <h4 className="title">Popular repositories</h4>
                      <RepositoriesOverview repos={user.success.repos} />
                    </div>
                  )}
                </TabPane>
                <TabPane
                  tab={
                    <div className="title-tab">
                      <BookOutlined />
                      <span>Repositories</span>
                      <span className="number">
                        {user?.success?.repos?.length}
                      </span>
                    </div>
                  }
                  key="2"
                >
                  <div className="respos">
                    {user.success.repos?.map((item) => (
                      <CardRepo repo={item} key={item.id} />
                    ))}
                  </div>
                </TabPane>
              </Tabs>
            </>
          ) : (
            <div className="empty">
              <img src={logoPng} className="logoPng" alt="logoPng" />
              <div className="message">
                <CloseCircleOutlined />
                <span>
                  ¡Upss It seems that this user does not exist!... Please try
                  again{" "}
                </span>
              </div>
              <SearchUsers />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
