import { useEffect, useState } from "react";

/* eslint-disable-next-line */
type TUseSearchParams = <T = Record<string, any>>(
	url?: string,
	opt?: { unique: boolean },
) => T;

export const useSearchParams: TUseSearchParams = <T>(
	url = location.href,
	opt = { unique: true },
) => {
	const _urlSearch = new URL(url);
	const [params, setParams] = useState<Record<string, string | string[]>>(
		() => {
			const initialParams: Record<string, string | string[]> = {};

			_urlSearch.searchParams.forEach((value, key) => {
				if (opt.unique) {
					initialParams[key] = value;
				} else {
					initialParams[key] = _urlSearch.searchParams.getAll(key);
				}
			});

			return initialParams;
		},
	);

	useEffect(() => {
		const newUrlSearch = new URL(url);
		const newParams: Record<string, string | string[]> = {};

		newUrlSearch.searchParams.forEach((value, key) => {
			if (opt.unique) {
				newParams[key] = value;
			} else {
				newParams[key] = newUrlSearch.searchParams.getAll(key);
			}
		});

		setParams(newParams);
	}, [url, opt.unique]);

	return params as T;
};
