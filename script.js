  // Mobile menu toggle for second navbar
        const mobileMenuBtn = document.querySelector('.main-navbar .mobile-menu-btn');
        const mainNavLinks = document.querySelector('.main-nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            mainNavLinks.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNavLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Dropdown toggle for mobile
        document.querySelectorAll('.main-nav-links > li').forEach(item => {
            const link = item.querySelector('a');
            const dropdown = item.querySelector('.dropdown');
            const chevron = link.querySelector('.fa-chevron-down');
            
            if (dropdown) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        
                        // Rotate chevron icon
                        if (chevron) {
                            chevron.classList.toggle('fa-rotate-180');
                        }
                        
                        // Close other open dropdowns
                        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                            if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                                otherDropdown.classList.remove('active');
                                const otherChevron = otherDropdown.parentElement.querySelector('.fa-chevron-down');
                                if (otherChevron) {
                                    otherChevron.classList.remove('fa-rotate-180');
                                }
                            }
                        });
                    }
                });
            }
        });
        
        // Close menu when clicking outside (for desktop)
        document.addEventListener('click', (e) => {
            if (window.innerWidth > 768) {
                if (!e.target.closest('.main-nav-links li')) {
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        dropdown.style.transform = 'translateX(-50%) translateY(10px)';
                    });
                }
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mainNavLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Reset all dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const chevron = dropdown.parentElement.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.classList.remove('fa-rotate-180');
                    }
                });
            }
        });
        
        // Ensure video plays on mobile
        document.querySelector('video').play().catch(e => {
            // Autoplay was prevented, show fallback or handle error
            console.log("Video autoplay prevented:", e);
        });









         document.addEventListener('DOMContentLoaded', function() {
            // =============================================
            // Delivery Location Functionality (Working)
            // =============================================
            const puneDeliveryAreas = [
                'Koregaon Park', 'Baner', 'Wakad', 'Hinjewadi', 'FC Road', 'Viman Nagar',
                'Kothrud', 'Aundh', 'Shivaji Nagar', 'Camp', 'Deccan', 'Karve Nagar'
            ];

            const punePincodes = [
                '411001', '411002', '411003', '411004', '411005', '411006'
            ];

            // DOM elements
            const modal = document.getElementById('deliveryModal');
            const deliveryLocationBtn = document.getElementById('deliveryLocationBtn');
            const mobileDeliveryBtn = document.getElementById('mobileDeliveryBtn');
            const closeModal = document.getElementById('closeModal');
            const locationInput = document.getElementById('locationInput');
            const confirmLocationBtn = document.getElementById('confirmLocation');
            const useCurrentLocationBtn = document.getElementById('useCurrentLocation');
            const locationOptions = document.querySelectorAll('.location-option');
            const selectedLocationSpan = document.getElementById('selectedLocation');
            const mobileSelectedLocationSpan = document.getElementById('mobileSelectedLocation');
            const locationError = document.getElementById('locationError');
            const locationSuccess = document.getElementById('locationSuccess');

            let selectedLocation = '';
            let isValidLocation = false;

            // Load saved location
            if (localStorage.getItem('deliveryLocation')) {
                selectedLocation = localStorage.getItem('deliveryLocation');
                selectedLocationSpan.textContent = selectedLocation;
                mobileSelectedLocationSpan.textContent = selectedLocation;
            }

            // Open modal
            function openModal() {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                setTimeout(() => {
                    modal.querySelector('.bg-white').classList.remove('scale-95');
                    modal.querySelector('.bg-white').classList.add('scale-100');
                }, 10);
            }

            // Close modal
            function closeModalFunc() {
                modal.querySelector('.bg-white').classList.remove('scale-100');
                modal.querySelector('.bg-white').classList.add('scale-95');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }, 300);
            }

            // Validate location
            function validateLocation(location) {
                const input = location.toLowerCase().trim();
                
                // Check if it's a pincode
                if (/^\d{6}$/.test(input)) {
                    if (punePincodes.includes(input)) {
                        return { isValid: true, type: 'pincode', location: input };
                    }
                    return { isValid: false, type: 'pincode', message: 'We don\'t deliver to this pincode.' };
                }
                
                // Check if it's an area name in Pune
                const matchedArea = puneDeliveryAreas.find(area => 
                    area.toLowerCase().includes(input) || input.includes(area.toLowerCase())
                );
                
                if (matchedArea) {
                    return { isValid: true, type: 'area', location: matchedArea };
                }
                
                return { isValid: false, type: 'area', message: 'We don\'t deliver to this area.' };
            }

            // Show location feedback
            function showLocationFeedback(result) {
                locationError.classList.add('hidden');
                locationSuccess.classList.add('hidden');
                
                if (result.isValid) {
                    locationSuccess.textContent = `✓ We deliver to ${result.location}`;
                    locationSuccess.classList.remove('hidden');
                    isValidLocation = true;
                    selectedLocation = result.location;
                    confirmLocationBtn.disabled = false;
                    confirmLocationBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                } else {
                    locationError.textContent = result.message;
                    locationError.classList.remove('hidden');
                    isValidLocation = false;
                    confirmLocationBtn.disabled = true;
                    confirmLocationBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }

            // Get current location (mock for demo)
            function getCurrentLocation() {
                useCurrentLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    const mockLocation = 'Koregaon Park';
                    locationInput.value = mockLocation;
                    const result = validateLocation(mockLocation);
                    showLocationFeedback(result);
                    useCurrentLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                }, 1000);
            }

            // Confirm location
            function confirmLocation() {
                if (isValidLocation && selectedLocation) {
                    selectedLocationSpan.textContent = selectedLocation;
                    mobileSelectedLocationSpan.textContent = selectedLocation;
                    closeModalFunc();
                    
                    localStorage.setItem('deliveryLocation', selectedLocation);
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
                    successMsg.innerHTML = `<i class="fas fa-check-circle mr-2"></i>Delivery location set to ${selectedLocation}`;
                    document.body.appendChild(successMsg);
                    
                    setTimeout(() => successMsg.classList.remove('translate-x-full'), 100);
                    setTimeout(() => {
                        successMsg.classList.add('translate-x-full');
                        setTimeout(() => successMsg.remove(), 300);
                    }, 3000);
                }
            }

            // Event listeners
            deliveryLocationBtn.addEventListener('click', openModal);
            mobileDeliveryBtn.addEventListener('click', openModal);
            closeModal.addEventListener('click', closeModalFunc);
            useCurrentLocationBtn.addEventListener('click', getCurrentLocation);
            confirmLocationBtn.addEventListener('click', confirmLocation);

            // Close modal on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModalFunc();
            });

            // Location input validation
            locationInput.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value.length > 2) {
                    const result = validateLocation(value);
                    showLocationFeedback(result);
                } else {
                    locationError.classList.add('hidden');
                    locationSuccess.classList.add('hidden');
                    confirmLocationBtn.disabled = true;
                }
            });

            // Popular area selection
            locationOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const areaName = option.textContent.trim().replace('✓ ', '');
                    locationInput.value = areaName;
                    const result = validateLocation(areaName);
                    showLocationFeedback(result);
                });
            });

            // =============================================
            // Search Functionality (Working)
            // =============================================
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const suggestions = document.getElementById('suggestions');
            
            const searchData = [
                'Chocolate Cake', 'Vanilla Cake', 'Red Velvet Cake', 'Black Forest Cake',
                'Cheesecake', 'Tiramisu', 'Cupcakes', 'Macarons', 'Croissants'
            ];

            // Show suggestions
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                suggestions.innerHTML = '';
                
                if (query.length > 0) {
                    const matches = searchData.filter(item => 
                        item.toLowerCase().includes(query)
                    );
                    
                    if (matches.length > 0) {
                        suggestions.classList.remove('hidden');
                        matches.forEach(match => {
                            const li = document.createElement('li');
                            li.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors';
                            li.textContent = match;
                            li.addEventListener('click', () => {
                                searchInput.value = match;
                                suggestions.classList.add('hidden');
                                // In a real app, redirect to search results
                                console.log(`Searching for: ${match}`);
                            });
                            suggestions.appendChild(li);
                        });
                    } else {
                        suggestions.classList.add('hidden');
                    }
                } else {
                    suggestions.classList.add('hidden');
                }
            });

            // Search button click
            searchButton.addEventListener('click', function() {
                if (searchInput.value.trim()) {
                    console.log(`Searching for: ${searchInput.value.trim()}`);
                    suggestions.classList.add('hidden');
                }
            });

            // Hide suggestions when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
                    suggestions.classList.add('hidden');
                }
            });
        });