function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

window.addEventListener("DOMContentLoaded", function() {
    const profilePic = document.getElementById("profile-picture");
    if (profilePic) {
        profilePic.addEventListener("click", toggleDropdown);
    }
});
