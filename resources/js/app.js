import "./bootstrap";
import Alpine from "alpinejs";
import "./auth/registerModal.js";
import { playDialUpAudioAndSubmit } from "./auth/commonAudio.js";

window.Alpine = Alpine;

Alpine.start();

document.addEventListener("DOMContentLoaded", () => {
    const dialUpForms = document.querySelectorAll("form[data-dialup='true']");

    dialUpForms.forEach((form) => {
        const formId = form.id;
        if (!formId) return;

        const buttons = Array.from(
            form.querySelectorAll("button[type='submit']")
        )
            .map((btn) => btn.id)
            .filter(Boolean);

        playDialUpAudioAndSubmit(formId, buttons);
    });
});
