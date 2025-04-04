import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type OptionOption = {
	label: string;
	value: string;
};

export interface MultipleSelectProps {
	options: string[] | OptionOption[];
	value: string[];
	onChange: (selected: string[]) => void;
	placeholder?: string;
	maxDisplay?: number;
	checkboxPosition?: "left" | "right";
	className?: string;
	selectTriggerClassName?: string;
	selectValueClassName?: string;
	selectContentClassName?: string;
	selectGroupClassName?: string;
	selectItemClassName?: string;
	leftCheckboxClassName?: string;
	rightCheckboxClassName?: string;
	renderSelectedListContainerClassName?: string;
	renderSelectedList?: (
		selected: string[],
		removeItem: (item: string) => void,
	) => React.ReactNode;
	closeOnSelect?: boolean;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
	options,
	value,
	onChange,
	placeholder = "SELECT",
	maxDisplay = 1,
	checkboxPosition = "left",
	className,
	selectTriggerClassName,
	selectValueClassName,
	selectContentClassName,
	selectGroupClassName,
	selectItemClassName,
	leftCheckboxClassName,
	rightCheckboxClassName,
	renderSelectedListContainerClassName,
	renderSelectedList,
	closeOnSelect = false,
}) => {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const [displayValue, setDisplayValue] = React.useState<string>(placeholder);

	const normalizedOptions: OptionOption[] = React.useMemo(() => {
		if (typeof options[0] === "string") {
			return (options as string[]).map((opt) => ({ label: opt, value: opt }));
		}
		return options as OptionOption[];
	}, [options]);

	const getLabelForValue = (val: string): string => {
		const option = normalizedOptions.find((opt) => opt.value === val);
		return option ? option.label : val;
	};

	React.useEffect(() => {
		if (value.length === 0) {
			setDisplayValue(placeholder);
		} else {
			const visibleItems = value.slice(0, maxDisplay);
			const remainingCount = value.length - maxDisplay;

			const visibleLabels = visibleItems.map(getLabelForValue);

			setDisplayValue(
				remainingCount > 0
					? `${visibleLabels.join(", ").toUpperCase()} +${remainingCount}`
					: visibleLabels.join(", ").toUpperCase(),
			);
		}
	}, [value, maxDisplay, placeholder, getLabelForValue]);

	const toggleOption = (
		optionValue: string,
		e?: React.MouseEvent | React.KeyboardEvent,
	) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (value.includes(optionValue)) {
			onChange(value.filter((v) => v !== optionValue));
		} else {
			onChange([...value, optionValue]);
		}
	};

	const handleItemClick = (optionValue: string, e: React.MouseEvent) => {
		if (!closeOnSelect) {
			e.preventDefault();
			e.stopPropagation();
			toggleOption(optionValue, e);
		}
	};

	const handleItemKeyDown = (optionValue: string, e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			if (!closeOnSelect) {
				e.preventDefault();
				e.stopPropagation();
				toggleOption(optionValue, e);
			}
		}
	};

	return (
		<div className={cn(className)}>
			<Select
				showCheckIcon={false}
				open={menuOpen}
				onOpenChange={(open) => {
					setMenuOpen(open);
				}}
			>
				<Select.Trigger
					className={cn(selectTriggerClassName)}
					onClick={() => setMenuOpen(!menuOpen)}
				>
					<div className={cn(selectValueClassName)}>{displayValue}</div>
				</Select.Trigger>
				<Select.Content
					className={cn(selectContentClassName)}
					onCloseAutoFocus={(e) => {
						if (!closeOnSelect) {
							e.preventDefault();
						}
					}}
				>
					<Select.Group className={cn(selectGroupClassName)}>
						{normalizedOptions.map((option) => (
							<div
								key={option.value}
								className={cn(
									"flex items-center p-2 cursor-pointer hover:bg-gray-100",
									selectItemClassName,
								)}
								onClick={(e) => handleItemClick(option.value, e)}
								onKeyDown={(e) => handleItemKeyDown(option.value, e)}
								aria-selected={value.includes(option.value)}
							>
								{checkboxPosition === "left" && (
									<Checkbox
										checked={value.includes(option.value)}
										onCheckedChange={() => toggleOption(option.value)}
										onClick={(e) => {
											e.stopPropagation();
											toggleOption(option.value, e as React.MouseEvent);
										}}
										className={cn(leftCheckboxClassName)}
									/>
								)}
								<span className="ml-2">{option.label.toUpperCase()}</span>
								{checkboxPosition === "right" && (
									<Checkbox
										checked={value.includes(option.value)}
										onCheckedChange={() => toggleOption(option.value)}
										onClick={(e) => {
											e.stopPropagation();
											toggleOption(option.value, e as React.MouseEvent);
										}}
										className={cn("ml-auto", rightCheckboxClassName)}
									/>
								)}
							</div>
						))}
					</Select.Group>
				</Select.Content>
			</Select>
			{renderSelectedList && (
				<div className={cn("mt-4", renderSelectedListContainerClassName)}>
					{renderSelectedList(value, (item: string) =>
						onChange(value.filter((v) => v !== item)),
					)}
				</div>
			)}
		</div>
	);
};

export { MultipleSelect };
