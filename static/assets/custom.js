document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".hextra-sidebar-container li > a").forEach(element => {
        switch (element.textContent.trim()) {
            case "Kite":
            case "LuaLink":
                element.classList.add("hx:font-semibold")
                element.style.textDecoration = "underline"
                break;
            default:
                break;
        }
    })
})

