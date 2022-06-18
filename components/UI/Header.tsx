import { Toaster } from '@/components/Dynamic'
import ThemePicker from '../toggles/ThemePicker'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Header({ pickerOpen }): JSX.Element {
  return (
    <header>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ThemePicker open={pickerOpen} />
    </header>
  )
}
