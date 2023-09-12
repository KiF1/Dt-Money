import styled from "styled-components";

export const ContainerGraphics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 4rem;
  padding: 1.5rem;
`;

export const BoxGraphics = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 6px;
  padding: 1.25rem 2rem;
  background-color: ${(props) => props.theme["gray-700"]};

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .graphic {
    min-height: 300px;
    p {
      color: ${(props) => props.theme["gray-700"]};
    }
  }
`;
