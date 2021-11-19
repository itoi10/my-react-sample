import React from "react";
import GoogleMapReact from "google-map-react";

const createInfoWindow = (map, maps, marker, info) => {
  const content = `
    <div id="content>
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">
        ${info.title}
      </h1>
      <div id="bodyContent">
        ${info.content}
      </div>
    </div>
  `;

  const infowindow = new maps.InfoWindow({
    content: content,
  });
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
  return infowindow;
};

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

  const handleApiLoaded = ({ map, maps }) => {
    const marker = new maps.Marker({ map, position: locTokyoSta });
    createInfoWindow(map, maps, marker, infoTokyoSta);
  };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={locTokyoSta}
        defaultZoom={15}
        onGoogleApiLoaded={handleApiLoaded}
      ></GoogleMapReact>
    </div>
  );
};

export default MyGoogleMapReact;
