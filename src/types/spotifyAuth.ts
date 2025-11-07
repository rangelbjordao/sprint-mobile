import { AuthRequestPromptOptions, AuthSessionResult } from "expo-auth-session";

export interface SpotifyAuthHook {
  accessToken: string | null;
  isTokenLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  promptAsync: (
    options?: AuthRequestPromptOptions
  ) => Promise<AuthSessionResult>;
  loadToken: () => Promise<void>;
  error: string | null;
}
