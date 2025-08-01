import { loginAuthentication } from "../api/authApi";

export function playDialUpAudioAndSubmit(formId, buttonId) {
    const form = document.getElementById(formId);
    const button = document.getElementById(buttonId);
    const audio = new Audio("/dial-up_connection.mp3");

    if (!form || !button) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        button.disabled = true;
        button.innerText = "ログイン中…";
        button.classList.add(
            "font-bold",
            "bg-white",
            "text-black",
            "border",
            "breeze-loading"
        );

        try {
            const response = await loginAuthentication(form);

            if (response.data.success === true) {
                audio
                    .play()
                    .then(() => {
                        setTimeout(() => {
                            window.location.href = "/home";
                        }, 5000);
                    })
                    .catch(() => {
                        window.location.href = "/home";
                    });
            }
        } catch (error) {
            form.submit();
        }
    });
}
