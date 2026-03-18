import React from "react";
import * as Components from "@rhinolabs/ui";
import "./styles.css";
import { PlaygroundRenderer } from "@test-utils/playground";

export default function App() {
	return <PlaygroundRenderer components={Components} hasThemeProvider={false} />;
}
