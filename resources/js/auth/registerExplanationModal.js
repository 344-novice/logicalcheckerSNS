document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("register-explanation-modal");
    const optOutBtn = document.getElementById("modal-optout-checkbox");
    const hasOptedOut = document.cookie.includes("register_modal_opt_out=true");
    const closeBtn = document.getElementById("modal-close-button");
    const hasErrors = window.registerPageData?.hasErrors ?? false;

    if (!hasOptedOut && !hasErrors && modal) {
        modal.classList.remove("hidden");
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }

    if (optOutBtn && modal) {
        optOutBtn.addEventListener("click", () => {
            document.cookie =
                "register_modal_opt_out=true; path=/; max-age=" +
                60 * 60 * 24 * 365;
        });
    }
});
