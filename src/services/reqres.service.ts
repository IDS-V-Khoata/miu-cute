import axios from "../libs/axios";

export const reqresService = {
    getUsers: async (page = 1) => {
        const { data } = await axios.get(`/users?page=${page}`);
        return data; // { page, per_page, total, data: [...] }
    },

    getUser: async (id: number) => {
        const { data } = await axios.get<{ data: string[] }>(`/users/${id}`);
        return data.data;
    },

    createUser: async (payload: string) => {
        const { data } = await axios.post("/users", payload);
        return data; // { name, job, id, createdAt }
    },

    login: async (payload: { email: string; password: string }) => {
        const { data } = await axios.post("/login", payload);
        return data; // { token: ... }
    },

    register: async (payload: string) => {
        const { data } = await axios.post("/register", payload);
        return data; // { id, token }
    },
};
