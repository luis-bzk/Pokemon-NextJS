import { Text } from "@nextui-org/react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="navbar">
      {/* <Text className="navbar__title-l" h2>
        P
      </Text>
      <Text className="navbar__title" h3>
        okemon
      </Text> */}
      <div className="navbar__title">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="pokemon"
          width={100}
          height={100}
        />
        <h2 className="title-l">P</h2>
        <h3 className="title-d">okemon</h3>
      </div>

      <p className="navbar__fav">favorites</p>
    </div>
  );
};
