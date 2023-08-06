import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SrcDest } from "../../Services/Constants/FIELDS";
import CustomButton from "../Customs/Button";
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

const SearchPanel = ({ navigation, ...props }) => {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // setSource(props.source.name || "");
    // setDestination(props.destination.name || "");
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
    navigateTo(navigation, "SearchPlace", { type });
  };

  const gotoRoutes = () => {
    // props.setSource('')
    // props.setDestination('')
    navigateTo(navigation, "SearchList", { from: "Search" });
  };

  const swap = () => {
    let a = props.source
    let b = props.destination
    props.setSource(b);
    props.setDestination(a)
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
      <CustomButton
        title={"Search"}
        containerStyle={styles.searchButtonContainerStyle}
        buttonStyle={isValid ? styles.searchButtonStyle : styles.searchButtonDisable}
        titleStyle={styles.buttonTitleStyle}
        isDisabled={!isValid}
        raised={true}
        type={"Submit"}
        onPress={gotoRoutes}
      />
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
