"use client";

import { IAdmin } from "@/components/_model/admin/admin";
import { getAdminById } from "@/components/_service/admin/admin.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AdminSinglePage = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({} as IAdmin);

  const handleChange = async () => {
    // console.log(e.target.value);
  };

  const getSingleAdmin = async (id: any) => {
    try {
      await dispatch(getAdminById(id)).then((res: any) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      getSingleAdmin(props.params.id);
    };
  }, []);

  return (
    <>
      <div>{props.params.id}</div>
    </>
  );
};

export default AdminSinglePage;
