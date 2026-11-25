import { Toaster } from 'sonner'
import { ExampleBar } from './ExampleBar'
import { ScrollToTop } from '@/components/ScrollToTop'
import './demo.css'

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="bottom-left" richColors closeButton />
      <ExampleBar />
      <div id="main">{children}</div>
      <ScrollToTop />
    </>
  )
}
