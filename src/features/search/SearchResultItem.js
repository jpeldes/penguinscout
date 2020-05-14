import _ from "lodash";
import React from "react";
import styled from "styled-components";

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

  overflow: hidden;
  img {
    max-width: 60px;
  }
`;
const RightSide = styled.div`
  flex: 1;
`;
const Details = styled.div`
  small {
    display: inline-block;
  }
`;
const Buttons = styled.div`
  display: none;
  min-height: 36px;
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

const Wrapper = styled.div`
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

export const SearchResultItem = ({ item }) => {
  const keyword = encodeURIComponent(item.titleweb + " " + item.authorweb);

  const getImageUrl = (item) => {
    if (!item.titles || !item.titles.isbn) {
      return '';
    }
    let isbn = item.titles.isbn;
    if (_.isArray(isbn)) {
      isbn = item.titles.isbn[0];
    }
    return `https://reststop.randomhouse.com/resources/titles/${ isbn["$"] }`;
  };

  return (
    <Wrapper>
      <Avatar><img alt="" src={getImageUrl(item)} /></Avatar>
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
