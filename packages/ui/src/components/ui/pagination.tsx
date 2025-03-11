import type * as React from "react";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { type Button, buttonVariants } from "@/components/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			// biome-ignore lint/a11y/noRedundantRoles: <explanation>
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
  } & Partial<Pick<React.ComponentProps<typeof Button>, "size">> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) {
	return (
		<a
			aria-current={isActive ? "page" : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: isActive ? "outline" : "ghost",
					size,
				}),
				className,
			)}
			{...props}
		/>
	);
}

function PaginationPrevious({
	className,
	size = "default",
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size={size}
			className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
			{...props}
		>
			<ChevronLeftIcon />
			<span className="hidden sm:block">Previous</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	size = "default",
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size={size}
			className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<ChevronRightIcon />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontalIcon className="size-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

// Attach subcomponents to Pagination
Pagination.Content = PaginationContent;
Pagination.Link = PaginationLink;
Pagination.Item = PaginationItem;
Pagination.Previous = PaginationPrevious;
Pagination.Next = PaginationNext;
Pagination.Ellipsis = PaginationEllipsis;

export { Pagination };
