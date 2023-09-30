export default function SectionContainer({ children }) {
	return (
		<section className="container mx-auto flex max-w-screen-sm flex-1 flex-col p-4 print:my-0 print:items-center print:justify-center">
			{children}
		</section>
	)
}
