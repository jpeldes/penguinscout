import axios from "axios";
import _ from "lodash";

export const apiSearchWorks = async (search) => {
  const response = await axios.get(
    `https://reststop.randomhouse.com/resources/works/?start=0&max=20&expandLevel=1&search=${encodeURIComponent(
      search
    )}`
  );

  let works = response.data.work || [];
  if (!_.isArray(works) && _.isObject(works)) {
    works = [response.data.work];
  }
  return works;
};

export const apiSearchTitles = async (search) => {
  const response = await axios.get(
    `https://reststop.randomhouse.com/resources/titles/?start=0&max=10&expandLevel=1&search=${encodeURIComponent(
      search
    )}`
  );

  let result = response.data.title || [];
  if (!_.isArray(result) && _.isObject(result)) {
    result = [response.data.title];
  }
  return result;
};
