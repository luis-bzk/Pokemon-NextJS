import { FC } from "react";
import { SmallPokemon } from "../../interfaces";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { name, image, id } = pokemon;

  const router = useRouter();

  const onClick = () => {
    router.push(`pokemon/${id}`);
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card__image">
        <Image
          layout="responsive"
          width="100%"
          height={100}
          src={image}
          alt={`pokemon ${name}`}
        />
      </div>

      <div className="card__data">
        <p>{name}</p>
        <p>{id}</p>
      </div>
    </div>
  );
};
