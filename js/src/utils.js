export function setActiveNav(){
    const links = document.querySelectorAll(".navbar a");
    const currentPath = window.location.pathname;

    links.forEach(link => {
        const linkPath = link.getAttribute("href");
        link.classList.remove("active");

        if(link.pathname === path){
            link.classList.add("active");
        }
    });
}