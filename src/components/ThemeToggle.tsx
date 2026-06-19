'use client'

import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

const storageKey = 'nextx-theme'

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function ThemeToggle() {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'

    applyTheme(nextTheme)
    window.localStorage.setItem(storageKey, nextTheme)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative inline-flex h-9 w-[72px] shrink-0 items-center rounded-full border border-border bg-card p-1 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md focus-visible:ring-offset-background"
      aria-label="Wissel tussen light en dark mode"
      title="Light / dark mode"
    >
      <span className="theme-toggle-thumb absolute left-1 top-1 h-7 w-7 rounded-full bg-primary shadow-sm shadow-primary/25 transition-transform duration-300 ease-out" />
      <span className="relative z-10 grid w-full grid-cols-2 items-center">
        <span className="flex h-7 items-center justify-center">
          <Moon size={15} className="theme-toggle-dark-icon transition-colors duration-300" />
        </span>
        <span className="flex h-7 items-center justify-center">
          <Sun size={15} className="theme-toggle-light-icon transition-colors duration-300" />
        </span>
      </span>
    </button>
  )
}
