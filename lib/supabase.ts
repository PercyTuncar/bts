import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://scpnjeswivvevzuknmuq.supabase.co'
const supabaseKey = 'sb_publishable_9arIHhAmw7SWh-Ai0Xx_vQ_D2YOgQdC'

export const supabase = createClient(supabaseUrl, supabaseKey)
