import { useState, useEffect } from "react";

import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import confeti from "canvas-confetti";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";
import { PokemonListResponse } from "../../interfaces";
import { getPokemonInfo } from "../../utils/getPokemonInfo";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confeti({
      zIndex: 100,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    });
  };

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
  }, [pokemon.id]);

  return (
    <Layout title={pokemon.name}>
      <div className="pokemon-page container">
        <div className="pokemon-page__image">
          <div>
            <Image
              layout="responsive"
              width={100}
              height={"100%"}
              src={
                pokemon.sprites.other?.dream_world.front_default || "./no-image"
              }
              alt={pokemon.name}
            />
          </div>
        </div>

        <div className="pokemon-page__info">
          <div className="pokemon-page__info header">
            <h1>{pokemon.name}</h1>
            <button
              className={`favorite-button ${isInFavorites ? "added" : ""}`}
              type="submit"
              onClick={onToggleFavorite}
            >
              {isInFavorites ? "In favorites" : "Save favorites"}
            </button>
          </div>

          <div className="pokemon-page__info body">
            <p>Sprites:</p>
            <div className="body-images">
              <div>
                <Image
                  width={100}
                  height={"100%"}
                  src={pokemon.sprites.front_default}
                  alt={`${pokemon.sprites} pokemon`}
                />
              </div>

              <div>
                <Image
                  width={100}
                  height={"100%"}
                  src={pokemon.sprites.back_default}
                  alt={`${pokemon.sprites} pokemon`}
                />
              </div>

              <div>
                <Image
                  width={100}
                  height={"100%"}
                  src={pokemon.sprites.front_shiny}
                  alt={`${pokemon.sprites} pokemon`}
                />
              </div>

              <div>
                <Image
                  width={100}
                  height={"100%"}
                  src={pokemon.sprites.back_shiny}
                  alt={`${pokemon.sprites} pokemon`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name: name },
    })),
    // fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon: pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonByNamePage;
