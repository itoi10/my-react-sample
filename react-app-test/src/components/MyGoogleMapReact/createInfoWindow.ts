
export const createInfoWindow = (map:any, maps:any, marker:any, info:{title:string, content:string}) => {
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

  const infoWindow = new maps.InfoWindow({
    content: content,
  });
  marker.addListener("click", () => {
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
  return infoWindow;
};
