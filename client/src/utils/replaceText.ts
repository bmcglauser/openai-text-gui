export function replaceText(textarea: string, fieldData: any) {
  for (let key in fieldData) {
    if (fieldData.hasOwnProperty(key)) {
      const value = fieldData[key];
      textarea = textarea.replaceAll(`#${key}#`, value);
    }
  }
  return textarea;
}
