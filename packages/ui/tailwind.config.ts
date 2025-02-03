import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx,js,jsx}"],
	purge: false,
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			borderRadius: {
				lg: "var(--rhinolabs-radius)",
				md: "calc(var(--rhinolabs-radius) - 2px)",
				sm: "calc(var(--rhinolabs-radius) - 4px)",
			},
			colors: {
				background: "var(--rhinolabs-background)",
				foreground: "var(--rhinolabs-foreground)",
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				chart: {
					"1": "var(--chart-1)",
					"2": "var(--chart-2)",
					"3": "var(--chart-3)",
					"4": "var(--chart-4)",
					"5": "var(--chart-5)",
				},
				sidebar: {
					DEFAULT: "var(--rhinolabs-sidebar-background)",
					foreground: "var(--rhinolabs-sidebar-foreground)",
					primary: "var(--rhinolabs-sidebar-primary)",
					"primary-foreground": "var(--rhinolabs-sidebar-primary-foreground)",
					accent: "var(--rhinolabs-sidebar-accent)",
					"accent-foreground": "var(--rhinolabs-sidebar-accent-foreground)",
					border: "var(--rhinolabs-sidebar-border)",
					ring: "var(--rhinolabs-sidebar-ring)",
				},
			},
		},
	},
	plugins: [tailwindcssAnimate],
};

export default config;
