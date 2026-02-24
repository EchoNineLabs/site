document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".hextra-sidebar-container li > a").forEach(element => {
        switch (element.textContent.trim()) {
            case "Kite":
            case "LuaLink":
                element.classList.add("hx:font-semibold")
                break;
            default:
                break;
        }
    })
})

