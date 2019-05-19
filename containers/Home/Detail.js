import { defaultNavigationOptions } from "../../constants/navigation";
import dimensions from "../../constants/dimensions";
import React from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Button,
  Text
} from "native-base";
import { StyleSheet, StatusBar, ImageBackground } from "react-native";
import TabBarIcon from "../../components/TabBarIcon";
import ProgressBar from "react-native-progress/Bar";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    borderRadius: 0,
    paddingTop: 0
  },
  iconText: {
    paddingLeft: 8,
    paddingRight: 16
  },
  iconTextRight: {
    paddingLeft: 8,
    paddingRight: 4
  },
  catagory: {
    color: "grey",
    paddingRight: 15,
    fontSize: 16,
    fontWeight: "400"
  },
  detail: {
    color: "grey",
    fontWeight: "100",
    fontSize: 14
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  tag: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    height: 30,
    borderWidth: 1,
    borderColor: "#a6a2a2",
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 5
  },
  tagText: {
    color: "grey",
    fontSize: 14,
    paddingLeft: 5,
    paddingRight: 5
  }
});

class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      ...defaultNavigationOptions,
      title: navigation.getParam("name", "unknown").toUpperCase()
    };
  };

  render() {
    const { navigation } = this.props;
    const dressCode = navigation.getParam("dressCode", "");
    const waitTimeMinutes = navigation.getParam("waitTimeMinutes", "N/A");
    const litScore = navigation.getParam("litScore", "N/A");
    const photoURL = navigation.getParam("photoURL", "https://bit.ly/2W5f98m");
    const maxCapacity = parseInt(navigation.getParam("maxCapacity", 0));
    const headcountMale = parseInt(navigation.getParam("headcountMale", 0));
    const headcountFemale = parseInt(navigation.getParam("headcountFemale", 0));
    const coverChargeDollars = parseInt(
      navigation.getParam("coverChargeDollars", "N/A")
    );
    const coverChargeDollarsFemale = navigation.getParam(
      "coverChargeDollarsFemale",
      "N/A"
    );
    const hoursOfOperation = JSON.parse(
      navigation.getParam("hoursOfOperation", [])
    );
    const musicPreferences = JSON.parse(
      navigation.getParam("musicPreferences", [])
    );

    const totalCurrentHeadcount = headcountMale + headcountFemale;
    const d = new Date();
    const currentDay = hoursOfOperation.length === 7 ? d.getDay() : 0;

    return (
      <Container style={{ backgroundColor: "black" }}>
        <StatusBar barStyle="light-content" />
        <Content>
          <Card
            style={{
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              borderLeftWidth: 0
            }}
          >
            <CardItem cardBody={true}>
              <ImageBackground
                style={{
                  height: dimensions.window.width - 35,
                  width: "100%",
                  justifyContent: "flex-end"
                }}
                source={{ uri: photoURL }}
              >
                <Button
                  onPress={() => alert("Pressed")}
                  style={{
                    alignSelf: "flex-end",
                    shadowOpacity: 0.8,
                    width: 90,
                    height: 30,
                    borderRadius: 15,
                    borderColor: "#017bf6",
                    borderWidth: 1,
                    backgroundColor: "black",
                    marginBottom: 20,
                    marginRight: 18
                  }}
                >
                  <Text style={{ color: "#a6a2a2" }}>View All</Text>
                </Button>
              </ImageBackground>
            </CardItem>
            <CardItem style={styles.card}>
              <Left>
                <Button disabled={true} iconLeft={true} transparent={true}>
                  <TabBarIcon
                    size={30}
                    color="white"
                    name="fire"
                    type="MaterialCommunityIcons"
                  />
                  <Text style={styles.iconText}>{litScore}</Text>
                </Button>
              </Left>
              <Body>
                <Button
                  disabled={true}
                  iconLeft={true}
                  transparent={true}
                  style={{ justifyContent: "center" }}
                >
                  <TabBarIcon
                    size={30}
                    color="white"
                    name="time-slot"
                    type="Entypo"
                  />

                  <Text style={styles.iconText}>{waitTimeMinutes}min</Text>
                </Button>
              </Body>
              <Right>
                <Button disabled={true} iconLeft={true} transparent={true}>
                  <TabBarIcon
                    size={30}
                    color="white"
                    name="wallet"
                    type="Entypo"
                  />
                  <Text style={styles.iconTextRight}>
                    ${coverChargeDollars
                      ? coverChargeDollars
                      : coverChargeDollarsFemale}
                  </Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem style={styles.card}>
              <Text style={styles.catagory}>Capacity </Text>

              <ProgressBar
                progress={totalCurrentHeadcount / maxCapacity}
                width={200}
                borderColor={"#5428BD"}
                unfilledColor={"#000000"}
                color={"#a6a2a2"}
              />
            </CardItem>
            <CardItem style={styles.card}>
              <Text style={styles.catagory}>M/F Ratio</Text>

              <ProgressBar
                progress={headcountMale / totalCurrentHeadcount}
                width={200}
                unfilledColor={"#D87492"}
                color={"#006FF0"}
              />
            </CardItem>
            <CardItem style={styles.card}>
              <Text style={styles.catagory}>Dress Code</Text>

              <Text style={styles.detail}>{dressCode}</Text>
            </CardItem>
            <CardItem style={styles.card}>
              <Text style={styles.catagory}>Hours of Operation</Text>
              <Text style={styles.detail}>
                {hoursOfOperation[currentDay][0]},{" "}
                {hoursOfOperation[currentDay][1]}
              </Text>
            </CardItem>
            <CardItem style={styles.card}>
              <Text style={styles.catagory}>Music Styles</Text>
            </CardItem>

            <CardItem style={[styles.card, styles.tagsContainer]}>
              {musicPreferences.map(name => (
                <Button
                  key={name}
                  transparent
                  disabled={true}
                  style={styles.tag}
                >
                  <Text style={styles.tagText}>{name}</Text>
                </Button>
              ))}
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Detail;
