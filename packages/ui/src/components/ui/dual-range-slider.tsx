import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";
import * as React from "react";

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => React.ReactNode;
  symbol?: string;
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
      trackClassName,
      rangeClassName,
      thumbClassName,
      labelClassName,
      value,
      defaultValue,
      min = 0,
      max = 100,
      ...props
    },
    ref,
  ) => {
    const finalValue = Array.isArray(value)
      ? value
      : defaultValue ?? [min, max];

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={clsx(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        min={min}
        max={max}
        value={value}
        defaultValue={finalValue}
        {...props}
      >
        <SliderPrimitive.Track
          className={clsx("relative h-[1px] w-full grow bg-primary", trackClassName)}
        >
          <SliderPrimitive.Range
            className={clsx("absolute bg-primary-200 h-[2px]", rangeClassName)}
          />
        </SliderPrimitive.Track>

        {finalValue.map((val, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb
              className={clsx(
                "relative block h-2 w-[7px] bg-primary-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                thumbClassName,
              )}
            >
              {label && (
                <span
                  className={clsx(
                    "absolute flex w-full justify-center text-xs",
                    labelPosition === "top" && "-top-7",
                    labelPosition === "bottom" && "top-3",
                    labelClassName,
                  )}
                >
                  {symbol}
                  {label(val)}
                </span>
              )}
            </SliderPrimitive.Thumb>
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  },
);

DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
