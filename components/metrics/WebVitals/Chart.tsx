import fetcher from '@/lib/fetcher'
import useSWR from 'swr'

import { Chart as CJS } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
)

type Vital = {
  FCP: string
  CLS: number
  FID: number
  TTFB: number
  LCP: number
  date: string
}[]

export default function Chart(): JSX.Element {
  const { data, error } = useSWR<Vital>('/api/web-signals-timeline', fetcher)

  const isLoading = !data && !error

  const chartData = {
    labels: data?.map(({ date }) => date),
    datasets: [
      {
        label: 'FCP',
        data: data?.map(({ FCP }) => FCP).map(Number),
        backgroundColor: '#059669',
        borderColor: '#059669',
        borderWidth: 3,
        tension: 0.3,
      },
      {
        label: 'CLS',
        data: data?.map(({ CLS }) => CLS).map(Number),
        backgroundColor: '#db2777',
        borderColor: '#db2777',
        borderWidth: 3,
        tension: 0.3,
      },
      {
        label: 'FID',
        data: data?.map(({ FID }) => FID).map(Number),
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
        borderWidth: 3,
        tension: 0.3,
      },
      {
        label: 'TTFB',
        data: data?.map(({ TTFB }) => TTFB).map(Number),
        backgroundColor: '#666666',
        borderColor: '#666666',
        borderWidth: 3,
        tension: 0.3,
      },
      {
        label: 'LCP',
        data: data?.map(({ LCP }) => LCP).map(Number),
        backgroundColor: '#d97706',
        borderColor: '#d97706',
        borderWidth: 3,
        tension: 0.3,
      },
    ],
  }

  return (
    <>
      <div className="md:flex md:justify-between md:items-center">
        <p className="text-sm uppercase">Average Web Vitals</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-4 px-1 w-full h-64 rounded opacity-75 animate-pulse bg-primary"></div>
      ) : (
        <div className="flex flex-col justify-center items-center py-4 px-1 w-full h-64 rounded opacity-75 bg-primary">
          <CJS
            type="line"
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  display: false,
                },
                x: {
                  display: false,
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: {
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                  },
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                  usePointStyle: true,
                },
              },
            }}
          />
        </div>
      )}
    </>
  )
}
