'use client'

import Table from '@/components/Table'
import { SectionContainer } from '@/components/UI'
import usesData from '@/data/usesData'

export default function Uses() {
	return (
		<SectionContainer>
			<div className="divide-y divide-nfh-accent-primary">
				<div className="space-y-2 pt-6 pb-8 md:space-y-5">
					<h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl">
						Uses
					</h1>
					<p className="text-lg leading-7">Software and hardware I use and recommend</p>
				</div>
				<div className="container py-6">
					<h2 className="text-3xl font-bold tracking-tight">Hardware</h2>
					<div className="my-4">
						{usesData.hardware.map((d, i) => (
							<Table ranking={i + 1} key={d.title} title={d.title} value={d.value} />
						))}
					</div>
					<h2 className="text-3xl font-bold tracking-tight">Tools</h2>
					<ul className="my-4 flex flex-wrap justify-center gap-12 md:gap-7">
						{usesData.software.map((s) => (
							<li
								key={s.title}
								className="group relative flex items-center justify-center rounded-full border border-nfh-accent-primary/70 bg-nfh-background-primary/20 p-4 shadow-md shadow-nfh-background-primary/20 transition-all duration-300 hover:rounded-[4rem] hover:border-nfh-accent-primary/50 hover:bg-nfh-background-primary/5 hover:shadow-none md:rounded-xl"
							>
								<div className="aspect-square w-20 p-4 transition-all duration-200 group-hover:p-4 sm:p-0 sm:group-hover:p-2">
									<div className="relative flex aspect-auto h-full w-full items-center justify-center">
										<s.icon className="h-20 w-20" />
									</div>
								</div>
								<div className="absolute top-3/4 z-20 overflow-hidden whitespace-nowrap rounded-lg bg-nfh-background-secondary px-2 py-1 font-bold text-nfh-text-primary transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 md:scale-0">
									{s.title}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</SectionContainer>
	)
}
