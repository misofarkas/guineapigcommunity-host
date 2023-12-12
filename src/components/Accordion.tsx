'use client';
import React, { useState, type ReactNode } from 'react';

const Accordion = ({
	title,
	children,
	isInitiallyOpen
}: {
	title: string;
	children: ReactNode;
	isInitiallyOpen: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(isInitiallyOpen);

	return (
		<div className="max-w-[600px] rounded-lg border border-divider lg:w-[400px]">
			{/* Accordion Header */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between rounded-lg bg-primary-bg p-4 font-semibold text-primary-text"
			>
				{title}
				<span>{isOpen ? '-' : '+'}</span>
			</button>

			{/* Accordion Content */}
			{isOpen && (
				<div className="bg-secondary-bg p-4 text-primary-text">{children}</div>
			)}
		</div>
	);
};

export default Accordion;
