const courses = [
    { name: "CSE 110", type: "CSE", completed: true },
    { name: "CSE 111", type: "CSE", completed: false },
    { name: "CSE 210", type: "CSE", completed: false },
    { name: "WDD 130", type: "WDD", completed: true },
    { name: "WDD 131", type: "WDD", completed: false },
    { name: "WDD 231", type: "WDD", completed: true },
];

function renderCourses(filter) {
    const container = document.getElementById("course-container");
    container.innerHTML = "";

    const filteredCourses = filter === "all" ? courses : courses.filter(course => course.type === filter);

    filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.textContent = course.name;
        div.className = course.completed ? "completed" : "incomplete";
        container.appendChild(div);
    });
}

document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => renderCourses(button.dataset.filter));
});

renderCourses("all");
