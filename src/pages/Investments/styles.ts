import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const ContainerInvestments = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

export const BoxCardInvestments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border-radius: 6px;
  padding: 1.25rem 2rem;
  background-color: ${(props) => props.theme["gray-700"]};

  h1 {
    font-size: 1.35rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  strong {
    font-size: 1rem;
    font-weight: normal;
  }

  span {
    color: ${(props) => props.theme["green-300"]};
  }

  button {
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

    &:disabled {
      background-color: ${(props) => props.theme["green-700"]};
      transition: background-color 0.2s;
      cursor: not-allowed;
    }
  }
`;
