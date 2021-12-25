import { customFetch } from "./utils.js";

export async function login(credentials) {
  try {
    return await customFetch.post("/auth/login", credentials, false);
  } catch (err) {
    return err;
  }
}

export async function submitForm(villageId, values) {
  try {
    return await customFetch.post(`/census/${villageId}`, values);
  } catch (err) {
    return err;
  }
}

export async function getHouseholdList(villageId) {
  try {
    return await customFetch.get(`/census/${villageId}/households`);
  } catch (err) {
    return err;
  }
}

export async function addNewHousehold(villageId) {
  try {
    return await customFetch.post(`/census/${villageId}/households`);
  } catch (err) {
    return err;
  }
}

export async function getHouseholdDetails(villageId, householdId) {
  try {
    return await customFetch.get(`/census/${villageId}/households/${householdId}`);
  } catch (err) {
    return err;
  }
}

export async function deleteInfo(villageId, infoId) {
  try {
    return await customFetch.delete(
      `/census/${villageId}/households/info/${infoId}`
    );
  } catch (err) {
    return err;
  }
}

export async function checkPrivileges() {
  try {
    return await customFetch.get("/priv");
  } catch (err) {
    return err;
  }
}

export async function getVillageList() {
  try {
    return await customFetch.get("/departments/villages");
  } catch (err) {
    return err;
  }
}

export async function getLocalCitizenAmount() {
  try {
    return await customFetch.get("/citizen/amount/local");
  } catch (err) {
    return err;
  }
}

export async function getTotalCitizenAmount() {
  try {
    return await customFetch.get("/citizen/amount");
  } catch (err) {
    return err;
  }
}

export async function getInferiorInfo(username) {
  try {
    return await customFetch.get(`/departments?id=${username}`);
  } catch (err) {
    return err;
  }
}

export async function getInferiorAmount() {
  try {
    return await customFetch.get("/departments/amount");
  } catch (err) {
    return err;
  }
}

export async function confirmComplete() {
  try {
    return await customFetch.post("/census/progress");
  } catch (err) {
    return err;
  }
}