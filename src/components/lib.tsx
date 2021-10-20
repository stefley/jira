import styled from "@emotion/styled";

type RowProps = {
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
};

export const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : undefined};
  > * {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
