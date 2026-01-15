"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	children?: React.ReactNode;
	className?: string;
}

function TypographyH1({ children, className, ...props }: TypographyProps) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	);
}

function TypographyH2({ children, className, ...props }: TypographyProps) {
	return (
		<h2
			className={cn(
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
}

function TypographyH3({ children, className, ...props }: TypographyProps) {
	return (
		<h3
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		>
			{children}
		</h3>
	);
}

function TypographyH4({ children, className, ...props }: TypographyProps) {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		>
			{children}
		</h4>
	);
}

function TypographyH5({ children, className, ...props }: TypographyProps) {
	return (
		<h5
			className={cn(
				"scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		>
			{children}
		</h5>
	);
}

function TypographyH6({ children, className, ...props }: TypographyProps) {
	return (
		<h6
			className={cn(
				"scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		>
			{children}
		</h6>
	);
}

function TypographyP({ children, className, ...props }: TypographyProps) {
	return (
		<p className={cn("leading-7 not-first:mt-6", className)} {...props}>
			{children}
		</p>
	);
}

function TypographyBlockquote({
	children,
	className,
	...props
}: TypographyProps) {
	return (
		<blockquote
			className={cn("mt-6 border-l-2 pl-6 italic", className)}
			{...props}
		>
			{children}
		</blockquote>
	);
}

export function TypographyList({
	children,
	tag = "ul",
	className,
	...props
}: TypographyProps & { tag?: "ul" | "ol" | "dl" }) {
	const Element = tag;

	return (
		<Element
			className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
			{...props}
		>
			{children}
		</Element>
	);
}

export function TypographyListItem({
	children,
	className,
	tag = "li",
	...props
}: TypographyProps & { tag?: "li" | "dt" | "dd" }) {
	const Element = tag;

	return (
		<Element className={cn("mt-2", className)} {...props}>
			{children}
		</Element>
	);
}

function TypographyInlineCode({
	children,
	className,
	...props
}: TypographyProps) {
	return (
		<code
			className={cn(
				"bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
				className,
			)}
			{...props}
		>
			{children}
		</code>
	);
}

function TypographyLead({ children, className, ...props }: TypographyProps) {
	return (
		<p className={cn("text-muted-foreground text-xl", className)} {...props}>
			{children}
		</p>
	);
}

function TypographyLarge({ children, className, ...props }: TypographyProps) {
	return (
		<div className={cn("text-lg font-semibold", className)} {...props}>
			{children}
		</div>
	);
}

function TypographySmall({ children, className, ...props }: TypographyProps) {
	return (
		<small
			className={cn("text-sm leading-none font-medium", className)}
			{...props}
		>
			{children}
		</small>
	);
}

function TypographyMuted({ children, className, ...props }: TypographyProps) {
	return (
		<p className={cn("text-muted-foreground text-sm", className)} {...props}>
			{children}
		</p>
	);
}

export const Typography = {
	H1: TypographyH1,
	H2: TypographyH2,
	H3: TypographyH3,
	H4: TypographyH4,
	H5: TypographyH5,
	H6: TypographyH6,
	P: TypographyP,
	Blockquote: TypographyBlockquote,
	List: TypographyList,
	ListItem: TypographyListItem,
	InlineCode: TypographyInlineCode,
	Lead: TypographyLead,
	Large: TypographyLarge,
	Small: TypographySmall,
	Muted: TypographyMuted,
};
