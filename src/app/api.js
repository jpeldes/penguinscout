import axios from "axios";

export const apiSearchWorks = (search) => {
  return axios.get(
    `https://reststop.randomhouse.com/resources/works/?start=0&search=${encodeURIComponent(
      search
    )}`
  );
};
