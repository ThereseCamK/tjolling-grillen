export default function Header(){
    return `   <header class="header">
      <div class="header-container">

        <div class="logo">
          <img src="./public/images/Tjollinglogo.png">
        </div>

        <!-- Desktop nav -->
        <nav class="nav">
          <a href="/" data-link>Hjem</a>
          <a href="/menu" data-link>Meny</a>
        
        </nav>

        <!-- Mobile hamburger -->
        <div class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

      <!-- Mobile menu -->
      <div class="mobile-menu" id="mobile-menu">
        <a href="/" data-link>Hjem</a>
        <a href="/menu" data-link>Meny</a>

        <a href="tel:+4733311711" class="call-btn">📞 Ring oss</a>
      </div>
    
    </header>`
}
export function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("open");
  });
  document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mobile-menu").classList.remove("open");
    document.getElementById("hamburger").classList.remove("active");
  });
});
}