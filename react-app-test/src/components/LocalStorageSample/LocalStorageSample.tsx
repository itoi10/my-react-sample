import React, { useState, useEffect } from 'react'
import './LocalStorageSample.css'


const LocalStorageSample: React.FC = () => {
  const storageKey = 'mystorage'
  const iconList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O']
  const [iconHistory, setIconHistory] = useState<string[]>([]);

  // LocalStorageから選択履歴読込
  useEffect(() => {
    const jsonData = localStorage.getItem(storageKey)
    if(jsonData !== null) {
      setIconHistory(JSON.parse(jsonData))
    }
  }, []);

  // アイコンがクリックされたら選択履歴保存
  function handleIconClick(e: React.MouseEvent<HTMLButtonElement>) {
    const iconId = e.currentTarget.getAttribute("icon-id")
    console.log(iconId)
    if (iconId === null) {
      return
    }
    // クリックされたアイコンを履歴の先頭に追加。重複は削除
    let newHistory = [iconId, ...iconHistory]
    newHistory = [...new Set(newHistory)]
    // JSON形式に変換しlocalStorageに保存
    const jsonData = JSON.stringify(newHistory)
    localStorage.setItem(storageKey, jsonData);
    setIconHistory(newHistory)
  }

  // 削除ボタンがクリックされたら選択履歴削除
  function handleClearClick(e: React.MouseEvent<HTMLButtonElement>) {
    localStorage.removeItem(storageKey)
    setIconHistory([])
  }

  return (
    <div className="ls-container">
      <h1 className="ls-h1">Local Storageサンプル</h1>
      <p className="ls-p">
        アイコンをクリックすると選択履歴が保存される<br/>
        Chromeなら[F12]→ApplicationでLocal Storage確認可
      </p>
      <button className="ls-clear" onClick={handleClearClick}>削除</button>
      <hr/>

      <h2 className="ls-h2">アイコン</h2>
      <div className="ls-icon-wrapper">
        {iconList && iconList.map(item => (
          <button key={item} icon-id={item} className="ls-icon" onClick={handleIconClick}>{item}</button>
        ))}
      </div>
      <hr/>

      <h2 className="ls-h2">選択履歴</h2>
      <div className="ls-icon-wrapper">
        {iconHistory && iconHistory.map(item => (
          <button key={item + "a"} icon-id={item} className="ls-icon" onClick={handleIconClick}>{item}</button>
        ))}
      </div>
    </div>
  );
};

export default LocalStorageSample