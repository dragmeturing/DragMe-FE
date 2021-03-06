import React from 'react';
import { LogoTitle } from "../components/LogoTitle";
import { primaryColor, accentColor } from '../constants/Colors';

export const header = {
  headerTitle: <LogoTitle />,
  headerStyle: {
    backgroundColor: primaryColor,
    height: 85,
    marginTop: -15,
  },
  headerTintColor: accentColor
}