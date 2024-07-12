"use server";

import {
  IAdmin,
  ISendBulkMail,
  ISendMail,
} from "@/components/_model/admin/admin";
import { Date } from "@/components/_model/manage/manage";
import { adminInstance } from "@/components/config/axios-config";

export const adminSaveApi = async (admin: IAdmin) => {
  try {
    const response = await adminInstance().post("/save", admin);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAdminByIdApi = async (id: number) => {
  try {
    const response = await adminInstance().get(`/${id}`, {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllAdminApi = async () => {
  try {
    const response = await adminInstance().get("/all", {});

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateAdminApi = async (admin: IAdmin) => {
  try {
    const response = await adminInstance().put(`/${admin.id}`, admin);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteAdminApi = async (id: number) => {
  try {
    const response = await adminInstance().delete(`/${id}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const permitAdminByIdApi = async (id: number) => {
  try {
    const response = await adminInstance().get(`/permit/${id}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const revokeAdminByIdApi = async (id: number) => {
  try {
    const response = await adminInstance().get(`/revoke/${id}`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const countEnabledAdminApi = async () => {
  try {
    const response = await adminInstance().get("/countEnabled");

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searchAdminApi = async (keyword: string) => {
  try {
    const response = await adminInstance().get(`/search`, {
      params: { keyword },
    });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendMailApi = async (mail: ISendMail) => {
  try {
    const response = await adminInstance().post(`/mail/send`, mail);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendBulkMailApi = async (mail: ISendBulkMail) => {
  try {
    const response = await adminInstance().post(`/mail/send-bulk`, mail);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const totalStatsOfLawyerApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/total`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authFalseStatsOfLawyerApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/authFalse`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const allStatsOfLawyersApi = async () => {
  try {
    const response = await adminInstance().get(`/lawyer/stats/all`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveVisitsApi = async () => {
  try {
    const response = await adminInstance().post(`/visit/save`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMonthlyVisitsApi = async (month: Date) => {
  try {
    const response = await adminInstance().get(`/visit/month`, {
      params: { month },
    });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getYearVisitsApi = async (year: Date) => {
  try {
    const response = await adminInstance().get(`/visit/year`, {
      params: { year },
    });

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getLast7DaysApi = async () => {
  try {
    const response = await adminInstance().get(`/visit/last7days`);

    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findAllApi = async () => {
  try {
    const response = await adminInstance().get(`/board/all`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveApi = async (formData: any) => {
  try {
    const data = await adminInstance().post(`/board/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error saving board:", error);
    return Promise.reject(error); // Reject the promise with the error
  }
};
