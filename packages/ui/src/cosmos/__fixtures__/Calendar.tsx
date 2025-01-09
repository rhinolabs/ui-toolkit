import { useState, type FC } from "react";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const FormSchema = z.object({
	dob: z.date({
		required_error: "A date of birth is required.",
	}),
});

const DefaultCalendar: FC = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="rounded-md border"
			/>
		</div>
	);
};

const DefaultDatePicker: FC = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		mode: "onSubmit",
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("Submitted Data:", data);
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="dob"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date of Birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value
													? format(field.value, "PPP")
													: "Pick a date"}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={(date) => field.onChange(date)}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormDescription>
									Your date of birth is used to calculate your age.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default {
	calendar: DefaultCalendar,
	datePicker: DefaultDatePicker,
};
