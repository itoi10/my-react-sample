
type Result = {
  translations: [{
    detected_source_language: string;
    text: string;
  }]
}

export const translate = async (selectedText: string, userTargetLang: string) => {

  const API_URL = 'https://api-free.deepl.com/v2/translate';

  // 環境変数を読み込む Vite (https://zenn.dev/longbridge/articles/575190b038f805)
  const API_KEY = import.meta.env.VITE_DEEPL_API_KEY;

  const params = {
    auth_key: API_KEY,
    text: selectedText,
    target_lang: userTargetLang,
  }
  const query = new URLSearchParams(params);
  const url = API_URL + '?' + query;
  const rsp = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  })
  const result: Result = await rsp.json();
  return result.translations[0].text;
}
