import DIMENSIONS from "./DIMENSIONS";
import STRING from "./STRINGS";

export const MobileNo = [
  {
    name: STRING.LABEL.MOBILE,
    placeholder: STRING.PLACEHOLDER.MOBILE_NUMBER,
    type: STRING.TYPE.NUM,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
];

export const OTP = [
  {
    name: STRING.LABEL.OTP,
    placeholder: STRING.PLACEHOLDER.ENTER_OTP,
    type: STRING.TYPE.NUM,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
];

export const SignInFields = [
  {
    name: STRING.LABEL.EMAIL,
    placeholder: STRING.LABEL.EMAIL,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.PASSWORD,
    placeholder: STRING.LABEL.PASSWORD,
    type: STRING.TYPE.PASSWORD,
    isSecure: true,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
];

export const Email = [
  {
    name: STRING.LABEL.EMAIL,
    placeholder: STRING.LABEL.EMAIL,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: true,
  }
];

export const EmailOtpFields = [
  {
    name: STRING.LABEL.EMAIL,
    placeholder: STRING.LABEL.EMAIL,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.OTP,
    placeholder: STRING.PLACEHOLDER.ENTER_OTP,
    type: STRING.TYPE.NUM,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  }
];

export const SignUpFields = [
  {
    name: STRING.LABEL.NAME,
    placeholder: STRING.LABEL.NAME,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.EMAIL,
    placeholder: STRING.LABEL.EMAIL,
    type: STRING.TYPE.EMAIL,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.MOBILE,
    placeholder: STRING.LABEL.MOBILE,
    type: STRING.TYPE.PHONE,
    length: DIMENSIONS.mobileLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.PASSWORD,
    placeholder: STRING.LABEL.PASSWORD,
    type: STRING.TYPE.PASSWORD,
    isSecure: true,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.CONFIRM_PASSWORD,
    placeholder: STRING.LABEL.CONFIRM_PASSWORD,
    type: STRING.TYPE.PASSWORD,
    isSecure: true,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
];

export const ProfileFields = [
  {
    name: STRING.LABEL.NAME,
    placeholder: STRING.LABEL.NAME,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: true,
  },
  {
    name: STRING.LABEL.MOBILE,
    placeholder: STRING.LABEL.MOBILE,
    type: STRING.TYPE.PHONE,
    length: DIMENSIONS.mobileLength,
    required: true,
    disabled: true,
  },
  {
    name: STRING.LABEL.EMAIL,
    placeholder: STRING.LABEL.EMAIL,
    type: STRING.TYPE.EMAIL,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  }
];

export const SrcDest = [
  {
    name: STRING.LABEL.SOURCE,
    placeholder: STRING.LABEL.SOURCE,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.DESTINATION,
    placeholder: STRING.LABEL.DESTINATION,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
];

export const Source = [
  {
    name: STRING.LABEL.SOURCE,
    placeholder: STRING.PLACEHOLDER.SEARCH_SOURCE,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
];

export const Destination = [
  {
    name: STRING.LABEL.DESTINATION,
    placeholder: STRING.PLACEHOLDER.SEARCH_DESTINATION,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
];

export const CityName = [
  {
    name: STRING.LABEL.CITY_NAME,
    placeholder: STRING.PLACEHOLDER.SEARCH_CITY_PLACE,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
];

export const ContactUsFields = [
  {
    name: STRING.LABEL.EMAIL,
    placeholder: STRING.LABEL.EMAIL,
    type: STRING.TYPE.EMAIL,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.MOBILE,
    placeholder: STRING.LABEL.MOBILE,
    type: STRING.TYPE.PHONE,
    length: DIMENSIONS.mobileLength,
    required: true,
    disabled: false,
  },
  {
    name: STRING.LABEL.MESSAGE,
    placeholder: STRING.LABEL.MESSAGE,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  },
]

export const Comment = [
  {
    name: STRING.LABEL.COMMENT,
    placeholder: STRING.LABEL.COMMENT,
    type: STRING.TYPE.TEXT,
    length: DIMENSIONS.fieldLength,
    required: true,
    disabled: false,
  }
];