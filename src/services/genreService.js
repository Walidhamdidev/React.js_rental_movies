import http from "./httpService";

export const getGenres = async () => {
  const {
    data: { data },
  } = await http.get("/api/genres");
  return data.map((item) => {
    return { _id: item.id.toString(), name: item["attributes"].name };
  });
};
