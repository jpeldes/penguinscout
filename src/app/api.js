import axios from "axios";
import _ from "lodash";

export const apiSearchWorks = async (search) => {
  const response = await axios.get(
    `https://reststop.randomhouse.com/resources/works/?search=${encodeURIComponent(
      search
    )}`
  );

  let works = response.data.work || [];
  if (!_.isArray(works) && _.isObject(works)) {
    works = [response.data.work];
  }
  return works;
};
