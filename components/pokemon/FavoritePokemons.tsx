import { FC } from "react";
import { FavoriteCardPokemon } from "./FavoriteCardPokemon";

interface Props {
  pokemons: Array<number>;
}

export const FavoritesPokemons: FC<Props> = ({ pokemons }) => {
  return (
    <div className="container grid-fav-pokemons">
      {pokemons.map((pokemonId) => (
        <FavoriteCardPokemon id={pokemonId} key={pokemonId} />
      ))}
    </div>
  );
};
