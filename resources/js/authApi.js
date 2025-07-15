import api from "./api/api";

export const getCsrfCookie = async () => {
    return await api.get("/sanctum/csrf-cookie");
};
