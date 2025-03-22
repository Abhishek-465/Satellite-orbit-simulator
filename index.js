const G = 6.67430e-11;  // Gravitational constant in m³/kg/s²
const M = 5.972e24;     // Earth's mass in kg
const earthRadius = 6371e3;  // Earth's radius in meters

let angle = 0;  // Initial angle for satellite
let angle1 = 0; // Initial angle for moon
let animationFrame;
let moonFrame;

// Calculate Moon's orbital radius outside `startOrbit`
let newSize1 = Math.min(300, (384400 / 10) + 100); // Limit max orbit size
let moonRadius = newSize1 / 2; 

function startOrbit() {
    let altitude = parseFloat(document.getElementById("in1").value);

    if (isNaN(altitude) || altitude <= 0) {
        alert("🚀 Whoops! Enter a valid altitude in km, unless you plan to dig to the Earth's core! 🌍😂");
        return;
    }
    if (altitude == 384400) {
        alert("🌕 Bruh, are you trying to high-five the Moon or crash into it? 🚀💥😂");
        return;
    }
    if (altitude > 384400) {
        alert("🛸 Whoa! You're about to enter intergalactic hide and seek mode! Don't get lost in deep space! 🌌😂");
        return;
    }
    let location = altitude < 160 ? "🌍 Too low! You might scrape the atmosphere! 😨" :
            altitude <= 2000 ? "🚀 LEO: Welcome to Low Earth Orbit! 🛰️" :
            altitude < 35786 ? "🛰️ MEO: You're cruising in Medium Earth Orbit! 🌍" :
            altitude === 35786 ? "📡 GEO: Stationary like a TV satellite! 🛰️" :
            "🌌 Too far! You are at Cislunar space 🚀👽";


    
    let a = (earthRadius + altitude * 1000); 
    let a1 = (earthRadius + 384400 * 1000); // Convert km to meters
    let T_seconds = 2 * Math.PI * Math.sqrt((a ** 3) / (G * M));
    let M_seconds = 2 * Math.PI * Math.sqrt((a1 ** 3) / (G * M));
    let T_hours = T_seconds / 3600;

    const escapev= Math.sqrt(2*G*M/a) *3.6; //in km/hr

    const gravity= G*M/(a*a); // in m/s^2

    const velocity= (2* Math.PI * a)/(1000*T_hours); // orbital velocity in km/hr

    const latency= (2* altitude *1000*1000)/ 3e8; //signal latency

    let radiationExposure;

    if (altitude < 160) {
        radiationExposure = "🌍 Too low! You’re inside Earth's atmosphere.";
    } else if (altitude <= 2000) {
        radiationExposure = "🛡️ LEO: Low radiation (~0.1-1 mSv/day)";
    } else if (altitude < 35786) {
        radiationExposure = "⚠️ MEO: Moderate radiation (~1-10 mSv/day)";
    } else if (altitude === 35786) {
        radiationExposure = "☢️ GEO: High radiation (~10-50 mSv/day)";
    } else {
        radiationExposure = "☠️ Deep Space: Extreme radiation! (~50+ mSv/day)";
    }

    let temperature;

    if (altitude < 160) {
        temperature = "Variable";
    } else if (altitude <= 2000) {
        temperature = "-100°C to 120°C";
    } else if (altitude < 35786) {
        temperature = "-150°C to 150°C";
    } else if (altitude === 35786) {
        temperature = "-170°C to 200°C";
    } else {
        temperature = "-270°C to 250°C";
    }

    if(T_hours > 24) document.getElementById("result1").innerText = `Orbital Period: ${(T_hours/24).toFixed(2)} days`;
    else if(T_hours < 2) document.getElementById("result1").innerText = `Orbital Period: ${(T_hours*60).toFixed(2)} minutes`;
    else document.getElementById("result1").innerText = `Orbital Period: ${T_hours.toFixed(2)} hours`;

    document.getElementById("result2").innerText= `Orbital velocity: ${velocity.toFixed(2)} Km/hr`;
    document.getElementById("result3").innerText= `Orbit: ${location} `;
    document.getElementById("result8").innerText= `Radiation Exposure: ${radiationExposure} `;
    document.getElementById("result4").innerText= `Gravity at orbit: ${gravity.toFixed(2)} m/s²`;
    document.getElementById("result5").innerText= `Escape velocity: ${escapev.toFixed(2)} Km/hr `;
    document.getElementById("result6").textContent = `Signal Latency: ${latency.toFixed(2)} ms`;
    document.getElementById("result7").textContent = `Temperature: ${temperature}`;


    

    let orbit = document.querySelector('.orbit');
    let satellite = document.getElementById('satellite');

    let newSize = Math.min(200, (altitude / 10) + 100); // Limit max orbit size
    orbit.style.width = `${newSize}px`;
    orbit.style.height = `${newSize}px`;

    let orbitRadius = newSize / 2;  // Satellite orbit radius
    satellite.style.display='block';

    satellite.style.top = `calc(50% - 7.5px)`;  // Centering satellite
    satellite.style.left = `calc(50% - 7.5px)`;

    // Clear previous satellite animation
    cancelAnimationFrame(animationFrame);

    function animateSatellite() {
        angle += (360 / (T_seconds / 60));  // Adjust speed dynamically
        let radians = angle * (Math.PI / 180);
        
        let x = orbitRadius * Math.cos(radians);
        let y = orbitRadius * Math.sin(radians);
        
        satellite.style.transform = `translate(${x}px, ${y}px)`;

        animationFrame = requestAnimationFrame(animateSatellite);
    }

    animateSatellite(); // Start satellite animation
}

// Start Moon animation immediately
function animateMoon() {
    let moon = document.getElementById('moon');

    angle1 += (360 / (2360591.5 / 60));  // Moon's actual orbital period (27.3 days)
    let radians = angle1 * (Math.PI / 180);
    
    let x = moonRadius * Math.cos(radians);
    let y = moonRadius * Math.sin(radians);
    
    moon.style.transform = `translate(${x}px, ${y}px)`;

    moonFrame = requestAnimationFrame(animateMoon);
}

// Start moon animation as soon as the script loads
document.addEventListener("DOMContentLoaded", () => {
    animateMoon();
});
