
export function sealandPlugin(idParam, classNameParam, innerHTMLParam, listParam, toggleParam){
  var requiredElement = document.getElementsByClassName('hdmap-top hdmap-right');
  var hdmap_right = requiredElement[0];
  const seaLandSelect = document.createElement('div');
  seaLandSelect.id = idParam;
  seaLandSelect.className = classNameParam;
  seaLandSelect.setAttribute('aria-haspopup', true);
  seaLandSelect.innerHTML = innerHTMLParam;
  hdmap_right.insertBefore(seaLandSelect,hdmap_right.childNodes[0]);

  seaLandSelect.addEventListener('mouseover', function() {
    document.getElementById(listParam).style.display = 'block';
    document.getElementById(toggleParam).style.display = 'none';
  }, false);

  seaLandSelect.addEventListener('mouseout', function() {
    document.getElementById(listParam).style.display = 'none';
    document.getElementById(toggleParam).style.display = 'block';
  }, false);

}

export function monitorPlugin(idParam, classNameParam, innerHTMLParam, listParam, toggleParam){
  var requiredElement = document.getElementsByClassName('hdmap-top hdmap-right');
  var hdmap_right = requiredElement[0];
  const seaLandSelect = document.createElement('div');
  seaLandSelect.id = idParam;
  seaLandSelect.className = classNameParam;
  seaLandSelect.setAttribute('aria-haspopup', true);
  seaLandSelect.innerHTML = innerHTMLParam;
  hdmap_right.insertBefore(seaLandSelect,hdmap_right.childNodes[2]);  

  seaLandSelect.addEventListener('mouseover', function() {   
    document.getElementById(listParam).style.display = 'block';
    document.getElementById(toggleParam).style.display = 'none';
  }, false);

  seaLandSelect.addEventListener('mouseout', function() {   
    document.getElementById(listParam).style.display = 'none';
    document.getElementById(toggleParam).style.display = 'block';
  }, false);
  
  fetch('http://vts.hdnav.com:8000/v1/sync_monitors_info')
    .then(function(response) {
      return response.json();
    }).then(function(result) {
      let html;
      for(var oData of result.monitors){
        html = '<td style="border:1px solid #666666;padding:5px">' + oData.monitor_id + '</td>';
        html += '<td style="border:1px solid #666666;padding:5px">' + oData.detail_info + '</td>';
        html += '<td style="border:1px solid #666666;padding:5px">' + oData.alarm_level + '</td>';
        const tr = document.createElement('tr');
        tr.innerHTML = html;
        insertAfter(tr, document.getElementById('headtitle'));
      }
    });
}



function insertAfter(newEl, targetEl){
  var parentEl = targetEl.parentNode;  
  if(parentEl.lastChild == targetEl){
      parentEl.appendChild(newEl);
  }else{
    parentEl.insertBefore(newEl,targetEl.nextSibling);
  }            
}