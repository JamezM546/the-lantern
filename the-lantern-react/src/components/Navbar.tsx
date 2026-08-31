//Top nav links: Home and My List
type NavbarProps = {
    currentPage: "home" | "mylist";
    onHome: () => void;
    onMyList: () => void;
}

function Navbar({ currentPage, onHome, onMyList }: NavbarProps) {

    const homeClass = currentPage === "home" ? "nav-link active" : "nav-link";
    const myListClass = currentPage === "mylist" ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar">
            <a
                href="#"
                className={homeClass}
                onClick={function (event) {
                    event.preventDefault();
                    onHome();
                }}
            >
                Home
            </a>
            <a
                href="#"
                className={myListClass}
                onClick={function (event) {
                    event.preventDefault();
                    onMyList();
                }}
            >
                My List
            </a>
        </nav>
    );
}

export default Navbar;
