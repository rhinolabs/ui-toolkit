import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";
import * as React from "react";

interface DualRangeSliderProps
	extends Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "onChange"> {
	labelPosition?: "top" | "bottom";
	label?: (value: number | undefined) => React.ReactNode;
	symbol?: string;
	showInputs?: boolean;
	onChange?: (value: [number, number]) => void;
	trackClassName?: string;
	rangeClassName?: string;
	thumbClassName?: string;
	labelClassName?: string;
}

const DualRangeSlider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	DualRangeSliderProps
>(
	(
		{
			className,
			label,
			labelPosition = "top",
			symbol = "",
			showInputs = false,
			min = 0,
			max = 100,
			defaultValue,
			value,
			onValueChange: onValueChangeProp,
			onChange,
			trackClassName,
			rangeClassName,
			thumbClassName,
			labelClassName,
			...rest
		},
		ref,
	) => {
		const changeCallback = onValueChangeProp || onChange;
		const isControlled = Array.isArray(value);
		const [internalValue, setInternalValue] = React.useState<[number, number]>(
			Array.isArray(defaultValue)
				? (defaultValue as [number, number])
				: [min, max],
		);

		const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
		const [tempInputValue, setTempInputValue] = React.useState<string>("");
		const currentValue = isControlled
			? (value as [number, number])
			: internalValue;

		React.useEffect(() => {
			if (isControlled) {
				setInternalValue(value as [number, number]);
			}
		}, [value, isControlled]);

		const handleSliderChange = (val: [number, number]) => {
			if (!isControlled) {
				setInternalValue(val);
			}
			changeCallback?.(val);
		};

		const startEditing = (index: number) => {
			setEditingIndex(index);
			setTempInputValue(currentValue[index].toString());
		};

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const filtered = e.target.value.replace(/[^0-9.-]/g, "");
			setTempInputValue(filtered);
		};

		const finishEditing = () => {
			if (editingIndex === null) return;

			const parsed = Number.parseFloat(tempInputValue);

			if (Number.isNaN(parsed)) {
				setEditingIndex(null);
				setTempInputValue("");
				return;
			}

			if (editingIndex === 0 && parsed > currentValue[1]) {
				alert("Min value cannot be greater than the max value.");
				return;
			}

			if (editingIndex === 1 && parsed < currentValue[0]) {
				alert("Max value cannot be less than the min value.");
				return;
			}

			const clamped = Math.min(Math.max(parsed, min), max);
			const newValues = [...currentValue] as [number, number];

			if (editingIndex === 0 && clamped > newValues[1]) {
				newValues[editingIndex] = newValues[1];
			} else if (editingIndex === 1 && clamped < newValues[0]) {
				newValues[editingIndex] = newValues[0];
			} else {
				newValues[editingIndex] = clamped;
			}

			if (!isControlled) {
				setInternalValue(newValues);
			}
			changeCallback?.(newValues);

			setEditingIndex(null);
			setTempInputValue("");
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				e.preventDefault();
				finishEditing();
			} else if (e.key === "Escape") {
				e.preventDefault();
				setEditingIndex(null);
				setTempInputValue("");
			}
		};

		const renderInput = (index: 0 | 1) => {
			const isEditing = editingIndex === index;
			const displayValue = isEditing
				? tempInputValue
				: currentValue[index].toString();
			const position = ((currentValue[index] - min) / (max - min)) * 100;

			return isEditing ? (
				<input
					type="text"
					value={displayValue}
					onChange={handleInputChange}
					onBlur={finishEditing}
					onKeyDown={handleKeyDown}
					className={clsx(
						"absolute w-12 text-center text-xs",
						"bg-white/10 border border-primary-200",
						"outline-none focus:ring-1 focus:ring-primary-200",
						labelPosition === "top" && "-top-6",
						labelPosition === "bottom" && "top-4",
					)}
					style={{
						left: `${position}%`,
						transform: "translateX(-50%)",
						zIndex: 30,
					}}
				/>
			) : (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					onClick={(e) => {
						e.stopPropagation();
						startEditing(index);
					}}
					className={clsx(
						"absolute w-12 text-center text-xs cursor-text",
						"hover:bg-white/5",
						labelPosition === "top" && "-top-6",
						labelPosition === "bottom" && "top-4",
						labelClassName,
					)}
					style={{
						left: `${position}%`,
						transform: "translateX(-50%)",
						zIndex: 20,
					}}
				>
					{displayValue}
				</div>
			);
		};

		return (
			<div className={clsx("relative w-full", className)}>
				{showInputs && (
					<>
						{renderInput(0)}
						{renderInput(1)}
					</>
				)}

				<SliderPrimitive.Root
					ref={ref}
					min={min}
					max={max}
					value={currentValue}
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

					{currentValue.map((val, index) => (
						<SliderPrimitive.Thumb
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className={clsx(
								"relative block h-2 w-[7px] bg-primary-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
								thumbClassName,
							)}
						>
							{!showInputs && label && (
								<span
									className={clsx(
										"absolute flex w-full justify-center text-xs",
										labelPosition === "top" ? "-top-7" : "top-3",
										labelClassName,
									)}
								>
									{symbol}
									{label(val)}
								</span>
							)}
						</SliderPrimitive.Thumb>
					))}
				</SliderPrimitive.Root>
			</div>
		);
	},
);

DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
