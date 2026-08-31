import config from '@payload-config'
import { getPayload as getPayloadInstance } from 'payload'

/**
 * Returns the Payload instance.
 * Use this in all Server Components and Server Actions
 * to query collections and globals directly — no HTTP overhead.
 *
 * @example
 * const payload = await getPayload()
 * const { docs } = await payload.find({ collection: 'team', ... })
 */
export async function getPayload() {
  return getPayloadInstance({ config })
}
