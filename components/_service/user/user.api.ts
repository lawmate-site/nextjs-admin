"use server";

import { userInstance } from "@/components/config/axios-config";

export const findAllUserApi = async () => {
  try {
    const response = await userInstance().get(`/all`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
