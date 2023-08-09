export default function SectionContainer({ children }) {
	return (
		<section className="container m-auto flex max-w-3xl flex-1 flex-col gap-y-5 p-4 print:my-0 print:items-center print:justify-center">
			{children}
		</section>
	)
}
