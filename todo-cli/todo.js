const todoList = () => {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const todayDate = new Date().getDate();
    return all.filter((item) => {
      const date = new Date(item.dueDate);
      return date.getDate() === todayDate - 1;
    });
  };

  const dueToday = () => {
    const todayDate = new Date().getDate();
    return all.filter((item) => {
      const date = new Date(item.dueDate);
      return date.getDate() === todayDate;
    });
  };

  const dueLater = () => {
    const todayDate = new Date().getDate();
    return all.filter((item) => {
      const date = new Date(item.dueDate);
      return date.getDate() === todayDate + 1;
    });
  };

  const toDisplayableList = (list) => {
    const todayDate = new Date().getDate();
    return list
      .map((item) => {
        const date = new Date(item.dueDate);
        const fd = date.toISOString().split("T")[0];
        const checkbox = item.completed ? "[x]" : "[ ]";
        const formattedDate =
          date.getDate() === todayDate ? '' : ` ${fd}`;
        return `${checkbox} ${item.title}${formattedDate}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

module.exports = todoList;
const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
