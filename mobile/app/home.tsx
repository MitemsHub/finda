import { Redirect } from "expo-router";

/** /home deep-link lands on the Home tab. */
export default function HomeRedirect() {
  return <Redirect href="/(tabs)/home" />;
}
