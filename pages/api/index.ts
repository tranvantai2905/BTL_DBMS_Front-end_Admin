import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL:
    // /* process.env.SERVER_HOST */ /* "https://vanlamcs-clothesshop.click" */ "http://localhost/LTW/BTL/Shop",
    process.env.SERVER_HOST
});

API.interceptors.request.use((req) => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user") || "{}").data.user.accessToken
    }`;
  }

  return req;
});

export const loginUser = async (dataForm: any) => {
  try {
    const response = await API.post("/auth/login", dataForm);
    return response.data;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const addCategory = async (category: any) => {
  try {
    const response = await API.post("/api/category", category);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getCategories = async (limit: any = 10, frame: any = 1) => {
  try {
    const response = await API.get(
      `/api/categories?limit=${limit}&frame=${frame}`
    );
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getCategoryById = async (id: any) => {
  try {
    const response = await API.get(`/api/category/${id}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const deleteCategory = async (id: any) => {
  try {
    const response = await API.delete(`/api/category/${id}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const updateCategory = async (id: any, name: string, desc: string) => {
  try {
    const response = await API.put(`/api/category/${id}`, {
      name,
      description: desc,
    });
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const addProduct = async (formData: any) => {
  try {
    const response = await API.post("/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getProducts = async (
  limit: any = 10,
  page: any = 1,
  order_by: string = "DESC"
) => {
  try {
    const response = await API.get(
      `/products?sortBy=created&limit=${limit}&page=${page}&order_by=${order_by}`
    );
    console.log(response)
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getSpecificProduct = async (id: any) => {
  try {
    const response = await API.get(`/product/${id}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const updateSpecificProduct = async (productId:string, formData: FormData) => {
  try {
    const response = await API.put(`/product/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const deleteSpecificProduct = async (id: any) => {
  try {
    const response = await API.delete(`api/product/${id}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getOrderById = async (id: any) => {
  try {
    const response = await API.get(`/api/order/${id}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getOrders = async (limit: any = 10, page: any = 1) => {
  try {
    const response = await API.get(
      `/orders?limit=${limit}&frame=${page}`
    );
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const updateStatusOrder = async (status: string, orderId: string) => {
  try {
    const response = await API.put("api/order/update-status", {
      status,
      orderId,
    });
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};
