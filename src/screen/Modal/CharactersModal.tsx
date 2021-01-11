import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Character, QueryCharacterArgs } from "../../graphql/types";
import { gql, useQuery } from "@apollo/client";
import ModalCharacter from "../../ui/CharacterModal";
import CenterBox from "../../ui/CenterBox";
import { PropsRoot } from "../../navigation/types";
import Colors from "../../constants/Colors";

interface CharactersModalProps extends PropsRoot<"CharacterModal"> {}

interface Data {
  character: Character;
}

export default function CharactersModal(props: CharactersModalProps) {
  const { loading, data } = useQuery<Data, QueryCharacterArgs>(GET_CHARACTER, {
    variables: { id: props.route.params.id },
  });
  return (
    <>
      {loading && (
        <CenterBox>
          <ActivityIndicator size="small" color={Colors.primary} />
        </CenterBox>
      )}
      {!loading && data && data.character && (
        <ModalCharacter
          onPress={() => props.navigation.goBack()}
          character={data?.character}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

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
