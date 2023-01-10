'use client'

import Card from '@/components/Card'
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
					<h2 className="text-3xl font-bold tracking-tight">Software</h2>
					<div className="-mx-4 flex flex-wrap">
						{usesData.software.map((d) => (
							<Card
								key={d.title}
								title={d.title}
								description={d.description}
								imgSrc={d.imgSrc}
								href={d.href}
							/>
						))}
					</div>
				</div>
			</div>
		</SectionContainer>
	)
}
