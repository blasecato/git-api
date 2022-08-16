import React, { useEffect, useState } from "react";
import CardRepo from "../Cards/CardRepo/CardRepo";
const RepositoriesOverview = ({ repos }) => {
  const [cantStars, setCantStars] = useState(0);
  useEffect(() => {
    if (repos.length >= 1) {
      for (let index = 0; index < repos.length; index++) {
        if (repos[index].stargazers_count >= 1) {
          setCantStars(cantStars + repos[index].stargazers_count);
        }
      }
    }
  }, [cantStars, repos, setCantStars]);
  return (
    <section className="RepositoriesOverview">
      {cantStars >= 1 ? (
        repos?.map(
          (item) =>
            item.stargazers_count >= 1 && <CardRepo repo={item} key={item.id} />
        )
      ) : (
        <div className="empty">
          <h2>does not have popular repositories</h2>
        </div>
      )}
    </section>
  );
};

export default RepositoriesOverview;
