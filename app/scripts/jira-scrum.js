'use strict';
(function (window, $, undefined) {
  // on dom ready
  $(document).ready(function () {
    var self = this;

    function calc() {
      var totalBord = 0;
      var columnsId = buildColumns(); // get a list of columns id
      for (var i = 0, len = columnsId.length; i < len; ++i) { // loop on column
        var totalCol = sumCol(columnsId[i]); //run on all the curd in the column
        var element = $('.ghx-column[data-id=' + columnsId[i] + ']'); //getting the column header
        var totalEle = createTotalDisplay(totalCol, element, columnsId[i]); // adding that number to the header
        element.append(totalEle); // adding it to do dom
        totalBord = totalBord + totalCol; //sum the total of the bord
      }
      var totalEle = createTotalDisplay(totalBord, $('#ghx-board-name'), '-1'); //adding the total of the bord
      $('#ghx-board-name').append(totalEle);
    }

    function sumCol(colId) {
      var total = 0;
      $('.ghx-column[data-column-id=' + colId + ']').each(function () { // for each card in that column
        $(this).find('.aui-badge').each(function () {
          var storyPoint = this.textContent || this.innerText;
          if (isNumeric(storyPoint)) {
            total += parseFloat(this.innerText);
          }
        })
      });
      return total;
    }

    function buildColumns() {
      var columnsIds = [];
      $('.ghx-column').each(function () { // search for all the column id in the Board
        var dataId = $(this).data('column-id');
        if (columnsIds.indexOf(dataId) === -1 && dataId !== 'undefined') {
          columnsIds.push(dataId);
        }
      });
      return columnsIds;
    }

    //for counting all the points in the board
    function createTotalDisplay(value, parent, id) {
      var total;
      var element = parent.find('.aui-badge');
      if (element.length > 0) {
        total = $(element[0]);
      } else {
        total = $('<span/>').addClass('aui-badge').addClass('xBtn').css({'font-size':'14px','cursor': 'pointer'}).attr('id', id);
      }
      total.text(value.toFixed(1));
      return total;
    }

    // Util is Numeric
    function isNumeric(n) {
      return $.isNumeric(n);
    }

    //

    function hideColumns() {
      var columnsId = getColumnListToHide();
      for (var i = 0, len = columnsId.length; i < len; ++i) { // loop on column
        getJQColumn(columnsId[i]).hide();
      }
      clearInterval(hideColumnInterval);
    }

    function getJQColumn(id) {
      return $('[data-column-id="' + id + '"], [data-id="' + id + '"]')
    }

    function getColumnListToHide() {
      return window.localStorage.getItem('ColumnToHide') === null ? [] : window.localStorage.getItem('ColumnToHide').split(',');
    }

    function addColumnToHide(id) {
      var columnId = getColumnListToHide();
      columnId.push(id);
      window.localStorage.setItem('ColumnToHide', columnId.toString());
    }

    function clearHideColumn() {
      var columnsId = getColumnListToHide();
      for (var i = 0, len = columnsId.length; i < len; ++i) { // loop on column
        getJQColumn(columnsId[i]).show();
      }
    }

    function addHideControls() {
      // var columnsId = buildColumns(); // get a list of columns id
      // for (var i = 0, len = columnsId.length; i < len; ++i) { // loop on column
      //   var element = $('.ghx-column[data-id=' + columnsId[i] + ']'); //getting the column header
      //   var xButton = $('<span class="xBtn aui-badge" id="' + columnsId[i] + '"  style="border-radius: 50%; font-size: 8px">x</span>');
      //   element.append(xButton);
      // }
      $('.xBtn').on("click", function () {
        var id = $(this).attr('id');
        if(id === '-1') {
          clearHideColumn();
          window.localStorage.setItem('ColumnToHide', [].toString());
        } else {
          addColumnToHide(id);
          hideColumns();
        }
      });
      clearInterval(addHideControlsInterval);
    }

    calc();
    var calcInterval = setInterval(calc, 3000); // refresh the page each time
    var hideColumnInterval = setInterval(hideColumns, 3000); // refresh the page each time
    var addHideControlsInterval = setInterval(addHideControls, 3000); // refresh the page each time

    // first call
  });
})(window, $);
