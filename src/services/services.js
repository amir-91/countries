import axios from "axios";

export async function getIpAddressData(url, onSuccuess, onError) {
  try {
    const res = await axios.get(`${url}`);
    onSuccuess(res);
  } catch (err) {
    onError(err);
  }
}

export async function getCurrentIpAddress(url, onSuccuess, onError) {
  try {
    const res = await axios.get(`${url}`);
    onSuccuess(res);
  } catch (err) {
    onError(err);
  }
}
