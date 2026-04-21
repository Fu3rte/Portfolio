import React from 'react';
import styled from 'styled-components';

export const Input = ({
  text,
  type,
  name,
}: {
  text: string;
  type: string;
  name?: string;
}) => {
  return (
    <StyledWrapper>
      <div className="wave-group">
        <input
          required
          type={type}
          name={name}
          className="input text-primary/90"
        />

        <label className="label">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="label-char"
              style={{ '--index': index } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wave-group {
    position: relative;
    margin-top: 30px;
  }

  .wave-group .input {
    font-size: 1rem;
    padding: 10px 10px 10px 15px;
    display: block;
    width: 100%;
    border-radius: 25px;
    border: 1px solid #515151;
    background: transparent;
    transition: border-color 0.3s ease;
  }

  .wave-group .input:focus {
    outline: none;
    border-color: #007bff;
  }

  .wave-group .label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 10px;
    top: 10px;
    display: flex;
  }

  .wave-group .label-char {
    transition: 0.2s ease all;
    transition-delay: calc(var(--index) * 0.05s);
  }

  .wave-group .input:focus ~ .label .label-char,
  .wave-group .input:valid ~ .label .label-char {
    transform: translate(-5px, -30px);
    font-size: 14px;
    color: #007bff;
  }
`;
