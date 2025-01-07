import { useFixtureInput } from "react-cosmos/client";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function defaultBreadcrumb() {
	const [enableDropdown] = useFixtureInput("Dropdown", false);
	const [enableEllipsis] = useFixtureInput("Ellipsis", false);

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="#">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						{enableDropdown ? (
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-1">
									{enableEllipsis ? (
										<BreadcrumbEllipsis className="h-4 w-4" />
									) : (
										<span>Toggle menu</span>
									)}
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									<DropdownMenuItem>Documentation</DropdownMenuItem>
									<DropdownMenuItem>Themes</DropdownMenuItem>
									<DropdownMenuItem>GitHub</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<BreadcrumbLink href="#">Components</BreadcrumbLink>
						)}
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}

export default {
	examples: defaultBreadcrumb,
};
