import { defaultNavigationOptions } from "../../constants/navigation";
import React from "react";
import { musicPreference } from "../../constants/enums";
import TabBarIcon from "../../components/TabBarIcon";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Title,
  Button,
  Text,
  Icon,
  Segment,
  Footer
} from "native-base";
import {
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

class MusicPreference extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      ...defaultNavigationOptions,
      title: "MUSIC"
    };
  };

  preferenceButtons = () => {
    return Object.keys();
  };
  render() {
    return (
      <Container
        style={{
          alignItems: "center",
          backgroundColor: "black",
          flexDirection: "column",
          padding: 36
        }}
      >
        <Card
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            borderColor: "black"
          }}
        >
          <Image
            style={{
              height: 128,
              marginBottom: 28,
              marginTop: 16,
              maxWidth: "100%",
              resizeMode: "contain",
              backgroundColor: "black"
            }}
            source={require("../../assets/images/music.png")}
          />
          <Card
            style={{
              padding: 18,
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.preferenceButtons()}
          </Card>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default MusicPreference;
