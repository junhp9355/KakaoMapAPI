// MapContainer.js

import React, { useEffect, useState } from "react";
import "../styles/MapContainer.css";

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const offset = (page - 1) * limit;

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px; color:black">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <nav className="MapNav">
      <div
        className="kakaomap"
        id="myMap"
        style={{
          width: "1000px",
          height: "600px",
        }}
      ></div>

      <section id="result-list" className="ListPosition">
        {Places.slice(offset, offset + limit).map((item, i) => (
          <div key={i} className="mapList">
            <h5 className="SearchNumber">
              {i + 1} &nbsp; {item.place_name}
            </h5>
            <div>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span className="SearchAddress">{item.address_name}</span>
              )}
              <br />
              <span className="Telnumber">{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination" className="pagination"></div>
      </section>
    </nav>
  );
};

export default MapContainer;
