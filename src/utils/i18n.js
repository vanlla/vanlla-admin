// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title, name) {
  const hasKey = this.$te('menu.' + title)
  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('menu.' + title)
    return translatedTitle
  } else if (name) {
    title = name
  }
  return title
}
