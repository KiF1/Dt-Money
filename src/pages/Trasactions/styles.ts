import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 768px) {
    gap: 3rem;
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background-color: ${(props) => props.theme["gray-700"]};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ContainerBoxes = styled.div`
  width: 100%;
  display: none;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media (max-width: 580px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const CardBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 6px;
  padding: 1.25rem 2rem;
  background-color: ${(props) => props.theme["gray-700"]};

  strong {
    font-size: 1.15rem;
    font-weight: normal;
  }
`;

interface PriceHighlightProps {
  variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === "income"
      ? props.theme["green-300"]
      : props.theme["red-300"]};
`;
