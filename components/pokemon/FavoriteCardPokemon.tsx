import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  id: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ id }) => {
  const router = useRouter();

  const onFavCardClick = () => {
    router.push(`pokemon/${id}`);
  };
  return (
    <div className="card-fav-poke" onClick={onFavCardClick}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        width={100}
        height={"100%"}
      />
    </div>
  );
};
