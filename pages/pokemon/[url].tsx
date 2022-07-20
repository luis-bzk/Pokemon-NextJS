import { Layout } from "../../components/layouts";
import { SmallPokemon } from "../../interfaces";

interface Props {
  pokemon: SmallPokemon;
}

const PokemonPage = () => {
  return (
    <Layout>
      <p>one pokemon</p>
    </Layout>
  );
};

export default PokemonPage;
