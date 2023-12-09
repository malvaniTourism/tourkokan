import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Header from "../Components/Common/Header";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Ionicons from "react-native-vector-icons/Ionicons";
import { checkLogin, backPage, goBackHandler, navigateTo } from "../Services/CommonMethods";
import GlobalText from "../Components/Customs/Text";
import styles from "./Styles";
import TextButton from "../Components/Customs/Buttons/TextButton";
import STRING from "../Services/Constants/STRINGS";


const Pricing = ({ navigation, ...props }) => {

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    return () => {
      backHandler.remove()
    }
  }, []);

  const selectPlan = () => {
    console.log("");
  }

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Header
        name={STRING.HEADER.PRICING}
        goBack={() => backPage(navigation)}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => backPage(navigation)}
            color={COLOR.white}
          />
        }
      />
      <View style={styles.pricingView}>
        <View style={styles.pricingCard}>
          <GlobalText text={"Basic"} style={styles.pricingOptionTitle} />
          <GlobalText text={"$10/month"} style={styles.pricingOptionPrice} />
          <GlobalText text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."} style={styles.pricingOptionDescription} />

          <View style={styles.pricingOptionFeatures}>
            <GlobalText text={"1 user"} style={styles.pricingOptionFeature} />
            <GlobalText text={"10GB storage"} style={styles.pricingOptionFeature} />
            <GlobalText text={"Basic support"} style={styles.pricingOptionFeature} />
          </View>
          <TextButton
            title={STRING.BUTTON.CHOOSE_PLAN}
            containerStyle={styles.planButtonContainer}
            buttonStyle={styles.planButtonStyle}
            titleStyle={styles.planButtonTitleStyle}
            raised={true}
            onPress={selectPlan}
          />
        </View>
        <View style={styles.pricingCard}>
          <GlobalText text={"Pro"} style={styles.pricingOptionTitle} />
          <GlobalText text={"$25/month"} style={styles.pricingOptionPrice} />
          <GlobalText text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."} style={styles.pricingOptionDescription} />
          <View style={styles.pricingOptionFeatures}>
            <GlobalText text={"5 users"} style={styles.pricingOptionFeature} />
            <GlobalText text={"100GB storage"} style={styles.pricingOptionFeature} />
            <GlobalText text={"Priority support"} style={styles.pricingOptionFeature} />
          </View>
          <TextButton
            title={STRING.BUTTON.CHOOSE_PLAN}
            containerStyle={styles.planButtonContainer}
            buttonStyle={styles.planButtonStyle}
            titleStyle={styles.planButtonTitleStyle}
            raised={true}
            onPress={selectPlan}
          />
        </View>
        <View style={styles.pricingCard}>
          <GlobalText text={"Enterprise"} style={styles.pricingOptionTitle} />
          <GlobalText text={"$50/month"} style={styles.pricingOptionPrice} />
          <GlobalText text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."} style={styles.pricingOptionDescription} />
          <View style={styles.pricingOptionFeatures}>
            <GlobalText text={"Unlimited users"} style={styles.pricingOptionFeature} />
            <GlobalText text={"1000GB storage"} style={styles.pricingOptionFeature} />
            <GlobalText text={"24/7 support"} style={styles.pricingOptionFeature} />
          </View>
          <TextButton
            title={STRING.BUTTON.CHOOSE_PLAN}
            containerStyle={styles.planButtonContainer}
            buttonStyle={styles.planButtonStyle}
            titleStyle={styles.planButtonTitleStyle}
            raised={true}
            onPress={selectPlan}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Pricing;
