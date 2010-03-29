var taskit = function() {
  return {
    loadTasks: function(pid) {
      var data = {pid:pid};
      $.ajax({
        type: "GET",
        url: "load_tasks.php",
        data: data,
        success: function(data) {
          alert(data);
        }
      });
    },
    displayTasks: function(json) {
      alert(json);
    }
  }
}();

