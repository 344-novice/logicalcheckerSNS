import api from "./api";

export const getUser = async (id) => {
    return await api.get(`/api/user/${id}`);
};

export const uploadToCloudinary = async (formData) => {
    return await api.post("/api/cloudinary/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const postUserThumbnail = async (id, secure_url) => {
    return await api.patch(`/api/user/${id}/thumbnail`, {
        image: secure_url,
    });
};
