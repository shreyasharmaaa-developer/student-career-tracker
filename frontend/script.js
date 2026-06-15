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
        populateSkillFilter();
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
    applyFilters();
}

function populateSkillFilter() {
    const skills = [...new Set(students.map(s => s.skill))].sort();
    const filterSkill = document.getElementById("filterSkill");
    filterSkill.innerHTML = `<option value="All">All Skills</option>`;
    skills.forEach(skill => {
        filterSkill.innerHTML += `<option value="${skill}">${skill}</option>`;
    });
}

function applyFilters() {
    const statusVal = document.getElementById("filterStatus").value;
    const skillVal = document.getElementById("filterSkill").value;
    const sortVal = document.getElementById("sortBy").value;
    const searchVal = document.getElementById("search").value.toLowerCase();

    let filtered = [...students];

    if (searchVal) filtered = filtered.filter(s => s.name.toLowerCase().includes(searchVal));
    if (statusVal !== "All") filtered = filtered.filter(s => s.status === statusVal);
    if (skillVal !== "All") filtered = filtered.filter(s => s.skill === skillVal);

    if (sortVal === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortVal === "name-desc") filtered.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortVal === "placed-first") filtered.sort((a, b) => a.status === "Placed" ? -1 : 1);
    else if (sortVal === "not-placed-first") filtered.sort((a, b) => a.status === "Not Placed" ? -1 : 1);

    displayStudents(filtered);
}

function resetFilters() {
    document.getElementById("filterStatus").value = "All";
    document.getElementById("filterSkill").value = "All";
    document.getElementById("sortBy").value = "default";
    document.getElementById("search").value = "";
    displayStudents(students);
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

    document.getElementById("s-total").innerText = total;
    document.getElementById("s-placed").innerText = placed;
    document.getElementById("s-notplaced").innerText = notPlaced;
    document.getElementById("s-rate").innerText = percentage + "%";
}

function renderCharts() {
    const placed = students.filter(s => s.status === "Placed").length;
    const notPlaced = students.length - placed;

    if (pieChartInstance) pieChartInstance.destroy();
    const pieCtx = document.getElementById("pieChart").getContext("2d");
    pieChartInstance = new Chart(pieCtx, {
        type: "doughnut",
        data: {
            labels: ["Placed", "Not Placed"],
            datasets: [{ data: [placed, notPlaced], backgroundColor: ["#6c63ff", "#f97316"], borderWidth: 0, hoverOffset: 8 }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom", labels: { padding: 16, font: { family: "Inter", size: 12 } } } }
        }
    });

    const skillMap = {};
    students.forEach(s => { skillMap[s.skill] = (skillMap[s.skill] || 0) + 1; });
    const sorted = Object.entries(skillMap).sort((a, b) => b[1] - a[1]).slice(0, 7);

    if (barChartInstance) barChartInstance.destroy();
    const barCtx = document.getElementById("barChart").getContext("2d");
    barChartInstance = new Chart(barCtx, {
        type: "bar",
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{ label: "Students", data: sorted.map(e => e[1]), backgroundColor: "#6c63ff", borderRadius: 8, borderSkipped: false }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: "Inter" } }, grid: { color: "rgba(0,0,0,0.05)" } },
                x: { ticks: { font: { family: "Inter", size: 11 } }, grid: { display: false } }
            }
        }
    });
}

// ✅ Export to Excel
function exportExcel() {
    const data = students.map((s, i) => ({
        "S.No": i + 1,
        "Name": s.name,
        "Skill": s.skill,
        "Status": s.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "student-career-tracker.xlsx");
}

// ✅ Export to PDF
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setTextColor(108, 99, 255);
    doc.text("Student Career Tracker", 14, 18);

    doc.setFontSize(10);
    doc.setTextColor(100);
    const total = students.length;
    const placed = students.filter(s => s.status === "Placed").length;
    doc.text(`Total: ${total}  |  Placed: ${placed}  |  Not Placed: ${total - placed}  |  Rate: ${Math.round((placed/total)*100)}%`, 14, 26);

    doc.autoTable({
        startY: 32,
        head: [["S.No", "Name", "Skill", "Status"]],
        body: students.map((s, i) => [i + 1, s.name, s.skill, s.status]),
        styles: { font: "helvetica", fontSize: 10 },
        headStyles: { fillColor: [108, 99, 255], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 245, 255] },
        columnStyles: {
            3: { fontStyle: "bold", textColor: (row) => row.raw === "Placed" ? [34, 197, 94] : [249, 115, 22] }
        }
    });

    doc.save("student-career-tracker.pdf");
}

document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});