export function removeTagsFromHtmlString(htmlString: string) {
  return htmlString.replace(/(<([^>]+)>)/gi, '');
}

export function normalize(text: string) {
  let normalizedText = text
    .toLowerCase()
    .replace(/[áàãâä]/gi, 'a')
    .replace(/[éè¨ê]/gi, 'e')
    .replace(/[íìïî]/gi, 'i')
    .replace(/[óòöôõ]/gi, 'o')
    .replace(/[úùüû]/gi, 'u')
    .replace(/[ç]/gi, 'c')
    .replace(/[ñ]/gi, 'n')
    .replace(/[^a-z0-9]/gi, '');
  return normalizedText;
}
