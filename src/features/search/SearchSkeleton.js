import React from "react";
import styled from "styled-components";

export const Avatar = styled.div`
  background: #e1e1e1;
  height: 60px;
  width: 60px;
  min-width: 60px;
  margin-right: 10px;
  border-radius: 90px;

  overflow: hidden;
  img {
    max-width: 60px;
  }
`;
export const RightSide = styled.div`
  flex: 1;
`;
export const Details = styled.div`
  small {
    display: inline-block;
  }
`;
export const Buttons = styled.div`
  display: none;
  min-height: 36px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  transition: background 0.3s;
  opacity: ${({ opacity }) => opacity};
  cursor: default;
  &:hover {
    background: #003cd710;
    ${Details} {
      display: none;
    }
    ${Buttons} {
      display: block;
    }
  }
`;

const Bar = styled.div`
  background: ${({ color = "#e1e1e1" }) => color};
  border-radius: 10px;
  height: 12px;
  margin-bottom: 6px;
  width: ${({ width = "100%" }) => width};
`;

const Skeleton = ({ opacity = "100%" }) => (
  <Wrapper opacity={opacity}>
    <Avatar>&nbsp;</Avatar>
    <RightSide>
      <Bar width={"90%"} color="#ccc">
        &nbsp;
      </Bar>
      <Bar width={"70%"}>&nbsp;</Bar>
      <Bar width={"60%"}>&nbsp;</Bar>
    </RightSide>
  </Wrapper>
);

export const Skeletons = ({ x = 3 }) => (
  <>
    {new Array(x).fill().map((v, idx) => (
      <Skeleton key={idx} opacity={100 - 33 * idx + "%"} />
    ))}
  </>
);
