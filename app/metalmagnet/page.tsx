import type { Metadata } from 'next'

import SongRecommendationForm from './components/form'

export const metadata: Metadata = {
	title: 'Metal Magnet',
	description: 'Recommend a song to me',
}

export default function MusicRecommend() {
	return <SongRecommendationForm />
}
