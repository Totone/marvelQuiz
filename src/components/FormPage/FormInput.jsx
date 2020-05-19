import React from 'react';

const FormInput = ({
  handleFormChange,
  formState,
  input
}) => {
  return (
    <section className="inputBox">
      <input 
        type={input.type}
        id={input.id}
        value={formState[input.id]}
        onChange={handleFormChange}
        autoComplete="off"
        required
      />
      <label htmlFor={input.id}>
        {input.label}
      </label>
    </section>
  );
};

export default React.memo(FormInput);
