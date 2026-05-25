import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((_nav, shortcuts) => {
  return shortcuts.filter(shortcut => shortcut.name !== 'goto')
})
