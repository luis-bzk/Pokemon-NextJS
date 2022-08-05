import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { FavoritesPokemons } from "../../components/pokemon";

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favorites">
      <>
        {favoritePokemons.length === 0 ? (
          <NoFavorites />
        ) : (
          <FavoritesPokemons pokemons={favoritePokemons} />
        )}
      </>
    </Layout>
  );
};

export default FavoritesPage;
