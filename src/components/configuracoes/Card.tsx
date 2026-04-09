import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";

interface CardProps {
  children: ReactNode;
  style?: object;
  colors?: typeof LIGHT;
}

const Card: React.FC<CardProps> = ({ children, style, colors: colorsProp }) => {
  const { colors: themeColors } = useTheme();
  const colors = colorsProp ?? themeColors;
  const styles = makeStyles(colors);
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2 },
});