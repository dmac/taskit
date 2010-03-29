/*
 * TODO:
 * allow adding and removing of projects
 * 
 */


var taskit = function() {
  return {
		onload: function() {
			taskit.loadProjects();
			document.onkeydown = taskit.keyListener;
			
			// Set task-entry focus and blur behaviors
			$("input#task-entry").focus(function() {
				$("input#task-entry").addClass("focused");
			});
			$("input#task-entry").blur(function() {
				$("input#task-entry").val("");
				$("input#task-entry").removeClass("focused");
			});
		},
		
		loadProjects: function() {
      $.ajax({
				type: "GET",
				url: "load_projects.php",
				success: taskit.displayProjects
			});
    },
    
    loadTasks: function(pid) {
      var data = {pid:pid};
      $.ajax({
        type: "GET",
        url: "load_tasks.php",
        data: data,
        success: taskit.displayTasks
      });
    },
        
    addTask: function(pid, text, due) {
			var data = {pid:pid, text:text, due:due};
			$.ajax({
				type: "GET",
				url: "add_task.php",
				data: data,
				success: function() {taskit.loadTasks(pid);}
			});
		},
		
    displayTasks: function(data) {
      var tasks = $.parseJSON(data);
      var html = "";
      for (i in tasks) {
        var task = tasks[i];
        var date = new Date(tasks[i].due);
        if (taskit.isValidDate(date)) {
					date = $.datepicker.formatDate('M dd', date);
				} else {
					date = "";
				}
        html += taskit.getTaskHTML(task.text, date, i);
      }
      $('div#task-list').html(html);
    },
    
    displayProjects: function(data) {
      var projects = $.parseJSON(data);
      var html = "";
      for (i in projects) {
        var project = projects[i];
        html += taskit.getProjectHTML(project.pid, project.name, i);
      }
      $('div#project-column').html(html);
      
      // Set project selection behavior
			$("div.project").click(function() {
				$("div.project.current").removeClass("current");
				$(this).addClass("current");
			});
			$("div.project:first").addClass("current");
			taskit.loadTasks(taskit.getCurrentProjectID());
    },
    
    getTaskHTML: function(text, date, i) {
			var html = "<div class=\"task";
			if (i == 0) html += " first";
			html += "\">";
      html += "<input type=\"checkbox\" />";
      html += "<span class=\"task-description\">"+text+"</span>";
      html += "<span class=\"task-due\">"+date+"</span>";
      html += "</div>";
      return html;
		},
		
		getProjectHTML: function(pid, name, i) {
			var html = "<div id=\"project"+pid+"\" class=\"project";
			if (i == 0) html += " first";
			html += "\" onclick=\"taskit.loadTasks("+pid+");\">";
      html += "<span class=\"project-name\">"+name+"</span>";
      html += "</div>";
      return html;
		},
		
		getCurrentProjectID: function() {
		  var pattern = /project(\d)/;
			var projects = $("div.project");
			for (i in projects) {
				if (isNaN(i)) {
					continue; //error, went too far w/o finding current project
				}
				if ($(projects[i]).hasClass("current")) {
				  return $(projects[i]).attr("id").match(pattern)[1];
				}
			}
			return -1;
		},
    
    keyListener: function(e) {
			// Enter task entry mode
			if (e.keyCode == 84 && !$("input#task-entry").hasClass("focused")) {
				$("input#task-entry").focus();
				return false;
			}
			// Exit task entry mode
			if (e.keyCode == 27) {
				$("input#task-entry").blur();
			}
			// Enter task
			if (e.keyCode == 13 && $("input#task-entry").hasClass("focused")) {
				var pid = taskit.getCurrentProjectID();
				var text = $("input#task-entry").val();
				var due = null;
				var html = taskit.getTaskHTML(text, due);
				$("input#task-entry").val("");
				taskit.addTask(pid, text, due);
			}
		},
		
		isValidDate: function(date) {
			return (date != "Invalid Date");
		}
  }
}();
