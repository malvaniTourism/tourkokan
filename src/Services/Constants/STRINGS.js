import moment from "moment";
const STRING = {
  appName: "INIT",
  welcome: "WELCOME",

  //button titles
  signIn: "SIGN IN",
  signOut: "Sign Out",
  cancel: "CLOSE",
  ok: "OK",
  yes: "YES",
  skip: "SKIP",
  send: "Send",
  logIn: "Login",

  //error messages
  enterValidEmail: "Please enter valid email address",
  required_password: "Please enter required fields",
  server_error: "Something Went Wrong",
  norecordFound: "No record found",
  noInternet: "There is no internet connection",
  enterValidPassword: "Please enter valid password",
  tryAgain: "Something went wrong. Try again",

  //instructions
  chnage_password: "RESET MY PASSWORD",
  login_with_new_password: "Login With New Password",
  bottomForgot:
    "Enter your Email and we will send a message to reset your password",
  lets_Check: "Let's check if your email has been registered on the portal",
  remember_password:
    "If you can’t remember your password, you can reset it by clicking the “Forgot your password?”",

  //placeholders
  email: "ENTER YOUR EMAIL",
  mobile: "ENTER MOBILE NUMBER",
  name: "ENTER YOUR EMAIL",
  password: "ENTER PASSWORD",
  new_password: "ENTER NEW PASSWORD",
  confirmPassword: "ENTER NEW PASSWORD AGAIN",
  code: "ENTER CODE",

  //questions
  howCanIhelp: "How can I help you today?",
  forgotText: "Forgot your password?",
  havingTrouble: "Having trouble in logging in?",
  exitApplication: "Are you sure you want to Exit?",

  //messages
  allset: "You are all set!",
  pleaseCheck: "Please Check",

  copyright: `Copyright © ${moment().format(
    "YYYY"
  )}. All rights reserved. \n Powered by `,
  accesstoken:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpY29wYSIsImV4cCI6MTYxMzM3OTIxNX0.umeGxjJeI5TWaFKciLoioQf5sF-ooXwh49126okPdp7ymovBbB3-QaZQw5iF5cn0Wljw9wQDIgRa0Cv4n9UZjQ",

  //navigation screen names
};

export default STRING;
