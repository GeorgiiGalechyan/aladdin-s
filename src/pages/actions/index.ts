import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'

import { lead } from './lead'

export const server = { lead }
