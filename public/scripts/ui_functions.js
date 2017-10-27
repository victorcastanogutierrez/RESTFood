assignChecks();

function assignChecks() {
    $(".form-check-input").on("click", element => {
        addToMenu(element.target);
    });
}