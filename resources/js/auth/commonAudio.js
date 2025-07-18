export function playDialUpAudioAndSubmit(formId, buttonIds) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        buttonIds.forEach((id) => {
            const btn = document.getElementById(id);
            if (btn) btn.disabled = true;
        });

        const audio = new Audio("/dial-up_connection.mp3");
        audio
            .play()
            .then(() => {
                setTimeout(() => {
                    e.target.submit();
                }, 5000);
            })
            .catch(() => {
                e.target.submit();
            });
    });
}
