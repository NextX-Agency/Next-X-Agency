import { Toaster } from 'sonner'
import { ExampleBar } from './ExampleBar'
import './demo.css'

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <ExampleBar />
      <div id="main">{children}</div>
    </>
  )
}
