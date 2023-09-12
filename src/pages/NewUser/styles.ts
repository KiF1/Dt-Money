import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const Content = styled.div`
  width: 65%;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background-color: ${(props) => props.theme["gray-800"]};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    width: 85%;
    padding: 2rem;
  }

  h1 {
    text-align: center;
  }

  a {
    font-size: 1rem;
    color: ${(props) => props.theme["green-500"]};
    text-decoration: none;
  }

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      border-radius: 6px;
      border: 0;
      background-color: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }
    button[type="submit"] {
      height: 58px;
      border: 0;
      background-color: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-size: 1rem;
    color: ${(props) => props.theme["red-300"]};
  }
`;

export const LinkNavigation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;
