import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { phoneSignIn } from "../../store";

const captchaUrl = "https://synpulse8-hiring-challenge.web.app/";

const Login = () => {
  const router = useRouter();
  const phoneRef = useRef("");
  const otpRef = useRef("");
  const [step, setStep] = useState("initial");
  const [verificationId, setVerificationId] = useState();

  const onGetMessage = async (event) => {
    const message = event.nativeEvent.data;
    console.log(message);
    switch (message) {
      case "DOMLoaded":
        return;
      case "ErrorSmsCode":
        // SMS Not sent or Captcha verification failed. You can do whatever you want here
        return;
      case "":
        return;
      default: {
        setStep("promptSmsCode");
        setVerificationId(message);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {step === "initial" && (
        <KeyboardAvoidingView behavior="padding" enabled>
          <Text style={styles.label}>Enter Mobile Number</Text>
          <TextInput
            placeholder="+85211111111"
            nativeID="phone"
            keyboardType="phone-pad"
            onChangeText={(text) => {
              phoneRef.current = text;
            }}
            style={styles.textInput}
          />
          <Button
            mode="contained"
            onPress={() => setStep("phoneSubmitted")}
            title=" Send me the code!"
          ></Button>
        </KeyboardAvoidingView>
      )}

      {step === "phoneSubmitted" && (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{`getToken('${phoneRef.current}')`}</Text>
          <WebView
            injectedJavaScript={`getToken('${phoneRef.current}')`}
            source={{ uri: captchaUrl }}
            onMessage={onGetMessage}
          />
        </SafeAreaView>
      )}

      {step === "promptSmsCode" && (
        <KeyboardAvoidingView behavior="padding" enabled>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            placeholder="otp"
            nativeID="otp"
            keyboardType="number-pad"
            onChangeText={(text) => {
              otpRef.current = text;
            }}
            style={styles.textInput}
          />
          <Button
            mode="contained"
            onPress={async () => {
              setStep("smsCodeSubmitted");
              const resp = await phoneSignIn(verificationId, otpRef.current);
              if (resp?.user) {
                router.replace("/(tabs)/home");
              } else {
                console.log(resp.error);
                Alert.alert("Login Error", resp.error?.message);
              }
            }}
            title="Send"
          ></Button>
          <Button
            mode="contained"
            onPress={() => setStep("phoneSubmitted")}
            title=" ResendOTP"
          ></Button>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
});
