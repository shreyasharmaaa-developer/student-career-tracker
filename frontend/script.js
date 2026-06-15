const API = "/api/students";

let students = [];
let pieChartInstance = null;
let barChartInstance = null;

async function init() {
    const res = await fetch(API);
    students = await res.json();

    if (students.length === 0) {
        await seedData();
    } else {
        displayStudents();
        updateDashboard();
        renderCharts();
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
    const name = document.getElementById("name").value.trim();
    const skill = document.getElementById("skill").value.trim();
    const status = document.getElementById("status").value;

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
    const studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    list.forEach(student => {
        const badge = student.status === "Placed"
            ? `<span style="color:#22c55e;font-weight:600;">✅ Placed</span>`
            : `<span style="color:#f97316;font-weight:600;">⏳ Not Placed</span>`;

        studentList.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.skill}</td>
            <td>${badge}</td>
            <td>
                <button onclick="editStudent('${student._id}')">Edit</button>
                <button onclick="deleteStudent('${student._id}')">Delete</button>
            </td>
        </tr>`;
    });

    updateDashboard();
}

async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    init();
}

async function editStudent(id) {
    const student = students.find(s => s._id === id);
    document.getElementById("name").value = student.name;
    document.getElementById("skill").value = student.skill;
    document.getElementById("status").value = student.status;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    init();
}

function searchStudent() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const filtered = students.filter(s => s.name.toLowerCase().includes(searchValue));
    displayStudents(filtered);
}

function updateDashboard() {
    const total = students.length;
    const placed = students.filter(s => s.status === "Placed").length;
    const notPlaced = total - placed;
    const percentage = total === 0 ? 0 : Math.round((placed / total) * 100);

    document.getElementById("totalStudents").innerText = total;
    document.getElementById("placedStudents").innerText = placed;
    document.getElementById("notPlacedStudents").innerText = notPlaced;
    document.getElementById("percentageCard").innerText = percentage + "%";
    document.getElementById("progress").style.width = percentage + "%";
    document.getElementById("percentage").innerText = percentage + "%";
}

function renderCharts() {
    const placed = students.filter(s => s.status === "Placed").length;
    const notPlaced = students.length - placed;

    // Pie Chart
    if (pieChartInstance) pieChartInstance.destroy();
    const pieCtx = document.getElementById("pieChart").getContext("2d");
    pieChartInstance = new Chart(pieCtx, {
        type: "doughnut",
        data: {
            labels: ["Placed", "Not Placed"],
            datasets: [{
                data: [placed, notPlaced],
                backgroundColor: ["#6c63ff", "#f97316"],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: { padding: 16, font: { family: "Inter", size: 12 } }
                }
            }
        }
    });

    // Bar Chart — top skills
    const skillMap = {};
    students.forEach(s => {
        skillMap[s.skill] = (skillMap[s.skill] || 0) + 1;
    });

    const sorted = Object.entries(skillMap).sort((a, b) => b[1] - a[1]).slice(0, 7);
    const labels = sorted.map(e => e[0]);
    const data = sorted.map(e => e[1]);

    if (barChartInstance) barChartInstance.destroy();
    const barCtx = document.getElementById("barChart").getContext("2d");
    barChartInstance = new Chart(barCtx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Students",
                data,
                backgroundColor: "#6c63ff",
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, font: { family: "Inter" } },
                    grid: { color: "rgba(0,0,0,0.05)" }
                },
                x: {
                    ticks: { font: { family: "Inter", size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });
}

document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});