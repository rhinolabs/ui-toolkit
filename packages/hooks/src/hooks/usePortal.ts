import { useState, useEffect, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	children: ReactNode;
}

export const usePortal = (id: string) => {
	const [isRendered, setIsRendered] = useState<boolean>(false);
	const [rootElemRef, setRootElemRef] = useState<HTMLElement | null>(null);

	useEffect(() => {
		const existingParent = document.querySelector(`#${id}`) as HTMLElement | null;
		const parentElem = existingParent || createRootElement(id);
		
		if (!existingParent) {
			document.body.appendChild(parentElem);
		}
		
		setRootElemRef(parentElem);
		
		return () => {
			if (!existingParent && parentElem.parentNode) {
				parentElem.parentNode.removeChild(parentElem);
			}
		};
	}, [id]);

	const createRootElement = (rootId: string): HTMLElement => {
		const rootContainer = document.createElement("div");
		rootContainer.setAttribute("id", rootId);
		return rootContainer;
	};

	const Portal = useCallback(({ children }: PortalProps) => {
		if (rootElemRef) {
			setIsRendered(true);
			return createPortal(children, rootElemRef);
		}
		setIsRendered(false);
		return null;
	}, [rootElemRef]);

	return { Portal, isRendered };
};
