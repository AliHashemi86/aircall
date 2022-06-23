import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/activityDetail.css";
const url = "https://aircall-job.herokuapp.com/activities/";

export default function ActivityDetail() {
  const [activityDetail, setActivityDetail] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchActivityDetail = async () => {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      setActivityDetail(data);
      setIsArchived(data.is_archived);
    };
    fetchActivityDetail();
  }, []);

  const handleClick = async () => {
    const response = await fetch(`${url}${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived: isArchived ? false : true,
      }),
    });
    setIsArchived(isArchived ? false : true);
    return response.json();
  };

  const [isArchived, setIsArchived] = useState(false);

  return (
    <div className="detail">
      {activityDetail && (
        <>
          <p>
            <b>Call Id: </b>
            {activityDetail.id}
          </p>
          <p>
            <b>Date / Time: </b>
            {activityDetail.created_at}
          </p>
          <p>
            <b>Call Direction: </b>
            {activityDetail.direction}
          </p>
          <p>
            <b>Call Type: </b>
            {activityDetail.call_type}
          </p>
          <p>
            <b>Call From: </b>
            {activityDetail.from}
          </p>
          <p>
            <b>Call to: </b>
            {activityDetail.to}
          </p>
          <p>
            <b>Via: </b>
            {activityDetail.via}
          </p>
          <p>
            <b>Duration: </b>
            {activityDetail.duration}
          </p>
          <p>{activityDetail.is_archived}</p>
          <button className="button" onClick={() => handleClick(isArchived)}>
            {isArchived ? "Unarchive" : "Archive"}
          </button>
        </>
      )}
    </div>
  );
}
