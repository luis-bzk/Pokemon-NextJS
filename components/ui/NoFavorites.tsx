import Image from "next/image";

export const NoFavorites = () => {
  return (
    <div className="container favorites">
      <Image
        width={100}
        height={"100%"}
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
        }
        alt="no favorites"
      />
      <h1>There are not favorites</h1>
    </div>
  );
};
