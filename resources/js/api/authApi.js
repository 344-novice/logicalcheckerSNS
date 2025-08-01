import axios from "axios";

export const loginAuthentication = async (form) => {
    const formData = new FormData(form);

    return axios.post(form.action, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
                .content,
        },
    });
};
