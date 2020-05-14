import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { Wrapper, Avatar, RightSide, Details, Buttons } from "./SearchSkeleton";

const Title = styled.h4`
  margin: 0;
  margin-bottom: 5px;
`;

const Button = styled.a`
  border: 2px solid #003cd7;
  border-radius: 5px;
  background: #fff;

  color: #003cd7;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;

  padding: 4px 12px;
  margin-top: 5px;
  margin-right: 8px;
  display: inline-block;
`;

export const SearchWorksItem = ({ item }) => {
  const keyword = encodeURIComponent(item.titleweb + " " + item.authorweb);

  const getImageUrl = (item) => {
    if (!item.titles || !item.titles.isbn) {
      return "";
    }
    let isbn = item.titles.isbn;
    if (_.isArray(isbn)) {
      isbn = item.titles.isbn[0];
    }
    return `https://reststop.randomhouse.com/resources/titles/${isbn["$"]}`;
  };

  return (
    <Wrapper>
      <Avatar>
        <img alt="" src={getImageUrl(item)} />
      </Avatar>
      <RightSide>
        <Title>{item.titleweb}</Title>
        <Details>
          <small>by {item.authorweb}</small>
          <small>Released {new Date(item.onsaledate).toDateString()}</small>
        </Details>
        <Buttons>
          <Button
            href={`https://www.amazon.com/s?k=${keyword}`}
            target="_blank"
          >
            AMAZON
          </Button>
          <Button
            href={`https://www.google.com/search?q=${keyword}`}
            target="_blank"
          >
            GOOGLE
          </Button>
        </Buttons>
      </RightSide>
    </Wrapper>
  );
};
