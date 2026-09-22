import { Toaster } from 'sonner'
import { ExampleBar } from './ExampleBar'

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <ExampleBar />
      <main id="main">{children}</main>
    </>
  )
}
