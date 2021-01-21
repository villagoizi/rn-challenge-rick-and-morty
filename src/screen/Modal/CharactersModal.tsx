import React from "react";
import { Character, QueryCharacterArgs } from "../../graphql/types";
import { gql, useQuery } from "@apollo/client";
import ModalCharacter from "../../components/ui/CharacterModal";
import Spinner from "../../components/ui/Spinner";
import { PropsRoot } from "../../navigation/types";

interface CharactersModalProps extends PropsRoot<"CharacterModal"> {}

interface Data {
  character: Character;
}

export default function CharactersModal(props: CharactersModalProps) {
  const { loading, data } = useQuery<Data, QueryCharacterArgs>(GET_CHARACTER, {
    variables: { id: props.route.params.id },
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <ModalCharacter
      onPress={() => props.navigation.goBack()}
      character={data?.character}
    />
  );
}

const GET_CHARACTER = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      type
      gender
      species
      image
    }
  }
`;
