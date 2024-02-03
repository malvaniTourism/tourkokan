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

const SearchPanel = ({ navigation, from, onSwap, ...props }) => {
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
        return props.source.name;
      case 1:
        return props.destination.name;
    }
  };

  const checkIsValid = () => {
    if ((props.source.name) && (props.destination.name)) setIsValid(true)
    else setIsValid(false)
  }

  const gotoSearch = (type) => {
    navigateTo(navigation, STRING.SCREEN.SEARCH_PLACE, { type, from });
  };

  const gotoRoutes = () => {
    // props.setSource('')
    // props.setDestination('')
    if (isValid) {
      navigateTo(navigation, STRING.SCREEN.SEARCH_LIST, { from });
    } else setErrorText(STRING.ALERT.SOURCE_DESTINATION_REQUIRED)
  };

  const swap = async () => {
    let a = props.source
    let b = props.destination
    await props.setSource(b);
    await props.setDestination(a)
    onSwap(a.id, b.id)
  }

  const refresh = async () => {
    let a = ""
    let b = ""
    await props.setSource("");
    await props.setDestination("")
    onSwap(a, b)
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <View style={styles.fieldsView}>
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
              style={styles.searchPanelField}
              containerStyle={styles.textContainerStyle}
              inputContainerStyle={styles.inputContainerStyle}
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
          style={styles.swapIcon}
          name="swap-vert-circle"
          color={isValid ? COLOR.themeComicBlue : COLOR.grey}
          size={DIMENSIONS.iconLarge}
          onPress={isValid ? swap : null}
        />
      </View>
        <Ionicons
          style={styles.refreshIcon}
          name="refresh-circle"
          color={isValid ? COLOR.themeComicBlue : COLOR.grey}
          size={DIMENSIONS.iconLarge}
          onPress={isValid ? refresh : null}
        />

      {!isValid &&
        <View>
          <GlobalText
            text={errorText}
            style={styles.errorText}
          />
        </View>
      }
      { from == STRING.SCREEN.SEARCH_LIST ?
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
