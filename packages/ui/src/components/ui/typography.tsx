"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

export interface TypographyProps {
	children?: React.ReactNode;
	className?: string;
}

function TypographyH1({ children, className }: TypographyProps) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
				className,
			)}
		>
			{children}
		</h1>
	);
}

function TypographyH2({ children, className }: TypographyProps) {
	return (
		<h2
			className={cn(
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
		>
			{children}
		</h2>
	);
}

function TypographyH3({ children, className }: TypographyProps) {
	return (
		<h3
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
		>
			{children}
		</h3>
	);
}

function TypographyH4({ children, className }: TypographyProps) {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
		>
			{children}
		</h4>
	);
}

function TypographyH5({ children, className }: TypographyProps) {
	return (
		<h5
			className={cn(
				"scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
		>
			{children}
		</h5>
	);
}

function TypographyH6({ children, className }: TypographyProps) {
	return (
		<h6
			className={cn(
				"scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
		>
			{children}
		</h6>
	);
}

function TypographyP({ children, className }: TypographyProps) {
	return (
		<p className={cn("leading-7 not-first:mt-6", className)}>{children}</p>
	);
}

function TypographyBlockquote({ children, className }: TypographyProps) {
	return (
		<blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
			{children}
		</blockquote>
	);
}

function TypographyInlineCode({ children, className }: TypographyProps) {
	return (
		<code
			className={cn(
				"bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
				className,
			)}
		>
			{children}
		</code>
	);
}

function TypographyLead({ children, className }: TypographyProps) {
	return (
		<p className={cn("text-muted-foreground text-xl", className)}>{children}</p>
	);
}

function TypographyLarge({ children, className }: TypographyProps) {
	return (
		<div className={cn("text-lg font-semibold", className)}>{children}</div>
	);
}

function TypographySmall({ children, className }: TypographyProps) {
	return (
		<small className={cn("text-sm leading-none font-medium", className)}>
			{children}
		</small>
	);
}

function TypographyMuted({ children, className }: TypographyProps) {
	return (
		<p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
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
	InlineCode: TypographyInlineCode,
	Lead: TypographyLead,
	Large: TypographyLarge,
	Small: TypographySmall,
	Muted: TypographyMuted,
};
