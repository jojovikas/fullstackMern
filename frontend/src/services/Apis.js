import { commonreqeuest } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerfunc = async (data, header) => {
  // (methods = POST , url  = OUR BASE URL + ROUTE, body = DATA, header = HEADER)
  return await commonreqeuest(
    "POST",
    `${BASE_URL}/user/register`,
    data,
    header
  );
};

export const usegetfunc = async (search, gender, status, sort) => {
  return await commonreqeuest(
    "GET",
    `${BASE_URL}/users/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}`,
    ""
  );
};

export const singleUsergetfunc = async (id) => {
  return await commonreqeuest("GET", `${BASE_URL}/user/${id}`, "");
};

export const editfunc = async (id, data, header) => {
  return await commonreqeuest(
    "PUT",
    `${BASE_URL}/user/edit/${id}`,
    data,
    header
  );
};

export const deletfunc = async (id) => {
  return await commonreqeuest("DELETE", `${BASE_URL}/user/delete/${id}`, {});
};

export const statuschangefunc = async (id, data) => {
  return await commonreqeuest("PUT", `${BASE_URL}/user/status/${id}`, { data });
};
