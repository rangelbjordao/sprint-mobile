const childProcess = require("child_process");

let commitHash = process.env.EAS_BUILD_COMMIT_HASH;

if (!commitHash) {
  try {
    commitHash = childProcess
      .execSync("git rev-parse --short HEAD")
      .toString()
      .trim();
  } catch (e) {
    commitHash = "dev";
  }
}

module.exports = {
  expo: {
    name: "EmotiWave",
    slug: "EmotiWave",
    version: "1.0.0",
    extra: {
      commitHash: commitHash,
      router: {},
      eas: {
        projectId: "bb8dbee6-626a-4d56-8788-9c25d2979e65",
      },
    },
    scheme: "emotiwave",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.rangel.emotiwave",
      infoPlist: {
        UIBackgroundModes: ["remote-notification"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#EAF6FF",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      useNextNotificationsApi: true,
      package: "com.rangel.emotiwave",
    },
    notification: {
      icon: "./assets/notification-icon.png",
      color: "#4285ff",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-router", "expo-font", "expo-web-browser"],
  },
};
