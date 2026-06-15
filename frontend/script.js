const API = "http://localhost:5000/api/students";

let students = [];

async function init() {
    const res = await fetch(API);
    students = await res.json();
    
    if (students.length === 0) {
        await seedData();
    } else {
        displayStudents();
        updateDashboard();
    }
}

async function seedData() {
    const defaultStudents = [
        { name: "Rahul Sharma", skill: "Python", status: "Placed" },
        { name: "Priya Singh", skill: "Java", status: "Not Placed" },
        { name: "Amit Kumar", skill: "React", status: "Placed" },
        { name: "Shreya Sharma", skill: "Java Developer", status: "Placed" },
        { name: "Vikram Patel", skill: "Node.js", status: "Not Placed" },
        { name: "Anjali Mehta", skill: "Data Science", status: "Placed" },
        { name: "Rohit Verma", skill: "Machine Learning", status: "Not Placed" },
        { name: "Pooja Gupta", skill: "Web Development", status: "Placed" },
        { name: "Suresh Kumar", skill: "Android Dev", status: "Not Placed" },
        { name: "Neha Joshi", skill: "UI/UX Design", status: "Placed" },
        { name: "Arjun Singh", skill: "Python", status: "Placed" },
        { name: "Kavya Reddy", skill: "Flutter", status: "Not Placed" },
        { name: "Manish Yadav", skill: "Django", status: "Placed" },
        { name: "Riya Kapoor", skill: "React Native", status: "Placed" },
        { name: "Deepak Nair", skill: "DevOps", status: "Not Placed" },
        { name: "Simran Kaur", skill: "Data Analytics", status: "Placed" },
        { name: "Aakash Tiwari", skill: "Cybersecurity", status: "Not Placed" },
        { name: "Pallavi Desai", skill: "Cloud Computing", status: "Placed" },
        { name: "Nikhil Jain", skill: "Blockchain", status: "Not Placed" },
        { name: "Sneha Pillai", skill: "Java", status: "Placed" },
        { name: "Karan Malhotra", skill: "C++", status: "Placed" },
        { name: "Divya Saxena", skill: "PHP", status: "Not Placed" },
        { name: "Rahul Mishra", skill: "SQL", status: "Placed" },
        { name: "Ananya Bose", skill: "MongoDB", status: "Not Placed" },
        { name: "Vishal Thakur", skill: "Angular", status: "Placed" },
        { name: "Meera Iyer", skill: "Vue.js", status: "Placed" },
        { name: "Saurabh Pandey", skill: "TypeScript", status: "Not Placed" },
        { name: "Tanvi Kulkarni", skill: "AWS", status: "Placed" },
        { name: "Gaurav Shukla", skill: "Docker", status: "Not Placed" },
        { name: "Ishaan Bajaj", skill: "Kubernetes", status: "Placed" },
        { name: "Nidhi Rastogi", skill: "Figma", status: "Not Placed" },
        { name: "Abhishek Roy", skill: "React", status: "Placed" },
        { name: "Swati Dubey", skill: "Python", status: "Placed" },
        { name: "Lokesh Sinha", skill: "Node.js", status: "Not Placed" },
        { name: "Preeti Agarwal", skill: "Machine Learning", status: "Placed" },
        { name: "Varun Bhatt", skill: "Data Science", status: "Not Placed" },
        { name: "Chitra Menon", skill: "iOS Dev", status: "Placed" },
        { name: "Siddharth Sen", skill: "Android Dev", status: "Placed" },
        { name: "Kritika Arora", skill: "UI/UX Design", status: "Not Placed" },
        { name: "Pranav Goyal", skill: "DevOps", status: "Placed" },
        { name: "Yamini Tripathi", skill: "Cloud Computing", status: "Not Placed" },
        { name: "Harsh Vardhan", skill: "Cybersecurity", status: "Placed" },
        { name: "Ruchi Bansal", skill: "Blockchain", status: "Not Placed" },
        { name: "Tarun Mathur", skill: "Flutter", status: "Placed" },
        { name: "Sakshi Mittal", skill: "Django", status: "Placed" },
        { name: "Naveen Choudhary", skill: "PHP", status: "Not Placed" },
        { name: "Bhavna Srivastava", skill: "SQL", status: "Placed" },
        { name: "Aman Rawat", skill: "MongoDB", status: "Not Placed" },
        { name: "Deepika Negi", skill: "TypeScript", status: "Placed" },
        { name: "Rajesh Chauhan", skill: "AWS", status: "Placed" }
    ];

    for (const student of defaultStudents) {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });
    }

    init();
}

init();

async function addStudent() {

    const name =
    document.getElementById("name").value.trim();

    const skill =
    document.getElementById("skill").value.trim();

    const status =
    document.getElementById("status").value;

    if (!name || !skill) {
        alert("Please fill all fields");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, skill, status })
    });

    document.getElementById("name").value = "";
    document.getElementById("skill").value = "";

    init();
}

function displayStudents(list = students) {

    const studentList =
    document.getElementById("studentList");

    studentList.innerHTML = "";

    list.forEach(student => {

        studentList.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.skill}</td>
            <td>${student.status}</td>
            <td>
                <button onclick="editStudent('${student._id}')">
                    Edit
                </button>

                <button onclick="deleteStudent('${student._id}')">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    updateDashboard();
}

async function deleteStudent(id) {

    const confirmDelete =
    confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    init();
}

async function editStudent(id) {

    const student =
    students.find(s => s._id === id);

    document.getElementById("name").value =
    student.name;

    document.getElementById("skill").value =
    student.skill;

    document.getElementById("status").value =
    student.status;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    init();
}

function searchStudent() {

    const searchValue =
    document.getElementById("search")
    .value
    .toLowerCase();

    const filteredStudents =
    students.filter(student =>
        student.name
        .toLowerCase()
        .includes(searchValue)
    );

    displayStudents(filteredStudents);
}

function updateDashboard() {

    const total = students.length;

    const placed =
    students.filter(
        student => student.status === "Placed"
    ).length;

    const notPlaced =
    total - placed;

    document.getElementById(
        "totalStudents"
    ).innerText = total;

    document.getElementById(
        "placedStudents"
    ).innerText = placed;

    document.getElementById(
        "notPlacedStudents"
    ).innerText = notPlaced;

    const percentage =
    total === 0
    ? 0
    : Math.round((placed / total) * 100);

    document.getElementById(
        "progress"
    ).style.width =
    percentage + "%";

    document.getElementById(
        "percentage"
    ).innerText =
    percentage + "%";
}

document
.getElementById("darkModeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});