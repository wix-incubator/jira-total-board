'use strict';
(function (window, $, undefined) {
  // on dom ready
  $(document).ready(function () {
    function addTargetBlank(){
      $('#description-val').find('a').attr('target','_blank');
      $('.ghx-detail-description').find('a').attr('target','_blank');
      $('.ghx-comment').find('a').attr('target','_blank');
    }
    setInterval(addTargetBlank, 3000); // refresh the page each time
    addTargetBlank(); // first call

    // https://clipboardjs.com/
    function addClipboardAction() {
      new Clipboard('.ghx-issue', {
        text: function(trigger) {
          return 'https://jira.wixpress.com/browse/'+ trigger.getAttribute('data-issue-key');
        }
      });
    }
    addClipboardAction()
});
})(window, $);
