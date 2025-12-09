class SteadzysWheel {
    constructor() {
        this.choices = ['Arran', 'Jaiden', 'Colin', 'Lucas', 'Max', 'Anton'];
        this.weights = [1, 1, 1, 1, 1, 1];
        this.wins = {
            'Arran': 0,
            'Jaiden': 0,
            'Colin': 0,
            'Lucas': 0,
            'Max': 0,
            'Anton': 0
        };
        this.lastWinner = '';
        this.totalSpins = 0;
        this.settings = {
            confettiEnabled: true,
            spinDuration: 5
        };
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
        this.isSpinning = false;
        this.currentRotation = 0;
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    addChoice(name, weight) {
        if (!name || weight <= 0) {
            alert('Please enter a valid choice name and weight!');
            return;
        }

        this.choices.push(name);
        this.weights.push(parseFloat(weight));
        this.wins[name] = 0;
        
        alert(`Choice '${name}' added successfully!`);
    }

    drawWheel(canvas, rotation = 0) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const totalWeight = this.weights.reduce((sum, weight) => sum + weight, 0);
        
        // Start at the top (pointing up) where the pointer is
        // We start drawing at -PI/2 (top) and go clockwise
        let currentAngle = -Math.PI / 2 + rotation;

        this.choices.forEach((choice, i) => {
            const sliceAngle = (this.weights[i] / totalWeight) * 2 * Math.PI;
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = this.colors[i % this.colors.length];
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(currentAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px Arial';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText(choice, radius - 20, 5);
            ctx.restore();

            currentAngle += sliceAngle;
        });

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    spin() {
        if (this.choices.length === 0) {
            alert('⚠️ Error: No choices available to spin!');
            return;
        }

        if (this.isSpinning) {
            return;
        }

        this.isSpinning = true;

        // First, determine how much to spin (just random with extra rotations)
        const extraRotations = 5 + Math.random() * 3;
        const randomSpin = Math.random() * 2 * Math.PI;
        const finalRotation = this.currentRotation + (extraRotations * 2 * Math.PI) + randomSpin;

        // Now calculate which slice will be at the top when we stop
        // Normalize the final rotation
        const normalizedRotation = finalRotation % (2 * Math.PI);
        
        // The pointer is at -PI/2, so we need to find which slice is at that position
        // When rotation = normalizedRotation, slices start at -PI/2 + normalizedRotation
        // We want to find which slice contains the angle -PI/2
        // That means we need to find which slice contains angle: -PI/2 - normalizedRotation
        
        let pointerAngle = -normalizedRotation;
        // Normalize to 0 to 2PI
        while (pointerAngle < 0) pointerAngle += 2 * Math.PI;
        while (pointerAngle >= 2 * Math.PI) pointerAngle -= 2 * Math.PI;
        
        // Find which slice this angle falls into
        const totalWeight = this.weights.reduce((sum, weight) => sum + weight, 0);
        let currentAngle = 0;
        let selectedIndex = 0;
        
        for (let i = 0; i < this.choices.length; i++) {
            const sliceAngle = (this.weights[i] / totalWeight) * 2 * Math.PI;
            if (pointerAngle >= currentAngle && pointerAngle < currentAngle + sliceAngle) {
                selectedIndex = i;
                break;
            }
            currentAngle += sliceAngle;
        }

        this.animateSpin(finalRotation, selectedIndex);
    }

    animateSpin(finalRotation, selectedIndex) {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="wheel-container">
                <h2 style="color: #00ffff; text-align: center; margin-bottom: 20px;">🎡 SPINNING THE WHEEL 🎡</h2>
                <div class="wheel-wrapper">
                    <div class="wheel-pointer"></div>
                    <div class="wheel-canvas-wrapper">
                        <canvas id="wheelCanvas" width="400" height="400"></canvas>
                    </div>
                </div>
                <button class="spin-button" disabled>SPINNING...</button>
            </div>
        `;

        const canvas = document.getElementById('wheelCanvas');
        const startRotation = this.currentRotation;
        const duration = this.settings.spinDuration * 1000;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease out cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentRotation = startRotation + (finalRotation - startRotation) * easeProgress;
            this.drawWheel(canvas, currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.currentRotation = finalRotation % (2 * Math.PI);
                setTimeout(() => this.showResult(selectedIndex), 500);
            }
        };

        this.drawWheel(canvas, startRotation);
        animate();
    }

    showResult(selectedIndex) {
        const winner = this.choices[selectedIndex];
        this.lastWinner = winner;
        this.wins[winner]++;
        this.totalSpins++;
        this.isSpinning = false;
        
        const totalWeight = this.weights.reduce((sum, weight) => sum + weight, 0);
        const probability = ((this.weights[selectedIndex] / totalWeight) * 100).toFixed(2);

        if (this.settings.confettiEnabled) {
            this.showConfetti();
        }

        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="result-display">
                <h2>🏆 THE WINNER IS:</h2>
                <div style="font-size: 2.5em; margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                    ${winner}
                </div>
                <p>Total Wins: ${this.wins[winner]} (${((this.wins[winner] / this.totalSpins) * 100).toFixed(1)}% of all spins)</p>
                <p style="color: #4ecdc4; margin-top: 15px;">Total Spins This Session: ${this.totalSpins}</p>
            </div>
            <button class="btn btn-primary" onclick="location.reload()">Return to Menu</button>
            <button class="btn btn-success" onclick="spinWheel()">Spin Again</button>
        `;
    }

    viewStats() {
        const contentArea = document.getElementById('content-area');
        
        const sortedWins = Object.entries(this.wins).sort((a, b) => b[1] - a[1]);

        let statsHTML = `
            <div class="chart-container">
                <h2 style="text-align: center; color: #00ffff; margin-bottom: 20px;">📊 WIN STATISTICS 📊</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${this.totalSpins}</div>
                        <div class="stat-label">Total Spins</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${sortedWins[0] ? sortedWins[0][0] : 'N/A'}</div>
                        <div class="stat-label">Most Wins</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${sortedWins[0] ? sortedWins[0][1] : 0}</div>
                        <div class="stat-label">Win Count</div>
                    </div>
                </div>
                <table class="choices-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Choice</th>
                            <th>Wins</th>
                            <th>Win Rate</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        sortedWins.forEach(([choice, wins], i) => {
            const winRate = this.totalSpins > 0 ? ((wins / this.totalSpins) * 100).toFixed(1) : '0.0';
            const isLastWinner = choice === this.lastWinner;
            const progressWidth = this.totalSpins > 0 ? (wins / this.totalSpins) * 100 : 0;
            
            statsHTML += `
                <tr ${isLastWinner ? 'class="last-winner"' : ''}>
                    <td>${i + 1}</td>
                    <td>${choice}</td>
                    <td>${wins}</td>
                    <td>${winRate}%</td>
                    <td>
                        <div style="background: rgba(0,0,0,0.3); border-radius: 5px; height: 20px; overflow: hidden;">
                            <div style="background: ${this.colors[i % this.colors.length]}; height: 100%; width: ${progressWidth}%; transition: width 0.3s;"></div>
                        </div>
                    </td>
                </tr>
            `;
        });

        statsHTML += `
                    </tbody>
                </table>
                <button class="btn btn-primary" onclick="location.reload()">Return to Menu</button>
            </div>
        `;

        contentArea.innerHTML = statsHTML;
    }

    displayChoices() {
        if (this.choices.length === 0) {
            alert('No choices available!');
            return;
        }

        const totalWeight = this.weights.reduce((sum, weight) => sum + weight, 0);
        
        let tableHTML = `
            <div class="chart-container">
                <h2 style="text-align: center; color: #00ffff; margin-bottom: 20px;">📋 ALL CHOICES 📋</h2>
                <table class="choices-table">
                    <thead>
                        <tr>
                            <th>Choice</th>
                            <th>Weight</th>
                            <th>Probability</th>
                            <th>Wins</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.choices.forEach((choice, idx) => {
            const probability = ((this.weights[idx] / totalWeight) * 100).toFixed(2);
            const isLastWinner = choice === this.lastWinner;
            
            tableHTML += `
                <tr ${isLastWinner ? 'class="last-winner"' : ''}>
                    <td>${choice}</td>
                    <td>${this.weights[idx]}</td>
                    <td>${probability}%</td>
                    <td>${this.wins[choice]}</td>
                </tr>
            `;
        });

        tableHTML += `
                    </tbody>
                </table>
                <button class="btn btn-primary" onclick="location.reload()">Return to Menu</button>
            </div>
        `;

        document.getElementById('content-area').innerHTML = tableHTML;
    }

    showChart() {
        if (this.choices.length === 0) {
            alert('No choices available!');
            return;
        }

        const totalWeight = this.weights.reduce((sum, weight) => sum + weight, 0);
        
        let chartHTML = `
            <div class="chart-container">
                <h2 style="text-align: center; color: #ff6b6b; margin-bottom: 20px;">📊 PROBABILITY CHART 📊</h2>
        `;

        this.choices.forEach((choice, i) => {
            const probability = (this.weights[i] / totalWeight) * 100;
            const color = this.colors[i % this.colors.length];
            
            chartHTML += `
                <div class="chart-bar">
                    <div class="chart-label">${choice}</div>
                    <div class="chart-bar-fill" style="background: ${color}; width: ${Math.max(10, probability)}%;">
                        ${probability.toFixed(1)}%
                    </div>
                </div>
            `;
        });

        chartHTML += `
                <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 20px;">Return to Menu</button>
            </div>
        `;

        document.getElementById('content-area').innerHTML = chartHTML;
    }

    showConfetti() {
        const confettiContainer = document.getElementById('confetti');
        confettiContainer.innerHTML = '';

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = Math.random() * 100 + 'vw';
                piece.style.background = this.getRandomColor();
                piece.style.animationDelay = Math.random() * 3 + 's';
                piece.style.animationDuration = (Math.random() * 2 + 1) + 's';
                confettiContainer.appendChild(piece);

                setTimeout(() => {
                    piece.remove();
                }, 4000);
            }, i * 50);
        }
    }

    resetWins() {
        if (confirm('Are you sure you want to reset all win counts? This cannot be undone.')) {
            Object.keys(this.wins).forEach(key => {
                this.wins[key] = 0;
            });
            this.totalSpins = 0;
            this.lastWinner = '';
            alert('All win counts have been reset!');
        }
    }

    exportData() {
        return JSON.stringify({
            choices: this.choices,
            weights: this.weights,
            wins: this.wins,
            totalSpins: this.totalSpins,
            lastWinner: this.lastWinner
        }, null, 2);
    }

    importDataFromString(dataString) {
        try {
            const data = JSON.parse(dataString);
            this.choices = data.choices || this.choices;
            this.weights = data.weights || this.weights;
            this.wins = data.wins || this.wins;
            this.totalSpins = data.totalSpins || 0;
            this.lastWinner = data.lastWinner || '';
            alert('Data imported successfully!');
        } catch (e) {
            alert('Error importing data: ' + e.message);
        }
    }
}

const wheel = new SteadzysWheel();

function showAddChoiceModal() {
    document.getElementById('addChoiceModal').style.display = 'flex';
}

function showExportImport() {
    document.getElementById('exportData').value = wheel.exportData();
    document.getElementById('exportImportModal').style.display = 'flex';
}

function copyExportData() {
    const exportText = document.getElementById('exportData');
    exportText.select();
    document.execCommand('copy');
    alert('Data copied to clipboard!');
}

function importData() {
    const importText = document.getElementById('importData').value;
    if (importText.trim()) {
        wheel.importDataFromString(importText);
        closeModal('exportImportModal');
    } else {
        alert('Please paste data to import!');
    }
}

function showSettings() {
    document.getElementById('confettiEnabled').checked = wheel.settings.confettiEnabled;
    document.getElementById('spinDuration').value = wheel.settings.spinDuration;
    document.getElementById('spinDurationValue').textContent = wheel.settings.spinDuration + 's';
    
    document.getElementById('settingsModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function addChoice() {
    const name = document.getElementById('choiceName').value.trim();
    const weight = parseFloat(document.getElementById('choiceWeight').value);
    
    if (name && weight > 0) {
        wheel.addChoice(name, weight);
        document.getElementById('choiceName').value = '';
        document.getElementById('choiceWeight').value = '1';
        closeModal('addChoiceModal');
    } else {
        alert('Please enter a valid choice name and weight!');
    }
}

function saveSettings() {
    wheel.settings.confettiEnabled = document.getElementById('confettiEnabled').checked;
    wheel.settings.spinDuration = parseFloat(document.getElementById('spinDuration').value);
    
    closeModal('settingsModal');
    alert('Settings saved successfully!');
}

function spinWheel() {
    wheel.spin();
}

function viewStats() {
    wheel.viewStats();
}

function displayChoices() {
    wheel.displayChoices();
}

function showChart() {
    wheel.showChart();
}

function resetWins() {
    wheel.resetWins();
}

document.addEventListener('DOMContentLoaded', function() {
    const spinDurationSlider = document.getElementById('spinDuration');
    
    if (spinDurationSlider) {
        spinDurationSlider.addEventListener('input', function() {
            document.getElementById('spinDurationValue').textContent = this.value + 's';
        });
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const activeModal = document.querySelector('.modal[style*="flex"]');
        if (activeModal && activeModal.id === 'addChoiceModal') {
            addChoice();
        }
    }
});