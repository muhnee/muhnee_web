import React from "react";

export interface UserContextState {
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  photoURL?: string;
  onboarded?: boolean | undefined | null;
  loaded: boolean;
}

export const UserContext = React.createContext<UserContextState>({
  displayName: "",
  email: "",
  emailVerified: false,
  photoURL: "",
  onboarded: false,
  loaded: false
});
