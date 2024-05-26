import React from "react";
import { useForm } from "react-hook-form";

const Add = ({ handleNewPercentage }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    handleNewPercentage(data.value);
    reset("");
  };

  return (
    <form className="add__form" onSubmit={handleSubmit(submit)}>
      <div className="add__form--text">
        <label htmlFor="number">%</label>
        <input type="number" step="0.01" {...register("value")} />
      </div>
      <div className="add__form--button">
        <input type="submit" />
      </div>
    </form>
  );
};

export default Add;
