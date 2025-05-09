// Array of course objects (as provided in the requirements)
const courses = [
    {
        code: "CSE 110",
        name: "Introduction to Programming",
        description: "Learn the basic building blocks of programming using Python. Gain skills in debugging, user input, basic functions, IF statements, and loops.",
        college: "CSE",
        completed: true,  // Change to true if you've completed this course
        credits: 3
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        description: "Learn programming skills such as variable scope, user-defined functions, exception handling, modules, lists, and dictionaries in Python.",
        college: "CSE",
        completed: true,  // Change to true if you've completed this course
        credits: 3
    },
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        description: "Learn how to build websites from scratch using HTML and CSS. Gain a thorough understanding of how websites are designed and created.",
        college: "WDD",
        completed: true,  // Change to true if you've completed this course
        credits: 3
    },
    {
        code: "WDD 131",
        name: "Web Design Foundations",
        description: "Learn the principles of effective design: proximity, alignment, repetition, and contrast. Use tools like Adobe Photoshop to create visually appealing websites.",
        college: "WDD",
        completed: true,  // Change to true if you've completed this course
        credits: 3
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        description: "Apply object-oriented programming in creating console applications. Learn concepts like classes, properties, methods, and inheritance.",
        college: "CSE",
        completed: false,  // Change to true if you've completed this course
        credits: 3
    },
    {
        code: "WDD 231",
        name: "Advanced CSS and JavaScript",
        description: "Gain an in-depth understanding of advanced CSS and JavaScript to create more complex and interactive websites.",
        college: "WDD",
        completed: false,  // Change to true if you've completed this course
        credits: 3
    }
];

// Function to display courses based on filter
function displayCourses(filter = 'all') {
    const courseContainer = document.getElementById('courseContainer');
    const totalCreditsElement = document.getElementById('totalCredits');
    
    if (!courseContainer || !totalCreditsElement) return;
    
    // Filter courses based on selection
    let filteredCourses;
    if (filter === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.college === filter);
    }
    
    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
    
    // Clear the container
    courseContainer.innerHTML = '';
    
    // Display filtered courses
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = course.completed ? 'course-card completed' : 'course-card';
        courseCard.textContent = course.code;
        courseContainer.appendChild(courseCard);
    });
}

// Add event listeners to filter buttons
document.addEventListener('DOMContentLoaded', function() {
    // Initial display of all courses
    displayCourses();
    
    // Get filter buttons
    const allBtn = document.getElementById('allBtn');
    const cseBtn = document.getElementById('cseBtn');
    const wddBtn = document.getElementById('wddBtn');
    
    // Add click event listeners
    if (allBtn) {
        allBtn.addEventListener('click', function() {
            setActiveButton(this);
            displayCourses('all');
        });
    }
    
    if (cseBtn) {
        cseBtn.addEventListener('click', function() {
            setActiveButton(this);
            displayCourses('CSE');
        });
    }
    
    if (wddBtn) {
        wddBtn.addEventListener('click', function() {
            setActiveButton(this);
            displayCourses('WDD');
        });
    }
});

// Set active class on the clicked button
function setActiveButton(button) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}