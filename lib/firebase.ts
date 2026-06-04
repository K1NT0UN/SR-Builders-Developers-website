import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './leadConfig'

// Singleton Firebase app (avoids re-init on hot reload / multiple imports).
// Only initialize if we have an API key to avoid crashing the build.
export const firebaseApp = firebaseConfig.apiKey
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null
export const auth = firebaseApp ? getAuth(firebaseApp) : null as any
