import React from "react";

const Notice: React.FC = () => {
	return (
		<div className="p-4 bg-[#09ED95] text-[#18181B] rounded-md shadow-md mb-6 max-w-3xl w-full mx-auto">
			<h2 className="text-xl font-semibold">Notice</h2>
			<p className="text-base">
				You can test your components using the React Cosmos implementation. To
				learn more, visit the
				<a
					className="underline font-semibold text-blue-600 hover:text-blue-800 visited:text-purple-600 ml-1"
					href="https://reactcosmos.org/docs"
					target="_blank"
					rel="noopener noreferrer"
				>
					documentation
				</a>
				. Alternatively, you can update the code to test new components as you
				develop them.
			</p>
		</div>
	);
};

const App: React.FC = () => {
	return (
		<div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-6 sm:px-8 md:px-16">
			<Notice />

			<React.Suspense
				fallback={
					<div className="text-lg font-medium text-gray-700">Loading...</div>
				}
			>
				<h1 className="text-2xl font-bold text-center mt-6">
					Add the component you want to test below:
				</h1>
			</React.Suspense>
		</div>
	);
};

export default App;
