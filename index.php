<html>
<head>
  <title>Taskit</title>
  <link rel="stylesheet" href="style.css" type="text/css" />
  <script src="taskit.js" type="text/javascript"></script>
  <script src="jquery.js" type="text/javascript"></script>
  <script src="jquery-ui.js" type="text/javascript"></script>
</head>

<body onload="taskit.onload();">
  <div id="main">
    <div id="titlebar">
    </div>
    <div id="content">
      <div id="project-column">
				<!--
        <div id="all-projects" class="project first">
          <span class="project-name">All</span>
        </div>
        
        <div class="project first current" onclick="taskit.loadTasks(0);">
          <span class="project-name">Salary</span>
        </div>
        <div class="project" onclick="taskit.loadTasks(1);">
          <span class="project-name">Rent apartment</span>
        </div>
        -->
      </div>
      <div id="tag-column">
        <div class="tag first">
          <span class="tag-name">@work</span>
        </div>
        <div class="tag">
          <span class="tag-name">@home</span>
        </div>
      </div>
      <div id="task-column">
				<input id="task-entry" type="text" />
				<div id="task-list">
				</div>
      </div>
    </div>
  </div>
</body>
</html>

