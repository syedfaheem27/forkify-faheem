import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchData = fetch(url);
    const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchData = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
