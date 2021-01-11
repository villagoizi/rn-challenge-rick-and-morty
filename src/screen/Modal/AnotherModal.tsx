import React from "react";
import { ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { QueryEpisodeArgs, QueryLocationArgs } from "../../graphql/types";
import { gql, useQuery } from "@apollo/client";
import ModalAnother from "../../ui/ModalAnother";
import CenterBox from "../../ui/CenterBox";
import { PropsRoot } from "../../navigation/types";
import Colors from "../../constants/Colors";

interface AnotherModalProps extends PropsRoot<"AnotherModal"> {}

export default function AnotherModal(props: AnotherModalProps) {
  const { id, filter } = props.route.params;

  const { loading, data } = useQuery<any, QueryEpisodeArgs | QueryLocationArgs>(
    filter === "location" ? GET_LOCATION : GET_EPISODE,
    {
      variables: { id },
    }
  );
  const itemProp =
    data && !!data.episode
      ? data.episode
      : data && !!data.location
      ? data.location
      : undefined;
  return (
    <>
      {loading && (
        <CenterBox>
          <ActivityIndicator size="small" color={Colors.primary} />
        </CenterBox>
      )}
      {!loading && !!data && itemProp && (
        <SafeAreaView style={{ flex: 1 }}>
          <ModalAnother
            onPress={() => props.navigation.goBack()}
            data={itemProp}
            filter={filter}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const GET_LOCATION = gql`
  query getLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        image
        name
      }
    }
  }
`;

const GET_EPISODE = gql`
  query getEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        image
        name
      }
    }
  }
`;
