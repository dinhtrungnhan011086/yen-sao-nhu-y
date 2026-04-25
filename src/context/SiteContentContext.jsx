import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  createInitialSiteContent,
  DEFAULT_STORE_EMAIL,
  LEGACY_DEFAULT_STORE_EMAIL,
  STORAGE_KEY,
  STORAGE_VERSION,
} from '../data/siteContent'

const SiteContentContext = createContext(null)

function mergeContent(defaultValue, storedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(storedValue) ? storedValue : defaultValue
  }

  if (defaultValue && typeof defaultValue === 'object') {
    const mergedObject = { ...defaultValue }

    Object.keys(defaultValue).forEach((key) => {
      mergedObject[key] = mergeContent(defaultValue[key], storedValue?.[key])
    })

    return mergedObject
  }

  return storedValue ?? defaultValue
}

function migrateStoredContent(siteContent) {
  if (siteContent?.store?.email === LEGACY_DEFAULT_STORE_EMAIL) {
    return {
      ...siteContent,
      store: {
        ...siteContent.store,
        email: DEFAULT_STORE_EMAIL,
      },
    }
  }

  return siteContent
}

function readStoredContent() {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    if (!rawValue) {
      return createInitialSiteContent()
    }

    const parsedValue = JSON.parse(rawValue)

    if (parsedValue?.version !== STORAGE_VERSION || !parsedValue.data) {
      return createInitialSiteContent()
    }

    return migrateStoredContent(mergeContent(createInitialSiteContent(), parsedValue.data))
  } catch {
    return createInitialSiteContent()
  }
}

export function SiteContentProvider({ children }) {
  const [siteContent, setSiteContent] = useState(() => readStoredContent())

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION,
        data: siteContent,
      }),
    )
  }, [siteContent])

  const value = useMemo(
    () => ({
      siteContent,
      setSiteContent,
      resetSiteContent: () => setSiteContent(createInitialSiteContent()),
    }),
    [siteContent],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)

  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider')
  }

  return context
}