import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  transition: background 0.3s;
  opacity: ${({ opacity }) => opacity};
  &:hover {
    background: #3e81de50;
  }
`;
const Title = styled.h4`
  margin: 0;
  margin-bottom: 5px;
`;
const Avatar = styled.div`
  background: #e1e1e1;
  height: 60px;
  width: 60px;
  min-width: 60px;
  margin-right: 10px;
  border-radius: 90px;
`;
const RightSide = styled.div`
  flex: 1;
`;

export const SearchResultItem = ({ item }) => (
  <Wrapper>
    <Avatar>&nbsp;</Avatar>
    <RightSide>
      <Title>{item.titleweb}</Title>
      <div>
        <small>by {item.authorweb}</small>
      </div>
      <div>
        <small>Released {new Date(item.onsaledate).toDateString()}</small>
      </div>
    </RightSide>
  </Wrapper>
);

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
      <Bar color="#ccc">&nbsp;</Bar>
      <Bar width={"60%"}>&nbsp;</Bar>
      <Bar width={"80%"}>&nbsp;</Bar>
    </RightSide>
  </Wrapper>
);

export const Skeletons = ({ x = 3 }) => (
  <>
    {new Array(x).fill().map((v, idx) => (
      <Skeleton key={idx} opacity={100 - 25 * (idx + 1) + "%"} />
    ))}
  </>
);
