import React from "react";
import { ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { QueryEpisodeArgs, QueryLocationArgs } from "../../graphql/types";
import { gql, useQuery } from "@apollo/client";
import ModalAnother from "../../components/ui/ModalAnother";
import CenterBox from "../../components/ui/CenterBox";
import Spinner from "../../components/ui/Spinner";
import { PropsRoot } from "../../navigation/types";
import Colors from "../../constants/Colors";

interface AnotherModalProps extends PropsRoot<"AnotherModal"> {}

export default function AnotherModal(props: AnotherModalProps) {
  const { id, filter } = props.route.params;
  let isLocation = filter === "location";
  const { loading, data } = useQuery<any, QueryEpisodeArgs | QueryLocationArgs>(
    isLocation ? GET_LOCATION : GET_EPISODE,
    {
      variables: { id },
    }
  );
  if (loading) {
    return <Spinner />;
  }
  const itemProp = isLocation ? data.location : data.episode;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ModalAnother
        onPress={() => props.navigation.goBack()}
        data={itemProp}
        filter={filter}
      />
    </SafeAreaView>
  );
}

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
