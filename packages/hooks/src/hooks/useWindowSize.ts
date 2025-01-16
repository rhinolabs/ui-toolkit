import { useState, useEffect } from "react";

type WindowSize = {
	width: number;
	height: number;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
};

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export const useWindowSize = (): WindowSize => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight,
		isMobile: window.innerWidth < MOBILE_BREAKPOINT,
		isTablet:
			window.innerWidth >= MOBILE_BREAKPOINT &&
			window.innerWidth < TABLET_BREAKPOINT,
		isDesktop: window.innerWidth >= TABLET_BREAKPOINT,
	});

	const handleResize = () => {
		const width = window.innerWidth;
		setWindowSize({
			width,
			height: window.innerHeight,
			isMobile: width < MOBILE_BREAKPOINT,
			isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
			isDesktop: width >= TABLET_BREAKPOINT,
		});
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
};
