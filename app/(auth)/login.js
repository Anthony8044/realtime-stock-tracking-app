import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { phoneSignIn } from "../../store";
import { COLORS, FONT, SIZES } from "../../constants";

const captchaUrl = "https://synpulse8-hiring-challenge.web.app/";

const Login = () => {
  const router = useRouter();
  const phoneRef = useRef("");
  const otpRef = useRef("");
  const [step, setStep] = useState("initial");
  const [verificationId, setVerificationId] = useState();

  const onGetMessage = async (event) => {
    const message = event.nativeEvent.data;
    // console.log(message);
    switch (message) {
      case "DOMLoaded":
        return;
      case "ErrorSmsCode":
        setStep("initial");
        Alert.alert("Repatcha failed");
        return;
      case "Timeout":
        setStep("initial");
        Alert.alert("Repatcha Timed Out!");
        return;
      case "":
        return;
      default: {
        setStep("promptSmsCode");
        setVerificationId(message);
      }
    }
  };

  const handlePhoneSubmit = (phone) => {
    // console.log("+852" + phoneRef.current);
    // HK phone number validator
    if (/^[0-9]{8}$/.test(phone)) {
      setStep("phoneSubmitted");
    } else {
      Alert.alert("Input a valid HK phone number");
    }
  };

  const handleOTPSubmit = async (otp) => {
    // 6 digit otp validator
    if (/^[0-9]{6}$/.test(otp)) {
      setStep("smsCodeSubmitted");
      const resp = await phoneSignIn(verificationId, otpRef.current);
      if (resp?.user) {
        router.replace("/(tabs)/home");
      } else {
        console.log(resp.error);
        setStep("promptSmsCode");
        Alert.alert("Login Error", resp.error?.message);
      }
    } else {
      Alert.alert("Enter 6 Digit OTP Code");
    }
  };

  return (
    <View style={styles.container}>
      {step === "initial" && (
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{ width: "100%" }}
        >
          <Text style={styles.appTitle}>Realtime Stocks Tracking App</Text>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.label}>Enter Mobile Number</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputFlag}>
              <Text style={styles.textFlag}>🇭🇰</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Input phone number..."
                nativeID="phone"
                keyboardType="number-pad"
                onChangeText={(text) => {
                  phoneRef.current = text;
                }}
                style={styles.textInput}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePhoneSubmit(phoneRef.current)}
          >
            <Text style={styles.buttonText}>Send me the code!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}

      {step === "phoneSubmitted" && (
        <SafeAreaView>
          <WebView
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
            injectedJavaScript={`getToken('${"+852" + phoneRef.current}')`}
            source={{ uri: captchaUrl }}
            onMessage={onGetMessage}
            cacheEnabled={false}
            incognito={true}
          />
        </SafeAreaView>
      )}

      {step === "promptSmsCode" && (
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{ width: "100%" }}
        >
          <Text style={styles.appTitle}>Realtime Stocks Tracking App</Text>
          <Text style={styles.title}>One-time password</Text>
          <Text style={styles.label}>Enter OTP</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="otp"
                nativeID="otp"
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={(text) => {
                  otpRef.current = text;
                }}
                style={styles.textInput}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOTPSubmit(otpRef.current)}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStep("phoneSubmitted")}
          >
            <Text style={styles.buttonText}>Resend OTP</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "5%",
    backgroundColor: COLORS.gray2,
  },
  appTitle: {
    fontSize: 40,
    fontFamily: FONT.bold,
    textAlign: "center",
    paddingTop: "30%",
    paddingBottom: "20%",
    color: "#312651",
  },
  title: {
    fontSize: 34,
    fontFamily: FONT.semiBold,
    marginBottom: 20,
    color: "#312651",
  },
  label: {
    fontSize: 24,
    marginBottom: 4,
    color: "#312651",
  },
  textInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#FAFAFC",
    borderWidth: 1,
    borderColor: "#312651",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
    marginLeft: 8,
  },
  inputFlag: {
    width: 50,
    height: "100%",
    backgroundColor: "#FF7754",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
    backgroundColor: "#312651",
    borderWidth: 1,
    borderRadius: 16,
  },
  buttonText: {
    color: "#F3F4F8",
  },
});
