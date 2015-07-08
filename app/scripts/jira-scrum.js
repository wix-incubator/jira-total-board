'use strict';
(function (window, $, undefined) {
  // on dom ready
  $(document).ready(function () {

    function calc() {
      var totalBord = 0;
      var columnsId = buildColumns(); // get a list of columns id
      for (var i = 0, len = columnsId.length; i < len; ++i) { // loop on column
        var totalCol = sumCol(columnsId[i]); //run on all the curd in the column
        var element = $('.ghx-column[data-id=' + columnsId[i] + ']'); //getting the column header
        var totalEle = createTotalDisplay(totalCol, element); // adding that number to the header
        element.append(totalEle); // adding it to do dom
        totalBord = totalBord + totalCol; //sum the total of the bord
      }
      var totalEle = createTotalDisplay(totalBord, $('#ghx-board-name')); //adding the total of the bord
      $('#ghx-board-name').append(totalEle);
    }

    function sumCol(colId) {
      var total = 0
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
      $('.ghx-column').each(function () { // search for all the column id in the bord
        var dataId = $(this).data('column-id');
        if (columnsIds.indexOf(dataId) === -1 && dataId !== 'undefined') {
          columnsIds.push(dataId);
        }
      });
      return columnsIds;
    }

    // for counting all the points in the board
    function createTotalDisplay(value, parent) {
      var total;
      var element = parent.find('.aui-badge');
      if (element.length > 0) {
        total = $(element[0]);
      } else {
        total = $('<span/>').addClass('aui-badge').css('font-size', '14px');
      }
      total.text(value.toFixed(1));
      return total;
    }

    // Util is Numeric
    function isNumeric(n) {
      return $.isNumeric(n);
    }

    setInterval(calc, 3000); // refresh the page each time
    calc(); // first call
  });
})(window, $);
