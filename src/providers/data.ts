import { DataProvider } from "@refinedev/core";
import { MOCK_SUBJECTS, API_URL } from "./constants";

export const dataProvider: DataProvider = {
  getList: async ({ resource }) => {
    if (resource === "subjects") {
      return {
        data: MOCK_SUBJECTS,
        total: MOCK_SUBJECTS.length,
      } as any;
    }
    return { data: [], total: 0 };
  },
  getOne: async () => { throw new Error("Not implemented"); },
  create: async () => { throw new Error("Not implemented"); },
  update: async () => { throw new Error("Not implemented"); },
  deleteOne: async () => { throw new Error("Not implemented"); },
  getApiUrl: () => API_URL,
};