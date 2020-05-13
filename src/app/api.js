import axios from "axios";
import _ from "lodash";

export const apiSearchWorks = (search) => {
  return axios
    .get(
      `https://reststop.randomhouse.com/resources/works/?start=0&search=${encodeURIComponent(
        search
      )}`
    )
    .then(({ data }) => {
      let works = data.work || [];
      if (!_.isArray(works) && _.isObject(works)) {
        works = [data.work];
      }
      return works;
    });
};
