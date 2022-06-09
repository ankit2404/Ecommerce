import React from "react";
import classes from "../styles/myOrder.module.css";
function MyOrderList() {
  return (
    <div className={`${classes["myordercontainer"]}`}>
      <article className={`${classes["leaderboard"]}`}>
        <header>
          <h1 className={`${classes["leaderboard__title"]}`}>
            <span className={`${classes["leaderboard__title--top"]}`}>
              Forbes
            </span>
            <span className={`${classes["leaderboard__title--bottom"]}`}>
              Leaderboard
            </span>
          </h1>
        </header>

        <main className={`${classes["leaderboard__profiles"]}`}>
          <article className={`${classes["leaderboard__profile"]}`}>
            <span>629cab26e2f96423d51af7b3	</span>
            <span className={`${classes["leaderboard__name"]}`}>
              2022-06-05
            </span>
            <span className={`${classes["leaderboard__value"]}`}>
              35.7<span>B</span>
            </span>
          </article>

          <article className={`${classes["leaderboard__profile"]}`}>
            <img
              src="https://randomuser.me/api/portraits/men/97.jpg"
              alt="Dustin Moskovitz"
              className={`${classes["leaderboard__picture"]}`}
            />
            <span className={`${classes["leaderboard__name"]}`}>
              Dustin Moskovitz
            </span>
            <span className={`${classes["leaderboard__value"]}`}>
              9.9<span>B</span>
            </span>
          </article>

          <article className={`${classes["leaderboard__profile"]}`}>
            <img
              src="https://randomuser.me/api/portraits/women/17.jpg"
              alt="Elizabeth Holmes"
              className={`${classes["leaderboard__picture"]}`}
            />
            <span className={`${classes["leaderboard__name"]}`}>
              Elizabeth Holmes
            </span>
            <span className={`${classes["leaderboard__value"]}`}>
              4.5<span>B</span>
            </span>
          </article>

          <article className={`${classes["leaderboard__profile"]}`}>
            <img
              src="https://randomuser.me/api/portraits/men/37.jpg"
              alt="Evan Spiegel"
              className={`${classes["leaderboard__picture"]}`}
            />
            <span className={`${classes["leaderboard__name"]}`}>
              Evan Spiegel
            </span>
            <span className={`${classes["leaderboard__value"]}`}>
              2.1<span>B</span>
            </span>
          </article>
        </main>
      </article>
    </div>
  );
}

export default MyOrderList;
