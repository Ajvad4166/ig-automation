// Data storage (in a real app, this would be on a server)
let reels = [];
let templates = [];
let automationSettings = {
    followMessage: "Please follow me to continue!",
    delay: 5,
    maxRetries: 3
};
let stats = {
    totalReels: 0,
    messagesSent: 0,
    followsGained: 0
};

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.id.replace('-btn', '')).classList.add('active');
    });
});

// Reels Management
document.getElementById('reel-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.getElementById('reel-url').value;
    const message = document.getElementById('custom-message').value;
    reels.push({ url, message, status: 'pending' });
    updateReelsList();
    updateStats();
    document.getElementById('reel-form').reset();
});

function updateReelsList() {
    const list = document.getElementById('reels-list');
    list.innerHTML = '';
    reels.forEach((reel, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Reel ${index + 1}:</strong> ${reel.url}<br>
            <strong>Message:</strong> ${reel.message}<br>
            <strong>Status:</strong> ${reel.status}
            <button onclick="removeReel(${index})">Remove</button>
        `;
        list.appendChild(li);
    });
}

function removeReel(index) {
    reels.splice(index, 1);
    updateReelsList();
    updateStats();
}

// Message Templates
document.getElementById('template-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('template-name').value;
    const content = document.getElementById('template-content').value;
    templates.push({ name, content });
    updateTemplatesList();
    document.getElementById('template-form').reset();
});

function updateTemplatesList() {
    const list = document.getElementById('templates-list');
    list.innerHTML = '';
    templates.forEach((template, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${template.name}:</strong> ${template.content}
            <button onclick="removeTemplate(${index})">Remove</button>
        `;
        list.appendChild(li);
    });
}

function removeTemplate(index) {
    templates.splice(index, 1);
    updateTemplatesList();
}

// Automation Settings
document.getElementById('automation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    automationSettings.followMessage = document.getElementById('follow-message').value;
    automationSettings.delay = parseInt(document.getElementById('delay').value);
    automationSettings.maxRetries = parseInt(document.getElementById('max-retries').value);
    alert('Settings saved!');
});

// Automation Logic
document.getElementById('start-automation').addEventListener('click', () => {
    const log = document.getElementById('automation-log');
    log.innerHTML = '<p>Starting automation...</p>';
    
    reels.forEach((reel, index) => {
        setTimeout(() => {
            log.innerHTML += `<p>Processing reel ${index + 1}: ${reel.url}</p>`;
            // Simulate sending follow message
            log.innerHTML += `<p>Sending follow message: "${automationSettings.followMessage}"</p>`;
            stats.messagesSent++;
            
            // Simulate checking if followed (random for demo)
            const followed = Math.random() > 0.5;
            if (followed) {
                log.innerHTML += `<p>User followed! Sending custom message: "${reel.message}"</p>`;
                stats.messagesSent++;
                stats.followsGained++;
                reel.status = 'completed';
            } else {
                log.innerHTML += `<p>User did not follow. Retrying...</p>`;
                // Simulate retries
                for (let i = 1; i <= automationSettings.maxRetries; i++) {
                    setTimeout(() => {
                        log.innerHTML += `<p>Retry ${i}: Sending follow message again.</p>`;
                        stats.messagesSent++;
                        if (Math.random() > 0.5) {
                            log.innerHTML += `<p>User followed on retry ${i}! Sending custom message.</p>`;
                            stats.messagesSent++;
                            stats.followsGained++;
                            reel.status = 'completed';
                            return;
                        }
                    }, i * automationSettings.delay * 1000);
                }
                reel.status = 'failed';
            }
            updateReelsList();
            updateStats();
        }, index * automationSettings.delay * 1000);
    });
});

// Stats Update
function updateStats() {
    stats.totalReels = reels.length;
    document.getElementById('total-reels').textContent = stats.totalReels;
    document.getElementById('messages-sent').textContent = stats.messagesSent;
    document.getElementById('follows-gained').textContent = stats.followsGained;
}

// Analytics (simple chart using Canvas)
function drawChart() {
    const canvas = document.getElementById('analytics-chart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Simple bar chart
    const data = [stats.totalReels, stats.messagesSent, stats.followsGained];
    const labels = ['Total Reels', 'Messages Sent', 'Follows Gained'];
    const colors = ['#e4405f', '#f77737', '#fcaf45'];
    
    const barWidth = 50;
    const barSpacing = 20;
    const startX = 50;
    const startY = canvas.height - 50;
    
    data.forEach((value, index) => {
        const x = startX + index * (barWidth + barSpacing);
        const height = (value / Math.max(...data)) * (canvas.height - 100);
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, startY - height, barWidth, height);
        ctx.fillStyle = '#333';
        ctx.fillText(labels[index], x, startY + 20);
        ctx.fillText(value.toString(), x, startY - height - 10);
    });
}

document.getElementById('analytics-btn').addEventListener('click', drawChart);

// Initialize
updateStats();
