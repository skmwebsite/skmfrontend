import { get } from "http";
import axiosClient from "./config/axiosClient";
import { TMeta } from "./type";

export const metaTagsApi = {
  getGeneralTags: async (): Promise<TMeta | null> => {
    try {
      const response = await axiosClient.get("/meta/general");
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getShopTags: async (): Promise<TMeta | null> => {
    try {
      const response = await axiosClient.get(`/meta/shop`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getCategoriesTags: async (): Promise<TMeta | null> => {
    try {
      const response = await axiosClient.get(`/meta/categories`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAboutUsTags: async (): Promise<TMeta | null> => {
    try {
      const response = await axiosClient.get(`/meta/about-us`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getContactUsTags: async (): Promise<TMeta | null> => {
    try {
      const response = await axiosClient.get(`/meta/contact-us`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getShopInnerPageTags: async (slug: string): Promise<TMeta | null> => {
    try {
      const response = await axiosClient.get(`/product-meta/${slug}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
