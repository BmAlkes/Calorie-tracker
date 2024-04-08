import { useMemo } from "react";
import { Activity } from "../types";
import CaloriesDisplay from "./CaloriesDisplay";

type CaloriesTrackerProps = {
  activity: Activity[];
};

const CaloriesTracker = ({ activity }: CaloriesTrackerProps) => {
  //contadores

  const caloriesConsumed = useMemo(
    () =>
      activity.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activity]
  );
  const caloriesBurned = useMemo(
    () =>
      activity.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activity]
  );
  const caloriesTotal = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activity]
  );
  return (
    <>
      <h2 className="text-4xl font-medium text-white text-center">
        Calories Summary
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriesDisplay calories={caloriesConsumed} text="Consumed" />
        <CaloriesDisplay calories={caloriesBurned} text="Exercises" />
        <CaloriesDisplay calories={caloriesTotal} text="Differentiates" />
      </div>
    </>
  );
};

export default CaloriesTracker;
