// Validate form submission
document.addEventListener('DOMContentLoaded', function() {
    // Get today's date in YYYY-MM-DD format for max date attribute
    const today = new Date().toISOString().split('T')[0];
    
    // If date input exists, set its max attribute to today
    const dateInput = document.getElementById('dateOfBirth');
    if (dateInput) {
        dateInput.setAttribute('max', today);
    }
    
    // Success message auto-hide after 3 seconds
    const successAlert = document.querySelector('.alert-success');
    if (successAlert) {
        setTimeout(function() {
            successAlert.style.transition = 'opacity 1s';
            successAlert.style.opacity = 0;
            
            setTimeout(function() {
                successAlert.remove();
            }, 1000);
        }, 3000);
    }
});