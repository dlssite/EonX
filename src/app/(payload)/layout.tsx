import { RootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import config from '@payload-config'
import React from 'react'
import { importMap } from './admin/importMap'
import '@payloadcms/next/css'
import '@/styles/admin.css'

type Args = {
  children: React.ReactNode
}

export { metadata } from '@payloadcms/next/layouts'

/**
 * Wrap handleServerFunctions in a local async function marked "use server".
 * This makes it a proper Server Action that React / Next.js 15 can serialize
 * and safely pass as a prop to the Payload Client Component tree.
 */
const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default async function Layout({ children }: Args) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
