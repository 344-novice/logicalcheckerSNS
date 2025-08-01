import "./bootstrap";
import Alpine from "alpinejs";
import "./auth/registerExplanationModal.js";
import { playDialUpAudioAndSubmit } from "./auth/commonAudio.js";

window.Alpine = Alpine;

Alpine.start();

document.addEventListener("DOMContentLoaded", () => {
    playDialUpAudioAndSubmit("login-form", "login-button");
});
