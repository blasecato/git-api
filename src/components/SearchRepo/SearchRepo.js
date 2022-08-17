import React from "react";
import { Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usersActions from "../../services/users/actions";

const { Search } = Input;

const SearchUsers = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const user = useSelector((state) => state.user);

  // function that allows us to search for a . repos by name
  const onSearch = (value) => {
    const values = username + "/" + value;
    dispatch(usersActions.getRepo(values));
  };

  return (
    <section className="SearchUsers">
      <Search
        placeholder="Search a Repository by Name"
        onSearch={onSearch}
        style={{ width: 240 }}
      />
      {user?.loading?.userRepo && <LoadingOutlined className="spin-icon" />}
      {user?.error?.userRepo && (
        <div className="text-error">
          This Repository does not exist, please try again.
        </div>
      )}
    </section>
  );
};

export default SearchUsers;
