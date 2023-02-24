import { getBucket } from '@extend-chrome/storage';
import { translate } from '../app/translate';

interface MyBucket {
  targetLang: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

chrome.runtime.onInstalled.addListener(() => {

  // 右クリック時に表示されるメニューを作成
  chrome.contextMenus.create({
    id:'translation',
    title:'選択したテキストを翻訳',
    contexts:['selection'],
  });
});


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab !== undefined) {
    // 選択したテキストを翻訳する
    switch (info.menuItemId) {
      case 'translation':
        // 選択したテキストを取得
        const selectedText = info.selectionText !== undefined ? info.selectionText : '';
        console.log('[選択テキスト]' + selectedText)

        // 翻訳先言語をストレージから取得
        const userTargetLang = (await bucket.get()).targetLang ?? 'EN';
        console.log('[翻訳先]' + userTargetLang)

        // テキスト翻訳
        const translatedText = await translate(selectedText, userTargetLang);
        console.log('[翻訳テキスト]' + translatedText);

        // コンテンツスクリプトに送信
        chrome.tabs.sendMessage(tab.id as number, {
          type: 'SHOW',
          data: {
            lang: userTargetLang,
            translatedText: translatedText,
            originalText: selectedText,
          }
        });

        break;
    }
  }
});


// アイコンをクリックした時の動作
chrome.runtime.onMessage.addListener(async function  (message, sender, sendResponse) {
  if (message.type === 'TRANSLATE') {
    // 選択したテキストを取得
    const selectedText = message.data.selectionText ?? '';
    // 翻訳先言語をストレージから取得
    const userTargetLang = (await bucket.get()).targetLang ?? 'EN';
    // テキスト翻訳
    const translatedText = await translate(selectedText, userTargetLang);
    // コンテンツスクリプトに送信
    chrome.tabs.sendMessage(sender.tab?.id as number, {
      type: 'SHOW',
      data: {
        lang: userTargetLang,
        translatedText: translatedText,
        originalText: selectedText,
      }
    });
  }
});

export { };
