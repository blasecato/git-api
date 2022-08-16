import { API_URL } from "../../common/config/config";
// eslint-disable-next-line import/no-cycle
import store from "../../index";
import authActions from "../../services/auth/actions";
import * as Token from "../storage/Token";
import { octokit } from '../config/octokit';

class Api {
  async post(url, data, formData) {
    const dataBody = formData ? this.setStructureFormdata(data) : JSON.stringify(data);

    const token = await Token.get();
    return Promise.race([
      fetch(`${API_URL}${url}`, {
        method: "POST",
        headers: formData
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        body: dataBody,
      }),
      new Promise((_, reject) =>
        // eslint-disable-next-line prefer-promise-reject-errors
        setTimeout(() => reject({ payload: { error: "TIMEOUT" } }), 28000)
      ),
    ])
      .then(async (response) => {
        if (response.status === 401) await store.dispatch(authActions.logout(true));

        if (response.status === 404) return { message: "SERVICE_UNAVALIABLE" };

        // eslint-disable-next-line no-return-await
        return await response.json();
      })
      .catch((err) => err);
  }

  // eslint-disable-next-line class-methods-use-this
  async getValidate(_url, token) {
    const url = new URL(`${API_URL}${_url}`);
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        console.log("red",res)
        const payload = await res.json();

        if (res.status === 401) {
          await store.dispatch(authActions.logout(true));
          return res;
        }
        return payload;
      })
      .catch((err) => err);
  }

  // eslint-disable-next-line class-methods-use-this
  async get(url, params) {
    const completeUrl = new URL(`${API_URL}${url}`);

    if (params)
      Object.keys(params).forEach((key) => completeUrl.searchParams.append(key, params[key]));
    return  await octokit.request(
      `GET ${completeUrl}`,  {
        username: 'USERNAME'
    })
      .then(async (res) => {
        const payload = await res;

        if (res.status === 401) {
          await store.dispatch(authActions.logout(true));
          return res;
        }

        if (payload.status === 404) return { message: "SERVICE_UNAVALIABLE" };

        return payload;
      })
      .catch((err) => err);
  }

  async put(url, data, formData) {
    const dataBody = formData ? this.setStructureFormdata(data) : JSON.stringify(data);

    const token = await Token.get();
    return Promise.race([
      fetch(`${API_URL}${url}`, {
        method: "PUT",
        headers: formData
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        body: dataBody,
      }),
      new Promise((_, reject) =>
        // eslint-disable-next-line prefer-promise-reject-errors
        setTimeout(() => reject({ payload: { error: "TIMEOUT" } }), 28000)
      ),
    ])
      .then(async (response) => {
        if (response.status === 401) await store.dispatch(authActions.logout(true));

        if (response.status === 404) return { message: "SERVICE_UNAVALIABLE" };

        // eslint-disable-next-line no-return-await
        return await response.json();
      })
      .catch((err) => err);
  }

  // eslint-disable-next-line class-methods-use-this
  setStructureFormdata(data) {
    const dataBody = new FormData();
    Object.keys(data).map((key) => {
      if (!Array.isArray(data[key])) {
        const isFile = data[key] && data[key].size;
        const isJson = typeof data[key] === "object";

        dataBody.append(key, isFile || !isJson ? data[key] : JSON.stringify(data[key]));
      } else data[key].forEach((item) => dataBody.append(key, item));
      return key;
    });
    return dataBody;
  }
}

export default new Api();
