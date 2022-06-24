import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/activityFeed.css";

const url = "https://aircall-job.herokuapp.com/activities";

export default function ActivityFeed() {
  const navigate = useNavigate();
  const [activityFeed, setActivityFeed] = useState([]);
  const [selectedView, setSelectedView] = useState("all");

  useEffect(() => {
    const fetchActivityFeed = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setActivityFeed(data);
    };
    fetchActivityFeed();
  }, []);

  useEffect(() => {
    const newActivityFeed = activityFeed.length > 0 && [...activityFeed];

    if (activityFeed.length > 0 && selectedView === "inbox") {
      newActivityFeed.filter((activity) => {
        return activity.is_archived;
      });
      setActivityFeed(newActivityFeed);
    }
  }, [selectedView]);

  const handleArchiveAllClick = () => {
    const archive = async (id) => {
      const response = await fetch(`${url}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_archived: false,
        }),
      });
      return response.json();
    };

    activityFeed.forEach((activity) => {
      archive(activity.id);
    });

    const fetchActivityFeed = async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
    setActivityFeed(fetchActivityFeed);
  };

  return (
    <div>
      <div className="buttons">
        <button id="all" onClick={() => setSelectedView("all")}>
          All Calls
        </button>
        <button id="inbox" onClick={() => setSelectedView("inbox")}>
          Inbox
        </button>
        <button id="archive" onClick={handleArchiveAllClick}>
          Archive All
        </button>
      </div>
      <div>
        {activityFeed.length > 0 &&
          activityFeed.map((activity) => {
            const handleClick = () => {
              navigate(`/${activity.id}`);
            };
            const date = new Date(activity.created_at);
            const newDate = date.toLocaleString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            const time = new Date(activity.created_at);
            const newTime = time.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            return selectedView === "inbox" ? (
              activity.is_archived && (
                <div className="activity" onClick={handleClick}>
                  <div className="fromTo">
                    <p>{activity.from}</p>
                    <p id="to">tried to call on {activity.to}</p>
                  </div>
                  <div className="dateTime">
                    <p>{newDate}</p>
                    <p>{newTime}</p>
                  </div>
                </div>
              )
            ) : (
              <div className="activity" onClick={handleClick}>
                <div className="fromTo">
                  <p>{activity.from}</p>
                  <p id="to">tried to call on {activity.to}</p>
                </div>
                <div className="dateTime">
                  <p>{newDate}</p>
                  <p>{newTime}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
