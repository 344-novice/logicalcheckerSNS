import axios from "axios";

export const getUser = async (id) => {
    const resUser = await axios.get(`http://127.0.0.1:8000/api/user/${id}`, {
        withCredentials: true,
    });
    return resUser;
};

export const postUserThumbnail = async (id) => {
    await axios.patch(
        `http://127.0.0.1:8000/api/user/${id}/thumbnail`,
        { image: data.secure_url },
        { withCredentials: true }
    );
};
