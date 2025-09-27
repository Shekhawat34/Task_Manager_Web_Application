// Task Manager JavaScript with jQuery

$(document).ready(function() {
    
    // Form validation and submission handling
    $('#taskForm').on('submit', function(e) {
        const taskTitle = $('#task_title').val().trim();
        
        if (taskTitle === '') {
            e.preventDefault();
            alert('Please enter a task title!');
            $('#task_title').focus();
            return false;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Adding...');
        
        // Allow form to submit naturally, but if there's an error, restore button
        setTimeout(function() {
            submitBtn.prop('disabled', false).text(originalText);
        }, 5000);
    });
    
    // Clear form after adding animation
    $('#task_title, #task_description').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        $(this).parent().removeClass('focused');
    });
    
    // Confirm delete action
    $('.delete-btn').on('click', function(e) {
        const confirmed = confirm('Are you sure you want to delete this task?');
        if (!confirmed) {
            e.preventDefault();
            return false;
        }
    });
    
    // Animate task completion
    $('.complete-btn').on('click', function(e) {
        const taskItem = $(this).closest('.task-item');
        taskItem.addClass('completing');
        
        // Add visual feedback
        taskItem.fadeOut(200).fadeIn(200);
    });
    
    // Animate new tasks
    $('.task-item').each(function(index) {
        $(this).css('opacity', '0');
        $(this).animate({
            opacity: 1
        }, 300 + (index * 100));
    });
    
    // Search/filter functionality (bonus feature)
    let searchTimeout;
    $('#taskSearch').on('keyup', function() {
        clearTimeout(searchTimeout);
        const searchTerm = $(this).val().toLowerCase();
        
    
        searchTimeout = setTimeout(function() {
            $('.task-item').each(function() {
                const taskTitle = $(this).find('.task-title').text().toLowerCase();
                const taskDesc = $(this).find('.task-description').text().toLowerCase();
                
                if (taskTitle.includes(searchTerm) || taskDesc.includes(searchTerm)) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }, 300);
    });
    
    // Priority color animation
    $('.badge').each(function() {
        $(this).hover(
            function() {
                $(this).css('transform', 'scale(1.1)');
            },
            function() {
                $(this).css('transform', 'scale(1)');
            }
        );
    });
    
    // Auto-redirect from success page after 5 seconds
    if ($('.success-card').length > 0) {
        let countdown = 5;
        const redirectMessage = $('<p class="text-muted mt-3 redirect-timer">Redirecting to task list in <strong>' + countdown + '</strong> seconds...</p>');
        $('.success-card .card-body').append(redirectMessage);
        
        

        const countdownInterval = setInterval(function() {
            countdown--;
            $('.redirect-timer strong').text(countdown);
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                window.location.href = '/';
            }
        }, 1000);
        
        // Cancel auto-redirect if user clicks the button
        $('.btn-primary').on('click', function() {
            clearInterval(countdownInterval);
        });
    }
    
    // Character counter for task description
    $('#task_description').on('input', function() {
        const maxLength = 200;
        const currentLength = $(this).val().length;
        
        if (!$('#charCounter').length) {
            $(this).after('<small id="charCounter" class="form-text text-muted"></small>');
        }
        
        $('#charCounter').text(currentLength + ' / ' + maxLength + ' characters');
        
        if (currentLength > maxLength) {
            $('#charCounter').removeClass('text-muted').addClass('text-danger');
        } else {
            $('#charCounter').removeClass('text-danger').addClass('text-muted');
        }
    });
    
    // Smooth scroll to top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            if (!$('#scrollTop').length) {
                $('body').append('<button id="scrollTop" class="btn btn-primary" style="position: fixed; bottom: 20px; right: 20px; border-radius: 50%; width: 50px; height: 50px; z-index: 1000;">↑</button>');
                
                $('#scrollTop').on('click', function() {
                    $('html, body').animate({ scrollTop: 0 }, 600);
                });
            }
        } else {
            $('#scrollTop').remove();
        }
    });
    
    // Add tooltips to buttons
    $('[title]').each(function() {
        $(this).attr('data-bs-toggle', 'tooltip');
    });
    

    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Add animation class to cards on page load
    $('.card').addClass('animate__animated animate__fadeInUp');
    
    console.log('Task Manager initialized successfully!');
});

// Vanilla JavaScript for form validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});