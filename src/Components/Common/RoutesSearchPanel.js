import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SrcDest } from "../../Services/Constants/FIELDS";
import TextButton from "../Customs/Buttons/TextButton";
import TextField from "../Customs/TextField";
import styles from "./Styles";
import { connect } from "react-redux";
import { comnPost } from "../../Services/Api/CommonServices";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { navigateTo } from "../../Services/CommonMethods";
import {
  setDestination,
  setLoader,
  setSource,
} from "../../Reducers/CommonActions";
import GlobalText from "../Customs/Text";
import STRING from "../../Services/Constants/STRINGS";

const SearchPanel = ({ navigation, from, onSwap, source, destination, setSource, setDestination, searchRoutes, ...props }) => {
  const [isValid, setIsValid] = useState(false)
  const [errorText, setErrorText] = useState("")

  useEffect(() => {
    // setSource(props.source.name || "");
    // setDestination(props.destination.name || "");
    // checkIsValid()
    checkIsValid()
  }, [props]);

  const setValue = (v, i, index) => {
    switch (index) {
      case 0:
        setSource(v);
        break;
      case 1:
        setDestination(v);
        break;
    }
    checkIsValid()
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return source?.name;
      case 1:
        return destination?.name;
    }
  };

  const checkIsValid = () => {
    if ((source?.name) && (destination?.name)) setIsValid(true)
    else setIsValid(false)
  }

  const gotoSearch = (type) => {
    navigateTo(navigation, STRING.SCREEN.SEARCH_PLACE, { type, from });
  };

  const gotoRoutes = () => {
    // setSource('')
    // setDestination('')
    if (isValid) {
      searchRoutes()
    } else setErrorText(STRING.ALERT.SOURCE_DESTINATION_REQUIRED)
  };

  const swap = async () => {
    let a = source
    let b = destination
    setSource(b);
    setDestination(a)
  }

  const refresh = async () => {
    let a = ""
    let b = ""
    setSource("");
    setDestination("")
    onSwap(a, b)
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <View style={styles.routesFieldsView}>
        {SrcDest.map((field, index) => {
          return (
            <TextField
              onPress={() => gotoSearch(field.name)}
              name={field.name}
              label={field.name}
              placeholder={field.placeholder}
              fieldType={field.type}
              length={field.length}
              required={field.required}
              disabled={field.disabled}
              value={getValue(index)}
              setChild={(val, i) => setValue(val, i, index)}
              style={styles.routesSearchPanelField}
              containerStyle={styles.routesTextContainerStyle}
              inputContainerStyle={styles.routesInputContainerStyle}
              leftIcon={
                <Ionicons
                  style={styles.swapIcon}
                  name="bus"
                  color={COLOR.grey}
                  size={DIMENSIONS.iconBig}
                  onPress={isValid ? swap : null}
                />
              }
            />
          );
        })}
        <MaterialIcons
          style={styles.routesSwapIcon}
          name="swap-horizontal-circle"
          color={isValid ? COLOR.themeComicBlue : COLOR.grey}
          size={DIMENSIONS.iconLarge}
          onPress={isValid ? swap : null}
        />
      </View>
      <Ionicons
        style={styles.routesRefreshIcon}
        name="refresh-circle"
        color={isValid ? COLOR.themeComicBlue : COLOR.grey}
        size={DIMENSIONS.iconLarge}
        onPress={isValid ? refresh : null}
      />

      <View style={{ minHeight: 20 }}>
        {!isValid &&
          <GlobalText
            text={errorText}
            style={styles.errorText}
          />
        }
      </View>
      {from == STRING.SCREEN.SEARCH_LIST ?
        null :
        <TextButton
          title={STRING.BUTTON.SEARCH}
          containerStyle={styles.searchButtonContainerStyle}
          buttonStyle={styles.searchButtonStyle}
          titleStyle={styles.buttonTitleStyle}
          raised={true}
          onPress={gotoRoutes}
        />}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    source: state.commonState.source,
    destination: state.commonState.destination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSource: (data) => {
      dispatch(setSource(data));
    },
    setDestination: (data) => {
      dispatch(setDestination(data));
    },
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
