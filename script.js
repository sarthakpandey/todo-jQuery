$(() => {
  let inpNewTask = $("#inputTask");

  let tasks = [];
  if (localStorage.list) {
    tasks = JSON.parse(localStorage.list);
  }

  function refreshList() {
    localStorage.list = JSON.stringify(tasks);
    $("#taskList").empty();
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];

      $("#taskList").append(
        $("<li>")
          .attr("class", "list-inline-item shadow")
          .append(
            $("<div>")
              .attr("class", task.done === false ? "card" : "card done")
              .attr("style", "width: 18rem;")
              .append(
                $("<div>")
                  .attr("class", "card-body")
                  .append(
                    $("<h5>")
                      .attr("class", "card-title")
                      .text(task.name)
                  )
                  .append(
                    $("<button>")
                      .attr("type", "button")
                      .attr("class", "btn btn-outline-primary")
                      .text("<")
                      .click(function(eventObject) {
                        console.log(eventObject);
                        if (i < 1) {
                          return;
                        }

                        tasks.splice(i - 1, 0, tasks.splice(i, 1)[0]);
                        console.log(tasks);
                        refreshList();
                      })
                      .prop("disabled", i < 1 ? true : false)
                  )
                  .append(
                    $("<button>")
                      .attr("type", "button")
                      .attr("class", "btn btn-outline-primary mx-1")
                      .text(">")
                      .click(function(e) {
                        if (i + 1 > tasks.length) {
                          return;
                        }

                        tasks.splice(i + 1, 0, tasks.splice(i, 1)[0]);
                        refreshList();
                      })
                      .prop("disabled", i + 1 >= tasks.length ? true : false)
                  )
                  .append(
                    $("<button>")
                      .attr("type", "button")
                      .attr("class", "btn btn-outline-success mx-2 rounded")
                      .text(task.done ? "❌" : "✔️")
                      .click(function() {
                        task.done = !task.done;
                        refreshList();
                      })
                  )
                  .append(
                    $("<button>")
                      .attr("type", "button")
                      .attr("class", "btn btn-dark")
                      .text("Delete")
                      .click(function() {
                        tasks.splice(i, 1);
                        refreshList();
                      })
                  )
              )
          )
      );
    }
  }

  refreshList();

  function sortList() {
    tasks.sort(function(a, b) {
      return a.done - b.done;
    });
    refreshList();
  }

  function clearList() {
    tasks = tasks.filter(function(t) {
      return !t.done;
    });
    refreshList();
  }

  function addTask() {
    // console.log(tasks);

    let taskName = inpNewTask.val();

    if (taskName == "") {
      alert("Input can not be empty");
      return;
    }

    $("#addAlert").show();
    $("#sortAlert").hide();
    $("#clearAlert").hide();
    $("#resetAlert").hide();

    tasks.push({
      name: taskName,
      done: false
    });
    inpNewTask.val("");
    refreshList();
  }

  $("#add").click(function() {
    addTask();
  });

  $("#clear").click(() => {
    $("#addAlert").hide();
    $("#sortAlert").hide();
    $("#clearAlert").show();
    $("#resetAlert").hide();
    $("#taskList").empty();
    tasks = [];
    refreshList();
  });

  inpNewTask.keyup(function(ev) {
    if (ev.keyCode == 13) {
      addTask();
    }
  });

  $("#sort").click(function() {
    $("#addAlert").hide();
    $("#sortAlert").show();
    $("#clearAlert").hide();
    $("#resetAlert").hide();
    sortList();
  });

  $("#reset").click(function() {
    $("#addAlert").hide();
    $("#sortAlert").hide();
    $("#clearAlert").hide();
    $("#resetAlert").show();
    clearList();
  });
});
