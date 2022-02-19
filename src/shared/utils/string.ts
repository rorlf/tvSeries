export function removeTagsFromHtmlString(htmlString: string) {
  return htmlString.replace(/(<([^>]+)>)/gi, '');
}
