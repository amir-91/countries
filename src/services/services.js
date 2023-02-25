import axios from "axios";

export async function getAllCountries(url, onSuccuess, onError) {
  try {
    const res = await axios.get(`${url}`);
    onSuccuess(res);
  } catch (err) {
    onError(err);
  }
}

export async function searchByRegion(url, region, onSuccuess, onError) {
  try {
    const res = await axios.get(`${url}/${region}`);
    onSuccuess(res);
  } catch (err) {
    onError(err);
  }
}

export async function searchByCountry(url, country, onSuccuess, onError) {
  try {
    const res = await axios.get(`${url}/${country}`);
    onSuccuess(res);
  } catch (err) {
    onError(err);
  }
}

export async function searchByCode(url, code, onSuccuess, onError) {
  try {
    const res = await axios.get(`${url}/${code}`);
    onSuccuess(res);
  } catch (err) {
    onError(err);
  }
}
