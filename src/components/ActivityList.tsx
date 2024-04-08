import React, { useMemo } from "react";
import { Activity } from "../types";
import { categories } from "../data";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );
  return (
    <>
      <h2 className="text-bold text-5xl text-slate-600 text-center">
        Food & Activities
      </h2>
      {activities.length === 0 ? (
        <p className="text-center mt-5">
          There are no activities registered at this time.
        </p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between border rounded-md border-lime-300"
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-md  ${
                  activity.category === 1 ? "bg-red-500" : "bg-lime-500"
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.activity}</p>
              <p className="text-4xl text-lime-500 font-black">
                {activity.calories}
                {""} <span>Calories</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "deleted-activity",
                    payload: { id: activity.id },
                  })
                }
              >
                <XCircleIcon className="h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ActivityList;
