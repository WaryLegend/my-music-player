import { generateCodeVerifier, generateCodeChallenge } from "./utils/pkce";

const clientId = "50db403085e24b0cbd3ae6ab4e20fcf8";
const redirectUri = "http://127.0.0.1:3000";
const scopes = ["user-library-read", "playlist-read-private"];

export async function loginWithSpotify() {
  const codeVerifier = generateCodeVerifier();
  localStorage.setItem("code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const args = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scopes.join(" "),
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  window.location = `https://accounts.spotify.com/authorize?${args.toString()}`;
}

export async function getTokenFromCode(code) {
  const codeVerifier = localStorage.getItem("code_verifier");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });
  const data = await res.json();

  if (data.error) {
    console.error("Error exchanging code for token:", data.error);
    return null;
  }
  localStorage.removeItem("code_verifier");
  return data;
}

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || "API Error");
  }

  return res.json();
};
