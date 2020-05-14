import React from "react";
import styled from "styled-components";
import { Avatar, RightSide, Details } from "./SearchSkeleton";

const Wrapper = styled.a`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  transition: background 0.3s;
  opacity: ${({ opacity }) => opacity};

  cursor: pointer;
  text-decoration: none;
  color: initial; 
  &:hover {
    background: #003cd710;
  }
`;

const Title = styled.h4`
  margin: 0;
  margin-bottom: 5px;
`;

export const SearchTitlesItem = ({ item }) => {
  const keyword = encodeURIComponent(item.titleweb + " " + item.authorweb);
  const imageUrl = `https://reststop.randomhouse.com/resources/titles/${item.isbn}`;

  return (
    <Wrapper href={`https://www.amazon.com/s?k=${keyword}`} target="_blank">
      <Avatar>
        <img alt="" src={imageUrl} />
      </Avatar>
      <RightSide>
        <Title>{item.titleweb}</Title>
        <Details>
          <small>by {item.authorweb}</small>
          <small>Released {new Date(item.onsaledate).toDateString()}</small>
        </Details>
      </RightSide>
    </Wrapper>
  );
};
