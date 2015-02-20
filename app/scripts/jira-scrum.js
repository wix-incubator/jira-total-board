$( document ).ready(function() {
  console.log( "ready!" );

  calc();
  function calc(){
    var totalBord = 0;
    var columnsId = buildColums();
    for(var i = 0;i<columnsId.length;i++){
      var totalCol = sumCol(columnsId[i]);
      totalBord = totalBord + totalCol;
      var element =  $('.ghx-column[data-id='+columnsId[i]+']');
      var totalEle = createTotalDisplay(totalCol);
      element.append(totalEle);
    }
    var totalEle = createTotalDisplay(totalBord);
    $('#ghx-board-name').append(totalEle)
  }

  function sumCol(colId){
    var total = 0
    $('.ghx-column[data-column-id='+colId+']').each( function () {
      $(this).find('.aui-badge').each( function () {
        var storyPoint = this.innerText;
        if(isNumeric(storyPoint)) {
          total = total + parseFloat (this.innerText);
        }
        console.log('value:' + total + ' storyPoint: ' + storyPoint);
      })

    });
    return total;
  }

  function buildColums(){
    var columnsIds = [];
    $('.ghx-column').each( function () {
      var dataId = $(this).attr('data-column-id');
      if(columnsIds.indexOf(dataId) == -1 && dataId !== 'undefined'){
        columnsIds.push(dataId);
      }
      console.log('id:' +$(this).attr('data-column-id') + " lenght:"+ columnsIds.length);
    });
    return columnsIds;
  }
  // Utils
  function createTotalDisplay(value){
    var total = $("<span class='aui-badge' style='font-size: 14px'/>")
    total.text(value);
    return total;
  }
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

});