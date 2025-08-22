/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: smaller;
  align-items: center;
  font-weight: 500;
  padding: 2px;
  display: none;
  @media (min-width: 600px) {
    font-size: medium;
    display: flex;
  }
`;

const StyledSelect = styled.select`
  font-size: smaller;
  color: var(--color-grey-0);
  padding: 2px;
  border: 2px solid rgba(62, 87, 129, 0.9);
  border-radius: 15px;
  background: #3b578b;
  font-weight: 500;
  box-shadow: var(--shadow-md);
  @media (min-width: 600px) {
    font-size: medium;
  }
  option {
    background: #3b578b;
    color: var(--color-grey-300);
  }

  option:checked {
    background: rgba(46, 63, 93, 0.9);
    color: var(--color-grey-0);
  }
`;

function Select({ value, options, onChange }) {
  return (
    <>
      <StyledLabel htmlFor="sort-by">Sort by</StyledLabel>
      <StyledSelect value={value} onChange={onChange} id="sort-by">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
}

export default Select;
