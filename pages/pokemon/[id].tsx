import { useState, useEffect } from "react";

import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import confeti from "canvas-confetti";

import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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
  const allPokemons = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: allPokemons.map((id) => ({
      params: { id: id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
  };
};

export default PokemonPage;
