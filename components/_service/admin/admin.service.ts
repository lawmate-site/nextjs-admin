import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminSaveApi,
  allStatsOfLawyersApi,
  countEnabledAdminApi,
  deleteAdminApi,
  getAdminByIdApi,
  getAllAdminApi,
  getLast7DaysApi,
  getMonthlyVisitsApi,
  getYearVisitsApi,
  permitAdminByIdApi,
  revokeAdminByIdApi,
  saveApi,
  saveVisitsApi,
  searchAdminApi,
  sendBulkMailApi,
  sendMailApi,
  totalStatsOfLawyerApi,
  updateAdminApi,
} from "./admin.api";
import {
  IAdmin,
  ISendBulkMail,
  ISendMail,
} from "@/components/_model/admin/admin";
import { Date } from "@/components/_model/manage/manage";

export const adminSave: any = createAsyncThunk(
  "admin/adminSave",
  async (admin: IAdmin) => {
    const data: any = await adminSaveApi(admin);
    return data;
  }
);

export const getAdminById: any = createAsyncThunk(
  "admin/getAdminById",
  async (id: number) => {
    const data: any = await getAdminByIdApi(id);
    return data;
  }
);

export const getAllAdmin: any = createAsyncThunk(
  "admin/getAllAdmin",
  async () => {
    const data: any = await getAllAdminApi();
    return data;
  }
);

export const updateAdmin: any = createAsyncThunk(
  "admin/updateAdmin",
  async (admin: IAdmin) => {
    const data: any = await updateAdminApi(admin);
    return data;
  }
);

export const deleteAdmin: any = createAsyncThunk(
  "admin/deleteAdmin",
  async (id: number) => {
    const data: any = await deleteAdminApi(id);
    return data;
  }
);

export const permitAdminById: any = createAsyncThunk(
  "admin/permitAdminById",
  async (id: number) => {
    const data: any = await permitAdminByIdApi(id);
    return data;
  }
);

export const revokeAdminById: any = createAsyncThunk(
  "admin/revokeAdminById",
  async (id: number) => {
    const data: any = await revokeAdminByIdApi(id);
    return data;
  }
);

export const countEnabledAdmin: any = createAsyncThunk(
  "admin/countEnabledAdmin",
  async () => {
    const data: any = await countEnabledAdminApi();
    return data;
  }
);

export const searchAdmin: any = createAsyncThunk(
  "admin/searchAdmin",
  async (keyword: string) => {
    const data: any = await searchAdminApi(keyword);
    return data;
  }
);

export const sendMail: any = createAsyncThunk(
  "admin/sendMail",
  async (mail: ISendMail) => {
    const data: any = await sendMailApi(mail);
    return data;
  }
);

export const sendBulkMail: any = createAsyncThunk(
  "admin/sendBulkMail",
  async (mail: ISendBulkMail) => {
    const data: any = await sendBulkMailApi(mail);
    return data;
  }
);

export const totalStatsOfLawyers: any = createAsyncThunk(
  "admin/totalStatsOfLawyers",
  async () => {
    const data: any = await totalStatsOfLawyerApi();
    return data;
  }
);

export const authFalseStatsOfLawyers: any = createAsyncThunk(
  "admin/authFalseStatsOfLawyers",
  async () => {
    const data: any = await totalStatsOfLawyerApi();
    return data;
  }
);

export const allStatsOfLawyers: any = createAsyncThunk(
  "admin/allStatsOfLawyers",
  async () => {
    const data: any = await allStatsOfLawyersApi();
    return data;
  }
);

export const saveVisits: any = createAsyncThunk(
  "admin/saveVisits",
  async () => {
    const data: any = await saveVisitsApi();
    return data;
  }
);

export const getMonthlyVisits: any = createAsyncThunk(
  "admin/getMonthlyVisits",
  async (month: Date) => {
    const data: any = await getMonthlyVisitsApi(month);
    return data;
  }
);

export const getYearVisits: any = createAsyncThunk(
  "admin/getYearVisits",
  async (year: Date) => {
    const data: any = await getYearVisitsApi(year);
    return data;
  }
);

export const getLast7Days: any = createAsyncThunk(
  "admin/getLast7Days",
  async () => {
    const data: any = await getLast7DaysApi();
    return data;
  }
);

export const findAll: any = createAsyncThunk("admin/findAll", async () => {
  const data: any = await getAllAdminApi();
  return data;
});

export const save: any = createAsyncThunk(
  "admin/save",
  async (formData: any) => {
    const data: any = await saveApi(formData);
    return data;
  }
);
