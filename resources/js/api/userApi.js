import api from "./api";

export const getUser = async (id) => {
    return await api.get(`/api/user/${id}`);
};

export const postUserThumbnail = async (id, secure_url) => {
    return await api.patch(`/api/user/${id}/thumbnail`, {
        image: secure_url,
    });
};
