import { getBucket } from '@extend-chrome/storage';
import { Container, Select } from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';

interface MyBucket {
  targetLang: string;
}

// chromeストレージに保存する (syncはアカウント間で同期)
const bucket = getBucket<MyBucket>('my_bucket', 'sync')

const Popup = (): ReactElement => {
  document.body.style.width = '20rem';
  document.body.style.height = '20rem';

  const [lang, setLang] = useState<string>('EN')

  useEffect(() => {
    (async () => {
      const value = await bucket.get()
      if (value.targetLang) {
        setLang(value.targetLang)
      }
    })()
  }, [])

  const saveLang = (lang: string) => {
    bucket.set({ targetLang: lang });
    setLang(lang)
  }

  return (
    // Material UIコンポーネントを使用
    <Container p="xl">
      <Select
        label="どの言語に翻訳するか選択してください"
        value={lang}
        onChange={(value:string) => saveLang(value)}
        data={[
          { label: '英語', value: 'EN' },
          { label: '韓国語', value: 'KO' },
          { label: '中国語', value: 'ZH' },
        ]}
      />
    </Container>
  );
};

export default Popup;
