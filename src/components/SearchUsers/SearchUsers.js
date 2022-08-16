import React, { useEffect } from "react";
import { Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import usersActions from "../../services/users/actions";

const { Search } = Input;

const SearchUsers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const onSearch = (value) => {
    console.log(value);
    dispatch(usersActions.getUser(value));
    dispatch(usersActions.getRepos(value));
    if (user.success.user !== undefined) {
      history.push(`/profile/${value}`);
    }
  };

  useEffect(() => {
    if (user.success.user !== undefined) {
      history.push(`/profile/${user?.success?.user?.login}`);
    }
  }, [dispatch, user, history]);

  return (
    <section className="SearchUsers">
      <Search
        placeholder={
          user?.success?.user === undefined
            ? "Search user"
            : "Search other user"
        }
        onSearch={onSearch}
        style={{ width: 240 }}
      />
      {user?.loading?.user && <LoadingOutlined  className="spin-icon" />}
      {user?.error?.user && (
        <div className="text-error">
          This user does not exist, please try again.
        </div>
      )}
    </section>
  );
};

export default SearchUsers;
