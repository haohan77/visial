// Enhanced Weather & Life Application
// Developed by Silent Vision Team

// Global variables
let currentWeatherData = null;
let aiChatHistory = [];
let isAITyping = false;

// Clock functionality with enhanced display
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const date = now.toLocaleDateString('vi-VN', { 
    weekday: 'short', 
    day: '2-digit', 
    month: '2-digit' 
  });
  document.getElementById('clock').innerHTML = `
    <div class="text-center">
      <div class="font-bold">${hours}:${minutes}:${seconds}</div>
      <div class="text-xs text-gray-500">${date}</div>
    </div>
  `;
}

// Enhanced weather data with more realistic information
const weatherData = {
  temperature: [26, 28, 31, 30, 29, 27, 28],
  humidity: [70, 75, 65, 80, 85, 78, 72],
  rainfall: [5, 10, 0, 20, 15, 8, 12],
  days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  current: {
    temp: 28,
    humidity: 75,
    windSpeed: 15,
    visibility: 10,
    location: "Đà Nẵng, Việt Nam",
    condition: "Có mây",
    icon: "🌤️"
  }
};

// Enhanced feature messages with more detailed information
const featureMessages = {
  weather: `🌤️ THÔNG TIN THỜI TIẾT CHI TIẾT

📍 Vị trí: ${weatherData.current.location}
🌡️ Nhiệt độ: ${weatherData.current.temp}°C (Cảm giác như 30°C)
💧 Độ ẩm: ${weatherData.current.humidity}%
💨 Gió: ${weatherData.current.windSpeed} km/h, hướng Đông Nam
👁️ Tầm nhìn: ${weatherData.current.visibility} km
☁️ Tình trạng: ${weatherData.current.condition}

📊 Dự báo 24h tới:
• 15:00 - Mưa nhẹ (75% khả năng)
• 18:00 - Có mây
• 21:00 - Quang đãng
• 06:00 - Nắng ráo

💡 Lời khuyên: Nên mang theo ô khi ra ngoài chiều nay!`,

  sos: `🚨 TÍNH NĂNG SOS KHẨN CẤP ĐÃ ĐƯỢC KÍCH HOẠT!

📞 Đang kết nối với:
• Trung tâm cứu hộ 115
• Cảnh sát 113  
• Cứu thương 114

📍 Vị trí GPS đã được gửi:
• Tọa độ: ${weatherData.current.location}
• Độ chính xác: ±5m
• Thời gian: ${new Date().toLocaleString('vi-VN')}

⚡ Trạng thái: Đang chờ phản hồi...
🔔 Thông báo đã được gửi đến liên hệ khẩn cấp

⚠️ Lưu ý: Chỉ sử dụng khi thực sự cần thiết!`,

  plants: `🌱 TƯ VẤN CÂY TRỒNG THÔNG MINH (AI)

🌤️ Phân tích thời tiết hiện tại:
• Nhiệt độ: ${weatherData.current.temp}°C - Lý tưởng cho cây nhiệt đới
• Độ ẩm: ${weatherData.current.humidity}% - Phù hợp cho hầu hết cây trồng
• Ánh sáng: Trung bình - Tốt cho cây ưa bóng

🌿 Gợi ý cây trồng phù hợp:
• Cà chua 🍅 - Thời vụ tốt, cần tưới đều
• Dưa chuột 🥒 - Phát triển mạnh trong thời tiết này
• Rau muống 🥬 - Dễ trồng, thu hoạch nhanh
• Hoa hướng dương 🌻 - Cần nhiều ánh sáng
• Cây bạc hà 🌿 - Thích hợp với độ ẩm cao

💡 Lời khuyên AI:
• Tưới nước vào buổi sáng sớm (6-7h)
• Bón phân hữu cơ 2 tuần/lần
• Chú ý thoát nước khi mưa nhiều
• Sử dụng lưới che nắng nếu cần

📱 Nhắc nhở: Đặt lịch tưới nước tự động!`,

  alerts: `⚠️ HỆ THỐNG CẢNH BÁO THỜI TIẾT AI

🌧️ Cảnh báo ngắn hạn (24h):
• 15:00 hôm nay: Mưa rào và dông (75%)
• 20:00 hôm nay: Gió mạnh cấp 6 (60%)
• Đêm nay: Mưa vừa đến to (80%)

🌪️ Cảnh báo trung hạn (3-7 ngày):
• Thứ 5-6: Khả năng có áp thấp nhiệt đới
• Cuối tuần: Mưa lớn diện rộng
• Tuần sau: Thời tiết ổn định trở lại

🚨 Khuyến nghị khẩn cấp:
• Hạn chế ra ngoài từ 15h-21h hôm nay
• Chuẩn bị đồ dự phòng: đèn pin, nước uống
• Kiểm tra hệ thống thoát nước nhà
• Theo dõi tin tức cập nhật liên tục

📊 Độ tin cậy AI: 87%
🔄 Cập nhật mỗi 15 phút`
};

// AI Assistant responses
const aiResponses = {
  greetings: [
    "Xin chào! Tôi có thể giúp bạn gì về thời tiết hôm nay?",
    "Chào bạn! Hãy hỏi tôi bất cứ điều gì về thời tiết nhé!",
    "Hi! Tôi là AI trợ lý thời tiết. Bạn cần hỗ trợ gì?"
  ],
  weather: {
    "hôm nay có mưa không": "Theo dự báo AI, hôm nay có 75% khả năng mưa vào khoảng 15:00-18:00. Bạn nên mang theo ô khi ra ngoài!",
    "nên mặc gì": `Với nhiệt độ ${weatherData.current.temp}°C và độ ẩm ${weatherData.current.humidity}%, tôi khuyên bạn nên mặc:
• Áo cotton thoáng mát
• Quần dài hoặc váy dài
• Mang theo áo khoác nhẹ cho tối
• Đừng quên ô và kem chống nắng!`,
    "cuối tuần thời tiết thế nào": "Cuối tuần sẽ có mưa rào và dông, nhiệt độ 25-29°C. Thích hợp cho hoạt động trong nhà hoặc đi mua sắm ở trung tâm thương mại.",
    "chất lượng không khí": "Chất lượng không khí hiện tại: Tốt (AQI: 45). PM2.5: 12 μg/m³. An toàn cho mọi hoạt động ngoài trời!"
  },
  default: "Tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về thời tiết, dự báo, hoặc lời khuyên trang phục nhé!"
};

// Disaster Warning System with AI enhancements
const disasterWarningSystem = {
  currentAlerts: [],
  riskAssessment: {
    overall: 57,
    risks: [
      { name: 'Flood', level: 70, color: 'red', trend: 'increasing' },
      { name: 'Storm', level: 60, color: 'orange', trend: 'stable' },
      { name: 'Thunderstorm', level: 80, color: 'red', trend: 'increasing' },
      { name: 'Heavy Rain', level: 85, color: 'red', trend: 'decreasing' },
      { name: 'Landslide', level: 65, color: 'yellow', trend: 'stable' },
      { name: 'Heat Wave', level: 30, color: 'green', trend: 'decreasing' },
      { name: 'Drought', level: 10, color: 'blue', trend: 'stable' }
    ]
  },
  aiPredictions: [
    {
      type: 'rain',
      title: 'Mưa nhẹ',
      time: '15:00 - 18:00 hôm nay',
      probability: 75,
      details: 'Lượng mưa: 5-10mm',
      icon: 'ri-cloud-rain-line',
      color: 'blue'
    },
    {
      type: 'sunny',
      title: 'Nắng ráo',
      time: 'Ngày mai 6:00 - 11:00',
      probability: 90,
      details: 'Nhiệt độ: 26-30°C | UV: Trung bình',
      icon: 'ri-sun-line',
      color: 'yellow'
    },
    {
      type: 'air_quality',
      title: 'Chất lượng không khí',
      time: 'Cập nhật liên tục',
      probability: 100,
      details: 'AQI: 45 (Tốt) | PM2.5: 12 μg/m³',
      icon: 'ri-leaf-line',
      color: 'green'
    }
  ]
};

// Initialize enhanced charts with better styling
function initializeCharts() {
  // Temperature Chart with gradient
  const temperatureChart = echarts.init(document.getElementById("temperatureChart"));
  temperatureChart.setOption({
    tooltip: { 
      trigger: "axis",
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#ff6347',
      borderWidth: 2,
      textStyle: { color: '#1e293b', fontSize: 12 },
      formatter: function(params) {
        return `${params[0].name}<br/>Nhiệt độ: ${params[0].value}°C`;
      }
    },
    grid: { top: 20, right: 20, bottom: 30, left: 30 },
    xAxis: { 
      type: "category", 
      data: weatherData.days,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: { 
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
    },
    series: [{
      name: "Nhiệt độ (°C)",
      type: "line",
      data: weatherData.temperature,
      smooth: true,
      lineStyle: { color: "#ff6347", width: 3 },
      areaStyle: { 
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 99, 71, 0.4)' },
            { offset: 1, color: 'rgba(255, 99, 71, 0.1)' }
          ]
        }
      },
      itemStyle: { color: '#ff6347', borderWidth: 2, borderColor: '#fff' },
      emphasis: { focus: 'series', scale: true }
    }]
  });

  // Humidity Chart with animation
  const humidityChart = echarts.init(document.getElementById("humidityChart"));
  humidityChart.setOption({
    tooltip: { 
      trigger: "axis",
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#1E90FF',
      borderWidth: 2,
      textStyle: { color: '#1e293b', fontSize: 12 },
      formatter: function(params) {
        return `${params[0].name}<br/>Độ ẩm: ${params[0].value}%`;
      }
    },
    grid: { top: 20, right: 20, bottom: 30, left: 30 },
    xAxis: { 
      type: "category", 
      data: weatherData.days,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: { 
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
    },
    series: [{
      name: "Độ ẩm (%)",
      type: "bar",
      data: weatherData.humidity,
      itemStyle: { 
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#1E90FF' },
            { offset: 1, color: '#87CEEB' }
          ]
        },
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: { focus: 'series' },
      animationDelay: function (idx) {
        return idx * 100;
      }
    }]
  });

  // Rainfall Chart with custom styling
  const rainfallChart = echarts.init(document.getElementById("rainfallChart"));
  rainfallChart.setOption({
    tooltip: { 
      trigger: "axis",
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#32CD32',
      borderWidth: 2,
      textStyle: { color: '#1e293b', fontSize: 12 },
      formatter: function(params) {
        return `${params[0].name}<br/>Lượng mưa: ${params[0].value}mm`;
      }
    },
    grid: { top: 20, right: 20, bottom: 30, left: 30 },
    xAxis: { 
      type: "category", 
      data: weatherData.days,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: { 
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
    },
    series: [{
      name: "Lượng mưa (mm)",
      type: "bar",
      data: weatherData.rainfall,
      itemStyle: { 
        color: function(params) {
          const colors = ['#32CD32', '#228B22', '#90EE90'];
          return colors[params.dataIndex % colors.length];
        },
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: { focus: 'series' },
      animationDelay: function (idx) {
        return idx * 150;
      }
    }]
  });

  // Make charts responsive
  window.addEventListener('resize', () => {
    temperatureChart.resize();
    humidityChart.resize();
    rainfallChart.resize();
  });
}

// Enhanced map initialization with weather layers
function initializeMap() {
  const map = L.map('map').setView([16.0471, 108.2062], 6);
  
  // Base layer
  const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Weather layers (mock implementation)
  const weatherLayers = {
    temperature: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.6,
      attribution: 'Temperature Layer'
    }),
    precipitation: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.6,
      attribution: 'Precipitation Layer'
    }),
    wind: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.6,
      attribution: 'Wind Layer'
    })
  };

  let currentWeatherLayer = null;

  // Map control buttons
  document.querySelectorAll('.map-control-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      document.querySelectorAll('.map-control-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Remove current weather layer
      if (currentWeatherLayer) {
        map.removeLayer(currentWeatherLayer);
      }
      
      // Add new weather layer
      const layer = this.dataset.layer;
      if (weatherLayers[layer]) {
        currentWeatherLayer = weatherLayers[layer];
        map.addLayer(currentWeatherLayer);
      }
    });
  });

  // Enhanced weather markers with more information
  const weatherMarkers = [
    { lat: 21.0285, lng: 105.8542, city: 'Hà Nội', temp: '26°C', weather: '☁️', humidity: 80, wind: 12, aqi: 65 },
    { lat: 10.8231, lng: 106.6297, city: 'TP.HCM', temp: '30°C', weather: '☀️', humidity: 70, wind: 8, aqi: 55 },
    { lat: 16.0471, lng: 108.2062, city: 'Đà Nẵng', temp: '28°C', weather: '🌤️', humidity: 75, wind: 15, aqi: 45 },
    { lat: 10.0452, lng: 105.7469, city: 'Cần Thơ', temp: '29°C', weather: '🌧️', humidity: 85, wind: 10, aqi: 50 }
  ];

  weatherMarkers.forEach(marker => {
    const customIcon = L.divIcon({
      className: 'custom-weather-marker',
      html: `
        <div class="bg-white rounded-full p-2 shadow-lg border-2 border-blue-500">
          <div class="text-center">
            <div class="text-lg">${marker.weather}</div>
            <div class="text-xs font-bold text-blue-600">${marker.temp}</div>
          </div>
        </div>
      `,
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    });

    L.marker([marker.lat, marker.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="text-center p-2 min-w-[200px]">
          <h3 class="font-bold text-lg text-blue-600 mb-2">${marker.city}</h3>
          <div class="text-4xl mb-2">${marker.weather}</div>
          <div class="text-2xl font-bold text-gray-800 mb-3">${marker.temp}</div>
          
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-blue-50 rounded p-2">
              <i class="ri-drop-line text-blue-500"></i>
              <div class="font-semibold">${marker.humidity}%</div>
              <div class="text-gray-600">Độ ẩm</div>
            </div>
            <div class="bg-green-50 rounded p-2">
              <i class="ri-windy-line text-green-500"></i>
              <div class="font-semibold">${marker.wind}km/h</div>
              <div class="text-gray-600">Gió</div>
            </div>
            <div class="bg-purple-50 rounded p-2 col-span-2">
              <i class="ri-leaf-line text-purple-500"></i>
              <div class="font-semibold">AQI: ${marker.aqi}</div>
              <div class="text-gray-600">Chất lượng không khí</div>
            </div>
          </div>
          
          <button onclick="getDetailedForecast('${marker.city}')" 
                  class="mt-3 bg-blue-500 text-white px-4 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors">
            Xem chi tiết
          </button>
        </div>
      `);
  });

  // Location tracking functionality (enhanced from previous version)
  let currentLocationMarker = null;
  let currentPosition = null;
  let watchId = null;

  const locationControl = L.control({ position: 'topright' });
  locationControl.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    
    div.innerHTML = `
      <div class="location-controls bg-white rounded-lg shadow-lg p-2">
        <button id="locateBtn" class="location-btn bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600 transition-colors" title="Tìm vị trí của tôi">
          <i class="ri-map-pin-line text-lg"></i>
        </button>
        <button id="returnBtn" class="location-btn bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors" title="Quay về vị trí của tôi" style="display: none;">
          <i class="ri-navigation-line text-lg"></i>
        </button>
      </div>
    `;
    
    div.style.backgroundColor = 'transparent';
    div.style.border = 'none';
    
    return div;
  };
  locationControl.addTo(map);

  // Location event handlers
  document.addEventListener('click', function(e) {
    if (e.target.closest('#locateBtn')) {
      locateCurrentPosition();
    }
    if (e.target.closest('#returnBtn')) {
      returnToCurrentLocation();
    }
  });

  function locateCurrentPosition() {
    const locateBtn = document.getElementById('locateBtn');
    const returnBtn = document.getElementById('returnBtn');
    
    if (!navigator.geolocation) {
      showNotification('Trình duyệt của bạn không hỗ trợ định vị GPS', 'error');
      return;
    }

    locateBtn.innerHTML = '<i class="ri-loader-4-line text-lg animate-spin"></i>';
    locateBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        
        currentPosition = { lat, lng };
        
        if (currentLocationMarker) {
          map.removeLayer(currentLocationMarker);
        }
        
        const accuracyColor = accuracy <= 50 ? 'green' : accuracy <= 100 ? 'yellow' : 'red';
        const accuracyText = accuracy <= 20 ? 'Rất tốt' : accuracy <= 50 ? 'Tốt' : accuracy <= 100 ? 'Trung bình' : 'Kém';
        
        currentLocationMarker = L.marker([lat, lng], {
          icon: L.divIcon({
            className: 'current-location-marker',
            html: `<div class="w-4 h-4 bg-${accuracyColor}-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        }).addTo(map);
        
        getLocationInfo(lat, lng).then(locationInfo => {
          currentLocationMarker.bindPopup(`
            <div class="text-center p-3 min-w-[250px]">
              <h3 class="font-bold text-lg text-blue-600 mb-2">📍 Vị trí của bạn</h3>
              <p class="text-sm text-gray-600 mb-3">${locationInfo}</p>
              
              <div class="bg-gray-50 rounded-lg p-3 mb-3">
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-gray-500">Độ chính xác:</span>
                    <div class="font-semibold text-${accuracyColor}-600">${Math.round(accuracy)}m (${accuracyText})</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Thời gian:</span>
                    <div class="font-semibold">${new Date().toLocaleTimeString('vi-VN')}</div>
                  </div>
                </div>
                <div class="mt-2 text-xs text-gray-500">
                  Tọa độ: ${lat.toFixed(6)}, ${lng.toFixed(6)}
                </div>
              </div>
              
              <div class="flex gap-2">
                <button onclick="getWeatherAtLocation(${lat}, ${lng})" 
                        class="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                  🌤️ Thời tiết tại đây
                </button>
                <button onclick="recalibrateLocation()" 
                        class="flex-1 bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors">
                  🔄 Hiệu chỉnh lại
                </button>
              </div>
            </div>
          `).openPopup();
        });
        
        map.setView([lat, lng], 15);
        locateBtn.innerHTML = '<i class="ri-map-pin-line text-lg"></i>';
        locateBtn.disabled = false;
        returnBtn.style.display = 'block';
        
        showNotification('Đã xác định vị trí của bạn!', 'success');
      },
      function(error) {
        let errorMessage = 'Không thể xác định vị trí của bạn';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Bạn đã từ chối quyền truy cập vị trí';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Thông tin vị trí không khả dụng';
            break;
          case error.TIMEOUT:
            errorMessage = 'Yêu cầu định vị đã hết thời gian';
            break;
        }
        
        showNotification(errorMessage, 'error');
        locateBtn.innerHTML = '<i class="ri-map-pin-line text-lg"></i>';
        locateBtn.disabled = false;
      }
    );
  }

  function returnToCurrentLocation() {
    if (currentPosition && currentLocationMarker) {
      map.setView([currentPosition.lat, currentPosition.lng], 15);
      currentLocationMarker.openPopup();
    }
  }

  async function getLocationInfo(lat, lng) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=vi`);
      const data = await response.json();
      
      if (data && data.display_name) {
        const address = data.address || {};
        const parts = [];
        
        if (address.road) parts.push(address.road);
        if (address.suburb || address.neighbourhood) parts.push(address.suburb || address.neighbourhood);
        if (address.city || address.town || address.village) parts.push(address.city || address.town || address.village);
        if (address.state) parts.push(address.state);
        
        return parts.length > 0 ? parts.join(', ') : data.display_name;
      }
      
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  }

  // Global functions for map interactions
  window.recalibrateLocation = locateCurrentPosition;
  window.getDetailedForecast = function(city) {
    showNotification(`Đang tải dự báo chi tiết cho ${city}...`, 'info');
    // Simulate API call
    setTimeout(() => {
      alert(`📊 DỰ BÁO CHI TIẾT - ${city.toUpperCase()}

🌡️ Nhiệt độ 24h tới:
• 12:00 - 29°C (Nắng)
• 15:00 - 31°C (Có mây)
• 18:00 - 28°C (Mưa nhẹ)
• 21:00 - 26°C (Quang đãng)

💧 Độ ẩm: 70-85%
💨 Gió: 10-15 km/h
🌧️ Khả năng mưa: 60%

📱 Tải ứng dụng để nhận thông báo chi tiết!`);
    }, 1500);
  };

  window.getWeatherAtLocation = function(lat, lng) {
    showNotification('Đang lấy thông tin thời tiết tại vị trí này...', 'info');
    setTimeout(() => {
      alert(`🌤️ THỜI TIẾT TẠI VỊ TRÍ CỦA BẠN

📍 Tọa độ: ${lat.toFixed(4)}, ${lng.toFixed(4)}
🌡️ Nhiệt độ: 28°C
💧 Độ ẩm: 75%
💨 Gió: 12 km/h
☁️ Tình trạng: Có mây
🌧️ Khả năng mưa: 40%

📊 Chỉ số UV: 6 (Trung bình)
👁️ Tầm nhìn: 10 km
🌅 Mặt trời mọc: 05:45
🌇 Mặt trời lặn: 18:30`);
    }, 1000);
  };

  return map;
}

// AI Assistant functionality
function openAIAssistant() {
  const modal = document.getElementById('aiAssistantModal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Focus on input
  setTimeout(() => {
    document.getElementById('aiInput').focus();
  }, 300);
}

function closeAIAssistant() {
  const modal = document.getElementById('aiAssistantModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function sendAIMessage() {
  const input = document.getElementById('aiInput');
  const message = input.value.trim();
  
  if (!message || isAITyping) return;
  
  // Add user message
  addChatMessage(message, 'user');
  input.value = '';
  
  // Show AI typing
  showAITyping();
  
  // Simulate AI response
  setTimeout(() => {
    const response = generateAIResponse(message);
    hideAITyping();
    addChatMessage(response, 'ai');
  }, 1000 + Math.random() * 2000);
}

function askQuickQuestion(question) {
  document.getElementById('aiInput').value = question;
  sendAIMessage();
}

function addChatMessage(message, sender) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `${sender}-message mb-4`;
  
  if (sender === 'user') {
    messageDiv.innerHTML = `
      <div class="flex items-start gap-3 justify-end">
        <div class="bg-blue-500 text-white rounded-2xl p-4 shadow-sm max-w-xs">
          <p>${message}</p>
        </div>
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <i class="ri-user-line text-white text-sm"></i>
        </div>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <i class="ri-robot-line text-white text-sm"></i>
        </div>
        <div class="bg-white rounded-2xl p-4 shadow-sm max-w-xs border border-gray-200">
          <p class="text-gray-800 whitespace-pre-line">${message}</p>
        </div>
      </div>
    `;
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Add animation
  messageDiv.style.opacity = '0';
  messageDiv.style.transform = 'translateY(20px)';
  setTimeout(() => {
    messageDiv.style.transition = 'all 0.3s ease';
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
  }, 100);
}

function showAITyping() {
  isAITyping = true;
  const chatMessages = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  typingDiv.id = 'ai-typing';
  typingDiv.className = 'ai-message mb-4';
  typingDiv.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
        <i class="ri-robot-line text-white text-sm"></i>
      </div>
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <div class="flex gap-1">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
      </div>
    </div>
  `;
  
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideAITyping() {
  isAITyping = false;
  const typingDiv = document.getElementById('ai-typing');
  if (typingDiv) {
    typingDiv.remove();
  }
}

function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check for specific weather questions
  for (const [key, response] of Object.entries(aiResponses.weather)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Check for greetings
  if (lowerMessage.includes('xin chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
  }
  
  // Weather-related keywords
  if (lowerMessage.includes('thời tiết') || lowerMessage.includes('weather')) {
    return `Thời tiết hiện tại tại ${weatherData.current.location}:
🌡️ Nhiệt độ: ${weatherData.current.temp}°C
💧 Độ ẩm: ${weatherData.current.humidity}%
💨 Gió: ${weatherData.current.windSpeed} km/h
☁️ Tình trạng: ${weatherData.current.condition}

Bạn có muốn biết thêm thông tin gì khác không?`;
  }
  
  if (lowerMessage.includes('nhiệt độ') || lowerMessage.includes('temperature')) {
    return `Nhiệt độ hiện tại là ${weatherData.current.temp}°C. Cảm giác như 30°C do độ ẩm cao. Dự báo hôm nay dao động từ 26-31°C.`;
  }
  
  if (lowerMessage.includes('mưa') || lowerMessage.includes('rain')) {
    return `Hôm nay có 75% khả năng mưa vào khoảng 15:00-18:00. Lượng mưa dự kiến 5-10mm. Bạn nên mang theo ô khi ra ngoài!`;
  }
  
  if (lowerMessage.includes('gió') || lowerMessage.includes('wind')) {
    return `Gió hiện tại: ${weatherData.current.windSpeed} km/h, hướng Đông Nam. Dự báo gió sẽ mạnh hơn vào chiều tối với cấp 6-7.`;
  }
  
  // Default response
  return aiResponses.default;
}

// Enhanced disaster warning functions
function openDisasterWarningModal() {
  const modal = document.getElementById('disasterModal');
  const updateTime = document.getElementById('updateTime');
  
  updateTime.textContent = new Date().toLocaleString('vi-VN');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  loadDisasterData();
  animateRiskBars();
}

function closeDisasterWarningModal() {
  const modal = document.getElementById('disasterModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function loadDisasterData() {
  updateCurrentAlerts();
  updateRiskAssessment();
  loadAIPredictions();
}

function updateCurrentAlerts() {
  const alertsContainer = document.getElementById('currentAlerts');
  
  if (disasterWarningSystem.currentAlerts.length === 0) {
    alertsContainer.innerHTML = `
      <i class="ri-shield-check-line text-green-500 text-5xl mb-4"></i>
      <h4 class="text-xl font-semibold text-gray-800 mb-2">Khu vực an toàn</h4>
      <p class="text-gray-600 text-lg mb-2">Không có cảnh báo thiên tai nào</p>
      <p class="text-gray-500 text-sm">Hệ thống AI đang giám sát 24/7</p>
    `;
  }
}

function updateRiskAssessment() {
  // Update overall score with animation
  const overallScore = document.querySelector('.w-32.h-32 span');
  if (overallScore) {
    let currentScore = 0;
    const targetScore = disasterWarningSystem.riskAssessment.overall;
    const increment = targetScore / 30;
    
    const countUp = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        currentScore = targetScore;
        clearInterval(countUp);
      }
      overallScore.textContent = Math.round(currentScore);
    }, 50);
  }
}

function animateRiskBars() {
  setTimeout(() => {
    document.querySelectorAll('.risk-progress').forEach((bar, index) => {
      setTimeout(() => {
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.width = bar.style.width;
      }, index * 200);
    });
  }, 500);
}

function loadAIPredictions() {
  // AI predictions are already loaded in the HTML
  // This function can be used to update them dynamically
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl max-w-sm transform transition-all duration-300 translate-x-full border-l-4`;
  
  const colors = {
    success: 'bg-green-50 text-green-800 border-green-500',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-500',
    error: 'bg-red-50 text-red-800 border-red-500',
    info: 'bg-blue-50 text-blue-800 border-blue-500'
  };
  
  const icons = {
    success: 'ri-check-line',
    warning: 'ri-alert-line',
    error: 'ri-close-line',
    info: 'ri-information-line'
  };
  
  notification.className += ` ${colors[type] || colors.info}`;
  
  notification.innerHTML = `
    <div class="flex items-start gap-3">
      <i class="${icons[type] || icons.info} text-xl flex-shrink-0 mt-0.5"></i>
      <div class="flex-1">
        <p class="font-medium">${message}</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" 
              class="text-current hover:bg-black hover:bg-opacity-10 p-1 rounded transition-colors">
        <i class="ri-close-line text-sm"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }, duration);
}

// Enhanced feature handling
function handleFeatureClick(feature) {
  const message = featureMessages[feature];
  if (message) {
    // Create a custom modal instead of alert
    showFeatureModal(feature, message);
  }
}

function showFeatureModal(feature, message) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
  
  const featureColors = {
    weather: 'blue',
    sos: 'red',
    plants: 'green',
    alerts: 'yellow'
  };
  
  const color = featureColors[feature] || 'blue';
  
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
      <div class="bg-gradient-to-r from-${color}-500 to-${color}-600 text-white p-6 rounded-t-2xl">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold">Thông tin chi tiết</h3>
          <button onclick="this.closest('.fixed').remove()" 
                  class="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
      </div>
      <div class="p-6">
        <pre class="whitespace-pre-wrap text-gray-800 leading-relaxed">${message}</pre>
        <div class="mt-6 flex gap-3">
          <button onclick="this.closest('.fixed').remove()" 
                  class="flex-1 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors">
            Đóng
          </button>
          <button onclick="shareFeatureInfo('${feature}')" 
                  class="flex-1 bg-${color}-500 text-white px-4 py-2 rounded-full hover:bg-${color}-600 transition-colors">
            Chia sẻ
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Close on outside click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = 'auto';
    }
  });
}

function shareFeatureInfo(feature) {
  const message = featureMessages[feature];
  if (navigator.share) {
    navigator.share({
      title: `Weather & Life - ${feature}`,
      text: message,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(message).then(() => {
      showNotification('Đã sao chép thông tin vào clipboard!', 'success');
    });
  }
}

// Enhanced search functionality
function handleLocationSearch() {
  const searchInput = document.getElementById('locationSearch');
  const query = searchInput.value.trim();
  
  if (query) {
    showNotification(`🔍 Đang tìm kiếm thời tiết cho: "${query}"`, 'info');
    
    // Simulate search with loading
    setTimeout(() => {
      const mockResults = [
        { name: 'Hà Nội', temp: '26°C', weather: '☁️' },
        { name: 'TP.HCM', temp: '30°C', weather: '☀️' },
        { name: 'Đà Nẵng', temp: '28°C', weather: '🌤️' }
      ];
      
      const result = mockResults.find(r => r.name.toLowerCase().includes(query.toLowerCase())) || 
                    { name: query, temp: '27°C', weather: '🌤️' };
      
      showNotification(`Tìm thấy: ${result.name} - ${result.temp} ${result.weather}`, 'success');
      searchInput.value = '';
    }, 1500);
  }
}

// Mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = mobileMenu.classList.contains('hidden') ? 'ri-menu-line text-xl' : 'ri-close-line text-xl';
  });
  
  // Close mobile menu when clicking on links
  document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.querySelector('i').className = 'ri-menu-line text-xl';
    });
  });
}

// Enhanced smooth scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
}

// Enhanced animations
function addEnhancedAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        
        // Special animations for different elements
        if (entry.target.classList.contains('weather-card')) {
          entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.weather-card, .hero-section, .chart-container').forEach(el => {
    observer.observe(el);
  });
}

// Additional utility functions
function refreshAlerts() {
  const button = event.target.closest('button');
  const originalHTML = button.innerHTML;
  
  button.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i>Đang tải...';
  button.disabled = true;
  
  setTimeout(() => {
    document.getElementById('updateTime').textContent = new Date().toLocaleString('vi-VN');
    loadDisasterData();
    
    button.innerHTML = originalHTML;
    button.disabled = false;
    
    showNotification('Đã cập nhật cảnh báo mới nhất!', 'success');
  }, 2000);
}

function subscribeAlerts() {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      showNotification('Bạn đã đăng ký nhận thông báo cảnh báo thiên tai!', 'success');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showNotification('Đã bật thông báo cảnh báo thiên tai!', 'success');
          
          // Show a sample notification
          setTimeout(() => {
            new Notification('Weather & Life', {
              body: 'Bạn đã đăng ký thành công! Sẽ nhận cảnh báo khi có thiên tai.',
              icon: '/favicon.ico'
            });
          }, 1000);
        } else {
          showNotification('Vui lòng cho phép thông báo để nhận cảnh báo kịp thời!', 'warning');
        }
      });
    } else {
      showNotification('Vui lòng bật thông báo trong cài đặt trình duyệt!', 'warning');
    }
  } else {
    showNotification('Trình duyệt không hỗ trợ thông báo!', 'error');
  }
}

function shareAlerts() {
  const shareData = {
    title: 'Cảnh báo thiên tai - Weather & Life',
    text: 'Theo dõi tình hình thiên tai và cảnh báo kịp thời tại khu vực của bạn với AI',
    url: window.location.href
  };
  
  if (navigator.share) {
    navigator.share(shareData).then(() => {
      showNotification('Đã chia sẻ thành công!', 'success');
    }).catch(() => {
      fallbackShare();
    });
  } else {
    fallbackShare();
  }
}

function fallbackShare() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showNotification('Đã sao chép link vào clipboard!', 'success');
  }).catch(() => {
    showNotification('Không thể chia sẻ. Vui lòng sao chép link thủ công!', 'warning');
  });
}

function exportReport() {
  showNotification('Đang tạo báo cáo...', 'info');
  
  setTimeout(() => {
    const reportData = `
BÁOCÁO THỜI TIẾT & CẢNH BÁO THIÊN TAI
=====================================
Thời gian: ${new Date().toLocaleString('vi-VN')}
Vị trí: ${weatherData.current.location}

THỜI TIẾT HIỆN TẠI:
- Nhiệt độ: ${weatherData.current.temp}°C
- Độ ẩm: ${weatherData.current.humidity}%
- Gió: ${weatherData.current.windSpeed} km/h
- Tình trạng: ${weatherData.current.condition}

ĐÁNH GIÁ RỦI RO AI:
- Tổng thể: ${disasterWarningSystem.riskAssessment.overall}/100
- Lũ lụt: 70% (Cao)
- Bão: 60% (Trung bình)
- Dông: 80% (Cao)
- Mưa lớn: 85% (Rất cao)

KHUYẾN NGHỊ:
- Theo dõi cảnh báo thường xuyên
- Chuẩn bị đồ dự phòng
- Hạn chế ra ngoài khi có cảnh báo

Được tạo bởi Weather & Life AI System
    `;
    
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weather-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Đã xuất báo cáo thành công!', 'success');
  }, 2000);
}

// Locate user function (enhanced)
function locateUser() {
  const locateBtn = document.getElementById('locateBtn');
  if (locateBtn) {
    locateBtn.click();
  } else {
    setTimeout(() => {
      const btn = document.getElementById('locateBtn');
      if (btn) btn.click();
    }, 1000);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Start clock with enhanced display
  setInterval(updateClock, 1000);
  updateClock();

  // Initialize all components
  initializeCharts();
  window.weatherMap = initializeMap();
  initializeMobileMenu();
  initializeSmoothScrolling();
  addEnhancedAnimations();

  // Add event listeners for feature buttons
  document.querySelectorAll('.feature-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const feature = btn.getAttribute('data-feature');
      if (feature) {
        handleFeatureClick(feature);
      }
    });
  });

  // Add search functionality
  const searchInput = document.getElementById('locationSearch');
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleLocationSearch();
    }
  });

  // AI Assistant input handler
  const aiInput = document.getElementById('aiInput');
  if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendAIMessage();
      }
    });
  }

  // Close modals on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modals = ['disasterModal', 'aiAssistantModal'];
      modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && !modal.classList.contains('hidden')) {
          if (modalId === 'disasterModal') closeDisasterWarningModal();
          if (modalId === 'aiAssistantModal') closeAIAssistant();
        }
      });
    }
  });

  // Update weather status indicator
  setInterval(() => {
    const statusIndicator = document.getElementById('weatherStatus');
    if (statusIndicator) {
      const dot = statusIndicator.querySelector('.w-2.h-2');
      const text = statusIndicator.querySelector('span');
      
      // Simulate connection status
      const isOnline = navigator.onLine;
      if (isOnline) {
        dot.className = 'w-2 h-2 bg-green-500 rounded-full animate-pulse';
        text.textContent = 'Trực tuyến';
      } else {
        dot.className = 'w-2 h-2 bg-red-500 rounded-full';
        text.textContent = 'Ngoại tuyến';
      }
    }
  }, 5000);

  // Make global functions available
  window.locateUser = locateUser;
  window.openAIAssistant = openAIAssistant;
  window.closeAIAssistant = closeAIAssistant;
  window.sendAIMessage = sendAIMessage;
  window.askQuickQuestion = askQuickQuestion;
  window.openDisasterWarningModal = openDisasterWarningModal;
  window.closeDisasterWarningModal = closeDisasterWarningModal;
  window.refreshAlerts = refreshAlerts;
  window.subscribeAlerts = subscribeAlerts;
  window.shareAlerts = shareAlerts;
  window.exportReport = exportReport;

  // Show welcome notification
  setTimeout(() => {
    showNotification('Chào mừng đến với Weather & Life! 🌤️', 'success', 3000);
  }, 1000);
});

// Handle window resize for responsive charts
window.addEventListener('resize', () => {
  // Charts will auto-resize due to the resize listeners in initializeCharts
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
