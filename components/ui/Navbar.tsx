import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Link href="/">
          <a className="navbar__title">
            <h2 className="title-l">P</h2>
            <h3 className="title-d">okemon</h3>
          </a>
        </Link>
      </div>

      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="pokemon"
        width={100}
        height={100}
      />

      <Link href="/favorites">
        <a className="navbar__fav">favorites</a>
      </Link>
    </div>
  );
};
