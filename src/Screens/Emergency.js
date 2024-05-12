import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView, ScrollView, Linking} from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import RouteLine from "../Components/Customs/RouteLines/RouteLine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../Services/CommonMethods";
import { ContactUsFields } from "../Services/Constants/FIELDS";
import TextField from "../Components/Customs/TextField";
import TextButton from "../Components/Customs/Buttons/TextButton";
import styles from "./Styles";
import { comnPost } from "../Services/Api/CommonServices";
import Popup from "../Components/Common/Popup";
import Loader from "../Components/Customs/Loader";
import { setLoader } from "../Reducers/CommonActions";
import { connect } from "react-redux";
import STRING from "../Services/Constants/STRINGS";

const Emergency = ({ navigation, route, ...props }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    getData();
    return () => {
      backHandler.remove()
    }
  }, []);


  const getData = () => {
    props.setLoader(true);
    let data = {
      apitype: "list",
      // parent_id: 1,
      category: "emergency"
    };
    comnPost("v2/sites", data)
      .then((res) => {
        if (res && res.data.data)
        setData(res.data.data.data);
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
      });
  }

  const makePhoneCall = (address, apptype) => {
    const value = address[0][apptype];
    if (value && typeof value === 'string') {
      const prefix = apptype === 'phone' ? 'tel' : 'mailto';
      Linking.openURL(`${prefix}:${value}`);
    }
  };
  

  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.name} 
          <TextButton 
            title="Call" 
            onPress={() => makePhoneCall(item.address, 'phone')} 
            style={styles.callButton}
          />
           <TextButton 
            title="Email" 
            onPress={() => makePhoneCall(item.address, 'email')} 
            style={styles.callButton}
          />
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View>
      <Header
        name={STRING.HEADER.EMERGENCY}
        goBack={() => backPage(navigation)}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => backPage(navigation)}
            color={COLOR.black}
          />
        }
        endIcon={
          <></>
        }
      />
      <Loader />
      <ScrollView>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={renderItem}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
        style={{ marginBottom: 30 }}
      />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Emergency);
