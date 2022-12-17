import Joi from "joi-browser";
import { Component } from "react";
import Input from "./input";
import Select from "./select";

export default class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    const { name, value } = input;

    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };
    data[name] = value;

    this.setState({
      errors,
      data,
    });
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) return;

    this.setState({
      errors: errors || {},
    });

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="w-full text-black  bg-yellow-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        onChange={this.handleChange}
        value={data[name]}
        type={type}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        options={options}
        error={errors[name]}
      />
    );
  }
}
