export default function BorderEffect(): JSX.Element {
	return (
		<>
			<div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-nfh-accent-primary duration-300 group-hover:scale-x-100"></div>
			<div className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 bg-nfh-accent-primary duration-300 group-hover:scale-y-100"></div>
			<div className="absolute top-0 left-0 h-0.5 w-full origin-right scale-x-0 bg-nfh-accent-primary duration-300 group-hover:scale-x-100"></div>
			<div className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 bg-nfh-accent-primary duration-300 group-hover:scale-y-100"></div>
		</>
	)
}
