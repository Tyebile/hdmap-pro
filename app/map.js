import HDMap from './hdmap-src';
import './hdmap-shipLayer';
import './hdmap.draw-src';
import './Control.MiniMap';
import {sealandPlugin} from './mapPlugin';  
import {monitorPlugin} from './mapPlugin';
import {udfType} from './contans';


/**********************************************************************************
 ******************************1、地图初始化显示************************************
 **********************************************************************************/
const mapDiv = document.createElement('div');
mapDiv.id = 'map';

document.body.appendChild(mapDiv);


const url = 'http://hdnav.zicp.net';
// 新建地图对象
const map = new HDMap.Map('map', {zoomsliderControl: true});

// Attribution信息
const hdmapAttrib = '&copy; <a href="howtoHDMap/app/index.html"target="_blank">HDMap 开发指南</a>';
// mapbox地图
// OSM地图
const osmLayerUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
// 水上物流融合图
const mboxLayerUrl = url + ':8008/'+'/v1/rastertiles/SSWL_map/{z}/{x}/{y}.png';
// 海陆融合图
const mixMapUrl = url+':8008/' + '/v1/rastertiles/mix_map/{z}/{x}/{y}.png';
// 陆图
const landMapUrl = url + ':8008/'+'/v1/rastertiles/land_map/{z}/{x}/{y}.png';
const landGridUrl = url + ':8008/'+'/v1/rastertiles/land_grid/{z}/{x}/{y}.json';
// 海图
const seaMapUrl = url + ':8008/'+'/v1/rastertiles/sea_map/{z}/{x}/{y}.png';
const seaGridUrl = url + ':8008/'+'/v1/rastertiles/sea_grid/{z}/{x}/{y}.json';
// 绘画风格
const galleryMapUrl = 'https://api.mapbox.com/styles/v1/edenhalperin/cifq0r0e5000q85m0d293k6mq/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWRlbmhhbHBlcmluIiwiYSI6IlFRZG0zMWMifQ.QUNKx4tIMjZfwmrE8SE6Bg';
// 明亮风格
const brightMapUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
// 老地图
const oldMapUrl = 'https://api.mapbox.com/styles/v1/mslee/cif5p01n202nisaktvljx9mv3/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg';
// 蓝图
const blueMapUrl = 'https://api.mapbox.com/styles/v1/mslee/ciellcr9y001g5pknxuqwjhqm/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg';
// 北半球图
const northMapUrl = 'https://api.mapbox.com/styles/v1/aj/cievxpmc00wsmqam3dqntax4o/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2loN3g1YWh0MHQ2OXV1a2k2eGtzeDhiayJ9.WbVSgpJDUjhaM2L0qdMJ2w';
// 卫星图
const satMapUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
// 图层切换显示的图层
const baseLayersForlayersControl = {
  '融合图': HDMap.tileLayer(mixMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
  '陆图': HDMap.tileLayer(landMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18}),
  '海图': HDMap.tileLayer(seaMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
  '卫星图': HDMap.tileLayer(satMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
  '明亮风格': HDMap.tileLayer(brightMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  '绘画风格': HDMap.tileLayer(galleryMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  '老地图': HDMap.tileLayer(oldMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  '蓝图': HDMap.tileLayer(blueMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  '北半球图': HDMap.tileLayer(northMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  'OSM': HDMap.tileLayer(osmLayerUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18}),
};
// 非图层切换显示的图层以及utfgridLayer
const baseLayers = {
  // mapbox地图
  mboxLayer: HDMap.tileLayer(mboxLayerUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18}),
  mixGrid: HDMap.tileLayer(mixMapUrl, {attribution: hdmapAttrib, minZoom: 5, maxZoom: 16}),
  // utfgridLayer
  landGrid: HDMap.utfgridLayer(landGridUrl, {resolution: 4}),
  seaGrid: HDMap.utfgridLayer(seaGridUrl, {resolution: 4}),
};
// 地图添加初始显示
map.addLayer(baseLayersForlayersControl['融合图'], baseLayers.mixGrid);
map.addLayer(baseLayers.mixGrid);
// 设置初始坐标点以及缩放级别
map.setView(new HDMap.LatLng(38.787275, 121.6332385), 10);
// 创建shipLayer对象
var shipLayer = new HDMap.ship();


/*************（1）比例尺控件************/
map.addControl(new HDMap.Control.Scale());

/*************（2）绘制控件************/
const drawnItems = HDMap.featureGroup().addTo(map);
map.addControl(new HDMap.Control.Draw({
  edit: {featureGroup: drawnItems},
}));
map.on('draw:created', function (event) {
  const layer = event.layer;
  drawnItems.addLayer(layer);
});

/*************（3）测量控件************/
// HDMap.control.measure().addTo(map);

/*************（4）小地图控件************/
var baseLayersForlayersControlCopy = {
  '融合图': HDMap.tileLayer(mixMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
  '陆图': HDMap.tileLayer(landMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18}),
  '海图': HDMap.tileLayer(seaMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
  '卫星图': HDMap.tileLayer(satMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
  '明亮风格': HDMap.tileLayer(brightMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  '绘画风格': HDMap.tileLayer(galleryMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  '老地图': HDMap.tileLayer(oldMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  '蓝图': HDMap.tileLayer(blueMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  '北半球图': HDMap.tileLayer(northMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
  'OSM': HDMap.tileLayer(osmLayerUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18}),
};

const miniMap = new HDMap.Control.MiniMap(baseLayersForlayersControlCopy['融合图'], {toggleDisplay: true}).addTo(map);

// 底图改变触发事件
map.on('baselayerchange', function (e) {
  switch (e._url) {
  case baseLayersForlayersControl['融合图']._url:
    baseLayers.landGrid.remove();
    baseLayers.seaGrid.remove();
    baseLayers.mixGrid.addTo(map);
    miniMap.changeLayer(baseLayersForlayersControlCopy['融合图']);
    break;
  case baseLayersForlayersControl['陆图']._url:
    baseLayers.mixGrid.remove();
    baseLayers.seaGrid.remove();
    baseLayers.landGrid.addTo(map);
    miniMap.changeLayer(baseLayersForlayersControlCopy['陆图']);
    break;
  case baseLayersForlayersControl['海图']._url:
    baseLayers.mixGrid.remove();
    baseLayers.landGrid.remove();
    baseLayers.seaGrid.addTo(map);
    miniMap.changeLayer(baseLayersForlayersControlCopy['海图']);
    break;
  case baseLayersForlayersControl['卫星图']._url:
    miniMap.changeLayer(baseLayersForlayersControlCopy['卫星图']);
    break;
  case baseLayersForlayersControl['明亮风格']._url:
    miniMap.changeLayer(baseLayersForlayersControlCopy['明亮风格']);
    break;
  case baseLayersForlayersControl['绘画风格']._url:
    miniMap.changeLayer(baseLayersForlayersControlCopy['绘画风格']);
    break;
  case baseLayersForlayersControl['老地图']._url:
    miniMap.changeLayer(baseLayersForlayersControlCopy['老地图']);
    break;
  case baseLayersForlayersControl['蓝图']._url:
    miniMap.changeLayer(baseLayersForlayersControlCopy['蓝图']);
    break;
  case baseLayersForlayersControl['北半球图']._url:
    miniMap.changeLayer(baseLayersForlayersControlCopy['北半球图']);
    break;
  case baseLayersForlayersControl['OSM']._url:
    miniMap.changeLayer(baseLayersForlayersControlCopy['OSM']);
    break;

  }
});
//添加图层切换控件
HDMap.control.layers(baseLayersForlayersControl, {'显示船舶位置': shipLayer}).addTo(map);


/*************（5）船舶信息************/

const shipsInfoUrl = 'http://vts.hdnav.com:8000/v1/sync_ships_info';
window.data = fetch(shipsInfoUrl)
// window.data = fetch('./app/json/ships.json')
  .then(function(response) {
    return response.json();
    // return response.json();
  }).then(function(result) {
    let nShipObject = {};
    let oShipArray = [];
    nShipObject.error_code = 0;
    nShipObject.error_desc = 0;

    for(var oData of result.ships){
      let item = {};
      item.mmsi = oData.mmsi;
      item.track_id = oData.track_id;
      item.call_sign = oData.call_sign;
      item.nav_status = oData.nav_status;
      item.course = oData.course/10;
      item.shipType = oData.ship_type;
      item.name = oData.c_name || oData.e_name || oData.e_name || oData.ais_name || oData.track_id;
      item.longitudeMap = oData.lon/10000000;
      item.nlon = oData.lon/10000000;
      item.length = oData.ship_length;
      item.longitude = oData.lon/10000000;
      item.nlat = oData.lat/10000000;
      item.lat = oData.lat/10000000;
      item.navStatus = oData.nav_status;
      item.lon = oData.lon/10000000;
      item.speed = oData.speed/10;
      item.ship_type = oData.ship_type;
      item.width = oData.ship_breadth;
      item.latitudeMap = oData.lat/10000000;
      item.latitude = oData.lat/10000000;

      oShipArray.push(item);
    }

    nShipObject.details = oShipArray;

    data = nShipObject;
  });

/*************（5）海图、陆图切换控件************/

// const sealandHtml = '<a id="hdmap-control-layers-toggle" class="hdmap-control-layers-toggle" style="background-image: url(app/css/images/sea_land_map_marker.png);width: 36px;height: 36px;" href="#" title="Layers"></a>' +
//                 '<form id="hdmap-control-layers-list" class="hdmap-control-layers-list" style="padding: 5px;"> ' +
//                 '<div class="hdmap-control-layers-base"> ' +
//                 '<p>搜索设置</p>' +
//                 '<div class="hdmap-control-layers-separator"></div>' +
//                 '<label> <input type="radio" class="hdmap-control-layers-selector" name="sealand" checked="checked" value="0"> ' +
//                 '<span></span>陆地</span> </label> ' +
//                 '<label> <input type="radio" class="hdmap-control-layers-selector" name="sealand" value="1">' +
//                 '<span style="margin-left: 3px;">海洋</span> </label> </div> ' +
//                 '</form>';
// const sealandId = 'sea-land-select';
// const sealandClassName = 'hdmap-control-layers hdmap-control';
// const sealandList = 'hdmap-control-layers-list';
// const sealandToggle = 'hdmap-control-layers-toggle';

// sealandPlugin(sealandId, sealandClassName, sealandHtml, sealandList, sealandToggle);

/*************（6）监控报警信息控件************/

const monitorsHtml = '<a id="hdmap-control-layers-toggle2" class="hdmap-control-layers-toggle" style="background-image: url(app/css/images/sea_land_map_marker.png);width: 36px;height: 36px;" href="#" title="Layers"></a>' +
            '<form id="hdmap-control-layers-list2" class="hdmap-control-layers-list" style="padding: 5px;"> ' +
            '<div class="hdmap-control-layers-base"> ' +
            '<div style="text-align: center;margin:0 auto;">'+
            '<div id="table">'+
            '<table align="center" style="border:1px #666666;border-collapse: collapse">'+
            '<tr id="headtitle">'+
            '<th style="padding:10px;background-color: #dedede;border:1px solid #666666">' + '报警ID' + '</th>'+
            '<th style="padding:10px;background-color: #dedede;border:1px solid #666666">' + '详细信息' + '</th>'+
            '<th style="padding:10px;background-color: #dedede;border:1px solid #666666">' + '报警级别' + '</th>'+
            '</tr>'+
            '</table>'+
            '</div></div></div></form>';
const monitorsId = 'monitors-info-select';
const monitorsClassName = 'hdmap-control-layers hdmap-control';
const monitorsList = 'hdmap-control-layers-list2';
const monitorsToggle = 'hdmap-control-layers-toggle2';

monitorPlugin(monitorsId, monitorsClassName, monitorsHtml, monitorsList, monitorsToggle);

/********* 物标信息 ********* */
var circleLayer, sectorLayer, polylineLayer, polygonLayer;
 fetch('http://vts.hdnav.com:8000/v1/sync_objects_info')
  .then(function(response) {
    return response.json();
  }).then(function(result) {
    for(var oData of result.objects){
      if(oData.udf_type != 18){
        if(oData.kind == 5){//圆
          HDMap.circle([oData.points[0].point_lat/10000000, oData.points[0].point_lon/10000000], oData.radius/10000 * 1852, 0, 360).addTo(map);
        }else if(oData.kind == 4){//扇形
          HDMap.circle([oData.points[0].point_lat/10000000, oData.points[0].point_lon/10000000], oData.radius/10000 * 1852, oData.begin_bearing/10 , oData.end_bearing/10).addTo(map);
        }
        var pointArray = [];
        if(oData.kind == 2){//折线
          for(var i=0; i<oData.points.length; i++){
            pointArray[i] = [oData.points[i].point_lat/10000000, oData.points[i].point_lon/10000000];
          }
          polylineLayer = HDMap.polyline([pointArray], {color: 'red'});
          polylineLayer.addTo(map);
          
        }

        var shapeArray = [];
        if(oData.kind == 3){//多边形
          for(var i=0; i<oData.points.length; i++){
            shapeArray[i] = [oData.points[i].point_lat/10000000, oData.points[i].point_lon/10000000];
          }


          var  polygon = HDMap.polygon([shapeArray], HDMap.polyline([shapeArray]));
          var polygonGeo = polygon.toGeoJSON();


           var popupText = '<table>'+
          '<tr>'+
          '<td>区域：</td>'+
          '<td>'+udfType(oData.udf_type)+'</td>'+
          '</tr>'+
          '<tr>'+
          '<td>名称：</td>'+
          '<td>'+oData.desc_content+'</td>'+
          '</tr>'+
          '</table>';

          new HDMap.geoJson(polygonGeo,{dashArray:'5,5', weight:1,
          onEachFeature: function (feature, layer) {
            layer.bindPopup(popupText);
          }}).addTo(map);
        }
      }
    }
});

map.on('zoomend', function(){
  const zoom = map.getZoom();

  if (zoom >= 10) {
    shipLayer.remove();
    shipLayer.setJsonData(map, data);
    shipLayer.addTo(map);
  }else {
    map.removeLayer(shipLayer);
  }
});