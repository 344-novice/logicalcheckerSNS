import api from "./api";

export const getUser = async (userId) => {
    return await api.get(`/api/user/${userId}`);
};

export const uploadToCloudinary = async (formData) => {
    return await api.post("/api/cloudinary/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const postUserThumbnail = async (userId, secure_url) => {
    return await api.patch(`/api/user/${userId}/thumbnail`, {
        image: secure_url,
    });
};

export const updateUserInfo = async (userId, updateData) => {
    return await api.patch(`/api/user/${userId}/info`, updateData);
};
