import React from 'react'
import { View } from 'react-native'
import { ProfileFields } from '../../../Services/Constants/FIELDS';

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    const setValue = (val, isVal, index) => {
        switch (index) {
            case 0:
                setName(val);
                break;
            case 1:
                setMobile(val);
                break;
        }
    };

    const getValue = (i) => {
        switch (i) {
            case 0:
                return name;
            case 1:
                return mobile;
        }
    };

    return (
        <View>
            {ProfileFields.map((field, index) => {
                return (
                    <TextField
                        name={field.name}
                        label={field.name}
                        placeholder={field.placeholder}
                        fieldType={field.type}
                        length={field.length}
                        required={field.required}
                        disabled={field.disabled}
                        value={getValue(index)}
                        setChild={(v, i) => setValue(v, i, index)}
                        style={styles.containerStyle}
                        inputContainerStyle={styles.profileContainerStyle}
                        isSecure={field.isSecure}
                    />
                );
            })}
        </View>
    )
}

export default UpdateProfile
