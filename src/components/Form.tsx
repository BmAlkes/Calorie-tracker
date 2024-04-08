import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  activity: "",
  calories: 0,
};

const Form = ({ dispatch, state }: FormProps) => {
  const [saveActivity, setSaveActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setSaveActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setSaveActivity({
      ...saveActivity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };
  const isValidAcvity = () => {
    const { activity, calories } = saveActivity;
    return activity.trim() !== " " && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: saveActivity } });
    setSaveActivity({ ...initialState, id: uuidv4() });
  };
  return (
    <form
      className="space-y-5 bg-white p-10 rounded-lg shadow-2xl shadow-2xl"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="" className="font-bold">
          Categories
        </label>
        <select
          name="category"
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={saveActivity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">
          Activity
        </label>
        <input
          type="text"
          id="activity"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Example: food, orange juice, salad, exercises, "
          value={saveActivity.activity}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">
          Calories
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Example: calories , 200 or 500 "
          value={saveActivity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-600 w-full p-2 font-bold text-white uppercase cursor-pointer disabled:opacity-10"
        value={saveActivity.category === 1 ? "Save Food" : "Save Exercise"}
        disabled={!isValidAcvity()}
      />
    </form>
  );
};

export default Form;
