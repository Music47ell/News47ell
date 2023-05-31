import type { Metadata } from 'next'

import SongRecommendationForm from './form'

export const metadata: Metadata = {
	title: 'Recommend a song - Dashboard',
	description: 'Recommend a song to me.',
}

export default function MusicRecommend() {
	return <SongRecommendationForm />
}
