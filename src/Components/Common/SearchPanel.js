import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SrcDest } from "../../Services/Constants/FIELDS";
import CustomButton from "../Customs/Button";
import TextField from "../Customs/TextField";
import styles from "./Styles";
import { connect } from "react-redux";
import { comnPost } from "../../Services/Api/CommonServices";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { navigateTo } from "../../Services/CommonMethods";

const SearchPanel = ({ navigation, ...props }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setSource(props.source.name);
    setDestination(props.destination.name);
  }, [props]);

  const setValue = (v, i, index) => {
    switch (index) {
      case 0:
        setSource(v);
        checkIsValid()
        break;
      case 1:
        setDestination(v);
        checkIsValid()
        break;
    }
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return source;
      case 1:
        return destination;
    }
  };

  const checkIsValid = () => {
    if (source != '' && destination != '') setIsValid(true)
    else setIsValid(false)
  }

  const gotoSearch = (type) => {
    navigateTo(navigation, "SearchPlace", { type });
  };

  const gotoRoutes = () => {
    navigateTo(navigation, "SearchList");
  };

  const swap = () => {
    console.log('swap - - -');
    setSource(destination);
    setDestination(source)
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
            />
          );
        })}
        <MaterialIcons style={styles.swapIcon} name="swap-vert-circle" color={COLOR.themeDarkGreen} size={DIMENSIONS.userIconSize} onPress={swap} />
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

export default connect(mapStateToProps)(SearchPanel);
