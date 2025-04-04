import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";
import * as React from "react";

interface DualRangeSliderProps
	extends Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "onChange"> {
	labelPosition?: "top" | "bottom";
	symbol?: string;
	onChange?: (value: [number, number]) => void;
	trackClassName?: string;
	rangeClassName?: string;
	thumbClassName?: string;
	inputClassName?: string;
}

const DualRangeSlider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	DualRangeSliderProps
>(
	(
		{
			className,
			labelPosition = "top",
			symbol = "",
			min = 0,
			max = 100,
			defaultValue,
			value,
			onValueChange: onValueChangeProp,
			onChange,
			trackClassName,
			rangeClassName,
			thumbClassName,
			inputClassName,
			...rest
		},
		ref,
	) => {
		const isControlled = Array.isArray(value);
		const [internalValues, setInternalValues] = React.useState<
			[number, number]
		>(
			Array.isArray(defaultValue)
				? (defaultValue as [number, number])
				: [min, max],
		);

		const currentValues = isControlled ? (value ?? [min, max]) : internalValues;

		const [editing, setEditing] = React.useState<{
			index: number | null;
			value: string;
		}>({
			index: null,
			value: "",
		});

		const inputRef = React.useRef<HTMLInputElement>(null);

		const handleSliderChange = (val: [number, number]) => {
			if (!isControlled) {
				setInternalValues(val);
			}
			(onValueChangeProp || onChange)?.(val);
		};

		const startEditing = (index: number) => {
			setEditing({
				index,
				value: currentValues[index].toString(),
			});
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		};

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const filtered = e.target.value.replace(/[^0-9.-]/g, "");
			setEditing((prev) => ({ ...prev, value: filtered }));
		};

		const finishEditing = () => {
			if (editing.index === null) return;

			const parsed = Number.parseFloat(editing.value);
			if (Number.isNaN(parsed)) {
				resetEditing();
				return;
			}

			const idx = editing.index;
			if (idx === 0 && parsed > currentValues[1]) {
				alert("The minimum value cannot be greater than the maximum.");
				return;
			}
			if (idx === 1 && parsed < currentValues[0]) {
				alert("The maximum value cannot be less than the minimum.");
				return;
			}

			const clamped = Math.min(Math.max(parsed, min), max);
			const newValues = [...currentValues] as [number, number];

			if (idx === 0 && clamped > newValues[1]) {
				newValues[idx] = newValues[1];
			} else if (idx === 1 && clamped < newValues[0]) {
				newValues[idx] = newValues[0];
			} else {
				newValues[idx] = clamped;
			}

			if (!isControlled) {
				setInternalValues(newValues);
			}
			(onValueChangeProp || onChange)?.(newValues);
			resetEditing();
		};

		const resetEditing = () => {
			setEditing({ index: null, value: "" });
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				e.preventDefault();
				finishEditing();
			} else if (e.key === "Escape") {
				e.preventDefault();
				resetEditing();
			}
		};

		const verticalOffset = labelPosition === "top" ? "-6px" : "4px";

		const inputBaseStyle = "w-12 h-6 text-center";
		const inputEditingStyle =
			"bg-white border-[0.5px] outline-none focus:ring-1 focus:ring-primary-200";
		const inputNonEditingStyle =
			"flex justify-center items-center cursor-text overflow-hidden hover:bg-white/5 border-[0.5px]";

		const renderStaticInput = (index: 0 | 1) => {
			const isEditing = editing.index === index;
			const displayValue = isEditing
				? editing.value
				: currentValues[index].toString();
			const posStyle = index === 0 ? { left: "0" } : { right: "0" };
			const style = {
				position: "absolute" as const,
				...posStyle,
				top: verticalOffset,
				zIndex: isEditing ? 30 : 20,
			};

			return isEditing ? (
				<input
					ref={inputRef}
					type="text"
					value={displayValue}
					onChange={handleInputChange}
					onBlur={finishEditing}
					onKeyDown={handleKeyDown}
					className={clsx(inputBaseStyle, inputEditingStyle, inputClassName)}
					style={style}
				/>
			) : (
				<div
					onClick={(e) => {
						e.stopPropagation();
						startEditing(index);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							startEditing(index);
						}
					}}
					className={clsx(inputBaseStyle, inputNonEditingStyle, inputClassName)}
					style={style}
				>
					<span>
						{symbol}
						{displayValue}
					</span>
				</div>
			);
		};

		return (
			<div className={clsx("relative w-full px-4", className)}>
				{renderStaticInput(0)}
				{renderStaticInput(1)}

				<SliderPrimitive.Root
					ref={ref}
					min={min}
					max={max}
					value={currentValues}
					{...rest}
					onValueChange={handleSliderChange}
					className={clsx(
						"relative flex w-full touch-none select-none items-center",
						className,
					)}
				>
					<SliderPrimitive.Track
						className={clsx(
							"relative h-[1px] w-full grow bg-primary",
							trackClassName,
						)}
					>
						<SliderPrimitive.Range
							className={clsx(
								"absolute bg-primary-200 h-[2px]",
								rangeClassName,
							)}
						/>
					</SliderPrimitive.Track>

					{currentValues.map((val, index) => (
						<SliderPrimitive.Thumb
							key={`thumb-${index}-${val}`}
							className={clsx(
								"relative block h-2 w-[7px] bg-primary-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
								thumbClassName,
							)}
						/>
					))}
				</SliderPrimitive.Root>
			</div>
		);
	},
);

DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
