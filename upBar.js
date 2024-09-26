document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.link-other-website');

    links.forEach((link, index) => {
        if (index < links.length - 1) {
            const separator = document.createElement('span');
            separator.classList.add('separator');
            link.parentNode.insertAdjacentElement('afterend', separator);
        }
    });
});
