;(function (window, $, undefined) {
  'use strict';
  $( document ).ready(function() {

    function calc(){
      var totalBord = 0;
      var columnsId = buildColums();
      for(var i = 0, len = columnsId.length; i< len; ++i){
        var totalCol = sumCol(columnsId[i]);
        totalBord = totalBord + totalCol;
        var element =  $('.ghx-column[data-id='+columnsId[i]+']');
        var totalEle = createTotalDisplay(totalCol,element);
        element.append(totalEle);
      }
      var totalEle = createTotalDisplay(totalBord,$('#ghx-board-name'));
      $('#ghx-board-name').append(totalEle)
    }

    function sumCol(colId){
      var total = 0
      $('.ghx-column[data-column-id='+colId+']').each( function () {
        $(this).find('.aui-badge').each( function () {
          var storyPoint = this.textContent || this.innerText;
          if(isNumeric(storyPoint)) {
            total += parseFloat (this.innerText);
          }
        })

      });
      return total;
    }

    function buildColums(){
      var columnsIds = [];
      $('.ghx-column').each( function () {
        var dataId = $(this).data('column-id');
        if(columnsIds.indexOf(dataId) === -1 && dataId !== 'undefined'){
          columnsIds.push(dataId);
        }
      });
      return columnsIds;
    }
    // Utils
    function createTotalDisplay(value,parent){
      var total;
      var element = parent.find('.aui-badge');
      if(element.length > 0 ){
        total = $(element[0]);
      }else {
        total = $ ('<span/>').addClass ('aui-badge').css ('font-size', '14px');
      }
      total.text(value);
      return total;
    }
    function isNumeric(n) {
      return $.isNumeric(n);
    }
    setInterval(calc,3000);
    calc();
  });  
})(window, $);
