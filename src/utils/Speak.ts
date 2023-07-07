import { speak } from "expo-speech";

export function Speak(text: string) {
  speak(text, { language: 'pt-BR' });
}