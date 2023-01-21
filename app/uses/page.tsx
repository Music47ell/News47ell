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
					<div className="my-4 flex justify-center">
						<div className="grid w-full grid-cols-3 gap-5 md:grid-cols-7 lg:grid-cols-10">
							{usesData.software.map((s) => (
								<div key={s.title} className="text-center text-lg font-bold">
									<s.icon className="flex h-20 w-20 items-center rounded-lg border border-nfh-accent-primary bg-nfh-background-secondary py-3 px-4" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</SectionContainer>
	)
}
