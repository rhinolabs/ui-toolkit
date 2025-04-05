import { Checkbox } from "@/components/ui/checkbox";
import { Command } from "@/components/ui/command";
import { Popover } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

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
	const [open, setOpen] = React.useState(false);
	const [displayValue, setDisplayValue] = React.useState<string>(placeholder);
	const triggerRef = React.useRef<HTMLButtonElement>(null);

	const normalizedOptions: OptionOption[] = React.useMemo(() => {
		if (!options.length) return [];
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

		if (closeOnSelect) {
			setOpen(false);
		}
	};

	const handleClosePopover = () => {
		if (!closeOnSelect) {
			return false;
		}
		return true;
	};

	return (
		<div className={cn("relative", className)}>
			<Popover
				open={open}
				onOpenChange={(newOpen) => {
					if (!newOpen || handleClosePopover()) {
						setOpen(newOpen);
					}
				}}
			>
				<Popover.Trigger asChild>
					<button
						ref={triggerRef}
						type="button"
						// biome-ignore lint/a11y/useSemanticElements: <explanation>
						// biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
						role="combobox"
						aria-expanded={open}
						className={cn(
							"flex items-center justify-between w-full border border-input bg-transparent px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0",
							selectTriggerClassName,
						)}
						onClick={(e) => {
							e.stopPropagation();
							setOpen(!open);
						}}
					>
						<div className={cn(selectValueClassName)}>{displayValue}</div>
						<ChevronDown className="ml-2 h-4 w-4 shrink-0" />
					</button>
				</Popover.Trigger>
				<Popover.Content
					className={cn(
						"p-0 w-[var(--radix-popover-trigger-width)]",
						selectContentClassName,
					)}
					align="start"
					onOpenAutoFocus={(e) => {
						e.preventDefault();
					}}
					onCloseAutoFocus={(e) => {
						if (!closeOnSelect) {
							e.preventDefault();
						}
					}}
					style={{
						width: triggerRef.current ? triggerRef.current.offsetWidth : "auto",
					}}
				>
					<Command className="w-full">
						<Command.List className="max-h-60 overflow-auto w-full">
							<Command.Empty>No options found.</Command.Empty>
							<Command.Group className={cn(selectGroupClassName)}>
								{normalizedOptions.map((option) => (
									<Command.Item
										key={option.value}
										value={option.value}
										onSelect={(currentValue) => {
											toggleOption(currentValue);
										}}
										className={cn(
											"flex items-center p-2 cursor-pointer hover:bg-gray-100 w-full",
											selectItemClassName,
										)}
										disabled={false}
										onMouseDown={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
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
									</Command.Item>
								))}
							</Command.Group>
						</Command.List>
					</Command>
				</Popover.Content>
			</Popover>
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
