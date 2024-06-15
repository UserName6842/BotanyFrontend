export default defineAppConfig({
  ui: {
    strategy: 'override',
    primary: "emerald",
    gray: 'cool',
    notifications: {
      position: 'top-auto bottom-16'
    },
    table: {
      td: {
        strategy: 'override',
        base: "truncate max-w-[135px]"
      }
    }
  }
})
