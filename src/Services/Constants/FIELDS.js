import { useTranslation } from "react-i18next";
import DIMENSIONS from "./DIMENSIONS";
import STRING from "./STRINGS";

const { t } = useTranslation();

export const MobileNo = [
    {
        name: t("LABEL.MOBILE"),
        placeholder: t("PLACEHOLDER.MOBILE_NUMBER"),
        type: t("TYPE.NUM"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];

export const OTP = [
    {
        name: t("LABEL.OTP"),
        placeholder: t("PLACEHOLDER.ENTER_OTP"),
        type: t("TYPE.NUM"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];

export const SignInFields = [
    {
        name: t("LABEL.EMAIL"),
        placeholder: t("LABEL.EMAIL"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
    {
        name: t("LABEL.PASSWORD"),
        placeholder: t("LABEL.PASSWORD"),
        type: t("TYPE.PASSWORD"),
        isSecure: true,
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];

export const EmailField = [
    {
        name: t("LABEL.EMAIL"),
        placeholder: t("LABEL.EMAIL"),
        type: t("TYPE.EMAIL"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: true,
    },
];

export const EmailOtpFields = [
    {
        name: t("LABEL.EMAIL"),
        placeholder: t("LABEL.EMAIL"),
        type: t("TYPE.EMAIL"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
    {
        name: t("LABEL.OTP"),
        placeholder: t("PLACEHOLDER.ENTER_OTP"),
        type: t("TYPE.NUM"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];

export const Password = [
    {
        name: t("LABEL.PASSWORD"),
        placeholder: t("LABEL.PASSWORD"),
        type: t("TYPE.PASSWORD"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
        isSecure: true,
    },
];

export const SignUpFields = [
    {
        name: t("LABEL.NAME"),
        placeholder: t("LABEL.NAME"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
        leftIcon: t("ICON.NAME"),
    },
    {
        name: t("LABEL.EMAIL"),
        placeholder: t("LABEL.EMAIL_ID"),
        type: t("TYPE.EMAIL"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
        leftIcon: t("ICON.EMAIL"),
    },
    {
        name: t("LABEL.MOBILE"),
        placeholder: t("LABEL.MOBILE_NO"),
        type: t("TYPE.PHONE"),
        length: DIMENSIONS.mobileLength,
        required: false,
        disabled: false,
        leftIcon: t("ICON.MOBILE_NO"),
    },
];

export const ProfileFields = [
    {
        name: t("LABEL.EMAIL"),
        placeholder: t("LABEL.EMAIL"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
        leftIcon: t("ICON.EMAIL"),
    },
    {
        name: t("LABEL.MOBILE"),
        placeholder: t("LABEL.MOBILE"),
        type: t("TYPE.PHONE"),
        length: DIMENSIONS.mobileLength,
        required: true,
        disabled: false,
        leftIcon: t("ICON.MOBILE_NO"),
    },
];

export const SrcDest = [
    {
        name: STRING.LABEL.SOURCE,
        placeholder: t("LABEL.SOURCE"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
    {
        name: STRING.LABEL.DESTINATION,
        placeholder: t("LABEL.DESTINATION"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];

export const Source = [
    {
        name: t("LABEL.SOURCE"),
        placeholder: t("PLACEHOLDER.SEARCH_SOURCE"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];

export const Destination = [
    {
        name: t("LABEL.DESTINATION"),
        placeholder: t("PLACEHOLDER.SEARCH_DESTINATION"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];

export const CityName = [
    {
        name: t("LABEL.CITY_NAME"),
        placeholder: t("PLACEHOLDER.SEARCH_CITY_PLACE"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];

export const ContactUsFields = [
    {
        name: t("LABEL.EMAIL"),
        placeholder: t("LABEL.EMAIL"),
        type: t("TYPE.EMAIL"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
    {
        name: t("LABEL.MOBILE"),
        placeholder: t("LABEL.MOBILE"),
        type: t("TYPE.NUM"),
        length: DIMENSIONS.mobileLength,
        required: true,
        disabled: false,
    },
    {
        name: t("LABEL.MESSAGE"),
        placeholder: t("LABEL.MESSAGE"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
        multiline: true,
    },
];

export const Comment = [
    {
        name: t("LABEL.COMMENT"),
        placeholder: t("LABEL.COMMENT"),
        type: t("TYPE.TEXT"),
        length: DIMENSIONS.fieldLength,
        required: true,
        disabled: false,
    },
];
