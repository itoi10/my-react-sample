import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { createInfoWindow } from "./createInfoWindow";

const MyGoogleMapReact = () => {
  const locTokyoSta = {
    // latitude 経度
    lat: 35.681393045732996,
    // longitude 経度
    lng: 139.7671355265047,
  };

  const infoTokyoSta = {
    title: `東京駅 <a href="https://ja.wikipedia.org/wiki/%E6%9D%B1%E4%BA%AC%E9%A7%85" target="_blank" rel="noopener noreferrer">[Wikipedia]</a>`,
    content: `<br/>東京駅（とうきょうえき）は、東京都千代田区丸の内一丁目にある、東日本旅客鉄道（JR東日本）、東海旅客鉄道（JR東海）、東京地下鉄（東京メトロ）の駅である。JR東日本の在来線と新幹線各路線、JR東海の東海道新幹線、地下鉄丸ノ内線が発着するターミナル駅である。`,
  };

  // 検索
  const [mapObj, setMapObj] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");
  const search = () => {
    const { map, maps, geocoder } = mapObj;
    // 入力されたワードで検索
    geocoder.geocode({ address }, (results, status) => {
      // ヒットしたら
      if (status === maps.GeocoderStatus.OK) {
        // フォーカス
        const location = results[0].geometry.location;
        map.setCenter(location);
        // マーカー表示
        if (marker) {
          marker.setMap(null);
        }
        setMarker(
          new maps.Marker({
            map,
            position: location,
          })
        );
      }
    });
  };

  const handleApiLoaded = ({ map, maps }) => {
    // 検索に使用
    const geocoder = new maps.Geocoder();
    setMapObj({ map, maps, geocoder });
    // マーカー表示
    const marker = new maps.Marker({ map, position: locTokyoSta });
    createInfoWindow(map, maps, marker, infoTokyoSta);
  };

  return (
    <>
      <div className="flex items-center mb-1 justify-center">
        {/* 入力フォーム */}
        <input
          className="w-4/6 border-2 border-primary bg-red transition h-12 rounded-md focus:outline-none text-black text-lg "
          placeholder="東京駅"
          type="search"
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") search();
          }}
          value={address}
        />
        {/* 検索ボタン */}
        <button
          className="w-2/6 bg-blue-500 text-white h-12 py-2 px-4 ml-4 border border-blue-500 rounded"
          type="button"
          onClick={() => search()}
        >
          Search
        </button>
      </div>
      {/* GoogleMapsエリア */}
      <div style={{ height: "80vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={locTokyoSta}
          defaultZoom={15}
          onGoogleApiLoaded={handleApiLoaded}
        ></GoogleMapReact>
      </div>
    </>
  );
};

export default MyGoogleMapReact;
